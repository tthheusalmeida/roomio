"use client";

import { useUser } from "@/contexts/UserContext";
import { mergeClassNames } from "@/utils/classNames";

import Avatar from "@/components/atoms/Avatar";
import Subtitle from "@/components/atoms/Subtitle";
import Loading from "@/components/atoms/Loading";
import SettingsButton from "@/components/atoms/SettingsButton";
import AvatarLabel from "@/components/atoms/AvatarLabel";
import EditUserModal from "@/components/organisms/EditUserModal";
import { ImExit } from "react-icons/im";
import { MdEdit } from "react-icons/md";

import { useState } from "react";
import { timestampToDate } from "@/utils/date";

export default function SettingsTemplate() {
  const { user, signOut } = useUser();

  if (!user)
    return (
      <div className="flex flex-col w-full h-full items-center justify-center">
        <Loading />
      </div>
    );

  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);

  console.log(user);

  const userData = [
    {
      label: "Name",
      data: user.name,
      showLabel: false,
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
      className: "pt-4",
    },
    {
      label: "CreatedAt",
      data: timestampToDate(user.createdAt as number),
      showLabel: true,
    },
  ];

  const actions = [
    {
      label: "Edit",
      icon: MdEdit,
      onCLick: () => setIsOpenEditModal(true),
    },
    {
      label: "Log out",
      icon: ImExit,
      onCLick: signOut,
    },
  ];

  return (
    <>
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
              label={`${label}`}
              data={data as string}
              showLabel={showLabel as boolean}
              className={mergeClassNames(
                className,
                showLabel ? "self-start" : "self-center"
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

      <EditUserModal
        isOpen={isOpenEditModal}
        onClose={() => setIsOpenEditModal(false)}
      />
    </>
  );
}
