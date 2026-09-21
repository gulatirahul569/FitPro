import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export const metadata = {
  title: "Privacy Policy | FitPro",
  description:
    "FitPro Privacy Policy – how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24">
      <div className="mx-auto max-w-3xl px-6 pb-20 md:px-12">
        <Reveal>
          <h1 className="text-3xl font-black text-black sm:text-4xl">
            Privacy Policy
          </h1>

          <p className="mt-2 text-xs text-black/40">
            Last updated: September 2026
          </p>

          <div className="mt-6 space-y-6 text-sm leading-7 text-black/60">
            <section>
              <h2 className="text-base font-bold text-black">
                1. Information we collect
              </h2>
              <p className="mt-2">
                We collect information you provide when using FitPro, such as
                name, email, and profile details for trainers and gyms.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-black">
                2. How we use your information
              </h2>
              <p className="mt-2">
                We use your information to operate the platform, show trainer
                and gym profiles, and improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-black">
                3. Sharing of information
              </h2>
              <p className="mt-2">
                We do not sell your personal data. Information may be shared with
                trainers, gyms, or service providers only as needed to deliver
                the service.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-black">
                4. Security
              </h2>
              <p className="mt-2">
                We use reasonable technical and organizational measures to
                protect your data.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-black">
                5. Your rights
              </h2>
              <p className="mt-2">
                You may request access, correction, or deletion of your personal
                data by contacting us.
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