"use client";

import GoogleButton from "@/components/atoms/GoogleButton";
import SplashScreen from "@/components/atoms/SplashScreen";
import { normalizeUser, useUser } from "@/contexts/UserContext";
import { AuthUser, googleSignIn } from "@/services/auth";
import LoginWrapperTemplate from "@/templates/LoginWrapperTemplate";
import { FirebaseError } from "firebase/app";
import { OAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginTemplate() {
  const router = useRouter();
  const { user, isLoadingUser, setUser } = useUser();

  const handleLoginSuccess = ({ result, credential }: AuthUser) => {
    setUser(
      normalizeUser({
        ...result.user,
        accessToken: credential?.accessToken,
      })
    );
  };

  const handleLoginException = (error: FirebaseError) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The AuthCredential type that was used.
    const credential = OAuthProvider.credentialFromError(error);

    console.error("Error signing in:", errorCode, errorMessage, credential);
  };

  const handleLoginGoogle = () => {
    googleSignIn().then(handleLoginSuccess).catch(handleLoginException);
  };

  useEffect(() => {
    if (!isLoadingUser && user) {
      router.push("/");
    }
  }, [user, isLoadingUser, router]);

  if (isLoadingUser) {
    return <SplashScreen />;
  }

  return (
    <LoginWrapperTemplate
      content={
        <>
          <span className="text-xs text-center text-gray-500 mt-4">
            escolha uma opção de login
          </span>

          <GoogleButton onClick={handleLoginGoogle} isFull={true} />
        </>
      }
    ></LoginWrapperTemplate>
  );
}
