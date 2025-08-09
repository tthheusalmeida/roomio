"use client";

import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoadingUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingUser && !user) {
      const pathname = window.location.pathname;

      const gameRouteMatch = pathname.match(/^\/game\/[^/]+\/[^/]+$/);

      if (gameRouteMatch) {
        sessionStorage.setItem("redirectAfterLogin", pathname);
      }

      router.replace("/login");
    }
  }, [user, isLoadingUser, router]);

  if (isLoadingUser) return null;

  if (!user) return null;

  return <>{children}</>;
}
