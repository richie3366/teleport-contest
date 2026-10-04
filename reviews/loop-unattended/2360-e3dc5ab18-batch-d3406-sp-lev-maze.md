# Review 2360 — e3dc5ab18 — batch D-3406 sp_lev/pickup/shk/maze (100 fns)

- SHA: `e3dc5ab18` (batch @44ce1ba38, D-3406). Files: js/mklev.js,
  js/pickup.js, js/shk.js, js/mhitm.js, js/mhitu.js, js/uhitm.js,
  js/mkobj.js, js/teleport.js, js/zap.js, js/detect.js, js/mcastu.js,
  js/alloc.js, js/trap.js + 8 small; ledger sp_lev/pickup/mkobj/uhitm/
  detect/teleport/selvar/alloc/mkmaze/mcastu/shk. No js/ edits here.
- Method: fixed sample — hot-12, random-4, audited-3 (fmt_ptr,
  fixup_special, walkfrom — all overlap other samples). True manifest
  from the commit's ledger diff: 100 `+` rows, SETS-IDENTICAL with live
  DB `d like '%D-3406%'`. Picker reproduction at base (worktree
  @44ce1ba38): MANIFEST-EXACT (100/100).
- The 12 non-overlapping samples are all pure audits (no JS change in
  this diff); the new-code review below covers every added hunk.

## Intent vs deliverable

Promise: "100 whole C functions (open 0 · partial 43 · recheck 57)"
sp_lev(23)/pickup(8)/mkobj(14)/uhitm(12)/detect(3)/teleport(8)/selvar(6)/
alloc(5)/mkmaze(9)/mcastu(3)/shk(9); ~20 named arms ported; fmt_ptr moved
to js/alloc.js; fixup_special guard removal reverted after a fortress
regression; rule2 self-hit (seed in comment) removed mid-batch.
Delivers exactly that. Diff statuses: ported 91 · partial 5 · split 4 ·
open 0 (message's "partial 43 · recheck 57" is the same vocabulary
drift as D-3405 — sums to 100, "0 left open" holds; nit). The revert
is real (guard present + rationale comment), the seed string is gone
(diff grep clean).

## Inventory (sampled; full manifest /tmp/d3406-diff.txt)

Hot-12: mhitm_ad_slim uhitm.c:3525-3600, food_detect detect.c:478-594,
doloot_core pickup.c:2177-2346, mcast_spell mcastu.c:800-897, walkfrom
mkmaze.c:1231-1275, nohandglow uhitm.c:6314-6337, get_room_loc
sp_lev.c:1359-1378, monster_detect detect.c:~820-860, mcast_insects
mcastu.c:644-726, set_levltyp_lit mkmaze.c:125-145, fixup_special
mkmaze.c:569-704, stolen_booty mkmaze.c:798-889. Random-4:
dealloc_oextra mkobj.c:95-111, check_contained mkobj.c:3373-3416,
fmt_ptr alloc.c:125-135, get_mkroom_name sp_lev.c:3990-4001.

## C ↔ JS fidelity (every new hunk walked vs pinned C)

- fmt_ptr MOVE (random-4): body byte-identical (o_id/m_id 0x-hex) from
  js/mkobj.js to C-home js/alloc.js; 3 users re-imported (mkobj.js:13,
  light.js:19, teleport.js); `sym.mjs fmt_ptr` → single export
  js/alloc.js:96, no clones ✓. check_contained's 3 fmt_ptr call sites
  resolve through the new import ✓.
- set_levltyp (trap.js): arboreal SDOOR→AIR hack (:82-87), is_ice
  (was ICE-only) → obj_ice_effects + spot_stop_timers (:101-105),
  fountain/sink recount via count_level_features (:106-108) replacing
  the incremental ±1 — exact; 8 caller wirings (IRONBARS :784, STAIRS
  :1737/:2195, GRAVE :1695, filltype :250, DOOR/SDOOR :1803, SINK,
  FOUNTAIN) verified. mksink/mkfount double-count (mklev.c:2299/:2328
  `++` after recount) reproduced, documented, not fixed ✓.
- clear_no_charge_obj: the C quirk verified from values —
  OBJ_CONTAINED|OBJ_BURIED = 2|6 = 6, CONTAINED_TOO=0x1 (unset),
  BURIED_TOO=0x2 (set) — buried resolves, contained clears; live
  get_obj_location honors the flags; OR-chain → early-returns in C
  order. Old code had it backwards; real fix ✓.
- money2mon: impossibles exact (:160-167, incl. double-space no-gold
  text); quiver arm inlines remove_worn_item(ygold,FALSE) as
  `uquiver?uqwepgone:setnotworn` — proven equivalent: gold cannot be
  wielded (wield_ok EXCLUDEs COIN_CLASS, wield.c:336) so quiver is the
  only worn state; W_WEAPONS dispatch + catchall + donning/in_use all
  reduce to the inline ✓.
- home_shk (:1317-1328): mnearto TRUE/RLOC_NOMSG + has_shop + killkops
  + after_shk_move ✓. poly_obj shop bill (zap.c:1965-1986): gate,
  `*in_rooms` empty→0 handling, no_charge/contained_cost (newly
  exported)/inhishop, angry/furious arms ✓; zap→shknam `--can` ALREADY.
- query_objlist INCLUDE_HERO (pickup.c:1039-1188): flag, `!olist &&
  !engulfer`, minvent detect, dual AUTOSELECT clears, ++n, heading +
  CONTAINED_SYM fake row (display-RNG named), fake/worn pick rejects —
  exact. merge_choice (invent.c:772-810): scare punt, save/restore,
  no_charge-clear vs inhishop-reject (restore correctly skipped — no
  mutation on that path), scan ✓.
- do_stone_mon (uhitm.c:3944-3978): munstone goto, poly arm, resists
  inverted tail, vis pline + monstone, post_stone MISS+done+return,
  sad pline, grow_up + DEF_DIED ✓ (diff fragment looked lossy; full
  function read confirms all lines present). mhitm_ad_ston mhitu
  split (mhitu.js): rn2(3)/mcan/Hallu-Soundeffect/rn2(10)/NEW_MOON/
  do_stone_u ✓; uhitm + mhitm arms ✓. flash_hits_mon shieldeff gate
  (:6405-6406) ✓.
- teleport_pet (:786-810): steed gate, no-leash impossible + release
  fallthrough, cursed yelp, slack + unleash ✓. monster_detect blessed
  arm (:848-856): persistent → map flush (more() idiom), else
  I_SPECIAL browse bracket ✓. mcastu Deaf: drops never-written
  u.Deaf, ORs HDeaf/EDeaf + uprops mirrors — mirrors proven synced
  (timeout.js:348 "one field", house intr/extr_bits idiom) ✓.
- lspo_reset_level (:5998-6003): `if (L) { Free; NULL; create }` ✓;
  wiz_load_splua NULL form wired (dynamic import, cycle-safe); stale
  "no scored analogue" note retired (the mklev.js:6726 note is a
  per-loader note, not stale). mk_bubble clamp+impossible (:1895-1898)
  ✓; MAX_BMASK panic provably dead (bm8[1]=4=MAX_BMASK) ✓.
  add_doors_to_room → maybe_add_door (:5551): callee is same-file
  static (C staticfn too), body exact ✓. selection_from_mkroom
  (:781-799): coder fallback + selection API ✓.
- fixup_special (hot-12/audited): fallback `!added_branch &&
  !made_branch && Is_branchlev` + place_lregion; the !made_branch
  addition is the documented load-bearing revert (des two-call
  pattern: pre-walked lregions cleared before the tail call) ✓;
  water/air setup + region walk + tail chain + lregions free ✓.
- stolen_booty (hot-12, rng 10): RNG call-for-call exact — rndorcname,
  rnd(4)/rn2(4), rnd(3), rn1 gloves, rnd(10)/rn1 food with the
  lembas/prob/corpsenm exclusions, rn2(2) blade, leader
  (christen/mpeaceful/malign/shiny/migrate), fmon brand loop
  (DEADMONSTER/rn2(10)/captain mndx exclusion), rn2(10)+5 tail,
  ransacked=0 ✓. Eager `upstart` is RNG-free ✓.
- mhitm_ad_slim: mhitm arm exact; uhitm (damageum_ad_slim) + mhitu
  (mhitm_ad_slim_u) splits both live and exact ✓. mcast_spell: guards
  + 20-arm switch in C order with correct dmg flow + mdamageu tail ✓;
  callee spot-check: mcast_* same-file statics (C staticfn ✓),
  rndcurse/mdamageu/mon_adjust_speed live + awaited ✓. mcast_insects:
  letter fix, quan min-3, i<=quan enexto loop, census pair, seecaster,
  hallu bogusmon, unseen/seen fmt chain ✓ (Math.trunc matches C int
  division).
- food_detect: confused/potion swap, stale, steed coords, both count
  loops with the `(!ct||!ctu)` early-out, all three outcome arms
  (beginner-save, `return !stale`, smell/sense, map arm with temp
  coords + TER_MON + continues/starts + exercise + browse +
  redisplay) ✓. doloot_core: entry gates, confusion RNG, lootcont
  (factored) + lootmon loop with goto-equivalents, all messages and
  ECMD returns ✓. walkfrom: recursion ≡ C's explicit stack (same
  DFS order, same rn2 sequence; overflow panic provably unreachable
  by pigeonhole) ✓. nohandglow, get_room_loc, dealloc_oextra,
  check_contained, get_mkroom_name: exact ✓.

## Hallucinations / overclaim

None. Every "Live divergences closed" item verified present and
C-exact; every "Stale omits retired" row's diff confirms the retire
(spot-checked uhitm/detect pastes, rloco hurtle, mkfount incremental).
The fixup_special revert narrative matches the code (guard present,
comment records the two-call proof). "3 users re-imported" = 3 import
sites ✓. No dispatch/callee-stub shape; no clone added (fmt_ptr move
leaves zero clones; the_unique_pm-style risk absent here).

## Density

All 16 sampled verdicts ACCEPT (15 listed + monster_detect ACCEPT).
SHA verdict = ACCEPT. No wrong `ported`/`audited` in sample → no
second sample. Batch conformance: exactly 100 rows, 0 Left open,
manifest == picker output (MANIFEST-EXACT), no non-manifest js
function (fmt_ptr move re-homes an existing manifest row; all other
touches are manifest-row improvements or already-ported call-site
wirings). Nits (not C-wrongs, no queue): set_levltyp_lit carries a
PRE-EXISTING live impossible arm for EXTRA_SANITY_CHECKS code that
compiles out of the scored build (RELEASED, patchlevel.h:33) —
callerless + never-fires on valid inputs, untouched by this diff;
"partial 43 · recheck 57" message vocabulary vs 91/5/4 diff statuses;
"C :5551" citation file-implicit (sp_lev.c).

## Verification

- D-log: verify.mjs PASS; sweep 714 re-run 0 regressed; green/strict/
  cohort/full PASS; mid-batch triage (fixup revert + seed-comment
  removal) re-ran green. Re-measured on all 16 sampled fns in one
  call (`--base e3dc5ab18~1 --reach-all`, /tmp/verify-3406.txt):
  16/16 REACH-OK, 0 regressed, no WORSE — reach walkfrom 35/35,
  fixup_special 45/45, stolen_booty 1/1; 13 smokes 24/24.
- `imports.mjs --rulecheck`: clean ✓. Diff grep (FORCE/DIAG/
  getRngLog/fastforward/seed names): clean — the admitted self-hit
  is gone ✓. New-edge `--can` checks: all ALREADY (import extensions
  only).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
