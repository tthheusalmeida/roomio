import { render, screen } from "@testing-library/react";
import LoadingIcon from "./LoadingIcon";

jest.mock("react-icons/vsc", () => ({
  VscLoading: (props: any) => <span data-testid="loading-icon" {...props} />,
}));

describe("LoadingIcon component", () => {
  it("renders the loading icon with correct class", () => {
    const { asFragment } = render(<LoadingIcon />);

    const icon = screen.getByTestId("loading-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("animate-spin");

    expect(asFragment()).toMatchSnapshot();
  });
});
