# Review 1435 — ea470835 — vpline re-scan follow-up (D-2476)

Metadata: SHA `ea470835`, 11 `js/` files (84 ins / 57 del — re-point
commit, no new functions). D-log: D-2476. Claims to close review
1430's Must-fix (vpline re-scan of verbatim-text call sites).

## Intent vs deliverable

Promise: route the verbatim-text sites review 1430 named (engrave
read-back, rumors `outrumor`, pager `do_look`/`dowhatdoes`, zap-`You`
dupe + its 7 importers) through the `%s` arm, restoring exact C
format+args at interpolated sites. Diff delivers exactly that: no new
symbols, one deleted export (zap-`You`/`Your`), 7 import re-points,
format+args restorations with per-site C citations. The remaining
~100 `pline(variable)` sites are explicitly Named in the message.

## Inventory

- Deleted: `export async function You` + local `Your` in `js/zap.js`
  (pre-format+re-scan clones of `display.js:7441`).
- Re-pointed (zap-`You` → display-`You`): cmd, hack, makemon, mklev,
  polyself, pray, vault — all 7 already imported display; zap already
  imported display, display imports no zap (no new edge).
- Verbatim routing: engrave `You('%s: "%s"%s', …)`; rumors
  `pline('%s', line)`; pager `pline('%s', outH.s)` + dowhatdoes trio.
- Restored C format+args: polyself ×8, makemon newcham, vault guard,
  zap release/are-released/disrupt/Schrodinger/find/probe ×2.
- `sym.mjs` (required — deleted/re-pointed symbols):
  `You → js/display.js:7441 ASYNC` (single definition; zap dupe
  gone). `Your → js/display.js:7445 ASYNC` + 3 pre-existing local
  clones (artifact.js:1647, mhitu.js:268, pray.js:1615 — untouched by
  this diff, see below).

## C ↔ JS fidelity

Branch-by-branch confirm against pinned C (all citations verified
verbatim in-tree):

- engrave: C `engrave.c:396` is `You("%s: \"%s\"%s", Blind?
  "feel the words":"read", et, endpunct)` — JS now the identical
  shape. Executed the shipped `vpline_expand` (extracted from
  `js/display.js:7595`): `['read','%s %d %% 50% of treasure','.']`
  → `You read: "%s %d %% 50% of treasure".` — ENGRAVE-OK.
- rumors: C `rumors.c:573` `pline1(line)`; `pline1` = `pline("%s",…)`
  verbatim (`hack.h:1026`) — JS `pline('%s', line)` exact.
- pager do_look: C `pager.c:1922` `putmixed(WIN_MESSAGE, 0, out_str)`
  literal — JS `pline('%s', outH.s)` on the same message path exact.
- dowhatdoes: C `:2700` `pline("%s", reslt)`, `:2706` `pline("%s,",
  reslt)` after NUL-cut, `:2708` `pline("%8.8s%s", reslt, p+1)` —
  JS keeps its slice emulation of both cuts, routed verbatim. `%8.8s`
  ≡ first-8-chars here (coupled `%-8s` key field per `:2591` note),
  and `vpline_expand` strips width anyway — equivalent.
- vault guard: C `vault.c:877` ternary `You(see %s approaching. /
  are confronted by %s., x_monnam(…, "angry"))` — JS same ternary,
  same arg. makemon newcham C `mon.c:5429` `You("%s %s%s!", …)` —
  JS same. polyself ×8 (`:1413/:1689/:1717` spot-checked) and zap
  sites (`:227/:598/:607/:2243/:3790/:3241/:3257` per comments) all
  match C format+args; `%c` arm verified (`'!'`/`.`).
- Residual (not queued): `zap.js:1336`
  `You(`${Blind?…} of smoke.`)` vs C `zap.c:5492` `You("%s of
  smoke.", …)` — both alternatives constant, no `%` source, so
  net-identical; same for untouched `Your('probe reveals nothing.')`.
  The 3 remaining single-arg `Your(rest)` clones above are the same
  family but pre-date this SHA with no demonstrated divergence —
  they fall under the commit's Named ~100-site umbrella, not a new
  Must-fix.

## Hallucinations / overclaim

None. The "no new edge" claim holds (import graph checked). Named
omits are explicit with a per-site-ships-as-own-row rule. The
`/tmp/vpline-probe.mjs` ENGRAVE-OK claim reproduces (re-ran above).

## Density

Right-sized: one C-wrong family + its 7 importers, 84 insertions.

## Verification

- `hidden-proxy verify vpline --base ea470835~1 --reach-all`
  (re-run): 0 blocked both sides (vacuous, as stated); smoke 24/24
  → REACH-OK. Matches the D-log bullet.
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords.
- Corpus `hidden-proxy score` 495/540 identical, 0 regressed (per
  D-log; audit re-scores at iteration end).

## Actionable C-wrongs

None. Review 1430's Must-fix is fixed.

Verdict: **ACCEPT**
