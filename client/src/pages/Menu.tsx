/*
 * Menu Page — Umberto's Family Pizzeria
 * Design: Light warm theme, location tabs, full menu per location
 * SEO: MenuItem schema, keyword-rich, location-specific menu URLs via hash routing
 * NOTE: AppSuite uses x-frame-options: SAMEORIGIN — iframes blocked.
 *       We show our menu data with direct "Order from [Location]" CTA to AppSuite.
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Phone, MapPin, ExternalLink, ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";

// All 6 locations with AppSuite ordering URLs
const LOCATIONS = [
  {
    id: "new-hyde-park",
    name: "New Hyde Park",
    address: "633 Jericho Turnpike, New Hyde Park, NY 11040",
    phone: "(516) 437-7698",
    phoneRaw: "5164377698",
    orderUrl: "https://umbertos.appsuitecrm.com/menu/910",
    flagship: true,
  },
  {
    id: "manhasset",
    name: "Manhasset",
    address: "1558 Northern Blvd, Manhasset, NY 11030",
    phone: "(516) 472-7801",
    phoneRaw: "5164727801",
    orderUrl: "https://umbertos.appsuitecrm.com/menu/795",
  },
  {
    id: "bellmore",
    name: "Bellmore",
    address: "2427 Merrick Rd, Bellmore, NY 11710",
    phone: "(516) 409-1400",
    phoneRaw: "5164091400",
    orderUrl: "https://umbertos.appsuitecrm.com/menu/928",
  },
  {
    id: "massapequa-park",
    name: "Massapequa Park",
    address: "4897 Merrick Rd, Massapequa Park, NY 11762",
    phone: "(516) 541-3030",
    phoneRaw: "5165413030",
    orderUrl: "https://umbertos.appsuitecrm.com/menu/1008",
    special: true,
  },
  {
    id: "lake-grove",
    name: "Lake Grove",
    address: "2192 Nesconset Hwy, Lake Grove, NY 11755",
    phone: "(631) 862-6777",
    phoneRaw: "6318626777",
    orderUrl: "https://umbertos.appsuitecrm.com/menu/2353",
  },
  {
    id: "farmingdale",
    name: "Farmingdale",
    address: "967 Broadhollow Rd, Farmingdale, NY 11735",
    phone: "(631) 454-6440",
    phoneRaw: "6314546440",
    orderUrl: "https://umbertos.appsuitecrm.com/menu/3928",
    special: true,
  },
];

const MENU_CATEGORIES = [
  {
    id: "pizza",
    label: "Pizza",
    emoji: "🍕",
    items: [
      { name: "Grandma", desc: '16" square, 12 slices. Thin-crust with mozzarella & plum marinara — the original since 1965', price: "$36.20", tag: "SIGNATURE" },
      { name: "Sicilian", desc: '16" square, 12 slices. Rated best Sicilian pie in NY — cheese & tomato sauce', price: "$36.20", tag: "AWARD WINNER" },
      { name: "Neapolitan", desc: '18" round, 8 slices. Classic cheese & tomato sauce, baked well done', price: "$26.80" },
      { name: "Grandma Broccoli Rabe & Sausage", desc: '16" square, 12 slices. Please allow 20 minutes', price: "$37.20" },
      { name: "Pazzo", desc: '16" round deep dish, 8 slices. Fresh mozzarella, marinara, sausage, olives & roasted peppers', price: "$33.40", tag: "FAN FAVORITE" },
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
    label: "Appetizers",
    emoji: "🥗",
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
    emoji: "🍝",
    items: [
      { name: "Penne Alla Vodka", desc: "Made with onions & prosciutto di Parma DOP", price: "$21.50", tag: "BESTSELLER" },
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
    emoji: "🫕",
    items: [
      { name: "Gnocchi Al Ischia", desc: "Homemade potato ricotta gnocchi in a fine tomato sauce topped with warm ricotta", price: "$21.50" },
      { name: "Cavatelli Broccoli Rabe", desc: "Homemade cavatelli with goat cheese, broccoli rabe & sliced homemade sausage", price: "$24.80" },
      { name: "Lasagna", desc: "Ricotta, homemade mozzarella, meatballs & sausage in our famous tomato sauce", price: "$19.70", tag: "CLASSIC" },
      { name: "Paccheri Short Ribs", desc: "Slow roasted short ribs & ricotta salata", price: "$27.90" },
      { name: "Rigatoni Umberto", desc: "Calamari, shrimp, clams, fresh plum tomatoes & cherry peppers in garlic & oil", price: "$25.95", tag: "SIGNATURE" },
    ],
  },
  {
    id: "entrees",
    label: "Entrées",
    emoji: "🍗",
    items: [
      { name: "Chicken Parmigiana", desc: "Breaded chicken cutlet, tomato sauce & mozzarella", price: "$22.95", tag: "CLASSIC" },
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
    emoji: "🦐",
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
    emoji: "🥙",
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
    emoji: "🥖",
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
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(["pizza"]));
  const [, navigate] = useLocation();

  const currentLocation = LOCATIONS.find((l) => l.id === activeLocation) || LOCATIONS[0];

  useEffect(() => {
    document.title = `Menu | Umberto's Family Pizzeria | ${currentLocation.name} | Long Island Pizza & Italian`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", `Full menu for Umberto's ${currentLocation.name}. Pizza, pasta, seafood, entrées, and more. Home of the Original Grandma Slice since 1965. Order online or call ${currentLocation.phone}.`);
  }, [activeLocation, currentLocation]);

  useEffect(() => {
    // Read location from URL hash
    const hash = window.location.hash.replace("#", "");
    if (hash && LOCATIONS.find((l) => l.id === hash)) {
      setActiveLocation(hash);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.05 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeLocation]);

  const handleLocationChange = (locId: string) => {
    setActiveLocation(locId);
    window.history.replaceState(null, "", `/menu#${locId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleCategory = (catId: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(catId)) next.delete(catId);
      else next.add(catId);
      return next;
    });
  };

  // JSON-LD for current location's menu
  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": `Umberto's ${currentLocation.name} Menu`,
    "description": `Full menu for Umberto's Family Pizzeria ${currentLocation.name} location`,
    "hasMenuSection": MENU_CATEGORIES.map((cat) => ({
      "@type": "MenuSection",
      "name": cat.label,
      "hasMenuItem": cat.items.map((item) => ({
        "@type": "MenuItem",
        "name": item.name,
        "description": item.desc,
        "offers": { "@type": "Offer", "price": item.price.replace(/[^0-9.]/g, "").split(" ")[0], "priceCurrency": "USD" },
      })),
    })),
  };

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)]">
      <Navigation />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }} />

      {/* Page header */}
      <section className="bg-white border-b border-[oklch(0.88_0.015_80)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="section-label">Our Menu</span>
              <span className="red-line" />
              <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[oklch(0.20_0.025_60)] leading-tight">
                UMBERTO'S MENU
              </h1>
              <p className="font-serif italic text-[oklch(0.68_0.13_75)] text-lg mt-1">
                Authentic Italian — Family Recipes Since 1965
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <p className="font-body text-sm text-[oklch(0.48_0.03_60)]">Viewing menu for:</p>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[oklch(0.46_0.22_25)]" />
                <span className="font-display text-[oklch(0.20_0.025_60)] tracking-wider">{currentLocation.name}</span>
                {currentLocation.flagship && <span className="text-[0.6rem] bg-[oklch(0.46_0.22_25)] text-white px-2 py-0.5 font-display tracking-wider">FLAGSHIP</span>}
              </div>
              <a
                href={currentLocation.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-red text-sm py-2.5 px-5"
              >
                <ShoppingCart size={14} /> Order from {currentLocation.name} <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Location selector tabs */}
      <section className="bg-[oklch(0.20_0.025_60)] sticky top-[calc(var(--nav-height,80px))] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide gap-0">
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => handleLocationChange(loc.id)}
                className={`flex-shrink-0 px-4 py-3.5 font-display text-xs tracking-[0.1em] uppercase transition-all duration-200 border-b-2 whitespace-nowrap ${
                  activeLocation === loc.id
                    ? "text-white border-[oklch(0.46_0.22_25)] bg-[oklch(0.46_0.22_25)]/20"
                    : "text-white/60 border-transparent hover:text-white hover:border-white/30"
                }`}
                aria-pressed={activeLocation === loc.id}
              >
                {loc.special && <span className="mr-1 text-[oklch(0.68_0.13_75)]">★</span>}
                {loc.name}
                {loc.flagship && <span className="ml-1 text-[0.55rem] text-[oklch(0.68_0.13_75)]">FLAGSHIP</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Location info bar */}
      <div className="bg-[oklch(0.95_0.018_80)] border-b border-[oklch(0.88_0.015_80)] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 text-sm font-body text-[oklch(0.48_0.03_60)]">
            <span className="flex items-center gap-1.5"><MapPin size={13} className="text-[oklch(0.46_0.22_25)]" />{currentLocation.address}</span>
            <a href={`tel:${currentLocation.phoneRaw}`} className="flex items-center gap-1.5 hover:text-[oklch(0.46_0.22_25)] transition-colors">
              <Phone size={13} className="text-[oklch(0.46_0.22_25)]" />{currentLocation.phone}
            </a>
          </div>
          <a
            href={currentLocation.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[oklch(0.46_0.22_25)] text-white font-display text-xs tracking-[0.1em] uppercase px-4 py-2 hover:bg-[oklch(0.55_0.22_25)] transition-colors"
          >
            <ShoppingCart size={12} /> Order Online <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Menu content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">

          {/* Sticky category sidebar (desktop) */}
          <aside className="hidden lg:block w-48 flex-shrink-0">
            <div className="sticky top-40 space-y-0.5">
              <p className="font-display text-xs text-[oklch(0.55_0.03_60)] tracking-[0.15em] uppercase mb-3 px-3">Categories</p>
              {MENU_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    document.getElementById(`cat-${cat.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`w-full text-left px-3 py-2.5 font-display text-xs tracking-[0.08em] uppercase transition-all flex items-center gap-2 ${
                    activeCategory === cat.id
                      ? "bg-[oklch(0.46_0.22_25)] text-white"
                      : "text-[oklch(0.38_0.03_60)] hover:bg-[oklch(0.93_0.02_80)] hover:text-[oklch(0.20_0.025_60)]"
                  }`}
                >
                  <span>{cat.emoji}</span> {cat.label}
                </button>
              ))}
              <div className="pt-4">
                <a
                  href={currentLocation.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[oklch(0.46_0.22_25)] text-white font-display text-xs tracking-[0.1em] uppercase px-3 py-3 hover:bg-[oklch(0.55_0.22_25)] transition-colors"
                >
                  <ShoppingCart size={12} /> Order Now
                </a>
              </div>
            </div>
          </aside>

          {/* Menu sections */}
          <div className="flex-1 space-y-4">
            {MENU_CATEGORIES.map((cat) => {
              const isOpen = openCategories.has(cat.id);
              return (
                <div key={cat.id} id={`cat-${cat.id}`} className="bg-white border border-[oklch(0.88_0.015_80)]">
                  {/* Category header */}
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-[oklch(0.97_0.015_80)] transition-colors"
                    onClick={() => toggleCategory(cat.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.emoji}</span>
                      <div className="text-left">
                        <h2 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-lg">{cat.label.toUpperCase()}</h2>
                        <p className="font-body text-xs text-[oklch(0.55_0.03_60)]">{cat.items.length} items</p>
                      </div>
                    </div>
                    {isOpen
                      ? <ChevronUp size={18} className="text-[oklch(0.46_0.22_25)]" />
                      : <ChevronDown size={18} className="text-[oklch(0.55_0.03_60)]" />
                    }
                  </button>

                  {/* Items grid */}
                  {isOpen && (
                    <div className="border-t border-[oklch(0.88_0.015_80)] p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {cat.items.map((item) => (
                          <a
                            key={item.name}
                            href={currentLocation.orderUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-start justify-between gap-3 p-4 border border-[oklch(0.88_0.015_80)] hover:border-[oklch(0.46_0.22_25)] hover:shadow-md transition-all bg-[oklch(0.98_0.01_80)] hover:bg-white"
                            itemScope
                            itemType="https://schema.org/MenuItem"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wide text-sm group-hover:text-[oklch(0.46_0.22_25)] transition-colors" itemProp="name">{item.name}</h3>
                                {item.tag && (
                                  <span className="text-[0.6rem] bg-[oklch(0.46_0.22_25)] text-white px-1.5 py-0.5 font-display tracking-wider flex-shrink-0">{item.tag}</span>
                                )}
                              </div>
                              <p className="font-body text-xs text-[oklch(0.55_0.03_60)] leading-relaxed" itemProp="description">{item.desc}</p>
                              <span className="hidden" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                                <span itemProp="priceCurrency">USD</span>
                                <span itemProp="price">{item.price.replace(/[^0-9.]/g, "").split(" ")[0]}</span>
                              </span>
                            </div>
                            <div className="flex-shrink-0 text-right">
                              <span className="font-display text-[oklch(0.46_0.22_25)] text-sm" itemProp="offers">{item.price}</span>
                              <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="font-body text-[0.6rem] text-[oklch(0.46_0.22_25)] flex items-center gap-0.5 justify-end">Order <ExternalLink size={9} /></span>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Order CTA at bottom */}
            <div className="bg-[oklch(0.46_0.22_25)] p-6 text-center">
              <p className="font-display text-white text-xl tracking-wider mb-2">READY TO ORDER FROM {currentLocation.name.toUpperCase()}?</p>
              <p className="font-body text-white/80 text-sm mb-4">Click any menu item above or use the button below to order online from our {currentLocation.name} location.</p>
              <a
                href={currentLocation.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white text-sm"
              >
                <ShoppingCart size={14} /> Order from {currentLocation.name} <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Other locations */}
      <section className="py-10 bg-white border-t border-[oklch(0.88_0.015_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-center mb-6">ORDER FROM ANOTHER LOCATION</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {LOCATIONS.filter((l) => l.id !== activeLocation).map((loc) => (
              <button
                key={loc.id}
                onClick={() => handleLocationChange(loc.id)}
                className="location-card p-4 text-center hover:border-[oklch(0.46_0.22_25)] transition-all"
              >
                <MapPin size={16} className="text-[oklch(0.46_0.22_25)] mx-auto mb-2" />
                <p className="font-display text-[oklch(0.20_0.025_60)] text-xs tracking-wider">{loc.name}</p>
                {loc.special && <span className="block text-[0.55rem] text-[oklch(0.68_0.13_75)] font-display mt-0.5">★ EXCLUSIVE DEALS</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
