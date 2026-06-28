import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Mission", href: "#mission" },
  { label: "Moments", href: "#gallery" },
  { label: "Workshops", href: "#workshops" },
  { label: "Impact", href: "#impact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  // While the blue hero fills the viewport, keep nav accents blue.
  const [overHero, setOverHero] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setOverHero(window.scrollY < window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <img
            src="/spiffy-logo.png"
            alt="SPIFFY"
            className="h-10 w-10 rounded-xl object-cover ring-1 ring-black/5"
          />
          <span className="font-display text-xl font-700 tracking-tight">
            SPIFFY
            <span
              className={cn(
                "ml-2 hidden text-xs font-500 uppercase tracking-[0.2em] sm:inline transition-colors",
                overHero ? "text-blue-700" : "text-spiffy-navy"
              )}
            >
              STEAM For All
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-600 text-spiffy-ink/70 transition-colors hover:text-spiffy-ink"
            >
              {l.label}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full",
                  overHero
                    ? "bg-gradient-to-r from-blue-600 to-blue-900"
                    : "bg-gradient-to-r from-spiffy-blue to-spiffy-navy"
                )}
              />
            </a>
          ))}
          <a
            href="#join"
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-700 text-white shadow-lg transition-all duration-500 hover:scale-[1.04]",
              overHero
                ? "bg-gradient-to-r from-blue-600 to-blue-900 shadow-blue-600/20"
                : "bg-gradient-to-r from-spiffy-blue to-spiffy-navy shadow-spiffy-navy/20"
            )}
          >
            Get Involved
          </a>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-black/5 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-600 text-spiffy-ink/80 hover:bg-black/5"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#join"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-gradient-to-r from-spiffy-blue to-spiffy-navy px-5 py-3 text-center font-700 text-white"
              >
                Get Involved
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
