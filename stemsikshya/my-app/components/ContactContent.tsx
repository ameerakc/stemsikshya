"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sans = { fontFamily: "var(--font-poppins), system-ui, sans-serif" };

// The orange in your screenshot ("Contact Details"). Change to your brand color if you like.
const ACCENT = "#ff6a3d";

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  "STEM Sikshya, Naikap, Kathmandu, Nepal"
)}&z=16&output=embed`;

const socials = [
  {
    href: "https://www.facebook.com/profile.php?id=61587347109625",
    label: "Facebook",
    icon: (
      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/stemsikshya/",
    label: "Instagram",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth="2.4" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2.4" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" strokeWidth="2.4" />
      </svg>
    ),
  },
  {
    href: "https://np.linkedin.com/company/stem-sikshya",
    label: "LinkedIn",
    icon: (
      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </svg>
    ),
  },
];

// Marquee group: SOLID, outline, outline
const marqueeItems = [true, false, false];

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-md border border-black/[0.08] bg-white px-[clamp(1.25rem,1.9vw,1.75rem)] text-[clamp(0.9rem,0.2vw+0.85rem,1.05rem)] text-[#111] outline-none transition-all duration-300 placeholder:text-black/40 focus:border-[#1c3d7a] focus:shadow-[0_0_0_4px_rgba(28,61,122,0.08)]";

export default function ContactContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const [mapActive, setMapActive] = useState(false);
  const [hint, setHint] = useState(false);
  const hintTimer = useRef<number | null>(null);

  /* ------------------------- Animations ------------------------- */
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Hero label + headline lines
      gsap.from(".ct-label", { autoAlpha: 0, x: -20, duration: 0.8, ease: "power3.out", delay: 0.1 });
      gsap.from(".ct-line", {
        yPercent: 115,
        duration: 1,
        ease: "power4.out",
        stagger: 0.14,
        delay: 0.2,
      });

      // Marquee: LEFT -> RIGHT, infinite. Two identical halves, so there is no jump.
      const tween = gsap.fromTo(
        trackRef.current,
        { xPercent: -50 },
        { xPercent: 0, duration: 36, ease: "none", repeat: -1 }
      );
      const wrap = rootRef.current?.querySelector<HTMLElement>(".ct-marquee");
      const slow = () => gsap.to(tween, { timeScale: 0.2, duration: 0.6 });
      const fast = () => gsap.to(tween, { timeScale: 1, duration: 0.6 });
      wrap?.addEventListener("mouseenter", slow);
      wrap?.addEventListener("mouseleave", fast);
      cleanups.push(() => {
        wrap?.removeEventListener("mouseenter", slow);
        wrap?.removeEventListener("mouseleave", fast);
      });

      // Details card + its rows
      gsap.from(".ct-card", {
        autoAlpha: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ct-card", start: "top 88%", toggleActions: "play none none reverse" },
      });
      gsap.from(".ct-card-item", {
        autoAlpha: 0,
        y: 20,
        filter: "blur(8px)",
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".ct-card", start: "top 80%", toggleActions: "play none none reverse" },
      });

      // Form fields, one after another
      gsap.from(".ct-field", {
        autoAlpha: 0,
        y: 36,
        filter: "blur(8px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".ct-form", start: "top 85%", toggleActions: "play none none reverse" },
      });

      // Map frame opens as you scroll
      gsap.fromTo(
        ".ct-map",
        { clipPath: "inset(0% 10% 0% 10% round 36px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: ".ct-map", start: "top 95%", end: "top 35%", scrub: 1 },
        }
      );
    }, rootRef);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (hintTimer.current) window.clearTimeout(hintTimer.current);
    };
  }, []);

  /* --------------------------- Form submit --------------------------- */
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget; // keep a reference: currentTarget is cleared after await
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  /* ------------------------------ Map ------------------------------ */
  const onMapWheel = () => {
    if (mapActive) return;
    setHint(true);
    if (hintTimer.current) window.clearTimeout(hintTimer.current);
    hintTimer.current = window.setTimeout(() => setHint(false), 1400);
  };

  const Group = () => (
    <div className="flex shrink-0 items-center">
      {marqueeItems.map((solid, i) => (
        <span
          key={i}
          className="shrink-0 whitespace-nowrap px-[clamp(1.25rem,3.5vw,4.5rem)] text-[clamp(4.5rem,12vw,13rem)] uppercase leading-[0.9] tracking-[-0.02em]"
          style={
            solid
              ? { ...sans, fontWeight: 500, color: "#0a0a0a" }
              : {
                  ...sans,
                  fontWeight: 400,
                  color: "transparent",
                  WebkitTextStroke: "1.5px #b9b9b9",
                }
          }
        >
          Contact us
        </span>
      ))}
    </div>
  );

  const rowLabel = "text-[13px] font-medium uppercase tracking-[0.1em] text-[#111]";
  const rowText = "mt-3 text-[clamp(0.95rem,0.25vw+0.85rem,1.1rem)] leading-[1.55] text-[#444]";

  return (
    <div ref={rootRef} className="relative z-10 bg-white" style={sans}>
      {/* ===================== 1. HERO ===================== */}
      <section className="overflow-hidden pt-[clamp(8rem,13vw,13rem)]">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-[26%_1fr]">
            <div className="ct-label flex items-start gap-3 pt-3">
              <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#111]" />
              <p className="text-[13px] font-normal uppercase tracking-wide text-[#111]">Let&apos;s Contact</p>
            </div>

            <h1 className="text-[clamp(2.1rem,5.6vw,6rem)] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-[#1c3d7a]">
              {["Learn Together,", "Code Together"].map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.1em]">
                  <span className="ct-line inline-block">{line}</span>
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* Marquee */}
        <div
          className="ct-marquee mt-[clamp(3rem,7vw,7rem)] select-none overflow-hidden"
          aria-hidden="true"
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

      {/* ===================== 2. DETAILS + FORM ===================== */}
      <section id="contact-form" className="pb-[clamp(4rem,8vw,9rem)] pt-[clamp(3rem,6vw,6rem)]">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-[minmax(0,27.5%)_minmax(0,1fr)] lg:gap-x-[clamp(2rem,9vw,9rem)]">
            {/* Details card */}
            <aside className="ct-card self-start rounded-[clamp(28px,3vw,40px)] border border-black/[0.07] p-[clamp(1.5rem,2.7vw,2.6rem)]">
              <h2
                className="ct-card-item text-[clamp(1.5rem,2vw,2.1rem)] font-normal underline decoration-1 underline-offset-4"
                style={{ color: ACCENT }}
              >
                Contact Details
              </h2>

              <div className="ct-card-item mt-[clamp(2rem,3vw,3rem)] border-b border-black/10 pb-[clamp(1.5rem,2.2vw,2.2rem)]">
                <p className={rowLabel}>Address</p>
                <p className={rowText}>Naikap, Kathmandu</p>
              </div>

              <div className="ct-card-item border-b border-black/10 py-[clamp(1.5rem,2.2vw,2.2rem)]">
                <p className={rowLabel}>Email</p>
                <p className={rowText}>
                  <a href="mailto:info@stemsikshya.com" className="transition-colors hover:text-[#1c3d7a]">
                    info@stemsikshya.com
                  </a>
                  <br />
                  <a href="mailto:admin@stemsikshya.com" className="transition-colors hover:text-[#1c3d7a]">
                    admin@stemsikshya.com
                  </a>
                </p>
              </div>

              <div className="ct-card-item border-b border-black/10 py-[clamp(1.5rem,2.2vw,2.2rem)]">
                <p className={rowLabel}>Contact Details</p>
                <p className={rowText}>
                  <a href="tel:+9779802316819" className="transition-colors hover:text-[#1c3d7a]">
                    +977-9802316819
                  </a>
                  <br />
                  <a href="tel:+9779840344987" className="transition-colors hover:text-[#1c3d7a]">
                    +977-9840344987
                  </a>
                </p>
              </div>

              <div className="ct-card-item flex gap-1.5 pt-[clamp(1.5rem,2.2vw,2.2rem)]">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[#111] transition-all duration-300 hover:-translate-y-1 hover:border-[#1c3d7a] hover:bg-[#1c3d7a] hover:text-white"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </aside>

            {/* Form */}
            <form
              onSubmit={onSubmit}
              noValidate={false}
              className="ct-form lg:pt-[clamp(3rem,6.5vw,6.5rem)]"
              aria-label="Contact form"
            >
              {/* Honeypot: real visitors never see or fill this */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              <div className="grid grid-cols-1 gap-[clamp(0.9rem,1.6vw,1.5rem)] sm:grid-cols-2">
                <div className="ct-field">
                  <input
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    placeholder="Name"
                    aria-label="Name"
                    autoComplete="name"
                    className={`${field} h-[clamp(50px,3.7vw,56px)]`}
                  />
                </div>
                <div className="ct-field">
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={150}
                    placeholder="Email"
                    aria-label="Email"
                    autoComplete="email"
                    className={`${field} h-[clamp(50px,3.7vw,56px)]`}
                  />
                </div>
              </div>

              <div className="ct-field mt-[clamp(0.9rem,1.6vw,1.5rem)]">
                <input
                  name="subject"
                  type="text"
                  required
                  maxLength={150}
                  placeholder="Subject"
                  aria-label="Subject"
                  className={`${field} h-[clamp(50px,3.7vw,56px)]`}
                />
              </div>

              <div className="ct-field mt-[clamp(0.9rem,1.6vw,1.5rem)]">
                <textarea
                  name="message"
                  required
                  maxLength={3000}
                  placeholder="Message"
                  aria-label="Message"
                  className={`${field} h-[clamp(20px,19.8vw,300px)] resize-y overflow-auto py-[clamp(1.25rem,1.9vw,1.75rem)]`}
                />
              </div>

              <div className="ct-field mt-[clamp(1.25rem,2vw,2rem)]">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="h-[clamp(46px,3.2vw,50px)] w-full rounded-full bg-[#f0f0f0] text-[clamp(0.9rem,0.2vw+0.85rem,1.05rem)] text-[#111] transition-all duration-300 hover:bg-[#1c3d7a] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Let\u2019s Talk"}
                </button>

                <div aria-live="polite" className="min-h-[1.5rem] pt-3 text-center text-sm">
                  {status === "sent" && (
                    <p className="text-[#1c7a4a]">Thank you! Your message has been sent. We&apos;ll reply soon.</p>
                  )}
                  {status === "error" && <p className="text-[#c0392b]">{error}</p>}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ===================== 3. MAP ===================== */}
      <section className="pb-[clamp(5rem,9vw,9rem)]">
        <div
          className="ct-map relative h-[clamp(280px,24vw,460px)] w-full overflow-hidden bg-[#e5e9ee]"
          onWheel={onMapWheel}
          onClick={() => setMapActive(true)}
          onMouseLeave={() => {
            setMapActive(false);
            setHint(false);
          }}
        >
          <iframe
            title="STEM Sikshya location on Google Maps"
            src={MAP_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className={`h-full w-full border-0 ${mapActive ? "pointer-events-auto" : "pointer-events-none"}`}
          />

          {/* Hint, like the original: shown when you scroll over the map */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-black/55 px-6 text-center text-[clamp(0.95rem,1.4vw,1.4rem)] text-white transition-opacity duration-300 ${
              hint ? "opacity-100" : "opacity-0"
            }`}
          >
            Click the map to move it, then use scroll to zoom
          </div>
        </div>
      </section>
    </div>
  );
}