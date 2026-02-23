import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

module {
  type Role = {
    #user;
    #admin;
  };

  type PaymentStatus = {
    #pending;
    #approved;
    #rejected;
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

  type Payment = {
    id : Nat;
    userId : Principal;
    packageId : Nat;
    transactionId : Text;
    status : PaymentStatus;
    createdAt : Int;
  };

  type OldActor = {
    users : Map.Map<Principal, UserProfile>;
    packages : Map.Map<Nat, Package>;
    payments : Map.Map<Nat, Payment>;
    nextPackageId : Nat;
    nextPaymentId : Nat;
  };

  type PaymentProof = {
    id : Nat;
    userId : Principal;
    packageId : Nat;
    transactionId : Text;
    status : PaymentStatus;
    screenshotBlob : Blob;
    createdAt : Int;
  };

  public func run(old : OldActor) : OldActor {
    old;
  };
};
