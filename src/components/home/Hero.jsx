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
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-black text-white">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <picture>
          {/* Mobile Background */}
          <source
            media="(max-width: 767px)"
            srcSet="https://images.pexels.com/photos/24244667/pexels-photo-24244667.jpeg"
          />

          {/* Tablet + Desktop Background */}
          <img
            src="https://images.pexels.com/photos/3838857/pexels-photo-3838857.jpeg"
            alt="Fitness trainer"
            className="h-full w-full object-cover object-center animate-kenburns"
          />
        </picture>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Left side gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* HERO CONTENT */}
      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-16 lg:px-8 lg:py-20">

        {/* LEFT CONTENT */}
        <div className="max-w-2xl">

          {/* Badge */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-md animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>

            Your fitness journey starts here
          </div>

          {/* Heading */}
          <h1
            className="text-5xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl xl:text-[82px] animate-fade-up"
            style={{ animationDelay: "0.25s" }}
          >
            TRANSFORM
            <br />
            YOUR <span className="text-white/45">BODY.</span>
            <br />
            TRANSFORM
            <br />
            YOUR LIFE.
          </h1>

          {/* Description */}
          <p
            className="mt-7 max-w-xl text-base leading-7 text-white/70 sm:text-lg animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            Train with certified trainers, follow personalized programs,
            and build the stronger, healthier version of yourself.
          </p>

          {/* Buttons */}
          <div
            className="mt-9 flex flex-col gap-3 sm:flex-row animate-fade-up"
            style={{ animationDelay: "0.55s" }}
          >
            <Link
              href="/trainers"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 hover:shadow-xl"
            >
              Find Your Trainer

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-black hover:shadow-lg"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
                <Play size={12} fill="currentColor" />
              </span>

              Book a Free Demo
            </Link>
          </div>

          {/* Trust Points */}
          <div
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/65 animate-fade-up"
            style={{ animationDelay: "0.7s" }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-white" />
              Certified Trainers
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-white" />
              Personalized Plans
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-white" />
              Flexible Training
            </div>
          </div>
        </div>

        {/* MOBILE STATS */}
        <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-3 sm:hidden">

          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
            <p className="text-xs uppercase tracking-wider text-white/50">
              Community
            </p>

            <p className="mt-1 text-2xl font-black">
              10K+
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
            <p className="text-xs uppercase tracking-wider text-white/50">
              Rating
            </p>

            <p className="mt-1 text-2xl font-black">
              4.9/5
            </p>
          </div>

        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-8 right-8 hidden flex-col items-center gap-2 text-white/50 animate-soft-bounce lg:flex">
          <span className="text-xs uppercase tracking-widest [writing-mode:vertical-rl]">
            Scroll
          </span>

          <ChevronDown size={18} />
        </div>

      </div>
    </section>
  );
}

