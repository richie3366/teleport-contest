# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Hidden-score proxy is live** (`HIDDEN-PROXY.md`): 209/265 PASS at
  D-1840 (audit 794–810). Next Open `botl.c` `do_statusline1` (4 corpus
  blocks). Orient `brief.mjs`, verify `verify.mjs --fn`. Review 801
  QUALITY-RISK (D-1831 snapshot leftover WIN_STATUS) shipped in D-1832 —
  Must-fix empty.
- **Suite 44/44** at D-1841 (R² 0.853). Do not reopen fakewiz1/fakewiz2,
  Ice/Boulder/Spider/Trap fills,
  `roles[]` quest identity,
  `,` empty-floor `pickup_checks`, `doloot_core` loot-at-feet, or
  nested themerms `des.room`. `look_here` trap/region before objects;
  `describe_decor` Fumbling/waterhere/ice/`back_on_ground` live.
  Unhandled menu keys do not `docrt`; do not restore `_snapshotStatusGrid`.
  Do not reopen Bar-goal, castmu, medusa/minend/soko/Wiz/water/astral
  loaders, Knight/Rogue lua, `HDeaf [2]`, or `mattacku` abort.
  No trailing `confdir` on shared `getdir` (D-1815).
- **Luck still runs when invulnerable.** Dialogues do not (`timeout.c:623`).
  STONED/SLIMED expiry silent (`done_timeout`).
- **`sit.js` lay-egg `morehungry` still not awaited.** `losedogs` still
  rebuilds `migrating_mons`. DUMPLOG retired (D-1776). Clone drift: zap
  useupf; detect/potion/read/spell `useup`; Elbereth; teleport `accessible`;
  helm_simple_name; pickup `ysimple_name`; getobj_* clones.

## Don't re-check (≤15)

- Do not re-port `drown` crawl-out (D-1814) or
  `untrap` remaining floor disarm helpers (D-1813) or
  `really_done` remaining callees (D-1812) or
  `use_misc` poly/bag/`you_aggravate` (D-1811) or
  `use_offensive` ray wands / horns / tele+undead / SCR_EARTH
  (D-1810) or `use_defensive` mreadmsg / reveal_trap /
  `mon_escape` / `mon_consume_unstone` (D-1809) or `domonnoise`
  remaps / `doconsult` / `priest_talk` / `shk_chat` (D-1808) or
  `vpline` `msgtype_type` / `execplinehandler` /
  `maybe_play_sound` (D-1807)   or `getdir` help_dir / cmdassist /
  strange-dir NEED_MORE / `dxdy_moveok` (D-1806) or `getdir`
  `iflags.cmdassist` (D-1815) or `yn_function`
  fuzzer `rn2(20)`/`rn2(ln)`/ESC retry (D-1805) or `getobj`
  in_doagain `readchar` / GETOBJ ranks / sortloot INVLET (D-1804)
  or `x_monnam` remaining / `nextmbuf` / `lcase` / `just_an`
  (D-1803) or `xname_flags` `xcalled` / T_SHIRT / `apron_text` /
  `hawaiian_motif` (D-1802) or `moveloop_core` `do_storms` /
  `glibr` / `mkot_trap_warn` / `end_of_input` (D-1801) or
  `test_move`/`domove_core` water_friction / bars+web /
  mention_walls (D-1800) or `spoteffects` recursion / lev `rn2(2)`
  (D-1799) or `dochug` / `wormhitu` (D-1798) or `nomul`/`unmul`
  `usleep=0` (D-1797) or `xkilled` LEVEL_SPECIFIC / pool (D-1796).
  Named omits for those live in the landmarks / index rows. `m_seenres`
  is already boolean — never `!== 0`. No second `genus` / `doconsult`
  / `priest_talk` / `shk_chat` / `accessible` / trailing `confdir` /
  `locomotion` / `resists_acid` / `can_carry` / `unconscious`.
- Do not re-port `mattacku` remaining / `getmattk` DISE/DREN/WEAP
  (D-1795 body) or the post-`done()` NATTK abort (D-1816). Keep
  sleep `rn2(10)`. No second `m_monnam` / `simple_typename`.
  seed4500 `[2]` is D-1817 — do not omit
  `flush_screen(1)` and do not hide `[2]`.
- Do not re-port `make_corpse` (D-1794) / `dmgval` `rnd()` (D-1793) /
  `nh_timeout` luck (D-1792) / `newuhs` (D-1791) / `monverbself`
  genders[3] (D-1790). No second `free_mgivenname` / `is_axe` /
  `carrying` / `end_running`.
- Reviews **728–736** AWD; **747**=D-1786; **748**=D-1787;
  **750**=D-1788; **752**=D-1789 — no `stay` rebuild. No `u.Punished`.
  No `rn2(20)` on ordinary pit farlook.
- Do not re-check 40/44 at D-1765/66; seed0014 I-glyph is D-1774;
  findone tail D-1775. Do not revert D-0078 H2344 / offx 72
  (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap`
  dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX
  (D-1189). Do not skip D-1190…D-1841.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip
  painting spaces or emit mid-row space runs >4 (D-0931). Do not
  FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092).
  Do not blanket-restore overlay `_pending_message` (D-0929).
  Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide
  RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from
  `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers
  (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) /
  skip `tutorial()` (D-1066). Do not skip D-1067…D-1841.
- Do not import `monmove.js` `sticks` for sit / rewrite
  `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) /
  bones→options fruitadd (D-1541). No `reset_glyphmap` /
  `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`.
  No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No
  static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`.
  Do not re-port D-1682…D-1841.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-1841: port both lua bodies: mazegrid + center map + `l_levregion`/`l_teleport_region` while map origin is set, `splev_mazewalk(8,5,east)`, fakewiz1 irregula Named: `ensure_way_out`; arrival_room migrate flag beyond ordinary OROOM; humidity-aware `get_loc
- D-1840: port Ice (`des.terrain` ICE + `percent(25)` melt-ice timers), Boulder / Spider / Trap (`percentage(30)` then y-outer iterate). Named: Garden / Buried treasure / Massacre / Statuary fills; garden/dig postprocess; icedpool on 
- D-1839: copy C `roles[]` `homebase`/`intermed`/`ldrnum`/`guardnum`/`questarti` for the remaining nine roles; Arc `PM_STUDENT` and Bar `PM_CHIEFTAIN` `guardnum Named: `attributes_enlightenment` body still unported (heuristic owner).
- D-1838: port the C body: furniture-specific nothing-msgs (stairs affixed), pool/lava reach, swallow tongue/`-2`, pit-aware `can_reach_floor`. Named: dungeon.c `surface` (reach-fail default `"floor"`; HOLE/TRAPDOOR override live).
- D-1837: `doopen_indir` returns `doloot()` on self/down unless a closed door is here. Named: Confusion `reverse_loot`; pit `"Open where? [.>]"`; door-mimic stumble; AUTOUNLOCK_KICK / 
- D-1836: nested `des.room` via `splev_des_room`/`splev_build_room` (chance then `create_subroom`) for those five rooms. Named: Random-feature center terrain; remaining themeroom_fill bodies (Ice/Boulder/Spider/Trap/Ga
- D-1835: `look_here` plines the seen trap / visible region before the object list. Named: `ice_descr` thicker/thinner ice; `dfeature_at` ice/pool/lava/throne/drawbridge (so waterhe
- D-1834: `dowear`/`doputon`/`dothrow`/`dodrink`/`doremring` call live `getobj`. Named: getobj_* clones still in drop/wield/apply/write/takeoff/dip; `canwearobj` polyform (cantwe
- D-1833: E uses C `is_blade` (P_DAGGER..P_SABER) / wand / `oc_tough`. Named: W already-wearing `armor_simple_name` / `armcat_to_wornmask`; dungeon.c `surface` terrain 
- D-1832: Unhandled keys `tty_nhbell` only (no `docrt`/`cls`). Named: `process_menu_window` paging `docorner` repair (`previous_page_lines`); PICK_ANY invert-al
- D-1831: `set_bot_disabled` around `select_menu_*` / `getlin` / pickinv / Named: `process_menu_window` paging `docorner` repair
- D-1830: `load_rog_strt` from the lua body: solidfill STONE + Named: humidity-aware `get_location`; `spo_end_moninvent`
- D-1829: `load_kni_strt` from the lua body: solidfill ROOM + mines fg=bg="." Named: humidity-aware `get_location`; `spo_end_moninvent`
- D-1828: `load_astral` from the lua body: solidfill + mazelevel+noteleport Named: humidity-aware `get_location`; `ensure_way_out`;
- D-1827: `load_water` from the lua body: solidfill + mazelevel+noteleport Named: water cons pickup / `maybe_adjust_hero_bubble`;
<!-- landmarks:end -->
