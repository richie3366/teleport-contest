# Working notes (scratchpad)

Not a progress log. See `.cursor/rules/agent-notes.mdc` for what belongs here.
Wipe or rewrite freely; keep only live traps and the current hypothesis.

---

## Active

- **Current unit:** D-0185 — seed0030 @14118 `m_move` cnt (after D-0184).
- **Hypothesis / next:** JS gnome path `(61,6)→(60,7)→(59,8)→(58,9)→(57,10)`
  with matching `rn2(32)` cnt=8 along the open cells; at `(57,10)` JS
  `cnt=6` from pass_two STONE→wallify corners `(56,9)`/`(56,10)`. C
  `rn2(32)` ⇒ either C landed elsewhere after @14074 (gg/mtrack/
  occupancy) on a cnt=8 cell, or C map kept those cells ROOM.
- **Falsifier / next:**
  ```bash
  node scripts/rng-diff.mjs sessions/seed0030-ten-diverse-deaths.session.json
  # At JS @14074 (58,9)→(57,10): dump mtrack/poss/gg/occupancy; find
  # which alternate dest would give C cnt=8 @14118. Do not open walls
  # from the trace. mkmap pass_two already explained JS STONE there.
  ```
- **Parked deep canary:** D-0006 pet movement — do not implement until C
  state/candidate capture exists.
- **Parked seed2200 @158:** RC config path — harness `$HOME`, not a port bug.

## Don’t re-check

- Do not reject the dart in `can_carry`; an earlier C turn APPORTs it.
- Do not treat `LOST_THROWN` as a carry rejection; C does not.
- Do not gate on raw RNG index/coordinates.
- Role `mnum` must be monster-table IDs (`PM_ROGUE=338`), never roles[] index.
- **roles[] order must match C** (Rogue before Ranger) — pantheon
  `randrole` uses roles[] indices.
- **roles `name.f` is null where C has 0** — only Caveman/Priestess keep
  distinct `f`. Welcome gender uses `!name.f` **and** both-genders
  allow mask (D-0138). Do not restore same-string `f===m` proxy.
- Do not hardcode Tourist `Aloha` / `neutral` / `HP:10` in `allmain`.
- Do not auto-submit unique `#` extcmds without Enter — regresses
  `#levelchange` (seed0361).
- Binding `'f'`→`dofire` **without** fireassist swap when bow is only in
  `uswapwep` makes `l` a real shot; C eats `l` in swap `prinv` `--More--`
  (D-0069).
- seed0102 @ 4451 was `udist` from leaked `l`, not APPORT/`can_carry` or
  `dog_goal` formula (D-0069).
- seed0102 Scr 0/25 was not topline-only: map `?` was missing MLET_CH /
  furniture terrain (D-0070).
- getdir invalid key must **not** retry after `help_dir` (C returns 0);
  topline pline+`--More--` is wrong — need NHW_TEXT (D-0071).
- Legacy Book overlay: `maxcol = strlen+1` (tty_putstr), not bare strlen;
  NHW_MENU paints leading pad then text at `offx+1` (D-0071).
- **lookaround must not `end_running` on ahead STONE/wall** — C treats
  IS_OBSTRUCTED as uninteresting and may corridor-turn for run==1 (D-0072).
- seed2200 help `g` stub was **not** missing opthelp file — real
  `option_help` NHW_TEXT from `allopt[]` (D-0091). RC path line is
  harness `$HOME` (elided by `verify-rerecord`); do not bake in
  recording absolute paths.
- **seed2200 Scr 162 msg_window `(not applicable)` was extractor bug**
  — `#if PREV_MSGS /* tty or curses */` comments made `eval_expr` fail →
  False → else branch (D-0114). Do not hardcode the descr.
- **seed0106 Scr 5 was NOT enhance/overview-first** — JS forced DEC
  walls/floors without `symset:DECgraphics`; C Primary ASCII (D-0115).
  All current PASS cohort sessions set `symset:DECgraphics`.
- **seed0030 @13987 was NOT missing dig/`rnd(12)` alone** — C
  `trapeffect_rocktrap` `t_missile(ROCK)`→`next_ident`; JS dwarf walked
  to (28,6) (D-0181).
- **Hostile gettrack without `goto_level` initrack is wrong** — stale
  prior-level tracks redirect newt @10676; C `savelev`→`save_track`→
  `initrack` clears on leave (D-0181).
- **Dwarf @13987 is NOT missing gettrack redirect** — no adjacent track
  in current-level ring (3 cells) nor in full stale ring (D-0181).
- **Dwarf @13987 was missing `m_search_items`** — ROCKTRAP (27,6) pile
  (CORPSE/SLIME_MOLD/glass) redirects gg; mux-nearer dig (28,6) loses
  (D-0182). Do not re-chase mfndpos exclude of (28,6).
- **@14026 was NOT actor-order / cnt drift** — PM_GNOME @(57,11) on
  WORTHLESS_BLUE_GLASS returned underfoot `MMOVE_DONE` (JS postmov
  ignored DONE→no mpickstuff) while C continued to mtrack `rn2(28)`
  (D-0183). Do not re-chase fleeck actor skips.
- **@14056 was NOT wrong catch_chance / DEX** — JS never reached
  `u_catch`; C threw via `muse` `use_offensive` POT_SLEEPING while JS
  `thrwmu` ARROW + URETREATING `rn2(5)` aborted (D-0184). Do not
  “fix” catch_chance from the coincident `rn2(5)` values.
- **`potionhit` must `obfree` not `delobj`** — `delobj` burns
  `obj_resists` `rn2(100)`; C `obfree` does not (D-0184).
- **`makeknown` after vapor needs flight `observe_object`** — thrower
  `!cansee` still IDs potion when missile crosses visible cells (D-0184).
- **@14118 walls are from `mkmap_pass_two` count==5** — ROOM→STONE at
  `(56,9)`/`(56,10)` after pass1; join never carved; wallify→corners;
  only 2 C `mdig_tunnel` before 14118 (neither near there). Do not
  force-open walls or re-chase dig-open (D-0185).
- **mkmap N_P1/P2/P3_ITER is 1/1/2** — JS already matches; pass_two
  logic matches C `new_loc` (D-0185).
- **`monattk.h`: AT_WEAP=254, AT_MAGC=255, AT_SPIT=10** — never use 10 for
  weapon (D-0179).
- Hostile `m_move`: before place, `m_digweapon_check` may return
  MMOVE_DONE (wield pick/axe); hero-square returns MMOVE_NOTHING so
  dochug can `mattacku` (D-0180).

## Landmarks

- STAIRS glyph: `known_branch_stairs(stairway_at)` → CLR_YELLOW;
  else CLR_GRAY (tty NO_COLOR); direction from `ladder & LA_DOWN`
  (D-0162). Dlvl1 upstairs is traversed branch.
- `clear_level_structures` / `goto_level`: clear `fobj` **and**
  `_objects_at` (C `level.objects[][]=0`) and `head_engr` (D-0161).
- Monster ROCKTRAP: `t_missile(ROCK)`→`mksobj` `next_ident`+`rn1(6,6)`
  then `thitm(..., d(2,6))`; seetrap only if `canseemon` (D-0181).
- Hostile `m_move` should_see: `couldsee(omx,omy) && (goal.lit ||
  !mon.lit) && dist2<=36`; else `can_track`→`gettrack` redirects gg
  (D-0181).
- `goto_level` must `initrack` like C savelev release (D-0181).
- `can_track` ≡ `haseyes` (Excalibur named omission) (D-0181).
- Hostile getitems: `(!peaceful || !rn2(10))` + `!Rogue` →
  `m_search_items` may redirect gg to floor loot (D-0182).
- Underfoot loot claim in `m_search_items` deferred until
  postmov `mpickstuff` (D-0183); distant redirects still set gg.
- `can_carry`: peaceful non-pets return 0 (D-0183).
- Offensive potions: `mattacku`→`find_offensive`/`use_offensive` before
  AT_WEAP; `m_throw` POTION→`potionhit` (not `thitu`); vapor
  `makeknown` needs flight `observe_object` (D-0184).
- Digger postmov: `tunnels` && !Rogue → `can_tunnel`; `ALLOW_DIG` in
  mfndpos; every moved digger with `may_dig` calls `mdig_tunnel` which
  **always** burns `rnd(12)` first (D-0178).
- Mines `fill_lvl`/`makemaz(minefill)` + dungeon align `&7` (D-0171).
- seed0030 @14118: JS gnome path ends `(57,10)` `cnt=6` vs C `rn2(32)`;
  walls from pass_two at `(56,9)`/`(56,10)` (D-0185).
