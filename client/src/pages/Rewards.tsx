/*
 * Rewards Page — Umberto's Family Pizzeria
 * Phone mockup loyalty card design — no fabricated tier data
 */
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Star, Gift, Utensils, Users } from "lucide-react";

const APPSUITE_URL = "https://umbertos.appsuitecrm.com/signup";
const LOGO_URL = "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/26750UmbertoS-Logo.png";

export default function Rewards() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    document.title = "Umberto's Rewards | Earn Points on Every Order";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Join Umberto's Rewards and earn points on every pizza, pasta, and catering order at all 6 Long Island locations.");

    // Animate points counter
    const target = 1250;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setPoints(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => { observer.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="min-h-screen bg-[oklch(0.10_0.020_60)]">
      <Navigation />

      {/* ── HERO: full-bleed photo + centered phone mockup ─────────────────── */}
      <section
        className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(/images/locations/nhp-dining-room-2.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        {/* Overlay — lightened so the restaurant photo shows through */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/55" />

        {/* Ambient glow behind phone */}
        <div
          className="absolute w-[420px] h-[420px] rounded-full blur-[120px] opacity-30 pointer-events-none"
          style={{ background: "oklch(0.46 0.22 25)" }}
        />

        <div className="relative z-10 flex flex-col items-center px-4 py-20 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 mb-8 rounded-full">
            <Star size={12} className="text-[oklch(0.68_0.13_75)] fill-[oklch(0.68_0.13_75)]" />
            <span className="font-display text-[10px] text-white/90 tracking-[0.22em] uppercase">Loyalty Rewards</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-[clamp(2.8rem,9vw,6.5rem)] text-white leading-[0.86] mb-3 tracking-tight">
            EVERY SLICE<br />
            <span style={{ color: "oklch(0.46 0.22 25)" }}>EARNS.</span>
          </h1>
          <p className="font-body text-white/65 text-sm max-w-sm mb-12 leading-relaxed">
            Order at any of our 6 Long Island locations and earn points toward free food, exclusive deals, and more.
          </p>

          {/* ── PHONE MOCKUP ─────────────────────────────────────────────── */}
          <div
            className="relative w-[260px] sm:w-[290px]"
            style={{
              filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.7))",
            }}
          >
            {/* Phone shell */}
            <div
              className="rounded-[36px] overflow-hidden border-[6px] border-[oklch(0.22_0.02_60)]"
              style={{ background: "oklch(0.12 0.015 60)" }}
            >
              {/* Notch */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-20 h-5 rounded-full bg-[oklch(0.08_0.01_60)]" />
              </div>

              {/* Screen content */}
              <div className="px-4 pb-6 pt-2">
                {/* Status bar */}
                <div className="flex justify-between items-center mb-4 px-1">
                  <span className="text-white/50 text-[9px] font-mono">9:41</span>
                  <div className="flex gap-1 items-center">
                    <div className="w-3 h-1.5 rounded-sm bg-white/40" />
                    <div className="w-1 h-1.5 rounded-sm bg-white/40" />
                    <div className="w-3.5 h-2 rounded-sm border border-white/40 flex items-center pr-0.5">
                      <div className="h-1 w-2 rounded-sm bg-white/60 ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* App header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-white/50 text-[9px] tracking-widest uppercase font-display">Welcome back</p>
                    <p className="text-white font-display text-sm tracking-wide">LOYAL CUSTOMER</p>
                  </div>
                  <img src={LOGO_URL} alt="Umberto's" className="w-9 h-9 object-contain rounded-full bg-white/10 p-1" />
                </div>

                {/* Loyalty card */}
                <div
                  className="rounded-2xl p-4 mb-4 relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, oklch(0.46 0.22 25) 0%, oklch(0.32 0.18 20) 60%, oklch(0.20 0.025 60) 100%)",
                  }}
                >
                  {/* Card shine */}
                  <div className="absolute inset-0 opacity-20"
                    style={{
                      background: "radial-gradient(ellipse at 20% 20%, white 0%, transparent 60%)"
                    }}
                  />
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-white/60 text-[8px] tracking-[0.2em] uppercase font-display">Points Balance</p>
                        <p className="text-white font-display text-3xl leading-none mt-0.5 tabular-nums">
                          {points.toLocaleString()}
                        </p>
                      </div>
                      <Star size={18} className="text-white/70 fill-white/30" />
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-white/50 text-[7px] tracking-widest uppercase font-display">Member Since</p>
                        <p className="text-white/80 text-[9px] font-mono">2024</p>
                      </div>
                      <p className="text-white/40 text-[8px] font-display tracking-widest">UMBERTO'S</p>
                    </div>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { icon: <Utensils size={13} />, label: "Order" },
                    { icon: <Gift size={13} />, label: "Redeem" },
                    { icon: <Users size={13} />, label: "Refer" },
                  ].map((action) => (
                    <div
                      key={action.label}
                      className="flex flex-col items-center gap-1 py-2 rounded-xl"
                      style={{ background: "oklch(0.18 0.015 60)" }}
                    >
                      <span className="text-[oklch(0.46_0.22_25)]">{action.icon}</span>
                      <span className="text-white/60 text-[8px] font-display tracking-wide">{action.label}</span>
                    </div>
                  ))}
                </div>

                {/* Recent activity */}
                <div className="space-y-2">
                  <p className="text-white/40 text-[8px] tracking-widest uppercase font-display mb-2">Recent Activity</p>
                  {[
                    { loc: "New Hyde Park", pts: "+42 pts", date: "Today" },
                    { loc: "Farmingdale", pts: "+28 pts", date: "Mon" },
                  ].map((item) => (
                    <div key={item.loc} className="flex justify-between items-center py-1.5 border-b border-white/5">
                      <div>
                        <p className="text-white/75 text-[9px] font-display">{item.loc}</p>
                        <p className="text-white/35 text-[7px]">{item.date}</p>
                      </div>
                      <span className="text-[oklch(0.68_0.13_75)] text-[9px] font-display font-bold">{item.pts}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Home indicator */}
              <div className="flex justify-center pb-3">
                <div className="w-20 h-1 rounded-full bg-white/20" />
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <a
              href={APPSUITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display text-sm tracking-[0.1em] uppercase px-8 py-4 text-white transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
              style={{ background: "oklch(0.46 0.22 25)" }}
            >
              Join Rewards <ArrowRight size={15} />
            </a>
            <a
              href={APPSUITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/40 text-white/80 font-display text-sm tracking-[0.1em] uppercase px-8 py-4 hover:border-white hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              Sign In
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[oklch(0.97_0.015_80)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-14">
            <span className="section-label">How It Works</span>
            <span className="red-line mx-auto" />
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-[oklch(0.20_0.025_60)]">EARN. REDEEM. REPEAT.</h2>
            <p className="font-body text-[oklch(0.48_0.03_60)] text-sm mt-3 max-w-lg mx-auto">
              Every order at any of our 6 Long Island locations earns you points — dine-in, takeout, delivery, and catering all count.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: <Users size={28} />,
                title: "Create an Account",
                desc: "Sign up online at our rewards portal. It's free and takes less than a minute.",
              },
              {
                icon: <Utensils size={28} />,
                title: "Order & Earn Points",
                desc: "Every dollar you spend earns you points — dine-in, takeout, delivery, or catering.",
              },
              {
                icon: <Gift size={28} />,
                title: "Redeem for Rewards",
                desc: "Use your points for free food, exclusive discounts, and special birthday rewards.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="reveal text-center"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className="w-16 h-16 flex items-center justify-center text-white mx-auto mb-4 rounded-2xl"
                  style={{ background: "oklch(0.46 0.22 25)" }}
                >
                  {item.icon}
                </div>
                <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-sm mb-2">{item.title}</h3>
                <p className="font-body text-xs text-[oklch(0.48_0.03_60)] leading-relaxed max-w-[220px] mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────────────── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: "oklch(0.20 0.025 60)" }}
      >
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: `url(/images/nhp-exterior-1965.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <Star size={36} className="mx-auto mb-5 text-[oklch(0.46_0.22_25)] fill-[oklch(0.46_0.22_25)]" />
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-white mb-4 leading-tight">
            START EARNING<br />ON YOUR NEXT ORDER
          </h2>
          <p className="font-body text-white/60 text-sm mb-8 max-w-md mx-auto">
            Join thousands of loyal Umberto's customers already earning rewards across all 6 Long Island locations.
          </p>
          <a
            href={APPSUITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-display text-sm tracking-[0.1em] uppercase px-10 py-4 bg-white text-[oklch(0.20_0.025_60)] hover:bg-[oklch(0.46_0.22_25)] hover:text-white transition-all duration-200 active:scale-[0.97]"
          >
            Create Your Rewards Account <ArrowRight size={15} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
