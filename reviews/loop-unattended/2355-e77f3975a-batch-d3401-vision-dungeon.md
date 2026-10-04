# Review 2355 — e77f3975a — batch vision/mon/pline/invent/display/dog/dungeon (94 fns, D-3401)

- SHA: `e77f3975a` — "batch @1ae9cc180: vision/mon/pline/invent/display/dog/dungeon remainder (94 fns, 0 left open) (D-3401)."
- D-entry: D-3401. Diff: 32 js files, +607/−634; ledger rows + journal + index + scoreboard.
- Manifest check: reproduced `ledger.mjs batch` in a worktree at base `1ae9cc180`
  (pinned-C symlink): "94 function(s) in vision.c, mon.c, pline.c, invent.c,
  display.c, dog.c, dungeon.c — open 1 · partial 43 · recheck 50" — fn set
  diff vs `d like '%D-3401%'` rows is EMPTY (MANIFEST-MATCH). Not over-size,
  nothing Left open, no Must-fix bundled.
- Fixed sample (19): hot-12 `newcham getobj impossible vpline init_dungeons
  mon_catchup_elapsed_time set_wall_state prinv execplinehandler
  mgender_from_permonst movemon_singlemon mon_arrive`; random-4
  `adjust_gold_ok show_glyph egg_type_from_parent wary_dog`; audited-3
  `pline_dir pline_xy doprarm`. Second sample of 8 (wrong declaration found):
  `ceiling recbranch_mapseen shop_string pick_level verbalize You_feel
  print_dungeon set_mon_min_mhpmax`.

## Intent vs deliverable

Promise: port each of the 94 manifest functions whole in C order — guarded
arms, live-imported callees, wired callers, clones deleted never duplicated;
prefer-restart for thin bodies.

Diff actually adds: arm completions (vpline BIGBUFSZ throw, sensemon
Underwater, dumplogfreemessages new, useupf shop billing + async with all
callers awaited, display_minventory PICK_ONE/ANY, look_here swallowed/lava/
ICE/last_msg arms, mongone via live m_detach+grddead, replmon relmon mirror,
hideunder last-hide record ×2, corpse_chance Vlad dust ×2 clones, xkilled
unstuck removal, vision_recalc inited+underwater+col-0, view_from vis_func
arms ×2, Can_dig_down Invocation, ledger_to_dnum throw, recalc_mapseen
priest, recbranch_mapseen impossibles, shop_string annotations + shtypes data,
print_dungeon debug lines, meatbox mndx, mergable gate lift, rot_corpse
hideunder expose, Is_special ×4 rewires, reorder_invent export, addinv_core2
luckstone, Can_dig_down, set_mimic_blocking skip, iter_mons ×5 caller
wirings, trap launch Thump+wake); clone deletions → live imports
(wake_nearby ×4 files, wake_nearto ×4, mongone ×4, write.js getobj,
invent reorder_invent_adjust, shk mongone_nonlocal, vault mongone_guard,
hack Is_special_local). Promise == deliverable, except `canseemon` (Ledger
says `ported`, diff has no canseemon hunk — see C-wrong 2).

Required `sym.mjs` on deleted/re-pointed symbols:

```text
wake_nearby      js/mon.js:1599   ASYNC — await required
wake_nearto      js/mon.js:1591   ASYNC — await required
reorder_invent   js/u_init.js:928   sync
Is_special       js/dungeon.js:2880   sync
getobj           js/invent.js:10161   ASYNC — await required
```

Single live home each; deleted locals verified gone from the diff.

## Inventory

Bullet status | JS home (ledger) | C range. HEAD file:line via sym in fidelity
rows where checked; `*` = later D re-touched (fidelity pinned to SHA where sampled).

```text
vision_recalc | ported | js/vision.js | C vision.c:512-857
view_from | ported | js/vision.js | C vision.c:2002-2091
get_unused_cs | audited | js/vision.js | C vision.c:274-299
view_init | audited | js/vision.js | C vision.c:1651-1653
meatbox | ported | js/mon.js | C mon.c:1354-1382
replmon | partial | js/mon.js | C mon.c:2515-2556
corpse_chance | ported | js/mhitm.js (+uhitm.js twin) | C mon.c:3181-3249
mongone | ported | js/mon.js | C mon.c:3267-3283
xkilled | partial | js/uhitm.js | C mon.c:3477-3740
setmangry | partial | js/mon.js | C mon.c:4265-4318
wake_nearby | ported | js/mon.js | C mon.c:4367-4370
wake_nearto | ported | js/mon.js | C mon.c:4402-4405
iter_mons | ported | js/mon.js | C mon.c:4527-4538
hideunder | ported | js/monmove.js (+mon.js twin) | C mon.c:4726-4802
pm_to_cham | audited | js/makemon.js | C mon.c:535-546
movemon_singlemon | audited | js/mon.js:3326 | C mon.c:1214-1322
set_mon_min_mhpmax | audited | js/mhitm.js:3535 local (C staticfn) | C mon.c:2808-2823
mon_animal_list | audited | js/makemon.js | C mon.c:4829-4852
mgender_from_permonst | audited | js/makemon.js:1559 | C mon.c:5256-5272
newcham | audited | js/makemon.js:2071 | C mon.c:5278-5535
egg_type_from_parent | audited | js/mon.js:835 | C mon.c:5569-5580
sanity_check_single_mon | partial | js/mon.js | C mon.c:73-255
dmonsfree | partial | js/mon.js | C mon.c:2487-2511
monkilled | partial | js/mhitm.js | C mon.c:3377-3418
unstuck | partial | js/mhitu.js | C mon.c:3438-3467
iter_mons_safe | partial | js/mon.js | C mon.c:4500-4522
vpline | ported | js/display.js* (D-3402) | C pline.c:153-291
dumplogfreemessages | ported | js/display.js | C pline.c:52-60
pline_dir | audited | js/display.js:8126 | C pline.c:114-123
pline_xy | audited | js/display.js:8088 | C pline.c:126-135
You_feel | audited | js/display.js:8192 | C pline.c:388-400
There | audited | js/display.js | C pline.c:425-433
You_see | audited | js/display.js | C pline.c:455-469
verbalize | audited | js/display.js:8230 | C pline.c:476-490
raw_printf | audited | js/display.js | C pline.c:549-558
impossible | audited | js/display.js:8881 | C pline.c:584-634
execplinehandler | audited | js/display.js:8257 local (C staticfn) | C pline.c:641-686
reorder_invent | ported | js/u_init.js | C invent.c:739-767
addinv_core2 | ported | js/u_init.js | C invent.c:1025-1049
look_here | ported | js/invent.js | C invent.c:4104-4315
display_minventory | ported | js/invent.js | C invent.c:5341-5386
mergable | partial | js/mkobj.js | C invent.c:4379-4499
useupf | partial | js/invent.js | C invent.c:4763-4783
loot_classify | partial | js/invent.js | C invent.c:149-305
loot_xname | partial | js/invent.js | C invent.c:309-387
let_to_name | partial | js/invent.js | C invent.c:4800-4839
unsortloot | audited | js/invent.js | C invent.c:647-651
addinv_core0 | audited | js/u_init.js | C invent.c:1056-1148
getobj | audited | js/invent.js:10161 | C invent.c:1752-2089
is_worn | audited | js/invent.js | C invent.c:2156-2161
safeq_xprname | audited | js/pickup.js | C invent.c:2180-2184
prinv | audited | js/invent.js:8651 | C invent.c:2875-2890
doprarm | audited | js/invent.js:8734 | C invent.c:4601-4638
tool_being_used | audited | js/invent.js | C invent.c:4698-4711
free_invbuf | audited | js/invent.js | C invent.c:4845-4850
adjust_ok | audited | js/invent.js local (C staticfn) | C invent.c:4917-4923
adjust_gold_ok | audited | js/invent.js:10347 local (C staticfn) | C invent.c:4927-4933
sensemon | ported | js/display.js:1238 | C display.c:173-176 (+display.h macro)
canseemon | ported (WRONG — no diff; points at dig.js clone) | js/dig.js:207 | C display.c:201-204
feel_newsym | audited | js/display.js | C display.c:726-732
newsym_force | audited | js/display.js | C display.c:1863-1871
check_pos | audited | js/mklev.js | C display.c:3130-3141
set_wall_state | audited | js/mklev.js:34317 local | C display.c:3330-3354
see_monsters | partial | js/display.js | C display.c:1487-1529
docrt_flags | partial | js/display.js | C display.c:1709-1773
show_glyph | split | js/display.js* (D-3402/3403) 4 parts | C display.c:1877-2072
mon_arrive | split (WRONG — dead worm arm) | js/dog.js 3 parts | C dog.c:420-623
mon_catchup_elapsed_time | audited | js/dog.js:1270 | C dog.c:627-724
mon_leave | audited | js/dog.js | C dog.c:729-763
migrate_to_level | partial | js/teleport.js | C dog.c:887-932
discard_migrations | ported | js/dog.js | C dog.c:938-990
wary_dog | partial | js/dog.js:1350 | C dog.c:1292-1359
ledger_to_dnum | ported | js/dungeon.js | C dungeon.c:1402-1416
Is_special | ported | js/dungeon.js:2880 | C dungeon.c:1448-1457
Can_dig_down | ported | js/const.js | C dungeon.c:1649-1654
print_dungeon | ported | js/dungeon.js | C dungeon.c:2290-2438
recbranch_mapseen | ported | js/dungeon.js | C dungeon.c:2446-2475
shop_string | ported | js/dungeon.js local (C staticfn) | C dungeon.c:3441-3455
dumpit | audited | js/dungeon.js | C dungeon.c:91-144
dname_to_dnum | audited | js/dungeon.js | C dungeon.c:284-295
correct_branch_type | audited | js/dungeon.js | C dungeon.c:440-454
insert_branch | audited | js/dungeon.js | C dungeon.c:463-508
pick_level | audited | js/dungeon.js:739 local (C staticfn) | C dungeon.c:632-643
init_dungeon_branches | audited | js/dungeon.js | C dungeon.c:867-930
init_dungeons | audited | js/dungeon.js:1639 | C dungeon.c:1205-1319
Is_branchlev | audited | js/dungeon.js | C dungeon.c:1464-1473
has_ceiling | audited | js/dungeon.js | C dungeon.c:1690-1698
avoid_ceiling | audited | js/dungeon.js | C dungeon.c:1701-1711
ceiling | audited | js/trap.js:3750 | C dungeon.c:1714-1747
free_exclusions | audited | js/mklev.js | C dungeon.c:2582-2593
rm_mapseen | audited | js/dungeon.js | C dungeon.c:2665-2692
remdun_mapseen | audited | js/dungeon.js | C dungeon.c:2811-2832
level_difficulty | partial | js/hacklib.js | C dungeon.c:2027-2084
recalc_mapseen | partial | js/dungeon.js | C dungeon.c:3075-3261
```

94/94 Ledger entries present (94 rows carry D-3401); Left open none (true —
manifest set == declared set).

## C ↔ JS fidelity

Per-sampled-function verdicts (each walked against pinned C; ranges are
`csym.mjs` ranges):

- `newcham` (mon.c:5276-5535) WHOLE — sham/rider/mbirth/mcan gate,
  msg/l_oldname, tryct-20 rogue-upper retry, GENOD, same-form mndx reject,
  mgender, mplayer trim, wormno, seemimic, HP scale+clamp+min-1,
  mleashed/update_inventory, light swap, perminvis/minvis, mundetected,
  ustuck block, long-worm mndx+`get_wormno`+`initworm(rn2(5))`, SHOW_MSG
  3-way, vampire cham, unwield/armor/mselftouch/gear, boulder loop,
  poly_steed, Elbereth `rn1(9,2)` — all present in C order. RNG exact.
- `getobj` (invent.c:1751-2089) WHOLE — cmdq block incl. dead-in-C
  `need_more_cq` (C never sets it; JS fall-through matches), hands rank
  switch, sortloot filter switch, compactify, suggested==0 gate, doagain/
  force_invmenu/yn loop, take-count, QUITCHARS, typed-hands+mime_action
  (C `rn2(2)` present), pickinv redo/ctmp/handsbuf, gold/LRS/throw-one/
  botl/CQ_REPEAT guards, silly_thing, split_otmp+loadstone kludge.
  Remaining drop/wield/apply/takeoff/dip clones are named, pre-existing.
- `impossible` (pline.c:584-634) WHOLE modulo named Rule-#2 omits —
  recursion throw, chop at BUFSZ-1, fuzzer throw, URGENT pline,
  sanity early-return, pbuf2/support (`!= null` ≡ C pointer test),
  CRASHREPORT unit named.
- `vpline` (pline.c:153-291) WHOLE at SHA — D-3401's `ln > BIGBUFSZ-1`
  throw sits exactly at C :213-214 (panic idiom); rest pre-existing.
- `init_dungeons` (dungeon.c:1204-1319) WHOLE — generated-table walk,
  cl-carry, place/add_level, castle_tune, fixup, free_proto, dumpit;
  Lua-state/tbuf/window-clear omits named.
- `mon_catchup_elapsed_time` (dog.c:626-724) WHOLE — devel guards,
  blind/frozen/fleet →1, 3× `rn2(imv+1)` recoveries in order, meating,
  mspec, wilder `rn2`, hungry-pet, leashed, regen heal, lastmove. RNG
  call-for-call.
- `set_wall_state` (display.c:3329-3354) WHOLE — COLNO×ROWNO loop exact;
  WA_VERBOSE is commented out (display.c:138). mklev.js home matches C
  caller side.
- `prinv` (invent.c:2874-2890) WHOLE — totalOf, prefix, xprname arg
  mapping documented, verbose gate.
- `execplinehandler` (pline.c:640-686) WHOLE-as-observable — C staticfn;
  guard return + flag disable mirror the `#else` arm; UNIX fork/exec
  unportable (Rule #2), no observable effect (child process only).
- `mgender_from_permonst` (mon.c:5255-5272) WHOLE — male/female/neuter
  arms + single `!rn2(10)` vampire-guarded flip, exact.
- `movemon_singlemon` (mon.c:1212-1322) WHOLE modulo nit — utotype,
  parked-guard, DEADMONSTER, mon_offmap (macro ≡ mstate check, verified),
  everyturn, movement, vision, bypasses, minliquid, I_SPECIAL, hider/eel
  (`!rn2(4)` after canseemon, exact), Conflict (`dist2` ≡ mdistu),
  dochugw. Nit: C `|| program_state.done_hup` (SAFERHANGUP is defined)
  unnamed — unobservable (no signal delivery in scored runs).
- `mon_arrive` (dog.c:419-623) SPLIT COVERED except C-WRONG — with_you
  (`!rn2(tame?10:peaceful?5:2)` exact) and after_you (catchup wander,
  full xyloc switch incl. PORTAL fallthrough, LEFTOVERS, jitter,
  mx/my, mnearto/rloc, Wiz limbo) whole; BUT `mon_arrive_link`
  long-worm arm `mtmp.data === mons(PM_LONG_WORM)` (js/dog.js:748) is
  DEAD — `mons()` returns a fresh object per call (empirically: two
  `mons(10)` are `!==`), so the identity test is always false and C
  :437-443 (get_wormno/initworm for migrating long worms) never runs.
  Same SHA's meatbox fix + newcham use mndx — this site is the outlier.
- `adjust_gold_ok` (invent.c:4926-4933) WHOLE — 3-line staticfn exact;
  C caller :4998 `check_invent_gold ? adjust_gold_ok : adjust_ok`
  mirrored at js/invent.js:10866.
- `show_glyph` (display.c:1876-2072) SPLIT COVERED at SHA — suppress,
  bad-pos/bad-glyph impossibles with offset chain, map_glyphinfo,
  a11y wanted/emit (condition ≡ C), gbuf store. (memory/flush parts are
  pipeline siblings, not C callees — loose but harmless.)
- `egg_type_from_parent` (mon.c:5568-5580) WHOLE — `BREEDER_EGG`
  (`!rn2(77)`) short-circuit exact.
- `wary_dog` (dog.c:1291-1359) WHOLE — finish_meating now the live
  exact-C export (verified dogmove.c:1447-1457 shape), penalty heal,
  abuse `rn2`, gaze/Pet-Sematary `rn2`×2 in order, newsym/unleash/
  dismount, clean slate. pline-vs-pline_mon named. All 3 C callers
  wired (mon.c:2871→mhitm.js:3566, trap.c:766, zap.c:1005).
- `pline_dir`/`pline_xy`/`doprarm`/`prinv` WHOLE — exact (doprarm slot
  order + noarmor dragon-strip byte-exact).
- `ceiling` (dungeon.c:1713-1747) WHOLE — 10-arm chain exact, uinwater
  idiom.
- `recbranch_mapseen` (dungeon.c:2445-2475) WHOLE — C calls
  find_mapseen (JS switch to it is more faithful), overwrite + both
  impossibles exact.
- `shop_string` (dungeon.c:3440-3455) WHOLE — annotation→name→"shop?"
  plus all 12 C annotation values verified in shknam.c.
- `pick_level` (dungeon.c:631-643) WHOLE — loop + panic→throw exact.
- `verbalize`/`You_feel` WHOLE — flag/quotes/vpline exact.
- `print_dungeon` code WHOLE, citation wrong — Invocation/portal arms
  match C exactly, but D-log + JS comment cite `:2434–2462`
  (recbranch_mapseen); actual arms are :2397–2431. Doc-only.
- `set_mon_min_mhpmax` (mon.c:2806-2823) WHOLE — double floor exact;
  C-staticfn local placement consistent with its lifesave caller.

Non-sampled spot checks (all confirmed): sensemon arm ≡ display.h
macro; vision_recalc underwater/pit else-if ≡ C :589-607; useupf billing
order + NUL-roomCh ≡ C (in_rooms returns string); look_here lava gate ≡
C :4240; rot_corpse arm ≡ C dig.c:2180-2185 (C home is dig.c — citation
right; ledger omit now stale, see below); hideunder seeit is canseemon
in C :4731 (JS is_u skip is pure-call safe); xkilled removal safe
(JS mondead→m_detach→mon_leaving_level→unstuck, lifesave returns first,
verified); m_detach is 3-arg in C too; corpse_chance Vlad arm ≡ C in
both twins; Can_dig_down inline ≡ In_hell+num_dunlevs-1; Is_special
export exact; ledger_to_dnum throw message ≡ C panic; dumplog exact
(DUMPLOG_CORE defined); view_from arms ≡ C; meatbox mndx (mons carries
mndx); mongone guard ≡ C (unstuck body guarded at mon.c:3441).

## Hallucinations / overclaim

- D-log C-locus for `canseemon` ("see_with_infrared alternative +
  See_invisible allowance") describes the live display.js:1097 export
  (verified whole) — but the Ledger bullet claims `ported` with no diff
  and the ledger row points at js/dig.js:207, a divergent clone lacking
  exactly those arms. Declaration is wrong on home, status, and content.
- No other overclaim: "Match C" dispatch claims all ride live callees
  (m_detach, grddead, obfree, finish_meating, findpriest, addtobill,
  stolen_value, confers_luck, set_moreluck verified live); no
  dispatch-ported/callee-stubbed arm found in the diff.

## Density

Breadth batch: manifest-exact (94/94, files+functions), ≤100 fns, 0 Left
open, no bundled Must-fix, per-function Ledger entries + D-log Verify.
Rot_corpse expose arm is legitimate caller-wiring of manifest fn
hideunder (C dig.c:2180-2185), not an out-of-manifest port — but it
ships a ledger-recorded omit (D-1213) without retiring it: the
`rot_corpse` row still lists the shipped arm. Ledger-nit (sweep
candidate with the print_dungeon citation + done_hup name).
SHA verdict = worst sampled verdict = mon_arrive/canseeemon C-wrongs →
QUALITY-RISK.

## Verification

- Re-measured all 27 sampled fns in one call:
  `hidden-proxy.mjs verify <27> --base e77f3975a~1 --reach-all` → every
  fn "0 session(s) blocked"; smoke 24/24 PASS ×24 fns; reach
  mgender_from_permonst 90/90, movemon_singlemon 15/15, mon_arrive
  154/154 — 0 regressed everywhere → REACH-OK. Consistent with the
  D-log "94/94 REACH-OK (708 sweep, 0 regressed)". No REGRESSED session.
- `imports.mjs --rulecheck` → Rule #2 clean (run this iteration).
  Diff grep: only NODIAG/IS_STWALL identifier hits — no FORCE/DIAG/
  getRngLog/seed/fastforward/coordinate gates. New imports are all
  hoisted-fn runtime-use inside the SCC (same pattern as prior SHAs).
- Full-44/44 + green + strict + cohort claims re-proven by the
  end-of-iteration fortress rescore on this tree.

## Actionable C-wrongs

1. `mon_arrive` long-worm arm dead + `mons()` identity family — C
   dog.c:437-443 compares `mtmp->data == &mons[PM_LONG_WORM]` but
   js/dog.js:748 `mtmp.data === mons(PM_LONG_WORM)` is always false
   (`mons()` allocates fresh per call — measured). Same always-false/
   always-true pattern at 9 more pure sites: js/eat.js:2744,2745,2748
   (`uniq=false` never runs), js/trap.js:343 (`golem_xform`
   always-true; C trap.c:753 is a pointer compare), js/zap.js:3563,
   js/zap.js:5276, js/zap.js:5313, js/wizard.js:158,159,429. Fix: mndx
   compare per site (meatbox/newcham idiom), each verified vs its C
   locus; leave the 4 already-safe mndx-fallback sites
   (potion.js:3783, zap.js:3828/4480, priest.js:505) or drop the dead
   arm. One iter (10 one-line flips + verify incl. full: shared files).
2. `canseemon` divergent clones + wrong declaration — D-3401 declares
   `canseemon ported` → js/dig.js:207 with no diff; dig.js:207 and
   js/monmove.js:1326 diverge from C display.h:117-120 (no
   see_with_infrared arm, `!minvis` instead of mon_visible =
   See_invisible+mundetected), both CALLED (dig.js ×5 sites, monmove
   :1112); js/monmove.js:1337 `canspotmon` drops the sensemon arm (C:
   canseemon||sensemon), called at :1601. Live display.js:1097 +
   display.js:1408 verified whole. Fix: delete the 5 canseemon locals
   (dig/monmove/mthrowu/muse/trap — last 3 are exact dupes) + monmove
   canspotmon → import live exports; `ledger.mjs set canseemon ported
   --js js/display.js:canseemon --note "audited: whole vs C; clones
   retired"`. One iter (wake_nearby-deletion pattern + verify).

Verdict: **QUALITY-RISK**
