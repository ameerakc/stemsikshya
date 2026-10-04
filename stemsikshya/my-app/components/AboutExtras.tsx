"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LOGOS_DATA, NEWS_DATA } from "@/config/images";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sans = { fontFamily: "var(--font-poppins), system-ui, sans-serif" };
const serif = { fontFamily: "var(--font-playfair), Georgia, serif" };

// Accent color for the italic words (the template's orange). Change to your brand color.
const ACCENT = "#ff6a3d";

/* ------------------------------ DATA ------------------------------ */

// Logos using centralized image configuration
const logos = LOGOS_DATA.map(logo => ({ name: logo.title, src: logo.src }));

// News using centralized image configuration
const news = NEWS_DATA.map(item => ({
  title: item.title,
  excerpt: item.excerpt,
  date: item.date,
  img: item.image,
  category: item.category,
  readTime: item.readTime,
  href: "#",
}));
const rowA = logos; // moves LEFT -> RIGHT
const rowB = [...logos.slice(1), logos[0]]; // moves RIGHT -> LEFT (different order)

// Only list awards you have actually received
const awards = [
  { cat: "Award", title: "Best STEAM Program", year: "2025" },
  { cat: "Award", title: "Innovation in IT Education", year: "2025" },
  { cat: "Award", title: "Outstanding Youth Tech Program", year: "2025" },
  { cat: "Award", title: "Excellence in Future-Ready Curriculum", year: "2025" },
  { cat: "Award", title: "Inclusive Learning Program of the Year", year: "2025" },
];

// Placeholder articles: replace with your real posts (images in /public/news/)
const newsData = NEWS_DATA.map(item => ({
  date: item.date,
  title: item.title,
  img: item.image,
  href: "#",
}));

/* --------------------------- HELPERS --------------------------- */

type W = { w: string; accent?: boolean };

function Heading({ words, className, align = "left" }: { words: W[]; className: string; align?: "left" | "center" }) {
  return (
    <h2 className={`${className} ${align === "center" ? "text-center" : ""}`}>
      {words.map((h, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.16em] pr-[0.06em] align-bottom">
            <span
              className="xw inline-block"
              style={h.accent ? { ...serif, fontStyle: "italic", color: ACCENT } : undefined}
            >
              {h.w}
            </span>
          </span>{" "}
        </span>
      ))}
    </h2>
  );
}

function Label({ children }: { children: string }) {
  return (
    <p className="xl-label flex items-center gap-3 text-[14px] text-[#111]">
      <span className="h-[5px] w-[5px] rounded-full bg-[#111]" />
      {children}
    </p>
  );
}

function LogoTile({ name, src }: { name: string; src: string }) {
  return (
    <div className="shrink-0 pr-[10px]">
      <div className="relative h-[clamp(130px,12.5vw,180px)] w-[clamp(210px,21.7vw,330px)] overflow-hidden rounded-md bg-[#f1f1f1]">
        <span className="absolute inset-0 flex items-center justify-center px-4 text-center text-lg font-medium text-black/25">
          {name}
        </span>
        <div className="absolute inset-[16%]">
          <Image
            src={src}
            alt={name}
            fill
            sizes="(min-width: 1024px) 14vw, 40vw"
            className="object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      </div>
    </div>
  );
}

function LogoGroup({ items }: { items: typeof logos }) {
  return (
    <div className="flex shrink-0">
      {items.map((l) => (
        <LogoTile key={l.name} {...l} />
      ))}
    </div>
  );
}

/* ---------------------------- COMPONENT ---------------------------- */

export default function AboutExtras() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      /* ---------- 1. LOGO ROWS ---------- */
      // Each track holds two identical halves, so the loop never jumps.
      // Row A: -50% -> 0%  (moves LEFT to RIGHT)
      // Row B:   0% -> -50% (moves RIGHT to LEFT, the opposite)
      const rows = [
        { sel: ".mq-a", from: -50, to: 0, duration: 45 },
        { sel: ".mq-b", from: 0, to: -50, duration: 45 },
      ];
      rows.forEach(({ sel, from, to, duration }) => {
        const track = root.querySelector<HTMLElement>(sel);
        if (!track) return;
        const tween = gsap.fromTo(track, { xPercent: from }, { xPercent: to, duration, ease: "none", repeat: -1 });
        const wrap = track.parentElement as HTMLElement;
        const slow = () => gsap.to(tween, { timeScale: 0.2, duration: 0.6 });
        const fast = () => gsap.to(tween, { timeScale: 1, duration: 0.6 });
        wrap.addEventListener("mouseenter", slow);
        wrap.addEventListener("mouseleave", fast);
        cleanups.push(() => {
          wrap.removeEventListener("mouseenter", slow);
          wrap.removeEventListener("mouseleave", fast);
        });
      });

      gsap.from(".mq-wrap", {
        autoAlpha: 0,
        y: 40,
        filter: "blur(10px)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ".mq-section", start: "top 85%", toggleActions: "play none none reverse" },
      });

      /* ---------- 2. AWARDS ---------- */
      gsap.from(".aw-section .xl-label", {
        autoAlpha: 0, x: -20, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".aw-section", start: "top 85%", toggleActions: "play none none reverse" },
      });
      gsap.from(".aw-section .xw", {
        yPercent: 115, duration: 0.9, ease: "power4.out", stagger: 0.06,
        scrollTrigger: { trigger: ".aw-section", start: "top 80%", toggleActions: "play none none reverse" },
      });
      gsap.fromTo(
        ".aw-line",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1.1, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: ".aw-table", start: "top 85%", toggleActions: "play none none reverse" } }
      );
      gsap.from(".aw-row-inner", {
        autoAlpha: 0, y: 22, filter: "blur(8px)", duration: 0.8, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: ".aw-table", start: "top 85%", toggleActions: "play none none reverse" },
      });

      /* ---------- 3. WIDE PHOTO ---------- */
      gsap.fromTo(
        ".ph-frame",
        { clipPath: "inset(0% 12% 0% 12% round 40px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none",
          scrollTrigger: { trigger: ".ph-frame", start: "top 92%", end: "top 25%", scrub: 1 } }
      );
      gsap.fromTo(
        ".ph-img",
        { yPercent: -8, scale: 1.18 },
        { yPercent: 8, ease: "none",
          scrollTrigger: { trigger: ".ph-frame", start: "top bottom", end: "bottom top", scrub: true } }
      );

      /* ---------- 4. NEWS ---------- */
      gsap.from(".nw-section .xl-label", {
        autoAlpha: 0, y: 14, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".nw-section", start: "top 85%", toggleActions: "play none none reverse" },
      });
      gsap.from(".nw-section .xw", {
        yPercent: 115, duration: 0.9, ease: "power4.out", stagger: 0.08,
        scrollTrigger: { trigger: ".nw-section", start: "top 80%", toggleActions: "play none none reverse" },
      });
      gsap.from(".nw-card", {
        autoAlpha: 0, y: 60, filter: "blur(10px)", duration: 1, ease: "power3.out", stagger: 0.15,
        scrollTrigger: { trigger: ".nw-grid", start: "top 88%", toggleActions: "play none none reverse" },
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} style={sans}>
      {/* ================= 1. LOGO ROWS ================= */}
      <section className="mq-section relative z-10 overflow-hidden bg-white py-[clamp(3rem,6vw,6rem)]" aria-label="Our learning tools and partners">
        <div className="mq-wrap overflow-hidden">
          {/* Row A: LEFT -> RIGHT */}
          <div className="mq-a flex w-max will-change-transform">
            <LogoGroup items={rowA} />
            <LogoGroup items={rowA} />
            <LogoGroup items={rowA} />
            <LogoGroup items={rowA} />
          </div>
        </div>

        <div className="mq-wrap mt-[10px] overflow-hidden">
          {/* Row B: RIGHT -> LEFT */}
          <div className="mq-b flex w-max will-change-transform">
            <LogoGroup items={rowB} />
            <LogoGroup items={rowB} />
            <LogoGroup items={rowB} />
            <LogoGroup items={rowB} />
          </div>
        </div>
      </section>

      {/* ================= 2. AWARDS ================= */}
      <section id="awards" className="aw-section relative z-10 bg-white py-[clamp(3rem,6vw,7rem)]">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-[26%_1fr]">
            <Label>Our Awards</Label>

            <div>
              <Heading
                className="max-w-[900px] text-[clamp(1.8rem,3.9vw,4rem)] font-normal leading-[1.17] tracking-[-0.015em] text-[#1c3d7a]"
                words={"We offer future-ready STEAM and IT programs for every learner".split(" ").map((w) => ({ w }))}
              />

              <div className="aw-table mt-[clamp(2.5rem,5vw,5.5rem)]">
                <div className="aw-line h-px w-full bg-black/10" />
                {awards.map((a) => (
                  <div key={a.title}>
                    <div className="aw-row-inner group grid grid-cols-[1fr_auto] items-center gap-x-6 py-[clamp(1.1rem,1.9vw,1.8rem)] text-[clamp(0.9rem,0.3vw+0.8rem,1.1rem)] text-[#111] transition-colors duration-300 hover:text-[#1c3d7a] sm:grid-cols-[35%_1fr_auto]">
                      <span className="hidden transition-transform duration-300 group-hover:translate-x-2 sm:block">{a.cat}</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-2">{a.title}</span>
                      <span className="tabular-nums">{a.year}</span>
                    </div>
                    <div className="aw-line h-px w-full bg-black/10" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. WIDE PHOTO ================= */}
      <section className="relative z-10 bg-white py-[clamp(1.5rem,4vw,4rem)]" aria-label="Students learning drone technology">
        <div className="ph-frame relative h-[clamp(300px,39vw,720px)] w-full overflow-hidden bg-gradient-to-br from-[#dbe4f5] to-[#9db3dd]">
          <div className="ph-img absolute inset-0 will-change-transform">
            {/* Put your photo at /public/about/students-drone.webp (about 2400x1200) */}
            <Image
              src="/about/students-drone.webp"
              alt="Students learning drone technology on the school ground"
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

      {/* ================= 4. NEWS ================= */}
      <section id="news" className="nw-section relative z-10 bg-white pb-[clamp(5rem,9vw,9rem)] pt-[clamp(3rem,6vw,6rem)]">
        <div className="site-container">
          <div className="flex justify-center">
            <Label>News</Label>
          </div>

          <Heading
            align="center"
            className="mx-auto mt-4 max-w-[760px] text-balance text-[clamp(2rem,4.4vw,4.5rem)] font-normal leading-[1.15] tracking-[-0.01em] text-[#0a0a0a]"
            words={[{ w: "Latest" }, { w: "Stories" }, { w: "from" }, { w: "our" }, { w: "Classrooms", accent: true }]}
          />

          <div className="nw-grid mt-[clamp(2.5rem,5vw,5.5rem)] grid grid-cols-1 gap-x-[clamp(1.25rem,2.6vw,2.75rem)] gap-y-12 md:grid-cols-3">
            {news.map((n) => (
              <article key={n.title} className="nw-card group">
                <Link href={n.href} className="block">
                  <div className="relative aspect-[412/250] overflow-hidden rounded-2xl bg-[#c3cbd3]">
                    {/* Placeholder illustration, shown until the real image loads */}
                    <svg viewBox="0 0 412 250" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                      <rect width="412" height="250" fill="#c3cbd3" />
                      <circle cx="102" cy="110" r="18" fill="#f1f3f5" />
                      <path d="M0 160 C40 140 80 175 130 190 C190 100 250 60 300 60 C350 60 390 120 412 185 L412 250 L0 250 Z" fill="#f1f3f5" />
                    </svg>
                    <Image
                      src={n.img}
                      alt={n.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>

                  <div className="px-[clamp(0.5rem,1.9vw,2rem)]">
                    <p className="mt-6 flex items-center gap-3 text-[13px] text-[#555]">
                      <span className="h-3 w-px bg-[#333]" />
                      {n.date}
                    </p>
                    <h3 className="mt-3 text-[clamp(1.05rem,1.35vw,1.4rem)] font-normal leading-[1.3] text-[#0a0a0a] transition-colors duration-300 group-hover:text-[#1c3d7a]">
                      {n.title}
                    </h3>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}