import TicTacToeLobby from "@/components/organisms/TicTacToeLobby";
import TicTacToeGame from "@/components/organisms/TicTacToeGame";

interface Props {
  roomId?: string;
}

export default function TicTacToeTemplate({ roomId }: Props) {
  return roomId ? <TicTacToeGame roomId={roomId} /> : <TicTacToeLobby />;
}
