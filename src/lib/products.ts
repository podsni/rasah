import heavenlyL from "@/assets/products/heavenly-garden-l.jpg";
import heavenlyM from "@/assets/products/heavenly-garden-m.jpg";
import sweetPop from "@/assets/products/sweet-pop-garden.jpg";
import sweetGarden from "@/assets/products/sweet-garden.jpg";
import sweetBelimbing from "@/assets/products/sweet-garden-belimbing.jpg";
import lovelyFresh from "@/assets/products/lovely-fresh-garden.jpg";
import lovelyGarden from "@/assets/products/lovely-garden.jpg";
import lovelyBelimbing from "@/assets/products/lovely-garden-belimbing.jpg";
import sprinkleM from "@/assets/products/sprinkle-magic-m.jpg";
import sprinkleL from "@/assets/products/sprinkle-magic-l.jpg";
import sunnyMagic from "@/assets/products/sunny-magic-garden.jpg";
import berry from "@/assets/products/berry-garden.jpg";
import berryBrust from "@/assets/products/berry-brust-garden.jpg";
import oasis from "@/assets/products/oasis-garden.jpg";
import bunnyLoli from "@/assets/products/bunny-lolipop-garden.jpg";
import loli from "@/assets/products/lolipop-garden.jpg";
import rainbow from "@/assets/products/rainbow-treat-bowl.jpg";

export type Packaging = "keranjang" | "box" | "besek" | "bowl" | "piring";
export type Occasion = "keluarga" | "kantor" | "ulang-tahun" | "syukuran" | "lebaran" | "simple";

export interface Product {
  slug: string;
  name: string;
  price: number;
  image: string;
  short: string;
  /** Raw description string from catalog — displayed as-is in detail page */
  rawDescription: string;
  contents: string[];
  size: string;
  packaging: Packaging;
  occasions: Occasion[];
  badge?: string;
}

export const products: Product[] = [
  {
    slug: "heavenly-garden-l",
    name: "Heavenly Garden (L)",
    price: 400000,
    image: heavenlyL,
    short: "Premium fruit hampers dengan fresh flower dan keranjang besar.",
    rawDescription: "Apel - 2 pcs, Pear - 4 pcs, Jeruk - 1 pcs, Pisang - 5-7 pcs, Anggur Merah - 300 gr, Anggur Hijau - 300gr, Ukuran Keranjang - 40cm, Fresh Flower",
    contents: ["Apel — 2 pcs", "Pear — 4 pcs", "Jeruk — 1 pcs", "Pisang — 5–7 pcs", "Anggur Merah — 300 gr", "Anggur Hijau — 300 gr", "Fresh Flower"],
    size: "Keranjang 40 cm",
    packaging: "keranjang",
    occasions: ["keluarga", "kantor", "syukuran", "ulang-tahun"],
    badge: "Best Seller",
  },
  {
    slug: "heavenly-garden-m",
    name: "Heavenly Garden (M)",
    price: 253000,
    image: heavenlyM,
    short: "Hampers keranjang besar dengan kombinasi 6 jenis buah segar.",
    rawDescription: "Apel - 2 pcs, Pear - 3 pcs, Jeruk - 3 pcs, Belimbing - 3 pcs, Buah naga - 2 pcs, Anggur Merah - 300gr, Anggur Hijau - 300 gr, Ukuran Keranjang - 32 cm",
    contents: ["Apel — 2 pcs", "Pear — 3 pcs", "Jeruk — 3 pcs", "Belimbing — 3 pcs", "Buah Naga — 2 pcs", "Anggur Merah — 300 gr", "Anggur Hijau — 300 gr"],
    size: "Keranjang 32 cm",
    packaging: "keranjang",
    occasions: ["keluarga", "kantor", "syukuran"],
  },
  {
    slug: "sweet-pop-garden",
    name: "Sweet Pop Garden",
    price: 199000,
    image: sweetPop,
    short: "Parcel rotan elegan dengan buah pilihan.",
    rawDescription: "Apel - 1 pcs, Pear - 1 pcs, Jeruk - 1 pcs, Anggur Merah - 200 gr, Anggur Hijau - 150 gr, Ukuran Keranjang - 22 cm, Bahan Rotan",
    contents: ["Apel — 1 pcs", "Pear — 1 pcs", "Jeruk — 1 pcs", "Anggur Merah — 200 gr", "Anggur Hijau — 150 gr"],
    size: "Keranjang Rotan 22 cm",
    packaging: "keranjang",
    occasions: ["keluarga", "simple", "ulang-tahun"],
  },
  {
    slug: "sweet-garden",
    name: "Sweet Garden (A)",
    price: 138000,
    image: sweetGarden,
    short: "Hampers manis dengan tampilan simple dan elegan.",
    rawDescription: "Apel - 2 pcs, Pear - 2 pcs, Jeruk - 2 pcs, Anggur Merah - 200 gr, Anggur Hijau - 200 gr, Ukuran Keranjang - 22 cm, Bahan Rotan",
    contents: ["Apel — 2 pcs", "Pear — 2 pcs", "Jeruk — 2 pcs", "Anggur Merah — 200 gr", "Anggur Hijau — 200 gr"],
    size: "Keranjang Rotan 22 cm",
    packaging: "keranjang",
    occasions: ["keluarga", "simple", "lebaran"],
  },
  {
    slug: "sweet-garden-belimbing",
    name: "Sweet Garden (B)",
    price: 160000,
    image: sweetBelimbing,
    short: "Varian Sweet Garden dengan tambahan belimbing segar.",
    rawDescription: "Belimbing - 3 pcs, Apel - 2 pcs, Pear - 2 pcs, Anggur Merah - 200 gr, Anggur Hijau - 200 gr, Ukuran Keranjang - 22 cm, Bahan Rotan",
    contents: ["Belimbing — 3 pcs", "Apel — 2 pcs", "Pear — 2 pcs", "Anggur Merah — 200 gr", "Anggur Hijau — 200 gr"],
    size: "Keranjang Rotan 22 cm",
    packaging: "keranjang",
    occasions: ["keluarga", "simple"],
  },
  {
    slug: "lovely-fresh-garden",
    name: "Lovely Fresh Garden",
    price: 191000,
    image: lovelyFresh,
    short: "Keranjang buah segar dengan sentuhan bunga.",
    rawDescription: "Apel - 1 pcs, Pear - 1 pcs, Jeruk - 1 pcs, Buah Naga - 1 pcs, Anggur Merah - 180 gr, Anggur Hijau - 150 gr, Ukuran Keranjang - 22 cm",
    contents: ["Apel — 1 pcs", "Pear — 1 pcs", "Jeruk — 1 pcs", "Buah Naga — 1 pcs", "Anggur Merah — 180 gr", "Anggur Hijau — 150 gr"],
    size: "Keranjang 22 cm",
    packaging: "keranjang",
    occasions: ["ulang-tahun", "keluarga"],
  },
  {
    slug: "lovely-garden",
    name: "Lovely Garden (A)",
    price: 123000,
    image: lovelyGarden,
    short: "Pilihan buah segar untuk orang tersayang.",
    rawDescription: "Apel - 2 pcs, Pear - 2 pcs, Jeruk - 2 pcs, Anggur Merah - 200 gr, Anggur Hijau - 200 gr, Ukuran Keranjang - 22 cm",
    contents: ["Apel — 2 pcs", "Pear — 2 pcs", "Jeruk — 2 pcs", "Anggur Merah — 200 gr", "Anggur Hijau — 200 gr"],
    size: "Keranjang 22 cm",
    packaging: "keranjang",
    occasions: ["lebaran", "keluarga", "simple"],
  },
  {
    slug: "lovely-garden-belimbing",
    name: "Lovely Garden (B)",
    price: 157000,
    image: lovelyBelimbing,
    short: "Lovely Garden dengan ekstra belimbing segar.",
    rawDescription: "Belimbing - 3 pcs, Apel - 2 pcs, Pear - 2 pcs, Jeruk - 2 pcs, Anggur Merah - 200 gr, Anggur Hijau - 200 gr, Ukuran Keranjang - 22 cm",
    contents: ["Belimbing — 3 pcs", "Apel — 2 pcs", "Pear — 2 pcs", "Jeruk — 2 pcs", "Anggur Merah — 200 gr", "Anggur Hijau — 200 gr"],
    size: "Keranjang 22 cm",
    packaging: "keranjang",
    occasions: ["keluarga", "syukuran"],
  },
  {
    slug: "sprinkle-magic-garden-m",
    name: "Sprinkle Magic Garden (M)",
    price: 139000,
    image: sprinkleM,
    short: "Hampers box cantik bernuansa segar dan ceria.",
    rawDescription: "Apel - 2 pcs, Pear - 2 pcs, Jeruk - 2 pcs, Anggur Merah - 250 gr, Anggur Hijau - 250 gr, Starberry - 4 pcs, Ukuran Box - 22cm",
    contents: ["Apel — 2 pcs", "Pear — 2 pcs", "Jeruk — 2 pcs", "Anggur Merah — 250 gr", "Anggur Hijau — 250 gr", "Strawberry — 4 pcs"],
    size: "Box 22 cm",
    packaging: "box",
    occasions: ["kantor", "ulang-tahun", "lebaran"],
  },
  {
    slug: "sprinkle-magic-garden-l",
    name: "Sprinkle Magic Garden (L)",
    price: 177000,
    image: sprinkleL,
    short: "Versi besar hampers box dengan lebih banyak strawberry.",
    rawDescription: "Apel - 4 pcs, Pear - 2 pcs, Jeruk - 2 pcs, Anggur Merah - 250 gr, Anggur Hijau - 250 gr, Starberry - 8 pcs, Ukuran Box - 25 cm",
    contents: ["Apel — 4 pcs", "Pear — 2 pcs", "Jeruk — 2 pcs", "Anggur Merah — 250 gr", "Anggur Hijau — 250 gr", "Strawberry — 8 pcs"],
    size: "Box 25 cm",
    packaging: "box",
    occasions: ["kantor", "syukuran", "ulang-tahun"],
  },
  {
    slug: "sunny-magic-garden",
    name: "Sunny Magic Garden",
    price: 151000,
    image: sunnyMagic,
    short: "Box jeruk segar dihias fresh flower.",
    rawDescription: "Jeruk - 9 pcs, Ukuran Box - 22 cm, Fresh Flower",
    contents: ["Jeruk — 9 pcs", "Fresh Flower"],
    size: "Box 22 cm",
    packaging: "box",
    occasions: ["simple", "syukuran"],
  },
  {
    slug: "berry-garden",
    name: "Berry Garden",
    price: 150000,
    image: berry,
    short: "Keranjang strawberry segar untuk pecinta berry.",
    rawDescription: "Strawberry - 500 gr, Ukuran Keranjang - 18cm",
    contents: ["Strawberry — 500 gr"],
    size: "Keranjang 18 cm",
    packaging: "keranjang",
    occasions: ["ulang-tahun", "simple"],
  },
  {
    slug: "berry-brust-garden",
    name: "Berry Brust Garden",
    price: 87000,
    image: berryBrust,
    short: "Kombinasi strawberry dan anggur hijau yang menyegarkan.",
    rawDescription: "Strawberry - 500 gr, Anggur Hijau - 200 gr, Ukuran Keranjang - 18cm",
    contents: ["Strawberry — 500 gr", "Anggur Hijau — 200 gr"],
    size: "Keranjang 18 cm",
    packaging: "keranjang",
    occasions: ["simple", "ulang-tahun"],
  },
  {
    slug: "oasis-garden",
    name: "Oasis Garden",
    price: 46000,
    image: oasis,
    short: "Besek mungil hemat dengan 4 jenis buah.",
    rawDescription: "Apel - 1 pcs, Pear - 1 pcs, Jeruk - 1 pcs, Anggur Hijau - 5 pcs, Anggur Merah - 5 pcs, Ukuran Besek - 25 cm",
    contents: ["Apel — 1 pcs", "Pear — 1 pcs", "Jeruk — 1 pcs", "Anggur Hijau — 5 pcs", "Anggur Merah — 5 pcs"],
    size: "Besek 25 cm",
    packaging: "besek",
    occasions: ["simple", "lebaran"],
    badge: "Hemat",
  },
  {
    slug: "bunny-lolipop-garden",
    name: "Bunny Lolipop Garden",
    price: 81000,
    image: bunnyLoli,
    short: "Piring parcel lucu dengan tag spesial.",
    rawDescription: "Apel - 2 pcs, Pear - 2 pcs, Jeruk - 1 pcs, Anggur Hijau - 80 gr, Anggur Merah - 80 gr, Diameter Piring - 22 cm",
    contents: ["Apel — 2 pcs", "Pear — 2 pcs", "Jeruk — 1 pcs", "Anggur Hijau — 80 gr", "Anggur Merah — 80 gr"],
    size: "Piring 22 cm",
    packaging: "piring",
    occasions: ["lebaran", "simple"],
  },
  {
    slug: "lolipop-garden",
    name: "Lolipop Garden",
    price: 73000,
    image: loli,
    short: "Piring parcel praktis dengan buah berwarna-warni.",
    rawDescription: "Apel - 2 pcs, Pear - 2 pcs, Jeruk - 1 pcs, Anggur Hijau - 80 gr, Anggur Merah - 80 gr, Diameter Piring - 22 cm",
    contents: ["Apel — 2 pcs", "Pear — 2 pcs", "Jeruk — 1 pcs", "Anggur Hijau — 80 gr", "Anggur Merah — 80 gr"],
    size: "Piring 22 cm",
    packaging: "piring",
    occasions: ["simple", "lebaran"],
  },
  {
    slug: "rainbow-treat-bowl",
    name: "Rainbow Treat Bowl",
    price: 30000,
    image: rainbow,
    short: "Bowl mungil aneka buah, sempurna untuk hampers ringan.",
    rawDescription: "Apel - 1 pcs, Anggur Hijau - 60 gr, Anggur Merah - 60 gr, Kelengkeng - 80 gr, Strawberry - 4 pcs, Diameter - 13 cm",
    contents: ["Apel — 1 pcs", "Anggur Hijau — 60 gr", "Anggur Merah — 60 gr", "Kelengkeng — 80 gr", "Strawberry — 4 pcs"],
    size: "Bowl Ø 13 cm",
    packaging: "bowl",
    occasions: ["simple"],
    badge: "Paling Hemat",
  },
];

export const formatRp = (n: number) =>
  "Rp" + n.toLocaleString("id-ID");

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const WHATSAPP_NUMBER = "6285155452687";

export const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const packagingLabel: Record<Packaging, string> = {
  keranjang: "Keranjang",
  box: "Box",
  besek: "Besek",
  bowl: "Bowl",
  piring: "Piring Parcel",
};

export const occasionLabel: Record<Occasion, string> = {
  keluarga: "Keluarga",
  kantor: "Kantor",
  "ulang-tahun": "Ulang Tahun",
  syukuran: "Syukuran",
  lebaran: "Lebaran",
  simple: "Hampers Simple",
};
