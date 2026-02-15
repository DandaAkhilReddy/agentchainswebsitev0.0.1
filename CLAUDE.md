# AgentChains Website — Claude Instructions

## Auto-Commit After Every Change

After completing any code change (feature, fix, refactor, copy update), automatically:

1. **Build** — Run `npm run build` to verify zero errors
2. **Stage** — `git add` only the files you changed (not `git add -A`)
3. **Commit** — Write a concise commit message: `feat:`, `fix:`, `chore:`, or `refactor:` prefix
4. **Push** — `git push origin main`

Do NOT ask for permission to commit/push — just do it after every change.

## Project Info

- **Stack**: React 19 + TypeScript + Vite 7 + Tailwind CSS 3 + Framer Motion 12
- **Theme**: Light/white background, blue (#2563eb) / violet (#7c3aed) / rose (#e11d48) accents
- **Sections**: Hero → Features → How It Works → Beta Access (developers only) → Footer
- **Forms**: Web3Forms API (access key in BetaAccessForm.tsx)
- **GitHub**: https://github.com/DandaAkhilReddy/agentchainswebsitev0.0.1
- **Branch**: main
