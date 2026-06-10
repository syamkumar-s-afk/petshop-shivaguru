import { products, Product, CategoryId } from "@/lib/site-data";
import { faqData } from "@/lib/faq-data";

export type Intent =
  | "GREETING"
  | "GOODBYE"
  | "SHOW_CATEGORY"
  | "PRODUCT_INFO"
  | "PRICE_INQUIRY"
  | "FAQ"
  | "NAVIGATION"
  | "FALLBACK";

export interface ChatContext {
  lastDiscussedProduct: Product | null;
  pendingQuestion: string | null;
  lastCategory: CategoryId | null;
}

export interface EngineResponse {
  text: string;
  products?: Product[];
  actions?: Array<{ label: string; actionKey: string; isWhatsApp?: boolean; link?: string }>;
  newContext: ChatContext;
}

interface ExtractedEntities {
  category: CategoryId | null;
  product: Product | null;
  maxPrice: number | null;
  sortByPrice: "asc" | "desc" | null;
}

class ChatbotEngine {
  private parseIntent(query: string): Intent {
    const q = query.toLowerCase();

    if (/^(hi|hello|hey|greetings|yaw|halo)/.test(q)) return "GREETING";
    if (/^(bye|goodbye|see you|exit)/.test(q)) return "GOODBYE";
    if (/cart|checkout|home|navigate|go to/i.test(q)) return "NAVIGATION";
    if (/price|cost|how much|rate|cheap|expensive/i.test(q)) return "PRICE_INQUIRY";
    if (/about|detail|desc|info|tell me more|diet|food for|age|feature/i.test(q)) return "PRODUCT_INFO";
    
    // Check FAQs
    const faqMatch = faqData.find((faq) =>
      faq.keywords.some((kw) => q.includes(kw))
    );
    if (faqMatch) return "FAQ";

    // Category checks
    if (/bird|parrot|macaw|dog|puppy|fish|aquarium|food|feed|supplement|accessory|hamster|pet/i.test(q)) {
      return "SHOW_CATEGORY";
    }

    return "FALLBACK";
  }

  private extractEntities(query: string): ExtractedEntities {
    const q = query.toLowerCase();
    const entities: ExtractedEntities = {
      category: null,
      product: null,
      maxPrice: null,
      sortByPrice: null,
    };

    // Category Extraction
    if (/bird|parrot|macaw|lovebird/i.test(q)) entities.category = "birds";
    else if (/dog|puppy|puppies|golden|retriever|gsd|labrador/i.test(q)) entities.category = "puppies";
    else if (/fish|aquarium|tetra/i.test(q)) entities.category = "aquarium";
    else if (/food|feed|drools|pedigree|meal/i.test(q)) entities.category = "food";
    else if (/supplement|calcium|syrup/i.test(q)) entities.category = "supplements";
    else if (/collar|toy|accessory/i.test(q)) entities.category = "accessories";
    else if (/hamster|small pet/i.test(q)) entities.category = "small-pets";

    // Price Extraction (e.g. "under 5k", "below 5000", "less than 500")
    const priceMatch = q.match(/(under|below|less than|max)\s*(\d+k|\d+)/i);
    if (priceMatch) {
      let valStr = priceMatch[2].replace(/k/i, "000");
      let num = parseInt(valStr, 10);
      if (!isNaN(num)) {
        entities.maxPrice = num;
      }
    }

    // Sort extraction (e.g. "low price", "cheap", "cheapest")
    if (/low price|cheap/i.test(q)) {
      entities.sortByPrice = "asc";
    }

    // Product Match
    const tokens = q.split(/\s+/).filter(t => t.length > 2);
    if (tokens.length > 0) {
      let bestMatch: Product | null = null;
      let highestScore = 0;

      products.forEach(p => {
        let score = 0;
        const nameL = p.name.toLowerCase();
        tokens.forEach(token => {
          if (nameL.includes(token)) score += 5;
        });
        if (score > highestScore) {
          highestScore = score;
          bestMatch = p;
        }
      });

      if (highestScore > 0) {
        entities.product = bestMatch;
      }
    }

    return entities;
  }

  public processMessage(query: string, currentContext: ChatContext): EngineResponse {
    let intent = this.parseIntent(query);
    const entities = this.extractEntities(query);
    const newContext = { ...currentContext };

    // Resolve Contextual Actions
    if (intent === "FALLBACK" && currentContext.pendingQuestion === "ASK_CATEGORY") {
      if (entities.category) {
        intent = "SHOW_CATEGORY";
        newContext.pendingQuestion = null;
      }
    }

    // Hard-coded keys for fast routing from UI buttons
    if (query.startsWith("show_")) {
      entities.category = query.replace("show_", "") as CategoryId;
      intent = "SHOW_CATEGORY";
    }

    if (query === "faq_delivery") {
        const faqMatch = faqData.find(f => f.id === "delivery");
        return {
            text: faqMatch?.answer || "",
            actions: faqMatch?.actions,
            newContext
        }
    }
    if (query === "whatsapp_direct") {
        return {
            text: "Squawk! Let's get you connected directly with our human managers! Standard response time is less than 5 minutes! Chirp chirp!",
            actions: [{ label: "Chat on WhatsApp 💬", actionKey: "whatsapp_direct", isWhatsApp: true }],
            newContext
        }
    }
    if (query === "faq_list") {
        return {
            text: "Squawk! Here are some common questions humans ask me:",
            actions: faqData.map(f => ({ label: f.question, actionKey: `faq_q_${f.id}` })),
            newContext
        }
    }
    if (query.startsWith("faq_q_")) {
        const id = query.replace("faq_q_", "");
        const faqMatch = faqData.find(f => f.id === id);
        return {
            text: faqMatch?.answer || "",
            actions: faqMatch?.actions,
            newContext
        }
    }


    switch (intent) {
      case "GREETING":
        return {
          text: "Squawk! Hello there, human friend! 🦜 Polly is super excited to chat! What can I help you find in our exotic pet kingdom?",
          actions: [
            { label: "Show Birds 🦜", actionKey: "show_birds" },
            { label: "Show Puppies 🐶", actionKey: "show_puppies" },
            { label: "Ask FAQ 💡", actionKey: "faq_list" },
          ],
          newContext,
        };

      case "GOODBYE":
        return {
          text: "Squawk! Goodbye, friend! Fly safe and come back to Exotic Pets World soon! Squaaawk!",
          newContext,
        };

      case "NAVIGATION":
        if (/cart/i.test(query)) {
          return {
            text: "Squawk! Ready to checkout? Click the button below to view your cart!",
            actions: [{ label: "Go to Cart 🛒", actionKey: "nav_cart", link: "/cart" }],
            newContext
          }
        }
        return {
            text: "Squawk! Where do you want to fly?",
            actions: [
                { label: "Home 🏠", actionKey: "nav_home", link: "/" },
                { label: "Cart 🛒", actionKey: "nav_cart", link: "/cart" },
            ],
            newContext
        }

      case "PRICE_INQUIRY":
        let productForPrice = entities.product || currentContext.lastDiscussedProduct;
        
        // If user says "under 5k" without a product, but we have a category, treat it as SHOW_CATEGORY
        if (!productForPrice && (entities.maxPrice || entities.sortByPrice)) {
            // Re-route to SHOW_CATEGORY
            return this.handleShowCategory(query, entities, newContext);
        }

        if (productForPrice) {
          return {
            text: `Squawk! The price of the **${productForPrice.name}** is **₹${productForPrice.price.toLocaleString("en-IN")}**! Squaawk!`,
            actions: [
              { label: `Order ${productForPrice.name} 📞`, actionKey: "whatsapp_direct", isWhatsApp: true },
            ],
            newContext,
          };
        }
        // No product in context
        return {
          text: "Squawk! I'm happy to tell you the price, but which product are you asking about?",
          newContext,
        };

      case "PRODUCT_INFO":
        let productForInfo = entities.product || currentContext.lastDiscussedProduct;
        if (productForInfo) {
          if (/diet|food|eat/i.test(query)) {
            return {
              text: `Squawk! For the **${productForInfo.name}**, the dietary focus is: ${productForInfo.dietaryRequirements || "seeds, fresh fruits, and high-protein pet feed"}!`,
              newContext
            }
          }
          return {
            text: `Squawk! Here is what Polly knows about the **${productForInfo.name}**:\n\n${productForInfo.about}\n\nChirp chirp!`,
            actions: [{ label: `Enquire on WhatsApp 📞`, actionKey: "whatsapp_direct", isWhatsApp: true }],
            newContext,
          };
        }
        return {
          text: "Squawk! Which product do you want to know more about?",
          newContext,
        };

      case "SHOW_CATEGORY":
        return this.handleShowCategory(query, entities, newContext);

      case "FAQ":
        const faqMatch = faqData.find((faq) =>
          faq.keywords.some((kw) => query.toLowerCase().includes(kw))
        );
        if (faqMatch) {
          return {
            text: faqMatch.answer,
            actions: faqMatch.actions,
            newContext,
          };
        }
        break; // Fallthrough to FALLBACK

      case "FALLBACK":
      default:
        // Fuzzy Relevance Weighted Search as fallback
        if (entities.product) {
           newContext.lastDiscussedProduct = entities.product;
           return {
             text: `Squawk! Did you mean the **${entities.product.name}**?`,
             products: [entities.product],
             newContext
           }
        }

        const tokens = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
        let searchMatches: Array<{ product: typeof products[0]; score: number }> = [];

        if (tokens.length > 0) {
            products.forEach(p => {
            let score = 0;
            const nameL = p.name.toLowerCase();
            const descL = p.description.toLowerCase();
            const catL = p.category.toLowerCase();

            tokens.forEach(token => {
                if (nameL.includes(token)) score += 12;
                if (catL.includes(token)) score += 6;
                if (descL.includes(token)) score += 3;
            });

            if (score > 0) {
                searchMatches.push({ product: p, score });
            }
            });
        }

        searchMatches.sort((a, b) => b.score - a.score);
        let directMatches = searchMatches.map(m => m.product);

        // Apply price filters to fallback search
        if (entities.maxPrice) {
            directMatches = directMatches.filter(p => p.price <= entities.maxPrice!);
        }
        if (entities.sortByPrice === "asc") {
            directMatches.sort((a,b) => a.price - b.price);
        } else if (entities.sortByPrice === "desc") {
            directMatches.sort((a,b) => b.price - a.price);
        }

        if (directMatches.length > 0) {
            newContext.lastDiscussedProduct = directMatches[0]; // Track the top result
            return {
            text: `Squawk! I found ${directMatches.length} matching items in our exotic archives! Take a look, chirp!`,
            products: directMatches.slice(0, 5), // Top 5
            newContext
            };
        }

        return {
          text: "Squawk! Polly is thinking... 🦜 I couldn't quite map that to our catalog, chirp! But here is a quick directory of what Polly knows best.",
          actions: [
            { label: "Show Birds 🦜", actionKey: "show_birds" },
            { label: "Show Puppies 🐶", actionKey: "show_puppies" },
            { label: "Home Delivery 📦", actionKey: "faq_delivery" },
          ],
          newContext,
        };
    }
    
    return {
        text: "Squawk! Something went wrong in Polly's brain!",
        newContext
    }
  }

  private handleShowCategory(query: string, entities: ExtractedEntities, newContext: ChatContext): EngineResponse {
    let cat = entities.category || newContext.lastCategory;
    if (!cat) {
      newContext.pendingQuestion = "ASK_CATEGORY";
      return {
        text: "Squawk! We have many wonderful pets and items. Are you looking for Birds, Puppies, Aquarium Fishes, Food, or Small Pets?",
        newContext,
      };
    }

    newContext.lastCategory = cat;
    newContext.pendingQuestion = null;

    let filtered = products.filter((p) => p.category === cat);
    
    // Feature: Filter by max price
    if (entities.maxPrice) {
        filtered = filtered.filter(p => p.price <= entities.maxPrice!);
    }
    
    // Feature: Sort by price
    if (entities.sortByPrice === "asc") {
        filtered.sort((a,b) => a.price - b.price);
    } else if (entities.sortByPrice === "desc") {
        filtered.sort((a,b) => b.price - a.price);
    }

    if (filtered.length === 0) {
       return {
           text: `Squawk! I couldn't find any ${cat} matching your criteria (e.g. price limits). Chirp!`,
           newContext
       }
    }

    if (filtered.length === 1) {
        newContext.lastDiscussedProduct = filtered[0];
    }

    let intro = `Here are our ${cat}!`;
    if (cat === "puppies") intro = "Squawk! Wiggle tails! Here are our healthy puppies.";
    if (cat === "birds") intro = "Squawk! Beautiful choice! We have the most intelligent feathered companions.";
    if (cat === "food") intro = "Squawk! Yummy! Highly nutritious premium meals.";

    if (entities.maxPrice) intro += ` Under ₹${entities.maxPrice.toLocaleString('en-IN')}.`;
    if (entities.sortByPrice === "asc") intro += ` Sorted by lowest price.`;

    return {
      text: intro + " Chirp chirp!",
      products: filtered.slice(0, 10), // Limit to top 10 to avoid UI clutter
      newContext,
    };
  }
}

export const chatbotEngine = new ChatbotEngine();
