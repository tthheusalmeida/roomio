import { verifyFirebaseToken } from "@/services/server/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const MAX_LIMIT = 50;
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

export const paginationSchema = {
  page: z.coerce.number().min(1).nullable().default(DEFAULT_PAGE),
  limit: z.coerce
    .number()
    .min(1)
    .max(MAX_LIMIT)
    .nullable()
    .default(DEFAULT_LIMIT),
};

export function withAuth(
  handler: (req: NextRequest, userId: string) => Promise<NextResponse>,
) {
  return async (req: NextRequest) => {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const token = authHeader.split(" ")[1];
    const user = await verifyFirebaseToken(token);

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    return handler(req, user.uid);
  };
}
