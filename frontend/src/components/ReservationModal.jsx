import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { toast } from "sonner";

const TIMES = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

export const ReservationModal = ({ open, onClose }) => {
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "19:30",
    guests: 2,
    occasion: "",
    notes: "",
  });

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const BACKEND = process.env.REACT_APP_BACKEND_URL;
      const res = await fetch(`${BACKEND}/api/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setSuccess(true);
      toast.success("Reservation request received. We will write to you shortly.");
    } catch (err) {
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setSuccess(false);
    setForm({
      name: "", email: "", phone: "", date: "",
      time: "19:30", guests: 2, occasion: "", notes: "",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8 bg-black/80 backdrop-blur-md"
          onClick={reset}
          data-testid="reservation-modal"
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-[#D4AF37]/30 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 backdrop-blur-2xl bg-black/60 border-b border-white/5 px-8 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono-accent text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">reserve</span>
                <span className="w-8 h-px bg-[#D4AF37]/40" />
                <span className="font-serif-display italic text-zinc-400">your table</span>
              </div>
              <button onClick={reset} className="text-zinc-500 hover:text-white transition" data-testid="close-reservation">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 lg:p-12">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                  data-testid="reservation-success"
                >
                  <div className="w-20 h-20 mx-auto border border-[#D4AF37] flex items-center justify-center rotate-45 mb-8">
                    <Check className="-rotate-45 text-[#D4AF37]" size={30} />
                  </div>
                  <h3 className="font-serif-display text-3xl lg:text-4xl mb-4">
                    until then, <span className="italic text-gold-gradient">{form.name.split(" ")[0] || "dear guest"}</span>.
                  </h3>
                  <p className="text-zinc-400 max-w-md mx-auto leading-relaxed">
                    Your request for {form.guests} {form.guests === 1 ? "guest" : "guests"} on {form.date} at {form.time}
                    {" "}has been received. We will confirm by email within four hours.
                  </p>
                  <button
                    onClick={reset}
                    className="mt-10 bg-[#D4AF37] text-black px-6 py-3 font-mono-accent text-[10px] uppercase tracking-[0.3em] hover:bg-[#E5C865] transition"
                    data-testid="success-close-btn"
                  >
                    close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="space-y-6" data-testid="reservation-form">
                  <h3 className="font-serif-display text-3xl lg:text-4xl leading-tight">
                    a table for <span className="italic text-gold-gradient">two, three, twelve.</span>
                  </h3>
                  <p className="text-zinc-500 text-sm">
                    Tell us the night. We do the rest.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
                    <Field label="name" required value={form.name} onChange={(v) => update("name", v)} testid="res-name" />
                    <Field label="email" type="email" required value={form.email} onChange={(v) => update("email", v)} testid="res-email" />
                    <Field label="phone" required value={form.phone} onChange={(v) => update("phone", v)} testid="res-phone" />
                    <Field label="guests" type="number" min={1} max={12} required value={form.guests} onChange={(v) => update("guests", parseInt(v) || 1)} testid="res-guests" />
                    <Field label="date" type="date" required value={form.date} onChange={(v) => update("date", v)} testid="res-date" />

                    <div>
                      <label className="block font-mono-accent text-[9px] uppercase tracking-[0.3em] text-zinc-500 mb-2">time</label>
                      <select
                        value={form.time}
                        onChange={(e) => update("time", e.target.value)}
                        className="w-full bg-black/60 border border-white/10 focus:border-[#D4AF37] focus:outline-none px-4 py-3 text-white font-light"
                        data-testid="res-time"
                      >
                        {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <Field label="occasion (optional)" value={form.occasion} onChange={(v) => update("occasion", v)} testid="res-occasion" />

                  <div>
                    <label className="block font-mono-accent text-[9px] uppercase tracking-[0.3em] text-zinc-500 mb-2">
                      special requests / allergies
                    </label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      rows={3}
                      className="w-full bg-black/60 border border-white/10 focus:border-[#D4AF37] focus:outline-none px-4 py-3 text-white font-light resize-none"
                      data-testid="res-notes"
                    />
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-white/5">
                    <p className="text-zinc-500 text-xs leading-relaxed">
                      Reservations require a $50/guest deposit. Cancellations honoured up to 48h prior.
                    </p>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-[#D4AF37] text-black px-8 py-4 font-mono-accent text-[11px] uppercase tracking-[0.3em] hover:bg-[#E5C865] transition disabled:opacity-50"
                      data-testid="submit-reservation"
                    >
                      {submitting ? "requesting…" : "request reservation →"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Field = ({ label, value, onChange, type = "text", required, min, max, testid }) => (
  <div>
    <label className="block font-mono-accent text-[9px] uppercase tracking-[0.3em] text-zinc-500 mb-2">{label}</label>
    <input
      type={type}
      required={required}
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-black/60 border border-white/10 focus:border-[#D4AF37] focus:outline-none px-4 py-3 text-white font-light"
      data-testid={testid}
    />
  </div>
);

export default ReservationModal;
