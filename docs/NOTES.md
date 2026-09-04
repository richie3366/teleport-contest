# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Open `muse.c` `use_offensive` remaining next** (Must-fix empty).
  Wand / horn / scroll cases. Not use_defensive. Map-driven /
  cluster density — do not invent a FAIL peel.
- **seed0030** still 39912/105529 after D-1797. First all-segments
  miss is C seg4 `randomize_gem_colors` vs JS still in seg3 combat
  (seg0 RNG OK 14300). Falsify with `rng-diff --all-segments`.
- **Luck still runs when invulnerable.** Dialogues do not
  (`timeout.c:623`). STONED/SLIMED expiry silent (`done_timeout`).
- **`sit.js` lay-egg `morehungry` still not awaited.** `losedogs`
  still rebuilds `migrating_mons`. Strict-check leaks — run per file.
  DUMPLOG retired (D-1776). Clone drift: zap useupf; detect/potion/
  read/spell `useup`; Elbereth; teleport `accessible`; helm_simple_name
  4 clones; pickup `ysimple_name`; getobj_* clones in do/wield/potion/
  apply/write.

## Don't re-check (≤15)

- Do not re-port `use_defensive` mreadmsg / reveal_trap /
  `mon_escape` / `mon_consume_unstone` (D-1809) or `domonnoise`
  remaps / `doconsult` / `priest_talk` / `shk_chat` (D-1808) or
  `vpline` `msgtype_type` / `execplinehandler` /
  `maybe_play_sound` (D-1807) or `getdir` help_dir / cmdassist /
  strange-dir NEED_MORE / `dxdy_moveok` (D-1806) or `yn_function`
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
  Named: horn/bugle/wand dig-tele-create; SOUND= soundmap; UNIX
  msghandler fork; doset MSGTYPE menu; mouse getpos; getdir
  fuzzer; `cmd_from_func` keys; rhack `dxdy_moveok`. No second
  `genus` / `doconsult` / `priest_talk` / `shk_chat` /
  `str_start_is` / `accessible` / trailing `confdir` /
  `locomotion` / `resists_acid`. Usleep is not seed0030’s first
  token.
- Do not re-port `mattacku` remaining / `getmattk` DISE/DREN/WEAP
  (D-1795). Keep sleep `rn2(10)`. No second `m_monnam` /
  `simple_typename` (`lock.js` clone stays). seed4500 DEAF `[2]` is
  D-1792 (RNG full) — do not omit `flush_screen(1)`.
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
  (D-1189). Do not skip D-1190…D-1809.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip
  painting spaces or emit mid-row space runs >4 (D-0931). Do not
  FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092).
  Do not blanket-restore overlay `_pending_message` (D-0929).
  Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide
  RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from
  `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers
  (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) /
  skip `tutorial()` (D-1066). Do not skip D-1067…D-1809.
- Do not import `monmove.js` `sticks` for sit / rewrite
  `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) /
  bones→options fruitadd (D-1541). No `reset_glyphmap` /
  `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`.
  No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No
  static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`.
  Do not re-port D-1682…D-1809.

## Landmarks (≤15)

- D-1809: `use_defensive` mreadmsg / reveal_trap / `mon_escape` /
  `mon_consume_unstone`. Named: horn, bugle, wand dig/tele/create/undead.
- D-1808: `domonnoise` remaps + `doconsult` / `priest_talk` / `shk_chat`.
  Named: other MS_*; `verbl_msg_mcan`; `night()` howl; save/rest `oracle_loc`.
- D-1807: `vpline` msgtype_type / execplinehandler / maybe_play_sound.
  Named: SOUND= soundmap; UNIX msghandler fork; doset MSGTYPE menu.
- D-1806: `getdir` help_dir / cmdassist / strange-dir / `dxdy_moveok`.
- D-1805: `yn_function` fuzzer `rn2(20)`/`rn2(ln)`/ESC retry + otherInp.
- D-1804: `getobj` in_doagain `readchar` + GETOBJ ranks + sortloot INVLET.
- D-1803: `x_monnam` remaining + `nextmbuf` / `lcase` / `just_an`.
- D-1802: `xname_flags` `xcalled` + T_SHIRT/`apron_text`/`hawaiian_motif`.
- D-1801: `moveloop_core` `do_storms` / `glibr` / `mkot_trap_warn`.
- D-1800: `test_move`/`domove_core` water_friction / bars+web / mention_walls.
- D-1799: `spoteffects` recursion / lev timeout / Warning ice.
- D-1798: `dochug` remaining + `wormhitu`. Named: `demon_talk` / `cuss`.
- D-1797: `nomul`/`unmul` `usleep=0` + nomul `uinvulnerable=FALSE`.
- D-1796: `xkilled` LEVEL_SPECIFIC + pool gate + artifact un-create.
- D-1795: `mattacku` remaining + `getmattk` DISE/DREN/WEAP/home-elem.
