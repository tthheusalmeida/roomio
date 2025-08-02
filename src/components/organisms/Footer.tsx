"use client";

import Button from "../atoms/Button";
import { mergeClassNames } from "@/utils/classNames";
import { useUser } from "@/contexts/UserContext";
import { useState } from "react";

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
  const route = useRouter();
  const { user } = useUser();
  const [isMoving, setIsMoving] = useState(false);

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
    route.push(path);
  };

  const activeIndex = options.findIndex((option) => pathname === option.router);

  return (
    <div
      className={mergeClassNames(
        "fixed left-1/2 -translate-x-1/2 bottom-4",
        "flex gap-8 p-4 rounded-full",
        "text-white text-sm bg-violet-950 z-40"
      )}
    >
      <div
        className={mergeClassNames(
          "w-12 h-12 bg-violet-500 rounded-full absolute top-4 left-4 transition-transform duration-300 ease-out",
          isMoving ? "animate-pulseScale" : "scale-100"
        )}
        style={{
          transform: `translateX(${activeIndex * 80}px)`,
        }}
      />

      {options.map((option, index) => {
        const isActive = pathname === option.router;

        return (
          <Button
            variant="primary"
            onClick={() => onClickButton(option.router)}
            key={index}
            className={mergeClassNames(
              "w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 bg-transparent"
            )}
          >
            {isActive ? option.icon.active : option.icon.inactive}
          </Button>
        );
      })}
    </div>
  );
}
