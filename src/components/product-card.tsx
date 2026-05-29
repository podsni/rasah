import { Link } from "@tanstack/react-router";
import { type Product, formatRp, packagingLabel } from "@/lib/products";

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      to="/katalog/$slug"
      params={{ slug: p.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card
        transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-olive-deep/10
        active:scale-[0.98]"
    >
      {/* Image — clean, no overlay */}
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary/40">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        {p.badge && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-olive-deep shadow-sm">
            {p.badge}
          </span>
        )}
        <span className="absolute right-2.5 top-2.5 rounded-full bg-background/85 px-2 py-0.5 text-[10px] font-medium text-olive-deep backdrop-blur-sm">
          {packagingLabel[p.packaging]}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
        <h3 className="font-display text-base leading-snug text-olive-deep sm:text-lg">{p.name}</h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{p.short}</p>
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Mulai dari</div>
            <div className="font-display text-base font-semibold tabular-nums text-primary">{formatRp(p.price)}</div>
          </div>
          <span className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[11px] font-medium text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
            Detail →
          </span>
        </div>
      </div>
    </Link>
  );
}
