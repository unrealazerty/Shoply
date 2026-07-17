import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  { q: "Quels sont les délais de livraison ?", a: "Standard 2-3 jours, express 24h. Livraison offerte dès 49€ d'achat." },
  { q: "Comment retourner un article ?", a: "Vous disposez de 30 jours pour retourner un produit, gratuitement et sans justification." },
  { q: "Les paiements sont-ils sécurisés ?", a: "Absolument. Nous utilisons un chiffrement de bout en bout et ne stockons aucune donnée bancaire." },
  { q: "Puis-je modifier ma commande ?", a: "Oui, tant qu'elle n'a pas été expédiée. Rendez-vous dans « Mes commandes »." },
  { q: "Comment contacter le support ?", a: "Par email, téléphone ou via le formulaire de contact. Réponse en moins d'une heure." },
  { q: "Livrez-vous à l'international ?", a: "Oui, dans plus de 30 pays. Frais et délais calculés au checkout." },
];

export const Route = createFileRoute("/faq")({
  component: Faq,
  head: () => ({ meta: [{ title: "FAQ — Shoply" }, { name: "description", content: "Toutes les réponses aux questions fréquentes sur Shoply." }] }),
});

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="container-x py-12 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-black tracking-tight">Questions fréquentes</h1>
      <p className="mt-2 text-muted-foreground">Tout ce que vous voulez savoir sur Shoply, en un clic.</p>
      <div className="mt-8 space-y-3">
        {faqs.map((f, k) => (
          <div key={k} className="rounded-2xl border border-border bg-card overflow-hidden">
            <button onClick={() => setOpen(open === k ? null : k)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
              <span className="text-sm md:text-base font-semibold">{f.q}</span>
              <Plus className={cn("h-5 w-5 shrink-0 transition-transform", open === k && "rotate-45")} />
            </button>
            <div className={cn("grid transition-all duration-300", open === k ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
