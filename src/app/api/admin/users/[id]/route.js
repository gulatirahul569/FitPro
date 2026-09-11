import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { setUserRole } from "@/lib/models/user";

const VALID_ROLES = ["user", "trainer", "admin", "gym-owner"];

export async function PATCH(request, { params }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { role } = await request.json();

  if (!VALID_ROLES.includes(role)) {
    return NextResponse.json({ error: "Invalid role." }, { status: 400 });
  }

  // Prevent an admin from demoting themselves and getting locked out
  if (id === session.user.id) {
    return NextResponse.json(
      { error: "You can't change your own role." },
      { status: 400 }
    );
  }

  const updated = await setUserRole(id, role);

  if (!updated) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  const { password, ...safeUser } = updated;
  return NextResponse.json({ user: { ...safeUser, _id: safeUser._id.toString() } });
}