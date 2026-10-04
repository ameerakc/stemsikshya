"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { LOGO_IMAGE } from "@/config/images/hero";

// Put your logo in the /public folder and change the name here
const LOGO_SRC = LOGO_IMAGE || "/logo.svg";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT US" },
  { href: "/contact", label: "CONTACT US" },
  { href: "/services", label: "OUR SERVICES" },
  { href: "/gallery", label: "GALLERY" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuContentRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const hasOpenedRef = useRef(false);

  // Glass effect on scroll
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape or when resizing to desktop
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Mobile menu open / close animation
  useEffect(() => {
    const menu = mobileMenuRef.current;
    const content = mobileMenuContentRef.current;
    if (!menu || !content) return;

    const links = mobileLinksRef.current.filter(Boolean) as HTMLAnchorElement[];
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      gsap.set(menu, { autoAlpha: isOpen ? 1 : 0 });
      gsap.set([content, ...links], { y: 0, autoAlpha: 1 });
      return;
    }

    let tl: gsap.core.Timeline | undefined;

    if (isOpen) {
      hasOpenedRef.current = true;

      gsap.set(menu, { autoAlpha: 0 });
      gsap.set(content, { y: 30, autoAlpha: 0 });
      gsap.set(links, { y: 20, autoAlpha: 0 });

      tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(menu, { autoAlpha: 1, duration: 0.3 })
        .to(content, { y: 0, autoAlpha: 1, duration: 0.5 }, "-=0.15")
        .to(
          links,
          { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08 },
          "-=0.3"
        );
    } else if (hasOpenedRef.current) {
      tl = gsap.timeline();
      tl.to(links, {
        y: -20,
        autoAlpha: 0,
        duration: 0.3,
        stagger: 0.04,
        ease: "power3.in",
      })
        .to(content, { y: 30, autoAlpha: 0, duration: 0.4, ease: "power3.inOut" }, "-=0.15")
        .to(menu, { autoAlpha: 0, duration: 0.25 }, "-=0.2");
    }

    return () => {
      tl?.kill();
    };
  }, [isOpen]);

  // Entrance animation
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(
      headerRef.current,
      { y: -20, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
        ease: "power3.out",
        clearProps: "transform",
      }
    );
    return () => {
      tween.kill();
    };
  }, []);

  const toggleMenu = () => setIsOpen((v) => !v);
  const closeMenu = () => setIsOpen(false);

  const logo = logoFailed ? (
    <span className="text-xl font-semibold" style={{ color: "#1c3d7a" }}>
      STEM Sikshya
    </span>
  ) : (
    <Image
      src={LOGO_SRC}
      alt="STEM Sikshya"
      width={160}
      height={40}
      priority
      onError={() => setLogoFailed(true)}
      className={`w-auto transition-all duration-300 ${
        isScrolled ? "h-7" : "h-8"
      }`}
    />
  );

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed left-0 right-0 top-0 z-50 w-full border-b transition-all duration-300 ease-out ${
          isScrolled
            ? "border-black/5 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent"
        }`}
      >
        {/* Content uses the same side spacing as the hero */}
        <div className="site-container">
          <div
            className={`flex items-center justify-between transition-all duration-300 ease-out lg:grid lg:grid-cols-[1fr_auto_1fr] ${
              isScrolled ? "h-[60px]" : "h-[72px]"
            }`}
          >
            {/* Logo */}
            <Link href="/" aria-label="STEM Sikshya home" className="shrink-0">
              {logo}
            </Link>

            {/* Desktop links */}
            <nav aria-label="Main navigation" className="hidden lg:block">
              <ul className="flex items-center gap-6 xl:gap-10">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="relative whitespace-nowrap py-1 text-[13px] font-medium uppercase tracking-[0.08em] text-[#111111] transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#1c3d7a] after:transition-all after:duration-300 hover:text-[#1c3d7a] hover:after:w-full xl:text-sm xl:tracking-[0.1em]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3 lg:justify-self-end">
              <Link
                href="/contact"
                style={{ color: "#ffffff" }}
                className="hidden h-10 items-center justify-center whitespace-nowrap rounded-md bg-[#1a1a1a] px-5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-black sm:inline-flex xl:h-11 xl:px-6 xl:text-[15px]"
              >
                Let&apos;s contact
              </Link>

              <button
                type="button"
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[#0a0a0a] transition-colors hover:bg-black/5 lg:hidden"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu: outside the header so fixed inset-0 covers the full screen */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className="fixed inset-0 z-[60] bg-white lg:hidden"
        style={{ visibility: "hidden", opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
      >
        <div
          ref={mobileMenuContentRef}
          className="absolute inset-0 flex flex-col bg-white"
        >
          {/* Top bar: logo + close button */}
          <div className="site-container flex h-[72px] shrink-0 items-center justify-between">
            <Link
              href="/"
              onClick={closeMenu}
              aria-label="STEM Sikshya home"
              className="shrink-0"
            >
              {logo}
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#0a0a0a] transition-colors hover:bg-black/5"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-1 flex-col items-center justify-center px-6 pb-16">
            <nav aria-label="Mobile navigation">
              <ul className="flex w-full max-w-xs flex-col items-center gap-4 text-center">
                {navLinks.map((link, index) => (
                  <li key={link.href} className="w-full">
                    <Link
                      ref={(el) => {
                        mobileLinksRef.current[index] = el;
                      }}
                      href={link.href}
                      onClick={closeMenu}
                      className="block py-2 text-2xl font-medium uppercase tracking-[0.1em] text-[#111111] transition-colors hover:text-[#1c3d7a]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Link
              ref={(el) => {
                mobileLinksRef.current[navLinks.length] = el;
              }}
              href="/contact"
              onClick={closeMenu}
              style={{ color: "#ffffff" }}
              className="mt-6 flex h-12 w-full max-w-xs items-center justify-center whitespace-nowrap rounded-md bg-[#1a1a1a] px-8 text-base font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-black"
            >
              Let&apos;s contact
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}