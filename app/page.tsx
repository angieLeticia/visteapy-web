export const dynamic = "force-dynamic";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ManifestoSection from "@/components/ManifestoSection";
import ModesGrid from "@/components/ModesGrid";
import HowItWorks from "@/components/HowItWorks";
import InstagramFeed from "@/components/InstagramFeed";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ManifestoSection />
        <ModesGrid />
        <HowItWorks />
        <InstagramFeed />
      </main>
      <Footer />
    </>
  );
}
