import {
  getUser,
  createUser,
  updateUser,
  getFirebaseAuth,
  UserDocument,
} from "@/services/user";
import {
  getDoc,
  setDoc,
  updateDoc,
  doc,
  collection,
  getFirestore,
} from "firebase/firestore";
import { getFirebaseApp, getDatabase } from "@/libs/firebase";

jest.mock("firebase/firestore", () => ({
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  doc: jest.fn(),
  collection: jest.fn(),
  getFirestore: jest.fn(),
}));

jest.mock("@/libs/firebase", () => ({
  getDatabase: jest.fn(),
  getFirebaseApp: jest.fn(),
}));

describe("UserService", () => {
  const mockUid = "123";
  const mockUser: UserDocument = {
    id: "123",
    name: "Alice",
    createdAt: 123456,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (collection as jest.Mock).mockReturnValue("usersCollection");
    (doc as jest.Mock).mockImplementation((col, uid) => `docRef-${uid}`);
  });

  describe("getFirebaseAuth", () => {
    it("should call getFirestore with Firebase app and return it", () => {
      const mockApp = { name: "MockApp" };
      const mockFirestore = { type: "FirestoreMock" };

      (getFirebaseApp as jest.Mock).mockReturnValue(mockApp);
      (getFirestore as jest.Mock).mockReturnValue(mockFirestore);

      const result = getFirebaseAuth();

      expect(getFirebaseApp).toHaveBeenCalled();
      expect(getFirestore).toHaveBeenCalledWith(mockApp);
      expect(result).toBe(mockFirestore);
    });
  });

  describe("getUser", () => {
    it("should return user data if document exists", async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => mockUser,
      });

      const result = await getUser(mockUid);
      expect(result).toEqual(mockUser);
      expect(getDoc).toHaveBeenCalledWith("docRef-123");
    });

    it("should return null if document does not exist", async () => {
      (getDoc as jest.Mock).mockResolvedValue({ exists: () => false });

      const result = await getUser(mockUid);
      expect(result).toBeNull();
    });

    it("should throw error if uid is empty", async () => {
      await expect(getUser("")).rejects.toThrow("User ID is required");
    });
  });

  describe("createUser", () => {
    it("should call setDoc with correct reference and data", async () => {
      await createUser(mockUid, mockUser);
      expect(setDoc).toHaveBeenCalledWith("docRef-123", mockUser);
    });

    it("should throw error if uid is empty", async () => {
      await expect(createUser("", mockUser)).rejects.toThrow(
        "User ID is required"
      );
    });
  });

  describe("updateUser", () => {
    it("should call updateDoc with correct reference and partial data", async () => {
      const partialData = { name: "Bob" };
      await updateUser(mockUid, partialData);
      expect(updateDoc).toHaveBeenCalledWith("docRef-123", partialData);
    });

    it("should throw error if uid is empty", async () => {
      await expect(updateUser("", { name: "Bob" })).rejects.toThrow(
        "User ID is required"
      );
    });
  });
});
