import Button from "@/components/atoms/Button";
import InputLabel from "@/components/atoms/InputLabel";
import InputText from "@/components/atoms/InputText";
import Modal from "@/components/molecules/Modal";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { updateUser } from "@/services/user";

interface ListNameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditUserModal({ isOpen, onClose }: ListNameModalProps) {
  const { user, setUser } = useUser();

  if (!user) {
    return null;
  }

  const [name, setName] = useState<string>(user.name || "");

  const handleOnCancel = () => onClose();

  const handleOnConfirm = async () => {
    await updateUser(user.uid, { name });

    setUser({ ...user, name });

    onClose();
  };

  const isNameEqual = user.name === name;
  const isNameEmpty = name.length <= 0;

  useEffect(() => {}, [isOpen]);

  return (
    <Modal isOpen={isOpen} title="Edit user">
      <InputLabel text="Name" className="text-violet-900">
        <InputText
          placeholder={"Type your name"}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </InputLabel>

      <div className="flex flex-row justify-between gap-4 mt-4">
        <Button type="button" variant="secondary" onClick={handleOnCancel}>
          Cancel
        </Button>
        <Button
          type="button"
          variant="primary"
          disabled={isNameEqual || isNameEmpty}
          onClick={handleOnConfirm}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
}
