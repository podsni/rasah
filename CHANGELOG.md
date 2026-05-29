# CHANGELOG — Rasabuah Malang

## [Unreleased] — 2026-05-29

### Fixed
- **Navigasi detail produk tidak berfungsi** — root cause: `katalog.tsx` adalah layout route tanpa `<Outlet />`, sehingga child route `katalog.$slug` tidak pernah di-render. Diperbaiki dengan memisahkan `katalog.tsx` menjadi pure layout shell (`<Outlet />`) dan membuat `katalog.index.tsx` untuk halaman list katalog.

### Added
- **Halaman detail produk** (`/katalog/:slug`) — redesign penuh:
  - Layout 2-kolom (gambar kiri, info kanan) di desktop; stack di mobile
  - Gambar bersih tanpa overlay gelap
  - Staggered entrance animation (enter-up per elemen)
  - Isi hampers sebagai visual list card dengan nama & qty terpisah
  - Order card: kartu ucapan, qty stepper, tombol Pesan via WhatsApp
  - Total harga otomatis muncul saat qty > 1
  - Tombol share (salin link)
  - Related products dengan scroll-reveal

- **Lightbox zoom/drag** di halaman detail:
  - Klik gambar → lightbox fullscreen
  - Tombol zoom in / zoom out
  - Scroll mouse untuk zoom
  - Pinch gesture di mobile untuk zoom
  - Drag untuk geser saat sudah di-zoom
  - Keyboard: `+`/`-` zoom, `Escape` tutup
  - Counter persentase zoom (100%–500%)
  - Tombol reset muncul saat sudah di-zoom

- **CSS animation tokens** di `styles.css`:
  - Custom easings: `--ease-out-premium`, `--ease-out-strong`, `--ease-spring`
  - Duration palette: `--dur-quick` (200ms), `--dur-standard` (350ms), `--dur-slow` (550ms)
  - Keyframes: `enter-up`, `enter-scale`, `reveal-clip`, `fade-in`
  - Stagger utility classes (`.stagger-1` s/d `.stagger-6`)
  - Scroll-reveal class (`.scroll-reveal` + `.revealed`)
  - `prefers-reduced-motion` support

- **Sync data produk** dari `catalog_data.json`:
  - Nama produk diupdate: Sweet Garden (A)/(B), Lovely Garden (A)/(B)
  - Field `rawDescription` ditambahkan dari data JSON asli

### Changed
- **ProductCard** — redesign:
  - Gambar bersih tanpa gradient overlay gelap
  - Hover: lift `-translate-y-1`, shadow, border tint
  - Image scale `1.04` on hover
  - Detail button fill `bg-primary` on hover
  - `active:scale-[0.98]` press feedback
  - Responsive text size (mobile lebih kecil)

- **Motion design** (warm-modern, premium personality):
  - Signature easing: `cubic-bezier(0.4, 0, 0.2, 1)`
  - Image hero: `reveal-clip` entrance (550ms)
  - Konten info: stagger 80ms–520ms
  - Tombol WA: `active:scale-[0.97]` (Emil Kowalski principle)
  - Qty buttons: `active:scale-90`
