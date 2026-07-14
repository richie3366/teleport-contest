# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Current unit:** seed0030 Scr **1398**/1953 RNG **FULL**; cell first-miss **@791**.
- **@791:** C `The little dog picks up a glass wand.` vs JS `… glass wand (0:6)`.
- **Hypothesis:** pet pickup / wand `doname` shows charges when C does not
  (`known`/`spe` display for floor/minvent wand).
- **Falsifier:** @791 topline match; Scr↑.
- **Fixed:** D-0315 Priest `xname`/`doname` force `bknown` — @787
  `a cursed candy bar`; Scr 1395→1398. Prior “map overlay” theory wrong
  (text was `cursed` vs `candy`).
- **#340 score:** 19/44; Scr **2831**/11405; next full @#345.
- **Alt:** seed0013 Scr 57/59; seed0107 @2684.
- **Parked:** D-0006; seed2200 @158 RC/`$HOME`.

## Don’t re-check (≤15)

- Do not gate on raw RNG index/coordinates.
- Role `mnum` = PM_* IDs, never roles[] index; roles[] order matches C.
- Ctrl-rush `run=3`, capital run `run=1` (D-0261); session `\r`→`\n` = `C('j')`.
- **Don’t:** early-return `dochug` on `msleeping` — `disturb`/`rn2(7)` first (D-0278).
- **Don’t:** `can_make_bones` without `no_bones_level` (D-0279).
- **Don’t:** treat `dodrink` `ECMD_CANCEL` as time — `& ECMD_TIME` (D-0280).
- **Don’t:** leave `#quit` AC-only — unknown → `y` vi-move (D-0281).
- **Don’t:** `read_engr` maxelen from 80 — `BUFSZ`+feel-lit (D-0282).
- **Don’t:** botl `Dlvl` from `uz.dlevel` — use `depth()`; Mines BROWN (D-0283).
- **Don’t:** omit `m_throw` `tmp_at(DISP_FLASH)`; potion `oc_name_known` (D-0284/85).
- **Don’t:** skip AT_WEAP `mswings`; botl HP `<0→0` (D-0286/87);
  skip `bot` when `uhp==-1` — keep prior botl (D-0310);
  live-paint botl on every flush/`more` — C `pline`→`flush`→`bot`, `more` no bot (D-0314);
  omit `cls` `botlx` / spell `uen` `botl` when gating status on `bot()` (D-0314).
- **Don’t:** invent-disclose yn when `disclose:-i`; RIP needs Tourist XP (D-0288/89).
- **Don’t:** omit RIP trailing blank putstr / `topten` after RIP (D-0290/91).
- **Don’t:** emit true amulet name when `!oc_name_known` — `<descr> amulet` (D-0292);
  leave TOOL/WEAPON `!nn` as actualn — use `OBJ_DESCR` (D-0305);
  skip WAND `!nn` descr — `"%s wand"` + zap `dknown` (D-0309);
  leave SCROLL `!nn` as actualn/`obj.known` — unlabeled/labeled arms (D-0312);
  leave `uhitm` private `mon_nam` — import `do_name` (D-0308);
  omit death `paybill` — angry shk takes possessions before flush (D-0311);
  bare `pmname` for isshk death — honorific + `shkname` + `KILLED_BY` (D-0313);
  omit Priest `xname`/`doname` `bknown=1` — BUC always known (D-0315);
  blanket `observe_object` in `xname` without `distantname` (regresses map).
- Runner `Screen N/M` = total matches, not prefix length; contiguous cell
  miss can precede a later named topline peel (D-0311→@594 while @583 RIP open).

## Landmarks (≤15)

- STAIRS: `known_branch_stairs` → yellow else gray; `ladder & LA_DOWN` (D-0162).
- `goto_level` descend: `stairway_find_from(&u.uz0, at_ladder)` (D-0224).
- tty map: col = map_x−1; row = map_y+1; DEC: CSI/`SO`/`SI` (D-0253).
- Session step: `steps[i].key === moves[i-1]` (D-0238).
- `armoroff`: `nomul(-oc_delay)` + `afternmv` (D-0259).
- `newmonhp` level-0: basehp=1; boost to min 2 (D-0260).
- `more()`: space/CR/ESC only (topl `xwaitforspace`).
- Shop mimic: after depth `rn2(10)`, `get_shop_item` (D-0262).
- Fountain gem fate 27/24 → `dofindgem`/`rnd_class` (D-0263).
- `dochug` NEED_HTH wield can spend turn (D-0264).
- `hitval`: always `oc_hitbon` / extract `a_ac` (D-0265).
- Hero MAGIC_TRAP → `domagictrap` (D-0266).
- `m_move`: `set_apparxy` **before** mtame/shk|gd|priest (D-0267).
- Key attribution ≠ RNG order (0-RNG `--More--`) (D-0228).
- Bones / disclose / RIP / topten / amulet / DEC altar / noises / Monnam /
  map_invisible / mimic / vault+fountain/sink/shop / TOOL descr / shop enter /
  uhitm mon_nam / WAND descr / bot uhp==-1 / paybill / SCROLL unlabeled /
  done_in_by isshk / botl flush·bot·more / Priest bknown: D-0274…D-0315.
