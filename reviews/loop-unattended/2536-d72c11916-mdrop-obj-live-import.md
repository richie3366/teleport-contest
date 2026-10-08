# Review 2536 — d72c11916 — dogmove mdrop_obj clone → live import

Metadata: SHA `d72c1191601f7f56e1617afc279e67625c30e09d`, D-3657, cliff-head
`invent.c` dolook via writer `steal.c` mdrop_obj. js diff: −23-line clone in
`js/dogmove.js`, +1 import name, `export` on `mon.js` mdrop_obj, OBJ_FREE
trim. No hand-written unit test (corpus recipe is the regression test).

## Intent vs deliverable

Promise: the dogmove-local pet-drop subset clone dropped the flooreffects
"fall" gate, losing the doaltarobj third message and its `--More--`; delete
the clone (D-1849 discipline), import the canonical export. Diff does
exactly that. Matches; nothing bundled.

## Inventory

- Deleted: local `mdrop_obj(mon,obj,verbosely)` in `js/dogmove.js` (clone).
- Re-pointed: `dogmove.js` relobj call site → live `mon.js` export (same
  signature, still awaited).
- Changed: `mon.js` mdrop_obj gains `export` + "Live callers" doc.
  C: `steal.c:813–846` per `csym.mjs` (the D-log/comment cite `:808–849`,
  which includes the preceding tail + comment — pre-existing looseness,
  noted, not a gap).
- No new functions or helpers.

## C ↔ JS fidelity

Canonical `mon.js` mdrop_obj walked against C `steal.c:813–846`:

- omx/omy, `unwornmask`, `distant_name(obj,doname)` before extract ✓;
  `extract_from_minvent(mon,obj,FALSE,TRUE)` ✓ (+ house `unlink_minvent`
  post-state keeper, commented, pre-existing).
- Saddle `no_charge` (`:830–837`): unwornmask && mtame && W_SADDLE &&
  !unpaid && costly_spot && hero-in-shop-roomno ✓ — JS preserves C's
  "costly_spot guarantees roomno" order (roomno read after the true gate),
  dynamic `shk.js` import for the cycle ✓.
- `verbosely && cansee → pline_mon("%s drops %s")` ✓.
- `if (!flooreffects(obj,omx,omy,"fall")) { place+stack }` ✓ (dynamic
  `do.js` import) — the arm the clone dropped, now live on the pet path.
- `!DEADMONSTER && unwornmask → update_mon_extrinsics(mon,obj,FALSE,TRUE)`
  ✓ (`mhp>0` is the house DEADMONSTER read).
- RNG: none. Prints: the one pline ✓.

Pet-path equivalence (subject's "canonical ≡ clone + flooreffects gate"):
verified — `droppables` returns only `!owornmask && !== wep` objects
(`js/dogmove.js` tail branch), so `unwornmask==0` kills the saddle and
extrinsics arms; `unlink_minvent` after a successful extract is a no-op;
the relobj call `mdrop_obj(mtmp,otmp,!!(is_pet && verbose!==false))`
matches C `steal.c:893` with the default-On convention ✓.

Callee/import closure (combined-arm discipline): the re-point joins an
existing edge — required `sym.mjs` + `--can` output:

```text
mdrop_obj        js/mon.js:1823   ASYNC — await required
ALREADY: dogmove.js already statically imports mon.js. No new edge needed.
```

Single canonical definition; the mon↔dogmove static cycle pre-exists and
the call is runtime-only on a hoisted `async function` decl — no TDZ risk.
`OBJ_FREE` fully gone from `dogmove.js` (grep) — trim is complete.

Other C call sites: `steal.c:864` mdrop_special_objs (live, same file ✓);
`monmove.c:1166` leprechaun gold stays a pre-existing inline subset with
its own in-code Named comment (`js/monmove.js:2632`) ✓; `zap.c:430` bhitm
saddle arm is D-3657's Named (1) — the residual listing names the
extrinsics + no_charge arms; the subset also skips flooreffects and
distant_name observe, so the Named text under-lists slightly. Noted as a
docs nit, not a C-wrong (site + C cite are named; other C file, unreached).

## Hallucinations / overclaim

None. "Every arm live" for the canonical body confirmed by the walk;
"no new edge" confirmed by `--can`; "grep-verified" OBJ_FREE trim
confirmed. The vacuous `mdrop_obj` verify is disclosed as a note, not a
PASS.

## Density

Cliff-phase §2b: one cliff (head `dolook` → writer `mdrop_obj`, correctly
chosen — the missing message is emitted inside the writer's callee chain),
whole-function canonicalization. Ledger entry updated. No bundling.
Per-function: `mdrop_obj` whole, ACCEPT.

## Verification

- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/`fastforward`/seed/coordinate
  gates in `js/` (the one hit is "No DIAG/FORCE/seed gates" prose in the
  commit message). Rule #2 clean.
- D-log Verify: dolook 1 PASS (Ranger-94320) + both smokes REACH-OK +
  green/strict/cohort + forced full 44/44.
- Re-measure: `verify dolook,mdrop_obj --base d72c11916~1 --reach-all` →
  dolook `1 PASS … → PROGRESS` (Ranger-94320: PASS, exactly as claimed);
  mdrop_obj vacuous-at-baseline (disclosed); both smokes 24/24 REACH-OK.
  No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
