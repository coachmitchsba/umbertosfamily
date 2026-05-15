/*
 * About Page — Umberto's Family Pizzeria
 * Design: Dark, editorial, storytelling-focused
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
  { year: "1980s", title: "Expansion Begins", desc: "The family expands to additional Long Island locations, bringing the legendary flavors of New Hyde Park to more communities." },
  { year: "1990s", title: "National Recognition", desc: "Umberto's earns national media attention. Food critics and publications declare the Grandma Slice a New York original. Featured in major food publications." },
  { year: "2000s", title: "Food Network Fame", desc: "Featured on the Food Network, cementing Umberto's status as a legendary American pizzeria. Rated best Sicilian pie in New York." },
  { year: "2010s", title: "The Grand Expansion", desc: "The New Hyde Park flagship transforms into a majestic two-story Tuscan-style restaurant with a full-service café, four-star dining room, and world-class banquet facilities." },
  { year: "Today", title: "A Living Legacy", desc: "Six locations across Long Island. Three generations of the Corteo family. The same recipes. The same passion. The same Original Grandma Slice that started it all in 1965." },
];

export default function About() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[oklch(0.10_0.015_60)]">
      <Navigation />

      {/* Hero */}
      <header className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-pizza-oven-atmosphere-GHrJRCFyJfTxpLnAeefKAZ.webp"
            alt="Umberto's Pizzeria — New Hyde Park Long Island — established 1965"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-[oklch(0.08_0.012_60)]/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block w-12 h-0.5 bg-[oklch(0.46_0.22_25)] mb-4" />
            <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] text-[oklch(0.94_0.03_80)] leading-tight mb-4">
              OUR STORY
            </h1>
            <p className="font-serif italic text-[oklch(0.72_0.14_75)] text-2xl mb-4">
              From Naples to New Hyde Park — 60 Years of Family, Food & Tradition
            </p>
            <p className="font-body text-[oklch(0.80_0.03_80)] leading-relaxed">
              The story of Umberto's is the story of the American dream — told one slice at a time.
            </p>
          </div>
        </div>
      </header>

      {/* Founder story */}
      <section className="py-20" aria-labelledby="founder-story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal">
              <span className="inline-block w-12 h-0.5 bg-[oklch(0.46_0.22_25)] mb-4" />
              <h2 id="founder-story" className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[oklch(0.94_0.03_80)] leading-tight mb-6">
                THE MAN BEHIND THE SLICE
              </h2>
              <p className="font-body text-[oklch(0.72_0.03_80)] leading-relaxed mb-4">
                Umberto Corteo was born in Naples, Italy, the son of a farmer who worked the volcanic soil of the Campania region. From childhood, he understood that great food came from great ingredients — fresh tomatoes, real mozzarella, flour ground from the finest wheat.
              </p>
              <p className="font-body text-[oklch(0.72_0.03_80)] leading-relaxed mb-4">
                When Umberto crossed the Atlantic and arrived on Long Island in the early 1960s, he brought with him the flavors of his homeland and the work ethic of a man who had never known anything but hard labor and honest craft. He worked in restaurant kitchens, learning the American palate while never abandoning his Italian soul.
              </p>
              <p className="font-body text-[oklch(0.72_0.03_80)] leading-relaxed mb-4">
                In 1965, Umberto and his brother Joe scraped together every dollar they had and signed a lease on a small storefront on Jericho Turnpike in New Hyde Park. They painted the walls, built the counters, and installed the ovens themselves. On opening day, they served pizza the way Umberto's mother made it — square, thick with cheese, with a crust that was crispy on the bottom and chewy in the middle.
              </p>
              <p className="font-body text-[oklch(0.72_0.03_80)] leading-relaxed mb-6">
                That pizza became known as the Grandma Slice. And Umberto's became a legend.
              </p>
              <blockquote className="border-l-2 border-[oklch(0.46_0.22_25)] pl-5 mb-6">
                <p className="font-serif italic text-[oklch(0.80_0.03_80)] text-lg leading-relaxed">
                  "We didn't invent pizza. We just made it the way my mother taught me — with love, with patience, and with the best ingredients we could find."
                </p>
                <cite className="font-body text-sm text-[oklch(0.55_0.03_80)] mt-2 block not-italic">— Umberto Corteo, Founder</cite>
              </blockquote>
            </div>

            <div className="reveal" style={{ transitionDelay: "150ms" }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/umbertos-grandma-slice-hero-7tT4CvBtzqQu9aAajzPqff.webp"
                alt="Umberto's Original Grandma Slice — the pizza that started it all in 1965"
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
              <div className="bg-[oklch(0.46_0.22_25)] p-4 text-center">
                <p className="font-display text-[oklch(0.98_0.01_80)] tracking-[0.1em]">THE ORIGINAL GRANDMA SLICE · EST. 1965</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[oklch(0.12_0.018_60)]" aria-labelledby="timeline">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-14">
            <span className="inline-block w-12 h-0.5 bg-[oklch(0.46_0.22_25)] mb-4 mx-auto" />
            <h2 id="timeline" className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[oklch(0.94_0.03_80)]">
              60 YEARS OF HISTORY
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[2.5rem] md:left-1/2 top-0 bottom-0 w-px bg-[oklch(0.25_0.02_60)]" />

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
                    <div className="bg-[oklch(0.14_0.018_60)] border border-[oklch(0.20_0.02_60)] p-5">
                      <p className="font-display text-[oklch(0.46_0.22_25)] text-2xl tracking-wider mb-1">{item.year}</p>
                      <h3 className="font-display text-[oklch(0.94_0.03_80)] text-lg tracking-wider mb-2">{item.title}</h3>
                      <p className="font-body text-sm text-[oklch(0.62_0.03_80)] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-[2.5rem] md:left-1/2 top-5 w-3 h-3 bg-[oklch(0.46_0.22_25)] -translate-x-1/2 flex-shrink-0" />

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Grandma Slice section */}
      <section className="py-20" aria-labelledby="grandma-slice">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="reveal">
            <span className="inline-block w-12 h-0.5 bg-[oklch(0.46_0.22_25)] mb-4 mx-auto" />
            <h2 id="grandma-slice" className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[oklch(0.94_0.03_80)] mb-6">
              THE ORIGINAL GRANDMA SLICE
            </h2>
            <p className="font-body text-[oklch(0.72_0.03_80)] leading-relaxed mb-4 max-w-3xl mx-auto">
              The Grandma Slice is a square, thin-crust pizza baked in a rectangular pan, with mozzarella cheese placed directly on the dough and plum tomato sauce ladled on top. The crust is crispy on the bottom, chewy in the middle, and slightly charred at the edges.
            </p>
            <p className="font-body text-[oklch(0.72_0.03_80)] leading-relaxed mb-4 max-w-3xl mx-auto">
              Food historians and pizza journalists widely credit Umberto's of New Hyde Park as the originator of the Grandma pizza style on Long Island. The style has since been replicated across thousands of pizzerias nationwide — but there is only one original.
            </p>
            <p className="font-body text-[oklch(0.72_0.03_80)] leading-relaxed mb-8 max-w-3xl mx-auto">
              Featured on the Food Network. Rated best Sicilian pie in New York. Beloved by three generations of Long Islanders. This is the pizza that started it all.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/menu" className="btn-umberto">
                View Our Menu <ArrowRight size={16} />
              </Link>
              <Link href="/order" className="btn-outline-gold">
                Order the Grandma Slice
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[oklch(0.12_0.018_60)]" aria-labelledby="values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-12">
            <h2 id="values" className="font-display text-[clamp(1.8rem,3vw,2.5rem)] text-[oklch(0.94_0.03_80)]">
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
                className="reveal p-6 border border-[oklch(0.20_0.02_60)]"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-8 h-0.5 bg-[oklch(0.46_0.22_25)] mb-4" />
                <h3 className="font-display text-[oklch(0.94_0.03_80)] text-xl tracking-wider mb-3">{v.title}</h3>
                <p className="font-body text-sm text-[oklch(0.62_0.03_80)] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
