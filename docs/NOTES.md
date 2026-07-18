# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#778 D-0700 diagnosed (no code):** seed0014 @36031 is **not** a missing
  in-place `exercise()` / AVAL skip. After `_` `>` `.` travel, JS stays in
  `continue_run` (`travel=1 multi=80`); C has stopped and `rhack('n')` →
  `dopush` `rn2(19)`. JS never reaches `dopush` (no adjacent boulder;
  floor boulders at 60,8 / 60,10 / 68,5).
- **Next falsifier:** why C ends travel after the first `_/>/.` step before
  `n`. Candidates: `lookaround` trap/liquid (JS deferred), `findtravelpath`
  `TEST_TRAV` fail, or adjacent boulder present in C only.
  `node scripts/rng-diff.mjs sessions/seed0014-dequa-fountain-explore.session.json`
- **Don’t:** AVAL/`|aexe|>=50` theory; force `end_running` after first travel
  step without C cite; frame-align; DIAG; re-break D-0660…D-0699.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0699 done.
- Runner `Screen N/M` = total matches, not prefix length.
- `rng-diff.mjs` runs **seg0 only**; matches `rn2(N)=M` strings only.
- D-0602: playmode:debug → `flags.debug`; pick_room must test it (≡C wizard).
- D-0658: hx=39 alone or link_doors + rect roomno gate → @14403.
- D-0665…D-0668/D-0673: TREE cmap; altar `{`; Warning floats; lit clear.
- D-0674/D-0675: gas `does_block` needs `clear_regions` on mklev.
- D-0676…D-0699: blue DSM / … / door Fumbling() / mines your_race /
  ohitmon mondied / setworn ring clear.
- Pets lack `ALLOW_U` without Conflict; hero square skipped when !mconf.
- `assigninvlet` **preserves** free a-z/A-Z (steal→return); don’t “always
  next lastinvnr”.
- `Fumbling()` ≡ H||E||uprops[FUMBLING]; not a sticky boolean.
- Water vault is `des.map` (wid=6→`rn2(73)`), not rectangular create_room.
- Session: `steps[i].key = moves[i-1]`; screen key for index `i` is `moves[i]`.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- seed0006/0007/0398/0373/**seed5006**/ **seed0116** / **seed0361** /
  **seed0367** **PASS** (suite **35/44** @#775).
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- Worn rings: `setworn` → `uprops[oc_oprop].extrinsic` (D-0574).
- Bones `utrack` via `save_track`/`rest_track` (D-0578).
- Quest: seed0367 **PASS**. seed0014 @36031 travel-stop before `n` push.
- S_KOP / minetn-1/3–7 / **medusa-2/3/4** deferred;
  eel hideunder / I_SPECIAL deferred; SWAMP deferred;
  `temperature_shift` stub; worn/artifact STONE_RES deferred;
  youmonst pool·lava / passes_walls in goodpos deferred;
  exclusion_zones save/rest deferred; region binary save format deferred.
- Rolling boulder: `launch_obj` + rolling-boulder trap (D-0599).
- C: `#define wizard flags.debug`. SPECIAL_PM=330 needs MAIL_DAEMON.
  defsym `')'`=WEAPON `'('`=TOOL; Arc-goal **14** `des.object()`.
  Boots `oc_delay`=2; FUMBLE `Boots_on` → `incr_itimeout(HFumbling,rnd(20))`.
