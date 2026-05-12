import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { motion, useScroll, useSpring } from "framer-motion";

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
import ChefChat, { ChefChatFAB } from "@/components/ChefChat";
import CustomCursor from "@/components/CustomCursor";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 18, mass: 0.3 });
  return <motion.div className="scroll-progress" style={{ scaleX }} data-testid="scroll-progress" />;
};

const Home = () => {
  const [reserveOpen, setReserveOpen] = React.useState(false);
  const [chatOpen, setChatOpen] = React.useState(false);

  return (
    <div className="bg-[#050505] text-white min-h-screen grain" data-testid="home-page">
      <ScrollProgress />
      <CustomCursor />

      <Header onReserve={() => setReserveOpen(true)} onOpenChat={() => setChatOpen(true)} />
      <main>
        <Hero onReserve={() => setReserveOpen(true)} />
        <Story />
        <Philosophy />
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
      <ChefChatFAB open={chatOpen} onClick={() => setChatOpen(true)} />
      <ChefChat open={chatOpen} onClose={() => setChatOpen(false)} />

      <Toaster
        theme="dark"
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#0a0a0a",
            border: "1px solid rgba(212,175,55,0.3)",
            color: "#F7F7F7",
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
