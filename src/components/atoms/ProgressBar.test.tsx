import { render, screen } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

describe("ProgressBar component", () => {
  it("renders the progress bar with correct width", () => {
    const { container, asFragment } = render(<ProgressBar value={50} />);

    const innerBar = container.firstChild?.firstChild as HTMLElement; // a div interna
    expect(innerBar).toHaveStyle({ width: "50%" });

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies custom height and color", () => {
    const { container, asFragment } = render(
      <ProgressBar value={75} height="h-4" color="bg-red-500" />
    );

    const innerBar = container.firstChild?.firstChild as HTMLElement;
    expect(innerBar).toHaveClass("h-4", "bg-red-500");
    expect(innerBar).toHaveStyle({ width: "75%" });

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders label when showLabel is true", () => {
    render(<ProgressBar value={33} showLabel />);
    expect(screen.getByText("33%")).toBeInTheDocument();
  });

  it("does not render label when showLabel is false", () => {
    render(<ProgressBar value={33} showLabel={false} />);
    expect(screen.queryByText("33%")).not.toBeInTheDocument();
  });
});
