
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import {
  getUserById,
  updateUserProfile,
} from "@/lib/models/user";

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
      user: {
        id: user._id.toString(),
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",
        phone: user.phone || "",
        profileImage: user.profileImage || "",
        bio: user.bio || "",
        location: user.location || "",
        createdAt: user.createdAt || null,
      },
    });
  } catch (error) {
    console.error("Get user profile error:", error);

    return NextResponse.json(
      { error: "Failed to load profile." },
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
      name,
      phone,
      profileImage,
      bio,
      location,
    } = body;

    // Basic validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters." },
        { status: 400 }
      );
    }

    // Update only fields allowed by the model
    const updatedUser = await updateUserProfile(
      session.user.id,
      {
        name: name.trim(),
        phone: typeof phone === "string" ? phone.trim() : "",
        profileImage:
          typeof profileImage === "string"
            ? profileImage.trim()
            : "",
        bio: typeof bio === "string" ? bio.trim() : "",
        location:
          typeof location === "string"
            ? location.trim()
            : "",
      }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Profile updated successfully.",
      user: {
        id: updatedUser._id.toString(),
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        role: updatedUser.role || "user",
        phone: updatedUser.phone || "",
        profileImage: updatedUser.profileImage || "",
        bio: updatedUser.bio || "",
        location: updatedUser.location || "",
        createdAt: updatedUser.createdAt || null,
      },
    });
  } catch (error) {
    console.error("Update user profile error:", error);

    return NextResponse.json(
      { error: "Failed to update profile." },
      { status: 500 }
    );
  }
}

