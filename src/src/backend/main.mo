import AccessControl "authorization/access-control";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Storage "blob-storage/Storage";
import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";



actor {
  type Role = {
    #user;
    #admin;
  };

  type UserProfile = {
    principal : Principal;
    name : Text;
    email : Text;
    phone : Text;
    role : Role;
    createdAt : Int;
    blocked : Bool;
    profilePhotoUrl : ?Text;
  };

  type PackageStatus = {
    #active;
    #inactive;
  };

  type Package = {
    id : Nat;
    name : Text;
    price : Nat;
    courses : Text;
    status : PackageStatus;
  };

  type PaymentStatus = {
    #pending;
    #approved;
    #rejected;
  };

  type Payment = {
    id : Nat;
    userId : Principal;
    packageId : Nat;
    transactionId : Text;
    status : PaymentStatus;
    createdAt : Int;
  };

  type AdminStats = {
    totalUsers : Nat;
    totalSales : Nat;
    totalRevenue : Nat;
    pendingPayments : Nat;
  };

  type PaymentProof = {
    id : Nat;
    userId : Principal;
    packageId : Nat;
    transactionId : Text;
    status : PaymentStatus;
    screenshotBlob : Storage.ExternalBlob;
    createdAt : Int;
  };

  type Earnings = {
    today : Nat;
    weekly : Nat;
    monthly : Nat;
    lifetime : Nat;
  };

  type WithdrawalRequestStatus = {
    #pending;
    #approved;
    #rejected;
  };

  type WithdrawalRequest = {
    id : Nat;
    userId : Principal;
    amount : Nat;
    message : Text;
    status : WithdrawalRequestStatus;
    createdAt : Int;
  };

  type LandingPage = {
    id : Nat;
    userId : Principal;
    title : Text;
    content : Text;
    template : Text;
    createdAt : Int;
    updatedAt : Int;
    visitCount : Nat;
  };

  type Product = {
    id : Text;
    productName : Text;
    productDescription : Text;
    currency : Text;
    priceInCents : Nat;
  };

  type CommissionType = {
    #active;
    #passive;
  };

  type ReferralStatus = {
    #pending;
    #approved;
    #paid;
  };

  type Referral = {
    id : Nat;
    referrerId : Principal;
    referredUserId : Principal;
    packageId : Nat;
    commissionAmount : Nat;
    commissionType : CommissionType;
    createdAt : Int;
    status : ReferralStatus;
  };

  type ContactInterest = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
    createdAt : Int;
    resolved : Bool;
  };

  type BankDetails = {
    accountNumber : Text;
    accountHolderName : Text;
    ifsc : Text;
    branch : Text;
    upiHandle : Text;
    qrCodeBlob : Storage.ExternalBlob;
  };

  type PhonePeDetails = {
    upiId : Text;
    qrCodeBlob : Storage.ExternalBlob;
  };

  type SiteContent = {
    whatsappPhoneNumber : Text;
    phonePeDetails : PhonePeDetails;
    bankDetails : BankDetails;
  };

  let users = Map.empty<Principal, UserProfile>();
  let referrals = Map.empty<Nat, Referral>();
  let packages = Map.empty<Nat, Package>();
  let payments = Map.empty<Nat, Payment>();
  let paymentProofs = Map.empty<Nat, PaymentProof>();
  let userEarnings = Map.empty<Principal, Earnings>();
  let withdrawalRequests = Map.empty<Nat, WithdrawalRequest>();
  let landingPages = Map.empty<Nat, LandingPage>();
  let products = Map.empty<Text, Product>();
  let contactInterests = Map.empty<Nat, ContactInterest>();

  var nextPackageId : Nat = 1;
  var nextPaymentId : Nat = 1;
  var nextPaymentProofId : Nat = 1;
  var nextWithdrawalRequestId : Nat = 1;
  var nextReferralId : Nat = 1;
  var nextLandingPageId : Nat = 1;
  var nextContactInterestId : Nat = 1;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  var stripeConfig : ?Stripe.StripeConfiguration = null;

  // Persistent Site Content State (Admin Configurable)
  var persistentSiteContent : ?SiteContent = null;

  // Site content is publicly readable so frontend components (WhatsApp button,
  // PaymentGateway, etc.) can fetch it without authentication.
  public query func getPersistentSiteContent() : async ?SiteContent {
    persistentSiteContent;
  };

  // Only admins may update site content.
  public shared ({ caller }) func setPersistentSiteContent(content : SiteContent) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can set site content");
    };
    persistentSiteContent := ?content;
  };

  // Contact Interest (Inquiry) Management
  // Anyone (including guests) may submit a contact/interest form.
  public shared ({ caller }) func submitContactInterest(
    name : Text,
    phone : Text,
    email : Text,
    message : Text,
  ) : async () {
    let newContact : ContactInterest = {
      id = nextContactInterestId;
      name;
      phone;
      email;
      message;
      createdAt = Time.now();
      resolved = false;
    };
    contactInterests.add(nextContactInterestId, newContact);
    nextContactInterestId += 1;
  };

  // Only admins may view all contact inquiries.
  public query ({ caller }) func getAllContactInterests() : async [ContactInterest] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can view contact interests");
    };
    contactInterests.values().toArray();
  };

  // Only admins may mark an inquiry as resolved.
  public shared ({ caller }) func markContactResolved(contactId : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can resolve contacts");
    };
    switch (contactInterests.get(contactId)) {
      case (null) { Runtime.trap("Contact interest not found") };
      case (?contact) {
        let updatedContact = { contact with resolved = true };
        contactInterests.add(contactId, updatedContact);
      };
    };
  };

  // Publicly readable – the frontend needs to know whether Stripe is set up.
  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  // Only admins may configure Stripe credentials.
  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfig := ?config;
  };

  func getStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  // Session status can be queried publicly (session IDs are opaque tokens).
  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfig(), sessionId, transform);
  };

  // Only authenticated users may create a checkout session.
  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create checkout sessions");
    };
    if (isUserBlocked(caller)) {
      Runtime.trap("Unauthorized: User is blocked");
    };
    await Stripe.createCheckoutSession(getStripeConfig(), caller, items, successUrl, cancelUrl, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  private func isUserBlocked(userId : Principal) : Bool {
    switch (users.get(userId)) {
      case (?user) { user.blocked };
      case (null) { false };
    };
  };

  // Anyone (including guests) may register a new account.
  public shared ({ caller }) func registerUser(
    name : Text,
    email : Text,
    phone : Text,
    referrerId : ?Principal,
  ) : async () {
    switch (users.get(caller)) {
      case (null) {
        let newUser : UserProfile = {
          principal = caller;
          name;
          email;
          phone;
          role = #user;
          createdAt = Time.now();
          blocked = false;
          profilePhotoUrl = null;
        };
        users.add(caller, newUser);

        switch (referrerId) {
          case (?referrer) {
            let newReferral : Referral = {
              id = nextReferralId;
              referrerId = referrer;
              referredUserId = caller;
              packageId = 0;
              commissionAmount = 0;
              commissionType = #active;
              createdAt = Time.now();
              status = #pending;
            };
            referrals.add(nextReferralId, newReferral);
            nextReferralId += 1;
          };
          case (null) {};
        };
      };
      case (?_) { Runtime.trap("User already registered") };
    };
  };

  // Only authenticated, non-blocked users may upload their own profile photo.
  public shared ({ caller }) func uploadProfilePhoto(blob : Storage.ExternalBlob) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can upload profile photos");
    };
    if (isUserBlocked(caller)) {
      Runtime.trap("Unauthorized: User is blocked");
    };

    switch (users.get(caller)) {
      case (null) { Runtime.trap("User not found") };
      case (?user) {
        let photoUrl = "profile_photos/" # caller.toText();
        let updatedUser = { user with profilePhotoUrl = ?photoUrl };
        users.add(caller, updatedUser);
        photoUrl;
      };
    };
  };

  // Only admins may grant the Platinum package to a user by e-mail.
  public shared ({ caller }) func assignPlatinumPackageByEmail(targetEmail : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can assign packages");
    };

    switch (users.entries().find(func((_, user)) { user.email == targetEmail })) {
      case (null) { Runtime.trap("User with email " # targetEmail # " not found") };
      case (?entry) {
        let (userId, _user) = entry;
        let platinumPackage = packages.values().toArray().find(func(pkg) { pkg.name == "Platinum" });
        switch (platinumPackage) {
          case (null) { Runtime.trap("Platinum package not found") };
          case (?pkg) {
            recordPlatinumPurchase(userId, pkg.id);
          };
        };
      };
    };
  };

  func recordPlatinumPurchase(userId : Principal, packageId : Nat) {
    let newPayment : Payment = {
      id = nextPaymentId;
      userId;
      packageId;
      transactionId = "PLATINUM_GRANT";
      status = #approved;
      createdAt = Time.now();
    };
    payments.add(nextPaymentId, newPayment);
    nextPaymentId += 1;
  };

  // A user may only fetch their own profile.
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    users.get(caller);
  };

  // A user may view their own profile; admins may view any profile.
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    users.get(user);
  };

  // A user may only save their own profile.
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    if (isUserBlocked(caller)) {
      Runtime.trap("Unauthorized: User is blocked");
    };
    users.add(caller, profile);
  };

  // A user may only update their own profile.
  public shared ({ caller }) func updateProfile(name : Text, phone : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update profiles");
    };
    if (isUserBlocked(caller)) {
      Runtime.trap("Unauthorized: User is blocked");
    };
    switch (users.get(caller)) {
      case (null) { Runtime.trap("User not found") };
      case (?user) {
        let updatedUser = { user with name; phone };
        users.add(caller, updatedUser);
      };
    };
  };

  // Only admins may list all users.
  public query ({ caller }) func getAllUsers() : async [UserProfile] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all users");
    };
    users.values().toArray();
  };

  // Only admins may block or unblock a user.
  public shared ({ caller }) func toggleUserBlock(userId : Principal) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can block/unblock users");
    };
    switch (users.get(userId)) {
      case (null) { Runtime.trap("User not found") };
      case (?user) {
        let updatedUser = { user with blocked = not user.blocked };
        users.add(userId, updatedUser);
      };
    };
  };

  // Only admins may delete a user.
  public shared ({ caller }) func deleteUser(userId : Principal) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete users");
    };
    users.remove(userId);
  };

  // Only admins may view platform statistics.
  public query ({ caller }) func getAdminStats() : async AdminStats {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view stats");
    };
    let totalUsers = users.size();
    let allPayments = payments.values().toArray();
    let completedPayments = allPayments.filter(
      func(payment : Payment) : Bool { payment.status == #approved }
    );
    let totalSales = completedPayments.size();
    let totalRevenue = completedPayments.foldLeft(
      0,
      func(acc : Nat, payment : Payment) : Nat {
        switch (packages.get(payment.packageId)) {
          case (?package) { acc + package.price };
          case (null) { acc };
        };
      },
    );
    let pendingPayments = allPayments.filter(
      func(payment : Payment) : Bool { payment.status == #pending }
    ).size();

    {
      totalUsers;
      totalSales;
      totalRevenue;
      pendingPayments;
    };
  };

  // Package listings are publicly readable so guests can browse available courses.
  public query func getAllPackages() : async [Package] {
    packages.values().toArray();
  };

  // Active packages are publicly readable.
  public query func getActivePackages() : async [Package] {
    packages.values().toArray().filter(
      func(pkg : Package) : Bool { pkg.status == #active }
    );
  };

  // Only admins may create packages.
  public shared ({ caller }) func createPackage(name : Text, price : Nat, courses : Text) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create packages");
    };
    let packageId = nextPackageId;
    nextPackageId += 1;
    let newPackage : Package = {
      id = packageId;
      name;
      price;
      courses;
      status = #active;
    };
    packages.add(packageId, newPackage);
    packageId;
  };

  // Only admins may update packages.
  public shared ({ caller }) func updatePackage(packageId : Nat, name : Text, price : Nat, courses : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update packages");
    };
    switch (packages.get(packageId)) {
      case (null) { Runtime.trap("Package not found") };
      case (?pkg) {
        let updatedPackage = { pkg with name; price; courses };
        packages.add(packageId, updatedPackage);
      };
    };
  };

  // Only admins may delete packages.
  public shared ({ caller }) func deletePackage(packageId : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete packages");
    };
    packages.remove(packageId);
  };

  // Only admins may toggle a package's active/inactive status.
  public shared ({ caller }) func togglePackageStatus(packageId : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can toggle package status");
    };
    switch (packages.get(packageId)) {
      case (null) { Runtime.trap("Package not found") };
      case (?pkg) {
        let newStatus = switch (pkg.status) {
          case (#active) { #inactive };
          case (#inactive) { #active };
        };
        let updatedPackage = { pkg with status = newStatus };
        packages.add(packageId, updatedPackage);
      };
    };
  };

  // Only authenticated, non-blocked users may create a payment record.
  public shared ({ caller }) func createPayment(
    packageId : Nat,
    transactionId : Text,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create payments");
    };
    if (isUserBlocked(caller)) {
      Runtime.trap("Unauthorized: User is blocked");
    };
    switch (packages.get(packageId)) {
      case (null) { Runtime.trap("Package not found") };
      case (?_) {};
    };
    let paymentId = nextPaymentId;
    nextPaymentId += 1;
    let newPayment : Payment = {
      id = paymentId;
      userId = caller;
      packageId;
      transactionId;
      status = #pending;
      createdAt = Time.now();
    };
    payments.add(paymentId, newPayment);
    paymentId;
  };

  // Only authenticated, non-blocked users may submit a payment proof.
  public shared ({ caller }) func submitPaymentProof(
    packageId : Nat,
    transactionId : Text,
    screenshotBlob : Storage.ExternalBlob,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit payment proofs");
    };
    if (isUserBlocked(caller)) {
      Runtime.trap("Unauthorized: User is blocked");
    };

    switch (packages.get(packageId)) {
      case (null) { Runtime.trap("Package not found") };
      case (?_) {};
    };

    let paymentProofId = nextPaymentProofId;
    nextPaymentProofId += 1;

    let newPaymentProof : PaymentProof = {
      id = paymentProofId;
      userId = caller;
      packageId;
      transactionId;
      status = #pending;
      screenshotBlob;
      createdAt = Time.now();
    };

    paymentProofs.add(paymentProofId, newPaymentProof);
    paymentProofId;
  };

  // Only admins may view all payment proofs.
  public query ({ caller }) func getAllPaymentProofs() : async [PaymentProof] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all payment proofs");
    };
    paymentProofs.values().toArray();
  };

  // Only admins may filter payment proofs by status.
  public query ({ caller }) func getPaymentProofsByStatus(status : PaymentStatus) : async [PaymentProof] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can filter payment proofs");
    };
    paymentProofs.values().toArray().filter(
      func(proof : PaymentProof) : Bool { proof.status == status }
    );
  };

  // Only admins may view an individual payment proof.
  public query ({ caller }) func getPaymentProof(proofId : Nat) : async ?PaymentProof {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view payment proofs");
    };
    paymentProofs.get(proofId);
  };

  // Only admins may update the status of a payment proof.
  public shared ({ caller }) func updatePaymentProofStatus(proofId : Nat, status : PaymentStatus) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update payment proof status");
    };
    switch (paymentProofs.get(proofId)) {
      case (null) { Runtime.trap("Payment proof not found") };
      case (?proof) {
        let updatedProof = { proof with status };
        paymentProofs.add(proofId, updatedProof);
      };
    };
  };

  // Only admins may approve a payment proof.
  public shared ({ caller }) func approvePaymentProof(proofId : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can approve payment proofs");
    };
    switch (paymentProofs.get(proofId)) {
      case (null) { Runtime.trap("Payment proof not found") };
      case (?proof) {
        let updatedProof = { proof with status = #approved };
        paymentProofs.add(proofId, updatedProof);
      };
    };
  };

  // Only admins may reject a payment proof.
  public shared ({ caller }) func rejectPaymentProof(proofId : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can reject payment proofs");
    };
    switch (paymentProofs.get(proofId)) {
      case (null) { Runtime.trap("Payment proof not found") };
      case (?proof) {
        let updatedProof = { proof with status = #rejected };
        paymentProofs.add(proofId, updatedProof);
      };
    };
  };

  // Only admins may update a payment's status.
  public shared ({ caller }) func updatePaymentStatus(paymentId : Nat, status : PaymentStatus) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update payment status");
    };
    switch (payments.get(paymentId)) {
      case (null) { Runtime.trap("Payment not found") };
      case (?payment) {
        let updatedPayment = { payment with status };
        payments.add(paymentId, updatedPayment);
      };
    };
  };

  // Only admins may approve a payment.
  public shared ({ caller }) func approvePayment(paymentId : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can approve payments");
    };
    switch (payments.get(paymentId)) {
      case (null) { Runtime.trap("Payment not found") };
      case (?payment) {
        let updatedPayment = { payment with status = #approved };
        payments.add(paymentId, updatedPayment);
      };
    };
  };

  // Only admins may reject a payment.
  public shared ({ caller }) func rejectPayment(paymentId : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can reject payments");
    };
    switch (payments.get(paymentId)) {
      case (null) { Runtime.trap("Payment not found") };
      case (?payment) {
        let updatedPayment = { payment with status = #rejected };
        payments.add(paymentId, updatedPayment);
      };
    };
  };

  // Only admins may list all payments.
  public query ({ caller }) func getAllPayments() : async [Payment] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all payments");
    };
    payments.values().toArray();
  };

  // Only admins may filter payments by status.
  public query ({ caller }) func getPaymentsByStatus(status : PaymentStatus) : async [Payment] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can filter payments");
    };
    payments.values().toArray().filter(
      func(payment : Payment) : Bool { payment.status == status }
    );
  };

  // A user may view their own payments; admins may view any user's payments.
  public query ({ caller }) func getPaymentsByUser(userId : Principal) : async [Payment] {
    if (caller != userId and not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Can only view your own payments");
    };
    payments.values().toArray().filter(
      func(payment : Payment) : Bool { payment.userId == userId }
    );
  };

  // A user may view their own payments.
  public query ({ caller }) func getMyPayments() : async [Payment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their payments");
    };
    payments.values().toArray().filter(
      func(payment : Payment) : Bool { payment.userId == caller }
    );
  };

  // A user may view their own payment proofs.
  public query ({ caller }) func getMyPaymentProofs() : async [PaymentProof] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their payment proofs");
    };
    paymentProofs.values().toArray().filter(
      func(proof : PaymentProof) : Bool { proof.userId == caller }
    );
  };

  // A user may view their own earnings; admins may view any user's earnings.
  public query ({ caller }) func getEarnings(userId : Principal) : async Earnings {
    if (caller != userId and not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Can only view your own earnings");
    };
    switch (userEarnings.get(userId)) {
      case (?earnings) { earnings };
      case (null) { { today = 0; weekly = 0; monthly = 0; lifetime = 0 } };
    };
  };

  // Only admins may record a purchase on behalf of a user.
  public shared ({ caller }) func recordPurchase(userId : Principal, amount : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can record purchases");
    };

    let _currentTime = Time.now();
    let currentEarnings = switch (userEarnings.get(userId)) {
      case (?earnings) { earnings };
      case (null) { { today = 0; weekly = 0; monthly = 0; lifetime = 0 } };
    };

    let updatedEarnings : Earnings = {
      today = currentEarnings.today + amount;
      weekly = currentEarnings.weekly + amount;
      monthly = currentEarnings.monthly + amount;
      lifetime = currentEarnings.lifetime + amount;
    };

    userEarnings.add(userId, updatedEarnings);
  };

  // Only authenticated, non-blocked users may create a withdrawal request.
  public shared ({ caller }) func createWithdrawalRequest(amount : Nat, message : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create withdrawal requests");
    };
    if (isUserBlocked(caller)) {
      Runtime.trap("Unauthorized: User is blocked");
    };

    let requestId = nextWithdrawalRequestId;
    nextWithdrawalRequestId += 1;

    let newRequest : WithdrawalRequest = {
      id = requestId;
      userId = caller;
      amount;
      message;
      status = #pending;
      createdAt = Time.now();
    };

    withdrawalRequests.add(requestId, newRequest);
    requestId;
  };

  // A user may view their own withdrawal requests; admins may view any user's.
  public query ({ caller }) func getWithdrawalRequests(userId : Principal) : async [WithdrawalRequest] {
    if (caller != userId and not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Can only view your own withdrawal requests");
    };
    withdrawalRequests.values().toArray().filter(
      func(request : WithdrawalRequest) : Bool { request.userId == userId }
    );
  };

  // Only admins may list all withdrawal requests.
  public query ({ caller }) func getAllWithdrawalRequests() : async [WithdrawalRequest] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all withdrawal requests");
    };
    withdrawalRequests.values().toArray();
  };

  // Only admins may approve or reject a withdrawal request.
  public shared ({ caller }) func updateRequestStatus(requestId : Nat, status : WithdrawalRequestStatus) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update withdrawal request status");
    };

    switch (withdrawalRequests.get(requestId)) {
      case (null) { Runtime.trap("Withdrawal request not found") };
      case (?request) {
        let updatedRequest = { request with status };
        withdrawalRequests.add(requestId, updatedRequest);
      };
    };
  };

  // Only authenticated, non-blocked users may create a landing page.
  public shared ({ caller }) func createLandingPage(title : Text, content : Text, template : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create landing pages");
    };
    if (isUserBlocked(caller)) {
      Runtime.trap("Unauthorized: User is blocked");
    };

    let pageId = nextLandingPageId;
    nextLandingPageId += 1;

    let newPage : LandingPage = {
      id = pageId;
      userId = caller;
      title;
      content;
      template;
      createdAt = Time.now();
      updatedAt = Time.now();
      visitCount = 0;
    };

    landingPages.add(pageId, newPage);
    pageId;
  };

  // The owner of a landing page or an admin may update it.
  public shared ({ caller }) func updateLandingPage(pageId : Nat, title : Text, content : Text) : async () {
    switch (landingPages.get(pageId)) {
      case (null) { Runtime.trap("Landing page not found") };
      case (?page) {
        if (page.userId != caller and not (AccessControl.isAdmin(accessControlState, caller))) {
          Runtime.trap("Unauthorized: Cannot edit this landing page");
        };
        if (page.userId == caller and isUserBlocked(caller)) {
          Runtime.trap("Unauthorized: User is blocked");
        };

        let updatedPage = {
          page with
          title;
          content;
          updatedAt = Time.now();
        };

        landingPages.add(pageId, updatedPage);
      };
    };
  };

  // A user may list their own landing pages; admins may list any user's pages.
  public query ({ caller }) func getLandingPages(userId : Principal) : async [LandingPage] {
    if (caller != userId and not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Can only view your own landing pages");
    };
    landingPages.values().toArray().filter(
      func(page : LandingPage) : Bool { page.userId == userId }
    );
  };

  // The owner or an admin may fetch a specific landing page (authenticated view).
  public query ({ caller }) func getLandingPage(pageId : Nat) : async ?LandingPage {
    switch (landingPages.get(pageId)) {
      case (null) { null };
      case (?page) {
        if (page.userId != caller and not (AccessControl.isAdmin(accessControlState, caller))) {
          Runtime.trap("Unauthorized: Can only view your own landing pages");
        };
        ?page;
      };
    };
  };

  // Public read of a landing page by ID (used for public-facing landing page URLs).
  public query func getLandingPageById(pageId : Nat) : async ?LandingPage {
    landingPages.get(pageId);
  };

  // The owner or an admin may delete a landing page.
  public shared ({ caller }) func deleteLandingPage(pageId : Nat) : async () {
    switch (landingPages.get(pageId)) {
      case (null) { Runtime.trap("Landing page not found") };
      case (?page) {
        if (page.userId != caller and not (AccessControl.isAdmin(accessControlState, caller))) {
          Runtime.trap("Unauthorized: Cannot delete this landing page");
        };
        if (page.userId == caller and isUserBlocked(caller)) {
          Runtime.trap("Unauthorized: User is blocked");
        };
        landingPages.remove(pageId);
      };
    };
  };

  // Anyone may increment the visit counter for a public landing page.
  public shared ({ caller }) func incrementLandingPageVisit(pageId : Nat) : async () {
    switch (landingPages.get(pageId)) {
      case (null) { Runtime.trap("Landing page not found") };
      case (?page) {
        let updatedPage = { page with visitCount = page.visitCount + 1 };
        landingPages.add(pageId, updatedPage);
      };
    };
  };

  // A user may view their own referrals; admins may view any user's referrals.
  public query ({ caller }) func getReferralsByUser(userId : Principal) : async [Referral] {
    if (caller != userId and not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Can only view your own referrals");
    };
    referrals.values().toArray().filter(
      func(referral : Referral) : Bool { referral.referrerId == userId }
    );
  };

  // A user may view their own commission totals; admins may view any user's.
  public query ({ caller }) func getTotalCommissions(userId : Principal) : async {
    totalActive : Nat;
    totalPassive : Nat;
    pending : Nat;
  } {
    if (caller != userId and not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Can only view your own commissions");
    };

    let userReferrals = referrals.values().toArray().filter(
      func(referral : Referral) : Bool { referral.referrerId == userId }
    );

    var totalActive = 0;
    var totalPassive = 0;
    var pending = 0;

    for (referral in userReferrals.values()) {
      switch (referral.status) {
        case (#approved) {
          switch (referral.commissionType) {
            case (#active) { totalActive += referral.commissionAmount };
            case (#passive) { totalPassive += referral.commissionAmount };
          };
        };
        case (#pending) { pending += referral.commissionAmount };
        case (#paid) {
          switch (referral.commissionType) {
            case (#active) { totalActive += referral.commissionAmount };
            case (#passive) { totalPassive += referral.commissionAmount };
          };
        };
      };
    };

    {
      totalActive;
      totalPassive;
      pending;
    };
  };
};
