"use client";

import Link from "next/link";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-gray-50 text-black">
      {/* ================= BACKGROUND IMAGE ================= */}
      <div className="absolute inset-0">
        <picture>
          {/* Mobile background */}
          <source
            media="(max-width: 767px)"
            srcSet="https://images.pexels.com/photos/24244667/pexels-photo-24244667.jpeg"
          />

          {/* Desktop background */}
          <img
            src="https://images.pexels.com/photos/6311509/pexels-photo-6311509.jpeg"
            alt="Fitness trainer working out"
            className="h-full w-full object-cover object-center animate-kenburns"
          />
        </picture>

        {/* Bright overlay */}
        <div className="absolute inset-0 bg-white/2" />

        
      </div>

      {/* ================= HERO CONTENT ================= */}
      <div className="relative mx-auto flex min-h-fit max-w-7xl items-center px-6 py-10 sm:min-h-[calc(100vh-80px)] sm:py-16 lg:px-8 lg:py-20">
        <div className="w-full max-w-2xl">
          {/* Badge */}
          <div
            className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-black shadow-sm backdrop-blur-md"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/40 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-black" />
            </span>

            Your fitness journey starts here
          </div>

          {/* Heading */}
          <h1
            className="animate-fade-up text-5xl font-black leading-[0.95] tracking-[-0.04em] text-black sm:text-6xl lg:text-7xl xl:text-[82px]"
            style={{ animationDelay: "0.25s" }}
          >
            TRANSFORM
            <br />
            YOUR <span className="text-black/25">BODY.</span>
            <br />
            TRANSFORM
            <br />
            YOUR LIFE.
          </h1>

          {/* Description */}
          <p
            className="animate-fade-up mt-7 max-w-xl text-base leading-7 text-black/60 sm:text-lg"
            style={{ animationDelay: "0.4s" }}
          >
            Train with certified trainers, follow personalized programs, and
            build the stronger, healthier version of yourself.
          </p>

          {/* Buttons */}
          <div
            className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "0.55s" }}
          >
            <Link
              href="/trainers"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-xl"
            >
              Find Your Trainer

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/videos"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-black/15 bg-white/75 px-7 py-4 text-sm font-bold text-black backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-black hover:bg-black hover:text-white hover:shadow-lg"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                <Play size={12} fill="currentColor" />
              </span>

              See Demo Videos
            </Link>
          </div>

          {/* Trust points */}
          <div
            className="animate-fade-up mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-black/60"
            style={{ animationDelay: "0.7s" }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-black" />
              Certified Trainers
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-black" />
              Personalized Plans
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-black" />
              Flexible Training
            </div>
          </div>

          {/* Mobile stats */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:hidden">
            <div className="min-w-0 rounded-2xl border border-black/10 bg-white/80 p-4 shadow-sm backdrop-blur-md">
              <p className="text-xs uppercase tracking-wider text-black/45">
                Community
              </p>

              <p className="mt-1 text-2xl font-black text-black">10K+</p>
            </div>

            <div className="min-w-0 rounded-2xl border border-black/10 bg-white/80 p-4 shadow-sm backdrop-blur-md">
              <p className="text-xs uppercase tracking-wider text-black/45">
                Rating
              </p>

              <p className="mt-1 text-2xl font-black text-black">4.9/5</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="animate-soft-bounce absolute bottom-8 right-8 hidden flex-col items-center gap-2 text-black/45 lg:flex">
          <span className="text-xs uppercase tracking-widest [writing-mode:vertical-rl]">
            Scroll
          </span>

          <ChevronDown size={18} />
        </div>
      </div>
    </section>
  );
}