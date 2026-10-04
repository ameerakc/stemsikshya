"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sans = { fontFamily: "var(--font-poppins), system-ui, sans-serif" };

const socials = [
  {
    href: "https://www.facebook.com/profile.php?id=61587347109625",
    label: "Facebook",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/stemsikshya/",
    label: "Instagram",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth="2" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" strokeWidth="2" />
      </svg>
    ),
  },
  {
    href: "https://np.linkedin.com/company/stem-sikshya",
    label: "LinkedIn",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </svg>
    ),
  },
  {
    href: "https://share.google/eamDRJ7gUBCfEqXTl",
    label: "Location",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.7 2.3a1 1 0 0 0-1-.2L3 9.1a1 1 0 0 0 .1 1.9l7.4 2.5 2.5 7.4a1 1 0 0 0 1.9.1l7-17.7a1 1 0 0 0-.2-1Z" />
      </svg>
    ),
  },
];

export default function SiteFooter() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".ft-item", {
        autoAlpha: 0,
        y: 30,
        filter: "blur(8px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".ft-grid",
          start: "top 92%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="relative z-10 bg-white pb-[130px] pt-[clamp(1rem,3vw,3rem)]"
      style={sans}
    >
      <div className="site-container">
        <div className="ft-grid grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          {/* Socials */}
          <div className="ft-item flex items-start gap-1.5 lg:col-span-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#1c3d7a] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#0a4bff]"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Address + contact */}
          <div className="ft-item lg:col-span-5">
            <h3 className="text-[clamp(1.2rem,1.7vw,1.75rem)] font-medium leading-snug text-[#1c3d7a]">
              Naikap, Kathmandu, Nepal
            </h3>
            <div className="mt-8 space-y-1 text-[clamp(0.9rem,0.3vw+0.8rem,1.05rem)] leading-[1.6] text-[#1c3d7a]">
              <p>
                <a href="mailto:info@stemsikshya.com" className="hover:underline">
                  info@stemsikshya.com
                </a>{" "}
                |{" "}
                <a href="mailto:admin@stemsikshya.com" className="hover:underline">
                  admin@stemsikshya.com
                </a>
              </p>
              <p>
                <a href="tel:+9779802316819" className="hover:underline">+977-9802316819</a>{" "}
                |{" "}
                <a href="tel:+9779840344987" className="hover:underline">+977-9840344987</a>
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="ft-item text-[clamp(0.9rem,0.3vw+0.8rem,1.05rem)] leading-[1.9] text-[#1c3d7a] lg:col-span-3 lg:mt-[4.5rem] lg:text-right">
            <p>© 2026 STEM Sikshya PVT. LTD.</p>
            <p>All Right Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}