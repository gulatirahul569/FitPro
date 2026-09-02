import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const points = [
  "Build your profile",
  "Share your fitness content",
  "Find personal training clients",
  "Grow your income",
];

export default function BecomeTrainer() {
  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="max-w-5xl mx-auto rounded-3xl bg-black text-white px-8 py-14 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Want To Become A Trainer?
        </h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Turn your fitness knowledge into a career.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-10 text-left">
          {points.map((point) => (
            <div key={point} className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-white shrink-0" />
              <span className="text-sm">{point}</span>
            </div>
          ))}
        </div>

        <Link
          href="/become-trainer"
          className="inline-block px-8 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition-colors"
        >
          Apply as Trainer
        </Link>
      </div>
    </section>
  );
}