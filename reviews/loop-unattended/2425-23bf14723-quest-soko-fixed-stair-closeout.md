# Review 2425 — 23bf14723 — quest/soko fixed-stair close-out (54 sites)

## Metadata

- SHA: `23bf14723` (2026-10-06) — D-3526.
- Subject: Open head: impossible audit + quest/soko fixed-stair
  close-out (42+12 mark+force; random paths verified whole).
- Diff: `js/mklev.js` (+193/−56: 54 marks + force flips + doc),
  extended `scripts/lspo-stair-fixed-spmap.test.mjs`, header
  touch, docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function.
  Batch manifest empty; the close-out rides the Open head per
  precedent. No prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change;
(b) 54 fixed des.stair sites (42 quest + 12 soko, 40 loaders)
gain the :4189 mark + fixed force in C order; (c) deltrap
correctly omitted (no-op: traps postdate stairs everywhere);
(d) Rog-strt/Sam-goal concrete-Lua-coord stairs are fixed →
force TRUE; (e) random paths verified whole, untouched;
(f) quest-46→42 count correction explained.

The diff actually adds: 54 `SpLev_Map.add` marks + 54
`, true)` force flips + the close-out doc. Count verified:
54 added marks, 41 hunks (40 loaders + doc). Delivered =
promised on all six points.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| 54 loader stair sites (mark + force) | C line port | sp_lev.c:4189 + :4209–4210 | whole |
| `mkstairs` (mklev.js:33394, unchanged) | C fn port | mklev.c:2157–2197 | whole, force arm C-exact |
| `splev_create_stair` / `splev_room_stair` (unchanged) | C random-arm port | sp_lev.c:4179–4181/:4187–4189 | whole |
| `l_create_stairway` body (unchanged) | `ported` | sp_lev.c:4146–4213 | re-verified |
| `impossible` (display.js) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |

## C ↔ JS fidelity

C (`csym.mjs l_create_stairway` → sp_lev.c:4146–4213):
`get_location_coord` :4185, t_at/deltrap :4187–4188,
unconditional `SpLev_Map[x][y] = 1` :4189, then mkstairs
with `!(scoord & SP_COORD_IS_RANDOM)` :4209–4210. C
(`csym.mjs mkstairs` → mklev.c:2157–2197): force → typ=ROOM
first, then the :2174 bad-terrain impossible. All cites
exact.

Branch-by-branch confirm:

- Mark + force — every site: mark before mkstairs (C order),
  force TRUE = C `!(FIXED & RANDOM)`. Exactly C. OK.
- Deltrap omission — C half: no `'^'` in sp_lev.c and the
  sole sp_lev `mktrap` caller is :1845 (des.trap path), so
  map-load creates no traps. JS half (re-run sample):
  bar_strt stairs :6560 < traps :6635, pri_loca :7777 <
  :7814, sam_goal :10433 < :10469, rog_strt :9189 < :9260,
  wiz_loca traps after :7063, soko2_1 traps after :18963.
  No-op at all sampled sites. OK.
- Stone-cell delta — JS mkstairs force arm (:33402 rooms
  first, :33404 check) is C-exact, so force TRUE drops the
  spurious :2174 impossible exactly where C does. OK.
- Rog-strt/Sam-goal — dat `shuffle(place)` +
  `des.stair({coord = place[1]})` (Lua 1-indexed first) ≡
  JS `nhlib_shuffle` + `place[0]`; concrete coords at des
  time → SP_COORD_PACK fixed → force TRUE. OK.
- Quest-42 census (re-run) — 51 quest des.stair − 5
  coord-less (Mon/Rog-loca ×2, Cav-goal ×1) − 4 quest-Val
  (D-3524, coords match) = 42. Exact. OK.
- Random paths whole — sole remaining raw mkstairs is the
  random helper itself (:23802: deltrap + mark + force
  FALSE); Mon/Rog-loca + Cav-goal + all 26 fila/filb files
  route via `splev_create_stair`/`splev_room_stair` (both
  carry deltrap + mark + FALSE). OK.
- Dat spot cites (re-run) — Bar-strt :59/:90, Wiz-strt :50,
  Pri-loca :46–47, soko4-1 :56, Sam-goal :33–34 all match
  pinned dat. OK.
- Ledger rows — `impossible` stays partial with the
  standing Rule #2 omit (d + note advanced); 
  `l_create_stairway` ported, d appended. OK.

No symbol deleted or re-pointed — no `sym.mjs` output
required (call-site args only; no import change).

## Hallucinations / overclaim

One docs-only miscount in the review-2422/2423 family:
"all 26 fila/filb stairs" — dat holds 52 des.stair lines
across 26 fila/filb files, all coord-less. The material
claim (every random path verified whole via the two
helpers, untouched) reproduces exactly — all 26 files
route through them. Count wrong, substance right.

## Density

Breadth-phase small SHA: manifest empty; impossible audit +
54-site C-order fix ride the Open head per precedent.
Per-function verdicts:

- 54 fixed sites — whole :4189/:4209–4210 ports, C order,
  cites exact, dat-verified, covered paths green. OK.
- `l_create_stairway` `ported` — body whole (fixed arms now
  fully mapped), remainder none. OK.
- `impossible` `audited` — whole modulo named Rule #2
  omits (untouched). OK.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred
  per declared override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean
(fresh `--rulecheck` this iteration).

## Verification

- D-log: `verify.mjs --fn impossible,l_create_stairway` →
  syntax PASS, rule2 PASS, 2× hidden note (none blocked),
  2× REACH-OK (smoke 24/24 each), green 2/2, strict ×2,
  cohort 7/7, auto full 44/44 (shared file changed);
  node:test stair files 60/60 (pre-change stash 41 fail /
  16 pass on the fixed file).
- Audit re-measure (same 2 fns, `--base 23bf14723~1
  --reach-all`): 0 blocked each (vacuous, correctly
  labeled — rows cited none); smoke 24 PASS / 0 regressed
  each → REACH-OK. No REGRESSED session. Matches.
- `node --test` stair files: 60/60 pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
