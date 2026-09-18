// Catalog Data for LUMEN & OPTIC Atelier & Eyewear House
// Curated Luxury Optical & Sunglass Collections

export const HERO_SLIDES = [
  {
    id: 1,
    title: "Architectural Precision",
    subtitle: "Spring / Summer 2026 Collection",
    tag: "ATELIER EDITION",
    description: "Engineered with ultra-lightweight aerospace beta-titanium frames for a timeless silhouette and all-day comfort.",
    buttonText: "Discover Optical Collection",
    buttonCategory: "gents",
    bgGradient: "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80",
    badge: "Ultra-Lightweight 9g Frame"
  },
  {
    id: 2,
    title: "Chic & Uncompromising",
    subtitle: "High Fashion & UV Shield",
    tag: "PREMIUM BIO-ACETATE",
    description: "Statement oversized cat-eye sunglasses featuring hand-polished organic acetate and certified 100% UV400 protective lenses.",
    buttonText: "Shop Atelier Sunglasses",
    buttonCategory: "ladies",
    bgGradient: "linear-gradient(135deg, rgba(55, 19, 32, 0.85) 0%, rgba(15, 23, 42, 0.9) 100%)",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80",
    badge: "100% UV400 Polarized Optics"
  },
  {
    id: 3,
    title: "The Screen Atelier",
    subtitle: "Anti-Fatigue Optical Defense",
    tag: "BLUE-LIGHT DEFENSE",
    description: "Precision CR-39 lenses filtering 455nm high-energy blue light without yellowish chromatic distortion. Tailored for prolonged digital focus.",
    buttonText: "Explore Screen Lenses",
    buttonCategory: "blue-light",
    bgGradient: "linear-gradient(135deg, rgba(20, 30, 48, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=80",
    badge: "Multi-Coat Anti-Reflective"
  },
  {
    id: 4,
    title: "Virtual Fitting Studio",
    subtitle: "Precision Frame Mirror",
    tag: "INTERACTIVE FIT",
    description: "Experience true millimeter scale fitting directly from your device before placing your bespoke prescription order.",
    buttonText: "Open Fitting Mirror",
    buttonAction: "ar-studio",
    bgGradient: "linear-gradient(135deg, rgba(38, 28, 14, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=80",
    badge: "True Millimeter Proportion"
  }
];

export const CATEGORIES = [
  { id: "all", name: "All Eyewear", icon: "Glasses" },
  { id: "gents", name: "Men's Atelier", icon: "User", description: "Structured, refined & architectural silhouettes" },
  { id: "ladies", name: "Women's Atelier", icon: "UserCheck", description: "Elegant cat-eye, subtle butterfly & delicate wire styles" },
  { id: "kids", name: "Youth Collection", icon: "Smile", description: "Durable, flexible & hypoallergenic frames for children" },
  { id: "prescription", name: "Prescription Optics", icon: "Eye", description: "Custom single-vision, bifocal & progressive lenses" },
  { id: "sunglasses", name: "Luxury Sunglasses", icon: "Sun", description: "Polarized UV400 shades with hydrophobic anti-glare" },
  { id: "blue-light", name: "Screen Blockers", icon: "Laptop", description: "Anti-fatigue precision optics for digital professionals" }
];

export const FRAME_SHAPES = [
  "Aviator", "Wayfarer", "Round", "Square", "Cat-Eye", "Oval", "Geometric",
  "Clubmaster", "Rimless", "Hexagonal", "Octagonal", "Shield"
];

export const FRAME_MATERIALS = [
  "Japanese Titanium", "Italian Acetate", "Stainless Steel", "TR90 Flexible Polymer", "Eco Wood Composite"
];

export const COLOR_OPTIONS = [
  { name: "Matte Black", hex: "#1e1e1e" },
  { name: "Tortoise Shell", hex: "#5c3a21" },
  { name: "Rose Gold", hex: "#b76e79" },
  { name: "Gunmetal Gray", hex: "#4a4e51" },
  { name: "Crystal Clear", hex: "#e0e7ff" },
  { name: "Champagne Gold", hex: "#d4af37" },
  { name: "Forest Green", hex: "#064e3b" },
  { name: "Midnight Navy", hex: "#1e3a8a" }
];

export const PRODUCTS = [
  {
    id: "lumen-01",
    name: "Apex Titanium Aviator",
    tagline: "Ultra-lightweight beta-titanium aviator with dual-bridge architecture",
    price: 18500,
    originalPrice: 22000,
    rating: 4.9,
    reviewsCount: 128,
    category: "gents",
    secondaryCategories: ["prescription", "sunglasses"],
    gender: "Gents",
    frameShape: "Aviator",
    material: "Aerospace Beta-Titanium",
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
    description: "The Apex Aviator combines aerospace-grade beta-titanium with precision hand-finished bevels. Weighing just 14 grams, it features hypoallergenic silicone nose pads and custom five-barrel spring hinges designed for decades of daily wear.",
    specs: {
      lensWidth: "54 mm",
      bridgeWidth: "18 mm",
      templeLength: "145 mm",
      frameWidth: "140 mm",
      lensHeight: "46 mm",
      hingeType: "Custom 5-Barrel Precision Spring Hinge",
      lensMaterial: "CR-39 Optical Clarity with Hydrophobic Coat",
      uvRating: "100% UV400 Protection"
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
    tagline: "Hand-polished organic bio-acetate with sculpted beveled browline",
    price: 15900,
    originalPrice: 19500,
    rating: 4.8,
    reviewsCount: 94,
    category: "ladies",
    secondaryCategories: ["sunglasses", "prescription"],
    gender: "Ladies",
    frameShape: "Cat-Eye",
    material: "Hand-Polished Bio-Acetate",
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
    description: "Crafted from cured organic cellulose acetate by historical artisans in Varese, Italy. Sienna features hand-carved chamfered edges, custom core wires, and deep high-gloss hand polishing for unmatched luminosity.",
    specs: {
      lensWidth: "52 mm",
      bridgeWidth: "17 mm",
      templeLength: "140 mm",
      frameWidth: "136 mm",
      lensHeight: "44 mm",
      hingeType: "Custom Embedded Anchor Hinge",
      lensMaterial: "Carl Zeiss Optical Gradient CR-39",
      uvRating: "100% UV400 Protection"
    },
    arStyle: {
      type: "cateye",
      borderColor: "#1e1e1e",
      lensTint: "rgba(15, 23, 42, 0.5)"
    }
  },
  {
    id: "lumen-03",
    name: "Strata Screen Optic",
    tagline: "Ergonomic anti-fatigue screen glasses with multi-layer AR coating",
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
    description: "Engineered for engineers, creative directors, and professionals logging long display hours. Features multi-coat vacuum-deposited anti-reflective treatment that selectively reflects harmful 415-455nm wavelengths while preserving true-to-life color accuracy.",
    specs: {
      lensWidth: "51 mm",
      bridgeWidth: "19 mm",
      templeLength: "142 mm",
      frameWidth: "138 mm",
      lensHeight: "42 mm",
      hingeType: "Integrated Flex Hinges (180° Range)",
      lensMaterial: "Multi-Coat Blue-Block CR-39",
      uvRating: "100% UV400 & HEV Blue Shield"
    },
    arStyle: {
      type: "square",
      borderColor: "#1e3a8a",
      lensTint: "rgba(14, 116, 144, 0.25)"
    }
  },
  {
    id: "lumen-04",
    name: "Kuro Wayfarer Heritage",
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
    description: "A heritage mid-century wayfarer profile refreshed with hand-sculpted ergonomic nose pads. Handcrafted from premium 8mm organic cellulose acetate sheets, delivering a substantial feel with refined balance.",
    specs: {
      lensWidth: "53 mm",
      bridgeWidth: "20 mm",
      templeLength: "145 mm",
      frameWidth: "142 mm",
      lensHeight: "43 mm",
      hingeType: "Reinforced 5-Barrel Spring Hinge",
      lensMaterial: "Premium Optical Grade CR-39",
      uvRating: "100% UV400 Protection"
    },
    arStyle: {
      type: "wayfarer",
      borderColor: "#5c3a21",
      lensTint: "rgba(30, 41, 59, 0.3)"
    }
  },
  {
    id: "lumen-05",
    name: "Aura Minimalist Round",
    tagline: "Featherweight stainless steel wire frame with champagne finish",
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
    description: "Inspired by mid-century intellectual aesthetics, the Aura frame is formed from ultra-thin Japanese surgical stainless steel with spring-loaded silicone nose pads for an imperceptible wear on the face.",
    specs: {
      lensWidth: "49 mm",
      bridgeWidth: "21 mm",
      templeLength: "140 mm",
      frameWidth: "132 mm",
      lensHeight: "47 mm",
      hingeType: "Micro-Screw Precision Optical Hinge",
      lensMaterial: "High-Index 1.60 Ultra-Clear Lenses",
      uvRating: "100% UV400 Protection"
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
    tagline: "Medical-grade flexible TR90 polymer specs for active children",
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
      { name: "Forest Green", hex: "#064e3b" },
      { name: "Rose Gold", hex: "#b76e79" }
    ],
    image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Constructed from BPA-free, hypoallergenic Swiss Grilamid TR90. Features 180-degree flexible spring joints and contoured non-slip silicone temple wraps designed to withstand active play without pinching.",
    specs: {
      lensWidth: "45 mm",
      bridgeWidth: "16 mm",
      templeLength: "125 mm",
      frameWidth: "120 mm",
      lensHeight: "36 mm",
      hingeType: "Screwless 180° Memory Hinge",
      lensMaterial: "Impact-Resistant Polycarbonate Safety Optics",
      uvRating: "100% UV400 Shield"
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
    tagline: "Architectural hexagonal wirework with high-contrast polarized lenses",
    price: 19500,
    originalPrice: 24000,
    rating: 4.92,
    reviewsCount: 114,
    category: "sunglasses",
    secondaryCategories: ["gents", "ladies"],
    gender: "Unisex",
    frameShape: "Geometric",
    material: "Japanese Titanium",
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
    description: "Defined by sharp geometric wire contouring and TAC polarized sun optics that eliminate road, water, and glare reflections. Hand-finished with etched coin-edge coin details along the rim.",
    specs: {
      lensWidth: "53 mm",
      bridgeWidth: "19 mm",
      templeLength: "145 mm",
      frameWidth: "139 mm",
      lensHeight: "45 mm",
      hingeType: "Precision German Barrel Hinge",
      lensMaterial: "TAC 9-Layer Polarized Sun Optics",
      uvRating: "100% UV400 Polarized"
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
    tagline: "Minimalist rimless silhouette with flexible beta-titanium bridge",
    price: 21500,
    originalPrice: 26000,
    rating: 4.85,
    reviewsCount: 73,
    category: "prescription",
    secondaryCategories: ["gents", "ladies"],
    gender: "Unisex",
    frameShape: "Oval",
    material: "Japanese Titanium",
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
    description: "For executives and purists who desire unobstructed peripheral sightlines. Weighing a negligible 9 grams, Veritas utilizes compression-mounted high-index lenses bonded to laser-cut Japanese beta-titanium temples.",
    specs: {
      lensWidth: "50 mm",
      bridgeWidth: "18 mm",
      templeLength: "140 mm",
      frameWidth: "134 mm",
      lensHeight: "38 mm",
      hingeType: "Pin-Bushed Frictionless Hinge",
      lensMaterial: "High-Index 1.67 Aspheric Optics",
      uvRating: "100% UV400 Protection"
    },
    arStyle: {
      type: "oval",
      borderColor: "#4a4e51",
      lensTint: "rgba(240, 240, 240, 0.2)"
    }
  },
  {
    id: "lumen-09",
    name: "Veritas Round Gold Specs",
    tagline: "Filigree-engraved optical frame for tailored prescription lenses",
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
    description: "Hand-finished circular optical silhouette accented with microscopic filigree engravings along the bridge and temple core. Hand-balanced for optimal weight distribution across the nasal ridge.",
    specs: {
      lensWidth: "48 mm",
      bridgeWidth: "20 mm",
      templeLength: "140 mm",
      frameWidth: "130 mm",
      lensHeight: "45 mm",
      hingeType: "Teflon-Coated Smooth Screw Hinge",
      lensMaterial: "Diamond-Clear CR-39 Prescription Optics",
      uvRating: "100% UV400 Protection"
    },
    arStyle: {
      type: "round",
      borderColor: "#d4af37",
      lensTint: "rgba(212, 175, 55, 0.15)"
    }
  },
  {
    id: "lumen-10",
    name: "Vogue Riviera Cat-Eye",
    tagline: "Gradient rose-tinted Mediterranean statement sunglasses",
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
    description: "Evoking mid-century European Riviera glamour, featuring gently sculpted upswept browlines and gradient rose lenses with back-surface anti-reflective treatment to banish glare.",
    specs: {
      lensWidth: "54 mm",
      bridgeWidth: "16 mm",
      templeLength: "142 mm",
      frameWidth: "138 mm",
      lensHeight: "46 mm",
      hingeType: "Custom Triple-Riveted Hinge",
      lensMaterial: "Gradient Flash Rose CR-39 Sun Optics",
      uvRating: "100% UV400 Protection"
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
    name: "Hamza Malik",
    role: "Senior Product Designer",
    city: "Lahore, PK",
    rating: 5,
    comment: "The Apex Titanium Aviator is comfortably the finest frame I have worn. The build quality matches frames triple the price in London boutiques, and the optical prescription was spot on.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    purchasedProduct: "Apex Titanium Aviator"
  },
  {
    id: 2,
    name: "Zara Qureshi",
    role: "Architect & Partner",
    city: "Islamabad, PK",
    rating: 5,
    comment: "I spend entire days drafting CAD schematics and reviewing render passes. The Strata blue light lenses eliminated my end-of-day eye fatigue completely without distorting my color perception.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    purchasedProduct: "Strata Screen Optic"
  },
  {
    id: 3,
    name: "Marcus Sterling",
    role: "Creative Director",
    city: "London, UK",
    rating: 5,
    comment: "The hand-beveled Italian acetate on the Sienna Cat-Eye Noir feels substantial and luxurious. The order tracking updates kept me informed every step of the glazing process. Outstanding craftsmanship.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    purchasedProduct: "Sienna Cat-Eye Noir"
  }
];

export const FACE_SHAPE_RECOMMENDATIONS = [
  {
    shape: "Oval Face",
    description: "Balanced proportions with gently rounded jawline and forehead.",
    recommendedStyles: ["Square", "Wayfarer", "Aviator", "Geometric"],
    tip: "Most frame geometries look flattering on oval face contours. Bold square or geometric shapes add structured definition."
  },
  {
    shape: "Round Face",
    description: "Equal width and length with soft, curved cheekbones and jaw.",
    recommendedStyles: ["Square", "Wayfarer", "Cat-Eye", "Geometric"],
    tip: "Angular and rectangular frames contrast softer contours and visually elongate the face."
  },
  {
    shape: "Square Face",
    description: "Strong, prominent jawline with broad forehead and angular cheekbones.",
    recommendedStyles: ["Round", "Oval", "Aviator", "Rimless"],
    tip: "Curved, circular, and wire rims soften strong angular features and balance jawline width."
  },
  {
    shape: "Heart Face",
    description: "Broader forehead tapering down to a delicate, pointed chin.",
    recommendedStyles: ["Cat-Eye", "Round", "Rimless", "Clubmaster"],
    tip: "Bottom-heavy or rimless frames balance forehead width and draw attention to the eyes."
  },
  {
    shape: "Diamond Face",
    description: "Narrow forehead and jawline with dramatic high cheekbones.",
    recommendedStyles: ["Cat-Eye", "Oval", "Clubmaster", "Round"],
    tip: "Frames with distinctive browlines or gentle curves accentuate cheekbone structure."
  }
];

export const FAQS = [
  {
    question: "How do I submit my prescription for custom lenses?",
    answer: "During checkout or when adding a frame to your bag, click 'Add Prescription Lenses'. You can enter your Sphere (SPH), Cylinder (CYL), Axis, and Pupillary Distance (PD) values, or upload an image of your optometrist's prescription slip."
  },
  {
    question: "What is Pupillary Distance (PD) and how is it measured?",
    answer: "Pupillary Distance is the distance in millimeters between the centers of your pupils. It ensures the optical center of your lenses lines up precisely with your visual axis. You can find it on your prescription or use our optical guide."
  },
  {
    question: "What is your 30-Day Happiness Guarantee & Optical Warranty?",
    answer: "We offer hassle-free 30-day returns on all frames. If your prescription lenses do not feel 100% crystal clear, our optical lab will remake them at no charge or provide a full refund."
  },
  {
    question: "How does the Virtual Fitting Studio work?",
    answer: "Launch the Virtual Fitting Mirror on any product card or in navigation. You can grant temporary camera permission to test proportional sizing live on your face, or toggle sample face models."
  },
  {
    question: "Are your blue light screen lenses prescription compatible?",
    answer: "Yes! All blue light screen lenses can be crafted as non-prescription (plano 0.00) for daily digital work, or integrated with your custom single-vision or progressive prescription powers."
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
  { size: "Small (S)", frameWidth: "125 - 132 mm", lensWidth: "46 - 49 mm", recommendation: "Ideal for narrower, petite facial structures & youth" },
  { size: "Medium (M)", frameWidth: "133 - 139 mm", lensWidth: "50 - 53 mm", recommendation: "Standard universal fit for ~80% of adult face shapes" },
  { size: "Large (L)", frameWidth: "140 - 148 mm", lensWidth: "54 - 58 mm", recommendation: "Designed for broader jawlines & statement oversized aesthetics" }
];
