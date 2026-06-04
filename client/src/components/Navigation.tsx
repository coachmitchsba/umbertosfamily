/*
 * Navigation — Umberto's Family Pizzeria v4
 * Structure: Menu ▾ | Catering | Private Events | Locations | Shop ▾ | More ▾ | ORDER ONLINE
 * Shop: non-clickable header with Ship Nationwide, Rewards, Gift Cards
 * More: Our Story, FAQ, Arcade
 */
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, MapPin, ChevronDown } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  const menuRef = useRef<HTMLDivElement>(null);
  const shopRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMenuOpen(false);
    setShopOpen(false);
    setMoreOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) setShopOpen(false);
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (href: string) => location === href;

  const linkClass = (href: string) =>
    `px-3 py-2 font-display text-sm tracking-[0.07em] uppercase transition-colors duration-150 whitespace-nowrap ${
      isActive(href)
        ? "text-[oklch(0.46_0.22_25)]"
        : "text-[oklch(0.28_0.03_60)] hover:text-[oklch(0.46_0.22_25)]"
    }`;

  const dropdownItemClass =
    "block w-full text-left px-4 py-2.5 font-display text-sm tracking-[0.07em] uppercase text-[oklch(0.28_0.03_60)] hover:text-[oklch(0.46_0.22_25)] hover:bg-[oklch(0.96_0.02_60)] transition-colors whitespace-nowrap";

  const mobileItemClass =
    "block px-4 py-3 font-display text-sm tracking-[0.08em] uppercase text-[oklch(0.28_0.03_60)] hover:text-[oklch(0.46_0.22_25)] border-b border-[oklch(0.93_0.02_80)] transition-colors";

  return (
    <>
      {/* Top bar */}
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
            Ship Nationwide via Goldbelly
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

              {/* Menu dropdown */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => { setMenuOpen(!menuOpen); setShopOpen(false); setMoreOpen(false); }}
                  className={`flex items-center gap-1 px-3 py-2 font-display text-sm tracking-[0.07em] uppercase transition-colors duration-150 ${
                    ["/menu", "/order"].includes(location)
                      ? "text-[oklch(0.46_0.22_25)]"
                      : "text-[oklch(0.28_0.03_60)] hover:text-[oklch(0.46_0.22_25)]"
                  }`}
                  aria-expanded={menuOpen}
                >
                  Menu
                  <ChevronDown size={13} className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} />
                </button>
                {menuOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-[oklch(0.88_0.015_80)] shadow-lg min-w-[200px] py-1 z-50">
                    <Link href="/menu" className={dropdownItemClass}>View Full Menu</Link>
                    <div className="border-t border-[oklch(0.93_0.02_80)] my-1" />
                    <div className="px-4 py-1.5 text-[oklch(0.55_0.03_60)] font-body text-xs tracking-wider uppercase">Order by Location</div>
                    <a href="https://umbertos.appsuitecrm.com/locations" target="_blank" rel="noopener noreferrer" className={dropdownItemClass}>Bellmore</a>
                    <a href="https://umbertos.appsuitecrm.com/locations" target="_blank" rel="noopener noreferrer" className={dropdownItemClass}>Farmingdale</a>
                    <a href="https://umbertos.appsuitecrm.com/locations" target="_blank" rel="noopener noreferrer" className={dropdownItemClass}>Lake Grove</a>
                    <a href="https://umbertos.appsuitecrm.com/locations" target="_blank" rel="noopener noreferrer" className={dropdownItemClass}>Manhasset</a>
                    <a href="https://umbertos.appsuitecrm.com/locations" target="_blank" rel="noopener noreferrer" className={dropdownItemClass}>Massapequa Park</a>
                    <a href="https://umbertos.appsuitecrm.com/locations" target="_blank" rel="noopener noreferrer" className={dropdownItemClass}>New Hyde Park</a>
                  </div>
                )}
              </div>

              {/* Primary links */}
              <Link href="/catering" className={linkClass("/catering")}>Catering</Link>
              <Link href="/private-events" className={linkClass("/private-events")}>Private Events</Link>
              <Link href="/locations" className={linkClass("/locations")}>Locations</Link>
              <Link href="/outdoor" className={linkClass("/outdoor")}>Outdoor Dining</Link>

              {/* Shop dropdown — non-clickable header */}
              <div className="relative" ref={shopRef}>
                <button
                  onClick={() => { setShopOpen(!shopOpen); setMenuOpen(false); setMoreOpen(false); }}
                  className={`flex items-center gap-1 px-3 py-2 font-display text-sm tracking-[0.07em] uppercase transition-colors duration-150 ${
                    ["/shipping", "/rewards", "/gift-cards"].includes(location)
                      ? "text-[oklch(0.46_0.22_25)]"
                      : "text-[oklch(0.28_0.03_60)] hover:text-[oklch(0.46_0.22_25)]"
                  }`}
                  aria-expanded={shopOpen}
                >
                  Shop
                  <ChevronDown size={13} className={`transition-transform duration-200 ${shopOpen ? "rotate-180" : ""}`} />
                </button>
                {shopOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-[oklch(0.88_0.015_80)] shadow-lg min-w-[200px] py-1 z-50">
                    {/* Non-clickable section header */}
                    <div className="px-4 py-2 text-[oklch(0.46_0.22_25)] font-display text-xs tracking-[0.12em] uppercase font-semibold border-b border-[oklch(0.93_0.02_80)] select-none">
                      Umberto's Shop
                    </div>
                    <Link href="/shipping" className={dropdownItemClass}>Ship Nationwide</Link>
                    <Link href="/rewards" className={dropdownItemClass}>Rewards Program</Link>
                    <a href="https://umbertos.appsuitecrm.com/gift-cards/892" target="_blank" rel="noopener noreferrer" className={dropdownItemClass}>Gift Cards</a>
                    <a href="https://umbertos-family.creator-spring.com/" target="_blank" rel="noopener noreferrer" className={dropdownItemClass}>Apparel</a>
                  </div>
                )}
              </div>

              {/* Direct links */}
              <Link href="/about" className={linkClass("/about")}>Our Story</Link>
              <Link href="/faq" className={linkClass("/faq")}>FAQ</Link>
              <Link href="/arcade" className={linkClass("/arcade")}>Pizza Arcade</Link>

              {/* Red CTA */}
              <a
                href="https://umbertos.appsuitecrm.com/locations"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 px-5 py-2.5 bg-[oklch(0.46_0.22_25)] text-white font-display text-sm tracking-[0.1em] uppercase hover:bg-[oklch(0.40_0.22_25)] transition-colors duration-150 active:scale-[0.97]"
              >
                Order Online
              </a>
            </div>

            {/* Mobile: Order + Hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <a
                href="https://umbertos.appsuitecrm.com/locations"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-[oklch(0.46_0.22_25)] text-white font-display text-xs tracking-[0.08em] uppercase"
              >
                Order
              </a>
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
            isOpen ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
        >
          <div className="bg-white border-t border-[oklch(0.88_0.015_80)] px-4 py-4 space-y-0.5">
            {/* Primary */}
            <Link href="/menu" className={mobileItemClass}>Menu</Link>
            <Link href="/catering" className={mobileItemClass}>Catering</Link>
            <Link href="/private-events" className={mobileItemClass}>Private Events</Link>
            <Link href="/locations" className={mobileItemClass}>Locations</Link>
            <Link href="/outdoor" className={mobileItemClass}>Outdoor Dining</Link>
            {/* Shop section */}
            <div className="px-4 pt-3 pb-1 text-[oklch(0.46_0.22_25)] font-display text-xs tracking-[0.12em] uppercase font-semibold">Shop</div>
            <Link href="/shipping" className={mobileItemClass}>Ship Nationwide</Link>
            <Link href="/rewards" className={mobileItemClass}>Rewards Program</Link>
            <a href="https://umbertos.appsuitecrm.com/gift-cards/892" target="_blank" rel="noopener noreferrer" className={mobileItemClass}>Gift Cards</a>
            <a href="https://umbertos-family.creator-spring.com/" target="_blank" rel="noopener noreferrer" className={mobileItemClass}>Apparel</a>
            {/* Discover section */}
            <div className="px-4 pt-3 pb-1 text-[oklch(0.55_0.03_60)] font-display text-xs tracking-[0.12em] uppercase">Discover</div>
            <Link href="/about" className={mobileItemClass}>Our Story</Link>
            <Link href="/faq" className={mobileItemClass}>FAQ</Link>
            <Link href="/arcade" className={mobileItemClass}>Pizza Arcade</Link>
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
