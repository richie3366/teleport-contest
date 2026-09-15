# Review 1289 — 0e191fab — dig.c dighole magical-trap + DRAWBRIDGE_UP + by_magic (D-2323)

Metadata: SHA `0e191fab`, D-2323, Open queue head (row cited 0 blocks). Method: `git show` full `js/` hunk (`js/dig.js` +~70/−8); C `dighole dig.c:884-1024` full body + 7 caller refs (via `csym.mjs` + `--callers`); `sym.mjs` on `d`/`explode`/`cnv_trap_obj`/`liquid_flow`/`fillholetyp`/`surface`/`is_magical_trap`/all four consts; `imports.mjs --can` (explode edge) + `--rulecheck`; C `surface dungeon.c:1749-1788` + `SURFACE_AT rm.h:146-149` + `db_under_typ dbridge.c:116-128` + `is_pool`/`is_lava`/`is_ice`/`is_moat dbridge.c:45-110` (all bodies read); added-lines banned-pattern grep (0 hits); `hidden-proxy verify dighole --base 0e191fab~1` re-run.

## Intent vs deliverable

Subject promises three `dighole` arms: magical-trap detonation, DRAWBRIDGE_UP fluid-fill, by_magic settable-trap conversion. Diff delivers all three in C position with live callees, plus the `_by_magic`→`by_magic` activation. Promise kept, with one fidelity gap below.

## Inventory

- Magical arm (after too-hard, before pool/lava): live async `explode` (new static edge) + `deltrap`/`newsym`.
- DRAWBRIDGE_UP arm (after IS_GRAVE, before IS_THRONE): `fillholetyp(FALSE)`, ROOM cop-out pline, mask bit ops, live `liquid_flow`.
- by_magic arm (after `t_at` re-read, before nohole): `LAND_MINE`/`BEARTRAP` consts + live async `cnv_trap_obj`.
- Import joins: `d` (rng.js), `cnv_trap_obj` (trap.js), `explode` (explode.js), `is_magical_trap`/`TRAP_EXPLODE`/`EXPL_MAGICAL`/`DB_MOAT`/`DB_LAVA` (const.js).

## C ↔ JS fidelity

Magical arm vs C `:905-908`: predicate, `explode(x,y,0,20+d(3,6),TRAP_EXPLODE,EXPL_MAGICAL)`, `deltrap`, `newsym` ✓. Early `return false` ≡ C `retval=FALSE` fall-through to `spot_checks` (no JS counterpart — named omit) ✓. `d`/`explode`(async awaited)/`deltrap`/`newsym` LIVE; `is_magical_trap` (`const.js:2733`) ≡ the five trap types ✓. Type-arg-0 rationale (vs zap.c `-WAN_CANCELLATION`) correct — this arm is not `maybe_explode_trap`.

DRAWBRIDGE_UP non-ROOM path vs C `:931-937`: mask clear/set `& ~DB_UNDER` / `|= LAVAPOOL?DB_LAVA:DB_MOAT` in the `|0` idiom ✓ (DB_MOAT=0 preserved, `rm.h:291`); `liquid_flow(x,y,typ,ttmp,"As you dig, the hole fills with %s!")` async awaited ✓; `return true` ✓. Branch order across the whole function matches the C else-if chain arm-for-arm (early returns stand in for else-if; reaching each arm implies all above failed on both sides).

by_magic arm vs C `:957-963`: re-read + gate + otyp select + `cnv_trap_obj(otyp,1,ttmp,TRUE)` ✓, positioned before the nohole check ✓. `LAND_MINE=243`/`BEARTRAP=244` verified non-−1; `cnv_trap_obj` async awaited ✓. Caller multiset matches C exactly: JS `(F,F)@2179/(F,T)@1287/(T,T)@1334/(T,F)@2240` vs C `:374/:1606/:1649/:433`, with shapes pairing (zap_dig u.dz FT, pitdig TT, occupation FF + conditional TF) ✓.

Per-mask walk (all measured): `SURFACE_AT` on a DRAWBRIDGE_UP cell returns `db_under_typ(mask)` — MOAT(17)/LAVAPOOL(20)/ICE(33)/STONE(0). C then walks the position arms: DB_MOAT hits `is_pool` (via `is_moat`'s explicit drawbridge-under arm) → `"water"`; DB_LAVA hits `is_lava` (explicit drawbridge-under arm, `:62-74`) → `"molten lava"`; DB_ICE hits `is_ice` (explicit drawbridge-under arm, `:86-96`) → `"ice"`. Only the degenerate default mask (STONE → falls through every arm: `IS_WALL(0)` false, `IS_ROOM(0)` false since `IS_ROOM` ≡ `≥ ROOM(25)`) agrees with the clone's `"ground"`. So the clone is wrong on all three real masks, and this arm passes it nothing else — every cop-out on a real drawbridge misprints. `fillholetyp` itself is arm-for-arm vs C `:605-637` (moat-before-pool order, `pool_cnt/=3` ≡ `(pool_cnt/3)|0`, `else if` chain ≡ early returns), so ROOM on a drawbridge is reachable whenever the fluid `rn2` rolls fail.

C-wrong (clone, new arm): the ROOM cop-out reuses the file-local `surface` clone (`dig.js:252`), but the clone diverges from C on this arm's entire input domain. C `surface` on a DRAWBRIDGE_UP cell (measured, not inferred): `SURFACE_AT` (`rm.h:146`) routes through `db_under_typ` (MOAT/LAVAPOOL/ICE), then the position arms fire — `is_pool` (via `is_moat` covering drawbridge-under-moat) → `"water"`, `is_lava` (explicit drawbridge-under-lava arm, `:62-74`) → `"molten lava"`, `is_ice` (explicit drawbridge-under-ice arm, `:86-96`) → `"ice"`. The clone returns `"ground"` for all three. So every cop-out firing on a real moat/lava/ice drawbridge prints the wrong noun (`The ground…` vs `The water/molten lava/ice…`). Reachable (fillholetyp returns ROOM whenever the fluid `rn2` rolls fail — JS `fillholetyp` itself verified arm-for-arm vs `:605-637`), message-only (no RNG downstream of the pline), 0 corpus blocks. The commit message presents the reuse as safe ("the file's existing pattern") — it is not, on drawbridge inputs. Per method, a diverging clone is a C-wrong, not a named omit. Fix is one iter: extend the clone with the three drawbridge-under cases (`is_pool`/`is_lava`/`is_ice` + `hliquid` are all in reach of `dig.js`). Adjacent pre-existing debt (not Must-fix): the clone also lacks stairs/headstone/bridge/air/maw arms for the older too-hard path — same function, fixer may port the full 40-line C body.

## Hallucinations / overclaim

One: "the ROOM cop-out pline via `surface()`" is presented as C-faithful reuse; audit proves the clone wrong on all three normal drawbridge masks. A second claim checked out: the magical arm's `explode(x,y,0,20+d(3,6),TRAP_EXPLODE,EXPL_MAGICAL)` is char-for-char C `:907` (the `-WAN_CANCELLATION` convention belongs to zap.c's `maybe_explode_trap`, not this arm), and the caller multiset JS `(F,F)/(F,T)/(T,T)/(T,F)` pairs with C `:374/:1606/:1649/:433` by shape (occupation FF + conditional TF, zap_dig u.dz FT, pitdig TT) — the rename activates the parameter without altering any call. Otherwise clean — `--can` SAFE claim checks out (`explode` is a hoisted `export async function`, same SCC, and post-commit `--can` reports ALREADY), no `--base` owed (row cited 0, re-run confirms), no-probe disclosure honest.

## Density

~70 insertions for three arms across one 141-line C body — one envelope, one falsifier. Good.

## Verification

D-log tail PASS (syntax/rule2/green 2/2/strict ×2/cohort 7/7, no D-1831 gap). Re-measured:

```text
verify dighole: baseline 0e191fab~1 (scoreboard at 775e5959) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches. Added-lines grep: 0 banned-pattern hits. `imports.mjs --rulecheck`: clean (full-tree re-run this iteration).

sym.mjs (this SHA — no deleted symbols; the only re-point is `surface`, which stays
the file-local clone and is the Actionable item above, not an import):
`d js/rng.js:126 sync`, `explode js/explode.js:417 ASYNC` (awaited, hoisted fn),
`cnv_trap_obj js/trap.js:6401 ASYNC` (awaited), `liquid_flow js/dig.js:608 ASYNC`,
`fillholetyp js/dig.js:353 sync`, `is_magical_trap js/const.js:2733 sync`
(TELEP/LEVEL_TELEP/MAGIC/ANTI_MAGIC/POLY ≡ trap.h).

## Actionable C-wrongs

1. dig.js `surface` clone prints `ground` on DRAWBRIDGE_UP cop-out; C prints water/molten lava/ice via SURFACE_AT + drawbridge-under arms — extend the clone (one iter). → Must-fix, prepended.

Verdict: **QUALITY-RISK**
