"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  ClipboardList,
  Video,
  User,
  Calendar,
  CreditCard,
  Settings,
  ClipboardCheck,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/profile",
    label: "My Profile",
    icon: User,
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: Users,
  },
  {
    href: "/admin/trainers",
    label: "Trainers",
    icon: Dumbbell,
  },
  {
    href: "/admin/applications",
    label: "Applications",
    icon: ClipboardList,
  },
  {
    href: "/admin/listing-requests",
    label: "Listing Requests",
    icon: ClipboardCheck,
  },
  {
    href: "/admin/videos",
    label: "Videos",
    icon: Video,
  },
  {
    href: "/admin/bookings",
    label: "Bookings",
    icon: Calendar,
  },
  {
    href: "/admin/payments",
    label: "Payments",
    icon: CreditCard,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-50 transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* =================================================
            SIDEBAR HEADER
        ================================================== */}

        <div className="h-18 flex items-center justify-between px-6 border-b border-gray-100">
          <Link
            href="/"
            className="text-xl font-extrabold text-black"
          >
            FIT<span className="text-gray-400">PRO</span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-black transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* =================================================
            NAVIGATION
        ================================================== */}

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

        {/* =================================================
            BACK TO WEBSITE
        ================================================== */}

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

      {/* =====================================================
          MAIN CONTENT AREA
      ====================================================== */}

      <div className="flex-1 min-w-0">
        {/* =================================================
            MOBILE TOP BAR
        ================================================== */}

        <div className="lg:hidden sticky top-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 hover:text-black transition-colors"
          >
            <Menu size={24} />
          </button>

          <span className="ml-4 font-semibold text-black">
            Admin Dashboard
          </span>
        </div>

        {/* =================================================
            PAGE CONTENT
        ================================================== */}

        <main className="p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}