/*
 * Menu Page — Umberto's Family Pizzeria
 * Design Philosophy: PREMIUM EDITORIAL ITALIAN RESTAURANT
 * - Full-bleed dramatic food photography hero
 * - Typographic menu layout: Playfair Display serif for item names, generous whitespace
 * - Horizontal rules between items (like a printed menu), price right-aligned
 * - Category headers as bold full-width section dividers with decorative ornaments
 * - Location selector as elegant tab strip, not a dark bar
 * - NO emoji, NO accordion toggles, NO card borders — this is a fine dining menu
 * - Sticky sidebar with category navigation as a clean typographic list
 * SEO: MenuItem schema, keyword-rich, location-specific via hash routing
 */
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ExternalLink, ChevronRight } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-menu-hero-spread-UJmfmtCW4TpAYDbUSCRAmR.webp";
const PIZZA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-pizza-closeup-menu-axyEg4HqHLwCzwte7ZZKdq.webp";
const PASTA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-pasta-closeup-menu-cnsgS7DoLEcWcniw5S4tKZ.webp";

const LOCATIONS = [
  { id: "new-hyde-park", name: "New Hyde Park", short: "New Hyde Park", address: "633 Jericho Tpke", phone: "(516) 437-7698", phoneRaw: "5164377698", orderUrl: "https://umbertos.appsuitecrm.com/menu/910", flagship: true },
  { id: "manhasset", name: "Manhasset", short: "Manhasset", address: "1558 Northern Blvd", phone: "(516) 472-7801", phoneRaw: "5164727801", orderUrl: "https://umbertos.appsuitecrm.com/menu/795" },
  { id: "bellmore", name: "Bellmore", short: "Bellmore", address: "2427 Merrick Rd", phone: "(516) 409-1400", phoneRaw: "5164091400", orderUrl: "https://umbertos.appsuitecrm.com/menu/928" },
  { id: "massapequa-park", name: "Massapequa Park", short: "Massapequa Pk", address: "4897 Merrick Rd", phone: "(516) 541-3030", phoneRaw: "5165413030", orderUrl: "https://umbertos.appsuitecrm.com/menu/1008" },
  { id: "lake-grove", name: "Lake Grove", short: "Lake Grove", address: "2192 Nesconset Hwy", phone: "(631) 862-6777", phoneRaw: "6318626777", orderUrl: "https://umbertos.appsuitecrm.com/menu/2353" },
  { id: "farmingdale", name: "Farmingdale", short: "Farmingdale", address: "967 Broadhollow Rd", phone: "(631) 454-6440", phoneRaw: "6314546440", orderUrl: "https://umbertos.appsuitecrm.com/menu/3928" },
];

type MenuItem = { name: string; desc: string; price: string; tag?: string; note?: string };
type MenuCategory = { id: string; label: string; subtitle: string; items: MenuItem[] };

const MENU: MenuCategory[] = [
  {
    id: "pizza",
    label: "Pizza",
    subtitle: "Baked fresh to order — our legacy since 1965",
    items: [
      { name: "Grandma", desc: '16" square, 12 slices. Thin-crust with mozzarella & plum marinara', price: "$36.20", tag: "The Original" },
      { name: "Sicilian", desc: '16" square, 12 slices. Rated best Sicilian pie in New York — cheese & tomato sauce', price: "$36.20", tag: "Award Winner" },
      { name: "Neapolitan", desc: '18" round, 8 slices. Classic cheese & tomato sauce, baked well done', price: "$26.80" },
      { name: "Grandma Broccoli Rabe & Sausage", desc: '16" square, 12 slices. Please allow 20 minutes', price: "$37.20", note: "Allow 20 min" },
      { name: "Pazzo Deep Dish", desc: '16" round deep dish, 8 slices. Fresh mozzarella, marinara, sausage, olives & roasted peppers', price: "$33.40", tag: "Fan Favorite" },
      { name: "Vegetable", desc: '18" round. Broccoli, spinach, tomatoes, mushrooms, mozzarella & tomato sauce', price: "$34.10" },
      { name: "Buffalo", desc: '18" round. Buffalo chicken, bleu cheese sauce & mozzarella', price: "$32.35" },
      { name: "Vodka", desc: '18" round. Vodka sauce, mozzarella & herbs', price: "$32.35" },
      { name: "Sicilian Vodka Pepperoni", desc: '16" square. Vodka sauce, mozzarella, fresh mozzarella, pepperoni', price: "$41.35" },
      { name: "Deep Dish", desc: '16" round. Cheese & tomato sauce', price: "$33.00" },
      { name: "Deep Dish Pazzo", desc: '16" round. Fresh mozzarella, marinara, sausage, olives & roasted peppers', price: "$35.00" },
    ],
  },
  {
    id: "appetizers",
    label: "Antipasti",
    subtitle: "To begin — small plates and sharing dishes",
    items: [
      { name: "Cold Antipasto", desc: "Prosciutto di Parma DOP, soppressata, Auricchio, fresh mozzarella, olives, eggplant, mushrooms & roasted red peppers", price: "$15.65 / $24.65" },
      { name: "Mussels", desc: "White, Marinara, or Fra Diavolo", price: "$16.50" },
      { name: "Eggplant Rollatine", desc: "Pan-fried eggplant rolled with creamy ricotta, mozzarella & fresh herbs", price: "$13.40" },
      { name: "Homemade Meatballs", desc: "Mozzarella, housemade roasted peppers, tomatoes & EVOO", price: "$12.15" },
      { name: "Baked Clams", desc: "8 clams topped with seasoned breadcrumbs & lemon", price: "$15.80" },
      { name: "Calamari", desc: "Fried, or Umberto style with onions, garlic, cherry peppers & cherry tomatoes", price: "$16.10 / $18.50" },
      { name: "Housemade Mozzarella", desc: "Fresh mozzarella, housemade roasted peppers, tomatoes & EVOO", price: "$15.00" },
      { name: "Arancini di Tartufo", desc: "Tuscan onion soup mini rice balls, stuffed with truffle cheese, nut-free pesto & parmesan", price: "$15.00" },
      { name: "Prosciutto & Burrata", desc: "Prosciutto di Parma with burrata, shaved parmesan, EVOO", price: "$17.55" },
      { name: "Buffalo Wings", desc: "8 wings", price: "$14.50" },
      { name: "Fried Zucchini Sticks", desc: "Crispy fried zucchini sticks", price: "$12.70" },
      { name: "Mozzarella Sticks", desc: "10 pieces", price: "$12.90" },
    ],
  },
  {
    id: "pasta",
    label: "Pasta",
    subtitle: "Traditional Italian pasta — made to order",
    items: [
      { name: "Penne Alla Vodka", desc: "Made with onions & prosciutto di Parma DOP", price: "$21.50", tag: "Bestseller" },
      { name: "Rigatoni Al Filetto", desc: "Plum tomatoes, onion, prosciutto di Parma DOP & EVOO", price: "$19.95" },
      { name: "Spaghetti with Meatballs", desc: "Homemade meatballs in our famous tomato sauce", price: "$20.95" },
      { name: "Spaghetti Pescatore", desc: "Mussels, clams, shrimp in a light marinara sauce", price: "$24.95" },
      { name: "Spaghetti Vongole", desc: "Red or white clam sauce", price: "$22.95" },
      { name: "Farfalle Shiitake", desc: "Mushrooms, shrimp, light cream sauce", price: "$24.95" },
      { name: "Tortellini Bolognese", desc: "Cream sauce with prosciutto, onions, mushrooms & peas topped with meat sauce", price: "$21.95" },
      { name: "Fettuccine Carbonara", desc: "Onions & bacon in a light cream sauce", price: "$21.95" },
      { name: "Fettuccini Alfredo", desc: "Cream sauce, genuine Parmigiano", price: "$19.95" },
      { name: "Ziti with Broccoli", desc: "Broccoli, garlic & oil", price: "$18.95" },
      { name: "Spaghetti Puttanesca", desc: "Plum tomatoes, Gaeta olives, anchovies, EVOO, garlic & capers", price: "$20.95" },
      { name: "Fusilli Primavera", desc: "Sautéed vegetables, light cream sauce", price: "$20.95" },
    ],
  },
  {
    id: "fresh-pasta",
    label: "Fresh Pasta",
    subtitle: "Handmade daily in our kitchen",
    items: [
      { name: "Gnocchi Al Ischia", desc: "Homemade potato ricotta gnocchi in a fine tomato sauce topped with warm ricotta", price: "$21.50" },
      { name: "Cavatelli Broccoli Rabe", desc: "Homemade cavatelli with goat cheese, broccoli rabe & sliced homemade sausage", price: "$24.80" },
      { name: "Lasagna", desc: "Ricotta, homemade mozzarella, meatballs & sausage in our famous tomato sauce", price: "$19.70", tag: "Classic" },
      { name: "Paccheri Short Ribs", desc: "Slow roasted short ribs & ricotta salata", price: "$27.90" },
      { name: "Rigatoni Umberto", desc: "Calamari, shrimp, clams, fresh plum tomatoes & cherry peppers in garlic & oil", price: "$25.95", tag: "Signature" },
    ],
  },
  {
    id: "entrees",
    label: "Entrées",
    subtitle: "Served with your choice of pasta or salad",
    items: [
      { name: "Chicken Parmigiana", desc: "Breaded chicken cutlet, tomato sauce & mozzarella", price: "$25.95", tag: "Classic" },
      { name: "Chicken Marsala", desc: "Sautéed chicken with Marsala wine & mushrooms", price: "$22.95" },
      { name: "Chicken Francese", desc: "Egg-battered chicken in lemon butter sauce", price: "$22.95" },
      { name: "Chicken Piccata", desc: "Lemon, capers, white wine sauce", price: "$22.95" },
      { name: "Veal Parmigiana", desc: "Tender veal cutlet, tomato sauce & mozzarella", price: "$27.95" },
      { name: "Veal Marsala", desc: "Sautéed veal with Marsala wine & mushrooms", price: "$27.95" },
      { name: "Veal Francese", desc: "Egg-battered veal in lemon butter sauce", price: "$27.95" },
      { name: "Eggplant Parmigiana", desc: "Breaded eggplant, tomato sauce & mozzarella", price: "$19.95" },
      { name: "Sausage & Peppers", desc: "Homemade Italian sausage with peppers & onions", price: "$20.95" },
    ],
  },
  {
    id: "seafood",
    label: "Seafood",
    subtitle: "Fresh from the sea — prepared to order",
    items: [
      { name: "Shrimp Parmigiana", desc: "Breaded shrimp, tomato sauce & mozzarella", price: "$24.95" },
      { name: "Shrimp Scampi", desc: "Sautéed shrimp in garlic, white wine & EVOO", price: "$24.95" },
      { name: "Shrimp Francese", desc: "Egg-battered shrimp in lemon butter sauce", price: "$24.95" },
      { name: "Calamari Marinara", desc: "Tender calamari in our housemade marinara", price: "$22.95" },
      { name: "Salmon", desc: "Grilled salmon, lemon caper sauce", price: "$26.95" },
      { name: "Branzino", desc: "Whole branzino, olive oil, garlic, lemon", price: "$29.95" },
    ],
  },
  {
    id: "salads",
    label: "Salads & Soups",
    subtitle: "Fresh and seasonal",
    items: [
      { name: "Caesar Salad", desc: "Romaine, croutons, parmesan, caesar dressing", price: "$14.95" },
      { name: "House Salad", desc: "Mixed greens, tomatoes, cucumbers, olives, house dressing", price: "$12.95" },
      { name: "Arugula Salad", desc: "Arugula, shaved parmesan, cherry tomatoes, EVOO & lemon", price: "$14.95" },
      { name: "Caprese", desc: "Fresh mozzarella, tomatoes, basil, EVOO", price: "$15.95" },
      { name: "Minestrone", desc: "Hearty Italian vegetable soup", price: "$9.95" },
      { name: "Pasta e Fagioli", desc: "Classic Italian pasta and bean soup", price: "$9.95" },
    ],
  },
  {
    id: "heroes",
    label: "Heroes",
    subtitle: "Served on fresh Italian bread",
    items: [
      { name: "Chicken Parm Hero", desc: "Breaded chicken cutlet, tomato sauce, mozzarella on Italian bread", price: "$14.95" },
      { name: "Eggplant Parm Hero", desc: "Breaded eggplant, tomato sauce, mozzarella on Italian bread", price: "$13.95" },
      { name: "Sausage & Peppers Hero", desc: "Homemade sausage, peppers & onions on Italian bread", price: "$13.95" },
      { name: "Meatball Hero", desc: "Homemade meatballs, tomato sauce, mozzarella", price: "$13.95" },
      { name: "Grandma Slice Hero", desc: "Two grandma slices, mozzarella, marinara", price: "$12.95" },
    ],
  },
];

export default function Menu() {
  const [activeLocation, setActiveLocation] = useState(LOCATIONS[0].id);
  const [activeCategory, setActiveCategory] = useState("pizza");
  const [, ] = useLocation();
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const currentLocation = LOCATIONS.find((l) => l.id === activeLocation) || LOCATIONS[0];

  useEffect(() => {
    document.title = `Menu | Umberto's Family Pizzeria ${currentLocation.name} | Original Grandma Slice Since 1965`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", `Full menu for Umberto's ${currentLocation.name}. Grandma pizza, pasta, seafood, entrées and more. Home of the Original Grandma Slice since 1965. Order online or call ${currentLocation.phone}.`);
  }, [activeLocation, currentLocation]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && LOCATIONS.find((l) => l.id === hash)) setActiveLocation(hash);
  }, []);

  // Track active category on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("data-cat");
            if (id) setActiveCategory(id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const handleLocationChange = (locId: string) => {
    setActiveLocation(locId);
    window.history.replaceState(null, "", `/menu#${locId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToCategory = (catId: string) => {
    const el = sectionRefs.current[catId];
    if (el) {
      const offset = 160;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setActiveCategory(catId);
  };

  // JSON-LD schema
  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": `Umberto's ${currentLocation.name} Menu`,
    "description": `Full menu for Umberto's Family Pizzeria ${currentLocation.name} — pizza, pasta, seafood, entrées since 1965`,
    "hasMenuSection": MENU.map((cat) => ({
      "@type": "MenuSection",
      "name": cat.label,
      "hasMenuItem": cat.items.map((item) => ({
        "@type": "MenuItem",
        "name": item.name,
        "description": item.desc,
        "offers": { "@type": "Offer", "price": item.price.split(" ")[0].replace(/[^0-9.]/g, ""), "priceCurrency": "USD" },
      })),
    })),
  };

  return (
    <div className="min-h-screen" style={{ background: "#FDFAF5" }}>
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Umberto's Family Pizzeria menu — grandma pizza, spaghetti pescatore, chicken parmigiana"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Gradient overlay — dark at bottom, light at top */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 100%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-4 text-center">
          <p className="text-white/70 font-body tracking-[0.25em] uppercase text-xs mb-3">Authentic Italian · Since 1965</p>
          <h1
            className="text-white leading-none mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            Our Menu
          </h1>
          <div className="flex items-center gap-3 mb-6">
            <div style={{ width: 48, height: 1, background: "rgba(255,255,255,0.5)" }} />
            <span className="text-white/60 font-body text-xs tracking-widest uppercase">Family Recipes Passed Down Through Generations</span>
            <div style={{ width: 48, height: 1, background: "rgba(255,255,255,0.5)" }} />
          </div>
          <a
            href={currentLocation.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-display text-sm tracking-[0.15em] uppercase px-8 py-3.5 transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
            style={{ background: "oklch(0.46 0.22 25)", letterSpacing: "0.12em" }}
          >
            Order Online — {currentLocation.name} <ExternalLink size={13} />
          </a>
        </div>
      </section>

      {/* ── LOCATION SELECTOR ────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-40 border-b"
        style={{ background: "#FDFAF5", borderColor: "oklch(0.88 0.015 80)" }}
      >
        {/* Location tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center overflow-x-auto scrollbar-hide" style={{ gap: 0 }}>
            <span
              className="flex-shrink-0 font-body text-xs tracking-[0.18em] uppercase pr-4 py-4 hidden md:block"
              style={{ color: "oklch(0.55 0.03 60)", borderRight: "1px solid oklch(0.88 0.015 80)", marginRight: "1rem" }}
            >
              Location
            </span>
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => handleLocationChange(loc.id)}
                className="flex-shrink-0 px-4 py-4 font-display text-xs tracking-[0.1em] uppercase transition-all duration-200 whitespace-nowrap relative"
                style={{
                  color: activeLocation === loc.id ? "oklch(0.46 0.22 25)" : "oklch(0.45 0.03 60)",
                  borderBottom: activeLocation === loc.id ? "2px solid oklch(0.46 0.22 25)" : "2px solid transparent",
                  fontWeight: activeLocation === loc.id ? 700 : 400,
                }}
              >
                {loc.short}
                {loc.flagship && (
                  <span
                    className="ml-1.5 text-[0.55rem] tracking-wider hidden sm:inline"
                    style={{ color: "oklch(0.68 0.13 75)" }}
                  >
                    FLAGSHIP
                  </span>
                )}
              </button>
            ))}
            <div className="flex-1" />
            <a
              href={currentLocation.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 hidden md:flex items-center gap-2 font-display text-xs tracking-[0.12em] uppercase px-5 py-2.5 my-2 transition-all hover:opacity-80"
              style={{ background: "oklch(0.46 0.22 25)", color: "white" }}
            >
              Order Now <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-12">

          {/* ── STICKY SIDEBAR ─────────────────────────────────────────── */}
          <aside className="hidden xl:block w-52 flex-shrink-0">
            <div className="sticky top-28">
              <p
                className="font-body text-[0.65rem] tracking-[0.2em] uppercase mb-5"
                style={{ color: "oklch(0.65 0.03 60)" }}
              >
                Sections
              </p>
              <nav className="space-y-0">
                {MENU.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => scrollToCategory(cat.id)}
                    className="w-full text-left py-2.5 font-body text-sm transition-all duration-150 flex items-center justify-between group"
                    style={{
                      color: activeCategory === cat.id ? "oklch(0.46 0.22 25)" : "oklch(0.40 0.03 60)",
                      borderLeft: activeCategory === cat.id ? "2px solid oklch(0.46 0.22 25)" : "2px solid transparent",
                      paddingLeft: "0.75rem",
                      fontWeight: activeCategory === cat.id ? 600 : 400,
                    }}
                  >
                    {cat.label}
                    {activeCategory === cat.id && <ChevronRight size={12} style={{ color: "oklch(0.46 0.22 25)" }} />}
                  </button>
                ))}
              </nav>

              {/* Order CTA in sidebar */}
              <div className="mt-8 pt-6" style={{ borderTop: "1px solid oklch(0.88 0.015 80)" }}>
                <p
                  className="font-body text-xs mb-3"
                  style={{ color: "oklch(0.55 0.03 60)" }}
                >
                  Ordering from
                </p>
                <p
                  className="font-display text-sm tracking-wider uppercase mb-1"
                  style={{ color: "oklch(0.20 0.025 60)" }}
                >
                  {currentLocation.name}
                </p>
                <p
                  className="font-body text-xs mb-4"
                  style={{ color: "oklch(0.55 0.03 60)" }}
                >
                  {currentLocation.address}
                </p>
                <a
                  href={currentLocation.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center font-display text-xs tracking-[0.12em] uppercase py-3 transition-all hover:opacity-80"
                  style={{ background: "oklch(0.46 0.22 25)", color: "white" }}
                >
                  Order Online
                </a>
                <a
                  href={`tel:${currentLocation.phoneRaw}`}
                  className="block w-full text-center font-body text-xs py-2.5 mt-2 transition-all hover:opacity-80"
                  style={{ border: "1px solid oklch(0.46 0.22 25)", color: "oklch(0.46 0.22 25)" }}
                >
                  {currentLocation.phone}
                </a>
              </div>
            </div>
          </aside>

          {/* ── MENU SECTIONS ──────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Location info line */}
            <div
              className="flex flex-wrap items-center justify-between gap-3 pb-8 mb-8"
              style={{ borderBottom: "1px solid oklch(0.88 0.015 80)" }}
            >
              <div>
                <p
                  className="font-body text-xs tracking-[0.15em] uppercase mb-1"
                  style={{ color: "oklch(0.55 0.03 60)" }}
                >
                  Currently viewing
                </p>
                <p
                  className="font-display text-xl tracking-wider"
                  style={{ color: "oklch(0.20 0.025 60)" }}
                >
                  {currentLocation.name}
                  {currentLocation.flagship && (
                    <span
                      className="ml-3 text-xs tracking-widest"
                      style={{ color: "oklch(0.46 0.22 25)" }}
                    >
                      — Flagship Location
                    </span>
                  )}
                </p>
                <p
                  className="font-body text-sm mt-0.5"
                  style={{ color: "oklch(0.55 0.03 60)" }}
                >
                  {currentLocation.address} · {currentLocation.phone}
                </p>
              </div>
              <a
                href={currentLocation.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-display text-xs tracking-[0.12em] uppercase px-6 py-3 transition-all hover:opacity-80 xl:hidden"
                style={{ background: "oklch(0.46 0.22 25)", color: "white" }}
              >
                Order Online <ExternalLink size={11} />
              </a>
            </div>

            {/* Menu sections */}
            {MENU.map((cat, catIdx) => (
              <section
                key={cat.id}
                id={`cat-${cat.id}`}
                data-cat={cat.id}
                ref={(el) => { sectionRefs.current[cat.id] = el; }}
                className={catIdx > 0 ? "mt-16 pt-16" : ""}
                style={catIdx > 0 ? { borderTop: "1px solid oklch(0.88 0.015 80)" } : {}}
                itemScope
                itemType="https://schema.org/MenuSection"
              >
                {/* Category header */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-4 mb-2">
                    <h2
                      className="leading-none"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "clamp(2rem, 4vw, 3rem)",
                        fontWeight: 700,
                        color: "oklch(0.20 0.025 60)",
                        letterSpacing: "-0.01em",
                      }}
                      itemProp="name"
                    >
                      {cat.label}
                    </h2>
                    <div
                      className="flex-1 hidden sm:block"
                      style={{ height: 1, background: "oklch(0.88 0.015 80)", marginBottom: "0.25rem" }}
                    />
                  </div>
                  <p
                    className="font-body text-sm italic"
                    style={{ color: "oklch(0.55 0.03 60)" }}
                  >
                    {cat.subtitle}
                  </p>
                </div>

                {/* Photo break for pizza and pasta sections */}
                {cat.id === "pizza" && (
                  <div className="mb-8 overflow-hidden" style={{ height: 220 }}>
                    <img
                      src={PIZZA_IMG}
                      alt="Umberto's pizza — cheese pull, fresh from the oven"
                      className="w-full h-full object-cover object-center"
                      style={{ objectPosition: "center 40%" }}
                    />
                  </div>
                )}
                {cat.id === "pasta" && (
                  <div className="mb-8 overflow-hidden" style={{ height: 220 }}>
                    <img
                      src={PASTA_IMG}
                      alt="Umberto's spaghetti pescatore — mussels, clams, marinara"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                )}

                {/* Menu items — typographic list with ruled lines */}
                <div>
                  {cat.items.map((item, idx) => (
                    <a
                      key={item.name}
                      href={currentLocation.orderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block py-5 transition-colors duration-150"
                      style={{
                        borderBottom: idx < cat.items.length - 1 ? "1px solid oklch(0.91 0.012 80)" : "none",
                      }}
                      itemScope
                      itemType="https://schema.org/MenuItem"
                    >
                      <div className="flex items-start justify-between gap-6">
                        {/* Left: name + description */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap mb-1">
                            <h3
                              className="transition-colors duration-150"
                              style={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontSize: "1.1rem",
                                fontWeight: 600,
                                color: "oklch(0.20 0.025 60)",
                                letterSpacing: "0.01em",
                              }}
                              itemProp="name"
                            >
                              {item.name}
                            </h3>
                            {item.tag && (
                              <span
                                className="font-body text-[0.6rem] tracking-[0.15em] uppercase px-2 py-0.5"
                                style={{ color: "oklch(0.46 0.22 25)", border: "1px solid oklch(0.46 0.22 25)" }}
                              >
                                {item.tag}
                              </span>
                            )}
                            {item.note && (
                              <span
                                className="font-body text-[0.6rem] tracking-[0.12em] uppercase px-2 py-0.5"
                                style={{ color: "oklch(0.55 0.03 60)", border: "1px solid oklch(0.88 0.015 80)" }}
                              >
                                {item.note}
                              </span>
                            )}
                          </div>
                          <p
                            className="font-body text-sm leading-relaxed"
                            style={{ color: "oklch(0.52 0.025 60)" }}
                            itemProp="description"
                          >
                            {item.desc}
                          </p>
                        </div>

                        {/* Right: price + order hint */}
                        <div className="flex-shrink-0 text-right pt-0.5">
                          <span
                            className="block"
                            style={{
                              fontFamily: "'Playfair Display', Georgia, serif",
                              fontSize: "1.05rem",
                              fontWeight: 600,
                              color: "oklch(0.30 0.025 60)",
                              letterSpacing: "0.02em",
                            }}
                            itemProp="offers"
                          >
                            {item.price}
                          </span>
                          <span
                            className="block font-body text-[0.65rem] tracking-[0.12em] uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center gap-1 justify-end"
                            style={{ color: "oklch(0.46 0.22 25)" }}
                          >
                            Order <ExternalLink size={9} />
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            ))}

            {/* Bottom CTA */}
            <div
              className="mt-16 py-12 px-8 text-center"
              style={{ background: "oklch(0.20 0.025 60)" }}
            >
              <p
                className="mb-2"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  color: "white",
                  fontWeight: 700,
                }}
              >
                Ready to Order?
              </p>
              <p
                className="font-body text-sm mb-6"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                Order online from {currentLocation.name} for pickup or delivery.
              </p>
              <a
                href={currentLocation.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-display text-sm tracking-[0.15em] uppercase px-10 py-4 transition-all hover:opacity-90 active:scale-[0.97]"
                style={{ background: "oklch(0.46 0.22 25)", color: "white" }}
              >
                Order from {currentLocation.name} <ExternalLink size={13} />
              </a>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                {LOCATIONS.filter((l) => l.id !== activeLocation).map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => handleLocationChange(loc.id)}
                    className="font-body text-xs tracking-wider uppercase transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
