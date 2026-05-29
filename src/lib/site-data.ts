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
    "/images/products/foods/dogs/pedigree-adult-chicken.png",
    "/images/products/dogs/golden-retriever/image-1.png",
    "/images/products/medicines/supplements/multivitamin-tablets.png",
    "/images/products/foods/dogs/drools-adult-dog.png",
  ],
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
  // --- PETS SECTION ---
  {
    id: "pomeranian-puppy",
    name: "Pomeranian Puppy",
    description: "Extremely cute, fluffy & purebred Pomeranian puppy.",
    category: "puppies",
    image: "/images/products/dogs/pomeranian-puppy/image-1.png",
    action: "enquire",
    price: 14000,
    age: "Baby",
    createdAt: "2026-05-28T09:00:00Z",
    galleryImages: [
      "/images/products/dogs/pomeranian-puppy/image-1.png",
      "/images/products/dogs/pomeranian-puppy/image-2.png",
      "/images/products/dogs/pomeranian-puppy/image-3.png",
      "/images/products/dogs/pomeranian-puppy/image-4.png",
    ],
    about: "Our white Pomeranian puppies are highly active, playful, and fully healthy. Known for their thick, luxurious double coats and friendly expressions, Pomeranians make excellent family companions and are highly adaptable to apartment living. Fully vet-checked and ready for a loving home.",
    keyFeatures: [
      "Extremely cute and fluffy white double coat",
      "Very friendly, playful, and intelligent",
      "Compact size, perfect for apartment living",
      "Active and smart companion dog",
      "Vet-checked with complete health record"
    ],
    conditions: [
      "Requires daily coat brushing to prevent tangles",
      "Provide high-quality puppy food portioned correctly",
      "Needs moderate daily indoor exercise and games",
      "Booster vaccines must be administered on schedule",
      "Keep in a cool, clean indoor environment"
    ]
  },
  {
    id: "golden-retriever-puppy",
    name: "Golden Retriever Puppy",
    description: "Healthy, active & fully vaccinated golden retriever puppies.",
    category: "puppies",
    image: "/images/products/dogs/golden-retriever/image-1.png",
    action: "enquire",
    price: 15000,
    age: "Baby",
    createdAt: "2026-05-25T10:00:00Z",
    galleryImages: [
      "/images/products/dogs/golden-retriever/image-1.png",
      "/images/products/dogs/golden-retriever/image-2.png",
      "/images/products/dogs/golden-retriever/image-3.png",
      "/images/products/dogs/golden-retriever/image-4.png",
    ],
    about: "The Golden Retriever is renowned worldwide for its exceptionally gentle temperament, high intelligence, and loyalty. These gorgeous puppies come fully vaccinated with certified health checks. Excellent with children and families.",
    keyFeatures: [
      "Lifespan: 10–12 years",
      "Highly trainable, loyal, and friendly",
      "Fully vaccinated with official health certificate",
      "Wonderful temperament, ideal for families with children",
      "Beautiful golden-colored coat"
    ],
    conditions: [
      "Requires daily active exercise (30-60 minutes walks)",
      "Regular coat grooming and brushing is necessary",
      "Feed premium puppy formulas to support joint health",
      "Keep booster shots up-to-date",
      "Needs spacious area or outdoor yard to play"
    ]
  },
  {
    id: "german-shepherd-puppy",
    name: "German Shepherd Puppy",
    description: "Highly intelligent, active, and noble purebred puppy.",
    category: "puppies",
    image: "/images/products/dogs/german-shepherd/image-1.png",
    action: "enquire",
    price: 18000,
    brand: "Pure Breed",
    age: "Baby",
    createdAt: "2026-05-26T12:00:00Z",
    galleryImages: [
      "/images/products/dogs/german-shepherd/image-1.png",
      "/images/products/dogs/german-shepherd/image-2.png",
      "/images/products/dogs/german-shepherd/image-3.png",
      "/images/products/dogs/german-shepherd/image-4.png",
    ],
    about: "German Shepherd puppies show excellent confidence, high intelligence, and quick learning capabilities. Ideal as family guardians, companion dogs, or active service pets. Extremely loyal, protective, and energetic.",
    keyFeatures: [
      "Strong protective instincts and noble appearance",
      "Highly trainable and exceptionally intelligent",
      "Extremely loyal and devoted family guardian",
      "Vaccinated and dewormed properly",
      "Thrives with active owners who provide training"
    ],
    conditions: [
      "Requires early socialization and consistent training",
      "Needs daily high-intensity exercise and play",
      "Heavy shedders; regular brushing needed 3 times a week",
      "Provide diet suited for large breed active puppies",
      "Ensure plenty of running space"
    ]
  },
  {
    id: "labrador-puppy",
    name: "Labrador Retriever Puppy",
    description: "Extremely friendly, playful, and energetic golden puppy.",
    category: "puppies",
    image: "/images/products/dogs/labrador/image-1.png",
    action: "enquire",
    price: 16000,
    brand: "Pure Breed",
    age: "Baby",
    createdAt: "2026-05-27T08:00:00Z",
    galleryImages: [
      "/images/products/dogs/labrador/image-1.png",
      "/images/products/dogs/labrador/image-2.png",
      "/images/products/dogs/labrador/image-3.png",
      "/images/products/dogs/labrador/image-4.png",
    ],
    about: "Labrador Retrievers are outgoing, eager to please, and highly social family dogs. Our yellow Labrador puppy is healthy, vaccinated, and loves water and fetching games. A perfect and gentle companion for homes.",
    keyFeatures: [
      "Exceptionally friendly, sweet-natured, and loving",
      "Excellent companion for children and other pets",
      "Very active, loves retrieval and swimming",
      "Easy-to-groom short coat",
      "Highly adaptable to various lifestyles"
    ],
    conditions: [
      "Needs daily walks and play (45-60 mins)",
      "Prone to weight gain; monitor daily food intake closely",
      "Provide chew toys to keep them occupied",
      "Schedule regular deworming and booster shots",
      "Keep fresh drinking water always available"
    ]
  },
  {
    id: "dachshund-puppy",
    name: "Dachshund Puppy",
    description: "Playful, smart & adorable sausage dog.",
    category: "puppies",
    image: "/images/products/dogs/labrador/image-3.png",
    action: "enquire",
    price: 12000,
    age: "Baby",
    createdAt: "2026-05-24T10:00:00Z",
    galleryImages: [
      "/images/products/dogs/labrador/image-3.png",
    ],
    about: "The Dachshund is a bold, curious breed with an iconic elongated body and short, strong legs. Compact and alert, they make excellent watchdogs and lively family companions.",
    keyFeatures: [
      "Compact size, ideal for apartments",
      "Bold, curious, and energetic personality",
      "Loyal companion with a great alert system",
      "Low maintenance smooth coat"
    ],
    conditions: [
      "Avoid high jumping to protect their long back and spine",
      "Keep diet portion-controlled to avoid obesity",
      "Provide short daily walks (20-30 mins)"
    ]
  },
  {
    id: "blue-gold-macaw",
    name: "Blue & Gold Macaw",
    description: "Beautiful, intelligent & playful macaw parrots.",
    category: "birds",
    image: "/images/products/birds/blue-gold-macaw/image-1.png",
    action: "enquire",
    price: 45000,
    age: "Adult",
    createdAt: "2026-05-20T10:00:00Z",
    galleryImages: [
      "/images/products/birds/blue-gold-macaw/image-1.png",
      "/images/products/birds/blue-gold-macaw/image-2.png",
    ],
    about: "The Blue & Gold Macaw is a striking parrot native to South America. Extremely social, highly intelligent, and capable of mimicry and speech, they form deep and affectionate bonds with their owners. They can live up to 60 years under proper care.",
    keyFeatures: [
      "Gorgeous vibrant blue and yellow plumage",
      "Highly intelligent, easily trainable, can learn mimicry",
      "Long lifespan of up to 50-60 years",
      "Extremely social and affectionate personality"
    ],
    conditions: [
      "Requires a very spacious, heavy-duty cage",
      "Needs daily socialization and toys for stimulation",
      "Diet should include high-quality seeds, nuts, and fresh fruits"
    ]
  },
  {
    id: "love-birds",
    name: "Love Birds",
    description: "Friendly & colorful companions for your home.",
    category: "birds",
    image: "/images/products/birds/love-birds/image-1.png",
    action: "enquire",
    price: 2500,
    age: "Baby",
    createdAt: "2026-05-22T10:00:00Z",
    galleryImages: [
      "/images/products/birds/love-birds/image-1.png",
      "/images/products/birds/love-birds/image-2.png",
    ],
    about: "Love birds are sweet, active, and highly colorful small parrots that thrive best in pairs. They are perfect for beginner bird owners and add lovely chirping and visual beauty to any home setup.",
    keyFeatures: [
      "Highly active, sweet, and playful companions",
      "Vibrant green, peach, and orange variations",
      "Beginner-friendly and low maintenance",
      "Best housed as an affectionate pair"
    ],
    conditions: [
      "Keep cage clean in a well-ventilated draft-free area",
      "Diet: millet, bird seeds, fresh greens, and fresh water",
      "Provide mirrors and climbing perches"
    ]
  },
  {
    id: "angelfish",
    name: "Angelfish",
    description: "Elegant freshwater fish for a peaceful aquarium.",
    category: "aquarium",
    image: "/images/products/aquarium/angelfish/image-1.png",
    action: "enquire",
    price: 200,
    age: "Adult",
    createdAt: "2026-05-21T10:00:00Z",
    galleryImages: [
      "/images/products/aquarium/angelfish/image-1.png",
    ],
    about: "Angelfish are graceful tropical freshwater fish native to the Amazon Basin. Their unique triangular bodies and long, flowing fins create a majestic look in any community tank setup.",
    keyFeatures: [
      "Elegant swimming behavior and iconic shape",
      "Graceful flowing long dorsal and pectoral fins",
      "Relatively hardy and easy to feed",
      "Centerpiece species for community tanks"
    ],
    conditions: [
      "Requires minimum tank capacity of 75 litres",
      "Water temperature should range between 24–28°C",
      "Feed high quality flakes, pellets, and freeze-dried bloodworms"
    ]
  },
  {
    id: "neon-tetra",
    name: "Neon Tetra",
    description: "Colorful schooling fish, perfect for community tanks.",
    category: "aquarium",
    image: "/images/products/aquarium/neon-tetra/image-1.png",
    action: "enquire",
    price: 50,
    age: "Baby",
    createdAt: "2026-05-18T10:00:00Z",
    galleryImages: [
      "/images/products/aquarium/neon-tetra/image-1.png",
    ],
    about: "Neon Tetras are iridescent, colorful schooling fish that do beautifully in groups of 6 or more. Their glowing blue and red stripes bring striking life to planted tank layouts.",
    keyFeatures: [
      "Vibrant glowing iridescent red & blue stripes",
      "Peaceful schooling community fish",
      "Low maintenance, beginner-friendly",
      "Thrives in planted community aquariums"
    ],
    conditions: [
      "Keep in groups of 6 or more to reduce stress",
      "Sensitive to high ammonia; keep tank cycled",
      "Maintain slightly acidic water (pH 6.0–7.0)"
    ]
  },
  {
    id: "syrian-hamster",
    name: "Syrian Hamster",
    description: "Cute, friendly & easy to care for small pets.",
    category: "small-pets",
    image: "/images/products/dogs/pomeranian-puppy/image-3.png",
    imageTone: "bg-orange-50/60",
    action: "details",
    price: 450,
    age: "Baby",
    createdAt: "2026-05-26T10:00:00Z",
    galleryImages: [
      "/images/products/dogs/pomeranian-puppy/image-3.png",
    ],
    about: "Syrian Hamsters are adorable, solitary small pets that are highly entertaining to watch. Excellent first pets for families, they are active nocturnal creatures that love running on wheels.",
    keyFeatures: [
      "Lively, curious, and extremely cute appearance",
      "Easy to handle and tame with gentle care",
      "Solitary animals, very easy to house",
      "Low-maintenance budget-friendly pet"
    ],
    conditions: [
      "Must be housed alone in a spacious cage",
      "Provide a silent running wheel (20cm+ diameter)",
      "Diet: Hamster seed mix and fresh water daily"
    ]
  },

  // --- PET FOODS SECTION ---
  // Dog Foods
  {
    id: "drools-puppy-starter",
    name: "Drools Focus Puppy Starter",
    description: "Super premium dry starter food formulated for weaning puppies.",
    category: "food",
    image: "/images/products/foods/dogs/drools-puppy-starter.png",
    
    imageTone: "bg-orange-50/60",
    action: "details",
    price: 1600,
    brand: "Drools",
    age: "Puppy",
    dietaryRequirements: "High Protein & DHA",
    createdAt: "2026-05-27T09:00:00Z",
    galleryImages: ["/images/products/foods/dogs/drools-puppy-starter.png"],
    about: "Drools Focus Puppy Starter is a super premium, grain-free dry food that helps puppies transition smoothly from mother's milk to solid food. Fortified with essential vitamins, prebiotic fibers, and organic minerals for strong immunity.",
    keyFeatures: [
      "Chicken as #1 ingredient, high protein",
      "Zero wheat, corn, or soy content",
      "DHA added for cognitive development",
      "Supportive of digestive gut health",
      "Supports strong skeletal growth"
    ],
    conditions: [
      "Store in a cool, dry place inside an airtight container",
      "Transition from puppy milk gradually over 7-10 days",
      "Always supply clean drinking water next to food bowl"
    ]
  },
  {
    id: "drools-adult-dog",
    name: "Drools Focus Adult Dog Food",
    description: "Super premium formula for optimal muscle and health maintenance in adult dogs.",
    category: "food",
    image: "/images/products/foods/dogs/drools-adult-dog.png",
    
    imageTone: "bg-orange-50/60",
    action: "details",
    price: 1850,
    brand: "Drools",
    age: "Adult",
    dietaryRequirements: "Active Muscle Support",
    createdAt: "2026-05-27T10:00:00Z",
    galleryImages: ["/images/products/foods/dogs/drools-adult-dog.png"],
    about: "Specifically crafted with chicken and absolute zero fillers, this dry food supports the nutritional needs of fully grown, active dogs. Enhances metabolic rate, protects bone joints, and maintains ideal body weight.",
    keyFeatures: [
      "Real chicken protein for lean muscles",
      "Glucosamine and Chondroitin for active joints",
      "Omega 3 & 6 fatty acids for a glowing coat",
      "No artificial colors or chemical preservatives"
    ],
    conditions: [
      "Follow feeding guide according to dog's weight",
      "Reseal tightly after opening to protect crunchiness"
    ]
  },
  {
    id: "pedigree-puppy-chicken",
    name: "Pedigree Puppy Chicken & Milk",
    description: "Tasty, complete dry food recipe packed with chicken and milk for puppies.",
    category: "food",
    image: "/images/products/foods/dogs/pedigree-puppy-chicken.png",
    
    imageTone: "bg-orange-50/60",
    action: "details",
    price: 950,
    brand: "Pedigree",
    age: "Puppy",
    dietaryRequirements: "Growth & Immunity",
    createdAt: "2026-05-27T11:00:00Z",
    galleryImages: ["/images/products/foods/dogs/pedigree-puppy-chicken.png"],
    about: "Pedigree Puppy Chicken & Milk offers 24 essential vitamins and minerals for growing puppies. Features easily digestible pieces packed with calcium and protein to support healthy physical milestones.",
    keyFeatures: [
      "Calcium & phosphorus for strong bone structure",
      "Immune system support via active antioxidants",
      "Supports skin health and a glossy coat"
    ],
    conditions: [
      "Serve at room temperature",
      "Ensure clean drinking water is always available"
    ]
  },
  {
    id: "pedigree-adult-chicken",
    name: "Pedigree Adult Chicken & Vegetables",
    description: "Complete and balanced dry food containing chicken and wholesome vegetables.",
    category: "food",
    image: "/images/products/foods/dogs/pedigree-adult-chicken.png",
    
    imageTone: "bg-orange-50/60",
    action: "details",
    price: 1200,
    brand: "Pedigree",
    age: "Adult",
    dietaryRequirements: "Daily Nutrition",
    createdAt: "2026-05-15T10:00:00Z",
    galleryImages: ["/images/products/foods/dogs/pedigree-adult-chicken.png"],
    about: "Pedigree Adult provides a nutritious meal with high-quality protein, dietary fibers for digestion, and essential fatty acids. Highly palatable, balanced recipe perfect for daily feeding.",
    keyFeatures: [
      "Balanced mineral ratios for strong teeth",
      "Dietary fiber to promote healthy gut",
      "Zinc and omega fatty acids for skin care"
    ],
    conditions: [
      "Transition from old food gradually over a week",
      "Keep bag in a dry, insect-free location"
    ]
  },
  {
    id: "royal-canin-maxi-puppy",
    name: "Royal Canin Maxi Puppy",
    description: "Premium tailor-made nutrition for large breed puppies (weight 26 to 44kg).",
    category: "food",
    image: "/images/products/foods/dogs/royal-canin-maxi-puppy.png",
    
    imageTone: "bg-orange-50/60",
    action: "details",
    price: 3200,
    brand: "Royal Canin",
    age: "Puppy",
    dietaryRequirements: "Digestive Security",
    createdAt: "2026-05-27T12:00:00Z",
    galleryImages: ["/images/products/foods/dogs/royal-canin-maxi-puppy.png"],
    about: "Designed specifically to support the long growth period of large breed puppies. Formulated with elite proteins and prebiotics to ensure digestive safety and help build strong bones and joints.",
    keyFeatures: [
      "Supports natural immune system defenses",
      "Optimal energy level for large breed growth",
      "Highly digestible protein (L.I.P) for gut safety"
    ],
    conditions: [
      "Follow exact large breed puppy feeding tables",
      "Seal bag properly to preserve taste"
    ]
  },
  {
    id: "royal-canin-adult-medium",
    name: "Royal Canin Adult Medium Breed",
    description: "Tailored daily nutrition for medium breed adult dogs (weight 11 to 25kg).",
    category: "food",
    image: "/images/products/foods/dogs/royal-canin-adult-medium.png",
    
    imageTone: "bg-orange-50/60",
    action: "details",
    price: 3400,
    brand: "Royal Canin",
    age: "Adult",
    dietaryRequirements: "Coat & Skin Protection",
    createdAt: "2026-05-27T13:00:00Z",
    galleryImages: ["/images/products/foods/dogs/royal-canin-adult-medium.png"],
    about: "Helps promote natural defenses of medium breed dogs. Enriched with Omega 3 fatty acids (EPA-DHA) to maintain healthy skin barrier and high coat luster.",
    keyFeatures: [
      "Helps maintain natural strong defenses",
      "High digestibility with specialized fiber blend",
      "Enriched with EPA and DHA skin protectors"
    ],
    conditions: [
      "Keep fresh drinking water accessible",
      "Adjust daily dosage based on activity level"
    ]
  },
  {
    id: "nd-puppy-formula",
    name: "N&D Puppy Pumpkin Formula",
    description: "Super premium grain-free, pumpkin, chicken, and pomegranate recipe for puppies.",
    category: "food",
    image: "/images/products/foods/dogs/nd-puppy-formula.png",
    
    imageTone: "bg-orange-50/60",
    action: "details",
    price: 2400,
    brand: "N&D",
    age: "Puppy",
    dietaryRequirements: "96% Animal Protein, Grain-Free",
    createdAt: "2026-05-27T14:00:00Z",
    galleryImages: ["/images/products/foods/dogs/nd-puppy-formula.png"],
    about: "Natural & Delicious Ancestral Grain formula is a low glycemic index, ultra premium pet food. Formulated with pumpkin, a soluble fiber source that supports gut health, and organic pomegranate extract.",
    keyFeatures: [
      "96% high-quality protein from animal sources",
      "100% grain-free with low glycemic index",
      "Rich in natural antioxidants and pumpkin fibers",
      "Promotes excellent immune system health"
    ],
    conditions: [
      "Ideal for puppies and pregnant/lactating dogs",
      "Store in a dark, dry pantry shelf"
    ]
  },
  {
    id: "nd-adult-formula",
    name: "N&D Adult Ocean Formula",
    description: "Super premium grain-free cod, pumpkin, and cantaloupe recipe for active adult dogs.",
    category: "food",
    image: "/images/products/foods/dogs/nd-adult-formula.png",
    
    imageTone: "bg-orange-50/60",
    action: "details",
    price: 2600,
    brand: "N&D",
    age: "Adult",
    dietaryRequirements: "Grain-Free Ocean Fish",
    createdAt: "2026-05-27T15:00:00Z",
    galleryImages: ["/images/products/foods/dogs/nd-adult-formula.png"],
    about: "Crafted with wild caught cod fish and fresh pumpkin fibers. Excellent for dogs with food sensitivities or allergies to poultry. Rich in highly bioavailable Omega 3.",
    keyFeatures: [
      "Ocean cod as single protein source",
      "Grain-free, gluten-free, low-carb formula",
      "Pumpkin added for gentle digestive health",
      "Rich in natural vitamins and cantaloupe melon"
    ],
    conditions: [
      "Transition over 7-10 days to avoid dietary stress",
      "Always serve in a clean feeding bowl"
    ]
  },

  // Cat Foods
  {
    id: "whiskas-tuna",
    name: "Whiskas Tuna Adult Cat Food",
    description: "Delicious dry cat food kibbles with tuna flavor for adult cats.",
    category: "food",
    image: "/images/products/foods/cats/whiskas-tuna.png",
    
    imageTone: "bg-blue-50/60",
    action: "details",
    price: 680,
    brand: "Whiskas",
    age: "Adult",
    dietaryRequirements: "Urinary Tract Health",
    createdAt: "2026-05-27T16:00:00Z",
    galleryImages: ["/images/products/foods/cats/whiskas-tuna.png"],
    about: "Specially formulated with high quality real tuna to give cats a highly nutritious and tasty meal. Made with active crunchy kibbles that help clean teeth as they chew.",
    keyFeatures: [
      "Tuna-flavored dry food with real protein",
      "Supports strong eyesight via active taurine",
      "Balanced mineral levels for healthy urinary tract",
      "Packed with zinc and omega fatty acids"
    ],
    conditions: [
      "Transition slowly by mixing with previous food",
      "Ensure fresh drinking water is always nearby"
    ]
  },
  {
    id: "whiskas-ocean-fish",
    name: "Whiskas Ocean Fish Adult Cat Food",
    description: "Complete and balanced dry food with delicious ocean fish recipe.",
    category: "food",
    image: "/images/products/foods/cats/whiskas-ocean-fish.png",
    
    imageTone: "bg-blue-50/60",
    action: "details",
    price: 700,
    brand: "Whiskas",
    age: "Adult",
    dietaryRequirements: "Shiny Skin & Coat",
    createdAt: "2026-05-27T17:00:00Z",
    galleryImages: ["/images/products/foods/cats/whiskas-ocean-fish.png"],
    about: "Whiskas Ocean Fish dry food is prepared with fresh fish ingredients, delivering vitamins, mineral salts, and high protein to keep your feline active and glowing.",
    keyFeatures: [
      "Real ocean fish flavor that felines love",
      "Enriched with Vitamin A and Taurine",
      "Complete nutritional formula for adult cats"
    ],
    conditions: [
      "Keep bag sealed to maintain quality and crunchiness"
    ]
  },
  {
    id: "whiskas-chicken",
    name: "Whiskas Chicken Adult Cat Food",
    description: "Savory chicken kibble formula with delicious pocket textures.",
    category: "food",
    image: "/images/products/foods/cats/whiskas-chicken.png",
    
    imageTone: "bg-blue-50/60",
    action: "details",
    price: 660,
    brand: "Whiskas",
    age: "Adult",
    dietaryRequirements: "Digestive Balance",
    createdAt: "2026-05-27T18:00:00Z",
    galleryImages: ["/images/products/foods/cats/whiskas-chicken.png"],
    about: "Provides balanced, premium nutrition including animal protein from chicken. Pockets are filled with flavorful chicken cream to tempt even picky cats.",
    keyFeatures: [
      "Tasty pockets filled with real chicken cream",
      "Balanced minerals for bladder protection",
      "Gluten-free protein mix"
    ],
    conditions: [
      "Divide daily food into 2 distinct meals"
    ]
  },
  {
    id: "me-o-tuna",
    name: "Me-O Tuna Adult Cat Food",
    description: "High nutrition tuna flavor dry cat food.",
    category: "food",
    image: "/images/products/foods/cats/me-o-tuna.png",
    
    imageTone: "bg-blue-50/60",
    action: "details",
    price: 520,
    brand: "Me-O",
    age: "Adult",
    dietaryRequirements: "Eye Care & Vision",
    createdAt: "2026-05-27T19:00:00Z",
    galleryImages: ["/images/products/foods/cats/me-o-tuna.png"],
    about: "Me-O Tuna dry cat food is highly digestible and packed with taurine to maintain excellent eyesight, Vitamin C to boost immunity, and low sodium to manage blood pressure.",
    keyFeatures: [
      "Taurine added for optical development",
      "Vitamin C to support defense system",
      "Calcium, phosphorus, and vitamin D for strong bones"
    ],
    conditions: [
      "Always provide a bowl of clean, fresh water"
    ]
  },
  {
    id: "me-o-mackerel",
    name: "Me-O Mackerel Adult Cat Food",
    description: "Highly palatable mackerel dry cat food with low sodium.",
    category: "food",
    image: "/images/products/foods/cats/me-o-mackerel.png",
    
    imageTone: "bg-blue-50/60",
    action: "details",
    price: 540,
    brand: "Me-O",
    age: "Adult",
    dietaryRequirements: "Low Sodium & Heart Protection",
    createdAt: "2026-05-27T20:00:00Z",
    galleryImages: ["/images/products/foods/cats/me-o-mackerel.png"],
    about: "Features savory mackerel flavor that cats naturally crave. Highly bioavailable proteins support cardiac health, muscle tone, and a robust physical constitution.",
    keyFeatures: [
      "Delicious mackerel flavor, highly palatable",
      "Low sodium formula for cardiac health",
      "Prevents risks of FLUTD (feline lower urinary tract disease)"
    ],
    conditions: [
      "Keep stored in airtight containers away from moisture"
    ]
  },
  {
    id: "me-o-seafood",
    name: "Me-O Seafood Adult Cat Food",
    description: "Mixed ocean seafood dry kibbles for active felines.",
    category: "food",
    image: "/images/products/foods/cats/me-o-seafood.png",
    
    imageTone: "bg-blue-50/60",
    action: "details",
    price: 580,
    brand: "Me-O",
    age: "Adult",
    dietaryRequirements: "Immune Boost",
    createdAt: "2026-05-27T21:00:00Z",
    galleryImages: ["/images/products/foods/cats/me-o-seafood.png"],
    about: "Packed with organic shrimp, fish, and squid flavor notes. Provides a rich source of calcium, zinc, and natural proteins to keep adult cats energetic.",
    keyFeatures: [
      "Vibrant mixed seafood recipe",
      "Strengthens immune system defense",
      "High palatability for adult cats"
    ],
    conditions: [
      "Adjust daily dosage based on cat's weight"
    ]
  },
  {
    id: "me-o-persian-formula",
    name: "Me-O Persian Adult Cat Food",
    description: "Specialized formula with anti-hairball fibers for Persian cats.",
    category: "food",
    image: "/images/products/foods/cats/me-o-persian-formula.png",
    
    imageTone: "bg-blue-50/60",
    action: "details",
    price: 780,
    brand: "Me-O",
    age: "Adult",
    dietaryRequirements: "Hairball Control, Persian Breed Specific",
    createdAt: "2026-05-27T22:00:00Z",
    galleryImages: ["/images/products/foods/cats/me-o-persian-formula.png"],
    about: "Persian cats have long coats prone to hairball formation. This formula contains specialized natural fibers to safely pass ingested hair and nourish their long coat.",
    keyFeatures: [
      "Special fiber mix to prevent hairballs",
      "Enriched with Omega 3 and 6 for long coats",
      "Keeps digestive tract healthy and flowing"
    ],
    conditions: [
      "Highly recommended for long-haired cats over 1 year",
      "Store in a clean and dry place"
    ]
  },

  // --- HEALTHCARE & SUPPLEMENTS ---
  // Himalaya Products
  {
    id: "himalaya-erina-puppy-shampoo",
    name: "Himalaya Erina Puppy Shampoo",
    description: "Gentle daily puppy shampoo containing natural neem and eucalyptus oils.",
    category: "supplements",
    image: "/images/products/medicines/himalaya-erina-puppy-shampoo.png",
    
    action: "details",
    price: 250,
    brand: "Himalaya Pet",
    age: "Puppy",
    dietaryRequirements: "Coat Care & Hygiene",
    createdAt: "2026-05-27T23:00:00Z",
    galleryImages: ["/images/products/medicines/himalaya-erina-puppy-shampoo.png"],
    about: "Himalaya Erina Puppy Shampoo is a soap-free, mild skin cleanser containing natural herbs like neem and eucalyptus. Cleanses gently without drying out a puppy's sensitive skin.",
    keyFeatures: [
      "Soap-free, non-irritant daily formula",
      "Contains organic neem & eucalyptus extracts",
      "Fights odor and skin dryness effectively"
    ],
    conditions: [
      "Apply to wet coat, massage for 5 mins, and rinse thoroughly",
      "Avoid contact with puppy's eyes and ears"
    ]
  },
  {
    id: "himalaya-erina-coat-cleanser",
    name: "Himalaya Erina Coat Cleanser",
    description: "Soothes dry skin, controls dandruff, and leaves coat glossy.",
    category: "supplements",
    image: "/images/products/medicines/himalaya-erina-coat-cleanser.png",
    
    action: "details",
    price: 280,
    brand: "Himalaya Pet",
    age: "All Ages",
    dietaryRequirements: "Anti-Dandruff & Cleansing",
    createdAt: "2026-05-27T23:30:00Z",
    galleryImages: ["/images/products/medicines/himalaya-erina-coat-cleanser.png"],
    about: "Cleanses, nourishes, and protects the skin barrier. Fights seasonal dandruff and controls excessive shedding by strengthening coat roots.",
    keyFeatures: [
      "Prevents skin scaling and dandruff",
      "Strengthens hair roots to stop shedding",
      "Promotes a soft and shiny coat"
    ],
    conditions: [
      "Use once every 10 days for optimal coat quality"
    ]
  },
  {
    id: "himalaya-erina-tick-control",
    name: "Himalaya Erina Tick Control Shampoo",
    description: "Highly effective herbal shampoo that controls ticks, fleas, and lice.",
    category: "supplements",
    image: "/images/products/medicines/himalaya-erina-tick-control.png",
    
    action: "details",
    price: 320,
    brand: "Himalaya Pet",
    age: "All Ages",
    dietaryRequirements: "Tick & Flea Defense",
    createdAt: "2026-05-27T23:45:00Z",
    galleryImages: ["/images/products/medicines/himalaya-erina-tick-control.png"],
    about: "Erina Tick Control uses natural active ingredients to eliminate external ectoparasites. Gentle on the skin while being tough on ticks, fleas, and lice.",
    keyFeatures: [
      "Kills and repels ticks, fleas, and lice",
      "Prevents skin infections and itching",
      "Soothes irritated skin caused by tick bites"
    ],
    conditions: [
      "Wet coat, lather well, leave for 10-15 mins, rinse with warm water",
      "Do not use on puppies under 12 weeks of age"
    ]
  },
  {
    id: "himalaya-conditioner",
    name: "Himalaya Erina Conditioner",
    description: "Deep conditioning herbal formula for a silky-smooth coat.",
    category: "supplements",
    image: "/images/products/medicines/himalaya-conditioner.png",
    
    action: "details",
    price: 290,
    brand: "Himalaya Pet",
    age: "All Ages",
    dietaryRequirements: "Deep Conditioning",
    createdAt: "2026-05-27T23:50:00Z",
    galleryImages: ["/images/products/medicines/himalaya-conditioner.png"],
    about: "Enriched with hair-softening natural herbs, it detangles matted hair, reduces static, and leaves a beautiful sweet fragrance.",
    keyFeatures: [
      "Detangles thick hair and coats easily",
      "Leaves coat incredibly soft, glossy, and smooth",
      "Pleasant lasting herbal fragrance"
    ],
    conditions: [
      "Apply post-shampoo, leave for 3 mins, and wash off"
    ]
  },

  // Sprays & Hygiene
  {
    id: "dual-action-spray",
    name: "Dual Action Hygiene Spray",
    description: "Combats skin pathogens and sanitizes minor wounds on pets.",
    category: "supplements",
    image: "/images/products/medicines/sprays/dual-action-spray.png",
    
    action: "details",
    price: 380,
    brand: "PetPlus",
    age: "All Ages",
    dietaryRequirements: "Skin Hygiene",
    createdAt: "2026-05-28T00:00:00Z",
    galleryImages: ["/images/products/medicines/sprays/dual-action-spray.png"],
    about: "A dual action skin spray that protects against bacterial and fungal infections. Non-stinging, safe for licking, and speeds up natural healing.",
    keyFeatures: [
      "Antiseptic and antifungal defense spray",
      "Soothing, non-stinging formulation",
      "100% safe if licked by pets"
    ],
    conditions: [
      "Spray directly on affected area 2-3 times daily"
    ]
  },
  {
    id: "anti-tick-spray",
    name: "Anti Tick Protection Spray",
    description: "Fast-acting spray to control tick infestations instantly.",
    category: "supplements",
    image: "/images/products/medicines/sprays/anti-tick-spray.png",
    
    action: "details",
    price: 450,
    brand: "TickBlock",
    age: "All Ages",
    dietaryRequirements: "Tick Eliminator",
    createdAt: "2026-05-28T00:10:00Z",
    galleryImages: ["/images/products/medicines/sprays/anti-tick-spray.png"],
    about: "Quickly kills adult ticks and fleas on contact. Forms a protective shield on the coat to prevent re-infestation for up to 30 days.",
    keyFeatures: [
      "Kills ticks & fleas on contact instantly",
      "Provides 30-day residual protection",
      "Easy spray nozzle for thick coats"
    ],
    conditions: [
      "Spray over entire body avoiding eyes and nose, rub against hair flow"
    ]
  },
  {
    id: "flea-tick-spray",
    name: "Flea & Tick Defense Spray",
    description: "Herbal spray to repel ticks, fleas, and mosquitos naturally.",
    category: "supplements",
    image: "/images/products/medicines/sprays/flea-tick-spray.png",
    
    action: "details",
    price: 390,
    brand: "EcoPet",
    age: "All Ages",
    dietaryRequirements: "Natural Repellent",
    createdAt: "2026-05-28T00:20:00Z",
    galleryImages: ["/images/products/medicines/sprays/flea-tick-spray.png"],
    about: "A natural herbal shield containing lemongrass and citronella oil. Extremely safe for daily outdoor protection.",
    keyFeatures: [
      "100% natural herbal ingredients",
      "Repels fleas, ticks, and mosquitos",
      "Safe for daily indoor/outdoor use"
    ],
    conditions: [
      "Spray lightly before going out for daily walks"
    ]
  },
  {
    id: "pet-odour-remover",
    name: "Pet Odour Eliminator Spray",
    description: "Eliminates tough pet odors and sanitizes home spaces.",
    category: "supplements",
    image: "/images/products/medicines/sprays/pet-odour-remover.png",
    
    action: "details",
    price: 350,
    brand: "FreshPet",
    age: "All Ages",
    dietaryRequirements: "Deodorizer & Sanitizer",
    createdAt: "2026-05-28T00:30:00Z",
    galleryImages: ["/images/products/medicines/sprays/pet-odour-remover.png"],
    about: "Breaks down odor molecules at the source instead of masking them. Safe to use directly on pet bedding, rugs, and furniture.",
    keyFeatures: [
      "Bio-enzymatic odor-destroying action",
      "Leaves a refreshing lavender fragrance",
      "Safe around pets and kids"
    ],
    conditions: [
      "Spray on carpets, kennels, or pet bedding"
    ]
  },

  // Supplements
  {
    id: "calcium-tablets",
    name: "Calcium & Joint Tablets",
    description: "High potency calcium tablets with Glucosamine & Chondroitin.",
    category: "supplements",
    image: "/images/products/medicines/supplements/calcium-tablets.png",
    
    action: "details",
    price: 650,
    brand: "Himalaya Pet",
    age: "Adult & Senior",
    dietaryRequirements: "Bone & Joint Support",
    createdAt: "2026-05-27T12:00:00Z",
    galleryImages: ["/images/products/medicines/supplements/calcium-tablets.png"],
    about: "Formulated to protect skeletal bone density and maintain joint flexibility. Added glucosamine supports cartilage production in heavy breed puppies and aging dogs.",
    keyFeatures: [
      "Bioavailable calcium and phosphorus",
      "Glucosamine & Chondroitin joint boosters",
      "Reduces joint stiffness and wear"
    ],
    conditions: [
      "Tablet can be fed directly or crushed into food",
      "Dose: 1 tablet per 10kg body weight daily"
    ]
  },
  {
    id: "multivitamin-tablets",
    name: "Multivitamin Wellness Tablets",
    description: "Daily essential multivitamin syrup/tablets to boost vitality and immunity.",
    category: "supplements",
    image: "/images/products/medicines/supplements/multivitamin-tablets.png",
    
    action: "details",
    price: 450,
    brand: "NutriPet",
    age: "All Ages",
    dietaryRequirements: "Daily Supplement",
    createdAt: "2026-05-27T11:00:00Z",
    galleryImages: ["/images/products/medicines/supplements/multivitamin-tablets.png"],
    about: "NutriPet Premium Multivitamin is a comprehensive daily supplement designed to support optical health, coat gloss, energy levels, and overall immune response.",
    keyFeatures: [
      "18 essential vitamins & trace minerals",
      "Fast liquid/tablet absorption",
      "Improves daily energy, health, and coat gloss"
    ],
    conditions: [
      "Dose: 5ml or 1 tablet per 10kg body weight daily",
      "Store in a cool dry cabinet"
    ]
  },
  {
    id: "joint-care-supplements",
    name: "Joint Care & Mobility Supplements",
    description: "Advanced formula to repair joint tissue and reduce hip dysplasia symptoms.",
    category: "supplements",
    image: "/images/products/medicines/supplements/joint-care.png",
    
    action: "details",
    price: 750,
    brand: "FlexiJoint",
    age: "Senior & Adult",
    dietaryRequirements: "Advanced Joint Care",
    createdAt: "2026-05-28T01:00:00Z",
    galleryImages: ["/images/products/medicines/supplements/joint-care.png"],
    about: "Contains premium MSM and Boswellia extract to manage pain and inflammation in dogs suffering from arthritis or hip dysplasia.",
    keyFeatures: [
      "MSM and Boswellia anti-inflammatory active",
      "Aids in rebuilding worn cartilage",
      "Highly recommended for seniors and giant breeds"
    ],
    conditions: [
      "Consult vet for dosage during initial loading phase"
    ]
  },
  {
    id: "growth-supplements",
    name: "Pet Growth & Immunity Supplements",
    description: "Enriched with amino acids and growth promoters for weak puppies.",
    category: "supplements",
    image: "/images/products/medicines/supplements/growth-supplement.png",
    
    action: "details",
    price: 480,
    brand: "GrowFast",
    age: "Puppy",
    dietaryRequirements: "Skeletal Growth & Muscle Tone",
    createdAt: "2026-05-28T01:10:00Z",
    galleryImages: ["/images/products/medicines/supplements/growth-supplement.png"],
    about: "A concentrated growth promoter enriched with L-lysine and critical amino acids to support optimal weight gain, muscle tone, and developmental milestones.",
    keyFeatures: [
      "Lysine and multi-amino acid booster",
      "Promotes robust healthy skeletal development",
      "Enhances natural nutrient absorption rate"
    ],
    conditions: [
      "Mix with food once daily for puppies under 1 year"
    ]
  },

  // --- ACCESSORIES SECTION ---
  // Dog Accessories
  {
    id: "accessories-chain",
    name: "Heavy-Duty Dog Chain",
    description: "Rust-resistant chrome-plated steel leash chain for large breeds.",
    category: "accessories",
    image: "/images/products/accessories/dogs/dog-chain.png",
    
    action: "details",
    price: 450,
    brand: "IronHold",
    createdAt: "2026-05-28T02:00:00Z",
    galleryImages: ["/images/products/accessories/dogs/dog-chain.png"],
    about: "A high-strength steel chain with welded links for security. Built to withstand strong pulls from heavy breeds without rusting or breaking.",
    keyFeatures: [
      "Welded chrome-plated steel links",
      "100% rust-resistant security leash",
      "Padded handle for owner comfort"
    ],
    conditions: [
      "Inspect lock clasp regularly for wear"
    ]
  },
  {
    id: "accessories-leash",
    name: "Comfort-Grip Dog Leash",
    description: "Strong woven nylon leash with soft neoprene padded handle.",
    category: "accessories",
    image: "/images/products/accessories/dogs/dog-leash.png",
    
    action: "details",
    price: 320,
    brand: "TuffWalk",
    createdAt: "2026-05-28T02:10:00Z",
    galleryImages: ["/images/products/accessories/dogs/dog-leash.png"],
    about: "Perfect for daily walks, this 5-foot nylon leash features highly visible reflective stitching for safe nighttime activities.",
    keyFeatures: [
      "Reflective safety threads for night walks",
      "Comfortable neoprene padded grip handle",
      "360-degree tangle-free metal clasp swivel"
    ],
    conditions: [
      "Hand wash with mild detergent when dirty"
    ]
  },
  {
    id: "accessories-harness",
    name: "Reflective Dog Harness",
    description: "No-pull chest harness with adjustable security straps.",
    category: "accessories",
    image: "/images/products/accessories/dogs/dog-harness.png",
    
    action: "details",
    price: 850,
    brand: "FlexFit",
    createdAt: "2026-05-28T02:20:00Z",
    galleryImages: ["/images/products/accessories/dogs/dog-harness.png"],
    about: "Distributes pulling pressure evenly across a dog's chest to prevent neck strain. Features dual leash attachment D-rings and breathable mesh lining.",
    keyFeatures: [
      "Ergonomic no-pull design protects trachea",
      "Breathable cool mesh interior lining",
      "Four adjustable straps for custom fit"
    ],
    conditions: [
      "Measure dog's chest circumference before purchasing"
    ]
  },
  {
    id: "accessories-collar",
    name: "Premium Padded Dog Collar",
    description: "Durable, comfortable & stylish collar with name tag D-ring.",
    category: "accessories",
    image: "/images/products/accessories/dogs/dog-collar.png",
    
    action: "details",
    price: 350,
    brand: "PetPlus",
    createdAt: "2026-05-23T10:00:00Z",
    galleryImages: ["/images/products/accessories/dogs/dog-collar.png"],
    about: "Made from high-density nylon with soft interior neoprene padding to protect neck fur. Features quick release buckle and reflective safety strip.",
    keyFeatures: [
      "High strength nylon structure",
      "Quick release safety snap buckle",
      "Reflective trim and interior soft neoprene lining"
    ],
    conditions: [
      "Leave a 2-finger safety gap around dog's neck"
    ]
  },
  {
    id: "accessories-feeding-bowl",
    name: "Stainless Steel Feeding Bowl",
    description: "Double-walled rustproof steel bowl with non-slip rubber base.",
    category: "accessories",
    image: "/images/products/accessories/dogs/feeding-bowl.png",
    
    action: "details",
    price: 280,
    brand: "DishPro",
    createdAt: "2026-05-28T02:30:00Z",
    galleryImages: ["/images/products/accessories/dogs/feeding-bowl.png"],
    about: "Hygiene-first stainless steel bowl that is easy to wash and completely dishwasher safe. Non-tip base prevents messy spills.",
    keyFeatures: [
      "High quality food-grade stainless steel",
      "Non-slip silicon rubber rim bottom base",
      "Dishwasher safe and bacteria resistant"
    ],
    conditions: [
      "Clean daily to prevent food residue buildup"
    ]
  },
  {
    id: "accessories-water-bowl",
    name: "Non-Slip Pet Water Bowl",
    description: "Wide capacity splash-free water dish.",
    category: "accessories",
    image: "/images/products/accessories/dogs/water-bowl.png",
    
    action: "details",
    price: 300,
    brand: "DishPro",
    createdAt: "2026-05-28T02:40:00Z",
    galleryImages: ["/images/products/accessories/dogs/water-bowl.png"],
    about: "Designed to keep dog ears dry while drinking. Wide silicon non-skid base keeps the water bowl firmly in place on any tiled floor.",
    keyFeatures: [
      "Anti-splash wide rim structure design",
      "Solves dry ear issue for floppy breeds",
      "Heavy base prevents tipping and slides"
    ],
    conditions: [
      "Change drinking water twice daily"
    ]
  },

  // Toys
  {
    id: "accessories-chew-toy",
    name: "Durable Rubber Chew Toy",
    description: "Tough natural rubber toy designed for aggressive chewers.",
    category: "accessories",
    image: "/images/products/accessories/toys/chew-toy.png",
    
    action: "details",
    price: 390,
    brand: "KONG",
    createdAt: "2026-05-28T02:50:00Z",
    galleryImages: ["/images/products/accessories/toys/chew-toy.png"],
    about: "Made of 100% natural thick rubber. Features a hollow core that can be stuffed with treats or peanut butter to keep dogs mentally engaged.",
    keyFeatures: [
      "Extremely tough natural black rubber",
      "Hollow core pocket for treat stuffing",
      "Massages gums and cleans teeth as they chew"
    ],
    conditions: [
      "Supervise pets during initial chewing sessions"
    ]
  },
  {
    id: "accessories-rope-toy",
    name: "Cotton Knotted Rope Toy",
    description: "Strong & safe cotton woven fibers for dental cleaning and hours of tug-of-war fun.",
    category: "accessories",
    image: "/images/products/accessories/toys/rope-toy.png",
    
    action: "details",
    price: 150,
    brand: "KONG",
    createdAt: "2026-05-05T10:00:00Z",
    galleryImages: ["/images/products/accessories/toys/rope-toy.png"],
    about: "Tightly knotted 100% cotton threads act as natural dental floss, scraping off plaque and massaging gums while playing energetic fetch and tug-of-war.",
    keyFeatures: [
      "100% organic cotton woven fibers",
      "Scrapes plaque off teeth during active play",
      "Knotted ends for solid grip control"
    ],
    conditions: [
      "Discard rope immediately if fibers start to unravel"
    ]
  },
  {
    id: "accessories-squeaky-toy",
    name: "Squeaky Plush Play Toy",
    description: "Soft plush toy with integrated inner puncture-proof squeaker.",
    category: "accessories",
    image: "/images/products/accessories/toys/squeaky-toy.png",
    
    action: "details",
    price: 240,
    brand: "ToyJoy",
    createdAt: "2026-05-28T03:00:00Z",
    galleryImages: ["/images/products/accessories/toys/squeaky-toy.png"],
    about: "Keep puppies entertained with interactive high-pitch squeaks. Double stitched seams prevent easy tearing during gentle play.",
    keyFeatures: [
      "Internal loud puncture-proof squeaker",
      "Double stitched protective layer edges",
      "Soft and cozy plush for comforting cuddling"
    ],
    conditions: [
      "Not recommended for aggressive, heavy chewers"
    ]
  },
  {
    id: "accessories-interactive-toy",
    name: "Smart Treat-Dispensing Toy",
    description: "Puzzles treat ball that stimulates brain and slows down eating.",
    category: "accessories",
    image: "/images/products/accessories/toys/interactive-toy.png",
    
    action: "details",
    price: 490,
    brand: "BrainyPet",
    createdAt: "2026-05-28T03:10:00Z",
    galleryImages: ["/images/products/accessories/toys/interactive-toy.png"],
    about: "Keeps dogs mentally alert by challenging them to roll the ball to release treats. Perfect solution for reducing separation anxiety.",
    keyFeatures: [
      "Adjustable difficulty treat gate slider",
      "Provides excellent mental training and exercise",
      "Slows down fast, unhealthy gulping habits"
    ],
    conditions: [
      "Fill only with dry, round kibble shapes"
    ]
  },

  // Bones & Treats
  {
    id: "accessories-rawhide-bone",
    name: "Natural Rawhide Bones (Pack of 4)",
    description: "Pressed natural beef hide bones that promote strong jaws.",
    category: "accessories",
    image: "/images/products/accessories/treats/rawhide-bone.png",
    
    action: "details",
    price: 260,
    brand: "BarkTreats",
    createdAt: "2026-05-28T03:20:00Z",
    galleryImages: ["/images/products/accessories/treats/rawhide-bone.png"],
    about: "Keeps puppies occupied for hours while fulfilling their natural urge to chew. Scrapes away tartar buildup effectively.",
    keyFeatures: [
      "100% natural premium pressed beef hide",
      "Long-lasting chew, jaw muscle strengthening",
      "Reduces destructive chewing on furniture"
    ],
    conditions: [
      "Supervise chew; replace when it becomes small enough to swallow whole"
    ]
  },
  {
    id: "accessories-dental-chews",
    name: "Daily Dental Care Chews",
    description: "Edible dental treats that fight bad breath and plaque.",
    category: "accessories",
    image: "/images/products/accessories/treats/dental-chew.png",
    
    action: "details",
    price: 380,
    brand: "FreshBreath",
    createdAt: "2026-05-28T03:30:00Z",
    galleryImages: ["/images/products/accessories/treats/dental-chew.png"],
    about: "Specially textured to clean hard-to-reach teeth down to the gumline. Delicious minty flavor freshens bad dog breath instantly.",
    keyFeatures: [
      "Toothbrush shape texture scrapes tartar",
      "Refreshing herbal minty flavor",
      "Highly digestible starch-based recipe"
    ],
    conditions: [
      "Feed maximum 1 dental stick per day"
    ]
  },
  {
    id: "accessories-training-treats",
    name: "Real Meat Training Treats",
    description: "Bite-sized soft chicken treats perfect for training sessions.",
    category: "accessories",
    image: "/images/products/accessories/treats/training-treat.png",
    
    action: "details",
    price: 220,
    brand: "SmartPup",
    createdAt: "2026-05-28T03:40:00Z",
    galleryImages: ["/images/products/accessories/treats/training-treat.png"],
    about: "Extremely low-calorie bite treats packed with high motivation real meat flavor. Ideal for reward-based clicker training.",
    keyFeatures: [
      "Made with real dehydrated chicken meat",
      "Under 3 calories per reward bite treat",
      "Resealable packet preserves fresh aroma"
    ],
    conditions: [
      "Reduce daily dinner portion slightly if training heavily"
    ]
  },

  // Cages
  {
    id: "accessories-dog-crate",
    name: "Foldable Metal Dog Crate",
    description: "Double-door wire crate with leak-proof removable plastic pan.",
    category: "accessories",
    image: "/images/products/accessories/cages/dog-crate.png",
    
    action: "details",
    price: 2800,
    brand: "SafeKeep",
    createdAt: "2026-05-28T03:50:00Z",
    galleryImages: ["/images/products/accessories/cages/dog-crate.png"],
    about: "Safe wire crate for crate-training puppies. Folds flat easily for storage or car transport. Slide-out bottom tray makes cleanup simple.",
    keyFeatures: [
      "Secure double-door latches with safety slide",
      "Slide-out removable leak-proof plastic tray",
      "Folds completely flat, portable handle"
    ],
    conditions: [
      "Place a cozy blanket inside to make it welcoming"
    ]
  },
  {
    id: "accessories-puppy-playpen",
    name: "Indoor/Outdoor Puppy Playpen",
    description: "8-panel heavy metal wire enclosure play pen.",
    category: "accessories",
    image: "/images/products/accessories/cages/puppy-play-pen.png",
    
    action: "details",
    price: 3200,
    brand: "SafeKeep",
    createdAt: "2026-05-28T04:00:00Z",
    galleryImages: ["/images/products/accessories/cages/puppy-play-pen.png"],
    about: "Provides a safe, spacious bounded play area for active puppies indoors or in gardens. Setup takes less than a minute.",
    keyFeatures: [
      "Spacious 8-panel steel configurations",
      "Rust-resistant finish paint coat protection",
      "Easy walk-through door with latch locks"
    ],
    conditions: [
      "Do not leave puppies unattended for long durations outdoors"
    ]
  },
  {
    id: "accessories-bird-cage",
    name: "Spacious Dome-Top Bird Cage",
    description: "Premium iron bird cage with feeder cups and wooden perches.",
    category: "accessories",
    image: "/images/products/accessories/cages/bird-cage.png",
    
    action: "details",
    price: 2400,
    brand: "Aviary Basics",
    createdAt: "2026-05-28T04:10:00Z",
    galleryImages: ["/images/products/accessories/cages/bird-cage.png"],
    about: "Tabletop dome bird cage designed for budgies, lovebirds, and cockatiels. Removable slide tray facilitates clean daily paper changes.",
    keyFeatures: [
      "Rustproof non-toxic wire finish painting",
      "Includes 2 interior wooden perches and cups",
      "Bottom slide-out metal litter cleaning tray"
    ],
    conditions: [
      "Sanitize cage completely once a week"
    ]
  },
  {
    id: "accessories-travel-carrier",
    name: "Airline-Approved Travel Carrier",
    description: "Hard shell plastic pet carrier with ventilation vents.",
    category: "accessories",
    image: "/images/products/accessories/cages/travel-carrier.png",
    
    action: "details",
    price: 1900,
    brand: "SkyTravel",
    createdAt: "2026-05-28T04:20:00Z",
    galleryImages: ["/images/products/accessories/cages/travel-carrier.png"],
    about: "Safe and secure carrier built with impact-resistant plastic. Complies with commercial airline cargo/cabin specifications.",
    keyFeatures: [
      "Ventilation grates on all four sides",
      "Secure spring-loaded metal door latch lock",
      "Top folding handle for comfortable transport"
    ],
    conditions: [
      "Ensure pet can stand and turn around comfortably inside"
    ]
  }
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
