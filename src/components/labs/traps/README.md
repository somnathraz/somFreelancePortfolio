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

## Break the Backend (play mode)

`/labs/traps/play` is a game built on top of the traps. Unlike the replay, which plays back a
recorded trace, the game *simulates*: the player picks which request moves next.

- `src/lib/trap-game/engine.ts` — pure simulator (no React). A level is lanes of `Step`s over a small
  key/value DB. `cas`, `incr`, `pushUnique` and `fetchIncr` are single atomic statements; `lock`/`unlock`
  model row locks, and `scope: "server"` models an in-process mutex that only blocks the same server.
  `verify()` tries every interleaving, so a fix is judged exhaustively rather than on the player's order.
  `bestBreak()` computes "par": the break with the fewest switches between requests.
- `src/lib/trap-game/levels.ts` — the levels. A new level = bug handler, invariants, and fixes
  (include a decoy or two that look right but fail). `trap` links to the catalogue slug.
- `src/components/labs/traps/game/` — `BreakTheBackend` (state machine: break, then patch) and `Panels`.

Shared results are `?m=0101…` (who moved at each step). Sanity-check a new level by running `verify()` on
the bug (must break), each real fix (must hold) and each decoy (must break).
