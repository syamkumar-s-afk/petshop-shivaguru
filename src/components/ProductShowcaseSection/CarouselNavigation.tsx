import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}

export function CarouselButton({ direction, onClick, disabled }: CarouselButtonProps) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={`Scroll ${direction}`}
      className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border shadow-sm transition-all duration-300 ${
        !disabled
          ? "border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50 hover:border-neutral-300 hover:scale-105 cursor-pointer shadow-md"
          : "border-neutral-100 bg-white/50 text-neutral-300 cursor-not-allowed opacity-0"
      }`}
    >
      <Icon size={24} strokeWidth={2} />
    </button>
  );
}
