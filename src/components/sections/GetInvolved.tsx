import {
  ArrowUpRight,
  HandHeart,
  School,
  Sparkles,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Reveal from "@/components/Reveal";

const CONTACT = [
  {
    icon: Mail,
    label: "Email",
    value: "yash.bhavani28@bcp.org",
    href: "mailto:yash.bhavani28@bcp.org",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "732-783-6191",
    href: "tel:+17327836191",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "960 W. Hedding St, 95126",
    href: "https://maps.google.com/?q=960+W.+Hedding+St+95126",
  },
];

const WAYS = [
  {
    icon: School,
    title: "Bring SPIFFY to your school",
    body: "Host a workshop series for your students, club, or library — we bring the curriculum, the materials, and the energy.",
  },
  {
    icon: HandHeart,
    title: "Volunteer or mentor",
    body: "Love STEM? Spend an afternoon helping young builders test bridges, pitch startups, and reflect on what they learned.",
  },
  {
    icon: Sparkles,
    title: "Sponsor a build",
    body: "Fund SPIFFY Bucks, popsicle sticks, and prototypes so the next team can solve a problem that matters to them.",
  },
];

export default function GetInvolved() {
  return (
    <section id="join" className="relative bg-white py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-spiffy-blue via-spiffy-navy to-spiffy-navy-deep p-1">
          <div className="rounded-[2.4rem] bg-spiffy-ink px-8 py-16 text-white sm:px-16 sm:py-24">
            <Reveal>
              <span className="text-sm font-700 uppercase tracking-[0.22em] text-white/70">
                Get Involved
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-4xl font-display text-4xl font-700 leading-[1.05] tracking-tight sm:text-6xl">
                Help us hand STEM to the
                <span className="text-gradient-anim animate-gradient-pan">
                  {" "}
                  next generation.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-lg text-white/70">
                Whether you teach, build, or believe — there's a place for you in
                the SPIFFY movement. STEM pays it forward, and it starts with
                people like you.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {WAYS.map((w, i) => (
                <Reveal key={w.title} delay={0.08 * i}>
                  <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:bg-white/[0.07]">
                    <w.icon className="h-7 w-7 text-spiffy-blue" />
                    <h3 className="mt-4 font-display text-lg font-700">
                      {w.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {w.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Direct contact details */}
            <div className="mt-12 grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-3">
              {CONTACT.map((c, i) => (
                <Reveal key={c.label} delay={0.06 * i}>
                  <a
                    href={c.href}
                    target={c.icon === MapPin ? "_blank" : undefined}
                    rel={c.icon === MapPin ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-3"
                  >
                    <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-spiffy-sky transition-colors group-hover:bg-white/[0.12]">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-700 uppercase tracking-[0.18em] text-white/45">
                        {c.label}
                      </span>
                      <span className="mt-1 block break-words text-base font-600 text-white transition-colors group-hover:text-spiffy-sky">
                        {c.value}
                      </span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <a
                href="mailto:yash.bhavani28@bcp.org"
                className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-700 text-spiffy-ink transition-transform hover:scale-[1.03]"
              >
                Start the conversation
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
