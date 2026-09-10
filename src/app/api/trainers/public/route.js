import { NextResponse } from "next/server";
import { listPublicTrainerProfiles } from "@/lib/models/trainerProfile";
import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET() {
  const profiles = await listPublicTrainerProfiles();

  const db = await getDb();
  const approvedGymIds = [
    ...new Set(
      profiles
        .filter((p) => p.gymId && p.gymStatus === "approved")
        .map((p) => p.gymId)
    ),
  ];
  const gyms = approvedGymIds.length > 0
    ? await db.collection("gyms").find({ _id: { $in: approvedGymIds.map((id) => new ObjectId(id)) } }).toArray()
    : [];
  const gymMap = new Map(gyms.map((g) => [g._id.toString(), g.name]));

  const trainers = profiles.map((p) => ({
    id: p.userId,
    name: p.name,
    email: p.email,
    photo: p.photo || "",
    rating: 5.0,
    category: p.category || "",
    specialization: p.specialization,
    experience: p.experience,
    price: p.price,
    location: p.location,
    description: p.bio?.slice(0, 120) || "",
    bio: p.bio,
    specialties: p.specialties || [],
    availability: p.availability,
    certification: p.certification,
    phone: p.phone,
    // Only expose gym affiliation once approved by that gym's owner
    gymId: p.gymStatus === "approved" ? p.gymId : null,
    gymName: p.gymStatus === "approved" ? gymMap.get(p.gymId) || null : null,
    isDbTrainer: true,
  }));

  return NextResponse.json({ trainers });
}