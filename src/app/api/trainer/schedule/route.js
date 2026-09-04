import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import {
  getTrainerSchedule,
  updateTrainerSchedule,
} from "@/lib/models/trainerProfile";

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

function validateSchedule(schedule) {
  if (!schedule || typeof schedule !== "object") {
    return "Invalid schedule.";
  }

  for (const day of DAYS) {
    const slot = schedule[day];

    if (!slot || typeof slot !== "object") {
      return `Invalid ${day} schedule.`;
    }

    if (typeof slot.enabled !== "boolean") {
      return `Invalid ${day} enabled value.`;
    }

    if (slot.enabled) {
      if (!slot.start || !slot.end) {
        return `Please provide start and end time for ${day}.`;
      }

      if (slot.start >= slot.end) {
        return `End time must be after start time for ${day}.`;
      }
    }
  }

  return null;
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    if (
      session.user.role !== "trainer" &&
      session.user.role !== "admin"
    ) {
      return NextResponse.json(
        { error: "Access denied." },
        { status: 403 }
      );
    }

    const schedule = await getTrainerSchedule(session.user.id);

    return NextResponse.json({
      schedule,
    });
  } catch (error) {
    console.error("GET /api/trainer/schedule:", error);

    return NextResponse.json(
      { error: "Failed to fetch schedule." },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    if (
      session.user.role !== "trainer" &&
      session.user.role !== "admin"
    ) {
      return NextResponse.json(
        { error: "Access denied." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { schedule } = body;

    const validationError = validateSchedule(schedule);

    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    const updatedSchedule = await updateTrainerSchedule(
      session.user.id,
      schedule
    );

    return NextResponse.json({
      message: "Schedule updated successfully.",
      schedule: updatedSchedule,
    });
  } catch (error) {
    console.error("PATCH /api/trainer/schedule:", error);

    return NextResponse.json(
      { error: "Failed to update schedule." },
      { status: 500 }
    );
  }
}