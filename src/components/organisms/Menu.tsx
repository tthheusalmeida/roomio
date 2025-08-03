import MenuList, { MenuItemData } from "@/components/molecules/MenuList";
import { mergeClassNames } from "@/utils/classNames";
import React, { useEffect, useRef, useState } from "react";

interface MenuProps {
  className?: string;
  items: MenuItemData[];
  renderTrigger: (props: { onClick: () => void }) => React.ReactNode;
}

export default function Menu({ className, items, renderTrigger }: MenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const componentClasses = [
    "relative inline-block",
    className ? className : "",
  ].join("");

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={mergeClassNames(componentClasses)} ref={menuRef}>
      {renderTrigger({ onClick: toggleMenu })}

      {open && (
        <div className="absolute right-0 w-48 bg-var(--color-foreground)border border-gray-200 shadow-lg rounded-md rounded-tr-none z-10 max-w-36">
          <MenuList
            items={items}
            onItemClick={(item) => {
              item.onClick?.();
              closeMenu();
            }}
          />
        </div>
      )}
    </div>
  );
}
