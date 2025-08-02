import { getFirebaseApp } from "@/libs/firebase";
import {
  getAuth,
  GoogleAuthProvider,
  isSignInWithEmailLink,
  OAuthCredential,
  OAuthProvider,
  sendSignInLinkToEmail,
  signInWithEmailLink,
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

export async function appleSignIn(): Promise<AuthUser> {
  const auth = getFirebaseAuth();
  const provider = new OAuthProvider("apple.com");

  const result = await signInWithPopup(auth, provider);

  return normalizeResult(result);
}

export function checkIfUserIsSignInWithEmailLink(): boolean {
  const url = window.location.href;

  return isSignInWithEmailLink(getAuth(), url);
}

export async function trySignInWithEmailLink(email: string) {
  const url = window.location.href;

  return signInWithEmailLink(getAuth(), email, url);
}

export async function trySendSignInLinkToEmail(email: string) {
  const actionCodeSettings = {
    url: `${window.location.origin}/login/email`,
    handleCodeInApp: true,
  };

  await sendSignInLinkToEmail(getAuth(), email, actionCodeSettings);
}

export function getEmailForSignIn(): string {
  return window.localStorage.getItem("emailForSignIn") || "";
}

export function setEmailForSignIn(email: string): void {
  window.localStorage.setItem("emailForSignIn", email);
}

export function removeEmailForSignIn(): void {
  window.localStorage.removeItem("emailForSignIn");
}

export async function getFreshToken(): Promise<string | null> {
  const auth = getFirebaseAuth();
  const user = auth.currentUser;

  if (!user) return null;

  return await user.getIdToken(true);
}
