import { FcGoogle } from "react-icons/fc";
import Button, { ButtonProps } from "./Button";

export default function GoogleButton(props: ButtonProps) {
  return (
    <Button
      shadow
      className="bg-violet-950 text-white hover:enabled:opacity-80"
      {...props}
    >
      <FcGoogle size={24} />
      <span>Entrar com o Google</span>
    </Button>
  );
}
