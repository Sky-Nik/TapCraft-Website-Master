"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

interface SearchModalProps {
  variant?: "dark" | "light";
}

export function SearchModal({ variant = "dark" }: SearchModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (query.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    // TODO: Integrate with Shopify search API
  };

  useEffect(() => {
    if (isOpen) {
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      }
      if (modalRef.current) {
        gsap.fromTo(modalRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" });
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: () => setIsOpen(false),
    });
    if (overlayRef.current) tl.to(overlayRef.current, { opacity: 0, duration: 0.15 }, 0);
    if (modalRef.current) tl.to(modalRef.current, { opacity: 0, y: -20, duration: 0.15 }, 0);
  };

  return (
    <>
      {/* Search Icon */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className={`inline-flex items-center justify-center w-10 h-10 rounded-md transition-colors ${
          variant === "light"
            ? "text-gray-900 hover:text-tapcraft-blue"
            : "text-white hover:text-tapcraft-blue"
        }`}
        aria-label="Search"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Search Modal Overlay */}
      {isOpen && (
        <div
          ref={overlayRef}
          onClick={handleClose}
          className="fixed inset-0 z-40 bg-black/50"
          style={{ opacity: 0 }}
        />
      )}

      {/* Search Modal */}
      {isOpen && (
        <div
          ref={modalRef}
          className="fixed top-0 left-0 right-0 z-50 pt-16 px-4"
          style={{ opacity: 0 }}
        >
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
            {/* Search Input */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
                />
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {searchResults.length === 0 && searchQuery.trim() !== "" ? (
                <div className="p-6 text-center text-gray-500">
                  <p>No products found</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {searchResults.map((product: any) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.handle}`}
                      onClick={handleClose}
                      className="p-4 hover:bg-gray-50 transition-colors block"
                    >
                      <h3 className="font-semibold text-gray-900">{product.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <p>Type to search for products</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
