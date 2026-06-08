"use client";

import { useEffect, useRef, useState, useCallback, ReactNode } from "react";
import { CarouselButton } from "./CarouselNavigation";

interface ProductCarouselProps {
  children: ReactNode;
  headerRight?: ReactNode;
  title: string;
  subtitle?: string;
}

export function ProductCarousel({ children, headerRight, title, subtitle }: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const checkScrollState = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  }, []);

  useEffect(() => {
    checkScrollState();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollState, { passive: true });
      window.addEventListener("resize", checkScrollState);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollState);
      }
      window.removeEventListener("resize", checkScrollState);
    };
  }, [checkScrollState]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const firstChild = scrollContainerRef.current.firstElementChild as HTMLElement;
      if (firstChild) {
        const scrollAmount = firstChild.offsetWidth + 24;
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const firstChild = scrollContainerRef.current.firstElementChild as HTMLElement;
      if (firstChild) {
        const scrollAmount = firstChild.offsetWidth + 24;
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div 
      className="relative flex flex-col w-full max-w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-end justify-between mb-2 md:mb-4 px-1 lg:px-0">
        <div>
          <h2 className="text-xl md:text-3xl font-bold tracking-tight text-neutral-900">{title}</h2>
          {subtitle && <p className="text-neutral-500 mt-1 md:mt-2 text-xs md:text-base max-w-2xl">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-4">
          {headerRight}
        </div>
      </div>

      <div className="relative group">
        <div
          ref={scrollContainerRef}
          className="flex gap-3 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 md:pb-8 pt-2 px-1 lg:px-0 no-scrollbar"
          style={{ scrollBehavior: "smooth" }}
          role="region"
          aria-label={`${title} carousel`}
          tabIndex={0}
        >
          {children}
        </div>

        {/* Floating Desktop Navigation (Hidden on Mobile) */}
        <div className="hidden md:block">
          <div 
            className={`absolute top-1/2 -translate-y-1/2 -left-6 z-10 transition-opacity duration-300 ${
              isHovered && canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <CarouselButton direction="left" onClick={scrollLeft} disabled={!canScrollLeft} />
          </div>
          
          <div 
            className={`absolute top-1/2 -translate-y-1/2 -right-6 z-10 transition-opacity duration-300 ${
              isHovered && canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <CarouselButton direction="right" onClick={scrollRight} disabled={!canScrollRight} />
          </div>
        </div>
      </div>
    </div>
  );
}
