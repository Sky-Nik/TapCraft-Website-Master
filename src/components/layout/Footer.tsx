"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/shared/Button";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/customize", label: "Customize" },
  { href: "/contact", label: "Contact" },
] as const;

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X (Twitter)", href: "#" },
] as const;

export function Footer() {
  return (
    <footer className="bg-tapcraft-black text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/tapcraft%20logo%28black%20bg%29.png"
                alt="TapCraft Studio"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Premium custom NFC products designed and crafted with precision.
              Bringing smart technology to your brand identity.
            </p>
            <p className="text-sm text-gray-500">Melbourne, Australia</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-tapcraft-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-tapcraft-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-tapcraft-white">
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hello@tapcraftstudio.com"
                  className="text-sm text-gray-400 transition-colors hover:text-tapcraft-white"
                >
                  hello@tapcraftstudio.com
                </a>
              </li>
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-tapcraft-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-tapcraft-white">
              Newsletter
            </h4>
            <p className="text-sm text-gray-400">
              Stay updated with our latest products and offers.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm text-tapcraft-white placeholder:text-gray-500 focus:border-tapcraft-blue focus:outline-none focus:ring-1 focus:ring-tapcraft-blue transition-colors"
                required
              />
              <Button type="submit" size="sm" className="w-full" style={{ color: 'white' }}>
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} TapCraft Studio. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
