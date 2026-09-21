import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export const metadata = {
  title: "Frequently Asked Questions | FitPro",
  description:
    "Answers to common questions about FitPro, trainers, gyms, and memberships.",
};

const faqs = [
  {
    q: "What is FitPro?",
    a: "FitPro is a platform that connects you with trusted fitness trainers, partner gyms, and quality workout content.",
  },
  {
    q: "How do I find a trainer?",
    a: "Go to the Find Trainers page, browse profiles, and filter by specialization, location, and price.",
  },
  {
    q: "Can I book a trial session?",
    a: "Trial availability depends on each trainer. Check their profile or contact them directly.",
  },
  {
    q: "How do gyms partner with FitPro?",
    a: "Gyms are onboarded by our team. If you represent a gym, contact us via the Contact page.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24">
      <div className="mx-auto max-w-3xl px-6 pb-20 md:px-12">
        <Reveal>
          <h1 className="text-3xl font-black text-black sm:text-4xl">
            Frequently Asked Questions
          </h1>

          <p className="mt-4 text-sm leading-7 text-black/60 sm:text-base">
            Quick answers to common questions about using FitPro.
          </p>

          <div className="mt-8 space-y-6">
            {faqs.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-black/10 bg-white p-5"
              >
                <p className="text-sm font-bold text-black">{item.q}</p>
                <p className="mt-2 text-sm leading-6 text-black/60">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-black transition-colors hover:text-black/60"
          >
            ← Back to home
          </Link>
        </Reveal>
      </div>
    </main>
  );
}