# Review 2930 — 16177d3a6 — is_innate/innately read uprops[].intrinsic for every prop

- SHA: `16177d3a6` (cliff, writer behind `chwepon`/`one_characteristic`)
- D-entry: D-4089; Ledger: attrib.c (`is_innate`, D-4089)
- `js/` diff: `js/attrib.js` +42 −7

## Intent vs deliverable

Promise: JS `is_innate` returned FROM_NONE for any prop missing from
`PROP_HFIELD` and read only the flat H-field. Wizard-mode `from_what`
therefore lost « from your creature form» / « intrinsically» on flying,
swimming, telepathy and fumbling. Subject: «13 sessions → FULL PASS».
Diff: `innately(propidx, field)` ORs the flat (when mapped) with
`u.uprops[propidx].intrinsic`. The role/race tables are consulted only
when a field exists. The early bail is gone, and 27 prop→flat pairs are
added. Promise = diff, except the count (below).

## Inventory

- `PROP_HFIELD` additions — attrib.js:1246–1275.
- `innately` — attrib.js:1308–1321; C attrib.c:863-877.
- `is_innate` — attrib.js:1329–1345; C attrib.c:879-900.
- `check_innate_abil` (unchanged) — attrib.js:1283; C :817-851.

## C ↔ JS fidelity

```c
if (propidx == DRAIN_RES && ismnum(u.ulycn)) return FROM_LYCN;
if (propidx == FAST && Very_fast) return FROM_NONE;
if ((innateness = innately(&u.uprops[propidx].intrinsic)) != FROM_NONE) return innateness;
if (propidx == JUMPING && Role_if(PM_KNIGHT) && !u.uprops[propidx].extrinsic) return FROM_ROLE;
if ((propidx == BLINDED && !haseyes(...)) || (propidx == BLND_RES && (HBlnd_resist & FROMFORM))) return FROM_FORM;
```

C `innately` checks EXPER, then RACE (pointer-identity lookup in the
role/race tables), then FROMOUTSIDE, then FROMFORM, on one `long`. JS
keeps that order. Its `ability` is now the union of the two JS stores,
which equals C's intrinsic whenever either writer set the bit. The
table lookup still matches by field name. I checked that every `prop:`
in the role/race tables (12 distinct) appears in `PROP_HFIELD` (47), so
skipping the tables when the field is missing loses no row that C would
find. The removed `if (!field) return FROM_NONE` was the real C-wrong:
C has no such bail. The FAST/DRAIN_RES/JUMPING/BLINDED tails are
unchanged. No RNG.

## Hallucinations / overclaim

**Count overclaim.** The subject and D-log say «13 sessions → FULL PASS
… 13 → FULL PASS, 9 unchanged» over 22 rows. The board committed with
this SHA flips **11** rows: 9 chwepon (impaired-Samurai-50951010,
sweep-Monk-50055080, sweep-Ranger-50055084, zapfest-Priest-50450076,
sweep-Caveman-610097, sweep-Samurai-50362000, sweep-Tourist-95315,
zapfest-Caveman-50950044, zapfest-Rogue-50350028) and 2
one_characteristic (worldtour-Samurai-50358004,
worldtour-Priest-51050040). The next D-entry (D-4090) starts from «the
11 remaining rows», so 22 − 11 = 11 PASS. The Named line's own tally (5
+ 2 + 2–3 + 1) is also 10–11, not 9. No session the D-log names as PASS
fails. This is an arithmetic overclaim, not a false PASS, so there is
no Must-fix.

## Density

One C pair (innately/is_innate) plus its data table. One Ledger bullet.

## Verification

```text
verify chwepon (--base 16177d3a6~1): 9 PASS, 0 moved past, 0 unchanged, 0 worse
verify one_characteristic: 13 blocked → 12 PASS (HEAD code incl. D-4090..92), 1 unchanged (worldtour-Wizard-610136)
```

The per-commit board split is 11. No FORCE/DIAG/seed strings.

## Actionable C-wrongs

None in code. Record the corrected count (11) wherever D-4089's 13 is
quoted.

Verdict: **ACCEPT-WITH-DEBT**
