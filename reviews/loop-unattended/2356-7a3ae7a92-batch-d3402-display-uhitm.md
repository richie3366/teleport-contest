# Review 2356 — 7a3ae7a92 — batch display/rnd/potion/end/pager/pline/cmd/uhitm (D-3402)

- SHA: `7a3ae7a92` — "batch @e77f3975a: display/rnd/potion/end/pager/pline/cmd/uhitm remainder (100 fns, 0 left open) (D-3402)."
- D-entry: D-3402. Diff: 14 js files, +511/−166; ledger + journal + index + scoreboard.
- Manifest check: reproduced `ledger.mjs batch` in a worktree at base
  `e77f3975a`: "100 function(s) in display/rnd/potion/end/pager/pline/cmd/
  uhitm — open 0 · partial 41 · recheck 59". BUT the Ledger bullet declares
  101 entries: the 100 manifest fns + `lspo_reset_level` (sp_lev.c), which
  the picker did not name. Batch ≠ manifest and >100 functions.
- Fixed sample (19): hot-12 `make_blinded really_done vpline do_look rn2
  rnl mhitm_ad_slim show_direction_keys rnz get_changed_key_binds dokeylist
  docontact`; random-4 `do_run_southwest look_engrs dosh_core
  hmon_hitmon_msg_lightobj`; audited-3 `readchar_core levltyp_to_name
  dumplogfreemessages` (4th draw `do_look` already in hot set — audited
  once). Second sample of 8 (wrong `ported` found): `get_adjacent_loc
  hmon_hitmon_misc_obj do_run_north cmd_from_func hmon_hitmon_splitmon
  do_rush_north do_rush_northeast do_rush_west`. Later-D members
  (really_done, mhitm_ad_slim, lightobj, misc_obj) pinned to SHA blobs.

## Intent vs deliverable

Promise: 100 manifest fns whole in C order; shared more()/bot() resync;
do_attack safemon; rhack grid-bug; makemap_prepost prize/digging/polearm;
lspo NULL form wired.

Diff actually adds: display (clear_nhwindow resync, show_glyph bg gate,
swallow-glyph ttychar, resync_map_row0, topline-only more + unwrap resync,
paint_status_grid + bot() call), pager (mhidden surface(), swallow decode,
def_warnsyms fallback, dowhatdoes ALTMETA, dohelp positional keys), uhitm
(munstone ×2, do_attack safemon+override+twoweapon), mhitu (do_stone_u,
stone awaits), mthrowu (hit verbosity), cmd (rhack m-prefix + grid-bug ×3,
act_on_act doidtrap static), mklev (lspo_reset_level new, Is_mineend/
Is_sokoend exports), wizcmds (lspo call, prize revoke, digging/polearm
resets), polyself (domonability steed), potion (make_slimed clear), end
(done_hup + time_botl), input (fuzzer randomkey), dogmove/mhitm (exports/
comment). Plus the unmanifested 101st function (lspo). Promise ==
deliverable modulo the overage and two misdeclared `ported` (below).

`sym.mjs` on the one re-point (no deletions this SHA):

```text
doidtrap         js/pager.js:2666   ASYNC — await required
```

Already a static import in cmd.js:102 — the dynamic re-import removal is safe.

## Inventory

Bullet status | ledger JS home | C range (101 entries; `*` = later-D note fix):

```text
see_monsters | audited | js/display.js | C display.c:1487-1529
docrt_flags | audited | js/display.js | C display.c:1709-1773
show_glyph | ported | js/display.js 4 parts | C display.c:1877-2072
rn2 | audited | js/rng.js | C rnd.c:95-107
rnl | audited | js/rng.js | C rnd.c:112-151
rnz | audited | js/rng.js | C rnd.c:214-229
make_slimed | ported | js/potion.js | C potion.c:195-218
make_blinded | audited | js/do.js:3663 | C potion.c:261-331
drink_ok | audited | js/potion.js | C potion.c:505-521
peffect_oil | audited | js/potion.js | C potion.c:1260-1294
dip_ok | audited | js/potion.js | C potion.c:2214-2227
dip_hands_ok | audited | js/potion.js | C potion.c:2231-2237
poof | audited | js/potion.js | C potion.c:2408-2413
done | ported | js/end.js | C end.c:1020-1126
really_done | ported (WRONG — no diff; D-3403 re-audited*) | js/end.js:1045 local | C end.c:1130-1590
monhealthdescr | audited | js/pager.js | C pager.c:138-163
trap_description | audited | js/pager.js | C pager.c:167-181
mhidden_description | ported | js/pager.js | C pager.c:186-280
object_from_map | audited | js/pager.js | C pager.c:284-377
waterbody_name | audited | js/hack.js | C pager.c:561-611
do_screen_description | ported | js/pager.js | C pager.c:1247-1627
do_look | audited | js/pager.js:2676 | C pager.c:1673-1963
look_all | partial | js/pager.js | C pager.c:1979-2074
look_engrs | partial | js/pager.js:2406 local | C pager.c:2144-2228
dowhatdoes | ported | js/pager.js | C pager.c:2659-2715
docontact | audited | js/pager.js:3422 | C pager.c:2718-2745
dohelp | ported | js/pager.js | C pager.c:2860-2899
dumplogfreemessages | audited | js/display.js | C pline.c:52-60
vpline | audited | js/display.js | C pline.c:153-291
cmdq_add_key | audited | js/invent.js | C cmd.c:274-290
pgetchar | audited | js/cmd.js | C cmd.c:445-453
domonability | ported | js/polyself.js | C cmd.c:890-949
enter_explore_mode | audited | js/cmd.js | C cmd.c:952-983
makemap_prepost | ported | js/wizcmds.js | C cmd.c:986-1067
levltyp_to_name | audited | js/cmd.js:663 local | C cmd.c:1089-1094
do_move_* ×8 | audited | js/cmd.js locals | C cmd.c:1404-1457
do_rush_* ×8 | audited | js/cmd.js locals (3 sampled) | C cmd.c:1461-1514
do_run_* ×8 | audited | js/cmd.js locals (2 sampled) | C cmd.c:1518-1571
extcmds_getentry | audited | js/getline.js | C cmd.c:2101-2106
get_changed_key_binds | audited | js/cmd.js:1558 | C cmd.c:2235-2287
handler_change_autocompletions | audited | js/cmd.js | C cmd.c:2449-2515
extcmds_match | audited | js/getline.js | C cmd.c:2523-2558
keylist_putcmds | audited | js/dokeylist.js | C cmd.c:2802-2863
dokeylist | audited | split dokeylist_lines+show_text_pages | C cmd.c:2867-3013
cmd_from_func | audited | js/dokeylist.js:553 | C cmd.c:3036-3066
key2txt | audited | js/dokeylist.js | C cmd.c:3225-3240
parseautocomplete | audited | js/cmd.js | C cmd.c:3244-3292
reset_commands | audited | js/cmd.js | C cmd.c:3344-3476
randomkey | ported | js/cmd.js | C cmd.c:3517-3578
rhack | ported | js/cmd.js | C cmd.c:3627-3843
xytodir | audited | js/const.js | C cmd.c:3847-3855
get_adjacent_loc | audited | js/lock.js:811 | C cmd.c:3931-3953
show_direction_keys | audited | js/dokeylist.js:797 | C cmd.c:4122-4165
mcmd_addmenu | audited | js/cmd.js | C cmd.c:4421-4431
act_on_act | ported | js/cmd.js | C cmd.c:4658-4838
readchar_core | audited | js/cmd.js:1202 | C cmd.c:5213-5272
readchar | audited | js/cmd.js | C cmd.c:5276-5284
dosuspend_core | audited | js/cmd.js | C cmd.c:5662-5678
dosh_core | audited | js/cmd.js:1513 (status partial: dosh() Rule-#2) | C cmd.c:5682-5696
do_attack | ported | js/uhitm.js | C uhitm.c:448-583
hmon_hitmon_barehands | audited | js/uhitm.js | C uhitm.c:838-882
hmon_hitmon_misc_obj | partial | js/uhitm.js (omit fixed by D-3406*) | C uhitm.c:1119-1383
hmon_hitmon_poison | audited | js/uhitm.js | C uhitm.c:1510-1538
hmon_hitmon_jousting | audited | js/uhitm.js | C uhitm.c:1541-1567
hmon_hitmon_splitmon | ported (WRONG — no diff; note still missing) | js/uhitm.js:1714 local | C uhitm.c:1604-1634
hmon_hitmon_msg_hit | ported (shared hit() omit retired) | js/uhitm.js | C uhitm.c:1637-1660
hmon_hitmon_msg_lightobj | partial | js/uhitm.js:1672 local @SHA | C uhitm.c:1702-1730
first_weapon_hit | partial | js/uhitm.js | C uhitm.c:1963-1989
mhitm_ad_dren | audited | js/mhitm.js | C uhitm.c:2418-2442
mhitm_ad_fire | split 2/3 parts | js/mhitm.js+mhitu.js | C uhitm.c:2521-2623
mhitm_ad_tlpt | split 2/3 parts | js/mhitm.js+mhitu.js | C uhitm.c:2859-2955
mhitm_ad_drst | partial | js/mhitm.js | C uhitm.c:3122-3165
mhitm_ad_drin | split 3/3 parts | js/uhitm.js+mhitm.js+mhitu.js | C uhitm.c:3168-3303
mhitm_ad_stck | partial | js/mhitm.js | C uhitm.c:3306-3334
mhitm_ad_slim | split 2/3 parts (uhitm arm live, unlisted) | js/mhitm.js+mhitu.js | C uhitm.c:3526-3600
mhitm_ad_conf | audited | js/mhitm.js | C uhitm.c:3690-3726
mhitm_ad_poly | split 2/3 parts | js/mhitm.js+mhitu.js | C uhitm.c:3729-3774
mhitm_ad_deth | partial | js/mhitm.js | C uhitm.c:3837-3894
do_stone_u | ported | js/mhitu.js | C uhitm.c:3924-3942
lspo_reset_level | partial (NON-MANIFEST 101st; completed by D-3406*) | js/mklev.js | C sp_lev.c:5993-6010
```

101 declared; Left open none (true — manifest ⊆ declared).

## C ↔ JS fidelity

Sample verdicts (all walked vs pinned C):

- `make_blinded` WHOLE — probe/Unaware/regain/clear-lose/set arms exact.
- `really_done` body WHOLE (full 250-line JS vs C :1130-1590 skeleton:
  gameover→terminate order, bones/score/valuables/RIP/topten blocks all
  present; DUMPLOG/windowing adaptations named) BUT `ported` is WRONG:
  both end.js arms (done_hup disjunct, `time_botl=false`) sit in C
  `done()` :1036-1044 — really_done got no diff. Should be `audited`.
- `vpline` WHOLE (D-3401 throw re-affirmed, no new diff).
- `do_look` WHOLE — cmdq/goto, quick/menu, full switch (look_all ×4,
  traps ×2, engrs ×2), getpos loop, describe+checkfile gate.
- `rn2`/`rnl`/`rnz` WHOLE — exact incl. `t+rnd`/`d(3,2)`/`y+z`; x<=0
  guard is defensive (no scored divergence).
- `mhitm_ad_slim` SPLIT COVERED at SHA — mhitm/mhitu/uhitm
  (damageum_ad_slim) arms all exact; split map lists 2/3 (nit).
- `show_direction_keys`/`get_changed_key_binds`/`dokeylist`/
  `docontact`/`do_run_southwest` WHOLE (dokeylist split parts live).
- `look_engrs` partial CORRECT (body ≡ C; omits are D-2521's three —
  ledger pointer vague, nit).
- `dosh_core` partial CORRECT (SHELL defined → dosh() unportable,
  named; Norep text is the only Rule-#2 rendering).
- `hmon_hitmon_msg_lightobj` partial CORRECT at SHA (3-way fmt +
  flesh-suffix order exact; saved_oname fill remains named).
- `readchar_core`/`levltyp_to_name`/`dumplogfreemessages` WHOLE.
- Second sample: `get_adjacent_loc` WHOLE (all 4 C callers pass
  u.ux/u.uy — dropped params safe); `cmd_from_func` WHOLE (walk/
  space/digit/printable/oldest-wins exact); `do_run_north`/
  `do_rush_north`/`do_rush_northeast`/`do_rush_west` WHOLE one-liners;
  `hmon_hitmon_misc_obj` partial CORRECT at SHA (munstone arms ≡
  C :1160) BUT its D-3402 row omit was copy-pasted
  ("look_all/look_engrs: prior ..." — already repaired by D-3406);
  `hmon_hitmon_splitmon` body WHOLE (mndx pudding compare ✓ — the
  correct idiom) BUT `ported` is WRONG (no diff, no retired omit for
  it; should be `audited`, note still missing).

Non-sample spots (confirmed): do_attack safemon ≡ C (foo/rn2(7)/
inshop/dopay/monflee/frozen arms + tail live); mstrategy-clear removal
correct (C clears only :529/:573); override FALSE + twoweapon gates ≡
C; do_stone_u exact; makemap_prepost prize/digging/polearm ≡ C
cmd.c:1000-1022; lspo NULL form whole; hit() verbosity ≡ C zap.c:3558;
munstone ≡ C; mhidden trapper surface() call exact; dowhatdoes ALTMETA
(ALTMETA defined) + dohelp positional exact (PORT_HELP compiled out —
no phantom row); make_slimed exact; domonability steed exact (code;
citation off); ledger_to_dnum n/a here. more()/bot() shared resync is
the highest-risk change — carried by gates (green + full 44/44).

Citation/doc nits (code right): domonability `:940–942` → actual
:955–965; surface `:269–271` → dungeon.c:1749–1788; bot "bot.c" →
botl.c; C-locus "makemap: mklev.c:1000–1008" → makemap_prepost/cmd.c;
grid-bug triplication drops C's `!travel` conjunct (unverified edge —
grid-bug+travel+diagonal; note for the next rhack touch).

## Hallucinations / overclaim

- "100 fns" subject + "100/100 REACH-OK" while 101 fns declared.
- `really_done ported` + `hmon_hitmon_splitmon ported` with no diff
  touching either (splitmon's "shared hit omit" claim fits msg_hit,
  which calls hit(), not splitmon).
- No dispatch-vs-callee overclaim: new arms ride live callees
  (munstone, dopay, remove_achievement, surface, create_des_coder).

## Density

Batch fails manifest-exactness: 101 declared (100 manifest +
non-manifest sp_lev.c fn), over the 100-function cap. Code-wise the
overage is faithful caller-wiring (lspo NULL form whole, since
completed by D-3406) — the defect is process + declaration accuracy
(4 declaration defects, 3 already healed downstream). Per-function
Ledger entries present; Left open none (true). SHA verdict = worst
sampled = wrong `ported` ×2 → QUALITY-RISK.

## Verification

- Re-measured all 19 sampled fns in one call (`--base 7a3ae7a92~1
  --reach-all`): make_blinded "3 blocked → 1 PASS, 2 moved past,
  0 worse → PROGRESS" (matches D-log exactly); other 18 "0 blocked" +
  smoke 24/24 PASS → REACH-OK. Zero regressed.
- `imports.mjs --rulecheck` → Rule #2 clean (this iteration). Diff
  grep: no FORCE/DIAG/getRngLog/seed/fastforward/coordinate gates.
- Full-44/44 + green + strict claims re-proven by the end-of-iteration
  rescore on this tree.

## Actionable C-wrongs

1. D-3402 declaration repair (wrong `ported` ×2 + overage accounting)
   — `hmon_hitmon_splitmon` declared `ported` with no diff and no
   retired omit (body verified whole in review 2356):
   `ledger.mjs set hmon_hitmon_splitmon ported --note "audited D-3402:
   whole vs C"` (really_done's twin defect already healed by D-3403;
   misc_obj's pasted omit already healed by D-3406 — confirm both in
   the fix); audit the remaining 101 D-3402 rows for present accurate
   notes. One iter (ledger-only + verify).

Verdict: **QUALITY-RISK**
