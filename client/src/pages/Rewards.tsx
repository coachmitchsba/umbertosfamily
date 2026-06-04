/*
 * Rewards Page — Umberto's Family Pizzeria
 * AppSuite Rewards Program — earn points on every order
 */
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Star, Gift, Trophy, Smartphone, CreditCard, ChevronRight } from "lucide-react";

const APPSUITE_URL = "https://umbertos.appsuitecrm.com";

export default function Rewards() {
  useEffect(() => {
    document.title = "Umberto's Rewards | Earn Points on Every Order | Loyalty Program";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Join Umberto's Rewards and earn points on every pizza, pasta, and catering order. Redeem for free food, discounts, and exclusive offers at all 6 Long Island locations.");

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)]">
      <Navigation />

      {/* Hero */}
      <section className="relative py-24 bg-[oklch(0.20_0.025_60)] overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `repeating-linear-gradient(45deg, oklch(0.46 0.22 25) 0px, oklch(0.46 0.22 25) 1px, transparent 1px, transparent 50%)`,
          backgroundSize: "30px 30px"
        }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[oklch(0.68_0.13_75)] px-4 py-2 mb-6">
            <Star size={14} className="text-white fill-white" />
            <span className="font-display text-xs text-white tracking-[0.18em] uppercase">Loyalty Program</span>
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,6rem)] text-white leading-[0.88] mb-4">
            UMBERTO'S<br /><span className="text-[oklch(0.46_0.22_25)]">REWARDS</span>
          </h1>
          <p className="font-body text-white/75 text-base max-w-xl mx-auto mb-8">
            Every slice earns you points. Every order brings you closer to free food, exclusive discounts, and rewards only available to our most loyal customers.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={APPSUITE_URL} target="_blank" rel="noopener noreferrer" className="btn-red text-sm">
              Join Rewards <ArrowRight size={15} />
            </a>
            <a href={APPSUITE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-2 border-white/60 text-white font-display text-sm tracking-[0.1em] uppercase px-6 py-3.5 hover:border-white hover:bg-white/10 transition-all">
              Sign In to Account
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white border-b border-[oklch(0.88_0.015_80)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-12">
            <span className="section-label">How It Works</span>
            <span className="red-line mx-auto" />
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-[oklch(0.20_0.025_60)]">EARN. REDEEM. REPEAT.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: <Smartphone size={26} />, step: "1", title: "Sign Up", desc: "Create your free Umberto's Rewards account online or in-store at any of our 6 Long Island locations." },
              { icon: <CreditCard size={26} />, step: "2", title: "Order & Earn", desc: "Earn points on every order — dine-in, takeout, delivery, and catering all count toward your rewards." },
              { icon: <Gift size={26} />, step: "3", title: "Unlock Rewards", desc: "Reach point milestones to unlock free slices, discounts, exclusive menu items, and special birthday rewards." },
              { icon: <Trophy size={26} />, step: "4", title: "VIP Status", desc: "Our top customers earn VIP status with priority service, exclusive event invites, and special seasonal offers." },
            ].map((item, i) => (
              <div key={item.step} className="reveal text-center" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-14 h-14 bg-[oklch(0.46_0.22_25)] flex items-center justify-center text-white mx-auto mb-3">{item.icon}</div>
                <div className="font-display text-[oklch(0.46_0.22_25)] text-3xl mb-1">{item.step}</div>
                <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-sm mb-2">{item.title}</h3>
                <p className="font-body text-xs text-[oklch(0.48_0.03_60)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards tiers */}
      <section className="py-16 bg-[oklch(0.95_0.018_80)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-12">
            <span className="section-label">Rewards Tiers</span>
            <span className="red-line mx-auto" />
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-[oklch(0.20_0.025_60)]">YOUR REWARDS JOURNEY</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tier: "Classic",
                color: "oklch(0.68_0.13_75)",
                bg: "oklch(0.97_0.015_80)",
                border: "oklch(0.88_0.015_80)",
                points: "0 – 499 pts",
                perks: ["1 point per $1 spent", "Birthday free slice", "Early access to specials", "Email-only deals"],
                icon: "I",
              },
              {
                tier: "Connoisseur",
                color: "oklch(0.46_0.22_25)",
                bg: "white",
                border: "oklch(0.46_0.22_25)",
                points: "500 – 1,499 pts",
                perks: ["1.5 points per $1 spent", "Free appetizer reward", "Priority catering service", "Exclusive monthly offers", "Free delivery upgrade"],
                icon: "II",
                featured: true,
              },
              {
                tier: "VIP",
                color: "oklch(0.20_0.025_60)",
                bg: "oklch(0.97_0.015_80)",
                border: "oklch(0.88_0.015_80)",
                points: "1,500+ pts",
                perks: ["2 points per $1 spent", "Free pizza reward", "VIP event invites", "Dedicated catering rep", "Holiday exclusive gifts", "First access to new menu"],
                icon: "III",
              },
            ].map((tier, i) => (
              <div key={tier.tier} className={`reveal border-2 p-6 ${tier.featured ? "shadow-xl scale-105" : ""}`}
                style={{ borderColor: tier.border, background: tier.bg, transitionDelay: `${i * 80}ms` }}>
                {tier.featured && (
                  <div className="bg-[oklch(0.46_0.22_25)] text-white font-display text-xs tracking-[0.12em] text-center py-1 -mx-6 -mt-6 mb-5">MOST POPULAR</div>
                )}
                <div className="font-display text-2xl tracking-widest mb-2" style={{ color: tier.color }}>{tier.icon}</div>
                <h3 className="font-display tracking-wider text-lg mb-1" style={{ color: tier.color }}>{tier.tier.toUpperCase()}</h3>
                <p className="font-body text-xs text-[oklch(0.55_0.03_60)] mb-4">{tier.points}</p>
                <ul className="space-y-2">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 font-body text-sm text-[oklch(0.38_0.03_60)]">
                      <ChevronRight size={13} className="mt-0.5 flex-shrink-0" style={{ color: tier.color }} />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[oklch(0.46_0.22_25)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Star size={32} className="text-white/60 fill-white/30 mx-auto mb-4" />
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-white mb-3">START EARNING TODAY</h2>
          <p className="font-body text-white/80 mb-6">Join thousands of loyal Umberto's customers already earning rewards on every order across all 6 Long Island locations.</p>
          <a href={APPSUITE_URL} target="_blank" rel="noopener noreferrer" className="btn-white text-sm">
            Create Your Rewards Account <ArrowRight size={15} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
