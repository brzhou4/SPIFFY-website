import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { PHOTOS } from "@/lib/photos";
import Reveal from "@/components/Reveal";

// Curated slices across the full set so each strip looks distinct.
const STRIP = PHOTOS.filter((_, i) => i % 3 === 0).slice(0, 16);
const SPRING = { stiffness: 55, damping: 22, mass: 0.5 };

export default function ScrollGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Drive a smooth horizontal slide across the pinned viewport
  const xPct = useSpring(useTransform(scrollYProgress, [0, 1], [2, -72]), SPRING);
  const x = useMotionTemplate`${xPct}%`;
  const titlePct = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 12]),
    SPRING
  );
  const titleX = useMotionTemplate`${titlePct}%`;

  return (
    <section id="gallery" className="relative bg-spiffy-ink text-white">
      {/* Intro */}
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-12 sm:pt-36">
        <Reveal>
          <span className="text-sm font-700 uppercase tracking-[0.22em] text-spiffy-blue">
            Moments
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-700 leading-[1.05] tracking-tight sm:text-6xl">
            This is what{" "}
            <span className="text-gradient-anim animate-gradient-pan">
              paying it forward
            </span>{" "}
            actually looks like.
          </h2>
        </Reveal>
      </div>

      {/* Pinned horizontal scroll strip */}
      <div ref={ref} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <motion.h3
            style={{ x: titleX }}
            className="pointer-events-none mb-8 px-6 font-display text-[10vw] font-700 leading-none text-white/5"
          >
            IN THE LAB
          </motion.h3>
          <motion.div style={{ x }} className="flex gap-5 px-6 will-change-transform">
            {STRIP.map((src, i) => (
              <figure
                key={src}
                className="group relative h-[58vh] w-[clamp(260px,42vw,560px)] shrink-0 overflow-hidden rounded-3xl bg-white/5"
              >
                <img
                  src={src}
                  alt={`SPIFFY workshop moment ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <figcaption className="absolute bottom-5 left-5 font-display text-sm font-600 uppercase tracking-[0.18em] text-white/80">
                  {String(i + 1).padStart(2, "0")} / Field Notes
                </figcaption>
              </figure>
            ))}
          </motion.div>
          <p className="mt-8 px-6 text-sm font-500 text-white/40">
            Keep scrolling — the lab moves sideways.
          </p>
        </div>
      </div>
    </section>
  );
}
