import type { StaticImageData } from "next/image";
import cinchBlack from "@/assets/images/products/cinch-black.jpg";
import cinchWhite from "@/assets/images/products/cinch-white.jpg";
import elPatron from "@/assets/images/products/el-patron.jpg";
import rw7001 from "@/assets/images/products/rw7001.jpg";
import rwl8400 from "@/assets/images/products/rwl8400.jpg";
import rwl8400Detail from "@/assets/images/products/rwl8400-detail.jpg";
import schott118 from "@/assets/images/products/schott118.jpg";
import schott141 from "@/assets/images/products/schott141.jpg";
import skyline from "@/assets/images/products/skyline.jpg";
import skylineDetail from "@/assets/images/products/skyline-detail.jpg";

// A curated selection from the store's original online catalogue. Each `source`
// links to the listing the details and photos came from. Prices are deliberately
// omitted: the store confirms current pricing and availability.

export type CategorySlug = "boots" | "hats" | "leather" | "western-wear";

export type Collection = {
  slug: string;
  name: string;
  line: string;
  description: string;
  image: StaticImageData;
};

export const collections: (Collection & { slug: CategorySlug })[] = [
  {
    slug: "boots",
    name: "Boots",
    line: "Find your footing.",
    description:
      "Western silhouettes, rich leather, and a fit worth getting right.",
    image: rw7001,
  },
  {
    slug: "hats",
    name: "Hats",
    line: "Make it your own.",
    description: "Felt classics with room for a little personal shaping.",
    image: elPatron,
  },
  {
    slug: "leather",
    name: "Leather & biker",
    line: "Take the long way.",
    description:
      "Motorcycle jackets with character, from the Cultured Cowboy catalogue.",
    image: schott118,
  },
  {
    slug: "western-wear",
    name: "Western wear",
    line: "Everyday, your way.",
    description:
      "Shirts that move between the arena, the road, and the rest of your day.",
    image: cinchWhite,
  },
];

/** Every collection page, including the cross-category Western edit (all non-leather pieces). */
export const collectionPages: Collection[] = [
  ...collections,
  {
    slug: "western",
    name: "The Western collection",
    line: "A spirit all your own.",
    description:
      "Boots, felt hats, and Western shirts. Find the details that feel like you.",
    image: rw7001,
  },
];

export function inCollection(product: Product, slug: string): boolean {
  if (slug === "all") return true;
  if (slug === "western") return product.category !== "leather";
  return product.category === slug;
}

export type Product = {
  slug: string;
  brand: string;
  name: string;
  category: CategorySlug;
  images: StaticImageData[];
  audience: string;
  style: string;
  color: string;
  colors: string[];
  description: string;
  details: string[];
  /** Note shown under the gallery, after the standard photo credit. */
  photoNote?: string;
  source: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "r-watson-ranch-hand",
    brand: "R. Watson",
    name: "Ranch Hand Calfskin Boot",
    category: "boots",
    images: [rw7001],
    audience: "Men",
    style: "RW-7001",
    color: "Chocolate",
    colors: ["Chocolate"],
    description:
      "A traditional Western boot with a chocolate calfskin finish and a wide square toe. An easy place to start a conversation about your next pair.",
    details: [
      "Ranch Hand calfskin",
      "Wide square toe",
      "Style RW-7001",
      "Ask the store about size and width options",
    ],
    source: "https://culturedcowboy.com/boots/RWatson/pages/RW7001.htm",
    featured: true,
  },
  {
    slug: "stetson-skyline",
    brand: "Stetson",
    name: "Skyline 6X Felt Hat",
    category: "hats",
    images: [skyline, skylineDetail],
    audience: "All",
    style: "SFSKYL-7540",
    color: "Black",
    colors: ["Black", "Chocolate"],
    description:
      "A classic Western profile from Stetson’s 6X collection. Choose a preferred color, then talk through sizing and shaping with the store.",
    details: [
      "6X felt collection",
      "Profile 75",
      "Multiple brim options in the catalogue",
      "Personal shaping can be discussed with the store",
    ],
    photoNote: " Photos show Black and Chocolate color options.",
    source: "https://culturedcowboy.com/hats/stetson/pages/StetsonFurFelts.htm",
    featured: true,
  },
  {
    slug: "schott-perfecto-118",
    brand: "Schott NYC",
    name: "Perfecto 118 Leather Jacket",
    category: "leather",
    images: [schott118],
    audience: "Men",
    style: "SCH-118",
    color: "Black",
    colors: ["Black"],
    description:
      "The familiar belted silhouette, made in naked cowhide. A motorcycle classic with a character that’s entirely its own.",
    details: [
      "Naked cowhide leather",
      "Belted waist and zippered pockets",
      "Quilted nylon lining",
      "Discuss regular and long sizing with the store",
    ],
    source: "https://culturedcowboy.com/cc_rider/schott/pages/118.htm",
    featured: true,
  },
  {
    slug: "cinch-black-pinpoint",
    brand: "Cinch",
    name: "Black Pinpoint Oxford Shirt",
    category: "western-wear",
    images: [cinchBlack],
    audience: "Men",
    style: "MT10320083 BLK",
    color: "Black",
    colors: ["Black"],
    description:
      "A clean, long-sleeve Western staple with a button-down collar and the fuller classic Cinch cut.",
    details: [
      "100% cotton pinpoint Oxford",
      "Long sleeves",
      "Button-down collar",
      "Classic Cinch cut",
    ],
    source: "https://culturedcowboy.com/cinch/pages/cnchshirtindex.htm",
    featured: true,
  },
  {
    slug: "r-watson-black-roughout",
    brand: "R. Watson",
    name: "Black Roughout Western Boot",
    category: "boots",
    images: [rwl8400, rwl8400Detail],
    audience: "Women",
    style: "RWL-8400-1",
    color: "Black",
    colors: ["Black"],
    description:
      "Deep black roughout leather, a cutter toe, and a cowboy heel. A distinctive take on the everyday Western boot.",
    details: [
      "Black roughout leather",
      "Cutter toe",
      "Cowboy heel",
      "Women’s style RWL-8400-1",
    ],
    source: "https://culturedcowboy.com/boots/RWatson/pages/RWL8400-1.htm",
  },
  {
    slug: "stetson-el-patron",
    brand: "Stetson",
    name: "El Patron 30X Felt Hat",
    category: "hats",
    images: [elPatron],
    audience: "All",
    style: "SFEPTN-4840",
    color: "Butterscotch",
    colors: ["Butterscotch"],
    description:
      "A warm butterscotch finish and a distinctive hatband from Stetson’s Premier collection. Built around a considered Western profile.",
    details: [
      "30X Premier collection",
      "Profile 48 shown",
      "Butterscotch colorway",
      "Ask about brim, sizing, and shaping",
    ],
    source: "https://culturedcowboy.com/hats/stetson/pages/StetsonFurFelts.htm",
  },
  {
    slug: "schott-racer-141",
    brand: "Schott NYC",
    name: "141 Classic Racer Jacket",
    category: "leather",
    images: [schott141],
    audience: "Men",
    style: "SCH-141",
    color: "Black",
    colors: ["Black"],
    description:
      "A pared-back racer profile in naked cowhide, with an adjustable stand collar and side tabs for a clean fit.",
    details: [
      "Naked cowhide leather",
      "Adjustable collar and side tabs",
      "Zip-out pile lining",
      "Zippered pockets",
    ],
    source: "https://culturedcowboy.com/cc_rider/schott/pages/141.html",
  },
  {
    slug: "cinch-white-pinpoint",
    brand: "Cinch",
    name: "White Pinpoint Oxford Shirt",
    category: "western-wear",
    images: [cinchWhite],
    audience: "Men",
    style: "MT10320020 WHT",
    color: "White",
    colors: ["White"],
    description:
      "Crisp white cotton and an easy classic cut. A Western wardrobe essential, from workdays to special occasions.",
    details: [
      "100% cotton pinpoint Oxford",
      "Long sleeves",
      "Button-down collar",
      "Classic Cinch cut",
    ],
    source: "https://culturedcowboy.com/cinch/pages/cnchshirtindex.htm",
  },
];

export const brands = Array.from(new Set(products.map((p) => p.brand)));

export function findProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function sizePlaceholder(category: CategorySlug): string {
  if (category === "boots") return "e.g. US 10 D — or leave blank";
  if (category === "hats") return "e.g. 7⅛ — or leave blank";
  return "e.g. Medium — or leave blank";
}

/** Free-text match used by the catalogue filter and the search dialog. */
export function matchesQuery(p: Product, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return `${p.name} ${p.brand} ${p.style} ${p.color} ${p.audience} ${p.description}`
    .toLowerCase()
    .includes(q);
}

export function collectionName(slug: string): string | undefined {
  return collectionPages.find((c) => c.slug === slug)?.name;
}

/** Display colour for each catalogue colour name (presentation only). */
export const swatchColors: Record<string, string> = {
  Black: "#1d1b18",
  Chocolate: "#4b2e20",
  Butterscotch: "#b98345",
  White: "#f7f5f0",
};

export const NO_SIZE = "Please help me find my size";
