/*
 * Navigation — Umberto's Family Pizzeria v5
 * Desktop: Menu ▾ | Catering | Private Events | Locations | Outdoor Dining | Shop ▾ | More ▾ | ORDER ONLINE
 * More: Our Story, FAQ, Promotions (with Mets Giveaway sub-item), Pizza Arcade
 * Mobile: scrollable full-height drawer, Mets Giveaway under Promotions
 */
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, MapPin, ChevronDown, ChevronRight } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobilePromoOpen, setMobilePromoOpen] = useState(false);
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
    setMobilePromoOpen(false);
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

              {/* Shop dropdown */}
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

              {/* More dropdown — Our Story, FAQ, Promotions (with Mets Giveaway), Arcade */}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => { setMoreOpen(!moreOpen); setMenuOpen(false); setShopOpen(false); }}
                  className={`flex items-center gap-1 px-3 py-2 font-display text-sm tracking-[0.07em] uppercase transition-colors duration-150 ${
                    ["/about", "/faq", "/promotions", "/arcade"].includes(location)
                      ? "text-[oklch(0.46_0.22_25)]"
                      : "text-[oklch(0.28_0.03_60)] hover:text-[oklch(0.46_0.22_25)]"
                  }`}
                  aria-expanded={moreOpen}
                >
                  More
                  <ChevronDown size={13} className={`transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
                </button>
                {moreOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-[oklch(0.88_0.015_80)] shadow-lg min-w-[220px] py-1 z-50">
                    <Link href="/about" className={dropdownItemClass}>Our Story</Link>
                    <Link href="/faq" className={dropdownItemClass}>FAQ</Link>
                    <Link href="/arcade" className={dropdownItemClass}>Pizza Arcade</Link>
                    <div className="border-t border-[oklch(0.93_0.02_80)] my-1" />
                    {/* Promotions with Mets Giveaway nested */}
                    <Link href="/promotions" className={dropdownItemClass}>Promotions</Link>
                    <Link
                      href="/promotions"
                      className="block w-full text-left pl-8 pr-4 py-2 font-display text-xs tracking-[0.07em] uppercase text-[oklch(0.46_0.22_25)] hover:bg-[oklch(0.96_0.02_60)] transition-colors whitespace-nowrap font-semibold"
                    >
                      🎟 Mets Giveaway
                    </Link>
                  </div>
                )}
              </div>

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

        {/* Mobile menu — full-height scrollable drawer */}
        {isOpen && (
          <div
            className="lg:hidden fixed inset-0 top-[calc(var(--nav-height,112px))] z-40 bg-white border-t border-[oklch(0.88_0.015_80)] overflow-y-auto"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="px-0 py-2 pb-10">
              {/* Main links */}
              <Link href="/menu" className={mobileItemClass}>Menu</Link>
              <Link href="/catering" className={mobileItemClass}>Catering</Link>
              <Link href="/private-events" className={mobileItemClass}>Private Events</Link>
              <Link href="/locations" className={mobileItemClass}>Locations</Link>
              <Link href="/outdoor" className={mobileItemClass}>Outdoor Dining</Link>

              {/* Shop section */}
              <div className="px-4 pt-4 pb-1 text-[oklch(0.46_0.22_25)] font-display text-xs tracking-[0.12em] uppercase font-semibold bg-[oklch(0.97_0.015_80)] border-b border-[oklch(0.88_0.015_80)]">
                Shop
              </div>
              <Link href="/shipping" className={mobileItemClass}>Ship Nationwide</Link>
              <Link href="/rewards" className={mobileItemClass}>Rewards Program</Link>
              <a href="https://umbertos.appsuitecrm.com/gift-cards/892" target="_blank" rel="noopener noreferrer" className={mobileItemClass}>Gift Cards</a>
              <a href="https://umbertos-family.creator-spring.com/" target="_blank" rel="noopener noreferrer" className={mobileItemClass}>Apparel</a>

              {/* Discover section */}
              <div className="px-4 pt-4 pb-1 text-[oklch(0.55_0.03_60)] font-display text-xs tracking-[0.12em] uppercase bg-[oklch(0.97_0.015_80)] border-b border-[oklch(0.88_0.015_80)]">
                Discover
              </div>
              <Link href="/about" className={mobileItemClass}>Our Story</Link>
              <Link href="/faq" className={mobileItemClass}>FAQ</Link>
              <Link href="/arcade" className={mobileItemClass}>Pizza Arcade</Link>

              {/* Promotions with Mets Giveaway as sub-item */}
              <button
                onClick={() => setMobilePromoOpen(!mobilePromoOpen)}
                className="flex items-center justify-between w-full px-4 py-3 font-display text-sm tracking-[0.08em] uppercase text-[oklch(0.28_0.03_60)] hover:text-[oklch(0.46_0.22_25)] border-b border-[oklch(0.93_0.02_80)] transition-colors"
              >
                Promotions
                <ChevronRight size={14} className={`transition-transform duration-200 ${mobilePromoOpen ? "rotate-90" : ""}`} />
              </button>
              {mobilePromoOpen && (
                <>
                  <Link href="/promotions" className="block px-8 py-2.5 font-display text-sm tracking-[0.08em] uppercase text-[oklch(0.28_0.03_60)] hover:text-[oklch(0.46_0.22_25)] border-b border-[oklch(0.93_0.02_80)] transition-colors">
                    All Promotions
                  </Link>
                  <Link href="/promotions" className="block px-8 py-2.5 font-display text-sm tracking-[0.08em] uppercase border-b border-[oklch(0.93_0.02_80)] transition-colors font-semibold" style={{ color: '#FF5910' }}>
                    🎟 Mets Giveaway
                  </Link>
                </>
              )}

              {/* Phone */}
              <div className="pt-4 px-4">
                <a href="tel:5164377698" className="flex items-center gap-2 py-2 text-[oklch(0.48_0.03_60)] font-body text-sm">
                  <Phone size={14} className="text-[oklch(0.46_0.22_25)]" />
                  (516) 437-7698 — New Hyde Park
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
