/*
 * FAQ Page — Umberto's Family Pizzeria
 * Design: Dark, accordion-style, clean
 * SEO/AEO: FAQPage schema, comprehensive Q&A for AI search engines, voice search optimization
 * Covers: Grandma slice, catering, private events, ordering, locations, history
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ChevronDown, ArrowRight, Phone } from "lucide-react";

const faqCategories = [
  {
    category: "About Umberto's & The Grandma Slice",
    faqs: [
      {
        q: "What is a Grandma Slice and where did it originate?",
        a: "A Grandma Slice is a square, thin-crust pizza baked in a rectangular pan, with mozzarella cheese placed directly on the dough and plum tomato sauce ladled on top. The crust is crispy on the bottom, chewy in the middle, and slightly charred at the edges. Food historians and pizza journalists widely credit Umberto's of New Hyde Park as the originator of the Grandma pizza style on Long Island, dating back to 1965.",
      },
      {
        q: "When was Umberto's Family Pizzeria founded?",
        a: "Umberto's Family Pizzeria was founded in 1965 by Umberto Corteo and his brother Joe in New Hyde Park, Long Island, New York. Umberto was a Naples-born immigrant who brought his family's Italian pizza-making traditions to Long Island.",
      },
      {
        q: "Who founded Umberto's Pizzeria?",
        a: "Umberto's was founded by Umberto Corteo, a Naples-born Italian immigrant, and his brother Joe Corteo. They opened the first location on Jericho Turnpike in New Hyde Park, NY in 1965. The restaurant has remained family-owned and operated for over 60 years.",
      },
      {
        q: "Has Umberto's been featured on the Food Network?",
        a: "Yes, Umberto's Family Pizzeria has been featured on the Food Network. The restaurant has also been rated the best Sicilian pie in New York and has received widespread national media recognition for its Original Grandma Slice.",
      },
      {
        q: "How many Umberto's locations are there?",
        a: "Umberto's Family Pizzeria has 6 locations across Long Island, New York: New Hyde Park (flagship), Manhasset, Bellmore, Massapequa Park, Lake Grove, and Farmingdale.",
      },
      {
        q: "Is Umberto's still family-owned?",
        a: "Yes, Umberto's Family Pizzeria is still family-owned and operated. The Corteo family has maintained ownership and management of the restaurant through multiple generations, preserving the original recipes and traditions since 1965.",
      },
    ],
  },
  {
    category: "Menu & Food",
    faqs: [
      {
        q: "What is Umberto's most popular pizza?",
        a: "Umberto's most popular and signature pizza is the Original Grandma Slice — a 16\" square thin-crust pizza with mozzarella and plum marinara sauce, featured on the Food Network. Other fan favorites include the Sicilian pizza (rated best in NY), the Pazzo deep dish with fresh mozzarella and sausage, and the Vodka pizza.",
      },
      {
        q: "Does Umberto's serve food other than pizza?",
        a: "Yes! Umberto's is a full Italian-American restaurant serving a complete menu including appetizers (mussels, calamari, baked clams), fresh and dried pasta, entrées (chicken parmigiana, veal marsala, shrimp francese), fresh seafood, salads, soups, heroes, and calzones.",
      },
      {
        q: "Does Umberto's have gluten-free options?",
        a: "Yes, Umberto's offers gluten-free pasta as an add-on option for an additional $4.00. Please inform your server of any dietary restrictions when ordering.",
      },
      {
        q: "What is the Pazzo pizza at Umberto's?",
        a: "The Pazzo is a 16\" round deep dish pizza topped with fresh mozzarella, marinara sauce, homemade Italian sausage, black olives, and roasted peppers. It is one of Umberto's most popular specialty pizzas.",
      },
      {
        q: "Does Umberto's have vegetarian options?",
        a: "Yes, Umberto's has several vegetarian options including the Vegetable pizza (broccoli, spinach, tomatoes, mushrooms), eggplant parmigiana, pasta primavera, ziti with broccoli, minestrone soup, and various salads.",
      },
    ],
  },
  {
    category: "Ordering & Delivery",
    faqs: [
      {
        q: "Can I order Umberto's pizza online?",
        a: "Yes, you can order Umberto's pizza online for pickup or delivery. Visit our Order Online page at umbertosfamily.com/order to select your location and place your order. We also partner with Grubhub, DoorDash, and UberEats at select locations.",
      },
      {
        q: "Does Umberto's deliver?",
        a: "Yes, Umberto's offers delivery at all 6 Long Island locations through our website and third-party delivery apps including Grubhub, DoorDash, and UberEats. Delivery areas and fees vary by location.",
      },
      {
        q: "Can I order Umberto's for pickup?",
        a: "Yes, all Umberto's locations offer pickup ordering. You can call your nearest location directly or order online through our website or delivery apps. Pickup orders are typically ready in 20–30 minutes.",
      },
      {
        q: "What are Umberto's hours?",
        a: "Most Umberto's locations are open Monday–Thursday 10:30am–9:30pm, Friday–Saturday 10:30am–10:00pm, and Sunday 11:00am–9:00pm. Hours may vary by location. Visit our Locations page or call your nearest location to confirm current hours.",
      },
      {
        q: "Does Umberto's ship nationwide?",
        a: "Yes, Umberto's offers nationwide shipping for select items. Visit our website for details on shipping availability and options.",
      },
    ],
  },
  {
    category: "Catering",
    faqs: [
      {
        q: "Does Umberto's offer catering services?",
        a: "Yes! Umberto's provides full catering services for offices, schools, government agencies, corporate events, and private parties across Long Island. We offer full trays (serves 10–12) and half trays (serves 5–6) of all our menu items including pizza, pasta, chicken parmigiana, baked ziti, lasagna, and more.",
      },
      {
        q: "How do I order catering from Umberto's?",
        a: "To order catering from Umberto's, call your nearest location directly. We recommend calling 24–48 hours in advance for large orders. You can also visit our Catering page at umbertosfamily.com/catering for the full catering menu and pricing.",
      },
      {
        q: "What is the minimum order for Umberto's catering?",
        a: "Umberto's catering is available in full trays (serving 10–12 people) and half trays (serving 5–6 people). There is no strict minimum order, but we recommend calling your location to discuss your specific needs.",
      },
      {
        q: "Does Umberto's cater for corporate offices and government agencies?",
        a: "Yes, Umberto's regularly caters for corporate offices, law firms, medical offices, government agencies, schools, hospitals, police and fire departments, and other organizations across Long Island. We are experienced with large-scale corporate catering and can accommodate groups of any size.",
      },
      {
        q: "Does Umberto's deliver catering orders?",
        a: "Yes, Umberto's can deliver catering orders to your location. Delivery availability and fees vary by location and order size. Call your nearest Umberto's to discuss delivery options for your catering order.",
      },
      {
        q: "How much does Umberto's catering cost?",
        a: "Catering prices vary by item and tray size. Full trays (serving 10–12) range from approximately $25 for sides to $140 for premium entrées. Half trays (serving 5–6) are approximately half the full tray price. Visit our Catering page for the complete price list.",
      },
    ],
  },
  {
    category: "Private Events",
    faqs: [
      {
        q: "Does Umberto's have a private event space?",
        a: "Yes! Umberto's has private event spaces at 5 of our 6 Long Island locations. Our New Hyde Park flagship can accommodate up to 250 guests. Other locations accommodate 25–50 guests. Spaces are available for weddings, corporate events, birthday parties, anniversaries, and all celebrations.",
      },
      {
        q: "How many guests can Umberto's accommodate for a private event?",
        a: "Umberto's can accommodate private events of various sizes: New Hyde Park (up to 250 guests), Lake Grove (up to 50), Bellmore (up to 50), Massapequa Park (up to 50), and Manhasset (up to 25). Our New Hyde Park flagship is ideal for large weddings and corporate galas.",
      },
      {
        q: "How do I book a private event at Umberto's?",
        a: "To book a private event at Umberto's, call our New Hyde Park flagship at (516) 437-7698 or visit our Private Events page at umbertosfamily.com/private-events. Our event coordinators will discuss your event needs, date availability, and custom menu options.",
      },
      {
        q: "Does Umberto's host weddings?",
        a: "Yes, Umberto's New Hyde Park flagship is a popular venue for wedding receptions and rehearsal dinners. Our two-story Tuscan-style restaurant features a grand banquet hall, private dining rooms, full bar service, and dedicated event coordinators. Contact us to discuss your wedding needs.",
      },
      {
        q: "Can Umberto's accommodate corporate events and galas?",
        a: "Absolutely. Umberto's regularly hosts corporate events, holiday parties, team dinners, and business galas. We offer custom menu packages, AV equipment, full bar service, and dedicated event staff. Our New Hyde Park flagship can accommodate up to 250 guests for large corporate events.",
      },
    ],
  },
  {
    category: "Locations & Contact",
    faqs: [
      {
        q: "Where is Umberto's New Hyde Park located?",
        a: "Umberto's New Hyde Park flagship is located at 633 Jericho Turnpike, New Hyde Park, NY 11040. Phone: (516) 437-7698. This is the original location opened by Umberto Corteo in 1965.",
      },
      {
        q: "What Long Island towns have an Umberto's Pizzeria?",
        a: "Umberto's Family Pizzeria has locations in: New Hyde Park (633 Jericho Turnpike), Manhasset (429 Plandome Road), Bellmore (208 Bedford Ave), Massapequa Park (1011 Park Blvd), Lake Grove (111 Alexander Ave), and Farmingdale (211 Airport Plaza Blvd).",
      },
      {
        q: "What is the phone number for Umberto's New Hyde Park?",
        a: "The phone number for Umberto's New Hyde Park flagship is (516) 437-7698.",
      },
      {
        q: "Does Umberto's have a loyalty rewards program?",
        a: "Yes, Umberto's has a rewards program. Visit umbertos.appsuitecrm.com to sign up and earn rewards on your purchases.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border border-[oklch(0.20_0.02_60)] overflow-hidden"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-[oklch(0.14_0.018_60)] transition-colors"
        aria-expanded={open}
      >
        <span className="font-display text-[oklch(0.94_0.03_80)] text-base tracking-wider leading-snug" itemProp="name">
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`text-[oklch(0.46_0.22_25)] flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
      >
        <div className="px-5 pb-5 border-t border-[oklch(0.20_0.02_60)]">
          <p className="font-body text-sm text-[oklch(0.68_0.03_80)] leading-relaxed pt-4" itemProp="text">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Build FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqCategories.flatMap((cat) =>
      cat.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a,
        },
      }))
    ),
  };

  return (
    <div className="min-h-screen bg-[oklch(0.10_0.015_60)]">
      <Navigation />

      {/* Inject FAQ schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header className="py-16 bg-[oklch(0.12_0.018_60)] border-b border-[oklch(0.20_0.02_60)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block w-12 h-0.5 bg-[oklch(0.46_0.22_25)] mb-4 mx-auto" />
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[oklch(0.94_0.03_80)] leading-tight">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="font-body text-[oklch(0.62_0.03_80)] mt-4 max-w-xl mx-auto">
            Everything you need to know about Umberto's Family Pizzeria — the Original Grandma Slice, catering, private events, locations, and more.
          </p>
        </div>
      </header>

      {/* FAQ content */}
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqCategories.map((cat, ci) => (
              <section key={cat.category} aria-labelledby={`faq-cat-${ci}`}>
                <div className="reveal mb-6">
                  <h2
                    id={`faq-cat-${ci}`}
                    className="font-display text-xl text-[oklch(0.46_0.22_25)] tracking-wider border-b border-[oklch(0.20_0.02_60)] pb-3"
                  >
                    {cat.category}
                  </h2>
                </div>
                <div className="space-y-2">
                  {cat.faqs.map((faq, fi) => (
                    <div
                      key={fi}
                      className="reveal bg-[oklch(0.12_0.018_60)]"
                      style={{ transitionDelay: `${fi * 40}ms` }}
                    >
                      <FAQItem q={faq.q} a={faq.a} />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      {/* Still have questions */}
      <section className="py-16 bg-[oklch(0.12_0.018_60)] border-t border-[oklch(0.20_0.02_60)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl text-[oklch(0.94_0.03_80)] tracking-wider mb-3">
            STILL HAVE QUESTIONS?
          </h2>
          <p className="font-body text-[oklch(0.62_0.03_80)] mb-6">
            Call your nearest Umberto's location or visit us in person. We're always happy to help.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="tel:5164377698" className="btn-umberto">
              <Phone size={16} /> (516) 437-7698
            </a>
            <Link href="/locations" className="btn-outline-gold">
              Find a Location <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
