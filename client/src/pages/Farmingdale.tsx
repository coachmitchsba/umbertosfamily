/*
 * Farmingdale Location Page — Umberto's Family Pizzeria
 * SEO/Paid Search Landing Page — Exclusive Offers
 * Target keywords: Umberto's Farmingdale, pizza Farmingdale NY, Italian restaurant Farmingdale, grandma slice Farmingdale
 */
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { MapPin, Phone, Clock, Star, ArrowRight, Tag, Truck, Users, ChevronRight, Calendar } from "lucide-react";
import GoogleReviews from "@/components/GoogleReviews";

const LOCATION = {
  name: "Farmingdale",
  address: "967 Broadhollow Rd",
  city: "Farmingdale, NY 11735",
  phone: "(631) 454-6440",
  phoneRaw: "6314546440",
  grubhub: "https://www.grubhub.com/restaurant/umbertos-pizzeria-farmingdale/",
  ubereats: "https://www.ubereats.com/store/umbertos-farmingdale/",
  doordash: "https://www.doordash.com/store/umbertos-farmingdale/",
  hours: [
    { days: "Monday – Thursday", hours: "10:30am – 9:30pm" },
    { days: "Friday & Saturday", hours: "10:30am – 10:00pm" },
    { days: "Sunday", hours: "11:00am – 9:00pm" },
  ],
  mapUrl: "https://maps.google.com/?q=967+Broadhollow+Rd+Farmingdale+NY+11735",
  googleReviews: "https://www.google.com/maps/search/Umberto's+Farmingdale+NY",
};

const reviews = [
  { name: "Frank D.", text: "Umberto's on Broadhollow is the real deal. The grandma slice is everything you've heard — perfectly crispy bottom, great sauce, amazing cheese. Best pizza in Farmingdale.", rating: 5, date: "5 days ago" },
  { name: "Carla N.", text: "We do all our office catering through Umberto's Farmingdale. The trays are huge, the food is always hot and fresh, and the price is unbeatable. Highly recommend.", rating: 5, date: "2 weeks ago" },
  { name: "Joe P.", text: "The eggplant parm here is absolutely incredible. And the pizza — I've been eating Umberto's my whole life and it never gets old. This Farmingdale location is fantastic.", rating: 5, date: "3 weeks ago" },
  { name: "Stephanie L.", text: "Ordered catering for a school event in Farmingdale — 10 trays of pasta and pizza. The kids went absolutely wild. Everything was perfect. Will definitely order again!", rating: 5, date: "1 month ago" },
];

const exclusiveOffers = [
  { code: "FARMINGDALE10", title: "10% Off Your First Online Order", desc: "New to ordering from our Farmingdale location? Use this code for 10% off your first pickup or delivery order.", icon: <Tag size={20} /> },
  { code: "FDCATERING15", title: "15% Off Catering Orders Over $150", desc: "Planning a corporate lunch, school event, or party in Farmingdale? Get 15% off catering orders over $150. Call to redeem.", icon: <Truck size={20} /> },
  { code: "FDLUNCH", title: "Free Garlic Knots with Any Lunch Order", desc: "Order any entree for lunch (Mon–Fri before 3pm) at our Farmingdale location and get a free order of garlic knots.", icon: <Users size={20} /> },
];

export default function Farmingdale() {
  useEffect(() => {
    document.title = "Umberto's Farmingdale | Best Pizza on Broadhollow Rd | Original Grandma Slice";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Umberto's Pizzeria Farmingdale — 967 Broadhollow Rd. Home of the Original Grandma Slice. Order online, catering, private events. Call (631) 454-6440.");

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)]">
      <Navigation />

      {/* Schema.org LocalBusiness markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": ["Restaurant", "FoodEstablishment"],
        "name": "Umberto's Family Pizzeria — Farmingdale",
        "description": "Home of the Original Grandma Slice since 1965. Authentic Italian pizza, pasta, and seafood in Farmingdale, NY.",
        "url": "https://www.umbertosfamily.com/farmingdale",
        "telephone": "+16314546440",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "967 Broadhollow Rd",
          "addressLocality": "Farmingdale",
          "addressRegion": "NY",
          "postalCode": "11735",
          "addressCountry": "US"
        },
        "geo": { "@type": "GeoCoordinates", "latitude": 40.7282, "longitude": -73.4448 },
        "servesCuisine": ["Italian", "Pizza", "Seafood"],
        "priceRange": "$$",
        "hasMap": LOCATION.mapUrl,
        "openingHoursSpecification": [
          { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday"], "opens": "10:30", "closes": "21:30" },
          { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Friday","Saturday"], "opens": "10:30", "closes": "22:00" },
          { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "11:00", "closes": "21:00" }
        ],
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "387" },
        "sameAs": ["https://www.facebook.com/UmbertosNHP", "https://www.instagram.com/umbertospizza/"]
      })}} />

      {/* ===== HERO ===== */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src="https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/12732Umbertos-Pepperoni-3.jpg?w=1400&fit=crop&auto=compress,format"
          alt="Umberto's Farmingdale — Best Pizza on Broadhollow Road"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/52 to-black/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[oklch(0.46_0.22_25)] px-3 py-1.5 mb-4">
                <Tag size={12} className="text-white" />
                <span className="font-display text-xs text-white tracking-[0.15em] uppercase">Exclusive Local Offers</span>
              </div>
              <h1 className="font-display text-[clamp(3rem,8vw,6rem)] text-white leading-[0.88] mb-3">
                UMBERTO'S<br /><span className="text-[oklch(0.46_0.22_25)]">FARMINGDALE</span>
              </h1>
              <p className="font-body text-white/80 text-base mb-5">967 Broadhollow Rd · (631) 454-6440 · Home of the Original Grandma Slice</p>
              <div className="flex flex-wrap gap-3">
                <a href={`tel:${LOCATION.phoneRaw}`} className="btn-red text-sm"><Phone size={14} /> Call to Order</a>
                <a href={LOCATION.grubhub} target="_blank" rel="noopener noreferrer" className="btn-white text-sm">Order Online <ArrowRight size={14} /></a>
                <a href={LOCATION.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-2 border-white/60 text-white font-display text-sm tracking-[0.1em] uppercase px-5 py-3 hover:border-white hover:bg-white/10 transition-all">
                  <MapPin size={14} /> Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EXCLUSIVE OFFERS BANNER ===== */}
      <div className="bg-[oklch(0.46_0.22_25)] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-display text-white text-base tracking-[0.1em]">
            ★ EXCLUSIVE FARMINGDALE OFFERS — SCROLL DOWN TO CLAIM ★
          </p>
        </div>
      </div>

      {/* ===== QUICK INFO ===== */}
      <section className="py-12 bg-white border-b border-[oklch(0.88_0.015_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="reveal flex gap-4">
              <Clock size={24} className="text-[oklch(0.46_0.22_25)] flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-sm mb-2">HOURS</h2>
                {LOCATION.hours.map((h) => (
                  <div key={h.days} className="mb-1">
                    <p className="font-body text-xs font-semibold text-[oklch(0.28_0.025_60)]">{h.days}</p>
                    <p className="font-body text-xs text-[oklch(0.48_0.03_60)]">{h.hours}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal flex gap-4" style={{ transitionDelay: "80ms" }}>
              <MapPin size={24} className="text-[oklch(0.46_0.22_25)] flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-sm mb-2">LOCATION</h2>
                <p className="font-body text-sm text-[oklch(0.28_0.025_60)]">{LOCATION.address}</p>
                <p className="font-body text-sm text-[oklch(0.28_0.025_60)]">{LOCATION.city}</p>
                <a href={LOCATION.mapUrl} target="_blank" rel="noopener noreferrer" className="font-body text-xs text-[oklch(0.46_0.22_25)] hover:underline mt-1 inline-block">Get Directions →</a>
              </div>
            </div>
            <div className="reveal flex gap-4" style={{ transitionDelay: "160ms" }}>
              <Phone size={24} className="text-[oklch(0.46_0.22_25)] flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-sm mb-2">CONTACT & ORDER</h2>
                <a href={`tel:${LOCATION.phoneRaw}`} className="font-body text-sm text-[oklch(0.46_0.22_25)] hover:underline block mb-3">{LOCATION.phone}</a>
                <div className="flex flex-col gap-2">
                  <a href={LOCATION.grubhub} target="_blank" rel="noopener noreferrer" className="font-body text-xs bg-[oklch(0.46_0.22_25)] text-white px-3 py-1.5 text-center hover:bg-[oklch(0.55_0.22_25)] transition-colors">Order on Grubhub</a>
                  <a href={LOCATION.ubereats} target="_blank" rel="noopener noreferrer" className="font-body text-xs bg-[oklch(0.20_0.025_60)] text-white px-3 py-1.5 text-center hover:bg-[oklch(0.30_0.025_60)] transition-colors">Order on Uber Eats</a>
                  <a href={LOCATION.doordash} target="_blank" rel="noopener noreferrer" className="font-body text-xs border border-[oklch(0.46_0.22_25)] text-[oklch(0.46_0.22_25)] px-3 py-1.5 text-center hover:bg-[oklch(0.46_0.22_25)] hover:text-white transition-colors">Order on DoorDash</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EXCLUSIVE OFFERS ===== */}
      <section className="py-16 bg-[oklch(0.95_0.018_80)]" aria-labelledby="offers-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10">
            <span className="section-label">Farmingdale Exclusives</span>
            <span className="red-line mx-auto" />
            <h2 id="offers-heading" className="font-display text-[clamp(2rem,4vw,3rem)] text-[oklch(0.20_0.025_60)]">
              EXCLUSIVE DEALS FOR FARMINGDALE
            </h2>
            <p className="font-body text-[oklch(0.48_0.03_60)] text-sm mt-2 max-w-xl mx-auto">
              These offers are only available at our Farmingdale location. Mention the code when ordering or call us directly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {exclusiveOffers.map((offer, i) => (
              <div key={offer.code} className="reveal bg-white border-2 border-[oklch(0.88_0.015_80)] p-6 hover:border-[oklch(0.46_0.22_25)] transition-all" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-10 h-10 bg-[oklch(0.46_0.22_25)] flex items-center justify-center text-white mb-4">{offer.icon}</div>
                <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-base mb-2">{offer.title}</h3>
                <p className="font-body text-sm text-[oklch(0.48_0.03_60)] leading-relaxed mb-4">{offer.desc}</p>
                <div className="bg-[oklch(0.95_0.018_80)] border border-dashed border-[oklch(0.46_0.22_25)] px-4 py-2 text-center">
                  <p className="font-display text-[oklch(0.46_0.22_25)] text-xl tracking-[0.15em]">{offer.code}</p>
                  <p className="font-body text-xs text-[oklch(0.55_0.03_60)]">Use this code at checkout</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED MENU ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10">
            <span className="section-label">Most Popular in Farmingdale</span>
            <span className="red-line mx-auto" />
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-[oklch(0.20_0.025_60)]">FARMINGDALE'S FAVORITES</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Grandma Slice", price: "$36.20", desc: "The original square pie. 16\" with bubbling mozzarella and plum marinara.", img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/292661U1A6384.jpg?w=400&fit=crop&auto=compress,format", tag: "SIGNATURE" },
              { title: "Eggplant Parm", price: "$28.95", desc: "Lightly breaded eggplant, homemade tomato sauce, fresh mozzarella. A classic.", img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/326236A4A5195.jpg?w=400&fit=crop&auto=compress,format", tag: "CLASSIC" },
              { title: "Homemade Lasagna", price: "$19.70", desc: "Ricotta, mozzarella, meatballs & sausage in our famous tomato sauce.", img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/36275067_6A4A2737.jpg?w=400&fit=crop&auto=compress,format", tag: "BESTSELLER" },
              { title: "Pazzo Deep Dish", price: "$33.40", desc: "Deep dish with fresh mozzarella, sausage, olives & roasted peppers.", img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/12732Umbertos-Pepperoni-3.jpg?w=400&fit=crop&auto=compress,format", tag: "FAN FAVORITE" },
            ].map((item, i) => (
              <article key={item.title} className="reveal menu-card overflow-hidden group" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="relative h-40 overflow-hidden">
                  <img src={item.img} alt={`${item.title} — Umberto's Farmingdale`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute top-2 left-2 bg-[oklch(0.46_0.22_25)] px-2 py-0.5">
                    <span className="font-display text-[0.6rem] text-white tracking-[0.12em]">{item.tag}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-sm">{item.title}</h3>
                    <span className="font-body text-[oklch(0.46_0.22_25)] text-sm font-semibold">{item.price}</span>
                  </div>
                  <p className="font-body text-xs text-[oklch(0.48_0.03_60)] leading-relaxed">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="reveal text-center mt-8">
            <Link href="/menu" className="btn-red text-sm">Full Menu <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* ===== CATERING ===== */}
      <section className="py-14 bg-[oklch(0.95_0.018_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="reveal">
              <span className="section-label">Catering in Farmingdale</span>
              <span className="red-line" />
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-[oklch(0.20_0.025_60)] leading-tight mb-4">
                CATERING FOR OFFICES, SCHOOLS & EVENTS
              </h2>
              <p className="font-body text-[oklch(0.38_0.03_60)] leading-relaxed mb-4">
                Umberto's Farmingdale is a go-to catering partner for offices, schools, government agencies, and private events throughout Nassau and Suffolk County. Full trays and half trays available for all menu items.
              </p>
              <ul className="space-y-2 mb-6">
                {["Full & half trays available", "Corporate office catering", "School & government events", "Same-day catering available", "Delivery available"].map((item) => (
                  <li key={item} className="flex items-center gap-2 font-body text-sm text-[oklch(0.38_0.03_60)]">
                    <ChevronRight size={14} className="text-[oklch(0.46_0.22_25)]" /> {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link href="/catering" className="btn-red text-sm">Catering Menu <ArrowRight size={14} /></Link>
                <span className="btn-outline-red text-sm" onClick={() => window.location.href=`tel:${LOCATION.phoneRaw}`} role="button"><Phone size={14} /> Call to Order</span>
              </div>
            </div>
            <div className="reveal grid grid-cols-2 gap-3" style={{ transitionDelay: "150ms" }}>
              {[
                "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/292661U1A6384.jpg?w=400&fit=crop&auto=compress,format",
                "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/83464parm-chicken.jpg?w=400&fit=crop&auto=compress,format",
                "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/326236A4A5195.jpg?w=400&fit=crop&auto=compress,format",
                "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/36275067_6A4A2737.jpg?w=400&fit=crop&auto=compress,format",
              ].map((src, i) => (
                <img key={i} src={src} alt="Umberto's catering Farmingdale" className="w-full h-32 object-cover" loading="lazy" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== OPENTABLE RESERVATION ===== */}
      <section className="py-8 bg-[oklch(0.97_0.015_80)] border-t border-[oklch(0.88_0.015_80)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div>
              <p className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-lg">DINING IN? MAKE A RESERVATION</p>
              <p className="font-body text-sm text-[oklch(0.55_0.03_60)]">Reserve your table at Umberto's Farmingdale via OpenTable</p>
            </div>
            <a
              href="https://www.opentable.com/restref/client/?rid=1489408&restref=1489408&lang=en-US"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[oklch(0.35_0.18_145)] text-white font-display text-sm tracking-[0.1em] uppercase px-6 py-3.5 hover:bg-[oklch(0.42_0.18_145)] transition-colors flex-shrink-0"
            >
              <Calendar size={14} /> Reserve on OpenTable
            </a>
          </div>
        </div>
      </section>

      {/* ===== LIVE GOOGLE REVIEWS ===== */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10">
            <span className="section-label">Live Google Reviews</span>
            <span className="red-line mx-auto" />
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-[oklch(0.20_0.025_60)]">WHAT FARMINGDALE IS SAYING</h2>
            <p className="font-body text-sm text-[oklch(0.55_0.03_60)] mt-2">Live reviews pulled directly from Google</p>
          </div>
          <div className="reveal">
            <GoogleReviews
              placeId="ChIJrTLr-GyuEmsRBfy61i59si0"
              locationName="Umberto's Farmingdale"
              locationAddress="967 Broadhollow Rd, Farmingdale, NY"
              googleMapsUrl="https://maps.google.com/?q=967+Broadhollow+Rd+Farmingdale+NY+11735"
            />
          </div>
        </div>
      </section>

      {/* ===== NEARBY AREAS SEO ===== */}
      <section className="py-10 bg-[oklch(0.95_0.018_80)] border-t border-[oklch(0.88_0.015_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-6">
            <h2 className="font-display text-lg text-[oklch(0.20_0.025_60)] tracking-wider">SERVING FARMINGDALE AND SURROUNDING AREAS</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {["Farmingdale", "Bethpage", "Levittown", "Hicksville", "Plainview", "Melville", "Huntington Station", "Deer Park", "North Babylon", "Wyandanch", "Massapequa", "Massapequa Park", "Amityville", "Copiague", "Lindenhurst", "East Farmingdale", "South Farmingdale", "Old Bethpage"].map((area) => (
              <span key={area} className="font-body text-xs text-[oklch(0.48_0.03_60)] bg-white border border-[oklch(0.88_0.015_80)] px-3 py-1.5">
                Pizza in {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-14 bg-[oklch(0.46_0.22_25)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-white mb-3">READY TO ORDER?</h2>
          <p className="font-body text-white/80 mb-6">Call us at {LOCATION.phone} or order online for pickup and delivery in Farmingdale.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={`tel:${LOCATION.phoneRaw}`} className="btn-white text-sm"><Phone size={14} /> {LOCATION.phone}</a>
            <a href={LOCATION.grubhub} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-2 border-white text-white font-display text-sm tracking-[0.1em] uppercase px-7 py-3.5 hover:bg-white/10 transition-colors">Order Online <ArrowRight size={14} /></a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
