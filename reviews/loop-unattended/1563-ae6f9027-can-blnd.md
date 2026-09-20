# Review 1563 — ae6f9027 — mondata.c can_blnd whole-body port (D-2604)

**Metadata:** SHA `ae6f9027`, `mondata.c` `can_blnd` + `resists_blnd` +
`resists_blnd_by_arti`, D-2604. JS: `js/uhitm.js` (can_blnd restart),
`js/mondata.js` (+77, two new exports), `js/mhitm.js` (1-word export
addition). Map `data.md` +39 (drift named).

## Intent vs deliverable

Subject promises: C-order restart, canonical resists pair, 11 C callers
wired. Diff actually adds: whole-body `can_blnd` (`:305–398` cited),
new canonical `resists_blnd` (`:247–272`) + `resists_blnd_by_arti`
(`:275–298`), `dmgtype_fromattack` added to the mhitm export list.
Matches the promise, with one caller-count qualification below.

## Inventory

- `can_blnd` (restart, `js/uhitm.js:331`) — haseyes, perma-blind,
  raven-vs-raven, light/WEAP-SPIT-NONE/ENGL/CLAW/TUCH-STNG arms, visor
  tail, TRUE.
- `resists_blnd` (new, `js/mondata.js:245`), `resists_blnd_by_arti`
  (new, `js/mondata.js:215`), both exported.
- `dmgtype_fromattack` added to `js/mhitm.js:761` export list (body at
  :779 unchanged).

## C ↔ JS fidelity

C loci read via `csym.mjs`: `can_blnd` `:304–398` (95 L),
`resists_blnd` `:247–272`, `resists_blnd_by_arti` `:275–298`.
Branch-by-branch confirm:

- `:316–317` haseyes gate; `:320–321` perma-blind via inlined
  `monst.h:253` (`!mcansee && !mblinded`, `!is_you`): live.
- `:327–328` raven-vs-raven via `mons(PM_RAVEN)` identity (gulpmu
  precedent): live, same pointer-identity semantics as C.
- Light arm `:330–339` (EXPL/BOOM/GAZE/MAGC/BREA, `magr.mcan`, canonical
  `!resists_blnd`): live.
- Obj arm `:343–357` (pie EBlinded gate; venom ublindf/ucreamed gate +
  visor flag; POT_BLINDNESS no-defense TRUE; other objs FALSE;
  hero-swallowed gate): live.
- ENGL `:367–370`, CLAW `:375–379`, TUCH/STNG `:386–387`, visor tail
  `:394–396` (hero `game.invent` + `u.uarmh` alias — harmless redundant
  scan, same outcome; monster `minvent` chain), `:398` TRUE: live.
- `resists_blnd`: hero `Blind||Unaware`, monster
  `mblinded||!mcansee||!haseyes||msleeping`, AD_BLND AT_EXPL/GAZE,
  Sunsword via by_arti, `Blnd_resist` catchall + upstream
  `impossible()`: live. (JS catchall ORs H/E bits with
  `uprops[BLND_RES]` intrinsic/extrinsic — same fields C's macros read,
  same outcome.)
- `resists_blnd_by_arti`: wielded (`uwep`/`MON_WEP`) + carried-chain
  scan: live. `#if 0` Overworld arm is compiled out upstream — no JS
  is correct.
- No RNG in any arm (`rn2/rnd` absent both sides).

Callee closure: `resists_blnd`/`by_arti` LIVE new exports;
`dmgtype_fromattack` LIVE via the export-list addition (see tool note);
`Blind` (invent), `Unaware` (eat), `haseyes`, `objdescr_is` (apply,
live export per `sym.mjs`), `impossible`, `MON_WEP`, `defends`,
`defends_when_carried` live. `imports.mjs --can` on both new mondata
edges → ALREADY (same SCC, runtime-only calls). No STUB, no silent omit.

Caller closure (11 C sites): 9 reach the live export — mhitm.js:837
(mon→mon arm), mhitu.js:1804 (ustuck gate; ENGL via gulpmu wrapper),
mthrowu.js:889/1234, uhitm.js:1348 (`:1268`)/1459/3488. Two go through
pre-existing named subset clones: apply.c:3584 via
`can_blnd_cream_self` (apply.js:1040), dothrow.c:1297 via
`can_blnd_toss_self` (dothrow.js:1627, read here — same
`rnd(25)` shape as C). Both are map-named drift (data.md touched this
commit), so "11 wired" = 9 live + 2 named. Now that the canonical
export is whole-body, both clones are exactly replaceable — debt item 1.

Tool note (required `sym.mjs` output): `sym.mjs dmgtype_fromattack`
reports "NOT EXPORTED — 2 LOCAL CLONES" because it does not see
export-list re-exports; grep proves `js/mhitm.js:761` exports the
`:779` body and `js/mondata.js:41` imports it. Tool blind spot, not a
port fault. Remaining clones (`mhitu.js:655`, `detect.js:282`,
`trap.js:4652`, gulpmu/cream/toss subsets) pre-date this commit and
stay map-named.

## Hallucinations / overclaim

"Named: none new" is accurate only with the map update: the drift
clones are named in `data.md` (+39 this commit), not silently left.
No dispatch/stub split. No clone divergence introduced.

## Density

One C file's blind-attack family, 3 JS modules, ~190 insertions.
Right-sized; same-file companion (resists pair) shipped together per
the breadth rule.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean.
- Diff grep: 0 FORCE/DIAG/getRngLog/fastforward hits.
- D-log Verify claims PASS + smoke REACH-OK. Re-measured:
  `hidden-proxy.mjs verify can_blnd --base ae6f9027~1 --reach-all` →
  0 blocked at baseline and working tree (vacuous-note path, correctly
  framed) + `smoke 24/24 PASS, 0 regressed → REACH-OK`. Confirmed.

## Actionable C-wrongs

1. (Debt, map-tracked) Replace `can_blnd_cream_self` (apply.js:1040)
   and `can_blnd_toss_self` (dothrow.js:1260) with the whole-body
   `can_blnd` export — their named omissions (visor, perma-blind,
   raven) are now live. One-iter swap; verify via the cream/toss
   sessions.

Verdict: **ACCEPT-WITH-DEBT**
