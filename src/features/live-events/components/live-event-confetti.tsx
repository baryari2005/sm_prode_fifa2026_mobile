const CONFETTI_PIECES = [
  { left: "12%", delay: "0ms", duration: "2200ms", color: "bg-[#F7B731]" },
  { left: "24%", delay: "180ms", duration: "2600ms", color: "bg-[#39A935]" },
  { left: "38%", delay: "320ms", duration: "2400ms", color: "bg-[#7CE7EB]" },
  { left: "51%", delay: "80ms", duration: "2500ms", color: "bg-white" },
  { left: "64%", delay: "240ms", duration: "2300ms", color: "bg-[#F7B731]" },
  { left: "76%", delay: "140ms", duration: "2600ms", color: "bg-[#39A935]" },
  { left: "88%", delay: "280ms", duration: "2100ms", color: "bg-[#7CE7EB]" },
];

export function LiveEventConfetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {CONFETTI_PIECES.map((piece, index) => (
        <span
          key={`${piece.left}-${index}`}
          className={`absolute top-[-12%] h-4 w-2 rounded-full opacity-90 ${piece.color}`}
          style={{
            left: piece.left,
            animationName: "live-event-confetti",
            animationDuration: piece.duration,
            animationTimingFunction: "ease-in",
            animationDelay: piece.delay,
            animationIterationCount: 1,
            transform: `rotate(${index * 16}deg)`,
          }}
        />
      ))}
    </div>
  );
}
