import localFont from "next/font/local";

export const createUserCheddar = localFont({
  src: "../../../../../../public/fonts/cheddar-gothic-sans.otf",
  display: "swap",
});

export const MOBILE_CARD_CLASS =
  "relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#31445f]/80 px-4 pb-5 pt-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl";

export const MOBILE_SECTION_CLASS =
  "rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]";

export const MOBILE_INPUT_CLASS =
  "file:text-foreground placeholder:text-white/45 selection:bg-primary selection:text-primary-foreground border-white/12 flex w-full min-w-0 bg-[rgba(122,145,174,0.30)] py-1 text-sm font-normal text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[color,box-shadow,background-color,border-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-11 rounded-3xl border pl-9 pr-3 [&:-webkit-autofill]:[box-shadow:0_0_0_1000px_rgba(122,145,174,0.95)_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:caret-white [&:-webkit-autofill]:[transition:background-color_9999s_ease-out_0s] [&:-webkit-autofill:hover]:[box-shadow:0_0_0_1000px_rgba(122,145,174,0.95)_inset] [&:-webkit-autofill:focus]:[box-shadow:0_0_0_1000px_rgba(122,145,174,0.95)_inset] [&:-webkit-autofill:active]:[box-shadow:0_0_0_1000px_rgba(122,145,174,0.95)_inset]";

export const MOBILE_TAB_LIST_CLASS = "inline-flex h-auto gap-1 rounded-full p-1";

export const MOBILE_TAB_CLASS =
  "inline-flex min-w-max items-center justify-center whitespace-nowrap rounded-full border border-transparent bg-transparent px-3 py-2 text-[12px] font-semibold text-white/56 shadow-none transition-all ring-offset-background after:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border data-[state=active]:border-[#5993B6]/40 data-[state=active]:bg-[#5993B6]/10 data-[state=active]:text-[#AEEBFF] data-[state=active]:shadow-none";

export const MOBILE_PRIMARY_BUTTON_CLASS =
  "h-12 w-full rounded-full border border-[#E7B03A] bg-[#FAB438] px-4 py-2 text-sm font-semibold text-[#1E2C46] shadow-[0_16px_40px_rgba(250,180,56,0.24)] transition-all duration-200 hover:bg-[#F7C45A] hover:shadow-[0_18px_40px_rgba(250,180,56,0.34)] active:scale-[0.98]";

export const MOBILE_SECONDARY_BUTTON_CLASS =
  "h-11 rounded-full border border-white/14 bg-white/[0.06] px-4 text-sm font-semibold text-white hover:bg-white/[0.09]";
