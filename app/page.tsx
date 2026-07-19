import Navbar from "@/components/Navbar";
import DawnArcs from "@/components/DawnArcs";
import SunriseBackground from "@/components/SunriseBackground";
import Sun from "@/components/Sun";
import GrainOverlay from "@/components/GrainOverlay";
import Hero from "@/components/Hero";
import Treatments from "@/components/Treatments";
import Experience from "@/components/Experience";
import BookingCTA from "@/components/BookingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SunriseBackground />
      <Sun />
      <GrainOverlay />
      <Navbar />
      <main>
        {/* shared wrapper so the dawn arcs can span the hero/treatments
            boundary instead of being clipped inside the hero */}
        <div className="relative">
          <DawnArcs />
          <Hero />
          <Treatments />
        </div>
        <Experience />
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}
