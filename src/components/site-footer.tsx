import { Link } from "@tanstack/react-router";
import { Instagram, Music2, Phone, Leaf } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-olive-deep text-background/90">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-background/10">
              <Leaf className="h-5 w-5 text-gold" />
            </span>
            <div className="leading-tight">
              <div className="font-display text-lg">Rasabuah Malang</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-background/60">Fresh Fruit Hampers</div>
            </div>
          </div>
          <p className="text-sm text-background/70 max-w-xs">
            Parcel buah premium dengan buah segar pilihan dan kemasan elegan untuk setiap momen berharga.
          </p>
        </div>

        <div>
          <h4 className="font-display text-base text-gold mb-3">Menu</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-gold">Beranda</Link></li>
            <li><Link to="/katalog" className="hover:text-gold">Katalog</Link></li>
            <li><Link to="/custom" className="hover:text-gold">Custom Hampers</Link></li>
            <li><Link to="/rekomendasi" className="hover:text-gold">Rekomendasi</Link></li>
            <li><Link to="/testimoni" className="hover:text-gold">Testimoni</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base text-gold mb-3">Informasi</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/kontak" className="hover:text-gold">Cara Pemesanan</Link></li>
            <li><Link to="/kontak" className="hover:text-gold">Pengiriman</Link></li>
            <li><Link to="/tentang" className="hover:text-gold">Tentang Kami</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base text-gold mb-3">Hubungi Kami</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> 0851 5545 2687</li>
            <li className="flex items-center gap-2"><Instagram className="h-4 w-4 text-gold" /> rasabuah.mlg</li>
            <li className="flex items-center gap-2"><Music2 className="h-4 w-4 text-gold" /> rasabuah.mlg</li>
          </ul>
          <p className="mt-4 text-xs text-background/60">Pelayanan setiap hari · 08.00 – 18.00 WIB</p>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-background/60 md:px-8">
          © {new Date().getFullYear()} Rasabuah Malang. All rights reserved.
        </div>
      </div>
    </footer>
  );
}