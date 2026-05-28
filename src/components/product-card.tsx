import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingCart } from "lucide-react";
import { productWhatsappHref, type Product } from "@/lib/site-data";

type ProductCardProps = {
  product: Product;
  onClick?: () => void;
};

export function ProductCard({ product, onClick }: ProductCardProps) {
  const imageFit = product.imageFit ?? "cover";

  return (
    <article className="group flex overflow-hidden rounded-2xl border border-gray-100 bg-white transition-shadow hover:shadow-lg">
      <div className="flex w-full flex-col">
        <div
          className={`relative aspect-square overflow-hidden ${product.imageTone ?? "bg-gray-50"} ${
            imageFit === "contain" ? "p-4" : ""
          }`}
        >
          <Image
            alt={product.name}
            className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${
              imageFit === "contain" ? "object-contain mix-blend-multiply" : "object-cover"
            }`}
            fill
            sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw"
            src={product.image}
          />
        </div>
        <div className="flex flex-1 flex-col border-t border-gray-50 p-3 md:p-4">
          <h3 className="text-xs font-bold text-gray-900 md:text-sm line-clamp-1">{product.name}</h3>
          <span className="mt-1 text-sm font-semibold text-leaf md:text-base">₹{product.price.toLocaleString("en-IN")}</span>

          <div className="mt-3 flex flex-row gap-1.5">
            <a
              className="flex flex-1 items-center justify-center gap-1 rounded-full bg-leaf px-2 py-1.5 text-[10px] font-semibold text-white transition-colors hover:bg-leaf-hover md:text-xs md:px-3 md:py-2"
              href={productWhatsappHref(product.name)}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <ShoppingCart className="h-2.5 w-2.5 md:h-3.5 md:w-3.5" />
              Buy
            </a>
            <Link
              className="flex flex-1 items-center justify-center gap-1 rounded-full border border-gray-200 px-2 py-1.5 text-[10px] font-semibold text-gray-700 transition-colors hover:bg-gray-50 md:text-xs md:px-3 md:py-2"
              href={`/product/${product.id}`}
            >
              <Eye className="h-2.5 w-2.5 md:h-3.5 md:w-3.5" />
              Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
