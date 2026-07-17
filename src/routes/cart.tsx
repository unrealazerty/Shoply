import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ShieldCheck, ShoppingBag, Trash2, Truck } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/store";
import { getProduct, products } from "@/lib/products";
import { eur } from "@/lib/format";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Panier — Shoply" }] }),
});

function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  const rows = useMemo(() => items.map((i) => ({ ...i, product: getProduct(i.id)! })).filter((r) => r.product), [items]);
  const subtotal = rows.reduce((a, r) => a + r.product.price * r.qty, 0);
  const shipping = subtotal > 49 || subtotal === 0 ? 0 : 4.99;
  const tva = subtotal * 0.2;
  const total = Math.max(0, subtotal + shipping - discount);

  const applyPromo = () => {
    if (promo.toUpperCase() === "SHOPLY10") { setDiscount(subtotal * 0.1); toast.success("Code appliqué : -10%"); }
    else toast.error("Code invalide");
  };

  if (rows.length === 0) {
    return (
      <div className="container-x py-20 text-center">
        <div className="text-6xl">🛍️</div>
        <h1 className="mt-4 text-3xl font-black">Votre panier est vide</h1>
        <p className="mt-2 text-muted-foreground">Ajoutez des produits pour commencer.</p>
        <Link to="/catalog" className="mt-6 inline-block rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background hover:bg-primary hover:text-primary-foreground transition-colors">Explorer le catalogue</Link>
      </div>
    );
  }

  return (
    <div className="container-x py-8">
      <h1 className="text-3xl md:text-4xl font-black tracking-tight">Mon panier</h1>
      <p className="mt-1 text-sm text-muted-foreground">{rows.length} article{rows.length > 1 ? "s" : ""}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <ul className="space-y-3">
          <AnimatePresence initial={false}>
            {rows.map((r) => (
              <motion.li
                key={r.id}
                layout
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-[96px_1fr_auto] gap-4 items-center rounded-2xl border border-border bg-card p-4"
              >
                <Link to="/product/$id" params={{ id: r.id }} className="block">
                  <img src={r.product.image} alt="" className="h-24 w-24 rounded-xl object-cover" />
                </Link>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{r.product.brand}</div>
                  <Link to="/product/$id" params={{ id: r.id }} className="line-clamp-2 text-sm font-semibold hover:text-primary">{r.product.name}</Link>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center rounded-full border border-border">
                      <button onClick={() => setQty(r.id, r.qty - 1)} className="grid h-8 w-8 place-items-center hover:bg-accent rounded-l-full" aria-label="Moins"><Minus className="h-3.5 w-3.5" /></button>
                      <div className="w-8 text-center text-xs font-semibold">{r.qty}</div>
                      <button onClick={() => setQty(r.id, r.qty + 1)} className="grid h-8 w-8 place-items-center hover:bg-accent rounded-r-full" aria-label="Plus"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <button onClick={() => { remove(r.id); toast("Article retiré"); }} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" /> Retirer
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold">{eur(r.product.price * r.qty)}</div>
                  {r.product.oldPrice && <div className="text-xs text-muted-foreground line-through">{eur(r.product.oldPrice * r.qty)}</div>}
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
          <div className="text-lg font-bold">Récapitulatif</div>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Sous-total</dt><dd className="font-semibold">{eur(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">TVA (incluse)</dt><dd>{eur(tva)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Livraison</dt><dd className={shipping === 0 ? "text-success font-semibold" : ""}>{shipping === 0 ? "Offerte" : eur(shipping)}</dd></div>
            {discount > 0 && <div className="flex justify-between text-promo"><dt>Réduction</dt><dd>-{eur(discount)}</dd></div>}
          </dl>
          <div className="mt-4 flex gap-2">
            <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Code promo (SHOPLY10)" className="h-10 flex-1 rounded-full border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
            <button onClick={applyPromo} className="rounded-full border border-border px-4 text-sm font-semibold hover:bg-accent">Appliquer</button>
          </div>
          <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
            <span className="text-sm font-semibold">Total</span>
            <span className="text-2xl font-black">{eur(total)}</span>
          </div>
          <Link to="/checkout" className="mt-4 flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-bold text-background hover:bg-primary hover:text-primary-foreground transition-colors">
            <ShoppingBag className="h-4 w-4" /> Passer la commande
          </Link>
          <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5" /> Livraison rapide 24-72h</div>
            <div className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Paiement 100% sécurisé</div>
          </div>
        </aside>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-black tracking-tight">Vous pourriez aussi aimer</h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.slice(10, 15).map((p, i) => (<ProductCard key={p.id} product={p} index={i} />))}
        </div>
      </section>
    </div>
  );
}
