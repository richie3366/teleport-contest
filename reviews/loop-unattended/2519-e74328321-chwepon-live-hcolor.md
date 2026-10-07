# Review 2519 — e74328321 — chwepon live hcolor (D-3640)

## Metadata

- SHA: `e74328321` (2026-10-08) — cliffs-head writer, D-3640
- D-entry: D-3640 (chwepon entry hcolor)
- js diff: `js/wield.js` +4/−7 (delete local clone, extend existing import,
  doc update). Note: `269f9f5ca` (D-3639) between this SHA and the previous
  review touches no `js/` (docs + scoreboard stamp only) — correctly not a
  review file; it is the legitimate once-per-owner `[measure]` iteration.
- Type: cliff (≤10 functions) — whole Method per function + movement re-measure

## Intent vs deliverable

Promise (subject + D-log): scen-impaired-Knight-94330 step 98 diverges with
main RNG 3801/3801 whole-session (Hallu both sides, monster names/desync —
display-stream). C-side measurement (display-RNG re-record + temp JS trace,
both reverted) sited exactly one extra C draw: `~drn2(74)` at step 96, x=74
= SIZE(C hcolors); JS's local `hcolor` clone (`return colorword || 'odd'`)
never draws. Fix: delete the clone, import the live `hcolor` from
do_name.js. Probe 98 → 121, screens 104 → 286/287.

Diff actually adds: exactly that re-point — `import { trycall, hcolor }`
(same line, no new edge) — plus retiring the «Hallucination hcolor» Named
omit from the chwepon doc. No logic edits.

## Inventory

| # | JS change | C locus | Status |
|---|-----------|---------|--------|
| 1 | delete wield.js `hcolor` clone | `do_name.c:1461–1466` (clone contradicted it) | clone removed |
| 2 | import live `hcolor` from do_name.js | `do_name.c:1461–1466` via `wield.c:920` | LIVE callee |
| 3 | doc: retire hcolor omit, cite `:920` early-return draw | `wield.c:920–926` | correct |

`Ledger:` chwepon ported — consistent (body otherwise whole per D-0435/D-1692).

## C ↔ JS fidelity

C `wield.c:920`: `const char *color = hcolor((amount < 0) ? NH_BLACK :
NH_BLUE);` runs unconditionally at entry, **before** the `!uwep`
early-return (`:924`) — so the display draw happens and `color` is
discarded on that arm. JS `chwepon` (`js/wield.js:1357`): `const color =
hcolor(amount < 0 ? 'black' : 'blue');` before the `!uwep` arm (`:1360`) —
same order, same discard. The second site `hcolor('amber')` (`:1364`)
matches C `:929` `hcolor(NH_AMBER)`.

C `hcolor` (`do_name.c:1461–1466`):

```c
return (Hallucination || !colorpref)
    ? hcolors[rn2_on_display_rng(SIZE(hcolors))] : colorpref;
```

JS live export (`js/do_name.js:356`): `if (Hallucination() || colorpref ==
null) return HCOLORS[rn2_on_display_rng(HCOLORS.length)]; return
colorpref;` — gate (Hallu-or-NULL), draw, and pref passthrough all match,
including the empty-string-is-a-live-pref edge (C pointer check ≡ JS
`== null`). Table verified independently by script: C 74 entries vs JS 74
entries, **0 diffs in set and order** — the D-log's «74/74» claim
reproduced, not trusted.

Required re-point check (`sym.mjs hcolor`):

```text
hcolor           js/do_name.js:356   sync
             !! ALSO 3 LOCAL CLONE(S) in 3 files — IMPORT the export; do NOT add another
               js/detect.js:280  js/do.js:496  js/sit.js:218
```

The wield.js clone is gone (one fewer than before); the 3 remaining clones
are pre-existing in other files — each is its own future writer row if a
session blocks on it, not this SHA's scope. No new module edge: the diff
extends the existing `./do_name.js` import line (trycall) — ALREADY by
construction. No stub, no no-op; the callee is whole per C.

The deleted clone (`return colorword || 'odd'`) was a diverging CLONE
(no-draw) — its deletion is the fix, and the D-log's measurement (47
lockstep draws, one C-only `drn2(74)`, x-sequence equality at o_56/58/59)
is the C-proof, not JS-state theorizing.

## Hallucinations / overclaim

None. The suspicious-looking «moved → js-throw at step 121» line is
explained in the D-log as `hidden-proxy.mjs:604`'s `${owner ||
'js-throw'}` fallback — verified true in the committed scoreboard row
(`owner: null, error: null, kind: "screen", step: 121, scrM: 286/287,
rngM: 3801/3801`). Screens 104 → 286 with RNG intact is genuine movement,
not a relabel. No dispatch/callee overclaim (single-function re-point).

## Density

Cliff phase §10.18: one cliff (toss_up row), the writer (`do_name.c`
hcolor via `wield.c:920`) shipped as a re-point to the already-whole live
export, one `Ledger:` entry, measurement + code + verify across the
D-3639/D-3640 pair (measure-then-port is the prescribed shape). C body
otherwise whole re-verified in the brief (`:918–1048` arms listed).
No foreign-file work, no re-audit. Right-sized.

## Verification

D-log claims: `verify toss_up: 0 PASS, 1 moved` (98 → 121, screens 104 →
286/287), REACH-OK (smoke 24/24 ×2), green + strict + cohort, full skipped
(tool: no shared file changed).

Re-measured:
`node scripts/hidden-proxy.mjs verify toss_up,chwepon --base e74328321~1 --reach-all`:

- `verify toss_up: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
  (scen-impaired-Knight-94330: moved → step 121, was 98)
- `smoke toss_up: … 24 PASS, 0 regressed → REACH-OK`
- `verify chwepon: no corpus session is blocked on it at e74328321~1`
  (expected — chwepon is the writer, toss_up the owner; D-log leads with toss_up)
- `smoke chwepon: … 24 PASS, 0 regressed → REACH-OK`

Movement claim reproduces exactly; no REGRESSED, no WORSE. Rule #2 clean
globally; diff grep for FORCE/DIAG/getRngLog/fastforward/coords: 0 hits.
No seed/step/coordinate reads. Committed focused test present
(`scripts/chwepon-hcolor-draw.test.mjs`).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
