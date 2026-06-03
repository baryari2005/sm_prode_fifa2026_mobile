"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProtectedMobilePage } from "@/features/auth/components/protected-mobile-page";
import { FixtureBlockNavigator } from "@/features/fixture/components/fixture-block-navigator";
import { FixtureDateSection } from "@/features/fixture/components/fixture-date-section";
import { FixtureDaySelector } from "@/features/fixture/components/fixture-day-selector";
import { FixtureEmptyState } from "@/features/fixture/components/fixture-empty-state";
import { FixtureHelpDrawer } from "@/features/fixture/components/fixture-help-drawer";
import { FixtureLoadingState } from "@/features/fixture/components/fixture-loading-state";
import { FixtureMatchCard } from "@/features/fixture/components/fixture-match-card";
import { FixtureQuickFilters } from "@/features/fixture/components/fixture-quick-filters";
import { MobileFixtureHeroActions } from "@/features/fixture/components/mobile-fixture-hero-actions";
import { fixtureService } from "@/features/fixture/services/fixture.service";
import type { FixturePartido } from "@/features/fixture/types/fixture.types";
import {
  buildFixtureDateSections,
  filterFixtureSectionByDay,
  filterPartidosByEstado,
  findNextUpcomingMatchId,
  formatFixtureBlockRange,
  getFixtureDayTabs,
  getFixtureStatus,
  groupPartidosByDate,
  type FixtureQuickFilter,
} from "@/features/fixture/utils/fixture.helpers";
import { FEATURED_MATCH_POLL_MS } from "@/features/home/constants/home.constants";
import { cheddar } from "@/lib/fonts";

const FIXTURE_HERO_MASCOTS = ["/mascotas/fixture.png"];

export function MobileFixturePage() {
  const listTopRef = useRef<HTMLDivElement | null>(null);

  const [partidos, setPartidos] = useState<FixturePartido[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [statusFilter, setStatusFilter] = useState<FixtureQuickFilter>("todos");
  const [selectedDay, setSelectedDay] = useState("todos");
  const [referenceTime, setReferenceTime] = useState(() => Date.now());
  const [nextRefreshAt, setNextRefreshAt] = useState(
    () => Date.now() + FEATURED_MATCH_POLL_MS
  );

  const filteredPartidos = useMemo(
    () => filterPartidosByEstado(partidos, statusFilter),
    [partidos, statusFilter]
  );
  const groupedPartidos = useMemo(
    () => groupPartidosByDate(filteredPartidos),
    [filteredPartidos]
  );
  const dateSections = useMemo(
    () => buildFixtureDateSections(groupedPartidos),
    [groupedPartidos]
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
  const nextUpcomingMatchId = useMemo(
    () => findNextUpcomingMatchId(filteredPartidos),
    [filteredPartidos]
  );
  const refreshInSeconds = useMemo(
    () => Math.max(0, Math.ceil((nextRefreshAt - referenceTime) / 1000)),
    [nextRefreshAt, referenceTime]
  );

  const summary = useMemo(() => {
    let proximos = 0;
    let finalizados = 0;
    let enVivo = 0;

    for (const partido of partidos) {
      const status = getFixtureStatus(partido);

      if (status.isFinished) {
        finalizados += 1;
      } else if (status.isLive) {
        enVivo += 1;
        proximos += 1;
      } else {
        proximos += 1;
      }
    }

    return {
      cargados: partidos.length,
      proximos,
      finalizados,
      todos: partidos.length,
      "en-vivo": enVivo,
      proximosFiltro: partidos.filter((partido) => {
        const status = getFixtureStatus(partido);
        return status.isUpcoming && !status.isLive && !status.isFinished;
      }).length,
      finalizadosFiltro: finalizados,
    };
  }, [partidos]);

  function scrollToListTop() {
    window.requestAnimationFrame(() => {
      listTopRef.current?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    });
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

  function handleStatusFilterChange(value: FixtureQuickFilter) {
    setStatusFilter(value);
    setSectionIndex(0);
    setSelectedDay("todos");
    scrollToListTop();
  }

  function handleDayChange(value: string) {
    setSelectedDay(value);
    scrollToListTop();
  }

  async function loadFixture(options?: { showLoader?: boolean }) {
    if (options?.showLoader !== false) {
      setLoading(true);
    } else {
      setIsRefreshing(true);
    }

    setError(null);

    try {
      const data = await fixtureService.getPartidos();
      setPartidos(data);
      setReferenceTime(Date.now());
      setNextRefreshAt(Date.now() + FEATURED_MATCH_POLL_MS);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "No pudimos cargar los partidos.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      void loadFixture();
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const tickId = window.setInterval(() => {
      setReferenceTime(Date.now());
    }, 1000);
    const pollId = window.setInterval(() => {
      void loadFixture({ showLoader: false });
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

  return (
    <ProtectedMobilePage
      title="Fixture"
      subtitle={
        <span
          className={`${cheddar.className} block text-[1.125rem] uppercase leading-none tracking-[0.04em] text-white`}
        >
          Seguí el calendario
          <br />
          del Mundial
        </span>
      }
      heroFooter={
        <MobileFixtureHeroActions
          isRefreshing={isRefreshing}
          onRefresh={() => void loadFixture()}
          refreshLabel={`${refreshInSeconds}s`}
        />
      }
      homeStyleHero
      heroLogoSrc="/brand/massm.png"
      heroMascotSrc={FIXTURE_HERO_MASCOTS}
    >
      <div className="bg-transparent pb-8 text-white">
        <div className="flex w-full flex-col gap-4">
          <div ref={listTopRef} className="scroll-mt-4" />

          <section className="-mt-2 -mx-1 rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-3.5 text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#AEEBFF]">
              Filtros aplicables
            </p>

            <div className="mt-3 space-y-3">
              <FixtureQuickFilters
                value={statusFilter}
                onValueChange={handleStatusFilterChange}
                counts={{
                  todos: summary.todos,
                  proximos: summary.proximosFiltro,
                  "en-vivo": summary["en-vivo"],
                  finalizados: summary.finalizadosFiltro,
                }}
              />

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
              <AlertTitle>No pudimos cargar los partidos.</AlertTitle>
              <AlertDescription className="text-red-100/80">
                {error}
              </AlertDescription>
            </Alert>
          ) : null}

          {loading ? (
            <FixtureLoadingState />
          ) : filteredPartidos.length === 0 ? (
            <FixtureEmptyState />
          ) : (
            <>
              <section className="-mx-1 rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-3.5 text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#AEEBFF]">
                  Todos los partidos
                </p>

                <div className="mt-3 space-y-5">
                {visibleSection.map(([date, items]) => (
                  <FixtureDateSection key={date} date={date}>
                    {items.map((partido) => (
                      <FixtureMatchCard
                        key={partido.id}
                        partido={partido}
                        isHighlighted={partido.id === nextUpcomingMatchId}
                      />
                    ))}
                  </FixtureDateSection>
                ))}
                </div>
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

          <FixtureHelpDrawer />
        </div>
      </div>
    </ProtectedMobilePage>
  );
}
