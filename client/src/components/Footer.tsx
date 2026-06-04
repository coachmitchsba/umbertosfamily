/*
 * Footer — Umberto's Family Pizzeria v3
 * Warm beige background matching the header — consistent brand feel
 * Social icons use authentic brand colors: Facebook #1877F2, Instagram gradient, YouTube #FF0000
 */
import { Link } from "wouter";
import { Phone, MapPin, ExternalLink, Star } from "lucide-react";

const locations = [
  { name: "New Hyde Park", address: "633 Jericho Turnpike, NY 11040", phone: "(516) 437-7698", flagship: true },
  { name: "Manhasset", address: "1558 Northern Blvd, NY 11030", phone: "(516) 472-7801" },
  { name: "Bellmore", address: "2427 Merrick Rd, NY 11710", phone: "(516) 409-1400" },
  { name: "Massapequa Park", address: "4897 Merrick Rd, NY 11762", phone: "(516) 541-3030" },
  { name: "Lake Grove", address: "2192 Nesconset Hwy, NY 11755", phone: "(631) 862-6777" },
  { name: "Farmingdale", address: "967 Broadhollow Rd, NY 11735", phone: "(631) 454-6440" },
];

// Authentic brand SVG icons
function FacebookIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="25%" stopColor="#FCAF45" />
          <stop offset="50%" stopColor="#F77737" />
          <stop offset="75%" stopColor="#F56040" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function YoutubeIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF0000" aria-hidden="true">
      <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[oklch(0.96_0.018_80)] text-[oklch(0.35_0.03_60)] border-t border-[oklch(0.88_0.02_80)]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <img
              src="https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/26750UmbertoS-Logo.png"
              alt="Umberto's Family Pizzeria"
              className="h-14 w-auto mb-4"
              loading="lazy"
            />
            <p className="font-body text-sm text-[oklch(0.48_0.025_60)] leading-relaxed mb-5">
              Home of the Original Grandma Slice since 1965. Family owned and operated across 6 Long Island locations.
            </p>
            <div className="flex gap-3 mb-5">
              <a href="https://www.facebook.com/UmbertosNHP" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center border border-[oklch(0.82_0.02_80)] bg-white hover:border-[#1877F2] hover:shadow-sm transition-all">
                <FacebookIcon size={15} />
              </a>
              <a href="https://www.instagram.com/umbertospizza/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center border border-[oklch(0.82_0.02_80)] bg-white hover:border-[#F56040] hover:shadow-sm transition-all">
                <InstagramIcon size={15} />
              </a>
              <a href="https://www.youtube.com/channel/UC9kJOFKcWykXyfHo8qzTt7A" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="w-9 h-9 flex items-center justify-center border border-[oklch(0.82_0.02_80)] bg-white hover:border-[#FF0000] hover:shadow-sm transition-all">
                <YoutubeIcon size={15} />
              </a>
            </div>
            <Link href="/rewards" className="inline-flex items-center gap-1.5 text-[oklch(0.55_0.13_75)] font-display text-xs tracking-[0.12em] uppercase hover:text-[oklch(0.46_0.22_25)] transition-colors">
              <Star size={12} className="fill-current" /> Rewards Program
            </Link>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-[oklch(0.22_0.025_60)] text-base tracking-[0.1em] mb-5 uppercase">Quick Links</h3>
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
                  <Link href={link.href} className="font-body text-sm text-[oklch(0.48_0.025_60)] hover:text-[oklch(0.46_0.22_25)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="https://www.goldbelly.com/restaurants/umbertos-pizzeria/?utm_source=partner&utm_medium=website&utm_term=2702"
                  target="_blank" rel="noopener noreferrer"
                  className="font-body text-sm text-[oklch(0.48_0.025_60)] hover:text-[oklch(0.46_0.22_25)] transition-colors flex items-center gap-1">
                  Goldbelly Shipping <ExternalLink size={10} />
                </a>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-[oklch(0.22_0.025_60)] text-base tracking-[0.1em] mb-5 uppercase">Our Locations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {locations.map((loc) => (
                <div key={loc.name}>
                  <div className="flex items-start gap-2">
                    <MapPin size={13} className="text-[oklch(0.46_0.22_25)] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-display text-[oklch(0.22_0.025_60)] text-sm tracking-wider">
                        {loc.name}
                        {loc.flagship && (
                          <span className="ml-2 text-[0.6rem] bg-[oklch(0.46_0.22_25)] text-white px-1.5 py-0.5 tracking-wider">FLAGSHIP</span>
                        )}
                      </p>
                      <p className="font-body text-xs text-[oklch(0.55_0.025_60)] mt-0.5">{loc.address}</p>
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
      <div className="border-t border-[oklch(0.88_0.02_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-[oklch(0.58_0.02_60)]">
            © {year} Umberto's Family Pizzeria. All rights reserved. Family Owned &amp; Operated Since 1965. New Hyde Park, Long Island, NY.
          </p>
          <div className="flex gap-4">
            <a href="https://www.umbertosfamily.com/contact/" target="_blank" rel="noopener noreferrer"
              className="font-body text-xs text-[oklch(0.55_0.02_60)] hover:text-[oklch(0.46_0.22_25)] transition-colors">Contact</a>
            <a href="https://www.umbertosfamily.com/jobs/" target="_blank" rel="noopener noreferrer"
              className="font-body text-xs text-[oklch(0.55_0.02_60)] hover:text-[oklch(0.46_0.22_25)] transition-colors">Jobs</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
