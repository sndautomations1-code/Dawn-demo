import type { Metadata } from "next";
import { Fraunces, Jost, Pinyon_Script } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const pinyon = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
  display: "swap",
});

// Deployment origin: the real Vercel URL in production, an explicit override
// if set, and localhost in dev. Relative OG/Twitter image URLs (including the
// generated opengraph-image route) are resolved against this.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DAWN — Laser & Skin Resurfacing",
  description:
    "Your skin, starting over. Laser and skin resurfacing treatments built around renewal — Austin, TX.",
  openGraph: {
    title: "DAWN — Laser & Skin Resurfacing",
    description: "Your skin, starting over.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${jost.variable} ${pinyon.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
