# Review 2464 — baecc9212 — rloc_to full mstate reset via place_monster (D-3582)

**Metadata.** SHA `baecc9212` (2026-10-07, D-3582). Type: **cliff**:
writer port for the cliffs head `monmove.c distfleeck`. `js/`
insertions: 7 (`js/teleport.js` +7/−3) + committed test.

## Intent vs deliverable

Promise: a bubble-carried pet kept `mstate=MON_BUBBLEMOVE` through
rloc deposit because JS cleared only MON_OFFMAP (D-3577 partial),
so movemon skipped it every turn; one line `mtmp.mstate =
MON_FLOOR` matches C place_monster's unconditional wipe. Probe
Tou-92100 141→makemon@158, full RNG.

Diff actually adds: the line + comment. Promise matches diff. No
symbols deleted or re-pointed (MON_FLOOR import pre-existing at
teleport.js:32).

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | rloc_to `:1684` placement wipe | ported | [teleport.js](/home/debian/dev/teleport-contest/js/teleport.js:753) | teleport.c:1644–1768, steed.c:897–932 |

Helpers: none added. No clone→import re-point, so no `sym.mjs`
re-point output is required.

## C ↔ JS fidelity

**The wipe is exactly C's.** `csym rloc_to_core` →
teleport.c:1644–1768: unconditional `place_monster(mtmp, x, y)`
after `mon_track_clear` (the cited :1684) ✓. `csym place_monster`
→ steed.c:897–932: `:931 mon->mstate = MON_FLOOR` unconditional on
the normal path ✓. JS constants (const.js:1585–1590, read):
MON_FLOOR=0x00, MON_BUBBLEMOVE=0x10=16 — matches the D-log's
"mstate=16" probe ✓. Skip mechanism confirmed: mon.js:3349
`mstate !== MON_FLOOR → return false` (read) mirrors C
mon_offmap, so the stuck bit skipped the pet exactly as diagnosed
✓. RNG: none in the arm (placement only) — the step's 10-draw pet
action sequence returns because the pet acts again, not from new
draws.

**Call-site safety holds.** C rloc_to always funnels through the
wiping call, so widening the wipe is C-identical at every rloc_to
site by construction. Spot checks: C mhitm.c calls place_monster
directly (5 sites incl. :251–252, :905–949 — equivalent wipe, as
claimed); JS has ~20 `rloc_to(` call lines across 9 files,
matching the "all 20" claim. One nuance, already named: C's
steed/dead impossible-guards return *without* wiping, while JS
(guard-free since D-3577) now wipes there too — an impossible-path
difference inside the pre-existing named omit, not a new C-wrong.

## Hallucinations / overclaim

None. The Wiz-94142 unchanged session was scoped with a
falsifiable outside-the-arm proof (0/31 mons with mstate≠0), and
it indeed needed its own writer (shipped next as D-3583).

## Density

Cliff §10.18: cliffs-head writer, one arm of one ported function,
own `Ledger:` touch (rloc_to row gains D-3582). Per-function
verdict ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: 0 hits.
- Rule #2: clean this iteration (see 2462).
- Committed test `rloc-to-mstate-floor.test.mjs`: 2/2 PASS now
  (0/2 pre-fix via stash claimed in-ship).
- Re-measure (mine): `verify distfleeck --base baecc9212~1
  --reach-all` → **1 PASS, 1 moved past, 0 unchanged, 0 worse** +
  full reach **779/779 REACH-OK** (336 s). Tou-92100 141→makemon@158
  is the D-log's number exactly; Wiz-94142 now PASS via later
  D-3583 (cumulative, strictly forward).
- Full `sessions` 44/44 claimed in-ship, re-covered by this audit's
  gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
