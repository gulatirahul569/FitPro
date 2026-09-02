import { Search, UserCheck, CalendarCheck, Dumbbell } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Find",
    description: "Discover trainers that match your goals and location.",
    icon: Search,
  },
  {
    number: "02",
    title: "Choose",
    description: "Pick the trainer that fits you best.",
    icon: UserCheck,
  },
  {
    number: "03",
    title: "Book",
    description: "Book a free demo session in just a few clicks.",
    icon: CalendarCheck,
  },
  {
    number: "04",
    title: "Train",
    description: "Start your journey and track your progress.",
    icon: Dumbbell,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
                    <Icon size={26} className="text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 text-xs font-bold bg-white border border-black rounded-full w-6 h-6 flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-black mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 max-w-[200px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}