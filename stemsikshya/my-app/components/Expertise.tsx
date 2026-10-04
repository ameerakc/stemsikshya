"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERTISE_DATA } from "@/config/images/expertise";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sans = { fontFamily: "var(--font-poppins), system-ui, sans-serif" };

// Expertise data using centralized image configuration
const rows = EXPERTISE_DATA.map((item, index) => ({
  no: String(index + 1).padStart(2, '0'),
  title: item.title,
  text: item.description,
  img: item.image,
  items: item.features,
}));

// Heading words with their colors (dark navy / lighter blue, like the design)
const headingWords = [
  { w: "Let’s", c: "#1c3d7a" },
  { w: "Make", c: "#1c3d7a" },
  { w: "Something", c: "#5d73a1" },
  { w: "Extraordinary", c: "#5d73a1" },
  { w: "Together", c: "#1c3d7a" },
];

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Heading words slide up
      gsap.from(".exp-word", {
        yPercent: 110,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".exp-heading",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Thin vertical line grows down
      gsap.fromTo(
        ".exp-line",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".exp-line",
            start: "top 92%",
            end: "top 65%",
            scrub: true,
          },
        }
      );

      // Each row: blur -> sharp, tied to scroll (reverses when scrolling up)
      gsap.utils.toArray<HTMLElement>(".exp-row").forEach((row) => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            end: "top 35%",
            scrub: 1,
          },
        });

        tl.fromTo(
          row.querySelectorAll(".exp-left > *"),
          { autoAlpha: 0, y: 40, filter: "blur(12px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", stagger: 0.15 },
          0
        );
        tl.fromTo(
          row.querySelector(".exp-img"),
          { autoAlpha: 0.3, y: 70, scale: 0.9, filter: "blur(10px)" },
          { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)" },
          0
        );
        tl.fromTo(
          row.querySelectorAll(".exp-item"),
          { autoAlpha: 0, y: 24, filter: "blur(8px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", stagger: 0.12 },
          0.1
        );

        // Photo drifts slightly inside its shape while the row passes
        gsap.fromTo(
          row.querySelector(".exp-photo"),
          { yPercent: -6, scale: 1.15 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative z-10 bg-white pb-[140px] pt-[clamp(4rem,8vw,8rem)]"
      style={sans}
    >
      {/* Trapezoid shape: wide top, narrower rounded bottom */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="expertise-shape" clipPathUnits="objectBoundingBox">
            <path d="M0.03,0 L0.97,0 Q1,0 0.992,0.06 L0.935,0.88 Q0.928,1 0.86,1 L0.14,1 Q0.072,1 0.065,0.88 L0.008,0.06 Q0,0 0.03,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="site-container">
        {/* Heading */}
        <h2 className="exp-heading mx-auto max-w-[900px] text-balance text-center text-[clamp(2rem,4.4vw,4rem)] font-medium leading-[1.15] tracking-[-0.01em]">
          {headingWords.map((h) => (
            <span key={h.w}>
              <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                <span className="exp-word inline-block" style={{ color: h.c }}>
                  {h.w}
                </span>
              </span>{" "}
            </span>
          ))}
        </h2>

        {/* Thin vertical line */}
        <div className="exp-line mx-auto mt-5 h-[32px] w-px bg-[#1c3d7a]/40 sm:mt-6" />

        {/* Rows */}
        <div className="mt-6 sm:mt-8">
          {rows.map((r, idx) => (
            <article
              key={r.no}
              className={`exp-row grid grid-cols-1 items-center gap-y-6 pb-[clamp(2rem,4.5vw,4.5rem)] lg:grid-cols-[1fr_minmax(0,32%)_1fr] lg:gap-x-[clamp(2rem,5vw,6rem)] ${
  idx === 0 ? "pt-0" : "pt-[clamp(2rem,4.5vw,4.5rem)]"
} ${idx !== rows.length - 1 ? "border-b border-black/[0.07]" : ""}`}
            >
              {/* Left: number, title, text */}
              <div className="exp-left">
  <p className="text-sm text-[#555]">{r.no}</p>
  <h3 className="mt-4 text-[clamp(1.75rem,2.6vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.01em] text-[#1c3d7a]">
    {r.title}
  </h3>
  <p className="mt-4 max-w-[420px] text-[clamp(0.9rem,0.25vw+0.8rem,1.05rem)] leading-[1.6] text-[#444]">
    {r.text}
  </p>
</div>

              {/* Center: trapezoid image */}
              <div
                className="exp-img w-full lg:justify-self-center"
                style={{ filter: "drop-shadow(0 18px 28px rgba(28,61,122,0.18))" }}
              >
                <div
                  className="relative aspect-[520/312] w-full overflow-hidden bg-gradient-to-b from-[#dbe4f5] to-[#9db3dd]"
                  style={{
                    clipPath: "url(#expertise-shape)",
                    WebkitClipPath: "url(#expertise-shape)",
                  }}
                >
                  <div className="exp-photo absolute inset-0 will-change-transform">
                    <Image
                      src={r.img}
                      alt={r.title}
                      fill
                      sizes="(min-width: 1024px) 32vw, 100vw"
                      className="object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Right: list */}
              <ul className="flex flex-col gap-4 lg:gap-5 lg:pl-[clamp(1rem,4vw,5rem)]">
  {r.items.map((item) => (
    <li
      key={item}
      className="exp-item text-[clamp(0.9rem,0.25vw+0.8rem,1.05rem)] leading-snug text-[#1a1a1a]"
    >
      {item}
    </li>
  ))}
</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}