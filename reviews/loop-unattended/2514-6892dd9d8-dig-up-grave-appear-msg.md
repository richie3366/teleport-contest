# Review 2514 — 6892dd9d8 — dig_up_grave makemon appear_msg (D-3634)

## Metadata

- SHA: `6892dd9d8` (2026-10-07) — cliffs-head writer, D-3634
- D-entry: D-3634 (dig_up_grave / dig earth-debris makemon sites)
- js diff: `js/dig.js` +13/−4; no helper added, deleted, or re-pointed
- Type: cliff (≤10 functions) — whole Method per function + movement re-measure

## Intent vs deliverable

Promise (subject + D-log): the grave-dig tick rises a zombie/mummy via
`makemon(..., MM_NOMSG)` but never runs C's in-body `dochugw(mtmp, FALSE)`
threat check, so the digging occupation survives the tick and dies silently
at dig→0 instead of printing «You stop digging.» nested in the tick; wire
the deferred `makemon_appear_msg` at all three dig.c makemon sites (grave
cases 2/3 + earth-debris) for 3 corpus PASS.

Diff actually adds: at each of the 3 sites, capture the `makemon` return
and `if (m) await makemon_appear_msg(m, m.mx|0, m.my|0, MM_NOMSG)` —
grave sites after the pline, earth site before the debris pline. No new
symbols, no signature changes, no RNG-adjacent code.

## Inventory

| # | JS change | C locus | Status |
|---|-----------|---------|--------|
| 1 | `js/dig.js:2031` zombie site + appear_msg | `dig.c:1070`, `makemon.c:1502–1504` | ports C |
| 2 | `js/dig.js:2046` mummy site + appear_msg | `dig.c:1076`, `makemon.c:1502–1504` | ports C |
| 3 | `js/dig.js:2496` earth-debris site + appear_msg | `dig.c:531–532`, `makemon.c:1502–1504` | ports C |

`Ledger:` dig_up_grave + dig ported — both bodies now complete at their
makemon sites; ledger status consistent.

## C ↔ JS fidelity

C `makemon.c:1471–1506` (`csym fn makemon` → `makemon.c:1146–1510`):
`if (!gi.in_mklev) { newsym; if (!(mmflags & MM_NOMSG)) { …Norep… } …`
then **outside** the NOMSG guard:

```c
/* if discernable and a threat, stop fiddling while Rome burns */
if (go.occupation)
    (void) dochugw(mtmp, FALSE);
```

The D-log's structural claim is exactly right: MM_NOMSG skips only the
Norep; the threat check still runs. C `dig.c:1070/:1076` (`dig_up_grave`
cases 2/3) and `dig.c:531` (earth debris: `if (makemon(...))
pline_The(...)`) all call with MM_NOMSG, so all three reach the check.

JS `makemon_appear_msg` (`js/makemon.js:3839`, ASYNC):

```text
makemon_appear_msg js/makemon.js:3839   ASYNC — await required
```

Body: `if (!mtmp || game.in_mklev) return` (C `:1471` gate), Norep only
when `!(MM_NOMSG)` (C `:1473–1500`), then `if (typeof game.occupation ===
'function') await dochugw(mtmp, false)` (C `:1502–1504`). LIVE callee,
branch order matches, no clone, no stub. The three new call sites pass
`MM_NOMSG` so the Norep is skipped exactly as in C; the earth site awaits
before the debris pline, matching C `:531–532` order (dochugw runs inside
makemon, before it returns).

RNG call-for-call: `dochugw` C `monmove.c:203–238` contains no
`rn2/rnd/rn1` token; with chug=FALSE `dochug` is not called and the tail
is `canspotmon/couldsee/mdistu` geometry plus `stop_occupation` text —
RNG-free as claimed, so the previously matching streams are untouched.
`stop_occupation` (`allmain.c:684–696`, `You("stop %s.", occtxt)`) is the
already-live occupation plumbing, not re-ported here.

One negative checked: JS `appear_msg` does no `newsym` (C `:1472`), so the
new awaits cannot double-paint — newsym stays with the sync `makemon`
house split (D-0559/D-0928), untouched by this diff.

## Hallucinations / overclaim

None. «Match C» is claimed for the wiring (the callee was already live),
not for a re-port; the D-log names the attribution subtlety (dosounds /
stop_donning owners are message-attribution artifacts of the same missing
message) and proves it with the three PASS lines rather than asserting it.
No «dispatch ported, callee stubbed» shape — the callee predates the diff.

## Density

Cliff phase §10.18: one cliff (dosounds row) + two sibling sessions of
the same writer, one C file (`dig.c`), code + ledger + verify in one
handoff. Owner-vs-writer decision explicit and correct (painters dosounds
/ stop_donning parked as artifacts; writer `makemon.c:1502–1504` ported
via the existing deferred-appear house shape). Each function has its
`Ledger:` entry. No bundled foreign-file work (the earth site is the
same-file companion arm). No `audited`/re-audit, no ledger-text-only
content. Right-sized.

## Verification

D-log claims: `verify dig_up_grave/dosounds/stop_donning` → 1 PASS each
(scen-terrain-Rogue-94040 / scen-dig-Archeologist-94215 /
scen-dig-Tourist-94355), REACH-OK, green + strict + cohort, plus full
44/44. Focused test 1/3 → 3/3.

Re-measured:
`node scripts/hidden-proxy.mjs verify
dig_up_grave,dosounds,stop_donning --base 6892dd9d8~1 --reach-all`:

- `verify dig_up_grave: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
  (scen-terrain-Rogue-94040: PASS)
- `reach dig_up_grave: 9 baseline-PASS … 9 PASS, 0 regressed → REACH-OK`
- `verify dosounds: 1 PASS … → PROGRESS` (scen-dig-Archeologist-94215: PASS)
- `reach dosounds: 694 baseline-PASS … 694 PASS, 0 regressed → REACH-OK`
- `verify stop_donning: 1 PASS … → PROGRESS` (scen-dig-Tourist-94355: PASS)
- `smoke stop_donning: … 24 PASS, 0 regressed → REACH-OK`

No REGRESSED, no WORSE. The three PASS claims reproduce exactly on the
audit run (dosounds reach-all ran 694 sessions, far beyond the 80-spread
in the D-log). Rule #2: `imports.mjs --rulecheck` clean across scored
`js/`; diff grep for FORCE/DIAG/getRngLog/fastforward/coords: 0 hits.
No seed/step/coordinate reads. Committed test file present
(`scripts/dig-up-grave-occupation.test.mjs`).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
