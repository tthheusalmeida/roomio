import { render, screen } from "@testing-library/react";
import Subtitle from "./Subtitle";

describe("Subtitle component", () => {
  it("renders the children text correctly", () => {
    const { asFragment } = render(<Subtitle>My Subtitle</Subtitle>);

    const heading = screen.getByText("My Subtitle");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies extra classes passed via className", () => {
    const { asFragment } = render(
      <Subtitle className="extra-class">My Subtitle</Subtitle>
    );

    const heading = screen.getByText("My Subtitle");
    expect(heading).toHaveClass("extra-class");

    expect(asFragment()).toMatchSnapshot();
  });
});
