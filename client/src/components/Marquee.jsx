/**
 * Infinite scrolling tech strip.
 * items: array of strings to display.
 * reverse: scroll direction.
 */
export default function Marquee({ items, reverse = false }) {
  // Duplicate items so the loop is seamless
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-t border-b border-white/5 py-4 select-none">
      <div
        className={`flex gap-12 w-max ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-white/20 text-xs tracking-[0.25em] uppercase whitespace-nowrap flex items-center gap-3"
          >
            <span className="text-white/10">◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
