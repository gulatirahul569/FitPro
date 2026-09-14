import { handleUpload } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    // Check logged-in user
    const session = await auth();

    if (
      !session?.user ||
      (session.user.role !== "trainer" &&
        session.user.role !== "admin")
    ) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // IMPORTANT:
    // handleUpload needs the parsed request body
    const body = await request.json();

    const response = await handleUpload({
      body,
      request,

      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: [
            "video/mp4",
            "video/webm",
            "video/quicktime",
            "image/jpeg",
            "image/png",
            "image/webp",
          ],

          maximumSizeInBytes: 200 * 1024 * 1024,

          addRandomSuffix: true,

          tokenPayload: JSON.stringify({
            userId: session.user.id,
            role: session.user.role,
          }),
        };
      },

      onUploadCompleted: async ({ blob }) => {
        console.log("Blob upload completed:", blob.url);
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Vercel Blob upload error:", error);

    return NextResponse.json(
      {
        error: error?.message || "Upload failed.",
      },
      { status: 400 }
    );
  }
}