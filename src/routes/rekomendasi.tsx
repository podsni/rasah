import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/rekomendasi")({
  head: () => ({
    meta: [
      { title: "Rekomendasi Parcel — Rasabuah Malang" },
      { name: "description", content: "Bingung pilih parcel? Kami bantu pilihkan berdasarkan budget dan kebutuhan." },
      { property: "og:title", content: "Rekomendasi Parcel — Rasabuah Malang" },
      { property: "og:description", content: "Pilihan parcel buah untuk hadiah hemat, simple, premium, hingga kantor." },
    ],
  }),
  component: Rekomendasi,
});

const groups: { title: string; desc: string; slugs: string[] }[] = [
  { title: "Untuk Budget Hemat", desc: "Pilihan terjangkau tanpa mengurangi keindahan.", slugs: ["rainbow-treat-bowl", "oasis-garden", "lolipop-garden", "berry-brust-garden"] },
  { title: "Untuk Hadiah Simple", desc: "Cantik, ringan, dan cocok untuk hadiah dadakan.", slugs: ["sweet-garden", "lovely-garden", "sweet-pop-garden"] },
  { title: "Untuk Hadiah Premium", desc: "Tampil mewah untuk momen istimewa.", slugs: ["heavenly-garden-l", "heavenly-garden-m", "sprinkle-magic-garden-l"] },
  { title: "Untuk Pecinta Strawberry", desc: "Manis dan menyegarkan, full berry!", slugs: ["berry-garden", "berry-brust-garden"] },
  { title: "Untuk Acara Kantor", desc: "Profesional, elegan, dan berkesan.", slugs: ["heavenly-garden-l", "sprinkle-magic-garden-l", "sweet-garden"] },
];

function Rekomendasi() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <header className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">✦ Rekomendasi</span>
        <h1 className="mt-2 font-display text-4xl text-olive-deep md:text-5xl">Bingung Pilih Parcel?<br/>Kami Bantu Pilihkan</h1>
        <p className="mt-3 text-muted-foreground">Pilih kategori yang paling sesuai dengan momen Anda.</p>
      </header>

      <div className="mt-12 space-y-16">
        {groups.map((g) => {
          const items = g.slugs.map((s) => products.find((p) => p.slug === s)).filter(Boolean) as typeof products;
          return (
            <section key={g.title}>
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="font-display text-2xl text-olive-deep md:text-3xl">{g.title}</h2>
                  <p className="mt-1 text-muted-foreground">{g.desc}</p>
                </div>
                <Link to="/katalog" className="hidden md:inline text-sm text-primary hover:underline">Lihat semua</Link>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
                {items.map((p) => <ProductCard key={p.slug} p={p} />)}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}