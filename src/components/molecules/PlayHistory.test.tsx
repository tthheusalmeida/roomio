import { render, screen } from "@testing-library/react";
import PlayHistory, { Move } from "./PlayHistory";

describe("PlayHistory component", () => {
  const history: Move[] = [
    { x: 0, y: 0, player: "x" },
    { x: 1, y: 1, player: "o" },
    { x: 2, y: 2, player: "x" },
  ];

  it("renders the title", () => {
    render(<PlayHistory history={[]} />);
    expect(screen.getByText("History:")).toBeInTheDocument();
  });

  it("renders moves in reverse order", () => {
    render(<PlayHistory history={history} />);
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(3);

    expect(items[0].textContent).toContain("X played at (3, 3)");
    expect(items[1].textContent).toContain("O played at (2, 2)");
    expect(items[2].textContent).toContain("X played at (1, 1)");
  });

  it("applies highlight class to the last move", () => {
    render(<PlayHistory history={history} />);
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveClass("font-semibold");
    expect(items[0]).toHaveClass("text-white");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<PlayHistory history={history} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
