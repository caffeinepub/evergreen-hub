import { useQueryClient } from "@tanstack/react-query";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { UserProfile } from "../backend";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface AuthContextType {
  isAuthenticated: boolean;
  isInitializing: boolean;
  userProfile: UserProfile | null;
  isAdmin: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    login: iiLogin,
    clear,
    identity,
    isInitializing: iiInitializing,
  } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const queryClient = useQueryClient();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  const isAuthenticated = !!identity;
  const isInitializing = iiInitializing || actorFetching || profileLoading;

  const refreshProfile = async () => {
    if (!actor || !identity) {
      setUserProfile(null);
      setIsAdmin(false);
      return;
    }

    try {
      setProfileLoading(true);
      const [profile, adminStatus] = await Promise.all([
        actor.getCallerUserProfile(),
        actor.isCallerAdmin(),
      ]);
      setUserProfile(profile);
      setIsAdmin(adminStatus);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setUserProfile(null);
      setIsAdmin(false);
    } finally {
      setProfileLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: refreshProfile is intentionally omitted to prevent infinite loop
  useEffect(() => {
    if (isAuthenticated && actor && !actorFetching) {
      refreshProfile();
    } else if (!isAuthenticated) {
      setUserProfile(null);
      setIsAdmin(false);
    }
  }, [isAuthenticated, actor, actorFetching]);

  const login = async () => {
    try {
      await iiLogin();
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.message === "User is already authenticated") {
        await clear();
        setTimeout(() => iiLogin(), 300);
      }
      throw error;
    }
  };

  const logout = async () => {
    await clear();
    queryClient.clear();
    setUserProfile(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitializing,
        userProfile,
        isAdmin,
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
