import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export const metadata = {
  title: "Cookie Policy | FitPro",
  description:
    "FitPro Cookie Policy – how we use cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24">
      <div className="mx-auto max-w-3xl px-6 pb-20 md:px-12">
        <Reveal>
          <h1 className="text-3xl font-black text-black sm:text-4xl">
            Cookie Policy
          </h1>

          <p className="mt-2 text-xs text-black/40">
            Last updated: September 2026
          </p>

          <div className="mt-6 space-y-6 text-sm leading-7 text-black/60">
            <section>
              <h2 className="text-base font-bold text-black">
                1. What are cookies?
              </h2>
              <p className="mt-2">
                Cookies are small text files stored on your device when you
                visit a website. They help us improve your experience.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-black">
                2. How we use cookies
              </h2>
              <p className="mt-2">
                We use cookies to remember your preferences, analyze site
                traffic, and improve performance.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-black">
                3. Managing cookies
              </h2>
              <p className="mt-2">
                You can control cookie settings through your browser. Disabling
                cookies may affect some features of the site.
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