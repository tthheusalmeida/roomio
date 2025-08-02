"use client";

import Title from "@/components/atoms/Title";
import Button from "@/components/atoms/Button";
import { ImExit } from "react-icons/im";
import { useUser } from "@/contexts/UserContext";

export default function SettingsTemplate() {
  const { signOut } = useUser();

  return (
    <div className="w-full flex flex-col">
      <div className="flex w-full justify-between items-center">
        <Title>Settings</Title>

        <Button
          variant="secondary"
          className="w-10 h-10"
          onClick={() => signOut()}
        >
          <ImExit size={24} />
        </Button>
      </div>
    </div>
  );
}
