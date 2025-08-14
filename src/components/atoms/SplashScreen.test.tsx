import { render, screen } from "@testing-library/react";
import SplashScreen from "./SplashScreen";

jest.mock("./LoadingLogo", () => ({
  __esModule: true,
  default: () => <div data-testid="loading-logo" />,
}));

describe("SplashScreen component", () => {
  it("renders the container and LoadingLogo", () => {
    const { asFragment } = render(<SplashScreen />);

    const container = screen.getByTestId("loading-logo").parentElement;
    expect(container).toHaveClass(
      "h-dvh",
      "w-dvw",
      "flex",
      "items-center",
      "justify-center",
      "bg-violet-900"
    );

    expect(screen.getByTestId("loading-logo")).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
});
