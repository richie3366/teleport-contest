# Review 2566 — a7604ebb0 — dog_invent AT_WEAP wield tail (D-3695)

- SHA: `a7604ebb039b3375be6a495a2ecb5cee2d4c2d0a`
- Subject: `dogmove.c` dog_invent `:466–471`: wire the AT_WEAP mon_wield_item + check_gear_next_turn pickup tail (mon_wield_item's 10th C caller; probe still parked D-3694) (D-3695)
- D-entry: D-3695. Type: head-family caller wiring (operator-ordered js/ on the park-maxed head; no probe movement claimed).
- Diff size: `js/dogmove.js` +17/-4 (4 import names on 4 pre-existing edges + 13-line tail; 1 omit comment deleted); ledger omit cleared.

## Intent vs deliverable

Promise: the cliffs probe (Priest-94382 step 99) is park-maxed
(5 C-side measures prove the G-frame is captured post-recalc —
no game writer exists), so instead of a 6th measure or a
re-port of the proven-whole symptom owner, wire the one
genuinely missing piece of the head's family: C dogmove.c:469,
the 10th `mon_wield_item` call site, omitted in JS as "no
AT_WEAP pet" — C-wrong, since C's own guard contemplates an
AT_WEAP pet (poly/charm keeps tameness with AT_WEAP data).
Probe stays parked; VERIFY: FAIL on the movement gate only.

Diff actually does: exactly that — the tail in C order
(guard → NEED_HTH set → awaited call → unconditional gear
check) at the C-adjacent position after `mpickobj`, four names
added to four pre-existing import edges, the omit comment
replaced by the code + C cite. No probe claim, no rescore
claim, no second patch.

## Inventory

| JS site | Change | C locus |
|---|---|---|
| `js/dogmove.js:1045–1057` dog_invent pickup tail | guard + set + `await mon_wield_item` + `check_gear_next_turn` | `dogmove.c:466–471` |
| `:1052` | block-local `const AT_WEAP = 254` | `monattk.h:28` |
| `:42/:58/:59/:63` | `NEED_WEAPON`, `NEED_HTH_WEAPON`, `mon_wield_item`, `check_gear_next_turn`, `attacktype` added to pre-existing edges | `monst.h:30/:32`, `weapon.c`, `mon.c:5913–5918`, `mondata.c:54–57` |

Name resolution (`sym.mjs`; diff deletes/re-points no symbol
— one comment removed, names added to existing edges):

```text
attacktype           js/mondata.js:81    sync
mon_wield_item       js/weapon.js:807    ASYNC — await required
check_gear_next_turn js/worn.js:705      sync
```

All single canonical exports, no clones. Callee closure of
the arm: `attacktype` LIVE (boolean canonical,
`attacktype_fordmg(ptr, atyp, AD_ANY)`), `mon_wield_item`
LIVE (real `weapon_check` switch body, D-2460 whole stands),
`check_gear_next_turn` LIVE (`misc_worn_check |= I_SPECIAL`,
null-guard adapted). No STUB, no new edge (module graph
unchanged — `--can` correctly unneeded), no RNG either side.

## C ↔ JS fidelity

Tail (`dogmove.c:466–471`, re-read this review): guard
`attacktype(mtmp->data, AT_WEAP) && weapon_check ==
NEED_WEAPON` at :466–467, `= NEED_HTH_WEAPON` at :468,
`(void) mon_wield_item(mtmp)` at :469, `}` at :470,
`check_gear_next_turn(mtmp)` at :471 — the D-log's quote
matches verbatim. JS mirrors it statement-for-statement in C
order, `await` on the async call (all 10 JS sites await),
gear check outside the `if`. Constants: AT_WEAP 254
(`monattk.h:28` ✓), NEED_WEAPON 1 / NEED_HTH_WEAPON 3
(`monst.h:30/:32` = `js/const.js:3007/:3009` ✓).
`mtmp.data` shape matches sibling `attacktype` sites
(`js/mhitm.js:3047/:3559`); the AT_WEAP block-local matches
the cited house pattern exactly (`js/dog.js:81`,
`js/exper.js:34`, `js/mhitm.js:327` — all `const AT_WEAP =
254;`).

Caller table verified line-by-line: C has exactly 10 code
sites (`csym --callers`: dog.c:212/:1279, dogmove.c:469,
mhitm.c:408, mhitu.c:897, monmove.c:857/:1131,
mthrowu.c:979/:1187, vault.c:539) and JS now has exactly 10
call sites at the D-log's lines (dog.js:269/:704,
dogmove.js:1056 NEW, mhitm.js:6295, mhitu.js:4110,
monmove.js:2791/:691, mthrowu.js:1513/:1567, vault.js:823).
10/10 wired, shapes match (`!== 0` vs `(void)` per C site).

Nits (not findings): D-log cites the new call as
"dogmove.js:1055" — the `await` is at :1056 (1055 is the
NEED_HTH set); `csym` ranges dog_invent `:399–478`, D-log
`:400–478` (the `staticfn int` line). One-line cite drifts.

## Hallucinations / overclaim

None — the D-log's load-bearing sentences all check out, and
its headline admission (VERIFY: FAIL, NO MOVEMENT expected)
is the opposite of overclaim. The "C-wrong omit" claim is
sound: the old rationale ("no AT_WEAP pet") contradicts C's
own guard, which exists precisely because a pet can carry
AT_WEAP data. The park-max citations (D-3570/D-3660/D-3689/
D-3692/D-3694) are real measures with the stated conclusions.
No FORCE/DIAG/seed/coordinate/RNG reads in the `js/` hunk
(grep 0); Rule #2 clean (global `--rulecheck`).

## Density

Head-family work on operator order, not off-head drift: the
cliff deliverable is the owner "ported whole … every C caller
wired", and this wires the head's literally last unwired C
caller — the "another C file's work" QR clause would perverse-
ly punish required caller-wiring if read to fire here, so it
does not. No arm sold as the function (dog_invent stays
`partial`, omit list surgically cleared, D-2417 remainder
named); no silent stub (closure all LIVE above); no symptom
re-port (mon_wield_item untouched, D-2460 stands). Ledger
entry confirmed: one `Ledger:` line, D-3695 prepended.
Right density for a park-maxed head: the real C-wrong repair,
nothing targeting the unmovable probe.

## Verification

D-log claim: `verify mon_wield_item,check_gear_next_turn` →
NO MOVEMENT (probe byte-identical at step 99) ·
REACH-OK ×2 · green · strict · cohort 7/7 · skip full (not
shared). Audit re-measure (all three fns, one call,
`--base a7604ebb0~1 --reach-all`):

```text
verify dog_invent: baseline a7604ebb0~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
reach dog_invent: 312 baseline-PASS session(s) reach it (312 run, 139.2s): 312 PASS, 0 regressed → REACH-OK
verify mon_wield_item: baseline a7604ebb0~1 — 1 session(s) blocked on it (1 at baseline, 1 in the working scoreboard)
  scen-town-Priest-94382: still mon_wield_item at step 99
verify mon_wield_item: 0 PASS, 0 moved past, 1 unchanged, 0 worse → NO MOVEMENT
smoke mon_wield_item: no RNG-tagged reach; fixed smoke spread (24 run, 11.5s): 24 PASS, 0 regressed → REACH-OK
verify check_gear_next_turn: baseline a7604ebb0~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke check_gear_next_turn: no RNG-tagged reach; fixed smoke spread (24 run, 11.1s): 24 PASS, 0 regressed → REACH-OK
```

Reproduced exactly — and the `dog_invent` reach line (312
real sessions execute it, 0 regressed) is stronger cover than
the D-log's smoke for the now-unconditional gear check. No
REGRESSED session; the probe is unchanged at the same step,
not worse. The QR-mapped presentations ("named omission",
"docs/ledger only", vacuous PASS) do not apply: the D-log
says NO MOVEMENT plainly with a necessity proof (pre-patch
total agreement ⇒ the guard never fires loud on the probe; a
silent firing is identically silent post-patch), and any
Must-fix demanding movement would demand trace tailoring
while any demanding revert would reintroduce a C-wrong —
both perverse, so no QR. Observations (not findings): no
focused test pins the AT_WEAP-pet path (hard to reach by
construction; transcription + LIVE callees + 312-session
reach carry it); "skip full" is closed empirically by this
audit's full public run + rescore below.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
