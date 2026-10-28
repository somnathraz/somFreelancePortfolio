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

## Topic library

`src/lib/trap-catalogue.ts` defines the topic order and upcoming trap roadmap. Match
an entry's slug to its trace filename to publish it automatically; titles and
questions then come from the trace. Entries without traces display “Coming soon”
and have no replay links. Unlisted traces appear under “More traps” until assigned
to a topic. The trace schema does not need to change.

`TrapCatalogue` renders the searchable index and availability filter.
`TrapLibraryNav` shares topic navigation between the index and replay pages, with
an independently scrolling desktop sidebar and a collapsible mobile menu.
