import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getGymByOwnerId, updateGym } from "@/lib/models/gym";

export async function PATCH(request) {
  const session = await auth();

  if (!session?.user || (session.user.role !== "gym-owner" && session.user.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const gym = await getGymByOwnerId(session.user.id);

  if (!gym) {
    return NextResponse.json({ error: "No gym assigned to your account." }, { status: 404 });
  }

  const body = await request.json();
  const { location, address, description, image, amenities, phone } = body;

  // Deliberately excludes "name" — gym name changes are admin-only
  const updated = await updateGym(gym._id.toString(), {
    location,
    address,
    description,
    image,
    amenities,
    phone,
  });

  return NextResponse.json({ gym: updated });
}