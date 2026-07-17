# 🛍️ Shoply

**Démo de marketplace e-commerce moderne et performante**

[![TypeScript](https://img.shields.io/badge/TypeScript-97.9%25-3178c6?style=flat-square)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square)](https://react.dev/)
[![TanStack](https://img.shields.io/badge/TanStack-Full%20Stack-000000?style=flat-square)](https://tanstack.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square)](https://tailwindcss.com/)

## 📋 Table des matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Stack technique](#-stack-technique)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Démarrage](#-démarrage)
- [Scripts disponibles](#-scripts-disponibles)
- [Structure du projet](#-structure-du-projet)
- [Configuration](#-configuration)
- [Contribution](#-contribution)
- [Licence](#-licence)

## 🎯 À propos

Shoply est une démonstration complète d'une plateforme de marketplace e-commerce. Ce projet showcases les meilleures pratiques modernes de développement web avec une stack TypeScript/React robuste et performante.

## ✨ Fonctionnalités

- 🛒 **Panier d'achat** - Gestion complète du panier avec persistance
- 🔍 **Recherche et filtres** - Recherche avancée et filtrage par catégories
- 👤 **Authentification** - Système d'authentification utilisateur
- 💳 **Paiement** - Intégration pour le traitement des paiements
- 📱 **Design responsive** - Interface adaptée à tous les appareils
- 🎨 **Interface moderne** - UI/UX contemporaine avec Radix UI
- ⚡ **Performance optimale** - Rendu efficace et temps de chargement rapides
- 🔄 **Mise en cache** - React Query pour la gestion optimisée des données

## 🛠️ Stack technique

### Frontend
- **React 19.2** - Bibliothèque UI moderne
- **TypeScript 5.8** - Typage statique
- **TanStack Start** - Framework React full-stack
- **TanStack Router** - Routage performant
- **TanStack Query** - Gestion d'état serveur

### Styling
- **Tailwind CSS 4.2** - Framework CSS utilitaire
- **Radix UI** - Composants accessibles non-stylisés
- **Framer Motion** - Animations fluides
- **Class Variance Authority** - Gestion des variants de composants

### Outils & Configuration
- **Vite 8** - Build tool ultra-rapide
- **ESLint** - Linting JavaScript/TypeScript
- **Prettier** - Formatage de code
- **Zod** - Validation de schémas TypeScript
- **React Hook Form** - Gestion des formulaires

### Utilitaires
- **Lucide React** - Icônes SVG
- **date-fns** - Manipulation de dates
- **Recharts** - Graphiques et visualisations
- **Sonner** - Notifications toast
- **Zustand** - Gestion d'état légère

## 📦 Prérequis

- **Node.js** 18.x ou supérieur
- **npm** ou **yarn** ou **pnpm**

## 🚀 Installation

1. **Cloner le repository**
```bash
git clone https://github.com/unrealazerty/Shoply.git
cd Shoply
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

## ▶️ Démarrage

### Mode développement
```bash
npm run dev
```
L'application sera accessible à `http://localhost:5173`

### Mode production
```bash
npm run build
npm run preview
```

## 📝 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement avec hot reload |
| `npm run build` | Crée une build optimisée pour la production |
| `npm run build:dev` | Crée une build en mode développement |
| `npm run preview` | Prévisualise la build de production localement |
| `npm run lint` | Exécute ESLint sur le code |
| `npm run format` | Formate le code avec Prettier |

## 📁 Structure du projet

```
Shoply/
├── src/
│   ├── routes/          # Routes TanStack Router
│   ├── components/      # Composants React réutilisables
│   ├── hooks/           # Hooks personnalisés
│   ├── lib/             # Utilitaires et helpers
│   ├── styles/          # Styles globaux
│   └── app.tsx          # Point d'entrée principal
├── public/              # Fichiers statiques
├── package.json         # Dépendances du projet
├── vite.config.ts       # Configuration Vite
├── tsconfig.json        # Configuration TypeScript
├── tailwind.config.ts   # Configuration Tailwind CSS
└── README.md            # Ce fichier
```

## ⚙️ Configuration

### Tailwind CSS
Le projet utilise Tailwind CSS avec la configuration standard. Modifiez `tailwind.config.ts` pour personnaliser les couleurs, fonts et thèmes.

### TypeScript
Configuration disponible dans `tsconfig.json`. Les chemins d'import sont configurés via `vite-tsconfig-paths`.

### Vite
Configuration dans `vite.config.ts` avec support complet du plugin React et des chemins TypeScript.

## 🤝 Contribution

Les contributions sont bienvenues ! Pour contribuer :

1. Forkez le repository
2. Créez une branche pour votre feature (`git checkout -b feature/AmazingFeature`)
3. Commitez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est open source et disponible sous licence MIT.

---

**Créé par** [@unrealazerty](https://github.com/unrealazerty)

**Dernière mise à jour** : Juillet 2026
