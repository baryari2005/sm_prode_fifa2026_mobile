"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type HorizontalDragScrollProps = {
  children: React.ReactNode;
  className?: string;
  activeItemSelector?: string;
};

export function HorizontalDragScroll({
  children,
  className,
  activeItemSelector,
}: HorizontalDragScrollProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
  });

  useEffect(() => {
    if (!activeItemSelector || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const activeItem = container.querySelector<HTMLElement>(activeItemSelector);

    if (!activeItem) {
      return;
    }

    const containerWidth = container.clientWidth;
    const itemLeft = activeItem.offsetLeft;
    const itemWidth = activeItem.offsetWidth;
    const nextScrollLeft = itemLeft - containerWidth / 2 + itemWidth / 2;

    container.scrollTo({
      left: Math.max(0, nextScrollLeft),
      behavior: "smooth",
    });
  }, [activeItemSelector, children]);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") {
      return;
    }

    const target = event.target as HTMLElement | null;
    const interactiveTarget = target?.closest(
      'button, [role="button"], [role="tab"], a, input, select, textarea, label'
    );

    if (interactiveTarget) {
      return;
    }

    const container = event.currentTarget;
    dragStateRef.current = {
      isDragging: true,
      startX: event.clientX,
      startScrollLeft: container.scrollLeft,
    };

    container.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragStateRef.current.isDragging || event.pointerType !== "mouse") {
      return;
    }

    const container = event.currentTarget;
    const deltaX = event.clientX - dragStateRef.current.startX;
    container.scrollLeft = dragStateRef.current.startScrollLeft - deltaX;
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") {
      return;
    }

    dragStateRef.current.isDragging = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing [touch-action:pan-x]",
        className
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {children}
    </div>
  );
}
