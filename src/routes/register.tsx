import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: () => (
    <div className="container-x py-16 max-w-md">
      <h1 className="text-3xl font-black tracking-tight">Créer un compte</h1>
      <p className="mt-1 text-sm text-muted-foreground">Rejoignez la communauté Shoply en 30 secondes.</p>
      <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Prénom" className="h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
          <input placeholder="Nom" className="h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
        </div>
        <input type="email" placeholder="Email" className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
        <input type="password" placeholder="Mot de passe" className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
        <button className="h-11 w-full rounded-full bg-foreground text-sm font-bold text-background hover:bg-primary hover:text-primary-foreground transition-colors">Créer mon compte</button>
      </form>
      <div className="mt-6 text-sm text-muted-foreground">Déjà inscrit ? <Link to="/login" className="text-primary font-semibold hover:underline">Se connecter</Link></div>
    </div>
  ),
  head: () => ({ meta: [{ title: "Inscription — Shoply" }] }),
});
