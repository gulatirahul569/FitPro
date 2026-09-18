import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getGymByOwnerId, updateGym } from "@/lib/models/gym";

export async function PATCH(request) {
  const session = await auth();

  if (
    !session?.user ||
    (session.user.role !== "gym-owner" && session.user.role !== "admin")
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const gym = await getGymByOwnerId(session.user.id);

  if (!gym) {
    return NextResponse.json(
      { error: "No gym assigned to your account." },
      { status: 404 }
    );
  }

  const body = await request.json();

  const safeString = (value) =>
    typeof value === "string" ? value.trim() : undefined;

  const location = safeString(body.location);
  const address = safeString(body.address);
  const description = safeString(body.description);
  const image = safeString(body.image);
  const phone = safeString(body.phone);

  const amenities = Array.isArray(body.amenities)
    ? body.amenities
        .map((a) => (typeof a === "string" ? a.trim() : ""))
        .filter(Boolean)
    : undefined;

  const updateData = {};

  if (location !== undefined) updateData.location = location;
  if (address !== undefined) updateData.address = address;
  if (description !== undefined) updateData.description = description;
  if (image !== undefined) updateData.image = image;
  if (phone !== undefined) updateData.phone = phone;
  if (amenities !== undefined) updateData.amenities = amenities;

  const updated = await updateGym(gym._id.toString(), updateData);

  return NextResponse.json({ success: true, gym: updated });
}