/*
 * Private Events Page — Umberto's Family Pizzeria
 * Light warm theme, all event types, venue photos, expanded event keywords
 * SEO: private events, party venues, Long Island event space
 */
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Phone, Users, ArrowRight, Star, ChevronDown, ChevronUp, Check } from "lucide-react";

const EVENT_TYPES = [
  { icon: "🎓", label: "Graduation Parties" },
  { icon: "🎂", label: "Birthday Parties" },
  { icon: "🎉", label: "Sweet 16s" },
  { icon: "🕍", label: "Bar & Bat Mitzvahs" },
  { icon: "👶", label: "Baby Showers" },
  { icon: "💍", label: "Bridal Showers" },
  { icon: "💒", label: "Rehearsal Dinners" },
  { icon: "💼", label: "Corporate Events" },
  { icon: "🏢", label: "Business Meetings" },
  { icon: "🎄", label: "Holiday Parties" },
  { icon: "🏆", label: "Award Ceremonies" },
  { icon: "🎗️", label: "Fundraisers" },
  { icon: "👨‍👩‍👧", label: "Family Reunions" },
  { icon: "💛", label: "Anniversary Dinners" },
  { icon: "🎊", label: "Retirement Parties" },
  { icon: "🍕", label: "Team Lunches" },
  { icon: "🎈", label: "Kids' Parties" },
  { icon: "🌟", label: "Quinceañeras" },
  { icon: "🎭", label: "Gala Dinners" },
  { icon: "🏫", label: "School Events" },
  { icon: "🎖️", label: "Military Celebrations" },
  { icon: "🍾", label: "New Year's Events" },
  { icon: "🌸", label: "Spring Celebrations" },
  { icon: "🦃", label: "Thanksgiving Gatherings" },
];

const VENUES = [
  {
    id: "new-hyde-park",
    name: "New Hyde Park",
    subtitle: "Flagship Venue — Up to 250 Guests",
    capacity: 250,
    phone: "(516) 437-7698",
    phoneRaw: "5164377698",
    address: "633 Jericho Tpke, New Hyde Park, NY 11040",
    desc: "Our flagship venue is the crown jewel of Umberto's private dining. With multiple private rooms and a stunning main hall, New Hyde Park can accommodate intimate gatherings of 20 up to grand celebrations of 250 guests. Full bar, dedicated event staff, and customizable Italian menus make every event unforgettable.",
    features: [
      "Up to 250 guests",
      "Multiple private rooms",
      "Full bar service",
      "Dedicated event coordinator",
      "Customizable Italian menus",
      "A/V equipment available",
      "Valet parking available",
      "Wheelchair accessible",
    ],
    imgs: [
      "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/292661U1A6384.jpg?w=800&fit=crop&auto=compress,format",
      "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/326236A4A5195.jpg?w=800&fit=crop&auto=compress,format",
      "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/36275067_6A4A2737.jpg?w=800&fit=crop&auto=compress,format",
    ],
    flagship: true,
  },
  {
    id: "manhasset",
    name: "Manhasset",
    subtitle: "Up to 80 Guests",
    capacity: 80,
    phone: "(516) 627-7272",
    phoneRaw: "5166277272",
    address: "1430 Northern Blvd, Manhasset, NY 11030",
    desc: "The Manhasset location on Northern Blvd is perfect for upscale private dining on the North Shore. Ideal for corporate dinners, rehearsal dinners, and milestone celebrations in an elegant setting.",
    features: [
      "Up to 80 guests",
      "Private dining room",
      "Full Italian menu",
      "Bar service available",
      "North Shore location",
    ],
    imgs: [
      "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/7096Umbertos-Pepperoni-4.jpg?w=800&fit=crop&auto=compress,format",
      "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/12732Umbertos-Pepperoni-3.jpg?w=800&fit=crop&auto=compress,format",
    ],
  },
  {
    id: "lake-grove",
    name: "Lake Grove",
    subtitle: "Up to 70 Guests",
    capacity: 70,
    phone: "(631) 737-5600",
    phoneRaw: "6317375600",
    address: "2847 Middle Country Rd, Lake Grove, NY 11755",
    desc: "The Lake Grove location offers a warm, intimate private dining experience for groups up to 70. Perfect for corporate lunches, birthday dinners, and family gatherings in a comfortable, upscale setting.",
    features: [
      "Up to 70 guests",
      "Private dining room",
      "Full Italian menu",
      "Bar service available",
      "Ample parking",
    ],
    imgs: [
      "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/36275067_6A4A2737.jpg?w=800&fit=crop&auto=compress,format",
      "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/97139spaghetti_vongole.png?w=800&fit=max&auto=compress,format",
    ],
  },
  {
    id: "bellmore",
    name: "Bellmore",
    subtitle: "Up to 60 Guests",
    capacity: 60,
    phone: "(516) 783-7600",
    phoneRaw: "5167837600",
    address: "2803 Merrick Rd, Bellmore, NY 11710",
    desc: "Bellmore's private event space is ideal for milestone celebrations, sweet 16s, and corporate gatherings. The warm Italian atmosphere and exceptional food make every event a memorable occasion.",
    features: [
      "Up to 60 guests",
      "Semi-private dining",
      "Full Italian menu",
      "Bar service available",
      "Convenient South Shore location",
    ],
    imgs: [
      "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/326236A4A5195.jpg?w=800&fit=crop&auto=compress,format",
      "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/83464parm-chicken.jpg?w=800&fit=crop&auto=compress,format",
    ],
  },
  {
    id: "massapequa-park",
    name: "Massapequa Park",
    subtitle: "Up to 50 Guests",
    capacity: 50,
    phone: "(516) 541-3030",
    phoneRaw: "5165413030",
    address: "4897 Merrick Rd, Massapequa Park, NY 11762",
    desc: "Massapequa Park is a beloved South Shore destination for private dining. Ideal for baby showers, graduation parties, and intimate corporate events with Umberto's legendary Italian food.",
    features: [
      "Up to 50 guests",
      "Private dining area",
      "Full Italian menu",
      "Bar service available",
      "Merrick Road location",
    ],
    imgs: [
      "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/83464parm-chicken.jpg?w=800&fit=crop&auto=compress,format",
      "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/7096Umbertos-Pepperoni-4.jpg?w=800&fit=crop&auto=compress,format",
    ],
  },
];

export default function PrivateEvents() {
  const [expandedVenue, setExpandedVenue] = useState<string>("new-hyde-park");
  const [activeImg, setActiveImg] = useState<Record<string, number>>({});

  useEffect(() => {
    document.title = "Private Events & Party Venues | Umberto's Family Pizzeria | Long Island";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Host your next event at Umberto's. Private dining rooms for graduations, bar/bat mitzvahs, sweet 16s, corporate events, birthday parties, baby showers & more. Up to 250 guests.");

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const getActiveImg = (venueId: string) => activeImg[venueId] ?? 0;

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)]">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] overflow-hidden">
        <img
          src="https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/292661U1A6384.jpg?w=1400&fit=crop&auto=compress,format"
          alt="Umberto's private event venue — New Hyde Park flagship"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 flex items-center justify-center">
          <div className="text-center px-4">
            <span className="font-display text-[oklch(0.72_0.14_75)] text-sm tracking-[0.25em] uppercase block mb-3">Private Events &amp; Celebrations</span>
            <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] text-white leading-none mb-4">
              YOUR PERFECT<br />EVENT AWAITS
            </h1>
            <p className="font-serif italic text-white/85 text-xl max-w-xl mx-auto mb-6">
              From intimate dinners to grand celebrations — Umberto's has the perfect venue.
            </p>
            <a href="tel:5164377698" className="btn-red">
              <Phone size={16} /> Call to Book Your Event
            </a>
          </div>
        </div>
      </section>

      {/* Event types grid */}
      <section className="py-14 bg-white border-b border-[oklch(0.88_0.015_80)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-label">Every Occasion</span>
            <span className="red-line mx-auto" />
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-[oklch(0.20_0.025_60)] leading-tight">
              WE HOST EVERY EVENT
            </h2>
            <p className="font-body text-[oklch(0.48_0.03_60)] max-w-xl mx-auto mt-3">
              From intimate family gatherings to large corporate galas, Umberto's has hosted thousands of celebrations since 1965. Whatever the occasion, we make it unforgettable.
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {EVENT_TYPES.map((evt) => (
              <div key={evt.label} className="reveal flex flex-col items-center text-center p-3 bg-[oklch(0.97_0.015_80)] border border-[oklch(0.88_0.015_80)] hover:border-[oklch(0.46_0.22_25)] hover:bg-white transition-all">
                <span className="text-2xl mb-1.5">{evt.icon}</span>
                <span className="font-body text-[0.68rem] text-[oklch(0.38_0.03_60)] leading-tight">{evt.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Umberto's for events */}
      <section className="py-12 bg-[oklch(0.97_0.015_80)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { icon: "🍕", title: "Legendary Food", desc: "The same award-winning Italian menu that's made Umberto's famous since 1965." },
              { icon: "👨‍🍳", title: "Dedicated Staff", desc: "Our experienced event team handles every detail so you can enjoy your celebration." },
              { icon: "🥂", title: "Full Bar Service", desc: "Premium wine, beer, and cocktails available at select locations." },
              { icon: "🎨", title: "Custom Menus", desc: "Work with our team to create a personalized menu for your event." },
            ].map((item) => (
              <div key={item.title} className="reveal bg-white border border-[oklch(0.88_0.015_80)] p-5 text-center">
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-sm mb-2">{item.title}</h3>
                <p className="font-body text-xs text-[oklch(0.48_0.03_60)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venues accordion */}
      <section className="py-12 bg-white border-t border-[oklch(0.88_0.015_80)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-label">Our Venues</span>
            <span className="red-line mx-auto" />
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-[oklch(0.20_0.025_60)]">CHOOSE YOUR VENUE</h2>
            <p className="font-body text-[oklch(0.48_0.03_60)] mt-2">5 locations across Long Island, each with private dining options</p>
          </div>

          <div className="space-y-3">
            {VENUES.map((venue) => {
              const isOpen = expandedVenue === venue.id;
              const imgIdx = getActiveImg(venue.id);
              return (
                <article
                  key={venue.id}
                  className={`border-2 transition-all duration-300 ${isOpen ? "border-[oklch(0.46_0.22_25)] shadow-lg bg-white" : "border-[oklch(0.88_0.015_80)] bg-[oklch(0.97_0.015_80)] hover:border-[oklch(0.46_0.22_25)]/50"}`}
                >
                  <button
                    className="w-full text-left p-5 flex items-center gap-4"
                    onClick={() => setExpandedVenue(isOpen ? "" : venue.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="w-16 h-16 flex-shrink-0 overflow-hidden">
                      <img src={venue.imgs[0]} alt={`Umberto's ${venue.name} private event venue`} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider">{venue.name.toUpperCase()}</h3>
                        {venue.flagship && <span className="bg-[oklch(0.46_0.22_25)] text-white font-display text-[0.55rem] tracking-[0.12em] px-2 py-0.5">FLAGSHIP</span>}
                      </div>
                      <p className="font-body text-sm text-[oklch(0.48_0.03_60)]">{venue.subtitle}</p>
                      <div className="flex items-center gap-0.5 mt-1">
                        {[1,2,3,4,5].map(i => <Star key={i} size={10} className="text-[oklch(0.68_0.13_75)] fill-[oklch(0.68_0.13_75)]" />)}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="hidden sm:flex items-center gap-1.5 text-[oklch(0.46_0.22_25)]">
                        <Users size={14} />
                        <span className="font-display text-sm tracking-wider">Up to {venue.capacity}</span>
                      </div>
                      {isOpen ? <ChevronUp size={20} className="text-[oklch(0.46_0.22_25)]" /> : <ChevronDown size={20} className="text-[oklch(0.55_0.03_60)]" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-[oklch(0.88_0.015_80)] p-5">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Photo gallery */}
                        <div>
                          <div className="relative h-52 overflow-hidden mb-2">
                            <img
                              src={venue.imgs[imgIdx]}
                              alt={`${venue.name} event venue`}
                              className="w-full h-full object-cover transition-opacity duration-300"
                              loading="lazy"
                            />
                          </div>
                          {venue.imgs.length > 1 && (
                            <div className="flex gap-2">
                              {venue.imgs.map((img, i) => (
                                <button
                                  key={i}
                                  onClick={() => setActiveImg((prev) => ({ ...prev, [venue.id]: i }))}
                                  className={`w-14 h-10 overflow-hidden border-2 transition-all ${imgIdx === i ? "border-[oklch(0.46_0.22_25)]" : "border-transparent opacity-60 hover:opacity-100"}`}
                                >
                                  <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div>
                          <p className="font-body text-sm text-[oklch(0.38_0.03_60)] leading-relaxed mb-4">{venue.desc}</p>
                          <ul className="space-y-1.5 mb-5">
                            {venue.features.map((f) => (
                              <li key={f} className="flex items-center gap-2 font-body text-xs text-[oklch(0.38_0.03_60)]">
                                <Check size={12} className="text-[oklch(0.46_0.22_25)] flex-shrink-0" />
                                {f}
                              </li>
                            ))}
                          </ul>
                          <p className="font-body text-xs text-[oklch(0.55_0.03_60)] mb-3">{venue.address}</p>
                          <div className="flex flex-wrap gap-2">
                            <a href={`tel:${venue.phoneRaw}`} className="btn-red text-xs px-4 py-2.5">
                              <Phone size={13} /> Call {venue.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-[oklch(0.97_0.015_80)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-[oklch(0.20_0.025_60)] text-center mb-8">WHAT OUR GUESTS SAY</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { quote: "We had our daughter's sweet 16 at the New Hyde Park location and it was absolutely perfect. The food, the staff, the atmosphere — everything exceeded our expectations.", name: "Maria S.", event: "Sweet 16" },
              { quote: "Umberto's hosted our company's holiday party for 150 employees. The food was outstanding and the event coordinator made everything seamless. We'll be back every year.", name: "James R.", event: "Corporate Holiday Party" },
              { quote: "Our son's bar mitzvah dinner was incredible. The private room was beautiful, the Italian food was a hit with all our guests, and the staff treated us like family.", name: "Rachel K.", event: "Bar Mitzvah" },
            ].map((t) => (
              <div key={t.name} className="reveal bg-white border border-[oklch(0.88_0.015_80)] p-5">
                <div className="flex gap-0.5 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-[oklch(0.68_0.13_75)] fill-[oklch(0.68_0.13_75)]" />)}
                </div>
                <p className="font-serif italic text-[oklch(0.38_0.03_60)] text-sm leading-relaxed mb-4">"{t.quote}"</p>
                <div>
                  <p className="font-display text-[oklch(0.20_0.025_60)] text-xs tracking-wider">{t.name}</p>
                  <p className="font-body text-xs text-[oklch(0.46_0.22_25)]">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[oklch(0.46_0.22_25)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-white leading-tight mb-3">
            READY TO PLAN<br />YOUR EVENT?
          </h2>
          <p className="font-body text-white/80 mb-6 max-w-xl mx-auto">
            Call our event team today to check availability, discuss your vision, and get a custom quote. We'd love to be part of your celebration.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="tel:5164377698" className="btn-white"><Phone size={16} /> (516) 437-7698</a>
            <Link href="/catering" className="inline-flex items-center gap-2 border-2 border-white text-white font-display text-base tracking-[0.1em] uppercase px-6 py-3.5 hover:bg-white/10 transition-colors">
              View Catering Menu <ArrowRight size={16} />
            </Link>
          </div>
          <p className="font-body text-white/60 text-xs mt-5">New Hyde Park Flagship: 633 Jericho Tpke, New Hyde Park, NY 11040</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
