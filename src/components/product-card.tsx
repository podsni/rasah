import { Link } from "@tanstack/react-router";
import { type Product, formatRp, packagingLabel } from "@/lib/products";

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      to="/katalog/$slug"
      params={{ slug: p.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-olive-deep/10"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {p.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-gold/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-olive-deep">
            {p.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-background/85 backdrop-blur px-2.5 py-1 text-[10px] font-medium text-olive-deep">
          {packagingLabel[p.packaging]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="font-display text-xl text-olive-deep">{p.name}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{p.short}</p>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Mulai dari</div>
            <div className="font-display text-lg font-semibold text-primary">{formatRp(p.price)}</div>
          </div>
          <span className="text-xs text-primary group-hover:underline">Detail →</span>
        </div>
      </div>
    </Link>
  );
}