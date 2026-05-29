import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MessageCircle, Phone, Instagram, MapPin, Clock } from "lucide-react";
import { products, waLink, formatRp } from "@/lib/products";

export const Route = createFileRoute("/kontak")({
  head: () => ({
    meta: [
      { title: "Kontak & Pemesanan — Rasabuah Malang" },
      { name: "description", content: "Form pemesanan singkat dan kontak Rasabuah Malang." },
      { property: "og:title", content: "Kontak — Rasabuah Malang" },
      { property: "og:description", content: "Pesan parcel buah segar dengan mudah via WhatsApp." },
    ],
  }),
  component: Kontak,
});

function Kontak() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [slug, setSlug] = useState(products[0].slug);
  const [qty, setQty] = useState("1");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const product = products.find((p) => p.slug === slug)!;

  const msg = useMemo(() => (
    `Halo Rasabuah Malang, saya ingin pesan:\n\n` +
    `Nama: ${name || "-"}\n` +
    `No. WhatsApp: ${phone || "-"}\n` +
    `Produk: ${product.name} (${formatRp(product.price)})\n` +
    `Jumlah: ${qty}\n` +
    `Tanggal kirim: ${date || "-"}\n` +
    `Alamat: ${address || "-"}\n` +
    `Catatan: ${note || "-"}\n`
  ), [name, phone, product, qty, date, address, note]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
      <header className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Kontak</span>
        <h1 className="mt-2 font-display text-4xl text-olive-deep md:text-5xl">Pesan Sekarang</h1>
        <p className="mt-3 text-muted-foreground">Isi form singkat berikut, kami balas cepat lewat WhatsApp.</p>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nama pemesan"><input value={name} onChange={(e)=>setName(e.target.value)} className={inp} placeholder="Nama lengkap" /></Field>
            <Field label="No. WhatsApp"><input value={phone} onChange={(e)=>setPhone(e.target.value)} className={inp} placeholder="08xx..." /></Field>
            <Field label="Pilih produk">
              <select value={slug} onChange={(e)=>setSlug(e.target.value)} className={inp}>
                {products.map((p) => <option key={p.slug} value={p.slug}>{p.name} — {formatRp(p.price)}</option>)}
              </select>
            </Field>
            <Field label="Jumlah"><input type="number" min={1} value={qty} onChange={(e)=>setQty(e.target.value)} className={inp} /></Field>
            <Field label="Tanggal pengiriman"><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className={inp} /></Field>
            <Field label="Alamat pengiriman"><input value={address} onChange={(e)=>setAddress(e.target.value)} className={inp} placeholder="Jalan, kota..." /></Field>
          </div>
          <Field label="Catatan / kartu ucapan" className="mt-4">
            <textarea value={note} onChange={(e)=>setNote(e.target.value)} rows={3} className={inp} placeholder="Tulis ucapan..." />
          </Field>
          <a
            href={waLink(msg)}
            target="_blank" rel="noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-medium text-white shadow-md hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" /> Kirim Pesanan ke WhatsApp
          </a>
        </div>

        <aside className="space-y-4">
          <Card icon={<Phone className="h-4 w-4" />} title="WhatsApp" value="0851 5545 2687" href="https://wa.me/6285155452687" />
          <Card icon={<Instagram className="h-4 w-4" />} title="Instagram" value="@rasabuah.mlg" href="https://instagram.com/rasabuah.mlg" />
          <Card icon={<MapPin className="h-4 w-4" />} title="Area Pengiriman" value="Malang & sekitarnya" />
          <Card icon={<Clock className="h-4 w-4" />} title="Jam Operasional" value="Setiap hari · 08.00 – 18.00 WIB" />
        </aside>
      </div>
    </div>
  );
}

const inp = "w-full rounded-2xl border border-input bg-background p-3 text-sm outline-none focus:border-primary";

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={"block " + className}>
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Card({ icon, title, value, href }: { icon: React.ReactNode; title: string; value: string; href?: string }) {
  const content = (
    <div className={"rounded-2xl border border-border/60 bg-card p-5" + (href ? " hover:border-primary/40 transition-colors" : "")}>
      <div className="flex items-center gap-2 text-primary">{icon}<span className="text-xs font-semibold uppercase tracking-wider">{title}</span></div>
      <div className="mt-1 text-sm font-medium text-olive-deep">{value}</div>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noreferrer">{content}</a> : content;
}