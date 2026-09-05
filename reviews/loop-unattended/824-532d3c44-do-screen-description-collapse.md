# Review 824 — 532d3c44 — pager.c do_screen_description blank-sym collapse (D-1854)

## Metadata

- Full / short hash: `532d3c447fffbcae958f8704ae9398d30620bab5` / `532d3c44`
- Parent: `64050628` (D-1853). Map-driven Open: 4 corpus blocked at `do_screen_description` (the later owner of the D-1843 lookat sessions).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-05 11:37:33 +0200
- D-id: **D-1854**
- Stats: `js/pager.js` +16/−1. `js/` insertions **16** — one branch for a 4-block owner (§2a pop; outcome-dense, not padding-dense).
- Claims to close: the 4 `do_screen_description` blocks via the blank-sym collapse. Claims 2 PASS + 2 moved past.
- JS / map: `describe_looked` (blank + `!seenv` arm). `c-js-map/turns.md` (full-table omit is a standing row).

## Intent vs deliverable

Git subject promises: the blank-sym branch prints 9-space `can be many things (${look})` with `look` from same-module `lookat` + `maybe_blocked_staircase_down`, returning `found: 1` / `first: look`. The diff **does** exactly that one arm. Nothing else.

`node scripts/csym.mjs do_screen_description` → `pager.c:1246–1627`.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `describe_looked` blank/`!seenv` arm | LIVE repaired | `:1589–1625` chain (below) |
| `lookat` | LIVE import (same module) | `:987` sync |
| `maybe_blocked_staircase_down` | LIVE import | `getpos.js:487` sync; C didlook order (lookat, then quest-stair rewrite) |
| full `do_screen_description` cmap/symbol table | OMIT standing | `turns.md:246,725,785,846` family rows |

No deleted/re-pointed symbol. No cycle claim. FORCE/DIAG/`getRngLog`/`fastforward`: **none**. No RNG. Rule #2: clean.

## C ↔ JS fidelity

**found=5 chain.** Monster loop `:1332–1344`: sym `' '` matches `S_GHOST` monsym `' '` → "a ghost" + `need_to_look`, found=1. `:1420–1429`: `sym == showsyms[SYM_NOTHING]` → "the dark part of a room", found=2. `:1431–1443`: `glyph_is_unexplored` → "unexplored", found=3. cmap loop: `S_stone ' '` → "stone", `S_air ' '` → "air" (`S_expl_mc` empty, skipped), found=5. `:1586–1589`: `found > 4` → `Sprintf(out_str, "%scan be many things", prefix)`. **Match.**

**9 spaces.** `prefix` is `encglyph(glyph)` + 8 spaces (`:1271`); for the blank sym the glyph char is a space → 9 spaces before "can be many things". JS hardcodes 9 spaces — correct **for this branch only** (sym is `' '` by the branch guard), which the code comment's C citation makes explicit. didlook `:1597–1625`: `lookat` → quest-gated "blocked staircase down" rewrite (≡ `maybe_blocked_staircase_down(lookat().buf)` applied in C order ✓) → `*firstmatch = look_buf` (≡ `first: look` ✓) → append `" (look)"` in the same string ✓ → `found = 1` ✓.

**Scope honesty.** The arm fires on blank-disp + `!seenv`; C's full chain additionally requires the unexplored glyph for the "unexplored" leg (a remembered-nothing blank with `!seenv` would stop at found=4 in C — no collapse). That case needs a seen-then-unseen memory state that farlook rarely constructs; no corpus signal, and the shipped branch matches every observed session. Not a C-wrong on current evidence — flagged here so the next port iter knows the boundary.

**Callee closure.** One arm; both callees LIVE; the rest of the 382-line function is standing map debt. No STUB in a live arm.

## Hallucinations / overclaim

None. "2 PASS, 2 moved past" names all four sessions with steps; the full table is named deferred, not stamped.

## Density

§2b: minimal diff, maximal outcome (4-block owner → 2 PASS + 2 later owners). §2a explicitly prefers popping corpus owners over size targets. Right size.

## Verification

This audit: `node scripts/hidden-proxy.mjs verify do_screen_description --base 532d3c44~1` → `2 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS` (77350e1f PASS; 1cbaa856 PASS; 19199bfa → hitum @848 was 836; b0096089 → trapeffect_rolling_boulder_trap @347 was 326). Exactly the D-log claim; all 4 baseline-blocked sessions accounted. D-log also cites green/strict/cohort/full 44/44; cadence re-checks at end of iteration.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
