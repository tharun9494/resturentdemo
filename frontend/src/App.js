import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { motion, useScroll, useSpring } from "framer-motion";
import Marquee from "react-fast-marquee";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Philosophy from "@/components/Philosophy";
import Signature from "@/components/Signature";
import MenuSection from "@/components/MenuSection";
import StatsStrip from "@/components/StatsStrip";
import Timeline from "@/components/Timeline";
import Cellar from "@/components/Cellar";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import ReservationModal from "@/components/ReservationModal";
import CustomCursor from "@/components/CustomCursor";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 18, mass: 0.3 });
  return <motion.div className="scroll-progress" style={{ scaleX }} data-testid="scroll-progress" />;
};

const Home = () => {
  const [reserveOpen, setReserveOpen] = React.useState(false);

  return (
    <div className="bg-[#000000] text-white min-h-screen grain" data-testid="home-page">
      <ScrollProgress />
      <CustomCursor />

      <Header onReserve={() => setReserveOpen(true)} />
      <main>
        <Hero onReserve={() => setReserveOpen(true)} />
        <Story />
        <Philosophy />
        <div className="py-24 overflow-hidden pointer-events-none bg-black border-y border-[#E6C998]/20 flex flex-col gap-6 relative">
          {/* Top Marquee */}
          <Marquee speed={40} gradient={false} autoFill>
            <div className="flex items-center">
              <span className="font-serif-display text-4xl md:text-5xl lg:text-6xl text-white mx-8 font-light tracking-wide uppercase">
                noir & or
              </span>
              <span className="text-[#E6C998] text-2xl mx-4">✦</span>
              <span className="font-serif-display text-4xl md:text-5xl lg:text-6xl text-white mx-8 font-light tracking-wide uppercase">
                the winter tasting
              </span>
              <span className="text-[#E6C998] text-2xl mx-4">✦</span>
              <span className="font-serif-display text-4xl md:text-5xl lg:text-6xl text-white mx-8 font-light tracking-wide uppercase">
                twelve seats
              </span>
              <span className="text-[#E6C998] text-2xl mx-4">✦</span>
              <span className="font-serif-display text-4xl md:text-5xl lg:text-6xl text-white mx-8 font-light tracking-wide uppercase">
                a quiet revelation
              </span>
              <span className="text-[#E6C998] text-2xl mx-4">✦</span>
            </div>
          </Marquee>
          
          {/* Bottom Marquee (Reverse) */}
          <Marquee speed={30} gradient={false} autoFill direction="right">
            <div className="flex items-center">
              <span className="font-serif-display italic text-4xl md:text-5xl lg:text-6xl text-[#E6C998]/40 mx-8 font-light tracking-wide">
                Reservations Open
              </span>
              <span className="text-white/20 text-2xl mx-4">✦</span>
              <span className="font-serif-display italic text-4xl md:text-5xl lg:text-6xl text-[#E6C998]/40 mx-8 font-light tracking-wide">
                Michelin Guide '24
              </span>
              <span className="text-white/20 text-2xl mx-4">✦</span>
              <span className="font-serif-display italic text-4xl md:text-5xl lg:text-6xl text-[#E6C998]/40 mx-8 font-light tracking-wide">
                World's 50 Best
              </span>
              <span className="text-white/20 text-2xl mx-4">✦</span>
            </div>
          </Marquee>
        </div>
        <Signature onReserve={() => setReserveOpen(true)} />
        <StatsStrip />
        <MenuSection />
        <Timeline />
        <Cellar />
        <Testimonials />
        <FAQ />
        <Location />
        <Footer onReserve={() => setReserveOpen(true)} />
      </main>

      <ReservationModal open={reserveOpen} onClose={() => setReserveOpen(false)} />

      <Toaster
        theme="dark"
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#000000",
            border: "1px solid rgba(230,201,152,0.3)",
            color: "#FAFAFA",
            fontFamily: "Outfit, sans-serif",
          },
        }}
      />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
