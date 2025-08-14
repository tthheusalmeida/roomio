import { render, screen, fireEvent } from "@testing-library/react";
import GameCard from "./GameCard";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("GameCard component", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  it("should match snapshot", () => {
    const { container } = render(
      <GameCard
        title="Snapshot Game"
        image="/snapshot.jpg"
        slug="snapshot-game"
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should render title, image and play button", () => {
    render(
      <GameCard
        title="Test Game"
        image="/test.jpg"
        slug="test-game"
        online={5}
      />
    );

    expect(screen.getByText("Test Game")).toBeInTheDocument();
    const image = screen.getByAltText(
      "Test Game game preview"
    ) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("/test.jpg");

    const button = screen.getByRole("button", { name: "Play" });
    expect(button).toBeInTheDocument();
  });

  it("should call router.push with correct path when clicking play button", () => {
    render(<GameCard title="Test Game" image="/test.jpg" slug="test-game" />);

    const button = screen.getByRole("button", { name: "Play" });
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith("/game/test-game");
  });
});
