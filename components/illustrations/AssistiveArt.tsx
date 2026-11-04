/** A sign becomes a voice: hand on the left, speech bubble with a live waveform on the right. */
export function AssistiveArt() {
  return (
    <svg viewBox="0 0 220 150" className="art h-full w-full" aria-hidden>
      <g transform="translate(46 72) rotate(-8)">
        <g className="anim-float">
          {[-15, -5, 5, 15].map((x, i) => (
            <rect key={i} x={x - 4.5} y={-36 + Math.abs(i - 1.3) * 4} width={9} height={38} rx={4.5} fill="var(--raised)" stroke="var(--ink)" strokeWidth={1.6} />
          ))}
          <rect x={-21} y={-6} width={42} height={42} rx={13} fill="var(--raised)" stroke="var(--ink)" strokeWidth={1.6} />
          <rect x={-31} y={2} width={9} height={28} rx={4.5} transform="rotate(-36 -26 30)" fill="var(--raised)" stroke="var(--ink)" strokeWidth={1.6} />
          <rect x={-8} y={10} width={16} height={12} rx={3} fill="var(--accent)" />
        </g>
      </g>
      <path d="M86 76 H112" stroke="var(--ink)" strokeOpacity={0.25} strokeWidth={2} strokeDasharray="2 5" strokeLinecap="round" />
      <path className="dash" d="M86 76 H112" stroke="var(--signal)" strokeWidth={2.5} strokeLinecap="round" />
      <path
        d="M134 40 h60 a14 14 0 0 1 14 14 v38 a14 14 0 0 1 -14 14 h-40 l-14 14 v-14 h-6 a14 14 0 0 1 -14 -14 v-38 a14 14 0 0 1 14 -14z"
        fill="var(--accent)"
      />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect
          key={i}
          className="bar"
          x={134 + i * 7.6}
          y={52}
          width={3.6}
          height={42}
          rx={1.8}
          fill="var(--accent-ink)"
          style={{ animationDelay: `${(i * 0.17) % 0.9}s` }}
        />
      ))}
    </svg>
  );
}
