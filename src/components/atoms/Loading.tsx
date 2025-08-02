interface LoadingProps {
  height?: number;
  width?: number;
}

export default function Loading({ height, width }: LoadingProps) {
  return <div className="animate-pulse font-bold text-6xl">Room.io</div>;
}
