import { describe, expect, it } from "@jest/globals";
import { getFirstName, toTitleCase } from "./text";

describe("Product utils", () => {
  describe("getFirstName", () => {
    it("returns only the first word from full name", () => {
      expect(getFirstName("João Marcos da Silva")).toBe("João");
    });

    it("returns only the first word from simple name", () => {
      expect(getFirstName("Matheus")).toBe("Matheus");
    });

    it("returns empty from empty", () => {
      expect(getFirstName("")).toBe("");
    });
  });

  describe("toTitleCase", () => {
    it("returns only the first word from full name", () => {
      expect(toTitleCase("joão marcos da silva")).toBe("João Marcos Da Silva");
    });

    it("it works with special character", () => {
      expect(toTitleCase("ágora")).toBe("Ágora");
      expect(toTitleCase("@joaomarcoss")).toBe("@joaomarcoss");
    });

    it("returns empty if empty", () => {
      expect(toTitleCase("")).toBe("");
    });
  });
});
