# Review 2891 — 1b804a0c0 — exerper hallucination arm resists extrinsically

- SHA: `1b804a0c0` (cliff, writer port: 1 predicate)
- D-entry: D-4050; Ledger: attrib.c (`exerper ported`, D-4050 appended)
- `js/` diff: `js/allmain.js` +5/−2 (1 import, arm + cite); new
  `scripts/exerper-hallu-resist.test.mjs`

## Intent vs deliverable

Promise (subject + D-log): the WIS status arm read flat-only
`Halluc_resistance`, missing Grayswandir's extrinsic EHalluc; now
reads the D-4046 house union; probe Healer-50556037 s296→FULL
PASS. Delivers that and nothing else: one import, one predicate
swap, sibling arms explicitly audited-and-unchanged. Promise = diff.

## Inventory

- `exerper` WIS arm — allmain.js:624:
  `(u.HHallucination|0) && !hallucResisted(u)`.
  C: attrib.c:579–580 (`if (Confusion || Hallucination)
  exercise(A_WIS, FALSE)`).
- `hallucResisted` import from `./potion.js` — LIVE canonical
  (potion.js:1172, sync hoisted function; `sym.mjs` single
  definition). `--can` at HEAD: ALREADY edge (module edge
  pre-existed; this commit added the name) — no TDZ risk either way.

## C ↔ JS fidelity

C (attrib.c:577–580 + youprop.h, verified):

```c
if (Sick || Vomiting)
    exercise(A_CON, FALSE);
if (Confusion || Hallucination)
    exercise(A_WIS, FALSE);
```

```c
#define HConfusion u.uprops[CONFUSION].intrinsic   /* youprop.h:84 */
#define Confusion HConfusion
#define HHalluc_resistance u.uprops[HALLUC_RES].intrinsic  /* :119 */
#define EHalluc_resistance u.uprops[HALLUC_RES].extrinsic
#define Halluc_resistance (HHalluc_resistance || EHalluc_resistance)
#define Hallucination (HHallucination && !Halluc_resistance) /* :120 */
```

Sole C caller `exerchk` attrib.c:603 confirmed via csym (decl
:107 + that call only). JS, before and after:

```js
// before: flat-only resistance
|| ((u.HHallucination | 0) && !(u.Halluc_resistance | 0))
// after: house union (D-4046)
|| ((u.HHallucination | 0) && !hallucResisted(u))
```

`hallucResisted` (potion.js:1172–1178) reads uprops
intrinsic|extrinsic + Halluc/HHalluc/EHalluc flats — the D-4046
house canonical, same shape as timeout.js:1271. On the probe
(EHalluc 256, HHalluc 750, flats clear) C and JS both skip — the
exact fork fixed. The flat fallbacks and trailing stored-bit
`|| u.Hallucination` are dual-store mirrors, kept and named in
the D-entry (removal untested, no firer) — a named standing shape,
not a silent divergence. The full JS condition
`(HConfusion|Confusion) || (HHalluc && !union) || u.Hallucination`
preserves C's `||` order.
Sibling arms (Sick/Vomiting, Confusion union, regen/clair,
wounded/Fumbling/HStun) are named in the D-entry with the D-4012
ship-on-evidence precedent; the function was already
ledger-`ported`, this commit only appends D-4050 to its history
without touching the note — accurate.
Nit (not a C-wrong): the D-log/commit cite `:570–575` covers the
status-block header + clair/regen arms; the shipped arm is :579–580
(verified by line-numbered read). Cite drift in prose only; no JS
impact, not queueable.

## Hallucinations / overclaim

None. "New edge" is slightly loose (module edge pre-existed; the
imported name is new) but the cycle-safety substance holds —
hoisted function, no TDZ. No dispatch-vs-callee overclaim: the
fixed predicate is the firing predicate, proven by the pre-fix
test reproducing the board's exact jsEntry
(`rn2(2)=0 @ exercise(attrib.js:239)`).

## Density

Cliff writer with movement on the first actionable row (rows 1–10
parks + row-11 stale re-verified live). Whole-function discipline
holds: `exerper` was already whole-ported; one predicate
corrected, every sibling named. One `Ledger:` entry, accurate. No
unreached work.

## Verification

Re-measure:

```text
verify moveloop_core: baseline 1b804a0c0~1 — 1 session(s) blocked on it
  scen-sweep-Healer-50556037: PASS
verify moveloop_core: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

Exact match. Rule #2 clean (whole-`js/` rulecheck in this window,
same HEAD). No FORCE/DIAG/seed strings in the diff; EXERPROBE
reverted (0 strings claimed; diff shows none). Focused test RED
(board-exact jsEntry) → GREEN; halres-talk 2/2 still pass claimed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
