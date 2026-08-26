// Mock Data for LUMEN & OPTIC Eyewear E-commerce Store (PKR Currency & Glasses-Only Catalog)

export const HERO_SLIDES = [
  {
    id: 1,
    title: "Architectural Clarity",
    subtitle: "Spring / Summer 2026 Collection",
    tag: "NEW ARRIVAL",
    description: "Ultra-lightweight Japanese Titanium frames crafted for timeless elegance and structural precision.",
    buttonText: "Explore Men's Collection",
    buttonCategory: "gents",
    bgGradient: "linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.75) 100%)",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80",
    badge: "Handcrafted in Japan"
  },
  {
    id: 2,
    title: "Chic & Unapologetic",
    subtitle: "High Fashion & UV Shield",
    tag: "WOMEN's LUXURY",
    description: "Statement oversized cat-eye sunglasses featuring hand-polished Italian Mazzucchelli acetate.",
    buttonText: "Shop Ladies Eyewear",
    buttonCategory: "ladies",
    bgGradient: "linear-gradient(135deg, rgba(88, 28, 135, 0.8) 0%, rgba(15, 23, 42, 0.85) 100%)",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80",
    badge: "100% UV400 Protection"
  },
  {
    id: 3,
    title: "Digital Defense Specs",
    subtitle: "Blue Light Protection",
    tag: "TECH LIFESTYLE",
    description: "Block 98% of high-energy blue light from screens. Reduce eye fatigue and elevate your workstation.",
    buttonText: "Discover Blue Light Glasses",
    buttonCategory: "blue-light",
    bgGradient: "linear-gradient(135deg, rgba(14, 116, 144, 0.85) 0%, rgba(15, 23, 42, 0.85) 100%)",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=80",
    badge: "Zero Distortion Lenses"
  },
  {
    id: 4,
    title: "Virtual AR Fitting Studio",
    subtitle: "Instant Mirror Preview",
    tag: "INTERACTIVE TECH",
    description: "Try any frame live from the comfort of your home using our real-time AR camera simulator.",
    buttonText: "Try Virtual Mirror",
    buttonAction: "ar-studio",
    bgGradient: "linear-gradient(135deg, rgba(180, 83, 9, 0.85) 0%, rgba(15, 23, 42, 0.85) 100%)",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=80",
    badge: "Instant 3D Preview"
  }
];

export const CATEGORIES = [
  { id: "all", name: "All Eyewear", icon: "Glasses" },
  { id: "gents", name: "Gents (Men)", icon: "User", description: "Sleek, bold & professional frames for men" },
  { id: "ladies", name: "Ladies (Women)", icon: "UserCheck", description: "Elegant, fashionable & cat-eye styles" },
  { id: "kids", name: "Kids Collection", icon: "Smile", description: "Durable, flexible & colorful specs for children" },
  { id: "prescription", name: "Prescription Glasses", icon: "Eye", description: "Custom single vision & progressive lenses" },
  { id: "sunglasses", name: "Sunglasses", icon: "Sun", description: "Polarized & UV protection statement shades" },
  { id: "blue-light", name: "Blue Light Blockers", icon: "Laptop", description: "Anti-fatigue screen protection glasses" }
];

export const FRAME_SHAPES = [
  "Aviator", "Wayfarer", "Round", "Square", "Cat-Eye", "Oval", "Geometric",
  "Clubmaster", "Rimless", "Hexagonal", "Octagonal", "Shield"
];

export const FRAME_MATERIALS = [
  "Titanium", "Italian Acetate", "Stainless Steel", "TR90 Flexible Polymer", "Eco Wood Composite"
];

export const COLOR_OPTIONS = [
  { name: "Matte Black", hex: "#1e1e1e" },
  { name: "Tortoise Shell", hex: "#5c3a21" },
  { name: "Rose Gold", hex: "#b76e79" },
  { name: "Gunmetal Gray", hex: "#4a4e51" },
  { name: "Crystal Clear", hex: "#e0e7ff" },
  { name: "Champagne Gold", hex: "#d4af37" },
  { name: "Emerald Green", hex: "#064e3b" },
  { name: "Midnight Navy", hex: "#1e3a8a" }
];

export const PRODUCTS = [
  {
    id: "lumen-01",
    name: "Apex Titanium Aviator",
    tagline: "Ultra-sleek titanium frame engineered for daily precision",
    price: 18500,
    originalPrice: 22000,
    rating: 4.9,
    reviewsCount: 128,
    category: "gents",
    secondaryCategories: ["prescription", "sunglasses"],
    gender: "Gents",
    frameShape: "Aviator",
    material: "Titanium",
    weight: "14 grams",
    inStock: true,
    isNew: true,
    isBestseller: true,
    discountPercent: 16,
    colors: [
      { name: "Gunmetal Gray", hex: "#4a4e51" },
      { name: "Matte Black", hex: "#1e1e1e" },
      { name: "Champagne Gold", hex: "#d4af37" }
    ],
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The Apex Titanium Aviator balances industrial precision with effortless modern style. Constructed from aerospace-grade beta titanium, it weighs a mere 14 grams while ensuring lifetime durability and hypoallergenic comfort.",
    specs: {
      lensWidth: "54 mm",
      bridgeWidth: "18 mm",
      templeLength: "145 mm",
      frameWidth: "140 mm",
      lensHeight: "46 mm"
    },
    arStyle: {
      type: "aviator",
      borderColor: "#4a4e51",
      lensTint: "rgba(30, 41, 59, 0.4)"
    }
  },
  {
    id: "lumen-02",
    name: "Sienna Cat-Eye Noir",
    tagline: "Dramatic Italian acetate cat-eye crafted for statement elegance",
    price: 15900,
    originalPrice: 19500,
    rating: 4.8,
    reviewsCount: 94,
    category: "ladies",
    secondaryCategories: ["sunglasses", "prescription"],
    gender: "Ladies",
    frameShape: "Cat-Eye",
    material: "Italian Acetate",
    weight: "22 grams",
    inStock: true,
    isNew: false,
    isBestseller: true,
    discountPercent: 18,
    colors: [
      { name: "Matte Black", hex: "#1e1e1e" },
      { name: "Tortoise Shell", hex: "#5c3a21" },
      { name: "Rose Gold", hex: "#b76e79" }
    ],
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Infuse your everyday look with haute couture flair. The Sienna Cat-Eye Noir features bevelled edges hand-carved from premium Mazzucchelli acetate with custom embedded core wires.",
    specs: {
      lensWidth: "52 mm",
      bridgeWidth: "17 mm",
      templeLength: "140 mm",
      frameWidth: "136 mm",
      lensHeight: "44 mm"
    },
    arStyle: {
      type: "cateye",
      borderColor: "#1e1e1e",
      lensTint: "rgba(15, 23, 42, 0.5)"
    }
  },
  {
    id: "lumen-03",
    name: "CyberShield Pro Blue-Block",
    tagline: "Next-gen screen protection with anti-fatigue AR lens coating",
    price: 11900,
    originalPrice: 14500,
    rating: 4.95,
    reviewsCount: 210,
    category: "blue-light",
    secondaryCategories: ["gents", "ladies", "prescription"],
    gender: "Unisex",
    frameShape: "Square",
    material: "TR90 Flexible Polymer",
    weight: "16 grams",
    inStock: true,
    isNew: true,
    isBestseller: true,
    discountPercent: 18,
    colors: [
      { name: "Crystal Clear", hex: "#e0e7ff" },
      { name: "Midnight Navy", hex: "#1e3a8a" },
      { name: "Matte Black", hex: "#1e1e1e" }
    ],
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Designed for software engineers, designers, and gamers spending 8+ hours in front of displays. Blocks 455nm blue rays and mitigates digital eye strain, dryness, and sleep disruption.",
    specs: {
      lensWidth: "51 mm",
      bridgeWidth: "19 mm",
      templeLength: "142 mm",
      frameWidth: "138 mm",
      lensHeight: "42 mm"
    },
    arStyle: {
      type: "square",
      borderColor: "#1e3a8a",
      lensTint: "rgba(14, 116, 144, 0.25)"
    }
  },
  {
    id: "lumen-04",
    name: "Kuro Wayfarer Classic",
    tagline: "Timeless silhouette with reinforced 5-barrel German hinges",
    price: 13500,
    originalPrice: 16800,
    rating: 4.7,
    reviewsCount: 86,
    category: "gents",
    secondaryCategories: ["prescription", "sunglasses"],
    gender: "Gents",
    frameShape: "Wayfarer",
    material: "Italian Acetate",
    weight: "26 grams",
    inStock: true,
    isNew: false,
    isBestseller: false,
    discountPercent: 20,
    colors: [
      { name: "Tortoise Shell", hex: "#5c3a21" },
      { name: "Matte Black", hex: "#1e1e1e" }
    ],
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A heritage wayfarer design updated with ergonomically contoured nose pads and custom hand-polished acetate luster. Perfect for both office meetings and weekend road trips.",
    specs: {
      lensWidth: "53 mm",
      bridgeWidth: "20 mm",
      templeLength: "145 mm",
      frameWidth: "142 mm",
      lensHeight: "43 mm"
    },
    arStyle: {
      type: "wayfarer",
      borderColor: "#5c3a21",
      lensTint: "rgba(30, 41, 59, 0.3)"
    }
  },
  {
    id: "lumen-05",
    name: "Aura Round Minimalist",
    tagline: "Wire-thin round frame in champagne gold finish",
    price: 16800,
    originalPrice: 21000,
    rating: 4.88,
    reviewsCount: 152,
    category: "ladies",
    secondaryCategories: ["gents", "prescription"],
    gender: "Unisex",
    frameShape: "Round",
    material: "Stainless Steel",
    weight: "12 grams",
    inStock: true,
    isNew: true,
    isBestseller: true,
    discountPercent: 20,
    colors: [
      { name: "Champagne Gold", hex: "#d4af37" },
      { name: "Rose Gold", hex: "#b76e79" },
      { name: "Gunmetal Gray", hex: "#4a4e51" }
    ],
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Inspired by vintage intellectual aesthetics, Aura features ultra-thin stainless steel rims with silicone spring nose pads for zero pressure wearability.",
    specs: {
      lensWidth: "49 mm",
      bridgeWidth: "21 mm",
      templeLength: "140 mm",
      frameWidth: "132 mm",
      lensHeight: "47 mm"
    },
    arStyle: {
      type: "round",
      borderColor: "#d4af37",
      lensTint: "rgba(212, 175, 55, 0.15)"
    }
  },
  {
    id: "lumen-06",
    name: "Junior Flexi-Comfort",
    tagline: "BPA-free non-toxic flexible frames for active kids",
    price: 7900,
    originalPrice: 9500,
    rating: 4.9,
    reviewsCount: 64,
    category: "kids",
    secondaryCategories: ["blue-light", "prescription"],
    gender: "Kids",
    frameShape: "Square",
    material: "TR90 Flexible Polymer",
    weight: "10 grams",
    inStock: true,
    isNew: true,
    isBestseller: false,
    discountPercent: 17,
    colors: [
      { name: "Midnight Navy", hex: "#1e3a8a" },
      { name: "Emerald Green", hex: "#064e3b" },
      { name: "Rose Gold", hex: "#b76e79" }
    ],
    image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Virtually unbreakable specs engineered for children aged 5-12. Features 180-degree flexible spring hinges and non-slip rubber temples.",
    specs: {
      lensWidth: "45 mm",
      bridgeWidth: "16 mm",
      templeLength: "125 mm",
      frameWidth: "120 mm",
      lensHeight: "36 mm"
    },
    arStyle: {
      type: "square",
      borderColor: "#1e3a8a",
      lensTint: "rgba(255, 255, 255, 0.1)"
    }
  },
  {
    id: "lumen-07",
    name: "Solstice Hexagon Polarized",
    tagline: "Geometric statement sunglasses with HD polarized lenses",
    price: 19500,
    originalPrice: 24000,
    rating: 4.92,
    reviewsCount: 114,
    category: "sunglasses",
    secondaryCategories: ["gents", "ladies"],
    gender: "Unisex",
    frameShape: "Geometric",
    material: "Titanium",
    weight: "18 grams",
    inStock: true,
    isNew: true,
    isBestseller: true,
    discountPercent: 19,
    colors: [
      { name: "Champagne Gold", hex: "#d4af37" },
      { name: "Matte Black", hex: "#1e1e1e" }
    ],
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Stand out with sharp octagonal wirework and 100% UV400 TAC polarized lenses that eliminate water and highway glare.",
    specs: {
      lensWidth: "53 mm",
      bridgeWidth: "19 mm",
      templeLength: "145 mm",
      frameWidth: "139 mm",
      lensHeight: "45 mm"
    },
    arStyle: {
      type: "geometric",
      borderColor: "#d4af37",
      lensTint: "rgba(15, 23, 42, 0.6)"
    }
  },
  {
    id: "lumen-08",
    name: "Veritas Executive Rimless",
    tagline: "Sophisticated oval rimless silhouette with beta-titanium temples",
    price: 21500,
    originalPrice: 26000,
    rating: 4.85,
    reviewsCount: 73,
    category: "prescription",
    secondaryCategories: ["gents", "ladies"],
    gender: "Unisex",
    frameShape: "Oval",
    material: "Titanium",
    weight: "9 grams",
    inStock: true,
    isNew: false,
    isBestseller: false,
    discountPercent: 17,
    colors: [
      { name: "Gunmetal Gray", hex: "#4a4e51" },
      { name: "Rose Gold", hex: "#b76e79" }
    ],
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80"
    ],
    description: "For executives who demand featherweight comfort without visual obstruction. Rimless mounting with flexible titanium bridge.",
    specs: {
      lensWidth: "50 mm",
      bridgeWidth: "18 mm",
      templeLength: "140 mm",
      frameWidth: "134 mm",
      lensHeight: "38 mm"
    },
    arStyle: {
      type: "oval",
      borderColor: "#4a4e51",
      lensTint: "rgba(240, 240, 240, 0.2)"
    }
  },
  {
    id: "lumen-09",
    name: "Veritas Gold Round Specs",
    tagline: "Ultra-stylish round golden frame for prescription & fashion",
    price: 14500,
    originalPrice: 18000,
    rating: 4.91,
    reviewsCount: 88,
    category: "prescription",
    secondaryCategories: ["ladies", "gents"],
    gender: "Unisex",
    frameShape: "Round",
    material: "Stainless Steel",
    weight: "13 grams",
    inStock: true,
    isNew: true,
    isBestseller: true,
    discountPercent: 19,
    colors: [
      { name: "Champagne Gold", hex: "#d4af37" },
      { name: "Rose Gold", hex: "#b76e79" }
    ],
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Handcrafted round optical frame with delicate engravings along the temples. Features spring hinges for max comfort.",
    specs: {
      lensWidth: "48 mm",
      bridgeWidth: "20 mm",
      templeLength: "140 mm",
      frameWidth: "130 mm",
      lensHeight: "45 mm"
    },
    arStyle: {
      type: "round",
      borderColor: "#d4af37",
      lensTint: "rgba(212, 175, 55, 0.15)"
    }
  },
  {
    id: "lumen-10",
    name: "Vogue Rose Cat-Eye Shades",
    tagline: "Statement pink tinted UV protection sunglasses for ladies",
    price: 13900,
    originalPrice: 17500,
    rating: 4.87,
    reviewsCount: 96,
    category: "sunglasses",
    secondaryCategories: ["ladies"],
    gender: "Ladies",
    frameShape: "Cat-Eye",
    material: "Italian Acetate",
    weight: "24 grams",
    inStock: true,
    isNew: true,
    isBestseller: false,
    discountPercent: 20,
    colors: [
      { name: "Rose Gold", hex: "#b76e79" },
      { name: "Matte Black", hex: "#1e1e1e" }
    ],
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Glamorous rose-gold tinted cat-eye sunglasses with gradient UV400 lenses. Polished to perfection for outdoor elegance.",
    specs: {
      lensWidth: "54 mm",
      bridgeWidth: "16 mm",
      templeLength: "142 mm",
      frameWidth: "138 mm",
      lensHeight: "46 mm"
    },
    arStyle: {
      type: "cateye",
      borderColor: "#b76e79",
      lensTint: "rgba(244, 63, 94, 0.3)"
    }
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Alexander Vance",
    role: "Architect & Urban Designer",
    rating: 5,
    comment: "The Apex Titanium Aviator is hands down the lightest, most comfortable frame I have owned in 15 years. The virtual AR try-on was remarkably accurate to real life!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    purchasedProduct: "Apex Titanium Aviator"
  },
  {
    id: 2,
    name: "Dr. Elena Rostova",
    role: "Senior Data Scientist",
    rating: 5,
    comment: "Working 10 hours in front of dual 4K monitors caused terrible eye strain until I bought the CyberShield Pro. The blue light block quality is phenomenal without yellowing color rendering.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    purchasedProduct: "CyberShield Pro Blue-Block"
  },
  {
    id: 3,
    name: "Sophia Martinez",
    role: "Fashion Editor",
    rating: 5,
    comment: "LUMEN & OPTIC delivers true luxury experience. The prescription customization wizard was so effortless, and my progressive lenses arrived perfectly calibrated within 4 days!",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    purchasedProduct: "Sienna Cat-Eye Noir"
  }
];

export const FAQS = [
  {
    question: "How do I submit my prescription for custom lenses?",
    answer: "During checkout or when adding a frame to your cart, click 'Add Prescription Lenses'. You can type in your Sphere (SPH), Cylinder (CYL), Axis, and Pupillary Distance (PD) values, or simply upload a picture of your optometrist's prescription slip."
  },
  {
    question: "What is Pupillary Distance (PD) and how do I measure it?",
    answer: "PD is the distance in millimeters between the centers of your pupils. It ensures the optical center of your lenses lines up directly in front of your eyes. You can find your PD on your prescription, or measure it using our online camera PD tool!"
  },
  {
    question: "What is your 30-Day Happiness Guarantee & Return Policy?",
    answer: "We offer 100% hassle-free 30-day returns on all frames and non-prescription eyewear. If your prescription lenses don't feel 100% crystal clear, our optical lab will remake them for FREE or grant a full refund."
  },
  {
    question: "How does the Virtual AR Try-On Studio work?",
    answer: "Click the 'Try Virtual Fitting' button on any product card or in our navigation. Grant temporary camera permission (or pick a sample face model) to see how the glasses scale, fit, and look on your face in real-time."
  },
  {
    question: "Are your blue light lenses prescription compatible?",
    answer: "Yes! All blue light filtering lenses can be crafted as non-prescription (0.00 power) for screen protection, or combined with single vision and progressive prescription power."
  }
];

export const PRESCRIPTION_GUIDE_DATA = {
  sph: "Sphere (SPH): Indicates the lens power measured in diopters, prescribed to correct nearsightedness (-) or farsightedness (+).",
  cyl: "Cylinder (CYL): Indicates lens power for astigmatism. If left blank, you have no astigmatism correction.",
  axis: "Axis: Describes the angle (1 to 180 degrees) of your astigmatism correction.",
  add: "Add (NV): Additional magnifying power added to the bottom part of progressive or bifocal lenses for reading.",
  pd: "Pupillary Distance (PD): Distance between the center of your pupils in millimeters, critical for lens optical alignment."
};

export const SIZE_GUIDE_DATA = [
  { size: "Small (S)", frameWidth: "125 - 132 mm", lensWidth: "46 - 49 mm", recommendation: "Ideal for narrower, petite faces & teenagers" },
  { size: "Medium (M)", frameWidth: "133 - 139 mm", lensWidth: "50 - 53 mm", recommendation: "Standard universal fit for ~80% of adults" },
  { size: "Large (L)", frameWidth: "140 - 148 mm", lensWidth: "54 - 58 mm", recommendation: "Designed for wider face structures & bold oversized styles" }
];
