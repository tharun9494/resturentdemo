import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Signature from "@/components/Signature";
import MenuSection from "@/components/MenuSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ReservationModal from "@/components/ReservationModal";
import ChefChat, { ChefChatFAB } from "@/components/ChefChat";

const Home = () => {
  const [reserveOpen, setReserveOpen] = React.useState(false);
  const [chatOpen, setChatOpen] = React.useState(false);

  return (
    <div className="bg-[#050505] text-white min-h-screen grain" data-testid="home-page">
      <Header onReserve={() => setReserveOpen(true)} onOpenChat={() => setChatOpen(true)} />
      <main>
        <Hero onReserve={() => setReserveOpen(true)} />
        <Story />
        <Signature onReserve={() => setReserveOpen(true)} />
        <MenuSection />
        <Testimonials />
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
