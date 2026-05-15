/*
 * Catering Page — Umberto's Family Pizzeria
 * Design: Dark, bold, conversion-focused
 * SEO: Catering schema, keyword-rich copy for offices, schools, govt catering Long Island
 */
import { useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Phone, CheckCircle, Truck, Users, Clock, Award } from "lucide-react";

const cateringMenu = [
  {
    category: "Pizza Trays",
    items: [
      { name: "Grandma Pizza", desc: "16\" square, 12 slices. The original. Thin crust, mozzarella, plum marinara.", full: "$36.20", half: "$19.10" },
      { name: "Sicilian Pizza", desc: "16\" square, 12 slices. Thick crust, cheese & tomato sauce.", full: "$36.20", half: "$19.10" },
      { name: "Neapolitan Pizza", desc: "18\" round, 8 slices. Classic New York style.", full: "$26.80", half: "$14.40" },
      { name: "Pazzo Deep Dish", desc: "Fresh mozzarella, marinara, sausage, olives, roasted peppers.", full: "$33.40", half: "$17.70" },
      { name: "Vegetable Pizza", desc: "Broccoli, spinach, tomatoes, mushrooms, mozzarella.", full: "$34.10", half: "$18.05" },
    ],
  },
  {
    category: "Pasta Trays",
    items: [
      { name: "Baked Ziti", desc: "Ziti with ricotta, mozzarella & tomato sauce. Serves 10–12.", full: "$65.00", half: "$35.00" },
      { name: "Baked Ziti with Meat", desc: "Ziti with ricotta, mozzarella, meat sauce. Serves 10–12.", full: "$75.00", half: "$40.00" },
      { name: "Lasagna", desc: "Ricotta, homemade mozzarella, meatballs & sausage. Serves 10–12.", full: "$80.00", half: "$42.00" },
      { name: "Penne Alla Vodka", desc: "Vodka sauce with prosciutto. Serves 10–12.", full: "$70.00", half: "$37.00" },
      { name: "Spaghetti with Meatballs", desc: "Homemade meatballs in our famous tomato sauce. Serves 10–12.", full: "$75.00", half: "$40.00" },
      { name: "Rigatoni Al Filetto", desc: "Plum tomatoes, onion, prosciutto. Serves 10–12.", full: "$70.00", half: "$37.00" },
    ],
  },
  {
    category: "Entrée Trays",
    items: [
      { name: "Chicken Parmigiana", desc: "Breaded chicken, tomato sauce, mozzarella. Serves 10–12.", full: "$120.00", half: "$65.00" },
      { name: "Chicken Marsala", desc: "Sautéed chicken with Marsala wine & mushrooms. Serves 10–12.", full: "$120.00", half: "$65.00" },
      { name: "Chicken Francese", desc: "Egg-battered chicken in lemon butter sauce. Serves 10–12.", full: "$120.00", half: "$65.00" },
      { name: "Eggplant Parmigiana", desc: "Breaded eggplant, tomato sauce, mozzarella. Serves 10–12.", full: "$100.00", half: "$55.00" },
      { name: "Sausage & Peppers", desc: "Homemade Italian sausage with peppers & onions. Serves 10–12.", full: "$95.00", half: "$50.00" },
      { name: "Veal Parmigiana", desc: "Tender veal cutlet, tomato sauce, mozzarella. Serves 10–12.", full: "$140.00", half: "$75.00" },
    ],
  },
  {
    category: "Sides & Extras",
    items: [
      { name: "Garlic Bread", desc: "Toasted garlic bread, serves 10–12.", full: "$25.00", half: "$14.00" },
      { name: "Caesar Salad", desc: "Romaine, croutons, parmesan, caesar dressing.", full: "$45.00", half: "$25.00" },
      { name: "House Salad", desc: "Mixed greens, tomatoes, cucumbers, olives.", full: "$40.00", half: "$22.00" },
      { name: "Meatballs", desc: "Homemade meatballs in tomato sauce. Serves 10–12.", full: "$65.00", half: "$35.00" },
      { name: "Sautéed Broccoli Rabe", desc: "Garlic & oil. Serves 10–12.", full: "$45.00", half: "$25.00" },
    ],
  },
];

const cateringClients = [
  "Corporate Offices",
  "Law Firms",
  "Medical Offices",
  "Government Agencies",
  "Schools & Universities",
  "Hospitals",
  "Police & Fire Departments",
  "Real Estate Firms",
  "Non-Profit Organizations",
  "Sports Teams",
  "Film & TV Productions",
  "Private Parties",
];

export default function Catering() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[oklch(0.10_0.015_60)]">
      <Navigation />

      {/* Hero */}
      <header className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-catering-trays-HEVKxpcQvpLbyYo3epjUBd.webp"
            alt="Umberto's catering trays — chicken parmigiana, baked ziti, grandma pizza for office and corporate catering Long Island NY"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-[oklch(0.08_0.012_60)]/85" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block w-12 h-0.5 bg-[oklch(0.46_0.22_25)] mb-4" />
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[oklch(0.94_0.03_80)] leading-tight mb-4">
              CATERING THAT IMPRESSES
            </h1>
            <p className="font-serif italic text-[oklch(0.72_0.14_75)] text-xl mb-4">
              Full & Half Trays · Offices · Schools · Government · Events
            </p>
            <p className="font-body text-[oklch(0.80_0.03_80)] leading-relaxed mb-8 max-w-xl">
              Umberto's legendary Italian food, delivered in full or half trays to your office, school, government agency, or event. Serving Long Island for over 60 years. From 10 to 500+ guests.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:5164377698" className="btn-umberto">
                <Phone size={16} /> Call to Order: (516) 437-7698
              </a>
              <a href="#catering-menu" className="btn-outline-gold">
                View Catering Menu <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Why Umberto's Catering */}
      <section className="py-16 bg-[oklch(0.12_0.018_60)]" aria-labelledby="why-catering">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-12">
            <span className="inline-block w-12 h-0.5 bg-[oklch(0.46_0.22_25)] mb-4 mx-auto" />
            <h2 id="why-catering" className="font-display text-[clamp(1.8rem,4vw,3rem)] text-[oklch(0.94_0.03_80)]">
              WHY CHOOSE UMBERTO'S CATERING?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Award size={28} />, title: "60+ Years of Excellence", desc: "Family recipes perfected over six decades. The same quality you get in our restaurants, delivered to your event." },
              { icon: <Truck size={28} />, title: "Full & Half Trays", desc: "Flexible tray sizes to fit any group. Full trays serve 10–12, half trays serve 5–6. Mix and match to your needs." },
              { icon: <Users size={28} />, title: "Any Size Group", desc: "From a small office lunch of 10 to a large corporate event of 500+. We scale to your requirements." },
              { icon: <Clock size={28} />, title: "Reliable & On-Time", desc: "We understand deadlines. Your food arrives hot, fresh, and on time — every time. Same-day orders available." },
            ].map((item, i) => (
              <div
                key={item.title}
                className="reveal text-center p-6 bg-[oklch(0.14_0.018_60)] border border-[oklch(0.20_0.02_60)]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-[oklch(0.46_0.22_25)] mb-4 flex justify-center">{item.icon}</div>
                <h3 className="font-display text-[oklch(0.94_0.03_80)] text-lg tracking-wider mb-2">{item.title}</h3>
                <p className="font-body text-sm text-[oklch(0.62_0.03_80)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we cater for */}
      <section className="py-12 border-b border-[oklch(0.20_0.02_60)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-8">
            <h2 className="font-display text-2xl text-[oklch(0.94_0.03_80)] tracking-wider">
              TRUSTED BY LONG ISLAND'S BEST
            </h2>
          </div>
          <div className="reveal flex flex-wrap gap-3 justify-center">
            {cateringClients.map((client) => (
              <span
                key={client}
                className="font-body text-sm text-[oklch(0.75_0.03_80)] border border-[oklch(0.25_0.02_60)] px-4 py-2"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Catering menu */}
      <section id="catering-menu" className="py-16" aria-labelledby="catering-menu-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-12">
            <span className="inline-block w-12 h-0.5 bg-[oklch(0.46_0.22_25)] mb-4 mx-auto" />
            <h2 id="catering-menu-heading" className="font-display text-[clamp(1.8rem,4vw,3rem)] text-[oklch(0.94_0.03_80)]">
              CATERING MENU
            </h2>
            <p className="font-body text-[oklch(0.62_0.03_80)] mt-2">
              Full trays serve 10–12 · Half trays serve 5–6 · Prices subject to change
            </p>
          </div>

          <div className="space-y-12">
            {cateringMenu.map((section, si) => (
              <div key={section.category}>
                <h3 className="reveal font-display text-xl text-[oklch(0.46_0.22_25)] tracking-wider mb-5 border-b border-[oklch(0.20_0.02_60)] pb-3">
                  {section.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {section.items.map((item, i) => (
                    <div
                      key={item.name}
                      className="reveal flex items-start justify-between gap-4 bg-[oklch(0.12_0.018_60)] border border-[oklch(0.20_0.02_60)] p-4 hover:border-[oklch(0.46_0.22_25)]/40 transition-colors"
                      style={{ transitionDelay: `${(si * 3 + i) * 40}ms` }}
                    >
                      <div className="flex-1">
                        <h4 className="font-display text-[oklch(0.94_0.03_80)] text-base tracking-wider">{item.name}</h4>
                        <p className="font-body text-xs text-[oklch(0.58_0.03_80)] mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-body text-xs text-[oklch(0.55_0.03_80)] mb-0.5">Full</div>
                        <div className="font-display text-[oklch(0.72_0.14_75)] text-sm">{item.full}</div>
                        <div className="font-body text-xs text-[oklch(0.55_0.03_80)] mt-1.5 mb-0.5">Half</div>
                        <div className="font-display text-[oklch(0.72_0.14_75)] text-sm">{item.half}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to order */}
      <section className="py-16 bg-[oklch(0.12_0.018_60)]" aria-labelledby="how-to-order">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10">
            <h2 id="how-to-order" className="font-display text-[clamp(1.8rem,4vw,3rem)] text-[oklch(0.94_0.03_80)]">
              HOW TO ORDER CATERING
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Call Your Location", desc: "Call your nearest Umberto's location to place your catering order. We recommend calling 24–48 hours in advance for large orders." },
              { step: "02", title: "Choose Your Trays", desc: "Select from our full catering menu. Full trays serve 10–12, half trays serve 5–6. Mix and match any items." },
              { step: "03", title: "Pick Up or Delivery", desc: "Pick up your order at any location, or inquire about delivery options for your area. Food arrives hot and ready to serve." },
            ].map((step, i) => (
              <div
                key={step.step}
                className="reveal text-center"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="font-display text-6xl text-[oklch(0.46_0.22_25)]/30 mb-3">{step.step}</div>
                <h3 className="font-display text-[oklch(0.94_0.03_80)] text-lg tracking-wider mb-2">{step.title}</h3>
                <p className="font-body text-sm text-[oklch(0.62_0.03_80)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catering CTA */}
      <section className="py-16 bg-[oklch(0.46_0.22_25)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-[oklch(0.98_0.01_80)] mb-4">
            READY TO ORDER?
          </h2>
          <p className="font-body text-[oklch(0.98_0.01_80)]/80 mb-8">
            Call your nearest location or use our online ordering system. We're ready to make your next event legendary.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:5164377698"
              className="bg-[oklch(0.98_0.01_80)] text-[oklch(0.46_0.22_25)] font-display text-base tracking-[0.1em] uppercase px-8 py-3.5 hover:bg-[oklch(0.94_0.03_80)] transition-colors inline-flex items-center gap-2"
            >
              <Phone size={16} /> (516) 437-7698
            </a>
            <Link
              href="/locations"
              className="border-2 border-[oklch(0.98_0.01_80)] text-[oklch(0.98_0.01_80)] font-display text-base tracking-[0.1em] uppercase px-8 py-3.5 hover:bg-[oklch(0.98_0.01_80)]/10 transition-colors"
            >
              All Location Numbers
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
