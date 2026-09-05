# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Park `dog_invent` (iter 2278):** both `"%s picks up %s."` corpus hits are `mon.c mpickstuff` (shared literal; scorer first-match). tour-Barbarian-70011 step 34: 123 draws, 0 from dogmove.c; `geom-probe` 0 diffs (vision/memory). tour-Priest-70006 step 45: 47 draws, 0 from dog_invent; RNG 16489/50 match, 7 JS mons stepped +1 at movement=12 — needs C `movement[]`/`mtrack`. Do not pop.
- **Hidden-score proxy** (`HIDDEN-PROXY.md`): 222/265 at D-1849;
  `dofire` 2 PASS at D-1851 (empty-quiver You() NEED_MORE before getobj).
  Geometry owners: `geom-probe.mjs` first (D-1849). Do not
  reopen D-1841–D-1851.
- **Suite 44/44** at D-1851. Do not reopen dofire empty-quiver More skip
  (D-0484), display_inventory dismiss /
  gameover heading / keep_status, stock_room engraving, inside_shop clone,
  level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu,
  lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`,
  pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu,
  medusa/soko/Wiz, Knight/Rogue lua, `HDeaf [2]`, `mattacku` abort,
  trailing `confdir` (D-1815).
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
  (D-1189). Do not skip D-1190…D-1868. Never FORCE the falsified
  mineralize TRC (76,14)/(77,14) (D-1849).
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip
  painting spaces or emit mid-row space runs >4 (D-0931). Do not
  FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092).
  Do not blanket-restore overlay `_pending_message` (D-0929).
  Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide
  RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from
  `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers
  (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) /
  skip `tutorial()` (D-1066). Do not skip D-1067…D-1868.
- Do not import `monmove.js` `sticks` for sit / rewrite
  `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) /
  bones→options fruitadd (D-1541). No `reset_glyphmap` /
  `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`.
  No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No
  static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`.
  Do not re-port D-1682…D-1868.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-1868: door block restructured to C order with the `amorphous(mdat) && !engulfing_u(mon)` exemption (`can_fog` stays a commented named-omit); ALLOW_DIG curse Named: `can_fog` (vampshifter) still deferred in the door arm (comment + map); corrupt-ttyp `impo
- D-1867: `js/dungeon.js` `save_dungeon_topology()` / `restore_dungeon_topology()` over `LEVEL_MAP` + quest/sokoban/mines/tower/tutorial dnums (mirrors `struct  Named: `game.dungeon_topology` vestigial round-trip kept as-is (only `Is_airlevel` read in `hack.
- D-1866: default `menuinvertmode: 1` in `g.iflags` init (rc `...opts.iflags` spread still overrides) + parse `OPTIONS=menuinvertmode:N` colon-compound per `opt Named: `doset` Comp `menuinvertmode` row still shows hardcoded `val: '1'` (now true by default; n
- D-1865: `dmgval(otmp, game.youmonst)` + C-citation comment (`dmgval(otmp, mdef)`, `weapon.c:215`). Named: file-local `do_stone_u` clone killer attribution (`make_stoned(5,0,kformat,kname)`, `uhitm
- D-1864: port the mhitu AT_WEAP arm in C order (corpse `do_stone_u` via the file-local clone with the `u.Stoned || u.HStoned` guard; GOP arm; `artifact_hit` dm Named: uhitm arm is `damageum_ad_phys` (unchanged); `mhitm_ad_drst` 1/8; purple-worm-vs-shrieker 
- D-1863: port the TT_PIT 3×3 arm in C order (row `continue`/`break`, direct `next_rmin/rmax` assign, xray/nv/lights/update flow untouched) + add the post-`rhac Named: underwater `has_night_vision=0` + pool 3×3 (`vision.c` pit-adjacent arm, still named in co
- D-1862: port the six ATTK resists arms in C order — hero side `Fire/Cold/Shock/Drain_resistance()` (newly exported from `js/zap.js`) + Poison/Stone H/E/sticky Named: `defended()` artifact/dragon-armor guard before the switch; DFLAG1 mflags1 arm; DFLAG2 you
- D-1861: port `themeroom_fill_garden` (nymph count `(numpoints/6)|0`, `splev_room_monster(croom,'wood nymph')` + `msleeping=1`, `percent(30)` fountain, queue ` Named: Buried treasure / Massacre / Statuary fills still omitted (same dispatch comment); `induce
- D-1860: port `antholemon()` (ubirthday%3 + difficulty, `G_GONE` retry, null if all gone, no RNG) + `PM_SOLDIER_ANT`/`PM_FIRE_ANT`/`PM_GIANT_ANT` consts; add t Named: SWAMP `mkswamp` still deferred; `tt_oname` RECORD entries (plgend/classmon/christen) still
- D-1859: port the arm in C order (inside clear-dest branch, after ttmp/mtmp fetch, before revive_nasty/monster): `Sokoban_here() && u.dx && u.dy` → Blind `feel Named: shop `costly` computation, `revive_nasty`, trap/teleport/pool arms, Levitation/verysmall B
- D-1858: `load_sam_strt` from the lua body: solidfill STONE + Named: humidity-aware `get_location` for water-likers;
- D-1857: port the three arms with C branch/RNG order. Named: `defended(mon, AD_SLEE)` orange-scales/artifact
- D-1856: build the darkness selection per choice arm (absolute Named: none new. bigrm-2 `flip_level_rnd` (noflip),
- D-1855: export `dowhatdoes` from `js/pager.js`, import it in Named: `dowhatdoes` ALTMETA ESC-double path
- D-1854: that branch now prints 9-space `can be many things (${look})` Named: full `do_screen_description` cmap/symbol table
<!-- landmarks:end -->
