"use client";
import { mergeClassNames } from "@/utils/classNames";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  expanded?: boolean;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  onClose?: () => void;
}

export default function Modal({
  isOpen,
  expanded,
  title,
  children,
  showCloseButton = false,
  onClose,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-200 bg-[var(--color-background)]/50 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={mergeClassNames(`
          relative w-full max-h-full bg-[var(--color-foreground)] shadow-xl overflow-y-auto
          transition-all duration-600 ease-in-out
          transform safe-padding-bottom
          ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
          ${expanded ? "h-full" : "rounded-t-xl"}
        `)}
      >
        {/* Title */}
        {title && (
          <div className="mx-4 my-5 flex justify-between items-center">
            <h2 className="text-sm font-semibold text-gray-700">{title}</h2>

            {showCloseButton && (
              <IoMdClose
                size={24}
                onClick={onClose}
                className="cursor-pointer"
              />
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col flex-1 m-4">{children}</div>
      </div>
    </div>
  );
}
