import { describe, expect, it } from "@jest/globals";
import { productTitle } from "./product";

describe("Product utils", () => {
  describe("productTitle", () => {
    const productBase = {
      id: "289374598",
      title: "Sabonete Flor De Ypê Suave Doce Frescor",
      brand: "Ype",
      category: "Higiene e Beleza",
      barcode: "1000000008609",
    };

    it("Returns title upper normalized", () => {
      const product = {
        ...productBase,
        title: "SABONETE FLOR DE YPÊ SUAVE DOCE FRESCOR",
      };

      expect(productTitle(product)).toBe(
        "Sabonete Flor De Ypê Suave Doce Frescor",
      );
    });
  });
});
