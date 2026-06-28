import { PHOTOS } from "@/lib/photos";
import Reveal from "@/components/Reveal";

type Workshop = {
  id: string;
  kicker: string;
  title: string;
  tagline: string;
  body: string;
  steps: string[];
  image: string;
  accent: string;
};

const WORKSHOPS: Workshop[] = [
  {
    id: "architect",
    kicker: "Architect Workshop",
    title: "Bridging the Gap",
    tagline: "Beams, arches, trusses & one very dramatic weight test.",
    body: "Students meet the four great bridge families — beam, arch, suspension, and truss — then race to build the strongest span from nothing but popsicle sticks and glue. Along the way they discover why a triangle never buckles and a rectangle always needs help.",
    steps: ["Design", "Build", "Test to failure", "Reflect"],
    image: PHOTOS[115], // popsicle-stick bridge build in progress
    accent: "from-spiffy-blue to-spiffy-navy",
  },
  {
    id: "innovation",
    kicker: "Engineering Labs",
    title: "Innovation Workshop",
    tagline: "Where engineering meets entrepreneurship.",
    body: "What does it actually mean to innovate? Teams explore how engineers and entrepreneurs both solve problems, wrestle with scarcity and opportunity cost, and run the full design process — empathize, ideate, plan, build, and iterate on a product of their own.",
    steps: ["Empathize", "Ideate", "Plan", "Build & iterate"],
    image: PHOTOS[40],
    accent: "from-spiffy-navy to-spiffy-navy-deep",
  },
  {
    id: "startup",
    kicker: "Startup Labs",
    title: "The SPIFFY Startup Challenge",
    tagline: "$200 SPIFFY Bucks. One prototype. A room full of investors.",
    body: "Part engineering lab, part Shark Tank. Teams identify a real problem, manage a live marketplace budget where prices shift like the real economy, build a working prototype, and pitch it to investors — learning that a confident pitch matters as much as a clever design.",
    steps: ["Brainstorm", "Marketplace", "Prototype", "Shark Tank"],
    image: PHOTOS[70],
    accent: "from-spiffy-blue to-spiffy-blue-deep",
  },
];

export default function Workshops() {
  return (
    <section id="workshops" className="relative bg-white py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <Reveal>
            <span className="text-sm font-700 uppercase tracking-[0.22em] text-spiffy-blue">
              The Workshops
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl font-700 leading-[1.05] tracking-tight sm:text-6xl">
              Three ways we put STEM
              <span className="text-gradient"> in their hands.</span>
            </h2>
          </Reveal>
        </div>

        {/* Sticky stacking panels */}
        <div className="flex flex-col gap-8">
          {WORKSHOPS.map((w, i) => (
            <div
              key={w.id}
              id={w.id}
              className="sticky top-24"
              style={{ zIndex: i + 1 }}
            >
              <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]">
                <div className="grid md:grid-cols-2">
                  {/* Image side (alternates) */}
                  <div
                    className={`relative min-h-[300px] md:min-h-[480px] ${
                      i % 2 === 1 ? "md:order-2" : ""
                    }`}
                  >
                    <img
                      src={w.image}
                      alt={w.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-tr ${w.accent} opacity-25 mix-blend-multiply`}
                    />
                    <span className="absolute left-6 top-6 font-display text-7xl font-700 text-white/80 drop-shadow">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Text side */}
                  <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
                    <span
                      className={`w-fit rounded-full bg-gradient-to-r ${w.accent} px-3 py-1 text-xs font-700 uppercase tracking-[0.18em] text-white`}
                    >
                      {w.kicker}
                    </span>
                    <h3 className="font-display text-3xl font-700 tracking-tight sm:text-4xl">
                      {w.title}
                    </h3>
                    <p className="text-lg font-600 text-spiffy-ink/80">
                      {w.tagline}
                    </p>
                    <p className="leading-relaxed text-spiffy-ink/65">
                      {w.body}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {w.steps.map((s, si) => (
                        <span
                          key={s}
                          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-muted px-3 py-1.5 text-xs font-600 text-spiffy-ink/70"
                        >
                          <span className="font-700 text-spiffy-navy">
                            {si + 1}
                          </span>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
