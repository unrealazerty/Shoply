import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, Package, Truck, MapPin, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/orders/$id")({
  component: Track,
  head: ({ params }) => ({ meta: [{ title: `Suivi ${params.id} — Shoply` }] }),
});

function Track() {
  const { id } = Route.useParams();
  const steps = [
    { icon: CheckCircle2, label: "Commande passée", date: "12 juil. 10:24", done: true },
    { icon: Package, label: "Préparation", date: "12 juil. 14:02", done: true },
    { icon: Truck, label: "Expédition", date: "13 juil. 08:15", done: true },
    { icon: MapPin, label: "En transit", date: "aujourd'hui", done: true, active: true },
    { icon: Home, label: "Livraison", date: "prévue demain", done: false },
  ];
  return (
    <div className="container-x py-8 max-w-3xl">
      <Link to="/account" className="text-sm text-muted-foreground hover:text-foreground">← Retour au compte</Link>
      <h1 className="mt-3 text-3xl font-black tracking-tight">Suivi de commande</h1>
      <div className="mt-1 text-sm font-mono text-muted-foreground">{id}</div>

      <div className="mt-10 rounded-3xl border border-border bg-card p-8">
        <div className="relative">
          {steps.map((s, k) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: k * 0.1 }}
              className="grid grid-cols-[40px_1fr] gap-4 pb-8 last:pb-0"
            >
              <div className="relative">
                <div className={cn("grid h-10 w-10 place-items-center rounded-full ring-4", s.done ? "bg-success text-white ring-success/20" : "bg-muted text-muted-foreground ring-transparent", s.active && "bg-primary ring-primary/20")}>
                  <s.icon className="h-5 w-5" />
                </div>
                {k < steps.length - 1 && <div className={cn("absolute left-1/2 top-10 h-full w-0.5 -translate-x-1/2", s.done ? "bg-success/40" : "bg-border")} />}
              </div>
              <div className="pt-1.5">
                <div className={cn("text-sm font-bold", !s.done && "text-muted-foreground")}>{s.label}</div>
                <div className="text-xs text-muted-foreground">{s.date}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
