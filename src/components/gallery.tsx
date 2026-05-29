"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const galleryImages = [
  {
    src: "/images/gallery/golden-retriever.png",
    alt: "Golden retriever puppy",
  },
  {
    src: "/images/gallery/persian-cat.png",
    alt: "Persian cat",
  },
  {
    src: "/images/gallery/macaw-parrot.png",
    alt: "Macaw parrot",
  },
  {
    src: "/images/gallery/beagle-puppy.png",
    alt: "Beagle puppy",
  },
  {
    src: "/images/gallery/siamese-cat.png",
    alt: "Siamese cat",
  },
  {
    src: "/images/gallery/cockatiel.png",
    alt: "Cockatiel bird",
  },
  {
    src: "/images/gallery/husky-puppy.png",
    alt: "Husky puppy",
  },
  {
    src: "/images/gallery/maine-coon-cat.png",
    alt: "Maine coon cat",
  },
  {
    src: "/images/gallery/budgie.png",
    alt: "Blue and yellow budgie",
  },
  {
    src: "/images/gallery/labrador-puppy.png",
    alt: "Labrador puppy",
  },
];

type GalleryRowProps = {
  images: typeof galleryImages;
  direction?: 1 | -1;
};

function GalleryRow({ images, direction = 1 }: GalleryRowProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isUserInteracting = useRef(false);
  const resumeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let frame = 0;
    let lastTime = performance.now();
    const speed = 0.035;

    if (direction < 0) {
      scroller.scrollLeft = scroller.scrollWidth / 2;
    }

    const animate = (time: number) => {
      const delta = Math.min(time - lastTime, 32);
      lastTime = time;

      if (!isUserInteracting.current) {
        const loopPoint = scroller.scrollWidth / 2;
        scroller.scrollLeft += direction * delta * speed;

        if (direction > 0 && scroller.scrollLeft >= loopPoint) {
          scroller.scrollLeft -= loopPoint;
        }
        if (direction < 0 && scroller.scrollLeft <= 0) {
          scroller.scrollLeft += loopPoint;
        }
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    };
  }, [direction]);

  // Helper to pause automatic scrolling when user touches/drags
  const startInteraction = () => {
    isUserInteracting.current = true;
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
  };

  // Helper to resume automatic scrolling after user stops interacting
  const stopInteraction = () => {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      isUserInteracting.current = false;
    }, 1500); // 1.5 seconds delay before resuming automatic scroll
  };

  // Native Scroll handler for boundary looping (essential for manual swipe inertia looping)
  const handleScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const loopPoint = scroller.scrollWidth / 2;

    if (direction > 0 && scroller.scrollLeft >= loopPoint) {
      scroller.scrollLeft -= loopPoint;
    } else if (direction < 0 && scroller.scrollLeft <= 0) {
      scroller.scrollLeft += loopPoint;
    }
  };

  // Dragging logic for Desktop (since desktop has no native swipe)
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  const handlePointerDown = (event: React.PointerEvent) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    
    // Only drag on desktop/mouse (touch is handled natively by touch events)
    if (event.pointerType === "touch") return; 

    isDragging.current = true;
    startInteraction();
    startX.current = event.clientX;
    startScroll.current = scroller.scrollLeft;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    const scroller = scrollerRef.current;
    if (!scroller || !isDragging.current) return;

    scroller.scrollLeft = startScroll.current - (event.clientX - startX.current);
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    if (isDragging.current) {
      isDragging.current = false;
      stopInteraction();
    }
  };

  return (
    <div
      aria-label="Draggable pet gallery row"
      className="cursor-grab overflow-x-auto active:cursor-grabbing [&::-webkit-scrollbar]:hidden select-none"
      onScroll={handleScroll}
      
      // Desktop Pointer Dragging
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        if (isDragging.current) {
          isDragging.current = false;
          stopInteraction();
        }
      }}

      // Mobile Native Touch events (seamlessly pauses JS scroll during swipe)
      onTouchStart={startInteraction}
      onTouchEnd={stopInteraction}
      onTouchCancel={stopInteraction}
      
      ref={scrollerRef}
      role="list"
      style={{ 
        scrollbarWidth: "none", 
        WebkitOverflowScrolling: "touch", // Smooth iOS scrolling
        touchAction: "pan-x" // Enable smooth horizontal swipes natively on iOS
      }}
    >
      <div className="flex w-max items-center gap-5 py-1">
        {[...images, ...images].map((image, index) => (
          <Image
            alt={image.alt}
            className="h-28 w-32 shrink-0 select-none object-contain md:h-36 md:w-40"
            draggable={false}
            height={180}
            key={`${image.src}-${index}`}
            src={image.src}
            width={180}
          />
        ))}
      </div>
    </div>
  );
}

export function Gallery() {
  const rowOneImages = galleryImages.slice(0, 5);
  const rowTwoImages = galleryImages.slice(5);

  return (
    <section className="mb-14 overflow-hidden" id="gallery" aria-labelledby="gallery-title">
      <div className="mb-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-leaf">
          Gallery
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-forest md:text-3xl" id="gallery-title">
          Pets Gallery
        </h2>
      </div>

      <div
        className="space-y-3"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)",
        }}
      >
        <GalleryRow images={rowOneImages} />
        <GalleryRow images={rowTwoImages} direction={-1} />
      </div>
    </section>
  );
}
