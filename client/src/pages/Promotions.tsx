import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/mets-promo-hero-dukzwUTbnJMnYJVbVPR2CR.webp";

// Mets brand colors
const METS_BLUE = "#002D72";
const METS_ORANGE = "#FF5910";

export default function Promotions() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f4ef" }}>
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "88vh" }}>
        <img
          src={HERO_IMG}
          alt="Umberto's x Mets Giveaway"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* gradient overlay — dark left for text, fades right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(0,45,114,0.88) 0%, rgba(0,45,114,0.65) 40%, rgba(0,0,0,0.15) 75%, transparent 100%)",
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 py-32">
          {/* Partner logos row */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase px-3 py-1 rounded"
              style={{ backgroundColor: METS_ORANGE, color: "#fff" }}
            >
              PIX11 · Channel 11
            </span>
            <span className="text-white/60 text-sm">×</span>
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase px-3 py-1 rounded"
              style={{ backgroundColor: "#fff", color: METS_BLUE }}
            >
              New York Mets
            </span>
            <span className="text-white/60 text-sm">×</span>
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase px-3 py-1 rounded"
              style={{ backgroundColor: METS_ORANGE, color: "#fff" }}
            >
              Umberto's
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-4 text-white"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
          >
            WIN A<br />
            <span style={{ color: METS_ORANGE }}>$100</span> GIFT CARD
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-2 max-w-xl font-light">
            Watch Friday Night Mets home games on PIX11 Channel 11 and enter to win a $100 Umberto's Pizza Gift Card.
          </p>
          <p className="text-base text-white/70 mb-10 max-w-lg">
            Every Friday home game is your chance to win. Enter now — no purchase necessary.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://pix11.com/pix11-contests/umbertosgiveaway/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-white font-bold text-lg rounded transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xl"
              style={{ backgroundColor: METS_ORANGE, boxShadow: `0 8px 32px ${METS_ORANGE}66` }}
            >
              🎟 ENTER TO WIN NOW
            </a>
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 px-8 py-4 font-bold text-lg rounded border-2 transition-all duration-200 hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.6)", color: "#fff" }}
            >
              Find a Location
            </Link>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: "linear-gradient(to bottom, transparent, #f8f4ef)" }}
        />
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
            style={{ color: METS_ORANGE }}
          >
            The Promotion
          </p>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ color: METS_BLUE, fontFamily: "'Georgia', serif" }}
          >
            How to Win
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "📺",
              title: "Watch Friday Night Mets",
              desc: "Tune in to PIX11 Channel 11 for New York Mets Friday night home games. Every game is a new chance to win.",
            },
            {
              icon: "🎟",
              title: "Enter on PIX11",
              desc: "Click the Enter Now button and fill out the quick entry form on PIX11.com. No purchase necessary.",
            },
            {
              icon: "🍕",
              title: "Win $100 at Umberto's",
              desc: "Winners receive a $100 Umberto's Pizza Gift Card — good at any of our 6 Long Island locations.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl p-8 text-center shadow-lg border"
              style={{ backgroundColor: "#fff", borderColor: "#e8e0d8" }}
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3
                className="text-xl font-black mb-3"
                style={{ color: METS_BLUE, fontFamily: "'Georgia', serif" }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6b5c4e" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRIZE SPOTLIGHT ── */}
      <section
        className="py-20 px-6"
        style={{
          background: `linear-gradient(135deg, ${METS_BLUE} 0%, #003d9e 50%, #001a4d 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-4"
            style={{ color: METS_ORANGE }}
          >
            The Prize
          </p>
          <h2
            className="text-4xl md:text-6xl font-black text-white mb-6"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            $100 Umberto's<br />
            <span style={{ color: METS_ORANGE }}>Pizza Gift Card</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Redeem at any of our 6 Long Island locations — New Hyde Park, Manhasset, Massapequa Park, Farmingdale, Lake Grove, or Bellmore. Dine in, take out, or use it toward catering. The original grandma slice, on us.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["New Hyde Park", "Manhasset", "Massapequa Park", "Farmingdale", "Lake Grove", "Bellmore"].map(
              (loc) => (
                <span
                  key={loc}
                  className="px-4 py-2 rounded-full text-sm font-semibold border"
                  style={{ borderColor: "rgba(255,89,16,0.5)", color: "#fff", backgroundColor: "rgba(255,89,16,0.15)" }}
                >
                  📍 {loc}
                </span>
              )
            )}
          </div>

          <a
            href="https://pix11.com/pix11-contests/umbertosgiveaway/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 text-white font-black text-xl rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xl"
            style={{ backgroundColor: METS_ORANGE, boxShadow: `0 12px 40px ${METS_ORANGE}55` }}
          >
            🎟 ENTER THE GIVEAWAY
          </a>
        </div>
      </section>

      {/* ── METS PARTNERSHIP CALLOUT ── */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-2">
          {/* Left — Mets blue */}
          <div
            className="p-10 flex flex-col justify-center"
            style={{ backgroundColor: METS_BLUE }}
          >
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-4"
              style={{ color: METS_ORANGE }}
            >
              Proud Mets Partner
            </p>
            <h3
              className="text-3xl md:text-4xl font-black text-white mb-4"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Friday Nights on PIX11
            </h3>
            <p className="text-white/80 leading-relaxed mb-6">
              Umberto's is proud to partner with the New York Mets and PIX11 Channel 11 — New York's Very Own — to bring Long Island fans a chance to win every Friday home game night. Because great pizza and great baseball belong together.
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm"
                style={{ backgroundColor: METS_ORANGE }}
              >
                11
              </div>
              <span className="text-white/70 text-sm">PIX11 · New York's Very Own</span>
            </div>
          </div>

          {/* Right — warm cream */}
          <div
            className="p-10 flex flex-col justify-center"
            style={{ backgroundColor: "#fff8f0" }}
          >
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-4"
              style={{ color: METS_ORANGE }}
            >
              Since 1965
            </p>
            <h3
              className="text-3xl md:text-4xl font-black mb-4"
              style={{ color: METS_BLUE, fontFamily: "'Georgia', serif" }}
            >
              The Original<br />Grandma Slice
            </h3>
            <p className="leading-relaxed mb-6" style={{ color: "#6b5c4e" }}>
              Umberto Corteo invented the grandma pizza in New Hyde Park in 1965. Six locations later, the recipe hasn't changed — and neither has the love for Long Island. Win a $100 gift card and taste the original.
            </p>
            <Link
              href="/our-story"
              className="inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4"
              style={{ color: METS_BLUE }}
            >
              Read Our Story →
            </Link>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section
        className="py-16 text-center px-6"
        style={{ backgroundColor: "#f0ebe4" }}
      >
        <p
          className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
          style={{ color: METS_ORANGE }}
        >
          Don't Miss Out
        </p>
        <h2
          className="text-3xl md:text-4xl font-black mb-4"
          style={{ color: METS_BLUE, fontFamily: "'Georgia', serif" }}
        >
          Every Friday is a Chance to Win
        </h2>
        <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#6b5c4e" }}>
          Watch Mets Friday night home games on PIX11 Channel 11 and enter at PIX11.com. No purchase necessary. Must be 18+ and a NY/NJ/CT resident to enter.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://pix11.com/pix11-contests/umbertosgiveaway/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-bold text-lg rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ backgroundColor: METS_ORANGE }}
          >
            🎟 Enter Now on PIX11
          </a>
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 px-8 py-4 font-bold text-lg rounded-xl border-2 transition-all duration-200 hover:bg-white"
            style={{ borderColor: METS_BLUE, color: METS_BLUE }}
          >
            Find a Location
          </Link>
        </div>
        <p className="text-xs mt-6" style={{ color: "#a09080" }}>
          No purchase necessary. Void where prohibited. Must be 18+ and a resident of NY, NJ, or CT. See{" "}
          <a
            href="https://pix11.com/pix11-contests/umbertosgiveaway/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: METS_BLUE }}
          >
            PIX11.com
          </a>{" "}
          for full official rules.
        </p>
      </section>

      <Footer />
    </div>
  );
}
