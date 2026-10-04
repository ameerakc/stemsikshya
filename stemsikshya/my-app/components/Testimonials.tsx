"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AVATAR_TESTIMONIALS, PARTNERS_DATA } from "@/config/images";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sans = { fontFamily: "var(--font-poppins), system-ui, sans-serif" };

// Testimonials using centralized image configuration
const testimonials = AVATAR_TESTIMONIALS;

// Partners using centralized image configuration
const partners = PARTNERS_DATA.map(partner => ({
  name: partner.name,
  logo: partner.image,
}));

const initials = (s: string) =>
  s
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [tick, setTick] = useState(0); // resets the auto-advance timer on click

  // Scroll + ring animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Rotating ring text
      gsap.to(".badge-ring", {
        rotation: 360,
        duration: 26,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      // Card rises in
      gsap.from(".t-card", {
        y: 70,
        autoAlpha: 0,
        scale: 0.97,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".t-card",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      // Logo tiles: blur -> sharp, one after another
      gsap.from(".p-tile", {
        autoAlpha: 0,
        y: 50,
        filter: "blur(10px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: { each: 0.06, from: "start" },
        scrollTrigger: {
          trigger: ".p-grid",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const id = window.setInterval(
      () => setIdx((i) => (i + 1) % testimonials.length),
      7000
    );
    return () => window.clearInterval(id);
  }, [tick]);

  // Swap animation when the testimonial changes
  useEffect(() => {
    if (!slideRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(
      slideRef.current,
      { autoAlpha: 0, y: 24, filter: "blur(8px)" },
      { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" }
    );
    return () => {
      tween.kill();
    };
  }, [idx]);

  const t = testimonials[idx];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative z-10 bg-white pb-[140px] pt-[clamp(3rem,6vw,6rem)]"
      style={sans}
    >
      <div className="site-container">
        <div className="t-card mx-auto max-w-[1300px] rounded-[32px] bg-[#ececec] px-6 py-10 sm:px-10 sm:py-14 lg:px-[72px] lg:py-[72px]">
          {/* TOP: badge + quote */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Rotating ring + quote mark */}
            <div className="relative mx-auto h-[190px] w-[190px] lg:mx-0 lg:h-[230px] lg:w-[230px]">
              <svg
                viewBox="0 0 240 240"
                className="badge-ring absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="ring-path"
                    d="M120,120 m-100,0 a100,100 0 1,1 200,0 a100,100 0 1,1 -200,0"
                  />
                </defs>
                <text
                  fill="#111"
                  fontSize="15"
                  letterSpacing="4.2"
                  style={sans}
                >
                  <textPath href="#ring-path" startOffset="0">
                    TRUSTED BY CLIENTS , TESTIMONIAL ,
                  </textPath>
                </text>
              </svg>

              {/* Blue quote mark (stays still) */}
              <svg
                viewBox="0 0 70 46"
                className="absolute left-1/2 top-1/2 h-auto w-[34%] -translate-x-1/2 -translate-y-1/2 text-[#0a4bff]"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5 0 0 6 0 13c0 7 5 12 11 12-2 8-6 13-11 16l2 4c12-4 22-15 22-31C24 6 19 0 12 0Z" />
                <path
                  transform="translate(38 0)"
                  d="M12 0C5 0 0 6 0 13c0 7 5 12 11 12-2 8-6 13-11 16l2 4c12-4 22-15 22-31C24 6 19 0 12 0Z"
                />
              </svg>
            </div>

            {/* Quote + author */}
            <div>
              <div ref={slideRef} className="min-h-[250px] sm:min-h-[230px]">
                <p className="text-[clamp(1.05rem,1.45vw,1.6rem)] font-normal leading-[1.4] text-[#0a0a0a]">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="mt-8 border-t border-black/10 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#d6dcea] text-sm font-medium text-[#1c3d7a]">
                      {initials(t.name)}
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-[#111]">{t.name}</p>
                      <p className="text-[13px] text-[#444]">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pagination dots */}
              <div className="mt-6 flex justify-end">
                <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/50 px-3 py-2.5">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Show testimonial ${i + 1}`}
                      aria-current={i === idx}
                      onClick={() => {
                        setIdx(i);
                        setTick((n) => n + 1);
                      }}
                      className={`h-[7px] rounded-full transition-all duration-300 ${
                        i === idx ? "w-[7px] bg-[#0a4bff]" : "w-[7px] bg-black/15 hover:bg-black/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PARTNERS */}
          <p className="mt-6 text-[12px] font-medium uppercase tracking-wide text-[#111] lg:mt-0">
            Partner with +15 Schools and Colleges
          </p>

          <div className="p-grid mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-12 lg:grid-cols-5 lg:gap-x-[10px] lg:gap-y-[2px]">
            {partners.map((p, i) => (
              <div
                key={`${p.name}-${i}`}
                className="p-tile relative aspect-square w-full overflow-hidden rounded-[2.5rem] border border-black/10 sm:rounded-[3.5rem]"
              >
                {/* Initials show if the logo file is missing */}
                <span className="absolute inset-0 flex items-center justify-center text-2xl font-semibold text-black/20">
                  {initials(p.name)}
                </span>
                <div className="absolute inset-[22%]">
                  <Image
                    src={p.logo}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 12vw, 30vw"
                    className="object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}