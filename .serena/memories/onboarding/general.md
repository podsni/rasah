# Rasabuah Malang — Premium Fruit Hampers Catalog

## Project Purpose
A premium digital catalog and WhatsApp ordering website for Rasabuah Malang, a fruit hampers brand. Focuses on premium aesthetics, clear product details, and a seamless transition to WhatsApp for ordering.

## Tech Stack
- **Frontend Framework:** TanStack Start v1 (React 19, SSR/SSG)
- **Styling:** Tailwind CSS v4 (native CSS tokens)
- **UI Components:** shadcn/ui (Radix UI)
- **Icons:** Lucide React
- **Routing:** TanStack Router (File-based)
- **State Management:** TanStack Query
- **Language:** TypeScript 5.8 (Strict)
- **Runtime/Package Manager:** Bun

## Key Features
- Digital Catalog with search and filters (Price, Packaging, Occasion).
- High-quality Product Detail page with Lightbox (zoom/drag/pinch).
- WhatsApp Ordering with auto-encoded messages.
- Premium Motion Design (staggered entrance, signature easings, scroll-reveal).
- Responsive Design (Mobile, Tablet, Desktop).

## Data Structure
Product data is static in `src/lib/products.ts`.
Interface `Product` includes: slug, name, price, image, short, rawDescription, contents, size, packaging, occasions, badge.
