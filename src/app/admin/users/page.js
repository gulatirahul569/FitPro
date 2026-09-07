import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAllUsers } from "@/lib/models/user";
import UsersTable from "@/components/admin/UsersTable";

export default async function AdminUsersPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }

  const users = await getAllUsers();

  const serialized = users.map(({ password, ...rest }) => ({
    ...rest,
    _id: rest._id.toString(),
    createdAt: rest.createdAt?.toISOString(),
  }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black">Users</h1>
        <p className="text-gray-500 mt-1">
          {serialized.length} total user{serialized.length !== 1 && "s"} on the platform.
        </p>
      </div>

      <UsersTable users={serialized} currentAdminId={session.user.id} />
    </div>
  );
}