import React from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

const QUOTES = [
  '"a quiet revolution served on porcelain."',
  "— The New York Times",
  '"the most poetic plate i\'ve ever paid for."',
  "— Eater NY",
  '"twelve seats. nine courses. one unforgettable evening."',
  "— Bon Appétit",
  '"aurelio cooks like he\'s holding his breath — and it shows."',
  "— Robb Report",
];

export const Testimonials = () => {
  return (
    <section className="relative py-24 lg:py-32 border-y border-white/5 bg-[#080808] overflow-hidden" data-testid="testimonials-section">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="space-y-8"
      >
        <Marquee speed={40} gradient gradientColor="#080808" gradientWidth={120} pauseOnHover>
          {QUOTES.map((q, i) => (
            <span
              key={i}
              className={`marquee-text mx-12 text-3xl md:text-5xl ${
                q.startsWith("—") ? "text-[#D4AF37] not-italic font-mono-accent text-base uppercase tracking-[0.3em]" : ""
              }`}
            >
              {q}
            </span>
          ))}
        </Marquee>
        <Marquee speed={30} direction="right" gradient gradientColor="#080808" gradientWidth={120}>
          {["michelin", "world's 50 best", "james beard", "relais & châteaux", "la liste", "gault & millau"].map((b, i) => (
            <span key={i} className="font-serif-display text-2xl italic text-zinc-700 mx-16">
              {b}
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
};

export default Testimonials;
