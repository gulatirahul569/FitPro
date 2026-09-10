import { NextResponse } from "next/server";
import { auth } from "@/auth";
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

    // Check if the gym selection actually changed, so we don't reset status
    // every time they save the form without touching the gym field
    const existingProfile = await getTrainerProfile(session.user.id);
    const gymChanged = (gymId || "") !== (existingProfile?.gymId || "");

    const updateData = {
      name: session.user.name,
      email: session.user.email,
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
      gymId: gymId || null,
    };

    if (gymChanged) {
      // New gym selected (or cleared) -> reset approval status
      updateData.gymStatus = gymId ? "pending" : null;
    }

    const updated = await upsertTrainerProfile(session.user.id, updateData);

    return NextResponse.json({ profile: updated });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Failed to update profile." }, { status: 500 });
  }
}