# Review 2480 — 0421e7ad4 — search_special subrooms (D-3599)

**Metadata.** SHA `0421e7ad4` (2026-10-07, D-3599). Type: **cliff**:
writer fix for the cliffs head `sounds.c dosounds` (3 corpus
blocks) — the shop-sound arm never fired because `search_special`
walked the dead `game.level.subrooms` array. `js/` insertions: 48
(`js/hack.js`, `js/sounds.js`, `js/teleport.js`) + new test.

## Intent vs deliverable

Promise: all three `search_special` bodies walk `rooms[41+]` as
C's loop 2 (decl.c:1169), so the town shop subroom is found and
2 town sessions move past dosounds; dig-94215 honestly stays
(other writer).

Diff actually adds: the two-loop rewrite ×3 + `MAXNROFROOMS`
added to three existing const.js imports (no new module edges).
Promise matches diff. No symbols deleted or re-pointed.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | search_special (canonical export) | ported | [sounds.js](/home/debian/dev/teleport-contest/js/sounds.js:565) | mkroom.c:764–780 + decl.c:1169 |
| 2 | search_special (teleport local) | ported (VAULT-only callers) | [teleport.js](/home/debian/dev/teleport-contest/js/teleport.js:849) | mkroom.c:764–780 + decl.c:1169 |
| 3 | search_special_rtype (hack boolean) | ported (exact-type caller) | [hack.js](/home/debian/dev/teleport-contest/js/hack.js:3205) | mkroom.c:764–780 + hack.c:3739 |

## C ↔ JS fidelity

**C structure confirmed.** `csym search_special` →
mkroom.c:764–780: loop 1 `rooms[0..]` to `hx<0`, loop 2
`gs.subrooms[0..]` to `hx<0`, same 3-arm match (ANY_TYPE /
ANY_SHOP / exact) ✓. `gs.subrooms = &svr.rooms[MAXNROFROOMS+1]`
(decl.c:1169, re-read — the sed window puts that statement
exactly on :1169) ✓. `MAXNROFROOMS 40` in C global.h:385 and
js/const.js:2318 alike, so loop 2 starts at index 41 both
sides ✓. The dosounds trigger (sounds.c:313–325, read):
`has_shop && !rn2(200)` → `search_special(ANY_SHOP)` →
`You_hear1(shop_msg[rn2(2)+hallu])` — matches the D-log's
divergence (C `rn2(2)` vs JS falling through to gethungry) ✓.

**All three bodies mirror C.** sounds.js: full 3-arm `match()`,
loop 1 from index 0 to sentinel, loop 2 from 41 to sentinel ✓.
teleport.js: ANY_SHOP + exact arms; its only callers pass VAULT
(js/teleport.js:1322/:2645, mirroring C teleport.c:775/:1939
which both pass VAULT) so the missing ANY_TYPE arm is
unreachable — whole for its callers; the drift stays named in
c-js-map data.md ✓. hack.js: exact-type boolean; its caller
passes concrete `rt` (C hack.c:3739, guarded by `rt != 0` with a
COURT/SWAMP/… switch — never ANY_*) so the ANY arms are
unreachable; boolean-vs-pointer is safe under the `!…`
truthiness use ✓. `game.level.subrooms` is now readerless (grep
finds no code readers) and left as named dead data ✓.

`sym.mjs` (required paste): `search_special js/sounds.js:565
sync !! ALSO 1 LOCAL CLONE(S) — js/teleport.js:849`;
`search_special_rtype NOT EXPORTED — 1 LOCAL CLONE —
js/hack.js:3205`. Both clones verified whole-for-caller above.
`imports.mjs --can js/teleport.js js/sounds.js search_special`
→ IN-SCC but "hoisted — cycle-safe": the kept clone is
cycle-caution, not cycle-forced (the D-log says "rejected", not
"impossible" — fair). Style, not fidelity.

## Hallucinations / overclaim

None. The dig-94215 non-move is disclosed with its differing
divergence (missing «You stop digging.» — occupation path, not
the shop arm). No "Match C" is claimed beyond the three bodies.

## Density

Cliff §10.18: parent queue head is dosounds (3 blocks, RNG 936 —
re-read from `0421e7ad4~1:docs/LOOP-QUEUE.md`) ✓. One cliff
(writer in the same C file family), own `Ledger:` touch (D-3599
on search_special), movement on 2/3 probes with the third
honestly held. Per-function verdicts ACCEPT ×3 → SHA ACCEPT.

## Verification

- Added-code grep: clean (loop rewrites + const imports; no
  FORCE/DIAG/seed/coords).
- Rule #2: `imports.mjs --rulecheck` clean (run this iteration).
- Committed test `search-special-subrooms.test.mjs`: PASS now.
- Re-measure (mine): `verify dosounds --base 0421e7ad4~1
  --reach-all` → **0 PASS, 2 moved past, 1 unchanged, 0
  worse** (Ranger-94002 → yn_function@219, Tourist-94062 →
  mattacku@218, dig-94215 still dosounds@61) + reach 657/657
  REACH-OK. Matches the D-log exactly. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
