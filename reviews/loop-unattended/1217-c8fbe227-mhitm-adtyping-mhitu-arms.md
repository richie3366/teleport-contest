# Review 1217 — c8fbe227 — mhitm_adtyping remaining mhitu arms (D-2251)

Metadata: SHA `c8fbe227` (D-2251). Queue row `uhitm.c` remaining
mhitu arms, named D-2247, no corpus block. js/ +262/−23
(`mhitu.js` +186/−14, `steal.js` +74/−7, one-word exports on
`mon.js` / `mcastu.js`). Ceiling 450.

## Intent vs deliverable

Subject promises mhitu AD_SGLD/CURS/DCAY/SLIM/DETH bodies +
`stealgold` + DGST/HALU zero cases, with `mon_give_prop` /
`Antimagic` / `Levitation` / `Flying` exported instead of new
clones. Diff adds those five `_u` helpers, dispatch cases, and
`export async function stealgold`. Promise of "C order" is
kept except the PM-pointer gates (below).

## Inventory

New: `mhitm_ad_sgld_u` / `_curs_u` / `_dcay_u` / `_slim_u` /
`_deth_u` (mhitu-only; uhitm/mhitm named OMIT in-commit);
`export async function stealgold`. Re-pointed (local → export):

```text
mon_give_prop    js/mon.js:2276   ASYNC — await required
Antimagic        js/mcastu.js:93   sync
             !! ALSO 8 LOCAL CLONE(S)
Levitation       js/mhitu.js:697   sync
             !! ALSO 8 LOCAL CLONE(S)
Flying           js/mhitu.js:705   sync
             !! ALSO 8 LOCAL CLONE(S)
stealgold        js/steal.js:97   ASYNC — await required
attrcurse        js/sit.js:344   ASYNC — await required
night            js/calendar.js:225   sync
touch_of_death   js/mcastu.js:421   ASYNC — await required
make_slimed      js/potion.js:907   ASYNC — await required
erode_armor      js/mhitm.js:1783   ASYNC — await required
```

`--can` at HEAD: steal→mhitu / mkobj / monmove and mhitu→mon /
mcastu all ALREADY. Callee closure per shipped arm — LIVE unless
noted:

- SGLD: `hitmsg`, `stealgold` LIVE. mlet compare is a field,
  not a pointer.
- CURS: `hitmsg`, `night`, `rn2`, `Soundeffect`, `rehumanize`,
  `mon_give_prop`, `attrcurse` LIVE. `hero_Deaf` / local
  `You_hear` / `Blind()` are house clones (youprop.h:125 /
  pline.c prefix). **PM_GREMLIN gate is not C.**
- DCAY: `hitmsg`, `erode_armor` LIVE. **completelyrots inlined
  as `=== mons[PM_*]` is not C.**
- SLIM: `mhitm_mgc_atk_negated(mtmp, null, false)` LIVE (null
  ≡ hero, mhitm.js:2067–2073); `hitmsg`, `flaming` (local mndx
  clone matches mondata.h:59–61), `Unchanging`, `noncorporeal`,
  `make_slimed`, `delayed_killer(SLIMED, KILLED_BY_AN, pmname)`
  LIVE vs uhitm.c:3568–3572. **GREEN_SLIME pointer is not C.**
- DETH: `pline_mon`, `is_undead`, `rn2(20)` switch with 17–19
  Antimagic FALLTHROUGH → default permdmg, 0–4 `shieldeff`,
  `touch_of_death` LIVE.
- DGST/HALU: explicit zero cases vs `:4502–4504` / `:3907–3909`.
- stealgold: `g_at` / skip-lesser / invent GOLD_PIECE find ≡
  `findgold` `:44–52`; `!ygold || quan> || !rn2(5)` short-circuit
  kept; `somegold` same-file LIVE vs `:13–34`; `objects()` cost,
  `splitobj` / `setnotworn` / local `freeinv` (pre-existing
  invent splice + `freeinv_core`; C also `pickup_prev=0` +
  `update_inventory` — display-only).

## C ↔ JS fidelity

- SGLD vs `:2816–2821`: hitmsg, same-mlet return, `!mcan` →
  `stealgold`; damage untouched. C.
- CURS vs `:3038–3059`: hitmsg; C `if (!night() && pa ==
  &mons[PM_GREMLIN]) return` then `!mcan && !rn2(10)`. JS
  `mtmp.data === mons[PM_GREMLIN]`. `mons` is
  `export function mons(mndx)` (monsters.js:203–231) that
  returns a **new object**; `mons[n]` is `undefined` (probed
  this audit: `typeof function`, `mons[42] === undefined`,
  `mons(10) === mons(10)` is false). The daytime gremlin
  return never fires, so JS still draws `rn2(10)` by day.
  House compare is `(ptr?.mndx | 0) === PM_GREMLIN`
  (`hates_light` monsters.js:339–341; zap.js:4189–4192 cites
  the same factory trap). Clay-golem `u.umonnum` and the
  laughter/`attrcurse` tail match once the gate is passed.
- DCAY vs `:2379–2390`: hitmsg, mcan return, then C
  `completelyrots(pd)` (mondata.h:225–226 wood||leather).
  JS `pd === mons[PM_WOOD_GOLEM] || pd === mons[PM_LEATHER_GOLEM]`
  is the same always-false factory read, so a rotting-golem
  hero never `You rot!` + `rehumanize`. Copied from pre-existing
  `rust_u` (`=== mons[PM_IRON_GOLEM]`, mhitu.js:2421–2422) /
  `fire_u` paper/straw.
- SLIM vs `:3530–3574`: negated drawn before hitmsg; C
  `pd == &mons[PM_GREEN_SLIME]` same always-false (Unchanging /
  noncorporeal arms still work). Slimed reads `u.Slimed`, the
  field `make_slimed` writes.
- DETH vs `:3850–3883`: integer `(dmg+1)/2` via `Math.trunc`;
  switch shape matches C including Antimagic fallthrough.
- stealgold vs `:57–116`: floor vs purse, steed FOOT / slithy
  coils / `rear ` slice, `Levitation()||Flying()` beneath,
  purse `somegold`+price ceil, `rloc(RLOC_MSG)`+`monflee`. C.

## Hallucinations / overclaim

D-log / subject say the CURS arm is "daytime gremlin → return
(night() before the rn2, C order)". The `night()` call is in
C order; the PM conjunct is a dead always-false, so the claimed
skip is not live. Callees are not stubs — this is a C-wrong
inside a live arm, not "dispatch ported, callee stubbed".

## Density

+262 for five mhitu bodies + `stealgold` + two zero cases.
In-band. Named uhitm/mhitm remainders queued as Open.

## Verification

Audit re-ran the corpus claim itself:

```text
verify mhitm_adtyping: baseline c8fbe227~1 — 0 session(s)
blocked (0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed, exactly as labeled. Green 2/2 + strict ×2
+ cohort 7/7 pasted. Diff grep: no FORCE/DIAG/seed/coordinates.
Rule #2 clean (re-run here, repo-wide).

## Actionable C-wrongs

1. Replace `=== mons[PM_*]` with `(data?.mndx | 0) === PM_*` in
   `mhitm_ad_curs_u` (PM_GREMLIN — restores the daytime
   `rn2(10)` skip), `mhitm_ad_dcay_u` (WOOD/LEATHER —
   `completelyrots`), `mhitm_ad_slim_u` (GREEN_SLIME). Same
   one-liner already dead in `rust_u` / `fire_u` in this file;
   fix those in the same iter. Probe: `node scripts/brief.mjs
   mhitm_ad_curs`.

Verdict: **QUALITY-RISK**

**Addressed:** D-2259
