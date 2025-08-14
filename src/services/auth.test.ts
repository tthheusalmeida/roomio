import { googleSignIn, AuthUser } from "@/services/auth";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn(),
    GoogleAuthProvider: jest.fn(),
    signInWithPopup: jest.fn(),
    OAuthProvider: {
      credentialFromResult: jest.fn(),
    },
  };
});

describe("googleSignIn", () => {
  it("should call signInWithPopup and return normalized AuthUser", async () => {
    const mockUserCredential = { user: { uid: "123" } } as any;
    const mockCredential = { accessToken: "abc" } as any;

    (getAuth as jest.Mock).mockReturnValue({} as any);

    (signInWithPopup as jest.Mock).mockResolvedValue(mockUserCredential);

    const { OAuthProvider } = require("firebase/auth");
    OAuthProvider.credentialFromResult.mockReturnValue(mockCredential);

    const result: AuthUser = await googleSignIn();

    expect(getAuth).toHaveBeenCalled();
    expect(signInWithPopup).toHaveBeenCalledWith(
      {},
      expect.any(GoogleAuthProvider)
    );
    expect(OAuthProvider.credentialFromResult).toHaveBeenCalledWith(
      mockUserCredential
    );

    expect(result).toEqual({
      result: mockUserCredential,
      credential: mockCredential,
    });
  });
});
