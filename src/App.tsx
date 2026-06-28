import { useLenis } from "@/hooks/use-lenis";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Mission from "@/components/sections/Mission";
import ScrollGallery from "@/components/sections/ScrollGallery";
import ParallaxGrid from "@/components/sections/ParallaxGrid";
import Workshops from "@/components/sections/Workshops";
import PhotoMarquee from "@/components/sections/PhotoMarquee";
import Impact from "@/components/sections/Impact";
import GetInvolved from "@/components/sections/GetInvolved";
import Footer from "@/components/Footer";

export default function App() {
  useLenis();

  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Mission />
        <ScrollGallery />
        <ParallaxGrid />
        <Workshops />
        <PhotoMarquee />
        <Impact />
        <GetInvolved />
      </main>
      <Footer />
    </div>
  );
}
