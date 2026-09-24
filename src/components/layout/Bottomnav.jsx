"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Home, Users, PlayCircle, Building2, User, LogIn } from "lucide-react";

export default function BottomNav() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isLoggedIn = status === "authenticated";
  const role = session?.user?.role; // "user" | "trainer" | "gym-owner" | "admin"

  // Role maps 1:1 onto the route prefix, so this covers every account type.
  const profileHref = isLoggedIn ? `/${role}/dashboard` : "/login";

  const isDashboard =
    pathname.startsWith("/user/") ||
    pathname.startsWith("/trainer/") ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith("/gym-owner/");

  const tabs = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      href: "/trainers",
      label: "Trainers",
      icon: Users,
      isActive: pathname.startsWith("/trainers"),
    },
    {
      href: "/videos",
      label: "Videos",
      icon: PlayCircle,
      isActive: pathname.startsWith("/videos"),
    },
    {
      href: "/gyms",
      label: "Gyms",
      icon: Building2,
      isActive: pathname.startsWith("/gyms"),
    },
    {
      href: profileHref,
      label: isLoggedIn ? "Dashboard" : "Login",
      icon: isLoggedIn ? User : LogIn,
      isActive: isLoggedIn ? isDashboard : pathname === "/login",
    },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex h-16 items-stretch justify-between px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className="flex flex-1 flex-col items-center justify-center gap-1"
            >
              <Icon
                size={22}
                className={tab.isActive ? "text-black" : "text-gray-400"}
                strokeWidth={tab.isActive ? 2.4 : 2}
              />

              <span
                className={`text-[10px] font-medium ${
                  tab.isActive ? "text-black" : "text-gray-400"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}