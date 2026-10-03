# Review 2323 — 794aa26a5 — slept_monst callers + bhitm WAN_SLEEP

Metadata: SHA `794aa26a5`, D-3368, Must-fix for review 2317
C-wrong 2. C `mhitm.c:1222–1246` (sleep_monst) +
`zap.c:478–488` (bhitm arm). Stat: 4 js files (+28/−30)
+ test +2 cases.

Intent vs deliverable: subject promises "slept_monst
unwired C callers". Diff actually: deletes both clones,
rewires music/potion to the canonical import, adds the
bhitm WAN_SLEEP arm, updates the caller doc. Matches
promise; closes the queued Must-fix exactly as specified.

Inventory: 2 clones deleted (music.js:268,
`slept_monst_pot` potion.js:3745) → 2 same-name import
additions; 1 new arm (**C callee** inline of sleep_monst
for how=WAND_CLASS) at js/zap.js:4470; 1 const
(AD_SLEE=4, matches monattk.h:46 ✓). No stub. music.js
call site now `msleeping=1` + `await slept_monst(mtmp)`
= C music.c:93–95 ✓; potion.js `POT_SLEEPING` = C
potion.c:1804–1806 ✓ (pline + slept on success).

C ↔ JS fidelity (WAN_SLEEP arm): branch-by-branch
confirm against C :478–488 + sleep_monst :1222–1246.
`reveal_invis=TRUE` ✓; `d(1+spe,12)` drawn first as
call-arg order ✓ (before resist RNG); mimic reveal
`!msleeping && !mfrozen && S_MIMIC && (FURN||OBJ)` =
C, `how>=0` implied by const WAND_CLASS ✓; gate
`resists_sleep || defended(AD_SLEE) || resist(how,0,
NOTELL)` → shieldeff — all three LIVE (resists_sleep
macro = MR_SLEEP bit = resists_sleep_slee mhitm.js:1381
✓; defended mondata.js:209; resist zap.js:1848 awaited)
✓; else-branch `mcanmove` gate + `amt+=mfrozen` +
`min(amt,127)`/`msleeping=1` + return 1/0 ≡ C via
sleep_monst_zap (zhitm precedent) — except
`finish_meating` → house `meating=0`, pre-existing style
named in the D-log, not introduced here; `slept_monst`
on success ✓; `!Blind → learn` via file-local
Blind_props (pre-existing stand-in) ✓; `wake` stays
TRUE (`let wake=true` :4022, arm untouched) = C comment
✓.

Hallucinations / overclaim: none. "SAFE — hoisted
function" is now ALREADY ×2 (re-measured below); the
D-log's "zap→mhitm ALREADY" for the zap.js self-use is
trivially true (same file).

Density: 1 Must-fix (caller closure), alone ✓. `Ledger:`
entries ×2, combined `verify.mjs` ×2 fns, test 9/9.

Verification: re-measured — `verify
slept_monst,bhitm --base 794aa26a5~1 --reach-all` →
slept_monst "0 blocked + smoke 24/24 → REACH-OK";
bhitm "0 blocked + 2 reach, 2 PASS → REACH-OK".
Matches every D-log number. Diff grep: 0 banned hits.
`sym.mjs` + `--can` (required paste):

```text
slept_monst      js/mhitm.js:1422   ASYNC — await required
slept_monst_pot  NOT FOUND in js/**
--can music→mhitm, potion→mhitm: ALREADY (brace extensions)
```

Single definer; both clones gone.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
