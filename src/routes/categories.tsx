import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, products } from "@/lib/products";

export const Route = createFileRoute("/categories")({
  component: CategoriesPage,
  head: () => ({
    meta: [
      { title: "Catégories — Shoply" },
      { name: "description", content: "Explorez toutes les catégories Shoply : électronique, mode, maison, gaming et plus." },
      { property: "og:title", content: "Catégories — Shoply" },
    ],
  }),
});

function CategoriesPage() {
  return (
    <div className="container-x py-10">
      <h1 className="text-3xl md:text-4xl font-black tracking-tight">Toutes les catégories</h1>
      <p className="mt-2 text-muted-foreground">Choisissez un univers et explorez notre sélection.</p>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((c) => {
          const count = products.filter((p) => p.category === c.slug).length;
          return (
            <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card card-hover">
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <div className="text-2xl">{c.emoji}</div>
                  <div className="text-base font-bold">{c.name}</div>
                  <div className="text-xs opacity-80">{count} produits</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
