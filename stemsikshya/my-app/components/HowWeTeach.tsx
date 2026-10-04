"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sans = { fontFamily: "var(--font-poppins), system-ui, sans-serif" };
const serif = { fontFamily: "var(--font-playfair), Georgia, serif" };

type Word = { w: string; accent?: boolean };

const headingWords: Word[] = [
  { w: "We" }, { w: "provide" }, { w: "a" }, { w: "brilliant" },
  { w: "STEAM", accent: true }, { w: "curriculum", accent: true },
  { w: "to" }, { w: "grow" }, { w: "young" }, { w: "minds" },
  { w: "from" }, { w: "grade" }, { w: "1" }, { w: "to" },
  { w: "class" }, { w: "12," }, { w: "with" }, { w: "your" },
  { w: "child's" }, { w: "future" }, { w: "in" }, { w: "focus." },
];

const stats = [
  { to: 10, suffix: "+", label: "Projects Completed" },
  { to: 100, suffix: "%", label: "Successful Rating" },
  { to: 1000, suffix: "+", label: "Students Trained" },
];

export default function HowWeTeach() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      // Heading: words slide up one by one
      gsap.from(".hw-word", {
        yPercent: 115,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.035,
        scrollTrigger: {
          trigger: ".hw-heading",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Label + button fade in
      gsap.from([".hw-label", ".hw-btn"], {
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".hw-heading",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Count-up numbers
      gsap.utils.toArray<HTMLElement>(".hw-count").forEach((el) => {
        const end = Number(el.dataset.to);
        const state = { v: 0 };
        el.textContent = "0";
        gsap.to(state, {
          v: end,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(state.v).toString();
          },
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reset",
          },
        });
      });

      // Vertical divider grows down (scrubbed)
      gsap.fromTo(
        ".hw-divider",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".hw-big",
            start: "top 85%",
            end: "bottom 55%",
            scrub: true,
          },
        }
      );

      // Big stat caption + paragraph blur -> sharp
      gsap.from([".hw-caption", ".hw-para"], {
        autoAlpha: 0,
        y: 30,
        filter: "blur(10px)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".hw-big",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Outline arrow draws itself (scrubbed)
      gsap.fromTo(
        ".hw-arrow path",
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".hw-arrow",
            start: "top 92%",
            end: "top 55%",
            scrub: 1,
          },
        }
      );

      // Bottom stats: blur -> sharp, one after another
      gsap.from(".hw-stat", {
        autoAlpha: 0,
        y: 40,
        filter: "blur(12px)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.18,
        scrollTrigger: {
          trigger: ".hw-stats",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 bg-white pb-[140px] pt-[clamp(3rem,6vw,6rem)]"
      style={sans}
    >
      <div className="site-container">
        {/* ROW 1: label + heading + button */}
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-[26%_1fr]">
          <p className="hw-label text-[13px] font-normal uppercase tracking-wide text-[#111]">
            How we teach?
          </p>

          <div>
            <h2 className="hw-heading text-[clamp(1.8rem,3.2vw,3.6rem)] font-normal leading-[1.18] tracking-[-0.01em] text-[#0a0a0a]">
              {headingWords.map((h, i) => (
                <span key={i}>
                  <span className="inline-block overflow-hidden pb-[0.14em] pr-[0.04em] align-bottom">
                    <span
                      className={`hw-word inline-block ${
                        h.accent ? "italic text-[#1c3d7a]" : ""
                      }`}
                      style={h.accent ? serif : undefined}
                    >
                      {h.w}
                    </span>
                  </span>{" "}
                </span>
              ))}
            </h2>

            <Link
              href="/about"
              className="hw-btn group mt-8 inline-flex h-11 items-center gap-6 rounded-full border border-black/70 pl-5 pr-1.5 text-sm text-[#111] transition-colors duration-300 hover:bg-[#111] hover:text-white"
            >
              Learn More About Us
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9edf5] text-[#1c3d7a] transition-all duration-300 group-hover:bg-white">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* ROW 2: big 11K+ | divider | paragraph + arrow */}
        <div className="mt-[clamp(3rem,6vw,6rem)] grid grid-cols-1 gap-y-12 lg:grid-cols-[26%_1fr]">
          <div className="hidden lg:block" />

          <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-[1fr_1px_1fr]">
            {/* Big number */}
            <div className="hw-big pr-6">
              <div className="flex items-start leading-none text-[#1c3d7a]">
                <span className="text-[clamp(6rem,12vw,13rem)] font-semibold leading-[0.8] tracking-[-0.04em]">
                  <span className="hw-count" data-to="11">
                    11
                  </span>
                </span>
                <span className="ml-1 mt-[0.4em] text-[clamp(1.1rem,1.8vw,2rem)] font-medium">
                  K+
                </span>
              </div>
              <p className="hw-caption mt-8 max-w-[360px] text-[clamp(0.9rem,0.4vw+0.8rem,1.1rem)] leading-[1.35] text-[#1c3d7a]">
                We helped 1,000+ students build real coding, robotics &amp; AI skills
              </p>
            </div>

            {/* Divider */}
            <div className="hw-divider hidden w-px bg-black/15 lg:block" />

            {/* Paragraph + outline arrow */}
            <div className="flex flex-col justify-between gap-10 lg:pl-[clamp(1.5rem,5vw,6rem)]">
              <p className="hw-para max-w-[460px] text-[clamp(0.9rem,0.4vw+0.8rem,1.1rem)] leading-[1.55] text-[#444]">
                Students today rely heavily on digital skills to shape their
                careers. We build a strong foundation in coding, robotics, and
                AI while engaging with real projects meanwhile, 51% of our
                students
              </p>

              <svg
                viewBox="-2 -2 104 104"
                className="hw-arrow h-auto w-[clamp(64px,6vw,100px)] text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinejoin="miter"
                aria-hidden="true"
              >
                <path
                  d="M20 2 H98 V80 H82 V30 L12 100 L0 88 L70 18 H20 Z"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ROW 3: three stats */}
        <div className="hw-stats mt-[clamp(4rem,8vw,8rem)] grid grid-cols-1 gap-y-12 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="hw-stat">
              <p className="flex items-baseline text-[clamp(3rem,6vw,6.5rem)] font-medium leading-none tracking-[-0.03em] text-[#1c3d7a]">
                <span className="hw-count" data-to={s.to}>
                  {s.to}
                </span>
                <span>{s.suffix}</span>
              </p>
              <p className="mt-4 text-[clamp(0.9rem,0.4vw+0.8rem,1.1rem)] text-[#9a9a9a]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}