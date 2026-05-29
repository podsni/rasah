import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Apple, Package, Truck, Heart, MessageCircle, ArrowRight, Star, Sparkles } from "lucide-react";
import { products, waLink } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import heroImg from "@/assets/hero-person.jpg";

const features = [
  { icon: Apple, title: "Buah Segar Pilihan", desc: "Dipetik & dipilih setiap hari" },
  { icon: Package, title: "Kemasan Premium", desc: "Rapi, elegan, instagramable" },
  { icon: Truck, title: "Pengiriman Aman", desc: "Area Malang & sekitarnya" },
  { icon: Heart, title: "Layanan Personal", desc: "Kartu ucapan custom" },
];

const steps = [
  { n: "01", title: "Pilih Budget", desc: "Sesuaikan dengan anggaran Anda" },
  { n: "02", title: "Pilih Buah", desc: "Pilih buah segar favorit Anda" },
  { n: "03", title: "Pilih Kemasan", desc: "Keranjang, box atau bowl" },
  { n: "04", title: "Tulis Ucapan", desc: "Tambahkan kartu ucapan personal" },
  { n: "05", title: "Kirim Pesanan", desc: "Kami siapkan dengan penuh cinta" },
];

const testimonials = [
  { name: "Anisa R.", city: "Malang", text: "Hampersnya cantik, buahnya super segar! Pengiriman tepat waktu, recommended!" },
  { name: "Dimas A.", city: "Surabaya", text: "Kemasan premium dan elegan banget. Penerima suka sekali, terima kasih!" },
  { name: "Yulia S.", city: "Malang", text: "Pelayanan ramah dan fast response. Pasti order lagi di Rasabuah Malang!" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rasabuah Malang — Parcel Buah Cantik & Segar dari Malang" },
      { name: "description", content: "Hampers buah premium dengan pilihan buah segar, kemasan elegan, dan sentuhan personal untuk momen spesial Anda." },
      { property: "og:title", content: "Rasabuah Malang — Parcel Buah Premium" },
      { property: "og:description", content: "Pesan parcel buah segar untuk keluarga, kantor, syukuran, dan ulang tahun via WhatsApp." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = products.slice(0, 4);
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-secondary via-background to-background" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-16 md:px-8 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Premium Fruit Hampers
            </span>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] text-olive-deep md:text-6xl lg:text-7xl">
              Parcel Buah Cantik<br /><span className="italic text-primary">&amp; Segar</span> dari Malang
            </h1>
            <p className="mt-6 max-w-lg text-base text-muted-foreground md:text-lg">
              Hampers buah premium dengan pilihan buah segar, kemasan elegan, dan sentuhan personal untuk hadiah keluarga, kantor, syukuran, ulang tahun, dan momen spesial lainnya.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={waLink("Halo Rasabuah Malang, saya ingin pesan parcel buah 🍇")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-medium text-white shadow-md hover:opacity-90">
                <MessageCircle className="h-4 w-4" /> Pesan via WhatsApp
              </a>
              <Link to="/katalog" className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background px-6 py-3 text-sm font-medium text-primary hover:bg-primary/5">
                Lihat Katalog <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {features.map((f) => (
                <div key={f.title} className="flex flex-col gap-1">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
                    <f.icon className="h-4 w-4" />
                  </span>
                  <div className="mt-1 text-xs font-semibold text-olive-deep">{f.title}</div>
                  <div className="text-[11px] text-muted-foreground">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-gold/30 via-secondary to-transparent blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-olive-deep/20">
              <img
                src={heroImg}
                alt="Garden Collection — Rasabuah Malang"
                loading="eager"
                className="aspect-[4/5] w-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-olive-deep/40 to-transparent" />
            </div>
            <div className="absolute -bottom-4 left-4 md:-bottom-5 md:-left-5 rounded-2xl border border-border bg-background/95 p-3 md:p-4 shadow-xl backdrop-blur">
              <div className="flex items-center gap-1 text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-1 text-xs font-medium text-olive-deep">200+ pesanan bahagia</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">🌿 Garden Collection</span>
            <h2 className="mt-2 font-display text-4xl text-olive-deep md:text-5xl">Koleksi favorit kami</h2>
            <p className="mt-2 max-w-lg text-muted-foreground">Hampers cantik untuk berbagai momen spesial.</p>
          </div>
          <Link to="/katalog" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            Lihat semua katalog <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>

      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">✦ Custom Hampers</span>
              <h2 className="mt-2 font-display text-4xl text-olive-deep md:text-5xl">Buat parcel sesuai keinginanmu</h2>
              <p className="mt-3 max-w-md text-muted-foreground">Rancang hampers impian Anda dalam 5 langkah mudah, langsung kami siapkan.</p>
              <Link to="/custom" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Mulai Custom Hampers <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ol className="space-y-3">
              {steps.map((s) => (
                <li key={s.n} className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 font-display text-lg font-semibold text-primary">{s.n}</span>
                  <div>
                    <div className="font-semibold text-olive-deep">{s.title}</div>
                    <div className="text-sm text-muted-foreground">{s.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">🌸 Apa Kata Mereka</span>
          <h2 className="mt-2 font-display text-4xl text-olive-deep md:text-5xl">Cerita dari pelanggan</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="flex items-center gap-1 text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-3 text-sm text-foreground/80">"{t.text}"</blockquote>
              <figcaption className="mt-4 border-t border-border/60 pt-3">
                <div className="text-sm font-semibold text-olive-deep">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.city}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-olive-deep p-10 text-background md:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative max-w-xl">
            <h2 className="font-display text-4xl md:text-5xl">Kirim perhatian melalui parcel buah segar</h2>
            <p className="mt-3 text-background/80">Pesan sekarang dan kami siapkan dengan penuh perhatian untuk orang tersayang Anda.</p>
            <a href={waLink("Halo Rasabuah, saya ingin pesan parcel 🌿")} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-olive-deep hover:opacity-90">
              <MessageCircle className="h-4 w-4" /> Pesan via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
