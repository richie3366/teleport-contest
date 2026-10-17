# Review 2904 — 11ace4c41 — Mon-strt siege exhausted-selection fallback

- SHA: `11ace4c41` (cliff writer: siege `des.monster` random
  fallback, 1 session)
- D-entry: D-4063; Ledger: sp_lev.c (`create_monster split`,
  +D-4063 tag only)
- `js/` diff: `js/mklev.js` +26/−4 (two fallback blocks in
  `load_mon_strt` siege loops; no new imports, no new function)

## Intent vs deliverable

Promise: on null `selection_rndcoord` (exhausted spacelocs),
both siege loops place randomly in C order
(`pm_to_humidity` → `get_location_random(loc|NO_LOC_WARN)` →
DRY retry → `splev_resolve_occupied` → makemon tail);
Monk-50055015 s885 → FULL PASS. The diff delivers exactly
that in both loops (earth-elemental ×8, xorn ×4), keeping
the mndx-fail `continue`. Promise = diff.

## Inventory

- Siege loop 1 (mklev.js:12608–12623): `let pos`, mndx
  guard kept, null-pos fallback block. C: sp_lev.c
  create_monster :1943–:1978 via lspo_monster table arm.
- Siege loop 2 (mklev.js:12624–12640): identical block for
  xorns.
- Callees (all same-module, pre-existing): `pm_to_humidity`
  :22046, `get_location_random` :22103, `splev_resolve_occupied`
  :22194, `makemon`, `find_montype_gender`, `induced_align`.

No deleted symbols, no re-pointed clones — step-3 paste not
triggered. Callee evidence anyway:

```text
pm_to_humidity local js/mklev.js:22046 (single definition)
get_location_random local js/mklev.js:22103 (single definition)
splev_resolve_occupied local js/mklev.js:22194 (single definition)
```

All LIVE same-module calls, zero new edges. No clones, no stubs.

## C ↔ JS fidelity

Branch-by-branch confirm against pinned C (csym ranges):

- Empty selection draws nothing: selvar.c `selection_rndcoord`
  :283–318 gates the draw behind `if (idx)`, else
  `*x = *y = -1; return 0`. JS `selection_rndcoord` null
  (pre-existing) matches; the 12 exhausted picks burn zero
  draws both sides.
- `l_selection_rndcoord` (nhlsel.c:406–428) returns the
  {x:-1,y:-1} table; lspo table arm (sp_lev.c:3260–3290)
  runs get_coord → find_montype (+female rn2(2)) →
  PACK_RANDOM (:3378–3380) → class heal (:3383–3384) →
  create_monster. JS keeps find_montype_gender +
  induced_align(80) before the fallback — C order exact,
  since C's induced_align(80) fires inside create_monster
  :1943 via sp_amask_to_amask AM_SPLEV_RANDOM (:1908–1922,
  :1917; siege uses the default sp_amask).
- `pm_to_humidity`: C :1883–1899 vs JS :22046–22058 —
  verbatim (S_EEL/amphibious/swimmer → WET; flyer |
  HOT|WET; walls | SOLID; fire | HOT).
- Random placement: C get_location :1201–1269 no-croom
  branch `mx + rn2(sx)` / `my + rn2(sy)`; the recorded
  `rn2(76)=7` first-try draw proves croom was null (croom
  branch uses somexy, never rn2(sx)) — the diff comment's
  "no :1978 check" holds by measurement, not assumption.
- MON_AT/enexto :1975–1976 vs `splev_resolve_occupied`
  :22194–22199 — verbatim (m_at miss → as-is; enexto hit
  → relocate; else as-is).
- Retry flags: C :1967–1972 first-try `loc|NO_LOC_WARN`,
  DRY retry drops NO_LOC_WARN (`loc |= DRY` on the bare
  humidity); JS `loc0|NO_LOC_WARN` then `loc0|DRY` — exact.

Two confirmed gaps, both in arms no session can reach on
this level (Mon-strt quest home always has dry floor):

1. C get_location_coord (:1336–1353) runs each humidity
   twice (NO_LOC_WARN pass, then a bare retry that
   `impossible()`s and keeps last-scan coords on total
   failure); JS runs each once and would hand {-1,-1} to
   makemon. The pre-existing `get_location_coord_random`
   (:22140) implements the double pass but the new code
   does not call it.
2. The In_mines/your_race rn2(3) gate (:1959–1961) is
   absent from the inline fallback (correctly draw-free
   here — quest home is never mines).

Neither is a live C-wrong: both require a floorless or
mines-flagged quest home. A queue row would be a
no-session iteration (busywork); noted here instead. The
kept mndx-fail `continue` and sibling `!pos` loops are
named in-commit with C cites (omissions 1–3).

## Hallucinations / overclaim

None. "C-order random fallback" holds call-for-call; the
croom-null claim is corroborated by the rn2(76) draw
itself. No "Match C" on a stubbed callee — every callee
is live and C-cited.

## Density

Cliff writer done right: owner get_location proven
region-heuristic (ledger split stands), writer named by
the recorded C log, first actionable row past re-verified
parks (D-4016 ×14 + D-4028, falsifiers quoted unfired).
One `Ledger:` entry (create_monster split +D-4063; inline
code, no new JS body to declare). Omissions (1)–(3) named
in the commit with C cites. No unreached work — the probe
is the pin (no committed test; FULL PASS is fortress-guarded).

## Verification

Re-measure (`--base 11ace4c41~1 --no-reach`):

```text
verify get_location: baseline 11ace4c41~1 — 1 session(s) blocked on it
  scen-sweep-Monk-50055015: PASS
verify get_location: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

Exact match with the D-log line. No FORCE/DIAG/seed/coords
in the `js/` hunks (comments are C cites only). Rule #2
clean (window rulecheck). REACH 80/80 per the pasted
verify tail (spread 299); the audit's full rescore below
is the regression check.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
