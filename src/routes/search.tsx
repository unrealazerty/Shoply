import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const schema = z.object({ q: fallback(z.string(), "").default("") });

export const Route = createFileRoute("/search")({
  validateSearch: zodValidator(schema),
  component: SearchPage,
  head: () => ({ meta: [{ title: "Recherche — Shoply" }] }),
});

function SearchPage() {
  const { q } = Route.useSearch();
  const s = q.toLowerCase().trim();
  const results = s ? products.filter((p) => p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s) || p.category.includes(s)) : [];
  const suggestion = s && results.length === 0 ? findClosestCategory(s) : null;

  return (
    <div className="container-x py-8">
      <div className="text-sm text-muted-foreground">Résultats pour</div>
      <h1 className="text-3xl md:text-4xl font-black tracking-tight">« {q} »</h1>
      <p className="mt-1 text-sm text-muted-foreground">{results.length} produit{results.length !== 1 ? "s" : ""} trouvé{results.length !== 1 ? "s" : ""}</p>

      {results.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-dashed border-border p-12 text-center">
          <div className="text-5xl">🔍</div>
          <div className="mt-4 text-lg font-bold">Aucun résultat</div>
          {suggestion && <p className="mt-2 text-sm text-muted-foreground">Vous vouliez peut-être dire <Link to="/search" search={{ q: suggestion }} className="text-primary font-semibold hover:underline">« {suggestion} »</Link> ?</p>}
          <Link to="/catalog" className="mt-6 inline-block rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background hover:bg-primary hover:text-primary-foreground transition-colors">Voir tout le catalogue</Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((p, i) => (<ProductCard key={p.id} product={p} index={i} />))}
        </div>
      )}
    </div>
  );
}

function findClosestCategory(q: string): string | null {
  const words = ["casque", "clavier", "chargeur", "ordinateur", "montre", "vélo", "sac"];
  return words.find((w) => w.startsWith(q.slice(0, 3))) ?? "gaming";
}
