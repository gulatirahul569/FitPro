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
    <section className="relative min-h-screen overflow-hidden bg-gray-50 text-black md:min-h-screen">
      {/* ================= BACKGROUND IMAGE ================= */}
      <div className="absolute inset-0 h-full w-full">
        <picture>
          {/* Mobile background */}
          <source
            media="(max-width: 767px)"
            srcSet="https://images.pexels.com/photos/6811166/pexels-photo-6811166.jpeg"
          />

          {/* Desktop background */}
          <img
            src="https://images.pexels.com/photos/6311509/pexels-photo-6311509.jpeg"
            alt="Fitness trainer working out"
            className="h-full w-full object-cover object-center animate-kenburns"
          />
        </picture>

        {/* Keep the original bright overlay on desktop; no blur effect added */}
        <div className="absolute inset-0 bg-white/2" />
      </div>

      {/* ================= HERO CONTENT ================= */}
      <div className="relative mx-auto  flex  max-w-7xl items-center px-6 sm:px-6 sm:py-16 md:mt-0 md:min-h-0 lg:min-h-screen lg:px-8 lg:py-20">
        <div className="w-full max-w-2xl  mt-12">
          {/* Badge */}
          <div
            className="animate-fade-up mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3.5 py-2 text-xs font-medium text-black shadow-sm backdrop-blur-md sm:mb-6 sm:px-4 sm:text-sm"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/40 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-black" />
            </span>

            Your fitness journey starts here
          </div>

          {/* Heading */}
          <h1
            className="animate-fade-up text-[42px] font-black leading-[0.94] tracking-[-0.045em] text-black xs:text-[46px] sm:text-6xl md:text-7xl lg:text-7xl xl:text-[82px]"
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
            className="animate-fade-up mt-6 max-w-xl text-sm leading-6 text-black/60 sm:mt-7 sm:text-lg sm:leading-7"
            style={{ animationDelay: "0.4s" }}
          >
            Train with certified trainers, follow personalized programs, and
            build the stronger, healthier version of yourself.
          </p>

          {/* Buttons */}
          <div
            className="animate-fade-up mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row"
            style={{ animationDelay: "0.55s" }}
          >
            <Link
              href="/trainers"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-black px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-xl active:scale-[0.98] sm:w-auto sm:px-7 sm:py-4"
            >
              Find Your Trainer

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/videos"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-black/15 bg-white/75 px-6 py-3.5 text-sm font-bold text-black backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-black hover:bg-black hover:text-white hover:shadow-lg active:scale-[0.98] sm:w-auto sm:px-7 sm:py-4"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                <Play size={12} fill="currentColor" />
              </span>

              See Demo Videos
            </Link>
          </div>

          {/* Trust points */}
          <div
            className="animate-fade-up mt-10 grid grid-cols-1 gap-2.5 text-lg text-white sm:mt-10 sm:flex sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3"
            style={{ animationDelay: "0.7s" }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="shrink-0 text-white" />
              Certified Trainers
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="shrink-0 text-white" />
              Personalized Plans
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="shrink-0 text-white" />
              Flexible Training
            </div>
          </div>

          {/* Mobile stats */}
          <div
            className="mt-10 mb-5 grid grid-cols-2 gap-3 animate-fade-up sm:hidden"
            style={{ animationDelay: "0.85s" }}
          >
            <div className="min-w-0 rounded-2xl border border-black/10 bg-white/80 p-4 shadow-sm backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
              <p className="text-[10px] uppercase tracking-wider text-black/45">
                Community
              </p>

              <p className="mt-1 text-2xl font-black text-black">10K+</p>
            </div>

            <div className="min-w-0 rounded-2xl border border-black/10 bg-white/80 p-4 shadow-sm backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
              <p className="text-[10px] uppercase tracking-wider text-black/45">
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

      {/* Mobile animation */}
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 animate-pulse rounded-full bg-white/10 blur-3xl sm:hidden" />
    </section>
  );
}