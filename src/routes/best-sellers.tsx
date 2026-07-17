import { createFileRoute } from "@tanstack/react-router";
import { bestSellers, products } from "@/lib/products";
import { CatalogView } from "@/components/CatalogView";

export const Route = createFileRoute("/best-sellers")({
  component: () => {
    const items = [...bestSellers(), ...[...products].sort((a, b) => b.reviews - a.reviews).slice(0, 15)];
    return (
      <div className="container-x py-10">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">Meilleures ventes</h1>
        <p className="mt-1 text-muted-foreground">Les produits préférés de la communauté Shoply.</p>
        <div className="mt-8"><CatalogView items={Array.from(new Map(items.map(p => [p.id, p])).values())} /></div>
      </div>
    );
  },
  head: () => ({ meta: [{ title: "Meilleures ventes — Shoply" }] }),
});
