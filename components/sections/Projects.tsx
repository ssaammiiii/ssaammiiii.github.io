import { Reveal } from "../motion/Reveal";
import { WildfireArt } from "../illustrations/WildfireArt";
import { HazardArt } from "../illustrations/HazardArt";

export function Projects() {
  return (
    <section className="mx-auto max-w-[1240px] px-4 pb-24 sm:px-6 lg:px-10 lg:pb-32">
      <Reveal>
        <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.03em] text-ink">Other projects</h2>
      </Reveal>
      <div className="mt-12 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Reveal className="group flex flex-col overflow-hidden rounded-[20px] border border-panel-line bg-panel">
          <div className="p-6 sm:p-8">
            <p className="font-mono text-sm text-panel-ink/60">Aug to Sept 2025, team lead</p>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-panel-ink">Wildfire detection system</h3>
            <p className="mt-3 max-w-[46ch] leading-relaxed text-panel-ink/70">
              Led a team building a wildfire-risk model from NASA satellite imagery and environmental data.
            </p>
          </div>
          <div className="mt-auto px-6 pb-6 sm:px-8 sm:pb-8">
            <WildfireArt />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-8 rounded-[20px] border border-line bg-surface p-6 sm:p-8">
          <div>
            <p className="font-mono text-sm text-ink-3">Aug 2026, team lead</p>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">Hazard Watch</h3>
            <p className="mt-3 max-w-[46ch] leading-relaxed text-ink-2">
              Hazard handling in a five-stage pipelined processor: forwarding, load-use hazard detection and early branch resolution.
            </p>
          </div>
          <div className="mt-auto">
            <HazardArt />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
