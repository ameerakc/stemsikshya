"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sans = { fontFamily: "var(--font-poppins), system-ui, sans-serif" };

const paragraph =
  "Empowering students from Grade 1 to 12 with coding, robotics, AI and drone training, and preparing IT students for real careers.".split(
    " "
  );

// One loop group: SOLID, outline, outline
const items = [
  { solid: true },
  { solid: false },
  { solid: false },
];

export default function AboutIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      // Label fades in
      gsap.from(".ai-label", {
        autoAlpha: 0,
        x: -20,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
      });

      // Paragraph words slide up one by one
      gsap.from(".ai-word", {
        yPercent: 115,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.04,
        delay: 0.2,
      });

      // Marquee: LEFT -> RIGHT, infinite, seamless.
      // The track holds two identical halves; sliding from -50% to 0%
      // moves everything right, then loops with no visible jump.
      const tween = gsap.fromTo(
        trackRef.current,
        { xPercent: -50 },
        { xPercent: 0, duration: 36, ease: "none", repeat: -1 }
      );

      // Slow down on hover
      const wrap = sectionRef.current?.querySelector<HTMLElement>(".ai-marquee");
      const slow = () => gsap.to(tween, { timeScale: 0.2, duration: 0.6 });
      const fast = () => gsap.to(tween, { timeScale: 1, duration: 0.6 });
      wrap?.addEventListener("mouseenter", slow);
      wrap?.addEventListener("mouseleave", fast);

      // Marquee speeds up a little while you scroll, then settles back
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 1200, 3);
          gsap.to(tween, { timeScale: boost, duration: 0.2, overwrite: true });
          gsap.to(tween, { timeScale: 1, duration: 1, delay: 0.2 });
        },
      });

      return () => {
        wrap?.removeEventListener("mouseenter", slow);
        wrap?.removeEventListener("mouseleave", fast);
      };
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);

    return () => ctx.revert();
  }, []);

  const Group = () => (
    <div className="flex shrink-0 items-center">
      {items.map((it, i) => (
        <span
          key={i}
          className="shrink-0 whitespace-nowrap px-[clamp(1.25rem,3.5vw,4.5rem)] text-[clamp(4.5rem,12vw,13rem)] font-semibold uppercase leading-[0.9] tracking-[-0.02em]"
          style={
            it.solid
              ? { ...sans, color: "#0a0a0a" }
              : {
                  ...sans,
                  fontWeight: 400,
                  color: "transparent",
                  WebkitTextStroke: "1.5px #b9b9b9",
                }
          }
        >
          About us
        </span>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="about-intro"
      className="relative z-10 overflow-hidden bg-white pb-[clamp(3rem,6vw,6rem)] pt-[clamp(7rem,12vw,12rem)]"
      style={sans}
    >
      <div className="site-container">
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-[26%_1fr]">
          {/* Label */}
          <div className="ai-label flex items-start gap-3 pt-[0.6rem]">
            <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#111]" />
            <p className="text-[13px] font-normal uppercase tracking-wide text-[#111]">
              Our Studio
            </p>
          </div>

          {/* Paragraph */}
          <h1 className="text-[clamp(1.7rem,3.6vw,3.9rem)] font-medium leading-[1.17] tracking-[-0.015em] text-[#1c3d7a]">
            {paragraph.map((w, i) => (
              <span key={i}>
                <span className="inline-block overflow-hidden pb-[0.16em] pr-[0.04em] align-bottom">
                  <span className="ai-word inline-block">{w}</span>
                </span>{" "}
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* Marquee: full width, fades out at the bottom edge */}
      <div
        className="ai-marquee mt-[clamp(3rem,7vw,7rem)] select-none overflow-hidden"
        aria-hidden="true"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, #000 45%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, #000 45%, transparent 100%)",
        }}
      >
        <div ref={trackRef} className="flex w-max will-change-transform">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0">
              <Group />
              <Group />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}