import { getUserTotalScores, getScoresRanking } from "@/services/scores";

describe("Scores Service", () => {
  const token = "mockToken";
  const userId = "user123";
  const gateway = "https://mock.gateway";

  beforeAll(() => {
    process.env.NEXT_PUBLIC_GATEWAY_ADDRESS = gateway;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserTotalScores", () => {
    it("should return total scores when fetch is ok", async () => {
      const mockTotal = 100;

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ total: mockTotal }),
      } as any);

      const result = await getUserTotalScores(token, userId);
      expect(result).toBe(mockTotal);
      expect(global.fetch).toHaveBeenCalledWith(
        `${gateway}/room-io/users/${userId}/scores/total`,
        expect.objectContaining({
          method: "GET",
          headers: expect.objectContaining({
            Authorization: `Bearer ${token}`,
          }),
        })
      );
    });

    it("should throw error if fetch response is not ok", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
      } as any);

      await expect(getUserTotalScores(token, userId)).rejects.toThrow(
        "Failed to fetch scores"
      );
    });
  });

  describe("getScoresRanking", () => {
    it("should return ranking data when fetch is ok", async () => {
      const mockData = [{ id: "1", name: "Alice" }];

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ data: mockData }),
      } as any);

      const result = await getScoresRanking(token);
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        `${gateway}/room-io/scores/ranking`,
        expect.objectContaining({
          method: "GET",
          headers: expect.objectContaining({
            Authorization: `Bearer ${token}`,
          }),
        })
      );
    });

    it("should throw error if fetch response is not ok", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
      } as any);

      await expect(getScoresRanking(token)).rejects.toThrow(
        "Failed to fetch scores"
      );
    });
  });
});
