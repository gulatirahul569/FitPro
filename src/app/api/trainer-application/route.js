import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import { getDb } from "@/lib/db";

export async function POST(request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    if (session.user.role !== "user") {
      return NextResponse.json(
        { error: "Only normal users can apply to become trainers." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const {
      phone,
      specialization,
      experience,
      certification,
      bio,
    } = body;

    if (
      !phone ||
      !specialization ||
      experience === undefined ||
      !certification ||
      !bio
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const db = await getDb();

    const existingApplication =
      await db.collection("trainerApplications").findOne({
        userId: session.user.id,
        status: "pending",
      });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You already have a pending application." },
        { status: 409 }
      );
    }

    const application = {
      userId: session.user.id,
      name: session.user.name || "",
      email: session.user.email || "",
      phone,
      specialization,
      experience: Number(experience),
      certification,
      bio,
      status: "pending",
      adminNote: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("trainerApplications").insertOne(application);

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Trainer application error:", error);

    return NextResponse.json(
      { error: "Failed to submit application." },
      { status: 500 }
    );
  }
}