# Review 1571 — b615180f — pickup.c tipcontainer whole-body port (D-2612)

**Metadata:** SHA `b615180f`, `pickup.c` `tipcontainer`, D-2612.
JS: `js/pickup.js` (+168/−65: `tipcontainer` restart + 3 import lines).
No new test file.

## Intent vs deliverable

Subject promises: whole-body restart in C order — hero-start ox/oy +
location stamp, `maybeshopgoods`, icebox thaw, cursed-mbag loss, BoH
explosion, `doaltarobj` vs verbose vs terse arms, `encumber_msg` +
`update_inventory` tail — fixing three faked semantics (box-relative
ox/oy, uncomputed shop/held state, early return past the tail). Diff
actually adds: the restarted `export async function tipcontainer(box)`
(`js/pickup.js:4925`) with per-arm `:line` cites plus static imports
`doaltarobj`+`dropy` (do.js), `surface` (sit.js), `removed_from_icebox`
(muse.js). Promise matches deliverable.

## Inventory

- `tipcontainer(box)` — restarted body: ox/oy hero-start + stamp, target
  menu, `maybeshopgoods`, both `tipcontainer_checks` gates, terse/highdrop/
  altarizing setup, header plines, per-item loop (icebox / mbag-loss /
  shop-bill / container-transfer+BoH / highdrop / altar-vs-verbose-vs-terse),
  loss bill, owt updates, held-gated `encumber_msg`, one `newsym`, held-gated
  `update_inventory`.
- `tipcontainer_gettarget` / `tipcontainer_checks` — pre-existing
  (lines 4694/4798), untouched here; the restart calls them at the C sites.

## C ↔ JS fidelity

C locus `pickup.c:3687–3841` (155 L, via `node scripts/csym.mjs
tipcontainer`; callers `:3552`, `:3614`, `:3630` via `--callers`). Full C
body read here. Arm-by-arm confirm:

- `ox = u.ux, oy = u.uy` + `get_obj_location(box,&ox,&oy,0)` stamp
  (`:3691–3700`) — JS hero-start + `get_obj_location_quantum` stamp with
  `box.ox/box.oy` writeback. The quantum helper is a pre-existing local
  clone (`js/pickup.js:236`); keeping it over timeout.js is the documented
  pickup→trap→timeout→do→pickup cycle — named, not silent.
- Target menu before checks (`:3706`), `maybeshopgoods =
  !carried(box) && costly_spot(box->ox, box->oy)` (`:3722`) — both exact.
- Both checks gates (`:3724–3728`, `FALSE` then `NULL,TRUE`) — exact.
- `srcheld/dstheld`, `u.uswallow` clearing both, `terse` triple-negation,
  `box->cknown = 1` (`:3736–3742`) — exact.
- Header plines (`:3748–3756`): `box->cobj->nobj` tumble/spill split +
  `the(xname(targetbox))` / `out%c` with `terse ? ':' : '.'` — exact
  (`theArt` is the pre-existing import alias of `the`, `js/pickup.js:37`).
- Loop (`:3758–3825`): `nobj` prefetch, `obj_extract_self`, ox/oy stamp;
  icebox → bare `removed_from_icebox` (sync per `sym.mjs`, correctly
  un-awaited); cursed-mbag `is_boh_item_gone()` → `mbag_item_gone(srcheld,
  FALSE)` + `terse=FALSE` + `continue`; per-item `addtobill(otmp, FALSE,
  FALSE, TRUE)` with `suppress_price++/--` around the transfer arms —
  all exact.
- BoH arm (`:3780–3805`): `livelog_printf` + `urgent_pline` texts,
  inner-BoH-first `do_boh_explosion(otmp, !srcheld)`, `obfree`,
  `do_boh_explosion(targetbox, !dstheld)`, `dstheld?useup:useupf`,
  `targetbox=nobj=NULL` normal-exit, `losehp(d(6,6),…)` — exact, and the
  sole RNG draw `d(6,6)` is present call-for-call.
- highdrop `hitfloor(otmp, TRUE)` via kept-dynamic import (dothrow cycle,
  named) — exact; altar `doaltarobj` vs verbose `Doname2/otense/surface`
  over snapshot `ox,oy` vs terse `doname` + `last_msg=PLNMSG_OBJNAM_ONLY`
  + `how_lost=LOST_DROPPED` + `dropy` + last_msg terse-break
  (`:3812–3823`) — exact.
- `loss → You("owe …")`, unconditional `box/targetbox owt = weight()`,
  held-gated `encumber_msg` (`:3827–3834`), held-gated `update_inventory`
  (`:3837–3838`) — exact. The one `newsym(ox, oy)` between them is
  display-sync not in C, named in the map per the D-log — allowed idiom.

Callee closure: all LIVE — `doaltarobj`/`dropy` async (awaited),
`removed_from_icebox` sync (bare), `encumber_msg` async (awaited),
`surface`/`Is_mbag` (file-local, C-cited `obj.h:339`)/
`mbag_explodes` (file-local, C-cited) / `theArt` alias pre-existing.
`Is_mbag`/`mbag_explodes`/`get_obj_location_quantum` are file-locals with
C cites, not divergent clones. No stub, no silent omit; "Named: none new"
accurate (the display-sync newsym is map-named).
Callers: all 3 C sites wired — `js/pickup.js:5188` (`:3552`),
`:5253` (`:3614`), `:5264` (`:3630`), contexts re-read.

## Hallucinations / overclaim

No dispatch/stub split. "Coverage gap, not corpus divergence" accurate
(0 blocked, re-measured). Import-safety claims (`IN-SCC SAFE`,
already-edged) are consistent with `sym.mjs` liveness shown above; no
`--can` TDZ probe was pasted, but every new edge is call-time use of a
hoisted function — no top-level TDZ read shape.

## Density

One C function (155 L), one JS module. Right-sized.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward` in `js/` hunks
  (sole `seed[0-9]` hit is the message's green-gate line).
- Re-measured: `hidden-proxy.mjs verify tipcontainer --base b615180f~1
  --reach-all` → `0 session(s) blocked` at baseline and working tree
  (vacuous-note path, correctly framed — the D-log claims `--reach-all`
  identical and smoke REACH-OK, not a corpus PASS) + `smoke 24/24 PASS, 0
  regressed → REACH-OK`. Both summary lines cited; matches D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
