import { render, screen } from "@testing-library/react";
import Container from "./Container";

describe("Container component", () => {
  it("renders children correctly", () => {
    const { asFragment } = render(
      <Container>
        <span>Content inside</span>
      </Container>
    );

    expect(screen.getByText("Content inside")).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies extra classes passed via className", () => {
    const { asFragment } = render(
      <Container className="extra-class">
        <span>Content</span>
      </Container>
    );

    const div = screen.getByText("Content").parentElement;
    expect(div).toHaveClass("w-full", "mx-auto", "px-4");
    expect(div).toHaveClass("extra-class");

    expect(asFragment()).toMatchSnapshot();
  });
});
