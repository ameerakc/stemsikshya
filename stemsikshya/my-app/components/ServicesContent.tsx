"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES_DATA, TESTIMONIALS_DATA, PARTNERS_DATA } from "@/config/images";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sans = { fontFamily: "var(--font-poppins), system-ui, sans-serif" };
const serif = { fontFamily: "var(--font-playfair), Georgia, serif" };

// Accent color from your screenshots. Change to your brand color (e.g. "#1c3d7a") if you prefer.
const ACCENT = "#ff6a3d";

// Width of the number column in the accordion. Used by BOTH the row button and the panel,
// so the number, the title and the description always line up.
const NUM_COL = "clamp(120px,16vw,242px)";

/* ------------------------------ DATA ------------------------------ */

// Services data using centralized image configuration
const services = SERVICES_DATA.map((service, index) => ({
  no: String(index + 1).padStart(2, '0'),
  title: service.title,
  img: service.image,
  text: service.longDescription,
  items: service.features,
}));

const statWords: { w: string; grey: boolean }[] = [
  ..."We help students build future-ready skills through".split(" ").map((w) => ({ w, grey: false })),
  ..."coding, robotics, AI and drone training, plus job-ready IT courses for every learner.".split(" ").map((w) => ({ w, grey: true })),
];

const columns = [
  "Coding for Beginners",
  "Robotics for Schools & Colleges",
  "Python & IT Training",
  "Drone Training",
];

const reviews = TESTIMONIALS_DATA.map(t => ({
  quote: t.quote,
  name: t.name,
  role: t.role,
  avatar: t.photo,
}));

// Same partner logos as the home page (/public/partners/)
const partners = PARTNERS_DATA.map(partner => ({
  name: partner.name,
  logo: partner.image,
}));

const rowB = [...partners.slice(2), ...partners.slice(0, 2)];

const initials = (s: string) =>
  s.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

/* ------------------------------ ICONS ------------------------------ */

function LayersIcon() {
  return (
    <svg viewBox="0 0 64 60" className="h-[60px] w-16" aria-hidden="true">
      <defs>
        <linearGradient id="sv-g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#111" />
          <stop offset="1" stopColor="#c9c9c9" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3, 4].map((i) => (
        <polygon key={i} points="32,2 62,16 32,30 2,16" transform={`translate(0 ${i * 7})`} fill="url(#sv-g1)" opacity={1 - i * 0.12} stroke="#fff" strokeWidth="0.8" />
      ))}
    </svg>
  );
}
function RingIcon() {
  return (
    <svg viewBox="0 0 60 60" className="h-[60px] w-[60px]" aria-hidden="true">
      <defs>
        <linearGradient id="sv-g2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#444" />
          <stop offset="1" stopColor="#d4d4d4" />
        </linearGradient>
      </defs>
      <rect x="14" y="4" width="32" height="40" rx="15" fill="none" stroke="url(#sv-g2)" strokeWidth="7" />
      <ellipse cx="30" cy="36" rx="26" ry="14" fill="none" stroke="url(#sv-g2)" strokeWidth="6" opacity="0.85" />
    </svg>
  );
}
function DiscsIcon() {
  return (
    <svg viewBox="0 0 36 60" className="h-[60px] w-9" aria-hidden="true">
      <defs>
        <linearGradient id="sv-g3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bdbdbd" />
          <stop offset="0.5" stopColor="#444" />
          <stop offset="1" stopColor="#d8d8d8" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((i) => (
        <ellipse key={i} cx="18" cy={8 + i * 14} rx="17" ry="7" fill="url(#sv-g3)" stroke="#fff" strokeWidth="0.8" />
      ))}
    </svg>
  );
}
function ChevronsIcon() {
  return (
    <svg viewBox="0 0 72 60" className="h-[60px] w-[72px]" aria-hidden="true">
      <defs>
        <linearGradient id="sv-g4" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#777" />
          <stop offset="1" stopColor="#dcdcdc" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((i) => (
        <polygon key={i} points="0,0 14,0 30,30 14,60 0,60 16,30" transform={`translate(${i * 17} 0)`} fill="url(#sv-g4)" opacity={1 - i * 0.18} />
      ))}
    </svg>
  );
}
const icons = [<LayersIcon key="a" />, <RingIcon key="b" />, <DiscsIcon key="c" />, <ChevronsIcon key="d" />];

const ArrowUpRight = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

/* ------------------------------ SMALL PARTS (defined OUTSIDE the main component) ------------------------------ */

function LogoTile({ name, src }: { name: string; src: string }) {
  return (
    <div className="shrink-0 pr-[10px]">
      <div className="relative h-[clamp(100px,9.6vw,144px)] w-[clamp(170px,17vw,256px)] overflow-hidden rounded-md bg-[#f1f1f1]">
        <span className="absolute inset-0 flex items-center justify-center px-3 text-center text-sm font-medium text-black/25">{name}</span>
        <div className="absolute inset-[18%]">
          <Image
            src={src}
            alt={name}
            fill
            sizes="(min-width: 1024px) 12vw, 40vw"
            className="object-contain opacity-70 transition-opacity duration-300 hover:opacity-100"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      </div>
    </div>
  );
}

function LogoGroup({ items }: { items: typeof partners }) {
  return (
    <div className="flex shrink-0">
      {items.map((l) => (
        <LogoTile key={l.name} name={l.name} src={l.logo} />
      ))}
    </div>
  );
}

function ExpertiseGroup() {
  return (
    <div className="flex shrink-0 items-center">
      {[true, false, false].map((solid, i) => (
        <span
          key={i}
          className="shrink-0 whitespace-nowrap px-[clamp(1.25rem,3.5vw,4.5rem)] text-[clamp(4.5rem,12vw,13rem)] uppercase leading-[0.9] tracking-[-0.02em]"
          style={
            solid
              ? { ...sans, fontWeight: 500, color: "#0a0a0a" }
              : { ...sans, fontWeight: 400, color: "transparent", WebkitTextStroke: "1.5px #b9b9b9" }
          }
        >
          Our Expertise
        </span>
      ))}
    </div>
  );
}

function Label({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-3 text-[13px] uppercase tracking-wide text-[#111]">
      <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#111]" />
      {children}
    </p>
  );
}

/* ------------------------------ COMPONENT ------------------------------ */

export default function ServicesContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const prevActive = useRef(0);

  const [rev, setRev] = useState(0);
  const prevRev = useRef(0);
  const revDir = useRef(1);

  /* ------------------------- Main animations ------------------------- */
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // HERO
      gsap.from(".sv-label-hero", { autoAlpha: 0, x: -20, duration: 0.8, ease: "power3.out", delay: 0.1 });
      gsap.from(".sv-hero-line", { yPercent: 115, duration: 1, ease: "power4.out", stagger: 0.14, delay: 0.2 });

      // MARQUEE: LEFT -> RIGHT, infinite (two identical halves = no jump)
      const tween = gsap.fromTo(trackRef.current, { xPercent: -50 }, { xPercent: 0, duration: 36, ease: "none", repeat: -1 });
      const wrap = rootRef.current?.querySelector<HTMLElement>(".sv-marquee");
      const slow = () => gsap.to(tween, { timeScale: 0.2, duration: 0.6 });
      const fast = () => gsap.to(tween, { timeScale: 1, duration: 0.6 });
      wrap?.addEventListener("mouseenter", slow);
      wrap?.addEventListener("mouseleave", fast);
      cleanups.push(() => {
        wrap?.removeEventListener("mouseenter", slow);
        wrap?.removeEventListener("mouseleave", fast);
      });

      // BIG PHOTO: the frame opens, and the picture moves INSIDE the frame while you scroll
      gsap.fromTo(
        ".sv-frame",
        { clipPath: "inset(0% 8% 0% 8% round 36px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: ".sv-frame", start: "top 95%", end: "top 30%", scrub: 1 },
        }
      );
      gsap.fromTo(
        ".sv-photo",
        { yPercent: -8, scale: 1.3 },
        {
          yPercent: 8,
          scale: 1.2,
          ease: "none",
          scrollTrigger: { trigger: ".sv-frame", start: "top bottom", end: "bottom top", scrub: true },
        }
      );

      // SERVICE ROWS
      gsap.from(".sv-row", {
        autoAlpha: 0,
        y: 50,
        filter: "blur(10px)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".sv-list", start: "top 85%", toggleActions: "play none none reverse" },
      });

      // STATS
      const num = rootRef.current?.querySelector<HTMLElement>(".sv-count");
      if (num) {
        const end = Number(num.dataset.to);
        const state = { v: 0 };
        num.textContent = "0";
        gsap.to(state, {
          v: end,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            num.textContent = Math.round(state.v).toString();
          },
          scrollTrigger: { trigger: num, start: "top 88%", toggleActions: "play none none reset" },
        });
      }
      gsap.from(".sv-caption", {
        autoAlpha: 0, y: 24, filter: "blur(8px)", duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".sv-caption", start: "top 90%", toggleActions: "play none none reverse" },
      });
      gsap.from(".sv-word", {
        yPercent: 115, duration: 0.9, ease: "power4.out", stagger: 0.03,
        scrollTrigger: { trigger: ".sv-big", start: "top 85%", toggleActions: "play none none reverse" },
      });
      gsap.from(".sv-small", {
        autoAlpha: 0, y: 30, filter: "blur(8px)", duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".sv-small", start: "top 90%", toggleActions: "play none none reverse" },
      });
      gsap.fromTo(
        ".sv-hline",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".sv-hline", start: "top 95%", end: "top 65%", scrub: true } }
      );
      gsap.from(".sv-col", {
        autoAlpha: 0, y: 40, filter: "blur(10px)", duration: 0.9, ease: "power3.out", stagger: 0.14,
        scrollTrigger: { trigger: ".sv-cols", start: "top 88%", toggleActions: "play none none reverse" },
      });

      // TESTIMONIALS
      gsap.from(".sv-t-left > *", {
        autoAlpha: 0, y: 30, duration: 0.9, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: ".sv-t-section", start: "top 80%", toggleActions: "play none none reverse" },
      });
      gsap.from(".sv-t-card-wrap", {
        autoAlpha: 0, x: 80, filter: "blur(10px)", duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".sv-t-section", start: "top 80%", toggleActions: "play none none reverse" },
      });

      // LOGO ROWS: row A LEFT -> RIGHT, row B RIGHT -> LEFT (the opposite)
      [
        { sel: ".sv-mq-a", from: -50, to: 0 },
        { sel: ".sv-mq-b", from: 0, to: -50 },
      ].forEach(({ sel, from, to }) => {
        const track = rootRef.current?.querySelector<HTMLElement>(sel);
        if (!track) return;
        const tw = gsap.fromTo(track, { xPercent: from }, { xPercent: to, duration: 45, ease: "none", repeat: -1 });
        const w = track.parentElement as HTMLElement;
        const s = () => gsap.to(tw, { timeScale: 0.2, duration: 0.6 });
        const f = () => gsap.to(tw, { timeScale: 1, duration: 0.6 });
        w.addEventListener("mouseenter", s);
        w.addEventListener("mouseleave", f);
        cleanups.push(() => {
          w.removeEventListener("mouseenter", s);
          w.removeEventListener("mouseleave", f);
        });
      });
    }, rootRef);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  /* ---------------------- Accordion open / close ---------------------- */
  useEffect(() => {
    // Only run when the open row actually changed (safe in React StrictMode too)
    if (prevActive.current === active) return;

    const root = listRef.current;
    if (!root) return;

    const panels = root.querySelectorAll<HTMLElement>(".sv-panel");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const d = reduced ? 0 : 0.7;
    const oldP = panels[prevActive.current];
    const newP = panels[active];

    if (oldP) gsap.to(oldP, { height: 0, duration: d, ease: "power3.inOut", overwrite: true });
    if (newP) {
      gsap.to(newP, { height: "auto", duration: d, ease: "power3.inOut", overwrite: true });
      if (!reduced) {
        gsap.fromTo(
          newP.querySelectorAll(".sv-p-item"),
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.15, stagger: 0.06, ease: "power3.out" }
        );
      }
    }
    prevActive.current = active;

    // The page got longer or shorter, so re-measure the scroll animations below
    const call = gsap.delayedCall(d + 0.05, () => ScrollTrigger.refresh());
    return () => {
      call.kill();
    };
  }, [active]);

  /* ----------------------- Testimonial slide change ----------------------- */
  useEffect(() => {
    if (prevRev.current === rev) return;
    prevRev.current = rev;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const d = revDir.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sv-t-content",
        { autoAlpha: 0, x: 40 * d, filter: "blur(8px)" },
        { autoAlpha: 1, x: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(".sv-t-back", { rotate: 2 + d * 4 }, { rotate: 2, duration: 1.1, ease: "elastic.out(1, 0.55)" });
    }, rootRef);
    return () => ctx.revert();
  }, [rev]);

  const goReview = (step: 1 | -1) => {
    revDir.current = step;
    setRev((i) => (i + step + reviews.length) % reviews.length);
  };

  const r = reviews[rev];

  const arrowBtn =
    "flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-black/10 text-[#111] transition-all duration-300 hover:border-[#111] hover:bg-[#111] hover:text-white active:scale-95";

  return (
    <div ref={rootRef} className="relative z-10 bg-white" style={sans}>
      {/* ===================== 1. HERO + MARQUEE ===================== */}
      <section className="overflow-hidden pt-[clamp(8rem,13vw,13rem)]">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-[26%_1fr]">
            <div className="sv-label-hero pt-3">
              <Label>Our Services</Label>
            </div>
            <h1 className="text-[clamp(2.1rem,6vw,6.5rem)] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-[#0a0a0a]">
              {["Services &", "Capabilities"].map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.1em]">
                  <span className="sv-hero-line inline-block">{line}</span>
                </span>
              ))}
            </h1>
          </div>
        </div>

        <div className="sv-marquee mt-[clamp(3rem,7vw,7rem)] select-none overflow-hidden" aria-hidden="true">
          <div ref={trackRef} className="flex w-max will-change-transform">
            {[0, 1].map((half) => (
              <div key={half} className="flex shrink-0">
                <ExpertiseGroup />
                <ExpertiseGroup />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 2. BIG PHOTO (moves inside its frame) ===================== */}
      <section
        className="relative z-10"
        style={{ marginTop: "calc(-1 * clamp(1.5rem, 3.2vw, 3.5rem))" }}
        aria-label="Students learning at STEM Sikshya"
      >
        <div className="sv-frame relative h-[clamp(300px,39vw,760px)] w-full overflow-hidden bg-gradient-to-br from-[#dbe4f5] to-[#9db3dd]">
          <div className="sv-photo absolute inset-0 will-change-transform">
            {/* Your own wide photo: /public/services/banner.webp (about 2400x1300) */}
            <Image
              src="/services/banner.webp"
              alt="Students learning robotics and coding at STEM Sikshya"
              fill
              sizes="100vw"
              className="object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      </section>

      {/* ===================== 3. SERVICES ACCORDION ===================== */}
      <section id="services-list" className="pb-[clamp(3rem,6vw,6rem)] pt-[clamp(3rem,6vw,6rem)]">
        <div className="site-container">
          <div ref={listRef} className="sv-list">
            {services.map((s, i) => {
              const open = active === i;
              return (
                <article
                  key={s.no}
                  className="sv-row grid grid-cols-1 lg:grid-cols-[16.5%_1fr] lg:gap-x-[clamp(2rem,8vw,8rem)]"
                >
                  {/* Left image: stretches with the row, so it grows when the row opens */}
                  <div className="relative hidden self-stretch lg:block">
                    <div className="absolute inset-x-0 inset-y-[clamp(1rem,1.6vw,1.5rem)] overflow-hidden rounded-[3px] bg-gradient-to-b from-[#dbe4f5] to-[#9db3dd] shadow-[0_18px_30px_-14px_rgba(0,0,0,0.35)]">
                      <Image
                        src={s.img}
                        alt={s.title}
                        fill
                        sizes="(min-width: 1024px) 16vw, 100vw"
                        className="object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  </div>

                  {/* Right content */}
                  <div className={`border-t border-black/10 ${i === services.length - 1 ? "border-b" : ""}`}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-expanded={open}
                      aria-controls={`sv-panel-${i}`}
                      className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-4 py-[clamp(1.5rem,3.1vw,3rem)] text-left lg:gap-x-0"
                      style={{ ["--num-col" as string]: NUM_COL }}
                    >
                      <span
                        className="text-[clamp(1.1rem,1.6vw,1.6rem)] lg:w-[var(--num-col)]"
                        style={{ color: ACCENT }}
                      >
                        {s.no}
                      </span>
                      <span className="text-[clamp(1.35rem,2.55vw,2.7rem)] font-normal uppercase leading-[1.1] tracking-[-0.005em] text-[#1d1d1d] transition-transform duration-500 group-hover:translate-x-2">
                        {s.title}
                      </span>
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-full border text-[#111] transition-all duration-500 lg:mr-[clamp(0.5rem,2vw,2rem)] ${
                          open ? "border-black/50" : "border-transparent"
                        }`}
                      >
                        <ArrowUpRight />
                      </span>
                    </button>

                    {/* Panel (height animated by GSAP) */}
                    <div
                      id={`sv-panel-${i}`}
                      role="region"
                      aria-label={s.title}
                      aria-hidden={!open}
                      className="sv-panel overflow-hidden"
                      style={{ height: i === 0 ? "auto" : 0 }}
                    >
                      <div className="pb-[clamp(2rem,4vw,4rem)] pt-[clamp(0.25rem,0.8vw,0.75rem)]">
                        {/* Mobile photo */}
                        <div className="sv-p-item relative mb-6 aspect-[16/10] overflow-hidden rounded-xl bg-gradient-to-b from-[#dbe4f5] to-[#9db3dd] lg:hidden">
                          <Image
                            src={s.img}
                            alt={s.title}
                            fill
                            sizes="100vw"
                            className="object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = "none";
                            }}
                          />
                        </div>

                        {/* Same first-column width as the button above, so everything lines up */}
                        <div
                          className="grid grid-cols-1 gap-y-6 lg:grid-cols-[var(--num-col)_1fr]"
                          style={{ ["--num-col" as string]: NUM_COL }}
                        >
                          <ul className="space-y-2.5 text-[clamp(0.8rem,0.2vw+0.75rem,0.95rem)] uppercase text-[#111]">
                            {s.items.map((it) => (
                              <li key={it} className="sv-p-item">
                                {it}
                              </li>
                            ))}
                          </ul>
                          <div className="lg:pr-[clamp(2rem,6vw,6rem)]">
                            <p className="sv-p-item max-w-[640px] text-[clamp(0.95rem,0.3vw+0.85rem,1.15rem)] leading-[1.6] text-[#666]">
                              {s.text}
                            </p>
                            <Link
                              href="/contact"
                              tabIndex={open ? 0 : -1}
                              className="sv-p-item mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#1c3d7a] underline-offset-4 hover:underline"
                            >
                              Enquire about {s.title}
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== 4. STATS + COLUMNS ===================== */}
      <section className="pt-[clamp(3rem,6vw,7rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Number: starts at the same left edge as everything else (the site gutter) */}
          <div className="px-[var(--gutter)] lg:pr-8">
            <p className="flex items-start text-[#0a0a0a]">
              <span className="sv-count text-[clamp(3.5rem,6.5vw,7rem)] font-normal leading-none tracking-[-0.02em]" data-to="15">
                15
              </span>
              <span className="ml-3 mt-[0.9em] text-lg font-medium">+</span>
            </p>
            <p className="sv-caption mt-6 max-w-[320px] text-[clamp(0.9rem,0.3vw+0.8rem,1.05rem)] leading-[1.6] text-[#444]">
              Partner schools and colleges across Nepal
            </p>
          </div>

          {/* Big paragraph: starts left of the divider, first line indented (as in your screenshot) */}
        <h2 className="sv-big mt-12 px-[var(--gutter)] text-[clamp(1.4rem,2.3vw,2.4rem)] font-medium leading-[1.2] tracking-[-0.01em] lg:-ml-[6.7vw] lg:mt-0 lg:max-w-[47vw] lg:px-0 lg:indent-[7.5vw]">
  {statWords.map((h, i) => (
    <span key={i}>
      <span className="inline-block indent-0 overflow-hidden pb-[0.14em] align-bottom">
        <span className={`sv-word inline-block ${h.grey ? "text-[#666]" : "text-[#0a0a0a]"}`}>
          {h.w}
        </span>
      </span>{" "}
    </span>
  ))}
</h2>

          {/* Small paragraph under the divider */}
          <div className="hidden lg:block" />
          <div className="mt-12 px-[var(--gutter)] pb-[clamp(3rem,6vw,6rem)] lg:mt-[clamp(1rem,2vw,2.5rem)] lg:border-l lg:border-black/10 lg:pl-[clamp(1.5rem,2.7vw,3.5rem)] lg:pr-[10vw]">
            <p className="sv-small max-w-[600px] text-[clamp(0.9rem,0.3vw+0.8rem,1.05rem)] leading-[1.6] text-[#444]">
              Our team of educators is dedicated to helping every learner reach
              their goals, from first block-coding projects in grade 1 to
              real-world IT careers.
            </p>
          </div>
        </div>

        <div className="sv-hline h-px w-full bg-black/10" />

        <div className="sv-cols grid grid-cols-2 lg:grid-cols-4">
          {columns.map((c, i) => (
            <div
              key={c}
              className={`sv-col border-black/10 px-[clamp(1.5rem,2.1vw,2.5rem)] pb-[clamp(4rem,9vw,9rem)] pt-[clamp(2.5rem,3.5vw,4rem)] ${
                i % 2 === 1 ? "border-l" : ""
              } ${i > 0 ? "lg:border-l" : "lg:border-l-0"}`}
            >
              <div className="transition-transform duration-500 hover:-translate-y-1">{icons[i]}</div>
              <h3 className="mt-10 max-w-[220px] text-[clamp(1rem,1.3vw,1.4rem)] font-normal leading-[1.3] text-[#0a0a0a] sm:mt-12">
                {c}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== 5. TESTIMONIAL CARD + LOGO ROWS ===================== */}
      <section className="sv-t-section overflow-hidden pb-[clamp(4rem,8vw,8rem)] pt-[clamp(3rem,6vw,6rem)]">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-x-[clamp(2rem,6vw,7rem)]">
            {/* Left */}
            <div className="sv-t-left flex flex-col justify-between gap-12 lg:pl-[clamp(0rem,8vw,9rem)]">
              <div>
                <Label>Testimonials</Label>
                <h2 className="mt-6 text-[clamp(2rem,3.6vw,3.9rem)] font-normal leading-[1.15] tracking-[-0.01em] text-[#0a0a0a]">
                  What{" "}
                  <span style={{ ...serif, fontStyle: "italic", color: ACCENT }}>our clients</span>
                  <br />
                  say?
                </h2>
              </div>
              <p className="flex items-baseline gap-3">
                <span className="text-[clamp(2.5rem,3.8vw,4rem)] leading-none text-[#0a0a0a]">100%</span>
                <span className="text-xs text-[#555]">Successful Rating</span>
              </p>
            </div>

            {/* Right: card slider */}
            <div className="sv-t-card-wrap flex items-center gap-3 sm:gap-5">
              <button type="button" aria-label="Previous review" onClick={() => goReview(-1)} className={arrowBtn}>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>

              <div className="relative min-w-0 flex-1">
                {/* Tilted accent shape behind the card */}
                <div
                  aria-hidden="true"
                  className="sv-t-back absolute -right-3 bottom-[-8px] top-[6px] w-[70%] rounded-2xl"
                  style={{ background: ACCENT, transform: "rotate(2deg)", transformOrigin: "bottom right" }}
                />
                <div className="relative rounded-2xl bg-[#f8f9fb] p-[clamp(1.5rem,2.6vw,2.6rem)]">
                  <div className="sv-t-content flex min-h-[clamp(200px,17vw,260px)] flex-col justify-between gap-10">
                    <p className="max-w-[420px] text-[clamp(0.95rem,0.5vw+0.8rem,1.15rem)] leading-[1.55] text-[#555]">
                      &ldquo;{r.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#d6dcea] text-sm font-medium text-[#1c3d7a]">
                        {initials(r.name)}
                        <Image
                          src={r.avatar}
                          alt={r.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                      <div>
                        <p className="text-[16px] font-medium text-[#111]">{r.name}</p>
                        <p className="text-[12px] text-[#555]">{r.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button type="button" aria-label="Next review" onClick={() => goReview(1)} className={arrowBtn}>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Logo rows */}
        <div className="mt-[clamp(3rem,7vw,7rem)]" aria-label="Our partner schools and colleges">
          <div className="overflow-hidden">
            <div className="sv-mq-a flex w-max will-change-transform">
              {[0, 1, 2, 3].map((n) => (
                <LogoGroup key={n} items={partners} />
              ))}
            </div>
          </div>
          <div className="mt-[10px] overflow-hidden">
            <div className="sv-mq-b flex w-max will-change-transform">
              {[0, 1, 2, 3].map((n) => (
                <LogoGroup key={n} items={rowB} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}