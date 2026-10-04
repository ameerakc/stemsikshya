"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GalleryMotion({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Title slides up
      gsap.from(".g-title", { yPercent: 115, duration: 0.9, ease: "power4.out", delay: 0.1 });

      // Each post rises in with a blur as it enters the screen
      gsap.utils.toArray<HTMLElement>(".g-post").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 50,
          filter: "blur(10px)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
        });
      });

      // Sidebar cards, one after another
      gsap.from(".g-card", {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".g-side", start: "top 90%", toggleActions: "play none none reverse" },
      });
    }, ref);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}