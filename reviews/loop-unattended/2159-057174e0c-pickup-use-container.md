# Review 2159 — 057174e0c — pickup + use_container whole-body completion

SHA `057174e0c`, D-3199; 2026-10-01; `js/pickup.js` only (+170/−~60
stat: +161/−68 total). Two-function same-file cluster (pickup.c) +
the ':'-shape `container_contents` callee local; also retires queue
head rloc_to_core as STALE-SPLIT. Closes no prior review.

## Metadata

- Subject: "`pickup.c` pickup + use_container whole-body completion
  (gate nomul, cancel tail, via_menu sort, chest trap, cursed mbag,
  ':' reportempty)".
- Promises: pickup gate nomul removal, traditional-cancel tail skip,
  via_menu INVORDER_SORT/FEEL_COCKATRICE fix; use_container otrapped
  arm, cursed-mbag arm, priced ':' contents, reportempty pline,
  containerdone null→abort.

## Intent vs deliverable

Kept. Diff delivers every promised arm: gate restructured (nomul out
of the gate branch, standalone nomul untouched);
`tail_cancelled` → `finally` skips the `!uswallow` tail but runs the
pickupdone reset; `query_objlist_pickup` gains sortpack/feel_cockatrice
overrides with behavior-preserving defaults; `pickup_traditional_floor`
propagates `cancelled` and passes `{sortpack: selective,
feel_cockatrice: false}`; `use_container` gains the otrapped and
cursed-mbag arms, quantum||cursed "now " tracking, the reshaped ':'
local, and the containerdone null→abort arm. Zero new module edges.

## Inventory — pickup

Changed: `pickup` (gate + `tail_cancelled`/`finally`),
`query_objlist_pickup` (opts overrides), `pickup_traditional_floor`
(cancelled + via_menu opts). Deleted/re-pointed: none. All three
`query_objlist_pickup` call sites audited: count-N passes
`{how: PICK_ONE, autoselect}` (sortpack defaults to flags.sortpack,
feel off — C `:761–772` ✓); menu passes `{autoselect}` (PICK_ANY
defaults: sortpack on, PETRIFY on — C `:774–776` ✓); via_menu passes
explicit overrides (C `:823–829` ✓). Menu behavior unchanged.

## C ↔ JS fidelity — pickup

C `pickup.c:671–910` (csym range). Gate `:729–738` (check_here +
notake pline, no nomul) now exact; standalone nomul `:740–743`
preserved below the gate ✓. Traditional cancel: C `:818–819`
(`!via_menu → goto pickupdone`) ≡ `cancelled` skipping
hideunder/newsym/check_here while the `finally` still runs the
pickupdone reset + `return n_tried > 0` ✓. Via_menu `:823–829`:
INVORDER_SORT iff selective, no FEEL_COCKATRICE, no AUTOSELECT_SINGLE
(traverse_how is the un-OR'd BY_NEXTHERE/0) ✓ all three. Full-body
re-read for the "whole" claim: faint gate, encumbrance, count,
nopick/pool/lava, can_reach_floor, menu PICK_ONE count-forcing,
PICK_ANY, menu_pickup loop (reset/try/break/accumulate), ct==1&&count
(`> 0` counts picked), There + query_classes, bycat loop with
ynaq/ynNaq/q/n/a/#/default, end_query, tail — all present in C order.
ynaq/ynNaq both default 'y' (hack.h:1331/1334, csym-verified — the N
is number-entry, not default-No) and the char tables value-match
decl.c (`ynaq`/`yn#aq`) ✓. Named omit (select_menu digit-count entry,
menu-machinery own row) is the only gap. Callers: every C call site
wired — dig.c:744/:775→dig.js:874/:914, trap.c:4177→trap.js:3449,
hack.c:3381/:3400 (spoteffects pick arms)→pickup.js:2430/:2440,
hack.c:3891→pickup.js:2228, pickup.c:2478→pickup.js:4440,
do.c:1213/:1996→do.js:2267/:3297, trap.c:5423 spoteffects(TRUE)→
trap.js:7435, allmain.c:75 pre-existing deferred. Verdict: ACCEPT.

## Inventory — use_container + ':' local

Changed: `use_container` (otrapped arm, cursed-mbag arm, emptymsg,
containerdone tail), `container_contents` (reportempty pline,
doname_with_price). Deleted/re-pointed: none. Callee closure for the
new arms:

```text
chest_trap       js/trap.js:8017   ASYNC — await required (awaited ✓)
boh_loss         js/pickup.js:3137   ASYNC — await required (awaited ✓)
Is_mbag          macro obj.h:339 — same-file pickup.js:3159 ≡ BAG_OF_HOLDING || BAG_OF_TRICKS ✓
doname_with_price js/shk.js:3473   sync ✓
Ysimple_name2_objnam / thesimpleoname_objnam — aliased canonical objnam.js imports ✓
upstart          canonical hacklib.js:460 exists; new arm uses pre-existing
                 same-file pickup.js:289 (toUpperCase vs highc — identical on
                 ASCII game text; export JSDoc blesses keeping existing locals)
```

No STUB in any live arm; no new clone added (upstart/Is_mbag locals
pre-exist and are C-matched on domain).

## C ↔ JS fidelity — use_container

C `pickup.c:2971–3226` (csym range). Otrapped `:3001–3012`: held-only
`You("open %s...", the(xname))` (theArt ≡ the — import alias ✓),
`chest_trap(obj, HAND, FALSE)` ✓, multi>=0 nomul(-1)+reason+nomovemsg
✓, abort+ECMD_TIME ✓. Cursed-mbag `:3027–3034` in C position (after
quantum, before inokay/outokay): short-circuit preserved (C `&&` ≡ JS
ternary — boh_loss runs only on a cursed non-empty mbag) ✓; "now "
tracks the boolean flag exactly like C (fires even when loss is 0) ✓;
owe/currency/re-weigh/message text ✓. ':' `:3119–3122` + end.c
`container_contents` `:1593–1670` as (FALSE,FALSE,TRUE): cknown-on-look
✓, empty→`upstart(thesimpleoname)+" is empty."` pline with no menu ✓,
contents via `:1647` doname_with_price ✓, LOOT+PACK sortflags ✓, live-cat
Schroedinger arm ✓, no recursion/identify/dumping (all correctly out
of this call shape) ✓. Loot dispatch `:3136–3207` re-read arm-for-arm
(out-first, recalc, "don't have anything%s to %s", loot_in,
stash_one getobj+in_container/unsplitobj, explosion check,
out-after-in with the `used = 1` asymmetry) ✓. Containerdone
`:3208–3224`: cknown ✓, sellobj ✓, null→abort ✓; `*objp` writeback
named and proven safe (C doloot `:2262–2280` reassigns cobj per
iteration and reads only abort_looting + return; apply sacks consumes
`res === ECMD_TIME` only — both verified in JS); containerdone
`update_inventory()` named deferred (display-only, like js/end.js).
BoT-skip named and proven (apply routes BoT to bagotricks;
do_loot_cont `:2150–2159` intercepts before use_container — both
verified). Callers: apply.c:4277→apply.js:2565 ✓,
pickup.c:2161→do_loot_cont ✓. Verdict: ACCEPT.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate gates.
Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

None. "Whole-body completion" holds for both functions (full bodies
re-read above; every remaining gap is a D-entry-named omit with
caller/shape proof). "Menu PICK_ANY/PICK_ONE behavior unchanged"
verified at all three call sites. "Zero new edges" true
(self-inflicted upstart import reverted in-iteration per the Verify
note). ynaq/ynNaq "already matched" claim verified via csym + decl.c.

## Density

Two whole C functions of one C file (pickup.c) plus the ':'-shape
callee local (callee closure, whole for its call shape), ~170 js
insertions, no Must-fix bundled. Per-function Ledger (both partial)
and Verify lines present.

- Ledger: pickup partial — ACCEPT.
- Ledger: use_container partial — ACCEPT.

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
verify pickup: baseline 057174e0c~1 (scoreboard at c1022f867) — 0 session(s) blocked on it (0 at baseline, 0 working)
smoke pickup: no RNG-tagged reach; fixed smoke spread (24 run, 10.8s): 24 PASS, 0 regressed → REACH-OK
verify use_container: baseline 057174e0c~1 — 0 session(s) blocked on it (0 at baseline, 0 working)
smoke use_container: no RNG-tagged reach; fixed smoke spread (24 run, 10.7s): 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (0 blocked each, smoke 24/24, green 2/2, strict ×2,
cohort 7/7, full 44/44). No REGRESSED session; vacuity stated plainly.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
