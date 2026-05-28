"use client";
import React, { useState } from "react";
import Link from "next/link";
import CartButton from "@/components/cart-button";

const menuItems: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Shared link markup with the border + fill hover effect.
function NavLink({
  label,
  href,
  onNavigate,
}: {
  label: string;
  href: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      className="relative inline-block group"
      onClick={onNavigate}
    >
      <span className="relative z-10 block uppercase text-white font-sans font-semibold transition-colors duration-300 group-hover:text-black text-xl py-2 px-3 md:text-base md:py-2 md:px-3 lg:text-lg lg:px-4">
        {label}
      </span>
      {/* Top & bottom border animation */}
      <span className="absolute inset-0 border-t-2 border-b-2 border-white transform scale-y-[2] opacity-0 transition-all duration-300 origin-center group-hover:scale-y-100 group-hover:opacity-100" />
      {/* Background fill animation */}
      <span className="absolute top-[2px] left-0 w-full h-full bg-white transform scale-0 opacity-0 transition-all duration-300 origin-top group-hover:scale-100 group-hover:opacity-100" />
    </Link>
  );
}

export default function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((v) => !v);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b border-white/10">
      {/* Header bar — always has height so it reserves space at the top of
          the page on every screen size (fixes icons floating over content). */}
      <div className="relative flex items-center justify-between h-16 px-4 md:h-auto md:justify-center md:py-4 md:px-6">
        {/* Hamburger — mobile only, left side */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 -ml-2 z-20"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <div
            className={`w-6 h-0.5 bg-white mb-1.5 transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <div
            className={`w-6 h-0.5 bg-white mb-1.5 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
          />
          <div
            className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>

        {/* Desktop links — centered, hidden on mobile */}
        <ul className="hidden md:flex md:flex-row md:items-center md:space-x-4 lg:space-x-8">
          {menuItems.map((item) => (
            <li key={item.label} className="list-none">
              <NavLink
                label={item.label}
                href={item.href}
                onNavigate={closeMenu}
              />
            </li>
          ))}
        </ul>

        {/* Cart — in the header flow on mobile (pushed right by justify-between),
            absolutely positioned on desktop so it doesn't offset the centered links. */}
        <div className="md:absolute md:right-6 md:top-1/2 md:-translate-y-1/2">
          <CartButton />
        </div>
      </div>

      {/* Mobile dropdown menu — only rendered when open, below the header bar */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 pb-8 pt-4">
          <ul className="flex flex-col items-center space-y-6">
            {menuItems.map((item) => (
              <li key={item.label} className="list-none">
                <NavLink
                  label={item.label}
                  href={item.href}
                  onNavigate={closeMenu}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
