import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export const metadata = {
  title: "Contact Us | FitPro",
  description:
    "Get in touch with FitPro for support, trainer and gym listings, partnerships, or privacy requests. We respond as soon as possible.",
  alternates: { canonical: "/contact" },
};

// TODO: replace with your real details before launch.
// You can point each topic to its own address later (e.g. partners@, privacy@).
const EMAIL = "support@fitpro.example";
const COMPANY = "FitPro Fitness Pvt. Ltd.";
const ADDRESS = {
  street: "Sector 15",
  city: "Panchkula",
  region: "Haryana",
  country: "India",
};

const topics = [
  {
    title: "General support",
    description:
      "Help with your account, using the platform, or reporting a problem.",
    email: EMAIL,
    subject: "Support request",
  },
  {
    title: "Trainers and gyms",
    description:
      "Questions about creating or updating your listing, profile, or services.",
    email: EMAIL,
    subject: "Trainer/Gym enquiry",
  },
  {
    title: "Partnerships",
    description:
      "Collaborations, sponsorships, media, or business opportunities.",
    email: EMAIL,
    subject: "Partnership enquiry",
  },
  {
    title: "Privacy and data requests",
    description:
      "Access, correct, or delete your data, or contact our Grievance Officer.",
    email: EMAIL,
    subject: "Privacy request",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact FitPro",
  mainEntity: {
    "@type": "Organization",
    name: COMPANY,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.region,
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: EMAIL,
      availableLanguage: ["English", "Hindi"],
    },
  },
};

function mailto(email, subject) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-6 pb-20 md:px-12">
        <Reveal>
          <h1 className="text-3xl font-black text-black sm:text-4xl">
            Contact Us
          </h1>

          <p className="mt-4 text-sm leading-7 text-black/60 sm:text-base">
            Have a question or feedback? Choose the topic that fits best and
            send us an email. We will respond as soon as possible.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {topics.map((topic) => (
              <a
                key={topic.title}
                href={mailto(topic.email, topic.subject)}
                className="group rounded-2xl border border-black/10 bg-white p-5 transition-colors hover:border-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                <h2 className="text-sm font-bold text-black">{topic.title}</h2>
                <p className="mt-1 text-sm leading-6 text-black/60">
                  {topic.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-black transition-colors group-hover:text-black/60">
                  Email us →
                </span>
              </a>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-black/10 bg-white p-6 md:p-8">
            <p className="text-sm font-semibold text-black">Email</p>
            <p className="mt-1 text-sm text-black/60">
              <a
                href={`mailto:${EMAIL}`}
                className="underline underline-offset-4 transition-colors hover:text-black"
              >
                {EMAIL}
              </a>
            </p>

            <p className="mt-6 text-sm font-semibold text-black">Office</p>
            <address className="mt-1 text-sm not-italic leading-6 text-black/60">
              {COMPANY}
              <br />
              {ADDRESS.street}, {ADDRESS.city}
              <br />
              {ADDRESS.region}, {ADDRESS.country}
            </address>

            <p className="mt-6 text-sm font-semibold text-black">
              Response time
            </p>
            <p className="mt-1 text-sm text-black/60">
              We aim to reply within 2 business days. Privacy and data requests
              are acknowledged within 48 hours.
            </p>

            <p className="mt-6 text-xs leading-5 text-black/40">
              For trainer, gym, or partnership queries, mention your use case in
              the subject line. Please do not send sensitive personal or health
              information by email.
            </p>
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