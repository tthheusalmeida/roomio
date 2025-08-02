import { mergeClassNames } from "@/utils/classNames";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={mergeClassNames(`container mx-auto px-4`, className)}>
      {children}
    </div>
  );
}
