"use client";

import { mergeClassNames } from "@/utils/classNames";
import Button from "../atoms/Button";
import { IoMdCopy } from "react-icons/io";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface RoomAndPasswordProps {
  className?: string;
}

export default function RoomAndPassword({ className }: RoomAndPasswordProps) {
  const path = usePathname();
  const paths = path.split("/");
  const room = paths[paths.length - 1];

  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    const fullUrl = `${window.location.origin}${path}`;

    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <div
      className={mergeClassNames(
        className,
        "mt-6 flex flex-col gap-6 p-4 bg-violet-900 rounded-lg"
      )}
    >
      <div className="flex gap-4 items-start justify-between">
        <div className="flex flex-col gap-2">
          <h4 className="text-base font-semibold">Room code to enter</h4>
          <p className="text-sm leading-4">
            Copy and share the room code with your friends
          </p>
        </div>

        <div className="relative">
          <Button
            className="w-12 h-12"
            variant="secondary"
            onClick={() => copyToClipboard()}
          >
            <IoMdCopy size={24} />
          </Button>
          {copied && (
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-xs text-white bg-black px-2 py-1 rounded transition-all duration-200">
              Copied!
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 justify-center items-center bg-violet-500 p-2 rounded">
        <span className="text-sm self-start">Room</span>
        <h3 className="font-medium">{room}</h3>
      </div>
    </div>
  );
}
