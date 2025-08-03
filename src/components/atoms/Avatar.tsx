import { mergeClassNames } from "@/utils/classNames";
import Image from "next/image";

interface AvatarProps {
  src: string;
  alt?: string;
  name: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

interface SizeInterface {
  width: number;
  height: number;
}

const SIZES: Record<string, SizeInterface> = {
  small: {
    width: 28,
    height: 28,
  },
  medium: {
    width: 52,
    height: 52,
  },
  large: {
    width: 120,
    height: 120,
  },
};

export default function Avatar({
  src,
  alt,
  name,
  size = "small",
  className,
}: AvatarProps) {
  const { width, height } = SIZES[size];
  const description = alt ? alt : `${name} avatar`;

  return (
    <Image
      src={src as string}
      alt={description}
      width={width}
      height={height}
      className={mergeClassNames("rounded-full relative self-start", className)}
    />
  );
}
