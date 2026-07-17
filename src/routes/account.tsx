import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, CreditCard, Heart, LogOut, MapPin, Package, Settings, User } from "lucide-react";

const orders = [
  { id: "SHP-482910", date: "12 juil. 2026", total: 349.9, status: "Livré" },
  { id: "SHP-482755", date: "3 juil. 2026", total: 89.0, status: "En transit" },
  { id: "SHP-481902", date: "24 juin 2026", total: 1299.0, status: "Livré" },
];

export const Route = createFileRoute("/account")({
  component: Account,
  head: () => ({ meta: [{ title: "Mon compte — Shoply" }] }),
});

function Account() {
  return (
    <div className="container-x py-8 grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="rounded-2xl border border-border bg-card p-4 h-fit">
        <div className="flex items-center gap-3 p-2">
          <div className="grid h-11 w-11 place-items-center rounded-full gradient-primary text-white font-bold">L</div>
          <div>
            <div className="text-sm font-bold">Léa Martin</div>
            <div className="text-xs text-muted-foreground">lea@exemple.com</div>
          </div>
        </div>
        <nav className="mt-4 space-y-1 text-sm">
          {[
            { icon: User, label: "Profil" },
            { icon: Package, label: "Commandes" },
            { icon: Heart, label: "Wishlist" },
            { icon: MapPin, label: "Adresses" },
            { icon: CreditCard, label: "Paiements" },
            { icon: Bell, label: "Notifications" },
            { icon: Settings, label: "Paramètres" },
          ].map((i, k) => (
            <button key={i.label} className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left hover:bg-accent ${k === 1 ? "bg-accent font-semibold" : ""}`}>
              <i.icon className="h-4 w-4" /> {i.label}
            </button>
          ))}
          <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-destructive hover:bg-destructive/10 mt-2">
            <LogOut className="h-4 w-4" /> Déconnexion
          </button>
        </nav>
      </aside>

      <div>
        <h1 className="text-3xl font-black tracking-tight">Mes commandes</h1>
        <p className="mt-1 text-sm text-muted-foreground">Suivez, retournez ou téléchargez vos factures.</p>
        <div className="mt-6 space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="grid grid-cols-[1fr_auto] gap-4 items-center rounded-2xl border border-border bg-card p-5">
              <div>
                <div className="text-xs font-mono font-semibold text-muted-foreground">{o.id}</div>
                <div className="mt-1 text-sm font-bold">Commande du {o.date}</div>
                <div className="text-xs text-muted-foreground">Total : {o.total.toFixed(2)}€</div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${o.status === "Livré" ? "bg-success/15 text-success" : "bg-primary/15 text-primary"}`}>{o.status}</span>
                <Link to="/orders/$id" params={{ id: o.id }} className="text-sm font-semibold text-primary hover:underline">Suivre</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
