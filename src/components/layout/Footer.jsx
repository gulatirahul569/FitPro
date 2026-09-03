import Link from "next/link";
import { Dumbbell } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

function InstagramIcon({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.7 31.7 0 0 0 24 12a31.7 31.7 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12z" />
    </svg>
  );
}

function FacebookIcon({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
    </svg>
  );
}

const platformLinks = [
  { href: "/trainers", label: "Trainers" },
  { href: "/videos", label: "Videos" },
  { href: "/programs", label: "Programs" },
];

const supportLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/faq", label: "FAQs" },
];

const socialLinks = [
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: YoutubeIcon, label: "YouTube", href: "#" },
  { icon: FacebookIcon, label: "Facebook", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <Reveal>
        <div className="mx-auto grid grid-cols-2 gap-x-6 gap-y-10 px-6 py-14 md:grid-cols-4 md:gap-10 md:py-16 max-w-7xl">

          {/* Brand - full width on mobile */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center text-center md:items-start md:text-left">
            <Link href="/" className="group flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black transition-transform duration-300 group-hover:rotate-12">
                <Dumbbell size={18} />
              </div>
              <h2 className="text-xl font-extrabold">FITPRO</h2>
            </Link>

            <p className="max-w-sm text-sm leading-6 text-gray-400">
              Connect with certified trainers, discover fitness content,
              and build a healthier lifestyle.
            </p>
          </div>

          {/* Platform */}
          <div className="border-t border-gray-800 pt-8 text-center md:border-0 md:pt-0 md:text-left">
            <h3 className="mb-4 font-semibold">Platform</h3>
            <div className="flex flex-col items-center gap-3 text-sm text-gray-400 md:items-start">
              {platformLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="border-t border-gray-800 pt-8 text-center md:border-0 md:pt-0 md:text-left">
            <h3 className="mb-4 font-semibold">Support</h3>
            <div className="flex flex-col items-center gap-3 text-sm text-gray-400 md:items-start">
              {supportLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social - full width on mobile */}
          <div className="col-span-2 md:col-span-1 border-t border-gray-800 pt-8 text-center md:border-0 md:pt-0 md:text-left">
            <h3 className="mb-4 font-semibold">Social</h3>
            <div className="flex justify-center gap-3 md:justify-start">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  
                   <a key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all duration-300 hover:border-white hover:text-black hover:bg-white hover:-translate-y-1"
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>

      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-6 text-sm text-gray-500 md:flex-row md:justify-between md:gap-3">
          <p className="text-center">© 2026 FitPro. All rights reserved.</p>

          <div className="flex flex-wrap justify-center gap-5">
            <span className="cursor-pointer transition-colors hover:text-white">Privacy</span>
            <span className="cursor-pointer transition-colors hover:text-white">Terms</span>
            <span className="cursor-pointer transition-colors hover:text-white">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}