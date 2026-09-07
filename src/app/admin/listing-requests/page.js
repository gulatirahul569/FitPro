import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getPendingListingRequests } from "@/lib/models/trainerProfile";
import ListingRequestsTable from "@/components/admin/ListingRequestsTable";

export default async function ListingRequestsPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }

  const requests = await getPendingListingRequests();

  const serialized = requests.map((r) => ({
    ...r,
    _id: r._id.toString(),
    listingRequestedAt: r.listingRequestedAt?.toISOString(),
  }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black">Listing Requests</h1>
        <p className="text-gray-500 mt-1">
          Trainers awaiting background check before going live on the public site.
        </p>
      </div>

      <ListingRequestsTable requests={serialized} />
    </div>
  );
}