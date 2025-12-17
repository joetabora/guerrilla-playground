export type CollectionHandle =
  | "tech-gadgets"
  | "streetwear"
  | "home-decor"
  | "everyday-carry";

export interface Collection {
  handle: CollectionHandle;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  seo: {
    title: string;
    description: string;
  };
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g. "Size" or "Color"
  options: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  badge?: "New" | "Best Seller" | "Limited" | "Trending";
  collectionHandle: CollectionHandle;
  images: ProductImage[];
  variants?: ProductVariant[];
  tags: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  shippingEstimate: string;
  features: string[];
  seo: {
    title: string;
    description: string;
  };
}

export const collections: Collection[] = [
  {
    handle: "tech-gadgets",
    name: "Tactical Tech & Creator Gadgets",
    tagline: "Lean, mean, creator machine gear.",
    description:
      "Studio-ready gadgets, tactical lighting, and creator essentials that hit harder than big-box electronics.",
    heroImage:
      "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1600",
    seo: {
      title: "Tech Gadgets & Creator Gear | Guerrilla Social Club",
      description:
        "Shop tactical tech, RGB lighting, and creator-approved desk setups curated by Guerrilla Social Club.",
    },
  },
  {
    handle: "streetwear",
    name: "Night Shift Streetwear",
    tagline: "Built for late nights and loud playlists.",
    description:
      "Statement streetwear, reflective details, and stealth silhouettes for creators who clock in after dark.",
    heroImage:
      "https://images.pexels.com/photos/7671168/pexels-photo-7671168.jpeg?auto=compress&cs=tinysrgb&w=1600",
    seo: {
      title: "Streetwear for Creators & Night Owls | Guerrilla Social Club",
      description:
        "Level up your fit with hoodies, cargos, and streetwear curated for the creator class.",
    },
  },
  {
    handle: "home-decor",
    name: "Neon Home & Desk",
    tagline: "Turn any room into a content set.",
    description:
      "Neon signs, ambient lighting, and decor that make your space look as good on camera as it does IRL.",
    heroImage:
      "https://images.pexels.com/photos/3166817/pexels-photo-3166817.jpeg?auto=compress&cs=tinysrgb&w=1600",
    seo: {
      title: "Neon Room & Desk Decor | Guerrilla Social Club",
      description:
        "Build a studio-worthy setup with neon decor, RGB backlighting, and aesthetic room upgrades.",
    },
  },
  {
    handle: "everyday-carry",
    name: "Everyday Carry & Utility",
    tagline: "Dialed-in carry for chaotic days.",
    description:
      "Sling bags, organizers, and small-but-mighty tools built for creators bouncing between shoots, cafes, and clubs.",
    heroImage:
      "https://images.pexels.com/photos/4488771/pexels-photo-4488771.jpeg?auto=compress&cs=tinysrgb&w=1600",
    seo: {
      title: "Everyday Carry Essentials | Guerrilla Social Club",
      description:
        "Keep your gear tight with crossbody bags, organizers, and compact tools for everyday carry.",
    },
  },
];

export const products: Product[] = [
  {
    id: "neo-rig-desk-light",
    slug: "neo-rig-desk-light",
    name: "NEO-RIG Desk Light Bar",
    subtitle: "Edge-lit RGB light for creator desks",
    description:
      "The NEO-RIG Desk Light Bar throws soft, cinematic light across your setup without hogging screen space. Dial in vivid neons or chill white tones in seconds.",
    price: 89,
    compareAtPrice: 129,
    badge: "Best Seller",
    collectionHandle: "tech-gadgets",
    images: [
      {
        src: "https://images.pexels.com/photos/7238759/pexels-photo-7238759.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "RGB desk lighting around a gaming setup",
      },
      {
        src: "https://images.pexels.com/photos/7915355/pexels-photo-7915355.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Creator desk with neon monitor light bar",
      },
    ],
    variants: [
      {
        id: "color",
        name: "Color",
        options: ["Matte Black", "Gunmetal", "White"],
      },
    ],
    tags: ["desk setup", "rgb", "lighting", "creator"],
    rating: 4.8,
    reviewCount: 187,
    inStock: true,
    shippingEstimate: "Ships in 3–7 business days from US or partner warehouses.",
    features: [
      "Edge-lit LED bar with low-glare diffusion",
      "Preset neon modes tuned for camera sensors",
      "USB-C powered with inline brightness controls",
      "Mounts above or below your monitor with included hardware",
    ],
    seo: {
      title: "NEO-RIG RGB Desk Light Bar | Guerrilla Social Club",
      description:
        "Level up your desk setup with the NEO-RIG RGB Desk Light Bar – cinematic lighting for streaming, editing, and late-night sessions.",
    },
  },
  {
    id: "signal-noise-strip",
    slug: "signal-noise-rgb-strip",
    name: "SIGNAL / NOISE RGB Strip Kit",
    subtitle: "Neon perimeter glow for walls, desks, and rigs",
    description:
      "A flexible RGB LED strip kit with adhesive backing and corner-safe connectors so you can trace out frames, shelves, and setups without dead zones.",
    price: 59,
    compareAtPrice: 79,
    badge: "Trending",
    collectionHandle: "home-decor",
    images: [
      {
        src: "https://images.pexels.com/photos/3166816/pexels-photo-3166816.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Neon LED strip lighting behind a monitor",
      },
    ],
    variants: [
      {
        id: "length",
        name: "Length",
        options: ["2m", "3m", "5m"],
      },
    ],
    tags: ["rgb", "led strip", "room decor"],
    rating: 4.7,
    reviewCount: 132,
    inStock: true,
    shippingEstimate: "Most US orders arrive in 7–12 business days.",
    features: [
      "Cut-to-fit segments with marked cut points",
      "Music-reactive and scene modes",
      "Adhesive backing designed for painted walls and desks",
      "Remote + app control (where supported)",
    ],
    seo: {
      title: "SIGNAL / NOISE RGB Strip Kit | Guerrilla Social Club",
      description:
        "Wrap your setup in neon with the SIGNAL / NOISE RGB LED Strip Kit – perimeter glow for desks, shelves, and walls.",
    },
  },
  {
    id: "shadow-ops-hoodie",
    slug: "shadow-ops-reflective-hoodie",
    name: "SHADOW OPS Reflective Hoodie",
    subtitle: "Stealth black by day, reflective flex by night",
    description:
      "An oversized midweight hoodie with reflective ink hits that snap under camera flash and streetlights.",
    price: 79,
    compareAtPrice: 99,
    badge: "Limited",
    collectionHandle: "streetwear",
    images: [
      {
        src: "https://images.pexels.com/photos/6311659/pexels-photo-6311659.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Person in a black streetwear hoodie under neon lights",
      },
    ],
    variants: [
      {
        id: "size",
        name: "Size",
        options: ["S", "M", "L", "XL", "2XL"],
      },
    ],
    tags: ["hoodie", "streetwear", "reflective"],
    rating: 4.9,
    reviewCount: 92,
    inStock: true,
    shippingEstimate: "Made-to-order, usually ships in 5–9 business days.",
    features: [
      "Soft brushed interior with midweight feel",
      "Drop-shoulder, slightly oversized fit",
      "Reflective front and back prints",
      "Double-stitched cuffs and hem",
    ],
    seo: {
      title: "SHADOW OPS Reflective Hoodie | Guerrilla Social Club",
      description:
        "Turn heads under city lights with the SHADOW OPS Reflective Hoodie – stealth black streetwear with reflective ink.",
    },
  },
  {
    id: "after-hours-desk-mat",
    slug: "after-hours-desk-mat",
    name: "AFTER HOURS Extended Desk Mat",
    subtitle: "Soft-landing mat for keys, clicks, and cold brew",
    description:
      "A heavy, edge-stitched desk mat with a low-profile neon gradient that frames your keyboard, mouse, and mic arm.",
    price: 49,
    compareAtPrice: 69,
    badge: "Best Seller",
    collectionHandle: "home-decor",
    images: [
      {
        src: "https://images.pexels.com/photos/7238739/pexels-photo-7238739.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Keyboard and mouse on a large desk mat with RGB lighting",
      },
    ],
    variants: [
      {
        id: "size",
        name: "Size",
        options: ["900 x 400mm", "1000 x 500mm"],
      },
    ],
    tags: ["desk mat", "mouse pad", "desk setup"],
    rating: 4.8,
    reviewCount: 154,
    inStock: true,
    shippingEstimate: "Typically arrives in 7–14 business days.",
    features: [
      "Low-friction woven surface for mouse control",
      "Anti-slip rubber base",
      "Reinforced edge stitching to prevent fray",
      "Subtle neon gradient print",
    ],
    seo: {
      title: "AFTER HOURS Extended Desk Mat | Guerrilla Social Club",
      description:
        "Lock in your creator setup with the AFTER HOURS extended desk mat – neon-framed protection for your whole rig.",
    },
  },
  {
    id: "signal-jammer-sling",
    slug: "signal-jammer-crossbody-sling",
    name: "SIGNAL JAMMER Crossbody Sling",
    subtitle: "Everyday carry bag for creators on the move",
    description:
      "A compact, body-hugging sling with just enough structure to keep cameras, chargers, and cards from collapsing into chaos.",
    price: 64,
    compareAtPrice: 84,
    badge: "Trending",
    collectionHandle: "everyday-carry",
    images: [
      {
        src: "https://images.pexels.com/photos/4488773/pexels-photo-4488773.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Person wearing a black crossbody sling bag",
      },
    ],
    variants: [
      {
        id: "color",
        name: "Color",
        options: ["Onyx Black", "Concrete Gray"],
      },
    ],
    tags: ["sling bag", "edc", "bag"],
    rating: 4.7,
    reviewCount: 73,
    inStock: true,
    shippingEstimate: "Ships in 5–10 business days depending on region.",
    features: [
      "Padded main pocket fits compact camera or console",
      "Front quick-access pocket for cards and keys",
      "Hidden back pocket for passport or cash",
      "Adjustable strap for crossbody or shoulder carry",
    ],
    seo: {
      title: "SIGNAL JAMMER Crossbody Sling | Guerrilla Social Club",
      description:
        "Keep your daily kit dialed with the SIGNAL JAMMER crossbody sling – everyday carry built for creators.",
    },
  },
];

export function getAllCollections(): Collection[] {
  return collections;
}

export function getCollectionByHandle(handle: string): Collection | undefined {
  return collections.find((c) => c.handle === handle as CollectionHandle);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCollection(handle: string): Product[] {
  return products.filter((p) => p.collectionHandle === handle);
}

export function getFeaturedProducts(limit = 6): Product[] {
  return products
    .filter((p) => p.badge === "Best Seller" || p.badge === "Trending")
    .slice(0, limit);
}

export function getBestSellers(limit = 8): Product[] {
  return products
    .filter((p) => p.badge === "Best Seller")
    .slice(0, limit || products.length);
}

export function getRelatedProducts(
  slug: string,
  limit: number = 4,
): Product[] {
  const product = getProductBySlug(slug);
  if (!product) return [];
  const related = products.filter(
    (p) => p.slug !== slug && p.collectionHandle === product.collectionHandle,
  );
  return related.slice(0, limit);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

export function getAllCollectionHandles(): string[] {
  return collections.map((c) => c.handle);
}
