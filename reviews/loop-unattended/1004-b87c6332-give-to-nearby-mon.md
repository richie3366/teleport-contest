# Review 1004 — b87c6332 — bones.c give_to_nearby_mon reservoir port (D-2034)

Metadata: SHA `b87c6332`, D-2034, Open-row port
(death-drop writer behind a drop_upon_death-attributed
row; 5 sessions). js/ touches `js/end.js` (+50/−7
approx). No stamp owed.

## Intent vs deliverable

Subject promises: new `give_to_nearby_mon` verbatim
from C (loop/guard order, `!rn2(nmon)` reservoir,
`can_carry`→`add_to_minv` else `place_object`; else
arm keeps the file's pre-existing RNG-free `stackobj`
floor convention) with the `!rn2(8)` arm now calling
it. Diff actually adds: exactly that, plus import
name extensions (`u_at`, `likes_*`, `m_at`,
`can_carry`, `add_to_minv`). Promise == diff. One new
function; no deletes / re-points.

## Inventory

- New JS: `give_to_nearby_mon` (static, end.js).
  Changed: `drop_upon_death` `!rn2(8)` arm (stub
  place+stack → call).
- `sym.mjs`: `m_at js/mon.js:1395 sync` (called
  sync ✓); `can_carry js/monmove.js:243 sync` ✓;
  `add_to_minv js/mkobj.js:230 sync` ✓;
  `likes_gold js/monsters.js:615 sync` ✓;
  `stackobj js/mkobj.js:2013 sync`, `u_at
  js/const.js:3165 sync`, `place_object
  js/mkobj.js:1873 sync` ✓. No STUB / clone /
  no-op. Named: mtmp/cont arms + artifact_light /
  end_burn stay named (pre-existing, map-touched
  this commit).

## C ↔ JS fidelity

Against `bones.c:223–255` (csym range; commit cites
`:226–255`, 3 lines off — the body starts at 223),
branch-by-branch confirm:

- Loop order `xx` outer / `yy` inner, `isok` →
  `u_at` (hero skip) → `m_at` null-skip →
  `likes_gold||likes_gems||likes_objs||likes_magic`
  → `nmon++; if (!rn2(nmon)) selected` — verbatim,
  including the intentional no-otmp-match comment.
- Epilogue `selected && can_carry → add_to_minv`
  else `place_object` ✓. RNG arity: reservoir
  `rn2(nmon)` draws only for liking neighbours, C
  order.
- Caller (`bones.c:293–299` read): `rn2(5)` curse
  gate → mtmp / cont / `!rn2(8)` give / else place —
  JS dispatch matches; only the third arm changed.
- Disclosed deviation: JS else arm adds `stackobj`
  after `place_object`, which C lacks. This is the
  file's pre-existing convention and the exact stub
  it replaces, so the no-neighbour path is
  behavior-identical to pre-port; the port changes
  only the neighbour path (new draws + add_to_minv).
  Not a new C-wrong from this commit.

## Hallucinations / overclaim

One imprecision (not a wrong): the message calls
`m_at`/`can_carry` "new edges" with `--can` SAFE,
but `imports.mjs --can` reports ALREADY — end.js
already statically imported both modules; the commit
only extends pre-existing edges. Conclusion (safe)
holds; wording does not. The "verbatim" claim is
fair given the disclosed stackobj paragraph.

## Density

~50 insertions, one C static + one dispatch site —
one locus family, one falsifier. Right-sized.

## Verification

- `imports.mjs --rulecheck`: clean. Diff-hunk grep:
  no FORCE/DIAG/getRngLog/fastforward/seed gates
  (the single grep hit is the commit message quoting
  its own rule2 PASS, not a hunk).
- Re-measured `hidden-proxy verify
  give_to_nearby_mon --base b87c6332~1`: `4 PASS, 1
  moved past (1 re-attributed at the same step), 0
  unchanged, 0 worse → PROGRESS` — matches the D-log
  line-for-line (Barbarian-92201, Caveman-91109,
  Ranger-91139, Ranger-92151 PASS; Knight-92072
  moved at same step 150). `show` at HEAD confirms
  the residual: RNG 3422/3422 full, screens 152/153,
  kind=screen, owner-null. (One tooling wobble: the
  `--base` re-run labels the Knight move "js-throw"
  while `show` says kind=screen with no error — the
  substance, same-step re-attribution with full RNG,
  matches the D-log either way.)
- Green 2/2 + strict ×2, cohort 7/7 per D-log;
  queue no longer lists the owner (confirmed: the
  current Open rows contain no give_to_nearby_mon).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
