"use client";

import { useUser } from "@/contexts/UserContext";
import { mergeClassNames } from "@/utils/classNames";
import { useRouter } from "next/navigation";

import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import Container from "@/components/atoms/Container";

import { useEffect } from "react";

export default function PageTemplate({
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
      router.push("/login");
    }
  }, [isLoadingUser, user]);

  if (isLoadingUser || !user) return null;

  return (
    <>
      <Header />
      <Container className={mergeClassNames("pb-4", className)}>
        {children}
      </Container>
      <Footer />
    </>
  );
}
