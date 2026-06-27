/*
 * Home Page — Umberto's Family Pizzeria v2
 * Design: "Warm Italian Trattoria" — light cream background, bold red accents
 * Sections: Hero Slider, Marquee, Stats, Signature, Menu Preview, Reviews, Catering, Events, Zip Finder, FAQ, CTA
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Star, MapPin, Phone, ChevronDown, Award, Clock, Truck, Users, Search, Gamepad2 } from "lucide-react";

// Hero slides — real Umberto's food photos
const heroSlides = [
  {
    img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/292661U1A6384.jpg?w=1400&fit=crop&auto=compress,format",
    tag: "The Original",
    headline: "GRANDMA\nSLICE",
    sub: "Invented here. Perfected since 1965.",
    cta: { label: "Order Now", href: "/order" },
  },
  {
    img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/83464parm-chicken.jpg?w=1400&fit=crop&auto=compress,format",
    tag: "Long Island's Best",
    headline: "CHICKEN\nPARMIGIANA",
    sub: "Crispy, saucy, legendary. A Long Island staple.",
    cta: { label: "View Menu", href: "/menu" },
  },
  {
    img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/12732Umbertos-Pepperoni-3.jpg?w=1400&fit=crop&auto=compress,format",
    tag: "Fan Favorite",
    headline: "PAZZO\nDEEP DISH",
    sub: "Fresh mozzarella, sausage, olives & roasted peppers.",
    cta: { label: "Order Now", href: "/order" },
  },
  {
    img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/97139spaghetti_vongole.png?w=1400&fit=max&auto=compress,format",
    tag: "Fresh Seafood",
    headline: "SPAGHETTI\nPESCATORE",
    sub: "Mussels, clams & shrimp in light marinara.",
    cta: { label: "View Menu", href: "/menu" },
  },
  {
    img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/326236A4A5195.jpg?w=1400&fit=crop&auto=compress,format",
    tag: "Private Events",
    headline: "HOST YOUR\nCELEBRATION",
    sub: "Stunning venues for up to 250 guests.",
    cta: { label: "Explore Events", href: "/private-events" },
  },
];

const marqueeItems = [
  "★ Home of the Original Grandma Slice",
  "★ Featured on Food Network",
  "★ Rated Best Sicilian Pie in NY",
  "★ Family Owned Since 1965",
  "★ 6 Long Island Locations",
  "★ Full Catering Service",
  "★ Private Events Up to 250 Guests",
  "★ Nationwide Shipping via Goldbelly",
  "★ Rewards Program Available",
];

const reviews = [
  { id: 1, name: "Michael T.", rating: 5, date: "2 weeks ago", text: "The grandma slice here is absolutely legendary. I've been coming since I was a kid and nothing has changed — in the best way possible. The crust is perfectly crispy, the cheese is perfectly melted. This is what Long Island pizza is all about.", location: "New Hyde Park" },
  { id: 2, name: "Sarah K.", rating: 5, date: "1 month ago", text: "We used Umberto's for our office catering and they knocked it out of the park. The chicken parm trays were massive and delicious. Everyone was raving. Will absolutely use them again for our next event.", location: "Manhasset" },
  { id: 3, name: "Anthony R.", rating: 5, date: "3 weeks ago", text: "Had our daughter's birthday party in the private event room at New Hyde Park. The staff was incredible, the food was phenomenal, and the space looked beautiful. Umberto's made the whole night special.", location: "New Hyde Park" },
  { id: 4, name: "Jennifer M.", rating: 5, date: "1 week ago", text: "The pasta here is as good as any restaurant I've been to in Italy. The Rigatoni Umberto with calamari and shrimp is out of this world. And the Grandma pizza? Don't even get me started. Pure perfection.", location: "Bellmore" },
  { id: 5, name: "David L.", rating: 5, date: "2 months ago", text: "Been ordering from Umberto's for 20 years. The quality never drops. The Pazzo pizza is my go-to — deep dish, fresh mozzarella, sausage, olives. It's a masterpiece. This place is a Long Island institution.", location: "Massapequa Park" },
  { id: 6, name: "Lisa C.", rating: 5, date: "5 days ago", text: "Ordered the catering for a school event — full trays of baked ziti, chicken parm, and grandma pizza. The kids went absolutely crazy for it. The portions are enormous and the price is very reasonable.", location: "Lake Grove" },
];

// Zip code → nearest location lookup
const locationZips: { name: string; zips: string[]; href: string; phone: string; address: string }[] = [
  { name: "New Hyde Park", zips: ["11040","11042","11001","11003","11004","11005","11010","11020","11021","11023","11024","11030","11501","11550","11552","11553","11554","11580","11581","11596"], href: "/order", phone: "(516) 437-7698", address: "633 Jericho Turnpike" },
  { name: "Manhasset", zips: ["11030","11020","11021","11023","11024","11050","11051","11052","11053","11054","11055","11560","11576","11577"], href: "/order", phone: "(516) 472-7801", address: "1558 Northern Blvd" },
  { name: "Bellmore", zips: ["11710","11516","11518","11520","11530","11557","11561","11563","11565","11566","11568","11570","11572","11575","11598"], href: "/order", phone: "(516) 409-1400", address: "2427 Merrick Rd" },
  { name: "Massapequa Park", zips: ["11762","11758","11701","11702","11703","11704","11705","11706","11714","11730","11735","11756","11757","11763","11764","11772","11793","11795","11801","11803"], href: "/massapequa", phone: "(516) 541-3030", address: "4897 Merrick Rd" },
  { name: "Lake Grove", zips: ["11755","11720","11722","11724","11725","11726","11727","11729","11733","11738","11740","11741","11742","11743","11745","11746","11747","11749","11752","11753","11754","11760","11767","11768","11769","11770","11776","11777","11778","11779","11780","11782","11784","11787","11788","11789","11790","11791","11792","11794"], href: "/order", phone: "(631) 862-6777", address: "2192 Nesconset Hwy" },
  { name: "Farmingdale", zips: ["11735","11714","11716","11717","11718","11719","11720","11721","11722","11723","11724","11725","11726","11727","11728","11729","11730","11731","11732","11733","11734","11736","11737","11738","11739","11740","11741","11742","11743","11744","11745","11746","11747","11748","11749","11750","11751","11752","11753","11754","11755","11756","11757","11758","11759","11760","11761","11762","11763","11764","11765","11766","11767","11768","11769","11770","11771","11772","11773","11774","11775","11776","11777","11778","11779","11780","11781","11782","11783","11784","11785","11786","11787","11788","11789","11790","11791","11792","11793","11794","11795","11796","11797","11798","11799"], href: "/farmingdale", phone: "(631) 454-6440", address: "967 Broadhollow Rd" },
];

function findNearestLocation(zip: string) {
  const trimmed = zip.trim();
  for (const loc of locationZips) {
    if (loc.zips.includes(trimmed)) return loc;
  }
  return null;
}

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
      <div className="font-display text-5xl lg:text-6xl text-[oklch(0.46_0.22_25)]">{count.toLocaleString()}{suffix}</div>
      <div className="font-body text-xs text-[oklch(0.48_0.03_60)] mt-1 tracking-wider uppercase">{label}</div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((i) => (
        <Star key={i} size={13} className={i <= rating ? "text-[oklch(0.68_0.13_75)] fill-[oklch(0.68_0.13_75)]" : "text-[oklch(0.80_0.015_80)]"} />
      ))}
    </div>
  );
}

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideDir, setSlideDir] = useState<"next" | "prev">("next");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [zipInput, setZipInput] = useState("");
  const [zipResult, setZipResult] = useState<typeof locationZips[0] | null | "notfound">(null);

  // Auto-advance hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideDir("next");
      setIsTransitioning(true);
      setTimeout(() => {
        setSlideIndex((prev) => (prev + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, 400);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goSlide = (dir: "next" | "prev") => {
    if (isTransitioning) return;
    setSlideDir(dir);
    setIsTransitioning(true);
    setTimeout(() => {
      setSlideIndex((prev) => dir === "next" ? (prev + 1) % heroSlides.length : (prev - 1 + heroSlides.length) % heroSlides.length);
      setIsTransitioning(false);
    }, 350);
  };

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Stats trigger
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStatsVisible(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleZipSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const result = findNearestLocation(zipInput);
    setZipResult(result ?? "notfound");
  };

  const slide = heroSlides[slideIndex];

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)]">
      <Navigation />

      {/* ===== HERO SLIDER ===== */}
      <section className="relative h-[88vh] min-h-[560px] max-h-[820px] overflow-hidden" aria-label="Umberto's Family Pizzeria — Home of the Original Grandma Slice">
        {/* Slide images */}
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: i === slideIndex ? 1 : 0, zIndex: i === slideIndex ? 1 : 0 }}
          >
            <img src={s.img} alt={s.headline.replace("\n", " ")} className="w-full h-full object-cover" loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <div
                key={`tag-${slideIndex}`}
                className="inline-flex items-center gap-2 border border-[oklch(0.68_0.13_75)] px-3 py-1.5 mb-5"
                style={{ animation: "fadeInUp 0.5s 0.05s ease-out forwards", opacity: 0 }}
              >
                <Award size={11} className="text-[oklch(0.68_0.13_75)]" />
                <span className="font-display text-xs text-[oklch(0.68_0.13_75)] tracking-[0.18em] uppercase">{slide.tag}</span>
              </div>

              <h1
                key={`h-${slideIndex}`}
                className="font-display text-[clamp(3.5rem,9vw,7rem)] leading-[0.88] text-white mb-4"
                style={{ animation: "fadeInUp 0.55s 0.12s cubic-bezier(0.23,1,0.32,1) forwards", opacity: 0 }}
              >
                {slide.headline.split("\n").map((line, i) => (
                  <span key={i} className={i === 0 ? "block" : "block text-[oklch(0.46_0.22_25)]"}>{line}</span>
                ))}
              </h1>

              <p
                key={`sub-${slideIndex}`}
                className="font-serif italic text-lg text-white/80 mb-8"
                style={{ animation: "fadeInUp 0.55s 0.22s cubic-bezier(0.23,1,0.32,1) forwards", opacity: 0 }}
              >
                {slide.sub}
              </p>

              <div
                key={`cta-${slideIndex}`}
                className="flex flex-wrap gap-3"
                style={{ animation: "fadeInUp 0.55s 0.32s cubic-bezier(0.23,1,0.32,1) forwards", opacity: 0 }}
              >
                <Link href={slide.cta.href} className="btn-red text-sm">{slide.cta.label} <ArrowRight size={15} /></Link>
                <Link href="/menu" className="inline-flex items-center gap-2 px-5 py-3 border-2 border-white/60 text-white font-display text-sm tracking-[0.1em] uppercase hover:border-white hover:bg-white/10 transition-all">View Full Menu</Link>
                <Link href="/catering" className="inline-flex items-center gap-2 px-5 py-3 border-2 border-white/40 text-white/80 font-display text-sm tracking-[0.1em] uppercase hover:border-white/70 hover:text-white transition-all">Catering</Link>
              </div>
            </div>
          </div>
        </div>


        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => { setSlideIndex(i); }} className={`transition-all duration-300 ${i === slideIndex ? "w-8 h-2 bg-[oklch(0.46_0.22_25)]" : "w-2 h-2 bg-white/50 hover:bg-white/80"}`} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 right-8 z-20 flex flex-col items-center gap-1 opacity-60">
          <ChevronDown size={18} className="text-white animate-bounce" />
        </div>
      </section>

      {/* ===== RED MARQUEE ===== */}
      <div className="bg-[oklch(0.46_0.22_25)] py-3 overflow-hidden" aria-label="Awards and recognition">
        <div className="flex">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="font-display text-sm tracking-[0.12em] text-white px-8 whitespace-nowrap">{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ===== ZIP CODE FINDER ===== */}
      <section className="py-10 bg-white border-b border-[oklch(0.88_0.015_80)]" aria-labelledby="zip-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 id="zip-heading" className="font-display text-2xl text-[oklch(0.20_0.025_60)] tracking-wider mb-2">FIND YOUR NEAREST UMBERTO'S</h2>
          <p className="font-body text-sm text-[oklch(0.48_0.03_60)] mb-5">Enter your zip code to find the closest location and order directly.</p>
          <form onSubmit={handleZipSearch} className="flex gap-0 max-w-sm mx-auto">
            <input
              type="text"
              value={zipInput}
              onChange={(e) => setZipInput(e.target.value)}
              placeholder="Enter ZIP code..."
              maxLength={5}
              className="flex-1 px-4 py-3 border-2 border-[oklch(0.88_0.015_80)] border-r-0 font-body text-sm text-[oklch(0.20_0.025_60)] bg-white focus:outline-none focus:border-[oklch(0.46_0.22_25)] transition-colors"
              aria-label="ZIP code"
            />
            <button type="submit" className="px-5 py-3 bg-[oklch(0.46_0.22_25)] text-white font-display text-sm tracking-wider uppercase hover:bg-[oklch(0.55_0.22_25)] transition-colors flex items-center gap-2">
              <Search size={15} /> Find
            </button>
          </form>

          {zipResult && zipResult !== "notfound" && (
            <div className="mt-5 p-4 bg-[oklch(0.95_0.018_80)] border border-[oklch(0.88_0.015_80)] max-w-sm mx-auto text-left">
              <p className="font-display text-[oklch(0.46_0.22_25)] tracking-wider text-sm mb-1">CLOSEST LOCATION:</p>
              <p className="font-display text-lg text-[oklch(0.20_0.025_60)] tracking-wider">{zipResult.name}</p>
              <p className="font-body text-sm text-[oklch(0.48_0.03_60)]">{zipResult.address}</p>
              <p className="font-body text-sm text-[oklch(0.48_0.03_60)] mb-3">
                <a href={`tel:${zipResult.phone.replace(/\D/g,"")}`} className="text-[oklch(0.46_0.22_25)] hover:underline">{zipResult.phone}</a>
              </p>
              <Link href={zipResult.href} className="btn-red text-sm py-2.5 px-5">Order from {zipResult.name} <ArrowRight size={14} /></Link>
            </div>
          )}
          {zipResult === "notfound" && (
            <div className="mt-5 p-4 bg-[oklch(0.95_0.018_80)] border border-[oklch(0.88_0.015_80)] max-w-sm mx-auto">
              <p className="font-body text-sm text-[oklch(0.48_0.03_60)]">We don't have a location near that zip code yet. <Link href="/locations" className="text-[oklch(0.46_0.22_25)] underline">View all locations</Link> or call us at <a href="tel:5164377698" className="text-[oklch(0.46_0.22_25)] underline">(516) 437-7698</a>.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section ref={statsRef} className="py-14 bg-[oklch(0.95_0.018_80)] border-b border-[oklch(0.88_0.015_80)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCounter value={1965} suffix="" label="Est. Year" start={statsVisible} />
            <StatCounter value={6} suffix="+" label="Locations" start={statsVisible} />
            <StatCounter value={60} suffix="+" label="Years of Family" start={statsVisible} />
            <StatCounter value={250} suffix="" label="Max Event Guests" start={statsVisible} />
          </div>
        </div>
      </section>

      {/* ===== SIGNATURE STORY ===== */}
      <section className="py-20 lg:py-28 bg-white" aria-labelledby="signature-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal relative order-2 lg:order-1">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/95838NHP_Location_Image.jpg?w=900&fit=max&auto=compress,format"
                  alt="Umberto's Pizzeria New Hyde Park — Family Owned Since 1965"
                  className="w-full h-[420px] lg:h-[540px] object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-6 left-6 bg-[oklch(0.46_0.22_25)] px-4 py-3">
                  <p className="font-display text-white text-sm tracking-[0.1em]">EST. 1965</p>
                  <p className="font-body text-white/80 text-xs">New Hyde Park, NY</p>
                </div>
              </div>
            </div>
            <div className="reveal order-1 lg:order-2" style={{ transitionDelay: "150ms" }}>
              <span className="section-label">Our Legacy</span>
              <span className="red-line" />
              <h2 id="signature-heading" className="font-display text-[clamp(2.2rem,5vw,3.8rem)] text-[oklch(0.20_0.025_60)] leading-tight mb-4">
                THE BIRTHPLACE OF THE GRANDMA SLICE
              </h2>
              <p className="font-serif italic text-[oklch(0.46_0.22_25)] text-lg mb-6">"We didn't invent pizza. We perfected it."</p>
              <p className="font-body text-[oklch(0.38_0.03_60)] leading-relaxed mb-4">
                In 1965, Umberto Corteo — a Naples-born immigrant — scraped together every dollar he had with his brother Joe and opened a small pizzeria on Jericho Turnpike in New Hyde Park. What started as a humble corner shop became a Long Island institution.
              </p>
              <p className="font-body text-[oklch(0.38_0.03_60)] leading-relaxed mb-8">
                The Grandma Slice — thin-crust, square, with plum marinara and bubbling mozzarella — was born here. Featured on the Food Network, rated best Sicilian pie in New York, and beloved by generations of Long Islanders across 6 locations.
              </p>
              <Link href="/about" className="btn-outline-red text-sm">Our Full Story <ArrowRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MENU PREVIEW ===== */}
      <section className="py-20 bg-[oklch(0.95_0.018_80)]" aria-labelledby="menu-preview-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-12">
            <span className="section-label">What We're Famous For</span>
            <span className="red-line mx-auto" />
            <h2 id="menu-preview-heading" className="font-display text-[clamp(2rem,4vw,3.2rem)] text-[oklch(0.20_0.025_60)]">LEGENDARY DISHES</h2>
            <p className="font-body text-[oklch(0.48_0.03_60)] mt-3 max-w-xl mx-auto text-sm">Every dish made with the same care Umberto brought from Naples in 1965.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "The Grandma Slice", desc: "16\" square, 12 slices. Featured on the Food Network. Thin-crust with mozzarella & plum marinara. The original.", tag: "SIGNATURE", price: "$36.20", img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/292661U1A6384.jpg?w=600&fit=crop&auto=compress,format" },
              { title: "Chicken Parmigiana", desc: "Crispy breaded chicken cutlet, homemade tomato sauce, melted mozzarella. Served with pasta, salad or fries.", tag: "BESTSELLER", price: "$25.95", img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/83464parm-chicken.jpg?w=600&fit=crop&auto=compress,format" },
              { title: "Pazzo Deep Dish", desc: "16\" pan pizza, 8 slices. Fresh mozzarella, marinara, homemade sausage, black olives & roasted peppers.", tag: "FAN FAVORITE", price: "$33.40", img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/12732Umbertos-Pepperoni-3.jpg?w=600&fit=crop&auto=compress,format" },
              { title: "Spaghetti Pescatore", desc: "Mussels, clams & shrimp in a light marinara sauce over perfectly cooked spaghetti.", tag: "SEAFOOD", price: "$25.95", img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/97139spaghetti_vongole.png?w=600&fit=max&auto=compress,format" },
              { title: "Homemade Lasagna", desc: "Made with ricotta, homemade mozzarella, meatballs & sausage in our famous tomato sauce.", tag: "CLASSIC", price: "$20.95", img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/326236A4A5195.jpg?w=600&fit=crop&auto=compress,format" },
              { title: "Rigatoni Umberto", desc: "Calamari, shrimp, clams, fresh plum tomatoes & cherry peppers in garlic & oil. Named after the founder.", tag: "HOUSE SPECIAL", price: "$26.95", img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/36275067_6A4A2737.jpg?w=600&fit=crop&auto=compress,format" },
            ].map((item, i) => (
              <article key={item.title} className="reveal menu-card overflow-hidden group" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="relative overflow-hidden h-48">
                  <img src={item.img} alt={`${item.title} — Umberto's Family Pizzeria`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute top-3 left-3 bg-[oklch(0.46_0.22_25)] px-2 py-1">
                    <span className="font-display text-[0.6rem] text-white tracking-[0.12em]">{item.tag}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display text-base text-[oklch(0.20_0.025_60)] tracking-wider">{item.title}</h3>
                    <span className="font-body text-[oklch(0.46_0.22_25)] text-sm font-semibold flex-shrink-0">{item.price}</span>
                  </div>
                  <p className="font-body text-xs text-[oklch(0.48_0.03_60)] leading-relaxed">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="reveal text-center mt-10">
            <Link href="/menu" className="btn-red">View Full Menu <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* ===== PIZZA GAME TEASER ===== */}
      <section className="py-16 bg-[oklch(0.46_0.22_25)]" aria-labelledby="game-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="reveal">
            <Gamepad2 size={40} className="text-white/80 mx-auto mb-4" />
            <h2 id="game-heading" className="font-display text-[clamp(2rem,5vw,3.5rem)] text-white leading-tight mb-3">
              PLAY THE PIZZA ARCADE GAME!
            </h2>
            <p className="font-body text-white/80 text-base mb-6 max-w-lg mx-auto">
              Help our pizza kid catch falling slices before they hit the floor! Earn a discount code when you beat the high score. 🍕
            </p>
            <Link href="/arcade" className="btn-white text-sm">
              Play Now <Gamepad2 size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section className="py-20 bg-white" aria-labelledby="reviews-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-12">
            <span className="section-label">Google Reviews</span>
            <span className="red-line mx-auto" />
            <h2 id="reviews-heading" className="font-display text-[clamp(2rem,4vw,3.2rem)] text-[oklch(0.20_0.025_60)]">WHAT LONG ISLAND IS SAYING</h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-[oklch(0.68_0.13_75)] fill-[oklch(0.68_0.13_75)]" />)}</div>
              <span className="font-body text-[oklch(0.48_0.03_60)] text-sm">4.8 out of 5 · 2,847+ Google Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((review, i) => (
              <article key={review.id} className="reveal bg-[oklch(0.97_0.015_80)] border border-[oklch(0.88_0.015_80)] p-6 hover:border-[oklch(0.46_0.22_25)]/40 hover:shadow-md transition-all" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-sm">{review.name}</p>
                    <p className="font-body text-xs text-[oklch(0.55_0.03_60)]">{review.location} · {review.date}</p>
                  </div>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/272px-Google_2015_logo.svg.png" alt="Google Review" className="h-4 w-auto opacity-50" loading="lazy" />
                </div>
                <StarRating rating={review.rating} />
                <p className="font-body text-sm text-[oklch(0.38_0.03_60)] leading-relaxed mt-3 line-clamp-4">"{review.text}"</p>
              </article>
            ))}
          </div>

          <div className="reveal text-center mt-8">
            <a href="https://www.google.com/maps/search/Umberto's+New+Hyde+Park" target="_blank" rel="noopener noreferrer"
              className="font-body text-sm text-[oklch(0.46_0.22_25)] hover:underline underline-offset-4">
              Read all reviews on Google →
            </a>
          </div>
        </div>
      </section>

      {/* ===== CATERING ===== */}
      <section className="py-20 bg-[oklch(0.95_0.018_80)]" aria-labelledby="catering-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <span className="section-label">Catering Services</span>
              <span className="red-line" />
              <h2 id="catering-heading" className="font-display text-[clamp(2rem,4vw,3.2rem)] text-[oklch(0.20_0.025_60)] leading-tight mb-4">
                CATERING FOR EVERY OCCASION
              </h2>
              <p className="font-body text-[oklch(0.38_0.03_60)] leading-relaxed mb-4">
                From corporate office lunches to school events, government agencies, and private parties — Umberto's full-tray and half-tray catering brings the legendary flavors of Long Island's most famous Italian kitchen directly to your event.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: <Truck size={16} />, label: "Full & Half Trays" },
                  { icon: <Users size={16} />, label: "Offices & Schools" },
                  { icon: <Award size={16} />, label: "Government Catering" },
                  { icon: <Clock size={16} />, label: "Same-Day Available" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5 bg-white p-3 border border-[oklch(0.88_0.015_80)]">
                    <div className="text-[oklch(0.46_0.22_25)]">{item.icon}</div>
                    <span className="font-body text-sm text-[oklch(0.28_0.025_60)]">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/catering" className="btn-red text-sm">Catering Menu <ArrowRight size={15} /></Link>
                <span className="btn-outline-red text-sm" onClick={() => window.location.href='tel:5164377698'} role="button"><Phone size={15} /> Call to Order</span>
              </div>
            </div>

            <div className="reveal grid grid-cols-2 gap-3" style={{ transitionDelay: "150ms" }}>
              {[
                "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/292661U1A6384.jpg?w=500&fit=crop&auto=compress,format",
                "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/83464parm-chicken.jpg?w=500&fit=crop&auto=compress,format",
                "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/326236A4A5195.jpg?w=500&fit=crop&auto=compress,format",
                "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/36275067_6A4A2737.jpg?w=500&fit=crop&auto=compress,format",
              ].map((src, i) => (
                <img key={i} src={src} alt="Umberto's catering tray" className="w-full h-36 object-cover" loading="lazy" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRIVATE EVENTS ===== */}
      <section className="py-20 relative overflow-hidden" aria-labelledby="events-heading">
        <div className="absolute inset-0">
          <img src="https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/52461Private_Party_Image_2.jpg?w=1400&fit=max&auto=compress,format" alt="Umberto's private event venue" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-[oklch(0.12_0.02_60)]/82" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="reveal">
              <span className="section-label text-[oklch(0.68_0.13_75)]">Private Events</span>
              <span className="red-line" />
              <h2 id="events-heading" className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-tight mb-4">
                PRIVATE EVENTS & CELEBRATIONS
              </h2>
              <p className="font-body text-white/80 leading-relaxed mb-5">
                Birthdays · Graduations · Bar & Bat Mitzvahs · Sweet 16s · Baby Showers · Corporate Events · Holiday Parties · Weddings · Anniversaries
              </p>
              <p className="font-body text-white/70 leading-relaxed mb-6">
                From intimate gatherings of 25 to grand celebrations of up to 250 guests at our New Hyde Park flagship — Umberto's creates unforgettable events with exceptional food and impeccable service.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {[
                  { location: "New Hyde Park", capacity: "Up to 250" },
                  { location: "Bellmore", capacity: "Up to 50" },
                  { location: "Farmingdale", capacity: "Up to 50" },
                  { location: "Lake Grove", capacity: "Up to 50" },
                  { location: "Manhasset", capacity: "Up to 25" },
                  { location: "Massapequa Park", capacity: "Up to 50" },
                ].map((venue) => (
                  <div key={venue.location} className="bg-white/10 border border-white/20 p-3 backdrop-blur-sm">
                    <p className="font-display text-white text-sm tracking-wider">{venue.location}</p>
                    <p className="font-body text-xs text-[oklch(0.68_0.13_75)] mt-0.5">{venue.capacity} guests</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/private-events" className="btn-red text-sm">Explore Event Spaces <ArrowRight size={15} /></Link>
                <span className="btn-white text-sm" onClick={() => window.location.href='tel:5164377698'} role="button"><Phone size={15} /> Inquire Now</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SHIPPING NATIONWIDE ===== */}
      <section className="py-16 bg-white border-t border-[oklch(0.88_0.015_80)]" aria-labelledby="shipping-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <span className="section-label">Nationwide Shipping</span>
              <span className="red-line" />
              <h2 id="shipping-heading" className="font-display text-[clamp(2rem,4vw,3rem)] text-[oklch(0.20_0.025_60)] leading-tight mb-4">
                SHIP UMBERTO'S ANYWHERE IN THE U.S.
              </h2>
              <p className="font-body text-[oklch(0.38_0.03_60)] leading-relaxed mb-4">
                Can't make it to Long Island? No problem. We ship our legendary pies fresh anywhere in the U.S. and most of Canada via Goldbelly — free shipping included.
              </p>
              <p className="font-body text-[oklch(0.38_0.03_60)] leading-relaxed mb-6">
                Whether you're in California, Texas, or Florida — a hot, crispy, crunchy Umberto's pie is just a click away. The taste of 1965, delivered to your door.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.goldbelly.com/restaurants/umbertos-pizzeria/?utm_source=partner&utm_medium=website&utm_term=2702" target="_blank" rel="noopener noreferrer" className="btn-red text-sm">Order on Goldbelly <ArrowRight size={15} /></a>
                <Link href="/shipping" className="btn-outline-red text-sm">Learn More</Link>
              </div>
            </div>
            <div className="reveal grid grid-cols-3 gap-2" style={{ transitionDelay: "150ms" }}>
              {[
                "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/366831U1A6381.jpg?w=400&fit=crop&auto=compress,format",
                "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/398211U1A6398.jpg?w=400&fit=crop&auto=compress,format",
                "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/573771U1A6374.jpg?w=400&fit=crop&auto=compress,format",
                "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/7096Umbertos-Pepperoni-4.jpg?w=400&fit=crop&auto=compress,format",
                "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/97201Umbertos-Meatball-3.jpg?w=400&fit=crop&auto=compress,format",
                "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/91943Umbertos-Classic-5.jpg?w=400&fit=crop&auto=compress,format",
              ].map((src, i) => (
                <img key={i} src={src} alt="Umberto's pizza for nationwide shipping" className="w-full h-28 object-cover" loading="lazy" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOCATIONS GRID ===== */}
      <section className="py-16 bg-[oklch(0.95_0.018_80)]" aria-labelledby="locations-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10">
            <span className="section-label">Find Us</span>
            <span className="red-line mx-auto" />
            <h2 id="locations-heading" className="font-display text-[clamp(2rem,4vw,3rem)] text-[oklch(0.20_0.025_60)]">6 LONG ISLAND LOCATIONS</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: "New Hyde Park", phone: "(516) 437-7698", flagship: true, href: "/locations" },
              { name: "Manhasset", phone: "(516) 472-7801", href: "/locations" },
              { name: "Bellmore", phone: "(516) 409-1400", href: "/locations" },
              { name: "Massapequa Park", phone: "(516) 541-3030", href: "/massapequa", special: true },
              { name: "Lake Grove", phone: "(631) 862-6777", href: "/locations" },
              { name: "Farmingdale", phone: "(631) 454-6440", href: "/farmingdale", special: true },
            ].map((loc, i) => (
              <Link key={loc.name} href={loc.href}
                className={`reveal location-card p-4 text-center block ${loc.special ? "ring-2 ring-[oklch(0.68_0.13_75)]" : ""}`}
                style={{ transitionDelay: `${i * 50}ms` }}>
                <MapPin size={18} className="text-[oklch(0.46_0.22_25)] mx-auto mb-2" />
                <p className="font-display text-[oklch(0.20_0.025_60)] text-sm tracking-wider leading-tight">{loc.name}</p>
                {loc.flagship && <span className="text-[0.6rem] text-[oklch(0.46_0.22_25)] tracking-wider">FLAGSHIP</span>}
                {loc.special && <span className="block text-[0.6rem] text-[oklch(0.68_0.13_75)] tracking-wider font-display mt-0.5">★ EXCLUSIVE DEALS</span>}
                <span className="block font-body text-xs text-[oklch(0.55_0.03_60)] mt-1">{loc.phone}</span>
              </Link>
            ))}
          </div>
          <div className="reveal text-center mt-8">
            <Link href="/locations" className="btn-red text-sm">View All Locations & Hours <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ TEASER ===== */}
      <section className="py-16 bg-white border-t border-[oklch(0.88_0.015_80)]" aria-labelledby="faq-teaser-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10">
            <span className="section-label">FAQ</span>
            <span className="red-line mx-auto" />
            <h2 id="faq-teaser-heading" className="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-[oklch(0.20_0.025_60)]">FREQUENTLY ASKED QUESTIONS</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "What is a Grandma Slice and did Umberto's really invent it?", a: "The Grandma Slice is a square, thin-crust pizza baked in a rectangular pan with mozzarella cheese and plum tomato sauce. Umberto's of New Hyde Park is widely credited as the originator of the Grandma pizza style on Long Island, dating back to 1965." },
              { q: "Does Umberto's offer catering for offices and corporate events?", a: "Yes! Umberto's provides full catering services for offices, schools, government agencies, and corporate events across Long Island. We offer full trays and half trays of all menu items. Call (516) 437-7698 or visit our catering page." },
              { q: "How do I book a private event at Umberto's?", a: "Our New Hyde Park flagship accommodates up to 250 guests. Other locations accommodate 25–50 guests. Visit our Private Events page or call us to discuss your event needs, date availability, and custom menu options." },
              { q: "Can I ship Umberto's pizza nationwide?", a: "Yes! We ship our legendary pies anywhere in the U.S. and most of Canada via Goldbelly with free shipping. Order directly through our Nationwide Shipping page." },
            ].map((item, i) => (
              <div key={i} className="reveal bg-[oklch(0.97_0.015_80)] border border-[oklch(0.88_0.015_80)] p-5 hover:border-[oklch(0.46_0.22_25)]/40 transition-colors" style={{ transitionDelay: `${i * 80}ms` }}>
                <h3 className="font-display text-[oklch(0.20_0.025_60)] text-sm tracking-wider mb-2">{item.q}</h3>
                <p className="font-body text-sm text-[oklch(0.48_0.03_60)] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
          <div className="reveal text-center mt-8">
            <Link href="/faq" className="btn-outline-red text-sm">View All FAQs <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 bg-[oklch(0.46_0.22_25)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-white leading-tight mb-4">HUNGRY YET?</h2>
          <p className="font-body text-white/80 text-lg mb-8 max-w-xl mx-auto">Order online for pickup or delivery, or visit one of our 6 Long Island locations today.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/order" className="btn-white text-sm">Order Online <ArrowRight size={15} /></Link>
            <Link href="/locations" className="inline-flex items-center gap-2 border-2 border-white text-white font-display text-sm tracking-[0.1em] uppercase px-7 py-3.5 hover:bg-white/10 transition-colors">
              <MapPin size={15} /> Find a Location
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
