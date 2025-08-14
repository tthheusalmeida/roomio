import { render, screen, fireEvent, act } from "@testing-library/react";
import Button from "./Button";
import { VscLoading } from "react-icons/vsc";

// Mock do ícone para facilitar testes
jest.mock("react-icons/vsc", () => ({
  VscLoading: (props: any) => <span data-testid="loading-icon" {...props} />,
}));

describe("Button component", () => {
  it("renders with children text", () => {
    const { asFragment } = render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("applies variant, size, shadow and isFull classes", () => {
    render(
      <Button variant="primary" size="small" shadow isFull={false}>
        Test
      </Button>
    );
    const btn = screen.getByText("Test").closest("button");
    expect(btn).toHaveClass("bg-violet-900"); // primary variant
    expect(btn).toHaveClass("px-2 py-1"); // small size
    expect(btn).toHaveClass("shadow-md"); // shadow
    expect(btn).not.toHaveClass("w-full"); // isFull false
  });

  it("shows loading state correctly", () => {
    render(
      <Button variant="secondary" isLoading>
        Loading
      </Button>
    );

    const children = screen.getByText("Loading");
    expect(children).toHaveClass("invisible");

    expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
  });

  it("calls onClick and triggers pulsing animation", () => {
    jest.useFakeTimers();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    const btn = screen.getByText("Click").closest("button")!;

    act(() => {
      fireEvent.click(btn);
    });

    expect(handleClick).toHaveBeenCalled();
    expect(btn).toHaveClass("pulse-once");

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(btn).not.toHaveClass("pulse-once");

    jest.useRealTimers();
  });
});
