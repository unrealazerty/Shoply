import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

type Sort = "relevance" | "popularity" | "price-asc" | "price-desc" | "new" | "rating";

export function CatalogView({ items }: { items: Product[] }) {
  const [sort, setSort] = useState<Sort>("relevance");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [brands, setBrands] = useState<string[]>([]);
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [onlyStock, setOnlyStock] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [openFilters, setOpenFilters] = useState(false);

  const allBrands = useMemo(() => Array.from(new Set(items.map((i) => i.brand))).sort(), [items]);

  const filtered = useMemo(() => {
    let r = items.filter((p) => p.price <= maxPrice);
    if (brands.length) r = r.filter((p) => brands.includes(p.brand));
    if (onlyPromo) r = r.filter((p) => p.oldPrice);
    if (onlyStock) r = r.filter((p) => p.stock > 0);
    if (minRating) r = r.filter((p) => p.rating >= minRating);
    switch (sort) {
      case "price-asc": r = [...r].sort((a, b) => a.price - b.price); break;
      case "price-desc": r = [...r].sort((a, b) => b.price - a.price); break;
      case "rating": r = [...r].sort((a, b) => b.rating - a.rating); break;
      case "popularity": r = [...r].sort((a, b) => b.reviews - a.reviews); break;
      case "new": r = [...r].sort((a, b) => (b.badge === "Nouveau" ? 1 : 0) - (a.badge === "Nouveau" ? 1 : 0)); break;
    }
    return r;
  }, [items, sort, maxPrice, brands, onlyPromo, onlyStock, minRating]);

  const filters = (
    <div className="space-y-6">
      <div>
        <div className="mb-2 text-sm font-semibold">Prix max : {maxPrice}€</div>
        <input type="range" min={20} max={2000} step={10} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-primary" />
      </div>
      <div>
        <div className="mb-2 text-sm font-semibold">Marques</div>
        <div className="max-h-52 overflow-y-auto space-y-1.5 pr-2">
          {allBrands.map((b) => (
            <label key={b} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={brands.includes(b)}
                onChange={() => setBrands((s) => (s.includes(b) ? s.filter((x) => x !== b) : [...s, b]))}
                className="h-4 w-4 rounded accent-primary"
              />
              {b}
            </label>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-2 text-sm font-semibold">Note minimum</div>
        <div className="flex gap-1.5">
          {[0, 3, 4, 4.5].map((n) => (
            <button key={n} onClick={() => setMinRating(n)} className={cn("rounded-full border px-3 py-1 text-xs font-medium transition-colors", minRating === n ? "bg-foreground text-background border-foreground" : "border-border hover:bg-accent")}>
              {n === 0 ? "Tout" : `${n}★+`}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input type="checkbox" checked={onlyPromo} onChange={(e) => setOnlyPromo(e.target.checked)} className="h-4 w-4 rounded accent-primary" />
          En promotion uniquement
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input type="checkbox" checked={onlyStock} onChange={(e) => setOnlyStock(e.target.checked)} className="h-4 w-4 rounded accent-primary" />
          En stock uniquement
        </label>
      </div>
      <button onClick={() => { setMaxPrice(2000); setBrands([]); setOnlyPromo(false); setOnlyStock(false); setMinRating(0); }} className="w-full rounded-full border border-border py-2 text-sm font-medium hover:bg-accent">
        Réinitialiser
      </button>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-border bg-card p-5">{filters}</div>
      </aside>
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">{filtered.length} résultats</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setOpenFilters(true)} className="lg:hidden flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-accent">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Filtres
            </button>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-9 rounded-full border border-border bg-background px-3 text-sm outline-none focus:border-primary">
              <option value="relevance">Pertinence</option>
              <option value="popularity">Popularité</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="new">Nouveautés</option>
              <option value="rating">Mieux notés</option>
            </select>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="mt-16 text-center text-muted-foreground">Aucun produit ne correspond à ces filtres.</div>
        ) : (
          <motion.div layout className="mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p, i) => (<ProductCard key={p.id} product={p} index={i} />))}
          </motion.div>
        )}
      </div>

      {openFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div onClick={() => setOpenFilters(false)} className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-background p-6 overflow-y-auto">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-lg font-bold">Filtres</div>
              <button onClick={() => setOpenFilters(false)} className="p-2"><X className="h-5 w-5" /></button>
            </div>
            {filters}
          </motion.div>
        </div>
      )}
    </div>
  );
}
