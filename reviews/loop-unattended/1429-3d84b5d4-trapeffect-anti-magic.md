# Review 1429 — 3d84b5d4 — trapeffect_anti_magic whole-body port (D-2470)

Metadata: SHA `3d84b5d4`, `js/trap.js` only (151 ins). C
`trap.c:2322–2450` (129 L). D-log: D-2470.

## Intent vs deliverable

Promise: whole `trapeffect_anti_magic` in C order (iron-shoes
drain, hero implosion + energy split, monster mspec/damage) +
`case ANTI_MAGIC` wire. Diff ships that plus a file-local
`attacktype` and import widening. Queue side-effect is a legit
refill (2 popped, 5 measured rows appended verbatim, 1 STALE park).

## Inventory

- Added: module-local `async trapeffect_anti_magic` (C staticfn —
  local scope correct) + module-local `attacktype`.
- Wired: `case ANTI_MAGIC` in `trapeffect_selector` after
  MAGIC_TRAP (= C `:2978` dispatch neighborhood).
- Edges: AT_MAGC/AT_BREA (mhitm.js), is_art/defends_when_carried
  (artifact.js), ART_MAGICBANE (generated), COST_DECHNT (const.js),
  is_quest_artifact (quest.js) — all LIVE.
- `sym.mjs` (required): `attacktype` = 9th file-local copy, **no
  shared exporter exists** — the ban is on cloning an existing
  export, so a disclosed file-local (muse/polyself/eat precedent)
  is the only option; body (mattk aatyp scan) matches C.
  `monkilled` call resolves to the pre-existing file-local
  (`js/trap.js:1184`, established port; live export at
  mhitm.js:3279 untouched). `which_armor` file-local (`:3560`,
  worn.c port) used for monsters only.

## C ↔ JS fidelity

- Iron shoes: guard + fetch use **identical** hero/monster-split
  expressions (`u.uarmf` vs `which_armor(W_ARMF)` — mirrors the
  pre-existing `wearing_iron_shoes`, so the fetched `shoes` is the
  tested object, non-null past the guard); hero-only seetrap +
  lethargic pline + `costly_alteration(COST_DECHNT)`; both arms
  `spe -= 1` + `update_inventory` + `Trap_Effect_Finished` — exact.
- Hero: seetrap; `Antimagic_prop()` implosion with `rnd(4)` +
  Half_phys/Half_spell `rnd(4)` + Magicbane `rnd(4)` + carried
  non-quest `defends(AD_MAGM)` `rnd(4)` + `Passes_walls`
  `((d+3)/4)|0` quartering, all in C order; torpid/lethargic/
  sluggish thresholds with int-divided `hp/4`; `losehp` +
  `KILLED_BY_AN`; `finish_hero_losehp` gate preserves C's
  losehp-death longjmp past the drain code (pit idiom) — exact.
- Drain: `d(2,6)`, `halfd = rnd(drain/2)` int-divided,
  `uenmax > drain` gifts halfd with `exclaim_it`,
  `drain_en(drain, exclaim_it)` — exact incl. the `[was halfd]`
  comment.
- Monster: `in_sight`/`see_it`/`mptr` preamble exact;
  `!resists_magm` → `!mcan && (AT_MAGC || AT_BREA)` →
  `mspec_used += d(2,6)`, in-sight seetrap + lethargic pline —
  exact; resists arm: MON_WEP-Magicbane `rnd(4)` (no quest
  exclusion, = C), minvent `defends(AD_MAGM)` `rnd(4)` (no quest
  exclusion, = C — correctly differs from the hero arm;
  `mtmp.minvent` is a genuine nobj chain, so this walk is
  correct), quartering, `mhp -= dmg`, `mhp<=0` (= DEADMONSTER) →
  `monkilled(compression, -AD_MAGM)` then re-test for `trapkilled`
  (preserves C's life-save double-check), `see_it → newsym`
  inside the resists arm — exact. Return chain + terminal
  `Finished` — exact.
- RNG walked call-for-call elsewhere; nothing added, no
  seed/coordinate logic in the diff.
- **C-wrong — hero carried-artifact scan is dead code.**
  `for (otmp = game.invent; otmp; otmp = otmp.nobj)` mechanically
  ports C's `gi.invent` walk, but `game.invent` is a JS **array**
  by architecture (`js/invent.js:369`: "Invent is a JS array;
  floor/minvent/cobj stay nobj chains (D-1691)"; 10 other
  `game.invent` sites in this same file use `(game.invent ||
  [])`). On an array the loop body runs once against the array
  itself (`.oartifact` undefined → no match → `.nobj` undefined
  → exit): the carried non-quest `defends(AD_MAGM)` `rnd(4)` can
  never fire, and C's conditional draw never happens (RNG + damage
  divergence whenever the state holds). Same dead pattern
  pre-exists at `trap.js:1721` (`trap_immune` RUST_TRAP,
  `is_you ? game.invent : …` walked via `.nobj`) — co-fix site,
  same one-line idiom swap.

## Hallucinations / overclaim

"Carried non-quest `defends(AD_MAGM)` `rnd(4)`" is listed as
shipped, but the scan loop cannot execute against the array-model
invent — a claimed-live arm that never fires. The D-log's callee
accounting is otherwise accurate.

## Density

One 129-line C function + wire, one module: right-sized.

## Verification

- `hidden-proxy verify trapeffect_anti_magic --base 3d84b5d4~1
  --reach-all` (re-run): 0 blocked both sides — vacuous, as the
  D-log states ("no corpus session blocked"). Smoke 24/24 →
  REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward.

## Actionable C-wrongs

1. (Must-fix, queued) nobj-chain walk over array-model
   `game.invent` — `trap.js:5169` hero carried-artifact scan (this
   SHA) + `trap.js:1721` `trap_immune` RUST sibling; swap both to
   the `(game.invent || [])` array idiom.

Verdict: **QUALITY-RISK**

**Addressed:** D-2477
