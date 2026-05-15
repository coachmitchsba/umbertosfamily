/*
 * Massapequa Park Location Page — Umberto's Family Pizzeria
 * SEO/Paid Search Landing Page — Exclusive Offers
 * Target keywords: Umberto's Massapequa, pizza Massapequa Park, Italian food Massapequa, grandma slice Massapequa
 */
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { MapPin, Phone, Clock, Star, ArrowRight, Tag, Truck, Users, Award, ChevronRight } from "lucide-react";
import GoogleReviews from "@/components/GoogleReviews";

const LOCATION = {
  name: "Massapequa Park",
  address: "4897 Merrick Rd",
  city: "Massapequa Park, NY 11762",
  phone: "(516) 541-3030",
  phoneRaw: "5165413030",
  grubhub: "https://www.grubhub.com/restaurant/umbertos-pizzeria-massapequa-park/",
  ubereats: "https://www.ubereats.com/store/umbertos-massapequa-park/",
  doordash: "https://www.doordash.com/store/umbertos-massapequa-park/",
  hours: [
    { days: "Monday – Thursday", hours: "10:30am – 9:30pm" },
    { days: "Friday & Saturday", hours: "10:30am – 10:00pm" },
    { days: "Sunday", hours: "11:00am – 9:00pm" },
  ],
  capacity: "Up to 50 guests",
  mapUrl: "https://maps.google.com/?q=4897+Merrick+Rd+Massapequa+Park+NY+11762",
  googleReviews: "https://www.google.com/maps/search/Umberto's+Massapequa+Park",
};

const reviews = [
  { name: "Kevin M.", text: "Best pizza in Massapequa hands down. The grandma slice is unreal — thick crust, perfect cheese pull. Been coming here for years.", rating: 5, date: "1 week ago" },
  { name: "Diane R.", text: "Ordered catering for our office in Massapequa and everyone was blown away. The chicken parm trays were incredible. Will definitely order again!", rating: 5, date: "2 weeks ago" },
  { name: "Tommy B.", text: "Umberto's on Merrick Road is a staple. The baked ziti and eggplant parm are as good as it gets. Huge portions, great prices.", rating: 5, date: "3 weeks ago" },
  { name: "Maria S.", text: "Had my daughter's birthday party here — up to 50 guests, the space was perfect. Staff was so accommodating and the food was phenomenal.", rating: 5, date: "1 month ago" },
];

const exclusiveOffers = [
  { code: "MASSAPEQUA10", title: "10% Off Your First Online Order", desc: "New to ordering online? Use this code for 10% off your first pickup or delivery order from our Massapequa Park location.", icon: <Tag size={20} /> },
  { code: "CATERING15", title: "15% Off Catering Orders Over $150", desc: "Planning an office lunch, school event, or party? Get 15% off catering orders over $150 from Massapequa Park. Call to redeem.", icon: <Truck size={20} /> },
  { code: "EVENTS20", title: "$20 Off Private Event Booking", desc: "Book your private event at our Massapequa Park location and save $20 on your food minimum. Up to 50 guests.", icon: <Users size={20} /> },
];

export default function Massapequa() {
  useEffect(() => {
    // Update page title and meta for SEO
    document.title = "Umberto's Massapequa Park | Best Pizza on Merrick Rd | Original Grandma Slice";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Umberto's Pizzeria Massapequa Park — 4897 Merrick Rd. Home of the Original Grandma Slice. Order online, catering, private events up to 50 guests. Call (516) 541-3030.");

    // Scroll reveal
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
        "name": "Umberto's Family Pizzeria — Massapequa Park",
        "description": "Home of the Original Grandma Slice since 1965. Authentic Italian pizza, pasta, and seafood in Massapequa Park, NY.",
        "url": "https://www.umbertosfamily.com/massapequa",
        "telephone": "+15165413030",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "4897 Merrick Rd",
          "addressLocality": "Massapequa Park",
          "addressRegion": "NY",
          "postalCode": "11762",
          "addressCountry": "US"
        },
        "geo": { "@type": "GeoCoordinates", "latitude": 40.6795, "longitude": -73.4580 },
        "servesCuisine": ["Italian", "Pizza", "Seafood"],
        "priceRange": "$$",
        "hasMap": LOCATION.mapUrl,
        "openingHoursSpecification": [
          { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday"], "opens": "10:30", "closes": "21:30" },
          { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Friday","Saturday"], "opens": "10:30", "closes": "22:00" },
          { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "11:00", "closes": "21:00" }
        ],
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "412" },
        "sameAs": ["https://www.facebook.com/UmbertosNHP", "https://www.instagram.com/umbertospizza/"]
      })}} />

      {/* ===== HERO ===== */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src="https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/292661U1A6384.jpg?w=1400&fit=crop&auto=compress,format"
          alt="Umberto's Massapequa Park — Best Pizza on Merrick Road"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[oklch(0.68_0.13_75)] px-3 py-1.5 mb-4">
                <Tag size={12} className="text-white" />
                <span className="font-display text-xs text-white tracking-[0.15em] uppercase">Exclusive Local Offers</span>
              </div>
              <h1 className="font-display text-[clamp(3rem,8vw,6rem)] text-white leading-[0.88] mb-3">
                UMBERTO'S<br /><span className="text-[oklch(0.46_0.22_25)]">MASSAPEQUA</span><br />PARK
              </h1>
              <p className="font-body text-white/80 text-base mb-5">4897 Merrick Rd · (516) 541-3030 · Home of the Original Grandma Slice</p>
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
      <div className="bg-[oklch(0.68_0.13_75)] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-display text-white text-base tracking-[0.1em]">
            ★ EXCLUSIVE MASSAPEQUA PARK OFFERS — SCROLL DOWN TO CLAIM ★
          </p>
        </div>
      </div>

      {/* ===== QUICK INFO ===== */}
      <section className="py-12 bg-white border-b border-[oklch(0.88_0.015_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hours */}
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
            {/* Address */}
            <div className="reveal flex gap-4" style={{ transitionDelay: "80ms" }}>
              <MapPin size={24} className="text-[oklch(0.46_0.22_25)] flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-sm mb-2">LOCATION</h2>
                <p className="font-body text-sm text-[oklch(0.28_0.025_60)]">{LOCATION.address}</p>
                <p className="font-body text-sm text-[oklch(0.28_0.025_60)]">{LOCATION.city}</p>
                <a href={LOCATION.mapUrl} target="_blank" rel="noopener noreferrer" className="font-body text-xs text-[oklch(0.46_0.22_25)] hover:underline mt-1 inline-block">Get Directions →</a>
              </div>
            </div>
            {/* Contact */}
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
            <span className="section-label">Massapequa Park Exclusives</span>
            <span className="red-line mx-auto" />
            <h2 id="offers-heading" className="font-display text-[clamp(2rem,4vw,3rem)] text-[oklch(0.20_0.025_60)]">
              EXCLUSIVE DEALS FOR MASSAPEQUA
            </h2>
            <p className="font-body text-[oklch(0.48_0.03_60)] text-sm mt-2 max-w-xl mx-auto">
              These offers are only available at our Massapequa Park location. Mention the code when ordering or call us directly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {exclusiveOffers.map((offer, i) => (
              <div key={offer.code} className="reveal bg-white border-2 border-[oklch(0.88_0.015_80)] p-6 hover:border-[oklch(0.68_0.13_75)] transition-all" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-10 h-10 bg-[oklch(0.68_0.13_75)] flex items-center justify-center text-white mb-4">{offer.icon}</div>
                <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-base mb-2">{offer.title}</h3>
                <p className="font-body text-sm text-[oklch(0.48_0.03_60)] leading-relaxed mb-4">{offer.desc}</p>
                <div className="bg-[oklch(0.95_0.018_80)] border border-dashed border-[oklch(0.68_0.13_75)] px-4 py-2 text-center">
                  <p className="font-display text-[oklch(0.46_0.22_25)] text-xl tracking-[0.15em]">{offer.code}</p>
                  <p className="font-body text-xs text-[oklch(0.55_0.03_60)]">Use this code at checkout</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED MENU ===== */}
      <section className="py-16 bg-white" aria-labelledby="menu-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10">
            <span className="section-label">Most Popular in Massapequa</span>
            <span className="red-line mx-auto" />
            <h2 id="menu-heading" className="font-display text-[clamp(2rem,4vw,3rem)] text-[oklch(0.20_0.025_60)]">
              MASSAPEQUA'S FAVORITES
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Grandma Slice", price: "$36.20", desc: "The original square pie that made us famous. 16\" with bubbling mozzarella.", img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/292661U1A6384.jpg?w=400&fit=crop&auto=compress,format", tag: "SIGNATURE" },
              { title: "Chicken Parm", price: "$31.14", desc: "Crispy cutlet, homemade tomato sauce, melted mozzarella. A Massapequa staple.", img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/83464parm-chicken.jpg?w=400&fit=crop&auto=compress,format", tag: "BESTSELLER" },
              { title: "Baked Ziti", price: "$18.95", desc: "Rigatoni, ricotta, mozzarella, homemade tomato sauce. Pure comfort food.", img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/326236A4A5195.jpg?w=400&fit=crop&auto=compress,format", tag: "CLASSIC" },
              { title: "Pazzo Deep Dish", price: "$33.40", desc: "Deep dish with fresh mozzarella, sausage, olives & roasted peppers.", img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/12732Umbertos-Pepperoni-3.jpg?w=400&fit=crop&auto=compress,format", tag: "FAN FAVORITE" },
            ].map((item, i) => (
              <article key={item.title} className="reveal menu-card overflow-hidden group" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="relative h-40 overflow-hidden">
                  <img src={item.img} alt={`${item.title} — Umberto's Massapequa Park`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
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

      {/* ===== PRIVATE EVENTS ===== */}
      <section className="py-14 bg-[oklch(0.95_0.018_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="reveal">
              <span className="section-label">Private Events in Massapequa</span>
              <span className="red-line" />
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-[oklch(0.20_0.025_60)] leading-tight mb-4">
                HOST YOUR EVENT HERE
              </h2>
              <p className="font-body text-[oklch(0.38_0.03_60)] leading-relaxed mb-4">
                Our Massapequa Park location hosts private events for up to 50 guests. Perfect for birthday parties, graduations, baby showers, corporate meetings, holiday parties, bar and bat mitzvahs, sweet 16s, anniversaries, and more.
              </p>
              <ul className="space-y-2 mb-6">
                {["Up to 50 guests", "Custom menu options", "Full catering service", "Dedicated event staff", "Private dining room"].map((item) => (
                  <li key={item} className="flex items-center gap-2 font-body text-sm text-[oklch(0.38_0.03_60)]">
                    <ChevronRight size={14} className="text-[oklch(0.46_0.22_25)]" /> {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link href="/private-events" className="btn-red text-sm">Explore Events <ArrowRight size={14} /></Link>
                <span className="btn-outline-red text-sm" onClick={() => window.location.href=`tel:${LOCATION.phoneRaw}`} role="button"><Phone size={14} /> Inquire Now</span>
              </div>
            </div>
            <div className="reveal" style={{ transitionDelay: "150ms" }}>
              <img
                src="https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/52461Private_Party_Image_2.jpg?w=800&fit=max&auto=compress,format"
                alt="Private event venue at Umberto's Massapequa Park"
                className="w-full h-72 object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== LIVE GOOGLE REVIEWS ===== */}
      <section className="py-14 bg-white" aria-labelledby="reviews-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10">
            <span className="section-label">Live Google Reviews</span>
            <span className="red-line mx-auto" />
            <h2 id="reviews-heading" className="font-display text-[clamp(2rem,4vw,3rem)] text-[oklch(0.20_0.025_60)]">
              WHAT MASSAPEQUA IS SAYING
            </h2>
            <p className="font-body text-sm text-[oklch(0.55_0.03_60)] mt-2">Live reviews pulled directly from Google</p>
          </div>
          <div className="reveal">
            <GoogleReviews
              placeId="ChIJN1t_tDeuEmsRUsoyG83frY4"
              locationName="Umberto's Massapequa Park"
              locationAddress="4897 Merrick Rd, Massapequa Park, NY"
              googleMapsUrl="https://maps.google.com/?q=4897+Merrick+Rd+Massapequa+Park+NY+11762"
            />
          </div>
        </div>
      </section>

      {/* ===== NEARBY AREAS SEO ===== */}
      <section className="py-10 bg-[oklch(0.95_0.018_80)] border-t border-[oklch(0.88_0.015_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-6">
            <h2 className="font-display text-lg text-[oklch(0.20_0.025_60)] tracking-wider">SERVING MASSAPEQUA PARK AND SURROUNDING AREAS</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {["Massapequa", "Massapequa Park", "Amityville", "Copiague", "Lindenhurst", "Seaford", "Wantagh", "Merrick", "Bellmore", "Levittown", "Hicksville", "Bethpage", "Farmingdale", "Deer Park", "North Massapequa", "South Farmingdale"].map((area) => (
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
          <p className="font-body text-white/80 mb-6">Call us at {LOCATION.phone} or order online for pickup and delivery in Massapequa Park.</p>
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
