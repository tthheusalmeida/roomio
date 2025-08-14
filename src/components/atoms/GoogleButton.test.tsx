import { render, screen, fireEvent } from "@testing-library/react";
import GoogleButton from "./GoogleButton";
import Button, { ButtonProps } from "./Button";

jest.mock("react-icons/fc", () => ({
  FcGoogle: (props: any) => <span data-testid="google-icon" {...props} />,
}));

jest.mock("./Button", () => ({
  __esModule: true,
  default: ({ children, isLoading, onClick }: ButtonProps) => (
    <button onClick={onClick}>
      {isLoading && <span data-testid="loading-icon" />}
      {children}
    </button>
  ),
}));

describe("GoogleButton component", () => {
  it("renders Google icon and text", () => {
    render(<GoogleButton />);
    expect(screen.getByTestId("google-icon")).toBeInTheDocument();
    expect(screen.getByText("Login with Google")).toBeInTheDocument();
  });

  it("passes isLoading prop to Button and shows loading icon", () => {
    render(<GoogleButton isLoading />);

    expect(screen.getByText("Login with Google")).toBeInTheDocument();

    const loadingIcon = screen.getByTestId("loading-icon");
    expect(loadingIcon).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<GoogleButton onClick={handleClick} />);

    const button = screen.getByText("Login with Google").closest("button")!;
    button.click();
    expect(handleClick).toHaveBeenCalled();
  });
});
