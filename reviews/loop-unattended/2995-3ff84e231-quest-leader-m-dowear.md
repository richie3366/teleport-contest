# Review 2995 — 3ff84e231 — quest-home leaders wear their custom inventory

- SHA: `3ff84e231` (cliff; board head m_move,
  scen-questtour-Caveman-50750030 s58; writer sp_lev.c spo_end_moninvent)
- D-entry: D-4155; Ledger: spo_end_moninvent split (13 loader sites)
- `js/` diff: js/mklev.js +44 −17

## Intent vs deliverable

Promise: lspo_monster ends a `des.monster{…, inventory = function()}`
with spo_end_moninvent, which runs `m_dowear(invent_carrying_monster,
TRUE)`. Eight hand-written quest-start loaders (Wiz, Rog, Val, Sam, Hea,
Tou, Ran, Cav) and the Kni-strt warhorse loop skipped it. So Shaman
Karnov carried his leather armor unworn, put it on in movemon's
I_SPECIAL arm after a pickup, and lost a move that C spends acting.

Diff: an `m_dowear(mtmp, true)` at the end of each of those leader
blocks. The warhorse loop's `continue` on the saddle-less 50 % is
restructured so that every horse reaches m_dowear. Three stale Named
lines are dropped. The promise matches the diff.

## Inventory

- C: sp_lev.c spo_end_moninvent :3030–3036; lspo_monster's
  CUSTOM_INVENT block, which runs the lua function and then
  spo_end_moninvent (pinned, after create_monster).
- JS sites (mklev.js): load_wiz_strt :6867, load_kni_strt warhorse
  :8809, load_rog_strt :9298, load_val_strt :9748, load_sam_strt :10218,
  load_hea_strt, load_tou_strt, load_ran_strt and load_cav_strt (each `if
  (mtmp) m_dowear(mtmp, true)`).
- Callee `m_dowear` — worn.js, imported at mklev.js:175 (LIVE, no clone).

Coverage check: `grep -l "inventory *= *function" dat/*.lua` lists
exactly 13 files, the 13 `-strt` scripts. mklev.js now has 14
`m_dowear(mtmp, true)` sites: 13 leaders + the warhorse; the generic
l_create_monster path has its own inline call. Every C site is covered.

## C ↔ JS fidelity

C sets `invent_carrying_monster` only when create_monster made the
monster, and spo_end_moninvent tests it. JS's `if (mtmp)` gives the same
null test. `m_dowear(mon, TRUE)` is the creation form: no delay, no
messages and no RNG, so where the call sits relative to the later chest
and wanderers does not shift any stream. The warhorse lua is `inventory
= function() if percent(50) then des.object("saddle") end end`, so C
calls spo_end_moninvent for every horse, saddle or not. The JS
restructure keeps the draw order (percent(50), then the
get_location_random and mksobj_at only on success) and then wears. For
an animal m_dowear returns early, as in C.

Doc nit, not a C-wrong: the loca/goal headers (load_wiz_loca :6978,
load_wiz_goal :7284, load_pri_loca :7685, load_pri_goal :7887,
load_arc_loca :8211, load_arc_goal :8441, load_kni_loca :8833) still list
"spo_end_moninvent m_dowear" as a Named omission. Their lua files have
no inventory function, so C never reaches the call there. Those lines
are vacuous and can be dropped on a later touch.

## Hallucinations / overclaim

None. The D-log's measured cause (C `take=1 carry=1 worn=1` at the
turn-5 chest pickup, JS misc_worn_check 0) explains the RNG split
(m_move `rn2(32)` vs pri_move `rn2(3)`).

## Density

One writer, every site of its C call pattern in one commit. Right-sized.

## Verification

```text
verify m_move,spo_end_moninvent --base 3ff84e231~1 --no-reach
  m_move: 2 PASS (scen-questtour-Caveman-50750030; scen-sweep-Ranger-50950041)
  spo_end_moninvent: 0 blocked (vacuous)
```

The Caveman PASS is this SHA's. The Ranger row was healed later in the
window (D-4157 moved it to s1169, D-4158 passed it). The D-log correctly
called it a different cause.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
