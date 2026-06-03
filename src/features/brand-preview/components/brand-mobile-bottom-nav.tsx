import { bottomNavMock } from "@/features/brand-preview/constants/mobile-preview.mock";

export function BrandMobileBottomNav() {
  return (
    <div className="mx-auto w-full max-w-[390px] rounded-[2rem] border border-[#5993b6]/18 bg-white p-4 shadow-[0_16px_40px_rgba(30,44,70,0.12)]">
      <div className="rounded-[1.5rem] bg-[#1e2c46] px-3 pb-4 pt-3 text-white">
        <div className="grid grid-cols-5 gap-2">
          {bottomNavMock.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2 text-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  item.active ? "bg-[#fab438] text-[#1e2c46]" : "bg-white/10 text-white"
                }`}
              >
                <item.icon className="h-4 w-4" />
              </div>
              <p className={`text-[0.68rem] font-medium ${item.active ? "text-[#fab438]" : "text-white/72"}`}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
