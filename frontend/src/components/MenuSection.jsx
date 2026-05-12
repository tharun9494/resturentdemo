import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const COURSES = [
  { id: "prelude", title: "Prelude", subtitle: "openings & amuse-bouche", roman: "i" },
  { id: "earth", title: "Earth", subtitle: "soil, roots, mushrooms", roman: "ii" },
  { id: "fire", title: "Fire", subtitle: "hearth, smoke, char", roman: "iii" },
  { id: "finale", title: "Finale", subtitle: "sweet, bitter, gold", roman: "iv" },
];

export const MenuSection = () => {
  const [active, setActive] = React.useState("prelude");
  const [items, setItems] = React.useState({});

  React.useEffect(() => {
    const BACKEND = process.env.REACT_APP_BACKEND_URL;
    fetch(`${BACKEND}/api/menu`)
      .then((r) => r.json())
      .then(setItems)
      .catch(() => {});
  }, []);

  const courseItems = items[active] || [];

  return (
    <section id="menu" className="relative py-32 lg:py-48 px-6 lg:px-12 overflow-hidden" data-testid="menu-section">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#D4AF37]/40" />
            <span className="font-mono-accent text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">chapter iii</span>
            <div className="w-12 h-px bg-[#D4AF37]/40" />
          </div>
          <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]">
            the winter <span className="italic text-gold-gradient">tasting</span>
          </h2>
          <p className="text-zinc-400 mt-6 leading-relaxed">
            nine courses · $285 per guest · wine pairing $145 supplement
          </p>
        </motion.div>

        {/* Course tabs */}
        <div className="flex flex-wrap justify-center gap-2 lg:gap-4 mb-16 border-y border-white/5 py-6">
          {COURSES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`group px-6 py-3 transition-all relative ${
                active === c.id ? "text-[#D4AF37]" : "text-zinc-500 hover:text-white"
              }`}
              data-testid={`course-tab-${c.id}`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono-accent text-[9px] uppercase tracking-[0.3em]">{c.roman}</span>
                <span className="font-serif-display text-xl italic">{c.title}</span>
              </div>
              {active === c.id && (
                <motion.div
                  layoutId="activeCourse"
                  className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-center font-mono-accent text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-10">
              {COURSES.find((c) => c.id === active)?.subtitle}
            </p>

            <div className="divide-y divide-white/5">
              {courseItems.map((it, i) => (
                <motion.div
                  key={it.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group grid grid-cols-12 gap-6 py-8 hover:bg-white/[0.02] px-4 lg:px-6 transition-colors"
                  data-testid={`menu-item-${i}`}
                >
                  <div className="col-span-1 font-mono-accent text-[10px] text-[#D4AF37] pt-2">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="col-span-12 sm:col-span-8 lg:col-span-9">
                    <h3 className="font-serif-display text-2xl lg:text-3xl text-white group-hover:text-[#D4AF37] transition-colors">
                      {it.name}
                    </h3>
                    <p className="font-mono-accent text-[10px] uppercase tracking-[0.25em] text-zinc-500 mt-2">
                      {it.notes}
                    </p>
                  </div>
                  <div className="col-span-12 sm:col-span-3 lg:col-span-2 flex sm:justify-end items-start pt-2">
                    <span className="font-serif-display text-xl text-[#D4AF37]">${it.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="text-center font-mono-accent text-[10px] uppercase tracking-[0.3em] text-zinc-600 mt-16">
          dietary requests honored with 48h notice · please inform us of allergies
        </p>
      </div>
    </section>
  );
};

export default MenuSection;
