import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export const metadata = {
  title: "Terms of Service | FitPro",
  description:
    "FitPro Terms of Service – rules and guidelines for using the platform.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24">
      <div className="mx-auto max-w-3xl px-6 pb-20 md:px-12">
        <Reveal>
          <h1 className="text-3xl font-black text-black sm:text-4xl">
            Terms of Service
          </h1>

          <p className="mt-2 text-xs text-black/40">
            Last updated: September 2026
          </p>

          <div className="mt-6 space-y-6 text-sm leading-7 text-black/60">
            <section>
              <h2 className="text-base font-bold text-black">
                1. Acceptance of terms
              </h2>
              <p className="mt-2">
                By accessing or using FitPro, you agree to be bound by these
                Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-black">
                2. Use of the platform
              </h2>
              <p className="mt-2">
                You agree to use FitPro only for lawful purposes and in
                accordance with these terms.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-black">
                3. Trainer and gym listings
              </h2>
              <p className="mt-2">
                FitPro provides a platform for trainers and gyms to list their
                services. We do not guarantee the quality or safety of any
                third‑party services.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-black">
                4. Limitation of liability
              </h2>
              <p className="mt-2">
                FitPro is not liable for any indirect, incidental, or
                consequential damages arising from your use of the platform.
              </p>
            </section>
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