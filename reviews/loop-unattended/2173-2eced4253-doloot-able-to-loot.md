# Review 2173 — 2eced4253 — doloot nobj cache + able_to_loot restart

SHA `2eced4253`, D-3213; 2026-10-01; `js/pickup.js` only (+39/−).
Two-function same-C-file cluster (pickup.c) + one ledger-stale mark
(weapon.c possibly_unwield, no js/). Closes no prior review.

## Metadata

- Subject: "`pickup.c` ×2: doloot_core single-walk cache,
  able_to_loot reachability arms (D-3213)".
- Promises: cache `nobj` before `do_loot_cont` in the single walk;
  restart `able_to_loot` in C order with live rider_cant_reach /
  cant_reach_floor / nolimbs; pool arm `(looting || !u.uinwater)`.

## Intent vs deliverable

Kept for both. Diff adds the `nobj` cache to
`loot_floor_containers`, restarts `able_to_loot` with the two
reachability messages and the pool carve-out, replaces the
try/catch dynamic `nolimbs` with the static import, and adds one
name to the existing engrave edge. No other JS.

## Inventory — doloot_core (walk cache)

Changed in place: `js/pickup.js:4366–4370` (loop head only).
No new/deleted symbols. All LIVE, no clones, no STUBs.

## C ↔ JS fidelity — doloot_core walk

C `pickup.c:2274–2275`: `for (cobj = …; cobj; cobj = nobj) {
nobj = cobj->nexthere; … if (Is_container) … }`. JS is the identical
shape: `for (o = objects_at, nobj = null; o; o = nobj) { nobj =
o.nexthere; if (!Is_container) continue; … do_loot_cont … }` ✓ —
cache before the container check and the call, so a chest trap /
mbag blast destroying `o` cannot corrupt the step. The
`abort_looting` early return (C `:2280–2282`) is pre-existing JS
(D-3199, review 2159 ACCEPT) and unaffected (it returns). No RNG
in the delta. Verdict: ACCEPT.

## Inventory — able_to_loot

Restarted in place: `js/pickup.js:4737–4769` (same name/signature).
New import: `cant_reach_floor` (engrave.js, existing edge —
ALREADY structurally: `can_reach_floor` already imported from it).
rider_cant_reach / P_SKILL / P_RIDING / P_BASIC / nolimbs all
pre-existing in-file imports (verified at :136/:135/:80/:113).

```text
rider_cant_reach js/steed.js:100    ASYNC — await required (awaited ✓)
cant_reach_floor js/engrave.js:588  ASYNC — await required (awaited ✓)
nolimbs          js/monsters.js:362 sync
freehand         js/pickup.js:3384  CLONE (verified below — C-equivalent)
```

No STUBs. The deleted try/catch dynamic mondata import removes a
shim (no symbol output — deletion of a dynamic probe, not a
re-point).

## C ↔ JS fidelity — able_to_loot

C `pickup.c:2040–2069` (csym range, 30 lines, read whole):
can_reach_floor(pit-arg) → usteed && P_SKILL(P_RIDING)<P_BASIC ?
rider_cant_reach : cant_reach_floor(x,y,FALSE,TRUE,FALSE), return
FALSE ✓ exact (args false/true/false ✓); pool
`(looting || !Underwater)` / lava hliquid with the C comment's
semantics ✓ (Underwater ≡ u.uinwater per youprop.h:279, as
accepted in review 2165); nolimbs ✓; looting && !freehand with
body_part(HAND) ✓. C's if/else-if chain ≡ JS's sequential
if-return-false ✓. Message texts match (`cannot %s things that are
deep in the %s`, `Without limbs…`, `Without a free %s…`) ✓. No RNG
in any arm (messages only).

freehand CLONE (pickup.js:3384) matched to C here: identical to
the engrave.js:815 export except `bimanual` is inlined as
`oc_big` without C's WEAPON/TOOL oclass gate. The gate is dead:
welded() ⇒ will_weld ⇒ cursed && (erodeable_wep || TIN_OPENER),
and every non-WEAPON/TOOL member of that set either passes the
gate anyway (is_weptool/TIN_OPENER are TOOL) or has oc_big=0
(HEAVY_IRON_BALL / IRON_CHAIN: BITS big=0, objects.h:1625/1630 —
verified against the BITS(nmkn,mrg,uskn,ctnr,mgc,chrg,uniq,nwsh,
big,…) macro order). So the clone ≡ C on all reachable inputs —
verified CLONE, not queued (importing the export would also be
fine on the ALREADY edge, but is not required). Verdict: ACCEPT.

Stale sidebar: `possibly_unwield` marked ported via CLI — spot
check only (no js/ change): export exists at js/weapon.js:143 and
its head mirrors C weapon.c:746–756 exactly (MON_WEP gate,
minvent walk, stolen/destroyed arm). Plausible; not fully
re-walked.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate
gates. Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

None. "Added to the existing static edge — `--can` ALREADY" holds
structurally; "already imported" holds for all four names; the
freehand clone is disclosed (and verified here).

## Density

Two whole C functions of one C file (pickup.c), +39 js insertions
(Must-fix-free cluster under the ~80 floor — the file's Open
remainder is the standing select_menu by-design note, same as
D-3199). Per-function Ledger and Verify lines present.

- Ledger: doloot_core / able_to_loot — ACCEPT (both).

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
smoke doloot_core: no RNG-tagged reach; fixed smoke spread (24 run, 12.8s): 24 PASS, 0 regressed → REACH-OK
smoke able_to_loot: no RNG-tagged reach; fixed smoke spread (24 run, 12.8s): 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (vacuous notes + REACH-OK ×2, green/strict/
cohort). No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
