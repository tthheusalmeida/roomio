import { render, screen } from "@testing-library/react";
import ConnectedPlayer from "./ConnectedPlayer";

describe("ConnectedPlayer component", () => {
  it("renders the player name and indicator", () => {
    const { asFragment } = render(<ConnectedPlayer name="Matheus" />);

    expect(screen.getByText("Matheus")).toBeInTheDocument();

    const indicator = screen.getByText("Matheus").previousSibling;
    expect(indicator).toHaveClass("w-2 h-2 rounded-full border bg-green-500");

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies extra classes passed via className", () => {
    const { asFragment } = render(
      <ConnectedPlayer name="Matheus" className="extra-class" />
    );

    const container = screen.getByText("Matheus").parentElement;
    expect(container).toHaveClass("flex", "items-center", "gap-2");
    expect(container).toHaveClass("extra-class");

    expect(asFragment()).toMatchSnapshot();
  });
});
