import React from "react";
import { motion } from "framer-motion";
import { Flame, Leaf, Clock, Sparkles } from "lucide-react";
import { Scene3D } from "./Scene3D";

const PILLARS = [
  {
    icon: Flame,
    title: "Hearth",
    sub: "fire as instrument",
    body: "Every protein passes the binchotan. We cook over Japanese white-oak charcoal that burns at 1,200°C — invisible, odorless, ancient. No gas. No shortcuts.",
  },
  {
    icon: Leaf,
    title: "Proximity",
    sub: "fifty-mile mandate",
    body: "Eighty-seven percent of what reaches your plate was alive in New York or New Jersey soil within thirty-six hours. We name every farm. We know every farmer.",
  },
  {
    icon: Clock,
    title: "Patience",
    sub: "the slowest ingredient",
    body: "Our brioche ferments for 48 hours. Our consommé clarifies for nine. Our reservation list runs three months out. We are not in the convenience business.",
  },
  {
    icon: Sparkles,
    title: "Restraint",
    sub: "what we leave off",
    body: "Each plate begins as fifteen ideas and ends as four. The discipline of subtraction is the only luxury that does not cost money. It costs courage.",
  },
];

export const Philosophy = () => {
  return (
    <section className="relative py-32 lg:py-48 px-6 lg:px-12 overflow-hidden border-t border-white/5" data-testid="philosophy-section">
      <div className="max-w-[1400px] mx-auto">
        {/* Header with 3D scene */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono-accent text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">manifesto</span>
              <div className="w-12 h-px bg-[#D4AF37]/40" />
            </div>
            <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]">
              four pillars. <br />
              <span className="italic text-gold-gradient">no compromises.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed mt-8 max-w-lg">
              We do not believe in fusion. We do not believe in trends. We believe in four
              ideas, held closer than family, that have shaped every plate since night one.
            </p>
          </motion.div>

          {/* 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="lg:col-span-6 order-1 lg:order-2 relative h-[400px] lg:h-[500px]"
            data-testid="philosophy-3d"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_60%)]" />
            <Scene3D />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono-accent text-[9px] uppercase tracking-[0.3em] text-[#D4AF37]/50 pointer-events-none">
              <span>geometry · 24k au</span>
              <span>render · realtime</span>
            </div>
          </motion.div>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative bg-[#070707] p-10 lg:p-14 hover:bg-[#0c0c0c] transition-colors cursor-pointer"
              data-testid={`pillar-${p.title.toLowerCase()}`}
            >
              <div className="absolute top-10 right-10 font-serif-display text-7xl text-[#D4AF37]/10 group-hover:text-[#D4AF37]/30 transition-colors">
                0{i + 1}
              </div>
              <p.icon size={24} className="text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform" strokeWidth={1.2} />
              <h3 className="font-serif-display text-3xl lg:text-4xl text-white">{p.title}</h3>
              <p className="font-mono-accent text-[10px] uppercase tracking-[0.3em] text-zinc-500 mt-2">— {p.sub}</p>
              <p className="text-zinc-400 leading-relaxed mt-6 max-w-md">{p.body}</p>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-[#D4AF37] group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
