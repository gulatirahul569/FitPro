"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Video,
  Users,
  Calendar,
  Clock,
  Star, 
  Wallet,
  Settings,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/trainer/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/trainer/profile", label: "My Profile", icon: User },
  { href: "/trainer/videos", label: "My Videos", icon: Video },
  { href: "/trainer/clients", label: "My Clients", icon: Users },
  { href: "/trainer/bookings", label: "Bookings", icon: Calendar },
  { href: "/trainer/reviews", label: "Reviews", icon: Star }, 
  { href: "/trainer/schedule", label: "Schedule", icon: Clock },
  { href: "/trainer/earnings", label: "Earnings", icon: Wallet },
  { href: "/trainer/settings", label: "Settings", icon: Settings },
];

export default function TrainerLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-50 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
          <Link href="/" className="text-xl font-extrabold text-black">
            FIT<span className="text-gray-400">PRO</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-black transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center px-4">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-700">
            <Menu size={24} />
          </button>
          <span className="ml-4 font-semibold text-black">Trainer Dashboard</span>
        </div>

        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}