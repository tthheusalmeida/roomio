import { IoIosArrowForward } from "react-icons/io";
import Button from "./Button";
import { IconType } from "react-icons";

interface SettingsButtonProps {
  onClick: Function;
  label: string;
  icon: IconType;
}

export default function SettingsButton({
  onClick,
  label,
  icon: Icon,
}: SettingsButtonProps) {
  return (
    <Button variant="secondary" onClick={() => onClick()}>
      <div className="flex gap-4 items-center min-w-[50dvw]">
        <Icon size={24} />
        {label}
      </div>
    </Button>
  );
}
