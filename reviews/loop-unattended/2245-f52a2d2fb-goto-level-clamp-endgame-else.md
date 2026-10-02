# Review 2245 — f52a2d2fb — goto_level clamp + endgame + else

Metadata: SHA `f52a2d2fb0a43416667d323c00919f3caeaf8a68` (D-3284,
2026-10-02). `js/do.js` (clamp + endgame arm +
else-fix) and `js/cmd.js` (+wizardOn export). One
function: `goto_level` (C do.c:1478–1998).

Intent vs deliverable: subject promises the entry
clamp + endgame-entry arm + plain-else arrival. The
diff adds all three in C order/position plus the
wizardOn export. Delivers what it promises; retires
D-3277's explicitly-deferred `else if (!at_stairs)`
gap one SHA later, as foreshadowed.

Inventory:

- Entry clamp (do.js:1664): `if (dunlev(newlevel) >
  dunlevs_in_dungeon(newlevel)) newlevel.dlevel =
  ...` — after up/dist/newdungeon/was_in_W_tower
  captures, before the newdungeon block.
- Endgame arm (do.js:1671): `In_endgame(newlevel)`
  first in `if (newdungeon)`: no-Amulet plain
  return; non-wizard Earth redirect; tutorial arms
  follow as elifs.
- Arrival (do.js:2168): `else if (!at_stairs)` →
  plain `else` (falling sub-arm untouched).
- `wizardOn` (cmd.js:158): local → `export`;
  do→cmd edge pre-existed.
- No clone deleted or re-pointed → no required
  `sym.mjs` paste; ran anyway: `wizardOn`
  cmd.js:158 sync, single, zero clones; `In_endgame`
  const.js:3242 sync; `In_tutorial` live ✓.

**C ↔ JS fidelity**: clamp ≡ C do.c:1501–1502
verbatim, in C position (verified JS computes
up/dist/newdungeon before it, like C's declaration
inits — `dist` exists, comment accurate) ✓.
Endgame arm ≡ C :1504–1508 (D-log cites :1504–1509,
:1509 being the `} else if` line — 1-line boundary
trivia): no-Amulet return with no message ✓,
`wizard` bypass ✓ (wizardOn honors the established
flags.wizard/game.wizard aliases cmd.js itself
sets — canonical reader, not a superset), Earth
redirect via same-file assign_level with no
up/newdungeon recompute, like C ✓ (game.earth_level
shape established + potion.js:1819 precedent).
Arrival chain now ≡ C :1722/:1746/:1803 exactly
(portal / `at_stairs && !In_endgame` / plain else)
— verified both chain heads, not just the else ✓.
No RNG in any hunk (gates + assignment).
Stale relobj retirement (ledger-only): spot-checked
— isgd-gold arm inline mhitm.js:3703–3710 +
relobj_on_death; split row carries the proof ✓.

Hallucinations / overclaim: none. "No up/newdungeon
recompute, like C" is accurate (C assigns newlevel
in place and continues).

Density: 3-arm completion (sub-80), exception
documented. `Ledger: goto_level partial; relobj
split …` + Verify ✓.

Verification: D-log Verify shows VERIFY: PASS +
reach 33/33 + green/strict/cohort/full 44/44.
Re-measured (`hidden-proxy.mjs verify goto_level
--base f52a2d2fb~1 --reach-all`): 0 blocked (rows
cited none — honest) + reach 33/33 → REACH-OK.
Zero regressed. Banned-pattern grep: clean. Rule #2
clean (2238).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
