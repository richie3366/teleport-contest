# Review 1714 — 7cd2543a4 — pick_lock !IS_DOOR turn-keep (D-2755)

- SHA: `7cd2543a4` (`lock.c` pick_lock !IS_DOOR keeps the turn when lev->glyph changes, D-2755)
- Files: `js/lock.js` (+25/−?), `js/display.js` (+33/−?) — small diff, small C locus
- D-log: D-2755; queue row: Open missing-arm (C `lock.c:578–593` DID_NOTHING half), 0 corpus blocks
- Rule #2: `node scripts/imports.mjs --rulecheck` → clean (whole `js/` tree, this audit)
- Banned grep on diff (`FORCE|DIAG|getRngLog|fastforward`): 0 hits

## Intent vs deliverable

Subject promises: the `!IS_DOOR` arm of `pick_lock` keeps the turn (returns
LEARNED) when `lev->glyph` changes. Diff actually adds: (1) `js/lock.js`
`cellGlyph` helper (new, reads `remembered_glyph.glyph` integer) + the
`!IS_DOOR` half rewritten to snapshot-compare `oldglyph`/`oldlastseentyp`
around `feel_location`; (2) `js/display.js` `feel_location` ROOM arm split
into tty-match paint (old behavior) + id-only integer write. Promise kept —
no scope drift.

## Inventory

| JS symbol | Class | C counterpart |
|-----------|-------|---------------|
| `cellGlyph` (lock.js, local) | no-C helper (reads struct field C reads inline) | `door->glyph` (`lock.c:579,584`) |
| `pick_lock` !IS_DOOR half | C callee body | `lock.c:578–593` |
| `feel_location` id-only arm | C callee body | `display.c:894–897` |

`sym.mjs`: `cellGlyph` 1 local clone (new this commit, no prior); `memory_is_cmap`
pre-existing local in display.js; `update_mapseen_for` live export
(js/dungeon.js:1545). No deleted/re-pointed symbols — no clone→import check needed.

## C ↔ JS fidelity

C (`lock.c:578–593`, sed-verified): `res = DID_NOTHING; oldglyph =
door->glyph; oldlastseentyp = update_mapseen_for(); feel_location(); if
(door->glyph != oldglyph || lastseentyp != old) res = LEARNED;` then the
drawbridge/no-door `You()` + `return res`. JS (`lock.js:1321–1338`) is the
same statement order with the same predicates. Reference check: `door` is
`game.level?.at(cc.x, cc.y)` (lock.js:1301), the live level cell, and the
id-only arm mutates `loc.remembered_glyph.glyph` in place, so the
post-`feel_location` `cellGlyph(door)` read sees the write; the tty arm
replaces the object but `door` still points at the cell. `update_mapseen_for`
returns `lastseentyp[x][y]|0` post-recalc and JS compares the live
`game.lastseentyp` after `feel_location` — structurally C's compare.

C (`display.c:894–897`): gate `typ==ROOM && glyph==cmap_to_glyph(S_room) &&
(!waslit || (dark_room && use_color))`, write `glyph =
cmap_to_glyph(dark_room ? S_darkroom : S_stone)`. JS gate
(`display.js:4955–4962`) matches, including `use_color` in the gate but
**not** in the write (`darkRoom` = `dark_room` only) — correct per C.
`memory_is_cmap(mem, S_room)` prefers the integer-id compare, i.e. C's
`lev->glyph == cmap_to_glyph(S_room)`. Measured C state cited
(3992→3993, `lastseentyp` unchanged) explains why the D-2744 tty/snapshot
compares missed it.

One deliberate deviation, named in the D-log: C wraps the write in
`show_glyph(...)`; the id-only arm skips `show_glyph_cell`. Justification
(recorder tty already shows the room floor; S_darkroom shares the symbol;
painting ASCII `.` over DECgraphics meta-`~` would be wrong) is display-layer
plumbing, screen-neutral on fortress + cohort, and explicitly fenced. No RNG
in either path. Not a C-wrong; noted, not queued.

## Hallucinations / overclaim

None. D-log says what it did (integer-id write, no gbuf dirty raise) and
names what it did not (`maybe_absorb_item` still unported). No "Match C"
for a stubbed callee — every callee here is live.

## Density

~58 insertions for a 16-line C half + 4-line display arm: right-sized for
the C locus (Open missing-arm row, not a whole-function row). No second
subsystem touched.

## Verification

D-log Verify bullet claims: hidden 0 blocked (row cited 0), reach smoke
24/24 REACH-OK, green 2/2, strict ×2, cohort 7/7, full 44/44, seed1500
2768/2768 + 40/40. Re-measured myself:
`hidden-proxy.mjs verify pick_lock --base 7cd2543a4~1 --reach-all` →
"0 session(s) blocked", "smoke … 24 PASS, 0 regressed → REACH-OK". Claim
true; vacuous-verify note correctly reflected in the D-log (0-block row,
gates carry the evidence).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
