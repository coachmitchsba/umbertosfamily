/*
 * About / Our Story Page — Umberto's Family Pizzeria
 * Design: Light warm Italian theme, editorial storytelling
 * SEO: Brand history, founder story, Long Island institution keywords
 */
import { useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

const timeline = [
  { year: "1965", title: "The Beginning", desc: "Umberto Corteo, a Naples-born immigrant, opens a small pizzeria on Jericho Turnpike in New Hyde Park with his brother Joe. The Original Grandma Slice is born." },
  { year: "1970s", title: "Word Spreads", desc: "Long Islanders discover the magic of the Grandma Slice. Lines form around the block. Umberto's becomes a neighborhood institution." },
  { year: "1980s", title: "Expansion Begins", desc: "The family expands to additional Long Island locations, bringing the legendary flavors of New Hyde Park to more communities across Nassau and Suffolk County." },
  { year: "1990s", title: "National Recognition", desc: "Umberto's earns national media attention. Food critics and publications declare the Grandma Slice a New York original. Featured in major food publications." },
  { year: "2000s", title: "Food Network Fame", desc: "Featured on the Food Network, cementing Umberto's status as a legendary American pizzeria. Rated best Sicilian pie in New York." },
  { year: "2010s", title: "The Grand Expansion", desc: "The New Hyde Park flagship transforms into a majestic two-story Tuscan-style restaurant with a full-service café, four-star dining room, and world-class banquet facilities." },
  { year: "Today", title: "A Living Legacy", desc: "Six locations across Long Island. Three generations of the Corteo family. The same recipes. The same passion. The same Original Grandma Slice that started it all in 1965." },
];

export default function About() {
  useEffect(() => {
    document.title = "Our Story | Umberto's Family Pizzeria | Original Grandma Slice Since 1965";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "The story of Umberto's Family Pizzeria — from Naples to New Hyde Park. Umberto Corteo opened Long Island's most famous pizzeria in 1965, inventing the Original Grandma Slice. 6 locations across Long Island.");

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)]">
      <Navigation />

      {/* Hero — photo with dark overlay so text is readable */}
      <header className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <img
          src="https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/95838NHP_Location_Image.jpg?w=1400&fit=crop&auto=compress,format"
          alt="Umberto's Family Pizzeria — New Hyde Park Long Island — established 1965"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <span className="inline-block w-12 h-0.5 bg-[oklch(0.46_0.22_25)] mb-4" />
              <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] text-white leading-tight mb-3">
                OUR STORY
              </h1>
              <p className="font-serif italic text-[oklch(0.72_0.14_75)] text-xl">
                From Naples to New Hyde Park — 60 Years of Family, Food &amp; Tradition
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Founder story */}
      <section className="py-20 bg-white" aria-labelledby="founder-story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal">
              <span className="section-label">The Founder</span>
              <span className="red-line" />
              <h2 id="founder-story" className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[oklch(0.20_0.025_60)] leading-tight mb-6">
                THE MAN BEHIND<br />THE SLICE
              </h2>
              <p className="font-body text-[oklch(0.38_0.03_60)] leading-relaxed mb-4">
                Umberto Corteo was born in Naples, Italy, the son of a farmer who worked the volcanic soil of the Campania region. From childhood, he understood that great food came from great ingredients — fresh tomatoes, real mozzarella, flour ground from the finest wheat.
              </p>
              <p className="font-body text-[oklch(0.38_0.03_60)] leading-relaxed mb-4">
                When Umberto crossed the Atlantic and arrived on Long Island in the early 1960s, he brought with him the flavors of his homeland and the work ethic of a man who had never known anything but hard labor and honest craft. He worked in restaurant kitchens, learning the American palate while never abandoning his Italian soul.
              </p>
              <p className="font-body text-[oklch(0.38_0.03_60)] leading-relaxed mb-4">
                In 1965, Umberto and his brother Joe scraped together every dollar they had and signed a lease on a small storefront on Jericho Turnpike in New Hyde Park. They painted the walls, built the counters, and installed the ovens themselves. On opening day, they served pizza the way Umberto's mother made it — square, thick with cheese, with a crust that was crispy on the bottom and chewy in the middle.
              </p>
              <p className="font-body text-[oklch(0.38_0.03_60)] leading-relaxed mb-6">
                That pizza became known as the Grandma Slice. And Umberto's became a legend.
              </p>
              <blockquote className="border-l-2 border-[oklch(0.46_0.22_25)] pl-5 mb-6 bg-[oklch(0.97_0.015_80)] py-4 pr-4">
                <p className="font-serif italic text-[oklch(0.28_0.025_60)] text-lg leading-relaxed">
                  "We didn't invent pizza. We just made it the way my mother taught me — with love, with patience, and with the best ingredients we could find."
                </p>
                <cite className="font-body text-sm text-[oklch(0.55_0.03_60)] mt-2 block not-italic">— Umberto Corteo, Founder</cite>
              </blockquote>
            </div>

            <div className="reveal" style={{ transitionDelay: "150ms" }}>
              <img
                src="/manus-storage/umberto-corteo-founder-sharp_27a25a51.webp"
                alt="Umberto Corteo, founder of Umberto's Family Pizzeria, in the kitchen holding a fresh pizza on a peel"
                className="w-full h-[500px] object-cover object-center"
                loading="lazy"
              />
              <div className="bg-[oklch(0.46_0.22_25)] p-4 text-center">
                <p className="font-display text-white tracking-[0.1em] text-sm">UMBERTO CORTEO · FOUNDER · EST. 1965</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline — light warm background */}
      <section className="py-20 bg-[oklch(0.97_0.015_80)] border-t border-[oklch(0.88_0.015_80)]" aria-labelledby="timeline">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-14">
            <span className="section-label">Our History</span>
            <span className="red-line mx-auto" />
            <h2 id="timeline" className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[oklch(0.20_0.025_60)]">
              60 YEARS OF HISTORY
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[2.5rem] md:left-1/2 top-0 bottom-0 w-px bg-[oklch(0.88_0.015_80)]" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className={`reveal relative flex gap-6 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* Content */}
                  <div className={`flex-1 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"} pl-16 md:pl-0`}>
                    <div className="bg-white border border-[oklch(0.88_0.015_80)] p-5 shadow-sm hover:shadow-md transition-shadow">
                      <p className="font-display text-[oklch(0.46_0.22_25)] text-2xl tracking-wider mb-1">{item.year}</p>
                      <h3 className="font-display text-[oklch(0.20_0.025_60)] text-lg tracking-wider mb-2">{item.title}</h3>
                      <p className="font-body text-sm text-[oklch(0.48_0.03_60)] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-[2.5rem] md:left-1/2 top-5 w-4 h-4 bg-[oklch(0.46_0.22_25)] -translate-x-1/2 flex-shrink-0 border-2 border-white shadow" />

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Grandma Slice section */}
      <section className="py-20 bg-white border-t border-[oklch(0.88_0.015_80)]" aria-labelledby="grandma-slice">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label">The Icon</span>
              <span className="red-line" />
              <h2 id="grandma-slice" className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[oklch(0.20_0.025_60)] leading-tight mb-6">
                THE ORIGINAL<br />GRANDMA SLICE
              </h2>
              <p className="font-body text-[oklch(0.38_0.03_60)] leading-relaxed mb-4">
                The Grandma Slice is a square, thin-crust pizza baked in a rectangular pan, with mozzarella cheese placed directly on the dough and plum tomato sauce ladled on top. The crust is crispy on the bottom, chewy in the middle, and slightly charred at the edges.
              </p>
              <p className="font-body text-[oklch(0.38_0.03_60)] leading-relaxed mb-4">
                Food historians and pizza journalists widely credit Umberto's of New Hyde Park as the originator of the Grandma pizza style on Long Island. The style has since been replicated across thousands of pizzerias nationwide — but there is only one original.
              </p>
              <p className="font-body text-[oklch(0.38_0.03_60)] leading-relaxed mb-8">
                Featured on the Food Network. Rated best Sicilian pie in New York. Beloved by three generations of Long Islanders. This is the pizza that started it all.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/menu" className="btn-red text-sm">
                  View Our Menu <ArrowRight size={14} />
                </Link>
                <Link href="/order" className="btn-outline-red text-sm">
                  Order the Grandma Slice
                </Link>
              </div>
            </div>
            <div>
              <img
                src="https://images.getbento.com/accounts/fd7c1089a4a4619f426a2c9d673b0ae5/media/images/26750Grandma_Slice.jpg?w=800&fit=crop&auto=compress,format"
                alt="Umberto's Original Grandma Slice pizza"
                className="w-full h-[420px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[oklch(0.97_0.015_80)] border-t border-[oklch(0.88_0.015_80)]" aria-labelledby="values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-12">
            <span className="section-label">Our Values</span>
            <span className="red-line mx-auto" />
            <h2 id="values" className="font-display text-[clamp(1.8rem,3vw,2.5rem)] text-[oklch(0.20_0.025_60)]">
              WHAT WE STAND FOR
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Family First", desc: "Three generations of the Corteo family have poured their hearts into every dish. This isn't just a business — it's our legacy, our pride, and our gift to Long Island." },
              { title: "Quality Always", desc: "We use the same quality ingredients Umberto brought from Naples. Fresh mozzarella, imported San Marzano tomatoes, and flour from the finest mills. No shortcuts. Ever." },
              { title: "Community Roots", desc: "We've been feeding Long Island families, offices, schools, and celebrations for over 60 years. We're not just a restaurant — we're part of the community." },
            ].map((v, i) => (
              <div
                key={v.title}
                className="reveal bg-white border border-[oklch(0.88_0.015_80)] p-6 shadow-sm hover:shadow-md transition-shadow"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-8 h-0.5 bg-[oklch(0.46_0.22_25)] mb-4" />
                <h3 className="font-display text-[oklch(0.20_0.025_60)] text-xl tracking-wider mb-3">{v.title}</h3>
                <p className="font-body text-sm text-[oklch(0.48_0.03_60)] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[oklch(0.46_0.22_25)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-white text-[clamp(1.8rem,4vw,3rem)] mb-3">COME TASTE THE LEGEND</h2>
          <p className="font-body text-white/80 mb-6">6 Long Island locations. One legendary Grandma Slice. Since 1965.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/locations" className="btn-white text-sm">Find a Location</Link>
            <Link href="/order" className="inline-flex items-center gap-2 border-2 border-white text-white font-display text-sm tracking-[0.1em] uppercase px-6 py-3.5 hover:bg-white/10 transition-colors">
              Order Online <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
