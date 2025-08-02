"use client";

import { ComponentType } from "react";

interface IconConfig {
  component?: ComponentType<{ size?: number; className?: string }>;
  size?: number;
}

interface IconAndTextProps {
  icon?: IconConfig;
  text?: string;
  iconOnStart?: boolean;
}

export function IconAndText({
  icon,
  text,
  iconOnStart = true,
}: IconAndTextProps) {
  const { component: IconComponent, size: IconSize, ...iconProps } = icon ?? {};

  const iconElement = IconComponent ? (
    <IconComponent size={IconSize ?? 20} {...iconProps} />
  ) : null;

  return (
    <div className="flex justify-center gap-4 items-center">
      {iconOnStart && iconElement}
      {text && <span className="text-sm font-normal">{text}</span>}
      {!iconOnStart && iconElement}
    </div>
  );
}
