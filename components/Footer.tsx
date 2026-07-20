export default function Footer() {
  return (
    <footer className="footer-blend relative z-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 sm:px-10 lg:px-16">
        <div className="flex flex-col justify-between gap-10 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-4xl uppercase tracking-[-0.02em] text-ink">
              Dawn
            </p>
            <p className="kicker mt-3 text-ink/60">
              Laser &amp; Skin Resurfacing
            </p>
          </div>
          <address className="text-sm not-italic leading-relaxed text-ink/75 sm:text-right">
            418 Morning Line Ave, Suite 2, Austin, TX 78704
            <br />
            <a href="tel:+15550140629" className="hover:text-accent">
              (555) 014-0629
            </a>
            <br />
            <a href="mailto:hello@dawn.com" className="hover:text-accent">
              hello@dawn.com
            </a>
          </address>
        </div>
        <div className="flex flex-col justify-between gap-2 text-xs text-ink/55 sm:flex-row">
          <p>© 2026 Dawn. All rights reserved.</p>
          <p>
            Website by{" "}
            <a
              href="https://splendessa.com"
              className="underline decoration-peach underline-offset-4 hover:text-accent"
            >
              Splendessa
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
