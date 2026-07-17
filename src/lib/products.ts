export type Category = {
  slug: string;
  name: string;
  emoji: string;
  image: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  stock: number;
  delivery: string;
  seller: string;
  badge?: "Nouveau" | "Promo" | "Meilleure vente" | "Édition limitée";
  colors?: string[];
  sizes?: string[];
};

export const categories: Category[] = [
  { slug: "electronique", name: "Électronique", emoji: "📱", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600" },
  { slug: "gaming", name: "Gaming", emoji: "🎮", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600" },
  { slug: "mode", name: "Mode", emoji: "👕", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600" },
  { slug: "maison", name: "Maison", emoji: "🛋️", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600" },
  { slug: "cuisine", name: "Cuisine", emoji: "🍳", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600" },
  { slug: "sport", name: "Sport", emoji: "⚽", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600" },
  { slug: "beaute", name: "Beauté", emoji: "💄", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600" },
  { slug: "livres", name: "Livres", emoji: "📚", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600" },
  { slug: "informatique", name: "Informatique", emoji: "💻", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600" },
  { slug: "telephones", name: "Téléphones", emoji: "📞", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600" },
  { slug: "audio", name: "Audio", emoji: "🎧", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600" },
  { slug: "photo", name: "Photo", emoji: "📷", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600" },
  { slug: "automobile", name: "Automobile", emoji: "🚗", image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600" },
  { slug: "bricolage", name: "Bricolage", emoji: "🔧", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600" },
  { slug: "animaux", name: "Animaux", emoji: "🐾", image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600" },
  { slug: "jouets", name: "Jouets", emoji: "🧸", image: "https://images.unsplash.com/photo-1558877385-8c1cdb894c72?w=600" },
];

const seed = [
  { name: "UltraBook Air X15", cat: "informatique", brand: "Nova", price: 1299, old: 1599, img: "photo-1517336714731-489689fd1ca8", badge: "Meilleure vente" as const },
  { name: "SmartWatch Pulse 3", cat: "electronique", brand: "Chrono", price: 249, old: 329, img: "photo-1544117519-31a4b719223d", badge: "Promo" as const },
  { name: "Gaming Chair Pro", cat: "gaming", brand: "Rift", price: 389, old: 499, img: "photo-1592078615290-033ee584e267", badge: "Promo" as const },
  { name: "Casque Silence Cloud", cat: "audio", brand: "Auralis", price: 279, old: 349, img: "photo-1505740420928-5e560c06d30e", badge: "Meilleure vente" as const },
  { name: "Caméra Action 4K", cat: "photo", brand: "Kinetix", price: 199, img: "photo-1502920917128-1aa500764cbd", badge: "Nouveau" as const },
  { name: "Clavier Mécanique RGB", cat: "gaming", brand: "Klack", price: 129, old: 169, img: "photo-1587829741301-dc798b83add3" },
  { name: "Robot Aspirateur Max", cat: "maison", brand: "Sweep", price: 449, old: 599, img: "photo-1558317374-067fb5f30001", badge: "Promo" as const },
  { name: "Airfryer Plus 6L", cat: "cuisine", brand: "Croustille", price: 149, img: "photo-1626082927389-6cd097cee6a6" },
  { name: "Chargeur sans fil 15W", cat: "electronique", brand: "Volt", price: 39, old: 59, img: "photo-1587033411391-5d9e51cce126" },
  { name: "Hub USB-C Pro 8-en-1", cat: "informatique", brand: "Nova", price: 79, img: "photo-1625948515291-69613efd103f" },
  { name: "Écran UltraWide 34\"", cat: "informatique", brand: "Vision", price: 599, old: 749, img: "photo-1527443224154-c4a3942d3acf", badge: "Meilleure vente" as const },
  { name: "SSD Portable 2TB", cat: "informatique", brand: "Flux", price: 189, img: "photo-1531492746076-161ca9bcad58" },
  { name: "Enceinte Bluetooth Boom", cat: "audio", brand: "Auralis", price: 89, old: 119, img: "photo-1608043152269-423dbba4e7e1" },
  { name: "Sneakers Aero Run", cat: "mode", brand: "Stride", price: 119, img: "photo-1542291026-7eec264c27ff", badge: "Nouveau" as const },
  { name: "Sac à dos Voyager", cat: "mode", brand: "Trek", price: 89, img: "photo-1553062407-98eeb64c6a62" },
  { name: "iPhone-like Nova 15", cat: "telephones", brand: "Nova", price: 999, old: 1099, img: "photo-1511707171634-5f897ff02aa9", badge: "Nouveau" as const },
  { name: "Tablette Slate 11\"", cat: "electronique", brand: "Nova", price: 549, img: "photo-1544244015-0df4b3ffc6b0" },
  { name: "Manette sans fil ProX", cat: "gaming", brand: "Rift", price: 69, img: "photo-1580327344181-c1163234e5a0" },
  { name: "Console Handheld Vega", cat: "gaming", brand: "Rift", price: 349, old: 399, img: "photo-1531525645387-7f14be1bdbbd", badge: "Meilleure vente" as const },
  { name: "Blender Pro 1200W", cat: "cuisine", brand: "Croustille", price: 129, img: "photo-1585515320310-259814833e62" },
  { name: "Cafetière Espresso Master", cat: "cuisine", brand: "Aroma", price: 349, old: 449, img: "photo-1610889556528-9a770e32642f" },
  { name: "Ballon Football Elite", cat: "sport", brand: "Kickr", price: 39, img: "photo-1614632537190-23e4b21b2be9" },
  { name: "Tapis Yoga Premium", cat: "sport", brand: "Zenflow", price: 49, img: "photo-1601925260368-ae2f83cf8b7f" },
  { name: "Vélo d'appartement Cardio", cat: "sport", brand: "Zenflow", price: 499, old: 649, img: "photo-1517836357463-d25dfeac3438" },
  { name: "Parfum Nuit d'Été", cat: "beaute", brand: "Belle", price: 79, img: "photo-1541643600914-78b084683601" },
  { name: "Kit Skincare Éclat", cat: "beaute", brand: "Glow", price: 89, img: "photo-1596462502278-27bfdc403348" },
  { name: "Livre — L'Art du Design", cat: "livres", brand: "Éditions Nord", price: 29, img: "photo-1544947950-fa07a98d237f" },
  { name: "Livre — Code Élégant", cat: "livres", brand: "Éditions Nord", price: 34, img: "photo-1543002588-bfa74002ed7e" },
  { name: "Souris Sans-fil Précision", cat: "informatique", brand: "Klack", price: 59, img: "photo-1527864550417-7fd91fc51a46" },
  { name: "Webcam 4K Stream", cat: "informatique", brand: "Vision", price: 149, img: "photo-1587825140708-dfaf72ae4b04" },
  { name: "Drone Pilot Mini", cat: "photo", brand: "Kinetix", price: 449, old: 549, img: "photo-1508614589041-895b88991e3e", badge: "Promo" as const },
  { name: "Objectif 50mm f/1.8", cat: "photo", brand: "Optique", price: 229, img: "photo-1502920917128-1aa500764cbd" },
  { name: "Support Téléphone Voiture", cat: "automobile", brand: "Auto+", price: 25, img: "photo-1449426468159-d96dbf08f19f" },
  { name: "Aspirateur voiture 12V", cat: "automobile", brand: "Auto+", price: 45, img: "photo-1592853625601-4f9c48fd8018" },
  { name: "Perceuse sans-fil 18V", cat: "bricolage", brand: "Solid", price: 129, old: 179, img: "photo-1572981779307-38e8d47dfb37" },
  { name: "Kit Tournevis 45 pièces", cat: "bricolage", brand: "Solid", price: 39, img: "photo-1530124566582-a618bc2615dc" },
  { name: "Panier chat Confort", cat: "animaux", brand: "Petpal", price: 49, img: "photo-1573865526739-10659fec78a5" },
  { name: "Croquettes Premium 12kg", cat: "animaux", brand: "Petpal", price: 59, img: "photo-1450778869180-41d0601e046e" },
  { name: "Lego Étoile Galactique", cat: "jouets", brand: "Blocks", price: 89, img: "photo-1558877385-8c1cdb894c72" },
  { name: "Peluche Ours Géant", cat: "jouets", brand: "Douceur", price: 39, img: "photo-1584155828260-3f126cd7e2b0" },
  { name: "Veste Hiver Aurora", cat: "mode", brand: "Nord", price: 199, old: 279, img: "photo-1551028719-00167b16eac5" },
  { name: "Montre Classique Onyx", cat: "mode", brand: "Chrono", price: 289, img: "photo-1524592094714-0f0654e20314", badge: "Nouveau" as const },
  { name: "Lampe Bureau Origami", cat: "maison", brand: "Lumen", price: 89, img: "photo-1507473885765-e6ed057f782c" },
  { name: "Bougie Parfumée Ambre", cat: "maison", brand: "Douceur", price: 25, img: "photo-1602874801007-bd6f8be9f92c" },
  { name: "Table Basse Chêne", cat: "maison", brand: "Nord", price: 349, old: 449, img: "photo-1555041469-a586c61ea9bc" },
  { name: "Cocotte Fonte 24cm", cat: "cuisine", brand: "Aroma", price: 129, img: "photo-1584947897558-4e06f0aa5d10" },
  { name: "Batterie externe 20 000mAh", cat: "electronique", brand: "Volt", price: 49, img: "photo-1609091839311-d5365f9ff1c5" },
  { name: "Câble USB-C tressé 2m", cat: "electronique", brand: "Volt", price: 15, img: "photo-1583863788434-e58a36330cf0" },
  { name: "Barre de son 2.1 Cinéma", cat: "audio", brand: "Auralis", price: 249, old: 329, img: "photo-1545454675-3531b543be5d", badge: "Promo" as const },
  { name: "Pack Écouteurs Buds Pro", cat: "audio", brand: "Auralis", price: 149, img: "photo-1590658268037-6bf12165a8df", badge: "Nouveau" as const },
];

function slugify(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const sellers = ["Shoply Direct", "TechStore FR", "MaisonPlus", "Nordic Goods", "PixelMarket", "GreenSupply"];
const deliveries = ["Livraison en 24h", "Livraison en 2 jours", "Livraison offerte", "Livraison sous 3-5 jours"];
const descBits = [
  "Conçu pour durer et pensé pour le quotidien.",
  "Un équilibre parfait entre performance et élégance.",
  "Choisi par des milliers de clients pour sa fiabilité.",
  "Un design signature, une expérience premium.",
];

export const products: Product[] = seed.map((s, i) => {
  const image = `https://images.unsplash.com/${s.img}?w=900&auto=format&fit=crop`;
  return {
    id: String(i + 1),
    name: s.name,
    slug: slugify(s.name),
    category: s.cat,
    brand: s.brand,
    price: s.price,
    oldPrice: s.old,
    rating: Math.round((3.8 + Math.random() * 1.2) * 10) / 10,
    reviews: Math.floor(50 + Math.random() * 2500),
    image,
    images: [image, image + "&sat=-20", image + "&hue=30", image + "&flip=h"],
    description: `${s.name} — ${descBits[i % descBits.length]} Fabriqué avec soin, testé rigoureusement, livré rapidement.`,
    features: [
      "Matériaux de qualité supérieure",
      "Garantie constructeur 2 ans",
      "Retour gratuit sous 30 jours",
      "Emballage éco-conçu",
    ],
    specs: {
      Marque: s.brand,
      Modèle: s.name,
      Référence: `SH-${1000 + i}`,
      Poids: `${(Math.random() * 3 + 0.2).toFixed(2)} kg`,
      Garantie: "2 ans",
    },
    stock: Math.floor(Math.random() * 60) + 3,
    delivery: deliveries[i % deliveries.length],
    seller: sellers[i % sellers.length],
    badge: s.badge,
    colors: i % 3 === 0 ? ["Noir", "Blanc", "Bleu"] : undefined,
    sizes: s.cat === "mode" ? ["S", "M", "L", "XL"] : undefined,
  };
});

export function getProduct(id: string) {
  return products.find((p) => p.id === id || p.slug === id);
}

export function byCategory(slug: string) {
  return products.filter((p) => p.category === slug);
}

export function bestSellers() {
  return products.filter((p) => p.badge === "Meilleure vente");
}
export function newArrivals() {
  return products.filter((p) => p.badge === "Nouveau");
}
export function promos() {
  return products.filter((p) => p.oldPrice);
}
