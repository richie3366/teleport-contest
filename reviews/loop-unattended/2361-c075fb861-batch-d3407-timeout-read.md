# Review 2361 — c075fb861 — batch D-3407 timeout/read/sounds/role (85 fns)

- SHA: `c075fb861` (batch @e3dc5ab18, D-3407). Files: js/read.js,
  js/timeout.js, js/mon.js, js/sounds.js, js/roles.js, js/save.js,
  js/wield.js, js/monmove.js + 4 small; ledger uhitm/mklev/sounds/role/
  insight/artifact/wield/region/mon/read/timeout; scoreboard.json. No
  js/ edits here.
- Method: fixed sample — hot-12, random-4, audited-3 (arti_invoke,
  record_achievement, sanity_check_single_mon — all in-sample). True
  manifest from the commit's ledger diff: 85 `+` rows, SETS-IDENTICAL
  with live DB. Picker reproduction at base (worktree @e3dc5ab18):
  MANIFEST-EXACT (85/85). Diff statuses: ported 54 · partial 21 ·
  split 2 · by-design 8 · open 0.
- Second-sample obligation: 4 wrong-audited rows in-sample (below).
  Discharged by FULL-population audit — all 21 partial rows' omits
  checked one by one (not just 8 more), family fully characterized.

## Intent vs deliverable

Promise: "85 whole C functions (0 left open)"; ~25 named arms; two
blocked-session fixes (role_init restore burn → 4 sessions moved past;
xkilled earth-death drain → Ranger-94223 PASS 132/132); "Stale omits
retired: …"; "Unshippable omits … cleared"; "Named: none — every
manifest omit either shipped above or was judged unshippable …
no partial remains."
Delivers: the CODE work is real and C-exact throughout (see Fidelity).
The LEDGER work is not: 14 of the 21 rows stamped "audited D-3407:
remaining omit cannot ship" carry STALE omits for already-shipped
code — the author verified the code, wrote accurate prose, but never
updated the rows' omit fields, then certified them unshippable.
"Named: none" / "no partial remains" are false (21 partials with text;
13 fully stale, 1 partially stale). The "open 8" breakdown = the 8
by-design nosound_* rows (empty C bodies, legitimate); the "partial
36 · recheck 41" split is the usual vocabulary drift (sums to 85).

## Inventory (sampled; full manifest /tmp/d3407-diff.txt)

Hot-12: weapon_insight insight.c:1269-1465, randrole role.c:718-728,
glow_verb artifact.c:2450-2462, print_queue timeout.c:2013-2037,
forget read.c:1019-1040, mktrap_victim mklev.c:1814-1934,
traptype_rnd mklev.c:1937-1998, Mb_hit artifact.c:1249-1434,
arti_invoke, basics_enlightenment insight.c:727-823, youhiding
insight.c:2021-2077, record_achievement insight.c:~2412-2461.
Random-4: drop_boulder_on_monster read.c:2341-2410,
sanity_check_single_mon mon.c:72-255, nosound_init_nhsound
sounds.c:1917-1919, restore_timers timeout.c:2706-2728.

## C ↔ JS fidelity (code: every new hunk walked vs pinned C)

- seffect_remove_curse (:1489-1605): shop_h2o billing (:1558-1567,
  alter_cost up / COST_UNCURS), saddle via live which_armor with the
  amber Yobjnam2/hcolor glow + Hallu?0:1 bknown (:1579-1593),
  Punished→unpunish + buried-ball clasp + update_inventory tail
  (:1597-1603, runs even when cursed) — exact.
- Earth/fire drains + doread gameover skip (the xkilled fix): drain
  placed immediately after losehp at seffect end (C noreturn order);
  doread skips post-read identify/useup when gameover (scroll stays
  for death disclosure, like C) — sound, session-evidenced
  (Ranger-94223 PASS 132/132 ✓ in scoreboard).
- do_class_genocide/do_genocide: both POLY_REVERT arms (live D-2262
  polyself, dynamic import), hallu type names (Upolyd pmname / role
  name + lowc), delayed_killer(POLYMORPH)+udeadinside, update_inventory
  — exact. Stale-newcham-note claim true (:3354 is another function).
- nh_timeout: ucreamed/ugallop ticks, STONE_RES wielding_corpse pair,
  10 expiry arms (VOMITING/SEE_INVIS/FLYING/FIRE_RES/WWALKING/
  WARN_OF_MON/PASSES_WALLS/MAGICAL_BREATHING/GLIB/PROT_FROM_SHAPE)
  all exact, incl. was_flying snapshot, Wwalking waterlevel exclusion
  (youprop.h:260), warntype clear + pmnames message, stuck_in_wall
  hemmed/normal-unusual, Breathless≡hero_magical_breath. do_storms
  buzz exact. All 4 import extensions `--can` ALREADY.
- replmon → async over live relmon (sync mirror retired); :2703
  unstuck runs via relmon→mon_leaving_level→unstuck ✓; sole caller
  zap.js:3187 awaited ✓ (message's ":3138" is line drift).
- whimper: MEW/GROWL→whimper, BARK→whine, SQEEK→squeal+se,
  Soundeffect !Hallu, nomul, unconditional wake_nearto — exact (old
  map had BARK/GROWL swapped ✓ fixed). dochat Deaf/Blind/Hallu macro
  predicates exact. dogenocided menu_requested fix ✓ (dovanquished
  :2772 keeps its clear); doattributes ECMD_OK ✓; dowield cantwield
  gate + ECMD_FAIL→0 ✓; monmove mwelded clone DELETED → live
  will_weld export ✓ (`sym.mjs mwelded`: single export, no clones);
  stuck_in_wall exported ✓; role_init at dorecover :596 with
  pantheon save/restore ✓ (4 sessions moved past ✓ in scoreboard).
- Sampled audits (bodies): weapon_insight (structure + armor/food/
  venom + skill gate match; "whole" holds), randrole (roles[13+1]
  terminator ⇒ rn2(13) both sides ✓), glow_verb, print_queue
  (VERBOSE_TIMER unconditionally defined ⇒ name form ✓), forget,
  mktrap_victim (RNG call-for-call), traptype_rnd (all gates),
  Mb_hit (RNG order identical: rn2(11|7)→4×rnd(4)→rn2(2)→rn2(3|s|)→
  rn2(12)), basics_enlightenment (split builders, C order),
  youhiding (all arms incl. pit/spiked + both output forms),
  drop_boulder (engulfing_u macro ≡ JS conjunct, verified
  monst.h:250; Deaf() macro ✓), sanity_check_single_mon (22/22 live
  diagnostics; 3 absent arms all inside C `#if 0` ✓ correctly
  omitted), nosound_init_nhsound (empty ✓).

## Hallucinations / overclaim

- "Stale omits retired: …" lists 8 retires that are PROSE-ONLY — the
  rows still carry the omit text: setuwep :1103 (caller live
  uhitm.js:1840 ✓ code), start_timer wish-corpse (caller live
  readobjnam.js:2366 WITH the rn1 draw ✓ code; row cites wrong line
  1678 = another function), mkinvokearea deadbook (caller live
  spell.js:842 ✓ code), Mb_hit/arti_invoke caller notes (all 6
  retouch sites live: eat.js:2109, attrib.js:907, polyself ×3,
  mhitu.js:2750 ✓ code). "Unshippable … cleared" likewise: the 7×
  replmon-unstuck rows (unstuck live ✓ code), fill_ordinary_room
  recount (live via D-3406 set_levltyp ✓ code), record_achievement
  ACH_INVK ("no arti1_primed ritual in js/" — ritual live at
  spell.js:797-845 calling record_achievement(ACH_INVK) ✓ code).
- "audited D-3407: remaining omit cannot ship" stamped on all 21
  partials certifies these stale omits as unshippable — 13 rows
  fully stale (7 unstuck + setuwep + start_timer + mkinvokearea +
  fill_ordinary_room + arti_invoke + record_achievement-sub-omit…
  record_achievement is partial-stale: SoundAchievement/really_done
  sub-omits legitimate) + restore_timers "whole vs C" false while
  its own code doc names the unshipped ghostly bones adjust
  (:2722-2723). Total 14 false certifications.
- The 8 legitimate "cannot ship" rows: Mb_hit (wizcustom owned-row +
  transient saveload), youhiding (neighbor arms owned by
  status_enlightenment row), makerooms/themerooms (lua/in_lua —
  in_lua confirmed writer-only, no readers), recharge/
  seffect_destroy_armor (foreign clones owned by other rows —
  borderline but documented), genl_player_setup/plsel_startmenu
  (arch). "no partial remains" false either way.
- Verification claims all TRUE (see below) — the overclaim is
  ledger-only, not corpus. No dispatch/callee-stub shape; no new
  clones (one deleted).

## Density

Per-function verdicts: weapon_insight ACCEPT; randrole ACCEPT;
glow_verb ACCEPT; print_queue ACCEPT; forget ACCEPT; mktrap_victim
ACCEPT; traptype_rnd ACCEPT; Mb_hit ACCEPT; arti_invoke
QUALITY-RISK (row omit fully stale); basics_enlightenment ACCEPT;
youhiding ACCEPT; record_achievement QUALITY-RISK (ACH_INVK
sub-omit false); drop_boulder_on_monster ACCEPT;
sanity_check_single_mon QUALITY-RISK (body whole; row omit stale);
nosound_init_nhsound ACCEPT; restore_timers QUALITY-RISK (row
claims whole; ghostly arm named-unshipped). SHA verdict = worst =
QUALITY-RISK. Batch conformance: exactly 85 rows, manifest ==
picker (MANIFEST-EXACT), 0 Left open by status; fails on ledger
truth, not counts. No non-manifest js function (earth/doread fixes
ride pre-existing ported rows, disclosed).

## Verification

- D-log: role_init PROGRESS (4 moved past), xkilled PROGRESS
  (94223 PASS 132/132), sweep 714/0-regressed, all gates green.
  Scoreboard diff confirms all 5: 94186 role_init→welcome@233,
  94067 →yn_function@106, 94140 (scen-terrain-Wizard) role_init@144
  →yn_function@145, 94125 →trapeffect_landmine@33, 94223 passed.
- Re-measured on all 16 samples + role_init in one call
  (`--base c075fb861~1 --reach-all`, /tmp/verify-3407.txt): 17/17
  REACH-OK, 0 regressed, no WORSE. role_init: "0 PASS, 4 moved past
  (1 re-attributed at the same step), 0 unchanged, 0 worse →
  PROGRESS" — genuine, matches D-log + scoreboard (D-1831 pattern
  absent). 16 samples: all vacuous-verify (0 blocked, consistent
  with no-block notes) + 16 smokes/reaches PASS.
- `imports.mjs --rulecheck`: clean ✓. Diff grep: only hit is the
  pre-existing `NODIAG` constant in an extended import — clean ✓.
- `sym.mjs mwelded` (required paste — diff deletes the monmove
  local): `mwelded  js/wield.js:186  sync` — no clones remain ✓.

## Actionable C-wrongs

1. D-3407 false ledger certifications (14 rows) — rows stamped
   "audited D-3407: remaining omit cannot ship" / "whole vs C"
   whose omits already shipped: the 7 replmon-unstuck rows
   (sanity_check_single_mon, dmonsfree, monkilled, unstuck,
   xkilled, setmangry, iter_mons_safe — unstuck live via
   relmon→mon_leaving_level), setuwep (:1103 caller live
   uhitm.js:1840), start_timer (wish-corpse caller live
   readobjnam.js:2366; cited :1678 is another function),
   mkinvokearea (deadbook caller live spell.js:842), arti_invoke
   (all 6 retouch_equipment callers live), fill_ordinary_room
   (recount live via D-3406 set_levltyp),
   record_achievement (drop only the ACH_INVK sub-omit — ritual
   live spell.js:797-845; keep SoundAchievement/really_done),
   restore_timers (row → partial + omit "ghostly bones adjust
   :2722-2723 deferred" per its own code doc; arm needs the
   bones caller). Fix (one iter, ledger-only + verify): drop the
   stale omits, flip fully-empty rows to ported, correct the two
   partial rows, re-run `hidden-proxy verify` on the 14. **Addressed:** D-3411 `6dac15066`

Verdict: **QUALITY-RISK**
