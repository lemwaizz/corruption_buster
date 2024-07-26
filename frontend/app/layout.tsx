import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthInitializer } from "@/components/shared/auth_initializer";
import { Toaster } from "@/components/ui/toaster";
import { getAuthenticatedAppForUser } from "@/firebase/serverApp";

export const dynamic = "force-dynamic";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentUser } = await getAuthenticatedAppForUser();
  return (
    <html lang="en">
      <body className={cn(inter.className, outfit.variable)}>
        {children}
        <Toaster />
        <AuthInitializer initialUser={null} />
      </body>
    </html>
  );
}
