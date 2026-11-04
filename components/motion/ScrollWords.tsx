"use client";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

/** Paragraph whose words light up as it scrolls through the viewport. */
export function ScrollWords({ text, highlight = [], className }: { text: string; highlight?: string[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const isHi = highlight.some((h) => w.replace(/[.,]/g, "") === h);
        return (
          <span key={i} className={isHi ? "text-accent" : undefined}>
            <Word progress={scrollYProgress} range={[start, Math.min(1, start + 3 / words.length)]}>
              {w}
            </Word>
          </span>
        );
      })}
    </p>
  );
}
