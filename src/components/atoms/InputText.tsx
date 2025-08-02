"use client";
import { mergeClassNames } from "@/utils/classNames";

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function InputText({ className, ...props }: InputTextProps) {
  return (
    <input
      className={mergeClassNames(
        "w-full h-10 rounded border border-slate-300",
        "px-4 py-2",
        "text-base text-gray-600 caret-slate-600",
        "placeholder-gray-400",
        "outline-none transition-all duration-300",
        "focus:ring-1 focus:ring-slate-400 focus:border-slate-400",
        props?.disabled ? "disabled:bg-slate-200 cursor-not-allowed" : "",
        className ?? "",
      )}
      {...props}
    />
  );
}
