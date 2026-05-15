/*
 * Order Page — Umberto's Family Pizzeria
 * Design: Dark, conversion-focused with location-based ordering
 * SEO: Order online keywords, delivery/pickup schema
 */
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ExternalLink, Phone, MapPin, Clock, Truck, ShoppingBag } from "lucide-react";

const locations = [
  {
    name: "New Hyde Park",
    address: "633 Jericho Turnpike, New Hyde Park, NY 11040",
    phone: "(516) 437-7698",
    hours: "Mon–Thu 10:30am–9:30pm · Fri–Sat 10:30am–10pm · Sun 11am–9pm",
    orderUrl: "https://www.grubhub.com/restaurant/umbertos-pizzeria-633-jericho-tpke-new-hyde-park/2420614",
    flagship: true,
    delivery: true,
    pickup: true,
  },
  {
    name: "Manhasset",
    address: "429 Plandome Road, Manhasset, NY 11030",
    phone: "(516) 472-7801",
    hours: "Mon–Thu 10:30am–9:30pm · Fri–Sat 10:30am–10pm · Sun 11am–9pm",
    orderUrl: "https://www.grubhub.com/restaurant/umbertos-family-pizzeria-429-plandome-rd-manhasset/3124765",
    delivery: true,
    pickup: true,
  },
  {
    name: "Bellmore",
    address: "208 Bedford Ave, Bellmore, NY 11710",
    phone: "(516) 409-1400",
    hours: "Mon–Thu 10:30am–9:30pm · Fri–Sat 10:30am–10pm · Sun 11am–9pm",
    orderUrl: "https://www.grubhub.com/restaurant/umbertos-family-pizzeria-208-bedford-ave-bellmore/2420615",
    delivery: true,
    pickup: true,
  },
  {
    name: "Massapequa Park",
    address: "1011 Park Blvd, Massapequa Park, NY 11762",
    phone: "(516) 541-3030",
    hours: "Mon–Thu 10:30am–9:30pm · Fri–Sat 10:30am–10pm · Sun 11am–9pm",
    orderUrl: "https://www.grubhub.com/restaurant/umbertos-family-pizzeria-1011-park-blvd-massapequa-park/2420616",
    delivery: true,
    pickup: true,
  },
  {
    name: "Lake Grove",
    address: "111 Alexander Ave, Lake Grove, NY 11755",
    phone: "(631) 862-6777",
    hours: "Mon–Thu 10:30am–9:30pm · Fri–Sat 10:30am–10pm · Sun 11am–9pm",
    orderUrl: "https://www.grubhub.com/restaurant/umbertos-family-pizzeria-111-alexander-ave-lake-grove/2420617",
    delivery: true,
    pickup: true,
  },
  {
    name: "Farmingdale",
    address: "211 Airport Plaza Blvd, Farmingdale, NY 11735",
    phone: "(631) 454-6440",
    hours: "Mon–Thu 10:30am–9:30pm · Fri–Sat 10:30am–10pm · Sun 11am–9pm",
    orderUrl: "https://www.grubhub.com/restaurant/umbertos-family-pizzeria-211-airport-plaza-blvd-farmingdale/2420618",
    delivery: true,
    pickup: true,
  },
];

const deliveryApps = [
  {
    name: "Grubhub",
    desc: "Order delivery or pickup on Grubhub",
    url: "https://www.grubhub.com/restaurant/umbertos-pizzeria-633-jericho-tpke-new-hyde-park/2420614",
    color: "oklch(0.65 0.18 30)",
  },
  {
    name: "DoorDash",
    desc: "Fast delivery via DoorDash",
    url: "https://www.doordash.com/store/umberto-s-family-pizzeria-new-hyde-park-24206/",
    color: "oklch(0.55 0.20 25)",
  },
  {
    name: "UberEats",
    desc: "Order on UberEats",
    url: "https://www.ubereats.com/store/umbertos-family-pizzeria/",
    color: "oklch(0.25 0.02 60)",
  },
];

export default function Order() {
  const [selectedLocation, setSelectedLocation] = useState(0);

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

      {/* Header */}
      <header className="py-16 bg-[oklch(0.12_0.018_60)] border-b border-[oklch(0.20_0.02_60)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block w-12 h-0.5 bg-[oklch(0.46_0.22_25)] mb-4 mx-auto" />
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[oklch(0.94_0.03_80)] leading-tight">
            ORDER ONLINE
          </h1>
          <p className="font-serif italic text-[oklch(0.72_0.14_75)] text-xl mt-2 mb-4">
            Pickup or Delivery · 6 Long Island Locations
          </p>
          <p className="font-body text-[oklch(0.62_0.03_80)] max-w-xl mx-auto">
            Order the Original Grandma Slice and all your Umberto's favorites online for pickup or delivery. Select your location below to get started.
          </p>
        </div>
      </header>

      {/* Delivery apps */}
      <section className="py-12 border-b border-[oklch(0.20_0.02_60)]" aria-labelledby="delivery-apps">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="delivery-apps" className="reveal font-display text-xl text-[oklch(0.94_0.03_80)] tracking-wider text-center mb-8">
            ORDER THROUGH YOUR FAVORITE APP
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {deliveryApps.map((app, i) => (
              <a
                key={app.name}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal flex items-center justify-between gap-4 bg-[oklch(0.14_0.018_60)] border border-[oklch(0.20_0.02_60)] p-5 hover:border-[oklch(0.46_0.22_25)]/50 transition-colors group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div>
                  <p className="font-display text-[oklch(0.94_0.03_80)] text-lg tracking-wider">{app.name}</p>
                  <p className="font-body text-xs text-[oklch(0.55_0.03_80)] mt-1">{app.desc}</p>
                </div>
                <ExternalLink size={18} className="text-[oklch(0.46_0.22_25)] flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Location-based ordering */}
      <section className="py-16" aria-labelledby="location-order">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10">
            <span className="inline-block w-12 h-0.5 bg-[oklch(0.46_0.22_25)] mb-4 mx-auto" />
            <h2 id="location-order" className="font-display text-[clamp(1.8rem,4vw,3rem)] text-[oklch(0.94_0.03_80)]">
              ORDER BY LOCATION
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Location list */}
            <div className="lg:col-span-1 space-y-2">
              {locations.map((loc, i) => (
                <button
                  key={loc.name}
                  onClick={() => setSelectedLocation(i)}
                  className={`w-full text-left p-4 border transition-colors ${
                    selectedLocation === i
                      ? "border-[oklch(0.46_0.22_25)] bg-[oklch(0.14_0.018_60)]"
                      : "border-[oklch(0.20_0.02_60)] bg-[oklch(0.12_0.018_60)] hover:border-[oklch(0.35_0.02_60)]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[oklch(0.94_0.03_80)] tracking-wider text-sm">{loc.name}</span>
                    {loc.flagship && (
                      <span className="text-[0.6rem] bg-[oklch(0.46_0.22_25)] text-[oklch(0.98_0.01_80)] px-1.5 py-0.5 tracking-wider">
                        FLAGSHIP
                      </span>
                    )}
                  </div>
                  <p className="font-body text-xs text-[oklch(0.55_0.03_80)] mt-1">{loc.phone}</p>
                </button>
              ))}
            </div>

            {/* Selected location detail */}
            <div className="lg:col-span-2">
              {(() => {
                const loc = locations[selectedLocation];
                return (
                  <div className="bg-[oklch(0.14_0.018_60)] border border-[oklch(0.20_0.02_60)] p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="font-display text-2xl text-[oklch(0.94_0.03_80)] tracking-wider">
                          {loc.name}
                          {loc.flagship && (
                            <span className="ml-3 text-sm bg-[oklch(0.46_0.22_25)] text-[oklch(0.98_0.01_80)] px-2 py-1 tracking-wider">
                              FLAGSHIP
                            </span>
                          )}
                        </h3>
                        <p className="font-body text-sm text-[oklch(0.62_0.03_80)] mt-1 flex items-center gap-1.5">
                          <MapPin size={13} className="text-[oklch(0.46_0.22_25)]" />
                          {loc.address}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start gap-3">
                        <Clock size={16} className="text-[oklch(0.46_0.22_25)] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-display text-[oklch(0.94_0.03_80)] text-sm tracking-wider mb-1">Hours</p>
                          <p className="font-body text-xs text-[oklch(0.62_0.03_80)] leading-relaxed">{loc.hours}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone size={16} className="text-[oklch(0.46_0.22_25)] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-display text-[oklch(0.94_0.03_80)] text-sm tracking-wider mb-1">Phone</p>
                          <a
                            href={`tel:${loc.phone.replace(/\D/g, "")}`}
                            className="font-body text-sm text-[oklch(0.72_0.14_75)] hover:text-[oklch(0.80_0.14_75)] transition-colors"
                          >
                            {loc.phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href={loc.orderUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-umberto"
                      >
                        <ShoppingBag size={16} /> Order Online <ExternalLink size={14} />
                      </a>
                      {loc.pickup && (
                        <div className="flex items-center gap-2 px-4 py-2.5 border border-[oklch(0.25_0.02_60)] text-[oklch(0.62_0.03_80)] font-body text-sm">
                          <ShoppingBag size={14} className="text-[oklch(0.46_0.22_25)]" /> Pickup Available
                        </div>
                      )}
                      {loc.delivery && (
                        <div className="flex items-center gap-2 px-4 py-2.5 border border-[oklch(0.25_0.02_60)] text-[oklch(0.62_0.03_80)] font-body text-sm">
                          <Truck size={14} className="text-[oklch(0.46_0.22_25)]" /> Delivery Available
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* Catering CTA */}
      <section className="py-12 bg-[oklch(0.12_0.018_60)] border-t border-[oklch(0.20_0.02_60)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl text-[oklch(0.94_0.03_80)] tracking-wider mb-3">
            ORDERING FOR A GROUP?
          </h2>
          <p className="font-body text-[oklch(0.62_0.03_80)] mb-6">
            For office lunches, school events, or large gatherings, check out our full catering menu with full and half trays.
          </p>
          <a href="/catering" className="btn-outline-gold">
            View Catering Menu <ExternalLink size={14} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
