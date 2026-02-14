"use client";

import React, { useRef, ReactNode, Children } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface CopyProps {
  children: ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
}

export default function Copy({
  children,
  animateOnScroll = true,
  delay = 0,
}: CopyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const elements = containerRef.current.querySelectorAll(
        "h1, h2, h3, h4, h5, h6, p, span, li"
      );

      const targets =
        elements.length > 0 ? Array.from(elements) : [containerRef.current];

      const allLines: Element[] = [];
      const splits: ReturnType<typeof SplitText.create>[] = [];

      targets.forEach((element) => {
        const split = SplitText.create(element, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        splits.push(split);
        allLines.push(...split.lines);
      });

      gsap.set(allLines, { y: "100%" });

      gsap.to(allLines, {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: delay,
        scrollTrigger: animateOnScroll
          ? {
              trigger: containerRef.current,
              start: "top 75%",
              once: true,
            }
          : undefined,
      });

      return () => {
        splits.forEach((s) => s.revert());
      };
    },
    { scope: containerRef }
  );

  return <div ref={containerRef}>{children}</div>;
}
