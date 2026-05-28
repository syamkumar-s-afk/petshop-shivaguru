"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { categories, site } from "@/lib/site-data";

type HeroProps = {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

type CategoryMarqueeProps = {
  activeCategory: string;
  className: string;
  onCategoryChange: (category: string) => void;
};

const categoryChip = (isActive: boolean) =>
  isActive
    ? "flex shrink-0 items-center gap-1.5 rounded-full bg-forest px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors md:text-sm"
    : "flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm transition-colors hover:border-leaf/30 hover:bg-forest-light hover:text-forest md:text-sm";

function CategoryMarquee({ activeCategory, className, onCategoryChange }: CategoryMarqueeProps) {
  const activeCatObj = categories.find((cat) => cat.id === activeCategory) || categories[0];
  const inactiveCategories = categories.filter((cat) => cat.id !== activeCategory);

  const renderCategoryButton = (isDuplicate = false) =>
    inactiveCategories.map(({ id, label, icon: Icon }) => {
      return (
        <button
          aria-hidden={isDuplicate}
          className={categoryChip(false)}
          key={`${isDuplicate ? "copy" : "main"}-${id}`}
          onClick={() => {
            onCategoryChange(id);
          }}
          role={isDuplicate ? "presentation" : "tab"}
          tabIndex={isDuplicate ? -1 : 0}
          type="button"
        >
          <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
          <span className="whitespace-nowrap">{label}</span>
        </button>
      );
    });

  const ActiveIcon = activeCatObj.icon;

  return (
    <div className={`${className} flex items-center gap-2 md:gap-3 max-w-full relative`}>
      {/* Sticky Left: Active Category */}
      <div className="shrink-0 flex items-center pr-2 md:pr-3 border-r border-gray-200/80 bg-white z-10">
        <button
          className={categoryChip(true)}
          type="button"
          onClick={() => {
            onCategoryChange(activeCatObj.id);
          }}
        >
          <ActiveIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
          <span className="whitespace-nowrap">{activeCatObj.label}</span>
        </button>
      </div>

      {/* Right: Scrolling Inactive Categories */}
      <div
        className="flex-1 no-scrollbar pr-1 overflow-hidden"
        role="tablist"
        aria-label="Product categories"
      >
        <div className="flex w-max gap-2.5 py-1 pr-2 animate-category-marquee">
          <div className="flex gap-2.5 pr-2.5">{renderCategoryButton()}</div>
          <div className="flex gap-2.5 pr-2.5">{renderCategoryButton(true)}</div>
        </div>
      </div>
    </div>
  );
}

const heroSlides = [
  "/images/exotic_birds_banner.png",
  "/images/happy_puppies_banner.png",
  "/images/premium_food_banner.png",
  "/images/pet_wellness_banner.png",
];

export function Hero({ activeCategory, onCategoryChange }: HeroProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mb-6 md:mb-12 flex flex-col gap-4 lg:flex-row lg:gap-8">
      <div className="flex w-full lg:w-1/2 flex-col justify-center">
        <h1 className="mb-2 text-[20px] xs:text-[22px] sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#0a4112] whitespace-normal">
          Available Pets & Products in Pollachi
        </h1>
        <p className="mb-4 md:mb-6 lg:mb-8 max-w-xl text-xs md:text-base text-gray-600">
          Explore our wide range of exotic pets, premium pet food, accessories and supplies.
        </p>

        {/* Desktop Marquee */}
        <CategoryMarquee
          activeCategory={activeCategory}
          className="hidden lg:flex"
          onCategoryChange={onCategoryChange}
        />
      </div>

      {/* Premium Clean Interactive Banner Slider */}
      <div className="relative flex h-[220px] sm:h-[260px] w-full overflow-hidden rounded-3xl bg-forest-light lg:h-[320px] lg:w-1/2 group shadow-lg border border-gray-100">
        {heroSlides.map((slideSrc, index) => {
          const isActive = index === currentSlideIndex;
          return (
            <div
              key={slideSrc}
              className={`absolute inset-0 h-full w-full transition-all duration-1000 ${
                isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 pointer-events-none z-0"
              }`}
            >
              {/* Slide Background Image */}
              <Image
                alt="Exotic Pets Banner"
                className="absolute inset-0 h-full w-full object-cover"
                height={500}
                priority={index === 0}
                src={slideSrc}
                width={600}
              />
            </div>
          );
        })}

        {/* Manual Carousel Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/25 backdrop-blur-sm px-3 py-1.5 rounded-full z-20">
          {heroSlides.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => setCurrentSlideIndex(dotIndex)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                dotIndex === currentSlideIndex
                  ? "w-4 bg-white"
                  : "w-1.5 bg-white/40 hover:bg-white"
              }`}
              aria-label={`Go to slide ${dotIndex + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Marquee (appears after banner) */}
      <CategoryMarquee
        activeCategory={activeCategory}
        className="flex lg:hidden"
        onCategoryChange={onCategoryChange}
      />
    </section>
  );
}
