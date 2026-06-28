import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  MotionValue,
} from "framer-motion";
import { PHOTOS } from "@/lib/photos";

const SPRING = { stiffness: 55, damping: 24, mass: 0.5 };

// Three columns, each a different slice of the photo set.
const POOL = PHOTOS.filter((_, i) => i % 2 === 1);
const COLS = [
  POOL.slice(10, 16),
  POOL.slice(30, 36),
  POOL.slice(50, 56),
];

function Column({
  imgs,
  y,
  rounded,
}: {
  imgs: string[];
  y: MotionValue<string>;
  rounded?: boolean;
}) {
  return (
    <motion.div style={{ y }} className="flex flex-col gap-5 will-change-transform">
      {imgs.map((src, i) => (
        <figure
          key={src}
          className={`group overflow-hidden ${
            rounded ? "rounded-[2rem]" : "rounded-2xl"
          } bg-black/5`}
        >
          <img
            src={src}
            alt={`SPIFFY students at work ${i + 1}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </figure>
      ))}
    </motion.div>
  );
}

export default function ParallaxGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Each column drifts at a different rate for depth, spring-smoothed.
  const yA = useMotionTemplate`${useSpring(
    useTransform(scrollYProgress, [0, 1], [6, -16]),
    SPRING
  )}%`;
  const yB = useMotionTemplate`${useSpring(
    useTransform(scrollYProgress, [0, 1], [-10, 14]),
    SPRING
  )}%`;
  const yC = useMotionTemplate`${useSpring(
    useTransform(scrollYProgress, [0, 1], [3, -22]),
    SPRING
  )}%`;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h3 className="max-w-2xl font-display text-3xl font-700 tracking-tight sm:text-5xl">
            Curiosity, captured mid-build.
          </h3>
          <p className="max-w-sm text-sm leading-relaxed text-spiffy-ink/60">
            Real students, real prototypes, real glue everywhere. Scroll to let
            the moments drift past.
          </p>
        </div>

        <div className="mask-fade-y grid grid-cols-2 gap-5 md:grid-cols-3">
          <Column imgs={COLS[0]} y={yA} rounded />
          <Column imgs={COLS[1]} y={yB} />
          {/* Third column hidden on small screens to keep height sane */}
          <div className="hidden md:block">
            <Column imgs={COLS[2]} y={yC} rounded />
          </div>
        </div>
      </div>
    </section>
  );
}
