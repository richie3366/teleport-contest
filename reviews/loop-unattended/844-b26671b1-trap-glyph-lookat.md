# Review 844 — b26671b1 — pager.c do_screen_description trap-glyph (D-1874)

Metadata: SHA `b26671b1`, D-1874, `js/pager.js` (+7/−1: one return
line + C-citation comment in `describe_looked`); map + queue/archive
stamps. No symbols deleted or re-pointed, no new imports.

## Intent vs deliverable

Subject promises the trap-glyph `a trap (lookat)` composition for the
proxy-`trapeffect_rolling_boulder_trap` corpus owner (C `^        a
trap (rolling boulder trap)` vs JS `^        a rolling boulder trap`
at step 347/372, RNG 50366/50366 matched). Diff delivers the one-line
fix. Matches.

## Inventory

Changed: `describe_looked` trap branch return only. `trap_description`,
`glyph_to_trap`, `an()` all pre-existing; no new functions, no new
callees.

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/pager.c` `do_screen_description`
(`:1246–1627` per `csym.mjs`), read at the cited ranges:

- First match (`:1217–1228`): `is_cmap_trap(idx) && idx !=
  S_vibrating_square` → `Sprintf(out_str, "%sa trap", prefix)`,
  `firstmatch = x_str`, `found = 1`. ✓
- Didlook supplement (`:1610–1616`): appends `" (<firstmatch>)"`,
  resets `found = 1`. ✓
- Composition for a trap glyph is therefore `<prefix>a trap
  (<trapname>)`; with a looked prefix (`^` + 8 spaces) that is exactly
  `` `^        a trap (${nm})` `` with `first: nm, found: 1` — the old
  line already carried `first`/`found`, only `out` was wrong
  (`an(nm)`). Branch-by-branch confirm. ✓

Callee closure: no new callees (nothing to classify). `first: nm`
feeding `checkfile` is pre-existing plumbing, unchanged.

Residual: `S_vibrating_square` takes the `an(x_str)` else-arm in C
(`:1219` guard) but JS now formats it as `a trap (...)` like every
other trap glyph. The commit names exactly this arm as deferred, and
the map row (`turns.md` farlook section) records it in this commit —
a named omit, not a Must-fix. Pre-existing JS was not C-right there
either (`an(trapname)` ≠ `an(defsym x_str)`), and the arm is
Gehennom-gated in C (`:1231–1234`), so no live path regresses.

## Hallucinations / overclaim

None. The attribution note (proxy owner is a literal-substring match;
C steps 344–346 `brief_at` firstmatches matched both sides) is
measured, same shape as D-1872, with the session PASS as receipt.

## Density

+7/−1 is below the usual ~40 floor, but C is genuinely that small
here: the ported envelope (first-match + parenthetical composition)
is one format string, and every sibling branch already implements the
same composition (D-log). No larger available envelope was split off.

## Verification

D-log Verify bullet is complete (syntax + rule2 + hidden PROGRESS +
green/strict + cohort 7/7; full skipped — true, `pager.js` is not
shared-startup). Re-ran myself:
`hidden-proxy.mjs verify trapeffect_rolling_boulder_trap --base
b26671b1~1` → `1 PASS, 0 moved past, 0 unchanged, 0 worse →
PROGRESS` (`b0096089: PASS`) — matches the D-log. No imports
touched; Rule #2 clean (re-ran `imports.mjs --rulecheck` this
iteration). No FORCE/DIAG/seed/coordinate hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
