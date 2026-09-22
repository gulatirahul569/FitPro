import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";


export default function FinalCta() {
  return (
    <section className="bg-gray-50 px-6 pt-0 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12">
      <div className="mx-auto grid max-w-7xl lg:px-6 grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        {/* ================= CONTENT / LEFT ================= */}
        <Reveal>
          <div className="flex flex-col items-start">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-gray-50 px-3.5 py-2 text-xs font-semibold text-black sm:mb-5 sm:px-4">
              <Sparkles size={14} className="sm:size-[15]" />
              Your next step starts here
            </div>

            <h2 className="text-2xl font-black leading-[1.02] tracking-tight text-black sm:text-3xl md:text-4xl lg:text-5xl">
              Your Fitness Journey
              <br />
              <span className="text-black/20">Starts Today.</span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-6 text-black/60 sm:mt-6 sm:text-base sm:leading-7 md:text-lg">
              Find a trainer, book a session, and build the routine that helps
              you get stronger, healthier, and more confident.
            </p>

            <div className="mt-7 sm:mt-8 md:mt-9">
              <Link
                href="/trainers"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-xl sm:w-auto sm:px-8 sm:py-4"
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
          <div className="relative mx-auto w-full max-w-md sm:max-w-lg md:max-w-none">
            {/* Light offset frame */}
            <div className="absolute -right-3 -top-3 h-full w-full rounded-2xl border border-black/10 bg-gray-50 sm:-right-4 sm:-top-4 sm:rounded-3xl" />

            <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-gray-200 sm:h-80 md:h-96 lg:h-[580px]">
              {/* Mobile image */}
              <img
                src="https://images.pexels.com/photos/34100808/pexels-photo-34100808.jpeg"
                alt="Person exercising in a fitness gym"
                className="block h-full w-full object-cover sm:hidden"
              />

              {/* Desktop image */}
              <img
                src="https://images.pexels.com/photos/36986181/pexels-photo-36986181.jpeg"
                alt="Person exercising in a fitness gym"
                className="hidden h-full w-full object-cover sm:block"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-5 md:p-6 lg:p-8">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/75 sm:text-xs">
                  Stronger every day
                </p>

                <p className="max-w-xs text-base font-bold leading-tight sm:text-lg md:text-xl lg:text-2xl">
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