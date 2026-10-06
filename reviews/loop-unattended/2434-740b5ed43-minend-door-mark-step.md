# Review 2434 — 740b5ed43 — minend-1/2 des.door :4661 mark step

## Metadata

- SHA: `740b5ed43` (2026-10-06) — D-3544.
- Subject: Open head: impossible audit + minend-1/2
  des.door :4661 game-mark campaign step (10 sites,
  2 bitmaps C-complete; juiblex excluded).
- Diff: `js/mklev.js` (+8/−3: 3 mark lines + doc lines),
  new `scripts/lspo-door-minend-spmap.test.mjs`,
  docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function.
  No manifest (4 unshippable partials, read-only preview);
  the step rides the Open head per precedent. No prior
  review claimed closed (`**Addressed:**` absent — correct,
  the popped row cited none).

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change;
(b) minend-1/meDoor (7) + minend-2/meDoor (2) + gated
inline (52,5) gain the guarded :4661 mark in C order;
(c) per-site des evidence (7 + gated + 2, masks + coords
in order; gated inside percent(50) :34–40 after terrain
S :38; stairs up 36,04 :51/:76; no mazewalk/drawbridge/
ladder); (d) both bitmaps C-complete (doors-before-stair
kept in JS); (e) provably neutral (STWALL/CROSSWALL-gated
readers uncalled, mazewalk-path readers off-path, region
loops coordinate-iterated); (f) juiblex surveyed and
excluded (no des.door, no door closure).

The diff actually adds: the 3 mark lines + 1 des cite +
doc blocks. Delivered = promised; (e) carries loose
doc-line cites (see Hallucinations), substance verified
true.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| minend-1 meDoor closure (mark) | C line port | sp_lev.c:4661 | whole |
| minend-2 meDoor closure (mark) | C line port | sp_lev.c:4661 | whole |
| minend-2 gated inline (mark) | C line port | sp_lev.c:4661 | whole |
| `sel_set_door` live body (unchanged) | `ported` | sp_lev.c:4646–4662 | re-verified |
| `impossible` (display.js) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |

## C ↔ JS fidelity

C (`csym.mjs sel_set_door`): sp_lev.c:4646–4662 —
typ-normalize :4652–4658, orientation :4659, doormask
:4660, unconditional mark :4661. One live caller form
(:4730 coord-form via `&typ`); wall-form goes through
create_door (no mark). No RNG in the marked line.

Branch-by-branch confirm:

- Mark placement — guarded set-add after doormask in
  all 3 sites, C :4660/:4661 order, astralDoor idiom
  (mark between doormask and flags mirror). OK.
- Des census (re-read pinned lua) — minend-1 :43–49: 7
  locked doors at 07,16 + 22,08 + 26,08 + 40,14 + 50,03
  + 51,16 + 66,02; stair up 36,04 :51. minend-2 :39:
  locked 52,05 inside `if percent(50)` :34–40 after
  terrain S :38; :73–74 locked 12,02 + 11,06; stair up
  36,04 :76. Zero mazewalk/drawbridge/ladder in either
  file. JS matches in order (meDoor :16479–16485,
  inline :16644–16651, meDoor :16708–16709). OK.
- Doors-before-stair — des doors precede stairs :51/:76;
  JS stairs :16491/:16714 follow the door sites; gated
  terrain-before-door kept (setTer S then inline).
  minend-2 post-stair markNondig/objects/traps/lregions
  verified bitmap-clean (coordinate iteration, no set
  read). OK.
- Neutrality (re-read) — minend-1 epilogue :16592–16597
  is wallification + flip + fixup only; minend-2
  epilogue wallification + flip + lregions + fixup.
  Neither loader calls solidify/remove_boundary/mazewalk/
  fill_empty_maze. `.has` census: :4183 (STWALL gate
  :4182 exact), :14260/:14472/:14660 (tower-loader
  bodies — other levels), :19433 (remove_boundary_syms,
  CROSSWALL-gated), :21595 (maze1xy, mazewalk path),
  fill_empty_maze :21632 `const sp` (mazewalk path).
  None runs on minend paths. OK.
- Juiblex exclusion — juiblex.lua: 3 des.map + swamp
  des.region, zero des.door; no door closure in the
  loader. Correctly not a campaign member. OK.
- Ledger rows — `impossible` d=D-3544 prepended, note
  D-3544; `sel_set_door` d=D-3544 prepended (rolling
  6-window, D-3532 aged off per convention). OK.

No symbol deleted or re-pointed — no `sym.mjs` output
required.

## Hallucinations / overclaim

Docs-only cite drifts, substance verified true: (1) C
range ":4647–4662" drops the `staticfn void` line
(csym: :4646–4662; ledger row carries the same 4647
start — pre-existing convention); (2) ":19421 gate" —
at this SHA :19421 is the `for (x)` loop line, the
CROSSWALL gate is :19423 and the `.has` :19433;
(3) "(:21628/:21588, the only `.has`)" cites doc lines
(maze1xy def :21589, `.has` :21595; fill_empty_maze
:21632) and other `.has` sites exist in tower-loader
bodies — all off-path here. Same unqueued docs-only
class as 2432/2433/CURRENT debts — no queue row.

## Density

Breadth-phase small SHA: no shippable manifest;
impossible audit + 3-site mark ride the Open head per
precedent. Per-function verdicts:

- minend-1/2 :4661 sites (10) — whole line ports, C
  order, des-verified, neutral. OK.
- `sel_set_door` `ported` — live body + newly-wired
  inlined sites. OK.
- `impossible` `audited` — whole modulo named Rule #2
  omits (untouched). OK.
- No `Left open:`, no bundled Must-fix (Must-fix head
  deferred per declared override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2
clean (fresh `--rulecheck` this iteration).

## Verification

- D-log: `verify.mjs --fn impossible,sel_set_door` →
  syntax PASS, rule2 PASS, 2× hidden note (none blocked),
  REACH-OK ×2 (smoke 24/24 each), green 2/2, strict ×2,
  cohort 7/7, auto full 44/44 (shared file changed);
  node:test new 7/7 (1/7 pre-change) + neighbors 31/31.
- Audit re-measure (`--base 740b5ed43~1 --reach-all`):
  0 blocked each (vacuous, correctly labeled — rows
  cited none); smoke 24/24 → REACH-OK ×2, 0 regressed.
  Matches.
- `node --test scripts/lspo-door-minend-spmap.test.mjs`:
  7/7 pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
