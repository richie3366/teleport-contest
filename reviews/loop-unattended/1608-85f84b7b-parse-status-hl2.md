# Review 1608 — 85f84b7b — botl.c parse_status_hl2 whole-body port (D-2649)

**Metadata:** SHA `85f84b7b`, `botl.c` `parse_status_hl2` (+hl1
splitter), D-2649. JS: `js/botl.js` (+722: 2 exports + ~17
file-local helpers/tables). No prior review claimed closed.

## Intent vs deliverable

Subject promises: exported `parse_status_hl2` + `parse_status_hl1`
in C order, every static callee ported file-local, C-valued
`C_ATR_*` (not terminal.js numbering), both in-file hl2 call sites
wired. Diff delivers all of it. Promise matches deliverable.

## Inventory

- Exports: `parse_status_hl2` (botl.js:1369, sync), `parse_status_hl1`
  (botl.js:1568, sync).
- File-local: `c_atoi`, `s_to_anything`, `fldname_to_bl_indx`,
  `match_str2clr`/`match_str2attr`, `is_ltgt_percentnumber`/
  `has_ltgt_percentnumber`, `splitsubfields`, `is_fld_arrayvalues`,
  `status_hilite_add_threshold`, `match_str2conditionbitmask`,
  `str2conditionbitmask`, `parse_condition`, `ensureCondHilites`,
  `config_error_add` sink + `C_ATR_*`/color/attr/alias tables.
- Same-module import extensions only (const.js, terminal.js CLR_*,
  hacklib `lowc`); `sym.mjs` confirms both exports live sync.
  No deleted symbol, no clone→import re-point.

## C ↔ JS fidelity

C loci read here: `parse_status_hl2 botl.c:2813–3106` (294 L),
`parse_status_hl1 :2592–2648` (57 L), `splitsubfields :2685–2730`,
`badman`-class `parse_condition :3236–3347` tail + `:3240–3262` head,
`C_ATR_*` wintype.h:128–134. Callers (`--callers` both): hl2's C
refs are decl `:650`, hl1 `:2616/:2637`, recursion `:2852` (all
in-file, all wired in JS); hl1's external callers cfgfiles.c:1173 +
options.c:1873 are named omits (file-infra class / future do_set
row) — bodies complete, dispatch rows own the callers. No RNG
either side. Spot-verified arms:

- `C_ATR_*` 0,1,2,3,4,5,7 byte-equal to wintype.h (the 6-skip for
  INVERSE kept) ✓ — the headline trap avoided.
- hl1 splitter ≡ C line-for-line: MAX_THRESH 21, zero-fill, lowc
  cursor, space→parse-or-skip (`fldnum >= 1`), title exception
  (buffer pre-lowered ≡ strcmpi), `/` bump, trailing `fldnum >= 1 &&
  !badopt` parse, badopt→false, hilite_delta=3 tail ✓.
- `parse_condition` head/tail ≡ C: null-s guard, sidx bump, missing
  arm, while-loop with attr→bitlands ladder (BOLD/DIM/ITALIC/ULINE/
  BLINK/INVERSE/NONE-clear), color fallback with `>= CLR_MAX` reject,
  mask-lands + result + sidx++ AFTER the loop even when the split
  overflowed (sf −1 ≡ `?? []`) ✓.
- Threshold value itself is LIVE (`s_to_anything(hilite.value, tmp,
  dt)` ≡ `:2945`); only the `threshold_value`/`is_out_of_range`/`op`
  message fragments are sunk, FALSE propagation kept ✓.
- OMITs named with cites: `query_arrayvalue` (never called on this
  path), `status_hilite_menu_add` family (own rows), alloc≡GC,
  cfgfiles/options dispatch callers.

One proven divergence — `splitsubfields` overflow gate off-by-one
(traced, not inferred). C `:2714` gates the SEPARATOR-store count:
`-1 iff sf >= maxsf-1`. JS gates the PART count:
`parts.length >= cap-1`. With no trailing separator
parts = seps+1, so at seps == cap−2 they disagree: a 15-subfield
rule (cap 16) returns 15 in C but null (≡ −1, reject) in JS.
(Trailing-separator inputs agree exactly.) Fix is a one-line gate
correction — reject iff `parts.length + popped >= cap` — plus a
15-subfield probe case; batch with the next botl.c/config row. Only
reachable via hand-written 15-way `hilite_status` config; no corpus
or held-out session comes near it (smoke 24/24 green).

## Hallucinations / overclaim

None material. "Both C sites wired" = hl1's `:2616` + `:2637`
(sic — the message's "`:2593` caller" means the hl1 function whose
comment block starts :2587–2593, both sites present in JS at
:1587/final). No dispatch-over-stub: every callee is a verified
local (C staticfn ⇒ file-local is correct) or live import.

## Density

Breadth phase: 722 insertions for a 294 L + 57 L pair plus 13
callees — one C function family, within the raised ceiling. No
second subsystem.

## Verification

D-log Verify bullet claims PASS + smoke REACH-OK + 24/24 probe.
Re-measured here: `hidden-proxy.mjs verify parse_status_hl2 --base
85f84b7b~1 --reach-all` → 0 blocked both sides (vacuous note quoted
verbatim, correctly labeled) + smoke 24/24 REACH-OK, no REGRESSED.
Claim true. Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates/
fastforward.

## Actionable C-wrongs

1. `splitsubfields` overflow gate off-by-one (botl.js): reject iff
   `parts.length + popped >= cap`, not `parts.length >= cap-1`;
   add a 15-subfield no-trailing-separator probe case. Batch with
   the next botl.c/config row — config-path only, no corpus reach.

Verdict: **ACCEPT-WITH-DEBT**
