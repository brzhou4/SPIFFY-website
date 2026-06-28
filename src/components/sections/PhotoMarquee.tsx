import { PHOTOS } from "@/lib/photos";
import Reveal from "@/components/Reveal";

// Two distinct slices, each duplicated so the loop is seamless.
const ROW_A = PHOTOS.filter((_, i) => i % 5 === 2).slice(0, 10);
const ROW_B = PHOTOS.filter((_, i) => i % 5 === 4).slice(0, 10);

function Row({
  imgs,
  reverse,
}: {
  imgs: string[];
  reverse?: boolean;
}) {
  const loop = [...imgs, ...imgs];
  return (
    <div className="flex w-max gap-5">
      <div
        className={`flex w-max gap-5 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee-slow"
        }`}
      >
        {loop.map((src, i) => (
          <figure
            key={`${src}-${i}`}
            className="group relative h-44 w-64 shrink-0 overflow-hidden rounded-2xl sm:h-56 sm:w-80"
          >
            <img
              src={src}
              alt=""
              aria-hidden
              loading="lazy"
              className="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-spiffy-navy/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function PhotoMarquee() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto mb-12 max-w-7xl px-6">
        <Reveal>
          <span className="text-sm font-700 uppercase tracking-[0.22em] text-spiffy-blue">
            The Faces of SPIFFY
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="mt-5 max-w-3xl font-display text-3xl font-700 tracking-tight sm:text-5xl">
            Hundreds of young builders, one shared{" "}
            <span className="text-gradient">spark.</span>
          </h3>
        </Reveal>
      </div>

      {/* Edge fade for a polished, endless feel */}
      <div className="relative space-y-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent sm:w-40" />
        <Row imgs={ROW_A} />
        <Row imgs={ROW_B} reverse />
      </div>
    </section>
  );
}
