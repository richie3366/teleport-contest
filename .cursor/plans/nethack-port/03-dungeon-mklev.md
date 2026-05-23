# Satellite plan: Dungeon generation (`mklev`) and special levels

Parent: global plan **NetHack JS port roadmap** (Workstream D).

## Status (as of 2026-05-23)

- **Partial:** Large [`js/mklev.js`](../../js/mklev.js) — includes vault **`rnd_rect` + `create_vault`** loop, **`mineralize`** early-return + mines/quest scaling, many fill paths.
- **Not done:** `dig_corridor` / `mfndpos` geometry vs recorder on some steps; **`setgemprobs`** / erosion tails; legacy **`otyp`** literals vs NH5 until `mkobj` parity; Lua **`sp_lev`** / full branch graph.

---

## Goals

- Bit-exact **geometry and RNG** for all dungeon levels and branches exercised by judge sessions.
- Lua special levels consume the **Lua RNG context** in the same order as the patched C recorder.

## Current repo anchor

- Large partial port: [js/mklev.js](../../js/mklev.js) (see file header for C file mapping) — **mineralize / room fill consume RNG here**, not via a separate `fastforward_fill_mineralize` export.
- [js/allmain.js](../../js/allmain.js) wires `mklev()` then post-mklev **`u_init`** pipeline (see [02-init-chargen.md](./02-init-chargen.md)).

## Upstream C inventory (incremental diff)

Use `nethack-c/upstream/src/` — check off as you prove parity per subsystem:

- [ ] `mklev.c` — rooms, corridors, doors, stairs, subrooms, niches
- [ ] `mkmaze.c` — maze levels, walk paths
- [ ] `sp_lev.c` — special level compiler / room templates
- [ ] `dungeon.c` — `dungeon.def` graph, branch placement
- [ ] `mkmap.c` — filler / lithified state where applicable
- [ ] Lua under `dat/` — level scripts; RNG tagging per patches 004–005

## Checklist

### Structural parity

- [ ] For each public session, note **deepest dungeon branch** visited; ensure branch creation order matches `dungeon.c`.
- [ ] Mines branch: entrance on correct dlvl; RNG for stairs placement.
- [ ] Quest / Sokoban / other branches: defer until sessions require; track in session-specific notes under [09-qa-sessions.md](./09-qa-sessions.md).

### Mineralize / fill (was `fastforward_fill_mineralize`)

- [x] **Mostly in `mklev.js` now** — mineralize + fill draw in makelevel; keep porting remaining C gaps (`setgemprobs`, legacy otyp, …).
- [ ] Replace any **leftover** replay (if found elsewhere) with real C calls; goal is zero session-shaped fill clusters.

### Lua

- [ ] Decide JS strategy: embed Lua VM vs transpile level scripts — must match **call order** and numeric results.
- [ ] Wire **Lua-context** RNG (separate from core if upstream does); see [01-harness-rng-time.md](./01-harness-rng-time.md).

### Stairs and vertical moves

- [ ] Up/down/special stairs: level load order, `u.uz` updates, `newsym` invalidation — cross-link [07-display-terminal.md](./07-display-terminal.md).

## Exit criteria

- No mineralize/room-fill replay left in **`fastforward.js`** for covered sessions *(true — **`fastforward.js`** is a stub)*; remaining fill gaps are **C parity inside `mklev.js`**.
- `mklev.js` sections documented with “ported / partial / missing” vs C line ranges.
