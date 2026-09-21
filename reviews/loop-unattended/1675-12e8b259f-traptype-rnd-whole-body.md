# Review 1675 — 12e8b259f — `mklev.c` traptype_rnd whole C body (D-2716)

Metadata: commit `12e8b259f`, D-2716, `js/mklev.js` only (2 arms + import line). Coverage row. No prior review claimed closed.

## Intent vs deliverable

Subject promises: LEVEL_TELEP arm gains the third C disjunct `single_level_branch(&u.uz)` in short-circuit order; FIRE_TRAP arm replaces the file-local hellish-flag inline with live `Inhell()`; both join the existing `./teleport.js` import. Diff delivers exactly that, nothing else. Promise matches deliverable.

## Inventory

Changed JS: `traptype_rnd` (local `function`, two arms); import line extended with `single_level_branch, Inhell`. No deleted symbols; two deferred/inline reads re-pointed to live imports.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (both names newly imported → re-pointed):

```text
single_level_branch js/teleport.js:2231   sync
Inhell           js/minion.js:93   sync
                 js/teleport.js:2241   sync
             !! multiple exports — import the C-locus one; do NOT add another
             !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
               js/fountain.js:1006  js/pray.js:226
```

The import used is the C-locus `teleport.js:2241` one (dungeon.h `Inhell` / dungeon.c `In_hell`); the `minion.js:93` twin and the `fountain.js`/`pray.js` clones are pre-existing and untouched. Bodies read: `single_level_branch(lev) → Is_knox_level(lev)` (C `dungeon.c` single-level branch test) ✓; `Inhell() → !!(hellish flag of current dnum)` (C `dungeon.c:1942–1946` flag read) ✓. `--can` per commit message ALREADY (existing `./teleport.js` static import extended, no new edge). No STUB in either arm.

## C ↔ JS fidelity

C locus read: `mklev.c:1937–1998` (csym range), caller `mklev.c:2075` (`kind = traptype_rnd(mktrapflags)` → pre-wired `mktrap :30757`, untouched). RNG: `rnd(TRAPNUM-1)` + `rn2(7)` (HOLE) — both pre-existing, untouched, order unchanged.

- LEVEL_TELEP: `lvl < 5 || noteleport || single_level_branch(game.u?.uz)` — all three disjuncts in C `:1961–1965` short-circuit order ✓ (the deferred-comment dodge is gone).
- FIRE_TRAP: `if (!Inhell()) kind = NO_TRAP` vs C `if (!Inhell)` ✓. (Old inline and new body differ only in the unreachable `uz undefined` corner — old `dnum|0` indexed dungeon 0, new indexes undefined — both falsy in practice; the new form is C-closer. Not a C-wrong.)
- The other 10 arms are byte-untouched; the header comment now cites the full `:1938–1998` range ✓.

## Hallucinations / overclaim

None. "Whole body ported, every callee live" is accurate — the two previously-deferred reads are now live calls, no dispatch-behind-stub pattern. Diff grep: no FORCE/DIAG/seed/step/coords/fastforward.

## Density

Two-arm completion of a 62-line C staticfn, one module, +15/−20 with docs. Right-sized for a coverage-row remainder.

## Verification

Re-measured per-SHA re-run (`--base 12e8b259f~1 --reach-all`) — both lines, matching the D-log:

```text
verify traptype_rnd: baseline 12e8b259f~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify traptype_rnd: no corpus session is blocked on it at 12e8b259f~1 — a vacuous verify is NOT a corpus PASS. [...]
reach traptype_rnd: 377 baseline-PASS session(s) reach it (377 run, 57.6s): 377 PASS, 0 regressed → REACH-OK
```

D-log correctly reports "note hidden" + 377/377 reach, plus full 44/44 (shared `mklev.js` change — full suite required and present). `imports.mjs --rulecheck` re-run this iteration: `Rule #2 clean`.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
