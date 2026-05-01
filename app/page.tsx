export const dynamic = "force-dynamic";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FavoritesSection from "@/components/FavoritesSection";
import ManifestoSection from "@/components/ManifestoSection";
import ModesGrid from "@/components/ModesGrid";
import HowItWorks from "@/components/HowItWorks";
import InstagramFeed from "@/components/InstagramFeed";
import Footer from "@/components/Footer";
import { getAllModesWithPrices } from "@/lib/db";

export default async function Home() {
  const modes = await getAllModesWithPrices();

  return (
    <>
      <Navbar />
      <main>
        <Hero modes={modes} />
        <FavoritesSection />
        <ManifestoSection />
        <ModesGrid modes={modes} />
        <HowItWorks />
        <InstagramFeed />
      </main>
      <Footer />
    </>
  );
}
