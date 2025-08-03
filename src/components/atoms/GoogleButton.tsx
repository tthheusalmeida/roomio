import { FcGoogle } from "react-icons/fc";
import Button, { ButtonProps } from "./Button";

export default function GoogleButton(props: ButtonProps) {
  return (
    <Button shadow variant="secondary" {...props}>
      <FcGoogle size={24} />
      <span>Login with Google</span>
    </Button>
  );
}
