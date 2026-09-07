import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getAllUsers } from "@/lib/models/user";

export async function GET() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await getAllUsers();

  // Never send password hashes to the client, even an admin client
  const safeUsers = users.map(({ password, ...rest }) => ({
    ...rest,
    _id: rest._id.toString(),
    createdAt: rest.createdAt?.toISOString(),
    updatedAt: rest.updatedAt?.toISOString(),
  }));

  return NextResponse.json({ users: safeUsers });
}