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
      {/* Background image with overlay */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1703100837481-d2f2cdb1d85e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MjJ8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGdvbGQlMjBkYXJrJTIwcGFydGljbGVzJTIwM2R8ZW58MHx8fHwxNzc4NTYzMjI5fDA&ixlib=rb-4.1.0&q=85"
          alt="Abstract gold particles"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,rgba(5,5,5,0)_55%)]" />
      </motion.div>

      {/* Particles overlay */}
      <ParticleCanvas density={90} />

      {/* Side label - vertical */}
      <div className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-6">
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#D4AF37]/60 to-transparent" />
        <span className="vertical-rl font-mono-accent text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]/70">
          tasting № 07 / winter
        </span>
        <div className="w-px h-24 bg-gradient-to-b from-[#D4AF37]/60 via-transparent to-transparent" />
      </div>

      {/* Right label */}
      <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-end gap-3">
        <span className="font-mono-accent text-[10px] uppercase tracking-[0.3em] text-zinc-500">latitude 40.7128°</span>
        <span className="font-mono-accent text-[10px] uppercase tracking-[0.3em] text-zinc-500">longitude 74.0060°</span>
      </div>

      {/* Hero content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 min-h-screen flex flex-col justify-center px-6 lg:px-24 max-w-[1400px] mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-12 h-px bg-[#D4AF37]" />
          <span className="font-mono-accent text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">
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
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="inline-block italic text-gold-gradient text-6xl md:text-8xl lg:text-9xl font-serif-display"
          >
            quiet revelation.
          </motion.span>
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
            className="group relative bg-[#D4AF37] text-black px-8 py-4 font-mono-accent text-[11px] uppercase tracking-[0.3em] hover:bg-[#E5C865] transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            data-testid="hero-reserve-btn"
          >
            secure your seat →
          </button>
          <a
            href="#menu"
            className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-zinc-300 hover:text-[#D4AF37] transition-colors flex items-center gap-2"
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
              <span className="font-serif-display text-2xl text-[#D4AF37]">{b.n}</span>
              <span className="font-mono-accent text-[9px] uppercase tracking-[0.3em] text-zinc-500">{b.l}</span>
            </div>
          ))}
        </div>
        <a href="#story" className="flex flex-col items-center gap-2 text-zinc-500 hover:text-[#D4AF37] transition-colors group" data-testid="scroll-indicator">
          <span className="font-mono-accent text-[9px] uppercase tracking-[0.3em]">scroll</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
