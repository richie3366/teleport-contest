# Review 1455 — d6cf97e2 — `steal.c` mpickobj whole-body port (D-2496)

Metadata: SHA `d6cf97e2`, `js/makemon.js` only (+64/−15 in the hunk).
C `steal.c:617–685` (`mpickobj`, 69 lines). D-log: D-2496.

## Intent vs deliverable

Promise: restart the thin 9-line body (only tracker-clear + carry +
add_to_minv) into the full C order with `:line` cites. Diff delivers:
null/ball+chain guards, thrown/kicked clear, unpaid bill, light-snuff,
`no_charge`, non-pet `unknow_object` + `how_lost`, carry-before-add,
deferred snuff, freed-flag return. Promise = deliverable.

## Inventory

- Changed: `mpickobj` restarted; import lines extended only
  (`engulfing_u`, LOST_* consts, `unknow_object`, `obj_sheds_light`,
  `snuff_light_source`, `pmname`/`Mgender`, `simpleonames`/`Tobjnam`,
  `Blind`/`count_unpaid`, `subfrombill`/`find_objowner`).
- `sym.mjs` (required): no deleted/re-pointed symbols (pure restart +
  import-line growth). Spot checks: `subfrombill` js/shk.js:990 sync,
  `find_objowner` js/shk.js:2151 sync, `snuff_light_source`
  js/light.js:133 sync, `Blind` js/invent.js:341 sync — all LIVE.
  `attacktype` is the module-local mondata.h port (js/makemon.js:2739).

## C ↔ JS fidelity

`mpickobj` ≡ C `:617–685`, arm by arm (csym range `:617–685`; D-log cites
`:618–685` — same body, header-line drift only):

- `:622–631` null/ball+chain guards: `pmname/Mgender` + chain-vs-ball
  label + `simpleonames`, return 1 / return 0 ✓ verbatim.
- `:634–637` thrown/kicked clear: `otmp === game.thrownobj ? null :
  kickedobj ? null` — `else if` shape preserved ✓ (`0` → `null` is the
  JS null-convention).
- `:640–643` unpaid bill: `otmp.unpaid || (Has_contents && count_unpaid)` —
  `Has_contents` ≡ `obj.h:334` `cobj != NULL`, rendered as
  `otmp.cobj != null` ✓; `subfrombill(otmp, find_objowner(otmp, ox, oy))` ✓.
- `:647–654` light-snuff: `obj_sheds_light && attacktype(AT_ENGL)` →
  `engulfing_u && !Blind()` → `` `${Tobjnam(otmp, 'go')} out.` `` ≡ C
  `pline("%s out.", Tobjnam(otmp, "go"))` ✓; `snuff_otmp` deferred past
  add_to_minv ✓.
- `:657` `no_charge = 0` ✓. `:659–673` non-pet gate: `!canseemon &&
  mtmp !== ustuck` → `unknow_object` ✓; `LOST_THROWN → LOST_STOLEN`,
  `LOST_DROPPED → LOST_NONE` with `|0` zero-init normalization ✓.
- `:675–683` `carry_obj_effects` BEFORE `add_to_minv`, freed flag kept,
  deferred `snuff_light_source(mx, my)` ✓. No RNG in the body.

Adaptation (disclosed): `mpickobj` stays sync while `pline`/`impossible`
are ASYNC (display.js) — the two calls fire-and-forget. Sync is forced by
the call graph (8+ JS call sites use the return value synchronously, e.g.
makemon.js:2309 `if (mpickobj(mtmp, otmp))`; C has 48 refs). Blast radius
is one rare arm (engulfed light-snuff message) plus the impossible guards.
Not a C-wrong — C's calls are sync void; JS has no sync display.

Callee closure: every callee LIVE. No STUB, no clone, no omit in the body.

## Hallucinations / overclaim

None. "No new module edges (all ALREADY static)" — consistent with the
import-line-only diff touching modules makemon.js already imports
(shk edge hoisted-safe in the existing SCC; `--can` ALREADY pattern from
sibling commits).

## Density

One 69-line C function, one file. Right-sized.

## Verification

Re-ran here (`--base d6cf97e2~1 --reach-all`):

```text
verify mpickobj: baseline d6cf97e2~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke mpickobj: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

0 blocked both sides (vacuous, as stated — coverage row). D-log also
claims green 2/2, strict ×2, cohort 7/7, full 44/44 (shared file). Diff
grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords.

## Actionable C-wrongs

None. No Must-fix.

Verdict: **ACCEPT**
