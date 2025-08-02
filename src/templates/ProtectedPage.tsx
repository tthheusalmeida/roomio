"use client";

import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { mergeClassNames } from "@/utils/classNames";

export default function ProtectedPage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { user, isLoadingUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingUser && !user) {
      router.replace("/login");
    }
  }, [user, isLoadingUser, router]);

  if (isLoadingUser) return null;

  if (!user) return null;

  return <div className={mergeClassNames(className)}>{children}</div>;
}
