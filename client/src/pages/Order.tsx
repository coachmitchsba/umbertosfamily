/*
 * Order Page — Umberto's Family Pizzeria
 * Per-location ordering with AppSuite, Grubhub, UberEats, DoorDash
 * Zip code finder, light warm theme
 */
import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { MapPin, Phone, Clock, ArrowRight, Navigation2, ChevronDown, ExternalLink, Star } from "lucide-react";

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
  phoneRaw: string;
  hours: { days: string; hours: string }[];
  grubhub: string;
  ubereats: string;
  doordash: string;
  appsuite: string;
  mapUrl: string;
  img: string;
  slug?: string;
  flagship?: boolean;
}

const LOCATIONS: Location[] = [
  {
    id: "new-hyde-park",
    name: "New Hyde Park",
    address: "633 Jericho Tpke",
    city: "New Hyde Park, NY 11040",
    zip: "11040",
    phone: "(516) 437-7698",
    phoneRaw: "5164377698",
    hours: [
      { days: "Mon – Thu", hours: "10:30am – 9:30pm" },
      { days: "Fri – Sat", hours: "10:30am – 10:00pm" },
      { days: "Sunday", hours: "11:00am – 9:00pm" },
    ],
    grubhub: "https://www.grubhub.com/restaurant/umbertos-pizzeria-new-hyde-park/",
    ubereats: "https://www.ubereats.com/store/umbertos-new-hyde-park/",
    doordash: "https://www.doordash.com/store/umbertos-new-hyde-park/",
    appsuite: "https://umbertos.appsuitecrm.com",
    mapUrl: "https://maps.google.com/?q=633+Jericho+Tpke+New+Hyde+Park+NY+11040",
    img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/292661U1A6384.jpg?w=400&fit=crop&auto=compress,format",
    flagship: true,
  },
  {
    id: "manhasset",
    name: "Manhasset",
    address: "1430 Northern Blvd",
    city: "Manhasset, NY 11030",
    zip: "11030",
    phone: "(516) 627-7272",
    phoneRaw: "5166277272",
    hours: [
      { days: "Mon – Thu", hours: "10:30am – 9:30pm" },
      { days: "Fri – Sat", hours: "10:30am – 10:00pm" },
      { days: "Sunday", hours: "11:00am – 9:00pm" },
    ],
    grubhub: "https://www.grubhub.com/restaurant/umbertos-pizzeria-manhasset/",
    ubereats: "https://www.ubereats.com/store/umbertos-manhasset/",
    doordash: "https://www.doordash.com/store/umbertos-manhasset/",
    appsuite: "https://umbertos.appsuitecrm.com",
    mapUrl: "https://maps.google.com/?q=1430+Northern+Blvd+Manhasset+NY+11030",
    img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/7096Umbertos-Pepperoni-4.jpg?w=400&fit=crop&auto=compress,format",
  },
  {
    id: "massapequa-park",
    name: "Massapequa Park",
    address: "4897 Merrick Rd",
    city: "Massapequa Park, NY 11762",
    zip: "11762",
    phone: "(516) 541-3030",
    phoneRaw: "5165413030",
    hours: [
      { days: "Mon – Thu", hours: "10:30am – 9:30pm" },
      { days: "Fri – Sat", hours: "10:30am – 10:00pm" },
      { days: "Sunday", hours: "11:00am – 9:00pm" },
    ],
    grubhub: "https://www.grubhub.com/restaurant/umbertos-pizzeria-massapequa-park/",
    ubereats: "https://www.ubereats.com/store/umbertos-massapequa-park/",
    doordash: "https://www.doordash.com/store/umbertos-massapequa-park/",
    appsuite: "https://umbertos.appsuitecrm.com",
    mapUrl: "https://maps.google.com/?q=4897+Merrick+Rd+Massapequa+Park+NY+11762",
    img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/83464parm-chicken.jpg?w=400&fit=crop&auto=compress,format",
    slug: "massapequa",
  },
  {
    id: "bellmore",
    name: "Bellmore",
    address: "2803 Merrick Rd",
    city: "Bellmore, NY 11710",
    zip: "11710",
    phone: "(516) 783-7600",
    phoneRaw: "5167837600",
    hours: [
      { days: "Mon – Thu", hours: "10:30am – 9:30pm" },
      { days: "Fri – Sat", hours: "10:30am – 10:00pm" },
      { days: "Sunday", hours: "11:00am – 9:00pm" },
    ],
    grubhub: "https://www.grubhub.com/restaurant/umbertos-pizzeria-bellmore/",
    ubereats: "https://www.ubereats.com/store/umbertos-bellmore/",
    doordash: "https://www.doordash.com/store/umbertos-bellmore/",
    appsuite: "https://umbertos.appsuitecrm.com",
    mapUrl: "https://maps.google.com/?q=2803+Merrick+Rd+Bellmore+NY+11710",
    img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/326236A4A5195.jpg?w=400&fit=crop&auto=compress,format",
  },
  {
    id: "lake-grove",
    name: "Lake Grove",
    address: "2847 Middle Country Rd",
    city: "Lake Grove, NY 11755",
    zip: "11755",
    phone: "(631) 737-5600",
    phoneRaw: "6317375600",
    hours: [
      { days: "Mon – Thu", hours: "10:30am – 9:30pm" },
      { days: "Fri – Sat", hours: "10:30am – 10:00pm" },
      { days: "Sunday", hours: "11:00am – 9:00pm" },
    ],
    grubhub: "https://www.grubhub.com/restaurant/umbertos-pizzeria-lake-grove/",
    ubereats: "https://www.ubereats.com/store/umbertos-lake-grove/",
    doordash: "https://www.doordash.com/store/umbertos-lake-grove/",
    appsuite: "https://umbertos.appsuitecrm.com",
    mapUrl: "https://maps.google.com/?q=2847+Middle+Country+Rd+Lake+Grove+NY+11755",
    img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/36275067_6A4A2737.jpg?w=400&fit=crop&auto=compress,format",
  },
  {
    id: "farmingdale",
    name: "Farmingdale",
    address: "967 Broadhollow Rd",
    city: "Farmingdale, NY 11735",
    zip: "11735",
    phone: "(631) 454-6440",
    phoneRaw: "6314546440",
    hours: [
      { days: "Mon – Thu", hours: "10:30am – 9:30pm" },
      { days: "Fri – Sat", hours: "10:30am – 10:00pm" },
      { days: "Sunday", hours: "11:00am – 9:00pm" },
    ],
    grubhub: "https://www.grubhub.com/restaurant/umbertos-pizzeria-farmingdale/",
    ubereats: "https://www.ubereats.com/store/umbertos-farmingdale/",
    doordash: "https://www.doordash.com/store/umbertos-farmingdale/",
    appsuite: "https://umbertos.appsuitecrm.com",
    mapUrl: "https://maps.google.com/?q=967+Broadhollow+Rd+Farmingdale+NY+11735",
    img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/12732Umbertos-Pepperoni-3.jpg?w=400&fit=crop&auto=compress,format",
    slug: "farmingdale",
  },
];

const ZIP_MAP: Record<string, string> = {
  "11040": "new-hyde-park", "11042": "new-hyde-park", "11001": "new-hyde-park", "11010": "new-hyde-park",
  "11020": "new-hyde-park", "11021": "new-hyde-park", "11501": "new-hyde-park", "11550": "new-hyde-park",
  "11030": "manhasset", "11050": "manhasset", "11023": "manhasset", "11024": "manhasset", "11548": "manhasset", "11576": "manhasset",
  "11762": "massapequa-park", "11758": "massapequa-park", "11701": "massapequa-park", "11702": "massapequa-park",
  "11703": "massapequa-park", "11704": "massapequa-park",
  "11710": "bellmore", "11793": "bellmore", "11557": "bellmore", "11554": "bellmore", "11563": "bellmore",
  "11566": "bellmore", "11570": "bellmore",
  "11755": "lake-grove", "11779": "lake-grove", "11727": "lake-grove", "11763": "lake-grove",
  "11784": "lake-grove", "11790": "lake-grove", "11791": "lake-grove",
  "11735": "farmingdale", "11714": "farmingdale", "11716": "farmingdale", "11717": "farmingdale",
  "11729": "farmingdale", "11730": "farmingdale", "11731": "farmingdale", "11732": "farmingdale",
  "11741": "farmingdale", "11742": "farmingdale", "11746": "farmingdale", "11747": "farmingdale",
  "11756": "farmingdale", "11757": "farmingdale",
};

export default function Order() {
  const [selectedId, setSelectedId] = useState<string>("new-hyde-park");
  const [zipInput, setZipInput] = useState("");
  const [zipResult, setZipResult] = useState<{ location: Location; found: boolean } | null>(null);
  const [zipError, setZipError] = useState("");
  const zipRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "Order Online | Umberto's Family Pizzeria | 6 Long Island Locations";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Order Umberto's pizza, pasta, and Italian food online for pickup or delivery. 6 Long Island locations: New Hyde Park, Manhasset, Massapequa Park, Bellmore, Lake Grove, Farmingdale.");

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleZipSearch = () => {
    const zip = zipInput.trim();
    if (zip.length !== 5 || !/^\d{5}$/.test(zip)) {
      setZipError("Please enter a valid 5-digit zip code.");
      setZipResult(null);
      return;
    }
    setZipError("");
    const locationId = ZIP_MAP[zip];
    if (locationId) {
      const location = LOCATIONS.find((l) => l.id === locationId)!;
      setZipResult({ location, found: true });
      setSelectedId(locationId);
    } else {
      setZipResult({ location: LOCATIONS[0], found: false });
    }
  };

  const selectedLocation = LOCATIONS.find((l) => l.id === selectedId) || LOCATIONS[0];

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)]">
      <Navigation />

      {/* Header */}
      <section className="py-14 bg-white border-b border-[oklch(0.88_0.015_80)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-label">Online Ordering</span>
          <span className="red-line mx-auto" />
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[oklch(0.20_0.025_60)] leading-tight mb-4">
            ORDER FROM YOUR<br />NEAREST UMBERTO'S
          </h1>
          <p className="font-body text-[oklch(0.48_0.03_60)] max-w-xl mx-auto mb-6">
            Select your location below or enter your zip code to find the nearest one. Order for pickup or delivery via your preferred app.
          </p>

          {/* Zip finder */}
          <div className="max-w-sm mx-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[oklch(0.55_0.03_60)]" />
                <input
                  ref={zipRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={5}
                  value={zipInput}
                  onChange={(e) => setZipInput(e.target.value.replace(/\D/g, ""))}
                  onKeyDown={(e) => { if (e.key === "Enter") handleZipSearch(); }}
                  placeholder="Your zip code"
                  className="w-full pl-9 pr-3 py-3 border-2 border-[oklch(0.88_0.015_80)] bg-white font-body text-sm text-[oklch(0.20_0.025_60)] focus:outline-none focus:border-[oklch(0.46_0.22_25)] transition-colors"
                  aria-label="Enter zip code to find nearest location"
                />
              </div>
              <button onClick={handleZipSearch} className="btn-red text-sm px-4">
                <Navigation2 size={14} /> Find
              </button>
            </div>
            {zipError && <p className="font-body text-xs text-[oklch(0.46_0.22_25)] mt-1.5">{zipError}</p>}
            {zipResult && (
              <div className={`mt-2 p-2.5 border text-left text-xs font-body ${zipResult.found ? "border-[oklch(0.46_0.22_25)] bg-[oklch(0.97_0.015_80)] text-[oklch(0.20_0.025_60)]" : "border-[oklch(0.88_0.015_80)] text-[oklch(0.48_0.03_60)]"}`}>
                {zipResult.found
                  ? <><strong>Nearest:</strong> {zipResult.location.name} — {zipResult.location.address}</>
                  : "Zip not found. Browse all locations below."}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Location selector + order panel */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Location list */}
            <div className="lg:col-span-2 space-y-2">
              <h2 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-sm mb-3">SELECT YOUR LOCATION</h2>
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedId(loc.id)}
                  className={`w-full text-left flex items-center gap-3 p-3 border-2 transition-all duration-200 ${
                    selectedId === loc.id
                      ? "border-[oklch(0.46_0.22_25)] bg-[oklch(0.97_0.015_80)] shadow-sm"
                      : "border-[oklch(0.88_0.015_80)] bg-white hover:border-[oklch(0.46_0.22_25)]/50"
                  }`}
                  aria-pressed={selectedId === loc.id}
                >
                  <div className="w-12 h-12 flex-shrink-0 overflow-hidden">
                    <img src={loc.img} alt={`Umberto's ${loc.name}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-xs">{loc.name.toUpperCase()}</span>
                      {loc.flagship && <span className="bg-[oklch(0.46_0.22_25)] text-white font-display text-[0.5rem] tracking-[0.1em] px-1.5 py-0.5">FLAGSHIP</span>}
                      {loc.slug && <span className="bg-[oklch(0.68_0.13_75)] text-white font-display text-[0.5rem] tracking-[0.1em] px-1.5 py-0.5">DEALS</span>}
                    </div>
                    <p className="font-body text-xs text-[oklch(0.55_0.03_60)] truncate">{loc.address}</p>
                    <p className="font-body text-xs text-[oklch(0.46_0.22_25)]">{loc.phone}</p>
                  </div>
                  {selectedId === loc.id && <ChevronDown size={14} className="text-[oklch(0.46_0.22_25)] flex-shrink-0 -rotate-90" />}
                </button>
              ))}
            </div>

            {/* Order panel */}
            <div className="lg:col-span-3">
              <div className="bg-white border-2 border-[oklch(0.46_0.22_25)] shadow-lg">
                {/* Location header image */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={selectedLocation.img.replace("w=400", "w=800")}
                    alt={`Umberto's ${selectedLocation.name}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/30 flex items-end p-5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="font-display text-white text-2xl tracking-wider">{selectedLocation.name.toUpperCase()}</h2>
                        {selectedLocation.flagship && <span className="bg-[oklch(0.46_0.22_25)] text-white font-display text-[0.55rem] tracking-[0.12em] px-2 py-0.5">FLAGSHIP</span>}
                      </div>
                      <p className="font-body text-white/80 text-sm">{selectedLocation.address}, {selectedLocation.city}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  {/* Hours */}
                  <div className="flex items-start gap-3 mb-5 pb-5 border-b border-[oklch(0.88_0.015_80)]">
                    <Clock size={15} className="text-[oklch(0.46_0.22_25)] mt-0.5 flex-shrink-0" />
                    <div className="flex flex-wrap gap-x-6 gap-y-1">
                      {selectedLocation.hours.map((h) => (
                        <div key={h.days}>
                          <span className="font-body text-xs font-semibold text-[oklch(0.28_0.025_60)]">{h.days}: </span>
                          <span className="font-body text-xs text-[oklch(0.48_0.03_60)]">{h.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order options */}
                  <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-sm mb-3">ORDER OPTIONS</h3>
                  <div className="space-y-2.5">
                    {/* Call */}
                    <a href={`tel:${selectedLocation.phoneRaw}`}
                      className="flex items-center justify-between gap-3 bg-[oklch(0.46_0.22_25)] text-white p-4 hover:bg-[oklch(0.55_0.22_25)] transition-colors group">
                      <div className="flex items-center gap-3">
                        <Phone size={18} />
                        <div>
                          <p className="font-display text-sm tracking-[0.08em] uppercase">Call to Order</p>
                          <p className="font-body text-xs text-white/75">{selectedLocation.phone}</p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>

                    {/* AppSuite */}
                    <a href={selectedLocation.appsuite} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 bg-[oklch(0.20_0.025_60)] text-white p-4 hover:bg-[oklch(0.30_0.025_60)] transition-colors group">
                      <div className="flex items-center gap-3">
                        <ExternalLink size={18} />
                        <div>
                          <p className="font-display text-sm tracking-[0.08em] uppercase">Order Online (AppSuite)</p>
                          <p className="font-body text-xs text-white/75">Pickup &amp; delivery — earn rewards points</p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>

                    {/* Grubhub */}
                    <a href={selectedLocation.grubhub} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 border-2 border-[oklch(0.88_0.015_80)] bg-white p-4 hover:border-[oklch(0.46_0.22_25)] transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-[oklch(0.65_0.18_30)] flex items-center justify-center text-xs font-bold text-white rounded-sm">G</div>
                        <div>
                          <p className="font-display text-[oklch(0.20_0.025_60)] text-sm tracking-[0.08em] uppercase">Order on Grubhub</p>
                          <p className="font-body text-xs text-[oklch(0.55_0.03_60)]">Delivery &amp; pickup</p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-[oklch(0.55_0.03_60)] group-hover:text-[oklch(0.46_0.22_25)] group-hover:translate-x-1 transition-all" />
                    </a>

                    {/* UberEats */}
                    <a href={selectedLocation.ubereats} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 border-2 border-[oklch(0.88_0.015_80)] bg-white p-4 hover:border-[oklch(0.46_0.22_25)] transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-[oklch(0.20_0.025_60)] flex items-center justify-center text-xs font-bold text-white rounded-sm">U</div>
                        <div>
                          <p className="font-display text-[oklch(0.20_0.025_60)] text-sm tracking-[0.08em] uppercase">Order on Uber Eats</p>
                          <p className="font-body text-xs text-[oklch(0.55_0.03_60)]">Delivery &amp; pickup</p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-[oklch(0.55_0.03_60)] group-hover:text-[oklch(0.46_0.22_25)] group-hover:translate-x-1 transition-all" />
                    </a>

                    {/* DoorDash */}
                    <a href={selectedLocation.doordash} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 border-2 border-[oklch(0.88_0.015_80)] bg-white p-4 hover:border-[oklch(0.46_0.22_25)] transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-[oklch(0.46_0.22_25)] flex items-center justify-center text-xs font-bold text-white rounded-sm">D</div>
                        <div>
                          <p className="font-display text-[oklch(0.20_0.025_60)] text-sm tracking-[0.08em] uppercase">Order on DoorDash</p>
                          <p className="font-body text-xs text-[oklch(0.55_0.03_60)]">Delivery &amp; pickup</p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-[oklch(0.55_0.03_60)] group-hover:text-[oklch(0.46_0.22_25)] group-hover:translate-x-1 transition-all" />
                    </a>
                  </div>

                  {/* Exclusive offers link */}
                  {selectedLocation.slug && (
                    <div className="mt-4 p-3 bg-[oklch(0.95_0.018_80)] border border-[oklch(0.68_0.13_75)]">
                      <p className="font-body text-xs text-[oklch(0.38_0.03_60)] mb-1.5">
                        <Star size={11} className="inline mr-1 text-[oklch(0.68_0.13_75)]" />
                        This location has exclusive deals and special offers!
                      </p>
                      <Link href={`/${selectedLocation.slug}`} className="font-display text-xs text-[oklch(0.68_0.13_75)] tracking-wider uppercase hover:underline">
                        View Exclusive {selectedLocation.name} Offers →
                      </Link>
                    </div>
                  )}

                  {/* Directions */}
                  <div className="mt-4 pt-4 border-t border-[oklch(0.88_0.015_80)] flex items-center justify-between">
                    <a href={selectedLocation.mapUrl} target="_blank" rel="noopener noreferrer"
                      className="font-body text-xs text-[oklch(0.46_0.22_25)] hover:underline flex items-center gap-1.5">
                      <MapPin size={12} /> Get Directions
                    </a>
                    <Link href="/catering" className="font-body text-xs text-[oklch(0.48_0.03_60)] hover:text-[oklch(0.46_0.22_25)] transition-colors">
                      Need catering? →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTAs */}
      <section className="py-12 bg-[oklch(0.95_0.018_80)] border-t border-[oklch(0.88_0.015_80)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: "Catering Orders", desc: "Full & half trays for offices, schools, and events. Call your nearest location.", href: "/catering", cta: "View Catering Menu" },
              { title: "Private Events", desc: "Book a private dining room for up to 250 guests. Perfect for any celebration.", href: "/private-events", cta: "Explore Venues" },
              { title: "Ship Nationwide", desc: "Get Umberto's delivered anywhere in the U.S. via Goldbelly. Free shipping available.", href: "/shipping", cta: "Order for Shipping" },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-[oklch(0.88_0.015_80)] p-5">
                <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-sm mb-2">{item.title}</h3>
                <p className="font-body text-xs text-[oklch(0.48_0.03_60)] leading-relaxed mb-3">{item.desc}</p>
                <Link href={item.href} className="font-display text-xs text-[oklch(0.46_0.22_25)] tracking-wider uppercase hover:underline">
                  {item.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
