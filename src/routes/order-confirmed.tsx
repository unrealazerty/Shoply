import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, Package, Truck } from "lucide-react";

export const Route = createFileRoute("/order-confirmed")({
  component: () => (
    <div className="container-x py-16 max-w-2xl text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
        <CheckCircle2 className="mx-auto h-20 w-20 text-success" />
      </motion.div>
      <h1 className="mt-6 text-4xl font-black tracking-tight">Merci pour votre commande !</h1>
      <p className="mt-3 text-muted-foreground">Votre commande <span className="font-mono font-bold text-foreground">#SHP-{Math.floor(100000 + Math.random() * 900000)}</span> a bien été enregistrée (démo).</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3 text-left">
        {[
          { icon: Package, title: "Préparation", sub: "sous 24h" },
          { icon: Truck, title: "Expédition", sub: "livraison estimée 2-3j" },
          { icon: CheckCircle2, title: "Confirmation", sub: "email envoyé" },
        ].map((s) => (
          <div key={s.title} className="rounded-2xl border border-border bg-card p-5">
            <s.icon className="h-6 w-6 text-primary" />
            <div className="mt-3 text-sm font-bold">{s.title}</div>
            <div className="text-xs text-muted-foreground">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <Link to="/" className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-accent">Accueil</Link>
        <Link to="/catalog" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background hover:bg-primary hover:text-primary-foreground transition-colors">Continuer mes achats</Link>
      </div>
    </div>
  ),
  head: () => ({ meta: [{ title: "Commande confirmée — Shoply" }] }),
});
