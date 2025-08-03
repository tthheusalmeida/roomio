"use client";

import Subtitle from "@/components/atoms/Subtitle";
import Button from "@/components/atoms/Button";
import { ImExit } from "react-icons/im";
import { useUser } from "@/contexts/UserContext";
import { IoIosArrowForward } from "react-icons/io";
import Avatar from "@/components/atoms/Avatar";
import InputLabel from "@/components/atoms/InputLabel";
import Loading from "@/components/atoms/Loading";
import SettingsButton from "@/components/atoms/SettingsButton";
import AvatarLabel from "@/components/atoms/AvatarLabel";
import { mergeClassNames } from "@/utils/classNames";

export default function SettingsTemplate() {
  const { user, signOut } = useUser();

  if (!user) return <Loading />;

  const userData = [
    {
      label: "Name",
      data: user.name,
      showLabel: false,
      className: "font-bold font-lg",
    },
    {
      label: "Email",
      data: user.email,
      showLabel: false,
    },
    {
      label: "ID",
      data: user.uid,
      showLabel: true,
    },
  ];

  const actions = [
    {
      label: "Log out",
      icon: ImExit,
      onCLick: signOut,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <Subtitle className="text-violet-100">Settings</Subtitle>

      <div className="flex gap-2">
        <Avatar
          src={user!.photoURL as string}
          name={user!.name as string}
          size="medium"
          className="border-[var(--color-foreground)] border-2"
        />
      </div>

      <div className="mt-4 flex flex-col items-center gap-1 self-baseline w-full">
        {userData.map(({ label, data, showLabel, className }, index) => (
          <AvatarLabel
            key={index}
            label={label}
            data={data as string}
            showLabel={showLabel as boolean}
            className={mergeClassNames(
              userData.length - 1 === index ? "last:pt-4" : ""
            )}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {actions.map(({ label, icon, onCLick }, index) => (
          <SettingsButton
            key={index}
            onClick={onCLick}
            label={label}
            icon={icon}
          />
        ))}
      </div>
    </div>
  );
}
