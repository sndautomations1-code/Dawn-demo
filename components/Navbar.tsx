"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const LINKS = [
  { label: "Treatments", href: "#treatments" },
  { label: "The Ritual", href: "#ritual" },
  { label: "About", href: "#about" },
];

/**
 * Fixed top bar, transparent over the hero sky, frosting once the page
 * scrolls. The old hero eyebrow's content lives here now.
 */
export default function Navbar() {
  const reduceMotion = useReducedMotion() ?? false;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-300 ease-out ${
        scrolled ? "bg-[rgba(250,247,244,0.7)] backdrop-blur-[12px]" : ""
      }`}
      initial={reduceMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        aria-label="Main"
        className="flex h-[76px] items-center justify-between px-6 sm:px-10 lg:px-16"
      >
        <a href="#" className="flex items-baseline gap-3 text-ink">
          <span className="font-display text-[1.2rem] tracking-[0.18em]">
            DAWN
          </span>
          <span className="kicker hidden text-[0.65rem] text-ink/60 min-[820px]:inline">
            — Laser &amp; Skin Resurfacing
          </span>
        </a>

        <div className="flex items-center gap-7 lg:gap-9">
          <div className="hidden items-center gap-7 min-[820px]:flex lg:gap-9">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-[0.72rem] uppercase tracking-[0.18em] text-ink/75"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="https://splendessa.com"
            className="cta-pill px-5 py-2 text-[0.72rem] font-medium tracking-[0.1em]"
          >
            Book
          </a>
        </div>
      </nav>

      {/* hairline that dissolves at both ends so it never cuts across
          the sun's corner; brightens slightly in the frosted state */}
      <div
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-px transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-[0.65]"
        }`}
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(61,44,41,0.2) 15%, rgba(61,44,41,0.2) 70%, transparent 100%)",
        }}
      />
    </motion.header>
  );
}
