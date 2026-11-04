"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Hand } from "../signspeak/Hand";
import { SHAPES, REST } from "../signspeak/shapes";

const CYCLE = ["L", "Y", "B", "V", "A", "W"];

/** The glove cycles through handshapes; each flex sensor feeds its own readout. */
export function SensingArt() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [k, setK] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => setK((v) => (v + 1) % CYCLE.length), 1400);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const shape = reduce ? REST : SHAPES[CYCLE[k]];

  return (
    <svg ref={ref} viewBox="0 0 420 270" className="art h-full w-full" aria-hidden>
      <g transform="translate(112 96) scale(0.98)">
        <Hand shape={shape} />
      </g>
      {[0, 1, 2, 3, 4].map((r) => {
        const d = `M156 202 C 226 202, 232 ${48 + r * 40}, 272 ${48 + r * 40}`;
        return (
          <g key={r}>
            <path d={d} fill="none" stroke="var(--ink)" strokeOpacity={0.16} strokeWidth={1.5} />
            <path className="dash" d={d} fill="none" stroke="var(--signal)" strokeWidth={2} strokeLinecap="round" style={{ animationDelay: `${r * 0.22}s` }} />
            <rect x={276} y={34 + r * 40} width={128} height={28} rx={8} fill="var(--raised)" stroke="var(--line)" />
            <rect
              x={282}
              y={40 + r * 40}
              width={Math.round(18 + shape.flex[r] * 98)}
              height={16}
              rx={4}
              fill="var(--signal)"
              style={{ transition: "width 600ms cubic-bezier(0.16,1,0.3,1)" }}
            />
          </g>
        );
      })}
    </svg>
  );
}
