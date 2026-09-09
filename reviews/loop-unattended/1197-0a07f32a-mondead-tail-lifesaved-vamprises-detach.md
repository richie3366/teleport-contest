# Review 1197 — 0a07f32a — mondead tail: lifesaved/vamprises/grddead/logdeadmon/full m_detach (D-2231)

Metadata: SHA `0a07f32a`, `js/mhitm.js` +449/−44 plus one-line `await`
updates in mhitu/mon/muse/shk/trap/uhitm/vault. Queue row: Open `mon.c`
mondead tail, no corpus block (named-omission row).

## Intent vs deliverable

Subject promises the full death tail. Diff actually adds:
`set_mon_min_mhpmax`, `lifesaved_monster`, `vamprises`, `grddead`,
`logdeadmon`, `thiefdead`, `shkgone`, full `m_detach`, async `mondead`
rewire + `monstone`/`monkilled` sites, all callers awaited. Matches the
promise. One combined-arm port; callee closure below.

## Inventory

New: 7 functions (5 async). Re-pointed sync→async: `mondead`
(all callers awaited — sole exception `kill_genocided_monsters`, named, see
below); newly exported (no behavior change): `mon_leaving_level`,
`setpaid`, `clear_fcorr`, `parkguard` (`sym.mjs` confirms: mondead ASYNC,
m_detach/lifesaved/vamprises/grddead ASYNC, logdeadmon/thiefdead/shkgone
sync). Behavior change beyond export: `mon_leaving_level` onmap clause
(C-correct fix for a machine-recorded 42/44 regression, see Verification).

## C ↔ JS fidelity

- `set_mon_min_mhpmax` (`mon.c:2806–2823`): m_lev+1 floor then caller
  minimum, exact.
- `lifesaved_monster` (`:2838–2884`): cansee-gated (deliberately not
  canseemon) plines, `makeknown`, `m_useup`, `check_gear_next_turn`,
  `wary_dog` tame arm, mhp restore, genocided arm — arm-for-arm. Uses
  pre-existing same-module locals `mlifesaver`/`m_useup_mm`/`attacktype_mm`,
  each verified against C here (`mlifesaver` ≡ mon.c incl. vampshifter
  exception; `attacktype_mm` ≡ attacktype macro; `m_useup_mm` ≡ m_useup
  quan/unlink core). `mnum ?? data.mndx` ≡ `monsndx(data)`: `set_mon_data`
  keeps them in sync (mondata.js:70–71) and `newcham` routes through it.
- `vamprises` (`:2888–2987`): G_GENOD gate, Unaware-dream action string,
  mcanmove/mfrozen, ustuck expels/uunstick, newcham + cham fixup,
  canspotmon rise pline + `vamp_rise_msg`, closed-door smash
  (You_hear/You_see/pline_The order, D_NODOOR + recalc, newsym). Exact.
- `grddead` (`vault.c:174–189`): clear→gold-vanish (message gates verbatim
  from `steal.c:878–885`)→drop-rest→park→retry→isgd clear. Exact.
- `logdeadmon` (`:2995–3068`): Medusa achievement, G_UNIQ/shopkeeper gate
  (`unique_corpstat` ≡ G_UNIQ test), shkdetail format incl. trailing comma,
  1/2/3/5/10/25/50 cadence, LL_ACHIEVE, xtra ordin, herodidit phrasing. Exact.
- `thiefdead` (`steal.c:119–128`): stealmid reset; stealarm arm named.
- `shkgone` (`shk.c:234–269`): on_level → resident → fobj no_charge loop
  (≡ grid walk, place_object stamps both) → setpaid/bill/ushops splice.
  `discard_damage_owned_by` + has_shop named.
- `m_detach` (`:2734–2803`): unleash → light → mon_leaving_level → mhp=0 →
  iswiz → nemesis(+named stinky omit)/leader/relobj+gated newsym →
  stealmid (zero-guard documented: C m_id never 0) → shk → worm → endgame
  → MON_DETACH+purge (minimal_monnam→mon_nam named) → usteed dismount.
  Exact order.
- `mondead` (`:3081–3177`): lifesave→vamp→be_sad→vortex `rn2(10)+5`→grddead
  →mptr save→restore→mvitals→quest/mail/Kops (pre-existing)→logdeadmon→
  unmap→m_detach. `monstone` (`:3301–3303`) and `monkilled` (`:3398`,
  `completelyburns(mdef.data)` ≡ `mptr`) exact.
- MS_LEADER=36/MS_NEMESIS=37 verified (`monflag.h:51–52`); PM_* via file
  indexOf idiom. No clones, no stubs; every new-arm callee LIVE except the
  named omits (stinky pair, minimal_monnam, stealarm, shkgone pair,
  mongone FALSE arm, mb_trapped, xkilled writer — all cited in D-log + map).

## Actionable C-wrongs (debt, not blocking)

1. (Debt) `game.disintegested` lifecycle: monkilled writes it, vamprises
   reads it, but the xkilled `=nocorpse` writer + `=FALSE` reset
   (`mon.c:3544/3550`) are only named, never ported — so a stale `true`
   from an earlier monkilled disintegration leaks into a later xkilled-path
   revert ("reconstitutes" vs "transforms"). Screen-only, narrow. One-line
   iter (reset-after-use or the xkilled writer).
2. (Debt) `kill_genocided_monsters` (mon.js:3208) stays fire-and-forget.
   Safe by run-to-completion (`mhp=0` at mondead entry guards
   re-observation; no awaits in the loop body), but the amulet+More corner
   suspends detach past later loop iterations — display-order only, named
   in D-log. Await-ripple is a bigger iter; record the proof obligation.

## Hallucinations / overclaim

None. "Exact C order" claims verified arm-by-arm above. The D-log is
exemplary: it reports the mid-iteration 42/44 regression with owners and
the C-correct onmap fix rather than burying it.

## Density

~450 insertions, one C locus family (death tail + its callees), full callee
closure, 0-block named row. Combined-arm ports of this shape are explicitly
allowed when every callee is LIVE/OMIT/verified-CLONE — met. In-band.

## Verification

D-log: `verify --fn mondead --full` → syntax/rule2/green/strict/cohort
PASS + full 44/44, hidden vacuous-as-labeled (row cited no blocks, no
`--base` owed). The 42/44 mid-iteration regression (ghost `1`/`I`,
RNG matched) was fixed C-correctly in mon.js onmap (m_at liveness filter
vs C grid; fmon-membership covers dead-mons-stay-till-dmonsfree) with
targeted 1814/1814 + 833/833 replays then full 44/44. Rule #2 clean
(`imports.mjs --rulecheck` re-run here); no FORCE/DIAG/seed/coordinate
reads in the diff. Final full-suite confirmation runs at end of this
iteration (cadence).

Verdict: **ACCEPT-WITH-DEBT**
