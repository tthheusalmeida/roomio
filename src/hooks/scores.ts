import useSWR from "swr";
import { getUserTotalScores } from "@/services/scores";
import { useUser } from "@/contexts/UserContext";

export function useTotalScores() {
  const { user } = useUser();

  const token = user?.accessToken;
  const shouldFetch = Boolean(token);

  return useSWR(shouldFetch ? `total-scores-${user?.uid}` : null, () =>
    getUserTotalScores(token as string, user?.uid as string)
  );
}
