"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  BriefcaseMedical,
  ChevronDown,
  Clock,
  Home,
  MapPin,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import { site, navItems, products, type Product } from "@/lib/site-data";
import { AnimatedLogo } from "@/components/logo";
import { getCart, CART_UPDATED_EVENT } from "@/lib/cart-store";

const petsDropdownItems = [
  { label: "Birds", id: "birds" },
  { label: "Puppies", id: "puppies" },
  { label: "Small Pets", id: "small-pets" },
  { label: "Aquarium", id: "aquarium" },
];

const productsDropdownItems = [
  { label: "Pet Food", id: "food" },
  { label: "Accessories", id: "accessories" },
  { label: "Supplements", id: "supplements" },
  { label: "All Items", id: "all" },
];

const servicesDropdownItems = [
  { label: "Pet Consultation", href: "https://wa.me/919942919000?text=Hi%20Exotic%20Pets%20World%20Pollachi%2C%20I%20would%20like%20to%20enquire%20about%20Pet%20Consultation." },
  { label: "Grooming & Spa", href: "https://wa.me/919942919000?text=Hi%20Exotic%20Pets%20World%20Pollachi%2C%20I%20would%20like%20to%20enquire%20about%20Grooming%20%26%20Spa%20Services." },
  { label: "Pet Care Advice", href: "https://wa.me/919942919000?text=Hi%20Exotic%20Pets%20World%20Pollachi%2C%20I%20would%20like%20to%20enquire%20about%20Pet%20Care%20Advice." },
  { label: "Tank Maintenance", href: "https://wa.me/919942919000?text=Hi%20Exotic%20Pets%20World%20Pollachi%2C%20I%20would%20like%20to%20enquire%20about%20Aquarium%20Tank%20Maintenance." },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showTour, setShowTour] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const syncCart = () => {
      const cart = getCart();
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };

    syncCart();

    window.addEventListener(CART_UPDATED_EVENT, syncCart);
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, syncCart);
    };
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    const event = new CustomEvent("select-category", { detail: categoryId });
    window.dispatchEvent(event);
    
    const target = document.getElementById("products");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const isTourDismissed = localStorage.getItem("petshop_search_tour_dismissed");
    if (!isTourDismissed) {
      const tourTimer = setTimeout(() => {
        setShowTour(true);
      }, 5000);
      return () => clearTimeout(tourTimer);
    }
  }, []);

  const dismissTour = () => {
    setShowTour(false);
    localStorage.setItem("petshop_search_tour_dismissed", "true");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveItemIndex((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const matches = products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query),
        )
        .slice(0, 3);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const SearchSuggestions = ({ onSelect }: { onSelect: () => void }) => {
    if (suggestions.length === 0) return null;
    return (
      <div className="absolute left-0 top-full mt-2 w-full overflow-hidden rounded-xl border border-gray-100 bg-white p-2 shadow-lg z-50">
        {suggestions.map((p) => (
          <a
            key={p.id}
            href={`#products`}
            onClick={() => {
              onSelect();
              // In a real app with product modals, we might trigger a global state or dispatch event to open the modal
              // For now, we scroll to products section
            }}
            className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
          >
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-gray-100">
              <Image
                src={p.image}
                alt={p.name}
                fill
                className={`object-cover ${p.imageFit === "contain" ? "object-contain p-1 mix-blend-multiply" : ""}`}
              />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-semibold text-gray-900">{p.name}</span>
              <span className="text-xs text-gray-500">₹{p.price.toLocaleString("en-IN")}</span>
            </div>
          </a>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="bg-forest px-4 py-2 text-xs text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Mobile view: single row fading marquee */}
          <div className="relative flex h-5 items-center justify-center overflow-hidden sm:hidden">
            {[
              <div key="welcome" className="flex items-center gap-2 justify-center">
                <BriefcaseMedical className="h-3.5 w-3.5" />
                <span>Welcome to Exotic Pets World Pollachi!</span>
              </div>,
              <a key="phone" className="flex items-center gap-1 justify-center transition-colors hover:text-white" href={site.phoneHref}>
                <Phone className="h-3.5 w-3.5" />
                {site.phone}
              </a>,
              <span key="address" className="flex items-center gap-1 justify-center">
                <MapPin className="h-3.5 w-3.5" />
                {site.address}
              </span>,
              <span key="hours" className="flex items-center gap-1 justify-center">
                <Clock className="h-3.5 w-3.5" />
                {site.hours}
              </span>
            ].map((item, index) => (
              <div
                key={index}
                className={`absolute w-full transition-opacity duration-500 flex justify-center ${
                  index === activeItemIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Desktop view: normal row */}
          <div className="hidden sm:flex flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <BriefcaseMedical className="h-3.5 w-3.5" />
              <span>Welcome to Exotic Pets World Pollachi!</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 text-gray-200 sm:gap-5">
              <a
                className="flex items-center gap-1 transition-colors hover:text-white"
                href={site.phoneHref}
              >
                <Phone className="h-3.5 w-3.5" />
                {site.phone}
              </a>
              <span className="hidden sm:inline">|</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {site.address}
              </span>
              <span className="hidden sm:inline">|</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {site.hours}
              </span>
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {isSearchOpen ? (
            <div className="flex w-full items-center gap-2 md:hidden">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  autoFocus
                  className="w-full rounded-full border border-gray-200 py-2 pl-9 pr-4 text-sm focus:border-leaf focus:outline-none focus:ring-1 focus:ring-leaf"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  type="text"
                  value={searchQuery}
                />
                <SearchSuggestions onSelect={() => { setSearchQuery(""); setIsSearchOpen(false); }} />
              </div>
              <button
                className="p-2 text-gray-500 hover:text-gray-900"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <>
              {/* Left: Logo */}
              <Link className="flex items-center gap-3 group shrink-0" href="/">
                <AnimatedLogo size={48} />
                <span className="flex flex-col">
                  <span className="text-xl font-bold leading-tight text-forest transition-colors group-hover:text-leaf">{site.name}</span>
                  <span className="text-sm leading-tight text-gray-500">{site.suffix}</span>
                </span>
              </Link>

              {/* Middle: Centered Desktop Navbar */}
              <nav className="hidden items-center gap-6 text-sm font-semibold text-gray-600 md:flex lg:gap-8 mx-6">
                {navItems.map((item) => {
                  if (item === "Pets") {
                    return (
                      <div className="group relative py-2 cursor-pointer" key={item}>
                        <span className="flex items-center gap-1 transition-colors hover:text-leaf text-gray-700">
                          {item}
                          <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180 text-gray-400" />
                        </span>
                        {/* Dropdown Panel */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-48 opacity-0 translate-y-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto z-50">
                          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-2 flex flex-col gap-0.5">
                            {petsDropdownItems.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={() => handleCategorySelect(sub.id)}
                                className="w-full text-left flex items-center rounded-xl px-3.5 py-2 text-sm text-gray-700 hover:bg-forest-light hover:text-forest transition-all font-semibold cursor-pointer"
                              >
                                {sub.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (item === "Products") {
                    return (
                      <div className="group relative py-2 cursor-pointer" key={item}>
                        <span className="flex items-center gap-1 transition-colors hover:text-leaf text-gray-700">
                          {item}
                          <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180 text-gray-400" />
                        </span>
                        {/* Dropdown Panel */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-48 opacity-0 translate-y-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto z-50">
                          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-2 flex flex-col gap-0.5">
                            {productsDropdownItems.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={() => handleCategorySelect(sub.id)}
                                className="w-full text-left flex items-center rounded-xl px-3.5 py-2 text-sm text-gray-700 hover:bg-forest-light hover:text-forest transition-all font-semibold cursor-pointer"
                              >
                                {sub.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (item === "Services") {
                    return (
                      <div className="group relative py-2 cursor-pointer" key={item}>
                        <span className="flex items-center gap-1 transition-colors hover:text-leaf text-gray-700">
                          {item}
                          <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180 text-gray-400" />
                        </span>
                        {/* Dropdown Panel */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-56 opacity-0 translate-y-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto z-50">
                          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-2 flex flex-col gap-0.5">
                            {servicesDropdownItems.map((sub) => (
                              <a
                                key={sub.label}
                                href={sub.href}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full text-left flex items-center rounded-xl px-3.5 py-2 text-sm text-gray-700 hover:bg-forest-light hover:text-forest transition-all font-semibold cursor-pointer"
                              >
                                {sub.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <a
                      className="transition-colors hover:text-leaf text-gray-700"
                      href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                      key={item}
                    >
                      {item}
                    </a>
                  );
                })}
              </nav>

              {/* Right: Search + WhatsApp CTA + Mobile Hamburger */}
              <div className="flex items-center gap-4 shrink-0">
                {/* Desktop Search */}
                <div className="hidden md:block relative">
                  <div className="relative flex items-center">
                    <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                    <input
                      className="w-40 rounded-full border border-gray-200 py-2 pl-9 pr-4 text-sm transition-all focus:border-leaf focus:outline-none focus:ring-1 focus:ring-leaf lg:w-56"
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      type="text"
                      value={searchQuery}
                    />
                  </div>
                  <SearchSuggestions onSelect={() => setSearchQuery("")} />

                  {showTour && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 rounded-2xl border border-amber-400/20 bg-gradient-to-br from-forest to-emerald-950 p-4 shadow-2xl backdrop-blur-md z-50 animate-bounce-subtle text-white">
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-l border-t border-amber-400/20 bg-forest" />
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-300">
                          <Search className="h-4 w-4 animate-pulse" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="bg-amber-400/10 text-amber-300 border border-amber-400/20 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                              Smart Search
                            </span>
                            <button onClick={dismissTour} className="text-gray-300 hover:text-white transition-colors">
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <h3 className="text-sm font-bold text-white mt-2 tracking-tight">Discover Premium Pet Supplies</h3>
                          <p className="mt-1.5 text-xs leading-relaxed text-gray-200">
                            Looking for something specific? Search for exotic breeds, premium foods (such as <b>Drools</b> or <b>Ninja</b>), or advanced wellness supplements instantly.
                          </p>
                          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                            <span className="text-[10px] text-gray-300 font-medium">Enterprise Assistant</span>
                            <button
                              onClick={dismissTour}
                              className="rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 px-4 py-1.5 text-xs font-bold text-emerald-950 transition-all hover:scale-105 active:scale-95 shadow-md shadow-amber-500/10"
                            >
                              Get Started
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* WhatsApp CTA */}
                <a
                  className="hidden items-center gap-2 rounded-full bg-leaf px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-leaf-hover md:flex active:scale-95 shadow-sm"
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Phone className="h-4 w-4" />
                  <span className="hidden lg:inline">WhatsApp Us</span>
                  <span className="lg:hidden">Chat</span>
                </a>

                {/* Desktop Cart Button */}
                <button
                  onClick={() => { window.location.href = "/cart"; }}
                  className="hidden md:flex relative items-center justify-center p-2.5 rounded-full border border-gray-100 bg-white shadow-sm text-forest hover:border-leaf/30 hover:bg-forest-light hover:text-leaf transition-all duration-200 active:scale-95 cursor-pointer"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Mobile Menu Icons */}
                <div className="flex items-center gap-2 md:hidden relative">
                  <button
                    aria-label="Search"
                    className="rounded-full p-2 text-forest transition-colors hover:bg-forest-light"
                    onClick={() => {
                      setIsSearchOpen(true);
                      dismissTour();
                    }}
                    type="button"
                  >
                    <Search className="h-6 w-6" />
                  </button>

                  {/* Mobile Cart Button */}
                  <button
                    onClick={() => { window.location.href = "/cart"; }}
                    className="relative items-center justify-center p-2 text-forest rounded-full hover:bg-forest-light transition-all duration-200 active:scale-95 cursor-pointer"
                    aria-label="Shopping Cart"
                  >
                    <ShoppingCart className="h-6 w-6 transition-transform duration-200 hover:scale-110" />
                    {cartCount > 0 && (
                      <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-1 ring-white">
                        {cartCount}
                      </span>
                    )}
                  </button>

                  {showTour && (
                    <div className="absolute top-full right-0 mt-3 w-64 rounded-2xl border border-amber-400/20 bg-gradient-to-br from-forest to-emerald-950 p-4 shadow-2xl backdrop-blur-md z-50 animate-bounce-subtle-mobile text-white">
                      <div className="absolute -top-1.5 right-4 h-3 w-3 rotate-45 border-l border-t border-amber-400/20 bg-forest" />
                      <div className="flex items-start gap-2">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="bg-amber-400/10 text-amber-300 border border-amber-400/20 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                              Smart Search
                            </span>
                            <button onClick={dismissTour} className="text-gray-300 hover:text-white transition-colors">
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <h3 className="text-xs font-bold text-white mt-2 tracking-tight">Catalog Discovery</h3>
                          <p className="mt-1 text-[11px] leading-relaxed text-gray-200">
                            Search our elite collections of exotic pets, premium formulas, and supplements in real time.
                          </p>
                          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5">
                            <span className="text-[9px] text-gray-300">1 of 1</span>
                            <button
                              onClick={dismissTour}
                              className="rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 px-3.5 py-1 text-[10px] font-bold text-emerald-950 transition-all hover:scale-105 shadow-md shadow-amber-500/10"
                            >
                              Explore
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <button
                    aria-expanded={isOpen}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    className="rounded-full p-2 text-forest transition-colors hover:bg-forest-light"
                    onClick={() => setIsOpen((value) => !value)}
                    type="button"
                  >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {isOpen && !isSearchOpen ? (
          <nav className="mx-auto mt-4 grid max-w-7xl gap-2 border-t border-gray-100 pt-4 md:hidden">
            {navItems.map((item) => (
              <a
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-forest-light hover:text-forest"
                href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                key={item}
                onClick={() => setIsOpen(false)}
              >
                {item === "Home" ? <Home className="h-4 w-4" /> : null}
                {item}
              </a>
            ))}
            <a
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-leaf px-5 py-2.5 text-sm font-medium text-white"
              href={site.whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              <Phone className="h-4 w-4" />
              WhatsApp Us
            </a>
          </nav>
        ) : null}
      </header>
    </>
  );
}
