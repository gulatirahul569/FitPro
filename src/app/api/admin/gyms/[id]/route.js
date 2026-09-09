import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { updateGym, deleteGym } from "@/lib/models/gym";

export async function PATCH(request, { params }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const updated = await updateGym(id, body);

  if (!updated) {
    return NextResponse.json({ error: "Gym not found." }, { status: 404 });
  }

  return NextResponse.json({ gym: updated });
}

export async function DELETE(request, { params }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteGym(id);

  if (!deleted) {
    return NextResponse.json({ error: "Gym not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}