import { Reveal } from "../motion/Reveal";
import { ScrollWords } from "../motion/ScrollWords";
import { SensingArt } from "../illustrations/SensingArt";
import { EdgeArt } from "../illustrations/EdgeArt";
import { AssistiveArt } from "../illustrations/AssistiveArt";
import { HealthArt } from "../illustrations/HealthArt";
import { intro } from "@/lib/content";

export function Intro() {
  return (
    <section className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-10 lg:py-36">
      <ScrollWords
        text={intro}
        highlight={["SignSpeak,", "speech", "First", "Class", "Honours,"]}
        className="max-w-[28ch] font-display text-[clamp(1.75rem,3.6vw,3.1rem)] font-medium leading-[1.14] tracking-[-0.02em] text-ink"
      />
    </section>
  );
}

function Tile({
  title,
  body,
  art,
  className,
  artClass,
  dark,
  delay,
}: {
  title: string;
  body: string;
  art: React.ReactNode;
  className?: string;
  artClass?: string;
  dark?: boolean;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className={`group relative flex flex-col overflow-hidden rounded-[20px] border ${dark ? "border-panel-line bg-panel" : "border-line"} ${className ?? ""}`}>
      <div className={`relative flex-1 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${artClass ?? ""}`}>{art}</div>
      <div className="relative p-6 sm:p-7">
        <h3 className={`font-display text-2xl font-semibold tracking-tight ${dark ? "text-panel-ink" : "text-ink"}`}>{title}</h3>
        <p className={`mt-2 max-w-[42ch] leading-relaxed ${dark ? "text-panel-ink/70" : "text-ink-2"}`}>{body}</p>
      </div>
    </Reveal>
  );
}

export function Interests() {
  return (
    <section id="interests" className="mx-auto max-w-[1240px] px-4 pb-24 sm:px-6 lg:px-10 lg:pb-32">
      <Reveal>
        <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.03em] text-ink">What I work on</h2>
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6">
        <Tile
          className="bg-tint md:col-span-4 md:row-span-2"
          artClass="min-h-[260px] px-4 pt-6 sm:px-8"
          art={<SensingArt />}
          title="Wearable and multimodal sensing"
          body="Flex sensors, inertial units and cameras, and how to fuse what they see."
        />
        <Tile
          dark
          delay={0.08}
          className="md:col-span-2"
          artClass="h-[200px] px-10 pt-6"
          art={<EdgeArt />}
          title="Edge AI and TinyML"
          body="Models small and fast enough to live on the device instead of a server."
        />
        <Tile
          delay={0.16}
          className="dot-grid bg-surface md:col-span-2"
          artClass="h-[190px] px-6 pt-6"
          art={<AssistiveArt />}
          title="HCI and assistive technology"
          body="Interfaces for people the standard interface was never designed for."
        />
        <Tile
          delay={0.08}
          className="graph-paper bg-surface md:col-span-6 md:flex-row-reverse md:items-center"
          artClass="h-[170px] px-6 pt-8 md:h-[200px] md:px-10 md:pt-0 md:py-6"
          art={<HealthArt />}
          title="Machine learning for health"
          body="Signal processing and classification where a wrong answer has a cost."
        />
      </div>
    </section>
  );
}
