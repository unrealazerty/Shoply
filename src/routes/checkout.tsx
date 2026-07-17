import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, CreditCard, Info, Package, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/store";
import { getProduct } from "@/lib/products";
import { eur } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({ meta: [{ title: "Commande — Shoply" }] }),
});

const steps = ["Adresse", "Livraison", "Paiement"];

function Checkout() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState<"standard" | "express">("standard");
  const [payment, setPayment] = useState<"card" | "paypal" | "apple" | "google">("card");

  const rows = useMemo(() => items.map((i) => ({ ...i, p: getProduct(i.id)! })).filter((r) => r.p), [items]);
  const subtotal = rows.reduce((a, r) => a + r.p.price * r.qty, 0);
  const shipCost = shipping === "express" ? 9.99 : subtotal > 49 ? 0 : 4.99;
  const total = subtotal + shipCost;

  if (rows.length === 0) {
    return (
      <div className="container-x py-20 text-center">
        <div className="text-5xl">🧾</div>
        <h1 className="mt-4 text-2xl font-black">Aucun article à commander</h1>
        <Link to="/catalog" className="mt-4 inline-block text-primary hover:underline">Explorer le catalogue</Link>
      </div>
    );
  }

  const confirm = () => {
    clear();
    toast.success("Commande confirmée ! (démo)");
    navigate({ to: "/order-confirmed" });
  };

  return (
    <div className="container-x py-8">
      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-border bg-accent/50 p-3 text-xs">
        <Info className="h-4 w-4 shrink-0" /> Ceci est une démonstration. Aucun paiement réel ne sera effectué.
      </div>

      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={cn("grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition-colors", i <= step ? "bg-foreground text-background" : "bg-muted text-muted-foreground")}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={cn("text-sm font-semibold hidden sm:inline", i <= step ? "text-foreground" : "text-muted-foreground")}>{s}</span>
            {i < steps.length - 1 && <div className="w-8 md:w-16 h-px bg-border mx-1" />}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card p-6">
          {step === 0 && (
            <>
              <h2 className="text-xl font-bold">Adresse de livraison</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Field label="Prénom" />
                <Field label="Nom" />
                <Field label="Adresse" className="sm:col-span-2" />
                <Field label="Ville" />
                <Field label="Code postal" />
                <Field label="Téléphone" className="sm:col-span-2" />
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <h2 className="text-xl font-bold">Mode de livraison</h2>
              <div className="mt-4 space-y-3">
                {[
                  { id: "standard" as const, title: "Standard", sub: "2 à 3 jours ouvrés", price: subtotal > 49 ? 0 : 4.99 },
                  { id: "express" as const, title: "Express", sub: "Livraison le lendemain avant 13h", price: 9.99 },
                ].map((o) => (
                  <label key={o.id} className={cn("flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all", shipping === o.id ? "border-foreground ring-2 ring-foreground/20" : "border-border hover:bg-accent")}>
                    <input type="radio" name="s" checked={shipping === o.id} onChange={() => setShipping(o.id)} className="h-4 w-4 accent-primary" />
                    <Package className="h-5 w-5" />
                    <div className="flex-1">
                      <div className="text-sm font-bold">{o.title}</div>
                      <div className="text-xs text-muted-foreground">{o.sub}</div>
                    </div>
                    <div className="text-sm font-bold">{o.price === 0 ? "Offerte" : eur(o.price)}</div>
                  </label>
                ))}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="text-xl font-bold">Paiement</h2>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "card" as const, label: "Carte" },
                  { id: "paypal" as const, label: "PayPal" },
                  { id: "apple" as const, label: "Apple Pay" },
                  { id: "google" as const, label: "Google Pay" },
                ].map((o) => (
                  <button key={o.id} onClick={() => setPayment(o.id)} className={cn("rounded-xl border p-3 text-sm font-semibold transition-all", payment === o.id ? "border-foreground bg-foreground text-background" : "border-border hover:bg-accent")}>
                    {o.label}
                  </button>
                ))}
              </div>
              {payment === "card" && (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Field label="Numéro de carte" placeholder="4242 4242 4242 4242" className="sm:col-span-2" />
                  <Field label="Expiration" placeholder="MM/AA" />
                  <Field label="CVV" placeholder="123" />
                </div>
              )}
              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4" /> Paiement chiffré · Ceci est une démo.
              </div>
            </>
          )}
          <div className="mt-8 flex justify-between">
            <button disabled={step === 0} onClick={() => setStep((s) => s - 1)} className="rounded-full border border-border px-5 py-2 text-sm font-semibold disabled:opacity-40 hover:bg-accent">Précédent</button>
            {step < 2 ? (
              <button onClick={() => setStep((s) => s + 1)} className="rounded-full bg-foreground px-6 py-2.5 text-sm font-bold text-background hover:bg-primary hover:text-primary-foreground transition-colors">Continuer</button>
            ) : (
              <button onClick={confirm} className="rounded-full bg-foreground px-6 py-2.5 text-sm font-bold text-background hover:bg-primary hover:text-primary-foreground transition-colors inline-flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> Payer {eur(total)}
              </button>
            )}
          </div>
        </motion.div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
          <div className="text-sm font-bold">Récapitulatif ({rows.length})</div>
          <ul className="mt-3 space-y-3 max-h-64 overflow-y-auto pr-2">
            {rows.map((r) => (
              <li key={r.id} className="flex items-center gap-3">
                <img src={r.p.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="line-clamp-1 text-xs font-semibold">{r.p.name}</div>
                  <div className="text-xs text-muted-foreground">x{r.qty}</div>
                </div>
                <div className="text-xs font-bold">{eur(r.p.price * r.qty)}</div>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Sous-total</dt><dd>{eur(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Livraison</dt><dd>{shipCost === 0 ? "Offerte" : eur(shipCost)}</dd></div>
            <div className="flex justify-between border-t border-border pt-2 mt-2 text-base font-bold"><dt>Total</dt><dd>{eur(total)}</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, placeholder, className }: { label: string; placeholder?: string; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">{label}</span>
      <input placeholder={placeholder} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
    </label>
  );
}
