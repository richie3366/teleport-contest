# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Score:** **24/44** PASS (#405). RNG **254397**/792838 Scr **3846**/11405.
  seed0012 Scr **184**/308 cursors **294**/308.
- **Next:** seed0012 @screen31 ice-box `Contents of…` — C `sortloot` stacks
  vs JS one `doname` per cobj. Cmd:
  `node frozen/ps_test_runner.mjs sessions/seed0012-monk-vault-escort.session.json`
  Falsify: first content line C `2 jackal corpses` vs JS `a newt corpse`.
- **Note:** seed0012 positional RNG full; strict length still trailing
  (13902 vs 13878) — pre-existing, not D-0382.
- **Don’t re-check:** in_or_out_menu prompt bare ATR_NONE / `q -` (D-0382 —
  need ATR_INVERSE + SELECTED `*`); chargen `roles.length` (D-0379);
  Monk Pw without SPELL_LEV_PW (D-0380); locked without Hmmm (D-0381).
- **Landmark:** vault door (71,13); dig + restfakecorr; SPELL_LEV_PW(1)=5.
- **Parked:** D-0006; seed2200 @158 RC.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate gates in production.
- Role `mnum` = PM_* IDs; Ctrl-rush `run=3`, capital `run=1`; `\r`→`\n`.
- **Don’t:** `maybe_skip_seps` with `roles.length` (D-0379); omit
  `SPELL_LEV_PW(1)` after `num_spells` (D-0380); locked container without
  lknown Hmmm branch (D-0381); in_or_out_menu prompt without ATR_INVERSE
  or default without `*` (D-0382); early-return `dochug` on `msleeping`
  (D-0278); `can_make_bones` without `no_bones_level` (D-0279);
  @13700 as pri_move alone (D-0378 — restfakecorr);
  @13576 as dog_move alone (D-0377 — gd_move dig);
  @13517 bag put-in (D-0376); @13392 fleeck (D-0375); @13287 wipe (D-0374);
  @12489 fleeck (D-0373); @12439 gethungry (D-0372); @8802 dog_goal
  (D-0371); @8384 fountain (D-0370).
- Runner `Screen N/M` = total matches, not prefix length.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig + restfakecorr restores wall (D-0377/78).
- Vault `invault` timer 30 → `makemon(PM_GUARD)` + getlin (D-0374).
- Apply bag take-out `a?jo$\r`; put-in `aji$\r$\r` (D-0375/76).
- Shop home (11,11): mill → (11,12); return needs `onlineu` (D-0376).
- Monk starter: `SPELL_LEV_PW(1)` bump when `num_spells()` (D-0380).
- Ice-box look: `container_contents` needs `sortloot` stacks (next).
- D-0274…D-0382: see index.
