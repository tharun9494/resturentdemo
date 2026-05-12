import React from "react";
import { motion } from "framer-motion";

export const Story = () => {
  return (
    <section id="story" className="relative py-32 lg:py-48 px-6 lg:px-12 overflow-hidden" data-testid="story-section">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Image - asymmetric */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="absolute -top-4 -left-4 w-full h-full border border-[#D4AF37]/30 pointer-events-none" />
          <div className="relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1634136928334-98db4d5fc9e8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwxfHxtaWNoZWxpbiUyMHN0YXIlMjBjaGVmJTIwcG9ydHJhaXQlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3Nzg1NjMyMDh8MA&ixlib=rb-4.1.0&q=85"
              alt="Chef Aurelio Vance"
              className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-[#D4AF37] text-black px-6 py-4 rotate-[-2deg]">
            <div className="font-mono-accent text-[9px] uppercase tracking-[0.3em]">executive chef</div>
            <div className="font-serif-display text-2xl mt-1">Aurelio Vance</div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 lg:pl-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono-accent text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">chapter i</span>
            <div className="w-12 h-px bg-[#D4AF37]/40" />
          </div>

          <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-tight">
            we cook the way <br />
            <span className="italic text-gold-gradient">memory tastes</span> —
            <br />
            slow, deliberate, true.
          </h2>

          <div className="mt-10 space-y-6 text-zinc-400 leading-relaxed max-w-xl">
            <p>
              Noir &amp; Or was born in the basement of a Brooklyn brownstone in 2019 — twelve
              chairs, one wood-fired hearth, and a stubborn refusal to repeat a menu twice.
              Six years later, we still cook to the rhythm of the seasons, not the calendar.
            </p>
            <p>
              Chef Aurelio Vance trained under Pierre Gagnaire and spent four years foraging
              in the Pacific Northwest before opening these doors. His philosophy is simple:
              <em className="text-[#D4AF37]"> the rarest ingredient is silence at the table.</em>
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            {[
              { n: "12", l: "seats" },
              { n: "9", l: "courses" },
              { n: "47", l: "ingredients" },
            ].map((s, i) => (
              <div key={i} className="border-l border-[#D4AF37]/30 pl-4">
                <div className="font-serif-display text-4xl text-white">{s.n}</div>
                <div className="font-mono-accent text-[9px] uppercase tracking-[0.3em] text-zinc-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Story;
