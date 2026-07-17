import { Link } from "@tanstack/react-router";
import { ShoppingBag, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  const cols = [
    { title: "À propos", links: [["Notre histoire", "/"], ["Carrières", "/"], ["Presse", "/"], ["Blog", "/"]] },
    { title: "Support", links: [["Centre d'aide", "/faq"], ["Contact", "/contact"], ["Livraison", "/faq"], ["Retours", "/faq"]] },
    { title: "Légal", links: [["Confidentialité", "/"], ["CGU", "/"], ["Mentions légales", "/"], ["Cookies", "/"]] },
  ];
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-x py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary">
                <ShoppingBag className="h-5 w-5 text-white" strokeWidth={2.4} />
              </div>
              <span className="text-xl font-bold tracking-tight">Shoply</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Achetez simplement. Découvrez davantage. Shoply est une démonstration de marketplace moderne — aucune commande réelle.
            </p>
            <form className="mt-6 flex max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
              <input placeholder="Votre email" className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
              <button className="h-11 rounded-full bg-foreground px-5 text-sm font-semibold text-background hover:bg-primary hover:text-primary-foreground transition-colors">S'abonner</button>
            </form>
            <div className="mt-6 flex gap-2">
              {[Facebook, Twitter, Instagram, Youtube].map((I, i) => (
                <a key={i} href="#" aria-label="Social" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-accent">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-sm font-semibold mb-4">{c.title}</div>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {c.links.map(([l, h]) => (
                  <li key={l}><Link to={h} className="hover:text-foreground transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Shoply. Projet démo — tous droits réservés.</div>
          <div className="flex items-center gap-3">
            <span>💳 Visa</span><span>💳 Mastercard</span><span>💳 PayPal</span><span>💳 Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
