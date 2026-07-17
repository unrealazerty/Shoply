import { createFileRoute } from "@tanstack/react-router";
import { promos } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { CatalogView } from "@/components/CatalogView";

export const Route = createFileRoute("/promotions")({
  component: Promos,
  head: () => ({ meta: [{ title: "Promotions — Shoply" }, { name: "description", content: "Les meilleures promotions Shoply." }] }),
});

function Promos() {
  const items = promos();
  return (
    <div>
      <section className="gradient-promo text-white">
        <div className="container-x py-12">
          <div className="text-xs font-semibold uppercase tracking-wider opacity-80">Offres limitées</div>
          <h1 className="mt-2 text-4xl md:text-5xl font-black tracking-tight">Jusqu'à -40% sur des centaines de produits</h1>
          <p className="mt-2 max-w-2xl opacity-90">Nos meilleures affaires du moment, renouvelées chaque semaine.</p>
        </div>
      </section>
      <div className="container-x py-10"><CatalogView items={items} /></div>
    </div>
  );
}
