import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "./Footer";
import { useRouter, usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("Footer component", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  it("should match snapshot on home page", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot on ranking page", () => {
    (usePathname as jest.Mock).mockReturnValue("/ranking");
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot on settings page", () => {
    (usePathname as jest.Mock).mockReturnValue("/settings");
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it("should render all buttons", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    render(<Footer />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });

  it("should highlight the active button based on pathname", () => {
    (usePathname as jest.Mock).mockReturnValue("/ranking");
    render(<Footer />);
    const buttons = screen.getAllByRole("button");

    // first button = ranking (active)
    expect(buttons[0]).toHaveClass("bg-violet-500");

    // other buttons inactive
    expect(buttons[1]).toHaveClass("bg-transparent");
    expect(buttons[2]).toHaveClass("bg-transparent");
  });

  it("should call router.push when clicking a non-active button", () => {
    (usePathname as jest.Mock).mockReturnValue("/settings");
    render(<Footer />);
    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[1]); // home
    expect(pushMock).toHaveBeenCalledWith("/");

    fireEvent.click(buttons[0]); // ranking
    expect(pushMock).toHaveBeenCalledWith("/ranking");

    // active button (settings) should not trigger push
    fireEvent.click(buttons[2]);
    expect(pushMock).toHaveBeenCalledTimes(2);
  });
});
