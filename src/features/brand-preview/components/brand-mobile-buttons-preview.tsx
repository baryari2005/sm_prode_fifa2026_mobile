export function BrandMobileButtonsPreview() {
  return (
    <div className="grid gap-3 rounded-[1.6rem] border border-[#5993b6]/16 bg-[#f7fbff] p-4">
      <button className="h-12 rounded-[1.1rem] bg-[#fab438] px-4 text-sm font-semibold text-[#1e2c46] shadow-[0_10px_22px_rgba(250,180,56,0.32)]">
        Botón principal
      </button>
      <button className="h-12 rounded-[1.1rem] border border-[#5993b6]/35 bg-white px-4 text-sm font-semibold text-[#1e2c46]">
        Botón secundario
      </button>
      <button className="h-12 rounded-[1.1rem] bg-[#1e2c46] px-4 text-sm font-semibold text-white">
        Botón oscuro
      </button>
    </div>
  );
}
