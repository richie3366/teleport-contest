# Review 1727 — 72249caf4 — reverse_loot whole-body port (D-2768)

- SHA: `72249caf4` (`pickup.c` reverse_loot + doloot_core Confusion arm, D-2768)
- Files: `js/pickup.js` (+137/−7), docs
- Queue row: Open (coverage MISSING), 0 corpus blocks cited
- Banned grep: 0 hits. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises the confused-#loot misfire and the `doloot_core`
Confusion arm wired. Diff adds module-local `reverse_loot` (C
staticfn) and replaces the named-omit comment in `doloot_core` with the
C `:2202–2209` block. Promise kept.

## Inventory

| JS symbol | Class | C / sym.mjs |
|-----------|-------|-------------|
| `reverse_loot` (local, async) | C body | `pickup.c:2349–2426` (csym) |
| `doloot_core` Confusion block | C caller arm | `pickup.c:2202–2209` (sole caller `:2203`) |
| `doloot_Confusion` | pre-existing file-local predicate | C `Confusion`; `sym.mjs Confusion` → not exported, 6 clones elsewhere; not added here |
| `inv_cnt`, `remove_worn_item` | LIVE | `steal.js`; `remove_worn_item js/steal.js:269 ASYNC` |
| `prinv`, `freeinv`, `doname` | LIVE imports | `invent.js:7724 ASYNC`, `invent.js:8443 sync` |
| `splitobj`, `g_at`, `add_to_minv`, `add_to_container`, `weight` | LIVE | `mkobj.js` (sync) |
| `dropx` | LIVE | `do.js:2407 ASYNC` |
| `makemon`, `courtmon` | LIVE | `makemon.js:3186 sync`, `mklev.js:27027 sync` |
| `boxlock` | LIVE | `lock.js:1423 ASYNC` |
| `SetVoice`, `verbalize`, `dist2` | LIVE | `sndprocs.js:52`, display.js, hacklib.js |

Nothing deleted or re-pointed.

## C ↔ JS fidelity

- Caller `:2202–2209`: placed after the `nohands` return and before
  `cc = u.ux/u.uy`, as in C ✓. `rn2(6) && reverse_loot()` short-circuit
  order ✓, then `rn2(2)` + "Being confused, you find nothing to loot." +
  ECMD_TIME ✓, fallthrough otherwise ✓.
- `!rn2(3)` arm: `n = inv_cnt(TRUE)`, per-object `!rn2(n+1)` then `--n`
  ✓, prinv "You find old loot:" ✓, FALSE off the end ✓. Order: C walks
  `gi.invent`; with default `invlet_constant`, `addinv` calls
  `reorder_invent` (`invent.c:1117–1121`), so the invlet-sorted JS array
  matches the chain.
- Gold arm: first COIN_CLASS, `rnd(5)` once, `(rnd*quan+4)/5` floor
  (positive long division) ✓, split only when `< quan` ✓, break ✓;
  `!goldob` → FALSE ✓; `remove_worn_item(goldob, FALSE)` ✓.
- Off-throne: `dropx` then `g_at` pline ✓.
- Throne: `fobj` scan, `otyp == CHEST`, `spe == 2` break, nearest by
  `distu` ≡ `dist2(ox, oy, u.ux, u.uy)` with strict `<` ✓. In C the
  loop variable is `coffers`, NULL after a full walk, so `!coffers` →
  `otmp`; the JS separates the two names but reaches the same value ✓.
- Coffers arm: SetVoice → verbalize → freeinv → add_to_container → owt
  → `cknown = 0` → `!olocked` boxlock with a zeroed dummy whose otyp is
  SPE_WIZARD_LOCK; JS `boxlock` switches on `otmp.otyp` only, so the
  `{ otyp }` dummy is sufficient ✓.
- Exchequer: `looted != T_LOOTED` is tested before `makemon(courtmon())`,
  so courtmon/makemon RNG is skipped when looted, as in C ✓; freeinv,
  add_to_minv, pline, `!rn2(10)` → T_LOOTED ✓. Final else: "You drop
  %s." + dropx ✓.
- RNG sequence call-for-call: rn2(6), rn2(3), rn2(n+1)*, rnd(5),
  [courtmon/makemon], rn2(10), rn2(2) — same order as C.

## Hallucinations / overclaim

None. The confused-loot arm is a behavior change in a shared command;
the D-log records a full 44/44 re-run.

## Density

~130 JS lines for a 78-line C body and its caller arm: right-sized.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify reverse_loot --base
72249caf4~1 --reach-all`:
- `0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)`
- `smoke … 24 run, 3.0s: 24 PASS, 0 regressed → REACH-OK`

Matches the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
