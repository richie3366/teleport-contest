# Review 1712 — 4bd644114 — monstone unmap uses the memory glyph (D-2753)

Metadata: commit `4bd644114`, D-2753, closes review 1701 item 1 (the unmap predicate). `js/mhitm.js` `monstone` only. The row cited 0 corpus blocks. Item 2 (`mdamagem`) is the next SHA, not this one.

## Intent vs deliverable

Subject promises the unmap test is `glyph_is_invisible(levl[x][y].glyph)` via `memory_glyph_is_invisible`, and that the `glyph_is_invisible` import is dropped. The diff is that call, the import edit, and a comment that `mhitm.c:1050` is not wired here. No other arm of `monstone` changes (`stackobj` stays behind `if (otmp)`; only the indent moved).

## Inventory

Changed JS: the `if` at `js/mhitm.js:3306`. No new function. The call moves from `glyph_is_invisible` to `memory_glyph_is_invisible`. Both were already imported from `display.js`; the unused name is removed from the import list.

```text
memory_glyph_is_invisible js/display.js:1364   sync
glyph_is_invisible js/display.js:1373   sync
```

`node scripts/imports.mjs --can mhitm.js display.js memory_glyph_is_invisible glyph_is_invisible` is **ALREADY**. Both are sync. No remaining `glyph_is_invisible(` call in `mhitm.js`. Classification: **C callee** shape — the memory-id helper, not a local clone. `glyph_is_invisible` in JS is the wider loc helper (memory id or `disp_glyph` or `remembered_glyph.invisible`), which is what this commit stops calling.

## C ↔ JS fidelity

C `monstone` unmap is `mon.c:3356–3361` (`csym` body continues through the function; this site is the tail before `mondead`).

- `:3356` `stackobj(otmp)` with no null test. JS `:3303` `if (otmp) stackobj(otmp)`. That guard was already there (whitespace only in this diff). Not this predicate.
- `:3358` `if (glyph_is_invisible(levl[x][y].glyph)) unmap_object(x, y)`. The macro is `display.h:773` `(glyph) == GLYPH_INVISIBLE`. JS `:3306` calls `memory_glyph_is_invisible(loc)`. That helper (`display.js:1364–1366`) is `(remembered_glyph.glyph | 0) === GLYPH_INVISIBLE`. `map_invisible` (`display.js:1340–1341`) stores `invisible_glyph_cell()` there when `hero_memory` is set, and that cell's `glyph` field is `GLYPH_INVISIBLE` (`:1355`). `mondead` uses the same helper for `levl.glyph` (`mhitm.js:3757–3758`). It does not read `disp_glyph` and it does not read `remembered_glyph.invisible`. That is the narrowing review 1701 asked for. The old helper (`display.js:1373–1377`) was true for any of those three.
- `:3360` `if (cansee(x, y)) newsym(x, y)`. JS `:3308–3309`, after the unmap, unchanged.
- No `x > 0` in C at this site. JS still has none. `mondead`'s `mx > 0` is a different function.
- No RNG on the arm.

Callers (`csym --callers`, 9 refs): `eat.c:646`, `mhitm.c:237`, `mhitm.c:786`, `mhitm.c:1050`, `mon.c:1439`, `mon.c:3547`, `trap.c:3879`, `uhitm.c:3963`, plus `extern.h:1797`. The header comment now lists the seven wired JS sites and says `mhitm.c:1050` is `mdamagem`, not `do_stone_mon`. This diff does not add that call. The D-log says it stays the next Must-fix. That is the open item, not a silent stub inside this arm.

## Hallucinations / overclaim

"The same predicate `mondead` uses" matches `mhitm.js:3758`. "Replaces the wider loc helper" matches `display.js:1373`. The subject does not say every caller is wired. No FORCE, DIAG, `getRngLog`, seed, coordinate, or `fastforward` in the hunk. Rule #2 clean.

## Density

One predicate. The unwired `mdamagem` head is named in the same commit and shipped as the next iteration, not folded into a "body complete" sentence.

## Verification

Re-measured on the working tree (`--base 4bd644114~1 --reach-all`). That tree also contains the following `mdamagem` commit. Parent scoreboard blob is stamped `c5539a510`. Row cited 0 blocks.

```text
verify monstone: baseline 4bd644114~1 (scoreboard at c5539a510, 2026-09-23T09:55:00.653Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify monstone: no corpus session is blocked on it at 4bd644114~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
smoke monstone: no RNG-tagged reach; fixed smoke spread (24 run, 3.0s): 24 PASS, 0 regressed → REACH-OK
```

0 REGRESSED. No RNG-tagged session executes `monstone`, so this is the smoke line. The 0-block note matches the row. The unmap arm is not what those 24 run. Green/strict/cohort are the D-log's `verify.mjs` bullet.

## Actionable C-wrongs

None in this predicate. `mhitm.c:1050` is the next SHA.

Verdict: **ACCEPT**
