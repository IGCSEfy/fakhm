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

export default function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b border-white/10">
      {/* Cart button - top right on all screen sizes */}
      <div className="absolute top-3 md:top-1/2 md:-translate-y-1/2 right-4 md:right-6 z-20">
        <CartButton />
      </div>

      {/* Mobile menu toggle button - only visible on small screens */}
      <button
        onClick={toggleMenu}
        className="md:hidden absolute top-6 right-16 z-20 p-2"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <div className={`w-6 h-0.5 bg-white mb-1.5 transition-transform duration-300 ${isMenuOpen ? "transform rotate-45 translate-y-2" : ""}`}></div>
        <div className={`w-6 h-0.5 bg-white mb-1.5 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></div>
        <div className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? "transform -rotate-45 -translate-y-2" : ""}`}></div>
      </button>

      {/* Menu container - adapts to screen size */}
      <div
        className={`
        w-full
        md:block md:py-4
        ${isMenuOpen ? "block pt-20 pb-8" : "hidden md:block"}
      `}
      >
        <ul className="flex flex-col items-center space-y-6 md:flex-row md:space-y-0 md:space-x-4 md:justify-center lg:space-x-8">
          {menuItems.map((item) => (
            <li key={item.label} className="list-none">
              <Link
                href={item.href}
                className="relative inline-block group"
                onClick={() => setIsMenuOpen(false)}
              >
                {/* Link text */}
                <span className="relative z-10 block uppercase text-white font-sans font-semibold transition-colors duration-300 group-hover:text-black text-xl py-2 px-3 md:text-base md:py-2 md:px-3 lg:text-lg lg:py-2 lg:px-4">
                  {item.label}
                </span>
                {/* Top & bottom border animation */}
                <span className="absolute inset-0 border-t-2 border-b-2 border-white transform scale-y-[2] opacity-0 transition-all duration-300 origin-center group-hover:scale-y-100 group-hover:opacity-100" />
                {/* Background fill animation */}
                <span className="absolute top-[2px] left-0 w-full h-full bg-white transform scale-0 opacity-0 transition-all duration-300 origin-top group-hover:scale-100 group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
