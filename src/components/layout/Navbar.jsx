"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
  Building2,
  ChevronDown,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#our-story", label: "About" },
  { href: "/trainers", label: "Trainers" },
  { href: "/videos", label: "Videos" },
  { href: "/gyms", label: "Gyms" },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isLoggedIn = status === "authenticated";
  const user = session?.user;
  const firstName = user?.name?.split(" ")[0];

  const role = user?.role;

  const isNormalUser = role === "user";
  const isTrainer = role === "trainer";
  const isAdmin = role === "admin";
  const isGymOwner = role === "gym-owner";

  const isDashboard =
    pathname.startsWith("/user/") ||
    pathname.startsWith("/trainer/") ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith("/gym-owner/");

  const showBecomeTrainer = !isLoggedIn || isNormalUser;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isGlassTransparent = pathname === "/" && !isDashboard && !isScrolled;

  const handleLogout = async () => {
    setProfileMenu(false);
    setMobileMenu(false);

    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <header
      className={`z-50 transition-colors duration-300 ${
        isDashboard
          ? "relative border-b border-gray-200 bg-white"
          : `fixed inset-x-0 top-0 ${
              isGlassTransparent
                ? "border-b border-white/10 bg-transparent"
                : "border-b border-white/20 bg-white/70 shadow-sm shadow-black/5 backdrop-blur-xl"
            }`
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ease-out group-hover:rotate-12 ${
              isGlassTransparent
                ? "border border-white/20 bg-white/10 text-white backdrop-blur-md"
                : "bg-black text-white"
            }`}
          >
            <Dumbbell size={22} />
          </div>

          <span
            className={`text-3xl font-extrabold tracking-tight transition-colors duration-300 ${
              isGlassTransparent ? "text-white" : "text-black"
            }`}
          >
            FIT
            <span
              className={
                isGlassTransparent ? "text-white/50" : "text-gray-500"
              }
            >
              PRO
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative text-lg font-medium transition-colors duration-300 ${
                isGlassTransparent
                  ? "text-white hover:text-white"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {link.label}

              <span
                className={`absolute -bottom-1 left-0 h-[1.5px] w-0 transition-all duration-300 ease-out group-hover:w-full ${
                  isGlassTransparent ? "bg-white" : "bg-black"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          {!isLoggedIn && (
            <>
              <Link
                href="/become-trainer"
                className={`rounded-full px-5 py-2.5 text-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                  isGlassTransparent
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                Become a Trainer
              </Link>

              <Link
                href="/login"
                className={`rounded-full px-5 py-2.5 text-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                  isGlassTransparent
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                Login
              </Link>
            </>
          )}

          {isLoggedIn && (
            <div className="flex items-center gap-3">
              {showBecomeTrainer && (
                <Link
                  href="/become-trainer"
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                    isGlassTransparent
                      ? "border border-white/40 text-white backdrop-blur-md hover:bg-white hover:text-black"
                      : "border border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  Become a Trainer
                </Link>
              )}

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileMenu((current) => !current)}
                  className={`flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 transition-colors duration-300 ${
                    isGlassTransparent
                      ? "border border-white/30 bg-white/10 backdrop-blur-md hover:border-white/50"
                      : "border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                      isGlassTransparent
                        ? "bg-white text-black"
                        : "bg-black text-white"
                    }`}
                  >
                    {firstName?.charAt(0)?.toUpperCase()}
                  </div>

                  <span
                    className={`text-sm font-medium ${
                      isGlassTransparent ? "text-white" : "text-black"
                    }`}
                  >
                    {firstName}
                  </span>

                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      profileMenu ? "rotate-180" : ""
                    } ${isGlassTransparent ? "text-white/80" : "text-gray-500"}`}
                  />
                </button>

                {profileMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileMenu(false)}
                    />

                    <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                      <div className="border-b border-gray-100 px-4 py-4">
                        <p className="font-semibold text-black">
                          {user?.name}
                        </p>

                        <p className="text-sm text-gray-500">{user?.email}</p>

                        {role && (
                          <p className="mt-1 text-xs capitalize text-gray-400">
                            {role}
                          </p>
                        )}
                      </div>

                      <div className="py-2">
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

                        {isGymOwner && (
                          <>
                            <ProfileMenuItem
                              href="/gym-owner/dashboard"
                              icon={Building2}
                              label="Gym Owner Dashboard"
                              onClick={() => setProfileMenu(false)}
                            />

                            <ProfileMenuItem
                              href="/gym-owner/profile"
                              icon={Building2}
                              label="Gym Profile"
                              onClick={() => setProfileMenu(false)}
                            />

                            <ProfileMenuItem
                              href="/gym-owner/trainers"
                              icon={Calendar}
                              label="Trainer Requests"
                              onClick={() => setProfileMenu(false)}
                            />

                            <ProfileMenuItem
                              href="/gym-owner/settings"
                              icon={Settings}
                              label="Settings"
                              onClick={() => setProfileMenu(false)}
                            />
                          </>
                        )}

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

                      <div className="border-t border-gray-100 py-2">
                        <button
                          type="button"
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

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenu((current) => !current)}
          className="rounded-lg p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileMenu}
        >
          <div className="relative h-6 w-6">
            <Menu
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                isGlassTransparent ? "text-white" : "text-black"
              } ${
                mobileMenu
                  ? "scale-50 rotate-90 opacity-0"
                  : "scale-100 rotate-0 opacity-100"
              }`}
            />

            <X
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                isGlassTransparent ? "text-white" : "text-black"
              } ${
                mobileMenu
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-50 -rotate-90 opacity-0"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t transition-all duration-300 ease-out md:hidden ${
          isGlassTransparent
            ? "border-white/10 bg-black/70 backdrop-blur-xl"
            : "border-gray-200 bg-white"
        } ${
          mobileMenu
            ? "max-h-[45rem] opacity-100"
            : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-4 px-6 py-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenu(false)}
              className={`font-medium transition-colors ${
                isGlassTransparent
                  ? "text-white/90 hover:text-white"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {!isLoggedIn && (
            <div className="mt-2 flex flex-col gap-3">
              <Link
                href="/become-trainer"
                onClick={() => setMobileMenu(false)}
                className={`rounded-full px-5 py-3 text-center font-semibold transition-colors ${
                  isGlassTransparent
                    ? "border border-white/40 text-white hover:bg-white hover:text-black"
                    : "border border-black text-black hover:bg-black hover:text-white"
                }`}
              >
                Become a Trainer
              </Link>

              <Link
                href="/login"
                onClick={() => setMobileMenu(false)}
                className={`rounded-full px-5 py-3 text-center font-semibold transition-colors ${
                  isGlassTransparent
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                Login
              </Link>
            </div>
          )}

          {isLoggedIn && (
            <div
              className={`mt-2 flex flex-col gap-1 border-t pt-4 ${
                isGlassTransparent ? "border-white/10" : "border-gray-100"
              }`}
            >
              <div className="flex items-center gap-3 px-1 pb-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                    isGlassTransparent
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  }`}
                >
                  {firstName?.charAt(0)?.toUpperCase()}
                </div>

                <div>
                  <p
                    className={`text-sm font-semibold ${
                      isGlassTransparent ? "text-white" : "text-black"
                    }`}
                  >
                    {user?.name}
                  </p>

                  <p
                    className={`text-xs ${
                      isGlassTransparent ? "text-white/60" : "text-gray-500"
                    }`}
                  >
                    {user?.email}
                  </p>

                  {role && (
                    <p
                      className={`text-xs capitalize ${
                        isGlassTransparent
                          ? "text-white/50"
                          : "text-gray-400"
                      }`}
                    >
                      {role}
                    </p>
                  )}
                </div>
              </div>

              {isNormalUser && (
                <>
                  <Link
                    href="/become-trainer"
                    onClick={() => setMobileMenu(false)}
                    className={`mb-2 rounded-full px-5 py-3 text-center text-sm font-semibold transition-colors ${
                      isGlassTransparent
                        ? "border border-white/40 text-white hover:bg-white hover:text-black"
                        : "border border-black text-black hover:bg-black hover:text-white"
                    }`}
                  >
                    Become a Trainer
                  </Link>

                  <ProfileMenuItem
                    href="/user/profile"
                    icon={User}
                    label="My Profile"
                    onClick={() => setMobileMenu(false)}
                    light={isGlassTransparent}
                  />

                  <ProfileMenuItem
                    href="/user/bookings"
                    icon={Calendar}
                    label="My Bookings"
                    onClick={() => setMobileMenu(false)}
                    light={isGlassTransparent}
                  />

                  <ProfileMenuItem
                    href="/user/training"
                    icon={BookOpen}
                    label="My Training"
                    onClick={() => setMobileMenu(false)}
                    light={isGlassTransparent}
                  />

                  <ProfileMenuItem
                    href="/user/settings"
                    icon={Settings}
                    label="Settings"
                    onClick={() => setMobileMenu(false)}
                    light={isGlassTransparent}
                  />
                </>
              )}

              {isTrainer && (
                <>
                  <ProfileMenuItem
                    href="/trainer/profile"
                    icon={User}
                    label="My Profile"
                    onClick={() => setMobileMenu(false)}
                    light={isGlassTransparent}
                  />

                  <ProfileMenuItem
                    href="/trainer/dashboard"
                    icon={LayoutDashboard}
                    label="Trainer Dashboard"
                    onClick={() => setMobileMenu(false)}
                    light={isGlassTransparent}
                  />

                  <ProfileMenuItem
                    href="/trainer/settings"
                    icon={Settings}
                    label="Settings"
                    onClick={() => setMobileMenu(false)}
                    light={isGlassTransparent}
                  />
                </>
              )}

              {isGymOwner && (
                <>
                  <ProfileMenuItem
                    href="/gym-owner/dashboard"
                    icon={Building2}
                    label="Gym Owner Dashboard"
                    onClick={() => setMobileMenu(false)}
                    light={isGlassTransparent}
                  />

                  <ProfileMenuItem
                    href="/gym-owner/profile"
                    icon={Building2}
                    label="Gym Profile"
                    onClick={() => setMobileMenu(false)}
                    light={isGlassTransparent}
                  />

                  <ProfileMenuItem
                    href="/gym-owner/trainers"
                    icon={Calendar}
                    label="Trainer Requests"
                    onClick={() => setMobileMenu(false)}
                    light={isGlassTransparent}
                  />

                  <ProfileMenuItem
                    href="/gym-owner/settings"
                    icon={Settings}
                    label="Settings"
                    onClick={() => setMobileMenu(false)}
                    light={isGlassTransparent}
                  />
                </>
              )}

              {isAdmin && (
                <>
                  <ProfileMenuItem
                    href="/admin/profile"
                    icon={User}
                    label="My Profile"
                    onClick={() => setMobileMenu(false)}
                    light={isGlassTransparent}
                  />

                  <ProfileMenuItem
                    href="/admin/dashboard"
                    icon={ShieldCheck}
                    label="Admin Dashboard"
                    onClick={() => setMobileMenu(false)}
                    light={isGlassTransparent}
                  />

                  <ProfileMenuItem
                    href="/admin/settings"
                    icon={Settings}
                    label="Settings"
                    onClick={() => setMobileMenu(false)}
                    light={isGlassTransparent}
                  />
                </>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="mt-1 flex items-center gap-3 px-1 py-2.5 text-sm font-medium text-red-500 transition-colors hover:text-red-600"
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

function ProfileMenuItem({ href, icon: Icon, label, onClick, light = false }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
        light
          ? "text-white/90 hover:bg-white/10 hover:text-white"
          : "text-gray-700 hover:bg-gray-50 hover:text-black"
      }`}
    >
      <Icon size={17} />
      {label}
    </Link>
  );
}