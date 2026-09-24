import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export const metadata = {
  title: "Privacy Policy | FitPro",
  description:
    "FitPro Privacy Policy – how we collect, use, share, and protect your personal information, and the choices and rights you have.",
  alternates: { canonical: "/privacy" },
};

// TODO: replace with your real contact details before launch.
const CONTACT_EMAIL = "support@fitpro.example";
const LAST_UPDATED = "September 24, 2026";

// Each block is either a paragraph (string) or { list: [...] }.
const sections = [
  {
    title: "1. Who we are",
    content: [
      "FitPro (\"FitPro\", \"we\", \"us\", or \"our\") is an online platform that helps people discover fitness trainers and gyms, and helps trainers and gyms showcase their services. This Privacy Policy explains what personal information we collect, why we collect it, how we use and protect it, and the rights you have over it.",
      "By accessing or using FitPro, you acknowledge that you have read this policy. If you do not agree with it, please do not use the platform.",
    ],
  },
  {
    title: "2. Information we collect",
    content: [
      "We collect only the information we need to run and improve FitPro. This includes:",
      {
        list: [
          "Account information: your name, email address, phone number (if provided), and password or sign-in credentials.",
          "Profile information: for trainers and gyms, details such as business or professional name, photos, bio, specialisations, certifications, services, pricing, location, opening hours, and contact details you choose to display publicly.",
          "Enquiries and communications: messages, enquiries, reviews, and any feedback you send through the platform or to our support team.",
          "Usage and device data: pages viewed, features used, approximate location derived from your IP address, browser type, device type, operating system, referring pages, and timestamps.",
          "Cookies and similar technologies: small files and identifiers described in our Cookie Policy.",
        ],
      },
      "We do not knowingly collect sensitive personal data such as health records, financial account numbers, or government identifiers. Please do not include such information in your profile or messages.",
    ],
  },
  {
    title: "3. How we use your information",
    content: [
      "We use your information to:",
      {
        list: [
          "Create and manage your account and authenticate you.",
          "Operate the platform, including displaying trainer and gym profiles and connecting users with providers.",
          "Respond to enquiries, provide support, and send service-related notices such as security alerts and policy updates.",
          "Personalise search results and recommendations, for example by location or interests.",
          "Analyse usage, measure performance, fix bugs, and improve our features and services.",
          "Detect, prevent, and investigate fraud, abuse, security incidents, and violations of our Terms of Service.",
          "Comply with legal obligations and enforce our legal rights.",
        ],
      },
      "We send marketing or promotional messages only where you have opted in, and you can withdraw that consent at any time.",
    ],
  },
  {
    title: "4. Legal basis and consent",
    content: [
      "We process your personal data based on your consent, to perform our services for you, for our legitimate interests in running and securing the platform (where these are not overridden by your rights), and to comply with applicable law, including India's Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000 and rules made under it. Where we rely on consent, you may withdraw it at any time by contacting us; withdrawal does not affect processing carried out before it.",
    ],
  },
  {
    title: "5. How we share your information",
    content: [
      "We do not sell your personal data. We share information only in these situations:",
      {
        list: [
          "Public profiles: information that trainers and gyms choose to publish in their profile is visible to other visitors.",
          "Between users: when you send an enquiry, the recipient trainer or gym receives the details needed to respond.",
          "Service providers: trusted vendors that help us operate FitPro, such as hosting, database, authentication, analytics, email delivery, and customer support. They may process data only on our instructions and under confidentiality obligations.",
          "Legal and safety: where required by law, court order, or government request, or where necessary to protect the rights, safety, or property of FitPro, our users, or the public.",
          "Business transfers: if FitPro is involved in a merger, acquisition, or sale of assets, your information may be transferred, and we will notify you of any material change in how it is handled.",
        ],
      },
    ],
  },
  {
    title: "6. Cookies and analytics",
    content: [
      "We use cookies and similar technologies to keep you signed in, remember preferences, understand how the site is used, and improve performance. You can manage them as described in our Cookie Policy.",
    ],
  },
  {
    title: "7. Data retention",
    content: [
      "We keep personal data only for as long as needed for the purposes described in this policy, including to satisfy legal, accounting, or reporting requirements. When you delete your account, we delete or anonymise your personal data within a reasonable period, except where we must retain certain information to comply with the law, resolve disputes, or enforce our agreements.",
    ],
  },
  {
    title: "8. Security",
    content: [
      "We use reasonable technical and organisational safeguards to protect your data, including encrypted connections (HTTPS), access controls, and the security features of our hosting and infrastructure providers. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security. Please use a strong, unique password and keep your credentials confidential. If we become aware of a personal data breach affecting you, we will notify you and the relevant authorities as required by law.",
    ],
  },
  {
    title: "9. International data transfers",
    content: [
      "FitPro is hosted on cloud infrastructure that may be located outside your country, including outside India. By using the platform, you understand that your information may be processed and stored in other jurisdictions. Where required, we take steps to ensure that such transfers are protected by appropriate safeguards and comply with applicable law.",
    ],
  },
  {
    title: "10. Your rights and choices",
    content: [
      "Subject to applicable law, you have the right to:",
      {
        list: [
          "Access a summary of the personal data we hold about you and how it is processed.",
          "Correct or update inaccurate or incomplete data.",
          "Request erasure of your personal data.",
          "Withdraw consent you previously gave.",
          "Nominate another person to exercise your rights in the event of your death or incapacity.",
          "Object to or restrict certain processing, and request a portable copy of your data, where applicable law (such as the GDPR) provides for it.",
          "Lodge a complaint with your local data protection authority.",
        ],
      },
      "To exercise any of these rights, email us at the address in section 13. We may need to verify your identity before acting on a request and will respond within the time required by law.",
    ],
  },
  {
    title: "11. Children's privacy",
    content: [
      "FitPro is intended for users who are 18 years of age or older. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us and we will delete it promptly.",
    ],
  },
  {
    title: "12. Third-party links and services",
    content: [
      "FitPro may contain links to third-party websites, social media pages, or services, including trainer and gym websites. We are not responsible for their privacy practices or content, and we encourage you to read their policies before sharing any information.",
    ],
  },
  {
    title: "13. Contact us and grievance redressal",
    content: [
      `If you have questions, requests, or complaints about this Privacy Policy or how we handle your data, contact our Grievance Officer at ${CONTACT_EMAIL}. We aim to acknowledge your request within 48 hours and resolve it within 30 days, or sooner if required by applicable law.`,
    ],
  },
  {
    title: "14. Changes to this policy",
    content: [
      "We may update this Privacy Policy from time to time. When we make material changes, we will update the \"Last updated\" date above and, where appropriate, notify you through the platform or by email. Your continued use of FitPro after changes take effect means you accept the updated policy.",
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

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-5 lg:pt-24">
      <div className="mx-auto max-w-5xl px-6 pb-20 md:px-12">
        <Reveal>
          <h1 className="text-3xl font-black text-black sm:text-4xl">
            Privacy Policy
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
              </section>
            ))}
          </div>

          <nav
            aria-label="Legal pages"
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-black/10 pt-6 text-sm font-semibold"
          >
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