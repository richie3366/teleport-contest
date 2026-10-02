# Review 2273 — 1f248868c — mon sextet (mondied gate)

Metadata: SHA `1f248868c8058a86744870d90c57103118d483d1`
(D-3317, 2026-10-02). `js/mhitm.js` (+7/−2: the mondied gate +
2 import names on pre-existing edges).
`scripts/mondied-corpse-gate.test.mjs` (new). 4 stale-complete
+ 1 split bookings, no `js/` delta. Cluster of 6, one C file.

Intent vs deliverable: subject promises the mondied corpse-gate
head + 4 stale-complete + pacify_guard split. The diff ports the
:3258–3260 gate in C order over two live imports and retires the
named omit; the five bookings add no code. Delivers the shape it
promises.

Inventory (per function):

- `mondied` — js/mhitm.js:3980–3986: gate added; `accessible`
  (monmove.js:840) + `is_pool` (hack.js:2080) names added to
  existing import lines (no new edges).
- `mgender_from_permonst` — stale-complete, js/makemon.js:1557
  (read, not trusted).
- `pm_to_cham` — stale-complete, js/makemon.js:1116 (read).
- `set_mon_min_mhpmax` — stale-complete, js/mhitm.js:3540
  module-local (read).
- `pacify_guard` — split: arm live in `pacify_guards`
  js/shk.js:2012/:2016, called at :2027 + :5023 (read).
- `egg_type_from_parent` — stale-complete, js/mon.js:852 (read).
- Nothing deleted or re-pointed; no re-point `sym.mjs` owed.

**C ↔ JS fidelity** (per function):

- `mondied` (mon.c:3252–3263): mondead → lifesaved return →
  `corpse_chance(mdef, 0, FALSE) && (accessible||is_pool)` →
  `make_corpse(mdef, CORPSTAT_NONE)`. JS keeps `(mhp|0)>0`
  ≡ !DEADMONSTER ✓, runs `corpse_chance` first so its draws
  precede the gate exactly as in C's short-circuit `&&` ✓,
  and gates on the same disjunction over live exports ✓.
  Defaults: `corpse_chance(mon, magr=null, was_swallowed=false)`
  ≡ C (0, FALSE) ✓; `make_corpse(mtmp, CORPSTAT_NONE)` ✓.
  Callers: C's 15 code sites map to wired JS calls — spot-
  checked do.c:90→do.js:1012 ✓, mon.c:1002→mon.js:2881 ✓,
  mon.c:3403→mhitm.js:4022 ✓; muse.c:1996 verified inside
  `#if 0` (:1956) ✓ correctly unwired. Confirm.
- `mgender_from_permonst` (mon.c:5255–5272): male→FALSE,
  female→TRUE, else-if-!neuter `!rn2(10)` vampire-gated flip.
  JS matches arm-for-arm including the `is_vampire(mdat)` /
  `is_vampshifter(mtmp)` argument split and the single
  short-circuited `rn2(10)` ✓. Confirm.
- `pm_to_cham` (mon.c:534–546): `ismnum && is_shapeshifter`
  → mndx else NON_PM. JS range check ≡ ismnum, same callee,
  same default ✓. Confirm.
- `set_mon_min_mhpmax` (mon.c:2806–2823, staticfn →
  module-local ✓): m_lev+1 floor then caller-minimum floor,
  in C order ✓. Confirm.
- `pacify_guard` (mon.c:5762–5767, staticfn): `is_watch →
  mpeaceful=1`; sole C use is `iter_mons(pacify_guard)` in
  `pacify_guards` (:5770–5773, read). JS inlines the exact
  arm at shk.js:2016 inside `pacify_guards`, called from both
  C-cited callers (make_happy_shoppers :2027, home_shk :5023)
  ✓. The dead/offmap skips are the pre-existing D-1540 port
  shape, out of this SHA's scope. Confirm.
- `egg_type_from_parent` (mon.c:5568–5580):
  `force_ordinary || !BREEDER_EGG` with BREEDER_EGG ≡
  `(!rn2(77))` (mon.c:5538), i.e. `force_ordinary || rn2(77)`.
  JS is exactly that with C's short-circuit (roll skipped
  when forced) and both maps (queen→bee, winged→gargoyle) ✓.
  Confirm.

Hallucinations / overclaim: none. The muse.c `#if 0` and the
read.c second-site clone are both disclosed rather than hidden;
the "imports.mjs ALREADY" claim is structural (names added to
existing import lines — visible in the diff).

Density: 6 whole functions, one C file — within §10.17. Below
~80 insertions, defended as the mon.c closure set. Each function
has its own `Ledger:` entry (5× ported + 1 split — correct
granularity) and its own Verify sub-bullet. All six confirm.

Verification: D-log claims 6× vacuous note + REACH-OK (mgender
80/80 spread sample), cluster gates, focused test 3/3 (2/1
pre-fix). Re-measured in one call: `hidden-proxy.mjs verify
<all six> --base 1f248868c~1 --reach-all` → every function "0
blocked (0 at baseline, 0 in working)" + explicit vacuous note;
mgender ran the full 90 reachers under --reach-all: "90 run:
90 PASS, 0 regressed → REACH-OK" (stronger than the D-log's
spread sample, consistent with it); the other five "smoke (24
run): 24 PASS, 0 regressed → REACH-OK". Queue cited 0 — vacuous
legitimate. I ran the new test: 3 pass, 0 fail. Diff grep: no
FORCE/DIAG/getRngLog/seed/fastforward/coordinates. Rule #2
covered iteration-wide.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
