"use client";

import { mergeClassNames } from "@/utils/classNames";

interface LoginWrapperTemplateProps {
  content: React.ReactNode;
  modals?: React.ReactNode;
}

export default function LoginWrapperTemplate({
  content,
  modals,
}: LoginWrapperTemplateProps) {
  return (
    <div className="relative flex flex-col items-center justify-center sm:h-auto w-dvw sm:w-96 mx-auto">
      <div className="w-screen h-[100dvh] sm:h-dvh bg-gradient-to-t from-[#2f0d68] to-[#131416]" />

      <div
        className={mergeClassNames(
          "absolute bottom-0 left-1/2 transform -translate-x-1/2 sm:top-5/12 sm:-translate-y-1/2",
          "h-fit min-h-48",
          "flex flex-col gap-4 justify-center",
          "w-dvw sm:w-96 rounded-b-none rounded-t-lg sm:rounded-lg ",
          "bg-var(--color-foreground) pb-[--safe-area-bottom]"
        )}
      >
        {content}
      </div>

      {modals}
    </div>
  );
}
