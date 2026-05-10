import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });

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

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
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
    images: [
      {
        url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=85&fit=crop",
        width: 1200,
        height: 630,
        alt: "Visteapy — La ropa de las protagonistas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visteapy",
    description: "Cada prenda, una escena. Cada outfit, una historia.",
    images: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=85&fit=crop"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
