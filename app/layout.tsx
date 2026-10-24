import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bhushitha Arunod Rathnayaka | Web Developer & Designer",
  description:
    "Modern, fast, and responsive websites for your business. Business websites and website redesigns by Bhushitha Arunod Rathnayaka, Monaragala, Sri Lanka.",
  keywords: [
    "Web Developer",
    "Web Designer",
    "Next.js",
    "Sri Lanka",
    "Business Website",
    "Website Redesign",
  ],
  authors: [{ name: "Bhushitha Arunod Rathnayaka" }],
  openGraph: {
    title: "Bhushitha Arunod Rathnayaka | Web Developer & Designer",
    description: "Modern, fast, and responsive websites for your business.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${space.variable} ${inter.variable}`}>
      <body className="bg-bg text-ink antialiased">{children}</body>
    </html>
  );
}
