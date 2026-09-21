import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export const metadata = {
  title: "Contact Us | FitPro",
  description: "Get in touch with FitPro for support, partnerships, or questions.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24">
      <div className="mx-auto max-w-3xl px-6 pb-20 md:px-12">
        <Reveal>
          <h1 className="text-3xl font-black text-black sm:text-4xl">
            Contact Us
          </h1>

          <p className="mt-4 text-sm leading-7 text-black/60 sm:text-base">
            Have a question or feedback? Reach out to us and we’ll respond as
            soon as possible.
          </p>

          <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 md:p-8">
            <p className="text-sm font-semibold text-black">
              Email
            </p>
            <p className="mt-1 text-sm text-black/60">
              support@fitpro.example
            </p>

            <p className="mt-6 text-sm font-semibold text-black">
              Office
            </p>
            <p className="mt-1 text-sm text-black/60">
              FitPro Fitness Pvt. Ltd.
              <br />
              Sector 15, Panchkula
              <br />
              Haryana, India
            </p>

            <p className="mt-6 text-xs text-black/40">
              For trainer, gym, or partnership queries, use the same email and
              mention your use case in the subject line.
            </p>
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