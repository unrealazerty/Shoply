import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, User, X, Sparkles, Tag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useCart, useTheme, useWishlist } from "@/lib/store";
import { categories, products } from "@/lib/products";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [q, setQ] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [openSuggest, setOpenSuggest] = useState(false);
  const cartCount = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const wishCount = useWishlist((s) => s.ids.length);
  const theme = useTheme((s) => s.theme);
  const toggleTheme = useTheme((s) => s.toggle);
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    setOpenMenu(false);
    setOpenSuggest(false);
  }, [path]);

  const suggestions = useMemo(() => {
    if (!q.trim()) return [];
    const s = q.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s)).slice(0, 6);
  }, [q]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) navigate({ to: "/search", search: { q: q.trim() } });
  };

  return (
    <>
      <div className="hidden md:block bg-foreground text-background text-xs">
        <div className="container-x flex h-9 items-center justify-between">
          <div className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> Démo portfolio — aucune commande réelle</div>
          <div className="flex items-center gap-4 opacity-80">
            <Link to="/faq" className="hover:opacity-100">Aide</Link>
            <Link to="/contact" className="hover:opacity-100">Contact</Link>
            <span>Livraison offerte dès 49€</span>
          </div>
        </div>
      </div>

      <motion.header
        animate={{
          backdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
          backgroundColor: scrolled ? "color-mix(in oklab, var(--background) 82%, transparent)" : "var(--background)",
        }}
        className={cn(
          "sticky top-0 z-40 border-b border-border/60 transition-all",
          scrolled ? "shadow-[var(--shadow-soft)]" : ""
        )}
      >
        <div className="container-x">
          <div className={cn("flex items-center gap-4 transition-all", scrolled ? "h-14" : "h-20")}>
            <button aria-label="Menu" className="md:hidden -ml-1 p-2" onClick={() => setOpenMenu(true)}>
              <Menu className="h-5 w-5" />
            </button>

            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary shadow-[var(--shadow-premium)]">
                <ShoppingBag className="h-5 w-5 text-white" strokeWidth={2.4} />
              </div>
              <span className="hidden sm:block text-xl font-bold tracking-tight">Shoply</span>
            </Link>

            <form onSubmit={submit} className="relative flex-1 max-w-2xl">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => { setQ(e.target.value); setOpenSuggest(true); }}
                  onFocus={() => setOpenSuggest(true)}
                  onBlur={() => setTimeout(() => setOpenSuggest(false), 150)}
                  placeholder="Rechercher un produit, une marque, une catégorie…"
                  className="h-11 w-full rounded-full border border-border bg-surface pl-11 pr-24 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
                <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 rounded-full bg-foreground px-4 text-xs font-semibold text-background hover:bg-primary hover:text-primary-foreground transition-colors">
                  Rechercher
                </button>
              </div>
              <AnimatePresence>
                {openSuggest && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-2xl border border-border bg-popover shadow-[var(--shadow-elevated)]"
                  >
                    <div className="p-1.5">
                      {suggestions.map((p) => (
                        <Link
                          key={p.id}
                          to="/product/$id"
                          params={{ id: p.id }}
                          className="flex items-center gap-3 rounded-xl p-2 hover:bg-accent"
                        >
                          <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-medium">{p.name}</div>
                            <div className="text-xs text-muted-foreground">{p.brand} · {p.category}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <nav className="hidden lg:flex items-center gap-1 text-sm">
              <Link to="/promotions" className="rounded-full px-3 py-2 font-medium text-promo hover:bg-accent flex items-center gap-1.5">
                <Tag className="h-4 w-4" /> Promos
              </Link>
              <Link to="/categories" className="rounded-full px-3 py-2 font-medium hover:bg-accent">Catégories</Link>
              <Link to="/best-sellers" className="rounded-full px-3 py-2 font-medium hover:bg-accent">Best-sellers</Link>
              <Link to="/new" className="rounded-full px-3 py-2 font-medium hover:bg-accent">Nouveautés</Link>
            </nav>

            <div className="flex items-center gap-1 ml-auto">
              <button onClick={toggleTheme} aria-label="Thème" className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent">
                {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
              </button>
              <Link to="/login" aria-label="Compte" className="hidden sm:grid h-10 w-10 place-items-center rounded-full hover:bg-accent">
                <User className="h-4.5 w-4.5" />
              </Link>
              <Link to="/wishlist" aria-label="Wishlist" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-accent">
                <Heart className="h-4.5 w-4.5" />
                <AnimatePresence>
                  {wishCount > 0 && (
                    <motion.span
                      key={wishCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-wishlist px-1 text-[10px] font-bold text-white"
                    >
                      {wishCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
              <Link to="/cart" aria-label="Panier" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-accent">
                <ShoppingBag className="h-4.5 w-4.5" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0, y: -6 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      className="absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {openMenu && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpenMenu(false)} className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm md:hidden" />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm bg-background p-6 shadow-2xl md:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-bold">Menu</span>
                <button onClick={() => setOpenMenu(false)} className="p-2"><X className="h-5 w-5" /></button>
              </div>
              <nav className="space-y-1">
                {[
                  { to: "/" as const, label: "Accueil" },
                  { to: "/categories" as const, label: "Catégories" },
                  { to: "/catalog" as const, label: "Catalogue" },
                  { to: "/promotions" as const, label: "Promotions" },
                  { to: "/best-sellers" as const, label: "Meilleures ventes" },
                  { to: "/new" as const, label: "Nouveautés" },
                  { to: "/wishlist" as const, label: "Wishlist" },
                  { to: "/cart" as const, label: "Panier" },
                  { to: "/login" as const, label: "Se connecter" },
                  { to: "/contact" as const, label: "Contact" },
                  { to: "/faq" as const, label: "FAQ" },
                ].map((l) => (
                  <Link key={l.to} to={l.to} className="block rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-accent">{l.label}</Link>
                ))}
              </nav>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Catégories</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {categories.slice(0, 10).map((c) => (
                    <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="rounded-lg px-3 py-2 text-sm hover:bg-accent">
                      <span className="mr-1.5">{c.emoji}</span>{c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
