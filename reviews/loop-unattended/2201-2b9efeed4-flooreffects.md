# Review 2201 — 2b9efeed4 — flooreffects whole-body restart

Metadata: SHA `2b9efeed4`, D-3240, js/do.js restart + 3 se
re-exports in js/sndprocs.js. Parent baseline `9e990eefc`.

## Intent vs deliverable

Subject promises: whole-body restart (boulder/pit hmon, squish
goto, useupf), sokoban 232→320. Delivered: a full restart of the
199-line C body in C order plus import wiring. No drift — export
name/signature kept, no call sites added/removed.

## Inventory

- `flooreffects` (js/do.js:771) restarted: exact else-if chain with
  per-branch `t_at`/levl reads; monster arm (dmgval/mondied under
  mon_moving, else hmon); hero squish via `squished` flag (C goto);
  verb block; delfloortrap/useupf/bury/newsym tail; lava; pool
  splash + water_damage; teeter/shaft; globby meld loop; altar;
  hot-ground potion shatter.
- New static imports: `dmgval` (weapon.js), `hmon` (uhitm.js),
  `breakobj` (dothrow.js), `mondied` (mhitm.js), `bury_objs`
  (dig.js), `Soundeffect` + 3 se ids (sndprocs.js re-exporting
  generated/seffects_data.js — Rule #2-clean idiom).

## C ↔ JS fidelity

Walked C do.c:161–359 against JS arm by arm. OBJ_FREE gate keeps
the pre-existing tolerate-and-continue (identical comment in the
parent — not this SHA's choice). nobj/nexthere null, bhitpos
save/set/restore on the single exit path ✓. Boulder+pool ✓;
boulder+pit: assign-in-condition `t_at`, ttyp/tseen, trapped gate,
vtense message with `Blind?"A":"The"` and `mtmp?"":" with you"`
✓; monster arm — passes/throws gate, dieroll=1, mon_moving
dmgval+mhp+DEADMONSTER(`mhp<=0`)+canspotmon destroyed/killed+
mondied else hmon(HMON_THROWN,1), alive-non-whirly `res=false`,
mtrapped=0 outside the gate ✓; hero arm — losehp(
Maybe_Half_Phys(rnd(15)), "squished under a boulder",
NO_KILLER_PREFIX) then squish-skip of exactly the verb block with
the tail still running ≡ C `goto deletedwithboulder` ✓; verb
block — crash/plugs-boulder-drop 3 arms with exact texts and se
ids ✓; tail re-fetches `t_at` (C's fill_pit note honored),
delfloortrap, reset_utrap(FALSE), useupf, bury_objs, newsym,
res=TRUE ✓. Lava ✓. Pool: splash gate/weight/plop,
newly-wired live `map_background`, water_damage==ER_DESTROYED ✓.
Teeter/shaft: tumble seetext vs Tobjnam+the_your, ship_object ✓.
Globby: merge loop with out-param boxes, `res=!globbyobj` ✓.
Altar (no res set, like C) ✓. Potion: ROOM||CORR + temp>0,
Tobjnam heat text, 70/50 + invlet Luck*2, oil→100, shatter arms,
breakobj ✓. RNG call-for-call (`rnd(15)`; dieroll=1, no draw).
Verdict: whole body exact.

Helpers: every callee LIVE, verified: `dmgval` weapon.js:226 sync,
`hmon` uhitm.js export-list (`export { hmon, … }` :2266 — `sym.mjs`
misses export-list form and reports "NOT EXPORTED"; the import is
live, suites green), `breakobj` dothrow.js:1412 async (awaited),
`useupf` invent.js:4840 sync, `Tobjnam` objnam.js:1834 sync. No
clones added; no stubs. Pre-existing locals (Passes_walls, Blind,
Luck, distu…) untouched. Leftover: do.js:1009 keeps a dynamic
`bury_objs` import now redundant with the static one — harmless
local shadow, unqueued.

Callers: 25 C sites. trap.c:4018 ("settle") and :4500 (contents
spill) confirmed unwired (trap.js holds only the launch_obj pair
:2837/:2851) — honestly named. BUT dokick.c:640 and :771 are
**wired**, contrary to the D-log: js/dokick.js:1396
(`if (!fe(kicked, u.ux, u.uy, 'fall'))` + place/impact/stack/newsym)
is C :640 line-for-line, and :1522 (`if (fe(kicked, bx, by,
'fall')) return 1`) is C :771 — the `flooreffects: fe` alias hid
them from the author's grep. True count is 23 wired + 2 unwired,
not 21+4. No phantom row was enqueued (queue diff only popped),
so the harm is D-log text only — but no future row may be filed
for the dokick sites (stale on arrival; this review is the
evidence).

## Hallucinations / overclaim

One doc-accuracy finding (above): the "dokick.c:640,771 unwired —
own rows on a falsifier" line is false; both sites are wired. The
error is in the conservative direction (underclaim, not overclaim)
and touches no behavior. No verification overclaim: PROGRESS and
the misattribution triage reproduce exactly (below).

## Density

One whole 199-line C function + import wiring (~100 insertions):
right-sized. Own C-locus, Callers, Verify, Named-omissions bullets
and own `Ledger:` entry. The 0-row coverage block justifies the
single-function shape (precedent D-3238/D-3239).

## Verification

- Banned-pattern grep on the diff hunks: clean.
- Re-measured: `hidden-proxy.mjs verify flooreffects --base
  2b9efeed4~1 --reach-all` → "0 PASS, 1 moved past, 1 unchanged, 0
  worse → PROGRESS" (sokoban-Priest-94103 232→spoteffects@320;
  scen-dig-94275 unchanged with identical C/J toplines); smoke
  24/24 REACH-OK. Exact match; no REGRESSED.
- No seed/step/coordinate reads.

## Actionable C-wrongs

None in `js/`. The dokick caller-table correction stands as review
text (D-log is append-only; no js/ fix exists to queue).

Verdict: **ACCEPT**
