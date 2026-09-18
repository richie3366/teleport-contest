# Review 1393 — 1d21e3be — getdir whole body in C order (D-2434)

- Commit: `1d21e3be` — "`cmd.c` getdir whole body in C order (coverage THIN → live) (D-2434)."
- Files: `js/lock.js` only (+181/−78); docs + map + queue pop.
- D-log: D-2434. Queue row popped: `cmd.c` getdir THIN (C 161 L / JS 60 L).
- REVISED in audit: corpus re-score at HEAD flipped 3 sessions PASS→FAIL
  (bisected to this SHA, mechanism below). Verdict raised from
  ACCEPT-WITH-DEBT to **QUALITY-RISK**.

## Intent vs deliverable

Subject promises whole `getdir` (`cmd.c:3958–4119`) in C order. Diff
delivers the cmdq/fuzzer/redraw/spkeys/mouse/movecmd/help machinery —
but the movecmd rewrite breaks `</>` (up/down) at every direction prompt
(item 1). Promise half-kept.

## Inventory

New/changed JS: all in `js/lock.js` (QUITCHARS, NUMPAD_DIR, spkey tables,
`apply_dirsym`, `getdir_is_redraw`, `dxdy_moveok`, `help_dir_move_lines` +
`help_dir`, `getdir_dirsym_from_dir`, `getdir_read_dirsym`, `getdir`).
No symbol deleted or re-pointed.

## C ↔ JS fidelity

C loci: `getdir :3956–4119`, `movecmd :3868–3898`, `redraw_cmd :3910–3918`,
`help_dir :4168–4296`, `show_direction_keys :4121–4165` (all via csym);
`dirchars = !num_pad ? sdir : ndir` (`cmd.c:3433`, strings exact),
DIR enum (DOWN=8, UP=9 ✓), `quitchars " \r\n\033"` ✓, NHKF consts ✓.
Verified exact: cmdq DIR/KEY/neither arms, retry loop, fuzzer
short-circuit + `rn2` shapes, `clear_nhwindow` placement, redraw→
`flush_screen(1)` + retry with no REPEAT record, `cmdq_add_key(REPEAT)`
iff `!in_doagain`, cmdbind-based `movecmd` equivalence (txt rows vs fnc
pointers agree; failure zeroes only dz per D-1387), SELF/SELF2, mouse arm
(getpos + sgn + CLICK_1/2 + getdir_click + impossible), quitchars,
help flow + full `help_dir` walk (dead `#if 0` correctly omitted,
`letter()` range, Guidebook suffix, `<`/`>`/self lines,
num_pad-conditional self key), `dxdy_moveok`, trailing confdir.
`apply_dirsym` = CLONE of `movecmd` (no JS export exists), matched
arm-for-arm; `help_dir` local = the C staticfn port. Banned-pattern grep
on added lines: zero hits.

EXCEPT the two C-wrongs below.

## Hallucinations / overclaim

1. "No second clone of getpos.js `redraw_cmd`" is false on its face:
   `getdir_is_redraw` is a second spelling of the same 9-line C body
   (fnc-compare vs txt-compare). They agree today; drift risk only.
2. The Verify bullet's green/cohort/smoke PASS is true but structurally
   blind: `getdir` has no RNG-tagged reach, so REACH-smoke never executes
   a direction prompt, and no public session presses `</>` at one. The
   corpus regression below shipped behind VERIFY: PASS.

## Density

One C function family, one module, +181/−78. Whole-body claim holds
except item 1's control-flow break.

## Verification

D-log: `verify.mjs --fn getdir` → syntax · rule2 · hidden note ·
smoke 24/24 (also `--reach-all`) · green · strict · cohort · PASS.
My re-run confirmed the vacuous+smoke lines — then the audit's full
corpus re-score (`hidden-proxy.mjs score --jobs 8`) read **492/540
(91.1%)** vs **495/540 (91.7%)** at the last audit. Session diff
(committed scoreboard vs fresh HEAD re-score):

- PASS→FAIL `scen-death-Wizard-92187` (owner exercise, step 20)
- PASS→FAIL `scen-kit-Archeologist-92190` (owner distfleeck, step 109)
- PASS→FAIL `scen-normal-Archeologist-92012` (owner could_untrap, step 108)

Bisect (worktree replays, `--ids`, identical owners/steps): PASS at
`c2935846` and `acf54d66`, FAIL at `1d21e3be`; `e6289b5b` (test_move)
re-verified clean. **Culprit: this SHA.** No other flips in either
direction.

## Actionable C-wrongs

1. `getdir` destroys up/down: `apply_dirsym('<')` sets `u.dz = -1` and
   returns `!dz = false` (faithful to C `movecmd`, which returns `!u.dz`
   while KEEPING dz=±1) — then the caller runs `if (!applied) u.dz = 0`,
   zeroing it. `!is_mov && !dz` now misfires into the invalid arm, so
   every `</>` at a direction prompt prints "cmdassist: Invalid direction
   key!" (+help) and returns FALSE where C sets dz and returns 1. The
   three flipped sessions' JS toplines are exactly that help text.
   Fix: delete the `if (!applied) { u.dz = 0; }` block in `getdir`
   (`js/lock.js`) — `apply_dirsym` already zeroes dz on every true-failure
   exit (code=0 arm, fallthrough arm), mirroring C; D-1387 stays satisfied.
   Verify: the 3 sessions PASS + `verify.mjs --fn getdir`. One-block,
   one-iter fix. Must-fix prepended.
**Addressed:** D-2440 `678a0821`
2. `getdir` num_pad `'5'` self arm has no C counterpart (`|| (numPad &&
   ch === '5')`). C binds `'5'` to the run *prefix* under number_pad
   (`cmd.c:2770`; `key2extcmddesc :2583`), and `movecmd` matches only
   directional `move_funcs`, so C answers "strange direction" where JS
   returns self/true. Session-unreachable (num_pad never set in any
   suite). Fix: delete the disjunct; next `cmd.c`/`lock.js` iter takes it.
   Named debt (no queue row).

Verdict: **QUALITY-RISK**
