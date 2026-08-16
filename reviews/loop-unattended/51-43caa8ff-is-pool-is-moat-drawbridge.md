# Review 51 — 43caa8ff — `is_pool` / `is_moat` DRAWBRIDGE_UP+`DB_MOAT` (D-1090)

## Metadata
- Full / short hash: `43caa8ff0add38550fba8133b6253447dcb0e63d` / `43caa8ff`
- Parent: `f91650c0` (D-1089). JS-touching since last dedicated review file creation (`8bb7d93f`): D-1089, **this SHA**, D-1091, D-1092. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 16:59:43 +0200
- D-id: **D-1090**
- Stats: 16 files, +125 / −55 — `js/hack.js` +37 / −4 (`is_pool` + new `is_moat`); `js/mon.js` −6 local `mfndpos_is_pool`; `js/dig.js` / `js/zap.js` drop local `is_moat`; `js/sit.js` comment.
- Claims to close: Open queue `dbridge.c` `is_pool` / `is_moat` DRAWBRIDGE_UP + `DB_MOAT` (named from D-1077). Not `is_lava`. Review **38** named omit 2. Stamped **Addressed:** D-1090 `43caa8ff` on the archive row (filled by D-1091). Also stamped review **38** item 2. `reviews/loop-2026-08-15/` has no open is_pool Must-fix.
- JS / map: `hack.js` `is_pool` / `is_moat`; `mon.js` `mfndpos`; `dig.js` / `zap.js` import. `c-js-map` names D-1090. `goodpos` macros later D-1091. `waterbody_name` SURFACE_AT / `db_under_typ` still named (live Open).
- Prior reviews this SHA claims to close: **38** item 2. Review **48** said do not pop `is_pool` instead of Antimagic — Antimagic already shipped D-1089.

## Intent vs deliverable

Git subject promises: “Match C dbridge.c is_pool/is_moat so a raised drawbridge over water is a pool/moat, except Juiblex swamp.”

The queue line was those two C functions plus the juiblex/`DB_MOAT=0` pitfall. Not `is_lava` (D-1077). Not `goodpos` macros. Not `waterbody_name`.

The diff **does** that envelope: shared `hack.js` `is_pool` is `POOL \|\| MOAT \|\| WATER \|\| is_moat()`; `is_moat` is juiblex-false then `MOAT` or `DRAWBRIDGE_UP` whose `(drawbridgemask & DB_UNDER) == DB_MOAT`. `mon.js` `mfndpos` uses `is_pool` (deleted `mfndpos_is_pool` POOL/MOAT/WATER-only clone). `dig.js` / `zap.js` import the shared `is_moat` (zap’s old clone skipped juiblex **and** drawbridge; dig skipped juiblex but only `MOAT` terrain).

It does **not** retouch `is_lava` (already D-1077). It does **not** switch `teleport.js` `goodpos` off `IS_POOL`/`IS_LAVA` (next SHA). It does **not** port `db_under_typ` or `waterbody_name` `SURFACE_AT`. Named. `display.js` `covers_objects` still uses `IS_POOL` (D-0846); that is a different caller, not a leftover `is_moat` clone.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `is_pool` | C body, **retouched** | `dbridge.c:46–58` |
| `is_moat` | C body, **ported** to hack.js | `dbridge.c:100–113`; was dig/zap clones |
| `is_lava` | C sibling, **untouched** | D-1077 |
| `mfndpos_is_pool` | **deleted clone** | was POOL/MOAT/WATER-only |
| dig.js / zap.js local `is_moat` | **deleted clones** | now import shared |
| `is_pool_or_lava` (dig.js) | wrapper, **retouched comment** | already `is_pool \|\| is_lava` |
| `Is_juiblex_level` | C callee, **imported** | `const.js:2994–2998` |
| `DB_MOAT` / `DB_UNDER` | C macros, **imported** | `const.js` 0 / 28 = `rm.h:291`/`295` |
| `waterbody_name` | C sibling, **untouched** | still raw typ; live Open |
| `db_under_typ` | C sibling, **absent** | live Open |
| trap.js / makemon hideunder `IS_POOL` | **other clones** | named |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. Zero RNG in these helpers.

## Constitution / playbook

Grep of the `js/hack.js` / `js/mon.js` / `js/dig.js` / `js/zap.js` hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. `DB_MOAT=0` is `rm.h`, not a seed bridge coordinate. Contest Rule #2: no Node builtins.

## C ↔ JS fidelity

### `is_moat` — juiblex, then MOAT or UP+`DB_MOAT=0`

C `dbridge.c:100–113`:

```
    if (!isok(x, y))
        return FALSE;
    ltyp = levl[x][y].typ;
    if (!Is_juiblex_level(&u.uz)
        && (ltyp == MOAT
            || (ltyp == DRAWBRIDGE_UP
                && (levl[x][y].drawbridgemask & DB_UNDER) == DB_MOAT)))
        return TRUE;
    return FALSE;
```

C `rm.h:291–295`: `DB_MOAT 0`, `DB_LAVA 4`, `DB_ICE 8`, `DB_FLOOR 16`, `DB_UNDER 28`. JS `const.js:2125–2129` same.

JS `hack.js:771–783`: `!isok` then `!lev` false; `!Is_juiblex_level(game.u?.uz)` then `ltyp === MOAT` or `DRAWBRIDGE_UP && ((drawbridgemask|0) & DB_UNDER) === DB_MOAT`. Parens around the mask test are required (`DB_MOAT` is 0). Match.

`Is_juiblex_level(uz)` (`const.js:2994–2998`) compares `uz.dnum/dlevel` to `game.juiblex_level`. C `Is_juiblex_level(&u.uz)`. Passing `game.u?.uz` is the same pair. Missing `juiblex_level` → false → moats behave as moats (C off-juiblex). Match.

Juiblex `MOAT` terrain: `is_moat` false. Juiblex `DRAWBRIDGE_UP+DB_MOAT`: `is_moat` false. Non-juiblex `MOAT`: true. Non-juiblex UP+`DB_MOAT` (mask `& 28 == 0`): true, including a zeroed mask — **C encoding**, same as D-1077’s named `DB_MOAT=0` pitfall. UP+`DB_LAVA` (`& 28 == 4`): not moat. UP+`DB_ICE`/`DB_FLOOR`: not moat. `DRAWBRIDGE_DOWN`: not moat (typ is not UP). Match.

### `is_pool` — MOAT is not redundant with `is_moat`

C `dbridge.c:46–58`:

```
    if (ltyp == POOL || ltyp == MOAT || ltyp == WATER || is_moat(x, y))
        return TRUE;
```

Comment in C: Juiblex has MOATs that `is_moat` rejects; `ltyp == MOAT` keeps them pools.

JS `hack.js:740–751`: same four disjuncts, same comment. Juiblex `MOAT`: `is_moat` false, `ltyp === MOAT` true → **pool**. Juiblex UP+`DB_MOAT`: both false (typ is not POOL/MOAT/WATER) → **not pool**. Non-juiblex UP+`DB_MOAT`: `is_moat` true → **pool**. `POOL`/`WATER` never need `is_moat`. Match.

`is_lava` unchanged: LAVAPOOL/LAVAWALL or UP+`DB_LAVA`. Journal canary: D-1077 lava still true. A cell cannot be both moat-under and lava-under (`DB_UNDER` is one of 0/4/8/16). Callers already on the shared helpers (`sit.js` `dosit` `in_water` / lava sit, `mon.js` `minliquid`) pick up UP+moat without a sit-local retouch — sit’s diff is comment-only, which is correct (it already imported `is_pool`).

`isok` then missing cell: C after `isok` always has `levl[x][y]`. JS `!lev` returns false. Same defensive extra as D-1077 `is_lava`. In-bounds play cells have a `typ`.

### Deleted clones — `mfndpos` / dig / zap

C `mon.c:2258` / `2376`: `is_pool(nx,ny) == wantpool` and eel `nexttry` `!is_pool(x,y)`. Old JS `mfndpos_is_pool` was POOL/MOAT/WATER only — raised moat was land for eels. New JS calls shared `is_pool`. Match for the claimed helper. `is_lava` already shared (D-1077).

dig.js old `is_moat`: juiblex skip, `typ === MOAT` only. zap.js old `is_moat`: **no** juiblex skip, `typ === MOAT` only. Shared helper is C for both. Zap freeze on juiblex swamp is no longer a moat — C `is_moat` never is. That is a C fix, not a regression vs C.

dig.js `is_pool_or_lava` already wrapped `is_pool \|\| is_lava`; comment now says the wrappers ride the shared helpers. After this SHA those wrappers see UP+moat / UP+lava. Match `dbridge.c:76–83`.

### `waterbody_name` / hideunder — named, not this subject

`hack.js:790–809` `waterbody_name` still switches raw `typ` (POOL/MOAT/LAVAPOOL/ICE). C `pager.c` uses `SURFACE_AT` → `db_under_typ` for a raised bridge. Live Open. Not this SHA.

`makemon.js` inline `hideunder` still `!IS_POOL(typ) && !IS_LAVA(typ)`. C `mon.c:4762` `!is_pool_or_lava(x,y)`. `IS_POOL` includes every `DRAWBRIDGE_UP` (`rm.h:129`), so JS refuses hide on UP+floor where C would allow it. Pre-existing; D-1091 D-log names `hideunder typ macros`. trap.js `is_pool_or_lava` same macros. Named.

### Callers already on shared `is_pool`

`sit.js` `dosit` `in_water` and lava sit already imported `hack.js` `is_pool`/`is_lava` (D-1055/D-1077). This SHA does not retouch those call sites; UP+moat now takes the water sit path the same way C `is_pool` would. `minliquid` already used shared `is_pool` after D-1077’s lava work.

## Hallucinations / overclaim

“Match C dbridge.c is_pool/is_moat so a raised drawbridge over water is a pool/moat, except Juiblex swamp” is **true for the shared helpers and for mfndpos/dig/zap after deleting the clones.** It is **not** true that `goodpos` uses those helpers (next SHA), that `waterbody_name` prints the under-typ, or that hideunder/`covers_objects` stopped using `IS_POOL`.

This is **not** “Match C dispatch, callee is a stub.” The previous helpers **were** subsets of C. This SHA replaces the missing UP+`DB_MOAT` arm and the juiblex split. `mfndpos_is_pool` **was** a diverging clone and is deleted.

Stamping **Addressed:** D-1090 is fair for the Open line. Hash `43caa8ff` is on the archive row (filled by `278521f1`).

## Density (§2b)

One Open cluster: C `dbridge.c` `is_pool` + `is_moat` plus the clones that would have left a second POOL/MOAT/WATER-only implementation. Review **38** named this, not `goodpos` / `waterbody_name`. ~40 executable lines across two files that already called each other (`mon←hack` via `minliquid`/`mfndpos`) plus two import retargets. Not “one deferred `if` in sit only” and not “finish `dbridge.c`.” Sibling `is_ice` drawbridge arm and `db_under_typ` left named — density smell like D-1088’s ninja arm, not a shipped C-wrong of the claimed gates.

## Verification

Journal: private canary **41**/41 (POOL/MOAT/WATER; UP+`DB_MOAT` with/without `DB_DIR`; UP+LAVA/ICE/FLOOR false; DOWN+MOAT false; juiblex MOAT pool-not-moat / UP+MOAT neither; `!isok` / missing cell; D-1077 lava still true); green+strict seed8000/0900; cohort **13**/13 (1500/1800/0060/0102/0700/0017/0106/0107/4500/0014/0360/2200/0009) + strict 0014/4500/0360/2200. Path **public-unhit** on public DRAWBRIDGE_UP moat. Cadence **#1390** **44**/44 — fortress, not a public raised-bridge-sit proof.

C read of `dbridge.c:46–113`, `rm.h:75`/`129`/`291–295`, `mon.c:2258`/`2376`/`4746`/`4762`; JS `hack.js:740–783`, `mon.js:51`/`1284–1381`, `dig.js:221–223`, `zap.js` import, `const.js:2098–2129`/`2994–2998`. Hunk grepped FORCE/fs/seed.

| Cell | C `is_pool` | C `is_moat` | JS after D-1090 |
|------|-------------|-------------|-----------------|
| `MOAT` | true | true (off juiblex) | **same** |
| Juiblex `MOAT` | true | false | **same** |
| UP+`DB_MOAT` | true | true (off juiblex) | **same** |
| Juiblex UP+`DB_MOAT` | false | false | **same** |
| UP+`DB_LAVA` | false | false | **same** (`is_lava` true) |
| `POOL`/`WATER` | true | false | **same** |

## Actionable C-wrongs

None that Must-fix this next iter. The shared `is_pool`/`is_moat` mask tests and the deleted clones match C at the locus this SHA claimed.

Named omits / do-nots (map / Open, not Must-fix):

1. `teleport.c` `goodpos` `IS_POOL`/`IS_LAVA` macros **Addressed:** D-1091 `278521f1`.
2. `dbridge.c` `db_under_typ` / `hack.c` `waterbody_name` `SURFACE_AT` **Addressed:** D-1103
3. trap.js / eat.js / apply.js / makemon hideunder `is_pool_or_lava` typ macros (`IS_POOL` includes every `DRAWBRIDGE_UP`).
4. `is_ice` DRAWBRIDGE_UP+`DB_ICE` still local in `zap.js` (C `dbridge.c:86–97`).

Do not restore `is_pool` POOL/MOAT/WATER-only. Do not restore `mfndpos_is_pool`. Do not treat `IS_POOL(typ)` as `is_pool(x,y)`. Do not drop the juiblex `ltyp == MOAT` disjunct. Do not treat `DB_MOAT=0` as “mask unset means not a moat.”

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: shared `hack.js` `is_pool`/`is_moat` now match `dbridge.c` including DRAWBRIDGE_UP+`DB_MOAT` and Juiblex swamp-not-moat, and `mfndpos`/dig/zap no longer keep POOL/MOAT-only clones, while `goodpos` macros and `waterbody_name` stay named.
- Must-fix stays empty for this SHA; next port after D-1091/D-1092 pops Open `dogmove.c` pal/target numeric `ptr.msound`.
