"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { CountUp } from "../motion/CountUp";

const STAGES = ["IF", "ID", "EX", "MEM", "WB"];
const INSTR = ["lw", "add", "beq", "sw"];

/** Five-stage pipeline: instructions flow through, with a forwarding path from EX back to ID. */
export function HazardArt() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  return (
    <div ref={ref} className="flex h-full flex-col justify-between gap-6">
      <div className="relative">
        <div className="grid grid-cols-5 gap-1.5">
          {STAGES.map((s) => (
            <div key={s} className="grid h-12 place-items-center rounded-lg border border-line bg-raised font-mono text-xs text-ink-2">
              {s}
            </div>
          ))}
        </div>
        {/* instruction tokens moving through the stages */}
        <div className="relative mt-2 h-[112px] overflow-hidden">
          {INSTR.map((ins, k) => (
            <motion.div
              key={ins}
              className="absolute left-0 grid h-6 w-[calc(20%-5px)] place-items-center rounded-md font-mono text-[11px]"
              style={{ top: k * 28, background: k === 0 ? "var(--signal)" : "var(--accent)", color: k === 0 ? "#0d1f24" : "var(--accent-ink)" }}
              initial={{ x: "0%" }}
              animate={inView ? { x: ["0%", "0%", "520%", "520%"] } : { x: "0%" }}
              transition={{ duration: 5, times: [0, (k * 0.22) / 5 + k * 0.06, 0.6 + k * 0.08, 1], repeat: Infinity, ease: "linear" }}
            >
              {ins}
            </motion.div>
          ))}
        </div>
        {/* forwarding arc EX -> ID */}
        <svg className="pointer-events-none absolute -top-5 left-[20%] h-6 w-[40%] overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden>
          <motion.path
            d="M75 20 C 70 0, 30 0, 25 20"
            fill="none"
            stroke="var(--signal)"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: [0, 1, 1, 0] } : { pathLength: 0 }}
            transition={{ duration: 5, times: [0, 0.3, 0.8, 1], repeat: Infinity }}
          />
        </svg>
      </div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="font-display text-5xl font-semibold tabular-nums text-ink">
            <CountUp from={47} to={25} duration={2.2} />
            <span className="ml-2 text-lg font-normal text-ink-2">cycles</span>
          </div>
          <div className="mt-1 text-sm text-ink-2">down from 47 on the test workload</div>
        </div>
        <div className="font-mono text-2xl text-accent">1.88x</div>
      </div>
    </div>
  );
}
