# Review 2826 — 9b654d14a — boulder crush drains wail/done before the hit losehp

- SHA: `9b654d14a` (D-3981)
- Files: `js/read.js` only (+16), focused test
  `scripts/boulder-crush-lifesave.test.mjs`
- Method: cliff writer (1 function: `drop_boulder_on_player`); whole
  Method on it.
- Cites: C `read.c:2294–2338` read directly; falsifier stack
  `muse.c:1933` confirmed (`drop_boulder_on_player(confused,
  !is_cursed, FALSE, TRUE)`).

## Intent vs deliverable

Promise: JS deferred `done` past both losehps, so a pit-crush lifesave
never resolved before the boulder-hit losehp (HP 14/14 vs C's 13/14,
`regen_hp` never called); drain the deferred wail/done finishers
between `flooreffects` and the hit losehp, returning early on a real
death (C noreturn, crush killer preserved). S3 → PASS, S1 123→158.
Diff actually adds exactly that mid-drain block (dynamic imports of
`hack.js`/`end.js`, `gameover` early return). Promise and diff agree.

## Inventory

- `drop_boulder_on_player` — `js/read.js` (~1650–1720, file-local async)
  vs C `read.c:2294–2338`. Status: control-flow order repaired; rest
  untouched.

## C ↔ JS fidelity

- C `:2331` runs `flooreffects` **before** `:2336–2337** `if (dmg)
  losehp(Maybe_Half_Phys(dmg), "scroll of earth", KILLED_BY_AN)` with
  the "Must be before the losehp(), for bones files" comment ✓. C
  `losehp→done` is inline: a fatal crush lifesaves inside the
  flooreffects damage path (temp-C dump measured: crush n=14 →
  savelife 14/14 → hit n=1 → 13/14, regen_hp called), and a true death
  never reaches `:2336`.
- JS's deferred-done architecture queued `done` past both losehps; the
  fix drains `finish_maybe_wail` + (if `_losehp_needs_done`/`gameover`)
  `finish_losehp_done` between the two, and returns early on
  `gameover`. That restores C's order: lifesave resolves at reduced HP
  before the hit losehp; real death stops (also preserving the crush
  killer C's noreturn preserves). Same `explode_losehp` idiom as the
  pre-existing post-drain below ✓.
- Dynamic imports are of already-imported modules (no new edges) ✓.
  RNG: zero draws added; the fix *restores* the downstream `regen_hp`
  `rn2(100)` call (measured post-fix: HP 13/14 + `rn2(100)=77`) ✓.
- Named twin: `muse.js:1203–1240` confirmed present with exactly the
  described drift (flat `HPasses_walls` check, no mid-drain) and a
  falsifier citing the real `muse.c:1933` call site. Named omission
  with C citation + falsifier — allowed, correctly not bundled (no
  session reaches a muse-earth crush-lifesave).

Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/`fastforward`/coordinates.
Nothing deleted or re-pointed → `sym.mjs` re-point check N/A. Rule #2
clean (this-iteration `--rulecheck`).

## Hallucinations / overclaim

None. The "0 blocked" `drop_boulder_on_player` verify is explicitly a
note, not sold as a corpus PASS. S2/S4 non-movement is attributed to
named own writers (extra `exercise rn2(2)` / `u_calc_moveamt rn2(3)`),
not hand-waved.

## Density

Cliff head of its parent (`regen_hp` x4, screens 2373 — D-3980's moves
had dropped `do_statusline2` to row 2; Must-fix empty) ✓. One cause,
writer repaired, `Ledger:` updated, focused test added. The twin and
the S2/S4 writers are named-with-falsifier, not bundled — correct.

## Verification

Ship-time: `verify regen_hp: 1 PASS (S3 full), 1 moved (S1
123→one_characteristic@158), 2 no-movement (own writers)`;
`drop_boulder_on_player: note (0 blocked)`; reach 3/3 + 80/80 REACH-OK;
green/strict/cohort green.
Re-measure (`verify drop_boulder_on_player,regen_hp --base 9b654d14a~1
--jobs 4` on HEAD): `drop_boulder_on_player: 0 blocked` (vacuous note
restated) with `reach 3/3 → REACH-OK`; `regen_hp: 1 PASS, 1 moved past,
2 unchanged, 0 worse → PROGRESS` — S3 PASS, S1 123→158, S2@1481 +
S4@1243 unchanged, all exact. Reach 80/80 REACH-OK. No REGRESSED
session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
