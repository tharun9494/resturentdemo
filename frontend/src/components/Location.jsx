import React from "react";
import { motion } from "framer-motion";
import { MapPin, Train, ParkingCircle } from "lucide-react";

export const Location = () => {
  return (
    <section className="relative py-32 lg:py-48 px-6 lg:px-12 overflow-hidden" data-testid="location-section">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-16"
        >
          <div className="lg:col-span-6">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono-accent text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">chapter vii</span>
              <div className="w-12 h-px bg-[#D4AF37]/40" />
            </div>
            <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]">
              an unmarked door <br />
              <span className="italic text-gold-gradient">on mercer street.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pt-12">
            <p className="text-zinc-400 leading-relaxed">
              There is no sign. Look for the black townhouse with one small gold star above the
              bell. Press it. If you have a reservation, the door will open. If you do not — write us.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px] overflow-hidden border border-white/10"
          >
            <iframe
              title="Noir & Or location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.085!2d-74.001!3d40.722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQzJzE5LjIiTiA3NMKwMDAnMDMuNiJX!5e0!3m2!1sen!2sus!4v0"
              className="absolute inset-0 w-full h-full grayscale invert opacity-80"
              style={{ filter: "grayscale(1) invert(0.92) hue-rotate(180deg) brightness(1.1) contrast(0.9)" }}
              loading="lazy"
              data-testid="location-map"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/40 via-transparent to-black/40" />
            <div className="absolute top-6 left-6 right-6 flex items-start justify-between font-mono-accent text-[9px] uppercase tracking-[0.3em] text-[#D4AF37]/70 pointer-events-none">
              <span>40.7128° N</span>
              <span>74.0060° W</span>
            </div>
            <div className="absolute bottom-6 left-6 pointer-events-none">
              <div className="flex items-center gap-2 bg-black/80 backdrop-blur-sm border border-[#D4AF37]/30 px-4 py-2">
                <MapPin size={14} className="text-[#D4AF37]" />
                <span className="font-mono-accent text-[10px] uppercase tracking-[0.3em]">14 mercer st · soho</span>
              </div>
            </div>
          </motion.div>

          {/* Info cards */}
          <div className="lg:col-span-5 space-y-px bg-white/5">
            {[
              {
                icon: Train,
                title: "transit",
                lines: ["6 train — Spring St (3 min walk)", "N · Q · R · W — Canal St (5 min walk)", "B · D · F · M — Broadway-Lafayette (6 min)"],
              },
              {
                icon: ParkingCircle,
                title: "parking",
                lines: ["Icon Parking — 161 Mercer (4 min)", "ProPark — Crosby Street (6 min)", "Valet service available Fri & Sat from 17:30"],
              },
              {
                icon: MapPin,
                title: "the door",
                lines: ["unmarked black townhouse", "single gold star above the bell", "if the door is closed, you are not late — we are early"],
              },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="bg-[#070707] p-8 group hover:bg-[#0c0c0c] transition-colors"
                data-testid={`location-info-${c.title}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <c.icon size={18} className="text-[#D4AF37]" strokeWidth={1.3} />
                  <span className="font-mono-accent text-[10px] uppercase tracking-[0.3em] text-zinc-400">{c.title}</span>
                </div>
                <div className="space-y-2">
                  {c.lines.map((l, j) => (
                    <p key={j} className="text-zinc-300 leading-relaxed text-sm">{l}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
