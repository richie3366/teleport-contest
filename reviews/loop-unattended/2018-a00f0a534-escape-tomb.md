# Review 2018 — a00f0a534 — dig.c escape_tomb + unearth_you

Metadata: SHA `a00f0a534`, D-3058, js/dig.js (+81/−~4) +
scripts/escape-tomb.test.mjs (+122, committed). Two-function
single-C-file callee closure + one ledger-stale disposition
(create_subroom, no `js/`).

## Intent vs deliverable

Subject promises "buried-hero escape pair". Diff actually adds
exported async `unearth_you` + `escape_tomb` in C order with
per-arm cites, six import edges (display/hack/monsters/const/
teleport), two const defs, and a committed 8-case node:test harness.
Matches promise.

## Inventory

- `unearth_you` (new export js/dig.js:635, async) — C dig.c:2229–2238.
- `escape_tomb` (new export js/dig.js:660, async) — C dig.c:2240–2270.
- Ledger-only: `create_subroom` → ported (stale).
- No deleted symbols, no clone→import re-points.

## C ↔ JS fidelity

`unearth_you` vs C `:2229–2238`: debugpline0 D_DEBUG-only (named ✓);
`u.uburied = 0` `:2233` ✓; `under_ground(0)` `:2234` ✓;
`!uamul || otyp != AMULET_OF_STRANGULATION → Strangled = 0`
`:2235–2236` ✓ with both the flat mirror and
`uprops[STRANGLED].intrinsic` cleared — matches the tree's
do_wear.js:3145 convention exactly ✓; `vision_recalc(0)` `:2237` ✓.
Async only for `under_ground` (§2). Verdict: exact.

`escape_tomb` vs C `:2240–2270`: debugpline0 named ✓; teleport arm
`(Teleportation || can_teleport(data)) && (Teleport_control || rn2(3)
< Luck+2)` `:2244–2245` ✓ — prop reads cover H/E/flat/uprops per the
trap.js drown convention (C macros are H||E), `Luck = uluck+moreluck`
matches you.h:464 ✓, and the `||` short-circuit preserves C's
conditional RNG draw ✓; message + `dotele(false)` `:2246–2247` ✓;
still-buried `else if (u.uburied)` `:2248` ✓; form gate
`:2251–2255` (amorphous/Passes_walls/noncorporeal/unsolid+tunneler)
✓ with `Passes_walls_prop()` reading H||E ✓; water-elemental
pointer comparison rendered as the `data?.mndx ?? u.umonnum`
index compare — required because `mons()` rebuilds objects, and the
established tree convention (apply/artifact/cmd.js) ✓; verb ternary
`:2257–2261` ✓; `dighole(TRUE,FALSE,0)` for tunnelers else TRUE
`:2264–2265` ✓; `good → unearth_you()` `:2266–2267` ✓. RNG:
single conditional `rn2(3)`, same position. Verdict: exact.

Callers: `escape_tomb` has **zero** C call sites (grep over
src+include finds only the dig.c def and extern.h:579 decl) — "no C
caller, exported unwired like C" is accurate. `unearth_you`'s only
direct C caller is escape_tomb :2267 ✓ wired. The C :2247 comment
"dotele calls unearth_you" is *not* a real call — C teleport.c
contains neither `unearth_you` nor `uburied` (verified by grep), so
there is no dotele caller to wire; JS mirrors C arm-for-arm. No
unwired-caller gap.

Callees: dotele (js/teleport.js:1984 ASYNC, awaited), under_ground
(js/display.js:5760 ASYNC, awaited), can_teleport
(js/monsters.js:963 sync), surface (js/sit.js:475 sync, pre-existing
edge), amorphous/noncorporeal/unsolid/tunnels/needspick (monsters.js),
Passes_walls_prop (js/hack.js:262) — all LIVE. `--can dig.js
teleport.js dotele` → "ALREADY statically imports", so the SAFE claim
holds trivially (no new edge). No clones, no stubs in live arms.

create_subroom stale: local def js/mklev.js:23085 + caller
`splev_coder_build_room` wired (js/mklev.js:1199) — disposition
structurally sound.

## Hallucinations / overclaim

None. "Ported but unpinned headless" for the tunneler/dighole arm is
honest (needs a live level; the harness covers the other 7 arms).
The committed test's 8/8 claim re-verified below.

## Density

Two whole dig.c functions + committed test, ~81 `js/` insertions.
Below the 200-line target but the pair is the complete callee closure
(dead-end leaf: zero C callers) — nothing more to grow. Each function
has its Ledger entry (both `ported`) and Verify line. Right-sized.

## Verification

Re-measured (`hidden-proxy.mjs verify escape_tomb,unearth_you --base
a00f0a534~1 --reach-all`): 0 blocked + 24/24 smoke REACH-OK for each
— matches the D-log, honestly vacuous (row cited 0 blocks). Re-ran
the committed harness myself: `node --test
scripts/escape-tomb.test.mjs` → 8 pass / 0 fail. Diff grep for
banned patterns: clean outside CURRENT boilerplate. No seed/step/
coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
