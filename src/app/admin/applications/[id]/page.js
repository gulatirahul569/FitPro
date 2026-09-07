import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Award, Briefcase, FileText, Calendar } from "lucide-react";
import ApplicationActions from "@/components/admin/ApplicationActions";

export default async function ApplicationDetailPage({ params }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }

  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    return notFound();
  }

  const db = await getDb();
  const application = await db
    .collection("trainerApplications")
    .findOne({ _id: new ObjectId(id) });

  if (!application) {
    return notFound();
  }

  const serialized = {
    ...application,
    _id: application._id.toString(),
    userId: application.userId?.toString(),
    reviewedBy: application.reviewedBy?.toString() || null,
    createdAt: application.createdAt?.toISOString(),
    updatedAt: application.updatedAt?.toISOString(),
    reviewedAt: application.reviewedAt?.toISOString() || null,
  };

  return (
    <div>
      <Link
        href="/admin/applications"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Back to Applications
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: applicant details */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
          <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">
                {serialized.name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <h1 className="text-xl font-bold text-black">{serialized.name}</h1>
                <p className="text-sm text-gray-500">{serialized.email}</p>
              </div>
            </div>

            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                serialized.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : serialized.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {serialized.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <DetailField icon={Phone} label="Phone" value={serialized.phone} />
            <DetailField icon={Award} label="Specialization" value={serialized.specialization} />
            <DetailField icon={Briefcase} label="Experience" value={`${serialized.experience} years`} />
            <DetailField icon={FileText} label="Certification" value={serialized.certification} />
          </div>

          <div className="mb-8">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
              About / Bio
            </p>
            <p className="text-gray-700 leading-relaxed">{serialized.bio}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Calendar size={14} />
            Applied on{" "}
            {new Date(serialized.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>

          {serialized.status !== "pending" && (
            <div className="mt-6 pt-6 border-t border-gray-100 text-sm text-gray-500">
              <p>
                Reviewed on{" "}
                {serialized.reviewedAt &&
                  new Date(serialized.reviewedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
              </p>
              {serialized.adminNote && (
                <p className="mt-2">
                  <span className="font-medium text-black">Admin note:</span> {serialized.adminNote}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right: actions */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <ApplicationActions application={serialized} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailField({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
        <Icon size={16} className="text-gray-600" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-sm font-medium text-black">{value}</p>
      </div>
    </div>
  );
}