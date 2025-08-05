"use client";

import Button from "../atoms/Button";
import { mergeClassNames } from "@/utils/classNames";
import { usePathname, useRouter } from "next/navigation";
import { PiRankingFill, PiRankingLight } from "react-icons/pi";
import {
  IoHomeOutline,
  IoHome,
  IoSettingsOutline,
  IoSettings,
} from "react-icons/io5";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const options = [
    {
      router: "/ranking",
      name: "ranking",
      icon: {
        active: <PiRankingFill size={24} />,
        inactive: <PiRankingLight size={24} />,
      },
    },
    {
      router: "/",
      name: "home",
      icon: {
        active: <IoHome size={24} />,
        inactive: <IoHomeOutline size={24} />,
      },
    },
    {
      router: "/settings",
      name: "settings",
      icon: {
        active: <IoSettings size={24} />,
        inactive: <IoSettingsOutline size={24} />,
      },
    },
  ];

  const onClickButton = (path: string) => {
    if (path !== pathname) {
      router.push(path);
    }
  };

  return (
    <div
      className={mergeClassNames(
        "fixed left-1/2 -translate-x-1/2 bottom-4",
        "flex gap-8 p-4 rounded-full",
        "text-white text-sm bg-violet-900 z-40"
      )}
    >
      {options.map((option, index) => {
        const isActive = pathname === option.router;

        return (
          <Button
            variant="primary"
            onClick={() => onClickButton(option.router)}
            key={index}
            className={mergeClassNames(
              "w-12 h-12 flex items-center justify-center rounded-full transition-all ease-in duration-300",
              isActive ? "bg-violet-500" : "bg-transparent"
            )}
          >
            {isActive ? option.icon.active : option.icon.inactive}
          </Button>
        );
      })}
    </div>
  );
}
