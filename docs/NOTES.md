# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Current unit:** seed0030 Scr **1147**/1953 RNG **FULL**; prefix **@372**.
- **Probe @372:** tty r12c25 → map **(26,11)** CORR. After key `u`
  (23,7)→(24,6): JS `couldsee`+`cansee`+`lit`+rem `#`; C blank.
  Door (26,10) D_NODOOR. Room1 bbox lx21–26,ly4–12 lights CORR strip.
  @371 both blank at that cell.
- **Hypothesis:** JS `view_from`/`vision_recalc` grants LOS through
  doorway from (24,6) when C does not (or C `lit`/bbox differs).
- **Falsifier:** C-state `viz_array[11][26]` + `levl[26][11].lit` at
  that step; or reconstruct doorway LOS in `vision.c` vs JS.
- **Also:** seg7 JS 159 vs C 172 steps (after @372).
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
- **Don’t:** skip AT_WEAP `mswings`; botl HP `<0→0` (D-0286/87).
- **Don’t:** invent-disclose yn when `disclose:-i`; RIP needs Tourist XP (D-0288/89).
- **Don’t:** omit RIP trailing blank putstr / `topten` after RIP (D-0290/91).
- **Don’t:** emit true amulet name when `!oc_name_known` — `<descr> amulet` (D-0292).
- **Don’t:** DEC altar as ASCII `_` — meta-`{` (D-0293); omit `noises()` on
  out-of-sight `missmm`/`hitmm` (D-0294); `Monnam` without `!canspotmon`→`it`
  (D-0295); `missmm` without `map_invisible` when Magr unseen (D-0296);
  draw disguised mimics as mlet — `display_monster` M_AP_OBJECT (D-0297);
  vault `dosounds` RNG-only — emit `You_hear` (D-0298); leave nearby
  generic gems gray — `map_object`/`see_nearby_objects` observe (D-0299);
  leave `newsym` !cansee+no-memory as no-op — paint blank (D-0300);
  ignore `missmu` `nearmiss` — `"just "` when verbose (D-0301).
- Runner `Screen N/M` = total matches, not prefix length.

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
  map_invisible / mimic M_AP_OBJECT / vault dosounds / nearby observe /
  newsym unseen blank / missmu just: D-0274…D-0301.
