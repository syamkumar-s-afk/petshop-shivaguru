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
  {
    src: "/images/exotic_pets_banner.png",
    alt: "Exotic Pets Banner",
  },
  {
    src: "/images/premium_food_banner.png",
    alt: "Premium Food Banner",
  },
  {
    src: "/images/happy_puppies_banner.png",
    alt: "Happy Dogs Premium Dog Food Banner",
    hasOverlay: true,
    overlayTitle: "Premium Nutrition for Every Life Stage",
    overlayBadge: "Puppy • Adult • Senior",
    overlayProducts: [
      "/images/products/foods/dogs/drools-adult-dog.png",
      "/images/products/foods/dogs/pedigree-adult-chicken.png",
      "/images/products/foods/dogs/ninja-dog-food.png",
    ]
  },
  {
    src: "/images/pet_wellness_banner.png",
    alt: "Pet Wellness Banner",
  },
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
    <section className="mb-6 md:mb-12 flex flex-col gap-6 md:gap-8">
      {/* Premium Clean Interactive Banner Slider - Full width with aspect ratio */}
      <div 
        className="relative w-full overflow-hidden rounded-3xl bg-forest-light group shadow-lg border border-gray-100"
        style={{ aspectRatio: "1024/420" }}
      >
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlideIndex;
          return (
            <div
              key={slide.src}
              className={`absolute inset-0 h-full w-full transition-all duration-1000 ${
                isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 pointer-events-none z-0"
              }`}
            >
              {/* Slide Background Image */}
              <Image
                alt={slide.alt}
                className="absolute inset-0 h-full w-full object-cover"
                height={420}
                priority={index === 0}
                src={slide.src}
                width={1024}
              />

              {/* Product Composite Overlay */}
              {slide.overlayProducts && (
                <div className="absolute inset-y-0 left-[5%] sm:left-[15%] md:left-[22%] flex items-center justify-center z-10 pointer-events-auto">
                  {slide.overlayProducts.map((prod, i) => (
                    <div 
                      key={i} 
                      className={`relative transition-transform duration-500 hover:-translate-y-2 ${
                        i === 1 ? 'w-24 h-32 xs:w-32 xs:h-40 sm:w-40 sm:h-56 md:w-48 md:h-64 z-10' : 'w-20 h-28 xs:w-28 xs:h-36 sm:w-36 sm:h-48 md:w-40 md:h-56 z-0'
                      }`}
                      style={{
                        marginLeft: i > 0 ? '-15%' : '0',
                        filter: 'drop-shadow(0px 15px 10px rgba(0,0,0,0.3))'
                      }}
                    >
                      <Image src={prod} alt="Premium Dog Food" fill className="object-contain drop-shadow-xl" />
                    </div>
                  ))}
                </div>
              )}

              {/* Text Overlay for slides that have it */}
              {slide.hasOverlay && (
                <div className="absolute inset-0 flex flex-col justify-center items-end p-6 md:p-12 z-20 pointer-events-none">
                  <div className="max-w-[45%] text-right flex flex-col items-end gap-2 md:gap-3 pointer-events-auto">
                    {slide.overlayBadge && (
                      <span className="inline-block px-3 py-1 bg-forest text-white text-[9px] md:text-[11px] font-bold tracking-wider uppercase rounded-full shadow-sm border border-forest/10">
                        {slide.overlayBadge}
                      </span>
                    )}
                    <h2 className="text-sm xs:text-base sm:text-xl md:text-2xl lg:text-3xl font-black leading-tight text-[#0a4112] drop-shadow-sm">
                      {slide.overlayTitle}
                    </h2>
                    <p className="text-[8px] xs:text-[10px] sm:text-xs md:text-sm text-gray-700 font-semibold max-w-sm drop-shadow-sm">
                      Drools, Pedigree, and Ninja Premium Dog Food variants (1kg to 20kg) for all stages.
                    </p>
                    <button 
                      onClick={() => {
                        const productsEl = document.getElementById("products");
                        if (productsEl) {
                          productsEl.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="mt-1 cursor-pointer rounded-full bg-[#0a4112] px-4 py-1.5 text-[8px] sm:text-[10px] md:text-xs font-bold text-white hover:bg-leaf transition-colors shadow-md"
                    >
                      Shop Brands
                    </button>
                  </div>
                </div>
              )}
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

      {/* Info Section (Title + Description + Category Selection) */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="mb-2 text-[20px] xs:text-[22px] sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#0a4112] whitespace-normal">
            Available Pets & Products in Pollachi
          </h1>
          <p className="max-w-xl text-xs md:text-base text-gray-600">
            Explore our wide range of exotic pets, premium pet food, accessories and supplies.
          </p>
        </div>

        <CategoryMarquee
          activeCategory={activeCategory}
          className="flex w-full"
          onCategoryChange={onCategoryChange}
        />
      </div>
    </section>
  );
}
