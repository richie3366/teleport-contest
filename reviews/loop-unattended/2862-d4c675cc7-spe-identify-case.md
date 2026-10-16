# Review 2862 — d4c675cc7 — seffects gains case SPE_IDENTIFY

## Metadata

- SHA: `d4c675cc7d18e8c0d1d4a8db6e783dc4b0c438685` (D-4020)
- Cliff: Open — cliffs row 4 `read.c` seffect_identify @8595ef25e
  (rows 1–3 D-4016-kin, re-verified first-hand)
- js/ diff: `js/read.js` +9/-3 (const + shared case + kept
  return); `scripts/spe-identify-seffects.test.mjs`
- Method: full per-function (cliff commit)

## Intent vs deliverable

Promise: the `seffects` switch lacked `case SPE_IDENTIFY`, so
every identify cast fell into `default` ("That scroll is not
implemented yet." + return -1). Add the C-shared arm and make
`seffect_identify` return the kept protocol (`null` = scroll
gone, `sobj` = spell kept). Tourist + Priest → PASS.

Diff actually: `SPE_IDENTIFY` const, the shared case line, the
ternary return. Promise == diff.

## Inventory

- `seffects` (`js/read.js:2129`, C `read.c:2194-2291`): one
  `case SPE_IDENTIFY:` line on the existing identify arm.
- `seffect_identify` (`js/read.js:1371`, C `:2054-2099` via
  `csym.mjs`): `return null` → `return is_scroll ? null :
  sobj`.

## C ↔ JS fidelity

- C `:2256-2259` (read): `case SCR_IDENTIFY: case
  SPE_IDENTIFY: seffect_identify(&sobj); break;` — the JS
  case shape now matches exactly. C tail: `if (!sobj)
  update_inventory(); return sobj ? 0 : 1;` — JS arm `if
  (!kept) return 1; break;` + tail `return sobj ? 0 : 1`
  matches (the missing `update_inventory` on the gone path
  is the pre-existing arm shape, shared with 6 sibling arms,
  not this SHA).
- C `seffect_identify` zeroes `*sobjp` only on the scroll
  path (`useup` + `*sobjp = 0`); spell keeps sobj. JS
  ternary mirrors it, including the confused-scroll early
  `return null` (sobj already gone). cval block
  (`rn2(5)` gate, `Luck>0` bump, `identify_pack(cval,
  !already_known)`) verified identical.
- Caller wired pre-existing: `spell.js:2792-2809` already
  routes `SPE_IDENTIFY` pseudo through `seffects(pseudo)`
  (skilled-bless FALLTHROUGH group) — this case was the only
  missing link, which is why both probes failed with the
  default-stub topline.

`sym.mjs SPE_IDENTIFY`: no export — module-local
`objectNames.indexOf` consts in read.js (`:197`) and
spell.js (`:299`), the files' established pattern, not a
clone. Nothing deleted or re-pointed.

## Hallucinations / overclaim

None. The history tag (D-0678 shipped body + scroll caller;
spell caller still open) is accurate.

## Density

Cliff commit on the live head; whole-arm fix with the C
caller already wired. `Ledger:` seffect_identify + seffects
+ D-4020. Minor note drift (not a C-wrong, no Must-fix):
  the seffect_identify note still says "spell-path null
  return unobservable" — the spell path now returns sobj
  (still unobservable: spell.js voids the result). Next
  port iter: one `ledger.mjs set` alongside real work.

## Verification

Re-measured `--base d4c675cc7~1 --no-reach`: `verify
seffect_identify: 2 PASS, 0 moved past, 0 unchanged, 0
worse` (Tourist-50358021, Priest-50161019) — claim exact.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
