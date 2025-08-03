import { FcGoogle } from "react-icons/fc";
import Button, { ButtonProps } from "./Button";

export default function GoogleButton(props: ButtonProps) {
  return (
    <Button
      shadow
      className="bg-[var(--color-foreground)] text-violet-950 hover:enabled:opacity-80"
      {...props}
    >
      <FcGoogle size={24} />
      <span>Login with Google</span>
    </Button>
  );
}
