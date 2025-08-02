import { describe, expect, it } from "@jest/globals";
import { checkEmailIsValid } from "./validation";

describe("checkEmailIsValid", () => {
  describe("should return match array (truthy)", () => {
    it("for a valid email", () => {
      expect(checkEmailIsValid("usuario@dominio.com")).toBeTruthy();
      expect(checkEmailIsValid("usuario.name@dominio.com.br")).toBeTruthy();
      expect(checkEmailIsValid("usuario_name123@dominio.co")).toBeTruthy();
    });
  });

  describe("should return null (falsy)", () => {
    it("for an invalid email", () => {
      expect(checkEmailIsValid("usuariodominio.com")).toBeFalsy();
      expect(checkEmailIsValid("usuario@.com")).toBeFalsy();
      expect(checkEmailIsValid("@dominio.com")).toBeFalsy();
      expect(checkEmailIsValid("usuario@dominio")).toBeFalsy();
    });
  });
});
