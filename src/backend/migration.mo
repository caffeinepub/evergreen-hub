import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";

module {
  type OldActor = {
    users : Map.Map<Principal, { principal : Principal; name : Text; email : Text; phone : Text; role : { #user; #admin }; createdAt : Int; blocked : Bool }>;
    packages : Map.Map<Nat, { id : Nat; name : Text; price : Nat; courses : Text; status : { #active; #inactive } }>;
    payments : Map.Map<Nat, { id : Nat; userId : Principal; packageId : Nat; transactionId : Text; status : { #pending; #approved; #rejected }; createdAt : Int }>;
    paymentProofs : Map.Map<Nat, { id : Nat; userId : Principal; packageId : Nat; transactionId : Text; status : { #pending; #approved; #rejected }; screenshotBlob : Storage.ExternalBlob; createdAt : Int }>;
    nextPaymentId : Nat;
    nextPackageId : Nat;
    nextPaymentProofId : Nat;
  };

  type NewActor = {
    users : Map.Map<Principal, { principal : Principal; name : Text; email : Text; phone : Text; role : { #user; #admin }; createdAt : Int; blocked : Bool }>;
    packages : Map.Map<Nat, { id : Nat; name : Text; price : Nat; courses : Text; status : { #active; #inactive } }>;
    payments : Map.Map<Nat, { id : Nat; userId : Principal; packageId : Nat; transactionId : Text; status : { #pending; #approved; #rejected }; createdAt : Int }>;
    paymentProofs : Map.Map<Nat, { id : Nat; userId : Principal; packageId : Nat; transactionId : Text; status : { #pending; #approved; #rejected }; screenshotBlob : Storage.ExternalBlob; createdAt : Int }>;
    userEarnings : Map.Map<Principal, { today : Nat; weekly : Nat; monthly : Nat; lifetime : Nat }>;
    withdrawalRequests : Map.Map<Nat, { id : Nat; userId : Principal; amount : Nat; message : Text; status : { #pending; #approved; #rejected }; createdAt : Int }>;
    landingPages : Map.Map<Nat, { id : Nat; userId : Principal; title : Text; content : Text; template : Text; createdAt : Int; updatedAt : Int }>;
    nextPaymentId : Nat;
    nextPackageId : Nat;
    nextPaymentProofId : Nat;
    nextWithdrawalRequestId : Nat;
    nextLandingPageId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    let newPaymentProofs = old.paymentProofs.map<Nat, { id : Nat; userId : Principal; packageId : Nat; transactionId : Text; status : { #pending; #approved; #rejected }; screenshotBlob : Storage.ExternalBlob; createdAt : Int }, { id : Nat; userId : Principal; packageId : Nat; transactionId : Text; status : { #pending; #approved; #rejected }; screenshotBlob : Storage.ExternalBlob; createdAt : Int }>(
      func(_id, oldProof) {
        oldProof;
      }
    );

    {
      old with
      paymentProofs = newPaymentProofs;
      userEarnings = Map.empty();
      withdrawalRequests = Map.empty();
      landingPages = Map.empty();
      nextWithdrawalRequestId = 1;
      nextLandingPageId = 1;
    };
  };
};
