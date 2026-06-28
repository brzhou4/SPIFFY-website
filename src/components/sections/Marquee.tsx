const WORDS = [
  "STEM PAYS IT FORWARD",
  "BUILD",
  "DESIGN",
  "INNOVATE",
  "FOR THE YOUTH",
  "PROTOTYPE",
  "PITCH",
  "ENGINEER",
];

export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="relative overflow-hidden border-y border-black/10 bg-spiffy-ink py-5">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-2xl font-700 uppercase tracking-tight text-white/90 sm:text-3xl">
              {w}
            </span>
            <span className="h-2.5 w-2.5 rotate-45 bg-gradient-to-br from-spiffy-blue to-spiffy-navy" />
          </span>
        ))}
      </div>
    </div>
  );
}
