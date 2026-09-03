import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { auth } from "@/auth";
import { getDb } from "@/lib/db";

export async function PATCH(request, { params }) {
  try {
    // 1. Check authentication
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    // 2. Only admin can approve/reject
    if (session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required." },
        { status: 403 }
      );
    }

    // 3. Get application ID
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid application ID." },
        { status: 400 }
      );
    }

    // 4. Get requested status
    const body = await request.json();

    const { status, adminNote = "" } = body;

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid application status." },
        { status: 400 }
      );
    }

    const db = await getDb();

    const applicationId = new ObjectId(id);

    // 5. Find application
    const application = await db
      .collection("trainerApplications")
      .findOne({
        _id: applicationId,
      });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found." },
        { status: 404 }
      );
    }

    // 6. Don't process already reviewed applications
    if (application.status !== "pending") {
      return NextResponse.json(
        {
          error: `Application is already ${application.status}.`,
        },
        { status: 409 }
      );
    }

    // =====================================================
    // APPROVE APPLICATION
    // =====================================================

    if (status === "approved") {
      // Make sure user still exists
      const user = await db.collection("users").findOne({
        _id: new ObjectId(application.userId),
      });

      if (!user) {
        return NextResponse.json(
          { error: "Associated user not found." },
          { status: 404 }
        );
      }

      // Update user role
      await db.collection("users").updateOne(
        {
          _id: new ObjectId(application.userId),
        },
        {
          $set: {
            role: "trainer",
            updatedAt: new Date(),
          },
        }
      );

      // Update application
      await db.collection("trainerApplications").updateOne(
        {
          _id: applicationId,
        },
        {
          $set: {
            status: "approved",
            adminNote,
            updatedAt: new Date(),
            reviewedAt: new Date(),
            reviewedBy: new ObjectId(session.user.id),
          },
        }
      );

      return NextResponse.json({
        success: true,
        message: "Trainer application approved.",
      });
    }

    // =====================================================
    // REJECT APPLICATION
    // =====================================================

    await db.collection("trainerApplications").updateOne(
      {
        _id: applicationId,
      },
      {
        $set: {
          status: "rejected",
          adminNote,
          updatedAt: new Date(),
          reviewedAt: new Date(),
          reviewedBy: new ObjectId(session.user.id),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Trainer application rejected.",
    });
  } catch (error) {
    console.error("Admin application update error:", error);

    return NextResponse.json(
      {
        error: "Failed to update application.",
      },
      {
        status: 500,
      }
    );
  }
}