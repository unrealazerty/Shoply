import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({ meta: [{ title: "Contact — Shoply" }, { name: "description", content: "Contactez l'équipe Shoply." }] }),
});

function Contact() {
  return (
    <div className="container-x py-12 grid gap-10 lg:grid-cols-2">
      <div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">Une question ? On est là.</h1>
        <p className="mt-2 text-muted-foreground">Notre équipe support répond en moins d'une heure, 7 jours sur 7.</p>
        <div className="mt-8 space-y-4">
          {[
            { icon: Mail, label: "Email", val: "support@shoply.demo" },
            { icon: Phone, label: "Téléphone", val: "+33 1 23 45 67 89" },
            { icon: MapPin, label: "Adresse", val: "12 rue du Commerce, 75015 Paris" },
          ].map((i) => (
            <div key={i.label} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><i.icon className="h-5 w-5" /></div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{i.label}</div>
                <div className="text-sm font-bold">{i.val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form className="rounded-3xl border border-border bg-card p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Prénom" className="h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
          <input placeholder="Nom" className="h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
        </div>
        <input type="email" placeholder="Email" className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
        <input placeholder="Sujet" className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
        <textarea rows={5} placeholder="Votre message" className="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
        <button className="h-11 w-full rounded-full bg-foreground text-sm font-bold text-background hover:bg-primary hover:text-primary-foreground transition-colors">Envoyer</button>
      </form>
    </div>
  );
}
