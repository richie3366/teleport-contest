# Review 2582 — da6733166 — breamm mcan-arm Deaf-macro gate

SHA: `da6733166` (D-3712). Cliff-phase C-fidelity residual, 1 function,
`js/mthrowu.js` only (+11/−3). Ledger: breamm ported.

## Intent vs deliverable

Promise: "C gates the cough message on plain `!Deaf` with no acoustics
arm; JS read raw `u.Deaf` (zero writers, stuck false) plus an invented
`|| acoustics===false`" → gate now calls `hero_Deaf()`, acoustics
disjunct dropped; stale envelope caller line corrected. Diff actually
adds: the gate rewire (1 `if` condition + C-cite comment) and an
envelope doc-comment fix. No new helpers, no new imports
(`hero_Deaf` already imported :84). Promise matches diff.

## Inventory

- `breamm` (js/mthrowu.js:469, gate :482–490) ↔ C
  nethack-c/upstream/src/mthrowu.c:1092–1150 (csym range), mcan arm
  :1099–1108, gate :1100. Status: whole-arm gate fix on a ledger-ported
  function; C callers mhitm.c:549 + mthrowu.c:1277.

## C ↔ JS fidelity

C :1100 `if (!Deaf)` with `Deaf` ≡ youprop.h:125
`HDeaf || EDeaf || u.uroleplay.deaf` — confirmed by reading the header.
No acoustics disjunct anywhere in the arm; unspotted path is
`Soundeffect` :1104 (stays named, family convention) + `You_hear` :1105.
JS now: `if (!hero_Deaf())` → spotted `pline("coughs")` / else live
`You_hear('a cough.')`, then `return M_ATTK_MISS` — branch order,
messages and return match C line-for-line. `hero_Deaf`
(js/monmove.js:1197–1201) reads `HDeaf|EDeaf|uroleplay.deaf` plus the
dead-code `|| u.Deaf` (zero writers, D-3572) — a strict superset that
can only silence where C's macro already silences, disclosed in the
subject. No RNG in the arm (no `rn2` delta possible). Both C callers
wired: C mthrowu.c:1277 → js/mthrowu.js:549 (breamu); C mhitm.c:549 →
js/mhitm.js:6455 (mattackm BREA). sym.mjs: `hero_Deaf` is a live sync
export (monmove.js:1197) with 3 local clones elsewhere — this diff
imports the export, no new clone.

## Hallucinations / overclaim

None. D-log correctly says "no corpus divergence", names the 18-session
reach line, and discloses the dead-code disjunct. The "stale envelope
caller line corrected" claim is true (old text deferred mattackm AT_BREA
on a phantom import cycle; both sites are wired).

## Density

Cliff-phase residual on an empty queue (939/953, 13 env + 1 recorder
artifact): one whole arm, code + focused test + ledger + verify in one
handoff. Right-sized; the successor row (hit_bars :1447) is named with
brief evidence.

## Verification

Re-measured: `hidden-proxy.mjs verify breamm --base da6733166~1
--reach-all` → 0 blocked at baseline (vacuous, as the D-log states) +
`reach breamm: 18 baseline-PASS reach, 18 run: 18 PASS, 0 regressed →
REACH-OK`. Matches the D-log Verify bullet exactly. Rule #2:
`imports.mjs --rulecheck` → clean across scored `js/`. Diff grep for
FORCE/DIAG/getRngLog/fastforward/seed/coords: no hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
