import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Truck, ShieldCheck, RefreshCcw, Sparkles } from "lucide-react";
import { categories, products, bestSellers, newArrivals, promos } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  component: Home,
});

const slides = [
  {
    tag: "Édition high-tech",
    title: "Jusqu'à -60% sur le high-tech",
    subtitle: "Les meilleures marques, sélectionnées et livrées en 24h.",
    cta: "Acheter maintenant",
    href: "/promotions",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1600&auto=format&fit=crop",
    gradient: "from-blue-600/80 to-indigo-700/80",
  },
  {
    tag: "Nouveautés gaming",
    title: "L'univers gaming nouvelle génération",
    subtitle: "Consoles, casques, claviers — la performance sans compromis.",
    cta: "Découvrir",
    href: "/category/$slug",
    params: { slug: "gaming" },
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&auto=format&fit=crop",
    gradient: "from-fuchsia-600/80 to-purple-800/80",
  },
  {
    tag: "Rentrée essentielle",
    title: "Les indispensables de la rentrée",
    subtitle: "Tout pour bien démarrer, du bureau à la cuisine.",
    cta: "Voir la sélection",
    href: "/catalog",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&auto=format&fit=crop",
    gradient: "from-emerald-600/80 to-teal-800/80",
  },
];

function Home() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="container-x pt-6">
        <div className="relative overflow-hidden rounded-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="relative h-[420px] md:h-[520px]"
            >
              <img src={slides[i].image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-br ${slides[i].gradient}`} />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-xl px-6 md:px-14 text-white">
                  <motion.span
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold ring-1 ring-white/30"
                  >
                    <Sparkles className="h-3.5 w-3.5" /> {slides[i].tag}
                  </motion.span>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    className="mt-4 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]"
                  >
                    {slides[i].title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                    className="mt-4 text-base md:text-lg text-white/90 max-w-md"
                  >
                    {slides[i].subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                    className="mt-6 flex flex-wrap gap-3"
                  >
                    <Link to="/promotions" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-foreground shadow-lg hover:bg-white/90 transition-colors">
                      {slides[i].cta} <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link to="/catalog" className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-5 py-3 text-sm font-bold text-white ring-1 ring-white/30 hover:bg-white/20 transition-colors">
                      Découvrir
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Slide ${k + 1}`}
                className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-white" : "w-1.5 bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className="container-x mt-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Truck, title: "Livraison offerte", sub: "dès 49€ d'achat" },
            { icon: ShieldCheck, title: "Paiement sécurisé", sub: "chiffrement de bout en bout" },
            { icon: RefreshCcw, title: "Retour 30 jours", sub: "sans justification" },
            { icon: Sparkles, title: "Support 7j/7", sub: "réponse en moins d'1h" },
          ].map((p) => (
            <div key={p.title} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <p.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">{p.title}</div>
                <div className="text-xs text-muted-foreground">{p.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-x mt-16">
        <SectionHeader title="Explorer par catégorie" link="/categories" linkLabel="Toutes les catégories" />
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.slice(0, 8).map((c, k) => (
            <motion.div key={c.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: k * 0.03 }}>
              <Link
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="group block overflow-hidden rounded-2xl border border-border bg-card card-hover"
              >
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-3 text-white">
                    <div className="text-lg">{c.emoji}</div>
                    <div className="text-sm font-semibold">{c.name}</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROMOS */}
      <section className="container-x mt-16">
        <SectionHeader title="Offres du moment" subtitle="Jusqu'à -40% sur une sélection" link="/promotions" linkLabel="Voir toutes les promos" />
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {promos().slice(0, 5).map((p, i) => (<ProductCard key={p.id} product={p} index={i} />))}
        </div>
      </section>

      {/* SPLIT BANNER */}
      <section className="container-x mt-16 grid gap-4 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl bg-foreground text-background p-8 md:p-12 min-h-64">
          <div className="max-w-xs relative z-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-background/70">Édition studio</div>
            <div className="mt-2 text-3xl font-black leading-tight">L'audio qui change tout</div>
            <p className="mt-2 text-sm text-background/80">Casques et enceintes premium, testés par nos ingénieurs.</p>
            <Link to="/category/$slug" params={{ slug: "audio" }} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline">
              Explorer <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800" alt="" className="absolute -right-8 -bottom-8 w-64 md:w-80 rounded-3xl opacity-70 rotate-12" />
        </div>
        <div className="relative overflow-hidden rounded-3xl gradient-promo text-white p-8 md:p-12 min-h-64">
          <div className="max-w-xs relative z-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/80">Fin de série</div>
            <div className="mt-2 text-3xl font-black leading-tight">-40% sur la maison</div>
            <p className="mt-2 text-sm text-white/90">Aménagez, illuminez, réinventez vos espaces.</p>
            <Link to="/category/$slug" params={{ slug: "maison" }} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline">
              Voir la sélection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800" alt="" className="absolute -right-6 -bottom-6 w-64 md:w-80 rounded-3xl opacity-60 -rotate-6" />
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="container-x mt-16">
        <SectionHeader title="Meilleures ventes" link="/best-sellers" linkLabel="Tout voir" />
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {bestSellers().slice(0, 5).map((p, i) => (<ProductCard key={p.id} product={p} index={i} />))}
        </div>
      </section>

      {/* NEW */}
      <section className="container-x mt-16">
        <SectionHeader title="Nouveautés" link="/new" linkLabel="Toutes les nouveautés" />
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {newArrivals().concat(products.slice(20, 25)).slice(0, 5).map((p, i) => (<ProductCard key={p.id} product={p} index={i} />))}
        </div>
      </section>
    </>
  );
}

function SectionHeader({ title, subtitle, link, linkLabel }: { title: string; subtitle?: string; link?: string; linkLabel?: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {link && (
        <Link to={link} className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline underline-offset-4">
          {linkLabel} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
