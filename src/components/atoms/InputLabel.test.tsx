import { render, screen } from "@testing-library/react";
import InputLabel from "./InputLabel";

describe("InputLabel component", () => {
  it("renders text and children correctly", () => {
    const { asFragment } = render(
      <InputLabel text="Username">
        <input />
      </InputLabel>
    );

    expect(screen.getByText("Username")).toBeInTheDocument();

    expect(screen.getByRole("textbox")).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders character counter correctly", () => {
    const { asFragment } = render(
      <InputLabel text="Bio" currentInput="Hello" maxInput={10}>
        <input />
      </InputLabel>
    );

    expect(screen.getByText("5/10")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("applies error classes when input exceeds maxInput", () => {
    render(
      <InputLabel text="Bio" currentInput="Hello World" maxInput={5}>
        <input />
      </InputLabel>
    );

    const counter = screen.getByText("11/5");
    expect(counter).toHaveClass("text-red-500", "font-bold");
  });

  it("applies extra classes passed via className", () => {
    const { asFragment } = render(
      <InputLabel text="Name" className="extra-class">
        <input />
      </InputLabel>
    );

    const label = screen.getByText("Name").closest("label");
    expect(label).toHaveClass("my-4", "block", "extra-class");

    expect(asFragment()).toMatchSnapshot();
  });
});
