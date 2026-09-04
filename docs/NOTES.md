# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Open `pline.c` `vpline` next** (Must-fix empty). msgtype_type /
  execplinehandler / maybe_play_sound. Not pline wrapper. Not a
  seed0030 peel. Map-driven / cluster density — do not invent a
  FAIL peel.
- **seed0030** still 39912/105529 after D-1797. First all-segments
  miss is C seg4 `randomize_gem_colors` vs JS still in seg3 combat
  (seg0 RNG OK 14300). Falsify that with `rng-diff --all-segments`
  on seed0030 — not by re-clearing `usleep`.
- **Luck still runs when invulnerable.** Dialogues do not
  (`timeout.c:623` return). STONED/SLIMED expiry stays silent
  (`done_timeout` omitted).
- **`sit.js` lay-egg `morehungry` still not awaited.** `losedogs`
  still rebuilds `migrating_mons`. `strict-output-check.mjs` leaks
  across sessions — run per file. DUMPLOG retired (D-1776).
- Clone drift: `zap.js` useupf; detect/potion/read/spell `useup`;
  `qst_guardians_respond`; Elbereth; teleport.js `accessible`.
  helm_simple_name still 4 clones (D-1799 inlined at piercer only).
  pickup.js `ysimple_name` clone stays (attrib clone deleted D-1802).
  getobj_* clones in do/wield/potion/apply/write still local prompts.

## Don't re-check (≤15)

- Do not re-port `getdir` help_dir / cmdassist / strange-direction
  NEED_MORE / `dxdy_moveok` (D-1806) or `yn_function` fuzzer
  `rn2(20)`/`rn2(ln)`/ESC retry / mismatch `impossible` /
  `input_state=otherInp` (D-1805) or `getobj` in_doagain `readchar` /
  GETOBJ ranks / sortloot INVLET / `#adjust` live getobj (D-1804) or
  `x_monnam` remaining / `nextmbuf` / `lcase` / `just_an` /
  EXACT_NAME 0x1F (D-1803) or `xname_flags` `xcalled` / gameover
  T_SHIRT / `apron_text` / `hawaiian_motif` / CANDY_BAR (D-1802) or
  `moveloop_core` `do_storms` / `glibr` / `mkot_trap_warn` /
  `end_of_input` (D-1801) or `test_move`/`domove_core`
  water_friction / avoid-trap-or-liquid / fight bars+web /
  mention_walls (D-1800) or `spoteffects` recursion / lev `rn2(2)` /
  Warning ice / piercer surprise (D-1799) or `dochug` remaining /
  `wormhitu` (D-1798) or `nomul`/`unmul` `usleep=0` / nomul
  `uinvulnerable` (D-1797) or `xkilled` LEVEL_SPECIFIC / pool /
  artifact un-create (D-1796). Named: mouse `_` getpos; getdir
  fuzzer; `cmd_from_func` keys; rhack `dxdy_moveok`; SND_SPEECH;
  DUMPLOG_CORE; paniclog file; interned yn; display_pickinv;
  getobj_* clones; readchar_core fuzzer/queue; priestname; article
  arms, `armor_simple_name`, `find_artifact`, `hawaiian_design`/
  doread; `buzz`/`dobuzz`, `amulet()`, `intervene`; lookaround,
  air_turbulence, Known_wwalking, autodig/`worm_cross`,
  `exercise_steed`; pooleffects leave-water / `failing_untrap`
  writer; `demon_talk`, `cuss`. Do not treat usleep as seed0030’s
  first token. No second `accessible` export. No trailing `confdir`
  in shared `getdir`.
- Do not re-port `mattacku` Underwater/undetected/mimic/Invis/eel/
  invulnerable/DISE/DREN/cancelled-WEAP/home-elem/Snickersnee/`bot()`/
  sleep `rn2(10)` (D-1795). Do not delete that sleep arm. No second
  `m_monnam` / `simple_typename` (`lock.js` clone stays) / `ceiling`
  / `is_home_elemental`. Do not glue `hitmu`. Do not omit
  `flush_screen(1)` for seed4500: that 13-cell `#wizintrinsic` DEAF
  `[2]` is D-1792 (RNG full).
- Do not re-port `make_corpse` special table (D-1794) / `dmgval`
  bonus `rnd()` (D-1793) / `nh_timeout` dialogues+luck (D-1792) /
  `newuhs` (D-1791) / `monverbself` genders[3] (D-1790). No second
  `free_mgivenname` / `clear_dknown` / `is_axe` / `carrying` /
  `end_running`.
- Reviews **728–736** AWD held; **747**=D-1786 `uball`; **748**=D-1787;
  **750**=D-1788; **752**=D-1789 — no `stay` rebuild. No `u.Punished`.
  No `rn2(20)` on ordinary pit farlook. No rubber-stamp fortress.
- Do not re-check 40/44 at D-1765/66; seed0014 was I-glyph `newsym`
  (D-1774). findone tail is D-1775.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse D-1582.
  ParanoidTrap portal yn / `domagicportal` / `undestroyable_trap`
  / `mktrap` dst / `goto_level` uz0 are D-1187/1188.
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1806.
- Don't re-apply D-0480 **glyph** `tty_map_color` (D-0483).
- Don't skip painting spaces or emit mid-row space runs >4 (D-0931).
- Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092).
- Do not blanket-restore overlay `_pending_message` (D-0929).
- Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide
  RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask`
  (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) /
  omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()`
  (D-1066). Do not skip D-1067…D-1806.
- Do not import `monmove.js` `sticks` for sit / rewrite
  `confer_oc_oprop` / re-port `eyecount` / delete emin / stub
  `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`.
  No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static
  `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. No trailing
  `confdir` in shared `getdir`. Do not re-port D-1682…D-1806.

## Landmarks (≤15)

- D-1806: `getdir` help_dir / cmdassist / strange-dir NEED_MORE /
  `dxdy_moveok`. Named: mouse getpos; fuzzer; `cmd_from_func` keys;
  rhack `dxdy_moveok`.
- D-1805: `yn_function` fuzzer `rn2(20)`/`rn2(ln)`/ESC retry +
  mismatch `impossible` + `input_state=otherInp`. Named: SND_SPEECH;
  DUMPLOG_CORE; paniclog file; interned yn; getdir fuzzer.
- D-1804: `getobj` in_doagain `readchar` + GETOBJ ranks + sortloot
  INVLET filter; `#adjust` live getobj. Named: display_pickinv;
  getobj_* clones; readchar_core fuzzer/queue.
- D-1803: `x_monnam` remaining + `nextmbuf` / `lcase` / `just_an` /
  EXACT_NAME 0x1F. Named: priestname.
- D-1802: `xname_flags` `xcalled` + gameover T_SHIRT/`apron_text`/
  `hawaiian_motif`/CANDY_BAR. Named: article arms, `armor_simple_name`,
  `find_artifact`, `hawaiian_design`/doread.
- D-1801: `moveloop_core` `do_storms` / `glibr` / `mkot_trap_warn` /
  `end_of_input`. Named: `buzz`/`dobuzz`, `amulet()`, `intervene`.
- D-1800: `test_move`/`domove_core` water_friction / avoid-run /
  fight bars+web / mention_walls. Named: lookaround, air_turbulence,
  Known_wwalking, autodig/`worm_cross`, `exercise_steed`.
- D-1799: `spoteffects` recursion / lev timeout / Warning ice /
  hidden-mon. Named: pooleffects leave-water; `failing_untrap` writer.
- D-1798: `dochug` remaining + `wormhitu`. Named: `demon_talk` /
  `cuss`. findgold invent[] (D-1691).
- D-1797: `nomul`/`unmul` `usleep=0` + nomul `uinvulnerable=FALSE`.
  Named: Upolyd survived-that form. seed0030 first miss is not this.
- D-1796: `xkilled` LEVEL_SPECIFIC + pool gate + artifact un-create.
  Named: flooreffects; `sobj_at` boulder; MAIL; wasinside; quest align.
- D-1795: `mattacku` remaining + `getmattk` DISE/DREN/WEAP/home-elem.
  Named: `hitmu`; SEDUCE=0; uhitm `prev_result`; lock.js clone.
- D-1794: `make_corpse` special table + bury/bypass/oname/Blind tail.
- D-1793: `dmgval` vs-mon bonus `rnd()` + erosion; `is_axe` export.
- D-1792: `nh_timeout` dialogues + `stone_luck`; luck while invuln.
