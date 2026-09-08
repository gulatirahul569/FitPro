"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Dumbbell,
  Heart,
  Target,
  Users,
  ShieldCheck,
  Sparkles,
  MoveUpRight,
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      number: "01",
      icon: Target,
      title: "Purpose Driven",
      text: "Everything we build starts with one goal — helping people become healthier, stronger and more confident.",
    },
    {
      number: "02",
      icon: Users,
      title: "People First",
      text: "Fitness is personal. FitPro connects you with trainers and experiences designed around your individual needs.",
    },
    {
      number: "03",
      icon: ShieldCheck,
      title: "Built on Trust",
      text: "We want users to discover reliable trainers and create meaningful, long-term fitness relationships.",
    },
    {
      number: "04",
      icon: Dumbbell,
      title: "Progress Matters",
      text: "Small improvements every day can create major changes over time. FitPro is built around consistency.",
    },
  ];

  const stats = [
    {
      value: "10K+",
      label: "Members",
    },
    {
      value: "500+",
      label: "Trainers",
    },
    {
      value: "50K+",
      label: "Sessions",
    },
    {
      value: "100+",
      label: "Programs",
    },
  ];

  return (
    <main className="overflow-hidden bg-white text-black">

      {/* =========================================================
          INTRO
      ========================================================= */}

      <section className="relative border-b border-black/10">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-18 md:pb-24 md:pt-20 lg:px-8 lg:pb-28 lg:pt-24">

          <div className="grid gap-8 md:gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">

            {/* Small heading */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 animate-pulse rounded-full bg-black" />

                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/50 sm:text-xs">
                  About FitPro
                </span>
              </div>
            </div>

            {/* Main heading */}
            <div className="lg:col-span-9">
              <h1 className="animate-about-title text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-[64px]">
                We believe
                <br />
                <span className="text-black/20">fitness</span> should
                <br />
                feel personal.
              </h1>
            </div>
          </div>

          {/* Intro text */}
          <div className="mt-12 grid gap-6 border-t border-black/10 pt-7 sm:mt-14 sm:pt-8 md:mt-16 md:grid-cols-12 md:gap-10">

            <div className="md:col-span-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 sm:text-xs">
                Our idea
              </p>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <p className="text-base leading-7 text-black/65 sm:text-lg md:text-xl md:leading-8">
                FitPro is a fitness platform created to make finding the right
                trainer, discovering useful fitness content and starting your
                fitness journey easier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          BIG STATEMENT
      ========================================================= */}

      <section className="bg-black/85 py-16 text-white sm:py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">

            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 text-white/50">
                <Sparkles size={16} />

                <span className="text-[10px] font-bold uppercase tracking-[0.22em] sm:text-xs">
                  Why we exist
                </span>
              </div>
            </div>

            <div className="lg:col-span-8">
              <h2 className="text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Fitness should not be
                <span className="text-white/25"> complicated.</span>
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-7 text-white/55 sm:text-lg md:leading-8">
                Finding the right trainer, understanding what to train and
                staying consistent can often feel overwhelming. FitPro brings
                these experiences together in one platform.
              </p>

              <p className="mt-5 max-w-3xl text-base leading-7 text-white/55 sm:text-lg md:leading-8">
                Whether you are taking your first step into fitness or already
                have years of experience, our goal is to help you find the
                guidance and resources you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STATS
      ========================================================= */}

      <section className="border-b border-black/10 bg-[#f5f5f3]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="grid grid-cols-2 md:grid-cols-4">

            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`group px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-16 ${
                  index !== 0 ? "border-l border-black/10" : ""
                }`}
              >
                <p className="text-3xl font-black tracking-tight transition-transform duration-300 group-hover:-translate-y-1 sm:text-4xl md:text-5xl">
                  {stat.value}
                </p>

                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-black/40 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          IMAGE + STORY
      ========================================================= */}

      <section className="py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">

            {/* IMAGE */}
            <div className="relative">

              {/* Decorative corner */}
              <div className="absolute -left-2 -top-2 h-16 w-16 border-l border-t border-black/30 sm:-left-4 sm:-top-4 sm:h-20 sm:w-20" />

              <div className="group relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3764014/pexels-photo-3764014.jpeg"
                  alt="Personal fitness training"
                  className="h-[380px] w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 sm:h-[480px] md:h-[540px] lg:h-[580px]"
                />

                <div className="absolute inset-0 bg-black/10 transition-all duration-500 group-hover:bg-transparent" />

                {/* Image label */}
                <div className="absolute bottom-4 left-4 bg-white px-4 py-2.5 sm:bottom-6 sm:left-6 sm:px-5 sm:py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] sm:text-xs">
                    Train With Purpose
                  </p>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute -bottom-2 -right-2 h-16 w-16 border-b border-r border-black/30 sm:-bottom-4 sm:-right-4 sm:h-20 sm:w-20" />
            </div>

            {/* STORY */}
            <div className="flex flex-col justify-center">

              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs">
                The FitPro Story
              </p>

              <h2 className="text-3xl font-black uppercase leading-tight sm:text-4xl md:text-5xl">
                Built for
                <br />
                <span className="text-black/20">real progress.</span>
              </h2>

              <div className="mt-7 space-y-5 text-sm leading-7 text-black/60 sm:text-base">

                <p>
                  We created FitPro around a simple idea: everyone should have
                  access to the right fitness guidance.
                </p>

                <p>
                  Instead of searching through different platforms for
                  trainers, workouts and fitness resources, FitPro brings the
                  experience together.
                </p>

                <p>
                  Users can discover trainers and fitness content, while
                  trainers can build their professional presence, manage
                  clients and grow their fitness business.
                </p>

              </div>

              <div className="mt-8 border-t border-black/10 pt-7 sm:mt-10 sm:pt-8">

                <div className="flex items-center gap-3 sm:gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white sm:h-12 sm:w-12">
                    <Heart size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-bold sm:text-base">
                      Health. Strength. Confidence.
                    </p>

                    <p className="mt-1 text-xs text-black/40 sm:text-sm">
                      Everything starts with taking the first step.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VALUES
      ========================================================= */}

      <section className="bg-[#f5f5f3] py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          {/* Section heading */}
          <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 md:mb-14 lg:flex-row lg:items-end">

            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs">
                What we stand for
              </p>

              <h2 className="text-3xl font-black uppercase leading-tight sm:text-4xl md:text-5xl">
                Our
                <br />
                <span className="text-black/20">Values.</span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-black/50">
              The principles behind the platform and the experience we want
              every FitPro member and trainer to have.
            </p>
          </div>

          {/* ================= VALUES GRID ================= */}
          <div className="grid  border-l border-t border-black/10 sm:grid-cols-2 lg:grid-cols-4">

            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.number}
                  className="group relative min-h-[250px] border-b border-r border-black/10 p-6 transition-all duration-500 hover:bg-black/90 hover:text-white sm:p-7 lg:min-h-[320px] lg:p-8"
                >

                  {/* Top */}
                  <div className="flex items-start justify-between">

                    <div className="flex h-11 w-11 items-center justify-center border border-black/15 transition-all duration-300 group-hover:border-white/20">
                      <Icon size={19} />
                    </div>

                    <span className="text-sm font-bold text-black/20 group-hover:text-white/20">
                      {value.number}
                    </span>

                  </div>

                  {/* Content */}
                  <div className="mt-12 lg:mt-16">

                    <h3 className="text-xl font-black uppercase lg:text-[21px]">
                      {value.title}
                    </h3>

                    <p className="mt-3 max-w-md text-sm leading-6 text-black/50 group-hover:text-white/50">
                      {value.text}
                    </p>

                  </div>

                  {/* Arrow */}
                  <MoveUpRight
                    size={18}
                    className="absolute bottom-6 right-6 opacity-0 transition-all duration-300 group-hover:opacity-100"
                  />

                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* =========================================================
          FOR TRAINERS
      ========================================================= */}

      <section className="py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="overflow-hidden bg-black text-white">

            <div className="grid lg:grid-cols-2">

              {/* IMAGE */}
              <div className="relative min-h-[320px] overflow-hidden sm:min-h-[400px] lg:min-h-[450px]">

                <img
                  src="https://images.pexels.com/photos/5327505/pexels-photo-5327505.jpeg"
                  alt="Fitness trainer helping client"
                  className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/35" />

                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60 sm:text-xs">
                    For Fitness Professionals
                  </p>
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex flex-col justify-center p-7 sm:p-9 md:p-12 lg:p-14">

                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40 sm:text-xs">
                  For Trainers
                </p>

                <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl md:text-5xl">
                  Your expertise
                  <br />
                  deserves a
                  <br />
                  <span className="text-white/25">platform.</span>
                </h2>

                <p className="mt-6 max-w-lg text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
                  FitPro gives trainers a place to showcase their expertise,
                  connect with clients, share fitness content and manage their
                  training services.
                </p>

                {/* Features */}
                <div className="mt-7 space-y-3">

                  {[
                    "Create your professional profile",
                    "Connect with potential clients",
                    "Share fitness videos and programs",
                    "Manage your training business",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20">
                        <Check size={13} />
                      </div>

                      <span className="text-xs text-white/70 sm:text-sm">
                        {item}
                      </span>
                    </div>
                  ))}

                </div>

                {/* CTA */}
                <Link
                  href="/become-trainer"
                  className="group mt-8 inline-flex w-full items-center justify-center gap-3 border border-white/20 px-6 py-3.5 text-sm font-bold transition-all duration-300 hover:bg-white hover:text-black sm:w-fit"
                >
                  Become a Trainer

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="border-t border-black/10 bg-white py-20 sm:py-24 md:py-28 lg:py-32">

        <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">

          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white sm:mb-7 sm:h-16 sm:w-16">
            <Dumbbell size={22} />
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/40 sm:text-xs">
            Ready to start?
          </p>

          <h2 className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
            Start
            <br />
            <span className="text-black/20">Your Journey.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-black/50 sm:mt-7 sm:text-base">
            Find the right trainer and take the first step towards becoming a
            stronger version of yourself.
          </p>

          <Link
            href="/trainers"
            className="group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-black px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-black/80 sm:mt-9 sm:w-auto sm:px-8 sm:py-4"
          >
            Explore Trainers

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

        </div>
      </section>

      {/* =========================================================
          ANIMATIONS
      ========================================================= */}

      <style jsx global>{`
        @keyframes aboutTitle {
          from {
            opacity: 0;
            transform: translateY(30px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-about-title {
          animation: aboutTitle 0.9s cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-about-title {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}