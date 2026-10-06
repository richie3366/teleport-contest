# Review 2455 — ed21e53c1 — getpos `{` DEC approximation deleted (D-3573)

**Metadata.** SHA `ed21e53c1` (2026-10-06, D-3573). Type: **cliff**:
writer port for the cliffs head `dig.c watch_dig` (a text-match
misattribution — both toplines are getpos auto_describe nouns).
`js/` insertions: 13 (`js/getpos.js` +13/−35) + 1 test file.

## Intent vs deliverable

Promise: the DEC block in `build_feature_matching` (and the 5
dec-gated tags in `feature_match_tags`) sent `{` to a scan-earlier
altar where C goes to a fountain; delete the approximation so
matching[] is exactly C :1052–1061; dead `use_dec_syms` + unused
imports out. 3 scen-town sessions: 1 PASS, 2 moved.

Diff actually adds: the deletion (+ cites naming the meta-bit
carriers), nothing else. Promise matches diff.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | getpos feature-match (`build_feature_matching`; part of the getpos port) | ported (ledger omit stands: gg.getposx/y stores, audited D-3556) | [getpos.js](/home/debian/dev/teleport-contest/js/getpos.js:330) | getpos.c:1052–1061 |

Helpers: one deletion — `use_dec_syms` (JS-only DEC gate, no C
counterpart). Zero remaining refs in `js/` after removal ✓. No clones,
no new imports.

## C ↔ JS fidelity

**C compares exact values only.** C getpos.c:1052–1061 read: `c ==
defsyms[sidx].sym || c == showsyms[sidx]` plus the two narrow extras
(`^`→traps, engroom→engravings) ✓. No symset fallback, no low-7-bit
match. The kept JS (:339–351, read) mirrors all four disjuncts plus the
wall/room/corr/door + S_ndoor skip ✓.

**The meta-bit mechanism checks out.** `dat/symbols`: `start:
DECgraphics` at :689; S_altar `\xfb # meta-{` at :714, S_bars `\xfc`,
S_tree `\xe7`, S_pool `\xe0`, S_ice `\xfe` — every byte in the new
comment verified. Typed ASCII keys can never equal these carriers, so
under DECgraphics C's showsyms disjunct matches nothing for
`{`/g/`/`/~ — exactly the deleted behavior. Behavioral proof agrees:
C's cursor went to the fountain [26,11], skipping the scan-earlier
altar JS chose.

**Direction-safe regardless of JS showsyms population:** whether
`game.gs.showsyms` holds DEC or Primary values, `{`≠altar now — the
C rule.

## Hallucinations / overclaim

None. The "js-throw" print for Tourist-94102 is disclosed in-ship as
the `owner||'js-throw'` display fallback; my `show` confirms
`error: null`, `owner: null`, RNG 13836/13836 fully matched, toplines
«Die? [y Coins» vs «Coins» — a genuine next cliff (unattributed
screen), not a throw.

## Density

Cliff §10.18: head writer, one deletion unit, own `Ledger:` touch
(getpos row gains D-3573; audited omit untouched). Per-function
verdict ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: clean (comments only).
- Rule #2: clean this iteration (see 2453).
- Re-measure (mine): `verify watch_dig --base ed21e53c1~1 --reach-all`
  → **1 PASS** (Tourist-94022), **2 moved** (Priest-94282 →
  peffect_water@247; Tourist-94102 → unattributed@163), **0 worse** +
  smoke 24/24 REACH-OK — the D-log's numbers exactly.
- Committed test pins row0 "fountain" + cursor [26,11,1]; full
  `sessions` 44/44 claimed in-ship, re-covered by this audit's gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
