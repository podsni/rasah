import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { waLink } from "@/lib/products";
import logo from "@/assets/logo.png";

const nav = [
  { to: "/", label: "Beranda" },
  { to: "/katalog", label: "Katalog" },
  { to: "/custom", label: "Custom Hampers" },
  { to: "/rekomendasi", label: "Rekomendasi" },
  { to: "/testimoni", label: "Testimoni" },
  { to: "/tentang", label: "Tentang" },
  { to: "/kontak", label: "Kontak" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="Rasabuah" className="h-10 w-10 object-contain" />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold text-olive-deep">Rasabuah</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Malang</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-foreground/70 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary font-medium" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <a
          href={waLink("Halo Rasabuah Malang, saya ingin tanya parcel buah 🍇")}
          target="_blank" rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 transition"
        >
          Pesan via WhatsApp
        </a>

        <button
          className="lg:hidden p-2 -mr-2 text-foreground"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-foreground/80"
                activeProps={{ className: "text-primary font-medium" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href={waLink("Halo Rasabuah Malang, saya ingin tanya parcel buah 🍇")}
              target="_blank" rel="noreferrer"
              className="mt-2 inline-flex justify-center rounded-full bg-whatsapp px-4 py-2 text-sm font-medium text-white"
            >
              Pesan via WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}