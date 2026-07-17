import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/products";
import { eur, pct } from "@/lib/format";
import { useCart, useWishlist } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const addToCart = useCart((s) => s.add);
  const toggleWish = useWishlist((s) => s.toggle);
  const wished = useWishlist((s) => s.ids.includes(product.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
      className="group relative"
    >
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="block overflow-hidden rounded-2xl bg-card ring-1 ring-border/60 shadow-[var(--shadow-soft)] transition-all duration-300 hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1"
      >
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.badge && (
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm",
                  product.badge === "Promo" && "bg-promo text-promo-foreground",
                  product.badge === "Nouveau" && "bg-success text-success-foreground",
                  product.badge === "Meilleure vente" && "bg-primary text-primary-foreground",
                  product.badge === "Édition limitée" && "bg-foreground text-background"
                )}
              >
                {product.badge}
              </span>
            )}
            {product.oldPrice && !product.badge && (
              <span className="rounded-full bg-promo px-2.5 py-1 text-xs font-semibold text-promo-foreground shadow-sm">
                -{pct(product.oldPrice, product.price)}%
              </span>
            )}
          </div>
          <button
            aria-label="Ajouter à la wishlist"
            onClick={(e) => {
              e.preventDefault();
              toggleWish(product.id);
              toast(wished ? "Retiré de la wishlist" : "Ajouté à la wishlist");
            }}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 backdrop-blur-md ring-1 ring-border transition-all hover:scale-110"
          >
            <Heart className={cn("h-4 w-4", wished ? "fill-wishlist stroke-wishlist" : "text-foreground")} />
          </button>
          <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product.id);
                toast.success(`${product.name} ajouté au panier`);
              }}
              className="pointer-events-auto flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ShoppingCart className="h-4 w-4" /> Ajouter
            </button>
          </div>
        </div>
        <div className="space-y-1.5 p-4">
          <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{product.brand}</div>
          <h3 className="line-clamp-2 min-h-10 text-sm font-medium text-foreground">{product.name}</h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-promo stroke-promo" />
            <span className="font-medium text-foreground">{product.rating}</span>
            <span>({product.reviews.toLocaleString("fr-FR")})</span>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-lg font-bold text-foreground">{eur(product.price)}</span>
            {product.oldPrice && <span className="text-xs text-muted-foreground line-through">{eur(product.oldPrice)}</span>}
          </div>
          <div className="text-xs text-success font-medium">{product.delivery}</div>
        </div>
      </Link>
    </motion.div>
  );
}
