import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categories, byCategory } from "@/lib/products";
import { CatalogView } from "@/components/CatalogView";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    return { cat, items: byCategory(params.slug) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.cat.name} — Shoply` : "Catégorie — Shoply" },
      { name: "description", content: loaderData ? `Produits ${loaderData.cat.name} sur Shoply — livraison rapide.` : "" },
    ],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="container-x py-20 text-center">
      <div className="text-6xl">🛒</div>
      <h1 className="mt-4 text-2xl font-bold">Catégorie introuvable</h1>
      <Link to="/categories" className="mt-4 inline-block text-primary hover:underline">Voir toutes les catégories</Link>
    </div>
  ),
});

function CategoryPage() {
  const { cat, items } = Route.useLoaderData();
  return (
    <div className="container-x py-8">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Accueil</Link><span>/</span>
        <Link to="/categories" className="hover:text-foreground">Catégories</Link><span>/</span>
        <span className="text-foreground font-medium">{cat.name}</span>
      </nav>
      <div className="mt-4 flex items-center gap-3">
        <div className="text-4xl">{cat.emoji}</div>
        <div>
          <h1 className="text-3xl font-black tracking-tight">{cat.name}</h1>
          <p className="text-sm text-muted-foreground">{items.length} produits</p>
        </div>
      </div>
      <div className="mt-8"><CatalogView items={items} /></div>
    </div>
  );
}
