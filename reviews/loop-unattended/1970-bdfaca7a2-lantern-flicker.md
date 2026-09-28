# Review 1970 — bdfaca7a2 — timeout.c lantern/flicker extraction (D-3010)

Metadata: SHA `bdfaca7a2`, D-3010, two-function `timeout.c`
extraction + three call-site rewires inside `burn_object`.
Stat: `js/timeout.js` +47/−29 (single file). No prior
review file on disk. Cluster commit → Method per function
below.

## Intent vs deliverable

Subject promises two file-local extractions fixing three
dropped C arms (Hallucination batteries line, age-25
MINVENT arm, naive `'s` possessive) with all three
`burn_object` sites rewired. Diff actually does exactly
that. Promise and diff match.

## Inventory (per function)

- `see_lamp_flicker` (NEW, file-local async,
  `js/timeout.js:1869`): INVENT+MINVENT pline arm +
  FLOOR You_see arm (C staticfn → file-local ✓; async
  because pline/You_see await, D-2997/D-3001 precedent).
- `lantern_message` (NEW, file-local async, `:1886`):
  INVENT Your + Hallucination / FLOOR You_see / MINVENT
  s_suffix pline arms.
- Rewired: three `burn_object` sites (`:1971` lantern,
  `:1973` flicker with the age-50 ' considerably' tailer,
  `:1980` age-25 lantern); age-25 "about to go out"
  else-branch preserved (`:1983–1985`).
- Imports: `Your` + `s_suffix` added to the existing
  display.js/do_name.js edges (D-log `--can`: no new edge;
  the hunks show names added to existing import
  statements — textual proof). No symbol deleted or
  clone→import re-pointed, so no `sym.mjs` deletion output
  is required (`s_suffix js/do_name.js:410 sync`
  spot-checked; the commit correctly imports the export
  rather than adding a sixth local clone).

## C ↔ JS fidelity (per function)

`lantern_message`, `csym` `timeout.c:1359–1376` (18 lines,
read whole with the JS): INVENT Your + `if
(Hallucination)` batteries pline ✓ (the dropped arm,
restored); FLOOR You_see ✓; MINVENT
`s_suffix(Monnam(obj->ocarry))` ✓ (replaces the naive
`${Monnam}'s`; `s_suffix` handles the sibilant tail like
C). No `obj.ocarry` guard — C has none (MINVENT ⇒
carrier invariant), and adding one would be a C-wrong;
correctly omitted ✓. Callers (`--callers`): exactly
`:1482` + `:1492` → `:1971` + `:1980` — both wired ✓.
D-log "Named: none" holds. Verdict: OK.

`see_lamp_flicker`, `csym` `timeout.c:1344–1356` (13
lines, read whole with the JS): INVENT+MINVENT fallthrough
pline with Yname2 + tailer ✓; FLOOR You_see with
`an(xname)` + tailer ✓. Caller (`--callers`): exactly
`:1484` → `:1973` with `age == 50 ? ' considerably' :
''` ✓. Verdict: OK.

`burn_object` (rewire context, not a new port): the C
milestone structure (`:1476–1500`, read) is 150/100/50 →
lantern/flicker + 25 → lantern/"about to go out". JS now
mirrors it at all three sites; the old inline code's
three drops (batteries, age-25 MINVENT, possessive) are
exactly the three fixes. The `canseeit` gate stays in
`burn_object` (untouched) as C has it ✓. No RNG in any
of the three bodies; none added. Verdict: OK.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed hits.
Rule #2 clean (re-verified 1963).

## Hallucinations / overclaim

None. "No ocarry guard — C has none" verified true
against the 18-line body. No dispatch-over-stub (direct
calls into whole bodies).

## Density

Single-file extraction, 2 functions, +47/−29 — small but
this is a milestone-arm repair (dropped C arms restored),
not a coverage row; nothing more of the closure was Open.
Whole functions, all callers wired → OK.

## Verification

D-log: `verify.mjs --fn lantern_message,see_lamp_flicker,
burn_object` → syntax (1 file) · rule2 · 3× note hidden
+ REACH-OK (smoke 24 each) · green 2/2 · strict ×2 ·
cohort 7/7 · full 44/44 (forced: timer-adjacent) ·
VERIFY: PASS. Re-measured here
(`--base bdfaca7a2~1 --reach-all`, all three): each
reports 0 blocked at baseline and in the working
scoreboard with `fixed smoke spread (24 run): 24 PASS,
0 regressed → REACH-OK` (all three pairs observed
in-session across two calls). Honest vacuous notes.
Zero REGRESSED. No seed/step/coordinate/RNG-index reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
