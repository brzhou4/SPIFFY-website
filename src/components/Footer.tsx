export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <img
              src="/spiffy-logo.png"
              alt="SPIFFY"
              className="h-12 w-12 rounded-xl object-cover ring-1 ring-black/5"
            />
            <div>
              <p className="font-display text-xl font-700">SPIFFY</p>
              <p className="text-sm text-spiffy-ink/60">STEM For All</p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-600 text-spiffy-ink/70">
            <a href="#mission" className="hover:text-spiffy-navy">
              Mission
            </a>
            <a href="#gallery" className="hover:text-spiffy-navy">
              Moments
            </a>
            <a href="#workshops" className="hover:text-spiffy-navy">
              Workshops
            </a>
            <a href="#impact" className="hover:text-spiffy-navy">
              Impact
            </a>
            <a href="#join" className="hover:text-spiffy-navy">
              Get Involved
            </a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-black/10 pt-6 text-xs text-spiffy-ink/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} SPIFFY · STEM Pays It Forward For the Youth.</p>
          <p className="font-display font-600 uppercase tracking-[0.2em]">
            Build · Design · Innovate
          </p>
        </div>
      </div>
    </footer>
  );
}
