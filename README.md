# Next.js Boilerplate

A production-ready Next.js boilerplate with App Router, TypeScript, and Tailwind CSS. Designed for freelancers and teams who value clean, maintainable code.

## Features

- ⚡ **Next.js 15** with App Router
- 🎨 **Tailwind CSS 4** with custom theme configuration
- 📘 **TypeScript** with strict mode
- 🧩 **Component Library** - Reusable UI components
- 📁 **Clean Architecture** - Organized folder structure
- 🔧 **Developer Experience** - ESLint, Prettier configured
- 🌐 **SEO Optimized** - Metadata, Open Graph, accessibility
- 📱 **Responsive** - Mobile-first approach

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── app/               # App Router pages and layouts
│   │   ├── globals.css    # Global styles with Tailwind
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   ├── loading.tsx    # Loading UI
│   │   ├── error.tsx      # Error boundary
│   │   └── not-found.tsx  # 404 page
│   ├── components/
│   │   └── ui/            # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── index.ts
│   ├── config/            # App configuration
│   │   ├── env.ts         # Environment variables
│   │   └── site.ts        # Site metadata
│   ├── hooks/             # Custom React hooks
│   │   ├── use-debounce.ts
│   │   ├── use-local-storage.ts
│   │   └── use-media-query.ts
│   ├── lib/               # Utility functions
│   │   ├── api.ts         # API client
│   │   └── utils.ts       # Helper functions
│   └── types/             # TypeScript types
│       └── index.ts
├── .env.example           # Environment variables template
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## Folder Conventions

| Folder | Purpose |
|--------|---------|
| `app/` | Next.js App Router - pages, layouts, API routes |
| `components/ui/` | Reusable UI primitives (Button, Card, Input) |
| `components/` | Feature-specific components (add as needed) |
| `config/` | App configuration and environment |
| `hooks/` | Custom React hooks |
| `lib/` | Utility functions and API client |
| `types/` | Shared TypeScript types |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run type-check` | Run TypeScript check |
| `npm run format` | Format with Prettier |

## Environment Variables

Copy `.env.example` to `.env.local` and update values:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_APP_NAME` - Application name
- `NEXT_PUBLIC_APP_URL` - Application URL
- `NEXT_PUBLIC_API_URL` - API endpoint

## Customization

### Theme Colors

Edit `src/app/globals.css` to customize:

```css
@theme {
  --color-primary: #6366f1;
  --color-secondary: #10b981;
  --color-accent: #f59e0b;
  /* ... more colors */
}
```

### Site Metadata

Edit `src/config/site.ts`:

```typescript
export const siteConfig = {
  name: "Your App Name",
  description: "Your description",
  // ...
};
```

## Adding New Pages

1. Create a folder in `src/app/` with your route name
2. Add a `page.tsx` file

```tsx
// src/app/about/page.tsx
export default function AboutPage() {
  return <h1>About</h1>;
}
```

## Adding New Components

1. Create component in `src/components/ui/`
2. Export from `src/components/ui/index.ts`

```tsx
// src/components/ui/badge.tsx
export function Badge({ children }) {
  return <span className="...">{children}</span>;
}
```

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## License

MIT License - feel free to use for any project.

