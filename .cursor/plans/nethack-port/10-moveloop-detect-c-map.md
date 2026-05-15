# Satellite plan: Moveloop, monsters, and #search (C map)

Parent: NetHack JS port roadmap — **structure tracks the C tree**, not session JSON.

## Principle

- **Sessions** (`sessions/*.session.json`) are regression *signals*: they show what the judge compares, not the source of truth for logic.
- **Upstream** (`nethack-c/src/` or your pinned tree) defines order, RNG consumption, and messages.
- **Debt:** [js/fastforward.js](../../js/fastforward.js) `fastforward_step` replays end-of-turn leaf RNG until JS owns the same call graph as C. Delete those closures as ports land.

## Target C files → JS modules

| C (typical) | Role | JS direction |
|-------------|------|----------------|
| `allmain.c` | `moveloop`, `moveloop_core`, move clock, `maybe_generate_rnd_mon`, end-of-turn ordering | Extend [js/allmain.js](../../js/allmain.js); drive RNG from here instead of `fastforward_step`. |
| `monmove.c` | `movemon`, `m_move`, fleeing / distfleeck | New `js/monmove.js` (or split), called from `moveloop_core` after hero command when time advances. |
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

The harness currently runs `fastforward_step` **before** `nhgetch` so it approximates “tail after previous command.” When `movemon` et al. exist, fold their RNG into that phase explicitly and **remove** the matching harness rows.

## `#search` specifically

- C path: `cmd.c` → `dosearch()` → `dosearch0()` in `detect.c`.
- JS path: [js/cmd.js](../../js/cmd.js) → [js/search.js](../../js/search.js) `dosearch` / `dosearch0`.
- Add `rnl` to [js/rng.js](../../js/rng.js) when `detect.c` needs it; log format must match the judge.

## Checklist

- [x] Add `rnl` to [js/rng.js](../../js/rng.js) (matches `rnd.c`; first draw unlogged, inner `rn2` + final `rnl` logged).
- [ ] Implement `movemon` (or minimal subset for tourist start) and delete the first `fastforward_step` slice it replaces.
- [ ] Wire `dosounds` / `gethungry` / `maybe_generate_rnd_mon` in the same order as `allmain.c`.
- [x] Partial: [js/search.js](../../js/search.js) `dosearch0` — neighbor loop, SDOOR/SCORR `rnl`, trap `rnl(8)` + `find_trap`; **`mfind0`** structure (mimic / mundetected / `cansee`); **`feel_location`** minimal (`setSeenvTowardHero` + `mapTerrainGlyph` + `show_glyph_cell`). fund, full `sensemon`, `warning_of`, levitation branch, statue animate still TODO.
- [ ] Re-run `node frozen/ps_test_runner.mjs …` after each deletion of harness code; expect temporary RNG drift until the stack is complete.
