# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Current unit:** seed0030 seg9 @16635 — post-bones `m_move` (`rn2(8)` vs
  `rn2(5)`). Entity count fixed (D-0275).
- **Hypothesis:** after ghostly remap, mon candidate / `m_move` guard differs
  (not missing bones entity).
- **Falsifier:** dump fmon after `try_load_bones`; peel C `m_move` branch at
  first post-ident call; mismatch moves past 16635.
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
- Recent seg9 falsified theories: D-0262…D-0273 — see `DIVERGENCE-INDEX.md`.
- **Don’t:** treat missing Invis `rn2(11)` alone as enough when `couldsee`
  is false — check SCORR/`viz_clear` (D-0269).
- `vision_recalc(1)` ≠ `unblock_point` / `recalc_block_point`.
- **Don’t:** early-return `make_corpse` on `G_NOCORPSE` before undead
  specials — zombies/mummies/vampires map via `undead_to_corpse` (D-0271).
- **Don’t:** omit `find_roll_to_hit` Luck when full moon / friday13
  changed `uluck` — miss vs hit at equal dieroll (D-0272).
- **Don’t:** ordinary `corpse_chance` `rn2(tmp)` for AT_BOOM — C burns
  `d(damn,damd)` then `mon_explodes` (D-0273).
- **Don’t:** stuff Doom:4 migrating giant rat into Mines bones to pad
  next_ident count — wrong entity; movement desyncs immediately after.
- **Don’t:** skip `done_object_cleanup` — fatal `thitu` leaves limbo
  `_thrownobj` off `fobj` (D-0275; 48 vs 49).

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
- Bones VFS: `bon${boneid}0.${dlevel}` under `vfs:bones/`; Elara Mines
  `bonM0.1` → Hermione branch load (D-0274); limbo missile via
  `done_object_cleanup` (D-0275).
