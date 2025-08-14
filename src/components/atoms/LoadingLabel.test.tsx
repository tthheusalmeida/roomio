import { render, screen } from "@testing-library/react";
import LoadingLabel from "./LoadingLabel";

describe("LoadingLabel component", () => {
  it("renders the label text with pulse animation", () => {
    const { asFragment } = render(<LoadingLabel label="Loading..." />);

    const span = screen.getByText("Loading...");
    expect(span).toBeInTheDocument();
    expect(span).toHaveClass("animate-pulse");

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies extra classes passed via className", () => {
    const { asFragment } = render(
      <LoadingLabel label="Loading..." className="extra-class" />
    );

    const span = screen.getByText("Loading...");
    expect(span).toHaveClass("animate-pulse", "extra-class");

    expect(asFragment()).toMatchSnapshot();
  });
});
