import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

function NotFoundComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="max-w-md text-center">
          <div className="text-8xl font-black tracking-tighter bg-clip-text text-transparent gradient-primary">404</div>
          <h1 className="mt-4 text-2xl font-bold">Page introuvable</h1>
          <p className="mt-2 text-sm text-muted-foreground">Cette page n'existe pas — mais notre catalogue est plein de trouvailles.</p>
          <div className="mt-6 flex justify-center gap-2">
            <Link to="/" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:bg-primary hover:text-primary-foreground transition-colors">Accueil</Link>
            <Link to="/catalog" className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-accent">Voir le catalogue</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Cette page n'a pas pu charger</h1>
        <p className="mt-2 text-sm text-muted-foreground">Un incident est survenu. Réessayez ou revenez à l'accueil.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover">Réessayer</button>
          <a href="/" className="rounded-full border border-input px-4 py-2 text-sm font-semibold hover:bg-accent">Accueil</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Shoply — Achetez simplement. Découvrez davantage." },
      { name: "description", content: "Shoply est une marketplace moderne : électronique, mode, maison, gaming et bien plus. Livraison rapide, prix imbattables." },
      { name: "author", content: "Shoply" },
      { property: "og:title", content: "Shoply — Marketplace moderne" },
      { property: "og:description", content: "Achetez simplement. Découvrez davantage." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Shoply" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <BackToTop />
        <Toaster position="bottom-right" theme="system" richColors closeButton />
      </div>
    </QueryClientProvider>
  );
}
