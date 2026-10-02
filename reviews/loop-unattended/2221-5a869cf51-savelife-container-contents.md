# Review 2221 — 5a869cf51 — savelife + container_contents whole bodies

Metadata: SHA `5a869cf5172847b2046e9357f5f083d6ffabc6b8` (D-3260,
2026-10-02). `js/end.js` (+68/−55), `js/dothrow.js` (+6/−3),
`js/invent.js` (+11/−0). Cluster: 2 end.c whole bodies + 2 callee
closures (dothrow.c, invent.c) — one C file + callees. Method per
function below.

Intent vs deliverable: subject promises "savelife + container_contents
whole-body ports; endmultishot export; unsortloot port". The diff
delivers a savelife restart on live imports, container_contents
update_inventory/unsortloot/C-exact reportempty/BoT-continue, the
endmultishot export (body untouched), and the unsortloot no-op export.
Delivers what it promises.

Inventory:

- `savelife` (`js/end.js:2054`): restart in C order — givehp :707,
  ulevel :711–712, live minuhpmax/setuhpmax :713–715, uhp/mh :716–718,
  uhunger :719–721, make_sick :724–726, nomovemsg/move/multi
  :727–736, lava reset_utrap (newly awaited) :738–739, botl/ugrave/
  HUnchanging :740–742, curs_on_u :743, endmultishot gate :744–745,
  expels/ustuck :746–754 with C You/pline split.
- `container_contents` (`js/end.js:767`): +update_inventory() :1609,
  BoT `continue` :1611–1613 (was break), +unsortloot() :1650,
  reportempty via upstart(thesimpleoname) :1662–1665 (was
  theArt(xname)).
- `endmultishot` (`js/dothrow.js:864`): local → export + doc only.
- `unsortloot` (`js/invent.js:2503`): new no-op export (free-only).
- Imports: 3 new edges (exper/potion/dothrow — doc claims
  `imports.mjs --can` SAFE, call-time use; bodies confirm call-time
  only), 4 extended pre-existing edges (hacklib/objnam/attrib/
  invent/const). No symbols deleted or re-pointed (no local clone
  removed — savelife's old minuhpmax logic was inline arithmetic,
  not a clone). `sym.mjs`: endmultishot dothrow.js:864 ASYNC
  (awaited at end.js:2086); unsortloot invent.js:2503 sync;
  minuhpmax attrib.js:329 sync; setuhpmax exper.js:127 sync;
  make_sick potion.js:1007 ASYNC (awaited); update_inventory
  invent.js:4802 sync; thesimpleoname objnam.js:3030 sync (NOT
  pickup.js:214's clone); upstart hacklib.js:460 sync (NOT any of
  the 8 file-local clones). Correct export choices throughout.

**C ↔ JS fidelity — `savelife`** (C end.c:703–756)

- Branch order matches C line-for-line: givehp before ulevel (C
  :707 before :711 — JS keeps it), uhp clamp after setuhpmax,
  make_sick arm `((u.Sick|0) & TIMEOUT) === 1` vs C
  `(Sick & TIMEOUT) == 1L` with TIMEOUT 0x00ffffff on both sides
  (C prop.h:135, js/const.js:2654) ✓, multi_reason Tourist ternary
  :735–736 ✓, `!mon_moving` endmultishot(FALSE) :744–745 ✓,
  uswallow→expels / poly-stick→You-release / else→pline :746–754 ✓.
- Callee semantics: C setuhpmax(newmax, even_when_polyd)
  (attrib.c:1155–1176) vs JS setuhpmax(newmax, evenWhenPolyd)
  (exper.js:127) — same gate, same uhpmax/uhppeak/botl/uhp-clamp
  body ✓. C minuhpmax (attrib.c:1145–1152, max(ulevel,altmin))
  vs JS (attrib.js:329) verbatim ✓. make_sick(0,null,false,
  SICK_ALL) matches C (0L,0,FALSE,SICK_ALL), SICK_ALL 0x03 both
  (you.h:401, const.js:1623), 4-arg order matches JS signature ✓.
- Extra run/mv clear has no C counterpart — pre-existing,
  explicitly named in D-log and code comment. Not new drift.
- Callers: end.c:1094/1115 → js/end.js:2171/2203 (both awaited);
  end.c:952 fuzzer named (debug-fuzz only — legitimate).

**C ↔ JS fidelity — `container_contents`** (C end.c:1593–1670)

- Non-container boxes: C falls through the outer `if` to the bottom
  break; JS `if (!all_containers) break; continue` — equivalent ✓.
- BoT: C :1611–1613 `continue` skips the bottom break; JS `continue`
  in for..of does the same, and the old break-where-C-continues bug
  is fixed ✓. cobj/reportempty chain equivalent given the continue ✓.
- Identified arm (discover_object, dknown, known/bknown/rknown,
  container cknown/lknown) and sortflags (SORTLOOT_LOOT on 'l'/'f'
  + SORTLOOT_PACK) are pre-existing and match C :1623–1647 ✓.
- reportempty now `upstart(thesimpleoname(box))` — C-exact :1663 ✓.
- Dumping arms correctly dead: JS never dumps (blank line always
  pushed = C `if (!dumping)`), named with DUMPLOG-retired pointer ✓.
- display_nhwindow(WIN_MESSAGE) after reportempty named (message
  window live-displays) — legitimate sink omit.
- Callers: end.c:639 disclose (:855) + :1660 recursion (:822) wired;
  :593 dumplog named; pickup.c:3122 via pickup.js:2531 clone drift
  named (keeps update_inventory gap — honest, queued nowhere but
  out of cluster scope).

**C ↔ JS fidelity — `endmultishot`** (C dothrow.c:589–601)

- Body untouched; export only. C callers: dothrow.c:1119,
  end.c:745, zap.c:4209 (+ commented-out mthrowu.c:308 — the doc's
  "dothrow.c:1119 → :3210" notation is confusing but the mapping is
  right: JS :3215 wires :1119, JS :2166 is the second internal
  site, end.js:2086 wires end.c:745). zap.c:4209 boomerang queued
  as its own row this commit — correct handling, not a silent stub.

**C ↔ JS fidelity — `unsortloot`** (C invent.c:646–651)

- C is free-only (`free(*p), *p = 0`); JS GC no-op export at the
  C-order call site. Same convention as sortloot's str free.
  Callers invent.c:1900/2535/3368 + pickup.c:1115/1144 named
  (free-only, unwired) — legitimate.

Hallucinations / overclaim: none. "Whole C body live" holds for all
four — I walked every C line against the JS. The Tourist-92095
NO MOVEMENT is presented as a downstream residual with a queued
writer row (moveloop_core), not as success.

Density: 4 functions, one C file + callee closure, +85/−58 JS —
coherent cluster, under caps. Verdicts: savelife ACCEPT,
container_contents ACCEPT, endmultishot ACCEPT, unsortloot ACCEPT.
Each has its own `Ledger:` entry (all `ported`) and Verify
sub-bullet. SHA verdict = worst = ACCEPT.

Verification: D-log Verify shows green 2/2, strict ×2, cohort 7/7,
savelife NO MOVEMENT (Tourist-92095 still step 49) + smoke
REACH-OK ×4. Re-measured (`hidden-proxy.mjs verify
savelife,container_contents,endmultishot,unsortloot --base
5a869cf51~1 --reach-all`, on current tree):
`savelife: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(Tourist-92095 moved 49 → exercise@66 under later SHAs — forward
motion, consistent with the queued-writer story) + `smoke … 24
PASS, 0 regressed → REACH-OK`; the other three vacuous (0 blocked
at baseline, exactly as the D-log's "no corpus session is blocked"
says) + smoke 24/24 REACH-OK each. Zero REGRESSED. Banned-pattern
grep on js/ hunks: clean (only the commit message's own "No
DIAG/FORCE" line). `imports.mjs --rulecheck`: clean.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
