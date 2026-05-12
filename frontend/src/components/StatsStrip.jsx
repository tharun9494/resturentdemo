import React from "react";
import { motion } from "framer-motion";
import { useInView, useMotionValue, useTransform, animate } from "framer-motion";

const STATS = [
  { v: 12, l: "seats per night", suffix: "" },
  { v: 9, l: "course tasting", suffix: "" },
  { v: 1049, l: "cellar bottles", suffix: "" },
  { v: 1200, l: "binchotan °C", suffix: "" },
  { v: 87, l: "% local sourcing", suffix: "%" },
  { v: 3, l: "michelin stars", suffix: "★" },
];

const Counter = ({ value, suffix }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (latest) => Math.round(latest).toLocaleString());

  React.useEffect(() => {
    if (inView) {
      const controls = animate(mv, value, { duration: 2.2, ease: [0.22, 1, 0.36, 1] });
      return () => controls.stop();
    }
  }, [inView, value, mv]);

  return (
    <span ref={ref} className="font-serif-display text-5xl lg:text-7xl text-white font-light">
      <motion.span>{rounded}</motion.span>
      <span className="text-[#D4AF37]">{suffix}</span>
    </span>
  );
};

export const StatsStrip = () => {
  return (
    <section className="relative py-24 lg:py-32 px-6 lg:px-12 border-y border-white/5 overflow-hidden" data-testid="stats-section">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)]" />
      <div className="relative max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <span className="font-mono-accent text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">numbers we love</span>
          <h2 className="font-serif-display text-3xl md:text-4xl lg:text-5xl italic font-light mt-4 max-w-3xl mx-auto">
            <span className="text-gold-gradient">poetry, in figures.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="bg-[#050505] p-6 lg:p-8 flex flex-col items-start justify-between min-h-[200px] hover:bg-[#0a0a0a] transition-colors"
              data-testid={`stat-${i}`}
            >
              <span className="font-mono-accent text-[9px] uppercase tracking-[0.3em] text-zinc-500">№ {String(i + 1).padStart(2, "0")}</span>
              <div>
                <Counter value={s.v} suffix={s.suffix} />
                <p className="font-mono-accent text-[10px] uppercase tracking-[0.25em] text-zinc-400 mt-3">{s.l}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
