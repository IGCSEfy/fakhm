import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavMenu from "@/components/ui/menu-hover-effects";
import { SiteFooter } from "@/components/site-footer";
import CartDrawer from "@/components/cart-drawer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Fakhm Oud — Oud Attars & Bakhoor",
    template: "%s — Fakhm Oud",
  },
  description:
    "Oud-forward attars and traditional bakhoor, blended to last. Authentic oud at honest prices, delivered across the UAE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-bold">
        <NavMenu />
        {children}
        <SiteFooter />
        <CartDrawer />
      </body>
    </html>
  );
}
