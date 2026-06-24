export type NavLink = {
  label: string;
  href: string;
};

export type Brand = {
  name: string;
  tagline: string;
  ctaLabel: string;
  ctaHref: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#products" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const brand: Brand = {
  name: "Lumière",
  tagline: "Curated for modern living",
  ctaLabel: "Shop Now",
  ctaHref: "#products",
};

export type ProductCategory =
  | "All"
  | "Home & Living"
  | "Accessories"
  | "Wellness"
  | "Tech";

export const productCategories: ProductCategory[] = [
  "All",
  "Home & Living",
  "Accessories",
  "Wellness",
  "Tech",
];

export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: ProductCategory;
  badge?: "New" | "Sale" | "Bestseller" | "Limited";
  description: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Ceramic Pour-Over Set",
    price: 68,
    rating: 4.9,
    reviewCount: 214,
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    category: "Home & Living",
    badge: "Bestseller",
    description: "Hand-thrown stoneware with a matte glaze finish.",
  },
  {
    id: 2,
    name: "Linen Throw Blanket",
    price: 89,
    originalPrice: 120,
    rating: 4.7,
    reviewCount: 98,
    image: "https://m.media-amazon.com/images/I/71EUmwZhM6L.jpg",
    category: "Home & Living",
    badge: "Sale",
    description: "Stonewashed Belgian linen, naturally breathable.",
  },
  {
    id: 3,
    name: "Leather Card Wallet",
    price: 45,
    rating: 4.8,
    reviewCount: 312,
    image: "https://buffalojackson.com/cdn/shop/files/roosevekt-buffalo-leather-grain-ID-wallet-1-lifestyle_2000x.jpg?v=1755630456",
    category: "Accessories",
    badge: "Bestseller",
    description: "Full-grain vegetable-tanned leather, slim profile.",
  },
  {
    id: 4,
    name: "Diffuser Stone Set",
    price: 38,
    rating: 4.6,
    reviewCount: 77,
    image: "https://jusohome.com/cdn/shop/files/1_0004_IMG_9349.jpg?v=1746348497&width=1445",
    category: "Wellness",
    badge: "New",
    description: "Porous volcanic stones with essential oil blends.",
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    price: 55,
    originalPrice: 75,
    rating: 4.5,
    reviewCount: 189,
    image: "https://satechi.com/cdn/shop/products/trio-wireless-charging-pad-charging-stations-satechi-868975.jpg?v=1762440331",
    category: "Tech",
    badge: "Sale",
    description: "15W fast charge, ultra-slim aluminum surface.",
  },
  {
    id: 6,
    name: "Merino Wool Beanie",
    price: 42,
    rating: 4.9,
    reviewCount: 156,
    image: "https://www.gigipip.com/cdn/shop/files/beanies-burgundy-gigi-merino-wool-beanie-41548091490435.jpg?v=1760644226",
    category: "Accessories",
    badge: "New",
    description: "Extra-fine 17.5 micron merino, ribbed knit.",
  },
  {
    id: 7,
    name: "Bamboo Desk Organizer",
    price: 34,
    rating: 4.4,
    reviewCount: 63,
    image: "https://meedenart.com/cdn/shop/files/1-07_a24e45f6-ae9b-4b15-b218-cc80ca127696_1600x.png?v=1732685200",
    category: "Home & Living",
    description: "FSC-certified bamboo with modular compartments.",
  },
  {
    id: 8,
    name: "Lavender Sleep Mist",
    price: 28,
    rating: 4.7,
    reviewCount: 241,
    image: "https://m.media-amazon.com/images/I/61tJfrHcROL._AC_UF1000,1000_QL80_.jpg",
    category: "Wellness",
    badge: "Bestseller",
    description: "Organic lavender and chamomile pillow spray.",
  },
];

export const footerLinks = {
  Shop: [
    { label: "New Arrivals", href: "#products" },
    { label: "Bestsellers", href: "#products" },
    { label: "Sale", href: "#products" },
    { label: "Collections", href: "#collections" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Sustainability", href: "#about" },
    { label: "Press", href: "#about" },
    { label: "Careers", href: "#contact" },
  ],
  Support: [
    { label: "FAQ", href: "#contact" },
    { label: "Shipping & Returns", href: "#contact" },
    { label: "Track Order", href: "#contact" },
    { label: "Contact Us", href: "#contact" },
  ],
};