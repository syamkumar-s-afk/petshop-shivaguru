import React from "react";
import Image from "next/image";

const brands = [
  { id: "pedigree", name: "Pedigree" },
  { id: "drools", name: "Drools" },
  { id: "farmina", name: "N&D" },
  { id: "whiskas", name: "Whiskas" },
  { id: "meo", name: "Me-O" },
  { id: "purepet", name: "Purepet" },
  { id: "caninecreek", name: "Canine Creek" },
  { id: "royalcanin", name: "Royal Canin" },
  { id: "himalaya", name: "Himalaya Pet Care" },
];

export function BrandsMarquee() {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100 overflow-hidden w-screen relative left-1/2 right-1/2 -mx-[50vw]">
      <div className="mx-auto max-w-7xl px-4 md:px-8 mb-6">
        <h2 className="text-center text-sm font-bold tracking-widest text-gray-400 uppercase">
          Trusted by Top Pet Care Brands
        </h2>
      </div>

      <div className="relative flex max-w-[100vw] overflow-hidden group">
        {/* Left Gradient Fade */}
        <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-gray-50 to-transparent sm:w-32"></div>

        {/* Marquee Container */}
        <div className="flex w-max min-w-full animate-marquee items-center justify-around gap-12 px-6 sm:gap-20 sm:px-10 group-hover:[animation-play-state:paused]">
          {/* Map twice for seamless infinite loop */}
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="relative flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110"
            >
              <Image
                src={`/images/brands/${brand.id}.png`}
                alt={`${brand.name} logo`}
                width={160}
                height={60}
                className="object-contain h-10 sm:h-12 w-auto drop-shadow-sm"
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-gray-50 to-transparent sm:w-32"></div>
      </div>
    </section>
  );
}
