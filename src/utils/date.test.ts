import { timestampToDate } from "./date";

describe("date utils", () => {
  describe("timestampToDate", () => {
    it("converts timestamp to formatted date string", () => {
      const timestamp = new Date("2025-08-14T00:00:00Z").getTime();

      const expected = new Date(timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      expect(timestampToDate(timestamp)).toBe(expected);
    });

    it("works with current date", () => {
      const now = Date.now();
      const expected = new Date(now).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      expect(timestampToDate(now)).toBe(expected);
    });
  });
});
