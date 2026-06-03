type RankingSectionEmptyProps = {
  title: string;
  description: string;
};

export function RankingSectionEmpty({
  title,
  description,
}: RankingSectionEmptyProps) {
  return (
    <section className="rounded-[1.6rem] border border-emerald-400/10 bg-[#052820] p-5 text-center shadow-[0_12px_28px_rgba(0,0,0,0.22)]">
      <h3 className="text-base font-black text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/58">{description}</p>
    </section>
  );
}
