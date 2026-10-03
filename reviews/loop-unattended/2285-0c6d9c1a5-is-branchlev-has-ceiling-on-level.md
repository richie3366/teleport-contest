# Review 2285 — 0c6d9c1a5 — Is_branchlev port + has_ceiling/on_level rewires

- SHA: `0c6d9c1a5` (D-3329)
- Files: `js/dungeon.js`, `js/end.js`, `js/mklev.js`, `js/dothrow.js`,
  `js/mon.js`, `js/potion.js`, `js/trap.js`, `js/quest.js`, `js/dig.js`,
  `js/do.js`, `js/monsters.js` (+ rewire test script)
- Insertions: ~50 js/ across 11 files; 3-function dungeon.c cluster

## Intent vs deliverable

Subject promises: "`dungeon.c` Is_branchlev C-locus port +
has_ceiling/on_level clone rewires". The diff delivers exactly that: one
new live export (`Is_branchlev`), 4 `has_ceiling` clones deleted, 5
`on_level` clones deleted, edges extended, one reverted arm
(`grounded()`) left as a stub with a why-comment. No DIAG/FORCE/seed;
Rule #2 clean (iteration-wide rulecheck).

## Inventory

- `Is_branchlev`: NEW live export js/dungeon.js:2884; end.js same-name
  clone deleted (sites unchanged); mklev.js lowercase no-arg
  `is_branchlev()` deleted, 7 sites now pass `game.u?.uz` per C `&u.uz`.
- `has_ceiling`: live js/dungeon.js:1330 unchanged; 4 clones deleted
  (dothrow/mon/potion/trap incl. renamed `has_ceiling_trap`, 2 sites
  re-pointed); dothrow.js gains a new static edge, rest extend ALREADY.
- `on_level`: live js/dungeon.js:1811 unchanged; 5 clones deleted
  (quest/dig/do/potion + end.js inside the head); comment 13→7 remaining.
- `scripts/isbranchlev-rewire.test.mjs` (3 live-behavior + 3 census).
- monsters.js `grounded()`: wiring attempted, reverted (TDZ), stub kept.

## C ↔ JS fidelity

C `Is_branchlev` (dungeon.c:1463–1473): walk `svb.branches`, return
first with `on_level(lev, end1) || on_level(lev, end2)`, else 0. Live
JS: `for (const br of game.branches || [])` with the identical
end1-before-end2 short-circuit (`:1469`), `null` for C 0 — C-exact.
12 C refs (csym `--callers`): 11 call sites + decl; D-log wires 10
(bones ×2 → end.js, mklev ×3 + mkmaze ×4 → mklev.js) and names
restore.c:1256 getlev-ghostly as unwired (no `getlev` in js/restore.js
— true absence, named in map, not silent).

C `has_ceiling` (dungeon.c:1689–1698): FALSE iff `In_endgame &&
!Is_earthlevel`. Live JS (dungeon.js:1330): byte-identical predicate;
callees `In_endgame`/`Is_earthlevel` both live sync (const.js). All 4
deleted clones were the same predicate, so the rewire is behavior-
neutral at every site. Required `sym.mjs` output:

```
Is_branchlev     js/dungeon.js:2885   sync
has_ceiling      js/dungeon.js:1330   sync
on_level         js/dungeon.js:1811   sync
```

All clone-free by name at HEAD (later SHAs cleared the 7 on_level
remnants; `on_level_updown`/`on_level_dig` are distinct functions).

C `on_level` (dungeon.c:1438–1443): plain dnum+dlevel equality
(NONNULL). Live JS folds nullish via `|0`. The D-log's nullish audit
is exactly right: `!!`-guarded clones differ from live only when
BOTH args are nullish or one side is {0,0}; both non-null (the case
at every rewired site: u.uz/uz0 mid-game-set, digging.level
{0,-1}-initialized, quest dlevels ≥ 1) is identical. One unaudited
micro-shift: mklev's old clone defaulted a missing dlevel to `?? 1`,
live folds to 0 — but C never has a null `&u.uz`, so both defaults
are outside C's domain and the old `?? 1` was itself invented. Not
a C-wrong; the new shape matches C's call shape.

`grounded()` kept stub: not cycle-handwaving — the D-log reports the
static edge was added and the first `verify --fn` FAILed every
session at load (monsters→dungeon→dbridge→uhitm→monsters breaking
the uhitm.js:155 `MZ_MEDIUM` top-level read), then reverted. That is
the required top-level-TDZ evidence, empirical. Named omission with
a why-comment at monsters.js:542. `imports.mjs --can
js/monsters.js js/dungeon.js has_ceiling` confirms the cycle shape
(hoisted fn; monsters.js has 157 top-level statements reading
imported names).

## Hallucinations / overclaim

None. "Whole C body live" holds for all three (5–10 line bodies,
verified above). The verify-failed-then-reverted TDZ story is told
against the porter, not hidden.

## Density

Three-function single-C-file cluster, each function whole with its
own `Ledger:` entry and per-function Verify lines. ~50 insertions
is below the ~80 bar, defended with the D-3327/D-3328 tiny-row batch
precedent; all 6 dungeon.c queue rows shipped, nothing more Open in
the closure. No RNG in any body (pure predicates). Verify tail
pasted verbatim: syntax · rule2 · hidden-note ×3 · reach ×3 ·
green · strict · cohort 7/7 · full 44/44 (shared file changed).

## Verification

Re-measured (`hidden-proxy.mjs verify
Is_branchlev,has_ceiling,on_level --base 0c6d9c1a5~1 --reach-all`):
each 0 blocked (rows cited 0 — honestly vacuous, D-log says so) +
smoke 24/24 PASS, 0 regressed → REACH-OK ×3. Matches the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
