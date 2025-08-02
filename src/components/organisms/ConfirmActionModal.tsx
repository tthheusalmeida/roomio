"use client";

import Button from "@/components/atoms/Button";
import Modal from "@/components/atoms/Modal";

interface ConfirmActionProps {
  isOpen: boolean;
  expanded?: boolean;
  title?: string;
  message?: React.ReactNode | string;
  onConfirm?: (confirm: boolean) => void;
  onCancel?: (confirm: boolean) => void;
}

export default function ConfirmActionModal({
  isOpen = false,
  expanded = false,
  title = "",
  message = "",
  onConfirm,
  onCancel,
}: ConfirmActionProps) {
  const handleOnConfirm = () => {
    if (onConfirm) {
      onConfirm(true);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel(false);
    }
  };

  return (
    <Modal isOpen={isOpen} expanded={expanded} title={title}>
      <div className={`${expanded ? "h-screen -my-4 py-4" : ""} flex flex-col`}>
        <div className="flex flex-col justify-center gap-4 mb-4">
          <span className="text-gray-700 text-sm transition-opacity duration-600 min-h-14 opacity-100">
            {message}
          </span>
        </div>

        <div className="flex gap-4">
          <Button variant="secondary" onClick={handleCancel} isFull={true}>
            Cancelar
          </Button>

          <Button variant="primary" onClick={handleOnConfirm} isFull={true}>
            Confirmar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
