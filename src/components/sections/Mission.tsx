import { Lightbulb, Users, Rocket, Compass } from "lucide-react";
import Reveal from "@/components/Reveal";

const PILLARS = [
  {
    icon: Users,
    title: "Hands-On Club",
    body: "A hands-on club for youth where every session is something you build, test, and take pride in — not just something you hear about.",
  },
  {
    icon: Lightbulb,
    title: "Complex Ideas, Made Real",
    body: "We introduce genuinely complex ideas — engineering, economics, design — through interactive projects kids can actually touch.",
  },
  {
    icon: Compass,
    title: "Skills For Life",
    body: "Every workshop quietly teaches leadership, problem-solving, creativity, and exploration alongside the science.",
  },
  {
    icon: Rocket,
    title: "The Next Generation",
    body: "We exist to inspire the next generation of innovators and thinkers in STEM — and to pay that knowledge forward.",
  },
];

export default function Mission() {
  return (
    <section id="mission" className="relative bg-white py-28 sm:py-36">
      <div className="bg-grid-faint pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Reveal>
              <span className="text-sm font-700 uppercase tracking-[0.22em] text-spiffy-blue">
                What is SPIFFY?
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-700 leading-[1.05] tracking-tight sm:text-6xl">
                We turn <span className="text-gradient">curiosity</span> into
                things kids can hold.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-spiffy-ink/70">
                SPIFFY — <strong className="text-spiffy-ink">STEM Pays It
                Forward For the Youth</strong> — is a hands-on club built on a
                simple belief: the best way to learn how the world works is to
                build a small piece of it yourself. From popsicle-stick bridges
                to Shark-Tank startups, we hand the tools to the youngest
                builders and get out of the way.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={0.08 * i}>
                <div className="group h-full rounded-2xl border border-black/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_24px_60px_-20px_rgba(37,99,235,0.35)]">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-spiffy-blue to-spiffy-navy text-white">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-700">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-spiffy-ink/65">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
