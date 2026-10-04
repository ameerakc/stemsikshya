"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_IMAGES } from "@/config/images";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sans = { fontFamily: "var(--font-poppins), system-ui, sans-serif" };

// Same 4 images as the hero capsules. Use tall 3:4 photos (about 800x1124)
const cards = [
  { src: HERO_IMAGES.coding, title: "Coding", sub: "Block Coding, Python" },
  { src: HERO_IMAGES.robotics, title: "Robotics", sub: "Arduino, Quarky, ESP" },
  { src: HERO_IMAGES.drone, title: "Drone", sub: "DIY, RC Drone" },
  { src: HERO_IMAGES.ai, title: "IT Trainings", sub: "Website, App Development" },
];

const FINAL_RADIUS = 28; // must match rounded-[28px] below

const inset = (t: number, r: number, b: number, l: number, rad: number) =>
  `inset(${t}px ${r}px ${b}px ${l}px round ${rad}px)`;

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = gsap.utils.selector(sectionRef.current);
    const mm = gsap.matchMedia();

    // ---------- DESKTOP: capsules morph into cards ----------
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const cardEls = q(".card") as HTMLElement[];
      const slots = q(".card-slot") as HTMLElement[]; // final (static) positions
      const pillSlots = Array.from(
        document.querySelectorAll<HTMLElement>(".pill-slot") // hero start positions
      );
      const heroEl = document.getElementById("home");
      if (!heroEl || !gridRef.current || pillSlots.length !== slots.length) return;

      // Distance + size between the hero capsule slot and the final card slot
      const measure = (i: number) => {
        const p = pillSlots[i].getBoundingClientRect();
        const c = slots[i].getBoundingClientRect();
        return {
          dx: p.left + p.width / 2 - (c.left + c.width / 2),
          dy: p.top + p.height / 2 - (c.top + c.height / 2),
          W: c.width,
          H: c.height,
          sw: p.width,
          sh: p.height,
        };
      };

      const tl = gsap.timeline({
  defaults: { ease: "none" },
  scrollTrigger: {
    trigger: pillSlots[0],     // the capsule row itself
    start: "top 40%",          // morph begins after a little scrolling
    endTrigger: gridRef.current,
    end: "top 25%",            // cards reach their final spot
    scrub: 1,
    invalidateOnRefresh: true,
  },
});

      cardEls.forEach((el, i) => {
        // Move: capsule position -> grid position.
        // Later capsules start moving first, so the first one lags behind (like your middle screenshot)
        tl.fromTo(
          el,
          { x: () => measure(i).dx, y: () => measure(i).dy },
          { x: 0, y: 0, duration: 0.95, ease: "power1.inOut" },
          (cardEls.length - 1 - i) * 0.08
        );

        // Shape: narrow capsule crop -> full card. The first one widens first
        tl.fromTo(
          el,
          {
            clipPath: () => {
              const m = measure(i);
              const ty = (m.H - m.sh) / 2;
              const tx = (m.W - m.sw) / 2;
              return inset(ty, tx, ty, tx, m.sw / 2);
            },
          },
          { clipPath: inset(0, 0, 0, 0, FINAL_RADIUS), duration: 0.9, ease: "power2.inOut" },
          i * 0.1
        );
      });

      // Labels fade in once the cards have almost landed
      tl.fromTo(
        q(".card-label"),
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.06, ease: "power2.out" },
        1.0
      );
    });

    // ---------- MOBILE / TABLET: simple reveal ----------
    mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.from(q(".card"), {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Re-measure after fonts/images change the layout
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative z-10 pb-24 pt-[clamp(3rem,6vw,5.5rem)] sm:pb-32"
    >
      <div className="site-container">
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {cards.map((c) => (
            <div key={c.title} className="card-slot aspect-[400/562] w-full">
              <article className="card relative h-full w-full overflow-hidden rounded-[28px] bg-gradient-to-b from-[#dbe4f5] to-[#9db3dd] will-change-transform">
                <Image
                  src={c.src}
                  alt={c.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />

                {/* Frosted glass label */}
                <div
                  className="card-label absolute inset-x-3 bottom-3 rounded-2xl border border-white/20 px-5 py-4 text-white backdrop-blur-xl"
                  style={{
                    ...sans,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.35), rgba(255,255,255,0.08))",
                  }}
                >
                  <h3 className="text-xl font-semibold leading-tight">{c.title}</h3>
                  <p className="mt-1 text-sm uppercase tracking-wide text-white/80">
                    {c.sub}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}