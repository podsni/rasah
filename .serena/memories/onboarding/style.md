# Style and Conventions

## Naming
- Components: PascalCase (e.g., `ProductCard.tsx`).
- Routes: TanStack Router file-based naming (e.g., `katalog.$slug.tsx`).
- Utilities/Data: camelCase (e.g., `products.ts`, `utils.ts`).

## Styling
- Use **Tailwind CSS v4** design tokens in `src/styles.css`.
- Colors use **oklch** format for high-fidelity colors.
- Use shadcn/ui components for base UI elements.

## Motion Design (Premium Personality)
- **Easings:** Use `--ease-out-premium` (cubic-bezier(0.4, 0, 0.2, 1)) for standard transitions.
- **Animations:** `enter-up`, `enter-scale`, `reveal-clip`.
- **Interactions:** Use `active:scale` for press feedback (Emil Kowalski principle).
- **Stagger:** Use `.stagger-N` classes for sequential entrance.

## TypeScript
- Strict mode enabled.
- Prefer interfaces for object shapes.
- Use explicit return types for complex functions.
