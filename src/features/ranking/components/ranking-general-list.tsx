import type { RankingRow } from "@/features/ranking/types/ranking.types";
import { RankingUserCard } from "@/features/ranking/components/ranking-user-card";

type RankingGeneralListProps = {
  rows: RankingRow[];
  currentUserId?: string | null;
};

export function RankingGeneralList({
  rows,
  currentUserId,
}: RankingGeneralListProps) {
  return (
    <section className="space-y-2.5">
      {rows.map((row, index) => (
        <RankingUserCard
          key={row.usuarioId}
          row={row}
          fallbackPosition={index + 1}
          currentUserId={currentUserId}
        />
      ))}
    </section>
  );
}
