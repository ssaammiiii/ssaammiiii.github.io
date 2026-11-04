import { Asterisk } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "../motion/Reveal";
import { CountUp } from "../motion/CountUp";
import { honours, marqueeItems, links } from "@/lib/content";

export function Highlights() {
  const loop = [...marqueeItems, ...marqueeItems];
  return (
    <section id="highlights" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.03em] text-ink">Highlights</h2>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          <Reveal className="relative overflow-hidden rounded-[20px] bg-accent p-7 text-accent-ink sm:p-10">
            <div className="flex items-start gap-3">
              <span className="font-display text-[clamp(7rem,18vw,13rem)] font-bold leading-[0.8] tracking-[-0.06em]">1st</span>
            </div>
            <p className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">in Ghana, IEEEXtreme 19.0</p>
            <p className="mt-4 max-w-[44ch] leading-relaxed opacity-80">
              A 24-hour global programming competition with over <CountUp to={19000} className="font-semibold opacity-100" /> participants, October
              2025.
            </p>
            <svg className="pointer-events-none absolute -right-10 -top-10 size-64 opacity-20" viewBox="0 0 100 100" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <circle key={i} cx={50} cy={50} r={10 + i * 9} fill="none" stroke="currentColor" strokeWidth={0.8} />
              ))}
            </svg>
          </Reveal>
          <div className="flex flex-col gap-4">
            {honours.map((h, i) => (
              <Reveal
                key={h.title}
                delay={0.08 * (i + 1)}
                className="group flex flex-1 flex-col justify-between gap-4 rounded-[20px] border border-line bg-surface p-6 transition-colors hover:border-accent"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">{h.title}</h3>
                  <span className="shrink-0 font-mono text-xs text-ink-3">{h.when}</span>
                </div>
                <p className="text-sm leading-relaxed text-ink-2">{h.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="group mt-16 overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <ul className="anim-marquee flex w-max items-center gap-8">
          {loop.map((m, i) => (
            <li key={i} className="flex items-center gap-8 whitespace-nowrap font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl" aria-hidden={i >= marqueeItems.length}>
              {m}
              <Asterisk size={22} weight="bold" className="text-signal" />
            </li>
          ))}
        </ul>
      </div>

      <p className="mx-auto mt-8 max-w-[1240px] px-4 text-ink-2 sm:px-6 lg:px-10">
        The full record, including skills and certifications, is in the{" "}
        <a href={links.cv} className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
          CV
        </a>
        .
      </p>
    </section>
  );
}
