# Review 1151 — fb69e76e — mcastu.c mcast_disappear + mon_visible See_invisible (D-2185)

Metadata: SHA `fb69e76e`, js/ +5/−3 in `display.js`
(`mon_visible` predicate) and `mcastu.js` (SEE_INVIS import,
`See_invisible` union, `pline`→`pline_mon`). D-log D-2185.
Subject promises: Monk lich transparent-L vs I — 1 session
moved past (121→135).

Intent vs deliverable: promise matches diff. Actually adds:
the uprops read in two See_invisible predicates + the C-cited
`pline_mon`. One predicate family, one session. No new module
edge (`SEE_INVIS` joins the existing const.js edge —
`sym.mjs` confirms const.js:2576; `pline_mon`
display.js:7249 async, already imported).

Inventory: no new/deleted functions. No clone→import
re-point. `mon_set_minvis` NOT touched here — the D-log
explicitly leaves the muse.js:2139 local clone (missing
newsym/see_wsegs) as pre-existing debt and notes mcastu uses
the worn.js export. Correctly not glued in.

**C ↔ JS fidelity**: confirm, three loci read at HEAD.

- `_mon_visible`: C `display.h:86–95` (active `#else` arm) =
  `(!minvis || See_invisible) && !mundetected`. JS identical
  shape via `hero_See_invisible()`. Buried arm is `#if 0` in C
  — correctly absent.
- `See_invisible`: C `youprop.h:150–152` — H/E **are**
  `uprops[SEE_INVIS].intrinsic/extrinsic`; single store. JS
  carries a flat/uprops split (legacy flats + uprops, cf. the
  documented INVIS split where confer_oc_oprop writes uprops
  with no flat), so both JS predicates read the union. Union
  is the faithful analogue of C's single-store read: any C
  giver lands in uprops, any JS-flat-only giver in flats;
  previously the flats-only read missed uprops extrinsic
  (e.g. ring) — exactly the transparent-vs-invisible miss.
  mcastu-local and display.js predicates now agree.
- `mcast_disappear` (`mcastu.c:490–501`): `pline_mon` (was
  `pline`) now verbatim; `mon_set_minvis(FALSE)` +
  `cansee && !canspotmon → map_invisible` already present and
  untouched; `impossible` else-arm present (awaited — async
  house form).
- Mechanism coherent: hero See_invisible lived in uprops, old
  flats-only `mon_visible` returned false → `I` marker; union
  returns true → `L` glyph, matching C's row-18 paint.

RNG: none on this path either side (display predicate +
message routing).

Hallucinations / overclaim: none. Baseline NO MOVEMENT is
stated in the subject itself, and the result is claimed only
as moved-past with the next owner named
(one_characteristic@135) — modest and checkable, not a PASS
claim.

Density: ~16 insertions for one predicate family — density
exception (C arm that small).

Verification: D-log cites `verify.mjs --fn mcast_disappear`
→ 0 PASS + 1 moved + full 44/44. Re-measured independently:
`hidden-proxy.mjs verify mcast_disappear --base fb69e76e~1`
→ baseline 1 blocked, `0 PASS, 1 moved past, 0 unchanged, 0
worse → PROGRESS` (Monk-92013 121→135). Exact match.
`rulecheck` clean (re-ran this iter). No DIAG/FORCE/seed
gates.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
