import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { User, Mail, Shield } from "lucide-react";

export default async function AdminProfilePage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-1">My Profile</h1>
      <p className="text-gray-500 mb-8">Your FitPro administrator account.</p>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 max-w-lg">
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
          <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">
            {session.user.name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-black text-lg">{session.user.name}</p>
            <p className="text-sm text-gray-500">{session.user.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
              <User size={16} className="text-gray-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">Name</p>
              <p className="text-sm font-medium text-black">{session.user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
              <Mail size={16} className="text-gray-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">Email</p>
              <p className="text-sm font-medium text-black">{session.user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
              <Shield size={16} className="text-gray-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">Account Type</p>
              <p className="text-sm font-medium text-black capitalize">{session.user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}