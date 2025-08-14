import { render, screen, fireEvent } from "@testing-library/react";
import SettingsButton from "./SettingsButton";
import { IoIosArrowForward } from "react-icons/io";

jest.mock("./Button", () => ({
  __esModule: true,
  default: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

jest.mock("react-icons/io", () => ({
  IoIosArrowForward: (props: any) => <span data-testid="icon" {...props} />,
}));

describe("SettingsButton component", () => {
  it("renders the icon and label", () => {
    const { asFragment } = render(
      <SettingsButton
        onClick={() => {}}
        label="Next"
        icon={IoIosArrowForward}
      />
    );

    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(
      <SettingsButton
        onClick={handleClick}
        label="Next"
        icon={IoIosArrowForward}
      />
    );

    const button = screen.getByText("Next").closest("button")!;
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });
});
