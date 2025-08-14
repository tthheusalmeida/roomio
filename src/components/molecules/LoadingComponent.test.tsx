import { render, screen } from "@testing-library/react";
import LoadingComponent from "./LoadingComponent";

jest.mock("../atoms/LoadingLogo", () => ({
  __esModule: true,
  default: () => <div data-testid="loading-logo" />,
}));

describe("LoadingComponent", () => {
  it("renders the container and LoadingLogo", () => {
    const { asFragment } = render(<LoadingComponent />);

    const logo = screen.getByTestId("loading-logo");
    expect(logo).toBeInTheDocument();

    const container = logo.parentElement;
    expect(container).toHaveClass(
      "flex",
      "flex-col",
      "w-full",
      "h-full",
      "items-center",
      "justify-center"
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
