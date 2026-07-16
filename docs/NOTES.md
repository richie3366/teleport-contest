# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Leaderboard gap:** local **28/44** vs judge **22/44** (was 23;
  [data.json](https://mazesofmenace.ai/leaderboard/data.json)
  `lastScored` ~2026-07-16T08:55Z). D-0480 serialize correlated with
  seed0013-rogue **59→58** (lost PASS) + cell bleed on gap sessions.
  **Just reverted serialize** (D-0483); keep vanqsort strcmpi.
- **Falsifier:** local+hub still PASS the four gap sessions + seed0013;
  competitors PASS on judge. Issue #5 class.
- **Don’t:** re-apply D-0480 space/NO_COLOR serialize coerce; SO-wrap
  `{`/`\``; invent frame-align.
- **Next gameplay:** seed0007 snake swamp Scr **20**/302.
  ```bash
  node frozen/ps_test_runner.mjs sessions/seed0007-rogue-snake-swamp.session.json
  ```
- **Parked:** D-0006; seed2200 @158 RC path.
- **Watch:** next judge cron — expect seed0013 PASS restore if D-0483
  hypothesis holds.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate gates in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Altar raw `{` (D-0293); don’t π-convert in scoring grid.
- Don’t re-apply D-0480 serialize space coerce (D-0483); D-0471…D-0482
  done paths — see DIVERGENCE-INDEX.
- Runner `Screen N/M` = total matches, not prefix length.
- Hub `/sessions/` ≠ template bytes; still visual-PASS.
- Water-demon floor-vs-`&` was missing `makemon` `newsym` (D-0481).
- Charged-ring `oc_uses_known` must zero `known` in `mksobj` (D-0482).

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig + restfakecorr (D-0377/78).
- seed0006 **PASS** after D-0482.
- LB gap: 14 cells / 4 sessions; report upstream if next cron unchanged.
- Gameover `add_menu_heading` ATR_NONE; `iflags.at_night` from `really_done`.
