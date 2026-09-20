# Review 1568 — 28b6f89f — insight.c weapon_insight whole-body port (D-2609)

**Metadata:** SHA `28b6f89f`, `insight.c` `weapon_insight`, D-2609.
JS: `js/invent.js` (+182 net: new export + both builders rewired +
dead `pretty_weapon_descr` removed), `js/do_wear.js` (1-word export
addition). Map `startup.md` touched.

## Intent vs deliverable

Subject promises: whole-body port under one export, both builders
wired, shield/towel/ammo/can_advance arms live. Diff actually adds:
`weapon_insight(final, opts)` in C order with per-arm cites, both
`enlightenment` and `doattributes` routed through it, dead clone
removed, overlay `sklvlbuf2` mapping corrected. Matches — except two
string literals below.

## Inventory

- `weapon_insight(final, opts)` (new export, `js/invent.js:5291`) —
  wield line, skill line, two-weapon compare, secondary compare,
  enhance tips, overlay spacing/clip.
- `shield_simple_name` export-only change (body untouched).
- Deleted: dead `pretty_weapon_descr` (`${quan} ${what}s` fake).
- Both builders: inline snapshots replaced by the export.

## C ↔ JS fidelity

C locus `insight.c:1269–1465` (197 L, via `csym.mjs`); full body read
here in two parts. Chain confirmed first: C `enlightenment()` calls
`status_enlightenment(mode, final)`, which calls `weapon_insight(final)`
(`:1249`) — so both JS builders emitting it is correct, with
`final` tense on disclosure and `0`/present on the overlay.

Confirmed live: wield line (`:1277–1310` — empty/two-weapon/`weapon_descr`
+ shield/towel specials + strcmpi `armor`/`food`/`venom` → "some" +
`quan==1 an()` else bare `makeplural()`); `!is_ammo` guard (`:1311`);
restricted→"no" (`:1315–1318`); enhance suffix (`:1325–1327`,
final-tense); restricted-twoskl→unskilled/"restricted" (`:1343–1350`);
secondary plain-`lcase` (`:1381`, no "no" mapping — the corrected bug);
enhance-tips 1/2/3-way phrasing (`:1432–1442`, concat order exact);
`eos()` appends as concat; overlay extra space + COLNO `.` clip.

**Gap (C-wrong, Actionable 1):** the two primary-compare `sfx`
literals drop C's leading space. C builds `sfx = " limited by being
%s with two weapons"` and `sfx = " limited by "` (leading space;
`enlght_line` is plain ` %s%s%s%s.` concat — verified against JS
`enlght_line_txt`, `` ` ${start}${middle}${end}${ps}.` ``, also plain
concat). JS `js/invent.js:5391–5401` builds `sfx = \`limited by being
${twobuf} with two weapons\`` and `sfx = 'limited by '` — no leading
space — so `emit(pfx, is/was, sfx)` prints "Your skill in X
**islimited** by ..." / "Your two weapon skill **waslimited** by ..."
on both builders whenever the primary arm is taken. The secondary arms
(` ${also}limited ...`) and the enhance-tips `esfx` (` skill...`)
keep theirs — only these two literals are wrong. The deleted overlay
code had the space (`is limited by`), so the overlay path **regresses**
here; the corpus has no two-weapon enlightenment-text oracle, hence no
REGRESSED session — a screen-text C-wrong, not a corpus regression.

Callee closure: `is_wet_towel`/`can_advance`/`weapon_type` LIVE
(weapon.js sync); `shield_simple_name` LIVE via the export-only change
(required `sym.mjs` output in notes; no clone added);
`an`/`makeplural`/`is_ammo`/`lcase` live; `imports.mjs --can` on both
new edges → ALREADY. `weapon_type`/`skill_name`/`insight_P_SKILL`/
`insight_skill_level_name` are pre-existing in-file locals the old
inline code used identically — named drift (map), not new divergence.
No stub, no silent omit.

## Hallucinations / overclaim

"Named: none new" is accurate (drift locals named in the map row).
No dispatch/stub split. The commit does not mention the spacing
regression — it reads as an oversight, not a claim; the per-arm cites
are otherwise exact.

## Density

One C function (197 L), one JS module + 1-word export. Right-sized;
same-file builder rewiring included per the breadth rule.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean.
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/RNG/seed reads (one
  "seed8000" hit is the commit message's green-gate line).
- D-log Verify claims PASS + smoke REACH-OK (full skipped, no shared
  file). Re-measured: `hidden-proxy.mjs verify weapon_insight
  --base 28b6f89f~1 --reach-all` → 0 blocked at baseline and working
  tree (vacuous-note path, correctly framed — RNG-0 function) +
  `smoke 24/24 PASS, 0 regressed → REACH-OK`. Confirmed. (Smoke cannot
  catch a text-spacing bug — the gap above was found by C↔JS string
  comparison, which is why the audit reads bodies.)

## Actionable C-wrongs

1. (Must-fix, queued) Primary two-weapon compare drops C's leading
   space in two `sfx` literals (`js/invent.js:5391–5401`): add it back
   (` limited by being ...` / ` limited by `) to match C
   `insight.c:1355–1369`. One-iter fix; verify `verify.mjs --fn
   weapon_insight` + a two-weapon enlightenment text probe.

## Postscript (cadence, same iteration)

The end-of-iteration full `sessions` run on this SHA reads **43/44**:
`seed0107-samurai-twoweapon-enhance` FAILS with RNG 2902/2902 fully
matched and screens 97/98 — the C-recorded screen expects `Your skill
in long sword is limited by being unskilled with two weapons.` (primary
compare, twoskl < sklvl) while this SHA prints `islimited`. The parent
`dba7a580` claimed full 44/44, so this SHA introduced the breach. The
queued Must-fix row now cites this session. No other session moved.

Verdict: **QUALITY-RISK**

**Addressed:** D-2610
