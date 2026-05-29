# Rasabuah Malang — Premium Fruit Hampers Catalog

> Website katalog premium untuk **Rasabuah Malang** — Parcel buah cantik & segar dari Malang dengan kemasan elegan dan sentuhan personal.

## Overview

Website ini adalah **katalog digital + pemesanan via WhatsApp** untuk brand hampers buah premium di Malang, bukan marketplace berat. Fokus utamanya: tampilan premium yang mudah dinavigasi, detail produk jelas, dan alur pemesanan langsung ke WhatsApp Admin tanpa keribetan.

---

## Teknologi

| Stack | Detail |
|-------|--------|
| Framework | [TanStack Start](https://tanstack.com/start) v1 (Full-stack React 19, SSR/SSG) |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS v4 (native CSS `@import` + `oklch` design tokens) |
| UI Components | shadcn/ui (New York style, Radix UI primitives) |
| Icons | Lucide React |
| Routing | File-based routing (TanStack Router) |
| Query | TanStack Query (React Query) |
| Type Safety | TypeScript 5.8 (strict mode) |

---

## Struktur Direktori

```
.
├── public/                          # Static assets (favicon, logo)
│   └── favicon.png
├── src/
│   ├── assets/
│   │   ├── hero-person.jpg          # Hero image homepage
│   │   ├── connect-person.jpg       # Image section custom/kontak
│   │   ├── logo.png                 # Logo brand
│   │   └── products/                # Katalog produk (17 item)
│   │       ├── heavenly-garden-l.jpg
│   │       ├── heavenly-garden-m.jpg
│   │       ├── sweet-garden.jpg
│   │       ├── lovely-garden.jpg
│   │       ├── sprinkle-magic-m.jpg
│   │       ├── sprinkle-magic-l.jpg
│   │       ├── berry-garden.jpg
│   │       ├── oasis-garden.jpg
│   │       ├── lolipop-garden.jpg
│   │       ├── rainbow-treat-bowl.jpg
│   │       └── ... (total 17 gambar produk)
│   │
│   ├── components/
│   │   ├── product-card.tsx         # Card komponen untuk grid produk
│   │   ├── site-header.tsx          # Navbar + logo
│   │   ├── site-footer.tsx          # Footer brand
│   │   └── whatsapp-float.tsx       # Floating WhatsApp button
│   │
│   ├── lib/
│   │   ├── products.ts              # Data produk + helper formatting & WhatsApp link
│   │   └── utils.ts                 # Helper utility (cn / clsx)
│   │
│   ├── routes/                      # File-based routing (TanStack Start)
│   │   ├── __root.tsx               # Root layout (HTML shell + providers)
│   │   ├── index.tsx                # / — Homepage
│   │   ├── katalog.tsx              # /katalog — Halaman katalog lengkap
│   │   ├── katalog.$slug.tsx        # /katalog/:slug — Detail produk + lightbox
│   │   ├── custom.tsx               # /custom — Custom hampers builder
│   │   ├── tentang.tsx              # /tentang — Tentang kami
│   │   ├── testimoni.tsx            # /testimoni — Cerita pelanggan
│   │   ├── rekomendasi.tsx          # /rekomendasi — Rekomendasi hampers
│   │   └── kontak.tsx               # /kontak — Informasi kontak
│   │
│   ├── components/ui/               # shadcn/ui components (auto-generated)
│   ├── router.tsx                   # Router bootstrap + QueryClient
│   └── styles.css                   # Design tokens (oklch), Tailwind theme, font
│
├── vite.config.ts                   # Vite config (TanStack Start preset)
├── components.json                  # shadcn/ui configuration
├── tsconfig.json                    # TypeScript config
├── bun.lock                         # Bun lockfile
└── package.json                     # Dependencies & scripts
```

---

## Design System

### Color Palette (oklch)

| Token | Warna | Penggunaan |
|-------|-------|------------|
| `--background` | Cream | Latar belakang utama |
| `--foreground` | Deep Olive | Teks utama |
| `--primary` | Olive Green | Primary actions, badges |
| `--gold` | Gold Accent | Bintang rating, CTA accents |
| `--whatsapp` | WhatsApp Green | Tombol pesan WA |
| `--olive-deep` | Dark Olive | Headings, footer CTA |

### Typography

- **Display / Heading**: `Cormorant Garamond` — serif elegan, letter-spacing `-0.01em`
- **Body**: `Inter` — sans-serif modern, clean

### Komponen Kunci

- **ProductCard**: Grid card dengan gambar, nama, harga, badge, tombol "Detail"
- **Lightbox**: Klik gambar produk → fullscreen overlay dengan tombol close (X) di detail produk
- **WhatsApp Float**: Floating button fixed di pojok kanan bawah
- **Hero Section**: Layout 2-kolom (teks + gambar) dengan gradient overlay

---

## Data Produk

Semua data produk tersimpan di `src/lib/products.ts` dalam bentuk array `Product[]`:

```ts
interface Product {
  slug: string;         // URL-friendly identifier
  name: string;         // Nama tampilan
  price: number;        // Harga dalam Rupiah
  image: string;        // Import path gambar
  short: string;        // Deskripsi singkat
  contents: string[];   // Daftar isi buah (e.g., "Apel — 2 pcs")
  size: string;         // Ukuran kemasan
  packaging: Packaging; // "keranjang" | "box" | "besek" | "bowl" | "piring"
  occasions: Occasion[];// Target momen
  badge?: string;       // Label opsional ("Best Seller", "Hemat")
}
```

### Koleksi Produk (17 item)

**Garden Collection — Keranjang:**
- Heavenly Garden (L) — Rp 400.000 — Best Seller
- Heavenly Garden (M) — Rp 253.000
- Sweet Pop Garden — Rp 199.000
- Sweet Garden — Rp 138.000
- Sweet Garden + Belimbing — Rp 160.000
- Lovely Fresh Garden — Rp 191.000
- Lovely Garden — Rp 123.000
- Lovely Garden + Belimbing — Rp 157.000
- Berry Garden — Rp 150.000
- Berry Brust Garden — Rp 87.000

**Box Collection:**
- Sprinkle Magic Garden (M) — Rp 139.000
- Sprinkle Magic Garden (L) — Rp 177.000
- Sunny Magic Garden — Rp 151.000

**Besek / Piring / Bowl:**
- Oasis Garden — Rp 46.000 — Hemat
- Bunny Lolipop Garden — Rp 81.000
- Lolipop Garden — Rp 73.000
- Rainbow Treat Bowl — Rp 30.000 — Paling Hemat

---

## Alur Pemesanan

```
Homepage → Katalog → Detail Produk → Klik Gambar (Lightbox) → Pesan via WhatsApp
         → Custom Hampers → Langkah 1-5 → Pesan via WhatsApp
```

Pemesanan selalu diarahkan ke WhatsApp Admin dengan pesan otomatis yang sudah terencode:

```
https://wa.me/6285155452687?text={pesan}
```

---

## Scripts

| Perintah | Fungsi |
|----------|--------|
| `bun dev` | Menjalankan development server (Vite) |
| `bun run build` | Build production |
| `bun run build:dev` | Build mode development |
| `bun run preview` | Preview build production |
| `bun run lint` | ESLint |
| `bun run format` | Prettier format |

---

## Halaman & Route

| Route | File | Deskripsi |
|-------|------|-----------|
| `/` | `index.tsx` | Homepage dengan hero, koleksi favorit, cara custom, testimoni, CTA |
| `/katalog` | `katalog.tsx` | Grid katalog seluruh produk |
| `/katalog/:slug` | `katalog.$slug.tsx` | Detail produk + lightbox gambar + tombol WA |
| `/custom` | `custom.tsx` | Halaman custom hampers (5 langkah) |
| `/tentang` | `tentang.tsx` | Tentang Rasabuah Malang |
| `/testimoni` | `testimoni.tsx` | Testimoni pelanggan |
| `/rekomendasi` | `rekomendasi.tsx` | Rekomendasi pilihan hampers |
| `/kontak` | `kontak.tsx` | Informasi kontak & lokasi |

---

## Fitur Responsif

Website dioptimalkan untuk:
- **Mobile** (< 768px): Single column, stack layout, font lebih kecil, tombol WA float
- **Tablet** (768px - 1024px): 2-column grid produk
- **Desktop** (> 1024px): 4-column grid produk, 2-column hero layout

---

## Aset & Media

- **Logo**: `public/favicon.png` & `src/assets/logo.png` (transparent background)
- **Hero Image**: `src/assets/hero-person.jpg` — Foto Garden Collection dengan orang
- **Connect Image**: `src/assets/connect-person.jpg` — Foto untuk section custom/kontak
- **Product Images**: 17 foto produk di `src/assets/products/`

---

## Kontak & Brand

- **Brand**: Rasabuah Malang
- **WhatsApp**: +62 851-5545-2687
- **Area**: Malang & sekitarnya
- **Tagline**: *Parcel Buah Cantik & Segar dari Malang*

---

## Catatan Pengembangan

- `routeTree.gen.ts` di-generate otomatis oleh plugin TanStack Router — **jangan edit manual**.
- Semua warna menggunakan format `oklch` untuk konsistensi design system.
- Gambar produk diimport sebagai ES module (bukan URL string) untuk optimasi build Vite.
- Tidak ada backend/database — data produk statis di `products.ts`.
- Pemesanan 100% via WhatsApp, tidak ada cart/checkout system.
