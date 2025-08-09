export interface Game {
  id: string;
  slug: string;
  name: string;
  online: number;
  create_at: string;
}

function throwErrorIfFailedToFetch(isResponseOk: boolean) {
  if (!isResponseOk) {
    throw new Error("Failed to fetch scores");
  }
}

export async function getUserTotalScores(token: string, userId: string) {
  const endPoint = `/room-io/users/${userId}/scores/total`;
  const url = process.env.NEXT_PUBLIC_GATEWAY_ADDRESS + endPoint;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  throwErrorIfFailedToFetch(response.ok);

  const { total } = await response.json();
  return total;
}

export async function getScoresRanking(token: string) {
  const endPoint = "/room-io/scores/ranking";
  const url = process.env.NEXT_PUBLIC_GATEWAY_ADDRESS + endPoint;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  throwErrorIfFailedToFetch(response.ok);

  const { data } = await response.json();
  return data;
}
