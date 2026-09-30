# Review 2093 — 463ffffc2 — get_unpacked_coord + 3 dispositions

- SHA: `463ffffc2` (D-3133)
- Subject: "`sp_lev.c` get_unpacked_coord whole port + traptype-opt/name_from_player stale, enter_force_field by-design (coverage head)"
- js/ insertions: ~28 in js/mklev.js (1 file)
- Prior index: 2092; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: port `get_unpacked_coord` whole (module-local +
const, C order before get_location_coord); ledger-only
dispositions for the other three.

Diff actually adds: the const + the 19-line function. No
imports (zero callees — verified). Matches the promise.

## Inventory

- `get_unpacked_coord` (js/mklev.js:21660, module-local =
  C staticfn) — C sp_lev.c:1316–1334 (csym range). Whole.
- `SP_COORD_IS_RANDOM` const (:21649) — sp_lev.h:66.
- Dispositions: get_table_traptype_opt stale-split,
  name_from_player stale, enter_force_field by-design.

Zero callees; nothing deleted or re-pointed.

```text
get_unpacked_coord  js/mklev.js:21660  local (C staticfn, C-home — not drift)
get_table_traptype_opt  NOT FOUND (split name lspo_traptype_opt live)
enter_force_field  NOT FOUND (by-design, #if 0)
```

## C ↔ JS fidelity

Arm-by-arm against :1316–1334 with sp_lev.h:66/82–85/106–
110 read: RANDOM arm (`x = y = -1` chain kept,
is_random=1, flags=`loc & ~MASK`, defhumidity fallback)
≡ :1321–1326; fixed arm (is_random=0, flags=defhumidity,
`loc & 0xff`, `(loc >> 16) & 0xff`) ≡ :1327–1332 and the
SP_COORD_X/Y macros verbatim. Bit ops are int32-safe:
packed values are non-negative < 2^25, `~MASK` clears bit
24 exactly like C's long op. C's `static` local returned
by value ≡ fresh object per call (no aliasing either
side). Field set ≡ the struct. No RNG either side.

Sole-caller wiring (:1345 get_location_coord) correctly
named unwired: JS get_location_coord(humidity, croom, rx,
ry) takes unpacked ints at all call sites (audited — room-
relative or -1, never packed longs), so the packed path
cannot enter. Zero JS callers today, like minimal_xname
(2088) — a whole port awaiting its caller, named.

Dispositions hold: name_from_player whole (nhUse→void,
getlin, empty/ESC→null, mungspaces, PL_PSIZ — the
first-char-vs-whole-string ESC edge is unreachable:
getlin returns exactly '\x1b', getline.js:277);
enter_force_field by-design (#if 0 at region.c:945
"not yet used", proto ifdef'd :32–39, sole wiring
commented :1026–1027 — unconditional, uncompilable);
get_table_traptype_opt split-shape exact with caller
:1403 wired.

Cosmetic: the get_unpacked_coord ledger row kept its
"measured MISSING" refresh note under status ported
(finish preserves note). False but harmless; not queued.

Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates.

## Hallucinations / overclaim

None. "Packed longs never enter JS" verified by auditing
the call sites, not trusted.

## Density

One function + 3 dispositions at ~28 insertions — below
the floor with the unless-clause holding (head stale →
by-design → shipped head + same-file split; zero-callee
closure; D-3127 precedent). Verdict: ACCEPT.

## Verification

Re-measured (`--base 463ffffc2~1 --reach-all`, all four
one call): 0 blocked at baseline and working tree each,
vacuous notes, smoke 24/24 → REACH-OK ×4. Matches the
D-log; no REGRESSED session. Gates per D-log: syntax 1
file, rule2, green 2/2, strict ×2, cohort 7/7, full 44/44
(mklev shared — correct to run full).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
