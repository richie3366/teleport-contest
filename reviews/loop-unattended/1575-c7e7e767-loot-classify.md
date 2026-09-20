# Review 1575 — c7e7e767 — invent.c loot_classify whole-body port (D-2616)

**Metadata:** SHA `c7e7e767`, `invent.c` `loot_classify`, D-2616.
JS: `js/invent.js` (+200/−30: new export + comparator rewire + 2 import
bindings). No new test file (D-2605 precedent cited).

## Intent vs deliverable

Subject promises: new exported `loot_classify(sort_item, obj)` in C order
(class table, armcat, weapon/tool/food/gem subclasses, disco), wired at
`:436`/`:438` with the `:446–467` subclass/disco compares. Diff actually
adds: the export (`js/invent.js:2075`), `LOOT_DEF_SRT_ORDER` +
`loot_armcat` module state, comparator classify-once + subclass/disco
compares, `is_pole`/`objectDescrs` import bindings. Promise matches
deliverable.

## Inventory

- `loot_classify(sort_item, obj)` (new export) — def_srt_order, observe/
  seen order, orderclass incl. VENOM +1, ARMOR/WEAPON/TOOL/FOOD/GEM
  subclasses, disco, inuse.
- `sortloot` comparator — inline orderclass replaced by classify-once
  `loot_classify` calls + INVLET-gated subclass/disco compares.
- No deleted symbol, no local→import re-point (nothing to `sym.mjs`).

## C ↔ JS fidelity

C locus `invent.c:147–305` (159 L, via `csym.mjs loot_classify`; callers
`:436`, `:438`, `o_init.c:587` via `--callers`). Full C body read here.
Arm-by-arm confirm:

- `discovered` read **before** `observe_object`, `seen = dknown` after;
  `if (!Blind) observe_object(obj)` between (`:163–172`) — JS preserves
  the order exactly (matters: observe can discover).
- Class table (`:155`): `LOOT_DEF_SRT_ORDER` is element-identical (15
  classes; C's trailing 0 is the NUL, JS length 15 ≡ `strlen`). VENOM
  fallback `1 + strlen + (oclass != VENOM)` ≡ `length + 1 + (…?1:0)` —
  the old DEF_INV_ORDER fake (unknowns always +2) is gone.
- ARMOR (`:184–202`): one-time `armcat` init with `[7]=8` sanity, guarded
  `oc_armcat` → table. JS reads `oc?.oc_skill` — correct per the
  established house convention ("JS stores oc_armcat in oc_skill":
  `js/objects.js:208`, `js/do_name.js`/`do_wear.js` cites); module-level
  `loot_armcat` mirrors C `static`.
- WEAPON (`:204–212`): signed-skill groups incl. `-P_CROSSBOW…-P_BOW → 1`
  bounds in C order; `is_pole` LIVE (`sym.mjs`: `js/wield.js:155`,
  ALREADY edge). Exact.
- TOOL (`:214–238`): known pseudo-container 2 vs container/unknown 1 vs
  11 instruments 3 vs other 4, `seen && discovered` gate — exact, all 11
  otyps present.
- FOOD (`:240–259`): slime 1 / globby 6 else 2 / tin 3 / egg 4 / corpse 5 —
  exact (case order differs, semantically nil).
- GEM (`:261–294`): GEMSTONE/GLASS/MINERAL × seen × discovered 1–8 ladder —
  exact.
- Disco (`:298–302`): `!seen?1 : (discovered || !OBJ_DESCR)?4 : uname?3 :
  2`. JS `hasDescr = objectDescrs[di] || oc?.oc_descr` matches C
  `OBJ_DESCR(obj) = obj_descr[oc_descr_idx].oc_descr`
  (`objclass.h:191`) via the house idiom (identical shape at
  `js/do_name.js:160` for the same discovery question). `inuse = 0` exact.
- Comparator (`:430–467`): classify-once on `orderclass == 0`,
  orderclass compare, subclass/disco compares gated on `!SORTLOOT_INVLET` —
  exact, re-read both sides.

RNG: none in C or JS (RNG-0). Callers: `:436`/`:438` wired
(`js/invent.js:2243–2244`); `o_init.c:587` sortloot_descr stays a named
omit (review-921 debt, cited) as does the sortloot_cmp
BUCX/grease/erosion/enchant tail (`:503–541`).
Callee closure: `observe_object` live sync (invent.js:2877);
`sortpack_on`/`inv_order_classes` pre-existing file-locals reading
`flags.sortpack`/`inv_order` (re-read, C-faithful); no stub, no silent
omit.

## Hallucinations / overclaim

"Named" list is complete and cited (sortloot_descr with the review-921
pointer; BUCX tail with line range). The /tmp scratch-probe claim (10
synthetic objects) is plausible hand-verification, not presented as a
committed test; "No committed unit test: repo has no tests/ layout" is
accurate. No dispatch/stub split.

## Density

One C function (159 L) + its comparator wiring, one JS module.
Right-sized.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: no seeds/`fastforward`/`getRngLog` in `js/` hunks.
- Re-measured: `hidden-proxy.mjs verify loot_classify --base c7e7e767~1
  --reach-all` → `0 session(s) blocked` at baseline and working tree
  (vacuous-note path, correctly framed — RNG-0 function) + `smoke 24/24
  PASS, 0 regressed → REACH-OK`. Both summary lines cited; matches D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
