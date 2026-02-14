"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import gsap from "gsap";
import { cn } from "@/lib/utils/formatting";
import { Button } from "@/components/shared/Button";
import { slideInOut } from "@/lib/utils/transitions";

interface NavLink {
  readonly href: string;
  readonly label: string;
}

export interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  links: readonly NavLink[];
  variant?: "dark" | "light";
}

export function MobileNav({ open, onClose, links, variant = "dark" }: MobileNavProps) {
  const pathname = usePathname();
  const router = useTransitionRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const animateClose = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        onClose();
      },
    });

    tl.to(drawerRef.current, { x: "100%", duration: 0.3, ease: "power2.in" }, 0);
    tl.to(overlayRef.current, { opacity: 0, duration: 0.2 }, 0);
  }, [onClose]);

  useEffect(() => {
    if (open && overlayRef.current && drawerRef.current) {
      isAnimating.current = false;
      gsap.set(containerRef.current, { display: "block" });
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      gsap.fromTo(drawerRef.current, { x: "100%" }, { x: 0, duration: 0.4, ease: "power3.out" });

      const linkEls = drawerRef.current.querySelectorAll("[data-nav-link]");
      gsap.fromTo(
        linkEls,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, delay: 0.15, ease: "power2.out" }
      );
    }

    if (!open && containerRef.current) {
      gsap.set(containerRef.current, { display: "none" });
    }
  }, [open]);

  if (!open) return null;

  return (
    <div ref={containerRef}>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-tapcraft-black/50 backdrop-blur-sm"
        onClick={animateClose}
        aria-hidden="true"
        style={{ opacity: 0 }}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed right-0 top-0 z-50 h-full w-72 bg-tapcraft-white shadow-2xl"
        style={{ transform: "translateX(100%)" }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="text-lg font-bold text-tapcraft-blue">
              TapCraft Studio
            </span>
            <button
              type="button"
              onClick={animateClose}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-tapcraft-blue transition-colors"
              aria-label="Close mobile menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.href} data-nav-link style={{ opacity: 0 }}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      animateClose();
                      if (link.href !== pathname) {
                        router.push(link.href, { onTransitionReady: slideInOut });
                      }
                    }}
                    className={cn(
                      "flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors cursor-pointer",
                      pathname === link.href
                        ? "bg-tapcraft-blue/10 text-tapcraft-blue"
                        : "text-gray-700 hover:bg-gray-50 hover:text-tapcraft-blue"
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer CTA */}
          <div className="p-4 border-t border-gray-100">
            <Button asChild className="w-full" style={{ color: 'white' }}>
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  animateClose();
                  router.push("/contact", { onTransitionReady: slideInOut });
                }}
              >
                Get a Quote
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
