import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, X } from "lucide-react";

const STARTERS = [
  "What pairs well with the Wagyu?",
  "Surprise me with a dessert.",
  "I'm vegetarian — guide me.",
  "Tell me about the soufflé.",
];

export const ChefChat = ({ open, onClose }) => {
  const [messages, setMessages] = React.useState([
    {
      role: "assistant",
      content:
        "Welcome to Noir & Or. I am Maître Aurelio — happy to guide your evening. Tell me your mood, your hunger, your dietary geometry, and I shall compose your tasting.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [sessionId, setSessionId] = React.useState(null);
  const endRef = React.useRef(null);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const message = (text ?? input).trim();
    if (!message || loading) return;
    setMessages((m) => [...m, { role: "user", content: message }]);
    setInput("");
    setLoading(true);
    try {
      const BACKEND = process.env.REACT_APP_BACKEND_URL;
      const res = await fetch(`${BACKEND}/api/chef/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, session_id: sessionId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "failed");
      setSessionId(data.session_id);
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Forgive me — the kitchen is briefly silent. Please try again in a moment, or call us at +1 (212) 555-0193.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-[90] w-[calc(100vw-3rem)] sm:w-[420px] lg:w-[460px] max-h-[80vh] flex flex-col bg-[#0a0a0a]/95 backdrop-blur-2xl border border-[#D4AF37]/30 shadow-[0_20px_70px_rgba(0,0,0,0.7)]"
          data-testid="chef-chat-panel"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 border border-[#D4AF37]/60 rotate-45 flex items-center justify-center bg-black">
                  <Sparkles className="-rotate-45 text-[#D4AF37]" size={16} />
                </div>
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#D4AF37] rounded-full gold-pulse" />
              </div>
              <div>
                <div className="font-serif-display text-lg leading-none">Maître Aurelio</div>
                <div className="font-mono-accent text-[9px] uppercase tracking-[0.3em] text-[#D4AF37]/70 mt-1">ai sommelier · always in</div>
              </div>
            </div>
            <button onClick={onClose} className="text-zinc-400 hover:text-white" data-testid="close-chef-chat">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4" data-testid="chef-messages">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 leading-relaxed text-sm ${
                    m.role === "user"
                      ? "bg-[#D4AF37] text-black"
                      : "bg-white/5 text-zinc-200 border border-white/5"
                  }`}
                >
                  {m.role === "assistant" && (
                    <div className="font-mono-accent text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] mb-2">
                      maître aurelio
                    </div>
                  )}
                  <p className="whitespace-pre-wrap font-light">{m.content}</p>
                </div>
              </motion.div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/5 px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Starters */}
          {messages.length <= 1 && (
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {STARTERS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => send(s)}
                  className="text-[10px] uppercase tracking-[0.2em] font-mono-accent border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] text-zinc-400 px-3 py-2 transition"
                  data-testid={`chat-starter-${i}`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="border-t border-white/5 p-3 flex items-center gap-2 bg-black/30"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="speak to the chef…"
              className="flex-1 bg-transparent text-white text-sm font-light px-3 py-3 focus:outline-none placeholder:text-zinc-600"
              data-testid="chef-chat-input"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-[#D4AF37] text-black w-11 h-11 flex items-center justify-center hover:bg-[#E5C865] transition disabled:opacity-30"
              data-testid="chef-chat-send"
            >
              <Send size={16} />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ChefChatFAB = ({ onClick, open }) => (
  <button
    onClick={onClick}
    className={`fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-[80] w-14 h-14 lg:w-16 lg:h-16 bg-[#D4AF37] text-black rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:bg-[#E5C865] transition-all flex items-center justify-center gold-pulse ${
      open ? "opacity-0 pointer-events-none scale-90" : "opacity-100"
    }`}
    data-testid="chef-chat-fab"
    aria-label="Ask the chef"
  >
    <Sparkles size={22} />
  </button>
);

export default ChefChat;
