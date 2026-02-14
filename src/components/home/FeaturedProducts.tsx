"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FEATURED_PRODUCTS } from "@/lib/constants/products";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { formatPriceRange } from "@/lib/utils/formatting";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current!.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-tapcraft-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-tapcraft-dark">
            Featured Products
          </h2>
          <p className="mt-4 text-tapcraft-gray max-w-2xl mx-auto text-lg">
            Explore our most popular NFC-enabled designs, ready to customize for
            your brand.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {FEATURED_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              style={{ opacity: 0 }}
            >
              <div className="p-4">
                <ImagePlaceholder
                  width={product.images[0]?.width ?? 400}
                  height={product.images[0]?.height ?? 300}
                  name={product.name}
                  type="3d"
                  className="w-full"
                />
              </div>

              <div className="px-5 pb-5">
                <span className="text-xs font-medium text-tapcraft-accent uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="mt-1 text-lg font-semibold text-tapcraft-dark group-hover:text-tapcraft-blue transition-colors">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-tapcraft-gray line-clamp-2 leading-relaxed">
                  {product.shortDescription}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-tapcraft-blue font-semibold">
                    {formatPriceRange(
                      product.price.min,
                      product.price.max,
                      product.price.currency
                    )}
                  </span>
                  <Link
                    href={`/catalogue/${product.slug}`}
                    className="text-sm font-medium text-tapcraft-accent hover:text-tapcraft-blue transition-colors"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 text-tapcraft-blue font-semibold hover:underline text-lg"
          >
            View Full Catalogue
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
