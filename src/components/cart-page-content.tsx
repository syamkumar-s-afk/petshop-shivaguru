"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Phone,
} from "lucide-react";
import {
  getCart,
  updateQuantity,
  removeFromCart,
  generateCartWhatsappLink,
  CART_UPDATED_EVENT,
  type CartItem,
} from "@/lib/cart-store";

export function CartPageContent() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const syncCart = () => {
      setCartItems(getCart());
    };
    syncCart();

    window.addEventListener(CART_UPDATED_EVENT, syncCart);
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, syncCart);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-[450px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-leaf border-t-transparent" />
      </div>
    );
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  
  // Enterprise adjustments
  const isEligibleForFreeShipping = subtotal > 1500;
  const shippingCharge = subtotal === 0 ? 0 : isEligibleForFreeShipping ? 0 : 150;
  const handlingFee = subtotal === 0 ? 0 : 49; // Professional handling fee for pets & secure transport
  const total = subtotal + shippingCharge + handlingFee;

  const checkoutLink = generateCartWhatsappLink(cartItems);

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:py-24">
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-forest-light text-leaf ring-8 ring-forest-light/30 animate-pulse">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h1 className="mt-8 text-3xl font-bold tracking-tight text-gray-900">Your Cart is Empty</h1>
        <p className="mt-4 text-base text-gray-500 max-w-md mx-auto">
          Explore our premium catalog of birds, exotic puppies, aquarium fishes, balanced feeds, and accessories.
        </p>
        <div className="mt-10">
          <button
            onClick={() => {
              window.location.href = "/#products";
            }}
            className="inline-flex items-center gap-2 rounded-full bg-leaf px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-leaf-hover active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Explore Premium Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 md:py-8">
      {/* Checkout Progress Steps */}
      <div className="mb-8 border-b border-gray-100 pb-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="bg-leaf/10 text-leaf border border-leaf/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Secure Checkout
            </span>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-forest md:text-3xl">Your Shopping Cart</h1>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
            <span className="text-leaf">1. Review Cart</span>
            <span>&rarr;</span>
            <span>2. Confirm on WhatsApp</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left Side: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md"
            >
              {/* Product Info Block */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl ${
                    item.product.imageTone ?? "bg-gray-50"
                  } ${item.product.imageFit === "contain" ? "p-2" : ""}`}
                >
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className={`object-cover ${
                      item.product.imageFit === "contain"
                        ? "object-contain mix-blend-multiply"
                        : "object-cover"
                    }`}
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold text-gray-900 md:text-base">
                    {item.product.name}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-forest-light px-2 py-0.5 text-[10px] font-semibold text-forest capitalize">
                      {item.product.category.replace("-", " ")}
                    </span>
                    {item.product.brand && (
                      <span className="text-[11px] text-gray-500 font-medium">
                        Brand: {item.product.brand}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-leaf sm:hidden">
                    ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              {/* Adjuster / Delete / Price Block */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-50">
                {/* Quantity Adjuster */}
                <div className="flex items-center rounded-full border border-gray-200 p-1 bg-gray-50/50">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors shadow-sm cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors shadow-sm cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>

                {/* Subtotal Display (Desktop) */}
                <p className="hidden sm:block text-base font-bold text-gray-900 min-w-[80px] text-right">
                  ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                </p>

                {/* Trash/Remove Button */}
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Continue Shopping Direct Link */}
          <div className="pt-2">
            <button
              onClick={() => {
                window.location.href = "/#products";
              }}
              className="inline-flex items-center gap-2 text-xs font-bold text-leaf hover:text-leaf-hover transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Continue Shopping / Add More Items
            </button>
          </div>
        </div>

        {/* Right Side: Order Summary Panel */}
        <div className="lg:col-span-4">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 md:text-lg">Order Summary</h2>

            <div className="mt-6 space-y-4">
              {/* Pricing Breakdown */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Items Subtotal</span>
                <span className="font-semibold text-gray-900">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Secure Pet Handling</span>
                <span className="font-semibold text-gray-900">
                  ₹{handlingFee.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  Secure Delivery
                  {isEligibleForFreeShipping && (
                    <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 uppercase tracking-wider">
                      Free
                    </span>
                  )}
                </span>
                <span className="font-semibold text-gray-900">
                  {shippingCharge === 0 ? "FREE" : `₹${shippingCharge.toLocaleString("en-IN")}`}
                </span>
              </div>

              {!isEligibleForFreeShipping && (
                <p className="text-[10px] leading-relaxed text-amber-600 font-medium">
                  💡 Add <b>₹{(1501 - subtotal).toLocaleString("en-IN")}</b> more of products to unlock <b>FREE shipping</b>!
                </p>
              )}

              <div className="border-t border-gray-100 pt-4 flex items-center justify-between text-base font-bold text-gray-900">
                <span>Total Value</span>
                <span className="text-lg text-leaf">₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Check Out Call To Action */}
            <div className="mt-8">
              <a
                href={checkoutLink}
                target="_blank"
                rel="noreferrer"
                className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-leaf px-6 py-4 text-center text-sm font-semibold text-white shadow-md hover:bg-leaf-hover active:scale-95 transition-all cursor-pointer group"
              >
                {/* Shine Micro-animation */}
                <span className="absolute inset-0 block w-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
                
                <Phone className="h-4 w-4 shrink-0" />
                Checkout via WhatsApp
              </a>
              <p className="mt-2 text-center text-[10px] text-gray-400 font-medium">
                Orders are processed and verified securely by staff on WhatsApp.
              </p>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 rounded-2xl border border-gray-50 bg-gray-50/50 px-4 py-3">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-gray-900">Health Guaranteed</p>
                <p className="text-[10px] text-gray-500">All pets are certified vet-checked and fully active.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-gray-50 bg-gray-50/50 px-4 py-3">
              <Truck className="h-4 w-4 shrink-0 text-indigo-600" />
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-gray-900">Secure Dispatch</p>
                <p className="text-[10px] text-gray-500">Shipped safely in custom air-circulated carrier units.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-gray-50 bg-gray-50/50 px-4 py-3">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-600" />
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-gray-900">Direct Live Chat</p>
                <p className="text-[10px] text-gray-500">Speak directly with breeder experts on WhatsApp line.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
