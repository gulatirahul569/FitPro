"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";

const roleStyles = {
  user: "bg-gray-100 text-gray-700",
  trainer: "bg-blue-50 text-blue-700",
  admin: "bg-black text-white",
};

export default function UsersTable({ users, currentAdminId }) {
  const [items, setItems] = useState(users);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  const filtered = useMemo(() => {
    return items.filter((u) => {
      const matchesQuery =
        u.name?.toLowerCase().includes(query.toLowerCase()) ||
        u.email?.toLowerCase().includes(query.toLowerCase());
      const matchesRole = roleFilter ? u.role === roleFilter : true;
      return matchesQuery && matchesRole;
    });
  }, [items, query, roleFilter]);

  const handleRoleChange = async (id, newRole) => {
    setLoadingId(id);

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setItems((current) =>
        current.map((u) => (u._id === id ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      alert(err.message || "Something went wrong.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all text-sm"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all text-sm bg-white"
        >
          <option value="">All Roles</option>
          <option value="user">Users</option>
          <option value="trainer">Trainers</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wide">
          <div className="col-span-4">User</div>
          <div className="col-span-3">Joined</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-3 text-right">Change Role</div>
        </div>

        <div className="divide-y divide-gray-100">
          {filtered.map((user) => {
            const isSelf = user._id === currentAdminId;
            return (
              <div
                key={user._id}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center"
              >
                <div className="md:col-span-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold shrink-0">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-black text-sm truncate">
                      {user.name} {isSelf && <span className="text-gray-400">(you)</span>}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <p className="text-sm text-gray-500">
                    {user.createdAt &&
                      new Date(user.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${roleStyles[user.role]}`}>
                    {user.role}
                  </span>
                </div>

                <div className="md:col-span-3 flex justify-start md:justify-end">
                  <select
                    value={user.role}
                    disabled={isSelf || loadingId === user._id}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium focus:outline-none focus:border-black transition-all bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="user">User</option>
                    <option value="trainer">Trainer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center text-gray-500 text-sm">No users match your search.</div>
        )}
      </div>
    </div>
  );
}