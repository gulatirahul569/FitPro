import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getAllGyms, createGym } from "@/lib/models/gym";

export async function GET() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const gyms = await getAllGyms();
  return NextResponse.json({ gyms });
}

export async function POST(request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, location, address, description, image, amenities, phone } = body;

  if (!name || !location) {
    return NextResponse.json({ error: "Name and location are required." }, { status: 400 });
  }

  const gym = await createGym({
    name,
    location,
    address: address || "",
    description: description || "",
    image: image || "",
    amenities: amenities || [],
    phone: phone || "",
  });

  return NextResponse.json({ gym }, { status: 201 });
}