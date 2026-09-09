import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { assignGymOwner } from "@/lib/models/gym";
import { findUserByEmailForAssignment, setUserRole } from "@/lib/models/user";

export async function POST(request, { params }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const user = await findUserByEmailForAssignment(email);

  if (!user) {
    return NextResponse.json({ error: "No user found with that email." }, { status: 404 });
  }

  if (user.role === "admin") {
    return NextResponse.json({ error: "Admins can't be assigned as gym owners." }, { status: 400 });
  }

  const userId = user._id.toString();

  await setUserRole(userId, "gym-owner");
  const gym = await assignGymOwner(id, userId);

  if (!gym) {
    return NextResponse.json({ error: "Gym not found." }, { status: 404 });
  }

  return NextResponse.json({
    gym,
    owner: { name: user.name, email: user.email },
  });
}