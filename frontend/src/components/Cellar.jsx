import React from "react";
import { motion } from "framer-motion";
import { Wine } from "lucide-react";

const REGIONS = [
  { region: "Burgundy, FR", year: "1996–2018", count: 247, focus: "Domaine de la Romanée-Conti, Leflaive, Coche-Dury", color: "#8B0000" },
  { region: "Piedmont, IT", year: "1990–2020", count: 184, focus: "Conterno, Mascarello, Vajra, Bartolo", color: "#4A0E1A" },
  { region: "Mosel, DE", year: "1971–2022", count: 96, focus: "Egon Müller, Joh. Jos. Prüm, Keller", color: "#1B4332" },
  { region: "Napa Valley, US", year: "1985–2021", count: 132, focus: "Screaming Eagle, Harlan, Ridge", color: "#3D0000" },
  { region: "Champagne, FR", year: "non-vintage to '08", count: 312, focus: "Krug, Salon, Selosse, Egly-Ouriet", color: "#D4AF37" },
  { region: "Rhône Valley, FR", year: "1989–2019", count: 78, focus: "Rayas, Beaucastel, Guigal La La's", color: "#4A0E1A" },
];

export const Cellar = () => {
  const [active, setActive] = React.useState(0);
  const r = REGIONS[active];
  const total = REGIONS.reduce((s, x) => s + x.count, 0);

  return (
    <section className="relative py-32 lg:py-48 px-6 lg:px-12 overflow-hidden border-t border-white/5" data-testid="cellar-section">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end"
        >
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono-accent text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">chapter v</span>
              <div className="w-12 h-px bg-[#D4AF37]/40" />
            </div>
            <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]">
              {total.toLocaleString()} bottles. <br />
              <span className="italic text-gold-gradient">one quiet cellar.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-zinc-400 leading-relaxed">
              Curated over twelve years by sommelier <span className="text-white">Hélène Marchand</span>.
              Our cellar runs three floors below Mercer Street, holding {total.toLocaleString()} bottles
              across six regions. The oldest predates color television.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Region selector */}
          <div className="lg:col-span-5 space-y-1 border-y border-white/5">
            {REGIONS.map((reg, i) => (
              <button
                key={reg.region}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`w-full text-left px-4 py-5 border-b border-white/5 last:border-b-0 transition-all group relative overflow-hidden ${
                  active === i ? "bg-white/[0.03]" : "hover:bg-white/[0.02]"
                }`}
                data-testid={`cellar-region-${i}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className={`font-mono-accent text-[10px] tracking-[0.3em] transition-colors ${
                      active === i ? "text-[#D4AF37]" : "text-zinc-600"
                    }`}>
                      0{i + 1}
                    </span>
                    <div>
                      <div className={`font-serif-display text-2xl lg:text-3xl transition-colors ${
                        active === i ? "text-white" : "text-zinc-400"
                      }`}>
                        {reg.region}
                      </div>
                      <div className="font-mono-accent text-[9px] uppercase tracking-[0.3em] text-zinc-600 mt-1">
                        {reg.year}
                      </div>
                    </div>
                  </div>
                  <div className={`font-serif-display text-xl transition-colors ${
                    active === i ? "text-[#D4AF37]" : "text-zinc-700"
                  }`}>
                    {reg.count}
                  </div>
                </div>
                {active === i && (
                  <motion.div
                    layoutId="cellarBar"
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#D4AF37]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 relative bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/5 p-10 lg:p-14 min-h-[480px] flex flex-col justify-between overflow-hidden"
          >
            {/* Decorative wine glass icon */}
            <div className="absolute -right-8 -bottom-8 opacity-[0.04]">
              <Wine size={280} strokeWidth={0.5} style={{ color: r.color }} />
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 rotate-45" style={{ backgroundColor: r.color, boxShadow: `0 0 20px ${r.color}` }} />
                <span className="font-mono-accent text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]">{r.year}</span>
              </div>
              <div className="font-serif-display text-6xl lg:text-8xl text-white font-light leading-[0.9] mb-6">
                {r.count}
              </div>
              <div className="font-mono-accent text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                bottles · {r.region}
              </div>
            </div>

            <div className="relative">
              <div className="font-mono-accent text-[9px] uppercase tracking-[0.3em] text-zinc-600 mb-3">featured estates</div>
              <p className="font-serif-display text-2xl lg:text-3xl italic text-zinc-200 leading-snug">
                {r.focus}.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Pairing note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 border-t border-white/5 pt-12"
        >
          {[
            { v: "1,049", l: "total bottles" },
            { v: "1971", l: "oldest vintage" },
            { v: "6", l: "regions" },
            { v: "$145", l: "pairing supplement" },
          ].map((s, i) => (
            <div key={i} className="border-l border-[#D4AF37]/20 pl-4 lg:pl-6">
              <div className="font-serif-display text-3xl lg:text-4xl text-white">{s.v}</div>
              <div className="font-mono-accent text-[9px] uppercase tracking-[0.3em] text-zinc-500 mt-2">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Cellar;
