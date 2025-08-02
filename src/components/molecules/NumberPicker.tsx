import Button from "@/components/atoms/Button";
import { FaMinus, FaPlus } from "react-icons/fa6";

export default function NumberPicker({
  value,
  min,
  onChange,
}: {
  value: number;
  min?: number;
  onChange?: (newValue: number) => void;
}) {
  const disableMinus = !!(min && min >= value);

  const remove = () => onChange && onChange(value - 1);
  const add = () => onChange && onChange(value + 1);

  return (
    <div className="flex flex-row justify-between items-center gap-4 border border-gray-100 rounded h-7">
      <Button
        isFull={false}
        variant="secondary"
        size="small"
        disabled={disableMinus}
        onClick={remove}
      >
        <FaMinus size={12} />
      </Button>
      <span className="text-xs font-medium">{value}</span>
      <Button isFull={false} variant="secondary" size="small" onClick={add}>
        <FaPlus size={12} />
      </Button>
    </div>
  );
}
