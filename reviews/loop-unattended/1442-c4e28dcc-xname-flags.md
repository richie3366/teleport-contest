# Review 1442 — c4e28dcc — xname_flags whole-body port (D-2483)

Metadata: SHA `c4e28dcc`, `js/objnam.js` only (+~120/−~60).
C `objnam.c:575–650` + `:674–676`/`:705–723`/`:788–791`/
`:971–1012` + `cxname_singular :1934–1939`. D-log: D-2483.

## Intent vs deliverable

Promise: former `xname` body becomes `xname_flags(obj,
cxn_flags)` with SINGULAR plumbing + override_ID staging +
wet-towel/COIN/CHAIN arms; `cxname_singular` drops its
quan-mutation hack. Diff delivers exactly that, no new imports.

## Inventory

- Restructured: `xname` → `xname_flags(obj, CXN_NORMAL)`
  (verbatim per C `:575–578`); override_ID stage/restore in
  `try/finally`; `find_artifact` on pre-override `dknown`;
  SINGULAR gates at CORPSE/SLIME_MOLD/general; wet-towel
  prefix+suffix; COIN/CHAIN bare-actualn arm.
- `sym.mjs`: no deleted symbols; `CXN_NORMAL=0`/`CXN_SINGULAR=1`
  (const.js:1745–1746); single `TOWEL` const; no external
  `xname_flags` callers (wiring is internal).

## C ↔ JS fidelity

- Prologue `:596–650`: `pluralize = quan!=1 && !SINGULAR` ✓;
  leak-cleanup → cleric-bknown → observe → override-stage →
  find_artifact order matches (cleric/observe swap is
  field-independent); staging onto obj/ocl works because every
  per-arm `nn`/`dknown` is read fresh from `ocl.oc_name_known`/
  `obj.dknown` inside the arms (verified across the file), and
  the function is fully synchronous so the staged window is
  unobservable. `realDknown` capture = C's real-`dknown` gate
  with its comment preserved.
- Towel: prefix (`spe<3` moist else wet, `obj.h:256`
  `is_wet_towel` verbatim) in the WEAPON→VENOM/TOOL
  fallthrough after LENSES (`:684–707` verbatim); wizard
  `(%d)` suffix in the figurine arm (`:715–723` verbatim,
  `flags.debug` idiom).
- COIN/CHAIN: bare actualn + samurai Japanese inline (C
  applies it prologue-wide at `:607–610`; inline here is
  equivalent for this arm). No shadowed prior coin arm.
- CORPSE/nameit/boulder/pluralize/gameover/oname/the-strip
  all re-indented, not re-logic'd; the-strip stays post-oname
  inside the try (finally restores fields only — no string
  effect).
- `cxname_singular` = C `:1934–1939` verbatim; safe because no
  `pretty_base` arm reads `obj.quan` directly (grep clean) —
  the quan-mutation removal changes nothing else.

## Hallucinations / overclaim

None. Named omits (buffer machinery, glorkum/`impossible`,
`armor_simple_name`, article arms) are explicit.

## Density

Right-sized: one C function restructure, one module.

## Verification

- `hidden-proxy verify xname_flags --base c4e28dcc~1
  --reach-all` (re-run): 0 blocked (coverage row, as stated);
  smoke 24/24 → REACH-OK. Matches (function is RNG-free, so
  reach is vacuous by construction; message-text safety rests
  on the full 44/44 in-commit claim).
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
