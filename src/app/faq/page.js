import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export const metadata = {
  title: "Frequently Asked Questions | FitPro",
  description:
    "Answers to common questions about FitPro: finding trainers, partner gyms, trial sessions, accounts, and your data.",
  alternates: { canonical: "/faq" },
};

// Keep answers as plain text (no JSX/links) so they can also feed the
// FAQPage structured data below. Edit freely; the page and JSON-LD update together.
const groups = [
  {
    title: "About FitPro",
    items: [
      {
        q: "What is FitPro?",
        a: "FitPro is a platform that connects you with trusted fitness trainers, partner gyms, and quality workout content, all in one place.",
      },
      {
        q: "Is FitPro free to use?",
        a: "Browsing trainers, gyms, and content is currently free. If we introduce paid plans or features, we will clearly show the price and terms before you pay.",
      },
      {
        q: "Does FitPro provide the training or gym services itself?",
        a: "No. FitPro is a platform that helps you discover independent trainers and gyms. Sessions, memberships, and pricing are arranged directly between you and the trainer or gym.",
      },
    ],
  },
  {
    title: "Trainers",
    items: [
      {
        q: "How do I find a trainer?",
        a: "Go to the Find Trainers page, browse profiles, and filter by specialization, location, and price to shortlist the trainers that suit your goals.",
      },
      {
        q: "Can I book a trial session?",
        a: "Trial availability depends on each trainer. Check their profile for details or contact them directly to ask.",
      },
      {
        q: "How do I know a trainer is right for me?",
        a: "Read their profile, specialisations, and certifications, and message them with questions before committing. We recommend starting with a trial session where offered.",
      },
      {
        q: "How can I list myself as a trainer?",
        a: "Reach out through our Contact page with the subject Trainer/Gym enquiry, and our team will guide you through getting your profile listed.",
      },
    ],
  },
  {
    title: "Gyms",
    items: [
      {
        q: "How do gyms partner with FitPro?",
        a: "Gyms are onboarded by our team. If you represent a gym, contact us via the Contact page and we will get back to you with the next steps.",
      },
      {
        q: "Does FitPro guarantee the quality of a gym or trainer?",
        a: "We work to list genuine providers, but we cannot guarantee the quality, safety, or availability of any third-party service. Please review details and visit or speak with a provider before signing up.",
      },
    ],
  },
  {
    title: "Health, account, and privacy",
    items: [
      {
        q: "Is it safe to start a new workout programme?",
        a: "Content on FitPro is general information, not medical advice. Consult a qualified healthcare professional before starting any programme, especially if you have a medical condition or injury.",
      },
      {
        q: "How is my personal data used?",
        a: "We use your information to run the platform and improve our services, and we do not sell your personal data. Our Privacy Policy explains what we collect and how you can access, correct, or delete it.",
      },
      {
        q: "How can I delete my account or data?",
        a: "Contact us with the subject Privacy request and we will process your request in line with our Privacy Policy and applicable law.",
      },
      {
        q: "I could not find my answer. What should I do?",
        a: "Email us through the Contact page. We aim to reply within 2 business days.",
      },
    ],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: groups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    }))
  ),
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-5 lg:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-6 pb-20 md:px-12">
        <Reveal>
          <h1 className="text-3xl font-black text-black sm:text-4xl">
            Frequently Asked Questions
          </h1>

          <p className="mt-4 text-sm leading-7 text-black/60 sm:text-base">
            Quick answers to common questions about using FitPro.
          </p>

          <div className="mt-10 space-y-10">
            {groups.map((group) => (
              <section key={group.title} aria-labelledby={group.title}>
                <h2
                  id={group.title}
                  className="text-xs font-bold uppercase tracking-widest text-black/40"
                >
                  {group.title}
                </h2>

                <div className="mt-3 space-y-3">
                  {group.items.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-2xl border border-black/10 bg-white transition-colors open:border-black/30"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 text-sm font-bold text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black [&::-webkit-details-marker]:hidden">
                        {item.q}
                        <span
                          aria-hidden="true"
                          className="shrink-0 text-lg font-normal leading-none text-black/40 transition-transform duration-200 group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="px-5 pb-5 text-sm leading-6 text-black/60">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-15 flex justify-between rounded-4xl border border-black/10 bg-white p-6 text-center">
            <div>
            <p className="text-sm font-bold text-black">Still have questions?</p>
            <p className="mt-1 text-sm  text-black/60 pl-8">
              Our team is happy to help.
            </p>
            </div>
            <Link
              href="/contact"
              className=" inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black/80"
            >
              Contact us
            </Link>
          </div>

          <nav
            aria-label="Legal pages"
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-black/10 pt-6 text-sm font-semibold"
          >
            <Link
              href="/privacy"
              className="text-black transition-colors hover:text-black/60"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-black transition-colors hover:text-black/60"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-black transition-colors hover:text-black/60"
            >
              Cookie Policy
            </Link>
          </nav>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-black transition-colors hover:text-black/60"
          >
            ← Back to home
          </Link>
        </Reveal>
      </div>
    </main>
  );
}