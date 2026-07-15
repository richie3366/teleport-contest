# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Score:** **24/44** PASS (#410). RNG **255075**/792838 Scr **3854**/11405
  (+678 RNG / +8 Scr vs #405). seed0012 Scr **187**/308 cursors **297**/308.
- **Next:** seed0012 @screen58 `O` Options — C `doset_simple_menu`
  (`options.c`) NHW_MENU from `allopt[]` OptS_General…Status + heading
  `" %-30s "` + title `"Options"`; JS `doset_simple` is truncated
  corner-offset hand list. Cmd:
  `node frozen/ps_test_runner.mjs sessions/seed0012-monk-vault-escort.session.json`
  Falsify: dump screen 58; port menu build from C, not invent rows.
- **Note:** seed0012 positional RNG full; strict length still trailing
  (13902 vs 13878) — pre-existing.
- **Don’t re-check:** ice-box Contents stacks (D-0383); pickup
  INVORDER_SORT headers (D-0384); in_or_out_menu ATR/`*` (D-0382);
  chargen `roles.length` (D-0379); Monk Pw SPELL_LEV_PW (D-0380);
  locked Hmmm (D-0381).
- **Landmark:** vault door (71,13); dig + restfakecorr; SPELL_LEV_PW(1)=5.
- **Parked:** D-0006; seed2200 @158 RC.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate gates in production.
- Role `mnum` = PM_* IDs; Ctrl-rush `run=3`, capital `run=1`; `\r`→`\n`.
- **Don’t:** ice-box per-cobj without merge/`spe` gender (D-0383);
  pickup menu without INVORDER_SORT headings (D-0384); `maybe_skip_seps`
  with `roles.length` (D-0379); omit `SPELL_LEV_PW(1)` (D-0380); locked
  without lknown Hmmm (D-0381); in_or_out_menu without ATR_INVERSE/`*`
  (D-0382); early-return `dochug` on `msleeping` (D-0278);
  `can_make_bones` without `no_bones_level` (D-0279);
  @13700 as pri_move alone (D-0378); @13576 as dog_move alone (D-0377);
  @13517 bag put-in (D-0376); @13392 fleeck (D-0375); @13287 wipe
  (D-0374); @12489 fleeck (D-0373); @12439 gethungry (D-0372).
- Runner `Screen N/M` = total matches, not prefix length.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig + restfakecorr restores wall (D-0377/78).
- Vault `invault` timer 30 → `makemon(PM_GUARD)` + getlin (D-0374).
- Apply bag take-out `a?jo$\r`; put-in `aji$\r$\r` (D-0375/76).
- Shop home (11,11): mill → (11,12); return needs `onlineu` (D-0376).
- Monk starter: `SPELL_LEV_PW(1)` bump when `num_spells()` (D-0380).
- Ice-box look: merge+sortloot stacks (D-0383); pickup class headers
  (D-0384).
- D-0274…D-0384: see index.
