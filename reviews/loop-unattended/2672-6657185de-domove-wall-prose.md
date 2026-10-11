# Review 2672 — 6657185de — test_move writer: domove inline wall prose via back_to_glyph

Metadata: SHA `6657185de`, D-3808, cliff row-2 `hack.c` test_move writer
(@090c275ee; row-1 void-barred, falsifier live-checked). JS: `js/cmd.js`
(+14/−9, mention_walls_obstructed prose only). Test:
`scripts/domove-bump-wall-angle-stone.test.mjs`.

## Intent vs deliverable

Promise: domove's inline computed "a wall" from a typ+seenv shortcut,
missing mode-1/mode-2 walls that read stone from excluded angles; now
computes prose via live back_to_glyph + glyph_to_cmap + S_stone arms —
the exact test_move :1056–1070 shape. Claimed: 2 PASS. Diff actually
does: prose block replaced with that shape, doc deferral line shipped.
Match.

## Inventory

- `mention_walls_obstructed` prose block (js/cmd.js:3876) — changed:
  shortcut replaced by back_to_glyph shape. C `hack.c:1056–1070`.
- No new helpers, no import change (all callees already live in cmd.js:
  :17 display.js, :89 uhitm.js), no deletes, no re-points, no new edges.

## C ↔ JS fidelity

C (hack.c:1056–1070): `glyph = back_to_glyph(x,y)`, `sym =
glyph_is_cmap ? glyph_to_cmap : -1`; S_stone → "solid stone"; sym≥0 →
`an(defsyms[sym].explanation)`; else impossible-with-glyph. New inline
is line-for-line the js/hack.js:512–523 test_move shape (itself
C-exact): same three arms, same `an(defsym_explanation(sym))`, same
impossible template. Old-behavior preservation: TREE arm
(`an('tree')`) subsumed — defsyms[S_tree] explanation is "tree", same
output; ordinary seen walls still read "a wall" via defsyms; only the
wall_angle→S_stone cases change, which is the fix. C ground truth for
the probe: temp-C measured (reverted after, binary re-record
byte-identical) ux=59 uy=5 typ=VWALL seenv=SV2|SV3 wall_info=2 glyph
3929 — inputs identical both sides, C wall_angle mode-2 mask
(:3616–3618) excludes SV2|SV3 → S_stone; back_to_glyph wall arm
(:2304–2314) `seenv ? wall_angle : S_stone` confirmed the path. No RNG
in the prose arms; none added. Callees LIVE: `sym.mjs back_to_glyph`
→ js/display.js:3853 sync; `defsym_explanation` → js/uhitm.js:4510
sync. Single call site (domove bump, unchanged). Gap: none.

## Hallucinations / overclaim

None. Owner test_move verified whole (D-2439 incl. mention_walls arm)
and explicitly not re-ported; temp-trace proved the test_move arm
never fires on this path and the inline does — the writer diagnosis is
measured twice (JS trace + C dump). No dispatch-vs-callee mismatch.

## Density

Cliff-phase: writer correct, prose arm now whole vs C :1056–1070, doc
deferral shipped in-commit. Remaining inline Deferred arms (Blind
feel, Passes_walls, Underwater, tunnels, autodig, is_db_wall, Sokoban)
stay named with the D-2439 DO_MOVE-rewire deferral — honest scope.
Ledger: `test_move ported`. Verify bullet: 2 PASS + REACH-OK + green +
strict + cohort + explicit full 44/44 on a hot path. Not unreached:
both probes PASS.

## Verification

Added-lines grep: clean. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify test_move --base 6657185de~1 --reach-all`
→ `2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (95400/
95423 PASS) and `smoke 24/24 → REACH-OK` — exactly the D-log claim,
zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
