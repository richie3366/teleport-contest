# Review 1478 — 31bd0727 — mklev.c makerooms whole body (D-2519)

Metadata: SHA `31bd0727`, `js/mklev.js` (+91/−28). Coverage THIN → live. NN 1478.

## Intent vs deliverable

Subject promises whole-body `makerooms` (`:366–436`) closing five thin-body gaps (load gate, pre/post hooks, `else create_room` arm, guarded reset, return-ignored). Diff actually restarts the function with all five plus the `themerooms_generate` no-pick `impossible`. Matches the promise; single module, no new cross-module edge.

## Inventory

Changed JS: `makerooms` restarted; new locals `pre_themerooms_generate` (empty, debug-env body named) / `post_themerooms_generate` (empty per `themerms.lua:1006–1008`); no-pick path calls `impossible`. No symbols deleted or re-pointed.

## C ↔ JS fidelity

Checked against pinned C `mklev.c:366–436` (`csym` range), arm by arm:

- `:369–370` inits ✓. `:373` themes handle ⇔ `g._luathemes_loaded[dnum]` — verified the marker is real: `makelevel_ordinary` (`js/mklev.js:24263`) marks once per branch with the nhlib shuffle before calling `makerooms()`, so themes is always truthy here and the `else create_room` arm is a dead-but-live fallback, exactly as described. ✓
- Pre block `:392–399`: `create_des_coder` named (memset already inside `reset_xystart_size`), `in_lua` named (error-message flag, no counterpart), hook order kept ✓.
- Loop `:403`, vault arm `:404–410` unchanged ✓. Themed arm `:412–421`: pcall return ignored, break on `themeroom_failed` alone with the tries/nroom gates — the old `!ok ||` break (a real C-wrong: C never checks the return) fixed ✓. Else `:422–424` `create_room(-1×6,OROOM,-1)` with break-on-false (C's `break;;` included) ✓.
- Post `:428–435`: `reset_xystart_size` now guarded by `themes` (old unconditional call fixed) + empty post hook with the set/clear wrapper mirroring C `:413/:417`-style order ✓.
- No-pick `impossible('no eligible themed rooms?')` per `themerms.lua:975–978`, still returning false with the flag clear so the loop does not break — as C ✓. `depth_of_level` re-read per iteration is a pure read, no RNG shift.

Callee closure: all same-file locals or already-imported (`rn2`, `rnd_rect`, `OROOM`, `impossible`); lua runtime + `create_des_coder` + `in_lua` + THEMERM/THEMERMFILL named (architecture/debug). No clones, no stubs, no FORCE/DIAG/coords/seeds.

## Evidence detail

Marker evidence: `makelevel_ordinary` at `js/mklev.js:24263` marks `g._luathemes_loaded[dnum] = true` once per branch (with the `themerms.lua:382–388` nhlib align shuffle) immediately before `await makerooms()`. So by the time `makerooms` evaluates `const themes = … === true`, it is always true on every level — the `:422–424` `else create_room` arm is dead-but-live fallback, exactly as the message states, and `reset_xystart_size` always runs in practice (the guard matters for architectural correctness, not current behavior).

The old C-wrong, precisely: the thin body did `const ok = await themerooms_generate(difficulty); if (!ok || g.themeroom_failed)` — breaking the whole room loop on a falsy return. C (`:412–421`) never reads the pcall return; only `gt.themeroom_failed` (map-placement miss) breaks, gated by tries/nroom. The lua no-pick path (`themerms.lua:975–978`) calls impossible and returns with the flag clear — under the old code a no-pick would have aborted room generation; now it continues, as C. The new `await impossible('no eligible themed rooms?')` hunk preserves the lua observable.

`themeroom_tries` is still declared and only bumped in the themed arm, as C. `depth_of_level(g.u?.uz)` re-evaluated per iteration is a pure state read (no RNG), replacing the hoisted `difficulty` const with no behavioral delta. Scoreboard hunk in this commit is again only the verify refresh (commit pointer + timestamp).

## Hallucinations / overclaim

None. "0 blocked" presented as a coverage gap with the vacuous note; 481/481 reproduced below.

## Density

Right-sized: one 71-line C function, one module.

## Verification

- Re-ran `hidden-proxy.mjs verify makerooms --base 31bd0727~1 --reach-all`: 0 blocked (vacuous, correctly labeled) + reach 481 baseline-PASS sessions reach it, 481 PASS, 0 regressed → REACH-OK. Matches the D-log exactly (both the 80-sample and the 481 reach-all lines).
- The 481 reach figure is the strongest corpus evidence in this audit batch: nearly every baseline-PASS session executes `makerooms` during level generation, so REACH-OK here means the restarted loop, vault arm, and themed arm produce byte-identical level-gen streams across the whole corpus.
- RNG audit: `rnd_rect()` loop condition and the `rn2(2)` vault gate are untouched (vault arm hunk is context-only); the restart adds no draws — the load gate, pre/post hooks, and break-condition fixes are all RNG-free. `themeroom_tries` gating (`> 10` post-increment) matches C's `themeroom_tries++ > 10` short-circuit position inside the `&&` chain.
- Named-item check: `create_des_coder` (SpLev_Map memset already in `reset_xystart_size :1449`), `iflags.in_lua` (error-message flag only), and the lua runtime are architecture-level omits, each cited in-code at the exact arm where C would call them — not silent stubs.
- D-log cites green 2/2, strict ×2, cohort 7/7, full 44/44.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
