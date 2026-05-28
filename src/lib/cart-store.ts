import { type Product } from "./site-data";

export interface CartItem {
  product: Product;
  quantity: number;
}

// Key for storage
const CART_STORAGE_KEY = "petshop_cart";
// Custom event name for synchronization
export const CART_UPDATED_EVENT = "petshop-cart-updated";

/**
 * Retrieves the current cart from local storage safely (SSR check included)
 */
export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load cart from storage:", e);
    return [];
  }
}

/**
 * Saves the cart to local storage and dispatches a synchronizing event
 */
export function saveCart(cart: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    // Dispatch custom event so headers, pages, and chatbots sync reactively
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
  } catch (e) {
    console.error("Failed to save cart to storage:", e);
  }
}

/**
 * Adds a product to the cart. If it already exists, increments the quantity.
 */
export function addToCart(product: Product, quantity = 1): void {
  const cart = getCart();
  const existingIndex = cart.findIndex((item) => item.product.id === product.id);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  saveCart(cart);
}

/**
 * Updates the quantity of a specific item. If quantity <= 0, removes the item.
 */
export function updateQuantity(productId: string, quantity: number): void {
  let cart = getCart();
  const itemIndex = cart.findIndex((item) => item.product.id === productId);

  if (itemIndex > -1) {
    if (quantity <= 0) {
      cart = cart.filter((item) => item.product.id !== productId);
    } else {
      cart[itemIndex].quantity = quantity;
    }
    saveCart(cart);
  }
}

/**
 * Removes an item from the cart entirely.
 */
export function removeFromCart(productId: string): void {
  const cart = getCart().filter((item) => item.product.id !== productId);
  saveCart(cart);
}

/**
 * Clears all items in the cart.
 */
export function clearCart(): void {
  saveCart([]);
}

/**
 * Compiles cart items into a beautifully structured WhatsApp message and returns the checkout link.
 */
export function generateCartWhatsappLink(cartItems: CartItem[]): string {
  if (cartItems.length === 0) return "";

  let message = "Hi Exotic Pets World Pollachi,\n\nI would like to order the following from your pet shop:\n\n";

  cartItems.forEach((item) => {
    const category = item.product.category;
    // Check if the item belongs to food, accessories, or supplements
    const isFoodOrAccOrSupp = ["food", "accessories", "supplements"].includes(category);

    if (isFoodOrAccOrSupp) {
      message += `• ${item.product.name} x${item.quantity}\n`;
    } else {
      // For pets, display breed name, and if count > 1 show quantity
      if (item.quantity > 1) {
        message += `• ${item.product.name} (Qty: ${item.quantity})\n`;
      } else {
        message += `• ${item.product.name}\n`;
      }
    }
  });

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  message += `\nTotal Value: ₹${total.toLocaleString("en-IN")}\n\n`;
  message += "Please confirm my order and share delivery / payment details. Thank you!";

  return `https://wa.me/919942919000?text=${encodeURIComponent(message)}`;
}
