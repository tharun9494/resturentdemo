import React from "react";
import { motion } from "framer-motion";

const DISHES = [
  {
    n: "01",
    name: "Charred Hokkaido Scallop",
    notes: "burnt butter · yuzu kosho · sea grape",
    course: "prelude",
    img: "https://images.pexels.com/photos/32525175/pexels-photo-32525175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=940",
    span: "lg:col-span-7 lg:row-span-2",
  },
  {
    n: "02",
    name: "A5 Wagyu, Bone Marrow",
    notes: "binchotan-grilled · smoked salt · charred shallot",
    course: "fire",
    img: "https://images.unsplash.com/photo-1755811248279-1ab13b7d4384?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBsYXRpbmd8ZW58MHx8fHwxNzc4NTYzMjA4fDA&ixlib=rb-4.1.0&q=85",
    span: "lg:col-span-5",
  },
  {
    n: "03",
    name: "Molten Valrhona Soufflé",
    notes: "70% guanaja · vanilla bourbon · gold leaf",
    course: "finale",
    img: "https://images.pexels.com/photos/34712610/pexels-photo-34712610.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=940",
    span: "lg:col-span-5",
  },
];

export const Signature = ({ onReserve }) => {
  return (
    <section id="gallery" className="relative py-32 lg:py-48 px-6 lg:px-12 bg-[#080808] overflow-hidden" data-testid="signature-section">
      {/* Section header */}
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20"
        >
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono-accent text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">chapter ii</span>
              <div className="w-12 h-px bg-[#D4AF37]/40" />
            </div>
            <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]">
              three dishes <br />
              <span className="italic text-gold-gradient">that defined us.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-12">
            <p className="text-zinc-400 leading-relaxed max-w-xl">
              The menu changes every fortnight, but these three have remained, in some form,
              since opening night. They are our compass.
            </p>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 grid-rows-1 lg:grid-rows-2 gap-6 lg:gap-8 min-h-[800px]">
          {DISHES.map((d, i) => (
            <motion.article
              key={d.n}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`relative group overflow-hidden border border-white/5 hover:border-[#D4AF37]/40 transition-all duration-700 cursor-pointer ${d.span}`}
              data-testid={`signature-dish-${d.n}`}
            >
              <img
                src={d.img}
                alt={d.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              {/* Gold tracing line on hover */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-700" />
                <div className="absolute bottom-0 right-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-700 delay-150" />
              </div>

              <div className="relative h-full min-h-[280px] flex flex-col justify-between p-6 lg:p-10">
                <div className="flex items-start justify-between">
                  <span className="font-mono-accent text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]">№ {d.n} · {d.course}</span>
                  <div className="w-8 h-8 border border-white/30 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black flex items-center justify-center transition-all rotate-45">
                    <span className="-rotate-45 text-xs">→</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-serif-display text-2xl lg:text-3xl text-white leading-tight max-w-md">
                    {d.name}
                  </h3>
                  <p className="font-mono-accent text-[10px] uppercase tracking-[0.25em] text-zinc-400 mt-3">
                    {d.notes}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-white/5 pt-10"
        >
          <p className="font-serif-display text-2xl italic text-zinc-300">
            "every plate is a love letter to a place that no longer exists."
          </p>
          <button
            onClick={onReserve}
            className="bg-transparent border border-[#D4AF37] text-[#D4AF37] px-6 py-3 font-mono-accent text-[11px] uppercase tracking-[0.3em] hover:bg-[#D4AF37] hover:text-black transition-all"
            data-testid="signature-reserve-btn"
          >
            reserve the table
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Signature;
