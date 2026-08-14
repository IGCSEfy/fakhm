"use client";

import React, { useState } from "react";
import Link from "next/link";
import CartButton from "@/components/cart-button";
import AnimatedDropdown from "@/components/ui/animated-dropdown";

const menuItems = [
  { label: "Dhan Al Oud", href: "/dhan-al-oud" },
  { label: "Bukhoor", href: "/bukhoor" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const attarCollections = [
  { label: "Prime Collection", href: "/attars/prime-collection" },
  { label: "Musk", href: "/attars/musk" },
  { label: "Mukhalat", href: "/attars/mukhalat" },
  { label: "Dunya Collection", href: "/attars/dunya-collection" },
];

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
      <span className="absolute inset-0 border-t-2 border-b-2 border-white transform scale-y-[2] opacity-0 transition-all duration-300 origin-center group-hover:scale-y-100 group-hover:opacity-100" />
      <span className="absolute top-[2px] left-0 w-full h-full bg-white transform scale-0 opacity-0 transition-all duration-300 origin-top group-hover:scale-100 group-hover:opacity-100" />
    </Link>
  );
}

export default function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenus = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b border-white/10">
      <div className="relative flex items-center justify-between h-16 px-4 md:h-auto md:justify-center md:py-4 md:px-6">
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
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

        <ul className="hidden md:flex md:flex-row md:items-center md:space-x-4 lg:space-x-8">
          <li className="list-none">
            <NavLink label="Home" href="/" onNavigate={closeMenus} />
          </li>
          <li className="list-none">
            <AnimatedDropdown
              text="Attars"
              items={attarCollections.map((collection) => ({
                name: collection.label,
                link: collection.href,
              }))}
              triggerClassName="uppercase text-white font-sans font-semibold transition-colors duration-300 hover:text-black text-xl py-2 px-3 md:text-base md:py-2 md:px-3 lg:text-lg lg:px-4"
              navStyle
            />
          </li>
          {menuItems.map((item) => (
            <li key={item.href} className="list-none">
              <NavLink {...item} onNavigate={closeMenus} />
            </li>
          ))}
        </ul>

        <div className="md:absolute md:right-6 md:top-1/2 md:-translate-y-1/2">
          <CartButton />
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 pb-8 pt-4">
          <ul className="flex flex-col items-center space-y-2">
            <li className="list-none">
              <NavLink label="Home" href="/" onNavigate={closeMenus} />
            </li>
            <li className="list-none">
              <AnimatedDropdown
                text="Attars"
                items={attarCollections.map((collection) => ({
                  name: collection.label,
                  link: collection.href,
                }))}
                onSelect={closeMenus}
                className="text-center"
                triggerClassName="uppercase text-white font-sans font-semibold transition-colors duration-300 hover:text-black text-xl py-2 px-3"
                navStyle
              />
            </li>
            {menuItems.map((item) => (
              <li key={item.href} className="list-none">
                <NavLink {...item} onNavigate={closeMenus} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
