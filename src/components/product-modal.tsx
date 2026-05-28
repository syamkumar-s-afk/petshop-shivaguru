import { useState } from "react";
import Image from "next/image";
import { X, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { products, productWhatsappHref, type Product } from "@/lib/site-data";
import { ProductCard } from "@/components/product-card";

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onProductClick: (product: Product) => void;
};

export function ProductModal({ isOpen, onClose, product, onProductClick }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const images = product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages : [product.image];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-6" onClick={onClose}>
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl" 
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-gray-500 backdrop-blur-sm transition-colors hover:bg-gray-100 hover:text-gray-900"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery */}
          <div className="relative aspect-square md:aspect-auto md:h-full bg-gray-50">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <Image
                src={images[currentImageIndex]}
                alt={product.name}
                fill
                className={`object-cover ${product.imageFit === "contain" ? "object-contain mix-blend-multiply" : ""}`}
              />
            </div>
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-sm backdrop-blur-sm hover:bg-white"
                  onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-sm backdrop-blur-sm hover:bg-white"
                  onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {images.map((_, idx) => (
                    <div key={idx} className={`h-2 w-2 rounded-full transition-colors ${idx === currentImageIndex ? "bg-forest" : "bg-gray-300"}`} />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
            <p className="mt-2 text-2xl font-semibold text-leaf">₹{product.price.toLocaleString("en-IN")}</p>
            
            <div className="mt-6 flex flex-wrap gap-2">
              {product.brand && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">Brand: {product.brand}</span>
              )}
              {product.age && (
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">Age: {product.age}</span>
              )}
              {product.dietaryRequirements && (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">{product.dietaryRequirements}</span>
              )}
            </div>

            <div className="mt-6 border-t border-gray-100 pt-6">
              <h3 className="mb-2 text-sm font-semibold text-gray-900">Description</h3>
              <p className="text-sm leading-relaxed text-gray-600">{product.description}</p>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-leaf px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-leaf-hover"
                href={productWhatsappHref(product.name)}
                target="_blank"
                rel="noreferrer"
              >
                <Phone className="h-4 w-4" />
                Enquire via WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-100 bg-gray-50 p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Related Products</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} onClick={() => { setCurrentImageIndex(0); onProductClick(p); }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
