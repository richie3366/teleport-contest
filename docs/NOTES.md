# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **D-0516:** seed0116 `zap_dig` done — prefix **5910→6246**,
  Scr **79→101**/127. Next miss @6246 C `moveloop_core` rn2(70)
  vs JS rn2(20) (not dig).
- **D-0515 residual:** seed5006 still @8468 `dosounds`; seed0373
  @2549 needs `print_dungeon` `?` menu.
- **seed0398 PASS** (#572 survey → **30/44**). Formal Score @#575.
- **Leaderboard gap:** local **30/44** vs judge **22** after D-0480;
  D-0483 reverted serialize. Watch cron for seed0013 restore.
- **Gameplay next:** seed0116 @6246 moveloop / seed5006 `dosounds` /
  seed0373 `print_dungeon` / quest `makemaz`. Prefer shared.
  ```bash
  node scripts/rng-diff.mjs sessions/seed0116-wizard-wear-shop.session.json
  ```
- **Don’t:** re-apply D-0480 serialize coerce; invent frame-align;
  raw RNG-index / coord / ux0 hacks; leave `context.travel` set across
  walk/run after `_` travel; batch doset toggle plines (D-0499);
  steal hero cursor for leftover getobj text in `flush_screen`;
  reopen D-0474…D-0516; stub-cancel `^V?` as if menu (breaks 0373).

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Altar raw `{` (D-0293); don’t π-convert in scoring grid.
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0516
  done paths — see DIVERGENCE-INDEX.
- Runner `Screen N/M` = total matches, not prefix length.
- Hub `/sessions/` ≠ template bytes; still visual-PASS.
- Water-demon floor-vs-`&` was missing `makemon` `newsym` (D-0481).
- Charged-ring `oc_uses_known` must zero `known` in `mksobj` (D-0482).
- Empty-quiver `f` must not More-eat invent letter (D-0484).
- seed0007 peels D-0485…D-0506 done → **PASS**.
- D-0512: !verbose drop leaves getobj topline until parse clear.
- D-0513: `zapwrapup` must `You_feel` shudder (not defer).
- D-0514: wizard `#quit` → `Dump core?` before disclose; stopprint
  skips Goodbye; wizard topten early-exit msg + trailing blanks.
- getbones `rn2(3)` gap with JS dog_move arity = unbound level change
  (`>` / `^V`), not getbones stub (D-0068/D-0149/D-0515).

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig + restfakecorr (D-0377/78).
- seed0006 **PASS** after D-0482; seed0007 **PASS** after D-0506;
  seed0398 **PASS** after D-0514.
- LB gap: 14 cells / 4 sessions; report upstream if next cron unchanged.
- Gameover `add_menu_heading` ATR_NONE; `iflags.at_night` from `really_done`.
- #570 score: **29/44**, Scr 5520, RNG 303491 (38.28%), `27+0.12/turn`.
  #572 survey: **30/44** (seed0398); D-0515/D-0516 lifts pending #575.
- Capital `H` = multi-step run; `set_move_cmd` must clear travel.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- D-0487: default `flags.autounlock=AUTOUNLOCK_APPLY_KEY`.
- D-0502: `find_ac` ARM_BONUS; Scr 126→291.
- Water moccasin is `hides_under` (M1_CONCEAL) — postmov hide roll.
- Rogue start leather is `+1` → AC 7 unless eroded (ARM_BONUS).
- wizgenesis flags=5 (no AUTOCOMPLETE) — do not add to EXT_CMD_AC.
