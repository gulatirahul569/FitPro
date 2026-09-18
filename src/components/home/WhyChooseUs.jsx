import {
  BadgeCheck,
  CalendarClock,
  ChartNoAxesCombined,
  ClipboardCheck,
  Dumbbell,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const benefits = [
  {
    title: "Certified Trainers",
    icon: BadgeCheck,
  },
  {
    title: "Personalized Training",
    icon: ClipboardCheck,
  },
  {
    title: "Flexible Scheduling",
    icon: CalendarClock,
  },
  {
    title: "Verified Profiles",
    icon: UserRoundCheck,
  },
  {
    title: "Expert Guidance",
    icon: Dumbbell,
  },
  {
    title: "Progress Tracking",
    icon: ChartNoAxesCombined,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 px-6 py-20 md:px-12 md:py-10 md:pt-0 ">
      <div className="mx-auto grid max-w-7xl px-10 grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* ================= BENEFITS / LEFT ================= */}
        <Reveal>
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs">
              The FitPro Difference
            </p>

            <h2 className="text-3xl font-black uppercase leading-tight text-black sm:text-4xl md:text-5xl">
              Built for
              <br />
              <span className="text-black/20">better training.</span>
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-7 text-black/60 sm:text-base">
              FitPro brings trusted trainers, flexible workouts, and practical
              support into one simple fitness experience built around your
              goals.
            </p>

            {/* Benefit grid */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="group flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-md"
                    style={{
                      transitionDelay: `${index * 30}ms`,
                    }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-black transition-all duration-300 group-hover:scale-110 group-hover:bg-black group-hover:text-white">
                      <Icon size={19} strokeWidth={2} />
                    </div>

                    <span className="text-sm font-semibold text-black">
                      {benefit.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bottom message */}
            <div className="mt-8 border-t border-black/10 pt-7 sm:mt-10 sm:pt-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white sm:h-12 sm:w-12">
                  <Sparkles size={19} />
                </div>

                <div>
                  <p className="text-sm font-bold text-black sm:text-base">
                    Your fitness, made simpler.
                  </p>

                  <p className="mt-1 text-xs text-black/40 sm:text-sm">
                    Find the right coach, build a plan, and keep moving forward.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ================= IMAGE / RIGHT ================= */}
        <Reveal delay={120}>
          <div className="relative mx-auto mb-10 w-full max-w-lg md:mb-0 lg:max-w-none">
            {/* Offset background frame */}
            <div className="absolute -right-4 -top-4 h-full w-full rounded-3xl border border-black/10 bg-white sm:-right-5 sm:-top-5" />

            <div className="relative h-[420px] w-full overflow-hidden rounded-3xl bg-gray-200 sm:h-[480px] md:h-[560px]">
              <img
                src="https://images.pexels.com/photos/6827092/pexels-photo-6827092.jpeg"
                alt="Personal trainer coaching a client during a workout"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/75">
                  Training that fits your life
                </p>

                <h3 className="max-w-sm text-2xl font-bold leading-tight md:text-3xl">
                  Find the right guidance for every goal.
                </h3>
              </div>
            </div>

            {/* Floating verified card */}
            <div className="absolute -bottom-6 left-6 right-6 flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-xl sm:left-8 sm:right-auto sm:w-72">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-white">
                <ShieldCheck size={21} />
              </div>

              <div>
                <p className="text-sm font-bold text-black">
                  Verified Experts
                </p>

                <p className="mt-1 text-xs text-black/50">
                  Guidance you can trust.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}