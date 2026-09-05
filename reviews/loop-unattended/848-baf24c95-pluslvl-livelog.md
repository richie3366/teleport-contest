# Review 848 — baf24c95 — exper.c pluslvl/losexp level-change livelog (D-1878)

## Metadata

- SHA: `baf24c95` ("exper.c pluslvl/losexp level-change livelog (show_gamelog corpus owner) (D-1878).")
- D-id: D-1878. Queue row: Open (`show_gamelog` corpus owner), popped in order.
- Files: `js/exper.js` (+20/−6), docs + map + scoreboard.

## Intent vs deliverable

Subject promises: port the three C livelog arms (`pluslvl` minorac
fallback, `losexp` level-loss, `losexp` divine-reset) in C order. Diff
actually adds exactly those three `livelog_printf` calls plus three
imports (`LL_MINORAC`, `count_achievements`, `livelog_printf`) and
comment updates. Promise kept.

## Inventory

| JS change | Status |
|---|---|
| `pluslvl` minorac fallback | new port of C `exper.c:360–365` |
| `losexp` `lost experience level` | new port of C `exper.c:230–231` |
| `losexp` `lost all experience` | new port of C `exper.c:245–246` |

No deleted/re-pointed symbols, so the Required `sym.mjs` paste is
vacuous; the D-log's `--can` citation is confirmed below instead.

## C ↔ JS fidelity

C loci via `node scripts/csym.mjs pluslvl` (`exper.c:306–372`) and
`losexp` (`exper.c:206–291`):

- `pluslvl`: C order is SoundAchievement → `old_ach_cnt =
  count_achievements()` → rank check/record → `if
  (count_achievements() == old_ach_cnt) livelog_printf(LL_MINORAC,
  "%sgained experience level %d", (u.ulevel <= u.ulevelpeak) ? "re" :
  "", u.ulevel)` → peak update. JS replicates this order exactly
  (snapshot before rank, log with pre-update peak, peak update last),
  minus SoundAchievement (named: no SND_LIB). The `re`-prefix and peak
  comparisons use identical predicates. ✓
- `losexp` level-loss: C decrement → `adjabil(ulevel+1, ulevel)` →
  `livelog_printf(..., u.ulevel + 1)` → Sound. JS: decrement →
  `adjabil` → livelog with `(u.ulevel|0)+1`. ✓
- `losexp` reset path: C `u.uexp = 0` → `livelog_printf("lost all
  experience")`. JS identical order. ✓ The `drainer → done(DIED)`
  noreturn stays the pre-existing early `return` (named omit,
  untouched line); the fuzzer-savelife `if (u.ulevel > 1) return` has
  no JS counterpart, but that edge requires returning from noreturn
  `done()` — unreachable in JS, pre-existing, not this SHA's debt.

Callee closure: `livelog_printf` LIVE (`js/pline.js:23`, sync);
`count_achievements` LIVE (`js/insight.js:202`, sync);
`record_achievement`/`achieve_rank` already imported from `insight.js`;
`LL_MINORAC` const `0x1000` (`js/const.js:979`) matches C
`global.h:506` `0x1000L`. `--can exper.js pline.js livelog_printf` →
ALREADY (D-log's "SAFE, no new cycle" confirmed). No STUB, no clone.

## Hallucinations / overclaim

None. The D-log's Verify bullet honestly reports "moved past (1
re-attributed at the same step)" rather than PASS, and includes a
row-diff read (row 3 fixed, 19 rows deeper, new blocker is the row-22
wish livelog from `zap.c` — a different writer, correctly left for its
own Open row). That is the opposite of a vacuous check.

## Density

+20/−6 is below the ~40-insertion heuristic, but the C locus is three
one-line arms with no gluable sibling (the wish writer belongs to
`zap.c`, a different cluster — gluing it would violate the one-cluster
rule). C-locus-sized; acceptable.

## Verification

- Diff grep: no FORCE/DIAG/seed/coordinate content (livelog strings
  only). Rule #2 clean (same-edge imports).
- Re-measured myself: `node scripts/hidden-proxy.mjs verify
  show_gamelog --base baf24c95~1` → `0 PASS, 1 moved past
  (re-attributed at same step) → PROGRESS` (`...4ac145da: moved →
  do_statusline1 at step 821`). Byte-identical to the D-log claim —
  confirmed, not false.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
