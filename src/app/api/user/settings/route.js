
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { getUserById } from "@/lib/models/user";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await getUserById(session.user.id);

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      settings: {
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",

        // Notification preferences
        emailNotifications:
          user.settings?.emailNotifications ?? true,

        bookingNotifications:
          user.settings?.bookingNotifications ?? true,

        trainingNotifications:
          user.settings?.trainingNotifications ?? true,
      },
    });
  } catch (error) {
    console.error("Get user settings error:", error);

    return NextResponse.json(
      { error: "Failed to load settings." },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      emailNotifications,
      bookingNotifications,
      trainingNotifications,
    } = body;

    const db = await import("@/lib/db").then(
      (module) => module.getDb()
    );

    const updateFields = {};

    if (typeof emailNotifications === "boolean") {
      updateFields["settings.emailNotifications"] =
        emailNotifications;
    }

    if (typeof bookingNotifications === "boolean") {
      updateFields["settings.bookingNotifications"] =
        bookingNotifications;
    }

    if (typeof trainingNotifications === "boolean") {
      updateFields["settings.trainingNotifications"] =
        trainingNotifications;
    }

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { error: "No valid settings provided." },
        { status: 400 }
      );
    }

    await db.collection("users").updateOne(
      {
        _id: new (await import("mongodb")).ObjectId(
          session.user.id
        ),
      },
      {
        $set: {
          ...updateFields,
          updatedAt: new Date(),
        },
      }
    );

    const updatedUser = await getUserById(session.user.id);

    return NextResponse.json({
      message: "Settings updated successfully.",
      settings: {
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        role: updatedUser.role || "user",
        emailNotifications:
          updatedUser.settings?.emailNotifications ?? true,
        bookingNotifications:
          updatedUser.settings?.bookingNotifications ?? true,
        trainingNotifications:
          updatedUser.settings?.trainingNotifications ?? true,
      },
    });
  } catch (error) {
    console.error("Update user settings error:", error);

    return NextResponse.json(
      { error: "Failed to update settings." },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "All password fields are required." },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "New passwords do not match." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const user = await getUserById(session.user.id);

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        {
          error:
            "Password change is not available for this account.",
        },
        { status: 400 }
      );
    }

    const passwordMatches = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!passwordMatches) {
      return NextResponse.json(
        { error: "Current password is incorrect." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      12
    );

    const db = await import("@/lib/db").then(
      (module) => module.getDb()
    );

    await db.collection("users").updateOne(
      {
        _id: new (await import("mongodb")).ObjectId(
          session.user.id
        ),
      },
      {
        $set: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Change password error:", error);

    return NextResponse.json(
      { error: "Failed to change password." },
      { status: 500 }
    );
  }
}

