import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { getTrainerProfile, upsertTrainerProfile } from "@/lib/models/trainerProfile";

export async function GET() {
  const session = await auth();

  if (!session?.user || (session.user.role !== "trainer" && session.user.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await getTrainerProfile(session.user.id);
  return NextResponse.json({ profile: profile || null });
}

export async function PATCH(request) {
  const session = await auth();

  if (!session?.user || (session.user.role !== "trainer" && session.user.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      photo,
      phone,
      specialization,
      category,
      experience,
      certification,
      location,
      price,
      bio,
      specialties,
      availability,
      gymId,
    } = body;

    const updated = await upsertTrainerProfile(session.user.id, {
      name: session.user.name,   // always from session, never from client body
      email: session.user.email, // same
      photo,
      phone,
      specialization,
      category,
      experience,
      certification,
      location,
      price,
      bio,
      specialties,
      availability,
      gymId,
    });

    return NextResponse.json({ profile: updated });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Failed to update profile." }, { status: 500 });
  }
}