"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sans = { fontFamily: "var(--font-poppins), system-ui, sans-serif" };
const serif = { fontFamily: "var(--font-playfair), Georgia, serif" };

// The orange in your screenshot. Change it to your brand color, e.g. "#1c3d7a"
const ACCENT = "#ff6a3d";

// Put portraits in /public/testimonials/ (square or 4:5, about 800x840, WebP)
const testimonials = [
  {
    quote:
      "STEM Sikshya's ability to make coding, robotics, and AI simple and exciting for my child stands out. It's something we placed a premium on. An institute with passionate, professional, and genuinely caring instructors. Recommend!",
    name: "Anita Sharma",
    role: "Parent, Grade 5 Student",
    photo: "/testimonials/anita.webp",
  },
  {
    quote:
      "STEM Sikshya's ability to make coding, robotics, and AI simple and exciting for my child stands out. It's something we placed a premium on. An institute with passionate, professional, and genuinely caring instructors. Recommend!",
    name: "Bradley Gordon",
    role: "Founder of Archin Studio",
    photo: "/testimonials/bradley.webp",
  },
];

const initials = (s: string) =>
  s.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

function Portrait({ src, name, className = "" }: { src: string; name: string; className?: string }) {
  return (
    <div className={`relative h-full w-full bg-gradient-to-b from-[#dbe4f5] to-[#9db3dd] ${className}`}>
      <span className="absolute inset-0 flex items-center justify-center text-5xl font-semibold text-[#1c3d7a]/30">
        {initials(name)}
      </span>
      <Image
        key={src}
        src={src}
        alt={name}
        fill
        sizes="(min-width: 1024px) 30vw, 100vw"
        className="tt-photo-img object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}

export default function AboutTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const dir = useRef(1);
  const first = useRef(true);

  const go = (step: 1 | -1) => {
    dir.current = step;
    setIdx((i) => (i + step + testimonials.length) % testimonials.length);
  };

  // Scroll-in animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".tt-eyebrow", {
        autoAlpha: 0,
        y: 16,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".tt-eyebrow", start: "top 90%", toggleActions: "play none none reverse" },
      });

      gsap.from(".tt-word", {
        yPercent: 115,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".tt-heading", start: "top 88%", toggleActions: "play none none reverse" },
      });

      gsap.from(".tt-block > *", {
        autoAlpha: 0,
        y: 60,
        filter: "blur(10px)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ".tt-block", start: "top 85%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    return () => ctx.revert();
  }, []);

  // Slide-change animation (skips the very first render)
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const d = dir.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tt-photo-clip",
        { clipPath: d > 0 ? "inset(0% 0% 0% 100% round 16px)" : "inset(0% 100% 0% 0% round 16px)" },
        { clipPath: "inset(0% 0% 0% 0% round 16px)", duration: 0.9, ease: "power3.inOut" }
      );
      gsap.fromTo(".tt-photo-img", { scale: 1.2 }, { scale: 1, duration: 1.2, ease: "power3.out" });
      gsap.fromTo(
        ".tt-text > *",
        { autoAlpha: 0, x: 40 * d, filter: "blur(8px)" },
        { autoAlpha: 1, x: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out", stagger: 0.08 }
      );
      gsap.fromTo(
        ".tt-preview-inner",
        { autoAlpha: 0, scale: 0.88, y: 24 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.15 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [idx]);

  const t = testimonials[idx];
  const next = testimonials[(idx + 1) % testimonials.length];

  const arrowBtn =
    "flex h-[50px] w-[50px] items-center justify-center rounded-full border border-black/40 text-[#111] transition-all duration-300 hover:border-[#111] hover:bg-[#111] hover:text-white active:scale-95";

  return (
    <section
      ref={sectionRef}
      id="about-testimonials"
      className="relative z-10 bg-white py-[clamp(4rem,8vw,9rem)]"
      style={sans}
    >
      <div className="site-container">
        {/* Eyebrow */}
        <p className="tt-eyebrow flex items-center justify-center gap-4 text-[15px] text-[#8a8a8a]">
          <span>04</span>
          <span className="h-px w-8 bg-[#8a8a8a]/50" />
          <span>Testimonials</span>
        </p>

        {/* Heading */}
        <h2 className="tt-heading mt-4 text-center text-[clamp(2rem,4.4vw,4.5rem)] font-normal leading-[1.15] tracking-[-0.01em] text-[#1c3d7a]">
          {[
            { w: "What" }, { w: "our" }, { w: "clients", accent: true }, { w: "say?" },
          ].map((h) => (
            <span key={h.w}>
              <span className="inline-block overflow-hidden pb-[0.16em] pr-[0.06em] align-bottom">
                <span
                  className="tt-word inline-block"
                  style={h.accent ? { ...serif, fontStyle: "italic", color: ACCENT } : undefined}
                >
                  {h.w}
                </span>
              </span>{" "}
            </span>
          ))}
        </h2>

        {/* Slider block */}
        <div className="tt-block mt-[clamp(3rem,5vw,5.5rem)] grid grid-cols-1 items-stretch gap-y-10 lg:grid-cols-[minmax(0,27%)_1fr_clamp(150px,13.5vw,200px)] lg:gap-x-[clamp(2rem,4vw,5rem)]">
          {/* Big photo (shadow on wrapper, clip on inner so the shadow isn't cut) */}
          <div
            className="aspect-[382/400] w-full rounded-2xl"
            style={{ boxShadow: "0 22px 40px -14px rgba(0,0,0,0.35)" }}
          >
            <div className="tt-photo-clip h-full w-full overflow-hidden rounded-2xl">
              <Portrait src={t.photo} name={t.name} />
            </div>
          </div>

          {/* Quote */}
          <div className="relative flex flex-col justify-center lg:pl-[clamp(0rem,1vw,1rem)]">
            <div className="tt-text">
              <span
                aria-hidden="true"
                className="block h-[0.55em] text-[clamp(5rem,7vw,8rem)] italic leading-none text-[#2b2b2b]"
                style={serif}
              >
                &ldquo;
              </span>
              <p className="mt-[clamp(1rem,2vw,2rem)] max-w-[560px] text-[clamp(1.1rem,1.7vw,1.85rem)] leading-[1.5] text-[#444]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-[17px] font-medium text-[#111]">{t.name}</span>
                <span className="text-[15px] text-[#222]">{t.role}</span>
              </p>
            </div>

            {/* Counter */}
            <p className="mt-8 text-sm tabular-nums text-[#8a8a8a] lg:absolute lg:bottom-0 lg:right-0 lg:mt-0">
              {idx + 1} &nbsp;/&nbsp; {testimonials.length}
            </p>
          </div>

          {/* Controls + preview of the next person */}
          <div className="flex flex-row items-end justify-between gap-6 lg:flex-col lg:items-end lg:justify-between">
            <div className="flex gap-3 lg:mr-[clamp(0rem,1.5vw,2rem)]">
              <button type="button" aria-label="Previous testimonial" onClick={() => go(-1)} className={arrowBtn}>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              <button type="button" aria-label="Next testimonial" onClick={() => go(1)} className={arrowBtn}>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label={`Show ${next.name}`}
              className="tt-preview w-[clamp(120px,13.5vw,200px)] shrink-0 rounded-2xl"
              style={{ boxShadow: "0 18px 32px -12px rgba(0,0,0,0.35)" }}
            >
              <div className="tt-preview-inner aspect-[196/250] w-full overflow-hidden rounded-2xl">
                <Portrait src={next.photo} name={next.name} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}