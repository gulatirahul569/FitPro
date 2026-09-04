import { NextResponse } from "next/server";
import { listPublicTrainerProfiles } from "@/lib/models/trainerProfile";

export async function GET() {
  const profiles = await listPublicTrainerProfiles();

  // Shape each DB profile to match the same fields TrainerCard/[id] page expect
  const trainers = profiles.map((p) => ({
    id: p.userId,           // string (Mongo ObjectId), distinct from static mock numeric ids
    name: p.name,
    email: p.email,
    photo: p.photo || "",
    rating: 5.0,             // placeholder until a real review system exists
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
    isDbTrainer: true,       // flag so the [id] page knows to look in DB, not mock data
  }));

  return NextResponse.json({ trainers });
}