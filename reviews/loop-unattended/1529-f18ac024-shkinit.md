# Review 1529 — f18ac024 — shknam.c shkinit restart (D-2570)

## Metadata

- SHA: `f18ac024`
- D-id: D-2570. Next index: 1529.
- Files: `js/shknam.js` (+35/−~8: restarted `shkinit`, 3 import joins).
- C locus: `nethack-c/upstream/src/shknam.c:627–692` (`shkinit`, 66 L; `csym.mjs` range). Sole C caller `stock_room` `:733`.

## Intent vs deliverable

Subject promises: restarted `shkinit` in C order, closing two genuine live-arm gaps (`set_malign` never called; `mon_learns_traps(ALL_TRAPS)` inlined as `mtrapseen = ~0`), with DEBUG-block/assign_level/ESHK-fallback named omits. Diff delivers that. Promise matches deliverable.

## Inventory

- Restarted: `shkinit(shp, sroom)` (file-local async; `sym.mjs` single local — correct, C is `staticfn`).
- Import joins (ALREADY-edges, all `sym.mjs`-live): `set_malign` (`js/makemon.js:709`), `mon_learns_traps` (`js/monsters.js:569`), `ALL_TRAPS` (`js/const.js:2516`, −1).
- Old-vs-new: the pre-SHA body already had makemon/fail-guard/ESHK-insurance/shoproom/resident/capital/touchstone/charging/nameshk arms — the restart re-cites them and adds exactly the two advertised gaps (verified against `f18ac024~1:js/shknam.js`). No deleted symbols.

## C ↔ JS fidelity

Branch-by-branch vs C `:627–692`: good_shopdoor + `sh < 0 → -1` with the `:638–655` `#ifdef DEBUG` block as a compiled-out named omit (same return) ✓; MON_AT insurance `rloc(RLOC_NOMSG)` ✓; makemon MM_ESHK + fail → −1 ✓; `ESHK || neweshk` dead insurance — verified `js/makemon.js:3300` allocates on MM_ESHK, so it never fires on success ✓; isshk/mpeaceful + new `set_malign(shk)` (C body RNG-free — 0 `rn2/rnd/rnl` hits — so no keystream shift) + msleeping + new `mon_learns_traps(shk, ALL_TRAPS)` (JS body: `-1 → mtrapseen = ~0`, outcome-identical to the old inline, now through the live export C calls) ✓; shoproom/resident/shoptype ✓; `assign_level` inline `{dnum, dlevel}` copy — C `dungeon.c:1978` is exactly that 2-field copy ("equivalent to dest = source"), so the inline is a verified-equivalent CLONE, named with the 4-clone survey (dig/do/dungeon/potion) rather than a 5th clone ✓; shd/shk (safe-nav extension), zeroed books, `mkmonmoney(1000 + 30*rnd(100))`, rings/tools/wands/general arms with `rn2(2)`/`rn2(5)` in C order, nameshk, return sh ✓. RNG call-for-call (no new draws, as claimed). Sole caller `stock_room` awaits it (pre-existing wiring, unchanged).

## Hallucinations / overclaim

None. The "two genuine live-arm gaps" claim is exactly what the old body shows; everything else is honestly framed as re-cited context.

## Cited evidence

Old-vs-new (the two-gap proof): `f18ac024~1:js/shknam.js` `shkinit` already contained good_shopdoor/fail-guard, `MON_AT` insurance rloc, makemon/ESHK-insurance, shoproom/resident/shoptype, shoplevel copy, shd/shk, zeroed books, `mkmonmoney(1000 + 30*rnd(100))`, touchstone/charging arms, nameshk, `return sh` — and lacked exactly `set_malign(shk)` plus the `mon_learns_traps` call (it inlined `shk.mtrapseen = ~0`). The restart re-cites the former and adds the latter two. No other delta.

Equivalence + freeness checks (re-run here):

```text
set_malign       js/makemon.js:709    sync    # ALREADY-edge, live export
mon_learns_traps js/monsters.js:569   sync    # body: ttyp === -1 (ALL_TRAPS) → mtrapseen = ~0 — outcome-identical to the old inline
ALL_TRAPS        js/const.js:2516             # value -1
assign_level     4 file-local clones, no export (dig/do/dungeon/potion) — inline {dnum, dlevel} copy ≡ C dungeon.c:1978 ("equivalent to dest = source"), named, no 5th clone
set_malign C body: 0 rn2/rnd/rnl hits         # no keystream shift from the newly-wired call
MM_ESHK → neweshk always (js/makemon.js:3300) # `|| neweshk` dead insurance, verified
sole C caller shknam.c:733 stock_room         # JS stock_room awaits it — wiring pre-existing, unchanged
```

The DEBUG-block omit (`:638–655`) is genuinely compiled out (DEBUG undefined in production) with the same `return -1`; the `rn2(2)`/`rn2(5)` charging arms sit at their C `:684–687` positions, after capital `rnd(100)` — RNG call-for-call.

Verify output (re-run here):

```text
verify shkinit: baseline f18ac024~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
reach shkinit: 82 baseline-PASS session(s) reach it (82 run, 47.2s): 82 PASS, 0 regressed → REACH-OK
```

## Density

One 66-line C function, one file, ~35 insertions. Right-sized per §2b. Scoreboard hunk is a commit/at re-stamp only.

## Verification

- D-log: `verify.mjs --fn shkinit --reach-all` → PASS.
- Re-run here: `hidden-proxy.mjs verify shkinit --base f18ac024~1 --reach-all` → 0 blocked both trees (vacuous, honestly reported) + **82 baseline-PASS sessions reach it, 82 PASS, 0 regressed → REACH-OK**. Matches.
- `imports.mjs --rulecheck`: clean (re-run this iteration). Diff grep: 0 hits for FORCE/DIAG/getRngLog/fastforward.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
