"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { MobileHeroActions } from "@/components/shared/mobile/mobile-hero-actions";
import { MobileQuickFilters } from "@/components/shared/mobile/mobile-quick-filters";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProtectedMobilePage } from "@/features/auth/components/protected-mobile-page";
import { FixtureBlockNavigator } from "@/features/fixture/components/fixture-block-navigator";
import { FixtureDateSection } from "@/features/fixture/components/fixture-date-section";
import { FixtureDaySelector } from "@/features/fixture/components/fixture-day-selector";
import {
  filterFixtureSectionByDay,
  formatFixtureBlockRange,
  getFixtureDayTabs,
} from "@/features/fixture/utils/fixture.helpers";
import { FEATURED_MATCH_POLL_MS } from "@/features/home/constants/home.constants";
import { PronosticoDialog } from "@/features/pronosticos/components/pronostico-dialog";
import { PronosticosEmptyState } from "@/features/pronosticos/components/pronosticos-empty-state";
import { PronosticosLoadingState } from "@/features/pronosticos/components/pronosticos-loading-state";
import { PronosticosMatchCard } from "@/features/pronosticos/components/pronosticos-match-card";
import { pronosticosService } from "@/features/pronosticos/services/pronosticos.service";
import type { PronosticoPartido } from "@/features/pronosticos/types/pronosticos.types";
import {
  buildPronosticosDateSections,
  buildPronosticosQuickFilterCounts,
  filterPronosticosPartidos,
  type PronosticosQuickFilter,
} from "@/features/pronosticos/utils/pronosticos-mobile.helpers";
import { cheddar } from "@/lib/fonts";

const PRONOSTICOS_HERO_MASCOTS = ["/mascotas/pronosticar.png"];

const PRONOSTICOS_FILTER_LABELS: Record<
  Extract<PronosticosQuickFilter, "abiertos" | "cierra-pronto">,
  string
> = {
  abiertos: "Abiertos",
  "cierra-pronto": "Cierra pronto",
};

export default function PronosticosPage() {
  return (
    <Suspense fallback={<PronosticosLoadingScreen />}>
      <PronosticosPageContent />
    </Suspense>
  );
}

function PronosticosPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const listTopRef = useRef<HTMLDivElement | null>(null);

  const [partidos, setPartidos] = useState<PronosticoPartido[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [statusFilter, setStatusFilter] =
    useState<PronosticosQuickFilter>("cierra-pronto");
  const [selectedDay, setSelectedDay] = useState("todos");
  const [referenceTime, setReferenceTime] = useState(() => Date.now());
  const [nextRefreshAt, setNextRefreshAt] = useState(
    () => Date.now() + FEATURED_MATCH_POLL_MS
  );

  const partidoIdFromQuery = searchParams.get("partidoId");

  const counts = useMemo(
    () => buildPronosticosQuickFilterCounts(partidos),
    [partidos]
  );
  const filteredPartidos = useMemo(
    () => filterPronosticosPartidos(partidos, statusFilter),
    [partidos, statusFilter]
  );
  const dateSections = useMemo(
    () => buildPronosticosDateSections(filteredPartidos),
    [filteredPartidos]
  );
  const safeSectionIndex = useMemo(
    () => Math.min(sectionIndex, Math.max(dateSections.length - 1, 0)),
    [dateSections.length, sectionIndex]
  );
  const currentSection = useMemo(
    () => dateSections[safeSectionIndex] ?? [],
    [dateSections, safeSectionIndex]
  );
  const activeDay = useMemo(
    () =>
      selectedDay !== "todos" && !currentSection.some(([date]) => date === selectedDay)
        ? "todos"
        : selectedDay,
    [currentSection, selectedDay]
  );
  const visibleSection = useMemo(
    () => filterFixtureSectionByDay(currentSection, activeDay),
    [activeDay, currentSection]
  );
  const dayTabs = useMemo(() => getFixtureDayTabs(currentSection), [currentSection]);
  const currentSectionRange = useMemo(
    () => formatFixtureBlockRange(currentSection),
    [currentSection]
  );
  const refreshInSeconds = useMemo(
    () => Math.max(0, Math.ceil((nextRefreshAt - referenceTime) / 1000)),
    [nextRefreshAt, referenceTime]
  );
  const selectedPartido = useMemo(
    () =>
      partidoIdFromQuery
        ? partidos.find((partido) => partido.id === partidoIdFromQuery) ?? null
        : null,
    [partidoIdFromQuery, partidos]
  );

  function scrollToListTop() {
    window.requestAnimationFrame(() => {
      listTopRef.current?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    });
  }

  async function loadPronosticos(options?: { showLoader?: boolean }) {
    if (options?.showLoader !== false) {
      setLoading(true);
    } else {
      setIsRefreshing(true);
    }

    setError(null);

    try {
      const data = await pronosticosService.getFixturePronosticos();
      setPartidos(data);
      setReferenceTime(Date.now());
      setNextRefreshAt(Date.now() + FEATURED_MATCH_POLL_MS);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "No pudimos cargar los partidos para pronosticar.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }

  function handlePreviousSection() {
    setSectionIndex((current) =>
      Math.max(Math.min(current, dateSections.length - 1) - 1, 0)
    );
    setSelectedDay("todos");
    scrollToListTop();
  }

  function handleNextSection() {
    setSectionIndex((current) => {
      const maxIndex = Math.max(dateSections.length - 1, 0);
      const normalizedIndex = Math.min(current, maxIndex);

      return Math.min(normalizedIndex + 1, maxIndex);
    });
    setSelectedDay("todos");
    scrollToListTop();
  }

  function handleStatusFilterChange(value: PronosticosQuickFilter) {
    setStatusFilter(value);
    setSectionIndex(0);
    setSelectedDay("todos");
    scrollToListTop();
  }

  function handleDayChange(value: string) {
    setSelectedDay(value);
    scrollToListTop();
  }

  function handleOpenPronostico(partido: PronosticoPartido) {
    void router.replace(`/pronosticos?partidoId=${partido.id}`, {
      scroll: false,
    });
  }

  function handleDialogOpenChange(open: boolean) {
    if (!open && partidoIdFromQuery) {
      void router.replace("/pronosticos", { scroll: false });
    }
  }

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      void loadPronosticos();
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const tickId = window.setInterval(() => {
      setReferenceTime(Date.now());
    }, 1000);
    const pollId = window.setInterval(() => {
      void loadPronosticos({ showLoader: false });
    }, FEATURED_MATCH_POLL_MS);

    return () => {
      window.clearInterval(tickId);
      window.clearInterval(pollId);
    };
  }, []);

  useEffect(() => {
    if (sectionIndex > dateSections.length - 1) {
      const frame = window.requestAnimationFrame(() => {
        setSectionIndex(Math.max(dateSections.length - 1, 0));
      });

      return () => window.cancelAnimationFrame(frame);
    }
  }, [dateSections.length, sectionIndex]);

  useEffect(() => {
    if (!loading && statusFilter === "cierra-pronto" && filteredPartidos.length === 0) {
      const frame = window.requestAnimationFrame(() => {
        setStatusFilter("abiertos");
      });

      return () => window.cancelAnimationFrame(frame);
    }
  }, [filteredPartidos.length, loading, statusFilter]);

  return (
    <ProtectedMobilePage
      title="Mis pronósticos"
      subtitle={
        <span
          className={`${cheddar.className} block text-[1.125rem] uppercase leading-none tracking-[0.04em] text-white`}
        >
          Cargá tus resultados
          <br />
          antes del cierre
        </span>
      }
      eyebrow=""
      heroFooter={
        <MobileHeroActions
          isRefreshing={isRefreshing}
          onRefresh={() => void loadPronosticos()}
          refreshLabel={`${refreshInSeconds}s`}
        />
      }
      homeStyleHero
      heroLogoSrc="/brand/massm.png"
      heroMascotSrc={PRONOSTICOS_HERO_MASCOTS}
    >
      <div className="bg-transparent pb-8 text-white">
        <div className="flex w-full flex-col gap-3">
          <div ref={listTopRef} className="scroll-mt-4" />

          <section className="-mt-1 rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-3 shadow-[0_12px_34px_rgba(0,0,0,0.24)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#AEEBFF]">
              Filtros aplicables
            </p>
            <div className="mt-3">
              <MobileQuickFilters
                value={statusFilter}
                onValueChange={handleStatusFilterChange}
                items={(
                  Object.keys(PRONOSTICOS_FILTER_LABELS) as Array<
                    keyof typeof PRONOSTICOS_FILTER_LABELS
                  >
                ).map((filterKey) => ({
                  value: filterKey,
                  label: PRONOSTICOS_FILTER_LABELS[filterKey],
                  count: counts[filterKey],
                }))}
              />
            </div>

            <div className="mt-3 space-y-3">
              <FixtureBlockNavigator
                rangeLabel={currentSectionRange}
                blockLabel={`Bloque ${safeSectionIndex + 1} de ${Math.max(dateSections.length, 1)}`}
                currentIndex={safeSectionIndex}
                total={dateSections.length}
                onPrevious={handlePreviousSection}
                onNext={handleNextSection}
              />

              <FixtureDaySelector
                value={activeDay}
                onValueChange={handleDayChange}
                tabs={dayTabs}
              />
            </div>
          </section>

          {error ? (
            <Alert className="rounded-2xl border-red-300/30 bg-red-500/10 text-red-100">
              <AlertTitle>No pudimos cargar los partidos para pronosticar.</AlertTitle>
              <AlertDescription className="text-red-100/80">
                {error}
              </AlertDescription>
            </Alert>
          ) : null}

          {loading ? (
            <PronosticosLoadingState />
          ) : filteredPartidos.length === 0 ? (
            <PronosticosEmptyState
              title="No hay partidos para mostrar"
              description="No hay partidos disponibles para pronosticar con el filtro actual."
            />
          ) : (
            <>
              <section className="space-y-5">
                {visibleSection.map(([date, items]) => (
                  <FixtureDateSection key={date} date={date}>
                    {items.map((partido) => (
                      <PronosticosMatchCard
                        key={partido.id}
                        partido={partido}
                        onAction={handleOpenPronostico}
                      />
                    ))}
                  </FixtureDateSection>
                ))}
              </section>

              <FixtureBlockNavigator
                rangeLabel={currentSectionRange}
                blockLabel={`Bloque ${safeSectionIndex + 1} de ${Math.max(dateSections.length, 1)}`}
                currentIndex={safeSectionIndex}
                total={dateSections.length}
                onPrevious={handlePreviousSection}
                onNext={handleNextSection}
              />
            </>
          )}
        </div>
      </div>

      <PronosticoDialog
        open={Boolean(partidoIdFromQuery && selectedPartido)}
        onOpenChange={handleDialogOpenChange}
        partido={selectedPartido}
        onSaved={() => loadPronosticos({ showLoader: false })}
      />
    </ProtectedMobilePage>
  );
}

function PronosticosLoadingScreen() {
  return <PronosticosLoadingState />;
}
