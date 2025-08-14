import { render, screen } from "@testing-library/react";
import AvatarLabel from "./AvatarLabel";

describe("AvatarLabel component", () => {
  it("renders with label and data by default", () => {
    const { asFragment } = render(<AvatarLabel label="Name" data="Matheus" />);

    expect(screen.getByText(/Name:/)).toBeInTheDocument();
    expect(screen.getByText("Matheus")).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it("does not render label when showLabel is false", () => {
    const { asFragment } = render(
      <AvatarLabel label="Name" data="Matheus" showLabel={false} />
    );

    expect(screen.queryByText(/Name:/)).not.toBeInTheDocument();
    expect(screen.getByText("Matheus")).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies extra classes passed via className", () => {
    const { asFragment } = render(
      <AvatarLabel label="Name" data="Matheus" className="extra-class" />
    );

    const p = screen.getByText(/Matheus/).closest("p");
    expect(p).toHaveClass("extra-class");
    expect(p).toHaveClass("text-violet-300");

    expect(asFragment()).toMatchSnapshot();
  });
});
