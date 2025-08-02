import { mergeClassNames } from "@/utils/classNames";
import { ReactNode } from "react";

export default function InputLabel({
  text,
  children,
  className,
}: {
  text: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={mergeClassNames(`my-4 ${className}`)}>
      <span className="block font-semibold my-2">{text}</span>
      {children}
    </label>
  );
}
