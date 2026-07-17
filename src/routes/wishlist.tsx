import { createFileRoute, Link } from "@tanstack/react-router";
import { useWishlist } from "@/lib/store";
import { getProduct } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/wishlist")({
  component: WishPage,
  head: () => ({ meta: [{ title: "Wishlist — Shoply" }] }),
});

function WishPage() {
  const ids = useWishlist((s) => s.ids);
  const items = ids.map(getProduct).filter(Boolean) as ReturnType<typeof getProduct>[];

  return (
    <div className="container-x py-8">
      <h1 className="text-3xl md:text-4xl font-black tracking-tight">Ma wishlist</h1>
      <p className="mt-1 text-sm text-muted-foreground">{items.length} produit{items.length > 1 ? "s" : ""} sauvegardé{items.length > 1 ? "s" : ""}</p>
      {items.length === 0 ? (
        <div className="mt-16 rounded-3xl border border-dashed border-border p-16 text-center">
          <div className="text-5xl">❤️</div>
          <div className="mt-3 text-lg font-bold">Votre wishlist est vide</div>
          <p className="mt-1 text-sm text-muted-foreground">Cliquez sur le cœur pour sauvegarder vos coups de cœur.</p>
          <Link to="/catalog" className="mt-6 inline-block rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background hover:bg-primary hover:text-primary-foreground transition-colors">Explorer</Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((p, i) => p && <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
