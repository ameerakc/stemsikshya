"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TEAM_DATA } from "@/config/images/team";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sans = { fontFamily: "var(--font-poppins), system-ui, sans-serif" };

// Team data using centralized image configuration
const team = TEAM_DATA.map(member => ({
  src: member.image,
  alt: member.name,
  name: member.name,
  role: member.role,
}));

// Share of each covered photo that stays visible when squeezed (≈ 42% like your screenshot)
const STRIP = 0.42;

export default function TeamScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ---------- DESKTOP: pinned, scroll-scrubbed squeeze ----------
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".tm-card");
      if (!cards.length) return;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=130%", // how much scrolling the animation takes
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true, // recalculates on resize
        },
      });

      // Photo i slides left by i * (cardWidth - visibleStrip), so they overlap like a deck.
      // Later photos sit on top (z-index), the last one stays fully visible.
      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            x: () => -i * cards[0].offsetWidth * (1 - STRIP),
            ease: "power2.inOut",
            duration: 1,
          },
          0
        );
      });

      // "OUR TEAM" appears on the right while the photos squeeze
      tl.fromTo(
        ".tm-title-line",
        { autoAlpha: 0, x: 90, filter: "blur(14px)" },
        { autoAlpha: 1, x: 0, filter: "blur(0px)", ease: "power2.out", duration: 0.6, stagger: 0.15 },
        0.45
      );
    });

    // ---------- MOBILE / TABLET: simple reveal ----------
    mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.from(".tm-m", {
        autoAlpha: 0,
        y: 40,
        filter: "blur(10px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".tm-m-grid", start: "top 85%", toggleActions: "play none none reverse" },
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  const Photo = ({ src, alt }: { src: string; alt: string }) => (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 25vw, 50vw"
      className="object-cover"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
  );

  return (
    <section ref={sectionRef} id="team" className="relative z-10 bg-white" style={sans}>
      {/* DESKTOP (pinned) */}
      <div
        ref={pinRef}
        className="relative hidden h-screen min-h-[560px] items-center overflow-hidden lg:flex"
      >
        <div className="tm-row flex w-max pl-[clamp(1rem,1.6vw,2rem)]">
          {team.map((m, i) => (
            <div
              key={m.src}
              className="tm-card relative aspect-[472/500] w-[25vw] shrink-0 overflow-hidden bg-gradient-to-b from-[#dbe4f5] to-[#9db3dd] first:rounded-l-2xl last:rounded-r-2xl will-change-transform"
              style={{ zIndex: i + 1 }}
            >
              <Photo src={m.src} alt={m.alt} />
            </div>
          ))}
        </div>

        {/* Title on the right */}
        <div className="pointer-events-none absolute inset-y-0 right-[clamp(1.5rem,5vw,7rem)] flex flex-col justify-center">
          {["OUR", "TEAM"].map((line) => (
            <span
              key={line}
              className="tm-title-line block text-[clamp(4rem,10vw,12rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-[#353535]"
            >
              {line}
            </span>
          ))}
        </div>
      </div>

      {/* MOBILE / TABLET */}
      <div className="site-container py-20 lg:hidden">
        <h2 className="tm-m text-[clamp(3rem,14vw,6rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-[#353535]">
          OUR TEAM
        </h2>
        <div className="tm-m-grid mt-8 grid grid-cols-2 gap-3">
          {team.map((m) => (
            <div
              key={m.src}
              className="tm-m relative aspect-[472/500] overflow-hidden rounded-2xl bg-gradient-to-b from-[#dbe4f5] to-[#9db3dd]"
            >
              <Photo src={m.src} alt={m.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}