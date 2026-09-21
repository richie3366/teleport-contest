# Review 1670 — a8cd211c — `shk.c` unpaid_cost restart + dog_eat caller (D-2711)

Metadata: commit `a8cd211c`, D-2711, `js/shk.js` (+18/−6) + `js/dogmove.js` (+22/−2). Pops the head Open-coverage row (unpaid_cost PARTIAL) and wires the eighth C caller. No prior review claimed closed.

## Intent vs deliverable

Subject promises: `unpaid_cost` whole-body restart (impossible arm + quan) + `dog_eat` caller wired. Diff does both: terminal `impossible()` added, invented `|| 1` removed, three C-ordered unpaid arms added to `dog_eat` with four import identifiers on existing edges. Promise matches deliverable.

## Inventory

Changed JS: `unpaid_cost` restarted (export kept, `js/shk.js:1031`); `dog_eat` gains suppress++/xname/bill arms. Imports: `unpaid_cost` + `COST_CONTENTS` + `xname` + `currency` — all four join pre-existing import lines. No deleted/re-pointed symbols.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (nothing deleted or re-pointed — body restart + new calls to live exports):

```text
unpaid_cost      js/shk.js:1031   sync
currency         js/invent.js:1328   sync
```

`--can` both new edges:

```text
ALREADY: dogmove.js already statically imports shk.js. No new edge needed.
ALREADY: dogmove.js already statically imports invent.js. No new edge needed.
```

| JS callee | Class |
|---|---|
| `shop_keeper/onbill/contained_cost` | LIVE (unchanged) |
| `impossible` | LIVE, fire-and-forget in sync body (same_price precedent, named) |
| `xname/currency` | LIVE (objnam/invent) |
| `#if 0` search (`get_obj_location/in_rooms/next_shkp`) | compiled out in C — correctly unwired, named |

No STUB in any arm.

## C ↔ JS fidelity

C loci: `unpaid_cost` `shk.c:3259–3305` (csym, 47 L — whole body read); `dog_eat` `dogmove.c:255–345` (ranges read: split/suppress `:264–265`, xname `:296–299`, bill `:332–337`). RNG: none on either path. Branch walk:

- `unpaid_cost`: decl order bp/shkp/shop/amt ✓; `#if 0` block skipped (compiled out) ✓; ushops walk with `shop_keeper` guard ✓; `onbill → price → *= quan` (no SINGLEOBJ) ✓ — the removed `|| 1` restores C's bare `amt *= quan` (D-0004 precedent; C objects always carry quan ≥ 1) ✓; CONTENTS + Has_contents → `contained_cost` ✓; break on `bp \|\| (!unpaid && amt)` ✓; terminal `impossible("unpaid_cost: object wasn't on any bill.")` with C's exact message ✓.
- `dog_eat`: splitobj → `suppress_price++` → eat message → `xname` copy + `suppress_price--` → apport → `unpaid_cost(obj, COST_CONTENTS)` + `That %s will cost you %ld %s` → `m_consume_obj` — C order preserved across the pre-existing message/apport blocks ✓. `currency(oprice)` ✓.
- Callers: D-log maps all 8 C sites to JS lines (dounpaid ×3, bill_dummy_object, doname_base, make_itemized_bill, dopayobj, dog_eat) — spot-checked the new one; the seven pre-existing wirings are untouched by this diff.

## Hallucinations / overclaim

None. D-log names the `#if 0` arms and the untouched neighboring `dog_eat` deferrals.

## Density

Breadth phase: one 47 L restart + one caller wiring, two modules already importing each other. Right-sized.

## Verification

Re-measured per-SHA re-run (`--base a8cd211c~1 --reach-all`):

```text
smoke unpaid_cost: no RNG-tagged reach; fixed smoke spread (24 run, 3.5s): 24 PASS, 0 regressed → REACH-OK
```

0-blocked vacuous + REACH-OK, no REGRESSED — as disclosed. Diff grep: no FORCE/DIAG/seed/fastforward/coords. Rulecheck clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
