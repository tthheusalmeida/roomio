import { render } from "@testing-library/react";
import TicTacToeLobby from "./TicTacToeLobby";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("TicTacToeLobby", () => {
  it("redirects to a new TicTacToe game with a UUID", () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<TicTacToeLobby />);

    expect(pushMock).toHaveBeenCalled();

    expect(pushMock.mock.calls[0][0]).toMatch(/\/game\/tic-tac-toe\/.+/);
  });
});
