# Review 2678 — ba9e6fe06 — monmove sticks wrong twin → canonical import

Metadata: SHA `ba9e6fe06`, D-3814, cliff row-3 `mhitm.c`
mhitm_ad_wrap writer (@2ace14705). JS: `js/monmove.js` (import +
twin→re-export) + `js/engrave.js` (doc). Test:
`scripts/sticks-hugs-const.test.mjs` (6 its).

## Intent vs deliverable

Promise: monmove-local sticks tested AT_HUGS as 6 / AT_ENGL as 7,
so hug-form hero read non-sticky; D-1849 pattern — import the
canonical engrave export, delete the twin, `export { sticks };`
keeps zap.js wired. Claimed: 95310 → PASS. Diff actually does:
one import name added, 15-line twin → re-export, doc refresh.
Match.

## Inventory

- `sticks` in monmove.js — deleted twin, now `export { sticks };`
  re-exporting engrave.js:571. C `mondata.c:653–659` (csym range).
- `sticks` in engrave.js — untouched canonical export (doc only).
- No new helpers. Deleted symbol `sticks` (monmove-local def).

`sym.mjs sticks` (required — diff deletes/re-points it):

```text
sticks           js/engrave.js:571   sync
             !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
               js/mhitu.js:1100  js/uhitm.js:3749
```

Monmove twin gone; two remaining twins verified correct below.
`imports.mjs --can js/monmove.js js/engrave.js sticks` →
`ALREADY: monmove.js already statically imports engrave.js. No new
edge needed.` — the added name rides the pre-existing
wipe_engr_at edge; no cycle question.

## C ↔ JS fidelity

C `mondata.c:653–659` (csym): `dmgtype(ptr, AD_STCK) ||
(dmgtype(ptr, AD_WRAP) && !attacktype(ptr, AT_ENGL)) ||
attacktype(ptr, AT_HUGS)`. C `monattk.h:19/21`: AT_HUGS=7,
AT_ENGL=11 — the deleted twin's 6/7 matched AT_STNG/AT_HUGS,
wrong as claimed. Canonical engrave sticks: identical
disjunction via live `attacktype` (mondata.js import) with
C-exact file consts (AT_HUGS=7, AT_ENGL=11, AD_STCK=19,
AD_WRAP=28 — read at engrave.js:556–559). Surviving twins:
uhitm.js:3749 full `hasStck || (hasWrap && !hasEngl) || hasHugs`
with imported named consts; mhitu.js:1100 C-identical shape via
live dmgtype/attacktype — both correct, honestly kept per the
no-rewiring-without-a-block rule. zap.js:302 still imports from
monmove.js — binding now engrave's, zero changes there, verified.
No RNG; none added. Gap: none. Disjunct-by-disjunct confirm.

## Hallucinations / overclaim

None. Firing chain measured: step-204 grab both sides, step-205
brush + distfleeck in C stepFns → monflee → release_hero; C
silent ⟹ C sticks true, JS printed ⟹ JS sticks false — the const
swap explains it exactly.

## Density

Cliff-phase: writer correct (monmove sticks, not the mhitm
owner). Row-3: acceptable — row-1 void-barred, row-2 shipped as
D-3813 in the parent commit. Ledger: sticks arm. Verify bullet:
1 PASS + reach 28/28 REACH-OK + green + strict + cohort + auto
full 44/44. Named: none new. Not unreached: probe PASSES.

## Verification

js-hunk grep: 0 hits (clean). Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify mhitm_ad_wrap --base ba9e6fe06~1
--reach-all` → `1 PASS, 0 moved past, 0 unchanged, 0 worse →
PROGRESS` (95310 PASS) and `reach 28/28 → REACH-OK` — exactly
the D-log claim, zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
