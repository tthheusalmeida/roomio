import MenuItem from "@/components/molecules/MenuItem";

export interface MenuItemData {
  label: string;
  onClick?: () => void;
}

interface MenuListProps {
  items: MenuItemData[];
  onItemClick: (item: MenuItemData) => void;
}

export default function MenuList({ items, onItemClick }: MenuListProps) {
  return (
    <ul className="flex flex-col gap-1 m-1">
      {items.map((item, index) => (
        <MenuItem
          key={index}
          label={item.label}
          onClick={() => onItemClick(item)}
        />
      ))}
    </ul>
  );
}
