# Review 1456 — 2a0c6559 — `objnam.c` doname_base whole-body port (D-2497)

Metadata: SHA `2a0c6559`, `js/objnam.js` +133/−60, `js/shk.js` +38/−15,
`js/pager.js`, `js/end.js`, `js/do_wear.js` small, new
`scripts/doname-base-flags.test.mjs` (132 L). C `objnam.c:1222–1751`
(`doname_base`, 530 lines, staticfn) + wrappers `:1754–1782`. D-log: D-2497.

## Intent vs deliverable

Promise: `doname` → `doname_base(obj, flags)` with DONAME_* decode,
override_ID force, vague quan, BoT/HoP empty rule, ARMOR variants,
AMULET class gate, price tail, plus two stand-in callers moved to
`doname_with_price`/`doname_vague_quan`. Diff delivers all of it, with a
5-test suite. Promise = deliverable.

## Inventory

- Changed: `doname_base(obj, flags=0)` + `DONAME_WITH_PRICE/VAGUE_QUAN/
  FOR_MENU` exports + `doname`/`doname_vague_quan` wrappers + local
  `Glib()`; flag-gated prefix arms; ARMOR W_ARMOR variants; AMULET gate;
  price chain via late-bound shk suffix; for_menu truncation; `var`
  `_doffing_fn/_donning_fn` + `set_doffing_predicates`.
- Changed callers: shk `doname_with_price` → `doname_base(obj,
  DONAME_WITH_PRICE)` + trailing pricequotes arm; pager farlook
  `dknown ? doname_with_price : doname_vague_quan` (C `pager.c:390–391`
  cited); end `container_contents` → `doname_with_price` (C `end.c:1647`
  cited); do_wear top-level `set_doffing_predicates(doffing, donning)`.
- `sym.mjs` (required): `doname_base` js/objnam.js:2920 sync;
  `DONAME_WITH_PRICE` export const; `set_doffing_predicates` sync. No
  deleted/re-pointed symbols.

## C ↔ JS fidelity

Walked against `objnam.c:1222–1751`:

- Flags `:1225–1228` + override_ID `:1255` → all five `known/dknown/
  cknown/bknown/lknown` forced ✓. Vague `:1283` → `(dknown ||
  !vague_quan) ? quan : 'some '` ✓. BoT/HoP `:1302` →
  `spe==0 && !known` empty, container/STATUE rule kept ✓. SCR_MAIL
  uncursed exclusion `:1343` ✓. Box `tknown` stays field-read (C `:1356`
  reads `obj->dknown`) ✓. `donameClass = is_weptool ? WEAPON_CLASS :
  oclass` ≡ C `switch (is_weptool(obj) ? WEAPON_CLASS : obj->oclass)`
  (`:1381`) ✓.
- ARMOR `:1387–1419`: uskin/doffing-before-donning order ✓ (comment cites
  the perm_invent reason); Glib `; slippery)` + lamplit `, %s lit)`
  rewrites via `slice(0,-1)` ≡ Concat mode-1 paren overwrite ✓; the
  `bp_eos[-1]==')'` guards are vacuous for untruncated JS strings (stated).
- AMULET: C `case AMULET_CLASS: if (owornmask & W_AMUL)` (`:1382–1385`) —
  the old JS lacked the class gate; the new gate is a real C fix ✓.
- Price chain `:1652–1683`: suppress/restoring skip ✓ (shk.js:2979),
  unpaid arm with `record_price_quote(quan)` ✓, for-sale/no-charge/
  pricequotes in `doname_with_price` ✓, trailing pricequotes for plain
  doname only (`!with_price`) ✓. Wizweight `:1697–1709` trailing-`)`
  rewrite ✓. a/an redo `:1686–1693` → `just_an(rest || base) + rest`
  (`rest || base` ≡ C `*tmpbuf ? tmpbuf : bp`) ✓. Menu truncation
  `:1736–1745` (`offsetbp=4`) ✓.
- TDZ: objnam→do_wear static edge would pull do_name's eval-time
  `set_y_monnam` into objnam's partial window; the `var` late-bound slot
  (hoisted write kept, unset → plain "(being worn)") is the minimal
  shape, disclosed with mechanism. The new test's pre-fix stash run
  (import-fail, 0 pass) evidences the TDZ claim.

Callee closure: LIVE throughout (`is_weptool`, `Glib` local youprop,
`artifact_light`, `arti_light_description`, `append_price_quote`,
`get_cost_of_shop_item`, `record_price_quote`, `just_an`); named omits
(buffer machinery, `doname_full`/paniclog, `contained_cost` nested walk,
leash `impossible`, qknown TODO) carry cites. No STUB in a live arm.

## Hallucinations / overclaim

None. Test claim re-checked here: `node --test
scripts/doname-base-flags.test.mjs` → 5/5 pass.

## Density

~180 JS lines + 132-line test across 5 files for a 530-line C function
with 3 wired callers. Right-sized; the test is durable collateral, not
padding.

## Verification

Re-ran here (`--base 2a0c6559~1 --reach-all`):

```text
verify doname_base: baseline 2a0c6559~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke doname_base: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

0 blocked both sides (vacuous, as stated). D-log also claims green 2/2,
strict ×2, cohort 7/7, full 44/44 (hot shared function). Diff grep: no
FORCE/DIAG/`getRngLog`/seed/fastforward/coords.

## Actionable C-wrongs

None. No Must-fix.

Verdict: **ACCEPT**
