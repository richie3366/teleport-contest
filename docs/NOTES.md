# Working notes (scratchpad)

Not a progress log. See `.cursor/rules/agent-notes.mdc` for what belongs here.
Wipe or rewrite freely; keep only live traps and the current hypothesis.

---

## Active

- **Current unit:** seed0030 @14235 (after D-0187 `weapon_hit_bonus`).
- **Hypothesis:** C `hitum`→`passive` burns `rn2(3)` when defender still lives
  and has `AT_NONE` (this mon: `damn=damd=0`, no prior `d()`); JS skips
  `passive` and jumps to `distfleeck` `rn2(5)`.
- **Falsifier:**
  ```bash
  node scripts/rng-diff.mjs sessions/seed0030-ten-diverse-deaths.session.json
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
- **@14118 was NOT missing wall openers / join / dig / pass_two** — C
  also has TRCORNER/BRCORNER at `(56,9)/(56,10)` with cnt=6 when gnome
  is at `(57,10)`. Real split: silent gg after `(59,8)` — C `gg=(59,12)`
  vs JS `gg=(57,11)` because JS never `mpickstuff`’d floor glass
  (D-0185). Do not FORCE-open walls or re-peel mkmap.
- **@14151 was NOT missing distfleeck** — PM_GNOME hands + quan=2
  WORTHLESS_VIOLET_GLASS: JS `can_carry` always returned 1 for quan>1 →
  `splitobj`/`next_ident`; C only returns 1 for `M1_NOHANDS` (D-0186).
- **@14231 was NOT missing second-hit / double_punch** — Tourist bare
  hands: JS `weapon_hit_bonus` stubbed 0 vs C unskilled b.h. **+1**, so
  `tmp<=dieroll` miss while C hit→`exercise` (D-0187). Do not re-chase
  distfleeck-before-hit theories.
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
- `can_carry`: peaceful non-pets return 0 (D-0183); **quan>1 → 1 only
  for `M1_NOHANDS` non-glomper** — hands monsters take full stack
  (D-0186).
- Offensive potions: `mattacku`→`find_offensive`/`use_offensive` before
  AT_WEAP; `m_throw` POTION→`potionhit` (not `thitu`); vapor
  `makeknown` needs flight `observe_object` (D-0184).
- Digger postmov: `tunnels` && !Rogue → `can_tunnel`; `ALLOW_DIG` in
  mfndpos; every moved digger with `may_dig` calls `mdig_tunnel` which
  **always** burns `rnd(12)` first (D-0178).
- Mines `fill_lvl`/`makemaz(minefill)` + dungeon align `&7` (D-0171).
- **postmov MOVED|DONE must `mpickstuff`** — without it floor loot
  stays and later `m_search_items` gg diverges silently (same RNG
  signature, different dest) (D-0185).
- **`weapon_hit_bonus(NULL)` bare-hand unskilled = +1** (not 0);
  Monk/Samurai martial `rnd(4)` barehands (D-0187).
