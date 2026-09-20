# Review 1644 — 40ce1e84 — `monmove.c` m_balks_at_approaching whole-body port (D-2685)

Metadata: commit `40ce1e84`, D-2685, js/monmove.js only (+3 imports,
both bodies restarted). No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole-body `m_balks_at_approaching` with the live
`ranged_attk_available` m_seenres gate. Diff actually adds: restarted
`ranged_attk_available` (aatyp gate + `get_atkdam_type` + `m_seenres`)
and restarted `m_balks_at_approaching` (cites, MON_WEP re-read,
split braces). Matches the promise; no extras.

## Inventory

Changed JS: `ranged_attk_available` (js/monmove.js:1676, local —
C-home is mhitu.c but the monmove-local shape predates this commit;
now a verified CLONE); `m_balks_at_approaching` (js/monmove.js:1693).

## C ↔ JS fidelity

C loci (csym): `m_balks_at_approaching` `monmove.c:1180–1224`;
`ranged_attk_available` `mhitu.c:2412–2425`. Callers: balk sole C
caller `:1878` → js/monmove.js:1911 `{min,max}` object (pdist bundles
C's two out-params — all-or-nothing vs C's split null guards, but no
caller splits; equivalent on every reachable path); second
`ranged_attk_available` site `:946` → js/monmove.js:2528–2530 same
callee (gets stricter with it, per C — intended).

Branch-by-branch confirm: pdist zeroing; peaceful/far/blind gate;
ammo+launcher −1; polearm with C's double MON_WEP re-read (pure both
sides); arw −2 with min=4/max=range; hp/mspec −1 with `Math.trunc`
for C int division; else oldappr. `ranged_attk_available`:
DISTANCE_ATTK_TYPE values verified against monattk.h:20–34
(SPIT10/BREA12/GAZE15/MAGC255); aatyp gate first so AD_RBRE `rn2`
fires only for distance attacks (C `&&` short-circuit preserved —
this also *adds* the C-faithful draw the old early-`return true`
skipped); `typ >= 0 && !m_seenres(...)` matches C's
`>= 0 && … == 0` (`m_seenres` returns boolean js/mondata.js:875;
NOTES scar "boolean, never !== 0" honored).

Callee closure (`sym.mjs` pasted in-session): `m_seenres`,
`cvt_adtyp_to_mseenres`, `get_atkdam_type` all live sync exports in
js/mondata.js with C-cited bodies (read in-session); no new module
edge (monmove→mondata pre-exists). No STUB, no OMIT.

No RNG-order change beyond the now-faithful AD_RBRE draw. Diff grep:
no FORCE/DIAG/seed/coordinate. Rule #2 clean (iteration-wide).

## Hallucinations / overclaim

None. The "clone → verified CLONE" story is explicit in the D-log
rather than hidden.

## Density

Breadth-phase whole-function pair (C 45+14 L), ~45 JS insertions in
one module — right-sized.

## Verification

D-log: syntax/rule2/hidden/reach/green/strict/cohort (no full —
single non-shared module). Re-ran
`hidden-proxy.mjs verify m_balks_at_approaching --base 40ce1e84~1
--reach-all`: "0 blocked (0 at baseline…)" — queue cited 0, vacuous
note properly stated — plus "24 PASS, 0 regressed → REACH-OK".
No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
