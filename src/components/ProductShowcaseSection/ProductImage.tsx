import Image from "next/image";

interface ProductImageProps {
  src: string;
  alt: string;
  isHovered?: boolean;
}

export function ProductImage({ src, alt, isHovered }: ProductImageProps) {
  return (
    <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 rounded-t-2xl">
      {/* 
        In a real app, you might have a second image to cross-fade on hover
        e.g., hoverSrc && <Image src={hoverSrc} className={`... ${isHovered ? "opacity-100" : "opacity-0"}`} />
      */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain p-4 transition-transform duration-300 group-hover:scale-105 mix-blend-multiply"
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
      />
    </div>
  );
}
