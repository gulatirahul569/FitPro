import "./globals.css";

export const metadata = {
  title: "FitPro - Transform Your Body",
  description:
    "Find certified fitness trainers and start your fitness journey with FitPro.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}