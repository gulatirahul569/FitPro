import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export const metadata = {
  title: "Cookie Policy | FitPro",
  description:
    "FitPro Cookie Policy – what cookies and similar technologies we use, why we use them, and how you can control them.",
  alternates: { canonical: "/cookies" },
};

// TODO: replace with your real contact details before launch.
const CONTACT_EMAIL = "support@fitpro.example";
const LAST_UPDATED = "September 24, 2026";

const cookieTypes = [
  {
    name: "Strictly necessary",
    purpose:
      "Required for the site to work: keeping you signed in, protecting against fraud and abuse, and remembering security and session settings. These cannot be switched off in our systems.",
  },
  {
    name: "Preferences",
    purpose:
      "Remember choices you make, such as location, filters, or display settings, so you do not need to set them again on each visit.",
  },
  {
    name: "Analytics and performance",
    purpose:
      "Help us understand how visitors use FitPro, which pages are popular, and where errors occur, so we can improve speed and usability. Data is aggregated and not used to identify you personally.",
  },
];

// Each block is either a paragraph (string) or { list: [...] }.
const sections = [
  {
    title: "1. What are cookies?",
    content: [
      "Cookies are small text files placed on your device when you visit a website. They allow the site to recognise your device, remember your actions and preferences over time, and help us provide a better, more secure experience. Cookies set by FitPro are called first-party cookies; those set by other companies whose services we use are called third-party cookies.",
    ],
  },
  {
    title: "2. Similar technologies",
    content: [
      "Besides cookies, we may use related technologies that work in a similar way, including:",
      {
        list: [
          "Local storage and session storage: browser storage used to keep your preferences or session state.",
          "Pixels and tags: small pieces of code that count visits and measure how features perform.",
          "Device and log data: information such as IP address, browser type, and referring page collected automatically by our servers and hosting provider.",
        ],
      },
      "In this policy, we refer to all of these as \"cookies\".",
    ],
  },
  {
    title: "3. How we use cookies",
    content: [
      "We use cookies for the purposes listed below. We do not use cookies to sell your personal data.",
    ],
    showTypes: true,
  },
  {
    title: "4. Third-party cookies",
    content: [
      "Some cookies are set by trusted third parties that provide services to us, such as our hosting platform, analytics tools, and embedded content like maps or fonts. These providers may collect information about your use of FitPro and other sites according to their own privacy policies. We do not control those cookies, so please review the relevant provider's policy for details.",
    ],
  },
  {
    title: "5. How long cookies last",
    content: [
      "Session cookies are deleted when you close your browser. Persistent cookies remain on your device for a set period, generally between a few days and 12 months, or until you delete them.",
    ],
  },
  {
    title: "6. Your choices and managing cookies",
    content: [
      "Where required by law, we ask for your consent before setting non-essential cookies, and you can withdraw it at any time. You can also control cookies through your browser settings, where you can usually:",
      {
        list: [
          "View the cookies stored on your device and delete some or all of them.",
          "Block all cookies, or only third-party cookies.",
          "Set your browser to warn you before a cookie is stored.",
          "Clear cookies automatically each time you close the browser.",
        ],
      },
      "Blocking strictly necessary cookies may prevent you from signing in or using some features of FitPro. Because settings differ between browsers and devices, see your browser's help pages (for example Chrome, Safari, Firefox, or Edge) for step-by-step instructions.",
    ],
  },
  {
    title: "7. Do Not Track and Global Privacy Control",
    content: [
      "Some browsers offer a \"Do Not Track\" or Global Privacy Control signal. Where we can reasonably detect such a signal, we will respect it for non-essential cookies. There is currently no uniform industry standard for responding to these signals.",
    ],
  },
  {
    title: "8. Changes to this policy",
    content: [
      "We may update this Cookie Policy as our services or legal requirements change. We will revise the \"Last updated\" date above, and where changes are material, we will notify you through the site. Please check this page periodically.",
    ],
  },
  {
    title: "9. Contact us",
    content: [
      `If you have questions about our use of cookies, email us at ${CONTACT_EMAIL}. For details on how we handle your personal data, please read our Privacy Policy.`,
    ],
  },
];

function Block({ block }) {
  if (typeof block === "string") {
    return <p className="mt-2">{block}</p>;
  }
  return (
    <ul className="mt-2 list-disc space-y-1.5 pl-5">
      {block.list.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-5 lg:pt-24">
      <div className="mx-auto max-w-5xl px-6 pb-20 md:px-12">
        <Reveal>
          <h1 className="text-3xl font-black text-black sm:text-4xl">
            Cookie Policy
          </h1>

          <p className="mt-2 text-xs text-black/40">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="mt-6 space-y-6 text-sm leading-7 text-black/60">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-base font-bold text-black">
                  {section.title}
                </h2>
                {section.content.map((block, i) => (
                  <Block key={i} block={block} />
                ))}

                {section.showTypes && (
                  <div className="mt-3 space-y-3">
                    {cookieTypes.map((type) => (
                      <div
                        key={type.name}
                        className="rounded-xl border border-black/10 bg-white p-4"
                      >
                        <h3 className="text-sm font-bold text-black">
                          {type.name}
                        </h3>
                        <p className="mt-1">{type.purpose}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
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