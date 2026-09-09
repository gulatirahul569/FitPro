import { NextResponse } from "next/server";
import { getAllGyms } from "@/lib/models/gym";

export async function GET() {
  const gyms = await getAllGyms();
  const serialized = gyms.map((g) => ({ _id: g._id.toString(), name: g.name, location: g.location }));
  return NextResponse.json({ gyms: serialized });
}