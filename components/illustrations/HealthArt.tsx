"use client";
import { motion, useInView, type Transition } from "motion/react";
import { useRef } from "react";

/** A noisy biosignal is cleaned as a scanner passes over it, and each beat gets a label. */
function ecg(noisy: boolean) {
  const pts: string[] = [];
  for (let x = 0; x <= 400; x += 2) {
    const ph = x % 100;
    let y = 72;
    if (ph > 30 && ph < 36) y -= (ph - 30) * 2.2;
    else if (ph >= 36 && ph < 40) y += 12;
    else if (ph >= 40 && ph < 44) y -= 46;
    else if (ph >= 44 && ph < 48) y += 22;
    else if (ph > 60 && ph < 76) y -= Math.sin(((ph - 60) / 16) * Math.PI) * 9;
    if (noisy) y += Math.sin(x * 1.7) * 6 + Math.sin(x * 0.31) * 7 + Math.cos(x * 4.3) * 3;
    pts.push(`${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

const NOISY = ecg(true);
const CLEAN = ecg(false);
const T: Transition = { duration: 7, times: [0, 0.55, 0.85, 1], repeat: Infinity, ease: "easeInOut" };

export function HealthArt() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const sweep = inView ? [0, 400, 400, 0] : 0;
  return (
    <svg ref={ref} viewBox="0 0 400 130" className="h-full w-full overflow-visible" aria-hidden>
      <defs>
        <clipPath id="health-clean">
          <motion.rect x={0} y={0} height={130} initial={{ width: 0 }} animate={{ width: sweep }} transition={T} />
        </clipPath>
        <clipPath id="health-noisy">
          <motion.rect y={0} height={130} width={400} initial={{ x: 0 }} animate={{ x: sweep }} transition={T} />
        </clipPath>
      </defs>
      <path d={NOISY} clipPath="url(#health-noisy)" fill="none" stroke="var(--ink-3)" strokeWidth={1.4} strokeOpacity={0.8} />
      <path d={CLEAN} clipPath="url(#health-clean)" fill="none" stroke="var(--accent)" strokeWidth={2.4} strokeLinejoin="round" />
      <motion.line y1={14} y2={124} stroke="var(--signal)" strokeWidth={2} initial={{ x1: 0, x2: 0 }} animate={{ x1: sweep, x2: sweep }} transition={T} />
      {[42, 142, 242, 342].map((x, i) => (
        <motion.g
          key={x}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: [0, 0, 1, 1, 0] } : { opacity: 0 }}
          transition={{ duration: 7, times: [0, 0.09 + i * 0.12, 0.13 + i * 0.12, 0.85, 1], repeat: Infinity }}
        >
          <rect x={x - 24} y={0} width={48} height={17} rx={8.5} fill="var(--signal)" />
          <text x={x} y={12} textAnchor="middle" fontSize={9.5} fontFamily="var(--font-geist-mono)" fill="#0d1f24">
            normal
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
