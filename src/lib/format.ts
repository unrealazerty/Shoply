export const eur = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(n);

export const pct = (oldP: number, p: number) => Math.round(((oldP - p) / oldP) * 100);
