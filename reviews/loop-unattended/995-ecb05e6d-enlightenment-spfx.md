# Review 995 — ecb05e6d — enlightenment Displaced/Regen/Polycontrol + abil_to_spfx (D-2025)

Metadata: SHA `ecb05e6d`, D-2025, Open-row port
(one_characteristic-symptom writers, 5/5 sessions). js/
touches `js/invent.js` (+~40: two hero_ helpers, four arm
insertions across final + overlay paths), `js/artifact.js`
(+22/−4: 12-row table, propidx param), `js/attrib.js`
(+1/−1: pass-through). No stamp owed.

## Intent vs deliverable

Subject promises: three missing enlightenment Attribute
rows (Displaced / Polymorph_control / Regeneration) plus
the prop-indexed spfx lookup behind `from_what` (cloak of
displacement, poly-control ring, Trollsbane). Diff
actually adds: those arms in C order on BOTH the final
and overlay paths, the table, and the plumbing. Promise
== diff.

## Inventory

- New JS functions: `hero_Polymorph_control`,
  `hero_Regeneration` (local mirrors in the file's
  `hero_Teleport_control` idiom: flat H/E mirrors +
  uprops slots); local `abil_to_spfx(propidx)`.
- Classification: all LIVE. `what_gives` gains `propidx
  = -1`, and the SOLE repo-wide caller (`from_what`,
  verified by grep — no other call site in `js/`) passes
  it, so the default is dead-safe and no other caller can
  hit the old hardcoded-HALRES path. Behaviour change is
  confined to the fixed prop rows by construction.
- No deletes / re-points, no STUB / clone / no-op.
  Named omits: adtyp `cary`/`defn` arms, Sunsword EBlnd,
  cspfx match, EWarn_of_mon warntype guard; neighboring
  final-path Jump/Teleport/Aggravate/Conflict/Slowdig/
  combat-inc/defense/Unchanging/Poly/Upolyd/Adorn/Invis.

## C ↔ JS fidelity

Checked against `insight.c`: Displaced before Stealth
(`:1667–1670`, `you_are("displaced", …)`) ✓;
Regeneration first in Physical (`:1768–1769`,
`enl_msg("You regenerate", "", "d", "", …)`) — the
present/past choice is preserved via `final ? 'd' : ''`
on the final path and `''` on the always-present overlay
path, matching C's `final`-keyed enl_msg ✓; Polymorph_
control after the shape-change arms, before Fast
(`:1857–1858`, `you_have("polymorph control", …)`) ✓.
`youprop.h:345` (`Regeneration (H||E)`) and `:366–368`
(`Polymorph_control (H||E)`) confirm the H||E shape
behind both helpers; the extra flat checks are this
file's established mirror idiom (cf.
`hero_Teleport_control` directly above), not invention ✓.
`abil_to_spfx` at `artifact.c:2344–2367`: all 12 rows
present IN C ORDER (SEARCH→SEARCH through REFLECT→
REFLECT, both WARN rows) ✓ — the pointer-identity key
correctly re-keyed to the propidx the single caller
already holds. C `what_gives` `:2382–2390`
wornmask/twoweap/spfx-arm structure otherwise untouched ✓.

## Hallucinations / overclaim

None. No "Match C" claim beyond the ported arms; the
deferred neighbors are named per-path (final vs overlay
listed separately).

## Density

One symptom family (Attribute menu rows), three small
arms + one table across the two files that already own
this code. Right-sized.

## Verification

Re-measured myself:

```
node scripts/hidden-proxy.mjs verify one_characteristic --base ecb05e6d~1
→ 5 session(s) blocked (5 at baseline, 0 working)
→ 2 PASS, 3 moved past, 0 unchanged, 0 worse → PROGRESS
```

Reproducing the D-log exactly (Ranger-92073 / 92049
PASS; two Rangers → give_to_nearby_mon@61/@91;
Caveman-92050 → save_dungeon@118) — a clean 5/5 sweep,
the strongest verify in this batch. js/ hunk grep: no
banned patterns. Rule #2 clean (global re-run). Cited
green + strict ×2, cohort 7/7.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
