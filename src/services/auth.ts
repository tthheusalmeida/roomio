import { getFirebaseApp } from "@/libs/firebase";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthCredential,
  OAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";

export interface AuthUser {
  result: UserCredential;
  credential: OAuthCredential | null;
}

export function getFirebaseAuth() {
  return getAuth(getFirebaseApp());
}

const normalizeResult = (result: UserCredential): AuthUser => {
  const credential = OAuthProvider.credentialFromResult(result);

  return { result, credential };
};

export async function googleSignIn(): Promise<AuthUser> {
  const auth = getFirebaseAuth();
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);

  return normalizeResult(result);
}
