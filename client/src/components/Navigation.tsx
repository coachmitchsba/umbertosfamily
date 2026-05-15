/*
 * Navigation — Umberto's Family Pizzeria
 * Design: Dark sticky header, Bebas Neue nav links, red CTA "Order Online"
 * Mobile: Hamburger menu with slide-down drawer
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, MapPin } from "lucide-react";

const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "Order Online", highlight: true },
  { href: "/catering", label: "Catering" },
  { href: "/private-events", label: "Private Events" },
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "Our Story" },
  { href: "/faq", label: "FAQ" },
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

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-[oklch(0.46_0.22_25)] text-[oklch(0.98_0.01_80)] py-1.5 text-center text-xs font-body tracking-wider">
        <span className="flex items-center justify-center gap-4 flex-wrap px-4">
          <span className="flex items-center gap-1.5">
            <Phone size={11} />
            <a href="tel:5164377698" className="hover:underline">New Hyde Park: (516) 437-7698</a>
          </span>
          <span className="hidden sm:inline text-[oklch(0.98_0.01_80)]/60">|</span>
          <span className="flex items-center gap-1.5 hidden sm:flex">
            <MapPin size={11} />
            <Link href="/locations" className="hover:underline">6 Long Island Locations</Link>
          </span>
          <span className="hidden sm:inline text-[oklch(0.98_0.01_80)]/60">|</span>
          <span className="hidden md:inline">Family Owned &amp; Operated Since 1965</span>
        </span>
      </div>

      {/* Main nav */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[oklch(0.10_0.015_60)]/97 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
            : "bg-[oklch(0.10_0.015_60)]"
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
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.highlight ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="ml-2 px-5 py-2.5 bg-[oklch(0.46_0.22_25)] text-[oklch(0.98_0.01_80)] font-display text-sm tracking-[0.1em] uppercase hover:bg-[oklch(0.55_0.22_25)] transition-colors duration-150 active:scale-[0.97]"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 font-display text-sm tracking-[0.08em] uppercase transition-colors duration-150 ${
                      location === link.href
                        ? "text-[oklch(0.46_0.22_25)]"
                        : "text-[oklch(0.85_0.03_80)] hover:text-[oklch(0.94_0.03_80)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[oklch(0.94_0.03_80)] hover:text-[oklch(0.46_0.22_25)] transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
        >
          <div className="bg-[oklch(0.12_0.018_60)] border-t border-[oklch(0.25_0.02_60)] px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 font-display text-base tracking-[0.08em] uppercase transition-colors ${
                  link.highlight
                    ? "bg-[oklch(0.46_0.22_25)] text-[oklch(0.98_0.01_80)] text-center mt-2"
                    : location === link.href
                    ? "text-[oklch(0.46_0.22_25)]"
                    : "text-[oklch(0.85_0.03_80)] hover:text-[oklch(0.94_0.03_80)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-[oklch(0.25_0.02_60)] mt-3">
              <a href="tel:5164377698" className="flex items-center gap-2 px-4 py-2 text-[oklch(0.72_0.14_75)] font-body text-sm">
                <Phone size={14} />
                (516) 437-7698 — New Hyde Park
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
