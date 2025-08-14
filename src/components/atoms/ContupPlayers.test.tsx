import { render, screen } from "@testing-library/react";
import CountupPlayers from "./CountupPlayers";
import Title from "./Title";

jest.mock("./Title", () => ({ children, className }: any) => (
  <div data-testid="title" className={className}>
    {children}
  </div>
));

describe("CountupPlayers component", () => {
  it("applies extra classes passed via className", () => {
    const { asFragment } = render(
      <CountupPlayers current={3} max={8} className="extra-class" />
    );

    const title = screen.getByTestId("title");
    expect(title).toHaveClass(
      "text-4xl",
      "font-medium",
      "flex",
      "items-center",
      "justify-center",
      "h-24"
    );
    expect(title).toHaveClass("extra-class");

    expect(asFragment()).toMatchSnapshot();
  });
});
