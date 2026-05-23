# Satellite plan: Moveloop, monsters, and #search (C map)

Parent: NetHack JS port roadmap — **structure tracks the C tree**, not session JSON.

## Status (as of 2026-05-23)

- **Startup:** [`js/fastforward.js`](../../js/fastforward.js) is a **stub** — per-turn debt is **[`js/monmove.js`](../../js/monmove.js)** + **[`js/moveloop_aux.js`](../../js/moveloop_aux.js)** from [`js/allmain.js`](../../js/allmain.js) `moveloop_core`.
- **Canary:** `seed8000` **movemon** path combines real C slices with **`stepNum`** gates — peel when **`dochug`** / `fmon` order explains draws without session geometry.

---

## Principle

- **Sessions** (`sessions/*.session.json`) are regression *signals*: they show what the judge compares, not the source of truth for logic.
- **Upstream** (`nethack-c/upstream/src/`) defines order, RNG consumption, and messages.
- **Debt:** Per-turn harness in **`monmove.js`** / **`moveloop_aux.js`** until JS owns the same post-hero call graph as C. Startup replay table in **`fastforward.js`** is **retired** (remainder in **`u_init_post_mklev.js`**).

## Target C files → JS modules

| C (typical) | Role | JS direction |
|-------------|------|----------------|
| `allmain.c` | `moveloop`, `moveloop_core`, move clock, `maybe_generate_rnd_mon`, end-of-turn ordering | [js/allmain.js](../../js/allmain.js) calls [js/monmove.js](../../js/monmove.js) + [js/moveloop_aux.js](../../js/moveloop_aux.js) from `moveloop_core` (harness until ported). Startup RNG is **not** in [js/fastforward.js](../../js/fastforward.js) (stub); post-mklev hero init continues in **`u_init_post_mklev.js`**. |
| `monmove.c` | `movemon`, `m_move`, fleeing / distfleeck | [js/monmove.js](../../js/monmove.js) — **mixed**: real `distfleeck`/`m_move` slices + harness **`stepNum`** until full `dochug` parity. |
| `mon.c` | `mcalcmove`, monster AI state | Same area as monmove or `js/mon.js` if you split data vs movement. |
| `sounds.c` | `dosounds` | Port when dungeon state and turn hooks exist. |
| `eat.c` | `gethungry` | Port with `u` hunger fields and move consumption. |
| `detect.c` | `dosearch`, `dosearch0`, trap/SDOOR discovery, `rnl` | [js/search.js](../../js/search.js) — grow `dosearch0` here; **no** session-specific `rn2` sequences. |
| `cmd.c` | `rhack` dispatch | [js/cmd.js](../../js/cmd.js) — keep thin; delegate to `hack.c`-style helpers as in C. |

## Order inside `moveloop_core` (sketch)

Follow `allmain.c:moveloop_core` (your NetHack version) left-to-right:

1. End-of-turn / world updates that run **before** the next player input (vision, timed events, **movemon**, sounds, hunger, random monsters, etc.).
2. Display refresh (`botl`, `flush_screen` analogues).
3. Read command (`rhack` / `parse` pipeline).
4. Execute command (may or may not consume a turn).

The harness currently runs `movemon` + `end_of_turn_rng` **before** `nhgetch` so it approximates “tail after previous command.” When `movemon` et al. exist, fold their RNG into that phase explicitly and **remove** the matching harness rows.

## `#search` specifically

- C path: `cmd.c` → `dosearch()` → `dosearch0()` in `detect.c`.
- JS path: [js/cmd.js](../../js/cmd.js) → [js/search.js](../../js/search.js) `dosearch` / `dosearch0`.
- Add `rnl` to [js/rng.js](../../js/rng.js) when `detect.c` needs it; log format must match the judge.

## Checklist

- [x] Add `rnl` to [js/rng.js](../../js/rng.js) (matches `rnd.c`; first draw unlogged, inner `rn2` + final `rnl` logged).
- [x] Split per-turn harness: [js/monmove.js](../../js/monmove.js) (`movemon`, session replay) + [js/moveloop_aux.js](../../js/moveloop_aux.js) (`maybe_generate_rnd_mon`, `dosounds`, `gethungry`, exercise hooks, `moveloop_core_rng82`).
- [ ] Replace `monmove.js` harness with real `movemon` / `m_move` / `distfleeck` and delete matching `_HARNESS` rows.
- [ ] Wire `dosounds` / `gethungry` / `maybe_generate_rnd_mon` in the same order as `allmain.c`.
- [x] Partial: [js/search.js](../../js/search.js) `dosearch0` — neighbor loop, SDOOR/SCORR `rnl`, trap `rnl(8)` + `find_trap`; **`mfind0`** structure (mimic / mundetected / `cansee`); **`feel_location`** minimal (`setSeenvTowardHero` + `mapTerrainGlyph` + `show_glyph_cell`). fund, full `sensemon`, `warning_of`, levitation branch, statue animate still TODO.
- [ ] Re-run `node frozen/ps_test_runner.mjs …` after each deletion of harness code; expect temporary RNG drift until the stack is complete.

## Display / harness note

The judge captures the terminal **before** each `nhgetch` ([`js/jsmain.js`](../../js/jsmain.js) hook), after `moveloop_core`’s opening `flush_screen`. Sessions also include **one final screen** after the last replayed key (no following `nhgetch`); `runSegment` calls `flush_screen` + `captureJudgeSnapshot({ bumpNhgetchCounter: false })` so `getScreens().length` matches `steps.length`. Clearing `game._pending_message` at the end of `moveloop_core` ([`js/allmain.js`](../../js/allmain.js)) means the **last `pline` is not in that serialized frame** unless we change ordering (e.g. flush after `rhack` and adjust the hook contract) or persist the message into the grid without clearing. Do not “fix” pline visibility by only clearing later without re-checking session diffs — a naive persist regressed public `seed8000` screens in testing.
