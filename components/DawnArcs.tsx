/* Static concentric dawn arcs; sweep/start shape each partial circle. */
const DAWN_ARCS = [
  { r: 140, sweep: 240, start: -35, color: "#d97a5e", o: 0.2 },
  { r: 220, sweep: 265, start: 130, color: "#d97a5e", o: 0.16 },
  { r: 310, sweep: 205, start: 210, color: "#3d2c29", o: 0.12 },
  { r: 400, sweep: 250, start: 75, color: "#d97a5e", o: 0.14 },
  { r: 470, sweep: 220, start: 300, color: "#d97a5e", o: 0.1 },
] as const;

/**
 * Dawn rays: thin concentric arcs rising behind the hero portrait. Lives
 * outside the hero (in the wrapper it shares with Treatments) so the rings
 * can spill past the hero's clipped bottom edge and dissolve gently into
 * the section below instead of being sliced off at the boundary.
 */
export default function DawnArcs() {
  return (
    <svg
      aria-hidden
      className="dawn-rays pointer-events-none absolute left-[75%] top-[70svh] -z-[6] hidden aspect-square w-[min(56vw,53rem)] -translate-x-1/2 -translate-y-1/2 select-none min-[900px]:block"
      viewBox="0 0 1000 1000"
      fill="none"
      style={{
        maskImage:
          "linear-gradient(to bottom, black 62%, transparent 96%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 62%, transparent 96%)",
      }}
    >
      {DAWN_ARCS.map((arc) => (
        <circle
          key={arc.r}
          cx="500"
          cy="500"
          r={arc.r}
          pathLength={360}
          stroke={arc.color}
          strokeOpacity={arc.o}
          strokeWidth="1"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          strokeDasharray={`${arc.sweep} 360`}
          transform={`rotate(${arc.start} 500 500)`}
        />
      ))}
    </svg>
  );
}
