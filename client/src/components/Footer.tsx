/*
 * Footer — Umberto's Family Pizzeria v2
 * Warm dark footer (charcoal) — contrasts with light page body
 */
import { Link } from "wouter";
import { Phone, MapPin, Instagram, Facebook, Youtube, ExternalLink, Star } from "lucide-react";

const locations = [
  { name: "New Hyde Park", address: "633 Jericho Turnpike, NY 11040", phone: "(516) 437-7698", flagship: true },
  { name: "Manhasset", address: "1558 Northern Blvd, NY 11030", phone: "(516) 472-7801" },
  { name: "Bellmore", address: "2427 Merrick Rd, NY 11710", phone: "(516) 409-1400" },
  { name: "Massapequa Park", address: "4897 Merrick Rd, NY 11762", phone: "(516) 541-3030" },
  { name: "Lake Grove", address: "2192 Nesconset Hwy, NY 11755", phone: "(631) 862-6777" },
  { name: "Farmingdale", address: "967 Broadhollow Rd, NY 11735", phone: "(631) 454-6440" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[oklch(0.20_0.025_60)] text-[oklch(0.80_0.02_80)]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <img
              src="https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/26750UmbertoS-Logo.png"
              alt="Umberto's Family Pizzeria"
              className="h-14 w-auto mb-4 brightness-200"
              loading="lazy"
            />
            <p className="font-body text-sm text-[oklch(0.60_0.02_80)] leading-relaxed mb-5">
              Home of the Original Grandma Slice since 1965. Family owned and operated across 6 Long Island locations.
            </p>
            <div className="flex gap-3 mb-5">
              {[
                { href: "https://www.facebook.com/UmbertosNHP", Icon: Facebook, label: "Facebook" },
                { href: "https://www.instagram.com/umbertospizza/", Icon: Instagram, label: "Instagram" },
                { href: "https://www.youtube.com/channel/UC9kJOFKcWykXyfHo8qzTt7A", Icon: Youtube, label: "YouTube" },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 flex items-center justify-center border border-[oklch(0.32_0.025_60)] text-[oklch(0.60_0.02_80)] hover:text-white hover:border-[oklch(0.46_0.22_25)] hover:bg-[oklch(0.46_0.22_25)] transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
            <Link href="/rewards" className="inline-flex items-center gap-1.5 text-[oklch(0.68_0.13_75)] font-display text-xs tracking-[0.12em] uppercase hover:text-[oklch(0.78_0.13_75)] transition-colors">
              <Star size={12} className="fill-current" /> Rewards Program
            </Link>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-[oklch(0.92_0.02_80)] text-base tracking-[0.1em] mb-5 uppercase">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/menu", label: "View Menu" },
                { href: "/order", label: "Order Online" },
                { href: "/catering", label: "Catering Services" },
                { href: "/private-events", label: "Private Events" },
                { href: "/shipping", label: "Ship Nationwide" },
                { href: "/rewards", label: "Rewards Program" },
                { href: "/locations", label: "All Locations" },
                { href: "/about", label: "Our Story" },
                { href: "/faq", label: "FAQ" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-sm text-[oklch(0.60_0.02_80)] hover:text-[oklch(0.46_0.22_25)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="https://www.goldbelly.com/restaurants/umbertos-pizzeria/?utm_source=partner&utm_medium=website&utm_term=2702"
                  target="_blank" rel="noopener noreferrer"
                  className="font-body text-sm text-[oklch(0.60_0.02_80)] hover:text-[oklch(0.46_0.22_25)] transition-colors flex items-center gap-1">
                  Goldbelly Shipping <ExternalLink size={10} />
                </a>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-[oklch(0.92_0.02_80)] text-base tracking-[0.1em] mb-5 uppercase">Our Locations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {locations.map((loc) => (
                <div key={loc.name}>
                  <div className="flex items-start gap-2">
                    <MapPin size={13} className="text-[oklch(0.46_0.22_25)] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-display text-[oklch(0.92_0.02_80)] text-sm tracking-wider">
                        {loc.name}
                        {loc.flagship && (
                          <span className="ml-2 text-[0.6rem] bg-[oklch(0.46_0.22_25)] text-white px-1.5 py-0.5 tracking-wider">FLAGSHIP</span>
                        )}
                      </p>
                      <p className="font-body text-xs text-[oklch(0.50_0.02_80)] mt-0.5">{loc.address}</p>
                      <a href={`tel:${loc.phone.replace(/\D/g, "")}`}
                        className="font-body text-xs text-[oklch(0.46_0.22_25)] hover:underline flex items-center gap-1 mt-0.5">
                        <Phone size={10} /> {loc.phone}
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
      <div className="border-t border-[oklch(0.28_0.025_60)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-[oklch(0.42_0.02_60)]">
            © {year} Umberto's Family Pizzeria. All rights reserved. Family Owned &amp; Operated Since 1965. New Hyde Park, Long Island, NY.
          </p>
          <div className="flex gap-4">
            <a href="https://www.umbertosfamily.com/contact/" target="_blank" rel="noopener noreferrer"
              className="font-body text-xs text-[oklch(0.42_0.02_60)] hover:text-[oklch(0.46_0.22_25)] transition-colors">Contact</a>
            <a href="https://www.umbertosfamily.com/jobs/" target="_blank" rel="noopener noreferrer"
              className="font-body text-xs text-[oklch(0.42_0.02_60)] hover:text-[oklch(0.46_0.22_25)] transition-colors">Jobs</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
