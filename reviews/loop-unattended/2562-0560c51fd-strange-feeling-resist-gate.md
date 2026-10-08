# Review 2562 — 0560c51fd — strange_feeling resist gate (D-3688)

- SHA: `0560c51fddfd7716346ae69fde0f2f1850a9509e`
- Subject: Must-fix `potion.c` strange_feeling: text arm ignored the macro's `!Halluc_resistance` gate (review 2555; resisted+halluc+beginner "normal"→"strange") (D-3688)
- D-entry: D-3688. Type: Must-fix (closes review 2555's Keep'd C-wrong), ships alone.
- Diff size: `js/detect.js` +9/-5 (1 predicate + cite), `js/read.js` +3/-3, `js/wield.js` +2/-2 (tombstone comments only); 2 rewritten test cases; ledger D-tag.

## Intent vs deliverable

Promise: review 2555 proved live's `H||HH` text arm prints C-wrong
"normal" for resisted + hallucinated + beginner (C macro
`HH && !R` reports FALSE → "strange"); delete the shadowing local
and call the live display.js `Hallucination()` macro reader
(D-1493); rewrite both D-3680 tests to reachable states; correct
the "extrinsic arm" rationale.

Diff actually does: exactly that — one predicate swap in
`js/detect.js:245` (`Hallucination()` call replaces the
`u.Hallucination || u.HHallucination` shadow), two tombstone
comment corrections, two test rewrites (chwepon → resisted
expects "strange"; destroy-armor → mirror-consistent unresisted
expects "normal"). No new import, no new edge, no caller edits.

## Inventory

| JS site | Change | C locus |
|---|---|---|
| `js/detect.js:245` `strange_feeling` | shadow deleted → live `Hallucination()` + cite | `potion.c:1460–1476`, `youprop.h:115–120` |
| `js/read.js:1215` tombstone | comment only (macro via display.js) | — |
| `js/wield.js:1299` tombstone | comment only (macro via display.js) | — |
| `scripts/chwepon-no-weapon-feeling.test.mjs` | resisted state → "strange" | `potion.c:393–395` reachability |
| `scripts/seffect-destroy-armor.test.mjs` | H=true/HH=1 → "normal" | `youprop.h:120` |

`sym.mjs` (required paste — deleted/re-pointed symbols):

```text
Hallucination    js/display.js:1259   sync
                 js/do_name.js:275   sync
             !! multiple exports — import the C-locus one; do NOT add another
             !! ALSO 8 LOCAL CLONE(S) in 8 files — IMPORT the export; do NOT add another
               js/artifact.js:1932  js/dig.js:1612  js/do.js:468  js/mcastu.js:103  js/mon.js:1373  js/music.js:120  …and 2 more
strange_feeling  js/detect.js:245   ASYNC — await required
```

`js/detect.js:67` imports `Hallucination` from `./display.js`
(the D-1493 reader; `js/do_name.js:275` self-documents as "Not
`youprop.h:116–120` (that reader is `display.js` `Hallucination`)").
Clone count for `strange_feeling` stays 1. No STUB, no new arm.

## C ↔ JS fidelity

C (`csym`: `potion.c:1460–1476`; `--callers`: 18 refs —
`detect.c` ×6, `potion.c` ×3, `read.c` ×3 + useup notes,
`wield.c:943` — matching the D-log's caller table):

```c
if (flags.beginner || !txt)
    You("have a %s feeling for a moment, then it passes.",
        Hallucination ? "normal" : "strange");
else
    pline1(txt);
if (!obj) return;
if (obj->dknown) trycall(obj);
useup(obj);
```

Branch-by-branch confirm: `beginner || !txt` → template with
macro predicate; else `txt`; `!obj` early return (crystal-ball
null detector); `dknown` → `trycall`; `useup`. JS
(`js/detect.js:245–257`) mirrors all five in C order. No RNG in
the body (`rn2`/`rnd`/`d`: zero calls both sides). The `pline`
vs `You`/`pline1` shape is pre-existing and was verified
faithful in review 2555's mechanics pass; this SHA touches only
the predicate.

Predicate confirm: C macro (`youprop.h:115–120`, read this
review) is `HHallucination && !Halluc_resistance` with
"solely a timeout" — no extrinsic hallucination. Live
`display.js:1259` reads `h = HH-flat || uprops[HALLUC].intrinsic`,
resist = flats + `uprops[HALLUC_RES]` intr/extr, returns
`h && !resist` — the macro plus the JS flat mirrors (superset
resist reads are conservative: strictly more FALSE). Reachable
states check out: resisted (`EHalluc_resistance=1`, HH=1 →
FALSE → "strange", `potion.c:393–395` sets the timeout under
resistance); unresisted (HH=1, no resist → TRUE → "normal").

## Hallucinations / overclaim

None. The D-log explicitly retracts D-3680's phantom
"extrinsic arm" ("C says the opposite"), cites the macro lines,
and names the out-of-scope `:2662` use_crystal_ball shadow as
untouched rather than claiming it. No FORCE/DIAG/seed/coordinate
reads in the `js/` hunks (grep hits are `CURRENT.md`/`NOTES.md`
prose); Rule #2 clean (`imports.mjs --rulecheck`: "no
bare/node specifiers or fs calls in js/").

## Density

Must-fix ships alone: one C-wrong, one predicate, its tests,
its ledger tag — correct density, no head violation (Must-fix
is strict; cliffs/coverage state is irrelevant). Whole-function
rule satisfied: the body was already whole (review 2555), this
SHA repairs its one wrong predicate. Ledger entry confirmed:
`strange_feeling` ported, D-3688 + D-3680, `potion.c.jsonl`.
The named `use_crystal_ball` shadow is a different C function,
named in the D-log — a future row's work, not this SHA's omit.

## Verification

D-log claim: chwepon test fails pre-fix → 8/8 post-fix;
`verify strange_feeling` → 0 blocked (coverage-class, "no
movement owed") · REACH-OK · green · strict · cohort ·
VERIFY: PASS. Audit re-measure
(`verify strange_feeling --base 0560c51fd~1 --reach-all`):

```text
verify strange_feeling: baseline 0560c51fd~1 (scoreboard at 87a7713db, 2026-10-08T15:41:04.436Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke strange_feeling: no RNG-tagged reach; fixed smoke spread (24 run, 12.2s): 24 PASS, 0 regressed → REACH-OK
```

Reproduced exactly: 0 blocked, 0 regressed. The vacuous-verify
caveat does not apply — no queue row cited blocks, the D-log
says so, and review 2555 already established no session reaches
the resisted state. The proof is the focused red→green (this
audit re-ran both files: 8/8 pass) plus the C-macro audit, as
prescribed. No REGRESSED session.

## Actionable C-wrongs

None. Review 2555's item 1 is fully closed: resist gate live,
both tests reachable, rationale corrected (stamped
`**Addressed:** D-3688 \`0560c51fd\`` on the review).

Verdict: **ACCEPT**
