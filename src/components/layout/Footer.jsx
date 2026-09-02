import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">

        <div>
          <h2 className="text-2xl font-extrabold">FITPRO</h2>

          <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
            Connect with certified trainers, discover fitness content,
            and build a healthier lifestyle.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Platform</h3>

          <div className="flex flex-col gap-3 text-sm text-gray-400">
            <Link href="/trainers">Trainers</Link>
            <Link href="/videos">Videos</Link>
            <Link href="/programs">Programs</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Support</h3>

          <div className="flex flex-col gap-3 text-sm text-gray-400">
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/faq">FAQs</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Social</h3>

          <div className="flex flex-col gap-3 text-sm text-gray-400">
            <span>Instagram</span>
            <span>YouTube</span>
            <span>Facebook</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-6 text-sm text-gray-500 md:flex-row">
          <p>© 2026 FitPro. All rights reserved.</p>

          <div className="flex gap-5">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}