import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--outfit",
});

export const metadata: Metadata = {
  title: "Corruption buster",
  description:
    "Organization geared towards easy access to politician corruption cases",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, outfit.variable)}>{children}</body>
    </html>
  );
}
