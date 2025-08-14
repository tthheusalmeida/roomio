import { render, screen } from "@testing-library/react";
import InputText from "./InputText";

describe("InputText component", () => {
  it("renders an input element", () => {
    const { asFragment } = render(<InputText placeholder="Enter name" />);

    const input = screen.getByPlaceholderText("Enter name");
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe("INPUT");

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies disabled prop and related classes", () => {
    render(<InputText disabled placeholder="Disabled input" />);

    const input = screen.getByPlaceholderText("Disabled input");
    expect(input).toBeDisabled();
    expect(input).toHaveClass("disabled:bg-slate-200", "cursor-not-allowed");
  });

  it("applies extra classes passed via className", () => {
    const { asFragment } = render(
      <InputText className="extra-class" placeholder="Custom class" />
    );

    const input = screen.getByPlaceholderText("Custom class");
    expect(input).toHaveClass("extra-class");

    expect(asFragment()).toMatchSnapshot();
  });
});
