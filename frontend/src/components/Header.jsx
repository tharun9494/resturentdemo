import React from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export const Header = ({ onReserve }) => {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Story", href: "#story" },
    { label: "Menu", href: "#menu" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-2xl bg-black/50 border-b border-white/5" : "bg-transparent"
      }`}
      data-testid="site-header"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group" data-testid="logo-link">
          <div className="w-9 h-9 border border-[#E6C998]/60 rotate-45 flex items-center justify-center group-hover:rotate-[225deg] transition-transform duration-700">
            <span className="-rotate-45 group-hover:rotate-[-225deg] transition-transform duration-700 font-serif-display text-[#E6C998] text-lg">N</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif-display text-xl tracking-wide">Noir & Or</span>
            <span className="font-mono-accent text-[9px] uppercase tracking-[0.3em] text-[#E6C998]/70 mt-1">est. mmxxv</span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="gold-link font-mono-accent text-[11px] uppercase tracking-[0.28em] text-zinc-300 hover:text-white transition-colors"
              data-testid={`nav-${l.label.toLowerCase()}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onReserve}
            className="group relative overflow-hidden bg-[#E6C998] text-black px-6 py-3 font-mono-accent text-[11px] uppercase tracking-[0.28em] hover:bg-[#F4E2AA] transition-colors"
            data-testid="header-reserve-btn"
          >
            <span className="relative z-10">Reserve a Table</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)} data-testid="mobile-menu-btn">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden bg-black/95 border-t border-white/5 backdrop-blur-2xl"
        >
          <div className="px-6 py-8 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-mono-accent text-xs uppercase tracking-[0.28em] text-zinc-300"
                data-testid={`mobile-nav-${l.label.toLowerCase()}`}
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => { setOpen(false); onReserve(); }}
              className="mt-4 bg-[#E6C998] text-black px-6 py-3 font-mono-accent text-[11px] uppercase tracking-[0.28em]"
              data-testid="mobile-reserve-btn"
            >
              Reserve a Table
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
