import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";

export const Route = createFileRoute("/testimoni")({
  head: () => ({
    meta: [
      { title: "Testimoni — Rasabuah Malang" },
      { name: "description", content: "Cerita dan ulasan pelanggan Rasabuah Malang." },
      { property: "og:title", content: "Testimoni — Rasabuah Malang" },
      { property: "og:description", content: "Apa kata mereka tentang hampers Rasabuah Malang." },
    ],
  }),
  component: Testimoni,
});

const reviews = [
  { name: "Anisa R.", city: "Malang", text: "Hampersnya cantik banget, buahnya super segar. Pengiriman tepat waktu, packing rapi. Recommended!", rating: 5 },
  { name: "Dimas A.", city: "Surabaya", text: "Kemasan premium, sangat elegan. Penerima suka sekali. Terima kasih Rasabuah!", rating: 5 },
  { name: "Yulia S.", city: "Malang", text: "Pelayanan ramah dan fast response. Sudah order beberapa kali, selalu memuaskan.", rating: 5 },
  { name: "Rendy P.", city: "Batu", text: "Untuk acara kantor, parcelnya tampil mewah dan rapi. Bos pun puas!", rating: 5 },
  { name: "Nina K.", city: "Malang", text: "Custom hampers-nya bisa banget sesuai keinginan, dan harganya masih masuk akal.", rating: 5 },
  { name: "Putri M.", city: "Sidoarjo", text: "Strawberry-nya manis dan masih segar pas sampai. Cantik banget visualnya.", rating: 5 },
];

function Testimoni() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <header className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">🌸 Apa Kata Mereka</span>
        <h1 className="mt-2 font-display text-4xl text-olive-deep md:text-5xl">Cerita dari Pelanggan</h1>
      </header>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <figure key={r.name} className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
            <div className="flex items-center gap-1 text-gold">
              {[...Array(r.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <blockquote className="mt-3 text-sm text-foreground/80">"{r.text}"</blockquote>
            <figcaption className="mt-4 border-t border-border/60 pt-3">
              <div className="text-sm font-semibold text-olive-deep">{r.name}</div>
              <div className="text-xs text-muted-foreground">{r.city}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}