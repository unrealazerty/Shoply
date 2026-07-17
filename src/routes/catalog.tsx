import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { CatalogView } from "@/components/CatalogView";

export const Route = createFileRoute("/catalog")({
  component: Catalog,
  head: () => ({
    meta: [
      { title: "Catalogue — Shoply" },
      { name: "description", content: "Découvrez tous les produits Shoply : filtrez par prix, marque, note et plus." },
    ],
  }),
});

function Catalog() {
  return (
    <div className="container-x py-8">
      <h1 className="text-3xl md:text-4xl font-black tracking-tight">Catalogue complet</h1>
      <p className="mt-1 text-sm text-muted-foreground">{products.length} produits disponibles</p>
      <div className="mt-8"><CatalogView items={products} /></div>
    </div>
  );
}
