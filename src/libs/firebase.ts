// Import the functions you need from the SDKs you need
import { getAnalytics, logEvent } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

export function getFirebaseApp() {
  if (getApps().length) {
    return getApp();
  }

  return initializeApp(firebaseConfig);
}

export function getFirebaseAnalytics() {
  if (typeof window === "undefined") {
    return;
  }

  return getAnalytics(getFirebaseApp());
}

export function getDatabase() {
  return getFirestore(getFirebaseApp());
}

export function trackEvent(
  eventName: string,
  eventParams?: {
    [key: string]: string | number | boolean | object | unknown;
  }
) {
  const analytics = getFirebaseAnalytics();

  if (!analytics) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[ANALYTICS HELPER] you`re trying to register an event in server"
      );
    }

    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[ANALYTICS HELPER] tracked event:", eventName, eventParams);
    return;
  }

  logEvent(analytics, eventName, eventParams);
}
