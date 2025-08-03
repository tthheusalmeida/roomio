import { getFirebaseApp, getDatabase } from "@/libs/firebase";
import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  collection,
} from "firebase/firestore";

export interface UserDocument {
  id: string | null;
  name: string | null;
  createdAt: number | null;
}

export function getFirebaseAuth() {
  return getFirestore(getFirebaseApp());
}

function getCollection() {
  return collection(getDatabase(), "users");
}

function throwErrorIfUserNull(userId: string) {
  if (!userId) {
    throw new Error("User ID is required");
  }
}

function getDocRef(uid: string) {
  return doc(getCollection(), uid);
}

export async function getUser(uid: string): Promise<UserDocument | null> {
  throwErrorIfUserNull(uid);

  const ref = getDocRef(uid);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as UserDocument) : null;
}

export async function createUser(uid: string, data: UserDocument) {
  throwErrorIfUserNull(uid);

  const ref = getDocRef(uid);
  await setDoc(ref, data);
}

export async function updateUser(uid: string, data: Partial<UserDocument>) {
  throwErrorIfUserNull(uid);

  const ref = getDocRef(uid);
  return updateDoc(ref, data);
}
