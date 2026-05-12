import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Mail, Instagram } from "lucide-react";
import { toast } from "sonner";

export const Footer = ({ onReserve }) => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const BACKEND = process.env.REACT_APP_BACKEND_URL;
      const res = await fetch(`${BACKEND}/api/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      toast.success("Welcome to the inner circle.");
      setEmail("");
    } catch {
      toast.error("Subscription failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="contact" className="relative bg-black border-t border-white/5 overflow-hidden" data-testid="footer-section">
      {/* Hero CTA strip */}
      <div className="relative border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08)_0%,transparent_60%)]" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-36 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-8"
          >
            <span className="font-mono-accent text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">epilogue</span>
            <h2 className="font-serif-display text-5xl md:text-6xl lg:text-7xl font-light leading-[1.02] mt-6">
              we keep <span className="italic text-gold-gradient">a light on</span>. <br />
              come find us.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-4 lg:text-right"
          >
            <button
              onClick={onReserve}
              className="bg-[#D4AF37] text-black px-8 py-4 font-mono-accent text-[11px] uppercase tracking-[0.3em] hover:bg-[#E5C865] transition w-full lg:w-auto"
              data-testid="footer-reserve-btn"
            >
              reserve your evening →
            </button>
          </motion.div>
        </div>
      </div>

      {/* Info grid */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div className="font-mono-accent text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] mb-4">visit</div>
          <p className="font-serif-display text-2xl leading-tight text-white">
            14 Mercer Street
            <br />
            SoHo, NY 10013
          </p>
          <a href="#" className="text-zinc-500 hover:text-[#D4AF37] text-sm mt-3 inline-flex items-center gap-2">
            <MapPin size={14} /> directions
          </a>
        </div>
        <div>
          <div className="font-mono-accent text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] mb-4">hours</div>
          <div className="space-y-2 text-zinc-400 text-sm">
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span>tue–thu</span><span className="text-white">18:00 – 22:30</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span>fri–sat</span><span className="text-white">18:00 – 23:30</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span>sun–mon</span><span className="text-zinc-600">closed</span>
            </div>
          </div>
        </div>
        <div>
          <div className="font-mono-accent text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] mb-4">contact</div>
          <div className="space-y-3 text-zinc-300">
            <a href="tel:+12125550193" className="flex items-center gap-2 hover:text-[#D4AF37] transition"><Phone size={14} /> +1 (212) 555-0193</a>
            <a href="mailto:concierge@noiretor.com" className="flex items-center gap-2 hover:text-[#D4AF37] transition"><Mail size={14} /> concierge@noiretor.com</a>
            <a href="#" className="flex items-center gap-2 hover:text-[#D4AF37] transition"><Instagram size={14} /> @noiretor</a>
          </div>
        </div>
        <div>
          <div className="font-mono-accent text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] mb-4">letters from the kitchen</div>
          <p className="text-zinc-500 text-sm mb-4 leading-relaxed">
            Once a season. Never a sale. Recipes, dispatches, the occasional secret.
          </p>
          <form onSubmit={subscribe} className="flex border border-white/10 focus-within:border-[#D4AF37] transition" data-testid="newsletter-form">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your address"
              className="flex-1 bg-transparent px-3 py-3 text-sm text-white font-light focus:outline-none placeholder:text-zinc-600"
              data-testid="newsletter-email"
            />
            <button type="submit" disabled={loading} className="bg-[#D4AF37] text-black px-4 font-mono-accent text-[10px] uppercase tracking-[0.25em] hover:bg-[#E5C865]" data-testid="newsletter-submit">
              {loading ? "…" : "join"}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border border-[#D4AF37]/60 rotate-45 flex items-center justify-center">
              <span className="-rotate-45 font-serif-display text-[#D4AF37] text-xs">N</span>
            </div>
            <span className="font-serif-display text-sm text-zinc-500">© 2025 Noir &amp; Or — All evenings reserved.</span>
          </div>
          <div className="font-mono-accent text-[9px] uppercase tracking-[0.3em] text-zinc-600">
            design · the silence between courses
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
