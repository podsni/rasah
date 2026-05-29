import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { products, packagingLabel, occasionLabel, type Packaging, type Occasion } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

type PriceBand = "all" | "u100" | "100-150" | "150-250" | "o250";

const priceBands: { id: PriceBand; label: string }[] = [
  { id: "all", label: "Semua harga" },
  { id: "u100", label: "< Rp100rb" },
  { id: "100-150", label: "Rp100–150rb" },
  { id: "150-250", label: "Rp150–250rb" },
  { id: "o250", label: "> Rp250rb" },
];

const packs: Packaging[] = ["keranjang", "box", "besek", "bowl", "piring"];
const occs: Occasion[] = ["keluarga", "kantor", "ulang-tahun", "syukuran", "lebaran", "simple"];

export const Route = createFileRoute("/katalog")({
  head: () => ({
    meta: [
      { title: "Katalog Hampers — Rasabuah Malang" },
      { name: "description", content: "Telusuri koleksi parcel buah segar Rasabuah Malang. Filter berdasarkan harga, kemasan, dan kebutuhan." },
      { property: "og:title", content: "Katalog Hampers — Rasabuah Malang" },
      { property: "og:description", content: "Pilih parcel buah segar untuk setiap momen, mulai dari Rp30.000." },
    ],
  }),
  component: Katalog,
});

function inBand(price: number, b: PriceBand) {
  if (b === "all") return true;
  if (b === "u100") return price < 100000;
  if (b === "100-150") return price >= 100000 && price <= 150000;
  if (b === "150-250") return price > 150000 && price <= 250000;
  return price > 250000;
}

function Katalog() {
  const [q, setQ] = useState("");
  const [band, setBand] = useState<PriceBand>("all");
  const [pack, setPack] = useState<Packaging | "all">("all");
  const [occ, setOcc] = useState<Occasion | "all">("all");

  const filtered = useMemo(() => products.filter((p) => {
    if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
    if (!inBand(p.price, band)) return false;
    if (pack !== "all" && p.packaging !== pack) return false;
    if (occ !== "all" && !p.occasions.includes(occ)) return false;
    return true;
  }), [q, band, pack, occ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <header className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Garden Collection</span>
        <h1 className="mt-2 font-display text-4xl text-olive-deep md:text-5xl">Katalog Hampers</h1>
        <p className="mt-3 text-muted-foreground">Pilih parcel buah favorit untuk momen spesialmu.</p>
      </header>

      <div className="mt-8 rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari hampers buah..."
            className="w-full rounded-full border border-input bg-background py-3 pl-10 pr-4 text-sm outline-none focus:border-primary"
          />
        </div>

        <Group title="Harga">
          {priceBands.map((b) => (
            <Chip key={b.id} active={band === b.id} onClick={() => setBand(b.id)}>{b.label}</Chip>
          ))}
        </Group>
        <Group title="Kemasan">
          <Chip active={pack === "all"} onClick={() => setPack("all")}>Semua</Chip>
          {packs.map((p) => (
            <Chip key={p} active={pack === p} onClick={() => setPack(p)}>{packagingLabel[p]}</Chip>
          ))}
        </Group>
        <Group title="Kebutuhan">
          <Chip active={occ === "all"} onClick={() => setOcc("all")}>Semua</Chip>
          {occs.map((o) => (
            <Chip key={o} active={occ === o} onClick={() => setOcc(o)}>{occasionLabel[o]}</Chip>
          ))}
        </Group>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">{filtered.length} produk ditemukan</p>

      <div className="mt-4 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => <ProductCard key={p.slug} p={p} />)}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
          Tidak ada produk yang cocok dengan filter. Coba ubah pencarian Anda.
        </div>
      )}
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{title}</div>
      <div className="mt-2 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-full border px-3.5 py-1.5 text-xs transition " +
        (active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground/70 hover:border-primary/40")
      }
    >
      {children}
    </button>
  );
}