/*
 * Gift Cards Page — Umberto's Family Pizzeria
 * NOTE: AppSuite (umbertos.appsuitecrm.com/gift-cards/892) uses x-frame-options: SAMEORIGIN
 * so iframes are blocked. We provide a beautiful landing page with a direct link to AppSuite.
 * SEO: GiftCard schema, keyword-rich content
 */
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Gift, CreditCard, Mail, Smartphone, Star, ArrowRight, ExternalLink, CheckCircle } from "lucide-react";

const GIFT_CARD_URL = "https://umbertos.appsuitecrm.com/gift-cards/892";

export default function GiftCards() {
  useEffect(() => {
    document.title = "Gift Cards | Umberto's Family Pizzeria | Long Island's Best Pizza Gift";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Give the gift of Umberto's! Digital eGift cards available instantly for Long Island's most famous pizzeria since 1965. Perfect for birthdays, holidays, and any occasion. Buy online at all 6 Long Island locations.");

    // JSON-LD for Gift Card
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Umberto's Family Pizzeria Gift Card",
      "description": "Digital eGift card for Umberto's Family Pizzeria — Long Island's most famous Italian restaurant and pizzeria since 1965. Home of the Original Grandma Slice.",
      "brand": { "@type": "Brand", "name": "Umberto's Family Pizzeria" },
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "USD",
        "url": GIFT_CARD_URL,
      },
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)]">
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[oklch(0.20_0.025_60)] py-20">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/292661U1A6384.jpg?w=1400&fit=crop&auto=compress,format"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[oklch(0.68_0.13_75)]/20 border border-[oklch(0.68_0.13_75)]/40 px-4 py-2 mb-6">
            <Gift size={14} className="text-[oklch(0.68_0.13_75)]" />
            <span className="font-display text-[oklch(0.68_0.13_75)] text-xs tracking-[0.15em] uppercase">The Perfect Gift</span>
          </div>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-white leading-tight mb-4">
            UMBERTO'S<br />GIFT CARDS
          </h1>
          <p className="font-serif italic text-[oklch(0.68_0.13_75)] text-xl mb-6">
            Give the taste of Long Island's most legendary pizzeria
          </p>
          <p className="font-body text-white/75 max-w-xl mx-auto mb-8 leading-relaxed">
            Whether it's a birthday, holiday, graduation, or just because — an Umberto's eGift card is the perfect present for anyone who loves authentic Italian food and the original Grandma Slice.
          </p>
          <a
            href={GIFT_CARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red text-base px-8 py-4 inline-flex items-center gap-2"
          >
            <Gift size={18} /> Buy a Gift Card <ExternalLink size={14} />
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white border-b border-[oklch(0.88_0.015_80)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-label">Simple & Instant</span>
            <span className="red-line mx-auto" />
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-[oklch(0.20_0.025_60)]">HOW IT WORKS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <CreditCard size={28} />,
                step: "01",
                title: "Choose Your Amount",
                desc: "Select any denomination for your digital eGift card. Available in multiple amounts to fit any budget.",
              },
              {
                icon: <Mail size={28} />,
                step: "02",
                title: "Delivered Instantly",
                desc: "Your eGift card is sent directly to the recipient's email — instantly, no shipping required.",
              },
              {
                icon: <Smartphone size={28} />,
                step: "03",
                title: "Redeem at Any Location",
                desc: "Use your eGift card at any of our 6 Long Island locations for dine-in, pickup, or online orders.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center p-6 border border-[oklch(0.88_0.015_80)] bg-[oklch(0.97_0.015_80)]">
                <div className="w-14 h-14 bg-[oklch(0.46_0.22_25)] text-white flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="font-display text-[oklch(0.46_0.22_25)] text-xs tracking-[0.2em] mb-1">{item.step}</div>
                <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider mb-2">{item.title}</h3>
                <p className="font-body text-sm text-[oklch(0.48_0.03_60)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Umberto's gift cards */}
      <section className="py-16 bg-[oklch(0.97_0.015_80)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="section-label">Why Umberto's</span>
              <span className="red-line" />
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-[oklch(0.20_0.025_60)] leading-tight mb-4">
                A GIFT THEY'LL<br />ACTUALLY USE
              </h2>
              <p className="font-body text-[oklch(0.48_0.03_60)] leading-relaxed mb-6">
                Since 1965, Umberto's has been Long Island's most beloved Italian restaurant and pizzeria. Home of the Original Grandma Slice, our menu features authentic Italian recipes passed down through generations. Give someone the gift of an unforgettable meal.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Valid at all 6 Long Island locations",
                  "Use for dine-in, pickup, or online orders",
                  "Never expires",
                  "Delivered instantly to any email",
                  "Perfect for any occasion",
                  "Can be used toward catering orders",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 font-body text-sm text-[oklch(0.38_0.03_60)]">
                    <CheckCircle size={15} className="text-[oklch(0.46_0.22_25)] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={GIFT_CARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-red text-sm"
              >
                <Gift size={14} /> Buy a Gift Card Now <ExternalLink size={12} />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/292661U1A6384.jpg?w=400&fit=crop&auto=compress,format",
                "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/83464parm-chicken.jpg?w=400&fit=crop&auto=compress,format",
                "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/326236A4A5195.jpg?w=400&fit=crop&auto=compress,format",
                "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/36275067_6A4A2737.jpg?w=400&fit=crop&auto=compress,format",
              ].map((src, i) => (
                <img key={i} src={src} alt="Umberto's food" className="w-full h-36 object-cover" loading="lazy" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Perfect for occasions */}
      <section className="py-14 bg-white border-t border-[oklch(0.88_0.015_80)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] text-[oklch(0.20_0.025_60)]">PERFECT FOR EVERY OCCASION</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { emoji: "🎂", label: "Birthdays" },
              { emoji: "🎓", label: "Graduations" },
              { emoji: "🎄", label: "Holiday Gifts" },
              { emoji: "💼", label: "Corporate Gifts" },
              { emoji: "👶", label: "Baby Showers" },
              { emoji: "💍", label: "Anniversaries" },
              { emoji: "🏫", label: "Teacher Gifts" },
              { emoji: "🎁", label: "Just Because" },
            ].map((item) => (
              <div key={item.label} className="text-center p-4 border border-[oklch(0.88_0.015_80)] bg-[oklch(0.97_0.015_80)] hover:border-[oklch(0.46_0.22_25)] transition-colors">
                <div className="text-3xl mb-2">{item.emoji}</div>
                <p className="font-display text-[oklch(0.20_0.025_60)] text-xs tracking-wider">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-14 bg-[oklch(0.97_0.015_80)] border-t border-[oklch(0.88_0.015_80)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-[oklch(0.68_0.13_75)] text-[oklch(0.68_0.13_75)]" />)}
          </div>
          <blockquote className="font-serif italic text-[oklch(0.28_0.025_60)] text-xl mb-3 max-w-2xl mx-auto">
            "Got an Umberto's gift card for my birthday and it was the best gift I've ever received. The Grandma Slice is absolutely legendary."
          </blockquote>
          <p className="font-body text-sm text-[oklch(0.55_0.03_60)]">— Verified Google Review</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[oklch(0.46_0.22_25)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-white text-[clamp(1.8rem,4vw,3rem)] mb-3">READY TO GIVE THE GIFT OF UMBERTO'S?</h2>
          <p className="font-body text-white/80 mb-6">Click below to purchase your digital eGift card instantly.</p>
          <a
            href={GIFT_CARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-white text-sm px-8 py-3.5"
          >
            <Gift size={16} /> Buy Gift Card Now <ExternalLink size={12} />
          </a>
        </div>
      </section>

      {/* Also check out */}
      <section className="py-10 bg-white border-t border-[oklch(0.88_0.015_80)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/rewards" className="group border border-[oklch(0.88_0.015_80)] p-5 hover:border-[oklch(0.46_0.22_25)] transition-all bg-[oklch(0.97_0.015_80)]">
              <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-sm mb-1">REWARDS PROGRAM</h3>
              <p className="font-body text-xs text-[oklch(0.48_0.03_60)] mb-2">Earn points on every order and redeem for free food.</p>
              <span className="font-display text-xs text-[oklch(0.46_0.22_25)] tracking-wider group-hover:underline">Join Rewards →</span>
            </Link>
            <Link href="/order" className="group border border-[oklch(0.88_0.015_80)] p-5 hover:border-[oklch(0.46_0.22_25)] transition-all bg-[oklch(0.97_0.015_80)]">
              <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-sm mb-1">ORDER ONLINE</h3>
              <p className="font-body text-xs text-[oklch(0.48_0.03_60)] mb-2">Order from any of our 6 Long Island locations for pickup or delivery.</p>
              <span className="font-display text-xs text-[oklch(0.46_0.22_25)] tracking-wider group-hover:underline">Order Now →</span>
            </Link>
            <Link href="/catering" className="group border border-[oklch(0.88_0.015_80)] p-5 hover:border-[oklch(0.46_0.22_25)] transition-all bg-[oklch(0.97_0.015_80)]">
              <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-sm mb-1">CATERING</h3>
              <p className="font-body text-xs text-[oklch(0.48_0.03_60)] mb-2">Full and half trays for offices, schools, and events.</p>
              <span className="font-display text-xs text-[oklch(0.46_0.22_25)] tracking-wider group-hover:underline">View Catering →</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
