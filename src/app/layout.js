import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SessionWrapper from "@/components/providers/SessionWrapper";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata = {
  title: "FitPro - Transform Your Body",
  description:
    "Find certified fitness trainers and start your fitness journey with FitPro.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <Navbar />
          {children}
          <ScrollToTop />
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}