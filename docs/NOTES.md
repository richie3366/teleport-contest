# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Park `show_conduct` (HEAD c209ccc7):** premise stale (859 @baf24c95 → 824 x_monnam); owner insight.c:2122 is a C comment; DontAsk-flags arm alone REGRESSES 859→824 (reverted) — display-timing iteration must ride WITH the flags arm. Detail + falsifier in LOOP-QUEUE Parked. UPDATE: replays 859, rng identical; re-baseline first.
- **Park `mdrop_obj`:** capture-point divergence (C mid-turn --More-- frame vs JS post-turn; draws identical 2706/2706); full port = verify no-op. Detail + falsifier in LOOP-QUEUE Parked.
- **Park `dopush` (mimic-viz, not the push):** step 127/175 single cell r13c32 C `` ` `` vs JS `·`, RNG 12853/12853 tied; push itself faithful. Needs C-side viz at 127 or `view_from` boundary audit. Detail in LOOP-QUEUE Parked; re-apply reverted `movobj` cleanup with the fix.
- **Geometry owners:** probe first (D-1849).
- **Refill rows must not cite the current D-ID** (archiver removes rows mentioning it).
- **Fortress guards.** Do not reopen display_inventory dismiss /
  gameover heading / keep_status, stock_room engraving, inside_shop clone,
  level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu,
  lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`,
  pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu,
  medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED expiry silent.
- **`sit.js` lay-egg `morehungry` unawaited; `losedogs` rebuilds `migrating_mons`.** Clone drift: zap useupf; detect/potion/read/spell `useup`; Elbereth; teleport `accessible`; helm_simple_name; pickup `ysimple_name`; getobj_* clones.

## Don't re-check (≤15)

- D-1796…D-1920 ports stand (`drown`→`xkilled`, `yn_function`, `getobj`, `moveloop_core`, …; range-covered below). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- D-1790…D-1920 stand (`make_corpse`, `dmgval`, `nh_timeout`, `newuhs`, `monverbself`; range-covered). Scar: no second `free_mgivenname`/`is_axe`/`carrying`/`end_running`.
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
  skip `tutorial()` (D-1066). Do not skip D-1067…D-1920.
- Do not import `monmove.js` `sticks` for sit / rewrite
  `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) /
  bones→options fruitadd (D-1541). No `reset_glyphmap` /
  `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`.
  No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No
  static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`.
  Do not re-port D-1682…D-1920.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-1920: `js/mhitm.js` — full C-order port: `newtype = little_to_big(oldtype)` (canonical `js/mondata.js` export, same-SCC import already present); victim arm  Named: none new — `monsndx` has no JS export (existing `data?.mndx ?? mnum ??
- D-1919: `js/mhitm.js` — local `mswingsm` (C `:1282–1297` order; `game.flags?.verbose !== false` repo idiom + local `Blind_slee()` + `mon_visible`; `is_pole`/` Named: `thrwmm` ranged AT_WEAP arm (mthrowu `monshoot` is a local clone, not an export — distant 
- D-1918: `liveWwalking()` closure (same slot+flats+`Is_waterlevel` idiom as the snapshot) read at the three post-boots points (`if (Wwalking)` burns-you gate,  Named: none new.
- D-1917: C-order wiring in `js/were.js`: `const mba = mon_break_armor(mon, false)` (canonical `js/worn.js` export, D-1914) then `possibly_unwield`, chained syn Named: `monflee` onscary (`svc.context.mon_moving` + mux/muy scary-near arm); file-level howl `Yo
- D-1916: C-order weaponless envelope in `js/uhitm.js`: shared-`dhit` discipline (WEAP + weaponless assign the outer; BREA/SPIT/GAZE reset 0); seduce keeps no-w Named: `gv.vis` set/reset (display global; hmonas messages always pline for youmonst magr); `getm
- D-1915: C-order completion in `js/steed.js`: save_utrap before the switch; BYCHOICE nameless Hallu rain (`Hallucination()`); local `stealth_now()` youprop.h-S Named: uhitm DISMOUNT_KNOCKED `u.dx`/`u.dy` caller; update_mon_extrinsics; teleds_simple subset (
- D-1914: canonical `export function mon_break_armor` + local `m_lose_armor` in `js/worn.js` in C order (breakarm destroy incl. dragon-merge silent arm, artifac Named: W_ARMG `mselftouch` (newcham arm; trap.js live); ustuck expels/unstuck; poly_steed; muse/z
- D-1913: full C-order port in `js/trap.js`: `d(6,6)` first; `feel_newsym` + `burn_away_slime` + `likes_lava(youmonst.data)` early FALSE; `usurvive = Fire||(Wwa Named: none new — all arms live (no stub in a live arm); `sink_into_lava` needs no port here (C `
- D-1912: four canonical `export function setup_*menu` in `js/player_selection.js` in C order and C param order (minus `win`): `filtering && !*_ok` skip; `lowc` Named: `plsel_startmenu` (own named follow-up per D-1904; untouched); none new.
- D-1911: canonical `export function finish_map` in `js/mkmap.js` in C order (whole-map `wallify_map(1, 0, COLNO-1, ROWNO-1)` under `walled`; `!IS_OBSTRUCTED` f Named: `litstate_rnd` `mklev.js` local retained (still used by the non-MINES `rlit` call site; ca
- D-1910: canonical `export async function join_map` + `export function join_map_cleanup` in `js/mkmap.js` in C order: fill loop (`WIDTH`/`HEIGHT` bounds, `NO_R Named: `finish_map` (own queued row; wallify/lit/lava-ice + maze/cavernous flags); live cutover o
- D-1909: body now reads `!!(game.dungeons?.[game.u?.uz?.dnum | 0]?.flags?.hellish)` — the same flag expression as the `do.js`/`trap.js` siblings (same `| 0` un Named: none new — `do_screen_description` showsyms scan + `describe_looked` rewiring still deferr
- D-1908: canonical exports in `js/mkmap.js`: `N_P1_ITER`/`N_P2_ITER`/`N_P3_ITER`, `init_map` (C field order NO_ROOM/typ/unlit), `init_fill` (limit `(WIDTH*HEIG Named: `join_map` + `join_map_cleanup` (own queued row; `somexy`-failure `impossible()` arm dropp
- D-1907: four exported C-order arms in `js/mhitm.js` (mhitm branches only, `is_youmonst` guards): sgld zeroes dice, `findgold`/`obj_extract_self`/`add_to_minv` Named: uhitm you-as-agr arms (sgld hero-inventory merge_choice/inv_cnt/addinv/dropy+exercise; tlp
- D-1906: bound 15→14 with comment citing :74–87; Bar-goal comment corrected to the shared 1+14 shape. Named: unchanged from D-1818 (humidity-aware `get_location`; `spo_end_moninvent` `m_dowear`; `fil
<!-- landmarks:end -->
