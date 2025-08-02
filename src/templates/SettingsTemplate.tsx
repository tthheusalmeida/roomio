"use client";

import Title from "@/components/atoms/Title";
import Button from "@/components/atoms/Button";
import { IconAndText } from "@/components/molecules/IconAndText";
import { useUser } from "@/contexts/UserContext";
import { ImExit } from "react-icons/im";

export default function SettingsTemplate() {
  const { signOut } = useUser();

  return (
    <div className="w-full flex flex-col min-h-dvh">
      <Title>Settings</Title>

      <Button variant="secondary" onClick={() => signOut()}>
        <IconAndText
          text="Sair"
          iconOnStart
          icon={{ component: ImExit, size: 21 }}
        />
      </Button>
    </div>
  );
}
