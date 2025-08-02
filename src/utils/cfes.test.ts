import { describe, expect, it } from "@jest/globals";
import { getParams, isValidCfeKey } from "./cfes";

describe("Cfes Utils", () => {
  describe("isValidCfeKey", () => {
    it("should return true for valid NFC-e key", () => {
      const validKey = "12345678901234567890123456789012345678901234";
      const qrCodeData = `https://www.nfce.fazenda.sp.gov.br/qrcode?p=${validKey}`;
      expect(isValidCfeKey(qrCodeData)).toBe(true);
    });

    it("should return true for valid NFC-e key", () => {
      const validKey = "CFe12345678901234567890123456789012345678901234";
      const qrCodeData = `https://www.nfce.fazenda.sp.gov.br/qrcode?p=${validKey}`;
      expect(isValidCfeKey(qrCodeData)).toBe(true);
    });

    it("should return false for invalid NFC-e key", () => {
      const invalid = "1234567890123456789012345678901234567890123"; // 43 digits
      const qrCodeData = `https://www.nfce.fazenda.sp.gov.br/qrcode?p=${invalid}`;
      expect(isValidCfeKey(qrCodeData)).toBe(false);
    });

    it("should return false for invalid NFC-e key", () => {
      const invalid = "01234567890123456789012345678901234567890123";
      const qrCodeData = `https://www.nfce.fazenda.sp.gov.br/qrcode?p=${invalid}`;
      expect(isValidCfeKey(qrCodeData)).toBe(false);
    });
  });

  describe("getParams", () => {
    it("should extract key from NFC-e QR code data", () => {
      const qrCodeData =
        "https://www.nfce.fazenda.sp.gov.br/qrcode?p=12345678901234567890123456789012345678901234";
      const params = getParams(qrCodeData);
      expect(params.key).toBe("12345678901234567890123456789012345678901234");
      expect(params.signature).toBe(qrCodeData);
    });

    it("should extract key and value from NFC-e QR code data", () => {
      const qrCodeData =
        "12345678901234567890123456789012345678901234|20231001120000|100.00||signature";
      const params = getParams(qrCodeData);
      expect(params.key).toBe("12345678901234567890123456789012345678901234");
      expect(params.value).toBe(100.0);
      expect(params.emittedAt).toEqual(new Date("2023-10-01T12:00:00Z"));
      expect(params.signature).toBe("signature");
    });

    it("should extract key and value from NFC-e QR code data", () => {
      const qrCodeData =
        "3525056018637600024559000679197278258441234|20250521120846|149.33|12312312312|aksdjflkabase64==";
      const params = getParams(qrCodeData);
      expect(params.key).toBe("3525056018637600024559000679197278258441234");
      expect(params.value).toBe(149.33);
      expect(params.emittedAt).toEqual(new Date("2025-05-21T12:08:46Z"));
      expect(params.signature).toBe("aksdjflkabase64==");
    });

    it("should accept only key", () => {
      const qrCodeData = "3525056018637600024559000679197278258441234";
      const params = getParams(qrCodeData);
      expect(params.key).toBe("3525056018637600024559000679197278258441234");
      expect(params.value).toBeUndefined();
      expect(params.emittedAt).toBeUndefined();
      expect(params.signature).toBeUndefined();
    });
  });
});
