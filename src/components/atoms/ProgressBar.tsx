interface ProgressBarProps {
  value: number; // de 0 a 100
  height?: string;
  color?: string;
  showLabel?: boolean;
}

export default function ProgressBar({
  value,
  height = "h-2",
  color = "bg-blue-500",
  showLabel = false,
}: ProgressBarProps) {
  return (
    <div className={`w-full bg-gray-200 rounded ${height} overflow-hidden`}>
      <div
        className={`transition-all duration-300 ${color} ${height}`}
        style={{ width: `${value}%` }}
      />
      {showLabel && (
        <p className="text-sm text-center text-gray-500 mt-1">
          {Math.round(value)}%
        </p>
      )}
    </div>
  );
}
