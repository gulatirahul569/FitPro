import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function FinalCta() {
  return (
    <section className="bg-gray-50 px-6 py-20 md:px-12 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* ================= CONTENT / LEFT ================= */}
        <Reveal>
          <div className="flex flex-col items-start">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-gray-50 px-4 py-2 text-xs font-semibold text-black">
              <Sparkles size={15} />
              Your next step starts here
            </div>

            <h2 className="text-4xl font-black leading-[1.02] tracking-tight text-black md:text-5xl">
              Your Fitness Journey
              <br />
              <span className="text-black/20">Starts Today.</span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-black/60 md:text-lg">
              Find a trainer, book a session, and build the routine that helps
              you get stronger, healthier, and more confident.
            </p>

            <div className="mt-9">
              <Link
                href="/trainers"
                className="group inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-xl"
              >
                Get Started

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* ================= IMAGE / RIGHT ================= */}
        <Reveal delay={120}>
          <div className="relative mx-auto w-full max-w-lg md:max-w-none">
            {/* Light offset frame */}
            <div className="absolute -right-4 -top-4 h-full w-full rounded-3xl border border-black/10 bg-gray-50 sm:-right-5 sm:-top-5" />

            <div className="relative h-[350px] w-full overflow-hidden rounded-3xl bg-gray-200 sm:h-[420px] md:h-[460px]">
              <img
                src="https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg"
                alt="Person exercising in a fitness gym"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-white/75">
                  Stronger every day
                </p>

                <p className="max-w-xs text-xl font-bold leading-tight md:text-2xl">
                  Start with a trainer who understands your goals.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}