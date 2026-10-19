# Review 2945 — 2dc300cbb — moverock Blind arm reads glyph_at; feel_location uses live can_reach_floor

- SHA: `2dc300cbb` (cliff, board owner `moverock_core`, 2 sweep rows)
- D-entry: D-4105; Ledger: moverock_core ported; feel_location ported
- `js/` diff: `js/hack.js` +6/−13, `js/display.js` +5/−35, `js/engrave.js` +1/−2

## Intent vs deliverable

Promise, in two parts. (a) moverock_core's Blind feel test should read
`glyph_at` (the screen gbuf), not levl memory. (b) feel_location's
`can_reach_floor` clone lacked the unskilled-rider arm, so a blind mumak
rider felt a club below. Diff: `glyph_to_obj_is_boulder` becomes one
line over the live display.js `glyph_at`. The `feel_can_reach_floor`
clone and its three ustuck-only imports are deleted, and
`can_reach_floor(false)` is imported from engrave.js. Promise = diff.

## Inventory

- `glyph_to_obj_is_boulder` (moverock_core helper) — hack.js:1269; C
  hack.c :358 `glyph_to_obj(glyph_at(sx, sy)) != BOULDER`.
- `feel_location` `:777` gate — display.js:6327; C display.c :777.
- Callee `glyph_at` — display.js:1114 (gbuf `disp_glyph`, D-1767). LIVE.
- Callee `can_reach_floor` — engrave.js:583; C engrave.c :186–214. LIVE.
- Deleted clone `feel_can_reach_floor`.

## C ↔ JS fidelity

```c
if (Blind && glyph_to_obj(glyph_at(sx, sy)) != BOULDER) {
    pline("That feels like a boulder.");          /* hack.c :358–360 */
```

The JS helper returns `glyph_to_obj(glyph_at(x, y)) === BOULDER`, and the
caller negates it. That is C's expression exactly. The old body read
`remembered_glyph` (levl memory) plus a `.boulder` stamp, so a
remembered boulder that the screen showed as something else (a sensed
monster, an object) counted as "seen". JS `glyph_at` returns NO_GLYPH
for a cell with no numeric `disp_glyph`. C gbuf is always initialised.
In both cases the test is "not a boulder", so the arm fires the same way.

`can_reach_floor` (engrave.js) walked against C :186–214, branch by
branch: uswallow / ustuck-hug (!sticks && AT_HUGS) / Levitation outside
air or water → FALSE; usteed && P_SKILL(P_RIDING) < P_BASIC → FALSE (the
arm the clone lacked); uundetected && ceiling_hider → FALSE; Flying ||
msize ≥ MZ_HUGE → TRUE; check_pit arm (skipped for FALSE) → TRUE. The
clone also lacked the ceiling-hider and MZ_HUGE arms. All three are now
live. No RNG on either path.

`imports.mjs --can display.js engrave.js can_reach_floor` → SAFE
(D-log). The binding is a hoisted function read only at run time.

## Hallucinations / overclaim

None. "moverock_core stays whole vs C :348–638" was not re-walked whole.
This diff touches only the :358 helper.

## Density

One owner and the one writer clone the second session needed. Clone →
import, with net −46 lines.

## Verification

```text
verify moverock_core (--base 2dc300cbb~1): 2 blocked
  scen-sweep-Caveman-50055085: PASS
  scen-sweep-Priest-50556028: PASS
verify moverock_core: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify feel_location: 0 blocked at the parent board
```

Exact match with the D-log. Full public 44/44 on HEAD.

## Actionable C-wrongs

None. hack.js `glyph_at_fp` (:1213) is a separate fingerprint used for
nopick compares. It is outside this diff and is not a `glyph_at` reader
for moverock.

Verdict: **ACCEPT**
