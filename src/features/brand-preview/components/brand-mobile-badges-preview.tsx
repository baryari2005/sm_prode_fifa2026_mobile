const badges = [
  { label: "Abierto", className: "bg-[#eaf6ff] text-[#1e5e86] border-[#9ed0ec]" },
  { label: "Cierra pronto", className: "bg-[#fff3d8] text-[#8a5a00] border-[#f2cb74]" },
  { label: "Cerrado", className: "bg-[#eef1f5] text-[#5d6a7e] border-[#c9d2df]" },
  { label: "Finalizado", className: "bg-[#edf7f0] text-[#276143] border-[#9cc9ad]" },
];

export function BrandMobileBadgesPreview() {
  return (
    <div className="flex flex-wrap gap-2 rounded-[1.6rem] border border-[#5993b6]/16 bg-white p-4">
      {badges.map((badge) => (
        <span
          key={badge.label}
          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${badge.className}`}
        >
          {badge.label}
        </span>
      ))}
    </div>
  );
}
