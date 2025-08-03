import { mergeClassNames } from "@/utils/classNames";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function Title({ children, className }: TitleProps) {
  return (
    <>
      <h1 className={mergeClassNames("font-bold text-5xl my-8", className)}>
        {children}
      </h1>
    </>
  );
}
