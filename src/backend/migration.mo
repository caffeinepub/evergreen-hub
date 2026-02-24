import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
  type Role = {
    #user;
    #admin;
  };

  type OldUserProfile = {
    principal : Principal;
    name : Text;
    email : Text;
    phone : Text;
    role : Role;
    createdAt : Int;
    blocked : Bool;
  };

  type OldActor = {
    users : Map.Map<Principal, OldUserProfile>;
  };

  type NewUserProfile = {
    principal : Principal;
    name : Text;
    email : Text;
    phone : Text;
    role : Role;
    createdAt : Int;
    blocked : Bool;
    profilePhotoUrl : ?Text;
  };

  type NewActor = {
    users : Map.Map<Principal, NewUserProfile>;
  };

  public func run(old : OldActor) : NewActor {
    let users = old.users.map<Principal, OldUserProfile, NewUserProfile>(
      func(_id, user) {
        { user with profilePhotoUrl = null };
      }
    );
    {
      users;
    };
  };
};
