import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Visteapy — Vístete como tu película favorita",
  description:
    "Outfits inspirados en películas y series. Marca colombiana de ropa femenina. Cada prenda, una escena.",
  openGraph: {
    title: "Visteapy — Vístete como tu película favorita",
    description: "Cada prenda, una escena. Cada outfit, una historia.",
    siteName: "Visteapy",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visteapy",
    description: "Cada prenda, una escena. Cada outfit, una historia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
