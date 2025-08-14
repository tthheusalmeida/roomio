import { render, screen, act } from "@testing-library/react";
import CountdownTimer from "./CountdownTimer";

jest.useFakeTimers();

describe("CountdownTimer", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it("renders initial time correctly", () => {
    render(<CountdownTimer initialMinutes={1} />);
    expect(screen.getByText("01:00")).toBeInTheDocument();
  });

  it("calls onProgress as time passes", () => {
    const onProgress = jest.fn();
    render(<CountdownTimer initialMinutes={1} onProgress={onProgress} />);

    act(() => {
      jest.advanceTimersByTime(30000); // 30s
    });

    const lastCall = onProgress.mock.calls[onProgress.mock.calls.length - 1][0];
    expect(lastCall).toBeCloseTo(50, 0);
  });

  it("calls onFinish when countdown reaches zero", () => {
    const onFinish = jest.fn();
    render(<CountdownTimer initialMinutes={0.05} onFinish={onFinish} />); // 3s

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(onFinish).toHaveBeenCalled();
  });

  it("updates displayed time correctly", () => {
    render(<CountdownTimer initialMinutes={0.05} />); // ~3s

    expect(screen.getByText("00:03")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("00:02")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("00:01")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("00:00")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<CountdownTimer initialMinutes={1} />);
    expect(container).toMatchSnapshot();
  });
});
