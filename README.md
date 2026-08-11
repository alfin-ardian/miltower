# MIL Tower

Educational media / information literacy game inspired by a Jenga tower.

**Play → Think → Write → Get feedback → Learn.**

## Stack

- React + Vite + TypeScript
- Tailwind CSS
- React Router
- Lucide React

There is no backend yet. Essay evaluation uses a mock service in `src/services/evaluationService.ts` that can later be replaced with `POST /api/evaluate`.

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Demo flow

Landing → Setup → Game → Select block → Essay question → Mock AI evaluation → Stability update → Next turn → Result → Dashboard
