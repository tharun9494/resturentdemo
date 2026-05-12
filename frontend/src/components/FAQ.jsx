import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "How far in advance should I reserve?",
    a: "Tasting menu reservations open precisely three months ahead at 09:00 EST on the first of each month. Cancellations occasionally release seats — our newsletter subscribers are notified first. Walk-ins are not accepted; we are not built for them.",
  },
  {
    q: "Is there a dress code?",
    a: "Smart attire. We trust your taste. We will turn away gym shorts and graphic tees — not out of snobbery, but out of respect for the room and for the guests who travelled six hours to be here.",
  },
  {
    q: "Can the menu accommodate allergies, vegetarian, or vegan diets?",
    a: "Yes, with 48 hours notice. Chef Aurelio personally composes parallel menus for vegetarian, vegan, pescatarian, gluten-free, and allium-free guests. We cannot accommodate dietary changes on the night of service.",
  },
  {
    q: "Do you offer wine pairings?",
    a: "Six-pour pairing is $145, drawn from our 1,049-bottle cellar. A non-alcoholic pairing — house-fermented teas, broths, and elixirs — is $85. We strongly recommend either; the menu is designed to be tasted with the cellar.",
  },
  {
    q: "Is the restaurant suitable for children?",
    a: "Guests under 12 are not permitted in the dining room during service. We offer private buyouts for family gatherings; please write to events@noiretor.com.",
  },
  {
    q: "What is the deposit & cancellation policy?",
    a: "A $50 per-guest deposit secures your booking. Cancellations honoured up to 48 hours prior; within 48 hours the deposit is retained. We are a twelve-seat house — every empty chair is a loss.",
  },
  {
    q: "Do you cater or offer private events?",
    a: "The dining room is available for private buyouts on Mondays. We do not cater off-premises — the binchotan, the cellar, and the rhythm of the room cannot travel.",
  },
  {
    q: "Is photography allowed?",
    a: "Discreet phone photography is welcome. We ask that flash, ring lights, and tripods stay home. We are not a stage.",
  },
];

export const FAQ = () => {
  const [open, setOpen] = React.useState(0);

  return (
    <section className="relative py-32 lg:py-48 px-6 lg:px-12 bg-[#080808] overflow-hidden" data-testid="faq-section">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono-accent text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">chapter vi</span>
            <div className="w-12 h-px bg-[#D4AF37]/40" />
          </div>
          <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]">
            things <br />
            you should <br />
            <span className="italic text-gold-gradient">probably know.</span>
          </h2>
          <p className="text-zinc-400 leading-relaxed mt-8 max-w-sm">
            For everything else, write us. We answer every letter within twelve hours.
          </p>
          <a
            href="mailto:concierge@noiretor.com"
            className="inline-block mt-6 font-mono-accent text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] gold-link"
            data-testid="faq-email-link"
          >
            concierge@noiretor.com
          </a>
        </motion.div>

        <div className="lg:col-span-8 space-y-px bg-white/5">
          {FAQS.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="bg-[#070707]"
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between text-left p-6 lg:p-8 hover:bg-white/[0.02] transition-colors group"
                data-testid={`faq-question-${i}`}
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono-accent text-[10px] tracking-[0.3em] text-[#D4AF37]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif-display text-xl lg:text-2xl text-white group-hover:text-[#D4AF37] transition-colors">
                    {f.q}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex-shrink-0 ml-4"
                >
                  <Plus size={20} className="text-[#D4AF37]" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 lg:px-8 pb-8 pl-16 lg:pl-[88px]">
                      <p className="text-zinc-400 leading-relaxed max-w-2xl" data-testid={`faq-answer-${i}`}>
                        {f.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
