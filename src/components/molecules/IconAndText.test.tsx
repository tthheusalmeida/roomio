import { render, screen } from "@testing-library/react";
import { IconAndText } from "./IconAndText";

// Mock de um ícone genérico
const MockIcon = ({ size }: { size?: number }) => (
  <span data-testid="icon" style={{ fontSize: size }}>{`Icon ${size}`}</span>
);

describe("IconAndText component", () => {
  it("renders text correctly", () => {
    const { asFragment } = render(<IconAndText text="Hello" />);
    const textElement = screen.getByText("Hello");
    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe("SPAN");
    expect(textElement).toHaveClass("text-sm font-normal");

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders icon when provided", () => {
    render(<IconAndText icon={{ component: MockIcon, size: 32 }} />);
    const icon = screen.getByTestId("icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle({ fontSize: "32px" });
  });

  it("renders icon before text when iconOnStart is true", () => {
    render(
      <IconAndText icon={{ component: MockIcon }} text="Hello" iconOnStart />
    );
    const container = screen.getByText("Hello").parentElement!;
    expect(container.firstChild).toHaveAttribute("data-testid", "icon");
    expect(container.lastChild).toHaveTextContent("Hello");
  });

  it("renders icon after text when iconOnStart is false", () => {
    render(
      <IconAndText
        icon={{ component: MockIcon }}
        text="Hello"
        iconOnStart={false}
      />
    );
    const container = screen.getByText("Hello").parentElement!;
    expect(container.firstChild).toHaveTextContent("Hello");
    expect(container.lastChild).toHaveAttribute("data-testid", "icon");
  });

  it("matches snapshot with icon and text", () => {
    const { asFragment } = render(
      <IconAndText icon={{ component: MockIcon }} text="Hello" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
