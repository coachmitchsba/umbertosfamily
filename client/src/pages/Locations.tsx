/*
 * Locations Page — Umberto's Family Pizzeria
 * Design: Dark, clean, location-card layout with map integration
 * SEO: Local SEO for each location, schema markup, Google Maps
 */
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MapPin, Phone, Clock, ExternalLink, Navigation2 } from "lucide-react";
import MapView from "@/components/Map";

const locations = [
  {
    id: "new-hyde-park",
    name: "New Hyde Park",
    subtitle: "Flagship Location",
    address: "633 Jericho Turnpike",
    city: "New Hyde Park, NY 11040",
    phone: "(516) 437-7698",
    lat: 40.7324,
    lng: -73.6874,
    hours: {
      "Mon–Thu": "10:30am – 9:30pm",
      "Fri–Sat": "10:30am – 10:00pm",
      "Sunday": "11:00am – 9:00pm",
    },
    features: ["Dine-In", "Takeout", "Delivery", "Catering", "Private Events (250 guests)", "Full Bar", "Café"],
    mapsUrl: "https://www.google.com/maps/place/Umberto's+Pizzeria/@40.7324,-73.6874,17z",
    flagship: true,
  },
  {
    id: "manhasset",
    name: "Manhasset",
    address: "429 Plandome Road",
    city: "Manhasset, NY 11030",
    phone: "(516) 472-7801",
    lat: 40.7895,
    lng: -73.6971,
    hours: {
      "Mon–Thu": "10:30am – 9:30pm",
      "Fri–Sat": "10:30am – 10:00pm",
      "Sunday": "11:00am – 9:00pm",
    },
    features: ["Dine-In", "Takeout", "Delivery", "Catering", "Private Events (25 guests)"],
    mapsUrl: "https://www.google.com/maps/search/Umberto's+Pizzeria+Manhasset+NY",
  },
  {
    id: "bellmore",
    name: "Bellmore",
    address: "208 Bedford Ave",
    city: "Bellmore, NY 11710",
    phone: "(516) 409-1400",
    lat: 40.6681,
    lng: -73.5296,
    hours: {
      "Mon–Thu": "10:30am – 9:30pm",
      "Fri–Sat": "10:30am – 10:00pm",
      "Sunday": "11:00am – 9:00pm",
    },
    features: ["Dine-In", "Takeout", "Delivery", "Catering", "Private Events (50 guests)"],
    mapsUrl: "https://www.google.com/maps/search/Umberto's+Pizzeria+Bellmore+NY",
  },
  {
    id: "massapequa-park",
    name: "Massapequa Park",
    address: "1011 Park Blvd",
    city: "Massapequa Park, NY 11762",
    phone: "(516) 541-3030",
    lat: 40.6765,
    lng: -73.4593,
    hours: {
      "Mon–Thu": "10:30am – 9:30pm",
      "Fri–Sat": "10:30am – 10:00pm",
      "Sunday": "11:00am – 9:00pm",
    },
    features: ["Dine-In", "Takeout", "Delivery", "Catering", "Private Events (50 guests)"],
    mapsUrl: "https://www.google.com/maps/search/Umberto's+Pizzeria+Massapequa+Park+NY",
  },
  {
    id: "lake-grove",
    name: "Lake Grove",
    address: "111 Alexander Ave",
    city: "Lake Grove, NY 11755",
    phone: "(631) 862-6777",
    lat: 40.8562,
    lng: -73.1143,
    hours: {
      "Mon–Thu": "10:30am – 9:30pm",
      "Fri–Sat": "10:30am – 10:00pm",
      "Sunday": "11:00am – 9:00pm",
    },
    features: ["Dine-In", "Takeout", "Delivery", "Catering", "Private Events (50 guests)"],
    mapsUrl: "https://www.google.com/maps/search/Umberto's+Pizzeria+Lake+Grove+NY",
  },
  {
    id: "farmingdale",
    name: "Farmingdale",
    address: "211 Airport Plaza Blvd",
    city: "Farmingdale, NY 11735",
    phone: "(631) 454-6440",
    lat: 40.7282,
    lng: -73.4341,
    hours: {
      "Mon–Thu": "10:30am – 9:30pm",
      "Fri–Sat": "10:30am – 10:00pm",
      "Sunday": "11:00am – 9:00pm",
    },
    features: ["Dine-In", "Takeout", "Delivery", "Catering"],
    mapsUrl: "https://www.google.com/maps/search/Umberto's+Pizzeria+Farmingdale+NY",
  },
];

export default function Locations() {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [mapReady, setMapReady] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Pan map to selected location
  useEffect(() => {
    if (map && mapReady) {
      const loc = locations[selectedLocation];
      map.panTo({ lat: loc.lat, lng: loc.lng });
      map.setZoom(15);
    }
  }, [selectedLocation, map, mapReady]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMapReady = (googleMap: any) => {
    setMap(googleMap);
    setMapReady(true);

    // Add markers for all locations
    locations.forEach((loc, i) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const g = (window as any).google;
      if (!g) return;
      const marker = new g.maps.Marker({
        position: { lat: loc.lat, lng: loc.lng },
        map: googleMap,
        title: `Umberto's ${loc.name}`,
        icon: {
          path: g.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#D4271B",
          fillOpacity: 1,
          strokeColor: "#F2E8D5",
          strokeWeight: 2,
        },
      });

      marker.addListener("click", () => {
        setSelectedLocation(i);
      });
    });

    // Center on Long Island
    googleMap.setCenter({ lat: 40.75, lng: -73.5 });
    googleMap.setZoom(10);
  };

  return (
    <div className="min-h-screen bg-[oklch(0.10_0.015_60)]">
      <Navigation />

      {/* Header */}
      <header className="py-16 bg-[oklch(0.12_0.018_60)] border-b border-[oklch(0.20_0.02_60)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block w-12 h-0.5 bg-[oklch(0.46_0.22_25)] mb-4 mx-auto" />
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[oklch(0.94_0.03_80)] leading-tight">
            OUR LOCATIONS
          </h1>
          <p className="font-serif italic text-[oklch(0.72_0.14_75)] text-xl mt-2 mb-4">
            6 Locations Across Long Island, New York
          </p>
          <p className="font-body text-[oklch(0.62_0.03_80)] max-w-xl mx-auto">
            Find your nearest Umberto's Family Pizzeria. All locations offer dine-in, takeout, delivery, and catering services.
          </p>
        </div>
      </header>

      {/* Map + Location list */}
      <section className="py-12" aria-labelledby="location-map">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Location list */}
            <div className="lg:col-span-2 space-y-2 order-2 lg:order-1">
              {locations.map((loc, i) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(i)}
                  className={`w-full text-left p-4 border transition-all ${
                    selectedLocation === i
                      ? "border-[oklch(0.46_0.22_25)] bg-[oklch(0.14_0.018_60)]"
                      : "border-[oklch(0.20_0.02_60)] bg-[oklch(0.12_0.018_60)] hover:border-[oklch(0.35_0.02_60)]"
                  }`}
                  itemScope
                  itemType="https://schema.org/Restaurant"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display text-[oklch(0.94_0.03_80)] tracking-wider" itemProp="name">
                      Umberto's — {loc.name}
                    </span>
                    {loc.flagship && (
                      <span className="text-[0.6rem] bg-[oklch(0.46_0.22_25)] text-[oklch(0.98_0.01_80)] px-1.5 py-0.5 tracking-wider">
                        FLAGSHIP
                      </span>
                    )}
                  </div>
                  <p className="font-body text-xs text-[oklch(0.55_0.03_80)]" itemProp="address">{loc.address}, {loc.city}</p>
                  <a
                    href={`tel:${loc.phone.replace(/\D/g, "")}`}
                    className="font-body text-xs text-[oklch(0.72_0.14_75)] hover:text-[oklch(0.80_0.14_75)] transition-colors mt-1 flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                    itemProp="telephone"
                  >
                    <Phone size={10} /> {loc.phone}
                  </a>
                </button>
              ))}
            </div>

            {/* Map */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="h-[400px] lg:h-[500px] overflow-hidden border border-[oklch(0.20_0.02_60)]">
                <MapView
                  onMapReady={handleMapReady}
                  defaultCenter={{ lat: 40.75, lng: -73.5 }}
                  defaultZoom={10}
                  mapStyle="dark"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location detail cards */}
      <section className="py-12 bg-[oklch(0.12_0.018_60)]" aria-labelledby="location-details">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="location-details" className="reveal font-display text-2xl text-[oklch(0.94_0.03_80)] tracking-wider mb-8 text-center">
            LOCATION DETAILS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {locations.map((loc, i) => (
              <article
                key={loc.id}
                className="reveal bg-[oklch(0.14_0.018_60)] border border-[oklch(0.20_0.02_60)] p-6"
                style={{ transitionDelay: `${i * 60}ms` }}
                itemScope
                itemType="https://schema.org/Restaurant"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display text-[oklch(0.94_0.03_80)] text-lg tracking-wider" itemProp="name">
                      {loc.name}
                    </h3>
                    {loc.flagship && (
                      <span className="text-[0.6rem] text-[oklch(0.72_0.14_75)] tracking-wider">FLAGSHIP LOCATION</span>
                    )}
                  </div>
                  <MapPin size={18} className="text-[oklch(0.46_0.22_25)] flex-shrink-0" />
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin size={13} className="text-[oklch(0.46_0.22_25)] mt-0.5 flex-shrink-0" />
                    <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                      <p className="font-body text-sm text-[oklch(0.75_0.03_80)]" itemProp="streetAddress">{loc.address}</p>
                      <p className="font-body text-sm text-[oklch(0.75_0.03_80)]" itemProp="addressLocality">{loc.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-[oklch(0.46_0.22_25)] flex-shrink-0" />
                    <a
                      href={`tel:${loc.phone.replace(/\D/g, "")}`}
                      className="font-body text-sm text-[oklch(0.72_0.14_75)] hover:text-[oklch(0.80_0.14_75)] transition-colors"
                      itemProp="telephone"
                    >
                      {loc.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock size={13} className="text-[oklch(0.46_0.22_25)] mt-0.5 flex-shrink-0" />
                    <div>
                      {Object.entries(loc.hours).map(([day, hours]) => (
                        <p key={day} className="font-body text-xs text-[oklch(0.58_0.03_80)]">
                          <span className="text-[oklch(0.75_0.03_80)]">{day}:</span> {hours}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {loc.features.map((f) => (
                    <span key={f} className="font-body text-[0.65rem] text-[oklch(0.62_0.03_80)] border border-[oklch(0.25_0.02_60)] px-2 py-0.5">
                      {f}
                    </span>
                  ))}
                </div>

                <a
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-display text-xs text-[oklch(0.46_0.22_25)] hover:text-[oklch(0.55_0.22_25)] tracking-wider uppercase transition-colors"
                >
                  <Navigation2 size={12} /> Get Directions <ExternalLink size={10} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
