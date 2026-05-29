import { createFileRoute } from "@tanstack/react-router";
import { Apple, Heart, Sparkles, Package } from "lucide-react";
import cover from "@/assets/products/cover.jpg";

export const Route = createFileRoute("/tentang")({
  head: () => ({
    meta: [
      { title: "Tentang Kami — Rasabuah Malang" },
      { name: "description", content: "Rasabuah Malang menghadirkan parcel buah segar dan elegan untuk setiap momen berharga." },
      { property: "og:title", content: "Tentang Rasabuah Malang" },
      { property: "og:description", content: "Kisah di balik parcel buah premium dari Malang." },
    ],
  }),
  component: Tentang,
});

const points = [
  { icon: Apple, title: "Buah Dipilih Setiap Hari", desc: "Kami memilih buah segar dengan kualitas terbaik." },
  { icon: Package, title: "Kemasan Rapi & Estetik", desc: "Setiap parcel dirangkai dengan detail." },
  { icon: Sparkles, title: "Bisa Custom Sesuai Budget", desc: "Fleksibel mengikuti kebutuhan Anda." },
  { icon: Heart, title: "Cocok untuk Berbagai Momen", desc: "Keluarga, kantor, syukuran, hingga ulang tahun." },
];

function Tentang() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Tentang Kami</span>
          <h1 className="mt-2 font-display text-4xl text-olive-deep md:text-5xl">Hadiah sehat, cantik, & berkesan dari Malang</h1>
          <p className="mt-5 text-muted-foreground">
            Rasabuah Malang hadir untuk memberikan pilihan hadiah sehat, cantik, dan berkesan melalui parcel buah segar dengan kemasan premium. Setiap parcel dirangkai dengan penuh perhatian agar cocok diberikan kepada keluarga, sahabat, rekan kerja, maupun orang spesial.
          </p>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl shadow-olive-deep/10">
          <img src={cover} alt="Garden Collection" className="aspect-[4/3] w-full object-cover" />
        </div>
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p) => (
          <div key={p.title} className="rounded-2xl border border-border/60 bg-card p-6">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <p.icon className="h-5 w-5" />
            </span>
            <div className="mt-3 font-semibold text-olive-deep">{p.title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{p.desc}</div>
          </div>
        ))}
      </div>

      <section className="mt-20">
        <h2 className="font-display text-3xl text-olive-deep">FAQ</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-border/60 bg-card p-5">
              <summary className="cursor-pointer list-none font-medium text-olive-deep flex items-center justify-between">
                {f.q}
                <span className="text-primary transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

const faqs = [
  { q: "Apakah bisa custom isi buah?", a: "Bisa, sesuai budget dan ketersediaan buah saat itu." },
  { q: "Apakah bisa kirim ke alamat penerima?", a: "Bisa, untuk area Malang dan sekitarnya." },
  { q: "Apakah bisa tambah kartu ucapan?", a: "Bisa, pembeli dapat menulis ucapan sendiri." },
  { q: "Apakah harga bisa berubah?", a: "Bisa, menyesuaikan harga buah dan ketersediaan stok." },
];