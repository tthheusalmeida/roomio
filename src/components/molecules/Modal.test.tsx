import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal component", () => {
  beforeEach(() => {
    document.body.className = "";
  });

  it("renders children correctly", () => {
    render(
      <Modal isOpen={true}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );

    const content = screen.getByTestId("modal-content");
    expect(content).toBeInTheDocument();
  });

  it("adds overflow-hidden to body when open", () => {
    const { rerender } = render(<Modal isOpen={true}>Content</Modal>);
    expect(document.body).toHaveClass("overflow-hidden");

    rerender(<Modal isOpen={false}>Content</Modal>);
    expect(document.body).not.toHaveClass("overflow-hidden");
  });

  it("renders title when provided", () => {
    render(
      <Modal isOpen={true} title="My Modal">
        Content
      </Modal>
    );
    expect(screen.getByText("My Modal")).toBeInTheDocument();
  });

  it("renders close button and calls onClose when clicked", () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} title="Modal" showCloseButton onClose={handleClose}>
        Content
      </Modal>
    );

    const icon = document.querySelector(".cursor-pointer") as HTMLElement;
    expect(icon).toBeInTheDocument();

    fireEvent.click(icon);
    expect(handleClose).toHaveBeenCalled();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Modal isOpen={true} title="Snapshot Modal" showCloseButton>
        <div>Content</div>
      </Modal>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
