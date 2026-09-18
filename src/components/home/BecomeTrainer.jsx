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
    <section className="bg-gray-50 px-6 py-20 md:px-12 md:py-10 md:pt-0">
      <div className="mx-auto grid max-w-7xl px-10 grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* ================= VISUAL / LEFT ================= */}
        <Reveal>
          <div className="relative mb-10 md:mb-0">
            <div className="relative h-[420px] w-full overflow-hidden rounded-3xl bg-gray-200 sm:h-[480px] md:h-[560px]">
              <img
                src="https://images.pexels.com/photos/12890882/pexels-photo-12890882.jpeg"
                alt="Fitness trainer exercising in a gym"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>

            {/* Floating information card */}
            <div className="absolute -bottom-6 left-6 right-6 flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-xl sm:left-8 sm:right-auto sm:w-72">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-white">
                <UsersRound size={20} />
              </div>

              <div>
                <p className="text-sm font-bold text-black">
                  Grow with FitPro
                </p>

                <p className="mt-1 text-xs text-black/50">
                  Turn your expertise into impact.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ================= CONTENT / RIGHT ================= */}
        <Reveal delay={120}>
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs">
              Join the FitPro Network
            </p>

            <h2 className="text-3xl font-black uppercase leading-tight text-black sm:text-4xl md:text-5xl">
              Turn passion
              <br />
              <span className="text-black/20">into a career.</span>
            </h2>

            <div className="mt-7 space-y-5 text-sm leading-7 text-black/60 sm:text-base">
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
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {points.map((point) => {
                const Icon = point.icon;

                return (
                  <div
                    key={point.text}
                    className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-md"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white">
                      <Icon size={17} strokeWidth={2} />
                    </div>

                    <span className="text-sm font-semibold text-black">
                      {point.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Same bottom callout style as OurStory */}
            <div className="mt-8 border-t border-black/10 pt-7 sm:mt-10 sm:pt-8">
              <div className="flex flex-wrap items-center justify-between gap-5">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white sm:h-12 sm:w-12">
                    <BadgeCheck size={19} />
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
                  className="group inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-xl"
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