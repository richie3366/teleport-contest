# Review 1420 — 111d92e0 — docrt_flags whole-body + feel_location levitate arm (D-2461)

Metadata: SHA `111d92e0`, `js/display.js` + `js/getpos.js` + `js/lock.js`
(175 insertions). Two same-C-file (`display.c`) coverage rows in one
commit — allowed by the playbook's same-file rule. D-log: D-2461.

## Intent vs deliverable

Promise: port `docrt_flags` whole-body (flag decode, all five arms,
post_map) + rewire the two `^R` callers from `flush_screen(1)` stand-ins
+ complete the `feel_location` levitate arm (open-door / do_room_glyph /
hallway fixups). Diff ships all three. No second subsystem.

## Inventory

- Added: `docrtRecalc/Refresh/MapOnly/Nocls` consts (values 0/1/2/4 —
  byte-match `include/display.h:1017–1022`), `export async function
  docrt_flags`, module-local `set_memory_cmap`; `docrt()` reduced to
  `await docrt_flags(docrtRecalc)` (= C `:1704`).
- Rewired: `getpos_refresh` + getdir dirsym `^R` to
  `docrt_flags(docrtRefresh)` — both match their C call sites
  (`getpos.c:760`, `cmd.c:4014–4016`, verified below).
- Extended existing edges only: `sobj_at` (mkobj.js, sync),
  `update_inventory` (invent.js, sync — un-awaited call correct).
- No clone→import re-point; the one new local (`set_memory_cmap`) is a
  C-cited paint helper, not a callee clone.

## C ↔ JS fidelity

`docrt_flags` vs C `display.c:1708–1773`: flag decode exact; `!u.ux` /
in_docrt guard exact (+ the file's pre-existing `!game.level` guard,
documented); try/finally = C's set-then-fall-through (no early returns
post-set); redrawonly → `redraw_map(FALSE)` exact; uswallow →
`cls()` + `swallowed(1)` — the `cls()` compensates a documented callee
gap (C `swallowed(first=1)` does `cls(); bot();` per
`display.c:1339–1341`; JS `swallowed` notes "caller docrt already cls;
bot deferred", bot arriving via post_map botlx) — net effect exact;
Underwater (`uinwater` ≡ `Underwater`, pre-existing) / uburied arms
exact; `vision_recalc(2)`, `nocls`-gated `cls`, memory loop now in C
x-outer/y-inner order (old code was y-outer — fixed), `vision_recalc(0)`,
`see_monsters` exact; post_map `if (!maponly) { update_inventory();
botlx }` now reached by EVERY arm via the if/else chain = C's gotos
(old code returned early without `update_inventory` on the swallow/water/
buried arms — real fix). The Hallu burn-only / `flush_topl_more`
adaptations are pre-existing and untouched.

`feel_location` levitate arm vs C `display.c:777–858`: five-branch chain
(obstructed/closed-door → pile boulder → open door → ROOM/POOL →
hallway) in C order, exact. `lev->glyph` reads as `remembered_glyph`
(the JS memory record) with `memory_glyph_is_invisible` (memory-only —
matches C's memory-operand `glyph_is_invisible(lev->glyph)`); the
`typ != ROOM && seenv` split, the `[S_stone, S_darkroom)` wall-range
test, and the CORR-litcorr / ROOM-darkroom fixups are all exact.
`darkRoom` truthiness matches C's default-On option (`optlist.h:264`).
`set_memory_cmap` mirrors C's `lev->glyph = …; show_glyph(…)` (memory
write + paint). Its un-awaited `show_glyph_cell` follows the file idiom
(`map_background:1302`, `map_object:2157` likewise un-awaited in sync
callers); the disp/dirty writes run synchronously, so paint order is
preserved — not a wrong. Nits only: `sobj_at` scanned twice in the
boulder arm (C assigns once; pure scan, benign).

Callers: `getpos_refresh` body matches C `getpos.c:751–766` line for
line; lock.js `continue` = C `goto retry` with no REPEAT record, exact.

## Hallucinations / overclaim

None. The uswallow `cls()` compensation names the callee gap on both
sides (caller comment + callee comment); Named lines carry C ranges.

## Density

Two same-file coverage rows, 175 insertions, 3 files: right-sized.

## Verification

- `hidden-proxy verify docrt_flags --base 111d92e0~1 --reach-all`
  (re-run): 0 blocked both sides (vacuous, as stated); smoke 24/24
  PASS, 0 regressed → REACH-OK. Matches.
- Same for `feel_location`: 0 blocked; smoke 24/24 PASS, 0 regressed →
  REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/seed/coordinate logic.

## Actionable C-wrongs

None. Both bodies port C in order.

Verdict: **ACCEPT**
