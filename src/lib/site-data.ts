import type { LucideIcon } from "lucide-react";
import {
  Bird,
  Bone,
  Dog,
  Fish,
  Ham,
  Package,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";

export const site = {
  name: "Exotic Pets",
  suffix: "World Pollachi",
  phone: "+91 99429 19000",
  phoneHref: "tel:+919942919000",
  whatsappHref:
    "https://wa.me/919942919000?text=Hi%20Exotic%20Pets%20World%20Pollachi%2C%20I%20would%20like%20to%20enquire.",
  address: "Kannaki Street, Mahalingapuram, Pollachi",
  hours: "Mon - Sun: 10:00 AM - 8:30 PM",
  logo:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBPzL9bM6VzFDQn3wNdtDPaCytkc0zl19T_c-tWWq4x2qwLkkgyLljVSb8l3-yMcoqchpE-gAJJeYk-Cb6fX-13osGBYOfVsaqQ9ICZHEUfFo5sLPsNT4PujGNIm5IZUS93OST5R0Nb-LdXBcRyaGTMNC8vBg8ilQukvpVTtFvkfg5_4CiWZ11NtYQJv9Wd-i1VCLs100vb44tuCiCNclfOXhPMQh9B6_YhAptpPxJiltPaxarKY1cdA6w0qQEsoES1pF0lZCVDLBc",
  footerLogo:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAiTgpry6n9uFx9g8eeIPp5Qc8maJEWmwiA-whSeydYwxz4HdUG2NOd9TNfyC0ZzH13fMTrqNKvYx2-YqShLuhCsPG82K3nEbI4YgzkiKwvn4mjQX-9rC1yFiHy-SQ2T75hKY8-8F63Co7uQ3L8jZuyr-nVoGlePKZJX3y00toWG0BGYvMr9E6GKGJghrzlHZNLnGAJ0fS2IGuyJUrBS01J1LxQ5pGPuo6mw5jLv6n8dsyGj2WoOlvmKYfzEtdUgitEQ2YJ9eUdM14",
  heroImages: [
    "/images/dog_food.png",
    "/images/pets_collection.png",
    "/images/pet_supplements.png",
    "/images/dog_foods_brands.png",
  ],
};

export type CategoryId =
  | "all"
  | "birds"
  | "puppies"
  | "aquarium"
  | "food"
  | "accessories"
  | "small-pets"
  | "supplements";

export type Category = {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
};

export const categories: Category[] = [
  { id: "all", label: "All Items", icon: Package },
  { id: "birds", label: "Birds", icon: Bird },
  { id: "puppies", label: "Puppies", icon: Dog },
  { id: "aquarium", label: "Aquarium", icon: Fish },
  { id: "food", label: "Pet Food", icon: ShoppingBag },
  { id: "accessories", label: "Accessories", icon: Bone },
  { id: "small-pets", label: "Small Pets", icon: Ham },
  { id: "supplements", label: "Supplements", icon: ShieldCheck },
];

export type Product = {
  id: string;
  name: string;
  description: string;
  category: Exclude<CategoryId, "all">;
  image: string;
  imageFit?: "cover" | "contain";
  imageTone?: string;
  action: "enquire" | "details";
  price: number;
  brand?: string;
  age?: string;
  dietaryRequirements?: string;
  createdAt: string;
  galleryImages: string[];
  about: string;
  keyFeatures: string[];
  conditions: string[];
};

export const products: Product[] = [
  {
    id: "blue-gold-macaw",
    name: "Blue & Gold Macaw",
    description: "Beautiful, intelligent & playful macaw parrots.",
    category: "birds",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzTBJe6C84AG5reDBaTHQQThUTtnwH9QO3kaHkqmiaLdPQW3mXwr5p0DaMGqTSUaXoPX-eb7JnTfz3eQutyVhvigv_qr9yDtDEmdI0iELA1sp02mi9qWUPMrSFjDHg_GzIZ_LN2QwBO5OqDf2T65N8lntmMSsXEpNSSZfUpou--2TQxbhKVabkOe_tbfabLV5XcFPvht3EMB9vXMPEKY2hGQSUTbZCe7wViyot5IMQ2jyGNzXJko_wycm2HEncRKf-xUaYVqbIWgw",
    action: "enquire",
    price: 45000,
    age: "Adult",
    createdAt: "2026-05-20T10:00:00Z",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzTBJe6C84AG5reDBaTHQQThUTtnwH9QO3kaHkqmiaLdPQW3mXwr5p0DaMGqTSUaXoPX-eb7JnTfz3eQutyVhvigv_qr9yDtDEmdI0iELA1sp02mi9qWUPMrSFjDHg_GzIZ_LN2QwBO5OqDf2T65N8lntmMSsXEpNSSZfUpou--2TQxbhKVabkOe_tbfabLV5XcFPvht3EMB9vXMPEKY2hGQSUTbZCe7wViyot5IMQ2jyGNzXJko_wycm2HEncRKf-xUaYVqbIWgw",
    ],
    about: "The Blue & Gold Macaw is one of the most iconic parrot species in the world. Known for their striking blue and yellow plumage, these intelligent birds can live up to 60 years and form deep bonds with their owners. They are excellent talkers and can learn a vocabulary of 20+ words. Native to South America, they thrive in warm climates and love social interaction.",
    keyFeatures: [
      "Lifespan: 50–60 years",
      "Size: 76–86 cm (30–34 inches)",
      "Can learn to talk and mimic sounds",
      "Highly intelligent & trainable",
      "Vibrant blue & gold plumage",
      "Social and affectionate personality",
    ],
    conditions: [
      "Requires a spacious cage (minimum 3ft x 3ft x 5ft)",
      "Needs daily interaction and mental stimulation",
      "Diet: Seeds, nuts, fruits, and vegetables",
      "Regular vet checkups recommended every 6 months",
      "Not ideal for first-time bird owners",
      "Keep away from kitchen fumes and aerosols",
    ],
  },
  {
    id: "love-birds",
    name: "Love Birds",
    description: "Friendly & colorful companions for your home.",
    category: "birds",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAh42X_PnkfebDPTbVQYaKCiGyP8DRX4b3CygceRX6DcbX-KgSh7fZYprcfM6s3_o9-O76bUIheiMJi3B_5m9tHTFNIFauSXY7iHRAC-p92nyfVewWh7HtGKsgioQYF1mMAfM1NQ5DcXlJ8jBdhFmDAgHCV9pB4Y-j9OTuy4zDQs0IRkd8i4_LNVInZpFFaLWzYJ0j9SC8Ds2Eo-CXNAv4BMvSJ7JYeBTcBrwFLkNxRfvY2DRxSJGhOvvdHnLwTr14qfkUulXIYkjw",
    action: "enquire",
    price: 2500,
    age: "Baby",
    createdAt: "2026-05-22T10:00:00Z",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAh42X_PnkfebDPTbVQYaKCiGyP8DRX4b3CygceRX6DcbX-KgSh7fZYprcfM6s3_o9-O76bUIheiMJi3B_5m9tHTFNIFauSXY7iHRAC-p92nyfVewWh7HtGKsgioQYF1mMAfM1NQ5DcXlJ8jBdhFmDAgHCV9pB4Y-j9OTuy4zDQs0IRkd8i4_LNVInZpFFaLWzYJ0j9SC8Ds2Eo-CXNAv4BMvSJ7JYeBTcBrwFLkNxRfvY2DRxSJGhOvvdHnLwTr14qfkUulXIYkjw",
    ],
    about: "Love Birds are small, colorful parrots that are perfect for families and first-time bird owners. They are known for their affectionate nature and the strong bonds they form with their mates. Available in a range of beautiful colors including peach-faced, Fischer's, and masked varieties. They are active, playful, and love to chirp throughout the day.",
    keyFeatures: [
      "Lifespan: 10–15 years",
      "Size: 13–17 cm (5–7 inches)",
      "Available in multiple color mutations",
      "Great for beginners and families",
      "Active and playful personality",
      "Best kept in pairs for companionship",
    ],
    conditions: [
      "Cage size: minimum 18\" x 18\" x 24\"",
      "Diet: Seeds, millet, fresh fruits & leafy greens",
      "Needs clean water daily",
      "Keep cage in a well-lit area away from direct sunlight",
      "Toys and perches for mental stimulation",
      "Avoid chocolate, avocado, and caffeine",
    ],
  },
  {
    id: "golden-retriever-puppy",
    name: "Golden Retriever Puppy",
    description: "Healthy, active & fully vaccinated golden retriever puppies.",
    category: "puppies",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdkUX8osWsxI9lVmf3DwTeL4Yz8KFSBvVPmKno4rtm1ctajashYlGXK_pmq_UDrWF0xFDs9tzokPaixtDH_yT5DNVD60XJWzgW1JRrhuwiY36_FuzSw53WbbgHUHD32beTq9QcMyXQrzat37rT-8QPzBhyVRA7hE0ZfEEbBFccy6c1X-ecFhrw1gTViy8QQZ6DEV4qd1642HMnGbViNVVGT3rN3KsLW2AGNxeb6Wzd4vhrB6mddZqr4JAYCWTGDqzLxgstH7N4jqw",
    action: "enquire",
    price: 15000,
    age: "Baby",
    createdAt: "2026-05-25T10:00:00Z",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdkUX8osWsxI9lVmf3DwTeL4Yz8KFSBvVPmKno4rtm1ctajashYlGXK_pmq_UDrWF0xFDs9tzokPaixtDH_yT5DNVD60XJWzgW1JRrhuwiY36_FuzSw53WbbgHUHD32beTq9QcMyXQrzat37rT-8QPzBhyVRA7hE0ZfEEbBFccy6c1X-ecFhrw1gTViy8QQZ6DEV4qd1642HMnGbViNVVGT3rN3KsLW2AGNxeb6Wzd4vhrB6mddZqr4JAYCWTGDqzLxgstH7N4jqw",
    ],
    about: "The Golden Retriever is one of the most popular dog breeds worldwide, known for their gentle temperament, intelligence, and loyalty. These puppies come fully vaccinated with health certificates. Golden Retrievers are excellent family dogs, great with children, and highly trainable. They are also used as therapy dogs and service animals due to their calm and obedient nature.",
    keyFeatures: [
      "Lifespan: 10–12 years",
      "Adult weight: 25–35 kg",
      "Fully vaccinated with health certificate",
      "Excellent family & kids-friendly breed",
      "Highly trainable and intelligent",
      "Beautiful golden coat, regular grooming needed",
    ],
    conditions: [
      "Requires daily exercise (30–60 min walks)",
      "Regular grooming and brushing needed",
      "Diet: High-quality puppy food, transition to adult food at 12 months",
      "Schedule vet visits for booster shots",
      "Needs space to run and play",
      "Prone to hip dysplasia – maintain healthy weight",
    ],
  },
  {
    id: "dachshund-puppy",
    name: "Dachshund Puppy",
    description: "Playful, smart & adorable sausage dog.",
    category: "puppies",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCcXk7wgkF76sN2KBINTlSBIDhbwjOga7tnbY_FH9mQ_gbmR2pFbAX2XhrurGji4DpZD9ONqDj9nwYWGicvX6wvOvnmesoDDuCOuS7RsbXj-54xsnlzm5NbVCCdajVX2wno-OPsmWWH9aGcWPL8uQ8nZqXXzxnodA06E-Ccpcm6JRz32Tuf_2eCdNGOEuNtLt4eY1b6qCHrU1-6lvFDD9ZWaIhyp3RVEqEGAeoGynHeRkvEgB_OfEfArUDUwOw5bG1MDNAjeV5Aa6M",
    action: "enquire",
    price: 12000,
    age: "Baby",
    createdAt: "2026-05-24T10:00:00Z",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCcXk7wgkF76sN2KBINTlSBIDhbwjOga7tnbY_FH9mQ_gbmR2pFbAX2XhrurGji4DpZD9ONqDj9nwYWGicvX6wvOvnmesoDDuCOuS7RsbXj-54xsnlzm5NbVCCdajVX2wno-OPsmWWH9aGcWPL8uQ8nZqXXzxnodA06E-Ccpcm6JRz32Tuf_2eCdNGOEuNtLt4eY1b6qCHrU1-6lvFDD9ZWaIhyp3RVEqEGAeoGynHeRkvEgB_OfEfArUDUwOw5bG1MDNAjeV5Aa6M",
    ],
    about: "The Dachshund, affectionately known as the 'sausage dog', is a playful and curious breed with a bold personality. Despite their small size, they are courageous and make excellent watchdogs. Their long body and short legs give them a unique and adorable appearance. They come in smooth, long-haired, and wire-haired varieties.",
    keyFeatures: [
      "Lifespan: 12–16 years",
      "Adult weight: 7–14 kg",
      "Compact size, ideal for apartments",
      "Bold, curious & alert personality",
      "Low shedding (smooth coat variety)",
      "Great watchdog with a loud bark",
    ],
    conditions: [
      "Avoid excessive jumping to protect spine",
      "Daily short walks recommended (20–30 min)",
      "Diet: Portion-controlled meals to prevent obesity",
      "Regular dental care needed",
      "Keep nails trimmed regularly",
      "Prone to back problems – use ramps instead of stairs",
    ],
  },
  {
    id: "angelfish",
    name: "Angelfish",
    description: "Elegant freshwater fish for a peaceful aquarium.",
    category: "aquarium",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDcYDOovI_9Xqe9hl3UbJQ4wWh8FC0SldBKpb3-U9Y5ZLF6tgu1jMWIqGjWkXUb2OffcqxVwA-J-JMXTH7M7Gj8pARf11kds544e6RiQLpy0P7lJCuDACKVmGwzHKWk01uhRBO22Su9aQKffp-2IzPul6K2O4j9gevUVRBr55bqw-1kdfRe8rdmfCHR9M4V7dPawTWX9tCvqdvRPoe5eBqH8_fcZMCkVv_dzmOe0zuhm4F6Z_hGhWUDg03fJ-99aeJJ2jE-9c4UO3s",
    action: "enquire",
    price: 200,
    age: "Adult",
    createdAt: "2026-05-21T10:00:00Z",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDcYDOovI_9Xqe9hl3UbJQ4wWh8FC0SldBKpb3-U9Y5ZLF6tgu1jMWIqGjWkXUb2OffcqxVwA-J-JMXTH7M7Gj8pARf11kds544e6RiQLpy0P7lJCuDACKVmGwzHKWk01uhRBO22Su9aQKffp-2IzPul6K2O4j9gevUVRBr55bqw-1kdfRe8rdmfCHR9M4V7dPawTWX9tCvqdvRPoe5eBqH8_fcZMCkVv_dzmOe0zuhm4F6Z_hGhWUDg03fJ-99aeJJ2jE-9c4UO3s",
    ],
    about: "Angelfish are among the most popular freshwater aquarium fish, admired for their graceful shape and elegant fins. They belong to the Cichlid family and are native to the Amazon Basin. Their triangular body shape and long, flowing fins make them a stunning centerpiece in any aquarium. Available in silver, marble, black, and koi varieties.",
    keyFeatures: [
      "Lifespan: 8–10 years",
      "Size: Up to 15 cm (6 inches) tall",
      "Peaceful community fish",
      "Available in multiple color varieties",
      "Graceful swimming pattern",
      "Hardy and easy to maintain",
    ],
    conditions: [
      "Tank size: Minimum 75 litres (20 gallons)",
      "Water temperature: 24–28°C (75–82°F)",
      "pH level: 6.0–7.5",
      "Feed: Flakes, pellets, and frozen bloodworms",
      "Avoid keeping with fin-nipping species",
      "Weekly 25% water change recommended",
    ],
  },
  {
    id: "neon-tetra",
    name: "Neon Tetra",
    description: "Colorful schooling fish, perfect for community tanks.",
    category: "aquarium",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_7NvHXMdgabyPsi-fqIggC4vnuwBTPx32TpZWJH09nDhnVeV5jUUUZZmFCKwKMzUui9gPfe9xvQtRiE-W2tharZa7hBmHu3X7ZTMD82blzIynryFrxToUGgPcDbrAdbVb3dGWpT8YIaadtqnt_jMN1BC3CRYPC1vuQcuXsRlTWD5PFw0GU4ro1QUGsql8nH322k1TZgQ05wmfkkG0o_xaribTxVy_9O20zj5NBuym_aSR2DETaPaw1NJ-JpD9KiqOHcaj5a5Cb44",
    action: "enquire",
    price: 50,
    age: "Baby",
    createdAt: "2026-05-18T10:00:00Z",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_7NvHXMdgabyPsi-fqIggC4vnuwBTPx32TpZWJH09nDhnVeV5jUUUZZmFCKwKMzUui9gPfe9xvQtRiE-W2tharZa7hBmHu3X7ZTMD82blzIynryFrxToUGgPcDbrAdbVb3dGWpT8YIaadtqnt_jMN1BC3CRYPC1vuQcuXsRlTWD5PFw0GU4ro1QUGsql8nH322k1TZgQ05wmfkkG0o_xaribTxVy_9O20zj5NBuym_aSR2DETaPaw1NJ-JpD9KiqOHcaj5a5Cb44",
    ],
    about: "Neon Tetras are one of the most popular tropical fish in the hobby. Their iridescent blue and red stripe makes them one of the most eye-catching fish in any aquarium. They are peaceful schooling fish that do best in groups of 6 or more. Native to South American blackwater streams, they bring a dazzling flash of colour to planted community tanks.",
    keyFeatures: [
      "Lifespan: 5–8 years",
      "Size: 2.5 cm (1 inch)",
      "Brilliant iridescent blue & red coloring",
      "Peaceful community fish",
      "Best kept in schools of 6+",
      "Low maintenance and beginner-friendly",
    ],
    conditions: [
      "Tank size: Minimum 38 litres (10 gallons) for a school",
      "Water temperature: 20–26°C (68–79°F)",
      "pH level: 6.0–7.0 (slightly acidic preferred)",
      "Feed: Micro pellets, flakes, and baby brine shrimp",
      "Prefer dim lighting and planted tanks",
      "Sensitive to water quality – cycle tank before adding",
    ],
  },
  {
    id: "premium-dog-food",
    name: "Pedigree Adult Dog Food",
    description: "High-quality chicken and vegetables dry food for adult dogs.",
    category: "food",
    image: "/images/dog_food.png",
    imageFit: "contain",
    imageTone: "bg-orange-50/60",
    action: "details",
    price: 1800,
    brand: "Pedigree",
    age: "Adult",
    dietaryRequirements: "High Protein",
    createdAt: "2026-05-15T10:00:00Z",
    galleryImages: [
      "/images/dog_food.png",
    ],
    about: "Pedigree Adult Dog Food provides complete and balanced nutrition for adult dogs of all breeds. Formulated with real chicken and essential vegetables, it delivers high-quality protein to support strong muscles, dietary fibers for healthy digestion, and zinc with omega-6 for a radiant coat.",
    keyFeatures: [
      "Chicken and wholesome vegetables formula",
      "High protein for muscle maintenance",
      "Omega 6 & Zinc for healthy skin and coat",
      "Dietary fibers to support gut health",
      "No artificial colors or preservatives",
      "Available in 3kg, 10kg, and 20kg packs",
    ],
    conditions: [
      "Store in a cool, dry place",
      "Seal bag after opening to maintain freshness",
      "Serve at room temperature",
      "Always provide fresh drinking water",
      "Follow feeding guide based on dog's weight",
      "Transition gradually over 7 days from old food",
    ],
  },
  {
    id: "premium-cat-food",
    name: "Premium Cat Food",
    description: "Complete & balanced food for happy cats.",
    category: "food",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCu4GgAGPZPkOjNcUIcge5WT6sWervQJjfA4EkQw5DzT2APsoKm2MzaevxEC_CFdixX2-cu4oEXQXOfO_lcPq_E68A0CMcFD_WeWvR-eRd2D69rkZSYW6hrshVeT-S1rOh3Gyxy2nrCUvgWJV_tD2WsUna12NWCsZfuuRu1b6U2O0_iAJ6YuKHKYbGhaDoInBvDmg9QWY-U2_eCR4RjIUq14s9cjjZ5nJ60KUdJ8p4BeUD-BEeP4yVT1H_AMqD-fr_fQz8M5OXAOQY",
    imageFit: "contain",
    imageTone: "bg-blue-50/60",
    action: "details",
    price: 1200,
    brand: "Whiskas",
    dietaryRequirements: "Grain Free",
    createdAt: "2026-05-10T10:00:00Z",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCu4GgAGPZPkOjNcUIcge5WT6sWervQJjfA4EkQw5DzT2APsoKm2MzaevxEC_CFdixX2-cu4oEXQXOfO_lcPq_E68A0CMcFD_WeWvR-eRd2D69rkZSYW6hrshVeT-S1rOh3Gyxy2nrCUvgWJV_tD2WsUna12NWCsZfuuRu1b6U2O0_iAJ6YuKHKYbGhaDoInBvDmg9QWY-U2_eCR4RjIUq14s9cjjZ5nJ60KUdJ8p4BeUD-BEeP4yVT1H_AMqD-fr_fQz8M5OXAOQY",
    ],
    about: "Premium Cat Food is a grain-free formula made with real ocean fish as the primary ingredient. It supports healthy digestion with added prebiotics and provides all the essential amino acids cats need, including taurine for heart and eye health. Perfect for cats of all ages with a taste they will love.",
    keyFeatures: [
      "Real ocean fish as #1 ingredient",
      "Grain-free formula for sensitive stomachs",
      "Added taurine for heart & eye health",
      "Rich in Omega 3 for shiny coat",
      "No artificial preservatives or fillers",
      "Available in 1.5kg, 7kg, and 12kg packs",
    ],
    conditions: [
      "Store in a cool, dry place",
      "Reseal packaging after each use",
      "Fresh water should always be available",
      "Follow daily feeding portions on the package",
      "Transition gradually from previous food",
      "Not suitable for kittens under 6 weeks",
    ],
  },
  {
    id: "dog-collar",
    name: "Dog Collar",
    description: "Durable, comfortable & stylish collars for your pets.",
    category: "accessories",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCLrXMDzaIJ8ZUu3J3rQ7IgC4anFxZRlLs6XcACFYrhDYuPOG--h6CiqoberpWakBgciRWOJBJ9xt0Zx1mEA-VrDlpBuA8KfxWggBuzzT1ywiMSvJ-XNHewIJk74hYxMy1IOCQkczwPYWznPwio8b0LYc3KByOlTB-2K06pmqd5i_5Nda8GAb1s8DNHu2Bu1mw94vZ_d9yFRqRMw9HnqYE9SACBogU-OwbEgqYxw8kxJxtAxmZcmv8hEslYQPDPYkQhnF6bZN-Vm9w",
    imageFit: "contain",
    action: "details",
    price: 350,
    brand: "PetPlus",
    createdAt: "2026-05-23T10:00:00Z",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCLrXMDzaIJ8ZUu3J3rQ7IgC4anFxZRlLs6XcACFYrhDYuPOG--h6CiqoberpWakBgciRWOJBJ9xt0Zx1mEA-VrDlpBuA8KfxWggBuzzT1ywiMSvJ-XNHewIJk74hYxMy1IOCQkczwPYWznPwio8b0LYc3KByOlTB-2K06pmqd5i_5Nda8GAb1s8DNHu2Bu1mw94vZ_d9yFRqRMw9HnqYE9SACBogU-OwbEgqYxw8kxJxtAxmZcmv8hEslYQPDPYkQhnF6bZN-Vm9w",
    ],
    about: "This premium dog collar is made from high-quality nylon with a reinforced stitching pattern for extra durability. The quick-release buckle makes it easy to put on and take off. Available in multiple sizes from Small to XL to fit all breeds. Reflective strip included for nighttime visibility and safety during walks.",
    keyFeatures: [
      "High-strength nylon construction",
      "Quick-release safety buckle",
      "Reflective strip for night visibility",
      "Adjustable sizing for perfect fit",
      "Available in S, M, L, and XL",
      "Multiple colours available",
    ],
    conditions: [
      "Measure your dog's neck before ordering",
      "Leave 2-finger gap between collar and neck",
      "Check collar fit as puppy grows",
      "Hand wash with mild soap when dirty",
      "Replace if fraying or buckle damage is visible",
      "Not a substitute for a harness during walks",
    ],
  },
  {
    id: "rope-toy",
    name: "Rope Toy",
    description: "Strong & safe toys for hours of fun.",
    category: "accessories",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmUWW38cAGIBwsoLABcSzR_e3ZgkE-siG6UQE39mfmOA3AsMWd6EmC30FWuCKaGBJ8mc5Ucn0w7mPPjiNkcaqEqMkNF81nJ1FmqdYgJhzg-W2X2W3j5LnsE8LvrWuFYMmH7z14pgsjpO2UpaB4wWKeAxuMc-tc4iKRrSnuAPNYeVvzKXUatXW8rQ1aeb4S4CTgLByAMngIltuNNyQ-KHiSnfdC15U600zfO4s6mjctQhzujCkQsquiBjEjVjkackHGhsluqsU_P-k",
    imageFit: "contain",
    action: "details",
    price: 150,
    brand: "KONG",
    createdAt: "2026-05-05T10:00:00Z",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmUWW38cAGIBwsoLABcSzR_e3ZgkE-siG6UQE39mfmOA3AsMWd6EmC30FWuCKaGBJ8mc5Ucn0w7mPPjiNkcaqEqMkNF81nJ1FmqdYgJhzg-W2X2W3j5LnsE8LvrWuFYMmH7z14pgsjpO2UpaB4wWKeAxuMc-tc4iKRrSnuAPNYeVvzKXUatXW8rQ1aeb4S4CTgLByAMngIltuNNyQ-KHiSnfdC15U600zfO4s6mjctQhzujCkQsquiBjEjVjkackHGhsluqsU_P-k",
    ],
    about: "The KONG Rope Toy is designed for interactive play between you and your dog. Made from 100% natural cotton fibres, it is safe for chewing and helps clean teeth and massage gums during play. The knotted ends provide a comfortable grip for tug-of-war games. Available in different sizes for small, medium, and large breeds.",
    keyFeatures: [
      "100% natural cotton fibres",
      "Helps clean teeth while playing",
      "Knotted ends for easy gripping",
      "Great for tug-of-war and fetch",
      "Durable construction for heavy chewers",
      "Available in 3 sizes: S, M, L",
    ],
    conditions: [
      "Supervise your pet during play",
      "Replace when fibres start to unravel",
      "Not suitable for aggressive chewers",
      "Machine washable in cold water",
      "Remove if pieces break off",
      "Dry thoroughly before giving back to pet",
    ],
  },
  {
    id: "bird-play-stand",
    name: "Bird Play Stand",
    description: "Interactive play stand for birds to stay active.",
    category: "accessories",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_qOBnqNZh1HlJ4LL277K7iccqkGADm455KT4Ljr4xo-PuUnwy2u7AMpaWFChorfej1AbTyI4qi1SctSavmr_j_a84jh_94vqJdg1mG14k_JIvKsfVjuIlwDhhZyrFz1qxJ4fypn9sc8KWPXazeAjGUpepYkYGwFsIhH55Rmy21rj4HSx-zcNaydDJ0uDvR8kfhEut-GvyaBZpH3BP4rD4CLpL6jBYpMTxIRSTZbLVx9GnArID0Y7cK4Bt8kQPh765kPNw96DVHxo",
    imageFit: "contain",
    action: "details",
    price: 1800,
    brand: "Aviary Basics",
    createdAt: "2026-05-12T10:00:00Z",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_qOBnqNZh1HlJ4LL277K7iccqkGADm455KT4Ljr4xo-PuUnwy2u7AMpaWFChorfej1AbTyI4qi1SctSavmr_j_a84jh_94vqJdg1mG14k_JIvKsfVjuIlwDhhZyrFz1qxJ4fypn9sc8KWPXazeAjGUpepYkYGwFsIhH55Rmy21rj4HSx-zcNaydDJ0uDvR8kfhEut-GvyaBZpH3BP4rD4CLpL6jBYpMTxIRSTZbLVx9GnArID0Y7cK4Bt8kQPh765kPNw96DVHxo",
    ],
    about: "The Aviary Basics Bird Play Stand is a tabletop activity centre designed to keep your feathered friend entertained outside the cage. It features multiple perches, a swing, feeding cups, and a chew toy. Made from bird-safe natural wood with a stainless steel base for stability. Suitable for parakeets, cockatiels, lovebirds, and small parrots.",
    keyFeatures: [
      "Natural wood perches and swing",
      "Stainless steel base for stability",
      "Includes 2 feeding cups",
      "Detachable chew toy included",
      "Easy to assemble (no tools needed)",
      "Suitable for small to medium birds",
    ],
    conditions: [
      "Place on a flat, stable surface",
      "Clean feeding cups daily",
      "Inspect wood for wear and replace when needed",
      "Supervise birds when on the stand",
      "Do not place near open windows or fans",
      "Wipe base with damp cloth weekly",
    ],
  },
  {
    id: "syrian-hamster",
    name: "Syrian Hamster",
    description: "Cute, friendly & easy to care for small pets.",
    category: "small-pets",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBulr0k2geVzn5tUgIww_uvVnHU23lehvJpEjW25_cibqe1mgm9NuH-l6Slp0SxdQ4huCxtnMAJlnnkRqMsfDoSFsuoKgpRoRsWqbrW7SpJVab-Bbdg4ea4UNhoIB8C9nDxgW9rHazcJMlVQo7s9HRGcQQ3f3nWFHkJEeqX2N3QOJnWvDff5znAApErh8uZcMRjxi2Yh0SOzQZ6Ph4hdpvm0sejqMY522A_2TnPbNoS7r4bdSxM2tWHPPuB8TMba5nuJ77goQPnlcE",
    imageTone: "bg-orange-50/40",
    action: "details",
    price: 450,
    age: "Baby",
    createdAt: "2026-05-26T10:00:00Z",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBulr0k2geVzn5tUgIww_uvVnHU23lehvJpEjW25_cibqe1mgm9NuH-l6Slp0SxdQ4huCxtnMAJlnnkRqMsfDoSFsuoKgpRoRsWqbrW7SpJVab-Bbdg4ea4UNhoIB8C9nDxgW9rHazcJMlVQo7s9HRGcQQ3f3nWFHkJEeqX2N3QOJnWvDff5znAApErh8uZcMRjxi2Yh0SOzQZ6Ph4hdpvm0sejqMY522A_2TnPbNoS7r4bdSxM2tWHPPuB8TMba5nuJ77goQPnlcE",
    ],
    about: "Syrian Hamsters, also known as Golden Hamsters, are the most popular hamster species kept as pets. They are solitary animals that prefer to live alone. Known for their gentle nature, they are easy to tame and handle, making them perfect for children and first-time pet owners. They are nocturnal, becoming most active during the evening and night.",
    keyFeatures: [
      "Lifespan: 2–3 years",
      "Size: 15–17 cm (6–7 inches)",
      "Gentle, easy to handle",
      "Available in golden, cream & patterned varieties",
      "Nocturnal – most active at night",
      "Great first pet for children",
    ],
    conditions: [
      "Cage: Minimum 80cm x 50cm floor space",
      "Provide an exercise wheel (20cm+ diameter)",
      "Bedding: Paper-based or aspen shavings (no cedar/pine)",
      "Diet: Hamster mix, fresh vegetables, occasional treats",
      "Must be housed alone – they fight if kept together",
      "Handle gently – avoid waking during the day",
    ],
  },
  {
    id: "german-shepherd-puppy",
    name: "German Shepherd Puppy",
    description: "Highly intelligent, active, and noble purebred puppy.",
    category: "puppies",
    image: "/images/german_shepherd.png",
    action: "enquire",
    price: 18000,
    brand: "Pure Breed",
    age: "Baby",
    createdAt: "2026-05-26T12:00:00Z",
    galleryImages: ["/images/german_shepherd.png"],
    about: "The German Shepherd is one of the most recognizable and capable dog breeds in the world. Famous for their intelligence, courage, and strong protective instincts, GSDs are excellent companions, guardians, and family protectors. These purebred puppies are well-socialized, active, and show strong confidence. They require consistent training and plenty of physical and mental stimulation.",
    keyFeatures: [
      "Lifespan: 10–13 years",
      "Highly trainable and intelligent",
      "Strong protective instincts",
      "Loyal and devoted family member",
      "Excellent watchdog capabilities",
      "Thrives with active owners",
    ],
    conditions: [
      "Requires early socialization and consistent obedience training",
      "Needs daily vigorous exercise (1 hour+)",
      "Brushing needed 2-3 times a week (heavy shedders)",
      "Provide high-quality large breed puppy food",
      "Ensure plenty of space or outdoor yard area",
      "Plan vet visits for vaccines and hip checks",
    ],
  },
  {
    id: "labrador-puppy",
    name: "Labrador Retriever Puppy",
    description: "Extremely friendly, playful, and energetic golden puppy.",
    category: "puppies",
    image: "/images/labrador.png",
    action: "enquire",
    price: 16000,
    brand: "Pure Breed",
    age: "Baby",
    createdAt: "2026-05-27T08:00:00Z",
    galleryImages: ["/images/labrador.png"],
    about: "Labrador Retrievers are renowned for being the ultimate family pet. Gentle, outgoing, and eager to please, they get along marvelously with kids and other pets. Our golden Labrador puppy is healthy, vaccinated, and exceptionally playful. Labs love water, fetch, and companionship, making them a joyful addition to any household.",
    keyFeatures: [
      "Lifespan: 10–12 years",
      "Incredibly friendly & loving temperament",
      "Great with children and other animals",
      "Highly adaptable & easy to train",
      "Loves swimming and retrieving games",
      "Very social and outgoing",
    ],
    conditions: [
      "Needs daily exercise (45-60 minutes walks/playtime)",
      "Prone to weight gain – monitor food portions closely",
      "Grooming is easy, but regular brushing is recommended",
      "Needs chew toys to manage active chewing habits",
      "Ensure fresh water is always available",
      "Ensure regular vet checks for healthy growth",
    ],
  },
  {
    id: "drools-puppy-food",
    name: "Drools Focus Puppy Food",
    description: "Super premium dog food formulated for optimal puppy growth.",
    category: "food",
    image: "/images/dog_food.png",
    imageFit: "contain",
    action: "details",
    price: 1600,
    brand: "Drools",
    age: "Puppy",
    dietaryRequirements: "High Protein & DHA",
    createdAt: "2026-05-27T09:00:00Z",
    galleryImages: ["/images/dog_food.png"],
    about: "Drools Focus Puppy Super Premium Dry Dog Food is specially formulated with no wheat, corn, or soy. Rich in high-quality chicken protein, it supports bone development, muscle growth, and a robust immune system. It also features DHA to promote cognitive and brain development during active puppyhood.",
    keyFeatures: [
      "Chicken as the primary ingredient",
      "No corn, wheat, or soy fillers",
      "Enriched with DHA for brain development",
      "Fortified with prebiotics for gut health",
      "Supports strong bones and active joints",
      "Premium nutrition at a friendly price",
    ],
    conditions: [
      "Ideal for puppies under 12 months",
      "Store in a cool, dry, and sealed container",
      "Always provide clean drinking water",
      "Divide feeding into 3-4 portions daily for small pups",
      "Follow exact weight feeding guide on pack",
      "Transition over 7 days to avoid stomach upset",
    ],
  },
  {
    id: "ninja-all-stages-food",
    name: "Ninja Pro-Active Dog Food",
    description: "Ultra premium grain-free dog food for active dogs.",
    category: "food",
    image: "/images/dog_foods_brands.png",
    imageFit: "contain",
    action: "details",
    price: 2200,
    brand: "Ninja",
    age: "All Ages",
    dietaryRequirements: "Grain-Free & Active Muscle",
    createdAt: "2026-05-27T10:00:00Z",
    galleryImages: ["/images/dog_foods_brands.png"],
    about: "Ninja Pro-Active All Life Stages Dog Food is an ultra-premium grain-free formula designed to fuel highly energetic dogs. Made with real wild-caught salmon and farm-raised duck, it provides elite proteins and essential amino acids. High in antioxidants and omega fatty acids, it keeps your dog's skin radiant and muscles strong.",
    keyFeatures: [
      "Ultra-premium grain-free formula",
      "Packed with active proteins (Salmon & Duck)",
      "High level of omega fatty acids for skin care",
      "Rich in natural antioxidants for defense",
      "Ideal for high energy, working, or athletic dogs",
      "Manufactured with advanced food safety standards",
    ],
    conditions: [
      "Suitable for all life stages (Puppy to Senior)",
      "Reseal the bag securely to maintain crunch and taste",
      "Store in a clean and dry shelf",
      "Keep plenty of fresh water nearby",
      "Consult active feeding charts for accurate dosing",
      "Best served at room temperature",
    ],
  },
  {
    id: "pet-multivitamin-syrup",
    name: "Premium Pet Multivitamin Syrup",
    description: "Essential vitamins and minerals formula for dogs and cats.",
    category: "supplements",
    image: "/images/multivitamin.png",
    imageFit: "contain",
    action: "details",
    price: 450,
    brand: "NutriPet",
    age: "All Ages",
    dietaryRequirements: "Daily Supplement",
    createdAt: "2026-05-27T11:00:00Z",
    galleryImages: ["/images/multivitamin.png"],
    about: "NutriPet Premium Multivitamin is a comprehensive daily supplement designed to fill nutritional gaps in your pet's diet. It supports optical health, shiny coats, robust energy levels, and strong immune defense. Formulated as a delicious syrup, pets absolute love the taste, making administration hassle-free.",
    keyFeatures: [
      "18 essential vitamins, minerals, and amino acids",
      "Boosts daily energy levels and stamina",
      "Supports optical, cardiac, and liver functions",
      "Liquid formula for fast, easy absorption",
      "Highly palatable flavor that pets enjoy",
      "Recommended by veterinarians nationwide",
    ],
    conditions: [
      "Suitable for dogs, cats, and puppies over 8 weeks",
      "Give directly or mix thoroughly with food",
      "Dosing: 5ml per 10kg body weight daily",
      "Shake well before each use",
      "Store in a cool place away from direct sunlight",
      "Do not exceed recommended daily allowance",
    ],
  },
  {
    id: "calcium-bone-joint",
    name: "Calcium & Joint Boost Tablets",
    description: "High potency calcium tablets with Glucosamine & Chondroitin.",
    category: "supplements",
    image: "/images/calcium.png",
    imageFit: "contain",
    action: "details",
    price: 650,
    brand: "Himalaya Pet",
    age: "Adult & Senior",
    dietaryRequirements: "Bone & Joint Support",
    createdAt: "2026-05-27T12:00:00Z",
    galleryImages: ["/images/calcium.png"],
    about: "Himalaya Calcium Joint Boost is designed to protect bone integrity and joint flexibility. With the goodness of natural calcium sources and added glucosamine, it helps rebuild cartilage, reduce joint soreness, and enhance mobility in active, aging, or heavy-breed dogs.",
    keyFeatures: [
      "Highly bioavailable calcium and phosphorus",
      "Enriched with Glucosamine & Chondroitin",
      "Prevents joint stiffness and cartilage wear",
      "Highly recommended for large breeds & seniors",
      "Natural ingredients, free of synthetic toxins",
      "Convenient tablet form, easily crushed",
    ],
    conditions: [
      "Excellent for adult dogs, seniors, and large breeds",
      "Tablet can be fed directly or crushed into food",
      "Dose: 1 tablet per 10kg body weight daily",
      "Ensure pet has access to fresh water",
      "Store in a dry, airtight bottle",
      "Keep out of reach of children",
    ],
  },
];

export const navItems = ["Home", "Pets", "Products", "Services", "Gallery", "Contact"];

export const footerColumns = [
  {
    title: "Quick Links",
    links: ["Home", "Pets", "Products", "Services", "Gallery", "Contact"],
  },
  {
    title: "Our Pets",
    links: ["Birds", "Puppies", "Aquarium", "Small Pets", "Reptiles"],
  },
  {
    title: "Products",
    links: ["Pet Food", "Accessories", "Toys & Games", "Grooming", "Tanks & Aquariums"],
  },
  {
    title: "Services",
    links: ["Pet Consultation", "Grooming", "Pet Care Advice", "Tank Maintenance"],
  },
];

export function productWhatsappHref(productName: string) {
  const text = encodeURIComponent(
    `Hi Exotic Pets World Pollachi, I would like to buy ${productName}.`,
  );

  return `https://wa.me/919942919000?text=${text}`;
}
