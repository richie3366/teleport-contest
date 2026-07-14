# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Current unit:** seed0030 seg9 @10811 — **D-0271** — after D-0268…D-0270,
  C `rnd(2) @ next_ident(mkobj.c:521)` vs JS `rn2(5)`.
- **Hypothesis:** post-kill / corpse / drop arm skips `next_ident` or takes a
  different object-create path so a later `rn2(5)` fires first.
- **Falsifier:** attribute JS caller at first mismatch; port missing C branch.
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
  muse wand paths.
- Session `\r` → `\n` = `C('j')` rush (D-0259); `rushDirFromCtrl` 1..26.
- seg8 fleeck/missing-katana were key desync (D-0261), not dog_move/dodrop.
- Recent seg9 falsified theories: D-0262…D-0270 — see `DIVERGENCE-INDEX.md`.
- **Don’t:** treat missing Invis `rn2(11)` alone as enough when `couldsee`
  is false — check SCORR/`viz_clear` (D-0269).
- `vision_recalc(1)` ≠ `unblock_point` / `recalc_block_point`.

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
- `m_move` Invis `should_see && rn2(11)` → `appr=0` (D-0268); SCORR
  uncover must `recalc_block_point` (D-0269).
- Key attribution ≠ RNG order (0-RNG `--More--`) (D-0228).
