"use client";
import { motion } from "motion/react";
import type { Shape } from "./shapes";

const FINGERS = [
  { x: -33, len: 66 },
  { x: -11, len: 76 },
  { x: 11, len: 70 },
  { x: 32, len: 56 },
];

const spring = { type: "spring", stiffness: 170, damping: 19, mass: 0.8 } as const;

/** Sensor glove drawn at origin (palm top centre). Wrap in a <g transform> to place it. */
export function Hand({ shape, live = true }: { shape: Shape; live?: boolean }) {
  const [t, ...f] = shape.flex;
  const spreadRot = [-shape.spread * 11, shape.spread * 7, 0, 0];

  return (
    <motion.g animate={{ rotate: shape.tilt }} transition={spring} style={{ transformBox: "view-box", originX: "0px", originY: "120px" }}>
      {/* fingers sit behind the palm */}
      {FINGERS.map((fg, i) => (
        <g key={i} transform={`translate(${fg.x} 10)`}>
          <motion.g
            animate={{ scaleY: 1 - f[i] * 0.62, rotate: spreadRot[i] }}
            transition={spring}
            style={{ transformBox: "fill-box", originX: 0.5, originY: 1 }}
          >
            <rect x={-10} y={-fg.len} width={20} height={fg.len + 14} rx={10} fill="var(--raised)" stroke="var(--ink)" strokeWidth={2} />
            <motion.line
              x1={0}
              x2={0}
              y1={-fg.len + 12}
              y2={4}
              stroke="var(--signal)"
              strokeWidth={4}
              strokeLinecap="round"
              animate={{ opacity: 0.3 + f[i] * 0.7 }}
              transition={spring}
            />
          </motion.g>
        </g>
      ))}

      {/* palm */}
      <rect x={-48} y={0} width={96} height={92} rx={24} fill="var(--raised)" stroke="var(--ink)" strokeWidth={2} />
      {/* IMU */}
      <rect x={-11} y={30} width={22} height={22} rx={5} fill="var(--accent)" />
      <circle cx={0} cy={41} r={3.5} fill="var(--accent-ink)" className={live ? "anim-blink" : undefined} />
      {/* contact pads */}
      <motion.circle cx={-22} cy={12} r={4.5} fill="var(--signal)" animate={{ opacity: shape.contact ? 1 : 0.18, scale: shape.contact ? 1.25 : 1 }} transition={spring} />
      <motion.circle cx={0} cy={12} r={4.5} fill="var(--signal)" animate={{ opacity: shape.contact ? 1 : 0.18, scale: shape.contact ? 1.25 : 1 }} transition={spring} />

      {/* thumb, drawn over the palm so it can tuck across */}
      <g transform="translate(-40 58)">
        <motion.g
          animate={{ rotate: -56 + t * 92, scaleY: 1 - t * 0.3 }}
          transition={spring}
          style={{ transformBox: "fill-box", originX: 0.5, originY: 1 }}
        >
          <rect x={-10} y={-52} width={20} height={58} rx={10} fill="var(--raised)" stroke="var(--ink)" strokeWidth={2} />
          <motion.line x1={0} x2={0} y1={-42} y2={-2} stroke="var(--signal)" strokeWidth={4} strokeLinecap="round" animate={{ opacity: 0.3 + t * 0.7 }} transition={spring} />
        </motion.g>
      </g>

      {/* cuff with the ESP32 board */}
      <rect x={-42} y={88} width={84} height={34} rx={10} fill="var(--panel)" />
      <rect x={-22} y={96} width={44} height={18} rx={3} fill="none" stroke="var(--panel-ink)" strokeOpacity={0.5} strokeWidth={1.5} />
      <circle cx={14} cy={105} r={3} fill="var(--signal)" className={live ? "anim-blink" : undefined} />
    </motion.g>
  );
}
