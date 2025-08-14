import { render, screen } from "@testing-library/react";
import SectionTitle from "./SectionTitle";

describe("SectionTitle component", () => {
  it("renders the title text correctly", () => {
    const { asFragment } = render(<SectionTitle title="My Section" />);

    const heading = screen.getByText("My Section");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");

    expect(asFragment()).toMatchSnapshot();
  });
});
