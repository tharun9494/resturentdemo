import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ParticleCanvas } from "./ParticleCanvas";
import { ArrowDown } from "lucide-react";

export const Hero = ({ onReserve }) => {
  const ref = React.useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden bg-black"
      data-testid="hero-section"
    >
      {/* Clean background */}
      <div className="absolute inset-0 z-0 bg-black" />

      {/* Particles overlay */}
      <ParticleCanvas density={120} />

      {/* Circular Text Badge */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute right-12 lg:right-32 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden md:flex items-center justify-center w-48 h-48 lg:w-64 lg:h-64 opacity-60"
      >
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="w-full h-full relative"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
            <text>
              <textPath href="#circlePath" startOffset="0%" className="text-[10px] font-mono-accent tracking-[0.25em] fill-[#E6C998] uppercase">
                • fine dining • tasting menu • noir & or
              </textPath>
            </text>
          </svg>
        </motion.div>
        {/* Center dot */}
        <div className="absolute w-2 h-2 bg-[#E6C998] rounded-full" />
      </motion.div>

      {/* Labels removed for minimalist "empty" feel */}

      {/* Hero content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 min-h-screen flex flex-col justify-center px-6 lg:px-24 max-w-[1400px] mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-12 h-px bg-[#E6C998]" />
          <span className="font-mono-accent text-[10px] uppercase tracking-[0.4em] text-[#E6C998]">
            a fine dining experience
          </span>
        </motion.div>

        <h1
          className="font-serif-display font-light leading-[0.95] tracking-tight text-white max-w-5xl"
          data-testid="hero-title"
        >
          {["where", "every", "course", "is", "a"].map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-4 text-5xl md:text-7xl lg:text-8xl"
            >
              {w}
            </motion.span>
          ))}
          <br />
          <br />
          <div className="inline-block mt-4">
            {"quiet revelation.".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1, delay: 1.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block italic text-gold-gradient text-6xl md:text-8xl lg:text-9xl font-serif-display"
                style={{ transformOrigin: "bottom" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-10 max-w-xl text-zinc-400 text-base md:text-lg font-light leading-relaxed"
        >
          Twelve seats. One chef. A nine-course tasting menu composed each dawn from
          ingredients foraged within fifty miles — and a cellar that whispers in three languages.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.9 }}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <button
            onClick={onReserve}
            className="group relative border border-[#E6C998] text-[#E6C998] px-8 py-4 font-mono-accent text-[11px] uppercase tracking-[0.3em] hover:bg-[#E6C998] hover:text-black transition-all hover:shadow-[0_0_20px_rgba(230,201,152,0.2)]"
            data-testid="hero-reserve-btn"
          >
            secure your seat →
          </button>
          <a
            href="#menu"
            className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-zinc-400 hover:text-[#E6C998] transition-colors flex items-center gap-2"
            data-testid="hero-menu-link"
          >
            <span className="w-8 h-px bg-current" /> view the tasting menu
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-12 left-0 right-0 z-10 px-6 lg:px-24 max-w-[1400px] mx-auto flex flex-wrap items-end justify-between gap-6"
      >
        <div className="flex items-end gap-8 lg:gap-12">
          {[
            { n: "★★★", l: "Michelin Guide '24" },
            { n: "n°7", l: "World's 50 Best" },
            { n: "98", l: "James Beard Score" },
          ].map((b, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="font-serif-display text-2xl text-[#E6C998]">{b.n}</span>
              <span className="font-mono-accent text-[9px] uppercase tracking-[0.3em] text-zinc-500">{b.l}</span>
            </div>
          ))}
        </div>
        <a href="#story" className="flex flex-col items-center gap-2 text-zinc-500 hover:text-[#E6C998] transition-colors group" data-testid="scroll-indicator">
          <span className="font-mono-accent text-[9px] uppercase tracking-[0.3em]">scroll</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
