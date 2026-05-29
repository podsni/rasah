import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/products";

export const Route = createFileRoute("/custom")({
  head: () => ({
    meta: [
      { title: "Custom Hampers — Rasabuah Malang" },
      { name: "description", content: "Buat parcel buah sesuai keinginanmu dalam 5 langkah mudah." },
      { property: "og:title", content: "Custom Hampers — Rasabuah Malang" },
      { property: "og:description", content: "Pilih budget, buah, kemasan, dan ucapan. Kirim ke WhatsApp." },
    ],
  }),
  component: Custom,
});

const budgets = ["Rp50.000 – Rp100.000", "Rp100.000 – Rp150.000", "Rp150.000 – Rp250.000", "Rp250.000 ke atas"];
const fruits = ["Apel", "Pear", "Jeruk", "Anggur", "Strawberry", "Buah Naga", "Belimbing", "Kelengkeng"];
const packs = ["Keranjang Rotan", "Box Premium", "Besek", "Bowl", "Piring Parcel"];
const greetings = ["Selamat Ulang Tahun", "Semoga Lekas Sembuh", "Terima Kasih", "Selamat Hari Raya", "Custom Sendiri"];

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

function Custom() {
  const [budget, setBudget] = useState<string>(budgets[1]);
  const [picked, setPicked] = useState<string[]>(["Apel", "Pear", "Anggur"]);
  const [pack, setPack] = useState<string>(packs[0]);
  const [greeting, setGreeting] = useState<string>(greetings[0]);
  const [custom, setCustom] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  const message = useMemo(() => (
    `Halo Rasabuah Malang, saya ingin custom hampers:\n\n` +
    `Nama: ${name || "-"}\n` +
    `Budget: ${budget}\n` +
    `Buah pilihan: ${picked.join(", ") || "-"}\n` +
    `Kemasan: ${pack}\n` +
    `Ucapan: ${greeting === "Custom Sendiri" ? custom : greeting}\n` +
    `Alamat: ${address || "-"}\n`
  ), [budget, picked, pack, greeting, custom, address, name]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
      <header className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">✦ Custom Hampers</span>
        <h1 className="mt-2 font-display text-4xl text-olive-deep md:text-5xl">Buat Parcel Sesuai Keinginanmu</h1>
        <p className="mt-3 text-muted-foreground">5 langkah mudah, langsung dikirim ke WhatsApp admin kami.</p>
      </header>

      <div className="mt-10 space-y-6">
        <Step n="01" title="Pilih Budget">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {budgets.map((b) => (
              <Option key={b} active={budget === b} onClick={() => setBudget(b)}>{b}</Option>
            ))}
          </div>
        </Step>

        <Step n="02" title="Pilih Buah (boleh lebih dari satu)">
          <div className="flex flex-wrap gap-2">
            {fruits.map((f) => {
              const active = picked.includes(f);
              return (
                <button
                  key={f}
                  onClick={() => setPicked((p) => toggle(p, f))}
                  className={
                    "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition " +
                    (active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/40")
                  }
                >
                  {active && <Check className="h-3.5 w-3.5" />} {f}
                </button>
              );
            })}
          </div>
        </Step>

        <Step n="03" title="Pilih Kemasan">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {packs.map((p) => (
              <Option key={p} active={pack === p} onClick={() => setPack(p)}>{p}</Option>
            ))}
          </div>
        </Step>

        <Step n="04" title="Tambah Kartu Ucapan">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {greetings.map((g) => (
              <Option key={g} active={greeting === g} onClick={() => setGreeting(g)}>{g}</Option>
            ))}
          </div>
          {greeting === "Custom Sendiri" && (
            <textarea
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Tulis ucapan Anda..."
              className="mt-3 w-full rounded-2xl border border-input bg-background p-3 text-sm outline-none focus:border-primary"
              rows={3}
            />
          )}
        </Step>

        <Step n="05" title="Data Pengiriman">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama pemesan"
              className="rounded-2xl border border-input bg-background p-3 text-sm outline-none focus:border-primary"
            />
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Alamat pengiriman"
              className="rounded-2xl border border-input bg-background p-3 text-sm outline-none focus:border-primary"
            />
          </div>
        </Step>

        <a
          href={waLink(message)}
          target="_blank" rel="noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-4 text-sm font-medium text-white shadow-md hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" /> Kirim Pesanan ke WhatsApp
        </a>
      </div>
    </div>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 font-display font-semibold text-primary">{n}</span>
        <h2 className="font-display text-xl text-olive-deep">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Option({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-2xl border px-4 py-3 text-sm text-left transition " +
        (active ? "border-primary bg-primary/5 text-primary font-medium" : "border-border bg-background hover:border-primary/40")
      }
    >
      {children}
    </button>
  );
}