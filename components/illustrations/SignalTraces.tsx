/** Seamlessly looping multi-channel sensor traces. Pure SVG + CSS, renders on the server. */
function tracePath(seed: number, w: number, h: number, amp: number) {
  const pts: string[] = [];
  for (let x = 0; x <= w * 2; x += 6) {
    const t = (x / w) * Math.PI * 2;
    const y =
      h / 2 +
      Math.sin(t * (2 + (seed % 3)) + seed) * amp * 0.55 +
      Math.sin(t * (5 + (seed % 4)) + seed * 1.7) * amp * 0.3 +
      Math.sin(t * (11 + (seed % 5))) * amp * 0.15;
    pts.push(`${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

export function SignalTraces({ rows = 6, className }: { rows?: number; className?: string }) {
  const w = 600;
  const rowH = 34;
  return (
    <div className={className} aria-hidden>
      {Array.from({ length: rows }).map((_, r) => {
        const hot = r === 1 || r === 4;
        return (
          <div key={r} className="relative overflow-hidden" style={{ height: rowH }}>
            <svg
              className="anim-trace absolute left-0 top-0 h-full"
              style={{ width: "200%", ["--dur" as string]: `${7 + r * 1.9}s` } as React.CSSProperties}
              viewBox={`0 0 ${w * 2} ${rowH}`}
              preserveAspectRatio="none"
            >
              <path
                d={tracePath(r + 3, w, rowH, rowH * 0.75)}
                fill="none"
                stroke={hot ? "var(--signal)" : "var(--accent)"}
                strokeOpacity={hot ? 0.95 : 0.55}
                strokeWidth={hot ? 2 : 1.4}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
