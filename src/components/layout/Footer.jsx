import Link from "next/link";
import { ArrowUpRight, Dumbbell } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

function InstagramIcon({ size = 24, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ size = 24, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.7 31.7 0 0 0 24 12a31.7 31.7 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12z" />
    </svg>
  );
}

function FacebookIcon({ size = 24, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
    </svg>
  );
}

const platformLinks = [
  { href: "/trainers", label: "Find Trainers" },
  { href: "/videos", label: "Fitness Videos" },
  { href: "/gyms", label: "Partner Gyms" },
];

const companyLinks = [
  { href: "/#our-story", label: "About FitPro" },
  { href: "/contact", label: "Contact Us" },
  { href: "/faq", label: "Frequently Asked Questions" },
];

const socialLinks = [
  {
    icon: InstagramIcon,
    label: "Instagram",
    href: "https://www.instagram.com/",
  },
  {
    icon: YoutubeIcon,
    label: "YouTube",
    href: "https://www.youtube.com/",
  },
  {
    icon: FacebookIcon,
    label: "Facebook",
    href: "https://www.facebook.com/",
  },
];

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-black text-white">
      <Reveal>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-6 py-14 sm:gap-x-10 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-10 md:px-12 md:py-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="group mb-5 flex w-fit items-center gap-2.5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black transition-transform duration-300 group-hover:rotate-12">
                <Dumbbell size={19} />
              </div>

              <h2 className="text-xl font-black tracking-tight">FITPRO</h2>
            </Link>

            <p className="max-w-sm text-sm leading-6 text-white/50">
              Find trusted trainers, explore fitness content, and build a
              routine that helps you become stronger every day.
            </p>

            <Link
              href="/become-trainer"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-white/60"
            >
              Become a trainer

              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>

          {/* Platform */}
          <div className="border-t border-white/10 pt-7 md:border-0 md:pt-0">
            <h3 className="mb-5 text-sm font-bold text-white">Platform</h3>

            <nav className="flex flex-col gap-3 text-sm text-white/50">
              {platformLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div className="border-t border-white/10 pt-7 md:border-0 md:pt-0">
            <h3 className="mb-5 text-sm font-bold text-white">Company</h3>

            <nav className="flex flex-col gap-3 text-sm text-white/50">
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="col-span-2 border-t border-white/10 pt-7 md:col-span-1 md:border-0 md:pt-0">
            <h3 className="mb-5 text-sm font-bold text-white">Follow us</h3>

            <p className="mb-5 max-w-xs text-sm leading-6 text-white/50">
              Follow FitPro for training motivation, workout tips, and fitness
              updates.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow FitPro on ${social.label}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-black"
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Bottom footer */}
      <div className="border-t border-white/10 ">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-6 text-sm text-white/45 md:flex-row md:justify-between md:px-12">
          <p className="text-center">
            © {new Date().getFullYear()} FitPro. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-12 lg:mb-2">
            <Link
              href="/privacy"
              className="transition-colors duration-200 hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors duration-200 hover:text-white"
            >
              Terms
            </Link>

            <Link
              href="/cookies"
              className="transition-colors duration-200 hover:text-white"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}