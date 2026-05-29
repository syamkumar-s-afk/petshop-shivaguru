"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Apple,
  BadgeCheck,
  Baby,
  Brain,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Home,
  Leaf,
  Phone,
  ShoppingCart,
  Smile,
  Sparkles,
  Star,
  Shield,
  Heart,
  CheckCircle2,
  AlertTriangle,
  Syringe,
  type LucideIcon,
} from "lucide-react";
import { productWhatsappHref, type Product } from "@/lib/site-data";
import { ProductCard } from "@/components/product-card";
import { addToCart } from "@/lib/cart-store";

type ProductDetailContentProps = {
  product: Product;
  relatedProducts: Product[];
};

type ProductBadge = {
  label: string;
  detail: string;
  icon: LucideIcon;
};

type ProductCareProfile = {
  careLevel: string;
  careNote: string;
  perfectFor: string[];
  included: string[];
};

function productQualityBadges(product: Product): ProductBadge[] {
  const name = product.name.toLowerCase();
  const isPuppy = product.category === "puppies" || name.includes("puppy");
  const isDogFood = product.category === "food" && name.includes("dog");
  const isCatFood = product.category === "food" && name.includes("cat");

  if (product.category === "food") {
    return [
      { label: name.includes("puppy") ? "Puppy Growth" : "Daily Nutrition", detail: product.age ?? "Balanced formula", icon: Baby },
      { label: "High Protein", detail: product.dietaryRequirements ?? "Muscle support", icon: Dumbbell },
      { label: name.includes("drools") ? "DHA Support" : "Coat Support", detail: "Brain, skin and coat", icon: Brain },
      { label: isDogFood ? "Dog Approved" : isCatFood ? "Cat Approved" : "Pet Approved", detail: "Palatable formula", icon: Smile },
      { label: name.includes("ninja") ? "Active Muscle" : "Gut Friendly", detail: "Digestive care", icon: Apple },
      { label: "Premium Pack", detail: product.brand ?? "Trusted brand", icon: BadgeCheck },
    ];
  }

  if (isPuppy) {
    const breedSpecific = name.includes("german shepherd")
      ? { label: "Guardian Breed", detail: "Loyal and alert", icon: Shield }
      : name.includes("dachshund")
        ? { label: "Apartment Friendly", detail: "Compact companion", icon: Home }
        : { label: "Kids Friendly", detail: "Gentle family nature", icon: Smile };

    return [
      breedSpecific,
      { label: "Vaccinated", detail: "Vet checked puppy", icon: Syringe },
      { label: "Playful", detail: "Active and cheerful", icon: Activity },
      { label: "Trainable", detail: "Quick learner", icon: Brain },
      { label: "Socialised", detail: "Handled with care", icon: Heart },
      { label: "Family Ready", detail: "Healthy growth stage", icon: BadgeCheck },
    ];
  }

  if (product.category === "birds") {
    return [
      { label: name.includes("macaw") ? "Talkative" : "Chirpy Pair", detail: "Social companion", icon: Smile },
      { label: "Tame Friendly", detail: "Can bond with owners", icon: Heart },
      { label: "Active", detail: "Loves daily play", icon: Activity },
      { label: "Bright Plumage", detail: "Healthy feather glow", icon: Sparkles },
      { label: "Smart Bird", detail: "Learns routines", icon: Brain },
      { label: "Care Guided", detail: "Setup advice included", icon: BadgeCheck },
    ];
  }

  if (product.category === "aquarium") {
    return [
      { label: "Peaceful", detail: "Community tank fit", icon: Smile },
      { label: name.includes("tetra") ? "Schooling Fish" : "Centerpiece Fish", detail: "Best in proper groups", icon: Sparkles },
      { label: "Active Swimmer", detail: "Graceful movement", icon: Activity },
      { label: "Beginner Friendly", detail: "Easy routine care", icon: BadgeCheck },
      { label: "Healthy Stock", detail: "Clear and active", icon: Shield },
      { label: "Tank Ready", detail: "Acclimation guidance", icon: Home },
    ];
  }

  if (product.category === "accessories") {
    return [
      { label: "Pet Safe", detail: "Comfort-first design", icon: Shield },
      { label: name.includes("toy") ? "Play Ready" : "Daily Use", detail: "Built for routine use", icon: Activity },
      { label: name.includes("collar") ? "Comfort Fit" : "Interactive", detail: "Easy handling", icon: Heart },
      { label: "Durable", detail: "Quality checked", icon: BadgeCheck },
      { label: "Easy Clean", detail: "Simple maintenance", icon: Sparkles },
      { label: "Trainer Pick", detail: "Practical for pets", icon: Smile },
    ];
  }

  if (product.category === "supplements") {
    return [
      { label: "Vet Guided", detail: "Use as directed", icon: Shield },
      { label: name.includes("calcium") ? "Bone Support" : "Daily Wellness", detail: product.dietaryRequirements ?? "Health support", icon: BadgeCheck },
      { label: "Easy Dose", detail: "Simple routine", icon: Apple },
      { label: "Active Care", detail: "Supports stamina", icon: Activity },
      { label: "Immune Support", detail: "Balanced nutrition", icon: Sparkles },
      { label: "All-round Care", detail: product.age ?? "For pets", icon: Heart },
    ];
  }

  return [
    { label: "Kids Friendly", detail: "Gentle handling", icon: Smile },
    { label: "Easy to Tame", detail: "Beginner friendly", icon: Heart },
    { label: "Active", detail: "Playful routine", icon: Activity },
    { label: "Compact Pet", detail: "Home friendly", icon: Home },
    { label: "Healthy Stock", detail: "Care checked", icon: Shield },
    { label: "Simple Care", detail: "Guidance included", icon: Leaf },
  ];
}

function productCareProfile(product: Product): ProductCareProfile {
  const name = product.name.toLowerCase();

  if (product.category === "food") {
    return {
      careLevel: "Easy",
      careNote: name.includes("puppy") ? "Simple daily feeding for growing pups" : "Straightforward daily nutrition",
      perfectFor: name.includes("puppy")
        ? ["Puppies", "Growing pets", "Busy families"]
        : ["Daily feeding", "Adult pets", "Routine care"],
      included: ["Sealed pack", "Feeding guidance", "Storage support"],
    };
  }

  if (product.category === "puppies") {
    return {
      careLevel: name.includes("german shepherd") ? "Active" : "Moderate",
      careNote: "Best with daily play, training, and family time",
      perfectFor: name.includes("dachshund")
        ? ["Apartment homes", "Small families", "Playful owners"]
        : ["Families", "Kids", "Active homes"],
      included: ["Vaccination record", "Starter care tips", "Feeding advice"],
    };
  }

  if (product.category === "birds") {
    return {
      careLevel: name.includes("macaw") ? "Advanced" : "Easy-Moderate",
      careNote: "Needs clean setup, safe space, and daily interaction",
      perfectFor: name.includes("macaw")
        ? ["Experienced owners", "Spacious homes", "Bird lovers"]
        : ["First-time bird owners", "Families", "Compact homes"],
      included: ["Diet tips", "Cage setup advice", "Handling guidance"],
    };
  }

  if (product.category === "aquarium") {
    return {
      careLevel: "Easy",
      careNote: "Works best in a cycled, clean aquarium",
      perfectFor: ["Community tanks", "Beginners", "Planted setups"],
      included: ["Acclimation tips", "Water care advice", "Feeding guidance"],
    };
  }

  if (product.category === "accessories") {
    return {
      careLevel: "Easy",
      careNote: "Ready for everyday use with simple maintenance",
      perfectFor: name.includes("toy") ? ["Play time", "Training", "Active dogs"] : ["Daily walks", "Comfort", "Safety"],
      included: ["Fit guidance", "Care instructions", "Usage tips"],
    };
  }

  if (product.category === "supplements") {
    return {
      careLevel: "Guided",
      careNote: "Use as per dosage and pet weight",
      perfectFor: ["Daily wellness", "Active pets", "Recovery support"],
      included: ["Dosage advice", "Usage guidance", "Storage tips"],
    };
  }

  return {
    careLevel: "Easy",
    careNote: "Simple care routine for first-time pet parents",
    perfectFor: ["Kids", "Families", "First-time owners"],
    included: ["Basic care tips", "Setup advice", "Feeding guidance"],
  };
}

function uniqueImages(images: string[]) {
  return Array.from(new Set(images.filter(Boolean)));
}

function productCarouselImages(product: Product) {
  const baseImages =
    product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages
      : [product.image];

  return uniqueImages(baseImages).slice(0, 5);
}

export function ProductDetailContent({ product, relatedProducts }: ProductDetailContentProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const qualityBadges = productQualityBadges(product);
  const careProfile = productCareProfile(product);

  const images = useMemo(() => productCarouselImages(product), [product]);
  const displayedImageIndex = selectedImageIndex ?? 0;
  const prevImage = () =>
    setSelectedImageIndex((prev) => {
      const current = prev ?? 0;
      return current === 0 ? images.length - 1 : current - 1;
    });
  const nextImage = () =>
    setSelectedImageIndex((prev) => {
      const current = prev ?? 0;
      return current === images.length - 1 ? 0 : current + 1;
    });

  return (
    <>
      {/* Breadcrumb */}
      <nav className="mb-4 md:mb-6 flex items-center gap-1.5 text-xs md:text-sm text-gray-500">
        <Link className="flex items-center gap-1 transition-colors hover:text-forest" href="/">
          <Home className="h-3 w-3 md:h-3.5 md:w-3.5" />
          Home
        </Link>
        <span>/</span>
        <Link className="transition-colors hover:text-forest capitalize" href="/#products">
          {product.category.replace("-", " ")}
        </Link>
        <span>/</span>
        <span className="font-medium text-gray-900 truncate">{product.name}</span>
      </nav>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-9">
        {/* Gallery */}
        <div className="space-y-2.5 md:space-y-3">
          <div
            className={`relative aspect-[4/3] overflow-hidden rounded-2xl md:rounded-3xl lg:aspect-[1.08/1] ${
              product.imageTone ?? "bg-gray-50"
            } ${product.imageFit === "contain" ? "p-6 md:p-8" : ""}`}
          >
            {selectedImageIndex === null && images.length > 1 ? (
              images.map((img, idx) => (
                <Image
                  src={img}
                  alt={idx === 0 ? product.name : `${product.name} gallery ${idx + 1}`}
                  fill
                  priority={idx === 0}
                  className={`product-carousel-image transition-opacity duration-300 ${
                    product.imageFit === "contain"
                      ? "object-contain mix-blend-multiply"
                      : "object-cover"
                  }`}
                  key={img}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  style={
                    {
                      "--slide-count": images.length,
                      "--slide-index": idx,
                    } as CSSProperties
                  }
                />
              ))
            ) : (
              <Image
                src={images[displayedImageIndex]}
                alt={product.name}
                fill
                priority
                className={`transition-opacity duration-300 ${
                  product.imageFit === "contain"
                    ? "object-contain mix-blend-multiply"
                    : "object-cover"
                }`}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            )}
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-sm backdrop-blur-sm hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-sm backdrop-blur-sm hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1 md:gap-2.5">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative h-14 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-white transition-all md:h-[72px] md:w-20 ${
                    idx === displayedImageIndex
                      ? "border-leaf shadow-sm ring-2 ring-leaf/20"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  type="button"
                >
                  <Image
                    src={img}
                    alt={`${product.name} preview ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900 md:text-4xl">{product.name}</h1>

          <p className="mt-1.5 text-2xl font-bold text-leaf md:mt-2 md:text-3xl">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          {/* Tags */}
          <div className="mt-2.5 flex flex-wrap gap-1.5 md:mt-3 md:gap-2">
            {product.brand && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                Brand: {product.brand}
              </span>
            )}
            {product.age && (
              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
                Age: {product.age}
              </span>
            )}
            {product.dietaryRequirements && (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                {product.dietaryRequirements}
              </span>
            )}
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 capitalize">
              {product.category.replace("-", " ")}
            </span>
          </div>

          {/* About */}
          <div className="mt-4 border-t border-gray-100 pt-4 md:mt-5 md:pt-5">
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <Heart className="h-4 w-4 md:h-5 md:w-5 text-leaf" />
              <h2 className="text-base font-bold text-gray-900 md:text-lg">About</h2>
            </div>
            <p className="text-xs leading-relaxed text-gray-600 md:text-sm">{product.about}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-row gap-2 md:mt-6 md:gap-3">
            <button
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-leaf px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-leaf-hover md:px-6 md:py-3.5 md:text-sm md:gap-2 cursor-pointer active:scale-95 transition-transform"
              onClick={() => {
                addToCart(product);
                window.location.href = "/cart";
              }}
            >
              <ShoppingCart className="h-4 w-4" />
              Buy Now
            </button>
            <button
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full border-2 px-4 py-2.5 text-xs font-semibold md:px-6 md:py-3.5 md:text-sm md:gap-2 cursor-pointer active:scale-95 transition-all ${
                isAdded
                  ? "border-green-600 bg-green-50 text-green-600 scale-102"
                  : "border-leaf text-leaf hover:bg-leaf hover:text-white"
              }`}
              onClick={() => {
                addToCart(product);
                setIsAdded(true);
                setTimeout(() => setIsAdded(false), 1500);
              }}
              disabled={isAdded}
            >
              <ShoppingCart className="h-4 w-4" />
              {isAdded ? "Added!" : "Add to Cart"}
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-4 flex items-center gap-4 text-[11px] text-gray-500 md:gap-6 md:text-xs">
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-green-500" />
              Health Guaranteed
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-yellow-500" />
              Trusted Since 2015
            </span>
          </div>

          <div className="mt-4 rounded-2xl border border-emerald-100/80 bg-gradient-to-br from-white via-emerald-50/35 to-white p-3 shadow-sm md:mt-5 md:p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-leaf">
                  Premium Check
                </p>
                <h2 className="mt-1 text-sm font-bold text-gray-900 md:text-base">
                  Matched for {product.name}
                </h2>
              </div>
              <span className="hidden rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-leaf shadow-sm sm:inline-flex">
                Store verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
              {qualityBadges.map(({ label, detail, icon: Icon }) => (
                <div
                  className="min-w-0 rounded-xl border border-white/80 bg-white/85 p-2.5 shadow-sm"
                  key={label}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-light text-leaf">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-gray-900">{label}</p>
                      <p className="truncate text-[11px] text-gray-500">{detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2.5 grid gap-2 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
                Care Level
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-leaf text-white">
                  <Activity className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900">{careProfile.careLevel}</p>
                  <p className="truncate text-[11px] text-gray-500">{careProfile.careNote}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
                Perfect For
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {careProfile.perfectFor.map((item) => (
                  <span
                    className="rounded-full bg-forest-light px-2.5 py-1 text-[11px] font-semibold text-forest"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
                Included
              </p>
              <div className="mt-2 space-y-1">
                {careProfile.included.map((item) => (
                  <span className="flex items-center gap-1.5 text-[11px] font-medium text-gray-600" key={item}>
                    <CheckCircle2 className="h-3.5 w-3.5 text-leaf" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features & Conditions */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
        {/* Key Features */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:p-6">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-leaf" />
            <h2 className="text-base font-bold text-gray-900 md:text-lg">Key Features</h2>
          </div>
          <ul className="space-y-2 md:space-y-3">
            {product.keyFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 md:gap-3 md:text-sm">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-leaf" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Conditions / Care */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:p-6">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 text-amber-500" />
            <h2 className="text-base font-bold text-gray-900 md:text-lg">Care & Conditions</h2>
          </div>
          <ul className="space-y-2 md:space-y-3">
            {product.conditions.map((condition, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 md:gap-3 md:text-sm">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                {condition}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12 md:mt-20 border-t border-gray-100 pt-10 md:pt-16">
          <div className="mb-6 md:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-2">
            <div>
              <span className="bg-leaf/10 text-leaf border border-leaf/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Recommended
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">Customers Also Viewed</h2>
            </div>
            <p className="text-xs md:text-sm text-gray-500 font-medium">Selected premium collections tailored to your preference</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
