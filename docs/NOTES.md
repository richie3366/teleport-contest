# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Hidden-score proxy is live** (`HIDDEN-PROXY.md`): 217/265 PASS at
  D-1847 (audit 811–817). Open `mklev.c` `mineralize` leftover gold loop
  C-faithful; 2 corpus still blocked (1-cell TRC). lookat `S_room`/
  `S_darkroom` extra arms are D-1848 (`newsym` DARKROOMSYM). Do not
  reopen D-1841–D-1848.
- **1-cell TRC:** Knight d5 C 410 vs JS 409 gold checks; 409 values match
  then C `rn2(1000)=52` at (77,13). C STONE at (76,14)/(77,14); JS HWALL/
  TRC. `wall_cleanup` sees ROOM at (75,15)/(76,15). Falsify: those two
  tiles STONE → Knight 13017/13017. Do not re-port the gold loop.
- **Suite 44/44** at D-1847. Do not reopen `level_tele` Nowhere/clamp,
  `priestname`, Rogue `S_ndoor`, `bigrm-2` darkness as `lspo_map` lit,
  `getpos` matching/`#` AUTODESC,
  `summonmu` were, `lookat` unexplored, `do_statusline1` leftover,
  `_snapshotStatusGrid`, fakewiz, Ice/Boulder/Spider/Trap, `roles[]`,
  `pickup_checks`, `doloot_core`, nested themerms, `look_here`, Bar-goal,
  castmu, medusa/minend/soko/Wiz, Knight/Rogue lua, `HDeaf [2]`,
  `mattacku` abort, trailing `confdir` (D-1815).
- **Luck still runs when invulnerable.** Dialogues do not (`timeout.c:623`).
  STONED/SLIMED expiry silent (`done_timeout`).
- **`sit.js` lay-egg `morehungry` still not awaited.** `losedogs` still
  rebuilds `migrating_mons`. DUMPLOG retired (D-1776). Clone drift: zap
  useupf; detect/potion/read/spell `useup`; Elbereth; teleport `accessible`;
  helm_simple_name; pickup `ysimple_name`; getobj_* clones.

## Don't re-check (≤15)

- Do not re-port `drown` (D-1814) / `untrap` helpers (D-1813) /
  `really_done` callees (D-1812) / `use_misc` (D-1811) /
  `use_offensive` (D-1810) / `use_defensive` (D-1809) /
  `domonnoise` remaps (D-1808) / `vpline` (D-1807) / `getdir`
  help_dir (D-1806) / `iflags.cmdassist` (D-1815) / `yn_function`
  fuzzer (D-1805) / `getobj` (D-1804) / `x_monnam` (D-1803) /
  `xname_flags` (D-1802) / `moveloop_core` (D-1801) /
  `test_move`/`domove_core` (D-1800) / `spoteffects` (D-1799) /
  `dochug` (D-1798) / `nomul` (D-1797) / `xkilled` (D-1796).
  `m_seenres` is boolean — never `!== 0`. No second `genus` /
  `accessible` / trailing `confdir` / `locomotion` / `unconscious`.
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
  (D-1189). Do not skip D-1190…D-1848.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip
  painting spaces or emit mid-row space runs >4 (D-0931). Do not
  FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092).
  Do not blanket-restore overlay `_pending_message` (D-0929).
  Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide
  RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from
  `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers
  (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) /
  skip `tutorial()` (D-1066). Do not skip D-1067…D-1848.
- Do not import `monmove.js` `sticks` for sit / rewrite
  `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) /
  bones→options fruitadd (D-1541). No `reset_glyphmap` /
  `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`.
  No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No
  static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`.
  Do not re-port D-1682…D-1848.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-1848: delete the extra lookat arms so floor strings come from `defsyms[]`. Named: `do_screen_description` ROOM parenthetical still uses `room_cmap_explanation` (Open, later
- D-1847: gold/gem loop + `on_level` Is_special + `join` arboreal ROOM + xstart resets. Named: 1-cell `ly=15` TRC (Knight d5 409 vs 410; C STONE at HWALL+TRC, JS walls; `wall_cleanup` blocked by interior ROOM).
- D-1846: Nowhere ynq + Quest/mines/sanctum clamp + invoked `"Sorry..."`; `priestname`; Rogue `S_ndoor`/`dosdoor` D_NODOOR; `bigrm-2` darkness unlit. Named: bymenu=FALSE `print_dungeon`; debug_fuzzer; ice `selection:grow`; hallu `halu_gname` pantheon RNG.
- D-1845: port matching[] from `defsyms[].sym` (walls/room/corr/door/ndoor skipped) so `/` is k>0 then Can't find; AUTODESC / LIMITVIEW / MENU / MOVESKIP before Named: `getpos_menu` (usemenu still cycles); GFILTER_AREA flood; full `gs.showsyms`; cmdq_pop at 
- D-1844: port the C were arm (form change, then maybe summon helpers / plines). Named: `msummon` is_lminion/angel (demon arm otherwise live); howl `You_hear`/`wake_nearto`; `mon
- D-1843: port `lookat` glyph-first (self / swallow / mon / obj / trap / warning / invisible / nothing / unexplored / cmap switch / else). Named: `do_screen_description` cmap/symbol table (now the later owner of those four sessions); `i
- D-1842: named `do_statusline1` (BOTL_NSIZ, windowport title pad so `St:` starts at col 31). Named: `wintty.c` paging `docorner` `ystart_between_menu_pages` repair; TTY_PERM_INVENT refresh; 
- D-1841: port both lua bodies: mazegrid + center map + `l_levregion`/`l_teleport_region` while map origin is set, `splev_mazewalk(8,5,east)`, fakewiz1 irregula Named: `ensure_way_out`; arrival_room migrate flag beyond ordinary OROOM; humidity-aware `get_loc
- D-1840: port Ice (`des.terrain` ICE + `percent(25)` melt-ice timers), Boulder / Spider / Trap (`percentage(30)` then y-outer iterate). Named: Garden / Buried treasure / Massacre / Statuary fills; garden/dig postprocess; icedpool on 
- D-1839: copy C `roles[]` `homebase`/`intermed`/`ldrnum`/`guardnum`/`questarti` for the remaining nine roles; Arc `PM_STUDENT` and Bar `PM_CHIEFTAIN` `guardnum Named: `attributes_enlightenment` body still unported (heuristic owner).
- D-1838: port the C body: furniture-specific nothing-msgs (stairs affixed), pool/lava reach, swallow tongue/`-2`, pit-aware `can_reach_floor`. Named: dungeon.c `surface` (reach-fail default `"floor"`; HOLE/TRAPDOOR override live).
- D-1837: `doopen_indir` returns `doloot()` on self/down unless a closed door is here. Named: Confusion `reverse_loot`; pit `"Open where? [.>]"`; door-mimic stumble; AUTOUNLOCK_KICK / 
- D-1836: nested `des.room` via `splev_des_room`/`splev_build_room` (chance then `create_subroom`) for those five rooms. Named: Random-feature center terrain; remaining themeroom_fill bodies (Ice/Boulder/Spider/Trap/Ga
- D-1835: `look_here` plines the seen trap / visible region before the object list. Named: `ice_descr` thicker/thinner ice; `dfeature_at` ice/pool/lava/throne/drawbridge (so waterhe
- D-1834: `dowear`/`doputon`/`dothrow`/`dodrink`/`doremring` call live `getobj`. Named: getobj_* clones still in drop/wield/apply/write/takeoff/dip; `canwearobj` polyform (cantwe
<!-- landmarks:end -->
