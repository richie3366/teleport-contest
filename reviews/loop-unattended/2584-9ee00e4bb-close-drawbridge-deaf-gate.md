# Review 2584 — 9ee00e4bb — close_drawbridge crush Deaf-macro gate

SHA: `9ee00e4bb` (D-3714). Omit-2 family residual, 1 function,
`js/dbridge.js` only (+3/−1). Ledger: close_drawbridge ported.

## Intent vs deliverable

Promise: C gates the crush pline on `OBJ_AT && !Deaf` (:815); JS read
raw `game.u?.Deaf` plus invented `|| acoustics===false` → gate now
calls the same-module `hero_Deaf()`, acoustics disjunct dropped. Diff
actually adds: the gate rewire + C-cite comment. No new helpers, no
imports. Promise matches diff.

## Inventory

- `close_drawbridge` (js/dbridge.js:753 crush gate) ↔ C
  nethack-c/upstream/src/dbridge.c:774–834 (csym range), crush arm
  `if (OBJ_AT(x, y) && !Deaf)` + Soundeffect/You_hear tail. Helper
  classification: the gate's reader is a pre-existing CLONE — local
  `hero_Deaf` js/dbridge.js:363 (D-1967), not the monmove export.

## C ↔ JS fidelity

C arm text confirmed in the body above: `OBJ_AT && !Deaf`, then
`Soundeffect(se_smashing_and_crushing, 75)` + `You_hear("smashing and
crushing.")`. JS now: `objects_at(x, y) && !hero_Deaf()` → live
`Soundeffect` no-op call + live `You_hear('smashing and crushing.')`.
Gate, order and strings match. CLONE verified here: the local reader
(`HDeaf|EDeaf|u.Deaf|uroleplay.deaf`) carries exactly the canonical
export's disjuncts (order differs, semantics identical) = youprop.h:125
+ disclosed dead-code `u.Deaf`. No STUB: both emit calls are live. No
RNG in the arm. `revive_nasty`/`delallobj`/trap/engr tail untouched.
The "same-file residual checked" claim (all live Deaf gates now via
hero_Deaf) is a same-commit sweep statement, not audited arm-by-arm —
accepted as hygiene, not a C claim.

## Hallucinations / overclaim

None. D-log states "no corpus divergence", names the vacuous verify +
smoke line, and discloses the dead-code disjunct. The "live no-op
Soundeffect = faithful empty-macro port" claim matches contest C (no
SND_LIB_*), consistent with family convention.

## Density

One whole gate + focused test (4/7 → 7/7 claimed) + ledger + verify on
an empty queue. Right-sized.

## Verification

Re-measured: `verify close_drawbridge --base 9ee00e4bb~1 --reach-all`
→ 0 blocked at baseline (vacuous, as stated) + `smoke: 24 run, 24
PASS, 0 regressed → REACH-OK`. Matches the D-log. Rule #2 clean (no
imports touched). Diff grep FORCE/DIAG/RNG/coords: no hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
