"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Dumbbell,
  Menu,
  X,
  User,
  Calendar,
  BookOpen,
  Settings,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/trainers", label: "Trainers" },
  { href: "/videos", label: "Videos" },
  { href: "/programs", label: "Programs" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const isLoggedIn = status === "authenticated";
  const user = session?.user;

  const firstName = user?.name?.split(" ")[0];

  // User role
  const role = user?.role;

  // Role checks
  const isNormalUser = role === "user";
  const isTrainer = role === "trainer";
  const isAdmin = role === "admin";

  // Dashboard routes
  const isDashboard =
    pathname.startsWith("/user/") ||
    pathname.startsWith("/trainer/") ||
    pathname.startsWith("/admin/");

  // Become a Trainer:
  // Logged out -> SHOW
  // User       -> SHOW
  // Trainer    -> HIDE
  // Admin      -> HIDE
  const showBecomeTrainer = !isLoggedIn || isNormalUser;

  const handleLogout = async () => {
    setProfileMenu(false);
    setMobileMenu(false);

    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <header
      className={`${
        isDashboard ? "relative" : "sticky top-0"
      } z-50 border-b border-gray-200 bg-white/95 backdrop-blur`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* =====================================================
            LOGO
        ====================================================== */}

        <Link
          href="/"
          className="group flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white transition-transform duration-300 ease-out group-hover:rotate-12">
            <Dumbbell size={22} />
          </div>

          <span className="text-2xl font-extrabold tracking-tight">
            FIT<span className="text-gray-500">PRO</span>
          </span>
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-gray-700 transition hover:text-black"
            >
              {link.label}

              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-black transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* =====================================================
            DESKTOP ACTIONS
        ====================================================== */}

        <div className="hidden items-center gap-3 md:flex">
          {/* =================================================
              LOGGED OUT
          ================================================== */}

          {!isLoggedIn && (
            <>
              <Link
                href="/become-trainer"
                className="rounded-full border border-black px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white"
              >
                Become a Trainer
              </Link>

              <Link
                href="/login"
                className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg"
              >
                Login
              </Link>
            </>
          )}

          {/* =================================================
              LOGGED IN
          ================================================== */}

          {isLoggedIn && (
            <div className="flex items-center gap-3">
              {/* Become a Trainer - ONLY USER */}

              {showBecomeTrainer && (
                <Link
                  href="/become-trainer"
                  className="rounded-full border border-black px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white"
                >
                  Become a Trainer
                </Link>
              )}

              {/* Profile */}

              <div className="relative">
                <button
                  onClick={() => setProfileMenu(!profileMenu)}
                  className="flex items-center gap-2 rounded-full border border-gray-200 py-1.5 pl-1.5 pr-3 transition-colors hover:border-gray-300"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                    {firstName?.charAt(0)?.toUpperCase()}
                  </div>

                  <span className="text-sm font-medium text-black">
                    {firstName}
                  </span>

                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-200 ${
                      profileMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* =================================================
                    PROFILE DROPDOWN
                ================================================== */}

                {profileMenu && (
                  <>
                    {/* Backdrop */}

                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileMenu(false)}
                    />

                    <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                      {/* User Information */}

                      <div className="border-b border-gray-100 px-4 py-4">
                        <p className="font-semibold text-black">
                          {user?.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {user?.email}
                        </p>

                        {role && (
                          <p className="mt-1 text-xs capitalize text-gray-400">
                            {role}
                          </p>
                        )}
                      </div>

                      {/* =================================================
                          MENU ITEMS
                      ================================================== */}

                      <div className="py-2">
                        {/* ================= USER ================= */}

                        {isNormalUser && (
                          <>
                            <ProfileMenuItem
                              href="/user/profile"
                              icon={User}
                              label="My Profile"
                              onClick={() => setProfileMenu(false)}
                            />

                            <ProfileMenuItem
                              href="/user/bookings"
                              icon={Calendar}
                              label="My Bookings"
                              onClick={() => setProfileMenu(false)}
                            />

                            <ProfileMenuItem
                              href="/user/training"
                              icon={BookOpen}
                              label="My Training"
                              onClick={() => setProfileMenu(false)}
                            />

                            <ProfileMenuItem
                              href="/user/settings"
                              icon={Settings}
                              label="Settings"
                              onClick={() => setProfileMenu(false)}
                            />
                          </>
                        )}

                        {/* ================= TRAINER ================= */}

                        {isTrainer && (
                          <>
                            <ProfileMenuItem
                              href="/trainer/profile"
                              icon={User}
                              label="My Profile"
                              onClick={() => setProfileMenu(false)}
                            />

                            <ProfileMenuItem
                              href="/trainer/dashboard"
                              icon={LayoutDashboard}
                              label="Trainer Dashboard"
                              onClick={() => setProfileMenu(false)}
                            />

                            <ProfileMenuItem
                              href="/trainer/settings"
                              icon={Settings}
                              label="Settings"
                              onClick={() => setProfileMenu(false)}
                            />
                          </>
                        )}

                        {/* ================= ADMIN ================= */}

                        {isAdmin && (
                          <>
                            <ProfileMenuItem
                              href="/admin/profile"
                              icon={User}
                              label="My Profile"
                              onClick={() => setProfileMenu(false)}
                            />

                            <ProfileMenuItem
                              href="/admin/dashboard"
                              icon={ShieldCheck}
                              label="Admin Dashboard"
                              onClick={() => setProfileMenu(false)}
                            />

                            <ProfileMenuItem
                              href="/admin/settings"
                              icon={Settings}
                              label="Settings"
                              onClick={() => setProfileMenu(false)}
                            />
                          </>
                        )}
                      </div>

                      {/* =================================================
                          LOGOUT
                      ================================================== */}

                      <div className="border-t border-gray-100 py-2">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                        >
                          <LogOut size={17} />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* =====================================================
            MOBILE BUTTON
        ====================================================== */}

        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="rounded-lg p-2 md:hidden"
          aria-label="Toggle menu"
        >
          <div className="relative h-6 w-6">
            <Menu
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                mobileMenu
                  ? "scale-50 rotate-90 opacity-0"
                  : "scale-100 rotate-0 opacity-100"
              }`}
            />

            <X
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                mobileMenu
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-50 -rotate-90 opacity-0"
              }`}
            />
          </div>
        </button>
      </div>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <div
        className={`overflow-hidden border-t border-gray-200 bg-white transition-all duration-300 ease-out md:hidden ${
          mobileMenu
            ? "max-h-[45rem] opacity-100"
            : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-4 px-6 py-5">
          {/* Main Navigation */}

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenu(false)}
              className="font-medium text-gray-700 transition-colors hover:text-black"
            >
              {link.label}
            </Link>
          ))}

          {/* =================================================
              MOBILE LOGGED OUT
          ================================================== */}

          {!isLoggedIn && (
            <div className="mt-2 flex flex-col gap-3">
              <Link
                href="/become-trainer"
                onClick={() => setMobileMenu(false)}
                className="rounded-full border border-black px-5 py-3 text-center font-semibold transition-colors hover:bg-black hover:text-white"
              >
                Become a Trainer
              </Link>

              <Link
                href="/login"
                onClick={() => setMobileMenu(false)}
                className="rounded-full bg-black px-5 py-3 text-center font-semibold text-white transition-colors hover:bg-gray-800"
              >
                Login
              </Link>
            </div>
          )}

          {/* =================================================
              MOBILE LOGGED IN
          ================================================== */}

          {isLoggedIn && (
            <div className="mt-2 flex flex-col gap-1 border-t border-gray-100 pt-4">
              {/* User Information */}

              <div className="flex items-center gap-3 px-1 pb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                  {firstName?.charAt(0)?.toUpperCase()}
                </div>

                <div>
                  <p className="text-sm font-semibold text-black">
                    {user?.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {user?.email}
                  </p>

                  {role && (
                    <p className="text-xs capitalize text-gray-400">
                      {role}
                    </p>
                  )}
                </div>
              </div>

              {/* =================================================
                  NORMAL USER
              ================================================== */}

              {isNormalUser && (
                <>
                  {/* Become Trainer */}

                  <Link
                    href="/become-trainer"
                    onClick={() => setMobileMenu(false)}
                    className="mb-2 rounded-full border border-black px-5 py-3 text-center text-sm font-semibold transition-colors hover:bg-black hover:text-white"
                  >
                    Become a Trainer
                  </Link>

                  {/* Profile */}

                  <ProfileMenuItem
                    href="/user/profile"
                    icon={User}
                    label="My Profile"
                    onClick={() => setMobileMenu(false)}
                  />

                  {/* Bookings */}

                  <ProfileMenuItem
                    href="/user/bookings"
                    icon={Calendar}
                    label="My Bookings"
                    onClick={() => setMobileMenu(false)}
                  />

                  {/* Training */}

                  <ProfileMenuItem
                    href="/user/training"
                    icon={BookOpen}
                    label="My Training"
                    onClick={() => setMobileMenu(false)}
                  />

                  {/* Settings */}

                  <ProfileMenuItem
                    href="/user/settings"
                    icon={Settings}
                    label="Settings"
                    onClick={() => setMobileMenu(false)}
                  />
                </>
              )}

              {/* =================================================
                  TRAINER
              ================================================== */}

              {isTrainer && (
                <>
                  {/* Trainer Profile */}

                  <ProfileMenuItem
                    href="/trainer/profile"
                    icon={User}
                    label="My Profile"
                    onClick={() => setMobileMenu(false)}
                  />

                  {/* Trainer Dashboard */}

                  <ProfileMenuItem
                    href="/trainer/dashboard"
                    icon={LayoutDashboard}
                    label="Trainer Dashboard"
                    onClick={() => setMobileMenu(false)}
                  />

                  {/* Trainer Settings */}

                  <ProfileMenuItem
                    href="/trainer/settings"
                    icon={Settings}
                    label="Settings"
                    onClick={() => setMobileMenu(false)}
                  />
                </>
              )}

              {/* =================================================
                  ADMIN
              ================================================== */}

              {isAdmin && (
                <>
                  {/* Admin Profile */}

                  <ProfileMenuItem
                    href="/admin/profile"
                    icon={User}
                    label="My Profile"
                    onClick={() => setMobileMenu(false)}
                  />

                  {/* Admin Dashboard */}

                  <ProfileMenuItem
                    href="/admin/dashboard"
                    icon={ShieldCheck}
                    label="Admin Dashboard"
                    onClick={() => setMobileMenu(false)}
                  />

                  {/* Admin Settings */}

                  <ProfileMenuItem
                    href="/admin/settings"
                    icon={Settings}
                    label="Settings"
                    onClick={() => setMobileMenu(false)}
                  />
                </>
              )}

              {/* =================================================
                  LOGOUT
              ================================================== */}

              <button
                onClick={handleLogout}
                className="mt-1 flex items-center gap-3 px-1 py-2.5 text-sm font-medium text-red-600 transition-colors hover:text-red-700"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

/* =============================================================
   PROFILE MENU ITEM
============================================================= */

function ProfileMenuItem({
  href,
  icon: Icon,
  label,
  onClick,
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-black"
    >
      <Icon size={17} />
      {label}
    </Link>
  );
}