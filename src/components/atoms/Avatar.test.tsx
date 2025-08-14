import { render, screen } from "@testing-library/react";
import Avatar from "./Avatar";

jest.mock("next/image", () => (props: any) => {
  return <img {...props} />;
});

describe("Avatar component", () => {
  it("renders with default size (small) and automatic alt", () => {
    const { asFragment } = render(<Avatar src="/avatar.png" name="Matheus" />);

    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/avatar.png");
    expect(img).toHaveAttribute("alt", "Matheus avatar");
    expect(img).toHaveAttribute("width", "28");
    expect(img).toHaveAttribute("height", "28");

    expect(asFragment()).toMatchSnapshot();
  });

  it("uses custom alt when provided", () => {
    const { asFragment } = render(
      <Avatar src="/avatar.png" name="Matheus" alt="Profile picture" />
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "Profile picture");

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders in medium size", () => {
    const { asFragment } = render(
      <Avatar src="/avatar.png" name="Matheus" size="medium" />
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("width", "52");
    expect(img).toHaveAttribute("height", "52");

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies extra classes passed via className", () => {
    const { asFragment } = render(
      <Avatar src="/avatar.png" name="Matheus" className="extra-class" />
    );
    const img = screen.getByRole("img");
    expect(img.className).toMatch(/extra-class/);

    expect(asFragment()).toMatchSnapshot();
  });
});
