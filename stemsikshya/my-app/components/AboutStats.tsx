"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sans = { fontFamily: "var(--font-poppins), system-ui, sans-serif" };

const BIG_TEXT =
  "STEM Sikshya teaches the STEAM concept through coding, robotics, AI and drone training for Grade 1 to 12, along with job-ready IT courses for Bachelor's IT students.";
const bigWords = BIG_TEXT.split(" ");

/* ---------- Gradient icons (simple SVG shapes) ---------- */
function LayersIcon() {
  return (
    <svg viewBox="0 0 64 60" className="h-12 w-auto sm:h-[60px]" aria-hidden="true">
      <defs>
        <linearGradient id="ab-g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#111" />
          <stop offset="1" stopColor="#c9c9c9" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3, 4].map((i) => (
        <polygon
          key={i}
          points="32,2 62,16 32,30 2,16"
          transform={`translate(0 ${i * 7})`}
          fill="url(#ab-g1)"
          opacity={1 - i * 0.12}
          stroke="#fff"
          strokeWidth="0.8"
        />
      ))}
    </svg>
  );
}

function RingIcon() {
  return (
    <svg viewBox="0 0 60 60" className="h-12 w-auto sm:h-[60px]" aria-hidden="true">
      <defs>
        <linearGradient id="ab-g2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#444" />
          <stop offset="1" stopColor="#d4d4d4" />
        </linearGradient>
      </defs>
      <rect
        x="14"
        y="4"
        width="32"
        height="40"
        rx="15"
        fill="none"
        stroke="url(#ab-g2)"
        strokeWidth="7"
      />
      <ellipse
        cx="30"
        cy="36"
        rx="26"
        ry="14"
        fill="none"
        stroke="url(#ab-g2)"
        strokeWidth="6"
        opacity="0.85"
      />
    </svg>
  );
}

function DiscsIcon() {
  return (
    <svg viewBox="0 0 36 60" className="h-12 w-auto sm:h-[60px]" aria-hidden="true">
      <defs>
        <linearGradient id="ab-g3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bdbdbd" />
          <stop offset="0.5" stopColor="#444" />
          <stop offset="1" stopColor="#d8d8d8" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((i) => (
        <ellipse
          key={i}
          cx="18"
          cy={8 + i * 14}
          rx="17"
          ry="7"
          fill="url(#ab-g3)"
          stroke="#fff"
          strokeWidth="0.8"
        />
      ))}
    </svg>
  );
}

function ChevronsIcon() {
  return (
    <svg viewBox="0 0 72 60" className="h-12 w-auto sm:h-[60px]" aria-hidden="true">
      <defs>
        <linearGradient id="ab-g4" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#777" />
          <stop offset="1" stopColor="#dcdcdc" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((i) => (
        <polygon
          key={i}
          points="0,0 14,0 30,30 14,60 0,60 16,30"
          transform={`translate(${i * 17} 0)`}
          fill="url(#ab-g4)"
          opacity={1 - i * 0.18}
        />
      ))}
    </svg>
  );
}

const services = [
  { title: "Coding", icon: <LayersIcon /> },
  { title: "Robotics", icon: <RingIcon /> },
  { title: "Artificial Intelligence", icon: <DiscsIcon /> },
  { title: "Drone Training", icon: <ChevronsIcon /> },
];

export default function AboutStats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Respect reduced motion: leave everything in its final, visible state.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;

    const ctx = gsap.context(() => {
      // Count-up number
      const el = section.querySelector<HTMLElement>(".as-count");
      if (el) {
        const end = Number(el.dataset.to) || 0;
        const state = { v: 0 };
        el.textContent = "0";
        gsap.to(state, {
          v: end,
          duration: 2.2,
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
      }

      gsap.from(".as-caption", {
        autoAlpha: 0,
        y: 24,
        filter: "blur(8px)",
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".as-caption",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Big paragraph: words slide up
      gsap.from(".as-word", {
        yPercent: 115,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.03,
        scrollTrigger: {
          trigger: ".as-big",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Small paragraph
      gsap.from(".as-small", {
        autoAlpha: 0,
        y: 30,
        filter: "blur(8px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".as-small",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Horizontal line draws from the left
      gsap.fromTo(
        ".as-hline",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".as-hline",
            start: "top 95%",
            end: "top 65%",
            scrub: true,
          },
        },
      );

      // Service columns: blur -> sharp, one after another
      gsap.from(".as-col", {
        autoAlpha: 0,
        y: 40,
        filter: "blur(10px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: {
          trigger: ".as-cols",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };
    document.fonts?.ready.then(refresh);

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-stats"
      aria-labelledby="about-stats-heading"
      className="relative z-10 overflow-x-clip bg-white pt-[clamp(3rem,8vw,9rem)] [--as-gutter:var(--gutter,1.25rem)]"
      style={sans}
    >
      {/* TOP: number + big paragraph + small paragraph */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Number */}
        <div className="px-[var(--as-gutter)] lg:pl-[16vw] lg:pr-8">
          <p className="flex items-start text-[#0a0a0a]">
            <span
              className="as-count min-w-[4ch] text-[clamp(3.5rem,6.5vw,7rem)] font-normal leading-none tracking-[-0.02em] tabular-nums"
              data-to="1000"
            >
              1000
            </span>
            {/* "+" sized relative to the number so it stays top-aligned at every size */}
            <span
              aria-hidden="true"
              className="ml-2 text-[clamp(1.25rem,2.2vw,2.25rem)] font-medium leading-none"
            >
              +
            </span>
            <span className="sr-only">plus</span>
          </p>
          <p className="as-caption mt-5 max-w-[320px] text-[clamp(0.9rem,0.3vw+0.8rem,1.05rem)] leading-[1.6] text-[#444] lg:mt-6">
            Students trained in coding, robotics &amp; AI skills
          </p>
        </div>

        {/* Big paragraph (starts a little left of the divider, first line indented) */}
        <h2
          id="about-stats-heading"
          aria-label={BIG_TEXT}
          className="as-big mt-10 px-[var(--as-gutter)] text-[clamp(1.4rem,2.3vw,2.4rem)] font-medium leading-[1.2] tracking-[-0.01em] text-[#1c3d7a] lg:mt-0 lg:-ml-[5vw] lg:max-w-[46vw] lg:px-0 lg:indent-[6vw]"
        >
          {bigWords.map((w, i) => (
            <span key={i} aria-hidden="true">
              {/* indent-0: text-indent is inherited, so reset it on each inline-block word */}
              <span className="inline-block overflow-hidden pb-[0.14em] align-bottom indent-0">
                <span className="as-word inline-block">{w}</span>
              </span>{" "}
            </span>
          ))}
        </h2>

        {/* Small paragraph under the divider (empty left cell keeps the grid aligned) */}
        <div className="hidden lg:block" />
        <div className="mt-8 border-black/10 px-[var(--as-gutter)] pb-[clamp(2.5rem,6vw,6rem)] lg:mt-[clamp(2rem,3vw,3.5rem)] lg:border-l lg:pl-[clamp(1.5rem,3vw,3.5rem)] lg:pr-[10vw]">
          <p className="as-small max-w-[600px] text-[clamp(0.9rem,0.3vw+0.8rem,1.05rem)] leading-[1.6] text-[#1c3d7a]">
            STEM Sikshya teaches the STEAM concept through coding, robotics, AI
            and drone training for Grade 1 to 12, along with job-ready IT
            courses for Bachelor&apos;s IT students.
          </p>
        </div>
      </div>

      {/* Horizontal line */}
      <div className="as-hline h-px w-full bg-black/10" />

      {/* 4 service columns: 2x2 on mobile, 1x4 on desktop, with correct dividers */}
      <div className="as-cols grid grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <div
            key={s.title}
            className={[
              "as-col border-black/10 px-[clamp(1rem,2.1vw,2.5rem)] pb-[clamp(2.5rem,9vw,9rem)] pt-[clamp(2rem,3.5vw,4rem)]",
              // mobile (2 cols): vertical divider on right column, horizontal divider on second row
              i % 2 === 1 ? "border-l" : "",
              i >= 2 ? "border-t" : "",
              // desktop (4 cols): divider between every column, none between rows
              "lg:border-t-0",
              i > 0 ? "lg:border-l" : "lg:border-l-0",
            ].join(" ")}
          >
            <div className="transition-transform duration-500 motion-safe:hover:-translate-y-1">
              {s.icon}
            </div>
            <h3 className="mt-6 text-[clamp(1rem,1.3vw,1.4rem)] font-normal leading-snug text-[#0a0a0a] sm:mt-10">
              {s.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}