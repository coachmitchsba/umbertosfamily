/*
 * Private Events Page — Umberto's Family Pizzeria
 * Design: Dark, elegant, event-focused
 * SEO: Private events, wedding venues, corporate events Long Island
 */
import { useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Phone, Users, Utensils, Music, Camera } from "lucide-react";

const venues = [
  {
    name: "New Hyde Park — Flagship",
    capacity: "Up to 250 guests",
    desc: "Our stunning two-story Tuscan-style flagship restaurant features multiple private event spaces including a grand banquet hall, private dining rooms, and a full-service café. Perfect for weddings, corporate galas, milestone birthdays, and large celebrations.",
    features: ["Grand banquet hall", "Private dining rooms", "Full bar service", "Custom menu packages", "AV equipment available", "Dedicated event coordinator"],
    phone: "(516) 437-7698",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-private-events-venue-VyJpzyvtBLH4ikgXdhxFSw.webp",
    flagship: true,
  },
  {
    name: "Lake Grove",
    capacity: "Up to 50 guests",
    desc: "Intimate private dining space perfect for smaller celebrations, team dinners, birthday parties, and corporate lunches. Full menu service with dedicated staff.",
    features: ["Private dining room", "Full menu service", "Bar service available", "Custom packages"],
    phone: "(631) 862-6777",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-italian-dinner-spread-PTJAXRysddQTKFFY88Y2uN.webp",
  },
  {
    name: "Bellmore",
    capacity: "Up to 50 guests",
    desc: "Warm and welcoming private space for intimate gatherings, family celebrations, and business events. Full Umberto's menu with personalized service.",
    features: ["Private event space", "Full menu service", "Bar service available", "Custom packages"],
    phone: "(516) 409-1400",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-italian-dinner-spread-PTJAXRysddQTKFFY88Y2uN.webp",
  },
  {
    name: "Massapequa Park",
    capacity: "Up to 50 guests",
    desc: "Elegant private dining for special occasions. Perfect for milestone birthdays, anniversaries, and intimate corporate dinners.",
    features: ["Private dining room", "Full menu service", "Bar service available", "Custom packages"],
    phone: "(516) 541-3030",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-italian-dinner-spread-PTJAXRysddQTKFFY88Y2uN.webp",
  },
  {
    name: "Manhasset",
    capacity: "Up to 25 guests",
    desc: "Cozy private dining for small groups. Ideal for intimate celebrations, business lunches, and family gatherings.",
    features: ["Private dining area", "Full menu service", "Custom packages"],
    phone: "(516) 472-7801",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-italian-dinner-spread-PTJAXRysddQTKFFY88Y2uN.webp",
  },
];

const eventTypes = [
  { icon: <Users size={24} />, title: "Weddings & Rehearsal Dinners", desc: "Celebrate your special day with Umberto's legendary Italian cuisine. Our event team handles every detail." },
  { icon: <Utensils size={24} />, title: "Corporate Events & Galas", desc: "Impress clients and colleagues with a world-class dining experience. Full AV support and custom menus available." },
  { icon: <Camera size={24} />, title: "Milestone Birthdays & Anniversaries", desc: "From 18th to 100th birthdays, we create unforgettable celebrations with personalized menus and décor." },
  { icon: <Music size={24} />, title: "Holiday Parties", desc: "Office holiday parties, family gatherings, and seasonal celebrations. Let us handle the food so you can enjoy the party." },
];

export default function PrivateEvents() {
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
      <header className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-private-events-venue-VyJpzyvtBLH4ikgXdhxFSw.webp"
            alt="Umberto's private event venue — elegant banquet hall for weddings, corporate events, and celebrations Long Island NY"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-[oklch(0.08_0.012_60)]/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block w-12 h-0.5 bg-[oklch(0.72_0.14_75)] mb-6 mx-auto" />
          <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] text-[oklch(0.94_0.03_80)] leading-tight mb-4">
            PRIVATE EVENTS
          </h1>
          <p className="font-serif italic text-[oklch(0.72_0.14_75)] text-2xl mb-4">
            Celebrate Life's Greatest Moments at Umberto's
          </p>
          <p className="font-body text-[oklch(0.80_0.03_80)] max-w-2xl mx-auto mb-8 leading-relaxed">
            From intimate gatherings of 25 to grand celebrations of 250 guests, Umberto's legendary Italian cuisine and stunning event spaces create unforgettable memories across Long Island.
          </p>
          <a href="tel:5164377698" className="btn-umberto text-base">
            <Phone size={16} /> Inquire About Your Event
          </a>
        </div>
      </header>

      {/* Event types */}
      <section className="py-16 bg-[oklch(0.12_0.018_60)]" aria-labelledby="event-types">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-12">
            <span className="inline-block w-12 h-0.5 bg-[oklch(0.46_0.22_25)] mb-4 mx-auto" />
            <h2 id="event-types" className="font-display text-[clamp(1.8rem,4vw,3rem)] text-[oklch(0.94_0.03_80)]">
              EVERY OCCASION DESERVES UMBERTO'S
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventTypes.map((type, i) => (
              <div
                key={type.title}
                className="reveal text-center p-6 bg-[oklch(0.14_0.018_60)] border border-[oklch(0.20_0.02_60)]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-[oklch(0.72_0.14_75)] mb-4 flex justify-center">{type.icon}</div>
                <h3 className="font-display text-[oklch(0.94_0.03_80)] text-base tracking-wider mb-2">{type.title}</h3>
                <p className="font-body text-sm text-[oklch(0.62_0.03_80)] leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue listings */}
      <section className="py-16" aria-labelledby="venues">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-12">
            <span className="inline-block w-12 h-0.5 bg-[oklch(0.46_0.22_25)] mb-4 mx-auto" />
            <h2 id="venues" className="font-display text-[clamp(1.8rem,4vw,3rem)] text-[oklch(0.94_0.03_80)]">
              OUR EVENT VENUES
            </h2>
            <p className="font-body text-[oklch(0.62_0.03_80)] mt-2">5 locations available for private events across Long Island</p>
          </div>

          <div className="space-y-8">
            {venues.map((venue, i) => (
              <article
                key={venue.name}
                className="reveal grid lg:grid-cols-2 gap-0 overflow-hidden border border-[oklch(0.20_0.02_60)]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`relative h-64 lg:h-auto ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <img
                    src={venue.img}
                    alt={`${venue.name} private event space — Umberto's Family Pizzeria`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {venue.flagship && (
                    <div className="absolute top-4 left-4 bg-[oklch(0.46_0.22_25)] px-3 py-1.5">
                      <span className="font-display text-xs text-[oklch(0.98_0.01_80)] tracking-[0.12em]">FLAGSHIP VENUE</span>
                    </div>
                  )}
                </div>
                <div className={`bg-[oklch(0.14_0.018_60)] p-8 flex flex-col justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-display text-2xl text-[oklch(0.94_0.03_80)] tracking-wider">{venue.name}</h3>
                    <span className="flex-shrink-0 font-body text-sm text-[oklch(0.72_0.14_75)] border border-[oklch(0.72_0.14_75)]/40 px-3 py-1 flex items-center gap-1.5">
                      <Users size={12} /> {venue.capacity}
                    </span>
                  </div>
                  <p className="font-body text-sm text-[oklch(0.68_0.03_80)] leading-relaxed mb-5">{venue.desc}</p>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {venue.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-[oklch(0.46_0.22_25)] flex-shrink-0" />
                        <span className="font-body text-xs text-[oklch(0.62_0.03_80)]">{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href={`tel:${venue.phone.replace(/\D/g, "")}`} className="btn-umberto self-start text-sm">
                    <Phone size={14} /> {venue.phone}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[oklch(0.46_0.22_25)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-[oklch(0.98_0.01_80)] mb-4">
            LET'S PLAN YOUR EVENT
          </h2>
          <p className="font-body text-[oklch(0.98_0.01_80)]/80 mb-8 max-w-xl mx-auto">
            Call us today to discuss your event, check date availability, and explore our custom menu packages. Our event coordinators are ready to help make your celebration unforgettable.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:5164377698"
              className="bg-[oklch(0.98_0.01_80)] text-[oklch(0.46_0.22_25)] font-display text-base tracking-[0.1em] uppercase px-8 py-3.5 hover:bg-[oklch(0.94_0.03_80)] transition-colors inline-flex items-center gap-2"
            >
              <Phone size={16} /> (516) 437-7698
            </a>
            <Link
              href="/catering"
              className="border-2 border-[oklch(0.98_0.01_80)] text-[oklch(0.98_0.01_80)] font-display text-base tracking-[0.1em] uppercase px-8 py-3.5 hover:bg-[oklch(0.98_0.01_80)]/10 transition-colors inline-flex items-center gap-2"
            >
              View Catering Menu <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
