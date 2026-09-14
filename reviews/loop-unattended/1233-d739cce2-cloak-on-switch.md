# Review 1233 — d739cce2 — Cloak_on full otyp switch

- SHA: `d739cce2` — "`do_wear.c` `Cloak_on` full otyp switch: OILSKIN fit-tightly pline + MUMMY/INVISIBILITY/ALCHEMY arms + known/`update_inventory` tail (D-2267)"
- D-log: D-2267. Queue row: `do_wear.c` Cloak_on (oilskin arm).
- Corpus session: scen-wish-Rogue-92137 (wished oilskin cloak, `W`; 87 screens lost).

## Intent vs deliverable

Subject promises the full C `Cloak_on` switch in C order plus the known/
`update_inventory` tail. Diff actually adds: six `objectNames.indexOf` consts,
`ACID_RES` on the existing `const.js` edge, and the switch arms
(plain-cloak breaks, PROTECTION, ELVEN, DISPLACEMENT, MUMMY_WRAPPING,
INVISIBILITY, OILSKIN, ALCHEMY_SMOCK, default `impossible`) with the C tail.
Promise matches diff exactly; nothing else touched.

## Inventory

- Changed JS: `Cloak_on` (`js/do_wear.js:942-1000`).
- Callees: `makeknown`, `toggle_stealth`, `toggle_displacement`, `newsym`,
  `Tobjnam`, `pline`, `impossible`, `update_inventory` — all already imported
  (verified in the import blocks: `objnam.js` Tobjnam line 14,
  `makeknown`/`update_inventory`/`newsym`/`impossible` in the shared import).
  `Blind()` (`:1326`) and `See_invisible_dw()` (`:2663`) are pre-existing local
  clones (D-1769-era), not introduced here — verified against C below.
- No symbol deleted or re-pointed; `ACID_RES` rides the existing `const.js`
  edge (no new module edge, no TDZ risk).

## C ↔ JS fidelity

C locus: `nethack-c/upstream/src/do_wear.c:325-380` (via `csym.mjs`). Arm walk:

- `oldprop`: C `u.uprops[objects[uarmc->otyp].oc_oprop].extrinsic & ~WORN_CLOAK`;
  JS `:946-948` `game.objects[o.otyp].oc_oprop` extrinsic `& ~WORN_CLOAK`. Exact.
- Plain five (`ORCISH/DWARVISH/MAGIC_RESISTANCE/ROBE/LEATHER`) break; PROTECTION
  `makeknown`; ELVEN `toggle_stealth(o, oldprop, true)`; DISPLACEMENT
  `toggle_displacement(o, oldprop, true)` — all in C order, exact.
- MUMMY: C `(HInvis || EInvis) && !Blind` (`:350`) with the "already worn, cheat"
  comment; JS `:964` tests the `HInvis`/`EInvis` flats, not full `Invis` — the
  distinction the C comment demands. `HInvis`/`EInvis` are
  `u.uprops[INVIS].intrinsic/extrinsic` (`youprop.h:195-196`); flats are the
  repo-wide mirror idiom. `see_yourself[] = "see yourself"` (`do_wear.c:8`)
  confirmed — JS message text exact.
- INVISIBILITY: C `!oldprop && !HInvis && !Blind` with no `EInvis` check
  (`:356-357`); JS `:970` reproduces exactly (no EInvis). `"can%s"` spacing
  preserved → "cannot see" — byte-exact.
- OILSKIN: `pline("%s very tightly.", Tobjnam(uarmc, "fit"))` (`:364-366`) —
  JS `:977` exact.
- ALCHEMY: C `EAcid_resistance |= WORN_CLOAK` (`:369`, i.e.
  `uprops[ACID_RES].extrinsic`); JS `:980-987` exact (defensive uprops-ensure
  is draw-free).
- default `impossible` (`:371`): wording differs ("unknown cloak type" detail)
  but `impossible()` is debug-only, never fires on valid input; acceptable.
- Tail: C `if (uarmc && !uarmc->known) { known = 1; update_inventory(); }`
  (`:373-376`); JS `:993-996` exact — this also fixes the pre-existing
  deviation where JS set `known` without `update_inventory`.
- Clone check: `See_invisible_dw` (`:2662-2669`) ORs `HSee_invisible`/
  `ESee_invisible` flats with the `SEE_INVIS` slots — equal to C
  `See_invisible = (HSee_invisible || ESee_invisible)` (`youprop.h:152`) under
  the mirror idiom, no blocked-check either side. `Blind()` (`:1326-1330`)
  matches C `((HBlinded || EBlinded) && !BBlinded)` (`youprop.h:103`) plus
  flat short-circuits. Both pre-existing, both verified CLONEs, not new drift.
- No RNG drawn by any arm (makeknown/newsym/pline draw nothing), so branch
  order is the whole fidelity surface — and it matches.

No C-wrong. Named deferrals (`Cloak_off` arms, turns.md:1017) are the takeoff
side, correctly out of this envelope.

## Hallucinations / overclaim

None. "Dispatch ported, callee stubbed" does not occur — every callee is LIVE
or a verified pre-existing CLONE, and the D-log's import/TDZ claims check out.

## Density

~50 insertions for a 56-line C function, one falsifier, one module. Right-sized.

## Verification

- `imports.mjs --rulecheck` clean (re-run this review, review 1232).
- Re-measured: `node scripts/hidden-proxy.mjs verify Cloak_on --base d739cce2~1`
  → "1 session(s) blocked on it (1 at baseline, 0 in the working scoreboard) …
  scen-wish-Rogue-92137: PASS … 1 PASS, 0 moved past, 0 unchanged, 0 worse →
  PROGRESS". Genuine PASS on the blocked session, no regression. Matches D-log.
- D-log cites green 2/2 + strict ×2 + cohort 7/7; full `sessions` skipped with
  the stated reason (no shared file — only `js/do_wear.js` changed). The
  end-of-iteration cadence run re-covers the fortress.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
