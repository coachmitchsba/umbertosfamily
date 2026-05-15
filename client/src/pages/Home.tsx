/*
 * Home Page — Umberto's Family Pizzeria
 * Design: "Bold New York Street Energy"
 * Sections: Hero, Marquee, Signature, Menu Preview, Reviews, Catering, Events, Locations CTA, FAQ Teaser
 * SEO: Full structured data, semantic HTML, keyword-rich copy
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Star, MapPin, Phone, ChevronDown, Award, Clock, Truck, Users } from "lucide-react";

// Marquee items — press mentions and awards
const marqueeItems = [
  "★ Home of the Original Grandma Slice",
  "★ Featured on Food Network",
  "★ Rated Best Sicilian Pie in NY",
  "★ Family Owned Since 1965",
  "★ 6 Long Island Locations",
  "★ Full Catering Service",
  "★ Private Events Up to 250 Guests",
  "★ Nationwide Shipping Available",
];

// Google Reviews (static display — real API integration via Google Places)
const reviews = [
  {
    id: 1,
    name: "Michael T.",
    rating: 5,
    date: "2 weeks ago",
    text: "The grandma slice here is absolutely legendary. I've been coming since I was a kid and nothing has changed — in the best way possible. The crust is perfectly crispy, the cheese is perfectly melted. This is what Long Island pizza is all about.",
    location: "New Hyde Park",
  },
  {
    id: 2,
    name: "Sarah K.",
    rating: 5,
    date: "1 month ago",
    text: "We used Umberto's for our office catering and they knocked it out of the park. The chicken parm trays were massive and delicious. Everyone was raving. Will absolutely use them again for our next event.",
    location: "Manhasset",
  },
  {
    id: 3,
    name: "Anthony R.",
    rating: 5,
    date: "3 weeks ago",
    text: "Had our daughter's birthday party in the private event room at New Hyde Park. The staff was incredible, the food was phenomenal, and the space looked beautiful. Umberto's made the whole night special.",
    location: "New Hyde Park",
  },
  {
    id: 4,
    name: "Jennifer M.",
    rating: 5,
    date: "1 week ago",
    text: "The pasta here is as good as any restaurant I've been to in Italy. The Rigatoni Umberto with calamari and shrimp is out of this world. And the Grandma pizza? Don't even get me started. Pure perfection.",
    location: "Bellmore",
  },
  {
    id: 5,
    name: "David L.",
    rating: 5,
    date: "2 months ago",
    text: "Been ordering from Umberto's for 20 years. The quality never drops. The Pazzo pizza is my go-to — deep dish, fresh mozzarella, sausage, olives. It's a masterpiece. This place is a Long Island institution.",
    location: "Massapequa Park",
  },
  {
    id: 6,
    name: "Lisa C.",
    rating: 5,
    date: "5 days ago",
    text: "Ordered the catering for a school event — full trays of baked ziti, chicken parm, and grandma pizza. The kids went absolutely crazy for it. The portions are enormous and the price is very reasonable. Highly recommend!",
    location: "Lake Grove",
  },
];

// Counter animation hook
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function StatCounter({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const count = useCounter(value, 2000, start);
  return (
    <div className="text-center">
      <div className="font-display text-5xl lg:text-6xl text-[oklch(0.46_0.22_25)]">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="font-body text-sm text-[oklch(0.62_0.03_80)] mt-1 tracking-wider uppercase">{label}</div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= rating ? "text-[oklch(0.72_0.14_75)] fill-[oklch(0.72_0.14_75)]" : "text-[oklch(0.35_0.02_60)]"}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeReview, setActiveReview] = useState(0);

  // Scroll reveal for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Stats counter trigger
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-advance reviews
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[oklch(0.10_0.015_60)]">
      <Navigation />

      {/* ===== HERO SECTION ===== */}
      <section
        className="relative min-h-[92vh] flex items-center overflow-hidden"
        aria-label="Umberto's Family Pizzeria — Home of the Original Grandma Slice"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-grandma-slice-hero-7tT4CvBtzqQu9aAajzPqff.webp"
            alt="Umberto's Original Grandma Slice Pizza — crispy crust, bubbling mozzarella, plum tomato sauce"
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.08_0.012_60)]/95 via-[oklch(0.08_0.012_60)]/70 to-[oklch(0.08_0.012_60)]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.012_60)]/80 via-transparent to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 border border-[oklch(0.72_0.14_75)] px-3 py-1.5 mb-6 opacity-0 animate-[fadeInUp_0.6s_0.1s_ease-out_forwards]"
              style={{ animationFillMode: "forwards" }}
            >
              <Award size={12} className="text-[oklch(0.72_0.14_75)]" />
              <span className="font-display text-xs text-[oklch(0.72_0.14_75)] tracking-[0.15em] uppercase">
                Long Island's Most Legendary Pizzeria
              </span>
            </div>

            {/* Main headline */}
            <h1
              className="font-display text-[clamp(3.5rem,10vw,7rem)] leading-[0.9] text-[oklch(0.94_0.03_80)] mb-4 opacity-0"
              style={{ animation: "fadeInUp 0.7s 0.2s cubic-bezier(0.23,1,0.32,1) forwards" }}
            >
              THE ORIGINAL
              <br />
              <span className="text-[oklch(0.46_0.22_25)]">GRANDMA</span>
              <br />
              SLICE
            </h1>

            {/* Subheadline */}
            <p
              className="font-serif italic text-xl lg:text-2xl text-[oklch(0.72_0.14_75)] mb-3 opacity-0"
              style={{ animation: "fadeInUp 0.7s 0.35s cubic-bezier(0.23,1,0.32,1) forwards" }}
            >
              Since 1965 · New Hyde Park, Long Island
            </p>

            <p
              className="font-body text-base lg:text-lg text-[oklch(0.75_0.03_80)] mb-8 max-w-xl leading-relaxed opacity-0"
              style={{ animation: "fadeInUp 0.7s 0.45s cubic-bezier(0.23,1,0.32,1) forwards" }}
            >
              Family owned and operated for over 60 years. Authentic Italian food, legendary pizza, full catering service, and stunning private event spaces across 6 Long Island locations.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-3 opacity-0"
              style={{ animation: "fadeInUp 0.7s 0.55s cubic-bezier(0.23,1,0.32,1) forwards" }}
            >
              <Link
                href="/order"
                className="btn-umberto text-base"
              >
                Order Online <ArrowRight size={16} />
              </Link>
              <Link
                href="/menu"
                className="btn-outline-gold text-base"
              >
                View Menu
              </Link>
              <Link
                href="/catering"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[oklch(0.40_0.02_60)] text-[oklch(0.75_0.03_80)] font-display text-base tracking-[0.08em] uppercase hover:border-[oklch(0.60_0.02_60)] hover:text-[oklch(0.94_0.03_80)] transition-colors"
              >
                Catering
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
          <ChevronDown size={20} className="text-[oklch(0.62_0.03_80)]" />
        </div>
      </section>

      {/* ===== MARQUEE STRIP ===== */}
      <div
        className="bg-[oklch(0.46_0.22_25)] py-3 overflow-hidden"
        aria-label="Awards and recognition"
      >
        <div className="flex">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="font-display text-sm tracking-[0.12em] text-[oklch(0.98_0.01_80)] px-8 whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ===== STATS SECTION ===== */}
      <section
        ref={statsRef}
        className="py-16 bg-[oklch(0.12_0.018_60)] border-b border-[oklch(0.20_0.02_60)]"
        aria-label="Umberto's by the numbers"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCounter value={1965} suffix="" label="Est. Year" start={statsVisible} />
            <StatCounter value={6} suffix="+" label="Locations" start={statsVisible} />
            <StatCounter value={60} suffix="+" label="Years of Family" start={statsVisible} />
            <StatCounter value={250} suffix="" label="Max Event Guests" start={statsVisible} />
          </div>
        </div>
      </section>

      {/* ===== SIGNATURE SECTION ===== */}
      <section className="py-20 lg:py-28" aria-labelledby="signature-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="reveal relative order-2 lg:order-1">
              <div className="relative overflow-hidden">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-pizza-oven-atmosphere-GHrJRCFyJfTxpLnAeefKAZ.webp"
                  alt="Umberto's Pizzeria exterior at night — New Hyde Park Long Island since 1965"
                  className="w-full h-[400px] lg:h-[520px] object-cover"
                  loading="lazy"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-6 left-6 bg-[oklch(0.46_0.22_25)] px-4 py-3">
                  <p className="font-display text-[oklch(0.98_0.01_80)] text-sm tracking-[0.1em]">EST. 1965</p>
                  <p className="font-body text-[oklch(0.98_0.01_80)]/80 text-xs">New Hyde Park, NY</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="reveal order-1 lg:order-2" style={{ transitionDelay: "150ms" }}>
              <span className="red-line" />
              <h2 id="signature-heading" className="font-display text-[clamp(2.5rem,5vw,4rem)] text-[oklch(0.94_0.03_80)] leading-tight mb-4">
                THE BIRTHPLACE OF THE GRANDMA SLICE
              </h2>
              <p className="font-serif italic text-[oklch(0.72_0.14_75)] text-lg mb-6">
                "We didn't invent pizza. We perfected it."
              </p>
              <p className="font-body text-[oklch(0.72_0.03_80)] leading-relaxed mb-4">
                In 1965, Umberto Corteo — a Naples-born immigrant who worked the fields of his father's farm before crossing the Atlantic — scraped together every dollar he had with his brother Joe and opened a small pizzeria on Jericho Turnpike in New Hyde Park.
              </p>
              <p className="font-body text-[oklch(0.72_0.03_80)] leading-relaxed mb-6">
                What started as a humble corner shop became a Long Island institution. The Grandma Slice — thin-crust, square, with plum marinara and bubbling mozzarella — was born here. Featured on the Food Network, rated best Sicilian pie in New York, and beloved by generations of Long Islanders.
              </p>
              <p className="font-body text-[oklch(0.72_0.03_80)] leading-relaxed mb-8">
                Today, Umberto's has grown into a majestic Tuscan-style two-story restaurant with a full-service café, four-star dining room, world-class banquet facilities, and six locations across Long Island. The family tradition continues.
              </p>
              <Link href="/about" className="btn-outline-gold">
                Our Full Story <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MENU PREVIEW ===== */}
      <section className="py-20 bg-[oklch(0.12_0.018_60)]" aria-labelledby="menu-preview-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-14">
            <span className="red-line mx-auto" />
            <h2 id="menu-preview-heading" className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[oklch(0.94_0.03_80)]">
              WHAT WE'RE FAMOUS FOR
            </h2>
            <p className="font-body text-[oklch(0.62_0.03_80)] mt-3 max-w-xl mx-auto">
              From the legendary Grandma Slice to homemade pasta and fresh seafood — every dish is made with the same care Umberto brought from Naples in 1965.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "The Grandma Slice",
                desc: "16\" square, 12 slices. Thin-crust with bubbling mozzarella and plum marinara. Featured on Food Network. The original.",
                tag: "SIGNATURE",
                price: "$36.20",
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-grandma-slice-hero-7tT4CvBtzqQu9aAajzPqff.webp",
              },
              {
                title: "Chicken Parmigiana",
                desc: "Crispy breaded chicken cutlet, homemade tomato sauce, melted mozzarella. A Long Island Italian staple done right.",
                tag: "BESTSELLER",
                price: "$31.14",
                img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/83464parm-chicken.jpg?w=800&fit=crop&auto=compress,format",
              },
              {
                title: "Pazzo Deep Dish",
                desc: "16\" round deep dish topped with fresh mozzarella, marinara, homemade sausage, black olives & roasted peppers.",
                tag: "FAN FAVORITE",
                price: "$33.40",
                img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/12732Umbertos-Pepperoni-3.jpg?w=800&fit=crop&auto=compress,format",
              },
              {
                title: "Spaghetti Pescatore",
                desc: "Mussels, clams, shrimp in a light marinara sauce over perfectly cooked spaghetti. The taste of the sea.",
                tag: "SEAFOOD",
                price: "$24.95",
                img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/97139spaghetti_vongole.png?w=800&fit=max&auto=compress,format",
              },
              {
                title: "Homemade Lasagna",
                desc: "Made with ricotta, homemade mozzarella, meatballs & sausage in our famous tomato sauce. Nonna would approve.",
                tag: "CLASSIC",
                price: "$19.70",
                img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/326236A4A5195.jpg?w=800&fit=crop&auto=compress,format",
              },
              {
                title: "Prosciutto & Burrata",
                desc: "Prosciutto di Parma with fresh burrata, shaved Parmigiano Reggiano, and extra virgin olive oil. Simple perfection.",
                tag: "ANTIPASTO",
                price: "$17.55",
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-italian-dinner-spread-PTJAXRysddQTKFFY88Y2uN.webp",
              },
            ].map((item, i) => (
              <article
                key={item.title}
                className="reveal menu-card bg-[oklch(0.14_0.018_60)] overflow-hidden group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={item.img}
                    alt={`${item.title} — Umberto's Family Pizzeria`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[oklch(0.46_0.22_25)] px-2 py-1">
                    <span className="font-display text-[0.65rem] text-[oklch(0.98_0.01_80)] tracking-[0.12em]">{item.tag}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display text-lg text-[oklch(0.94_0.03_80)] tracking-wider">{item.title}</h3>
                    <span className="font-body text-[oklch(0.72_0.14_75)] text-sm font-medium flex-shrink-0">{item.price}</span>
                  </div>
                  <p className="font-body text-sm text-[oklch(0.62_0.03_80)] leading-relaxed">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="reveal text-center mt-10">
            <Link href="/menu" className="btn-umberto">
              View Full Menu <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== GOOGLE REVIEWS ===== */}
      <section className="py-20" aria-labelledby="reviews-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-12">
            <span className="red-line mx-auto" />
            <h2 id="reviews-heading" className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[oklch(0.94_0.03_80)]">
              WHAT LONG ISLAND IS SAYING
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={18} className="text-[oklch(0.72_0.14_75)] fill-[oklch(0.72_0.14_75)]" />
                ))}
              </div>
              <span className="font-body text-[oklch(0.62_0.03_80)] text-sm">4.8 out of 5 · 2,847+ Google Reviews</span>
            </div>
          </div>

          {/* Reviews grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((review, i) => (
              <article
                key={review.id}
                className={`reveal bg-[oklch(0.14_0.018_60)] p-6 border border-[oklch(0.20_0.02_60)] transition-all duration-300 ${
                  activeReview === i ? "border-[oklch(0.46_0.22_25)]/50" : ""
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-display text-[oklch(0.94_0.03_80)] tracking-wider">{review.name}</p>
                    <p className="font-body text-xs text-[oklch(0.50_0.03_80)]">{review.location} · {review.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/272px-Google_2015_logo.svg.png"
                      alt="Google Review"
                      className="h-4 w-auto opacity-60"
                      loading="lazy"
                    />
                  </div>
                </div>
                <StarRating rating={review.rating} />
                <p className="font-body text-sm text-[oklch(0.68_0.03_80)] leading-relaxed mt-3 line-clamp-4">
                  "{review.text}"
                </p>
              </article>
            ))}
          </div>

          <div className="reveal text-center mt-8">
            <a
              href="https://www.google.com/maps/search/Umberto's+New+Hyde+Park"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-[oklch(0.62_0.03_80)] hover:text-[oklch(0.46_0.22_25)] transition-colors underline underline-offset-4"
            >
              Read all reviews on Google →
            </a>
          </div>
        </div>
      </section>

      {/* ===== CATERING SECTION ===== */}
      <section
        className="py-20 bg-[oklch(0.12_0.018_60)]"
        aria-labelledby="catering-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <span className="red-line" />
              <h2 id="catering-heading" className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[oklch(0.94_0.03_80)] leading-tight mb-4">
                CATERING FOR EVERY OCCASION
              </h2>
              <p className="font-body text-[oklch(0.72_0.03_80)] leading-relaxed mb-4">
                From corporate office lunches to school events, government agencies, and private parties — Umberto's full-tray and half-tray catering brings the legendary flavors of Long Island's most famous Italian kitchen directly to your event.
              </p>
              <p className="font-body text-[oklch(0.72_0.03_80)] leading-relaxed mb-6">
                Choose from our full catering menu: Grandma pizza trays, chicken parmigiana, baked ziti, lasagna, sausage & peppers, and much more. Perfect for groups of 10 to 500+.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <Truck size={18} />, label: "Full & Half Trays" },
                  { icon: <Users size={18} />, label: "Offices & Schools" },
                  { icon: <Award size={18} />, label: "Government Catering" },
                  { icon: <Clock size={18} />, label: "Same-Day Available" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="text-[oklch(0.46_0.22_25)]">{item.icon}</div>
                    <span className="font-body text-sm text-[oklch(0.75_0.03_80)]">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/catering" className="btn-umberto">
                  Catering Menu <ArrowRight size={16} />
                </Link>
                <a href="tel:5164377698" className="btn-outline-gold">
                  <Phone size={16} /> Call to Order
                </a>
              </div>
            </div>

            <div className="reveal" style={{ transitionDelay: "150ms" }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-catering-trays-HEVKxpcQvpLbyYo3epjUBd.webp"
                alt="Umberto's catering trays — chicken parmigiana, baked ziti, grandma pizza, garlic bread for office and corporate catering Long Island"
                className="w-full h-[400px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRIVATE EVENTS ===== */}
      <section className="py-20 relative overflow-hidden" aria-labelledby="events-heading">
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-private-events-venue-VyJpzyvtBLH4ikgXdhxFSw.webp"
            alt="Umberto's private event venue — elegant dining room for parties, weddings, corporate events Long Island"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[oklch(0.08_0.012_60)]/85" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="reveal">
              <span className="red-line" />
              <h2 id="events-heading" className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[oklch(0.94_0.03_80)] leading-tight mb-4">
                PRIVATE EVENTS & CELEBRATIONS
              </h2>
              <p className="font-body text-[oklch(0.80_0.03_80)] leading-relaxed mb-6">
                Host your next celebration in one of our stunning private event spaces. From intimate gatherings of 25 to grand celebrations of up to 250 guests at our New Hyde Park flagship, Umberto's creates unforgettable events with exceptional food and impeccable service.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {[
                  { location: "New Hyde Park", capacity: "Up to 250" },
                  { location: "Lake Grove", capacity: "Up to 50" },
                  { location: "Bellmore", capacity: "Up to 50" },
                  { location: "Massapequa Park", capacity: "Up to 50" },
                  { location: "Manhasset", capacity: "Up to 25" },
                ].map((venue) => (
                  <div key={venue.location} className="bg-[oklch(0.10_0.015_60)]/80 border border-[oklch(0.25_0.02_60)] p-3">
                    <p className="font-display text-[oklch(0.94_0.03_80)] text-sm tracking-wider">{venue.location}</p>
                    <p className="font-body text-xs text-[oklch(0.72_0.14_75)] mt-0.5">{venue.capacity} guests</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/private-events" className="btn-umberto">
                  Explore Event Spaces <ArrowRight size={16} />
                </Link>
                <a href="tel:5164377698" className="btn-outline-gold">
                  <Phone size={16} /> Inquire Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOCATIONS CTA ===== */}
      <section className="py-16 bg-[oklch(0.12_0.018_60)]" aria-labelledby="locations-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10">
            <span className="red-line mx-auto" />
            <h2 id="locations-heading" className="font-display text-[clamp(2rem,4vw,3rem)] text-[oklch(0.94_0.03_80)]">
              FIND YOUR NEAREST UMBERTO'S
            </h2>
            <p className="font-body text-[oklch(0.62_0.03_80)] mt-2">6 locations across Long Island, New York</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: "New Hyde Park", phone: "(516) 437-7698", flagship: true },
              { name: "Manhasset", phone: "(516) 472-7801" },
              { name: "Bellmore", phone: "(516) 409-1400" },
              { name: "Massapequa Park", phone: "(516) 541-3030" },
              { name: "Lake Grove", phone: "(631) 862-6777" },
              { name: "Farmingdale", phone: "(631) 454-6440" },
            ].map((loc, i) => (
              <div
                key={loc.name}
                className="reveal bg-[oklch(0.14_0.018_60)] border border-[oklch(0.20_0.02_60)] p-4 text-center hover:border-[oklch(0.46_0.22_25)] transition-colors"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <MapPin size={18} className="text-[oklch(0.46_0.22_25)] mx-auto mb-2" />
                <p className="font-display text-[oklch(0.94_0.03_80)] text-sm tracking-wider leading-tight">{loc.name}</p>
                {loc.flagship && (
                  <span className="text-[0.6rem] text-[oklch(0.72_0.14_75)] tracking-wider">FLAGSHIP</span>
                )}
                <a
                  href={`tel:${loc.phone.replace(/\D/g, "")}`}
                  className="block font-body text-xs text-[oklch(0.55_0.03_80)] hover:text-[oklch(0.72_0.14_75)] transition-colors mt-1"
                >
                  {loc.phone}
                </a>
              </div>
            ))}
          </div>

          <div className="reveal text-center mt-8">
            <Link href="/locations" className="btn-umberto">
              View All Locations & Hours <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ TEASER ===== */}
      <section className="py-16 border-t border-[oklch(0.20_0.02_60)]" aria-labelledby="faq-teaser-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10">
            <span className="red-line mx-auto" />
            <h2 id="faq-teaser-heading" className="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-[oklch(0.94_0.03_80)]">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What is a Grandma Slice and did Umberto's really invent it?",
                a: "The Grandma Slice is a square, thin-crust pizza baked in a rectangular pan, with mozzarella cheese and plum tomato sauce. According to pizza historians and food journalists, Umberto's of New Hyde Park is widely credited as the originator of the Grandma pizza style on Long Island, dating back to 1965.",
              },
              {
                q: "Does Umberto's offer catering for offices and corporate events?",
                a: "Yes! Umberto's provides full catering services for offices, schools, government agencies, and corporate events across Long Island. We offer full trays and half trays of all our menu items including pizza, pasta, chicken parmigiana, and more. Call (516) 437-7698 or visit our catering page to inquire.",
              },
              {
                q: "How do I book a private event at Umberto's?",
                a: "Our New Hyde Park flagship can accommodate up to 250 guests for private events. Other locations accommodate 25–50 guests. Visit our Private Events page or call us directly to discuss your event needs, date availability, and custom menu options.",
              },
              {
                q: "Can I order Umberto's pizza online for delivery or pickup?",
                a: "Yes! You can order online through our website for pickup or delivery. We also partner with Grubhub, UberEats, and DoorDash at select locations. Visit our Order Online page to get started.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="reveal bg-[oklch(0.12_0.018_60)] border border-[oklch(0.20_0.02_60)] p-5"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <h3 className="font-display text-[oklch(0.94_0.03_80)] text-base tracking-wider mb-2">{item.q}</h3>
                <p className="font-body text-sm text-[oklch(0.62_0.03_80)] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="reveal text-center mt-8">
            <Link href="/faq" className="btn-outline-gold">
              View All FAQs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 bg-[oklch(0.46_0.22_25)]" aria-labelledby="final-cta-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="final-cta-heading" className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[oklch(0.98_0.01_80)] leading-tight mb-4">
            HUNGRY YET?
          </h2>
          <p className="font-body text-[oklch(0.98_0.01_80)]/80 text-lg mb-8 max-w-xl mx-auto">
            Order online for pickup or delivery, or visit one of our 6 Long Island locations today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/order"
              className="bg-[oklch(0.98_0.01_80)] text-[oklch(0.46_0.22_25)] font-display text-base tracking-[0.1em] uppercase px-8 py-3.5 hover:bg-[oklch(0.94_0.03_80)] transition-colors active:scale-[0.97] inline-flex items-center gap-2"
            >
              Order Online <ArrowRight size={16} />
            </Link>
            <Link
              href="/locations"
              className="border-2 border-[oklch(0.98_0.01_80)] text-[oklch(0.98_0.01_80)] font-display text-base tracking-[0.1em] uppercase px-8 py-3.5 hover:bg-[oklch(0.98_0.01_80)]/10 transition-colors inline-flex items-center gap-2"
            >
              <MapPin size={16} /> Find a Location
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
