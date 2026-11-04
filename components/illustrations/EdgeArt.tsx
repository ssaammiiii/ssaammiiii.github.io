/** A chip die with a tiny network running on the silicon. */
const layers = [
  [44, 84, 124],
  [32, 66, 100, 134],
  [64, 104],
];
const xs = [58, 100, 142];

export function EdgeArt() {
  const edges: { x1: number; y1: number; x2: number; y2: number; d: number }[] = [];
  layers.slice(0, -1).forEach((col, li) =>
    col.forEach((y1, a) =>
      layers[li + 1].forEach((y2, b) => edges.push({ x1: xs[li], y1, x2: xs[li + 1], y2, d: (a + b) * 0.12 + li * 0.5 })),
    ),
  );
  return (
    <svg viewBox="0 0 200 170" className="art h-full w-full" aria-hidden>
      {Array.from({ length: 7 }).map((_, i) => (
        <g key={i} stroke="var(--panel-ink)" strokeOpacity={0.4} strokeWidth={3} strokeLinecap="round">
          <line x1={34 + i * 22} y1={4} x2={34 + i * 22} y2={14} />
          <line x1={34 + i * 22} y1={156} x2={34 + i * 22} y2={166} />
        </g>
      ))}
      <rect x={20} y={14} width={160} height={142} rx={14} fill="none" stroke="var(--panel-ink)" strokeOpacity={0.35} strokeWidth={1.5} />
      <rect x={32} y={24} width={136} height={122} rx={8} fill="none" stroke="var(--panel-ink)" strokeOpacity={0.12} strokeDasharray="3 4" />
      {edges.map((e, i) => {
        const { d, ...pos } = e;
        return (
          <g key={i}>
            <line {...pos} stroke="var(--panel-ink)" strokeOpacity={0.14} />
            <line {...pos} className="dash" stroke="var(--signal)" strokeWidth={1.6} strokeLinecap="round" style={{ animationDelay: `${d}s` }} />
          </g>
        );
      })}
      {layers.map((col, li) =>
        col.map((y, j) => (
          <circle
            key={`${li}-${j}`}
            className="node"
            cx={xs[li]}
            cy={y}
            r={li === 2 ? 8 : 6}
            fill={li === 2 ? "var(--signal)" : "var(--accent)"}
            style={{ animationDelay: `${li * 0.5 + j * 0.1}s` }}
          />
        )),
      )}
    </svg>
  );
}
