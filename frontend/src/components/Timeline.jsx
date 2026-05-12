import React from "react";
import { motion } from "framer-motion";

const EVENTS = [
  { year: "2019", title: "the basement", body: "Twelve seats. One borrowed hearth. A fifty-dollar tasting menu in a Brooklyn brownstone basement. Two months of word-of-mouth before the first review." },
  { year: "2020", title: "first ink", body: "The New York Times — 'a quiet revolution served on porcelain.' Two stars. The next morning the phone rang for eleven hours." },
  { year: "2022", title: "first star", body: "Michelin awards the first star. Chef Aurelio refuses the press dinner. 'I was busy peeling artichokes,' he tells the inspector." },
  { year: "2023", title: "the move", body: "Relocated to a 14-seat townhouse on Mercer Street. The original hearth was disassembled and reassembled brick by brick." },
  { year: "2024", title: "three stars", body: "Michelin elevates to three stars. World's 50 Best names Noir & Or №7 in North America. The tasting menu is now reserved three months out." },
  { year: "2025", title: "today", body: "Same twelve seats. Same chef. Same refusal to repeat a menu. We are exactly where we wanted to be." },
];

export const Timeline = () => {
  return (
    <section className="relative py-32 lg:py-48 px-6 lg:px-12 bg-[#080808] overflow-hidden" data-testid="timeline-section">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20 max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono-accent text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">chapter iv</span>
            <div className="w-12 h-px bg-[#D4AF37]/40" />
          </div>
          <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]">
            six years, <span className="italic text-gold-gradient">six chapters.</span>
          </h2>
          <p className="text-zinc-400 leading-relaxed mt-6 max-w-xl">
            A tasting menu of years — from the basement on Atlantic Avenue to the third star.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent" />

          {EVENTS.map((e, i) => (
            <motion.div
              key={e.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 mb-20 last:mb-0 ${
                i % 2 === 0 ? "" : "lg:[&>*:first-child]:order-2"
              }`}
              data-testid={`timeline-event-${e.year}`}
            >
              {/* Dot */}
              <div className="absolute left-0 lg:left-1/2 top-2 -translate-x-1/2 z-10">
                <div className="w-3 h-3 bg-[#D4AF37] rotate-45 shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
              </div>

              <div className={`pl-12 lg:pl-0 ${i % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                <div className={`font-mono-accent text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-3 ${
                  i % 2 === 0 ? "lg:justify-end" : ""
                } flex items-center gap-3`}>
                  <span>chapter {String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-serif-display text-3xl lg:text-5xl text-white font-light leading-tight">
                  {e.title}
                </h3>
              </div>

              <div className={`pl-12 lg:pl-0 ${i % 2 === 0 ? "lg:pl-16" : "lg:pr-16 lg:text-right"}`}>
                <div className="font-serif-display text-6xl lg:text-7xl text-[#D4AF37]/30 leading-none mb-4">
                  {e.year}
                </div>
                <p className="text-zinc-400 leading-relaxed max-w-md">{e.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
