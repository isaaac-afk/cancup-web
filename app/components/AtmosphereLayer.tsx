// Scroll-linked atmosphere — three stacked gradient layers that "transition"
// from golden-hour sky → field → twilight as you scroll. No JS scroll listeners:
// the component is positioned `absolute` and stretches to the FULL height of its
// (relative) parent, so each layer's vertical `mask-image` range maps directly
// onto a scroll depth. The masks are static but track scroll because the layer
// is as tall as the page. Server Component — no "use client", no image assets.

// Layer 1 — golden-hour sky: dominant across the top (0–45%).
const SKY = "linear-gradient(to bottom, #000 0%, #000 28%, transparent 46%)";
// Layer 2 — field/grass: dominant through the middle (30–72%).
const FIELD =
  "linear-gradient(to bottom, transparent 28%, #000 42%, #000 60%, transparent 74%)";
// Layer 3 — twilight glow: dominant toward the bottom (60–100%).
const TWILIGHT =
  "linear-gradient(to bottom, transparent 58%, #000 76%, #000 100%)";

// A few warm embers drifting up through the hero. Hand-placed so they read as
// scattered floodlit dust rather than a regular grid; each carries its own
// duration/delay/drift/opacity via CSS custom properties (see `.ember`).
const EMBERS: {
  left: string;
  top: string;
  size: number;
  duration: string;
  delay: string;
  drift: string;
  opacity: number;
}[] = [
  { left: "12%", top: "70%", size: 3, duration: "15s", delay: "0s", drift: "10px", opacity: 0.45 },
  { left: "28%", top: "82%", size: 2, duration: "19s", delay: "-6s", drift: "-8px", opacity: 0.35 },
  { left: "47%", top: "64%", size: 4, duration: "17s", delay: "-11s", drift: "14px", opacity: 0.4 },
  { left: "63%", top: "78%", size: 2, duration: "21s", delay: "-3s", drift: "-12px", opacity: 0.32 },
  { left: "78%", top: "68%", size: 3, duration: "16s", delay: "-9s", drift: "9px", opacity: 0.42 },
  { left: "90%", top: "80%", size: 2, duration: "23s", delay: "-14s", drift: "-6px", opacity: 0.3 },
];

export default function AtmosphereLayer() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Breathing golden-hour glow — sits highest, gently swelling/fading so the
          dusk light feels alive. Masked to the top third so it never washes out
          the mid/lower content. */}
      <div
        className="atmo-breathe absolute inset-x-0 top-0 h-[55vh] motion-reduce:opacity-20"
        style={{
          maskImage: SKY,
          WebkitMaskImage: SKY,
          backgroundImage:
            "radial-gradient(60% 70% at 50% 0%, rgba(255,150,60,0.5), transparent 65%)",
        }}
      />

      {/* Layer 1 — golden-hour sky */}
      <div
        className="atmo-drift-1 absolute inset-0 opacity-40 motion-reduce:opacity-10"
        style={{
          maskImage: SKY,
          WebkitMaskImage: SKY,
          backgroundImage:
            "radial-gradient(90% 60% at 50% 0%, rgba(255,182,39,0.65), transparent 62%)," +
            "radial-gradient(70% 55% at 82% 8%, rgba(255,107,53,0.6), transparent 58%)",
        }}
      />

      {/* Layer 2 — field / grass diagonal stripes */}
      <div
        className="atmo-drift-2 absolute inset-0 opacity-25 motion-reduce:opacity-10"
        style={{
          maskImage: FIELD,
          WebkitMaskImage: FIELD,
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(58,125,68,0.45) 0, rgba(58,125,68,0.45) 22px, transparent 22px, transparent 46px)",
        }}
      />

      {/* Layer 3 — twilight glow */}
      <div
        className="atmo-drift-3 absolute inset-0 opacity-35 motion-reduce:opacity-10"
        style={{
          maskImage: TWILIGHT,
          WebkitMaskImage: TWILIGHT,
          backgroundImage:
            "radial-gradient(100% 80% at 50% 100%, rgba(36,29,43,0.85), transparent 60%)," +
            "linear-gradient(to bottom, transparent 40%, rgba(22,15,19,0.9) 100%)",
        }}
      />

      {/* Rising embers — warm flecks drifting slowly upward. Masked to the upper
          page so they fade out before the dense match lists below. */}
      <div
        className="absolute inset-x-0 top-0 h-[90vh]"
        style={{ maskImage: SKY, WebkitMaskImage: SKY }}
      >
        {EMBERS.map((e, i) => (
          <span
            key={i}
            className="ember absolute rounded-full bg-golden motion-reduce:hidden"
            style={{
              left: e.left,
              top: e.top,
              width: e.size,
              height: e.size,
              boxShadow: "0 0 6px 1px rgba(255,182,39,0.6)",
              ["--ember-duration" as string]: e.duration,
              ["--ember-delay" as string]: e.delay,
              ["--ember-drift" as string]: e.drift,
              ["--ember-opacity" as string]: e.opacity,
            }}
          />
        ))}
      </div>
    </div>
  );
}
