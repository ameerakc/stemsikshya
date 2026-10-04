"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sans = { fontFamily: "var(--font-poppins), system-ui, sans-serif" };
const serif = { fontFamily: "var(--font-playfair), Georgia, serif" };

// Extra room inside each masked line so italic letters and descenders are not clipped
const lineStyle = {
  paddingLeft: "0.1em",
  marginLeft: "-0.1em",
  paddingRight: "0.1em",
  paddingBottom: "0.12em",
} as const;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(bigTextRef.current, { filter: "blur(0px)", opacity: 1 });
        return;
      }

      // 1. Headline mask-reveal
      gsap.set(".line-inner", { yPercent: 110 });
      gsap.to(".line-inner", {
        yPercent: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.15,
      });

      // 2. Paragraph fade up
      gsap.fromTo(
        ".hero-right",
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, delay: 0.5, ease: "power3.out" }
      );

      // 3. STEM SIKSHYA: blur clears + lines slide in while scrolling
      const bigTrigger = {
        trigger: bigTextRef.current,
        start: "top 95%",
        end: "top 45%",
        scrub: true,
      };
      gsap.fromTo(
        bigTextRef.current,
        { filter: "blur(14px)", opacity: 0.6 },
        { filter: "blur(0px)", opacity: 1, ease: "none", scrollTrigger: bigTrigger }
      );
      gsap.fromTo(".big-line-1", { x: -60 }, { x: 0, ease: "none", scrollTrigger: bigTrigger });
      gsap.fromTo(".big-line-2", { x: 60 }, { x: 0, ease: "none", scrollTrigger: bigTrigger });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
  id="home"
  ref={heroRef}
  className="relative min-h-[100svh] pt-[100px] sm:pt-[120px] lg:pt-[130px]"
>
      <div className="site-container">
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
          {/* ROW 1 LEFT: headline - full width on mobile, 7 cols on desktop */}
          <h1
            className="text-[clamp(2rem,4.4vw,4.5rem)] leading-[1.15] tracking-[-0.02em] lg:col-span-7 lg:row-start-1"
            style={sans}
          >
            <span className="block overflow-hidden" style={lineStyle}>
              <span className="line-inner inline-block font-semibold text-[#0a0a0a]">We are</span>
            </span>
            <span className="block overflow-hidden" style={lineStyle}>
              <span className="line-inner inline-block font-semibold text-[#0a0a0a]">building</span>
            </span>
            <span className="block overflow-hidden" style={lineStyle}>
              <span className="line-inner inline-block font-normal italic text-[#1c3d7a]" style={serif}>
                Coders,
              </span>
            </span>
            <span className="block overflow-hidden" style={lineStyle}>
              <span className="line-inner inline-block font-normal italic text-[#1c3d7a]" style={serif}>
                Roboticists, and
              </span>
            </span>
            <span className="block overflow-hidden" style={lineStyle}>
              <span className="line-inner inline-block">
                <span className="font-normal italic text-[#1c3d7a]" style={serif}>AI</span>{" "}
                <span className="font-semibold text-[#0a0a0a]" style={sans}>Engineers</span>
              </span>
            </span>
          </h1>

          {/* ROW 1 RIGHT: paragraph - full width on mobile, 5 cols on desktop, positioned below headline on mobile */}
          <div className="hero-right lg:col-span-5 lg:row-start-1 lg:pt-44 lg:col-start-8">
            <div className="flex items-center gap-4 xl:gap-6">
              <svg
                viewBox="0 0 70 122"
                className="hidden h-auto w-8 shrink-0 text-black sm:block sm:w-10 xl:w-[52px]"
                fill="none"
                stroke="currentColor"
                strokeWidth={14}
                aria-hidden="true"
              >
                <path d="M7 0 C10 30 30 50 63 61 C30 72 10 92 7 122" />
              </svg>
              <p
                className="w-full max-w-none text-[clamp(0.8rem,0.4vw+0.6rem,1rem)] leading-[1.5] font-semibold text-[#1e4998]"
                style={sans}
              >
                We&apos;re a leading STEAM education institute focused on
                Coding, Robotics, AI, and IT Training for grade 1 to class 12
                students and IT Bachelor&apos;s students.
              </p>
            </div>
          </div>

          {/* ROW 2 LEFT: STEM / SIKSHYA - Full width centered to align with container edges */}
          <div
  ref={bigTextRef}
  aria-label="STEM Sikshya"
  className="relative z-20 select-none text-[clamp(3.2rem,9.2vw,10rem)] font-bold leading-[0.88] tracking-tight text-[#1c3d7a] lg:col-span-7 lg:row-start-2 lg:mt-16"
  style={{ ...sans, filter: "blur(14px)", opacity: 0.6 }}
>
  <div className="big-line-1">STEM</div>
  <div className="big-line-2">SIKSHYA</div>
</div>
{/* Capsule start slots (invisible): same row as STEM SIKSHYA, right side */}

        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[calc(var(--gutter)+5vw)] top-[62svh] hidden w-[clamp(300px,31vw,452px)] gap-3 lg:flex"
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="pill-slot invisible aspect-[100/436] flex-1"
          />
        ))}
      </div>
    </section>
  );
}