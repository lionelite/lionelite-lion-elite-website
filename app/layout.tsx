import type { Metadata } from "next";
import "./globals.css";
import "./luxury-hero.css";

export const metadata: Metadata = {
  title: "Lion Elite Wellness | Premium Research Peptides",
  description: "Premium research-grade peptides for scientific research.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
