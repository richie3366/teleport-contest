# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Park `show_conduct` (HEAD c209ccc7):** premise stale (859 @baf24c95 → 824 x_monnam); owner insight.c:2122 is a C comment; DontAsk-flags arm alone REGRESSES 859→824 (reverted) — display-timing iteration must ride WITH the flags arm. Detail + falsifier in LOOP-QUEUE Parked. UPDATE: replays 859, rng identical; re-baseline first.
- **Park `mdrop_obj`:** capture-point divergence (C mid-turn --More-- frame vs JS post-turn; draws identical 2706/2706); full port = verify no-op. Detail + falsifier in LOOP-QUEUE Parked.
- **Park `dopush` (mimic-viz, not the push):** step 127/175 single cell r13c32 C `` ` `` vs JS `·`, RNG 12853/12853 tied; push itself faithful. Needs C-side viz at 127 or `view_from` boundary audit. Detail in LOOP-QUEUE Parked; re-apply reverted `movobj` cleanup with the fix.
- **Geometry owners:** probe first (D-1849).
- **Refill rows must not cite the current D-ID:** finish-iteration archives EVERY open row mentioning it (cf. D-1876).
- **Fortress guards.** Do not reopen display_inventory dismiss /
  gameover heading / keep_status, stock_room engraving, inside_shop clone,
  level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu,
  lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`,
  pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu,
  medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED expiry silent.
- **`sit.js` lay-egg `morehungry` unawaited; `losedogs` rebuilds `migrating_mons`.** Clone drift: zap useupf; detect/potion/read/spell `useup`; Elbereth; teleport `accessible`; helm_simple_name; pickup `ysimple_name`; getobj_* clones.

## Don't re-check (≤15)

- D-1796…D-1907 ports stand (`drown`→`xkilled`, `yn_function`, `getobj`, `moveloop_core`, …; range-covered below). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- D-1790…D-1907 stand (`make_corpse`, `dmgval`, `nh_timeout`, `newuhs`, `monverbself`; range-covered). Scar: no second `free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774;
  findone tail D-1775. Do not revert D-0078 H2344 / offx 72
  (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap`
  dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX
  (D-1189). Never FORCE the falsified
  mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858; 0/5 rows are stale refill dupes (closed D-1885 + this iter) — check `load_val_*`/`load_sam_*` before re-refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip
  painting spaces or emit mid-row space runs >4 (D-0931). Do not
  FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092).
  Do not blanket-restore overlay `_pending_message` (D-0929).
  Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide
  RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from
  `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers
  (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) /
  skip `tutorial()` (D-1066). Do not skip D-1067…D-1907.
- Do not import `monmove.js` `sticks` for sit / rewrite
  `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) /
  bones→options fruitadd (D-1541). No `reset_glyphmap` /
  `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`.
  No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No
  static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`.
  Do not re-port D-1682…D-1907.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-1907: four exported C-order arms in `js/mhitm.js` (mhitm branches only, `is_youmonst` guards): sgld zeroes dice, `findgold`/`obj_extract_self`/`add_to_minv` Named: uhitm you-as-agr arms (sgld hero-inventory merge_choice/inv_cnt/addinv/dropy+exercise; tlp
- D-1906: bound 15→14 with comment citing :74–87; Bar-goal comment corrected to the shared 1+14 shape. Named: unchanged from D-1818 (humidity-aware `get_location`; `spo_end_moninvent` `m_dowear`; `fil
- D-1905: `s.slice(i)` → `s.slice(i + 1)` + doc correction (`&str[i]` post-`++i`, space consumed). Named: `suit_simple_name` dragon mail/scales arms still deferred (D-1884; `js/do_wear.js` canonic
- D-1904: `js/roles.js` (+~150): index-aligned `ROLE_FILECODES` attached to `roles[]`; `randomstr`; `str2role`/`str2race`/`str2gend`/`str2align` in C order (mal Named: `setup_rolemenu`/`setup_racemenu`/`setup_gendmenu`/`setup_algnmenu` (+ `plsel_startmenu`) 
- D-1903: C-order ports in `js/pager.js` (+~277/−24): `look_region_nearby(out, nearby)` holder-mutating export (C lo_y/lo_x/hi_y/hi_x order, `ux|0`/`uy|0` ints) Named: `do_screen_description` full showsyms cmap scan still deferred (later owner after D-1843; 
- D-1902: new `js/mkmap.js` (+~170, 6 exports, C names/signatures): bounds-exact `get_map` (OOB→bg); in-place `pass_one` (writes hit levl mid-sweep — later cell Named: `mkmap` + `init_map`/`init_fill` RNG envelope (own queue row); `join_map` + `join_map_clea
- D-1901: deleted both blocks including the `mhp<1 continue` guard line that only served them; `passive()` already owns gaze retaliation on its real melee trigg Named: none new — `dogaze`/`dohide`/`dospinweb` + steed `pet_ranged_attk` stay deferred on the `d
- D-1900: C-order ports. Named: `target_on`/`you_have`/covetous-pursuit `strategy` (the live caller envelope — own row whe
- D-1899: C-branch-order ports in `js/muse.js`: `cures_stoning` (POT_ACID/glob+CORPSE+openable-TIN, NON_PM gate, LIZARD/acidic); `cures_sliming` (fire scroll ey Named: `munstone` + `mon_consume_unstone` stoning-TRUE envelope (uhitm corpse/egg-throw + `mhitm_
- D-1898: C-order dispatch incl. the hide/web `yn_function` prompt (`hidespinchars`, q/ESC → ECMD_OK) ahead of every arm; `dospit` (`getdir`→ECMD_CANCEL, `attac Named: `dogaze`/`dohide`/`dospinweb` (131/97/124 ln C; `y_n`/`setmangry`/`destroy_items`/`expels`
- D-1897: New `travel_delay_current(x,y)` (`!Passes_walls_prop() && !can_ooze(youmonst) && closed_door` || `boulder && !could_move_onto_boulder`, C `:1403–1407` Named: travelmap visited stop (`You stop, unsure which way to go` — needs shared selection infra;
- D-1896: Ported all eleven C functions in C branch order with short-circuit, RNG (`rn2/rnd/rn1/d`), and mutation semantics preserved: charging confused uen/dis Named: enchant-armor `adj_abon` (DEX/INT/WIS bonus) + `maybe_adjust_light` (radius) — same deferr
- D-1895: `load_tut2` in lua order through end of file — `nhlib_shuffle_align`, STONE solidfill + `is_maze_lev`/`nomongen`/`deathdrops=false`/`noautosearch` (tu Named: none new — tut-2.lua has no objects/monsters/doors/regions beyond the lit rect; `wallify`/
- D-1894: set `game.killer` (format KILLED_BY, name=drainer unless already it — C `:234–236` pointer-guard as a value compare) and `await done(DIED)`; keep the  Named: SoundAchievement; Upolyd monhp_per_lvl/rehumanize; uhpmax-up clamp via setuhpmax (all pre-
- D-1893: Tou-goal/Ran-goal epilogue line in lua order (after last monster, before wallification → flip → fixup) in all three loaders: `wallify_map((g.splev_xst Named: unchanged from D-1891 (humidity-aware `get_location` for water-likers; `ensure_way_out`; `
<!-- landmarks:end -->
