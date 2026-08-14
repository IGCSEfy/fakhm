"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type AnimatedDropdownItem = {
  name: string;
  link: string;
};

type AnimatedDropdownProps = {
  items: AnimatedDropdownItem[];
  text: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  onSelect?: () => void;
  navStyle?: boolean;
};

export default function AnimatedDropdown({
  items,
  text,
  className,
  triggerClassName =
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  contentClassName =
    "absolute top-[calc(100%+0.5rem)] left-1/2 w-fit min-w-full -translate-x-1/2 rounded-md border border-white/10 bg-background shadow-lg",
  itemClassName =
    "inline-block w-full border-b border-white/10 bg-background px-3 py-2 text-sm text-white no-underline transition-colors duration-150 last:border-b-0 hover:bg-white/10",
  onSelect,
  navStyle = false,
}: AnimatedDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = () => {
    setIsOpen(false);
    onSelect?.();
  };

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 group",
          triggerClassName,
        )}
      >
        <span className="relative z-10">{text}</span>
        <motion.span
          className="relative z-10 flex"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <ChevronDown className="size-4" />
        </motion.span>
        {navStyle && (
          <>
            <span className="absolute inset-0 border-t-2 border-b-2 border-white transform scale-y-[2] opacity-0 transition-all duration-300 origin-center group-hover:scale-y-100 group-hover:opacity-100" />
            <span className="absolute top-[2px] left-0 h-full w-full bg-white transform scale-0 opacity-0 transition-all duration-300 origin-top group-hover:scale-100 group-hover:opacity-100" />
          </>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            className={cn(
              "z-50 overflow-hidden",
              contentClassName,
            )}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.035 } },
              }}
            >
              {items.map((item) => (
                <motion.div
                  key={item.link}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={item.link}
                    role="menuitem"
                    onClick={handleSelect}
                    className={cn(
                      "whitespace-nowrap",
                      itemClassName,
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
