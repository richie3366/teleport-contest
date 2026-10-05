# Review 2387 — 1dd2365ef — D-3449 zap/engrave + bypass/which_armor switches

Metadata: SHA `1dd2365ef`, D-3449, Open head ×4. js/ +8/−51 (5 files)
+ worn-rewire test (new) + resists-blnd census update.

## Intent vs deliverable

Subject promises four switches to live whole exports: (a) zap
flashburn → resists_blnd; (b) engrave doblind inline gate →
resists_blnd; (c) zap bypass_obj clone → worn.js export; (d) sit
which_armor clone → worn.js export. The diff delivers exactly that:
three deletions + one in-place gate swap, imports extended, docs and
test censuses updated. No scope drift.

## Inventory

| Site | C locus |
|---|---|
| zap.js flashburn gate | zap.c:3062 |
| engrave.js doengrave doblind gate | engrave.c:1248 |
| zap.js bypass_obj ×2 call sites (polyspot/cobj loops) | worn.c:1118–1123; callers zap.c:285, :2065 |
| sit.js steed-saddle lookup | worn.c:1006–1036; caller sit.c:624 |

## C ↔ JS fidelity

(a) C zap.c:3062 `if (!resists_blnd(&gy.youmonst))` — JS now calls the
live whole export (review 2385) on `game.youmonst`. Exact; the deleted
subset lacked EXPL/GAZE + Sunsword arms.

(b) C engrave.c:1248 `if (de->doblind && !resists_blnd(&gy.youmonst))`
— JS `if (de.doblind && !resists_blnd(game.youmonst))`. Exact; the
inline `!(Blind()\|\|u.Unaware)` lacked the same arms.

(c) C worn.c:1118–1123 sets `obj->bypass = 1` AND `context.bypasses =
TRUE`. Live js/worn.js:714 does both (plus a `game.context`
existence guard — C's `svc` always exists; harmless). The deleted zap
clone did the same two writes plus a null guard. "Dead null guard"
claim verified true: both JS call sites (zap.js:4222 nobj loop,
zap.js:5319 `while (obj.cobj)`) pass provably non-null, mirroring C
zap.c:285/:2065 loop shapes. No behavior delta possible.

(d) Live js/worn.js:472 walked against C worn.c:1006–1036: youmonst
7-slot table + `impossible("bad flag…")` default, monster nobj-chain
scan for the owornmask bit. Whole (plus a null guard C lacks — safe:
returns C's 0-shape). Sit caller: C sit.c:624 `u.usteed && !rn2(4) &&
which_armor(u.usteed, W_SADDLE) && !cursed` — JS preserves order
(RNG before the lookup, which draws nothing). Bonus: the deleted sit
clone iterated `mtmp?.minvent` array-style (`for...of`), but monster
minvent in JS is an nobj chain (cf. zap.js:4221) — the clone threw on
any steed with inventory; the live export is the first working port
of this call.

sym.mjs (required paste, current tree — D-3451 already removed the
rest):

```text
bypass_obj       js/worn.js:714   sync
which_armor      js/worn.js:472   sync
```

Single canonical definitions; no clones remain. At this SHA the
trap/weapon/steed/mklev which_armor clones remained as disclosed
queued rows (shipped by D-3451, next review). `imports.mjs --can
sit.js worn.js which_armor` → ALREADY (D-log said NEW edge — the edge
already existed, so the claim is conservative, not wrong; hoisted fn
either way). Diff grep: no FORCE/DIAG/RNG/seed/coordinate reads.

## Hallucinations / overclaim

None material. The "NEW sit→worn edge" line is stale (edge
pre-existed) but the SAFE conclusion holds. Rewire suites pass 6/6
on the current tree.

## Density

≤10-function SHA, whole Method per row (4 switches, C bodies + both
callers per callee read). Ledger + Verify lines cover resists_blnd /
bypass_obj / which_armor (one Verify bullet for three C functions in
a 4-site switch commit — acceptable, each named). No Left-open. No
Must-fix bundled (override disclosed, head still queued).

## Verification

Re-measured (`--base 1dd2365ef~1 --reach-all`): 3× vacuous (0 blocked
at baseline — disclosed: "rows cited none") + 3× smoke REACH-OK
24/24, 0 regressed. Claim true. (Full 44/44 re-checked by this
audit's cadence score.)

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
