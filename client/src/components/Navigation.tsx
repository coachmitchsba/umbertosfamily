/*
 * Navigation — Umberto's Family Pizzeria v2
 * Light warm theme: cream background, dark text, red CTA
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, MapPin, Gamepad2 } from "lucide-react";

const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "Order Online" },
  { href: "/catering", label: "Catering" },
  { href: "/private-events", label: "Private Events" },
  { href: "/locations", label: "Locations" },
  { href: "/gift-cards", label: "Gift Cards" },
  { href: "/rewards", label: "Rewards" },
  { href: "/shipping", label: "Ship Nationwide" },
  { href: "/about", label: "Our Story" },
  { href: "/faq", label: "FAQ" },
  { href: "/arcade", label: "🎮 Arcade" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Top bar — red */}
      <div className="bg-[oklch(0.46_0.22_25)] text-white py-1.5 text-center text-xs font-body tracking-wider">
        <span className="flex items-center justify-center gap-4 flex-wrap px-4">
          <span className="flex items-center gap-1.5">
            <Phone size={11} />
            <a href="tel:5164377698" className="hover:underline font-medium">New Hyde Park: (516) 437-7698</a>
          </span>
          <span className="hidden sm:inline opacity-50">|</span>
          <span className="hidden sm:flex items-center gap-1.5">
            <MapPin size={11} />
            <Link href="/locations" className="hover:underline">6 Long Island Locations</Link>
          </span>
          <span className="hidden md:inline opacity-50">|</span>
          <span className="hidden md:inline">Family Owned &amp; Operated Since 1965</span>
          <span className="hidden lg:inline opacity-50">|</span>
          <a
            href="https://www.goldbelly.com/restaurants/umbertos-pizzeria/?utm_source=partner&utm_medium=website&utm_term=2702"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline hover:underline font-medium"
          >
            🚚 Ship Nationwide via Goldbelly
          </a>
        </span>
      </div>

      {/* Main nav */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-[oklch(0.97_0.015_80)]/97 backdrop-blur-md shadow-[0_2px_16px_oklch(0.20_0.025_60/0.10)] border-[oklch(0.88_0.015_80)]"
            : "bg-[oklch(0.97_0.015_80)] border-[oklch(0.88_0.015_80)]"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-3">
              <img
                src="https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/26750UmbertoS-Logo.png"
                alt="Umberto's Family Pizzeria — Home of the Original Grandma Slice Since 1965"
                className="h-10 lg:h-14 w-auto"
                loading="eager"
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 font-display text-sm tracking-[0.07em] uppercase transition-colors duration-150 ${
                    location === link.href
                      ? "text-[oklch(0.46_0.22_25)]"
                      : "text-[oklch(0.28_0.03_60)] hover:text-[oklch(0.46_0.22_25)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/rewards"
                className="ml-1 px-3 py-2 font-display text-sm tracking-[0.07em] uppercase text-[oklch(0.68_0.13_75)] hover:text-[oklch(0.55_0.13_75)] transition-colors"
              >
                Rewards
              </Link>
              <Link
                href="/order"
                className="ml-3 px-5 py-2.5 bg-[oklch(0.46_0.22_25)] text-white font-display text-sm tracking-[0.1em] uppercase hover:bg-[oklch(0.55_0.22_25)] transition-colors duration-150 active:scale-[0.97]"
              >
                Order Online
              </Link>
            </div>

            {/* Mobile: Order + Hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                href="/order"
                className="px-3 py-2 bg-[oklch(0.46_0.22_25)] text-white font-display text-xs tracking-[0.08em] uppercase"
              >
                Order
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-[oklch(0.28_0.03_60)] hover:text-[oklch(0.46_0.22_25)] transition-colors"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
        >
          <div className="bg-white border-t border-[oklch(0.88_0.015_80)] px-4 py-4 space-y-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 font-display text-sm tracking-[0.08em] uppercase transition-colors border-b border-[oklch(0.93_0.02_80)] ${
                  location === link.href
                    ? "text-[oklch(0.46_0.22_25)]"
                    : "text-[oklch(0.28_0.03_60)] hover:text-[oklch(0.46_0.22_25)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/rewards"
              className="block px-4 py-3 font-display text-sm tracking-[0.08em] uppercase text-[oklch(0.68_0.13_75)] border-b border-[oklch(0.93_0.02_80)]"
            >
              ★ Rewards
            </Link>
            <Link
              href="/shipping"
              className="block px-4 py-3 font-display text-sm tracking-[0.08em] uppercase text-[oklch(0.46_0.22_25)] border-b border-[oklch(0.93_0.02_80)]"
            >
              🚚 Ship Nationwide
            </Link>
            <div className="pt-3">
              <a href="tel:5164377698" className="flex items-center gap-2 px-4 py-2 text-[oklch(0.48_0.03_60)] font-body text-sm">
                <Phone size={14} className="text-[oklch(0.46_0.22_25)]" />
                (516) 437-7698 — New Hyde Park
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
