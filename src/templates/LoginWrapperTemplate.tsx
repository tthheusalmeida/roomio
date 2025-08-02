"use client";

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
      <div className="w-screen h-[100dvh] sm:h-[40dvh] bg-gradient-to-t from-[#2f0d68] to-[#131416]" />
      <div className="w-screen sm:h-[60dvh] bg-white" />

      <div className="absolute bottom-0 h-fit min-h-48 sm:top-5/12 left-1/2 transform -translate-x-1/2 sm:-translate-y-1/2 flex flex-col gap-4 justify-center p-4 w-dvw sm:w-96 rounded-b-none rounded-t-lg sm:rounded-lg bg-white shadow-[0px_2px_6px_rgba(0,0,0,0.168)] pb-[--safe-area-bottom]">
        {content}
      </div>

      {modals}
    </div>
  );
}
