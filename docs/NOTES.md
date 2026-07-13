# Working notes (scratchpad)

Not a progress log. See `.cursor/rules/agent-notes.mdc` for what belongs here.
Wipe or rewrite freely; keep only live traps and the current hypothesis.

---

## Active

- **Current unit:** D-0181 — monster `trapeffect_rocktrap` ported; seed0030
  @13987 still blocked on hostile `m_move` gettrack.
- **Hypothesis / next:** C dwarf at (27,7) uses `!should_see`→`gettrack` so
  nearer is ROCKTRAP (27,6) not dig (28,6). Wiring `tooFar && gettrack`
  first diverges newt @10676: JS track→(56,5) vs muxWould→(56,6) with
  mux=u=(43,16); then @10701 C `rn2(20)` vs JS `rn2(24)` mtrack.
  Falsify why C does not take that track pick (ring contents / should_see /
  mux) before re-enabling hostile gettrack.
- **Falsifier / next:**
  ```bash
  node scripts/rng-diff.mjs sessions/seed0030-ten-diverse-deaths.session.json
  # expect first mismatch past 13987 only after gettrack matches C @10676
  node frozen/ps_test_runner.mjs sessions/seed0101-ranger-quiver-throw-travel-engrave.session.json
  # expect Scr >21/27 if residual display peel advances
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
  to (28,6) dig because hostile `m_move` omitted gettrack so mux nearer
  beat ROCKTRAP (27,6) (D-0181). Do not burn dig to fake rocktrap.
- **Hostile gettrack is not a free wire** — `tooFar && gettrack` first
  diverges newt @10676 track vs mux pick before the dwarf rocktrap
  (D-0181). Diagnose C vs JS at 10676 before re-enabling.
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
  (D-0181; wiring deferred).
- `can_track` ≡ `haseyes` (Excalibur named omission) (D-0181).
- Digger postmov: `tunnels` && !Rogue → `can_tunnel`; `ALLOW_DIG` in
  mfndpos; every moved digger with `may_dig` calls `mdig_tunnel` which
  **always** burns `rnd(12)` first (D-0178).
- Mines `fill_lvl`/`makemaz(minefill)` + dungeon align `&7` (D-0171).
