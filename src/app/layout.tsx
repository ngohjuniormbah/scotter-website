import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScotterBikes — Premium Electric Scooters",
  description:
    "Discover the future of urban mobility. Shop premium electric scooters, off-road bikes, and performance models. Free delivery & expert support.",
  keywords: ["electric scooter", "scooter bikes", "urban mobility", "e-scooter", "electric bike"],
  openGraph: {
    title: "ScotterBikes — Premium Electric Scooters",
    description: "Revolutionizing urban mobility with premium electric scooters.",
    type: "website",
    siteName: "ScotterBikes",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScotterBikes — Premium Electric Scooters",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
