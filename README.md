# Rasabuah Malang — Katalog Digital Hampers Buah Premium

> Website katalog digital + pemesanan via WhatsApp untuk **Rasabuah Malang** — parcel buah cantik & segar dari Malang dengan kemasan elegan dan sentuhan personal.

---

## Deskripsi

Website ini adalah **katalog digital** untuk brand hampers buah premium di Malang. Fokus utama: tampilan premium yang mudah dinavigasi, detail produk lengkap, dan alur pemesanan langsung ke WhatsApp admin tanpa keribetan. Tidak ada backend, tidak ada cart/checkout — semua pemesanan diarahkan ke WhatsApp.

---

## Tech Stack

| Kategori | Detail |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) v1 — Full-stack React 19, SSR |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS v4 (native CSS `@import`, `oklch` design tokens) |
| UI Components | shadcn/ui (New York style, Radix UI primitives) |
| Icons | Lucide React |
| Routing | File-based routing (TanStack Router) |
| Query | TanStack Query v5 |
| Type Safety | TypeScript 5.8 (strict mode) |
| Package Manager | Bun |

---

## Struktur Direktori

```
.
├── public/
│   └── favicon.png
├── src/
│   ├── assets/
│   │   ├── hero-person.jpg
│   │   ├── connect-person.jpg
│   │   ├── logo.png
│   │   └── products/          # 17 foto produk (.jpg)
│   │
│   ├── components/
│   │   ├── product-card.tsx   # Card produk untuk grid katalog
│   │   ├── site-header.tsx    # Navbar + logo
│   │   ├── site-footer.tsx    # Footer dengan link sosmed
│   │   ├── whatsapp-float.tsx # Floating WhatsApp button
│   │   └── ui/                # shadcn/ui components
│   │
│   ├── lib/
│   │   ├── products.ts        # Data produk + helper formatting & WA link
│   │   └── utils.ts           # cn / clsx helper
│   │
│   ├── routes/
│   │   ├── __root.tsx         # Root layout (HTML shell + providers)
│   │   ├── index.tsx          # / — Homepage
│   │   ├── katalog.tsx        # /katalog — Layout shell (Outlet)
│   │   ├── katalog.index.tsx  # /katalog — Halaman list katalog + filter
│   │   ├── katalog.$slug.tsx  # /katalog/:slug — Detail produk + lightbox
│   │   ├── custom.tsx         # /custom — Custom hampers builder
│   │   ├── tentang.tsx        # /tentang — Tentang kami
│   │   ├── testimoni.tsx      # /testimoni — Testimoni pelanggan
│   │   ├── rekomendasi.tsx    # /rekomendasi — Rekomendasi hampers
│   │   └── kontak.tsx         # /kontak — Informasi kontak
│   │
│   ├── router.tsx             # Router bootstrap + QueryClient
│   ├── start.ts               # TanStack Start entry
│   ├── server.ts              # Server entry
│   └── styles.css             # Design tokens (oklch), Tailwind, animasi
│
├── CHANGELOG.md
├── vite.config.ts
├── components.json            # shadcn/ui config
├── tsconfig.json
├── bun.lock
└── package.json
```

---

## Halaman & Route

| Route | File | Deskripsi |
|---|---|---|
| `/` | `index.tsx` | Homepage: hero, koleksi favorit, cara custom, testimoni, CTA |
| `/katalog` | `katalog.index.tsx` | Grid katalog + filter harga/kemasan/kebutuhan + search |
| `/katalog/:slug` | `katalog.$slug.tsx` | Detail produk: gambar, isi hampers, order form, related |
| `/custom` | `custom.tsx` | Custom hampers builder (5 langkah) |
| `/tentang` | `tentang.tsx` | Tentang Rasabuah Malang |
| `/testimoni` | `testimoni.tsx` | Testimoni pelanggan |
| `/rekomendasi` | `rekomendasi.tsx` | Rekomendasi pilihan hampers |
| `/kontak` | `kontak.tsx` | Informasi kontak & sosial media |

---

## Data Produk

Semua data produk tersimpan statis di `src/lib/products.ts`. Sumber data dari `catalog_data.json` (17 produk).

```ts
interface Product {
  slug: string;          // URL identifier
  name: string;          // Nama produk
  price: number;         // Harga dalam Rupiah
  image: string;         // Import path gambar
  short: string;         // Deskripsi singkat
  rawDescription: string;// Deskripsi asli dari katalog
  contents: string[];    // Isi hampers, format "Item — qty"
  size: string;          // Ukuran kemasan
  packaging: Packaging;  // "keranjang" | "box" | "besek" | "bowl" | "piring"
  occasions: Occasion[]; // Target momen
  badge?: string;        // "Best Seller" | "Hemat" | "Paling Hemat"
}
```

### Koleksi Produk (17 item)

| Nama | Harga | Kemasan |
|---|---|---|
| Heavenly Garden (L) | Rp400.000 | Keranjang 40cm |
| Heavenly Garden (M) | Rp253.000 | Keranjang 32cm |
| Sweet Pop Garden | Rp199.000 | Keranjang Rotan 22cm |
| Sweet Garden (A) | Rp138.000 | Keranjang Rotan 22cm |
| Sweet Garden (B) | Rp160.000 | Keranjang Rotan 22cm |
| Lovely Fresh Garden | Rp191.000 | Keranjang 22cm |
| Lovely Garden (A) | Rp123.000 | Keranjang 22cm |
| Lovely Garden (B) | Rp157.000 | Keranjang 22cm |
| Sprinkle Magic Garden (M) | Rp139.000 | Box 22cm |
| Sprinkle Magic Garden (L) | Rp177.000 | Box 25cm |
| Sunny Magic Garden | Rp151.000 | Box 22cm |
| Berry Garden | Rp150.000 | Keranjang 18cm |
| Berry Brust Garden | Rp87.000 | Keranjang 18cm |
| Oasis Garden | Rp46.000 | Besek 25cm |
| Bunny Lolipop Garden | Rp81.000 | Piring 22cm |
| Lolipop Garden | Rp73.000 | Piring 22cm |
| Rainbow Treat Bowl | Rp30.000 | Bowl Ø13cm |

---

## Design System

### Color Palette (oklch)

| Token | Penggunaan |
|---|---|
| `--background` | Cream — latar belakang utama |
| `--foreground` | Deep Olive — teks utama |
| `--primary` | Olive Green — primary actions, badges |
| `--gold` | Gold Accent — harga, bintang, aksen CTA |
| `--whatsapp` | WhatsApp Green — tombol pesan |
| `--olive-deep` | Dark Olive — headings, footer |

### Typography

- **Display / Heading**: `Cormorant Garamond` — serif elegan
- **Body**: `Inter` — sans-serif modern

### Animation Tokens

```css
--ease-out-premium: cubic-bezier(0.4, 0, 0.2, 1)  /* signature easing */
--ease-out-strong:  cubic-bezier(0.23, 1, 0.32, 1)
--dur-quick:    200ms
--dur-standard: 350ms
--dur-slow:     550ms
```

Keyframes tersedia: `enter-up`, `enter-scale`, `reveal-clip`, `fade-in`.
Utility: `.scroll-reveal` + `.revealed` untuk scroll-triggered animations.

---

## Fitur Utama

### Katalog & Filter
- Grid 2-kolom (mobile) / 3-kolom / 4-kolom (desktop)
- Filter real-time: harga, kemasan, kebutuhan/momen
- Search by nama produk

### Halaman Detail Produk
- Layout 2-kolom di desktop, stack di mobile
- Gambar produk full dengan hover zoom hint
- Visual list isi hampers (nama + qty)
- Kartu ucapan opsional
- Qty stepper dengan total otomatis
- Tombol Pesan via WhatsApp dengan pesan pre-filled
- Related products dengan scroll-reveal

### Lightbox Gambar
- Zoom in/out via tombol, scroll mouse, atau pinch gesture (mobile)
- Drag untuk geser saat sudah di-zoom
- Keyboard: `+`/`-` zoom, `Escape` tutup
- Counter persentase zoom (100%–500%)

### Alur Pemesanan
```
Katalog → Detail Produk → Isi qty + ucapan → Pesan via WhatsApp
Custom Hampers → 5 langkah → Pesan via WhatsApp
```

Pesan otomatis ter-encode ke:
```
https://wa.me/6285155452687?text={pesan}
```

---

## Scripts

```bash
bun dev          # Development server (localhost:8080)
bun run build    # Production build
bun run preview  # Preview production build
bun run lint     # ESLint
bun run format   # Prettier
```

---

## Kontak & Brand

| | |
|---|---|
| **Brand** | Rasabuah Malang |
| **WhatsApp** | [+62 851-5545-2687](https://wa.me/6285155452687) |
| **Instagram** | [@rasabuah.mlg](https://instagram.com/rasabuah.mlg) |
| **TikTok** | [@rasabuah.mlg](https://tiktok.com/@rasabuah.mlg) |
| **Area** | Malang & sekitarnya |
| **Tagline** | *Parcel Buah Cantik & Segar dari Malang* |

---

## Catatan Pengembangan

- `routeTree.gen.ts` di-generate otomatis oleh TanStack Router plugin — **jangan edit manual**.
- `katalog.tsx` adalah pure layout shell (`<Outlet />`). Konten list katalog ada di `katalog.index.tsx`.
- Semua warna menggunakan format `oklch` untuk konsistensi.
- Gambar produk diimport sebagai ES module untuk optimasi build Vite.
- Tidak ada backend/database — semua data statis di `products.ts`.
- Pemesanan 100% via WhatsApp, tidak ada cart/checkout system.
