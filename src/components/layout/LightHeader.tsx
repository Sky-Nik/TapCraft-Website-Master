"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import { cn } from "@/lib/utils/formatting";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { SearchModal } from "@/components/layout/SearchModal";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { ProfileMenu } from "@/components/layout/ProfileMenu";
import { slideInOut } from "@/lib/utils/transitions";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/customize", label: "Customize" },
  { href: "/contact", label: "Contact" },
] as const;

export function LightHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useTransitionRouter();

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      if (href === pathname) return;
      router.push(href, { onTransitionReady: slideInOut });
    },
    [pathname, router]
  );

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Logo */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center shrink-0"
          >
            <Image
              src="/tapcraft logo(White bg).png"
              alt="TapCraft Studio"
              width={150}
              height={50}
              className="h-10 w-auto"
            />
          </a>

          {/* Center: Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "text-sm font-medium no-underline cursor-pointer",
                  pathname === link.href
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Action Icons */}
          <div className="flex items-center gap-2">
            <SearchModal variant="light" />
            <CartDrawer variant="light" />
            <ProfileMenu variant="light" />
            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
        variant="light"
      />
    </>
  );
}
