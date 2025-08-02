import { MdMoreVert } from "react-icons/md";

interface ContextMenuProps {
  className?: string;
  onClick?: () => void;
}

export default function ContextMenu({
  className = "",
  onClick,
}: ContextMenuProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={["-mr-2 text-neutral-400", className].join(" ")}
    >
      <MdMoreVert size={24} />
    </button>
  );
}
