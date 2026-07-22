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

// JSON-LD structured data. Every value is taken verbatim from copy already
// rendered on the page — name/address/telephone/email from Footer, description
// from the Hero subhead, and the treatment catalog from the Treatments grid.
// priceRange is the min–max of the six listed prices (both endpoints appear
// on the page); nothing here is invented.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "Dawn", // Footer wordmark
  description:
    "Next-generation medical aesthetics and advanced laser treatments, tailored to reveal your ultimate radiance.", // Hero subhead
  address: {
    "@type": "PostalAddress",
    // "418 Morning Line Ave, Suite 2, Austin, TX 78704" — Footer address block
    streetAddress: "418 Morning Line Ave, Suite 2",
    addressLocality: "Austin",
    addressRegion: "TX",
    postalCode: "78704",
  },
  telephone: "(555) 014-0629", // Footer
  email: "hello@dawn.com", // Footer
  priceRange: "$180–$1,200", // lowest and highest listed treatment prices
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Treatments",
    itemListElement: [
      {
        "@type": "Offer",
        name: "The First Light Facial",
        description:
          "A gentle enzyme and light peel — your introduction to resurfacing.",
        price: "180",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Fractional Laser Resurfacing",
        description: "Targeted collagen renewal for texture and fine lines.",
        price: "650",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "IPL Photofacial",
        description: "Light-based correction of sun damage and uneven tone.",
        price: "425",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "CO₂ Deep Resurfacing",
        description: "The full restart — deep renewal for scars and etched lines.",
        price: "1200",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Laser Skin Tightening",
        description: "Gradual firming through gentle dermal heating.",
        price: "550",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "The Morning After Peel",
        description: "A medical-grade peel with next-day glow.",
        price: "240",
        priceCurrency: "USD",
      },
    ],
  },
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
