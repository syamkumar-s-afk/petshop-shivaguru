import { CtaBanner } from "@/components/cta-banner";
import { ProductCatalog } from "@/components/product-catalog";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Location } from "@/components/location";
import { Testimonial } from "@/components/testimonial";
import { Faq } from "@/components/faq";
import { Gallery } from "@/components/gallery";
import { ShowcaseSectionsDemo } from "@/components/ShowcaseSectionsDemo";
import { BrandsMarquee } from "@/components/brands-marquee";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <ProductCatalog />
        <ShowcaseSectionsDemo />
        <Testimonial />
        <Gallery />
        <BrandsMarquee />
        <Location />
        <Faq />
        <CtaBanner />
      </main>
      <SiteFooter />
    </>
  );
}
