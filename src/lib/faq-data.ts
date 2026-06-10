export interface FAQ {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
  actions?: Array<{ label: string; actionKey: string; isWhatsApp?: boolean }>;
}

export const faqData: FAQ[] = [
  {
    id: "delivery",
    keywords: ["deliver", "delivery", "shipping", "send", "post", "courier"],
    question: "Do you deliver pets or food?",
    answer: "Squawk! 📦 Delivery details: Yes! We provide home delivery for pet food and accessories within Pollachi city limits. For orders outside the city, delivery charges apply based on distance.",
    actions: [{ label: "Request Home Delivery 📞", actionKey: "whatsapp_direct", isWhatsApp: true }],
  },
  {
    id: "vaccinations",
    keywords: ["vaccin", "vax", "injection", "deworm", "health", "certificate"],
    question: "Are your pets vaccinated?",
    answer: "Squaaawk! Healthy and vaccinated! 💉 All our puppies and kittens come with their first round of vaccinations completed, dewormed, and with an official certified health record card!",
    actions: [{ label: "Enquire about Puppies 🐶", actionKey: "show_puppies" }],
  },
  {
    id: "preorder",
    keywords: ["preorder", "pre-order", "import", "special order", "breed request"],
    question: "Can I pre-order a specific breed?",
    answer: "Squawk! Special requests? Yes! If you are looking for a specific exotic bird, fish, or puppy breed, we can arrange it! Please visit our shop or contact us on WhatsApp to discuss pre-orders. Squaawk!",
    actions: [{ label: "Contact for Pre-order 📞", actionKey: "whatsapp_direct", isWhatsApp: true }],
  },
  {
    id: "hours",
    keywords: ["hour", "time", "open", "close", "sunday", "saturday"],
    question: "What are your opening hours?",
    answer: "Squawk! We are open every single day (Monday to Sunday) from **10:00 AM to 8:30 PM**. Drop by our physical store to say hello to our real birds! Chirp!",
  },
  {
    id: "location",
    keywords: ["address", "location", "where", "place", "map", "shop"],
    question: "Where are you located?",
    answer: "Squawk! Fly over to our shop! 🗺️ We are located at:\n**Kannaki Street, Mahalingapuram, Pollachi**.\nDrop by to see our magnificent aquarium collections and pet supplies! Squaawk!",
  },
  {
    id: "consultation",
    keywords: ["consult", "doctor", "groom", "spa", "care advice", "vet"],
    question: "Do you offer pet grooming and consultations?",
    answer: "Squawk! 🏥 We offer full Pet Consultations, Grooming & Spa services, and expert Pet Care Advice! Reach our expert teams on WhatsApp instantly!",
    actions: [
      { label: "Grooming & Spa ✂️", actionKey: "whatsapp_grooming", isWhatsApp: true },
      { label: "Pet Consultation 🩺", actionKey: "whatsapp_consult", isWhatsApp: true },
    ],
  },
  {
    id: "tank_maintenance",
    keywords: ["clean tank", "maintenance", "aquascaping", "filter install"],
    question: "Do you do aquarium tank maintenance?",
    answer: "Squawk! Need professional tank setup or maintenance? 🐠 Our experts handle deep water cleaning, filter installations, and aqua-scaping! Chirp!",
    actions: [{ label: "Book Maintenance 🛠️", actionKey: "whatsapp_tank_link", isWhatsApp: true }],
  }
];
