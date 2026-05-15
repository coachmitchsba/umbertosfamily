/*
 * Footer — Umberto's Family Pizzeria
 * Design: Dark footer with brand story, locations, quick links, social
 */
import { Link } from "wouter";
import { Phone, MapPin, Instagram, Facebook, Youtube, ExternalLink } from "lucide-react";

const locations = [
  { name: "New Hyde Park", address: "633 Jericho Turnpike, NY 11040", phone: "(516) 437-7698", flagship: true },
  { name: "Manhasset", address: "429 Plandome Road, NY 11030", phone: "(516) 472-7801" },
  { name: "Bellmore", address: "208 Bedford Ave, NY 11710", phone: "(516) 409-1400" },
  { name: "Massapequa Park", address: "1011 Park Blvd, NY 11762", phone: "(516) 541-3030" },
  { name: "Lake Grove", address: "111 Alexander Ave, NY 11755", phone: "(631) 862-6777" },
  { name: "Farmingdale", address: "211 Airport Plaza Blvd, NY 11735", phone: "(631) 454-6440" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[oklch(0.08_0.012_60)] border-t border-[oklch(0.20_0.02_60)]" role="contentinfo">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <img
              src="https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/26750UmbertoS-Logo.png"
              alt="Umberto's Family Pizzeria"
              className="h-16 w-auto mb-4"
              loading="lazy"
            />
            <p className="font-body text-[oklch(0.62_0.03_80)] text-sm leading-relaxed mb-4">
              Home of the Original Grandma Slice since 1965. Family owned and operated across Long Island, New York.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/UmbertosNHP"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Umberto's on Facebook"
                className="w-9 h-9 flex items-center justify-center border border-[oklch(0.30_0.02_60)] text-[oklch(0.62_0.03_80)] hover:text-[oklch(0.46_0.22_25)] hover:border-[oklch(0.46_0.22_25)] transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://www.instagram.com/umbertospizza/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Umberto's on Instagram"
                className="w-9 h-9 flex items-center justify-center border border-[oklch(0.30_0.02_60)] text-[oklch(0.62_0.03_80)] hover:text-[oklch(0.46_0.22_25)] hover:border-[oklch(0.46_0.22_25)] transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.youtube.com/channel/UC9kJOFKcWykXyfHo8qzTt7A"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Umberto's on YouTube"
                className="w-9 h-9 flex items-center justify-center border border-[oklch(0.30_0.02_60)] text-[oklch(0.62_0.03_80)] hover:text-[oklch(0.46_0.22_25)] hover:border-[oklch(0.46_0.22_25)] transition-colors"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-[oklch(0.94_0.03_80)] text-lg tracking-[0.08em] mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/menu", label: "View Menu" },
                { href: "/order", label: "Order Online" },
                { href: "/catering", label: "Catering Services" },
                { href: "/private-events", label: "Private Events" },
                { href: "/locations", label: "All Locations" },
                { href: "/about", label: "Our Story" },
                { href: "/faq", label: "FAQ" },
                { href: "https://umbertos.appsuitecrm.com", label: "Rewards Program", external: true },
              ].map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-sm text-[oklch(0.62_0.03_80)] hover:text-[oklch(0.46_0.22_25)] transition-colors flex items-center gap-1"
                    >
                      {link.label} <ExternalLink size={10} />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="font-body text-sm text-[oklch(0.62_0.03_80)] hover:text-[oklch(0.46_0.22_25)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-[oklch(0.94_0.03_80)] text-lg tracking-[0.08em] mb-5">Our Locations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {locations.map((loc) => (
                <div key={loc.name} className="group">
                  <div className="flex items-start gap-2">
                    <MapPin size={13} className="text-[oklch(0.46_0.22_25)] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-display text-[oklch(0.94_0.03_80)] text-sm tracking-wider">
                        {loc.name}
                        {loc.flagship && (
                          <span className="ml-2 text-[0.6rem] bg-[oklch(0.46_0.22_25)] text-[oklch(0.98_0.01_80)] px-1.5 py-0.5 tracking-wider">
                            FLAGSHIP
                          </span>
                        )}
                      </p>
                      <p className="font-body text-xs text-[oklch(0.55_0.03_80)] mt-0.5">{loc.address}</p>
                      <a
                        href={`tel:${loc.phone.replace(/\D/g, "")}`}
                        className="font-body text-xs text-[oklch(0.72_0.14_75)] hover:text-[oklch(0.80_0.14_75)] transition-colors flex items-center gap-1 mt-0.5"
                      >
                        <Phone size={10} />
                        {loc.phone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[oklch(0.18_0.02_60)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-[oklch(0.45_0.02_60)]">
            © {year} Umberto's Family Pizzeria. All rights reserved. Family Owned &amp; Operated Since 1965.
          </p>
          <div className="flex gap-4">
            <span className="font-body text-xs text-[oklch(0.45_0.02_60)]">New Hyde Park, Long Island, NY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
