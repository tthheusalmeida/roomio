import { render, screen } from "@testing-library/react";
import LoadingLogo from "./LoadingLogo";

describe("Loading component", () => {
  it("renders the LoadingLabel with correct text and classes", () => {
    const { asFragment } = render(<LoadingLogo />);

    const label = screen.getByText("Room.io");
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("animate-pulse", "font-bold", "text-6xl");

    expect(asFragment()).toMatchSnapshot();
  });
});
