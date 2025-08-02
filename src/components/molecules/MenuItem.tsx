interface MenuItemProps {
  label: string;
  onClick: () => void;
}

export default function MenuItem({ label, onClick }: MenuItemProps) {
  return (
    <li
      onClick={onClick}
      className="text-gray-500 font-normal hover:bg-gray-100 w-full p-2 rounded-sm cursor-pointer"
    >
      {label}
    </li>
  );
}
