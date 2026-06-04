/**
 * Outdoor Dining Page — Umberto's Family Pizzeria
 * Design: Warm Italian al fresco — cream/amber palette, editorial photo grid,
 * location cards with outdoor-specific info, seasonal ambiance sections.
 * Typography: font-display (Playfair Display) for headings, font-body (Lato) for body.
 */

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { MapPin, Clock, Phone, Sun, Star, ChevronRight, Utensils, Wind } from "lucide-react";

// ─── Real Umberto's outdoor photos + curated Unsplash ───────────────────────
const HERO_BG = "/manus-storage/outdoor-evening-patio_ffcb37ac.jpg";
const PATIO_EXTERIOR = "/manus-storage/outdoor-nhp-exterior_b5594472.jpg";
const PATIO_NIGHT = "/manus-storage/outdoor-nhp-night_26b26779.jpg";
const PATIO_MASSAPEQUA = "/manus-storage/outdoor-massapequa-patio_0f41ad0a.jpg";

// Curated Unsplash for gallery variety
const GALLERY_IMGS = [
  {
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    alt: "Outdoor patio dining with string lights at dusk",
    caption: "Evening ambiance",
  },
  {
    src: PATIO_EXTERIOR,
    alt: "Umberto's New Hyde Park outdoor patio with white tablecloths",
    caption: "New Hyde Park patio",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    alt: "Al fresco dining with candles and wine",
    caption: "Romantic evenings",
  },
  {
    src: PATIO_NIGHT,
    alt: "Umberto's night exterior with neon sign",
    caption: "Family owned since 1965",
  },
  {
    src: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80",
    alt: "Fresh pizza on outdoor table",
    caption: "Fresh from the oven",
  },
  {
    src: PATIO_MASSAPEQUA,
    alt: "Umberto's Massapequa outdoor seating",
    caption: "Massapequa Park",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    alt: "Italian food spread on outdoor table",
    caption: "Grandma slice al fresco",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    alt: "Warm restaurant patio with plants",
    caption: "Garden seating",
  },
];

// ─── Locations with outdoor seating ─────────────────────────────────────────
const OUTDOOR_LOCATIONS = [
  {
    name: "New Hyde Park",
    subtitle: "The Original — Est. 1965",
    address: "2101 Jericho Turnpike, New Hyde Park, NY 11040",
    phone: "(516) 437-7698",
    outdoor: "Covered front patio with white tablecloths, flower planters, and barrel accents. Seats 30+.",
    season: "Spring through Fall",
    features: ["Covered canopy", "White linen tables", "Flower garden border", "Barrel planters"],
    img: PATIO_EXTERIOR,
    orderUrl: "https://www.umbertosfamily.com/order",
    directionsUrl: "https://maps.google.com/?q=2101+Jericho+Turnpike+New+Hyde+Park+NY",
    flagship: true,
  },
  {
    name: "Massapequa Park",
    subtitle: "South Shore Location",
    address: "4878 Merrick Rd, Massapequa Park, NY 11762",
    phone: "(516) 799-2727",
    outdoor: "Charming sidewalk patio with umbrella tables, perfect for a casual summer slice.",
    season: "Spring through Fall",
    features: ["Umbrella tables", "Sidewalk seating", "Family-friendly", "Dog-friendly patio"],
    img: PATIO_MASSAPEQUA,
    orderUrl: "https://www.umbertosfamily.com/order",
    directionsUrl: "https://maps.google.com/?q=4878+Merrick+Rd+Massapequa+Park+NY",
    flagship: false,
  },
  {
    name: "Manhasset",
    subtitle: "North Shore Location",
    address: "1430 Northern Blvd, Manhasset, NY 11030",
    phone: "(516) 365-0007",
    outdoor: "Elegant outdoor terrace with evening string lights — perfect for date nights and family gatherings.",
    season: "Year-round (weather permitting)",
    features: ["String lights", "Evening ambiance", "Terrace seating", "Private party area"],
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    orderUrl: "https://www.umbertosfamily.com/order",
    directionsUrl: "https://maps.google.com/?q=1430+Northern+Blvd+Manhasset+NY",
    flagship: false,
  },
  {
    name: "Farmingdale",
    subtitle: "Newest Location",
    address: "358 Conklin St, Farmingdale, NY 11735",
    phone: "(516) 777-7200",
    outdoor: "Modern outdoor seating area with fresh landscaping and comfortable all-weather furniture.",
    season: "Spring through Fall",
    features: ["Modern furniture", "Landscaped border", "Ample parking", "Spacious layout"],
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    orderUrl: "https://www.umbertosfamily.com/order",
    directionsUrl: "https://maps.google.com/?q=358+Conklin+St+Farmingdale+NY",
    flagship: false,
  },
];

// ─── Seasonal info ────────────────────────────────────────────────────────────
const SEASONS = [
  {
    icon: "🌸",
    name: "Spring",
    months: "March – May",
    vibe: "Fresh blooms, cool breezes, and the first grandma slice of the season on the patio.",
    color: "oklch(0.92 0.04 330)",
  },
  {
    icon: "☀️",
    name: "Summer",
    months: "June – August",
    vibe: "Long Island summers at their finest — cold drinks, hot pizza, and golden evenings outdoors.",
    color: "oklch(0.95 0.08 80)",
  },
  {
    icon: "🍂",
    name: "Fall",
    months: "September – November",
    vibe: "Crisp autumn air, warm marinara, and the most beautiful foliage backdrop on Long Island.",
    color: "oklch(0.92 0.06 50)",
  },
];

export default function Outdoor() {
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.01_80)] font-body">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative h-[92vh] min-h-[560px] flex items-end overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        {/* Gradient overlay — dark at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Floating badge */}
        <div
          className="absolute top-8 right-8 hidden md:flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 border-white/60 text-white text-center"
          style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)" }}
        >
          <Sun size={18} className="mb-0.5 opacity-80" />
          <span className="font-display text-xs leading-tight tracking-wide">AL FRESCO<br />DINING</span>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-16 md:pb-24">
          {/* Eyebrow */}
          <p className="font-display text-[oklch(0.88_0.12_75)] text-sm tracking-[0.25em] uppercase mb-4">
            Umberto's Family Pizzeria · Since 1965
          </p>

          {/* Headline */}
          <h1 className="font-display text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none mb-6 max-w-3xl">
            Dine<br />
            <span style={{ color: "oklch(0.88_0.18_60)" }}>Outside.</span>
          </h1>

          <p className="font-body text-white/80 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
            Long Island summers were made for grandma slices al fresco. Pull up a chair, feel the breeze, and taste the slice that started it all — right on the patio.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 bg-[oklch(0.46_0.22_25)] text-white font-display text-sm tracking-[0.12em] uppercase px-6 py-3.5 hover:bg-[oklch(0.38_0.22_25)] transition-all duration-200 active:scale-95"
            >
              <MapPin size={15} />
              Find a Location
            </Link>
            <a
              href="https://www.umbertosfamily.com/order"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/60 text-white font-display text-sm tracking-[0.12em] uppercase px-6 py-3.5 hover:bg-white/10 transition-all duration-200"
            >
              <Utensils size={15} />
              Order Online
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 animate-bounce">
          <div className="w-px h-8 bg-white/30" />
          <span className="font-body text-[10px] tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* ── INTRO STRIP ──────────────────────────────────────────────────── */}
      <section className="bg-[oklch(0.46_0.22_25)] text-white py-5 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-8 text-center">
          {[
            { icon: <Sun size={16} />, text: "Open Spring through Fall" },
            { icon: <Utensils size={16} />, text: "Full Menu Available Outdoors" },
            { icon: <Wind size={16} />, text: "Weather-Permitting Seating" },
            { icon: <Star size={16} />, text: "4 Locations with Outdoor Seating" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 font-body text-sm text-white/90">
              <span className="text-[oklch(0.88_0.12_75)]">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* ── PHOTO GALLERY ────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-display text-[oklch(0.55_0.08_50)] text-xs tracking-[0.3em] uppercase mb-3">
            The Experience
          </p>
          <h2 className="font-display text-[oklch(0.18_0.025_60)] text-4xl sm:text-5xl font-bold mb-4">
            Life Is Better Outside
          </h2>
          <p className="font-body text-[oklch(0.45_0.03_60)] text-lg max-w-xl mx-auto leading-relaxed">
            From lazy Sunday lunches to summer date nights, our patios set the scene for Long Island's best memories.
          </p>
        </div>

        {/* Masonry-style photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {GALLERY_IMGS.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden cursor-pointer group ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              } ${i === 4 ? "md:col-span-2" : ""}`}
              style={{ aspectRatio: i === 0 ? "1/1" : i === 4 ? "2/1" : "1/1" }}
              onClick={() => setActiveImg(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-3">
                <span className="font-display text-white text-xs tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  {img.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LIGHTBOX ─────────────────────────────────────────────────────── */}
      {activeImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActiveImg(null)}
        >
          <img
            src={activeImg}
            alt="Outdoor dining"
            className="max-w-full max-h-[90vh] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setActiveImg(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white font-display text-2xl w-10 h-10 flex items-center justify-center border border-white/30 hover:border-white/70 transition-colors"
          >
            ×
          </button>
        </div>
      )}

      {/* ── SEASONAL SECTION ─────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 sm:px-6"
        style={{ background: "oklch(0.96 0.015 80)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-display text-[oklch(0.55_0.08_50)] text-xs tracking-[0.3em] uppercase mb-3">
              Every Season
            </p>
            <h2 className="font-display text-[oklch(0.18_0.025_60)] text-4xl sm:text-5xl font-bold">
              Always in Season
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SEASONS.map((s) => (
              <div
                key={s.name}
                className="relative p-8 border border-[oklch(0.88_0.015_80)] bg-white hover:shadow-lg transition-shadow duration-300"
              >
                {/* Color accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: s.color }}
                />
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-display text-[oklch(0.18_0.025_60)] text-2xl font-bold mb-1">
                  {s.name}
                </h3>
                <p className="font-body text-[oklch(0.55_0.08_50)] text-xs tracking-widest uppercase mb-4">
                  {s.months}
                </p>
                <p className="font-body text-[oklch(0.38_0.03_60)] text-sm leading-relaxed">
                  {s.vibe}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION CARDS ───────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-display text-[oklch(0.55_0.08_50)] text-xs tracking-[0.3em] uppercase mb-3">
            Where to Sit Outside
          </p>
          <h2 className="font-display text-[oklch(0.18_0.025_60)] text-4xl sm:text-5xl font-bold mb-4">
            Our Outdoor Locations
          </h2>
          <p className="font-body text-[oklch(0.45_0.03_60)] text-lg max-w-xl mx-auto">
            Four of our six Long Island locations offer outdoor seating. Each patio has its own character — find your favorite.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {OUTDOOR_LOCATIONS.map((loc) => (
            <div
              key={loc.name}
              className="group bg-white border border-[oklch(0.88_0.015_80)] overflow-hidden hover:shadow-xl transition-all duration-400"
            >
              {/* Photo */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={loc.img}
                  alt={`Umberto's ${loc.name} outdoor seating`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {loc.flagship && (
                  <div className="absolute top-3 left-3 bg-[oklch(0.46_0.22_25)] text-white font-display text-[10px] tracking-[0.15em] uppercase px-2.5 py-1">
                    Original Location
                  </div>
                )}
                {/* Season badge */}
                <div className="absolute bottom-3 right-3 bg-black/60 text-white font-body text-xs px-2.5 py-1 flex items-center gap-1.5 backdrop-blur-sm">
                  <Sun size={11} />
                  {loc.season}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display text-[oklch(0.18_0.025_60)] text-2xl font-bold leading-tight">
                      {loc.name}
                    </h3>
                    <p className="font-body text-[oklch(0.55_0.08_50)] text-xs tracking-widest uppercase mt-0.5">
                      {loc.subtitle}
                    </p>
                  </div>
                </div>

                {/* Outdoor description */}
                <p className="font-body text-[oklch(0.38_0.03_60)] text-sm leading-relaxed mb-4">
                  {loc.outdoor}
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {loc.features.map((f) => (
                    <span
                      key={f}
                      className="font-body text-[10px] tracking-wide uppercase px-2 py-0.5 border border-[oklch(0.88_0.015_80)] text-[oklch(0.48_0.03_60)]"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Address + phone */}
                <div className="space-y-1.5 mb-5 pb-5 border-b border-[oklch(0.93_0.01_80)]">
                  <div className="flex items-start gap-2 font-body text-sm text-[oklch(0.45_0.03_60)]">
                    <MapPin size={13} className="mt-0.5 flex-shrink-0 text-[oklch(0.46_0.22_25)]" />
                    {loc.address}
                  </div>
                  <div className="flex items-center gap-2 font-body text-sm text-[oklch(0.45_0.03_60)]">
                    <Phone size={13} className="flex-shrink-0 text-[oklch(0.46_0.22_25)]" />
                    <a href={`tel:${loc.phone}`} className="hover:text-[oklch(0.46_0.22_25)] transition-colors">
                      {loc.phone}
                    </a>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex gap-2 flex-wrap">
                  <a
                    href={loc.orderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[oklch(0.46_0.22_25)] text-white font-display text-xs tracking-[0.1em] uppercase px-4 py-2.5 hover:bg-[oklch(0.38_0.22_25)] transition-colors active:scale-95"
                  >
                    <Utensils size={12} />
                    Order Now
                  </a>
                  <a
                    href={loc.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border border-[oklch(0.46_0.22_25)] text-[oklch(0.46_0.22_25)] font-display text-xs tracking-[0.1em] uppercase px-4 py-2.5 hover:bg-[oklch(0.97_0.015_80)] transition-colors"
                  >
                    <MapPin size={12} />
                    Directions
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOURS REMINDER ───────────────────────────────────────────────── */}
      <section
        className="py-14 px-4 sm:px-6"
        style={{ background: "oklch(0.96 0.015 80)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <Clock size={28} className="mx-auto mb-4 text-[oklch(0.46_0.22_25)]" />
          <h3 className="font-display text-[oklch(0.18_0.025_60)] text-2xl font-bold mb-3">
            Outdoor Seating Hours
          </h3>
          <p className="font-body text-[oklch(0.45_0.03_60)] text-base leading-relaxed mb-6">
            Outdoor seating is available during regular business hours, weather permitting.
            On rainy or very cold days, we'll seat you inside with the same great food and service.
          </p>
          <div className="inline-grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
            {[
              { day: "Mon – Thu", hours: "10:30 am – 9:30 pm" },
              { day: "Fri – Sat", hours: "10:30 am – 10:00 pm" },
              { day: "Sunday", hours: "11:00 am – 9:00 pm" },
            ].map((h) => (
              <div key={h.day} className="bg-white border border-[oklch(0.88_0.015_80)] px-5 py-4">
                <p className="font-display text-[oklch(0.46_0.22_25)] text-xs tracking-widest uppercase mb-1">
                  {h.day}
                </p>
                <p className="font-body text-[oklch(0.25_0.025_60)] text-sm font-semibold">
                  {h.hours}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section
        className="relative py-24 px-4 sm:px-6 overflow-hidden"
        style={{
          backgroundImage: `url(${PATIO_NIGHT})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="font-display text-[oklch(0.88_0.12_75)] text-xs tracking-[0.3em] uppercase mb-4">
            Come As You Are
          </p>
          <h2 className="font-display text-white text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Reserve Your Patio Table
          </h2>
          <p className="font-body text-white/75 text-lg mb-8 leading-relaxed">
            Large groups? Private patio events? Call your nearest location and we'll set it up.
            Walk-ins always welcome for outdoor seating.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 bg-[oklch(0.46_0.22_25)] text-white font-display text-sm tracking-[0.12em] uppercase px-7 py-3.5 hover:bg-[oklch(0.38_0.22_25)] transition-all active:scale-95"
            >
              <MapPin size={15} />
              View All Locations
            </Link>
            <Link
              href="/private-events"
              className="inline-flex items-center gap-2 border border-white/50 text-white font-display text-sm tracking-[0.12em] uppercase px-7 py-3.5 hover:bg-white/10 transition-all"
            >
              <ChevronRight size={15} />
              Private Events
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
