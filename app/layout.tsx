import type { Metadata } from "next";
import { Fraunces, Jost } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://dawn.example.com"),
  title: "DAWN — Laser & Skin Resurfacing",
  description:
    "Your skin, starting over. Laser and skin resurfacing treatments built around renewal — Austin, TX.",
  openGraph: {
    title: "DAWN — Laser & Skin Resurfacing",
    description: "Your skin, starting over.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${jost.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
