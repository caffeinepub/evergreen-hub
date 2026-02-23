import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";



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

  let users = Map.empty<Principal, UserProfile>();
  let packages = Map.empty<Nat, Package>();
  let payments = Map.empty<Nat, Payment>();
  let paymentProofs = Map.empty<Nat, PaymentProof>();

  var nextPackageId : Nat = 1;
  var nextPaymentId : Nat = 1;
  var nextPaymentProofId : Nat = 1;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  include MixinStorage();

  system func preupgrade() { };
  system func postupgrade() { };

  private func isUserBlocked(userId : Principal) : Bool {
    switch (users.get(userId)) {
      case (?user) { user.blocked };
      case (null) { false };
    };
  };

  public shared ({ caller }) func registerUser(name : Text, email : Text, phone : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can register");
    };

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
        };
        users.add(caller, newUser);
      };
      case (?_) { Runtime.trap("User already registered") };
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    users.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    users.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    if (isUserBlocked(caller)) {
      Runtime.trap("Unauthorized: User is blocked");
    };
    users.add(caller, profile);
  };

  public shared ({ caller }) func updateProfile(name : Text, phone : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
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

  public query ({ caller }) func getAllUsers() : async [UserProfile] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all users");
    };
    users.values().toArray();
  };

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

  public shared ({ caller }) func deleteUser(userId : Principal) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete users");
    };
    users.remove(userId);
  };

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

  public query ({ caller }) func getAllPackages() : async [Package] {
    packages.values().toArray();
  };

  public query ({ caller }) func getActivePackages() : async [Package] {
    packages.values().toArray().filter(
      func(pkg : Package) : Bool { pkg.status == #active }
    );
  };

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

  public shared ({ caller }) func deletePackage(packageId : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete packages");
    };
    packages.remove(packageId);
  };

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

  public query ({ caller }) func getAllPaymentProofs() : async [PaymentProof] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all payment proofs");
    };
    paymentProofs.values().toArray();
  };

  public query ({ caller }) func getPaymentProofsByStatus(status : PaymentStatus) : async [PaymentProof] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can filter payment proofs");
    };
    paymentProofs.values().toArray().filter(
      func(proof : PaymentProof) : Bool { proof.status == status }
    );
  };

  public query ({ caller }) func getPaymentProof(proofId : Nat) : async ?PaymentProof {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view payment proofs");
    };
    paymentProofs.get(proofId);
  };

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

  public query ({ caller }) func getAllPayments() : async [Payment] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all payments");
    };
    payments.values().toArray();
  };

  public query ({ caller }) func getPaymentsByStatus(status : PaymentStatus) : async [Payment] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can filter payments");
    };
    payments.values().toArray().filter(
      func(payment : Payment) : Bool { payment.status == status }
    );
  };

  public query ({ caller }) func getPaymentsByUser(userId : Principal) : async [Payment] {
    if (caller != userId and not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Can only view your own payments");
    };
    payments.values().toArray().filter(
      func(payment : Payment) : Bool { payment.userId == userId }
    );
  };

  public query ({ caller }) func getMyPayments() : async [Payment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their payments");
    };
    payments.values().toArray().filter(
      func(payment : Payment) : Bool { payment.userId == caller }
    );
  };

  public query ({ caller }) func getMyPaymentProofs() : async [PaymentProof] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their payment proofs");
    };
    paymentProofs.values().toArray().filter(
      func(proof : PaymentProof) : Bool { proof.userId == caller }
    );
  };
};
