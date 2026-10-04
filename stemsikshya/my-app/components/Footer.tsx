// Progressive blur: weak at the top edge, strongest at the screen's bottom edge.
// Each layer blurs a bit more than the one above it, and masks fade them together.
const BLURS = [1, 2, 4, 8, 16, 32]; // px, from top layer to bottom layer
const STEP = 100 / (BLURS.length + 1);

const maskFor = (i: number) => {
  const last = i === BLURS.length - 1;
  return `linear-gradient(to bottom,
    rgba(0,0,0,0) ${i * STEP}%,
    #000 ${(i + 1) * STEP}%,
    #000 ${last ? 100 : (i + 2) * STEP}%,
    rgba(0,0,0,${last ? 1 : 0}) ${last ? 100 : (i + 3) * STEP}%)`;
};

export default function Footer() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] h-[96px] w-full sm:h-[110px]"
      style={{
        transform: "translateZ(0)", // keeps it on its own GPU layer, always visible
        willChange: "transform",
      }}
    >
      {/* Stacked blur layers */}
      {BLURS.map((blur, i) => (
        <div
          key={blur}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            maskImage: maskFor(i),
            WebkitMaskImage: maskFor(i),
          }}
        />
      ))}

      {/* Soft white haze so it feels cloudy */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0) 100%)",
        }}
      />
    </div>
  );
}