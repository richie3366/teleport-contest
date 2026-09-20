# Review 1585 — ebc7b1ce — invent.c sortloot_cmp whole-body port (D-2626)

**Metadata:** SHA `ebc7b1ce`, `invent.c` `sortloot_cmp`, D-2626.
JS: `js/invent.js` only (+151/−52: new comparator replaces the inline
closure).

## Intent vs deliverable

Subject promises: exported `sortloot_cmp` in C order, replacing the
inline closure that stopped after the loot-name compare (`BUCX / grease
/ erosion deferred`). Diff delivers the full comparator (INUSE / class /
invlet / name / BUCX / grease / erosion / erodeproof / enchant /
tiebreak) + `sortlootmode` set/reset + `greatest_erosion` mirror.
Promise matches deliverable.

## Inventory

- `sortloot_cmp(sli1, sli2)` (new export) — C `:403–547`.
- Module `sortlootmode` (= C `gs.sortlootmode`, `decl.h:873`).
- File-local `greatest_erosion` mirror of the C `obj.h:126` macro.
- Inline closure deleted (replaced by
  `items.sort((a,b) => sortloot_cmp(a,b))`).
- No import changes, no local→import re-point.

## C ↔ JS fidelity

C locus `invent.c:402–547` (146 L, via `csym.mjs sortloot_cmp`).
Full C body read here. Arm-by-arm confirm:

- INUSE classify-once + bigger-first + direct tiebreak return (≡ C
  `goto tiebreak :543–546`) — exact.
- PACK|INVLET class gate, classify-once, orderclass/subclass/disco
  ascending with the sortpack+invlet subclass skip (`:430–468`) —
  exact.
- Invlet letter (`:471–476`); LOOT==0 → tiebreak (`:478–479`) — exact.
- Format-once name cache + case-fold compare (`:481–499`):
  `toLowerCase` + code-unit order ≡ `strcmpi` on ASCII loot names —
  exact (carried over from the old closure, unchanged semantics).
- BUCX 3/2/1/0 bigger-first with the exact nested expression
  (`:501–504`) — exact.
- Grease desc (`:506–510`), `greatest_erosion` ascending with
  bigger-is-WORSE (`:512–516`) — exact.
- Erodeproof known-vulnerable→0 desc (`:517–523`) — exact.
- Enchant unknown→-1000 desc under `oc_uses_known && !=FOOD_CLASS`,
  obj1-gated per C (`:525–539`) — exact.
- indx tiebreak (`:544–546`) — exact (Array sort is stable in
  Node 22 / Chrome, and the explicit tiebreak beats C's qsort
  determinism anyway).
- `sortlootmode = mode … sort … = 0` matches C `:634–636` (sync sort,
  no re-entrancy hazard); post-sort str free is GC (`:638–640`).

RNG: none in C, none in JS. This commit moves the `loot_xname` calls
from the old inline closure into the comparator — the D-2621 wiring
note is now closed: C `:490`/`:496` live in `sortloot_cmp`.

Callee closure (`sym.mjs`): `inuse_classify` pre-existing file-local
(invent.js:1996), `loot_classify js/invent.js:2143` (D-2616, same-file
call), `invletter_value` pre-existing file-local, `loot_xname` LIVE
(D-2621). `greatest_erosion`: NO canonical export exists — 4
pre-existing file-local twins (dig/lock/u_init/weapon) — so the new
mirror follows the established pattern instead of adding a cycle edge:
verified CLONE, macro-exact (`max(oeroded, oeroded2)` per `obj.h:126`).
`dupstr`/`maybereleaseobuf` OMIT with the string-identity rationale,
named in-commit; `unsortloot` OMIT (separate fn, own row if emitted).

## Hallucinations / overclaim

None. The "`#if 0` 3.6.0 revamp direct caller is dead" note is
accurate (`:657–671` never wired).

## Density

146-line C comparator, one module. Right-sized.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`/RNG/seed/
  coordinate reads in added lines.
- Re-measured: `hidden-proxy.mjs verify sortloot_cmp --base
  ebc7b1ce~1 --reach-all` → `0 session(s) blocked` at baseline and
  working tree (vacuous-note path, honestly labeled) + `smoke 24/24
  PASS, 0 regressed → REACH-OK`. Both summary lines cited (D-log
  claims the same under --reach-all too); green/strict/cohort per D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
