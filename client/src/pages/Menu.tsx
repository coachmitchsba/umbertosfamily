/*
 * Menu Page — Umberto's Family Pizzeria
 * Design: Dark, tabbed menu with category navigation, item cards
 * SEO: Full menu schema, keyword-rich descriptions, semantic HTML
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Phone } from "lucide-react";

const menuCategories = [
  {
    id: "pizza",
    label: "Pizza",
    items: [
      { name: "Grandma", desc: '16" square, 12 slices. "Featured on the Food Network" — thin-crust pie with mozzarella cheese & plum marinara sauce', price: "$36.20", tag: "SIGNATURE" },
      { name: "Sicilian", desc: '16" square, 12 slices. "Rated best Sicilian pie in NY" — cheese & tomato sauce', price: "$36.20", tag: "AWARD WINNER" },
      { name: "Neapolitan", desc: '18" round, 8 slices. Classic cheese & tomato sauce, baked well done', price: "$26.80" },
      { name: "Grandma Broccoli Rabe & Sausage", desc: '16" square, 12 slices. Please allow 20 minutes for cooking', price: "$37.20" },
      { name: "Pazzo", desc: '16" round deep dish, 8 slices. Fresh mozzarella, marinara, homemade sausage, black olives & roasted peppers', price: "$33.40", tag: "FAN FAVORITE" },
      { name: "Vegetable", desc: '18" round, 8 slices. Broccoli, spinach, tomatoes, mushrooms, mozzarella & tomato sauce', price: "$34.10" },
      { name: "Buffalo", desc: '18" round, 8 slices. Buffalo spicy chicken chunks, bleu cheese sauce & mozzarella', price: "$32.35" },
      { name: "Vodka", desc: '18" round, 8 slices. Vodka sauce, mozzarella & herbs', price: "$32.35" },
      { name: "Sicilian Vodka Pepperoni", desc: "16\" square, 12 slices. Vodka sauce, mozzarella, fresh mozzarella, pepperoni", price: "$41.35" },
      { name: "Deep Dish", desc: '16" round, 8 slices. Cheese & tomato sauce', price: "$33.00" },
      { name: "Deep Dish Pazzo", desc: '16" round, 8 slices. Fresh mozzarella, marinara, sausage, black olives & roasted peppers', price: "$35.00" },
    ],
  },
  {
    id: "appetizers",
    label: "Appetizers",
    items: [
      { name: "Cold Antipasto", desc: "Prosciutto di Parma DOP, soppressata, Auricchio, fresh mozzarella, olives, eggplant, mushrooms & roasted red peppers", price: "$15.65 / $24.65" },
      { name: "Mussels", desc: "White, Marinara, or Fra Diavolo", price: "$16.50" },
      { name: "Eggplant Rollatine", desc: "Pan-fried eggplant rolled with creamy imported ricotta, mozzarella & fresh garden herbs", price: "$13.40" },
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
    items: [
      { name: "Penne Alla Vodka", desc: "Made with onions & prosciutto di Parma DOP", price: "$21.50", tag: "BESTSELLER" },
      { name: "Rigatoni Al Filetto", desc: "Plum tomatoes, onion, prosciutto di Parma DOP & EVOO", price: "$19.95" },
      { name: "Spaghetti with Meatballs", desc: "Homemade meatballs in our famous tomato sauce", price: "$20.95" },
      { name: "Spaghetti Pescatore", desc: "Mussels, clams, shrimp in a light marinara sauce", price: "$24.95" },
      { name: "Spaghetti Vongole", desc: "Red or white clam sauce", price: "$22.95" },
      { name: "Farfalle Shiitake", desc: "Mushrooms, shrimp, light cream sauce", price: "$24.95" },
      { name: "Tortellini Bolognese", desc: "Cream sauce with prosciutto di Parma DOP, onions, mushrooms & peas topped with meat sauce", price: "$21.95" },
      { name: "Fettuccine Carbonara", desc: "Made with onions & bacon in a light cream sauce", price: "$21.95" },
      { name: "Fettuccini Alfredo", desc: "Cream sauce, genuine Parmigiano", price: "$19.95" },
      { name: "Ziti with Broccoli", desc: "Broccoli, garlic & oil", price: "$18.95" },
      { name: "Spaghetti Puttanesca", desc: "Plum tomatoes, Gaeta olives, anchovies, EVOO, garlic & capers", price: "$20.95" },
      { name: "Fusilli Primavera", desc: "Sautéed vegetables, light cream sauce", price: "$20.95" },
    ],
  },
  {
    id: "fresh-pasta",
    label: "Fresh Pasta",
    items: [
      { name: "Gnocchi Al Ischia", desc: "Homemade potato ricotta gnocchi in a fine tomato sauce topped with warm ricotta", price: "$21.50" },
      { name: "Cavatelli Broccoli Rabe", desc: "Homemade cavatelli with goat cheese, broccoli rabe & sliced homemade sausage", price: "$24.80" },
      { name: "Lasagna", desc: "Made with ricotta, homemade mozzarella, meatballs & sausage in our famous tomato sauce", price: "$19.70", tag: "CLASSIC" },
      { name: "Paccheri Short Ribs", desc: "Slow roasted short ribs & ricotta salata", price: "$27.90" },
      { name: "Rigatoni Umberto", desc: "Calamari, shrimp, clams, fresh plum tomatoes & cherry peppers in garlic & oil", price: "$25.95", tag: "SIGNATURE" },
    ],
  },
  {
    id: "entrees",
    label: "Entrées",
    items: [
      { name: "Chicken Parmigiana", desc: "Crispy breaded chicken, homemade tomato sauce, melted mozzarella", price: "$31.14", tag: "BESTSELLER" },
      { name: "Chicken Vodka Parmigiana", desc: "Chicken parmigiana with our famous vodka sauce", price: "$32.00" },
      { name: "Veal Parmigiana", desc: "Tender veal cutlet, tomato sauce, mozzarella", price: "$33.00" },
      { name: "Shrimp Parmigiana", desc: "Jumbo shrimp, tomato sauce, mozzarella", price: "$34.00" },
      { name: "Eggplant Parmigiana", desc: "Breaded eggplant, tomato sauce, mozzarella", price: "$28.00" },
      { name: "Chicken Marsala", desc: "Sautéed chicken with Marsala wine & mushrooms", price: "$30.00" },
      { name: "Chicken Francese", desc: "Egg-battered chicken in lemon butter sauce", price: "$30.00" },
      { name: "Chicken Scarpariello", desc: "Chicken with sausage, peppers & potatoes", price: "$31.00" },
      { name: "Sausage Broccoli Rabe", desc: "Homemade Italian sausage with broccoli rabe & garlic", price: "$27.00" },
    ],
  },
  {
    id: "seafood",
    label: "Seafood",
    items: [
      { name: "Sole Francese", desc: "Egg-battered sole in lemon butter sauce", price: "$32.00" },
      { name: "Salmon Piccata", desc: "Pan-seared salmon with capers & lemon butter", price: "$34.00" },
      { name: "Shrimp Scampi", desc: "Jumbo shrimp in garlic butter & white wine", price: "$32.00" },
      { name: "Shrimp Fra Diavolo", desc: "Spicy marinara with jumbo shrimp over pasta", price: "$32.00" },
      { name: "Shrimp Francese", desc: "Egg-battered shrimp in lemon butter sauce", price: "$32.00" },
      { name: "Grilled Calamari", desc: "Tender grilled calamari with lemon & herbs", price: "$28.00" },
    ],
  },
  {
    id: "salads",
    label: "Salads & Soups",
    items: [
      { name: "Caesar Salad", desc: "Romaine lettuce, homemade croutons, parmesan, caesar dressing", price: "$8.95 / $12.25" },
      { name: "House Salad", desc: "Iceberg lettuce, tomatoes, cucumber, olives, pepperoncini, carrots, red cabbage", price: "$8.20 / $10.95" },
      { name: "Greek Mediterranean", desc: "Mixed greens, red onion, cucumbers, cherry tomato, black olives, feta & greek dressing", price: "$9.35 / $13.25" },
      { name: "Capricciosa", desc: "Mixed greens, caramelized walnuts, grilled chicken, bleu cheese & honey mustard", price: "$16.95" },
      { name: "Portobello Salad", desc: "Mixed greens, roasted asparagus, grilled chicken, fresh mozzarella, portobello & creamy balsamic", price: "$16.95" },
      { name: "Minestrone", desc: "Vegetarian", price: "$8.95" },
      { name: "Pasta e Fagioli", desc: "An old Umberto's recipe made with prosciutto", price: "$8.95" },
      { name: "Tortellini in Brodo", desc: "Meat tortellini in broth", price: "$8.95" },
    ],
  },
  {
    id: "heroes",
    label: "Heroes & Specialties",
    items: [
      { name: "Umberto's Favorite", desc: "Grilled chicken, broccoli rabe", price: "$15.00", tag: "SIGNATURE" },
      { name: "The Godfather", desc: "Fresh mozzarella, mortadella, prosciutto, provolone, tomato, balsamic & olive oil", price: "$15.00" },
      { name: "Chicken Parmigiana Hero", desc: "Classic chicken parm on a hero roll", price: "$14.00" },
      { name: "Veal Parmigiana Hero", desc: "Tender veal parm on a hero roll", price: "$14.50" },
      { name: "Sausage & Peppers", desc: "With cherry peppers available", price: "$12.30" },
      { name: "Calzone", desc: "Cheese-filled", price: "$11.00" },
      { name: "Meat Calzone", desc: "Sausage & pepperoni", price: "$13.00" },
      { name: "Sausage Roll", desc: "Peppers, onions, mozzarella & tomato sauce", price: "$11.50" },
      { name: "Buffalo Chicken Roll", desc: "Buffalo chicken with bleu cheese", price: "$12.00" },
    ],
  },
];

export default function Menu() {
  const [activeTab, setActiveTab] = useState("pizza");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const activeCategory = menuCategories.find((c) => c.id === activeTab);

  return (
    <div className="min-h-screen bg-[oklch(0.10_0.015_60)]">
      <Navigation />

      {/* Page header */}
      <header className="py-16 bg-[oklch(0.12_0.018_60)] border-b border-[oklch(0.20_0.02_60)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block w-12 h-0.5 bg-[oklch(0.46_0.22_25)] mb-4" />
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[oklch(0.94_0.03_80)] leading-tight">
              OUR MENU
            </h1>
            <p className="font-serif italic text-[oklch(0.72_0.14_75)] text-xl mt-2 mb-4">
              Authentic Italian-American cuisine since 1965
            </p>
            <p className="font-body text-[oklch(0.62_0.03_80)] leading-relaxed">
              From the legendary Original Grandma Slice to fresh homemade pasta, seafood, and classic Italian entrées — every dish is crafted with the same passion Umberto brought from Naples over 60 years ago.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/order" className="btn-umberto text-sm">
                Order Online <ArrowRight size={14} />
              </Link>
              <a href="tel:5164377698" className="btn-outline-gold text-sm">
                <Phone size={14} /> Call to Order
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Menu note */}
      <div className="bg-[oklch(0.14_0.018_60)] border-b border-[oklch(0.20_0.02_60)] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-body text-xs text-[oklch(0.55_0.03_80)] text-center">
            Menu shown is for New Hyde Park flagship. Prices and items may vary by location. Gluten-free pasta available +$4.00. Add grilled or fried chicken to any pasta +$6.00.
          </p>
        </div>
      </div>

      {/* Category tabs */}
      <div className="sticky top-[calc(4rem+2px)] z-30 bg-[oklch(0.10_0.015_60)] border-b border-[oklch(0.20_0.02_60)] overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 min-w-max">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-4 font-display text-sm tracking-[0.08em] uppercase whitespace-nowrap border-b-2 transition-colors duration-150 ${
                  activeTab === cat.id
                    ? "border-[oklch(0.46_0.22_25)] text-[oklch(0.94_0.03_80)]"
                    : "border-transparent text-[oklch(0.55_0.03_80)] hover:text-[oklch(0.80_0.03_80)]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu items */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeCategory && (
            <div>
              <h2 className="font-display text-2xl text-[oklch(0.94_0.03_80)] tracking-wider mb-8">
                {activeCategory.label}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {activeCategory.items.map((item, i) => (
                  <article
                    key={item.name}
                    className="reveal bg-[oklch(0.14_0.018_60)] border border-[oklch(0.20_0.02_60)] p-5 hover:border-[oklch(0.46_0.22_25)]/50 transition-colors"
                    style={{ transitionDelay: `${i * 40}ms` }}
                    itemScope
                    itemType="https://schema.org/MenuItem"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-start gap-2 flex-1">
                        <h3 className="font-display text-[oklch(0.94_0.03_80)] text-base tracking-wider leading-tight" itemProp="name">
                          {item.name}
                        </h3>
                        {item.tag && (
                          <span className="flex-shrink-0 text-[0.6rem] bg-[oklch(0.46_0.22_25)] text-[oklch(0.98_0.01_80)] px-1.5 py-0.5 tracking-wider mt-0.5">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <span className="font-body text-[oklch(0.72_0.14_75)] text-sm font-medium flex-shrink-0" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                        <span itemProp="price">{item.price}</span>
                      </span>
                    </div>
                    <p className="font-body text-xs text-[oklch(0.58_0.03_80)] leading-relaxed" itemProp="description">
                      {item.desc}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Order CTA */}
      <section className="py-12 bg-[oklch(0.12_0.018_60)] border-t border-[oklch(0.20_0.02_60)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl text-[oklch(0.94_0.03_80)] mb-3">READY TO ORDER?</h2>
          <p className="font-body text-[oklch(0.62_0.03_80)] mb-6">
            Order online for pickup or delivery, or call your nearest location.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/order" className="btn-umberto">
              Order Online <ArrowRight size={16} />
            </Link>
            <a href="tel:5164377698" className="btn-outline-gold">
              <Phone size={16} /> (516) 437-7698
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
