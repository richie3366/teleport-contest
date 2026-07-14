# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Current unit:** seed0030 Scr **161**/1953 with RNG **FULL** 105529
  (D-0290). Prefix first-miss **78** (was 76).
- **Hypothesis:** `topten()` after RIP not ported; C shows score list while
  JS starts next segment.
- **Falsifier:** Scr@78 C "You made the top ten list!" vs JS Brigid welcome.
- **Alt:** seed0013 Scr 57/59; seed0107 @2684.
- **Parked:** D-0006 (pet movement); seed2200 @158 RC/`$HOME`.

## Don’t re-check (≤15)

- Do not reject dart in `can_carry`; earlier C turn APPORTs it.
- Do not treat `LOST_THROWN` as carry rejection.
- Do not gate on raw RNG index/coordinates.
- Role `mnum` = PM_* IDs, never roles[] index; roles[] order matches C.
- `roles.name.f` null where C has 0 (D-0138); no same-string `f===m` proxy.
- No Tourist Aloha/neutral/HP:10 hardcodes in `allmain`.
- Unique `#` extcmds still need Enter (`#levelchange`).
- `'f'`→`dofire` needs fireassist when bow is only in `uswapwep` (D-0069).
- Ctrl-rush `run=3`, capital run `run=1` (D-0261); always `await pline` on
  muse wand paths / `potionhit` (D-0284).
- Session `\r` → `\n` = `C('j')` rush (D-0259); `rushDirFromCtrl` 1..26.
- seg8 fleeck/missing-katana were key desync (D-0261), not dog_move/dodrop.
- Recent seg9 falsified theories: D-0262…D-0278 — see `DIVERGENCE-INDEX.md`.
- **Don’t:** early-return `dochug` on `msleeping` — C calls `disturb`
  (`rn2(7)` wake gate) first (D-0278).
- **Don’t:** burn `can_make_bones` depth rn2 without `no_bones_level` —
  Mines-stair Dlvl2 is `Is_branchlev && dlevel>1` (D-0279).
- **Don’t:** treat `dodrink` `ECMD_CANCEL` as time — use `& ECMD_TIME`
  (D-0280); truthy CANCEL burned an extra movemon turn.
- **Don’t:** leave `#quit` AC-only — unknown → `y` vi-move (D-0281).
- **Don’t:** `read_engr` maxelen from 80 — use `BUFSZ`+sizeof feel-lit
  (D-0282); long pline needs update_topl `\n` + redotoplin `more()`.
- **Don’t:** botl `Dlvl` from `uz.dlevel` — use `depth()` (D-0283); Mines
  walls use `wallcolors` BROWN not main GRAY→NO_COLOR.
- **Don’t:** omit `m_throw` `tmp_at(DISP_FLASH)` — prior-cell `!` stays
  through potionhit `--More--` (D-0284); potion `xname` uses
  `oc_name_known` not `obj.known` (D-0285).
- **Don’t:** skip AT_WEAP `mswings` — bow melee emits swing pline before
  hit (D-0286); botl HP display clamps `<0→0` (D-0287).
- **Don’t:** always invent-disclose yn — honor `disclose:-i` as
  `DISCLOSE_NO_WITHOUT_PROMPT` (D-0288); RIP needs Tourist
  `more_experienced(depth)` on new `goto_level` (D-0289).
- **Don’t:** omit RIP trailing empty putstr — 24 lines force page-2 blank
  `--More--` via `process_text_window` (D-0290).

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
- Bones / disclose / RIP / botl / flash / mswings: D-0274…D-0290 (see index).
