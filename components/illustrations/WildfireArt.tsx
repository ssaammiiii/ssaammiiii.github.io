/** Satellite tiles over a landscape; risk builds and fades in clusters. */
const COLS = 16;
const ROWS = 9;

function rand(i: number) {
  const v = Math.sin(i * 91.7 + 13.1) * 43758.5453;
  return v - Math.floor(v);
}

// Two hotspots that the "model" flags.
const spots = [
  { c: 4, r: 3, k: 3.6 },
  { c: 12, r: 6, k: 2.8 },
];

export function WildfireArt() {
  const cells = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const i = r * COLS + c;
      const risk = Math.max(...spots.map((s) => Math.max(0, 1 - Math.hypot(c - s.c, r - s.r) / s.k)));
      cells.push({ c, r, i, risk, n: rand(i) });
    }
  }
  return (
    <svg viewBox={`0 0 ${COLS * 20} ${ROWS * 20}`} className="art h-full w-full" aria-hidden>
      {cells.map(({ c, r, i, risk, n }) => (
        <g key={i}>
          <rect x={c * 20 + 1} y={r * 20 + 1} width={18} height={18} rx={3} fill="var(--panel-ink)" opacity={0.05 + n * 0.06} />
          {risk > 0.05 && (
            <rect
              className="heat"
              x={c * 20 + 1}
              y={r * 20 + 1}
              width={18}
              height={18}
              rx={3}
              fill="var(--signal)"
              style={{ ["--peak" as string]: String(0.25 + risk * 0.75), animationDelay: `${(1 - risk) * 1.6 + n * 0.3}s` } as React.CSSProperties}
            />
          )}
        </g>
      ))}
      {spots.map((s, i) => (
        <circle
          key={i}
          cx={s.c * 20 + 10}
          cy={s.r * 20 + 10}
          r={s.k * 20}
          fill="none"
          stroke="var(--signal)"
          strokeOpacity={0.6}
          strokeDasharray="3 5"
          className="dash"
        />
      ))}
    </svg>
  );
}
