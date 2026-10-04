"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTA_DATA } from "@/config/images/cta";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sans = { fontFamily: "var(--font-poppins), system-ui, sans-serif" };
const serif = { fontFamily: "var(--font-playfair), Georgia, serif" };

// Room inside masked lines so italics and descenders are not clipped
const lineStyle = {
  paddingLeft: "0.1em",
  marginLeft: "-0.1em",
  paddingRight: "0.1em",
  paddingBottom: "0.14em",
} as const;

export default function CtaBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const cta = CTA_DATA[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Frame opens from narrow to full width while it enters the screen
      gsap.fromTo(
  ".cta-arrow path",
  { strokeDashoffset: 1 },
  {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".cta-text",
      start: "top 90%",
      end: "top 40%",
      scrub: 1, // takes ~1s to catch up, so it fills gradually
    },
  }
);

      // Photo parallax inside the frame
      gsap.fromTo(
        ".cta-photo",
        { yPercent: -8, scale: 1.18 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".cta-frame",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Arrow draws itself
      gsap.fromTo(
        ".cta-arrow path",
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".cta-text",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Headline lines slide up
      gsap.from(".cta-line", {
        yPercent: 115,
        duration: 1,
        ease: "power4.out",
        stagger: 0.14,
        scrollTrigger: {
          trigger: ".cta-text",
          start: "top 78%",
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
      ref={sectionRef}
      id="cta"
      className="relative z-10 bg-white pb-[120px] pt-[clamp(2rem,4vw,4rem)]"
    >
      <div
        className="cta-frame relative h-[clamp(480px,48vw,900px)] w-full overflow-hidden bg-gradient-to-br from-[#1c3d7a] to-[#0b1b3a]"
        style={{ borderRadius: 28 }}
      >
        {/* Photo (put your own at /public/cta/banner.webp, about 2400x1200) */}
        <div className="cta-photo absolute inset-0 will-change-transform">
          <Image
                    src={cta.image}
            alt="Students at a robotics exhibition"
            fill
            sizes="100vw"
            className="object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Dark overlay: stronger at the bottom for text contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(14,24,60,0.78) 0%, rgba(14,24,60,0.55) 45%, rgba(14,24,60,0.4) 100%)",
          }}
        />

        {/* Text block, aligned with the site's left edge */}
        <div className="site-container relative flex h-full items-end pb-[clamp(2.5rem,6vw,7rem)]">
          <div className="cta-text w-full">
            {/* Outlined arrow icon */}
            <svg
              viewBox="0 0 130 130"
              className="cta-arrow mb-[clamp(1.5rem,3vw,3.5rem)] h-auto w-[clamp(52px,6.5vw,110px)] text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinejoin="miter"
              aria-hidden="true"
            >
              <path
                d="M40 2 H128 V90 M2 42 L42 2 M2 42 L42 82 L2 122 Z M42 82 L82 122 L42 122"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <h2
              className="text-[clamp(1.7rem,3.7vw,4.2rem)] leading-[1.12] tracking-[-0.01em] text-white"
              style={sans}
            >
              <span className="block overflow-hidden" style={lineStyle}>
                <span className="cta-line inline-block font-semibold">
                  Coding for beginners,
                </span>
              </span>

              <span className="block overflow-hidden" style={lineStyle}>
                <span
                  className="cta-line inline-block font-normal italic"
                  style={{
                    ...serif,
                    color: "rgba(255,255,255,0.92)",
                    WebkitTextStroke: "1px #1c3d7a",
                    paintOrder: "stroke fill",
                  }}
                >
                  Robotics for schools and colleges
                </span>
              </span>

              <span className="block overflow-hidden" style={lineStyle}>
                <span className="cta-line inline-block font-semibold">
                  or Python &amp; IT training
                </span>
              </span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}