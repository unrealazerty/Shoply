import { createFileRoute } from "@tanstack/react-router";
import { newArrivals, products } from "@/lib/products";
import { CatalogView } from "@/components/CatalogView";

export const Route = createFileRoute("/new")({
  component: () => {
    const items = [...newArrivals(), ...products.slice(15, 30)];
    return (
      <div className="container-x py-10">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">Nouveautés</h1>
        <p className="mt-1 text-muted-foreground">Fraîchement arrivés dans nos rayons.</p>
        <div className="mt-8"><CatalogView items={items} /></div>
      </div>
    );
  },
  head: () => ({ meta: [{ title: "Nouveautés — Shoply" }] }),
});
