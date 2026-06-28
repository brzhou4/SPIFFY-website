import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { PHOTOS } from "@/lib/photos";
import Reveal from "@/components/Reveal";

const STATS = [
  { value: 3, suffix: "", label: "Syllabi developed" },
  { value: 5, suffix: "+", label: "Community partners" },
  { value: 400, suffix: "+", label: "Students impacted" },
  { value: 1, suffix: "", label: "Mission: pay it forward", isText: "∞" },
];

function Counter({
  value,
  prefix = "",
  suffix = "",
  isText,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  isText?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || isText) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, isText]);

  return (
    <span ref={ref} className="text-gradient">
      {isText ? isText : `${prefix}${n}${suffix}`}
    </span>
  );
}

export default function Impact() {
  return (
    <section id="impact" className="relative overflow-hidden bg-spiffy-ink py-28 text-white sm:py-36">
      <img
        src={PHOTOS[95]}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-spiffy-ink via-spiffy-ink/85 to-spiffy-ink" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <span className="text-sm font-700 uppercase tracking-[0.22em] text-spiffy-blue">
            The Ripple Effect
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-4xl font-display text-4xl font-700 leading-[1.05] tracking-tight sm:text-6xl">
            Small hands. Big builds. A debt of knowledge, paid forward.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.08 * i}>
              <div className="border-l border-white/15 pl-6">
                <div className="font-display text-5xl font-700 tracking-tight sm:text-6xl">
                  <Counter
                    value={s.value}
                    suffix={s.suffix}
                    isText={s.isText}
                  />
                </div>
                <p className="mt-3 text-sm font-500 text-white/60">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
