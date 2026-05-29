import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
  ArrowLeft, Check, MessageCircle, Minus, Plus, X, Share2, Package, Ruler, ZoomIn, ZoomOut, RotateCcw,
} from "lucide-react";
import {
  getProduct, formatRp, packagingLabel, occasionLabel, waLink, products, type Product,
} from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/katalog/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Produk — Rasabuah Malang" }] };
    return {
      meta: [
        { title: `${p.name} — Rasabuah Malang` },
        { name: "description", content: `${p.name}. ${p.short} Mulai dari ${formatRp(p.price)}.` },
        { property: "og:title", content: `${p.name} — Rasabuah Malang` },
        { property: "og:description", content: p.short },
        { property: "og:image", content: p.image },
      ],
    };
  },
  component: Detail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl p-16 text-center">
      <h1 className="font-display text-3xl text-olive-deep">Produk tidak ditemukan</h1>
      <Link to="/katalog" className="mt-4 inline-block text-primary hover:underline">← Kembali ke katalog</Link>
    </div>
  ),
});

function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("revealed"); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const IMG_ID = "lb-img";

/** Lightbox — zoom/drag via getElementById, bypasses React ref timing */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const st = useRef({ scale: 1, x: 0, y: 0, dragging: false, lx: 0, ly: 0, lastDist: 0 });

  function getImg() { return document.getElementById(IMG_ID) as HTMLImageElement | null; }

  function commit(instant = false) {
    const s = st.current;
    if (s.scale <= 1) { s.x = 0; s.y = 0; }
    const img = getImg();
    if (!img) return;
    img.style.transition = instant ? "none" : "transform 180ms ease-out";
    img.style.transform = `scale(${s.scale}) translate(${s.x / s.scale}px,${s.y / s.scale}px)`;
    // Update counter via DOM to avoid React re-render wiping the transform
    const counter = document.getElementById("lb-pct");
    if (counter) counter.textContent = Math.round(s.scale * 100) + "%";
    const resetBtn = document.getElementById("lb-reset");
    if (resetBtn) resetBtn.style.display = s.scale > 1 ? "grid" : "none";
  }

  function zoom(delta: number) {
    st.current.scale = Math.min(5, Math.max(1, st.current.scale + delta));
    commit();
  }

  function reset() { st.current.scale = 1; st.current.x = 0; st.current.y = 0; commit(); }

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") zoom(0.5);
      if (e.key === "-") zoom(-0.5);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  // Non-passive wheel on container
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const h = (e: WheelEvent) => {
      e.preventDefault();
      st.current.scale = Math.min(5, Math.max(1, st.current.scale - e.deltaY * 0.004));
      commit(true);
    };
    el.addEventListener("wheel", h, { passive: false });
    return () => el.removeEventListener("wheel", h);
  });

  function onMD(e: React.MouseEvent) {
    if (st.current.scale <= 1) return;
    st.current.dragging = true; st.current.lx = e.clientX; st.current.ly = e.clientY;
    e.preventDefault();
  }
  function onMM(e: React.MouseEvent) {
    if (!st.current.dragging) return;
    st.current.x += e.clientX - st.current.lx;
    st.current.y += e.clientY - st.current.ly;
    st.current.lx = e.clientX; st.current.ly = e.clientY;
    commit(true);
  }
  function onMU() { st.current.dragging = false; }

  function onTS(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      st.current.lastDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    } else { st.current.lx = e.touches[0].clientX; st.current.ly = e.touches[0].clientY; }
  }
  function onTM(e: React.TouchEvent) {
    e.preventDefault();
    if (e.touches.length === 2) {
      const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      st.current.scale = Math.min(5, Math.max(1, st.current.scale * (d / st.current.lastDist)));
      st.current.lastDist = d;
      commit(true);
    } else if (e.touches.length === 1 && st.current.scale > 1) {
      st.current.x += e.touches[0].clientX - st.current.lx;
      st.current.y += e.touches[0].clientY - st.current.ly;
      st.current.lx = e.touches[0].clientX; st.current.ly = e.touches[0].clientY;
      commit(true);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ animation: "fade-in 200ms ease both", backgroundColor: "rgba(0,0,0,0.95)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5">
        <button onClick={() => zoom(-0.5)} className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 active:scale-90 transition-all"><ZoomOut className="h-4 w-4" /></button>
        <span id="lb-pct" className="min-w-[3.5rem] text-center text-sm font-medium text-white/80 tabular-nums">100%</span>
        <button onClick={() => zoom(0.5)} className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 active:scale-90 transition-all"><ZoomIn className="h-4 w-4" /></button>
        <button id="lb-reset" onClick={reset} className="hidden h-9 w-9 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 active:scale-90 transition-all"><RotateCcw className="h-4 w-4" /></button>
        <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 active:scale-90 transition-all"><X className="h-5 w-5" /></button>
      </div>

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/40 pointer-events-none whitespace-nowrap">
        Ketuk untuk zoom · Scroll / pinch untuk zoom · Drag untuk geser
      </p>

      <div
        ref={containerRef}
        className="rounded-xl"
        style={{ width: "min(92vw, 88dvh)", height: "min(86dvh, 92vw)", cursor: st.current.scale > 1 ? "grab" : "zoom-in" }}
        onMouseDown={onMD} onMouseMove={onMM} onMouseUp={onMU} onMouseLeave={onMU}
        onTouchStart={onTS} onTouchMove={onTM} onTouchEnd={() => { st.current.dragging = false; }}
        onClick={() => { if (st.current.scale === 1) { st.current.scale = 2; commit(); } }}
      >
        <img
          id={IMG_ID}
          src={src}
          alt={alt}
          draggable={false}
          className="h-full w-full object-contain select-none"
        />
      </div>
    </div>
  );
}

function Detail() {
  const { product } = Route.useLoaderData() as { product: Product };
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [zoom, setZoom] = useState(false);
  const [copied, setCopied] = useState(false);
  const relatedRef = useScrollReveal() as React.RefObject<HTMLElement>;

  const message =
    `Halo Rasabuah Malang, saya ingin pesan:\n\n` +
    `*${product.name}*\n` +
    `Harga: ${formatRp(product.price)}\n` +
    `Jumlah: ${qty}\n` +
    (note ? `Catatan / ucapan: ${note}\n` : "") +
    `\nMohon info ketersediaan & pengiriman 🙏`;

  const related = products
    .filter((p) => p.slug !== product.slug &&
      (p.packaging === product.packaging || p.occasions.some((o) => product.occasions.includes(o))))
    .slice(0, 4);

  const handleShare = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch { /* ignore */ }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">

        {/* Back */}
        <Link
          to="/katalog"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          style={{ animation: "fade-in 300ms cubic-bezier(0.4,0,0.2,1) both" }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Kembali ke Katalog
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12 xl:grid-cols-[52%_1fr]">

          {/* ── IMAGE — clean, no overlay ── */}
          <div style={{ animation: "enter-up 450ms cubic-bezier(0.4,0,0.2,1) both" }}>
            <button
              type="button"
              onClick={() => setZoom(true)}
              className="group relative block w-full overflow-hidden rounded-2xl bg-secondary/40 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Buka gambar"
            >
              <img
                src={product.image}
                alt={product.name}
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              {/* No gradient overlay — show image clean */}
              {product.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-olive-deep shadow">
                  {product.badge}
                </span>
              )}
              <span className="absolute right-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[11px] font-medium text-olive-deep backdrop-blur-sm shadow-sm">
                {packagingLabel[product.packaging]}
              </span>
              {/* Zoom hint */}
              <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1.5 text-[11px] font-medium text-olive-deep shadow-sm backdrop-blur-sm opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                <ZoomIn className="h-3 w-3" /> Zoom
              </span>
            </button>
          </div>

          {/* ── INFO ── */}
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-1.5" style={{ animation: "enter-up 350ms cubic-bezier(0.4,0,0.2,1) 80ms both" }}>
              {product.occasions.map((o) => (
                <span key={o} className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {occasionLabel[o]}
                </span>
              ))}
            </div>

            <div className="mt-3 flex items-start justify-between gap-3" style={{ animation: "enter-up 350ms cubic-bezier(0.4,0,0.2,1) 120ms both" }}>
              <h1 className="font-display text-3xl leading-tight text-olive-deep md:text-4xl">{product.name}</h1>
              <button type="button" onClick={handleShare} className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-all hover:border-primary hover:text-primary active:scale-95" title="Salin link">
                {copied ? <Check className="h-4 w-4 text-primary" /> : <Share2 className="h-4 w-4" />}
              </button>
            </div>

            <div className="mt-3 flex items-baseline gap-2" style={{ animation: "enter-up 350ms cubic-bezier(0.4,0,0.2,1) 160ms both" }}>
              <span className="font-display text-3xl font-semibold tabular-nums text-primary">{formatRp(product.price)}</span>
              <span className="text-sm text-muted-foreground">/ paket</span>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground" style={{ animation: "enter-up 350ms cubic-bezier(0.4,0,0.2,1) 200ms both" }}>
              {product.short}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2" style={{ animation: "enter-up 350ms cubic-bezier(0.4,0,0.2,1) 240ms both" }}>
              <div className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-background px-3 py-2.5">
                <Package className="h-4 w-4 shrink-0 text-primary" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Kemasan</div>
                  <div className="text-sm font-medium text-olive-deep">{packagingLabel[product.packaging]}</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-background px-3 py-2.5">
                <Ruler className="h-4 w-4 shrink-0 text-primary" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Ukuran</div>
                  <div className="text-sm font-medium text-olive-deep">{product.size}</div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-border/60 bg-secondary/30 p-4" style={{ animation: "enter-up 350ms cubic-bezier(0.4,0,0.2,1) 280ms both" }}>
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Isi Hampers</div>
              <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {product.contents.map((c, i) => {
                  const [item, q] = c.split(" — ");
                  return (
                    <li key={c} className="flex items-center gap-2.5 rounded-lg bg-background px-3 py-2"
                      style={{ animation: `enter-up 250ms cubic-bezier(0.4,0,0.2,1) ${320 + i * 30}ms both` }}>
                      <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                      <span className="flex-1 text-sm text-foreground/80">{item}</span>
                      {q && <span className="text-[11px] font-semibold tabular-nums text-muted-foreground">{q}</span>}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-4 rounded-2xl border border-border/60 bg-card p-4" style={{ animation: "enter-up 350ms cubic-bezier(0.4,0,0.2,1) 380ms both" }}>
              <label htmlFor="note" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Kartu Ucapan <span className="normal-case font-normal">(opsional)</span>
              </label>
              <textarea id="note" value={note} maxLength={200} onChange={(e) => setNote(e.target.value)}
                placeholder="Tulis ucapan untuk penerima..."
                className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                rows={2} />
              <div className="mb-3 mt-0.5 text-right text-[11px] text-muted-foreground/60">{note.length}/200</div>

              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-full border border-border bg-background">
                  <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1}
                    className="grid h-10 w-10 place-items-center rounded-full text-foreground/60 transition-all hover:text-primary active:scale-90 disabled:opacity-30">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold tabular-nums">{qty}</span>
                  <button type="button" onClick={() => setQty((q) => q + 1)}
                    className="grid h-10 w-10 place-items-center rounded-full text-foreground/60 transition-all hover:text-primary active:scale-90">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <a href={waLink(message)} target="_blank" rel="noreferrer"
                  className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-whatsapp/25 transition-all hover:opacity-90 active:scale-[0.97]">
                  <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" />
                  Pesan via WhatsApp
                  {qty > 1 && <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[11px]">×{qty}</span>}
                </a>
              </div>

              {qty > 1 && (
                <p className="mt-2 text-right text-sm text-muted-foreground">
                  Total: <span className="font-semibold text-olive-deep">{formatRp(product.price * qty)}</span>
                </p>
              )}
              <p className="mt-2 text-center text-xs text-muted-foreground/60">
                Pesan langsung ke admin · Pengiriman area Malang & sekitarnya
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section ref={relatedRef as React.RefObject<HTMLElement>} className="scroll-reveal mx-auto max-w-6xl px-4 pb-16 md:px-8">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="font-display text-xl text-olive-deep md:text-2xl">Mungkin kamu suka</h2>
            <Link to="/katalog" className="text-sm text-primary hover:underline">Lihat semua →</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {related.map((p, i) => (
              <div key={p.slug} className="scroll-reveal revealed" style={{ transitionDelay: `${i * 60}ms` }}>
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox with zoom + drag */}
      {zoom && <Lightbox src={product.image} alt={product.name} onClose={() => setZoom(false)} />}
    </div>
  );
}
