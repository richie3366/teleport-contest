# Review 1283 — 48f96186 — trap.c openholdingtrap/openfallingtrap monster-arm canspotmon (D-2317)

Metadata: SHA `48f96186`, D-2317, C-fidelity residual (row cited 0 blocks). Method: `git show` full `js/trap.js` hunk (2 functional lines + 2 C-cite comments); C `trap.c:6099-6205` (`csym.mjs openholdingtrap` full body incl. monster arm `:6185-6200`) and `trap.c:6250-6289` (`csym.mjs openfallingtrap`, key line `:6279`); `sym.mjs canspotmon/canseemon` (both, required — diff re-points local-clone call to canonical import, output pasted below); `display.js:1237` body read; `imports.mjs --rulecheck` (prior review); added-lines banned-pattern grep; `hidden-proxy verify openholdingtrap/openfallingtrap --base 48f96186~1` re-runs.

## Intent vs deliverable

Subject promises one predicate fix at two call sites: monster released from a holding trap / dropped into a falling trap now counts telepathy-sensed (`canspotmon`) instead of visibly-seen (`canseemon`). Diff delivers exactly the two lines, using the already-imported canonical. Promise kept.

## Inventory

- `openholdingtrap` mon arm: `if (canseemon(mon))` → `if (canspotmon(mon))` (+ C `:6185` cite comment).
- `openfallingtrap` mon arm: `cansee(...) || canseemon(mon)` → `cansee(...) || canspotmon(mon)` (+ C `:6279` cite comment).
- No import changes, no new edges.

## C ↔ JS fidelity

Holding arm branch-for-branch vs C `:6185-6196`: `canspotmon` → `*noticed=TRUE` + `Monnam "is released from"` ✓; else-if `cansee(t->tx,t->ty) && t->tseen` → WEB `Something "is released from"` vs BEAR_TRAP `upstart(which) "opens"` ✓ (read in full at `js/trap.js:6179-6205` — the `Something`/capitalized-`which` arm the old predicate starved is intact below the fix); tail `rn2(2) && m_next2u → reward_untrap` untouched ✓. Falling line vs C `:6279` (`cansee(t->tx,t->ty) || canspotmon(mon)`) token-identical ✓; surrounding gate (`is_pit`, hero `dotrap(FORCETRAP)` + utrap result with no NOWEBMSG, mon `wakeup` + `mintrap` result) verified present at `js/trap.js:6243-6270` — the D-log's NOWEBMSG attribution (that flag is `closeholdingtrap :6240`'s, already live) checks out against the read code. No RNG in either changed line; branch order preserved.

Callee closure: `canspotmon` LIVE canonical (`js/display.js:1237-1239`, `canseemon(mon) || sensemon(mon)` ≡ `display.h:129` macro, sync, pre-existing `trap.js:33` import — no new edge, no TDZ). Required `sym.mjs` output (re-pointed symbol):

```text
canspotmon       js/display.js:1237   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/monmove.js:1088
canseemon        js/display.js:933   sync
             !! ALSO 5 LOCAL CLONE(S) in 5 files — IMPORT the export; do NOT add another
               js/dig.js:180  js/monmove.js:1077  js/mthrowu.js:273  js/muse.js:317  js/trap.js:1067
```

Direction is correct (local-clone call → canonical import) and the right canonical is used — but note the pre-existing `trap.js:1067` `canseemon` clone stays live for ~14 other call sites in the same file. It predates this SHA and none of the changed lines touch it, so it is observation, not this SHA's C-wrong; still, the file now mixes canonical-spot with clone-see for the same monster-visibility family. Named omits (`boxlock_invent update_inventory` refresh; `reward_untrap` file-local clone standing pattern) carry map rows. No STUB in a live arm.

## Hallucinations / overclaim

None. D-log marks hidden explicitly vacuous (0 blocked, NOT a PASS) and the probe story is authenticated the right way round: 7/9 pre-fix with both noticed arms FAILing while predicates + happened PASS — a genuine red-then-green on the shipped predicate, not a self-grading re-run. The full-body re-audit claims (tdummy, the_your/vowels, BURIEDBALL `which=""`, hero buf/vision/utrap, zapyourself Punished arms) were spot-verified against the read JS above rather than taken on faith; all present.

## Density

Two functional lines is the floor of §2b ("one deferred `if` alone" = waste) — but both changed tokens are C-cited single-predicate residuals (`:6185`, `:6279`), shipped as one predicate family with a red-then-green probe and a both-bodies re-audit in the same handoff. C is that small. Acceptable, barely; no thinner slice should ship alone.

## Verification

D-log: clean-tree preflight, probe 7/9→9/9 (deleted, out of tree — correct, no harness for game logic; durable-test-collateral has nowhere to land and the D-log says so plainly), `verify --fn openholdingtrap` + `--fn openfallingtrap` syntax/rule2/green 2/2/strict ×2/cohort 7/7 PASS with vacuous-honest hidden notes, final verify after last `js/` edit. Re-measured by this review:

```text
verify openholdingtrap: baseline 48f96186~1 (scoreboard at 775e5959) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify openfallingtrap: baseline 48f96186~1 (scoreboard at 775e5959) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Both match — no `--base` debt (row cited 0). Added-lines grep: no FORCE/DIAG/`getRngLog`/`fastforward`/seed-gates (the two FORCE hits are the commit message quoting `FORCETRAP`). Full-44 cadence run follows at iteration end.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
