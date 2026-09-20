# Review 1580 — e1a1ff90 — invent.c loot_xname whole-body port (D-2621)

**Metadata:** SHA `e1a1ff90`, `invent.c` `loot_xname`, D-2621.
JS: `js/invent.js` only (+71/−3: body + `POT_WATER` import word).

## Intent vs deliverable

Subject promises: the whole `loot_xname` sort-key body (was a 3-line
stub returning `cxname_singular(obj) || ''`; every C arm absent). Diff
actually adds the full 80-line C body in C order plus the import join.
Promise matches deliverable.

## Inventory

- `loot_xname(obj)` — rewritten body (was a stub).
- `POT_WATER` joined to the existing objects.js import (ALREADY edge).
- No deleted symbol, no local→import re-point (nothing to `sym.mjs`
  beyond the liveness checks below).

## C ↔ JS fidelity

C locus `invent.c:308–387` (80 L, via `csym.mjs loot_xname`; callers
`:490`/`:496` inside `sortloot_cmp`). Full C body read here.
Branch-by-branch confirm:

- Save odiluted/blessed/cursed/spe/owt + oname + `flags.debug`
  (`:320–325`) — exact (`save_oname` null ≡ C `0`; both falsy).
- Potion dilute + water holy/unholy suppress (`:328–332`) — exact.
- Towel spe=0 (`:335–336`), glob owt=20 (`:339–340`), oname suppress
  except artifacts (`:342–343`, via `oextra.oname=null` per the
  do_name.js idiom) — exact.
- Wizard gate (`:345–350`): C `if (wizard)` ≡ JS `if (save_debug)`
  since `save_debug = flags.debug`; `something_worth_saving=0` + debug
  off — exact.
- `cxname_singular` (`:352`), debug restore (`:354–357`), potion
  restore (`:359–363`) — exact.
- Towel spe-restore-then wet-x/moist-y/dry-z via the RESTORED spe
  (`:364–370`, C order kept: restore before `is_wet_towel`) — exact.
- Glob owt-restore-then size a/b/c/d on thresholds 100/300/500
  (`:371–382`) — exact.
- oname restore (`:383–384`), return (`:386`) — exact.
- C `Strcat` into the cxname buffer → `+=` is correct (JS strings are
  values). The `if (!obj) return ''` guard has no C counterpart (C
  would deref) — defensive, unreachable from the wired callers.

RNG: none in C, none in JS. Caller wiring: C `:490`/`:496` sit in
`sortloot_cmp`; at this SHA JS `sortloot` (`:2333–2334`) calls
`loot_xname` under `SORTLOOT_LOOT` with the `!sli.str` cache —
pre-existing (not added by this diff), matching C's "format at most
once" + strcmpi shape; D-2626 moves these calls into the ported
comparator (confirmed in that SHA's review — follow-through closed).

Callee closure (`sym.mjs`): `has_oname js/const.js:3164`,
`cxname_singular js/objnam.js:1332`, `is_wet_towel js/weapon.js:1673`,
`POT_WATER js/generated/objects_data.js:20` — all LIVE. `sortloot_cmp`
body OMIT, named in-commit as its own queued Open row (shipped next
as D-2626). No stub, no silent omit.

## Hallucinations / overclaim

None. The `| 0` coercions on save/restore are value-shape neutral
(predicates read truthiness downstream).

## Density

71-line single-function coverage row, one module. Right-sized (below
the ~40-insertion density floor only if C were bigger — C is 80 L).

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`/RNG/seed/
  coordinate reads in added lines.
- Re-measured: `hidden-proxy.mjs verify loot_xname --base e1a1ff90~1
  --reach-all` → `0 session(s) blocked` at baseline and working tree
  (vacuous-note path, honestly labeled) + `smoke 24/24 PASS, 0
  regressed → REACH-OK`. Both summary lines cited; green/strict/
  cohort per D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
