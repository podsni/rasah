import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, MessageCircle, Minus, Plus } from "lucide-react";
import { getProduct, formatRp, packagingLabel, occasionLabel, waLink, products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/katalog/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Produk — Rasabuah Malang" }] };
    return {
      meta: [
        { title: `${p.name} — Rasabuah Malang` },
        { name: "description", content: `${p.name}. ${p.short} Mulai dari ${formatRp(p.price)}.` },
        { property: "og:title", content: `${p.name} — Rasabuah Malang` },
        { property: "og:description", content: p.short },
        { property: "og:image", content: p.image },
        { name: "twitter:image", content: p.image },
      ],
    };
  },
  component: Detail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl p-16 text-center">
      <h1 className="font-display text-3xl text-olive-deep">Produk tidak ditemukan</h1>
      <Link to="/katalog" className="mt-4 inline-block text-primary hover:underline">Kembali ke katalog</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-xl p-16 text-center">
      <p className="text-sm text-destructive">{error.message}</p>
    </div>
  ),
});

function Detail() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");

  const message =
    `Halo Rasabuah Malang, saya ingin pesan:\n\n` +
    `*${product.name}*\n` +
    `Harga: ${formatRp(product.price)}\n` +
    `Jumlah: ${qty}\n` +
    (note ? `Catatan / ucapan: ${note}\n` : ``) +
    `\nMohon info ketersediaan & pengiriman 🙏`;

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <Link to="/katalog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Kembali ke katalog
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-border/60 bg-card">
          <img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover" />
        </div>

        <div>
          {product.badge && (
            <span className="rounded-full bg-gold/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-olive-deep">
              {product.badge}
            </span>
          )}
          <h1 className="mt-3 font-display text-4xl text-olive-deep md:text-5xl">{product.name}</h1>
          <div className="mt-2 text-2xl font-display font-semibold text-primary">{formatRp(product.price)}</div>
          <p className="mt-4 text-muted-foreground">{product.short}</p>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <Info label="Kemasan" value={packagingLabel[product.packaging]} />
            <Info label="Ukuran" value={product.size} />
          </div>

          <div className="mt-6 rounded-2xl border border-border/60 bg-secondary/40 p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">Isi Hampers</div>
            <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {product.contents.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm text-foreground/80">
                  <Check className="h-3.5 w-3.5 text-primary" /> {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cocok untuk</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.occasions.map((o) => (
                <span key={o} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground/80">{occasionLabel[o]}</span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Catatan / Kartu Ucapan (opsional)</label>
            <textarea
              value={note}
              maxLength={200}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Tulis ucapan untuk penerima..."
              className="mt-2 w-full rounded-2xl border border-input bg-background p-3 text-sm outline-none focus:border-primary"
              rows={3}
            />
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-border bg-background">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-10 w-10 place-items-center text-foreground/70 hover:text-primary"><Minus className="h-4 w-4" /></button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="grid h-10 w-10 place-items-center text-foreground/70 hover:text-primary"><Plus className="h-4 w-4" /></button>
            </div>
            <a
              href={waLink(message)}
              target="_blank" rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-medium text-white shadow-md hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" /> Pesan via WhatsApp
            </a>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-2xl text-olive-deep md:text-3xl">Hampers lain yang mungkin Anda suka</h2>
        <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
          {related.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-sm font-medium text-olive-deep">{value}</div>
    </div>
  );
}