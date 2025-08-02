"use client";

import InputText from "@/components/atoms/InputText";
import { checkEmailIsValid } from "@/utils/validation";
import { useEffect, useState } from "react";

interface InputEmailProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onValidChange?: (isValid: boolean) => void;
}

export default function InputEmail({
  onValidChange,
  type = "email",
  className,
  ...props
}: InputEmailProps) {
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState("");

  const isEmail = type === "email";
  const isValid = !isEmail || checkEmailIsValid(value);
  const showError = touched && !isValid;

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (!touched) setTouched(true);
    props.onChange?.(event);
  };

  const handlerBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    props.onBlur?.(event);
  };

  useEffect(() => {
    onValidChange?.(isValid);
  }, [isValid, onValidChange]);

  return (
    <InputText
      {...props}
      type="email"
      value={value}
      onChange={handlerChange}
      onBlur={handlerBlur}
      placeholder="Digite seu e-mail"
      className={[
        className,
        showError
          ? "border-red-400 focus:ring-red-400 focus:border-red-400"
          : "",
      ].join(" ")}
    />
  );
}
