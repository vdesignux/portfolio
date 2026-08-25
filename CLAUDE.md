# Portfolio — Claude context file

## What this is
Next.js 16 App Router site. All pages are statically generated. No database, no CMS — everything is MDX files in `/content`.

## Stack
- Next.js 16 (App Router, static export)
- TypeScript
- Tailwind CSS v4 (utility classes available but mostly using CSS custom properties directly)
- Geist font (via `geist` npm package, loaded in `app/layout.tsx`)
- `gray-matter` — frontmatter parsing
- `next-mdx-remote` — MDX rendering in RSC

## Content structure
```
content/
  projects/     ← case study bodies + frontmatter
  decisions/    ← decision records, one file per decision
  principles/   ← principle files
  iterations/   ← iteration trails
```

All content reading goes through `lib/content.ts`. Do not read files directly in pages.

## Design tokens
All tokens live in `app/globals.css` as CSS custom properties on `:root`.
**Never hardcode colours or spacing values.** Always use `var(--token-name)`.

Key tokens:
- `--bg`, `--bg-subtle` — surfaces
- `--border`, `--border-strong` — borders  
- `--text-primary`, `--text-secondary`, `--text-tertiary` — text hierarchy
- `--space-1` through `--space-16` — 8px grid spacing
- `--text-xs` through `--text-5xl` — type scale
- `--content`, `--content-lg`, `--content-xl` — max-width guards

## Component split
Server components: all pages, Nav (no, Nav is client because of `usePathname`)
Client components: anything with event handlers or hooks — ProjectRow, PrincipleCard, PrincipleIndexCard, DecisionCard, Nav

## MDX components available in case study bodies
- `<Figure src alt caption />` — image placeholder (real images go in `/public/media/`)
- `<Artifact slug />` — artifact embed placeholder
- `<Callout type="provenance">` — provenance note
- `<Decision decisionRef="TOP-001" />` — inline decision reference (note: use `decisionRef` not `ref`)
- `<Iteration slug />` — iteration embed placeholder

## Adding a new project
1. Add `content/projects/your-slug.mdx` with frontmatter matching the Project type in `lib/content.ts`
2. Add decision files to `content/decisions/` with `project: your-slug`
3. No route changes needed — `generateStaticParams` picks up new slugs automatically

## To run locally
```bash
npm install
npm run dev
```

## To build
```bash
npm run build
```

## What's still TODO
- Real images (drop into `/public/media/project-slug/filename.png`, update Figure src props)
- Author search gaps (suppression section, design system components, what-would-change section)
- Framer Motion animations (install `framer-motion`, wrap sections)
- Water animation on hero (build separately, import as client component)
- Ask Me AI feature (Month 2)
- Mobile responsive pass (currently desktop-first, needs media queries or Tailwind responsive classes)
