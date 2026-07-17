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
      <main>
        <Hero />
        <Treatments />
        <Experience />
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}
