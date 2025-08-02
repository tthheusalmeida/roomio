"use client";

import { getFirebaseAuth } from "@/services/auth";
import { User as FirebaseUser, UserInfo } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  signOut: () => void;
  isLoadingUser: boolean;
}

interface User {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  accessToken: string | null;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  signOut: () => {},
  isLoadingUser: true,
});

export function useUser() {
  return useContext(UserContext);
}

export interface NormalizeUserProps extends UserInfo {
  accessToken?: string;
}
export const normalizeUser = (user: NormalizeUserProps): User | null => {
  if (!user) {
    return null;
  }

  return {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    accessToken: user.accessToken ?? null,
  };
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const auth = getFirebaseAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(
      async (userData: FirebaseUser | null) => {
        if (!userData) {
          setUser(null);
          setIsLoadingUser(false);
          return;
        }

        const accessToken = await userData.getIdToken();
        setUser(normalizeUser({ ...userData, accessToken }));
        setIsLoadingUser(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const signOut = () => {
    setUser(null);
    setIsLoadingUser(true); // <- Isso garante que telas aguardem novo estado
    auth.signOut().finally(() => setIsLoadingUser(false));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        signOut,
        isLoadingUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
