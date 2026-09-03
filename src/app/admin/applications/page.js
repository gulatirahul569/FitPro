import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import ApplicationsTable from "@/components/admin/ApplicationsTable";

export default async function ApplicationsPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }

  const db = await getDb();

  const applications = await db
    .collection("trainerApplications")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  const serializedApplications = applications.map((application) => ({
    ...application,
    _id: application._id.toString(),
    userId: application.userId?.toString(),
    createdAt: application.createdAt?.toISOString(),
    updatedAt: application.updatedAt?.toISOString(),
  }));

  return (
    <div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black">
          Trainer Applications
        </h1>

        <p className="mt-1 text-gray-500">
          Review and manage trainer applications.
        </p>
      </div>

      <ApplicationsTable applications={serializedApplications} />

    </div>
  );
}