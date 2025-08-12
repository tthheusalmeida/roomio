"use client";

import GoogleButton from "@/components/atoms/GoogleButton";
import SplashScreen from "@/components/atoms/SplashScreen";
import Title from "@/components/atoms/Title";
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
          <Title className="mb-2 text-center text-violet-100">Room.IO</Title>
          <span className="text-center text-sm text-violet-400 font-semibold pb-16">
            Explore our multiplayer online games platform
          </span>

          <div className="flex flex-col items-center p-4 mb-16">
            <GoogleButton onClick={handleLoginGoogle} isFull={true} />
          </div>
        </>
      }
    ></LoginWrapperTemplate>
  );
}
