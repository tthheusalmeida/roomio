import useSWR from "swr";
import { getGames } from "@/services/games";
import { useUser } from "@/contexts/UserContext";

export function useGames() {
  const { user } = useUser();

  const token = user?.accessToken;
  const shouldFetch = Boolean(token);

  return useSWR(shouldFetch ? `games-${user?.uid}` : null, () =>
    getGames(token as string)
  );
}
