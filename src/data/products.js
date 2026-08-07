export const products = [
  // --- OPTICAL (Eyeglasses) ---
  {
    id: "opt-1",
    category: "optical",
    subcategory: "prescription",
    name: "Classic Acetate Round",
    brand: "Titan Eye+",
    price: 9500,
    rating: 4.8,
    reviewsCount: 34,
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Elegant, hand-polished round eyeglasses crafted from premium cellulose acetate. Offers durable flexibility and timeless luxury appeal.",
    specs: {
      material: "Premium Cellulose Acetate",
      frameShape: "Round",
      lensType: "Prescription Compatible",
      weight: "18g"
    }
  },
  {
    id: "opt-2",
    category: "optical",
    subcategory: "reading",
    name: "Sleek Titanium Rectangular",
    brand: "Ray-Ban",
    price: 14500,
    rating: 4.9,
    reviewsCount: 52,
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Ultra-lightweight titanium reading glasses. Perfect for long hours of reading or close work with zero pressure on your nose bridge.",
    specs: {
      material: "Pure Titanium",
      frameShape: "Rectangular",
      lensType: "Single Vision Reading Lenses",
      weight: "12g"
    }
  },
  {
    id: "opt-3",
    category: "optical",
    subcategory: "computer",
    name: "BlueShield Pro Computer Frames",
    brand: "Oakley",
    price: 11500,
    rating: 4.7,
    reviewsCount: 78,
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Specially designed blue light blocking glasses with yellow-tinted lenses to prevent digital eye strain during long gaming or work sessions.",
    specs: {
      material: "TR90 Flexible Polymer",
      frameShape: "Square",
      lensType: "Blue Light Blocking HMC",
      weight: "15g"
    }
  },
  {
    id: "opt-4",
    category: "optical",
    subcategory: "blue-light",
    name: "Classic Matte Clubmaster",
    brand: "Vogue",
    price: 8900,
    rating: 4.6,
    reviewsCount: 22,
    image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Subtle browline design with built-in premium blue light filters. Protect your eyes in style from screens and fluorescent lighting.",
    specs: {
      material: "Acetate and Metal Alloy",
      frameShape: "Clubmaster",
      lensType: "Anti-Reflective Blue Light Protection",
      weight: "20g"
    }
  },
  {
    id: "opt-5",
    category: "optical",
    subcategory: "kids",
    name: "FlexiGuard Kids Eyeglasses",
    brand: "Fastrack",
    price: 5900,
    rating: 4.5,
    reviewsCount: 15,
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Extremely flexible, virtually unbreakable frames for children. Hypoallergenic, comfortable, and comes with an adjustable strap.",
    specs: {
      material: "Silicon & Flexible TR90",
      frameShape: "Oval",
      lensType: "Impact-Resistant Polycarbonate",
      weight: "10g"
    }
  },

  // --- SUNGLASSES ---
  {
    id: "sun-1",
    category: "sunglasses",
    subcategory: "men",
    name: "Aviator Classic Polarized",
    brand: "Ray-Ban",
    price: 16900,
    rating: 4.9,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1513909894411-7d7e04c28eca?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1513909894411-7d7e04c28eca?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800"
    ],
    description: "The classic pilot silhouette that defined a generation. Features premium gold metal plating and G-15 green polarized lenses.",
    specs: {
      material: "Gold-Plated Monel Metal",
      frameShape: "Pilot",
      lensType: "Polarized UV400",
      weight: "24g"
    }
  },
  {
    id: "sun-2",
    category: "sunglasses",
    subcategory: "women",
    name: "Oversized Cat-Eye Grace",
    brand: "Gucci",
    price: 31500,
    rating: 4.8,
    reviewsCount: 65,
    image: "https://images.unsplash.com/photo-1583073527022-3a890532576b?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1583073527022-3a890532576b?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Stunning oversized cat-eye sunglasses featuring Gucci's signature gold interlocking G logo on the temples. A statement of ultimate luxury.",
    specs: {
      material: "Premium Bio-Acetate",
      frameShape: "Cat-Eye",
      lensType: "Gradient UV400",
      weight: "28g"
    }
  },
  {
    id: "sun-3",
    category: "sunglasses",
    subcategory: "sports",
    name: "Radar EV Path Performance",
    brand: "Oakley",
    price: 18900,
    rating: 4.9,
    reviewsCount: 89,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800"
    ],
    description: "High-performance sports shield sunglasses with Prizm lens technology designed to enhance color, contrast, and detail.",
    specs: {
      material: "O Matter Stress-Resistant",
      frameShape: "Shield",
      lensType: "Prizm Road / Sports Lens",
      weight: "30g"
    }
  },
  {
    id: "sun-4",
    category: "sunglasses",
    subcategory: "luxury",
    name: "DiorSignature Butterfly",
    brand: "Dior",
    price: 35900,
    rating: 5.0,
    reviewsCount: 18,
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Exquisite French-designed butterfly frames with Christian Dior Paris signature logo. The height of haute couture accessory styling.",
    specs: {
      material: "Acetate",
      frameShape: "Butterfly",
      lensType: "Grey UV Protection",
      weight: "26g"
    }
  },
  {
    id: "sun-5",
    category: "sunglasses",
    subcategory: "polarized",
    name: "Highway Aviator Polarized",
    brand: "Police",
    price: 13900,
    rating: 4.7,
    reviewsCount: 44,
    image: "https://images.unsplash.com/photo-1608319717283-acda1fe71517?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1608319717283-acda1fe71517?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Sleek double-bridge metal aviators with highly efficient polarized lenses to reduce glare from water, snow, and wet roads.",
    specs: {
      material: "Stainless Steel",
      frameShape: "Double-Bridge Aviator",
      lensType: "Polarized High Contrast",
      weight: "22g"
    }
  },

  // --- CONTACT LENSES ---
  {
    id: "len-1",
    category: "contact-lenses",
    subcategory: "daily",
    name: "Acuvue Moist 1-Day (90 Pack)",
    brand: "Acuvue",
    price: 6900,
    rating: 4.8,
    reviewsCount: 220,
    image: "https://images.unsplash.com/photo-1590156221122-c7b3cb3d215b?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1590156221122-c7b3cb3d215b?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Daily disposable lenses featuring Lacreon technology for premium moisture locking, keeping your eyes fresh all day.",
    specs: {
      waterContent: "58%",
      material: "Etafilcon A Hydrogel",
      duration: "Daily Disposable",
      uvProtection: "Class 2 UV Filter"
    }
  },
  {
    id: "len-2",
    category: "contact-lenses",
    subcategory: "monthly",
    name: "Biofinity Monthly (6 Pack)",
    brand: "CooperVision",
    price: 4900,
    rating: 4.7,
    reviewsCount: 165,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Premium monthly silicone hydrogel lenses with high oxygen permeability, allowing your eyes to breathe naturally.",
    specs: {
      waterContent: "48%",
      material: "Comfilcon A Silicone Hydrogel",
      duration: "Monthly Wear",
      breathability: "160 Dk/t"
    }
  },
  {
    id: "len-3",
    category: "contact-lenses",
    subcategory: "colored",
    name: "Air Optix Colors (2 Pack)",
    brand: "Alcon",
    price: 3500,
    rating: 4.6,
    reviewsCount: 95,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Stunning, comfortable monthly color contacts. Offers beautiful blend of colors for a natural eye color transformation.",
    specs: {
      waterContent: "33%",
      material: "Lotrafilcon B Silicone Hydrogel",
      duration: "Monthly Disposable",
      availableColors: "Pure Hazel, Gemstone Green, Brilliant Blue, Sterling Gray"
    }
  },

  // --- IMPORTED ATTAR ---
  {
    id: "att-1",
    category: "attar",
    subcategory: "oud",
    name: "Royal Cambodian Oud Attar",
    brand: "Arabic Collection",
    price: 7500,
    rating: 4.9,
    reviewsCount: 48,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800"
    ],
    description: "100% pure alcohol-free oil concentrate of aged Cambodian Oud. Deep, woody, sweet, and highly balsamic fragrance profile that lasts for over 24 hours.",
    specs: {
      concentration: "100% Concentrated Oil (Attar)",
      volume: "12ml (Tola)",
      notes: "Cambodian Oud, Sweet Amber, Woody Incense",
      origin: "Cambodia / Dubai"
    }
  },
  {
    id: "att-2",
    category: "attar",
    subcategory: "rose",
    name: "Taifi Rose & Sandalwood",
    brand: "Arabic Collection",
    price: 5500,
    rating: 4.8,
    reviewsCount: 31,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800"
    ],
    description: "An elegant blend of fresh Taifi roses distilled into premium Mysore sandalwood oil. A classic royal combination that is floral yet creamy.",
    specs: {
      concentration: "Pure Fragrance Oil",
      volume: "12ml (Tola)",
      notes: "Taifi Rose, Geranium, Mysore Sandalwood, White Musk",
      origin: "Saudi Arabia"
    }
  },
  {
    id: "att-3",
    category: "attar",
    subcategory: "musk",
    name: "Kashmiri Musk Gazelle",
    brand: "Arabic Collection",
    price: 6500,
    rating: 4.7,
    reviewsCount: 26,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Deep, dark, and highly captivating Kashmiri Musk. Rich, warm, animalic with spicy undertones. Extremely long-lasting and traditional.",
    specs: {
      concentration: "Pure Perfume Oil",
      volume: "6ml (Half Tola)",
      notes: "Dark Deer Musk, Warm Spices, Earthy Patchouli",
      origin: "Kashmir"
    }
  },
  {
    id: "att-4",
    category: "attar",
    subcategory: "arabic",
    name: "Majmua Royal Blend",
    brand: "Arabic Collection",
    price: 4500,
    rating: 4.6,
    reviewsCount: 55,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A famous proprietary blend of Kewda, Vetiver, and Rose in a sandalwood base. Deeply calming, earthy, green, and exotic.",
    specs: {
      concentration: "Concentrated Perfume Oil",
      volume: "12ml (Tola)",
      notes: "Vetiver (Khus), Kewda (Pandanus), Rose, Earthy Clay",
      origin: "India / Middle East"
    }
  },

  // --- PERFUMES ---
  {
    id: "per-1",
    category: "perfumes",
    subcategory: "men",
    name: "Bleu de Chanel Eau de Parfum",
    brand: "Chanel",
    price: 12900,
    rating: 4.9,
    reviewsCount: 230,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800"
    ],
    description: "An ode to masculine freedom expressed in a woody aromatic fragrance with a captivating trail. A timeless scent housed in a bottle of deep and mysterious blue.",
    specs: {
      type: "Eau de Parfum (EDP)",
      volume: "100ml",
      notes: "Grapefruit, Mint, Cedar, Sandalwood, Ginger",
      gender: "Men"
    }
  },
  {
    id: "per-2",
    category: "perfumes",
    subcategory: "women",
    name: "Miss Dior Blooming Bouquet",
    brand: "Dior",
    price: 11900,
    rating: 4.8,
    reviewsCount: 185,
    image: "https://images.unsplash.com/photo-1588405748373-122b2321bc31?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1588405748373-122b2321bc31?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A floral declaration of love. Miss Dior Blooming Bouquet is a fresh and sparkling composition fashioned like a dress embroidered with a thousand flowers.",
    specs: {
      type: "Eau de Toilette (EDT)",
      volume: "100ml",
      notes: "Damask Rose, Peony, Calabrian Bergamot, White Musk",
      gender: "Women"
    }
  },
  {
    id: "per-3",
    category: "perfumes",
    subcategory: "luxury",
    name: "Wood Sage & Sea Salt Cologne",
    brand: "Jo Malone",
    price: 12500,
    rating: 4.7,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1528740564265-22118db86946?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1528740564265-22118db86946?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Escape the everyday along the windswept shore. Waves breaking white, the air fresh with sea salt and spray. Alive with the mineral scent of rugged cliffs.",
    specs: {
      type: "Cologne",
      volume: "100ml",
      notes: "Ambrette Seeds, Sea Salt, Sage, Red Algae",
      gender: "Unisex"
    }
  },
  {
    id: "per-4",
    category: "perfumes",
    subcategory: "gift-sets",
    name: "Luxury Fragrance Wardrobe",
    brand: "Jo Malone",
    price: 16900,
    rating: 4.9,
    reviewsCount: 42,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A curated collection of Jo Malone's most celebrated fragrances. Includes five travel-sized colognes perfect for layering, gifting, or discovering new signatures.",
    specs: {
      type: "Luxury Gift Set",
      volume: "5 x 9ml Colognes",
      scents: "Lime Basil & Mandarin, English Pear & Freesia, Wild Bluebell, Wood Sage & Sea Salt, Blackberry & Bay",
      packaging: "Signature Cream and Black Box"
    }
  },
  {
    id: "clone-1",
    category: "perfumes",
    subcategory: "clones",
    name: "MEHAKAANA Creed Aventus Impression",
    brand: "MEHAKAANA",
    price: 3900,
    rating: 4.8,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800"
    ],
    description: "An exceptional, highly concentrated perfume impression inspired by Creed Aventus. Features notes of fresh pineapple, blackcurrant, birch, and rich ambergris.",
    specs: {
      type: "Eau de Parfum (Extrait Concentration)",
      volume: "50ml",
      inspiration: "Creed Aventus",
      notes: "Pineapple, Birch, Musk, Patchouli"
    }
  },
  {
    id: "clone-2",
    category: "perfumes",
    subcategory: "clones",
    name: "MEHAKAANA Baccarat Rouge 540 Impression",
    brand: "MEHAKAANA",
    price: 3900,
    rating: 4.9,
    reviewsCount: 57,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Breathtaking amber-floral fragrance clone inspired by Baccarat Rouge 540. Luminous saffron, jasmine, and woody ambergris wrap you in absolute luxury.",
    specs: {
      type: "Eau de Parfum (Impressions Collection)",
      volume: "50ml",
      inspiration: "Baccarat Rouge 540",
      notes: "Saffron, Jasmine, Cedarwood, Ambergris"
    }
  },
  {
    id: "clone-3",
    category: "perfumes",
    subcategory: "clones",
    name: "MEHAKAANA Tom Ford Lost Cherry Impression",
    brand: "MEHAKAANA",
    price: 3900,
    rating: 4.7,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A full-bodied, luscious cherry impression inspired by Tom Ford Lost Cherry. Blends ripe black cherry, almond liqueur, and Turkish rose.",
    specs: {
      type: "Eau de Parfum (Impressions Collection)",
      volume: "50ml",
      inspiration: "Tom Ford Lost Cherry",
      notes: "Black Cherry, Bitter Almond, Plum, Roasted Tonka"
    }
  }
];
