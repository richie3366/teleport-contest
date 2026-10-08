# Review 2561 — 87a7713db — gather_locs_interesting glyph restart (D-3687)

- SHA: `87a7713db819ca84d470bd797c7bf539ad3ae5bc`
- Subject: next-live-head `getpos.c` gather_locs_interesting: INTERESTING/VALID arms read live typ/seenv, skipped the sensed monster (`a`/`Z` newt+lichen pair →PASS) (D-3687)
- D-entry: D-3687. Type: next-live-head (owner-null, getpos cycle pair).
- Diff size: `js/getpos.js` +30/-24 (restart + clone deletion + imports); + test; ledger D-tag.

## Intent vs deliverable

Promise: restart the INTERESTING/VALID arms glyph-based per
C `:451–452` + `:487–503` (boring-cmap list verbatim,
`glyph_is_nothing`/`glyph_is_unexplored` for the unknown
test), deleting the typ-based `shown_boring_cmap` clone and
the orphaned `engr_at` import. Newt+lichen pair → FULL PASS.

Diff actually does: exactly that. Import extensions only
(`display.js`/`const.js` already imported — no new edges).
No DIAG/FORCE/seed reads.

## Inventory

| JS site | Change | C locus |
|---|---|---|
| INTERESTING case (`js/getpos.js:954`) | `glyph_at` + 11-disjunct boring list + nothing/unexplored test | `getpos.c:451–452`, `:487–503` |
| `shown_boring_cmap` (:761) | deleted (−24) | (typ-based clone of the above) |
| `engr_at` import | removed (0 remaining refs) | — |
| VALID fallthrough | kept | `:486–487` |

`sym.mjs shown_boring_cmap`: NOT FOUND in `js/**` —
deletion clean, no re-point. `is_unexplored_loc` keeps 5
refs (shared helper, not orphaned). `shown_door_cmap` kept
at `:722`, live at `:936` — the Named keeper.

## C ↔ JS fidelity

`csym`: `getpos.c:437–507`. The new arm is a line-for-line
port of C:

- `:451–452` `glyph = glyph_at(x, y); sym =
  glyph_is_cmap ? glyph_to_cmap : -1` → identical JS.
  Per-arm read (vs C's fn-top read) is equivalent —
  `glyph_at` is a pure display read, and the MONS/OBJS/DOOR
  arms already use the same per-arm shape.
- `:487–503`: `GLOC_DOOR-recursion || !((cmap &&
  (wall/tree/bars/ice/air/cloud/lava/water/ndoor/room/corr))
  || nothing || unexplored) || vibrating` → identical JS,
  disjunct-for-disjunct **including `S_ndoor`**, which the
  deleted typ-based clone could not express (no door
  member — a real gap closed, not just a restyle).
- The fix direction is exactly C's semantics: C reads the
  DISPLAYED map (sensed monster glyph present while
  `seenv==0` → interesting); the clone read live
  typ/seenv (ROOM → boring → skipped). The old
  location-based `is_unexplored_loc` is replaced by C's
  glyph-based `glyph_is_unexplored`, as C does.
- Untouched surroundings verified: GFILTER_VIEW/AREA
  guards at the JS fn head match C; MONS/OBJS/DOOR arms
  (D-3557/D-2058/D-3569) untouched; no RNG in the
  function (RNG flat both sessions).
- The one Named gap (GLOC_EXPLORE room/corr + door
  subtests still typ-based) is real, pre-existing
  (D-3569 (1)), and fenced with a keeper + falsifier —
  not a silent remainder.

## Hallucinations / overclaim

None. "D-3569's named INTERESTING gap, not a re-port" is
accurate (D-3569 shipped DOOR; this ships INTERESTING).
No dispatch-vs-callee gap. Rule #2 clean (iteration
`--rulecheck`).

## Density

Next-live-head pop (Must-fix empty, head maxed
recorder-artifact, coverage empty, batch dry). One
function's arm family + its clone deletion, own `Ledger:`
entry. Right-sized.

## Verification

D-log claim: test 0/2 → 2/2; targeted rescore 932→934
(pair FULL PASS), full rescore 934/953 RNG 100% with no
latents, 0 regressed; `verify` vacuous-hidden (owner-null)
+ REACH-OK + full 44/44.

Audit re-measure: git scoreboard diff
`87a7713db~1 → 87a7713db` shows exactly 2 changed rows —
Priest-91108 step 54 → PASS (2222/2222 + 71/71) and
Priest-92122 step 131 → PASS (4984/4984 + 148/148), PASS
932→934, zero other rows (0 regressed, non-vacuous).
`verify gather_locs_interesting --base 87a7713db~1
--reach-all` reproduces 0-blocked + REACH-OK (24/24).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
