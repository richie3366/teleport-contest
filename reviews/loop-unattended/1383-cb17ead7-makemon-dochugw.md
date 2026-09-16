# Review 1383 — cb17ead7 — makemon occupation dochugw arm (D-2421)

- SHA: `cb17ead7`, D-2421 (Open row: Barbarian-92079 step 62,
  `nasty` summon vs search-occupation writer). JS files:
  `js/makemon.js` (appear/occupation restructure + import) and
  `js/wizard.js` (two `nasty` awaits + import).
- Prior reviews closed: none (corpus-owner row, 1 block).

## Intent vs deliverable

Subject promises `makemon.c:1502–1504` (occupation `dochugw`
outside the `MM_NOMSG` guard) plus the `nasty` ordering fix so
the threat check sees birth values. Diff delivers both, with
the appear body moved verbatim into the `!MM_NOMSG` fork.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| occupation arm (`makemon_appear_msg`) | new branch | LIVE — C `makemon.c:1502–1504` |
| appear fork (`!MM_NOMSG`) | restructured guard | LIVE — body moved verbatim, C `:1476–1500` |
| `dochugw` (monmove.js import) | C callee | LIVE — joined existing static edge, awaited (async) |
| `makemon_appear_msg` (wizard.js import) | wiring | LIVE — joined existing static edge, awaited at both `nasty` sites |

No symbols deleted or re-pointed.

## C ↔ JS fidelity

C locus read in pinned source: `makemon.c:1472–1505` (csym
range for `makemon` is `:1146–1510`).

- Structure: C `if (!in_mklev) { newsym; if (!(mmflags &
  MM_NOMSG)) { …appear… } if (go.occupation) dochugw(mtmp,
  FALSE); }` ≡ JS exactly (early-return on `in_mklev`,
  appear under `MM_NOMSG===0`, `typeof
  game.occupation==='function'` gate + `await dochugw(mtmp,
  false)` after). The old code early-returned on MM_NOMSG,
  dropping the occupation arm — the reported miss. ✓
- In-body ordering: C runs appear+dochugw before `makemon`
  returns, i.e. before `nasty` zeroes
  `msleeping/mpeaceful/mtame`. JS `makemon` is sync with the
  async tail in the wrapper, so the two `nasty` sites now
  await the wrapper *before* zeroing — replicating C order.
  Audited the other three wrapper call sites for
  pre-mutation: mon.js purple-worm (none), read.js genesis
  (cham fixup after), uhitm.js demonpet (`tamedog` after) —
  all preserve C in-body order. Sync-only makemon callers
  miss both appear and dochugw as before (pre-existing
  coverage boundary, not a regression). ✓
- `set_msg_xy` stays deferred (named, pre-existing);
  `next2u/distu`-on-final-placement per D-2096 untouched. ✓
- RNG: `dochugw(FALSE)` draws per its own live body; no new
  draws at this locus. ✓

## Hallucinations / overclaim

None. The falsified list (glyph-visibility, `nasty` break,
`mon_adjust_speed` re-port) is stated with reasons, and the
D-log does not claim more than the one session.

## Density

~60 `js/` lines + a 3-case unit test for one measured writer
with a 395-vs-161-draw measurement behind it. Right-sized.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|coord` → 0.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this audit).
- Re-measured: `hidden-proxy verify mon_adjust_speed --base
  cb17ead7~1` → `1 PASS, 0 moved past, 0 unchanged, 0 worse →
  PROGRESS` (Barbarian-92079 → PASS) — reproduces the D-log
  exactly. Genuine owner PASS, no D-1831 shape.
- `node --test scripts/makemon-dochugw.test.mjs` → 3/3 (re-run
  this audit; stop-searching case failed pre-fix per D-log).
  Green/cohort/full-44/44 per D-log accepted (shared files).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
