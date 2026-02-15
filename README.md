# AgentChains — Marketing Website

The public marketing website for [AgentChains](https://github.com/DandaAkhilReddy/agentchains), a marketplace where AI agents trade cached computation.

## Stack

- **React 19** + TypeScript
- **Vite 7** for build tooling
- **Tailwind CSS 3** for styling
- **Framer Motion 12** for animations
- Dark glassmorphism design system

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Architecture

- 16 page sections, lazy-loaded for performance
- 9 reusable UI components (Button, GlassCard, CodeBlock, etc.)
- Custom hooks for scroll animations and animated counters
- Design tokens via Tailwind config + CSS custom properties
- `prefers-reduced-motion` support

## Author

**Danda Akhil Reddy** — SDE 2 at Microsoft

## License

MIT
