import { render, screen } from "@testing-library/react";
import Title from "./Title";

describe("Title component", () => {
  it("renders the children text correctly", () => {
    const { asFragment } = render(<Title>Main Title</Title>);

    const heading = screen.getByText("Main Title");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H1");

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies extra classes passed via className", () => {
    const { asFragment } = render(
      <Title className="extra-class">Main Title</Title>
    );

    const heading = screen.getByText("Main Title");
    expect(heading).toHaveClass("extra-class");

    expect(asFragment()).toMatchSnapshot();
  });
});
