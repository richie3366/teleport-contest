# Review 2564 — 7176eaf8b — hallu corpse-body oclass char (D-3691)

- SHA: `7176eaf8badbfa0de7a681bb194e109a822cc9ea`
- Subject: next-live-head `display.h` random_obj_to_glyph CORPSE arm: body glyphs render CORPSE oclass `%`, JS painted the monster letter (Knight-94330 121→PASS) (D-3691)
- D-entry: D-3691. Type: next-live-head owner-null single (last live head).
- Diff size: `js/display.js` +9/-4 (one arm's `ch`); +1 new test (1 it); ledger D-tag.

## Intent vs deliverable

Promise: at Knight-94330 step 121 C paints `%`/blue where JS
painted `j`/blue — a hallucinated boulder whose appearance roll
hit CORPSE + mnum 56 (blue jelly). C renders body glyphs with
`objects[CORPSE].oc_class` (FOOD `%`), monster letter never;
only the color comes from the monster. Fix the arm's `ch`,
keep burns/glyph/color.

Diff actually does: exactly that — `ch` becomes
`oc_display_sym(objects[CORPSE].oc_class ?? FOOD_CLASS)`,
`mcolors[mnum]`, `mnum + GLYPH_BODY_OFF`, burns untouched, dead
`mons()`/letter logic deleted. Paint-only delta.

## Inventory

| JS site | Change | C locus |
|---|---|---|
| `js/display.js:2539` hallu-CORPSE arm | `ch` letter → oclass sym | `display.h:933–936`, `display.c:3004–3010` |
| same-module helper (unchanged) | `oc_display_sym` (shared by 3 sibling arms) | `symbols.c:201`, `defsym.h` |

Name resolution (`sym.mjs`; diff deletes a *call*, no export):

```text
oc_display_sym   NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/display.js:535
mons             js/monsters.js:227   sync
```

(`oc_display_sym` is the module's single canonical helper, used
by every oclass arm in `obj_glyph` — not drift.)

No re-point, no new edge, no STUB. `mons` stays live for its
other users (statue arms).

## C ↔ JS fidelity

Macro (`csym`: `display.h:933–936`): CORPSE → second burn
`random_monster(rng)` + `GLYPH_BODY_OFF` (non-piletop, no pile
concept). JS: otyp burn, conditional mnum burn, `mnum +
GLYPH_BODY_OFF` — same order, same count (burn lines are
context, untouched; RNG-flat result corroborates).

Render (`display.c:3004–3010` BODY, `:2798–2803` BODY_PILETOP,
both read this review): `symidx =
objects[CORPSE].oc_class + SYM_OFF_O`, color `mon_color(offset)`
unless `has_rogue_color` → `CLR_RED`. JS: `ch =
oc_display_sym(FOOD)` = `%` (`js/display.js:512`; ROGUESET `:`
via `:533`, same helper as the true-corpse arm directly below
— identical shape by construction), color `mcolors[mnum]`
(house `mon_color`, same expression as the statue-hallu
`:950–953` and true-corpse arms). `glyph`/`dec` unchanged.
`map_object :333–366` re-read confirms the D-log's no-double-
burn: the second `obj_to_glyph` (`:350`) is gated on
`!Hallucination`, and memory/show reuse the one glyph
(`:361/:365`) — single-burn on this session's hallu path.

Untouched context (not findings): the hallu gate reads sticky
`u.Hallucination` where C `obj_to_glyph :963–965` reads the
macro — equivalent under the maintained sticky mirror
(review 2555); `has_rogue_color` CLR_RED first-arms stay
unported exactly like the true-corpse arm (shared pre-existing
note, D-3674 (1) standing cited — loose line numbers, same
flag, honest).

## Hallucinations / overclaim

None. "Mirrors C `:933–936` + `:3004–3010` exactly" holds for
the arm (burn order, non-piletop BODY_OFF, oclass char, mon
color); the rogue-color and map_object caveats are named, not
claimed. Measurement trail is concrete (TEMP display-RNG trace
with the CORPSE+56 signature, clang enum check, recorder-vs-
upstream objects byte-identical, DEC-census of the row-20 `j`).
No FORCE/DIAG/seed/coordinate reads in the `js/` hunks; Rule #2
clean (global `--rulecheck`, SHA 2562).

## Density

Legit pop: last live owner-null head per D-3690 Next (Must-fix
empty then, park-maxed head, coverage empty, batch dry). One
arm inside the shared `obj_glyph` choke (D-3674 shape — every
C `obj_to_glyph` site inherits it; caller table in the D-log),
code + test + rescore in one handoff. Ledger only prepends
D-3691 to the existing `map_object` ported row — no new status
claim. Right density; emptied the live queue (938/953).

## Verification

D-log claim: focused 0/1 → 1/1; targeted rescore 937→938
(Knight FULL PASS 287/287 + RNG 3801/3801); full 938/953, 0
regressed; `verify map_object` → note hidden (owner-null) ·
REACH-OK · green · strict · cohort · full 44/44. Audit
re-measure (`verify map_object --base 7176eaf8b~1 --reach-all`):

```text
verify map_object: baseline 7176eaf8b~1 (scoreboard at 5717d752d, 2026-10-08T17:06:46.999Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke map_object: no RNG-tagged reach; fixed smoke spread (24 run, 10.7s): 24 PASS, 0 regressed → REACH-OK
```

Reproduced. Movement independently confirmed: `show
scen-impaired-Knight-94330` reads PASS, RNG 3801/3801, screens
287/287 — the D-log's numbers exactly. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
