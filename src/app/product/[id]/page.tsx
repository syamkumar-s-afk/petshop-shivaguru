import { notFound } from "next/navigation";
import { products } from "@/lib/site-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductDetailContent } from "@/components/product-detail-content";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} – Exotic Pets World Pollachi`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const sameCategoryProducts = products.filter((p) => p.category === product.category && p.id !== product.id);
  const relatedProducts = [...sameCategoryProducts, ...products.filter((p) => p.category !== product.category && p.id !== product.id)].slice(0, 8);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <ProductDetailContent product={product} relatedProducts={relatedProducts} />
      </main>
      <SiteFooter />
    </>
  );
}
