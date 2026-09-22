import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CircleDollarSign,
  FileUser,
  UsersRound,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";


const points = [
  {
    text: "Build your profile",
    icon: FileUser,
  },
  {
    text: "Share your fitness content",
    icon: BadgeCheck,
  },
  {
    text: "Find personal training clients",
    icon: UsersRound,
  },
  {
    text: "Grow your income",
    icon: CircleDollarSign,
  },
];


export default function BecomeTrainer() {
  return (
    <section className="bg-gray-50 px-6 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12">
      <div className="mx-auto grid max-w-7xl lg:px-6 grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        {/* ================= VISUAL / LEFT ================= */}
        <Reveal>
          <div className="relative mb-10 md:mb-0">
            <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-gray-200 sm:h-80 md:h-96 lg:h-[580px]">
              {/* Mobile image */}
              <img
                src="https://images.pexels.com/photos/13621289/pexels-photo-13621289.jpeg"
                alt="Fitness trainer exercising in a gym"
                className="block h-full w-full object-cover sm:hidden"
              />

              {/* Desktop image */}
              <img
                src="https://images.pexels.com/photos/12890882/pexels-photo-12890882.jpeg"
                alt="Fitness trainer exercising in a gym"
                className="hidden h-full w-full object-cover sm:block"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>

            {/* Floating information card */}
            <div className="absolute -bottom-4 left-3 right-3 flex items-center gap-3 rounded-xl border border-black/5 bg-white p-3.5 shadow-lg sm:-bottom-5 sm:left-4 sm:right-auto sm:w-64 sm:p-4 sm:rounded-2xl">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white sm:h-11 sm:w-11">
                <UsersRound size={18} className="sm:size-[20]" />
              </div>

              <div>
                <p className="text-xs font-bold text-black sm:text-sm">
                  Grow with FitPro
                </p>

                <p className="mt-0.5 text-[10px] text-black/50 sm:text-xs">
                  Turn your expertise into impact.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ================= CONTENT / RIGHT ================= */}
        <Reveal delay={120}>
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs sm:mb-4">
              Join the FitPro Network
            </p>

            <h2 className="text-2xl font-black uppercase leading-tight text-black sm:text-3xl md:text-4xl lg:text-5xl">
              Turn passion
              <br />
              <span className="text-black/20">into a career.</span>
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-black/60 sm:mt-6 sm:space-y-5 sm:text-base sm:leading-7">
              <p>
                Create your trainer profile, share what you know, and connect
                with people who are ready to take their fitness seriously.
              </p>

              <p>
                FitPro gives you the tools to build your professional presence,
                manage your services, and grow your personal training business.
              </p>
            </div>

            {/* Trainer benefits */}
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3">
              {points.map((point) => {
                const Icon = point.icon;

                return (
                  <div
                    key={point.text}
                    className="flex items-center gap-2.5 rounded-lg border border-black/10 bg-white px-3 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-sm sm:rounded-xl sm:px-4 sm:py-3.5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white sm:h-9 sm:w-9">
                      <Icon size={17} strokeWidth={2} />
                    </div>

                    <span className="text-xs font-semibold text-black sm:text-sm">
                      {point.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Same bottom callout style as OurStory */}
            <div className="mt-6 border-t border-black/10 pt-5 sm:mt-8 sm:pt-6 md:mt-10 md:pt-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white sm:h-11 sm:w-11 md:h-12 md:w-12">
                    <BadgeCheck size={17} className="sm:size-[19]" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-black sm:text-base">
                      Ready to train professionally?
                    </p>

                    <p className="mt-1 text-xs text-black/40 sm:text-sm">
                      Build your profile and start growing today.
                    </p>
                  </div>
                </div>

                <Link
                  href="/become-trainer"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-xl sm:w-auto"
                >
                  Apply now

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}