import useSWR from "swr";
import { getUserTotalScores, getScoresRanking } from "@/services/scores";
import { useUser } from "@/contexts/UserContext";

export function useTotalScores() {
  const { user } = useUser();

  const token = user?.accessToken;
  const shouldFetch = Boolean(token);

  return useSWR(shouldFetch ? `scores-total-${user?.uid}` : null, () =>
    getUserTotalScores(token as string, user?.uid as string)
  );
}

export function useScoresRanking() {
  const { user } = useUser();

  const token = user?.accessToken;
  const shouldFetch = Boolean(token);

  return useSWR(shouldFetch ? `scores-ranking-${user?.uid}` : null, () =>
    getScoresRanking(token as string)
  );
}
