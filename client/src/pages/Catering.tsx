/*
 * Catering Page — Umberto's Family Pizzeria
 * Light warm theme, food tray photo gallery, conversion-focused
 * SEO: Catering schema, keyword-rich copy for offices, schools, govt catering Long Island
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Phone, Truck, Users, Clock, Award, ChevronDown, ChevronUp } from "lucide-react";

const TRAY_PHOTOS = [
  { src: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/83464parm-chicken.jpg?w=600&fit=crop&auto=compress,format", label: "Chicken Parmigiana Tray" },
  { src: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/292661U1A6384.jpg?w=600&fit=crop&auto=compress,format", label: "Grandma Pizza Tray" },
  { src: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/7096Umbertos-Pepperoni-4.jpg?w=600&fit=crop&auto=compress,format", label: "Pepperoni Pizza Tray" },
  { src: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/12732Umbertos-Pepperoni-3.jpg?w=600&fit=crop&auto=compress,format", label: "Sicilian Pizza Tray" },
  { src: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/97139spaghetti_vongole.png?w=600&fit=max&auto=compress,format", label: "Pasta Tray" },
  { src: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/326236A4A5195.jpg?w=600&fit=crop&auto=compress,format", label: "Italian Entrée Tray" },
];

const CATERING_MENU = [
  {
    category: "Pizza Trays",
    icon: "🍕",
    img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/292661U1A6384.jpg?w=400&fit=crop&auto=compress,format",
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
    icon: "🍝",
    img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/97139spaghetti_vongole.png?w=400&fit=max&auto=compress,format",
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
    icon: "🍗",
    img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/83464parm-chicken.jpg?w=400&fit=crop&auto=compress,format",
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
    icon: "🥗",
    img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/326236A4A5195.jpg?w=400&fit=crop&auto=compress,format",
    items: [
      { name: "Garlic Bread", desc: "Toasted garlic bread, serves 10–12.", full: "$25.00", half: "$14.00" },
      { name: "Caesar Salad", desc: "Romaine, croutons, parmesan, caesar dressing.", full: "$45.00", half: "$25.00" },
      { name: "House Salad", desc: "Mixed greens, tomatoes, cucumbers, olives.", full: "$40.00", half: "$22.00" },
      { name: "Meatballs", desc: "Homemade meatballs in tomato sauce. Serves 10–12.", full: "$65.00", half: "$35.00" },
      { name: "Sautéed Broccoli Rabe", desc: "Garlic & oil. Serves 10–12.", full: "$45.00", half: "$25.00" },
    ],
  },
];

const CATERING_CLIENTS = [
  "Corporate Offices", "Law Firms", "Medical Offices", "Government Agencies",
  "Schools & Universities", "Hospitals", "Police & Fire Departments",
  "Real Estate Firms", "Non-Profit Organizations", "Sports Teams",
  "Film & TV Productions", "Private Parties",
];

export default function Catering() {
  const [openCategory, setOpenCategory] = useState<string>("Pizza Trays");
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    document.title = "Catering | Umberto's Family Pizzeria | Office & Corporate Catering Long Island";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Umberto's catering for offices, schools, government, and events. Full & half trays of pizza, pasta, chicken parm, and more. Long Island's best Italian catering since 1965.");

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Auto-advance photo gallery
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhoto((p) => (p + 1) % TRAY_PHOTOS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)]">
      <Navigation />

      {/* Hero with photo gallery */}
      <section className="relative overflow-hidden bg-white border-b border-[oklch(0.88_0.015_80)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="section-label">Catering Services</span>
              <span className="red-line" />
              <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[oklch(0.20_0.025_60)] leading-tight mb-4">
                CATERING THAT<br />IMPRESSES
              </h1>
              <p className="font-serif italic text-[oklch(0.68_0.13_75)] text-lg mb-4">
                Full &amp; Half Trays · Offices · Schools · Government · Events
              </p>
              <p className="font-body text-[oklch(0.48_0.03_60)] leading-relaxed mb-6 max-w-lg">
                Umberto's legendary Italian food, delivered in full or half trays to your office, school, government agency, or event. Serving Long Island for over 60 years. From 10 to 500+ guests.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="tel:5164377698" className="btn-red">
                  <Phone size={16} /> Call to Order: (516) 437-7698
                </a>
                <a href="#catering-menu" className="btn-outline-red">
                  View Catering Menu <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* Rotating food tray gallery */}
            <div className="relative">
              <div className="relative h-72 lg:h-96 overflow-hidden shadow-xl">
                {TRAY_PHOTOS.map((photo, i) => (
                  <img
                    key={photo.src}
                    src={photo.src}
                    alt={photo.label}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === activePhoto ? "opacity-100" : "opacity-0"}`}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                ))}
                <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1.5">
                  <p className="font-display text-white text-xs tracking-wider">{TRAY_PHOTOS[activePhoto].label}</p>
                </div>
              </div>
              {/* Thumbnail strip */}
              <div className="flex gap-2 mt-2">
                {TRAY_PHOTOS.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className={`flex-1 h-12 overflow-hidden border-2 transition-all ${i === activePhoto ? "border-[oklch(0.46_0.22_25)]" : "border-transparent opacity-60 hover:opacity-100"}`}
                    aria-label={photo.label}
                  >
                    <img src={photo.src} alt={photo.label} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Umberto's Catering */}
      <section className="py-12 bg-[oklch(0.97_0.015_80)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Award size={24} />, title: "60+ Years", desc: "Family recipes perfected over six decades." },
              { icon: <Truck size={24} />, title: "Full & Half Trays", desc: "Full trays serve 10–12, half trays serve 5–6." },
              { icon: <Users size={24} />, title: "Any Size Group", desc: "From 10 to 500+ guests. We scale to your needs." },
              { icon: <Clock size={24} />, title: "On-Time Delivery", desc: "Hot, fresh, and on time — every time." },
            ].map((item, i) => (
              <div key={item.title} className="reveal bg-white border border-[oklch(0.88_0.015_80)] p-5 text-center" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="text-[oklch(0.46_0.22_25)] mb-3 flex justify-center">{item.icon}</div>
                <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-sm mb-1">{item.title}</h3>
                <p className="font-body text-xs text-[oklch(0.48_0.03_60)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we cater for */}
      <section className="py-10 bg-white border-y border-[oklch(0.88_0.015_80)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="reveal font-display text-[oklch(0.20_0.025_60)] tracking-wider text-center mb-6">TRUSTED BY LONG ISLAND'S BEST</h2>
          <div className="reveal flex flex-wrap gap-2 justify-center">
            {CATERING_CLIENTS.map((client) => (
              <span key={client} className="font-body text-sm text-[oklch(0.38_0.03_60)] border border-[oklch(0.88_0.015_80)] bg-[oklch(0.97_0.015_80)] px-4 py-2">
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Catering menu — accordion by category */}
      <section id="catering-menu" className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-label">Full &amp; Half Trays</span>
            <span className="red-line mx-auto" />
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-[oklch(0.20_0.025_60)]">CATERING MENU</h2>
            <p className="font-body text-[oklch(0.48_0.03_60)] mt-2">Full trays serve 10–12 · Half trays serve 5–6 · Prices subject to change</p>
          </div>

          <div className="space-y-3">
            {CATERING_MENU.map((section) => {
              const isOpen = openCategory === section.category;
              return (
                <div key={section.category} className={`border-2 transition-all duration-300 ${isOpen ? "border-[oklch(0.46_0.22_25)] shadow-md" : "border-[oklch(0.88_0.015_80)] hover:border-[oklch(0.46_0.22_25)]/50"}`}>
                  <button
                    className="w-full text-left p-5 flex items-center gap-4"
                    onClick={() => setOpenCategory(isOpen ? "" : section.category)}
                    aria-expanded={isOpen}
                  >
                    <div className="w-14 h-14 flex-shrink-0 overflow-hidden">
                      <img src={section.img} alt={section.category} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{section.icon}</span>
                        <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider">{section.category.toUpperCase()}</h3>
                      </div>
                      <p className="font-body text-xs text-[oklch(0.55_0.03_60)]">{section.items.length} items available</p>
                    </div>
                    {isOpen ? <ChevronUp size={20} className="text-[oklch(0.46_0.22_25)] flex-shrink-0" /> : <ChevronDown size={20} className="text-[oklch(0.55_0.03_60)] flex-shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="border-t border-[oklch(0.88_0.015_80)] p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {section.items.map((item) => (
                          <div key={item.name} className="flex items-start justify-between gap-3 bg-[oklch(0.97_0.015_80)] border border-[oklch(0.88_0.015_80)] p-3.5 hover:border-[oklch(0.46_0.22_25)]/40 transition-colors">
                            <div className="flex-1">
                              <h4 className="font-display text-[oklch(0.20_0.025_60)] text-sm tracking-wider">{item.name}</h4>
                              <p className="font-body text-xs text-[oklch(0.55_0.03_60)] mt-0.5 leading-relaxed">{item.desc}</p>
                            </div>
                            <div className="text-right flex-shrink-0 ml-2">
                              <div className="font-body text-[0.65rem] text-[oklch(0.55_0.03_60)]">Full</div>
                              <div className="font-display text-[oklch(0.46_0.22_25)] text-sm">{item.full}</div>
                              <div className="font-body text-[0.65rem] text-[oklch(0.55_0.03_60)] mt-1">Half</div>
                              <div className="font-display text-[oklch(0.46_0.22_25)] text-sm">{item.half}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to order */}
      <section className="py-12 bg-white border-t border-[oklch(0.88_0.015_80)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="reveal font-display text-[clamp(1.8rem,4vw,3rem)] text-[oklch(0.20_0.025_60)] text-center mb-10">HOW TO ORDER CATERING</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Call Your Location", desc: "Call your nearest Umberto's to place your catering order. We recommend calling 24–48 hours in advance for large orders." },
              { step: "02", title: "Choose Your Trays", desc: "Select from our full catering menu. Full trays serve 10–12, half trays serve 5–6. Mix and match any items." },
              { step: "03", title: "Pick Up or Delivery", desc: "Pick up at any location, or inquire about delivery for your area. Food arrives hot and ready to serve." },
            ].map((step, i) => (
              <div key={step.step} className="reveal text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="font-display text-7xl text-[oklch(0.46_0.22_25)]/20 mb-2 leading-none">{step.step}</div>
                <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider mb-2">{step.title}</h3>
                <p className="font-body text-sm text-[oklch(0.48_0.03_60)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[oklch(0.46_0.22_25)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-white mb-3">READY TO ORDER?</h2>
          <p className="font-body text-white/80 mb-6">Call your nearest Umberto's to place your catering order. We'll handle everything so you can focus on your event.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="tel:5164377698" className="btn-white"><Phone size={16} /> (516) 437-7698</a>
            <Link href="/locations" className="inline-flex items-center gap-2 border-2 border-white text-white font-display text-base tracking-[0.1em] uppercase px-6 py-3.5 hover:bg-white/10 transition-colors">
              Find Your Location <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
