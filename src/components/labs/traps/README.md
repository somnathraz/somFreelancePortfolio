# Interview-trap replay engine

Renders `/labs/traps/<slug>` from `content/traps/<slug>.json`. Those files are generated in
[interview-traps](https://github.com/somnathraz/interview-traps) by `npm run trace` and copied here with:

```bash
npm run traps:sync            # expects ../interview-traps, or set TRAPS_DIR
```

No per-episode code lives here. A new trap = a new JSON file. The format is `src/types/traps.ts`
(mirror of `interview-traps/shared/trace-schema.ts`); change both together.

- `TrapReplay` — state, controls (space / ← →), variant toggle, outcome
- `TrapTimeline` — swimlanes, wait bars, auto race-window band, click-to-seek
- `TrapCode` — source with active step + per-user "program counter" badges
- `TrapState` — DB/cache tables after each event, changed cells highlighted
