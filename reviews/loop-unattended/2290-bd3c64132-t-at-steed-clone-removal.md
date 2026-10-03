# Review 2290 — bd3c64132 — t_at steed.js clone removal

- SHA: `bd3c64132` (D-3334)
- Files: `js/steed.js` (+ new tat-steed rewire test)
- Insertions: ~5 js/; single-symbol sole-site rewire

## Intent vs deliverable

Subject promises: "`trap.c` t_at steed.js clone removal (sole site
→ live js/trap.js export)". The diff delivers exactly that: one
clone deleted, the sole site re-pointed to the ALREADY-imported
`t_at as trap_t_at` (no new edge), one C-cite comment. No
DIAG/FORCE/seed; Rule #2 clean (iteration-wide rulecheck).

## Inventory

- `t_at`: deleted steed.js `game.ftrap`-walking clone (sole site:
  landing_spot kn_trap read) → live trap.js:1119.

## C ↔ JS fidelity

C `t_at` (trap.c:6501–6512): walk the trap chain, return the trap
at (x,y), else 0. Live JS (trap.js:1119, read in full): walk
`game.level.traps` (null-level guard), same match, `null` on miss
— the canonical JS rendering of C's single `gf.ftrap` list. The
deleted clone walked legacy `game.ftrap`, which maketrap only
syncs secondarily (trap.js:1411) and which is null in fresh games
— so the clone returned null where C returns the trap, and
`kn_trap` at the steed.c:545 site never fired. Genuine C-wrong,
now fixed; the delta is disclosed and pinned by live-export
hit/miss/null-level test cases. The other direct `game.ftrap`
walks (end.js ×2, dogmove.js) are pre-existing and out of cluster.
Required `sym.mjs` output:

```
t_at             js/trap.js:1119   sync
```

Clone-free — the sole-definer census claim holds.

## Hallucinations / overclaim

None. "Whole C body live" holds (12-line body, verified). "No new
edge" is true (alias import pre-existed at steed.js:60).

## Density

Single-symbol sole-site rewire; ~5 insertions below the bar,
defended (head's C file holds no further Open rows). `Ledger:`
t_at entry; per-function Verify line present. No RNG in the body.
Gates per D-log: syntax · rule2 · hidden-note · reach · green ·
strict · cohort · skip full (single leaf file — correct call).

## Verification

Re-measured (`hidden-proxy.mjs verify t_at --base bd3c64132~1
--reach-all`): 0 blocked (row cited 0 — honestly vacuous, D-log
says so) + smoke 24/24 PASS, 0 regressed → REACH-OK. Matches.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
