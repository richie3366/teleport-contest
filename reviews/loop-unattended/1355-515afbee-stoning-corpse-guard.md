# Review 1355 — 515afbee — stoning-corpse gloves guard (D-2389)

- SHA: `515afbee`, D-2389. JS files: `js/do_wear.js` (+52/−4) +
  `js/pickup.js` (two const export flips, values unchanged); new
  `scripts/better-not-take-that-off.test.mjs` (91 lines, 6 tests).
- Prior reviews closed: none (Open queue row
  `better_not_take_that_off`; 0 blocks).

## Intent vs deliverable

Subject promises C `better_not_take_that_off` plus exported
`carrying_stoning_corpse`, wired into `select_off`'s uarmg arm after the
Glib gate. Diff delivers exactly that — two functions, one call site,
import-line extensions. Promise matches diff; no scope creep.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `carrying_stoning_corpse` (do_wear.js:1552) | new, exported sync, C `invent.c:1507–1516` | LIVE |
| `better_not_take_that_off` (do_wear.js:1572) | new, file-local async | LIVE (C is `staticfn`, `do_wear.c:56` — local is faithful) |
| `select_off` call site | changed one line | LIVE, C `:2742` |
| `st_corpse`/`st_petrifies` (pickup.js) | const → exported, values unchanged | LIVE |
| `u_safe_from_fatal_corpse` (pickup.js:1077) | C callee, existing edge | LIVE |
| `paranoid_ynq` (getline.js:1301) | C callee, existing edge | LIVE, async awaited |
| `obj_pmname_corpse` (objnam.js:1118) | C callee (`do_name.c obj_pmname`), existing edge | LIVE |
| `touch_petrifies`/`mons` (monsters.js:450/203) | C callees, existing edge | LIVE |

Required checks: `sym.mjs carrying_stoning_corpse → js/do_wear.js:1552
sync`; `better_not_take_that_off → NOT EXPORTED, 1 local` (correct
linkage); `--can` on all four extended edges (getline, objnam, pickup,
monsters) → ALREADY, no new edge, no TDZ read (call-time use only).
Trap.js `obj_pmname` local deliberately untouched — its minstapetrify
callers keep it; no clone #2 created.

## C ↔ JS fidelity

C loci opened with bodies: `carrying_stoning_corpse` `:1507–1516` (10
lines), `better_not_take_that_off` `do_wear.c:2989–3010` (22 lines),
call sites `:2742`, `extern.h:1394` confirmed
(`extern struct obj *carrying_stoning_corpse(void);`).

- Scan loop: first CORPSE with `touch_petrifies`, nobj walk ≡ invent
  walk. Exact.
- Prompt order: scan → `!u_safe_from_fatal_corpse(corpse,
  st_corpse|st_petrifies)` with the deliberate `st_resists` omission per
  the C comment `:2995–3000` → `paranoid_ynq(TRUE, buf, FALSE) !== 'y'`
  blocks. JS matches in order, including the `!== 'y'` polarity.
- Call site: C `:2742` sits inside `otmp == uarmg` after the welded and
  Glib arms (verified via the `select_off` arm grep: welded `:20`,
  Glib `:23–26`, uarmg `:35`, call `:47`). JS places
  `if (await better_not_take_that_off(otmp)) return 0;` after the
  `hero_glib()` gate inside the uarmg arm (`do_wear.js:1632–1638`). ✓
- Naming note: JS calls `obj_pmname_corpse` where C calls `obj_pmname`
  — same C function body under the JS name (docstring cites
  `do_name.c obj_pmname`), not a clone.
- Callee closure: all LIVE; no STUB in a live arm.

## Hallucinations / overclaim

None. D-log states the vacuous verify honestly, names the pre-change
failure state (both functions absent — prompt never asked), and says
the typed-"yes" arm needs nhgetch so sessions cover it.

## Density

One falsifier, one C locus family — right-sized §2b. Unit test 6/6
covers the non-interactive arms.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|gx|gy` →
  clean.
- Re-measured: `verify better_not_take_that_off --base 515afbee~1` →
  `0 session(s) blocked (0 at baseline, 0 working)`. Matches D-log.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this iter).
- D-log's green 2/2 + strict ×2 + cohort 7/7 accepted.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
