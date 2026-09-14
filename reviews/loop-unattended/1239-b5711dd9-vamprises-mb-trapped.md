# Review 1239 — b5711dd9 — vamprises door-trap kill arm + canonical mb_trapped

- SHA: `b5711dd9` — "`mon.c` vamprises door-trap kill arm + canonical `monmove.c` mb_trapped (D-2273)"
- D-log: D-2273. Queue row: `mon.c` vamprises door-trap kill (D-2231 named omit). No corpus session reaches a vampire-revive trapped-door kill.
- Character: omission fix + canonical export, no corpus divergence.

## Intent vs deliverable

Subject promises: export the canonical `mb_trapped` in C order and run the
trapped-door arm verbatim from `vamprises`. Diff actually adds: the
`function`→`export` flip plus `wake_nearto`/`mondied`/`mon_learns_traps` arms
in `js/monmove.js`, and the verbose-suppressed `mb_trapped` call plus
unconditional "is destroyed!" in `js/mhitm.js vamprises`. Promise matches diff
exactly.

## Inventory

- Changed JS: `mb_trapped` (`js/monmove.js:1039-1057`, was a local stub);
  `vamprises` trapped arm (`js/mhitm.js:2896-2909`); three names on existing
  edges (`wake_nearto`, `mondied`, `mon_learns_traps`/`TRAPPED_DOOR`).
- Required `sym.mjs` output: `wake_nearto js/mon.js:1274 ASYNC` (4 unrelated
  clones elsewhere, untouched); `mondied js/mhitm.js:3207 ASYNC` (1 clone in
  `js/trap.js:1133`, untouched); `mon_learns_traps js/monsters.js:569 sync`;
  `mb_trapped js/monmove.js:1039 ASYNC`. No symbol deleted or re-pointed
  (the commit only deletes the stub body, replacing it in place).
- Required `--can` output: `ALREADY: mhitm.js already statically imports
  monmove.js` and `ALREADY: monmove.js already statically imports mhitm.js`
  — pasted, confirmed. Call-time use only, hoisted declarations, no TDZ read.

## C ↔ JS fidelity

C loci (via `csym.mjs`): `mb_trapped` `monmove.c:52-74`; `vamprises`
`mon.c:2888-2987`, trapped arm `:2966-2981`.

- `mb_trapped` order: verbose KABOOM/nearby-distant → `wake_nearto(mx,my,49)`
  → `mstun = 1` → `rnd(15)` → DEADMONSTER → `mondied` + still-dead TRUE with
  lifesave fallthrough → `mon_learns_traps(TRAPPED_DOOR)` → FALSE. JS traces
  C line-for-line, replacing the old stub (`mhp = 0; mx = my = 0`) with the
  real `mondied` + `mon_learns_traps` tail. ✓
- Predicates: `dist2(...) > 7*7` ≡ `mdistu > 7*7` (squared distance, house
  idiom, pre-existing line); `(mhp|0) < 1` ≡ `DEADMONSTER`; `game.u` Unaware/
  Deaf house checks vs C macros + `You_hear` acoustics — named in the D-log
  envelope, same standing debt as every `pline_mon` site. ✓
- `vamprises` arm: save `verbose` / `= FALSE` / `mb_trapped(mtmp, seeit)` /
  restore, then `trap_killed && canspotmon && !Unaware` → unconditional
  `Monnam + " is destroyed!"`. JS verbatim, including the C comment's
  rationale (no death pline yet inside `mondied`). The `seeit` arg is C's
  `cansee(x,y)` local, passed unchanged. ✓
- Recursion safety: the reverted vampire's `cham` is `NON_PM` post-revert, so
  the inner `mondied→mondead` `is_vampshifter` gate stays shut — consistent
  with the `cham` assignment two screens above (`mon.c:2937`). ✓ No RNG
  beyond the single `rnd(15)`.

No C-wrong. Named omits (dig/lock twins → live Open row queued same commit;
message predicates; `gd.disintegested`) correctly stay separate.

## Hallucinations / overclaim

None. No corpus PASS claimed; the vacuous hidden note is honestly labeled.

## Density

~35 insertions for a 23-line C function plus one caller arm, one falsifier,
modules already coupled. Right-sized.

## Verification

- Re-measured: `node scripts/hidden-proxy.mjs verify vamprises --base
  b5711dd9~1` → "0 session(s) blocked on it (0 at baseline, 0 in the working
  scoreboard)"; same for `mb_trapped`. Matches the D-log's vacuous note; row
  cited 0 blocks so no older `--base` owed.
- Diff-hunk grep clean (no FORCE/DIAG/seed/coordinate/RNG-index reads);
  `imports.mjs --rulecheck` clean (re-run this review). D-log cites green
  2/2 + strict ×2 + cohort 7/7 + full 44/44; the end-of-iteration cadence run
  re-covers the fortress.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
