"use client";

import Link from "next/link";
import { Dumbbell, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
            <Dumbbell size={22} />
          </div>

          <span className="text-2xl font-extrabold tracking-tight">
            FIT<span className="text-gray-500">PRO</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 transition hover:text-black"
          >
            Home
          </Link>

          <Link
            href="/trainers"
            className="text-sm font-medium text-gray-700 transition hover:text-black"
          >
            Trainers
          </Link>

          <Link
            href="/videos"
            className="text-sm font-medium text-gray-700 transition hover:text-black"
          >
            Videos
          </Link>

          <Link
            href="/programs"
            className="text-sm font-medium text-gray-700 transition hover:text-black"
          >
            Programs
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-gray-700 transition hover:text-black"
          >
            About
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/become-trainer"
            className="rounded-full border border-black px-5 py-2.5 text-sm font-semibold transition hover:bg-black hover:text-white"
          >
            Become a Trainer
          </Link>

          <Link
            href="/login"
            className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Login
          </Link>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="rounded-lg p-2 md:hidden"
        >
          {mobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="border-t border-gray-200 bg-white px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-4">

            <Link href="/" onClick={() => setMobileMenu(false)}>
              Home
            </Link>

            <Link href="/trainers" onClick={() => setMobileMenu(false)}>
              Trainers
            </Link>

            <Link href="/videos" onClick={() => setMobileMenu(false)}>
              Videos
            </Link>

            <Link href="/programs" onClick={() => setMobileMenu(false)}>
              Programs
            </Link>

            <Link href="/about" onClick={() => setMobileMenu(false)}>
              About
            </Link>

            <div className="mt-2 flex flex-col gap-3">
              <Link
                href="/become-trainer"
                className="rounded-full border border-black px-5 py-3 text-center font-semibold"
              >
                Become a Trainer
              </Link>

              <Link
                href="/login"
                className="rounded-full bg-black px-5 py-3 text-center font-semibold text-white"
              >
                Login
              </Link>
            </div>

          </nav>
        </div>
      )}
    </header>
  );
}