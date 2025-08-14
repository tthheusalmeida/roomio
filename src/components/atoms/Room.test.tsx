import { render, screen } from "@testing-library/react";
import Room from "./Room";

describe("Room component", () => {
  it("renders the label text correctly", () => {
    const { asFragment } = render(<Room label="10:00" />);

    const heading = screen.getByText("10:00");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H4");

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies extra classes passed via className", () => {
    const { asFragment } = render(
      <Room label="10:00" className="extra-class" />
    );

    const heading = screen.getByText("10:00");
    expect(heading).toHaveClass("extra-class");

    expect(asFragment()).toMatchSnapshot();
  });
});
