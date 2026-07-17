import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check, ChevronRight, Heart, Minus, Plus, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";
import { toast } from "sonner";
import { getProduct, products, type Product } from "@/lib/products";
import { eur, pct } from "@/lib/format";
import { useCart, useWishlist } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { product: p };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Shoply` },
          { name: "description", content: loaderData.product.description.slice(0, 155) },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.description.slice(0, 155) },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [{ title: "Produit — Shoply" }],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container-x py-20 text-center">
      <div className="text-6xl">📦</div>
      <h1 className="mt-4 text-2xl font-bold">Produit introuvable</h1>
      <Link to="/catalog" className="mt-4 inline-block text-primary hover:underline">Retour au catalogue</Link>
    </div>
  ),
});

const reviewsMock = [
  { name: "Sophie L.", date: "il y a 3 jours", rating: 5, text: "Excellent produit, livraison rapide et bien emballé. Je recommande à 100% !", helpful: 24 },
  { name: "Karim B.", date: "il y a 1 semaine", rating: 4, text: "Très bon rapport qualité/prix. Un petit défaut sur le packaging sinon parfait.", helpful: 12 },
  { name: "Emma R.", date: "il y a 2 semaines", rating: 5, text: "Conforme à la description, finitions impeccables. Bravo à Shoply !", helpful: 31 },
  { name: "Lucas P.", date: "il y a 3 semaines", rating: 4, text: "Je m'attendais à mieux sur un point précis mais dans l'ensemble je suis satisfait.", helpful: 6 },
];

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product.colors?.[0]);
  const [size, setSize] = useState(product.sizes?.[0]);
  const add = useCart((s) => s.add);
  const toggleWish = useWishlist((s) => s.toggle);
  const wished = useWishlist((s) => s.ids.includes(product.id));

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 5);

  return (
    <div className="container-x py-6">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Accueil</Link><ChevronRight className="h-3 w-3" />
        <Link to="/catalog" className="hover:text-foreground">Catalogue</Link><ChevronRight className="h-3 w-3" />
        <Link to="/category/$slug" params={{ slug: product.category }} className="hover:text-foreground capitalize">{product.category}</Link><ChevronRight className="h-3 w-3" />
        <span className="text-foreground line-clamp-1">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        {/* Gallery */}
        <div>
          <motion.div key={img} initial={{ opacity: 0.4, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative aspect-square overflow-hidden rounded-3xl bg-secondary">
            <img src={product.images[img]} alt={product.name} className="h-full w-full object-cover" />
            {product.badge && (
              <span className={cn("absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold",
                product.badge === "Promo" && "bg-promo text-promo-foreground",
                product.badge === "Nouveau" && "bg-success text-success-foreground",
                product.badge === "Meilleure vente" && "bg-primary text-primary-foreground",
              )}>{product.badge}</span>
            )}
          </motion.div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {product.images.map((src, k) => (
              <button key={k} onClick={() => setImg(k)} className={cn("overflow-hidden rounded-xl aspect-square bg-secondary ring-2 transition-all", img === k ? "ring-primary" : "ring-transparent hover:ring-border")}>
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{product.brand} · Vendu par {product.seller}</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-black tracking-tight">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map((s) => (<Star key={s} className={cn("h-4 w-4", s <= Math.round(product.rating) ? "fill-promo stroke-promo" : "stroke-border")} />))}
            </div>
            <span className="text-sm font-semibold">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString("fr-FR")} avis)</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <div className="text-4xl font-black">{eur(product.price)}</div>
            {product.oldPrice && (
              <>
                <div className="text-lg text-muted-foreground line-through">{eur(product.oldPrice)}</div>
                <span className="rounded-full bg-promo/15 px-2.5 py-1 text-xs font-bold text-promo">-{pct(product.oldPrice, product.price)}%</span>
              </>
            )}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">TVA incluse · Prix hors livraison</div>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
            <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-success font-medium"><Truck className="h-4 w-4" /> {product.delivery}</span>
            <span className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1"><Check className="h-4 w-4 text-success" /> En stock ({product.stock})</span>
            <span className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1"><ShieldCheck className="h-4 w-4" /> Garantie 2 ans</span>
          </div>

          {product.colors && (
            <div className="mt-6">
              <div className="text-sm font-semibold mb-2">Couleur : <span className="text-muted-foreground font-normal">{color}</span></div>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button key={c} onClick={() => setColor(c)} className={cn("rounded-full border px-3 py-1.5 text-xs font-medium transition-colors", color === c ? "border-foreground bg-foreground text-background" : "border-border hover:bg-accent")}>{c}</button>
                ))}
              </div>
            </div>
          )}
          {product.sizes && (
            <div className="mt-4">
              <div className="text-sm font-semibold mb-2">Taille : <span className="text-muted-foreground font-normal">{size}</span></div>
              <div className="flex gap-2">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={cn("h-10 min-w-10 rounded-xl border px-3 text-sm font-semibold transition-colors", size === s ? "border-foreground bg-foreground text-background" : "border-border hover:bg-accent")}>{s}</button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center rounded-full border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center hover:bg-accent rounded-l-full" aria-label="Moins"><Minus className="h-4 w-4" /></button>
              <div className="w-10 text-center text-sm font-semibold">{qty}</div>
              <button onClick={() => setQty((q) => q + 1)} className="grid h-11 w-11 place-items-center hover:bg-accent rounded-r-full" aria-label="Plus"><Plus className="h-4 w-4" /></button>
            </div>
            <button
              onClick={() => { add(product.id, qty); toast.success(`${product.name} ajouté (x${qty})`); }}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ShoppingCart className="h-4 w-4" /> Ajouter au panier
            </button>
            <button onClick={() => toggleWish(product.id)} aria-label="Wishlist" className="grid h-11 w-11 place-items-center rounded-full border border-border hover:bg-accent">
              <Heart className={cn("h-5 w-5", wished && "fill-wishlist stroke-wishlist")} />
            </button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground leading-relaxed">{product.description}</p>

          <ul className="mt-6 space-y-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 text-success shrink-0" /> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Specs */}
      <section className="mt-16">
        <h2 className="text-2xl font-black tracking-tight">Spécifications</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border">
          <dl className="divide-y divide-border">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="grid grid-cols-3 gap-4 px-5 py-3 text-sm even:bg-surface">
                <dt className="font-semibold text-muted-foreground">{k}</dt>
                <dd className="col-span-2">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Reviews */}
      <section className="mt-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-black tracking-tight">Avis clients</h2>
          <div className="text-sm text-muted-foreground">{product.reviews.toLocaleString("fr-FR")} avis · Note {product.rating}/5</div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {reviewsMock.map((r) => (
            <div key={r.name} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary font-bold">{r.name[0]}</div>
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.date}</div>
                </div>
                <div className="ml-auto flex items-center gap-0.5">
                  {[1,2,3,4,5].map((s) => (<Star key={s} className={cn("h-3.5 w-3.5", s <= r.rating ? "fill-promo stroke-promo" : "stroke-border")} />))}
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{r.text}</p>
              <div className="mt-3 text-xs text-muted-foreground">👍 {r.helpful} personnes ont trouvé cet avis utile</div>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="mt-16">
        <h2 className="text-2xl font-black tracking-tight">Vous pourriez aimer</h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {related.map((p, i) => (<ProductCard key={p.id} product={p} index={i} />))}
        </div>
      </section>
    </div>
  );
}
