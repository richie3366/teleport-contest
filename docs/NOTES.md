# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Hidden-score proxy is live** (`HIDDEN-PROXY.md`): 164/265 PASS at
  D-1831; D-1833 cleared 12/14 `itemactions` blocks (2 stay
  `do_statusline1` leftover WIN_STATUS). Next Open `getobj` 7,
  `describe_decor` 5, level cliff `build_room`/`selection_filter_percent`
  vs `rnd_rect`. Orient `brief.mjs`, verify `verify.mjs --fn`, hand off
  `finish-iteration.mjs --commit`.
- **Suite 44/44** at D-1833. Itemactions Engrave/Write, stack
  `simpleonames`, and apply catalogue are live — do not reopen those.
  Unhandled corner-menu keys do not
  `docrt`; `_statusSuppressed` covers D-0467 fullscreen-invent blank;
  do not restore `_snapshotStatusGrid`. MENU_SEARCH overlay wrap and
  per-window `maxrow` are fine — do not reopen those. Do **not**
  reopen Bar-goal object count, castmu spell arms,
  medusa-2/4 / minend-3 / bigrm / soko2-2 / Wiz-goal / water / astral
  loaders, Knight `Kni-strt`/`-loca`/`-fila`/`-filb`/`-goal`,
  Rogue `Rog-strt`/`-loca`/`-goal`/`-fila`/`-filb`,
  `HDeaf [2]`, or `mattacku` gameover abort.
  Do **not** add trailing `confdir` to shared `getdir` (D-1815).
- **Luck still runs when invulnerable.** Dialogues do not
  (`timeout.c:623`). STONED/SLIMED expiry silent (`done_timeout`).
- **`sit.js` lay-egg `morehungry` still not awaited.** `losedogs`
  still rebuilds `migrating_mons`. Strict-check leaks — run per file.
  DUMPLOG retired (D-1776). Clone drift: zap useupf; detect/potion/
  read/spell `useup`; Elbereth; teleport `accessible`; helm_simple_name
  4 clones; pickup `ysimple_name`; getobj_* clones in do/wield/potion/
  apply/write.

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
  (D-1189). Do not skip D-1190…D-1833.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip
  painting spaces or emit mid-row space runs >4 (D-0931). Do not
  FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092).
  Do not blanket-restore overlay `_pending_message` (D-0929).
  Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide
  RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from
  `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers
  (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) /
  skip `tutorial()` (D-1066). Do not skip D-1067…D-1833.
- Do not import `monmove.js` `sticks` for sit / rewrite
  `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) /
  bones→options fruitadd (D-1541). No `reset_glyphmap` /
  `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`.
  No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No
  static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`.
  Do not re-port D-1682…D-1833.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-1833: E uses C `is_blade` (P_DAGGER..P_SABER) / wand / `oc_tough`. Named: W already-wearing `armor_simple_name` / `armcat_to_wornmask`; dungeon.c `surface` terrain 
- D-1832: Unhandled keys `tty_nhbell` only (no `docrt`/`cls`). Named: `process_menu_window` paging `docorner` repair (`previous_page_lines`); PICK_ANY invert-al
- D-1831: `set_bot_disabled` around `select_menu_*` / `getlin` / pickinv / Named: `process_menu_window` paging `docorner` repair
- D-1830: `load_rog_strt` from the lua body: solidfill STONE + Named: humidity-aware `get_location`; `spo_end_moninvent`
- D-1829: `load_kni_strt` from the lua body: solidfill ROOM + mines fg=bg="." Named: humidity-aware `get_location`; `spo_end_moninvent`
- D-1828: `load_astral` from the lua body: solidfill + mazelevel+noteleport Named: humidity-aware `get_location`; `ensure_way_out`;
- D-1827: `load_water` from the lua body: solidfill + mazelevel+noteleport Named: water cons pickup / `maybe_adjust_hero_bubble`;
- D-1826: `load_medusa_2` from the lua body: solidfill + mazelevel+noteleport, Named: humidity-aware `get_location`; `ensure_way_out` /
- D-1825: port the remaining 14 arms from the C bodies; `mcast_spell` Named: `mon_spell_hits_spot` (fire-pillar/lightning
- D-1824: loop bound 14 matching lua `:44–57`. Named: humidity-aware `get_location`; `spo_end_moninvent`
- D-1823: `load_minend_3` from the lua body: solidfill HWALL (so Named: ensure_way_out; link_doors_rooms; map_cleanup;
- D-1822: `load_bigrm_1` (solidfill + 18×75 room; `percent(80)` then Named: ensure_way_out; humidity-aware `get_location`;
- D-1821: `load_bigrm_5` (solidfill + 19×74 diamond; `percent(25)` Named: ensure_way_out; humidity-aware `get_location`;
- D-1820: `load_soko2_2` from the lua body: solidfill + mazelevel 22×13 Named: ensure_way_out; humidity-aware `get_location`;
- D-1819: `load_bar_goal` from the lua body: solidfill + mazelevel map, Named: humidity-aware `get_location`; `spo_end_moninvent`
<!-- landmarks:end -->
