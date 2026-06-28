import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import CyberneticGridShader from "@/components/ui/cybernetic-grid-shader";
import SafeBoundary from "@/components/SafeBoundary";

const LETTERS = ["S", "P", "I", "F", "F", "Y"];
const SPRING = { stiffness: 55, damping: 22, mass: 0.45 };

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax: the wordmark drifts up and fades as you scroll away.
  // Springs smooth the scroll-driven values so motion never feels steppy.
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -120]), SPRING);
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.7], [1, 0]),
    SPRING
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 1], [1, 1.08]),
    SPRING
  );

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-gradient-to-b from-white via-[#eaf2fc] to-[#dbe8f8]"
    >
      {/* Interactive WebGL grid — blue to match the logo (degrades gracefully) */}
      <div className="absolute inset-0">
        <SafeBoundary fallback={<div className="shader-fallback h-full w-full" />}>
          <CyberneticGridShader
            contained
            lineColor={[0.149, 0.388, 0.922]}
            pulseColor={[0.231, 0.51, 0.965]}
          />
        </SafeBoundary>
      </div>
      {/* Soft vignette so text stays legible */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,#eaf2fc_92%)]" />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-1.5 text-xs font-700 uppercase tracking-[0.22em] text-spiffy-ink/70 backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
          STEAM Pays It Forward
        </motion.div>

        <h1 className="font-display text-[20vw] font-700 leading-[0.82] tracking-tight sm:text-[16vw] md:text-[13rem]">
          <span className="sr-only">SPIFFY</span>
          <span aria-hidden="true" className="flex justify-center">
            {LETTERS.map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: "120%", opacity: 0, rotateX: -90 }}
                animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                transition={{
                  delay: 0.35 + i * 0.08,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-gradient-blue-anim inline-block animate-gradient-pan"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {ch}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-lg font-500 text-spiffy-ink/75 sm:text-xl md:text-2xl"
        >
          STEAM pays it forward for the youth — turning big, complex ideas into
          hands-on projects the next generation can build with their own hands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#workshops"
            className="rounded-full bg-spiffy-ink px-7 py-3.5 text-sm font-700 text-white shadow-xl shadow-black/10 transition-transform hover:scale-[1.04]"
          >
            Explore the Workshops
          </a>
          <a
            href="#join"
            className="rounded-full border border-black/10 bg-white/60 px-7 py-3.5 text-sm font-700 text-spiffy-ink backdrop-blur transition-colors hover:bg-white"
          >
            Join the Movement
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#mission"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-600 uppercase tracking-[0.2em] text-spiffy-ink/50"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
