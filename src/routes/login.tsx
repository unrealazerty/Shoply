import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Connexion — Shoply" }] }),
});

function LoginPage() {
  return (
    <div className="container-x py-16 grid gap-10 lg:grid-cols-2 items-center max-w-5xl">
      <div className="hidden lg:block rounded-3xl overflow-hidden aspect-square relative">
        <img src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=900" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 gradient-primary opacity-70" />
        <div className="absolute inset-0 flex items-end p-10 text-white">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider opacity-80">Shoply</div>
            <div className="mt-2 text-3xl font-black leading-tight">Bienvenue dans une expérience shopping repensée.</div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-black tracking-tight">Se connecter</h1>
        <p className="mt-1 text-sm text-muted-foreground">Retrouvez votre wishlist, vos commandes et vos adresses.</p>
        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Email</label>
            <input type="email" placeholder="vous@exemple.com" className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Mot de passe</label>
            <input type="password" placeholder="••••••••" className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
          </div>
          <button className="h-11 w-full rounded-full bg-foreground text-sm font-bold text-background hover:bg-primary hover:text-primary-foreground transition-colors">Se connecter</button>
        </form>
        <div className="mt-6 text-sm text-muted-foreground">
          Pas encore de compte ? <Link to="/register" className="text-primary font-semibold hover:underline">Créer un compte</Link>
        </div>
      </div>
    </div>
  );
}
