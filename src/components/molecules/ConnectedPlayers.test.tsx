import { render, screen } from "@testing-library/react";
import ConnectedPlayers from "./ConnectedPlayers";
// import ConnectedPlayer from "../atoms/ConnectedPlayer";
// import LoadingLabel from "../atoms/LoadingLabel";

jest.mock("../atoms/ConnectedPlayer", () => ({
  __esModule: true,
  default: ({ name }: any) => <div data-testid="connected-player">{name}</div>,
}));

jest.mock("../atoms/LoadingLabel", () => ({
  __esModule: true,
  default: ({ label }: any) => <div data-testid="loading-label">{label}</div>,
}));

describe("ConnectedPlayers component", () => {
  it("renders the LoadingLabel", () => {
    render(<ConnectedPlayers players={[]} />);
    const loadingLabel = screen.getByTestId("loading-label");
    expect(loadingLabel).toBeInTheDocument();
    expect(loadingLabel).toHaveTextContent("Waiting for players...");
  });

  it("renders ConnectedPlayer components for each player", () => {
    const players = ["Alice", "Bob"];
    render(<ConnectedPlayers players={players} />);

    const playerElements = screen.getAllByTestId("connected-player");
    expect(playerElements).toHaveLength(2);
    expect(playerElements[0]).toHaveTextContent("Alice");
    expect(playerElements[1]).toHaveTextContent("Bob");
  });

  it("applies extra classes passed via className", () => {
    const { container } = render(
      <ConnectedPlayers players={[]} className="extra-class" />
    );
    expect(container.firstChild).toHaveClass("extra-class");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<ConnectedPlayers players={["Alice"]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
