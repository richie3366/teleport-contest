# Review 839 — b0f702a1 — mkroom.c mkswamp swamp-room port (D-1869)

Metadata: SHA `b0f702a1`, D-1869, `js/mklev.js` (+63/−2, `mkswamp` + SWAMP
arm wiring + imports/consts), `js/fountain.js` (+1/−1, `export` on
`nexttodoor`), map + queue/archive stamps.

## Intent vs deliverable

Subject promises the `mkswamp` port for the corpus owner (C made a swamp,
JS left the room ordinary and burned ordinary-fill RNG). Diff delivers the
full function plus the SWAMP dispatch wiring. Matches.

## Inventory

New: `mkswamp()` (file-local sync) in mklev.js; no new exports except the
`export` keyword on the existing `nexttodoor` (`sym.mjs`: single
definition, no second clone — "no second clone" claim true). Import names
added to pre-existing braces (`NO_MM_FLAGS`, `del_engr_at`, `nexttodoor`);
`--can mklev.js fountain.js` reports ALREADY (pre-existing edge, no TDZ
risk). File-local `PM_*EEL`/`PM_PIRANHA` consts per file convention. No
deleted symbols.

## C ↔ JS fidelity

C locus `mkroom.c:529–574` (via csym), walked call-for-call against the
diff — full confirm, no gaps:

- Own `rn2(nroom)` pick per try (not `pick_room`) ✓; gate
  `hx<0 || rtype!==OROOM || upstairs || dnstairs → continue` in C
  short-circuit order ✓ (JS adds `!sroom`/*loc* null guards — memory-safe
  equivalents, same `continue` outcome).
- `rmno = idx + ROOMOFFSET` ≡ C pointer difference ✓; `rtype = SWAMP` ✓;
  `has_swamp` set per converted room inside the loop ✓; `eelct` C-local
  across all 5 tries, incremented after the eel `makemon` ✓.
- Cell loop bounds, `IS_ROOM` + `roomno` check, occupancy
  (`objects_at`≡`OBJ_AT` / `m_at`≡`MON_AT` / `t_at` / `nexttodoor`) ✓.
- Odd cells: `del_engr_at` → POOL → `!eelct || !rn2(4)` eel attempt with
  nested `rn2(5) ? giant eel : rn2(2) ? piranha : electric eel` ✓ (RNG
  order exact — this is the corpus `rn2(5)` draw).
- Even cells: `else if (!rn2(4)) makemon(mkclass(S_FUNGUS, 0))` ✓.

Callee closure: `makemon`/`mkclass` sync LIVE (`makemon.js:2614`/
`:750`; `mkclass` takes the S_* string per established JS convention),
`mons`, `del_engr_at`, `nexttodoor` (body matches `mkroom.c:623–635`
exactly). No STUB, no OMIT — the commit's "Named: none new" is accurate.

## Hallucinations / overclaim

None in the code. One judgment call disclosed honestly: `geom-probe`
showed 516 differing cells, attributed to a C-side `^F` misfire (pending
`--More--` on the C topline, tiny C extent). That attribution is
*inferred*, not measured — but the commit labels it a caveat and rests the
claim on positional-RNG attribution + the verify PASS, which I re-ran
(see below). Acceptable: the passing session's screens are the stronger
signal, and the doubt is on the record rather than buried.

## Density

One C function + dispatch wiring, two modules, ~65 JS lines. Right-sized;
full 44/44 ran (shared-file heuristic fired).

## Verification

Re-ran `hidden-proxy.mjs verify mkswamp --base b0f702a1~1` myself:
`1 blocked → tour-Caveman-70016 PASS → PROGRESS`. D-log claim true. Green
+ strict ×2 + cohort + full 44/44 per D-log. Rule #2 clean. No
FORCE/DIAG/seed/coordinate hits in the diff.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
