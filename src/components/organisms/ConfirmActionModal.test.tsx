import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmActionModal from "./ConfirmActionModal";

jest.mock("@/components/molecules/Modal", () => ({ isOpen, children }: any) => {
  return isOpen ? <div data-testid="modal">{children}</div> : null;
});

jest.mock("@/components/atoms/Button", () => ({ children, onClick }: any) => {
  return <button onClick={onClick}>{children}</button>;
});

describe("ConfirmActionModal component", () => {
  it("renders correctly when open", () => {
    render(
      <ConfirmActionModal
        isOpen={true}
        title="Test Title"
        message="Test Message"
      />
    );

    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Test Message")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Confirmar")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(<ConfirmActionModal isOpen={false} />);
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("calls onConfirm when Confirmar button is clicked", () => {
    const onConfirm = jest.fn();
    render(<ConfirmActionModal isOpen={true} onConfirm={onConfirm} />);

    fireEvent.click(screen.getByText("Confirmar"));
    expect(onConfirm).toHaveBeenCalledWith(true);
  });

  it("calls onCancel when Cancelar button is clicked", () => {
    const onCancel = jest.fn();
    render(<ConfirmActionModal isOpen={true} onCancel={onCancel} />);

    fireEvent.click(screen.getByText("Cancelar"));
    expect(onCancel).toHaveBeenCalledWith(false);
  });

  it("matches snapshot", () => {
    const { container } = render(
      <ConfirmActionModal
        isOpen={true}
        expanded={true}
        title="Snapshot Test"
        message="Snapshot message"
      />
    );

    expect(container).toMatchSnapshot();
  });
});
