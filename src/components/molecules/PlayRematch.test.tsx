import { render, screen, fireEvent } from "@testing-library/react";
import PlayRematch from "./PlayRematch";

// Mock do CountdownWithProgress
jest.mock("../organisms/CountdownWithProgress", () => {
  return ({ onFinish }: { onFinish?: () => void }) => (
    <div data-testid="mock-countdown">
      <button onClick={onFinish}>Finish Countdown</button>
    </div>
  );
});

describe("PlayRematch component", () => {
  it("renders title and buttons", () => {
    render(<PlayRematch onFinish={() => {}} />);
    expect(screen.getByText("Rematch?")).toBeInTheDocument();
    expect(screen.getByText("Yes").closest("button")).toBeInTheDocument();
    expect(screen.getByText("No").closest("button")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<PlayRematch onFinish={() => {}} />);
    expect(container).toMatchSnapshot();
  });

  it("calls onFinish with correct values clicking on NO button should hides YES button", async () => {
    const handleFinish = jest.fn();
    render(<PlayRematch onFinish={handleFinish} />);

    const yesButton = screen.getByText("Yes").closest("button")!;
    const noButton = screen.getByText("No").closest("button")!;

    fireEvent.click(noButton);
    expect(handleFinish).toHaveBeenCalledWith(false);

    const yesBtnUpdated = screen.getByText("Yes").closest("button")!;
    const noBtnUpdated = screen.getByText("No").closest("button")!;

    expect(noBtnUpdated).not.toHaveClass("hidden");
    expect(yesBtnUpdated).toHaveClass("hidden");
  });

  it("calls onFinish with correct values clicking on YES button should hides NO button", async () => {
    const handleFinish = jest.fn();
    render(<PlayRematch onFinish={handleFinish} />);

    const yesButton = screen.getByText("Yes").closest("button")!;
    const noButton = screen.getByText("No").closest("button")!;

    fireEvent.click(yesButton);
    expect(handleFinish).toHaveBeenCalledWith(true);

    const yesBtnUpdated = screen.getByText("Yes").closest("button")!;
    const noBtnUpdated = screen.getByText("No").closest("button")!;

    expect(noBtnUpdated).toHaveClass("hidden");
    expect(yesBtnUpdated).not.toHaveClass("hidden");
  });

  it("calls onFinish when countdown finishes", () => {
    const handleFinish = jest.fn();
    render(<PlayRematch onFinish={handleFinish} />);

    const finishButton = screen.getByText("Finish Countdown");
    fireEvent.click(finishButton);

    expect(handleFinish).toHaveBeenCalledWith(false);
  });
});
