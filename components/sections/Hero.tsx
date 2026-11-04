"use client";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { ArrowDown, EnvelopeSimple } from "@phosphor-icons/react";
import { SignalTraces } from "../illustrations/SignalTraces";
import { Magnetic } from "../motion/Magnetic";
import { links } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 18 });

  return (
    <section id="top" className="relative mx-auto grid min-h-[100dvh] max-w-[1240px] items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8 lg:px-10 lg:pt-24">
      <div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-6 text-sm font-medium uppercase tracking-[0.16em] text-accent"
        >
          Computer engineer, University of Ghana
        </motion.p>
        <h1 className="font-display text-[clamp(3.2rem,8.5vw,7.2rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-ink">
          {["Samia", "Soleimani"].map((w, i) => (
            <span key={w} className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" initial={{ y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 1, delay: 0.1 + i * 0.12, ease }}>
                {w}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease }}
          className="mt-7 max-w-[34ch] text-lg leading-relaxed text-ink-2 sm:text-xl"
        >
          I work on wearable sensing and the machine learning behind it, with a focus on assistive technology.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <a
              href={links.cv}
              className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3.5 font-medium text-accent-ink transition active:scale-[0.97]"
            >
              Download CV
              <ArrowDown size={18} weight="bold" className="transition-transform group-hover:translate-y-0.5" />
            </a>
          </Magnetic>
          <a
            href={`mailto:${links.email}`}
            className="inline-flex items-center gap-2.5 rounded-full border border-line px-6 py-3.5 font-medium text-ink transition hover:border-ink active:scale-[0.97]"
          >
            <EnvelopeSimple size={18} weight="bold" />
            Email me
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.2, ease }}
        className="relative mx-auto w-full max-w-[480px] [perspective:1200px]"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
        }}
      >
        {/* sensor traces run behind the portrait and past its edges */}
        <SignalTraces rows={7} className="absolute -inset-x-[30%] top-1/2 -translate-y-1/2 opacity-90 [mask-image:linear-gradient(90deg,transparent,black_18%,black_82%,transparent)]" />
        <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-line bg-tint shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--accent)_45%,transparent)]">
            <Image
              src="/samia.jpg"
              alt="Samia Soleimani"
              fill
              priority
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover object-[50%_30%]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
