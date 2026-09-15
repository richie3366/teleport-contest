# Review 1270 — 4581ce02 — mklev.c mktrap dispatcher + mkmaze.c populate_maze trap loop (D-2304)

Metadata: SHA `4581ce02`, D-2304, named-deferred family (no corpus owner). Method: `git show` stat + full `js/mklev.js` diff; C `mklev.c:2001–2030` + `mklev.c:2036–2154` read directly (`csym.mjs mktrap` finds no definition — `staticfn`/plain-`void` layout — so the range is cited from the direct read); `mkmaze.c:1097–1124` read directly; `sym.mjs` on all 8 callees; `imports.mjs --rulecheck`; `hidden-proxy verify mktrap --base 4581ce02~1` re-run; diff grep for banned patterns.

## Intent vs deliverable

Subject promises: the `mktrap` dispatcher (type select + maze-aware placement) verbatim plus the `populate_maze` 6th trap loop, `js/mklev.js` only, no new cross-module edge.
Diff actually adds (`git show 4581ce02 -- js/mklev.js`, +110/−7): `traptype_roguelvl` (new), `mktrap` (new, with module-level `mktrap_err`), the `rn1(6,7)` trap loop in `populate_maze`, three `const.js` flag imports, and the omit-comment retire. Promise kept.

## Inventory

- `traptype_roguelvl` (js/mklev.js:28267) — new, local (C function is `staticfn`).
- `mktrap` (js/mklev.js:28404) — new, local (C function is `extern`, see below).
- `populate_maze` trap loop (js/mklev.js) — 2 added lines.
- `MKTRAP_NOFLAGS/SEEN/MAZEFLAG` join the existing `const.js` import (names only).

## C ↔ JS fidelity

`traptype_roguelvl` is verbatim: `rn2(7)` switch, default→BEAR_TRAP with the `/* 0 */` comment, cases 1–6 in C order — identical to C `mklev.c:2002–2030` (cross-checked via `csym.mjs traptype_roguelvl`, range `:2001–2030`).

`mktrap` walked arm-by-arm against C `mklev.c:2036–2154`: once-guard (`!tm && !croom && !(flags & MAZEFLAG)`, `mktrap_err++` once-semantics, observable no-trap behavior kept; `paniclog` write named-omitted under Rule #2 — correct, no scored-JS filesystem equivalent); `m.x=m.y=0`; kind select (specified range → `Is_rogue_level` → hellish `!rn2(5)` FIRE_TRAP → `traptype_rnd` NO_TRAP loop); `is_hole && !Can_fall_thru` → ROCKTRAP; tm-copy vs MAZEFLAG-`mazexy`/croom-`somexyspace` 200-try `occupied`/`sobj_at(BOULDER)` loop (the `else if (croom && …)` shape and the `avoid_boulder` gate match, pits/holes only); `maketrap`; tail delegated to the pre-existing live `mktrap_seen_victim`, which re-derives kind from `t->ttyp` (null → early return ≡ C's NO_TRAP skip) and matches C `:2104–2152` on every arm (WEB spider at `t` pos, SEEN, MAGIC_PORTAL `ucamefrom` dst, `gi.in_mklev` + `lvl <= rnd(4)` + SQKY_BOARD/RUST + rolling-boulder launch + `!is_pit` + `kind < HOLE || MAGIC_TRAP` victim gate with LANDMINE→PIT conversion). Branch order and RNG draws (`rn2(5)`, `traptype_rnd` loop, `rn1(6,7)`, `mazexy`/`somexyspace` draws) are call-for-call.
Callee closure (`sym.mjs`, all sync): `maketrap` trap.js:904 LIVE, `mazexy` same-module, `somexyspace` same-module pre-existing clone, `Is_rogue_level` const.js:3241 LIVE, `occupied` same-module, `sobj_at` mkobj.js:2201 LIVE, `makemon` makemon.js:3037 LIVE, `Can_fall_thru` const.js:3238 LIVE, `level_difficulty` same-module. All imports present (mklev.js:61/73/83/97/104). No new module edge — `--can` correctly skipped. `Inhell` ≡ `In_hell` (`dungeon.c:1942` reads `svd.dungeons[dnum].flags.hellish`; JS reads the same flag) and `Is_rogue_level` ≡ `Lcheck` — both equivalent.

One latent predicate note (not a C-wrong, unreachable): the tm pool/lava abort uses the module `IS_POOL || IS_LAVA` idiom (typ ∈ {POOL,MOAT,WATER,DRAWBRIDGE_UP} ∪ {LAVAPOOL,LAVAWALL}) where C `is_pool_or_lava` (`dbridge.c:76–83`) consults `is_moat`/DB_LAVA masks with an `isok` guard — outcomes differ only for a bare DRAWBRIDGE_UP `tm` with neither mask. That arm is unreachable in this commit: the sole wired caller passes `tm=null`, `mktrap` is module-local (not exported), and the `tm`-bearing `sp_lev.c:1845` caller is explicitly deferred to its own row. Flag it when that row ships; no change justified here (the same idiom already serves two live sites).

`populate_maze` loop matches `mkmaze.c:1122–1123` exactly (`rn1(6,7)`, `mktrap(0, MKTRAP_MAZEFLAG, null, null)`). It is the 6th of six stock loops (gems → boulders → minotaur → monsters → gold → traps), so the mazified-level RNG prefix is now complete rather than truncated after gold.

Two structural notes. First, the once-guard: C `:2050–2057` formats `args (%d,%d,%s,%s) are invalid` and calls `paniclog("mktrap", errbuf)`; JS keeps the `mktrap_err++` once-semantics and the observable no-trap return while omitting the log write — the only Rule #2-compatible shape, and named in the D-log. Second, `sym.mjs` reports `mktrap` NOT EXPORTED (module-local) where C declares it `extern` (`extern.h:1606`): acceptable here because the sole wired caller is same-module, and the two unwired callers (`mklev.c:985` room path, `sp_lev.c:1845` tm path) are explicitly deferred to their own rows rather than stubbed — no dispatch-with-stubbed-callee arises.

## Hallucinations / overclaim

None. The D-log Verify bullet is explicitly vacuous-honest ("NOT claimed as a corpus PASS; the row cited 0 blocks so no `--base` re-run is owed") and the "no new module edge" claim checks out against the import list. No dispatch-with-stubbed-callee: every callee in the shipped arms is LIVE or a verified same-module clone.

## Density

+110/−7 for one dispatcher + one static helper + one loop — one C locus family, one module. In-band.

## Verification

D-log: `verify --fn mktrap` full matrix PASS (syntax/rule2/hidden-vacuous/green 2/2/strict ×2/cohort 7/7/full 44/44 auto on the shared file). Re-measured by this review:

```text
verify mktrap: baseline 4581ce02~1 (scoreboard at 775e5959) —
0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Row cited 0 blocks — vacuous-honest, no `--base` debt. `imports.mjs --rulecheck` → clean. Diff grep: no FORCE/DIAG/`getRngLog`/seed/coordinate/`fastforward` reads. Full-44 cadence run follows at iteration end.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
