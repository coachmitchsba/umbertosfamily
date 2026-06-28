/*
 * Catering Page — Umberto's Family Pizzeria
 * Design Philosophy: PREMIUM EDITORIAL — matches the menu page quality
 * - Full-bleed dramatic catering tray photography hero
 * - Editorial typography: Playfair Display for headings, clean body copy
 * - Tray menu displayed as elegant ruled-line typographic list
 * - Photo gallery breaking up the tray sections
 * - Client type targeting: offices, schools, government, events
 * SEO: CateringService schema, keyword-rich, Long Island catering targeting
 */
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Phone, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

const CATERING_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-catering-hero-GcryFfjWTxFxA2eYNCJMr9.webp";
const CATERING_TRAYS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-catering-trays-closeup-aHn7hRhUc6WoZUTQvp3PJj.webp";
const ENTREES_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-entrees-chicken-parm-RqtZy99cadP9w43WC7k9so.webp";
const PASTA_IMG = "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80";
const PIZZA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-pizza-closeup-menu-axyEg4HqHLwCzwte7ZZKdq.webp";
const APPETIZER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-appetizer-tray-catering-YzCCMSCzdmf4EovTLc3EVp.webp";
const SALAD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-salad-tray-catering-N3XnFgysrxU5TKKkhSTFUS.webp";
const ANTIPASTI_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-antipasti-spread-EMtQi9tsqRxQpZxvMgAbki.webp";
const PASTA_TRAY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-pasta-tray-catering-68roBbYaBaCC46foADL79B.webp";

type TrayItem = { name: string; half?: string; full?: string; price?: string; note?: string; isPie?: boolean };
type TrayCategory = { id: string; label: string; subtitle: string; items: TrayItem[]; photo?: string };

const TRAY_MENU: TrayCategory[] = [
  {
    id: "pizza",
    label: "Pizza Pies",
    subtitle: "Our legendary pies — sold by the pie, baked fresh and cut for easy serving",
    photo: PIZZA_IMG,
    items: [
      { name: "Grandma / Sicilian", price: "$36.20", note: "16\" square, 12 slices", isPie: true },
      { name: "Neapolitan", price: "$26.80", note: "18\" round, 8 slices", isPie: true },
      { name: "Pazzo Deep Dish", price: "$33.40", note: "Sausage, olives, roasted peppers", isPie: true },
      { name: "Vegetable", price: "$34.10", note: "Broccoli, spinach, mushrooms", isPie: true },
      { name: "Buffalo Chicken", price: "$32.35", isPie: true },
      { name: "Vodka", price: "$32.35", isPie: true },
    ],
  },
  {
    id: "pasta",
    label: "Pasta Trays",
    subtitle: "Classic Italian pasta — feeds 8–10 (half) or 16–20 (full)",
    photo: PASTA_TRAY_IMG,
    items: [
      { name: "Baked Ziti", half: "$35.00", full: "$65.00", note: "Ricotta, mozzarella & tomato sauce" },
      { name: "Baked Ziti with Meat", half: "$40.00", full: "$75.00" },
      { name: "Lasagna", half: "$42.00", full: "$80.00", note: "Ricotta, mozzarella, meatballs & sausage" },
      { name: "Penne Alla Vodka", half: "$37.00", full: "$70.00", note: "Prosciutto di Parma DOP" },
      { name: "Spaghetti with Meatballs", half: "$40.00", full: "$75.00" },
      { name: "Rigatoni Al Filetto", half: "$37.00", full: "$70.00", note: "Plum tomatoes, onion, prosciutto" },
      { name: "Fettuccine Alfredo", half: "$35.00", full: "$65.00" },
      { name: "Ziti with Broccoli", half: "$32.00", full: "$60.00" },
    ],
  },
  {
    id: "entrees",
    label: "Entrée Trays",
    subtitle: "Served with your choice of pasta or salad",
    photo: ENTREES_IMG,
    items: [
      { name: "Chicken Parmigiana", half: "$65.00", full: "$120.00", note: "Most popular catering item" },
      { name: "Chicken Marsala", half: "$65.00", full: "$120.00", note: "Marsala wine & mushrooms" },
      { name: "Chicken Francese", half: "$65.00", full: "$120.00", note: "Egg-battered, lemon butter" },
      { name: "Veal Parmigiana", half: "$75.00", full: "$140.00" },
      { name: "Eggplant Parmigiana", half: "$55.00", full: "$100.00" },
      { name: "Sausage & Peppers", half: "$50.00", full: "$95.00", note: "Homemade Italian sausage" },
    ],
  },
  {
    id: "appetizers",
    label: "Appetizer Trays",
    subtitle: "Perfect for cocktail hours and pre-event spreads",
    photo: APPETIZER_IMG,
    items: [
      { name: "Cold Antipasto", half: "Market", full: "Market", note: "Prosciutto, soppressata, fresh mozzarella, olives" },
      { name: "Homemade Meatballs", half: "$35.00", full: "$65.00" },
      { name: "Eggplant Rollatine", half: "$40.00", full: "$75.00" },
      { name: "Baked Clams", half: "Market", full: "Market" },
      { name: "Calamari", half: "Market", full: "Market", note: "Fried or Umberto style" },
      { name: "Buffalo Wings", half: "$40.00", full: "$75.00" },
    ],
  },
  {
    id: "salads",
    label: "Salad & Sides",
    subtitle: "Fresh and seasonal — perfect alongside any entrée",
    photo: SALAD_IMG,
    items: [
      { name: "Caesar Salad", half: "$25.00", full: "$45.00" },
      { name: "House Salad", half: "$22.00", full: "$40.00" },
      { name: "Arugula Salad", half: "Market", full: "Market", note: "Shaved parmesan, cherry tomatoes, EVOO" },
      { name: "Caprese", half: "Market", full: "Market", note: "Fresh mozzarella, tomatoes, basil" },
      { name: "Garlic Bread", half: "$14.00", full: "$25.00" },
      { name: "Sautéed Broccoli Rabe", half: "$25.00", full: "$45.00", note: "Garlic & oil" },
    ],
  },
];

const CLIENT_TYPES = [
  { label: "Corporate Offices", desc: "Lunch meetings, team celebrations, client events, holiday parties" },
  { label: "Schools & Universities", desc: "Staff lunches, graduation celebrations, faculty events, fundraisers" },
  { label: "Government & Municipal", desc: "Department lunches, award ceremonies, community events, town halls" },
  { label: "Private Events", desc: "Birthday parties, anniversaries, baby showers, communions, graduations" },
  { label: "Religious Organizations", desc: "Church events, synagogue gatherings, holiday celebrations, fundraisers" },
  { label: "Healthcare & Medical", desc: "Staff appreciation, department meetings, patient family events" },
];

const LOCATIONS = [
  { name: "New Hyde Park", phone: "(516) 437-7698", phoneRaw: "5164377698" },
  { name: "Manhasset", phone: "(516) 472-7801", phoneRaw: "5164727801" },
  { name: "Bellmore", phone: "(516) 409-1400", phoneRaw: "5164091400" },
  { name: "Massapequa Park", phone: "(516) 541-3030", phoneRaw: "5165413030" },
  { name: "Lake Grove", phone: "(631) 862-6777", phoneRaw: "6318626777" },
  { name: "Farmingdale", phone: "(631) 454-6440", phoneRaw: "6314546440" },
];

const playfair = "'Playfair Display', Georgia, serif";
const dark = "oklch(0.20 0.025 60)";
const red = "oklch(0.46 0.22 25)";
const muted = "oklch(0.52 0.025 60)";
const border = "oklch(0.88 0.015 80)";
const bg = "#FDFAF5";

export default function Catering() {
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set(["pizza", "pasta", "entrees", "appetizers", "salads"])
  );
  const toggleCategory = (id: string) => setOpenCategories(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);

  const cateringSchema = {
    "@context": "https://schema.org",
    "@type": "FoodService",
    "name": "Umberto's Family Pizzeria Catering",
    "description": "Full and half tray Italian catering for offices, schools, government agencies, and private events across Long Island, NY. Grandma pizza, pasta, chicken parmigiana, and more.",
    "areaServed": "Long Island, New York",
    "telephone": "(516) 437-7698",
    "servesCuisine": "Italian",
    "url": "https://www.umbertosfamily.com/catering",
  };

  return (
    <div className="min-h-screen" style={{ background: bg }}>
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cateringSchema) }} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: "62vh", minHeight: 420 }}>
        <img
          src={CATERING_HERO}
          alt="Umberto's catering — full trays of grandma pizza, penne alla vodka, chicken parmigiana"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.75) 100%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 px-4 text-center">
          <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body, sans-serif)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Long Island's Favorite Italian Catering Since 1965
          </p>
          <h1
            style={{
              fontFamily: playfair,
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              fontWeight: 700,
              color: "white",
              lineHeight: 1,
              letterSpacing: "-0.01em",
              marginBottom: "1rem",
            }}
          >
            Catering
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <div style={{ width: 48, height: 1, background: "rgba(255,255,255,0.35)" }} />
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Full Trays · Half Trays · Offices · Schools · Government · Events
            </span>
            <div style={{ width: 48, height: 1, background: "rgba(255,255,255,0.35)" }} />
          </div>
          <a
            href="tel:5164377698"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: red,
              color: "white",
              padding: "0.875rem 2rem",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
          >
            <Phone size={14} /> Call to Order Catering
          </a>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <div style={{ background: dark }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "60+", label: "Years of Catering" },
              { num: "6", label: "Long Island Locations" },
              { num: "Full & Half", label: "Tray Options" },
              { num: "Same Day", label: "Orders Welcome" },
            ].map((stat) => (
              <div key={stat.label}>
                <p style={{ fontFamily: playfair, fontSize: "1.8rem", fontWeight: 700, color: "white", lineHeight: 1 }}>
                  {stat.num}
                </p>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "0.25rem", color: "rgba(255,255,255,0.45)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* ── WHO WE CATER TO ──────────────────────────────────────────── */}
        <section style={{ marginBottom: "5rem" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: red, marginBottom: "0.5rem" }}>Who We Serve</p>
            <h2 style={{ fontFamily: playfair, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: dark, letterSpacing: "-0.01em" }}>
              Catering for Every Occasion
            </h2>
            <p style={{ fontSize: "1rem", marginTop: "0.75rem", maxWidth: "42rem", color: muted, lineHeight: 1.7 }}>
              From boardroom lunches to backyard celebrations, Umberto's has been the trusted catering choice across Long Island since 1965. Our full and half trays feed any size group with the same quality you'd expect dining in.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLIENT_TYPES.map((ct) => (
              <div
                key={ct.label}
                style={{ padding: "1.75rem 1.5rem", border: `1px solid ${border}`, background: "white", borderTop: `3px solid ${red}` }}
              >
                <h3 style={{ fontFamily: playfair, fontSize: "1.1rem", fontWeight: 600, color: dark, marginBottom: "0.5rem" }}>
                  {ct.label}
                </h3>
                <p style={{ fontSize: "0.875rem", color: muted, lineHeight: 1.6 }}>{ct.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PHOTO BREAK ──────────────────────────────────────────────── */}
        <div style={{ marginBottom: "5rem", overflow: "hidden", height: 320 }}>
          <img
            src={CATERING_TRAYS}
            alt="Umberto's catering trays — chicken parmigiana, penne alla vodka, grandma pizza slices"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
          />
        </div>

        {/* ── TRAY MENU ────────────────────────────────────────────────── */}
        <section style={{ marginBottom: "5rem" }} id="catering-menu">
          <div style={{ marginBottom: "2.5rem" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: red, marginBottom: "0.5rem" }}>The Menu</p>
            <h2 style={{ fontFamily: playfair, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: dark, letterSpacing: "-0.01em" }}>
              Full &amp; Half Tray Menu
            </h2>
            <p style={{ fontSize: "0.875rem", marginTop: "0.5rem", color: muted }}>
              All trays available for pickup. Call your nearest location to place your order. Minimum 24-hour notice recommended; same-day orders welcome based on availability. Prices subject to change.
            </p>
          </div>

          {/* Accordion tray categories */}
          <div style={{ border: `1px solid ${border}` }}>
            {TRAY_MENU.map((cat, idx) => (
              <div
                key={cat.id}
                style={{ borderTop: idx > 0 ? `1px solid ${border}` : "none" }}
              >
                {/* Category header button */}
                <button
                  onClick={() => toggleCategory(cat.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.25rem 1.5rem",
                    textAlign: "left",
                    background: openCategories.has(cat.id) ? "oklch(0.97 0.008 80)" : "white",
                    cursor: "pointer",
                    border: "none",
                    transition: "background 0.15s",
                  }}
                >
                  <div>
                    <h3 style={{ fontFamily: playfair, fontSize: "1.25rem", fontWeight: 600, color: dark }}>
                      {cat.label}
                    </h3>
                    <p style={{ fontSize: "0.75rem", color: muted, marginTop: "0.15rem" }}>{cat.subtitle}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
                    <span style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: muted, display: "none" }}>
                      {cat.items.length} items
                    </span>
                    {openCategories.has(cat.id)
                      ? <ChevronUp size={18} style={{ color: red }} />
                      : <ChevronDown size={18} style={{ color: muted }} />
                    }
                  </div>
                </button>

                {/* Expanded content */}
                {openCategories.has(cat.id) && (
                  <div style={{ background: "white", borderTop: `1px solid oklch(0.91 0.012 80)` }}>
                    {/* Optional photo */}
                    {cat.photo && (
                      <div style={{ overflow: "hidden", height: 200 }}>
                        <img
                          src={cat.photo}
                          alt={cat.label}
                          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }}
                        />
                      </div>
                    )}
                    {/* Column headers — pizza pies show single price, others show half/full */}
                    {!cat.items[0]?.isPie && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0.75rem 1.5rem",
                          borderBottom: `1px solid oklch(0.91 0.012 80)`,
                          background: "oklch(0.97 0.008 80)",
                        }}
                      >
                        <span style={{ flex: 1, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: muted }}>Item</span>
                        <span style={{ width: "6rem", textAlign: "right", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: muted }}>Half Tray</span>
                        <span style={{ width: "6rem", textAlign: "right", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: muted }}>Full Tray</span>
                      </div>
                    )}
                    {cat.items[0]?.isPie && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0.75rem 1.5rem",
                          borderBottom: `1px solid oklch(0.91 0.012 80)`,
                          background: "oklch(0.97 0.008 80)",
                        }}
                      >
                        <span style={{ flex: 1, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: muted }}>Pie</span>
                        <span style={{ width: "6rem", textAlign: "right", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: muted }}>Price / Pie</span>
                      </div>
                    )}
                    {/* Items */}
                    {cat.items.map((item, iIdx) => (
                      <div
                        key={item.name}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "1rem 1.5rem",
                          borderBottom: iIdx < cat.items.length - 1 ? `1px solid oklch(0.93 0.01 80)` : "none",
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ fontFamily: playfair, fontSize: "0.95rem", fontWeight: 600, color: dark }}>
                            {item.name}
                          </span>
                          {item.note && (
                            <span style={{ display: "block", fontSize: "0.75rem", marginTop: "0.15rem", color: muted }}>
                              {item.note}
                            </span>
                          )}
                        </div>
                        {item.isPie ? (
                          <span style={{ width: "6rem", textAlign: "right", fontSize: "0.875rem", fontWeight: 600, color: "oklch(0.40 0.025 60)" }}>
                            {item.price || "—"}
                          </span>
                        ) : (
                          <>
                            <span style={{ width: "6rem", textAlign: "right", fontSize: "0.875rem", color: "oklch(0.40 0.025 60)" }}>
                              {item.half || "—"}
                            </span>
                            <span style={{ width: "6rem", textAlign: "right", fontSize: "0.875rem", fontWeight: 600, color: "oklch(0.40 0.025 60)" }}>
                              {item.full || "—"}
                            </span>
                          </>
                        )}
                      </div>
                    ))}
                    {/* Call CTA at bottom of each category */}
                    <div
                      style={{
                        padding: "1rem 1.5rem",
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "0.75rem",
                        background: "oklch(0.97 0.008 80)",
                        borderTop: `1px solid oklch(0.91 0.012 80)`,
                      }}
                    >
                      <p style={{ fontSize: "0.75rem", color: muted }}>
                        Call to confirm pricing and place your order
                      </p>
                      <a
                        href={`tel:${selectedLocation.phoneRaw}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          background: red,
                          color: "white",
                          padding: "0.625rem 1.25rem",
                          fontSize: "0.7rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          textDecoration: "none",
                        }}
                      >
                        <Phone size={11} /> {selectedLocation.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── LOCATION SELECTOR + CALL ─────────────────────────────────── */}
        <section
          style={{ marginBottom: "5rem", padding: "2.5rem 2rem", background: dark }}
        >
          <div style={{ maxWidth: "48rem", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.68 0.13 75)", marginBottom: "0.5rem" }}>
              Place Your Order
            </p>
            <h2 style={{ fontFamily: playfair, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "white", marginBottom: "1rem" }}>
              Call Your Nearest Location
            </h2>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", marginBottom: "2rem", lineHeight: 1.7 }}>
              Select a location below and call to speak with our catering team. We recommend 24-hour notice, but same-day orders are welcome based on availability.
            </p>
            {/* Location tabs */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", marginBottom: "2rem" }}>
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => setSelectedLocation(loc)}
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    background: selectedLocation.name === loc.name ? red : "rgba(255,255,255,0.07)",
                    color: selectedLocation.name === loc.name ? "white" : "rgba(255,255,255,0.55)",
                    border: selectedLocation.name === loc.name ? `1px solid ${red}` : "1px solid rgba(255,255,255,0.12)",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {loc.name}
                </button>
              ))}
            </div>
            <a
              href={`tel:${selectedLocation.phoneRaw}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                background: red,
                color: "white",
                padding: "1rem 2.5rem",
                fontSize: "0.875rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
            >
              <Phone size={16} />
              {selectedLocation.name} — {selectedLocation.phone}
            </a>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
        <section style={{ marginBottom: "5rem" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: red, marginBottom: "0.5rem" }}>Simple Process</p>
            <h2 style={{ fontFamily: playfair, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: dark }}>
              How to Order Catering
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Choose Your Location", desc: "Select the Umberto's nearest to your event venue for fastest service." },
              { step: "02", title: "Browse the Menu", desc: "Pick from our full tray menu — pizza, pasta, entrées, appetizers, and salads." },
              { step: "03", title: "Call to Order", desc: "Call your location directly. We'll confirm availability and set your pickup time." },
              { step: "04", title: "Pick Up & Enjoy", desc: "Arrive at your scheduled time. Trays are hot, fresh, and ready to serve." },
            ].map((s) => (
              <div key={s.step}>
                <p style={{ fontFamily: playfair, fontSize: "2.5rem", fontWeight: 700, color: "oklch(0.88 0.015 80)", lineHeight: 1, marginBottom: "0.75rem" }}>
                  {s.step}
                </p>
                <h3 style={{ fontFamily: playfair, fontSize: "1rem", fontWeight: 600, color: dark, marginBottom: "0.5rem" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: muted, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────────── */}
        <section style={{ textAlign: "center", paddingTop: "3rem", borderTop: `1px solid ${border}` }}>
          <p style={{ fontFamily: playfair, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: dark, fontWeight: 700, marginBottom: "0.75rem" }}>
            Ready to Feed Your Team?
          </p>
          <p style={{ fontSize: "0.875rem", color: muted, marginBottom: "1.5rem", maxWidth: "32rem", margin: "0 auto 1.5rem" }}>
            Umberto's has been Long Island's go-to Italian catering since 1965. Call us today — we'll take care of everything.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
            <a
              href="tel:5164377698"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: red,
                color: "white",
                padding: "1rem 2rem",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              <Phone size={14} /> Call New Hyde Park
            </a>
            <a
              href="https://umbertos.appsuitecrm.com/locations"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                border: `1px solid ${red}`,
                color: red,
                padding: "1rem 2rem",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Order Online <ExternalLink size={13} />
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
