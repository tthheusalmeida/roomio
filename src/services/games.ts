export interface Game {
  id: string;
  slug: string;
  name: string;
  online: number;
  create_at: string;
}

function throwErrorIfFailedToFetch(isResponseOk: boolean) {
  if (!isResponseOk) {
    throw new Error("Failed to fetch games");
  }
}

export async function getGames(token: string) {
  const endPoint = "/room-io/games";
  const url = process.env.NEXT_PUBLIC_GATEWAY_ADDRESS + endPoint;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  throwErrorIfFailedToFetch(response.ok);

  const data = response.json();
  return data;
}
