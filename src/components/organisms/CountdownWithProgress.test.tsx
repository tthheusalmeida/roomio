import { render, screen, act } from "@testing-library/react";
import CountdownWithProgress from "./CountdownWithProgress";

jest.useFakeTimers();

describe("CountdownWithProgress", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it("renders both ProgressBar and CountdownTimer by default", () => {
    render(<CountdownWithProgress initialMinutes={0.05} />);

    const progressBar = screen.getByText("0%").closest("div");
    expect(progressBar).toBeInTheDocument();

    expect(screen.getByText(/00:0[1-3]/)).toBeInTheDocument();
  });

  it("renders only ProgressBar when mode is 'bar'", () => {
    render(<CountdownWithProgress initialMinutes={1} mode="bar" />);

    const progressBar = screen.getByText("0%").closest("div");
    expect(progressBar).toBeInTheDocument();

    expect(screen.queryByText(/:/)).not.toBeInTheDocument();
  });

  it("renders only CountdownTimer when mode is 'timer'", () => {
    render(<CountdownWithProgress initialMinutes={1} mode="timer" />);

    expect(screen.queryByText(/%/)).not.toBeInTheDocument();

    expect(screen.getByText("01:00")).toBeInTheDocument();
  });

  it("updates progress and calls onFinish", () => {
    const onFinish = jest.fn();
    render(<CountdownWithProgress initialMinutes={0.05} onFinish={onFinish} />);

    // Avança tempo
    act(() => {
      jest.advanceTimersByTime(1500);
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(onFinish).toHaveBeenCalled();
  });

  it("matches snapshot", () => {
    const { container } = render(<CountdownWithProgress initialMinutes={1} />);
    expect(container).toMatchSnapshot();
  });
});
