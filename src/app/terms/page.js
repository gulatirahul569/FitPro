import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export const metadata = {
  title: "Terms of Service | FitPro",
  description:
    "FitPro Terms of Service – the rules, responsibilities, and legal terms that apply when you use the FitPro platform.",
  alternates: { canonical: "/terms" },
};

// TODO: replace with your real contact details before launch.
const CONTACT_EMAIL = "support@fitpro.example";
const LAST_UPDATED = "September 24, 2026";

// Each block is either a paragraph (string) or { list: [...] }.
const sections = [
  {
    title: "1. Acceptance of terms",
    content: [
      "These Terms of Service (\"Terms\") form a binding agreement between you and FitPro (\"FitPro\", \"we\", \"us\", or \"our\") and govern your access to and use of our website and services (the \"Platform\"). By accessing or using FitPro, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy and Cookie Policy. If you do not agree, do not use the Platform.",
    ],
  },
  {
    title: "2. Eligibility",
    content: [
      "You must be at least 18 years old and capable of entering into a legally binding contract under applicable law to use FitPro. If you use the Platform on behalf of a business, you represent that you have authority to bind that business to these Terms.",
    ],
  },
  {
    title: "3. Your account",
    content: [
      "Some features require you to create an account. You agree to provide accurate, current, and complete information and to keep it updated. You are responsible for safeguarding your login credentials and for all activity that occurs under your account. Notify us immediately at the email address in section 15 if you suspect unauthorised use.",
    ],
  },
  {
    title: "4. Use of the platform",
    content: [
      "You agree to use FitPro only for lawful purposes and in accordance with these Terms. You must not:",
      {
        list: [
          "Provide false, misleading, or impersonating information, including fake credentials or reviews.",
          "Harass, abuse, defraud, or discriminate against other users.",
          "Upload content that is unlawful, defamatory, obscene, infringing, or otherwise harmful.",
          "Scrape, crawl, or copy the Platform or its data by automated means without our written permission.",
          "Attempt to gain unauthorised access to, disrupt, or overload the Platform, its servers, or networks.",
          "Introduce viruses, malware, or any harmful code.",
          "Use the Platform to send spam or unsolicited promotional messages.",
          "Circumvent or interfere with security or access-control features.",
        ],
      },
    ],
  },
  {
    title: "5. Trainer and gym listings",
    content: [
      "FitPro provides a platform for trainers and gyms to list and promote their services and for users to discover them. FitPro is an intermediary and is not a party to any arrangement, session, membership, or transaction between users and providers. We do not employ, endorse, or certify any trainer or gym, and we do not guarantee the accuracy of listings or the quality, safety, legality, or availability of any third-party services.",
      "Trainers and gyms are solely responsible for their listings, for holding any licences, certifications, insurance, and permits required by law, and for the services they provide. Users are responsible for doing their own due diligence before engaging any provider.",
    ],
  },
  {
    title: "6. Health and fitness disclaimer",
    content: [
      "Content on FitPro is provided for general information only and is not medical advice. Physical exercise carries inherent risks. Consult a qualified healthcare professional before starting any fitness programme, particularly if you have a medical condition, injury, or are pregnant. You participate in any training or gym activity at your own risk, and you should stop immediately and seek medical help if you feel pain, dizziness, or discomfort.",
    ],
  },
  {
    title: "7. User content",
    content: [
      "You retain ownership of the content you submit to FitPro, such as profile details, photos, reviews, and messages (\"User Content\"). By submitting it, you grant FitPro a non-exclusive, worldwide, royalty-free licence to host, store, display, reproduce, and distribute that content solely to operate, promote, and improve the Platform. You represent that you own or have the necessary rights to the content and that it does not violate any law or third-party rights. We may remove any content that we reasonably believe breaches these Terms, without prior notice.",
    ],
  },
  {
    title: "8. Fees and payments",
    content: [
      "Basic access to FitPro is currently free. If we introduce paid plans or features, applicable fees, billing terms, and refund conditions will be shown clearly before you purchase. Any payment between users and providers for training or memberships is made directly between them, and FitPro is not responsible for those transactions or any disputes arising from them.",
    ],
  },
  {
    title: "9. Intellectual property",
    content: [
      "The Platform, including its design, logos, text, graphics, software, and other materials (excluding User Content), is owned by or licensed to FitPro and is protected by intellectual property laws. Subject to these Terms, we grant you a limited, revocable, non-exclusive, non-transferable licence to access and use the Platform for personal or legitimate business purposes. You may not copy, modify, distribute, or create derivative works from any part of the Platform without our written consent.",
    ],
  },
  {
    title: "10. Third-party links and services",
    content: [
      "The Platform may contain links to third-party websites or services that we do not own or control. We are not responsible for their content, policies, or practices, and accessing them is at your own risk.",
    ],
  },
  {
    title: "11. Disclaimer of warranties",
    content: [
      "The Platform is provided on an \"as is\" and \"as available\" basis, without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose, accuracy, and non-infringement. We do not warrant that the Platform will be uninterrupted, secure, or error-free.",
    ],
  },
  {
    title: "12. Limitation of liability",
    content: [
      "To the maximum extent permitted by law, FitPro and its owners, directors, employees, and affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, data, goodwill, or business, arising from or related to your use of, or inability to use, the Platform or any third-party services accessed through it, including any injury or loss arising from training or gym activities. Where liability cannot be excluded, our total aggregate liability to you will not exceed the greater of the amount you paid to FitPro in the 12 months before the claim or INR 1,000. Nothing in these Terms limits liability that cannot be limited under applicable law.",
    ],
  },
  {
    title: "13. Indemnification",
    content: [
      "You agree to indemnify and hold harmless FitPro and its owners, directors, employees, and affiliates from any claims, damages, losses, and expenses (including reasonable legal fees) arising from your use of the Platform, your User Content, your breach of these Terms, or your violation of any law or third-party rights.",
    ],
  },
  {
    title: "14. Suspension and termination",
    content: [
      "We may suspend or terminate your access to FitPro at any time, with or without notice, if we believe you have violated these Terms or applicable law, or to protect the Platform and its users. You may stop using the Platform and delete your account at any time. Provisions that by their nature should survive termination, including sections 7, 9, and 11 to 13, will continue to apply.",
    ],
  },
  {
    title: "15. Governing law and disputes",
    content: [
      "These Terms are governed by the laws of India. Subject to any mandatory consumer protection rights that apply to you, the courts at S.A.S. Nagar (Mohali), Punjab, India will have exclusive jurisdiction over any dispute arising out of or relating to these Terms or the Platform. We encourage you to contact us first so we can try to resolve any issue informally.",
    ],
  },
  {
    title: "16. Changes to these terms",
    content: [
      "We may revise these Terms from time to time. We will update the \"Last updated\" date above and, for material changes, provide reasonable notice through the Platform or by email. Your continued use of FitPro after the changes take effect constitutes acceptance of the revised Terms.",
    ],
  },
  {
    title: "17. General",
    content: [
      "These Terms, together with our Privacy Policy and Cookie Policy, are the entire agreement between you and FitPro regarding the Platform. If any provision is found unenforceable, the remaining provisions stay in effect. Our failure to enforce any right is not a waiver of it. You may not assign these Terms without our consent; we may assign them in connection with a merger, acquisition, or sale of assets.",
    ],
  },
  {
    title: "18. Contact us",
    content: [
      `Questions about these Terms? Email us at ${CONTACT_EMAIL}.`,
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

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-5 lg:pt-24">
      <div className="mx-auto max-w-5xl px-6 pb-20 md:px-12">
        <Reveal>
          <h1 className="text-3xl font-black text-black sm:text-4xl">
            Terms of Service
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
              href="/privacy"
              className="text-black transition-colors hover:text-black/60"
            >
              Privacy Policy
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