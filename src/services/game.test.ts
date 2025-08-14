// __tests__/games.test.ts
import { getGames, Game } from "@/services/games";

describe("Games Service", () => {
  const token = "mockToken";
  const gateway = "https://mock.gateway";

  beforeAll(() => {
    process.env.NEXT_PUBLIC_GATEWAY_ADDRESS = gateway;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return games data when fetch is ok", async () => {
    const mockGames: Game[] = [
      {
        id: "1",
        slug: "game-1",
        name: "Game 1",
        online: 10,
        create_at: "2025-01-01",
      },
      {
        id: "2",
        slug: "game-2",
        name: "Game 2",
        online: 5,
        create_at: "2025-01-02",
      },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockGames),
    } as any);

    const result = await getGames(token);
    expect(result).toEqual(mockGames);
    expect(global.fetch).toHaveBeenCalledWith(
      `${gateway}/room-io/games`,
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }),
      })
    );
  });

  it("should throw error if fetch response is not ok", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    } as any);

    await expect(getGames(token)).rejects.toThrow("Failed to fetch games");
  });
});
