import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { reapplyToGym } from "@/lib/models/trainerProfile";

export async function POST() {
  const session = await auth();

  if (!session?.user || (session.user.role !== "trainer" && session.user.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updated = await reapplyToGym(session.user.id);

  if (!updated) {
    return NextResponse.json(
      { error: "No rejected gym request found to reapply to." },
      { status: 404 }
    );
  }

  return NextResponse.json({ profile: updated });
}