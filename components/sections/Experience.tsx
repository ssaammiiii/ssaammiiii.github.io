"use client";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { experience } from "@/lib/content";

export function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.6fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.03em] text-ink">Experience</h2>
          <p className="mt-5 max-w-[30ch] text-ink-2">Teaching, building and research, most recent first.</p>
        </div>
        <ol ref={ref} className="relative pl-8 sm:pl-12">
          <span className="absolute bottom-2 left-[7px] top-2 w-px bg-line sm:left-[11px]" aria-hidden />
          <motion.span style={{ scaleY }} className="absolute bottom-2 left-[6px] top-2 w-[3px] origin-top rounded-full bg-accent sm:left-[10px]" aria-hidden />
          {experience.map((e, i) => (
            <motion.li
              key={e.role}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative pb-14 last:pb-0"
            >
              <motion.span
                className="absolute -left-8 top-1.5 size-4 rounded-full border-[3px] border-bg bg-accent sm:-left-12 sm:size-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.15 }}
                aria-hidden
              />
              <p className="font-mono text-sm text-ink-3">{e.when}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">{e.role}</h3>
              <p className="mt-1 font-medium text-accent">{e.org}</p>
              <p className="mt-3 max-w-[60ch] leading-relaxed text-ink-2">{e.body}</p>
              {e.tags.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {e.tags.map((t) => (
                    <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-ink-2">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              {i === 0 && <span className="sr-only">Current role</span>}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
