/*
 * Nationwide Shipping Page — Umberto's Family Pizzeria
 * Ships via Goldbelly — https://www.umbertosfamily.com/ShippingPizza/
 */
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Truck, Package, Star, MapPin, Clock } from "lucide-react";

export default function Shipping() {
  useEffect(() => {
    document.title = "Ship Umberto's Pizza Nationwide | Goldbelly | Original Grandma Slice Delivered";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Ship Umberto's legendary Grandma Slice and pizzas anywhere in the U.S. via Goldbelly. Free shipping. The taste of Long Island delivered to your door.");

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const GOLDBELLY_URL = "https://www.goldbelly.com/restaurants/umbertos-pizzeria/?utm_source=partner&utm_medium=website&utm_term=2702";

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)]">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <img
          src="https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/292661U1A6384.jpg?w=1400&fit=crop&auto=compress,format"
          alt="Umberto's Pizza — Ship Nationwide via Goldbelly"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[oklch(0.46_0.22_25)] px-3 py-1.5 mb-4">
                <Truck size={12} className="text-white" />
                <span className="font-display text-xs text-white tracking-[0.15em] uppercase">Free Shipping Nationwide</span>
              </div>
              <h1 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] text-white leading-[0.88] mb-3">
                SHIP UMBERTO'S<br /><span className="text-[oklch(0.46_0.22_25)]">ANYWHERE</span><br />IN THE U.S.
              </h1>
              <p className="font-body text-white/80 text-base mb-6 max-w-lg">
                The legendary Grandma Slice and our famous pizzas — now delivered fresh to your door anywhere in America. Powered by Goldbelly with free shipping.
              </p>
              <a href={GOLDBELLY_URL} target="_blank" rel="noopener noreferrer" className="btn-red text-sm">
                Order on Goldbelly <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white border-b border-[oklch(0.88_0.015_80)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-12">
            <span className="section-label">How It Works</span>
            <span className="red-line mx-auto" />
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-[oklch(0.20_0.025_60)]">FROM OUR OVEN TO YOUR DOOR</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: <Package size={28} />, title: "Choose Your Order", desc: "Select from our famous Grandma Slice, round pies, and specialty pizzas on Goldbelly. Free shipping on all orders." },
              { step: "02", icon: <Truck size={28} />, title: "We Pack & Ship", desc: "Our team carefully packs your order fresh. Shipped via overnight delivery to ensure maximum freshness and quality." },
              { step: "03", icon: <Star size={28} />, title: "Enjoy at Home", desc: "Heat in your oven for 10–12 minutes and enjoy the authentic taste of Umberto's wherever you are in America." },
            ].map((item, i) => (
              <div key={item.step} className="reveal text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-16 h-16 bg-[oklch(0.46_0.22_25)] flex items-center justify-center text-white mx-auto mb-4">{item.icon}</div>
                <div className="font-display text-[oklch(0.46_0.22_25)] text-4xl mb-2">{item.step}</div>
                <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-base mb-2">{item.title}</h3>
                <p className="font-body text-sm text-[oklch(0.48_0.03_60)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pizza grid */}
      <section className="py-16 bg-[oklch(0.95_0.018_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10">
            <span className="section-label">Available to Ship</span>
            <span className="red-line mx-auto" />
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-[oklch(0.20_0.025_60)]">SHIP THESE LEGENDARY PIES</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { title: "Grandma Slice", img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/292661U1A6384.jpg?w=400&fit=crop&auto=compress,format" },
              { title: "Pepperoni", img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/7096Umbertos-Pepperoni-4.jpg?w=400&fit=crop&auto=compress,format" },
              { title: "Classic Cheese", img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/91943Umbertos-Classic-5.jpg?w=400&fit=crop&auto=compress,format" },
              { title: "Meatball", img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/97201Umbertos-Meatball-3.jpg?w=400&fit=crop&auto=compress,format" },
              { title: "Pazzo Deep Dish", img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/12732Umbertos-Pepperoni-3.jpg?w=400&fit=crop&auto=compress,format" },
              { title: "Specialty Pie", img: "https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/398211U1A6398.jpg?w=400&fit=crop&auto=compress,format" },
            ].map((item, i) => (
              <a key={item.title} href={GOLDBELLY_URL} target="_blank" rel="noopener noreferrer"
                className="reveal group overflow-hidden border border-[oklch(0.88_0.015_80)] bg-white hover:border-[oklch(0.46_0.22_25)] transition-all"
                style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="relative h-28 overflow-hidden">
                  <img src={item.img} alt={`${item.title} — Umberto's nationwide shipping`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-2 text-center">
                  <p className="font-display text-[oklch(0.20_0.025_60)] text-xs tracking-wider">{item.title}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="reveal text-center mt-10">
            <a href={GOLDBELLY_URL} target="_blank" rel="noopener noreferrer" className="btn-red text-sm">
              Shop All Pies on Goldbelly <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* Goldbelly badge */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="reveal">
            <p className="font-display text-[oklch(0.20_0.025_60)] text-2xl tracking-wider mb-4">POWERED BY GOLDBELLY</p>
            <p className="font-body text-[oklch(0.48_0.03_60)] leading-relaxed mb-6 max-w-xl mx-auto">
              Goldbelly is America's premier food delivery platform, trusted by over 1 million customers to ship iconic foods from legendary restaurants coast-to-coast. All orders include free shipping and arrive fresh.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              {["Free Shipping", "Overnight Delivery", "Arrives Fresh", "Easy Reheating", "Gift-Ready Packaging"].map((feat) => (
                <div key={feat} className="flex items-center gap-2 bg-[oklch(0.95_0.018_80)] border border-[oklch(0.88_0.015_80)] px-4 py-2">
                  <Star size={12} className="text-[oklch(0.68_0.13_75)] fill-[oklch(0.68_0.13_75)]" />
                  <span className="font-body text-sm text-[oklch(0.28_0.025_60)]">{feat}</span>
                </div>
              ))}
            </div>
            <a href={GOLDBELLY_URL} target="_blank" rel="noopener noreferrer" className="btn-red text-sm">
              Order Now on Goldbelly <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
