/*
 * Locations Page — Umberto's Family Pizzeria
 * Interactive expandable location cards, zip code finder, per-location ordering
 * Design: Warm cream/white, Italian trattoria, bold red accents
 */
import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { MapPin, Phone, Clock, ArrowRight, ChevronDown, ChevronUp, Star, Navigation2, ExternalLink, Calendar, ShoppingCart } from "lucide-react";
import { MapView } from "@/components/Map";

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
  openTableId?: number;
  opentableUrl?: string;
  mapUrl: string;
  lat: number;
  lng: number;
  img: string;
  capacity: string;
  features: string[];
  slug?: string;
  flagship?: boolean;
}

const LOCATIONS: Location[] = [
  {
    id: "new-hyde-park",
    name: "New Hyde Park",
    address: "633 Jericho Tpke",
    city: "New Hyde Park, NY",
    zip: "11040",
    phone: "(516) 437-7698",
    phoneRaw: "5164377698",
    hours: [
      { days: "Mon – Thu", hours: "10:30am – 9:30pm" },
      { days: "Fri – Sat", hours: "10:30am – 10:00pm" },
      { days: "Sunday", hours: "11:00am – 9:00pm" },
    ],
    grubhub: "",
    ubereats: "https://www.ubereats.com/store/umbertos-of-new-hyde-park/6iyn30RuQpe8ByaF1hz_1Q",
    doordash: "https://www.doordash.com/store/umberto%27s-pizzeria-&-restaurant-new-hyde-park-133840/181560",
    appsuite: "https://umbertos.appsuitecrm.com/menu/910",
    opentableUrl: "https://www.opentable.com/umbertos-of-new-hyde-park-original",
    mapUrl: "https://maps.google.com/?cid=4728182709475837324",
    lat: 40.7321, lng: -73.6873,
    img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/292661U1A6384.jpg?w=600&fit=crop&auto=compress,format",
    capacity: "Up to 250 guests",
    features: ["Flagship Location", "Private Events (250 guests)", "Full Bar", "Catering", "Dine-In & Takeout", "Delivery"],
    flagship: true,
  },
  {
    id: "manhasset",
    name: "Manhasset",
    address: "1430 Northern Blvd",
    city: "Manhasset, NY",
    zip: "11030",
    phone: "(516) 627-7272",
    phoneRaw: "5166277272",
    hours: [
      { days: "Mon – Thu", hours: "10:30am – 9:30pm" },
      { days: "Fri – Sat", hours: "10:30am – 10:00pm" },
      { days: "Sunday", hours: "11:00am – 9:00pm" },
    ],
    grubhub: "",
    ubereats: "https://www.ubereats.com/store/umbertos-of-manhasset/XZ_7UGvEQJCgzxTmIzIxHA",
    doordash: "https://www.doordash.com/en-US/store/umberto%27s-pizzeria-&-restaurant-manhasset-193859/847058",
    appsuite: "https://umbertos.appsuitecrm.com/menu/795",
    opentableUrl: "https://www.opentable.com/r/umbertos-of-manhasset",
    mapUrl: "https://maps.google.com/?q=1430+Northern+Blvd+Manhasset+NY+11030",
    lat: 40.7900, lng: -73.6970,
    img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/7096Umbertos-Pepperoni-4.jpg?w=600&fit=crop&auto=compress,format",
    capacity: "Up to 80 guests",
    features: ["Private Events (80 guests)", "Catering", "Dine-In & Takeout", "Delivery"],
  },
  {
    id: "massapequa-park",
    name: "Massapequa Park",
    address: "4897 Merrick Rd",
    city: "Massapequa Park, NY",
    zip: "11762",
    phone: "(516) 541-3030",
    phoneRaw: "5165413030",
    hours: [
      { days: "Mon – Thu", hours: "10:30am – 9:30pm" },
      { days: "Fri – Sat", hours: "10:30am – 10:00pm" },
      { days: "Sunday", hours: "11:00am – 9:00pm" },
    ],
    grubhub: "",
    ubereats: "https://www.ubereats.com/store/umbertos-of-massapequa-park/SNS-EJqYSA6mshMRYcqheQ",
    doordash: "https://www.doordash.com/store/umbertos-pizzeria-&-restaurant-massapequa-park-198928/",
    appsuite: "https://umbertos.appsuitecrm.com/menu/1008",
    opentableUrl: "https://www.opentable.com/r/umbertos-of-massapequa-park-massapequa",
    mapUrl: "https://maps.google.com/?q=4897+Merrick+Rd+Massapequa+Park+NY+11762",
    lat: 40.6795, lng: -73.4580,
    img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/83464parm-chicken.jpg?w=600&fit=crop&auto=compress,format",
    capacity: "Up to 50 guests",
    features: ["Private Events (50 guests)", "Catering", "Dine-In & Takeout", "Delivery", "Exclusive Offers"],
    slug: "massapequa",
  },
  {
    id: "bellmore",
    name: "Bellmore",
    address: "2803 Merrick Rd",
    city: "Bellmore, NY",
    zip: "11710",
    phone: "(516) 783-7600",
    phoneRaw: "5167837600",
    hours: [
      { days: "Mon – Thu", hours: "10:30am – 9:30pm" },
      { days: "Fri – Sat", hours: "10:30am – 10:00pm" },
      { days: "Sunday", hours: "11:00am – 9:00pm" },
    ],
    grubhub: "",
    ubereats: "https://www.ubereats.com/store/umbertos-of-bellmore/tvph_SbCRPSQMzYsWniIsw",
    doordash: "https://www.doordash.com/en-CA/store/umberto%27s-pizzeria-%26-restaurant-bellmore-836832/",
    appsuite: "https://umbertos.appsuitecrm.com/menu/928",
    mapUrl: "https://maps.google.com/?q=2803+Merrick+Rd+Bellmore+NY+11710",
    lat: 40.6660, lng: -73.5300,
    img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/326236A4A5195.jpg?w=600&fit=crop&auto=compress,format",
    capacity: "Up to 60 guests",
    features: ["Private Events (60 guests)", "Catering", "Dine-In & Takeout", "Delivery"],
  },
  {
    id: "lake-grove",
    name: "Lake Grove",
    address: "2847 Middle Country Rd",
    city: "Lake Grove, NY",
    zip: "11755",
    phone: "(631) 737-5600",
    phoneRaw: "6317375600",
    hours: [
      { days: "Mon – Thu", hours: "10:30am – 9:30pm" },
      { days: "Fri – Sat", hours: "10:30am – 10:00pm" },
      { days: "Sunday", hours: "11:00am – 9:00pm" },
    ],
    grubhub: "https://www.grubhub.com/restaurant/umbertos-pizzeria-111-alexander-ave-lake-grove/2683152",
    ubereats: "https://www.ubereats.com/store/umbertos-of-lake-grove/-DsZzZTVRoamf097cYspeQ",
    doordash: "https://www.doordash.com/en/business/umbertos-pizzeria-&-restaurant-65766/",
    appsuite: "https://umbertos.appsuitecrm.com/menu/2353",
    mapUrl: "https://maps.google.com/?q=2847+Middle+Country+Rd+Lake+Grove+NY+11755",
    lat: 40.8600, lng: -73.1200,
    img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/36275067_6A4A2737.jpg?w=600&fit=crop&auto=compress,format",
    capacity: "Up to 70 guests",
    features: ["Private Events (70 guests)", "Catering", "Dine-In & Takeout", "Delivery"],
  },
  {
    id: "farmingdale",
    name: "Farmingdale",
    address: "967 Broadhollow Rd",
    city: "Farmingdale, NY",
    zip: "11735",
    phone: "(631) 454-6440",
    phoneRaw: "6314546440",
    hours: [
      { days: "Mon – Thu", hours: "10:30am – 9:30pm" },
      { days: "Fri – Sat", hours: "10:30am – 10:00pm" },
      { days: "Sunday", hours: "11:00am – 9:00pm" },
    ],
    grubhub: "https://www.grubhub.com/restaurant/umbertos-of-farmingdale-211-airport-plaza-boulevard-farmingdale/14085304",
    ubereats: "https://www.ubereats.com/store/umbertos-of-farmingdale-211-airport-plaza-boulevard/ddPLRbgDWxO1Ok9gDlYrKg",
    doordash: "https://www.doordash.com/store/umbertos-pizzeria-&-restaurant-farmingdale-39524915/",
    appsuite: "https://umbertos.appsuitecrm.com/menu/3928",
    opentableUrl: "https://www.opentable.com/r/umbertos-of-farmingdale",
    mapUrl: "https://maps.google.com/?q=967+Broadhollow+Rd+Farmingdale+NY+11735",
    lat: 40.7282, lng: -73.4448,
    img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/12732Umbertos-Pepperoni-3.jpg?w=600&fit=crop&auto=compress,format",
    capacity: "Up to 50 guests",
    features: ["Private Events (50 guests)", "Catering", "Dine-In & Takeout", "Delivery", "Exclusive Offers"],
    slug: "farmingdale",
  },
];

// ─── Open/Closed status ───────────────────────────────────────────────────
// Each location shares the same hours schedule:
//   Mon–Thu  10:30 – 21:30
//   Fri–Sat  10:30 – 22:00
//   Sun      11:00 – 21:00
// All times are Eastern (America/New_York). We use the visitor's local clock
// converted to ET via Intl.DateTimeFormat so it works in any timezone.

interface OpenStatus {
  isOpen: boolean;
  label: string;   // e.g. "Open Now · Closes at 10:00 pm" or "Closed · Opens at 10:30 am"
}

function getOpenStatus(): OpenStatus {
  // Get current time in Eastern timezone
  const now = new Date();
  const etParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => etParts.find((p) => p.type === type)?.value ?? "";
  const weekday = get("weekday"); // "Mon", "Tue", etc.
  const hour = parseInt(get("hour"), 10);   // 0–23
  const minute = parseInt(get("minute"), 10);
  const totalMins = hour * 60 + minute; // minutes since midnight ET

  // Schedule: [openMins, closeMins, closeLabel, openLabel]
  type Slot = { open: number; close: number; closeLabel: string; openLabel: string };
  const schedule: Record<string, Slot> = {
    Mon: { open: 10 * 60 + 30, close: 21 * 60 + 30, closeLabel: "9:30 pm",  openLabel: "10:30 am" },
    Tue: { open: 10 * 60 + 30, close: 21 * 60 + 30, closeLabel: "9:30 pm",  openLabel: "10:30 am" },
    Wed: { open: 10 * 60 + 30, close: 21 * 60 + 30, closeLabel: "9:30 pm",  openLabel: "10:30 am" },
    Thu: { open: 10 * 60 + 30, close: 21 * 60 + 30, closeLabel: "9:30 pm",  openLabel: "10:30 am" },
    Fri: { open: 10 * 60 + 30, close: 22 * 60,       closeLabel: "10:00 pm", openLabel: "10:30 am" },
    Sat: { open: 10 * 60 + 30, close: 22 * 60,       closeLabel: "10:00 pm", openLabel: "10:30 am" },
    Sun: { open: 11 * 60,       close: 21 * 60,       closeLabel: "9:00 pm",  openLabel: "11:00 am" },
  };

  const slot = schedule[weekday];
  if (!slot) return { isOpen: false, label: "See hours below" };

  if (totalMins >= slot.open && totalMins < slot.close) {
    return { isOpen: true, label: `Open Now · Closes at ${slot.closeLabel}` };
  }

  // Closed — figure out when it next opens
  if (totalMins < slot.open) {
    // Opens later today
    return { isOpen: false, label: `Closed · Opens at ${slot.openLabel}` };
  }
  // Already closed for today — show tomorrow's open time
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayIdx = days.indexOf(weekday);
  const tomorrowSlot = schedule[days[(todayIdx + 1) % 7]];
  return { isOpen: false, label: `Closed · Opens ${tomorrowSlot.openLabel} tomorrow` };
}

function OpenStatusBadge() {
  const [status, setStatus] = useState<OpenStatus>(() => getOpenStatus());

  // Refresh every minute so the badge updates without a page reload
  useEffect(() => {
    const id = setInterval(() => setStatus(getOpenStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-body text-[0.65rem] font-semibold tracking-wide px-2 py-0.5 rounded-full ${
        status.isOpen
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
          : "bg-[oklch(0.94_0.01_60)] text-[oklch(0.48_0.03_60)] border border-[oklch(0.85_0.015_80)]"
      }`}
      aria-label={status.label}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
          status.isOpen ? "bg-emerald-500 animate-pulse" : "bg-[oklch(0.65_0.03_60)]"
        }`}
      />
      {status.label}
    </span>
  );
}

// Haversine distance in miles between two lat/lng points
function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Find nearest location using US Census Bureau geocoding API (no API key, no map dependency)
async function findNearestByZip(zip: string): Promise<{ location: Location; distanceMiles: number; neighborhood: string } | null> {
  try {
    // Use the free Zippopotam.us API to get lat/lng for any US zip code
    const res = await fetch(`https://api.zippopotam.us/us/${zip}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.places?.length) return null;
    const lat = parseFloat(data.places[0].latitude);
    const lng = parseFloat(data.places[0].longitude);
    const neighborhood = data.places[0]["place name"] + ", " + data.places[0]["state abbreviation"];
    const nearest = LOCATIONS.reduce((best, loc) => {
      const d = haversineDistance(lat, lng, loc.lat, loc.lng);
      return d < best.dist ? { loc, dist: d } : best;
    }, { loc: LOCATIONS[0], dist: Infinity });
    return { location: nearest.loc, distanceMiles: Math.round(nearest.dist * 10) / 10, neighborhood };
  } catch {
    return null;
  }
}

export default function Locations() {
  const [expandedId, setExpandedId] = useState<string | null>("new-hyde-park");
  const [zipInput, setZipInput] = useState("");
  const [zipResult, setZipResult] = useState<{ location: Location; found: boolean; distanceMiles?: number; neighborhood?: string } | null>(null);
  const [zipError, setZipError] = useState("");
  const [zipLoading, setZipLoading] = useState(false);
  const zipInputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const handleMapReady = (map: any) => {
    mapRef.current = map;
    LOCATIONS.forEach((loc) => {
      const marker = new (window as any).google.maps.Marker({
        position: { lat: loc.lat, lng: loc.lng },
        map,
        title: `Umberto's ${loc.name}`,
        icon: {
          path: (window as any).google.maps.SymbolPath.CIRCLE,
          scale: loc.flagship ? 12 : 9,
          fillColor: loc.slug ? "#C4973B" : "#C0392B",
          fillOpacity: 1,
          strokeColor: "#fff",
          strokeWeight: 2,
        },
      });
      const infoWindow = new (window as any).google.maps.InfoWindow({
        content: `<div style="font-family:sans-serif;padding:6px;max-width:180px"><strong style="font-size:13px">${loc.name}</strong><br/><span style="font-size:11px;color:#666">${loc.address}, ${loc.city}</span><br/><a href="tel:${loc.phoneRaw}" style="font-size:11px;color:#C0392B">${loc.phone}</a></div>`,
      });
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
        setExpandedId(loc.id);
        map.panTo({ lat: loc.lat, lng: loc.lng });
        map.setZoom(14);
        setTimeout(() => {
          document.getElementById(`location-${loc.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 200);
      });
      markersRef.current.push(marker);
    });
    const bounds = new (window as any).google.maps.LatLngBounds();
    LOCATIONS.forEach((loc) => bounds.extend({ lat: loc.lat, lng: loc.lng }));
    map.fitBounds(bounds);
  };

  useEffect(() => {
    document.title = "Umberto's Locations | 6 Long Island Pizzerias | New Hyde Park, Manhasset & More";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Find your nearest Umberto's Family Pizzeria. 6 Long Island locations: New Hyde Park, Manhasset, Massapequa Park, Bellmore, Lake Grove, and Farmingdale.");

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleZipSearch = async () => {
    const zip = zipInput.trim();
    if (zip.length !== 5 || !/^\d{5}$/.test(zip)) {
      setZipError("Please enter a valid 5-digit zip code.");
      setZipResult(null);
      return;
    }
    setZipError("");
    setZipLoading(true);
    try {
      const result = await findNearestByZip(zip);
      setZipLoading(false);
      if (result) {
        const { location, distanceMiles, neighborhood } = result;
        setZipResult({ location, found: true, distanceMiles, neighborhood });
        setExpandedId(location.id);
        if (mapRef.current) {
          mapRef.current.panTo({ lat: location.lat, lng: location.lng });
          mapRef.current.setZoom(14);
        }
        setTimeout(() => {
          document.getElementById(`location-${location.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
      } else {
        setZipError("Zip code not found. Try a nearby zip or browse all locations below.");
        setZipResult(null);
      }
    } catch {
      setZipLoading(false);
      setZipError("Could not look up that zip code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)]">
      <Navigation />

      {/* Hero banner — full width, above the fold */}
      <div className="relative h-[520px] w-full overflow-hidden border-b border-[oklch(0.88_0.015_80)]">
        <img
          src="/images/nhp-interior-staircase.avif"
          alt="Umberto's New Hyde Park — grand staircase and dining room"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16">
          <p className="text-white/70 font-body text-sm tracking-[0.15em] uppercase mb-2">6 Long Island Locations</p>
          <h1 className="text-white font-display text-4xl sm:text-5xl font-bold leading-tight mb-3">
            Find Your
            <span className="block text-[oklch(0.85_0.12_50)]">Nearest Umberto's</span>
          </h1>
          <p className="text-white/80 font-body text-base max-w-sm">
            Bellmore · Farmingdale · Lake Grove · Manhasset · Massapequa Park · New Hyde Park
          </p>
        </div>
      </div>

      {/* Schema.org */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "Umberto's Family Pizzeria",
        "description": "Home of the Original Grandma Slice since 1965. 6 Long Island locations.",
        "url": "https://www.umbertosfamily.com",
        "telephone": "+15164377698",
        "address": { "@type": "PostalAddress", "streetAddress": "633 Jericho Tpke", "addressLocality": "New Hyde Park", "addressRegion": "NY", "postalCode": "11040", "addressCountry": "US" },
        "numberOfLocations": 6,
      })}} />

      {/* Header */}
      <section className="py-16 bg-white border-b border-[oklch(0.88_0.015_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-label">6 Locations Across Long Island</span>
          <span className="red-line mx-auto" />
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[oklch(0.20_0.025_60)] leading-tight mb-4">
            FIND YOUR UMBERTO'S
          </h1>
          <p className="font-body text-[oklch(0.48_0.03_60)] max-w-xl mx-auto mb-8">
            Six locations across Nassau and Suffolk County. Enter your zip code to find the nearest one, or browse all locations below.
          </p>

          {/* Zip code finder */}
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[oklch(0.55_0.03_60)]" />
                <input
                  ref={zipInputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={5}
                  value={zipInput}
                  onChange={(e) => setZipInput(e.target.value.replace(/\D/g, ""))}
                  onKeyDown={(e) => { if (e.key === "Enter") handleZipSearch(); }}
                  placeholder="Enter your zip code"
                  className="w-full pl-9 pr-4 py-3.5 border-2 border-[oklch(0.88_0.015_80)] bg-white font-body text-sm text-[oklch(0.20_0.025_60)] focus:outline-none focus:border-[oklch(0.46_0.22_25)] transition-colors"
                  aria-label="Enter zip code to find nearest Umberto's"
                />
              </div>
              <button
                onClick={handleZipSearch}
                disabled={zipLoading}
                className="btn-red text-sm px-5 whitespace-nowrap disabled:opacity-60"
                aria-label="Find nearest location"
              >
                {zipLoading ? (
                  <svg className="animate-spin" width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" /></svg>
                ) : (
                  <Navigation2 size={15} />
                )}
                {zipLoading ? "Searching..." : "Find"}
              </button>
            </div>
            {zipError && <p className="font-body text-xs text-[oklch(0.46_0.22_25)] mt-2">{zipError}</p>}
            {zipResult && (
              <div className={`mt-3 p-3 border-2 text-left ${zipResult.found ? "border-[oklch(0.46_0.22_25)] bg-[oklch(0.97_0.015_80)]" : "border-[oklch(0.88_0.015_80)] bg-white"}`}>
                {zipResult.found ? (
                  <>
                    <p className="font-display text-[oklch(0.46_0.22_25)] text-sm tracking-wider">NEAREST LOCATION FOUND!</p>
                    <p className="font-body text-sm text-[oklch(0.20_0.025_60)] mt-1">
                      <strong>{zipResult.location.name}</strong> — {zipResult.location.address}, {zipResult.location.city}
                    </p>
                    {zipResult.distanceMiles !== undefined && (
                      <p className="font-body text-xs text-[oklch(0.48_0.03_60)] mt-0.5">
                        {zipResult.neighborhood && <>{zipResult.neighborhood} · </>}{zipResult.distanceMiles} miles away · {zipResult.location.phone}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-3">
                      <a
                        href={zipResult.location.appsuite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-[oklch(0.46_0.22_25)] text-white font-display text-xs tracking-[0.1em] uppercase px-3 py-2 hover:bg-[oklch(0.38_0.22_25)] transition-colors"
                      >
                        <ShoppingCart size={12} /> Order Now
                      </a>
                      <a
                        href={zipResult.location.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-[oklch(0.46_0.22_25)] text-[oklch(0.46_0.22_25)] font-display text-xs tracking-[0.1em] uppercase px-3 py-2 hover:bg-[oklch(0.97_0.015_80)] transition-colors"
                      >
                        <Navigation2 size={12} /> Get Directions
                      </a>
                      <a
                        href={`tel:${zipResult.location.phoneRaw}`}
                        className="inline-flex items-center gap-1.5 border border-[oklch(0.88_0.015_80)] text-[oklch(0.48_0.03_60)] font-display text-xs tracking-[0.1em] uppercase px-3 py-2 hover:bg-[oklch(0.97_0.015_80)] transition-colors"
                      >
                        <Phone size={12} /> Call Us
                      </a>
                    </div>
                  </>
                ) : (
                  <p className="font-body text-sm text-[oklch(0.48_0.03_60)]">
                    Zip code not found. Browse all locations below or call us at (516) 437-7698.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Location accordion cards */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {LOCATIONS.map((loc, i) => {
            const isExpanded = expandedId === loc.id;
            return (
              <article
                key={loc.id}
                id={`location-${loc.id}`}
                className={`bg-white border-2 transition-all duration-300 ${isExpanded ? "border-[oklch(0.46_0.22_25)] shadow-lg" : "border-[oklch(0.88_0.015_80)] hover:border-[oklch(0.46_0.22_25)]/50"}`}
                itemScope
                itemType="https://schema.org/Restaurant"
              >
                {/* Header — always visible */}
                <button
                  className="w-full text-left p-5 flex items-center gap-4"
                  onClick={() => { if (expandedId !== loc.id) setExpandedId(loc.id); }}
                  aria-expanded={isExpanded}
                  aria-controls={`detail-${loc.id}`}
                >
                  <div className="w-16 h-16 flex-shrink-0 overflow-hidden">
                    <img src={loc.img} alt={`Umberto's ${loc.name}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-base" itemProp="name">
                        {loc.name.toUpperCase()}
                      </h2>
                      {loc.flagship && (
                        <span className="bg-[oklch(0.46_0.22_25)] text-white font-display text-[0.55rem] tracking-[0.12em] px-2 py-0.5">FLAGSHIP</span>
                      )}
                      {loc.slug && (
                        <span className="bg-[oklch(0.68_0.13_75)] text-white font-display text-[0.55rem] tracking-[0.12em] px-2 py-0.5">EXCLUSIVE OFFERS</span>
                      )}
                      <OpenStatusBadge />
                    </div>
                    <p className="font-body text-sm text-[oklch(0.48_0.03_60)]" itemProp="address">{loc.address}, {loc.city} {loc.zip}</p>
                    <p className="font-body text-sm text-[oklch(0.46_0.22_25)]" itemProp="telephone">{loc.phone}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="hidden sm:flex items-center gap-0.5">
                      {[1,2,3,4,5].map(j => <Star key={j} size={11} className="text-[oklch(0.68_0.13_75)] fill-[oklch(0.68_0.13_75)]" />)}
                    </div>
                    {isExpanded
                      ? <ChevronUp size={20} className="text-[oklch(0.46_0.22_25)]" />
                      : <ChevronDown size={20} className="text-[oklch(0.55_0.03_60)]" />}
                  </div>
                </button>

                {/* Expanded detail — always in DOM, shown/hidden via CSS */}
                <div
                  id={`detail-${loc.id}`}
                  style={{ display: isExpanded ? "block" : "none" }}
                  className="border-t border-[oklch(0.88_0.015_80)] p-5"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Hours */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Clock size={14} className="text-[oklch(0.46_0.22_25)]" />
                          <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-xs">HOURS</h3>
                        </div>
                        {loc.hours.map((h) => (
                          <div key={h.days} className="mb-1.5">
                            <p className="font-body text-xs font-semibold text-[oklch(0.28_0.025_60)]">{h.days}</p>
                            <p className="font-body text-xs text-[oklch(0.48_0.03_60)]">{h.hours}</p>
                          </div>
                        ))}
                        <div className="mt-3 pt-3 border-t border-[oklch(0.88_0.015_80)]">
                          <p className="font-body text-xs text-[oklch(0.48_0.03_60)]">Events: <strong className="text-[oklch(0.28_0.025_60)]">{loc.capacity}</strong></p>
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin size={14} className="text-[oklch(0.46_0.22_25)]" />
                          <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-xs">FEATURES</h3>
                        </div>
                        <ul className="space-y-1 mb-4">
                          {loc.features.map((f) => (
                            <li key={f} className="flex items-center gap-1.5 font-body text-xs text-[oklch(0.38_0.03_60)]">
                              <span className="w-1 h-1 rounded-full bg-[oklch(0.46_0.22_25)] flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-body text-xs text-[oklch(0.46_0.22_25)] hover:underline">
                          <ExternalLink size={11} /> Get Directions on Google Maps
                        </a>
                      </div>

                      {/* Order buttons */}
                      <div>
                        <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-xs mb-3">ORDER NOW</h3>
                        <div className="space-y-2">
                          {/* Primary: AppSuite online ordering */}
                          <a href={loc.appsuite} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[oklch(0.46_0.22_25)] text-white font-display text-xs tracking-[0.1em] uppercase px-4 py-2.5 hover:bg-[oklch(0.55_0.22_25)] transition-colors w-full">
                            <ShoppingCart size={12} /> Order Online — {loc.name}
                          </a>
                          <a href={`tel:${loc.phoneRaw}`} className="flex items-center gap-2 border border-[oklch(0.88_0.015_80)] text-[oklch(0.38_0.03_60)] font-display text-xs tracking-[0.1em] uppercase px-4 py-2.5 hover:border-[oklch(0.46_0.22_25)] hover:text-[oklch(0.46_0.22_25)] transition-colors w-full">
                            <Phone size={12} /> Call {loc.phone}
                          </a>
                          {/* OpenTable reservation */}
                          {loc.opentableUrl && (
                            <a href={loc.opentableUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-[oklch(0.55_0.20_145)] text-[oklch(0.35_0.15_145)] font-display text-xs tracking-[0.1em] uppercase px-4 py-2.5 hover:bg-[oklch(0.55_0.20_145)]/5 transition-colors w-full">
                              <Calendar size={12} /> Reserve on OpenTable
                            </a>
                          )}
                          {loc.grubhub && (
                            <a href={loc.grubhub} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-[oklch(0.88_0.015_80)] text-[oklch(0.38_0.03_60)] font-display text-xs tracking-[0.1em] uppercase px-4 py-2.5 hover:border-[oklch(0.46_0.22_25)] hover:text-[oklch(0.46_0.22_25)] transition-colors w-full">
                              <ArrowRight size={12} /> Order on Grubhub
                            </a>
                          )}
                          <a href={loc.ubereats} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-[oklch(0.88_0.015_80)] text-[oklch(0.38_0.03_60)] font-display text-xs tracking-[0.1em] uppercase px-4 py-2.5 hover:border-[oklch(0.46_0.22_25)] hover:text-[oklch(0.46_0.22_25)] transition-colors w-full">
                            <ArrowRight size={12} /> Order on Uber Eats
                          </a>
                          <a href={loc.doordash} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-[oklch(0.88_0.015_80)] text-[oklch(0.38_0.03_60)] font-display text-xs tracking-[0.1em] uppercase px-4 py-2.5 hover:border-[oklch(0.46_0.22_25)] hover:text-[oklch(0.46_0.22_25)] transition-colors w-full">
                            <ArrowRight size={12} /> Order on DoorDash
                          </a>
                          {/* Directions */}
                          <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-[oklch(0.88_0.015_80)] text-[oklch(0.38_0.03_60)] font-display text-xs tracking-[0.1em] uppercase px-4 py-2.5 hover:border-[oklch(0.46_0.22_25)] hover:text-[oklch(0.46_0.22_25)] transition-colors w-full">
                            <Navigation2 size={12} /> Get Directions
                          </a>
                          {loc.slug && (
                            <Link href={`/${loc.slug}`} className="flex items-center gap-2 bg-[oklch(0.68_0.13_75)] text-white font-display text-xs tracking-[0.1em] uppercase px-4 py-2.5 hover:bg-[oklch(0.75_0.13_75)] transition-colors w-full">
                              <Star size={12} /> View Exclusive Offers
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[oklch(0.46_0.22_25)] mt-4">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-white mb-3">CAN'T FIND YOUR LOCATION?</h2>
          <p className="font-body text-white/80 mb-5">Call our New Hyde Park flagship and we'll help you find the nearest Umberto's.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="tel:5164377698" className="btn-white text-sm"><Phone size={14} /> (516) 437-7698</a>
            <Link href="/catering" className="inline-flex items-center gap-2 border-2 border-white text-white font-display text-sm tracking-[0.1em] uppercase px-6 py-3.5 hover:bg-white/10 transition-colors">Catering Inquiry <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
