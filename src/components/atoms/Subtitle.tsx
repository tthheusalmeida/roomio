import { mergeClassNames } from "@/utils/classNames";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function Subtitle({ children, className }: TitleProps) {
  return (
    <>
      <h2 className={mergeClassNames("font-bold text-2xl my-8", className)}>
        {children}
      </h2>
    </>
  );
}
