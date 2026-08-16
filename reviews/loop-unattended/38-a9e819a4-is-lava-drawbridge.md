# Review 38 — a9e819a4 — `is_lava` DRAWBRIDGE_UP + `DB_LAVA` (D-1077)

## Metadata
- Full / short hash: `a9e819a4ab94506a1d32e57ca303fa883b3601ef` / `a9e819a4`
- Parent: `d0444dc2` (review **36** ACCEPT D-1075 / **37** ACCEPT-WITH-DEBT D-1076; Must-fix empty; popped Open `is_lava`). JS-touching since last `reviews/loop-unattended/` file (`37-87b4b7cb-…`, written in `d0444dc2`): **this SHA**. Docs-only companion: `9903fb6c` cadence **#1370**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 12:17:42 +0200
- D-id: **D-1077**
- Stats: 16 files, +108 / −58 — `js/hack.js` +14 / −5 (`is_lava` DRAWBRIDGE_UP arm); `js/mon.js` +8 / −5 (delete `mfndpos_is_lava`, use shared helper); `js/sit.js` comment only. Live JS is that predicate, not a new helper file.
- Claims to close: Open queue `hack.c` `is_lava` includes DRAWBRIDGE_UP + `DB_LAVA` (named from D-1060 / reviews **19**/**37**). Stamped **Addressed:** D-1077 on the archive row **without** the short hash (chicken-egg). Cadence SHA `9903fb6c` filled `a9e819a4`. Also stamped review **19** named omit and reviews **36**/**37** follow-up lines.
- JS / map: `hack.js` `is_lava`; `mon.js` `mfndpos`. `c-js-map/turns.md` names D-1077 and still omits `is_pool`/`is_moat` DRAWBRIDGE_UP+DB_MOAT. `c-js-map/data.md` sit row same. `waterbody_name` SURFACE_AT / `db_under_typ` still named.
- Prior reviews this SHA claims to close: **37** named omit 1 and **19** named omit (`hack.js` DRAWBRIDGE_UP+DB_LAVA). `reviews/loop-2026-08-15/` has no open `is_lava` Must-fix.

## Intent vs deliverable

Git subject promises: “Match C is_lava so a raised drawbridge over lava is lava, not ordinary floor.” Body is empty beyond Co-authored-by. D-log: JS `hack.js` `is_lava` treated only `LAVAPOOL`/`LAVAWALL`. C `dbridge.c` also returns true for `DRAWBRIDGE_UP` whose `drawbridgemask & DB_UNDER` is `DB_LAVA`. Sit on that cell skipped the lava arm (having-fun / throne); mfndpos treated it as non-lava.

The queue line was that shared helper, plus not leaving a LAVAPOOL-only `mfndpos` clone that would keep the old semantics. Review **37** said do **not** pull Punished `ballfall` / Sokoban air / `count_wsegs`. Review **19** said do **not** pull this into the Fire/Cold Must-fix.

The diff **does** that envelope: `is_lava` matches C (`isok`, LAVAPOOL/LAVAWALL, then DRAWBRIDGE_UP+DB_LAVA). `mon.js` `mfndpos` calls the shared helper. `sit.js` already imported `is_lava` from `hack.js` (D-1058); comment only. `minliquid` already used the import, so DRAWBRIDGE_UP lava there rides the same fix.

It does **not** port `is_pool`/`is_moat` DRAWBRIDGE_UP+DB_MOAT. Named. It does **not** rewrite `IS_LAVA(typ)` (C macro is still LAVAPOOL/LAVAWALL only — `rm.h:133` equivalent). Named. It does **not** port `clone_mon` monster `split_mon`. Correct next Open.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `hack.js` `is_lava` | C body, **retouched** | `dbridge.c:62–74`; was LAVAPOOL/LAVAWALL only |
| `mon.js` `mfndpos` lavaok gate | C call site, **retouched** | `mon.c:2258–2259`; was `mfndpos_is_lava` clone |
| `mfndpos_is_lava` | **deleted clone** | was LAVAPOOL/LAVAWALL; comment claimed cycle-avoidance, but `is_lava` was already imported for `minliquid` |
| `mfndpos_is_pool` | **kept clone** of subset `is_pool` | POOL/MOAT/WATER; DRAWBRIDGE_UP+DB_MOAT still named |
| `sit.js` `dosit` lava arm | imported C callee, **unchanged body** | `sit.c:539`; dispatch now sees DRAWBRIDGE_UP lava |
| `mon.js` `minliquid` `inlava` | imported C callee, **unchanged site** | `mon.c:971–972`; rides the helper |
| `const.js` `IS_LAVA` | C **macro**, untouched | `rm.h` LAVAPOOL\|\|LAVAWALL — not `is_lava()` |
| `is_pool` / `is_moat` | imported / local, **named omit** | DRAWBRIDGE_UP+DB_MOAT still missing |
| `trap.js` `is_pool_or_lava` | **clone** of macros | `IS_POOL`\|\|`IS_LAVA`; D-log names this class |
| `waterbody_name` / `db_under_typ` | C other helpers, **named omit** | SURFACE_AT still raw typ |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names in control flow / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. No RNG in this function (C and JS are pure predicates).

## Constitution / playbook

Grep of the `js/hack.js` / `js/mon.js` hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. `DB_LAVA=4` / `DB_UNDER=28` / `DRAWBRIDGE_UP=19` are `rm.h:75`/`291–295` and `const.js:65`/`2125–2129`, not a seed-shaped lava table. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### Shared `is_lava` — C branch order, zero RNG

C `dbridge.c:62–74`:

```
boolean
is_lava(coordxy x, coordxy y)
{
    schar ltyp;
    if (!isok(x, y))
        return FALSE;
    ltyp = levl[x][y].typ;
    if (ltyp == LAVAPOOL || ltyp == LAVAWALL
        || (ltyp == DRAWBRIDGE_UP
            && (levl[x][y].drawbridgemask & DB_UNDER) == DB_LAVA))
        return TRUE;
    return FALSE;
}
```

JS `hack.js:748–756`: `isok` then `lev = level.at`; `!lev` → false (C `levl[][]` always exists after `isok`; missing JS cell is the same false as empty typ). `ltyp = lev.typ | 0`. LAVAPOOL (20) / LAVAWALL (21) true. Else DRAWBRIDGE_UP (19) and `(drawbridgemask | 0) & DB_UNDER === DB_LAVA` (4). Parentheses match C `&` then `==`. `DRAWBRIDGE_DOWN` (34) is not UP → false (hero is on the span). `ICE` / `ROOM` / `POOL` / `isok` fail → false.

C `#define drawbridgemask flags` (`rm.h:217`). JS stores `lev.drawbridgemask` as a split field (`mklev.js` `create_drawbridge` writes `dir | (lava ? DB_LAVA : 0)`; `dbridge.js` / sit `is_ice` already read that field). Not a new alias. `DB_DIR` is bits 0–1 (`DB_DIR=3`). `(dir|DB_LAVA) & 28 == 4` still holds with or without direction, matching the private canary.

`is_ice` already had the DRAWBRIDGE_UP+`DB_ICE` arm (sit local clone, `dbridge.c:86–96`). Before this SHA, sit on UP+lava: `is_lava` false, `is_ice` false (`DB_LAVA !== DB_ICE`), `typ !== DRAWBRIDGE_DOWN` → having-fun / throne. After: lava arm (`d((Fire_resistance?2:10),10)` / likes_lava warm). That is C `sit.c:539–549`. Trap TT_LAVA remains the earlier utrap arm (D-1039). WWalking is still a C comment, not a predicate. Match.

Call-for-call (no `rn2`/`rnd`/`rn1`/`d` inside `is_lava`):

| Cell | C | JS after |
|------|---|---------|
| LAVAPOOL / LAVAWALL | true | **true** |
| DRAWBRIDGE_UP + `DB_LAVA` (± `DB_DIR`) | true | **true** |
| DRAWBRIDGE_UP + ICE / MOAT / FLOOR | false | **false** |
| DRAWBRIDGE_DOWN + `DB_LAVA` | false | **false** |
| ICE / ROOM / POOL / `!isok` | false | **false** |

### `mfndpos` — C uses `is_lava()`, not `IS_LAVA`

C `mon.c:2256–2259`:

```
            if ((!lavaok || !(flag & ALLOW_WALL)) && ntyp == LAVAWALL)
                continue;
            if ((poolok || is_pool(nx, ny) == wantpool)
                && (lavaok || !is_lava(nx, ny))) {
```

JS `mon.js:1288–1295` keeps the LAVAWALL `ntyp` skip, then `lavaok || !is_lava(nx, ny)`. Previous `mfndpos_is_lava` was LAVAPOOL/LAVAWALL only, so a non-`lavaok` monster **was allowed** onto DRAWBRIDGE_UP+DB_LAVA (treated as ordinary floor). C `continue`s. This SHA closes that. `lavaok = m_in_air || likes_lava` (`mon.c:2168`) is unchanged.

`mfndpos_is_pool` still POOL/MOAT/WATER. C `is_pool` also `is_moat` → DRAWBRIDGE_UP+DB_MOAT (`dbridge.c:46–58`/`100–113`, juiblex skip). Named. Do not steal `split_mon` for it. Classify: **deleted diverging clone of `is_lava`**; pool clone left as a named omit, not a silent new clone.

`minliquid` (`mon.c:971–972` / `mon.js:1113–1114`) already called imported `is_lava`. Flyer/floater skip unchanged. DRAWBRIDGE_UP lava now sets `inlava` like C. Named minliquid omits (gremlin `split_mon`, iron-golem rust, steed Flying/Lev) are unchanged and not this Open line.

No new `hack.js`↔`mon.js` cycle: `is_lava` was already imported at `mon.js:51`.

### Sit caller — predicate only; dice stay in the lava arm

C `sit.c:539–549` is `else if (is_lava(u.ux, u.uy))` then sit_message / `burn_away_slime` / likes_lava warm `return` / else `d((Fire_resistance?2:10),10)`. JS `sit.js:1327–1343` is that body (D-1058/D-1060). This SHA does not retouch Fire/Cold `uprops[]` (already D-1060). Zero RNG inside `is_lava`; the first gameplay `d()` on this path is still the burn arm after likes_lava is false. DRAWBRIDGE_DOWN remains a later `typ == DRAWBRIDGE_DOWN` arm, so a **lowered** bridge over lava still sits as `"drawbridge"` in both (C `sit.c:554–555`). Match.

### Who writes the mask this predicate reads

C `dbridge.c` `create_drawbridge` / open/close set `levl[x][y].drawbridgemask` (flags overlay). JS `mklev.js:9835–9841` closed: `typ = DRAWBRIDGE_UP`, `drawbridgemask = dir | (lava ? DB_LAVA : 0)` where `lava` is **current** `typ === LAVAPOOL` before the morph. Open path is DRAWBRIDGE_DOWN (this SHA correctly stays false). `dbridge.js` open/close already read `drawbridgemask & DB_UNDER`. Sit `is_ice` uses the same field for `DB_ICE`. The new lava test is the same overlay, not a second mask invented for D-1077.

`hack.js` `u_simple_floortyp` (`hack.js:847`): grounded `is_lava` → return `LAVAPOOL`. C `hack.c` same collapse (under-typ lava reports as pool-of-lava for the simple floor word). DRAWBRIDGE_UP+DB_LAVA now takes that arm instead of ROOM. No RNG.

### `IS_LAVA` vs `is_lava` — C distinction, now observable in JS

C `IS_LAVA(typ)` is LAVAPOOL\|\|LAVAWALL (`rm.h`). C `is_lava(x,y)` adds DRAWBRIDGE_UP+DB_LAVA. Before this SHA, JS had collapsed them (both missed the bridge). After, they match C’s split.

Sites that C calls `is_lava()` and JS already imported `hack.js` `is_lava` (`sit.js` `dosit`, `hack.js` `u_simple_floortyp` / `swim_move_danger` / `pooleffects`, `do.js`, `apply.js` `is_pool_or_lava_apply`, `eat.js`/`dig.js` wrappers, `monmove.js`/`dogmove.js`) now see the bridge. Honest.

Sites that C calls `is_lava()` and JS still uses `IS_LAVA(typ)` remain named, not this queue line: `teleport.c` `goodpos` (`teleport.c:150` / `:174` vs `teleport.js:174` / `:185` / `:190`). `IS_POOL(DRAWBRIDGE_UP)` is true for **every** raised bridge (`rm.h:129` range POOL..DRAWBRIDGE_UP), so JS `goodpos` classifies UP+lava as **pool** (swimmer arm) before the lava arm. That predates D-1077 (`IS_POOL` always included typ 19). D-log names “`is_pool_or_lava` clones that use `IS_LAVA`”; `goodpos` is the same macro-vs-function class. Map / Open later, not Must-fix against the shared helper.

`trap.js` `is_pool_or_lava` (`IS_POOL`\|\|`IS_LAVA`): UP+lava is already true via `IS_POOL`. Boolean matches C `is_pool_or_lava` on lava-under; ICE/FLOOR under still over-accept (pre-existing). Named.

## Hallucinations / overclaim

“Match C is_lava so a raised drawbridge over lava is lava, not ordinary floor” is **true for the shared helper, for `dosit` (imported callee), for `mfndpos` lavaok, and for `minliquid`**. It is **not** true that `is_pool`/`is_moat` see DRAWBRIDGE_UP+DB_MOAT, that `goodpos` uses `is_lava()` instead of `IS_LAVA`/`IS_POOL`, or that `waterbody_name` prints lava via `SURFACE_AT`.

This is **not** “Match C dispatch, callee is a stub.” The previous helper **was** a subset of C. This SHA replaces the missing arm with C’s mask test. `mfndpos_is_lava` **was** a diverging clone and is deleted. `dosit` lava body (`burn_away_slime` / `likes_lava` / `d(2|10,10)`) is the existing D-1058/D-1060 callee, not a new no-op.

Stamping the Open item **Addressed:** D-1077 is fair for the helper + mfndpos. Hash `a9e819a4` is on the archive row (filled by `9903fb6c`).

## Density (§2b)

One Open cluster: C `dbridge.c` `is_lava` body plus the `mfndpos` clone that would have left a second LAVAPOOL-only implementation. Review **37** named this, not `is_pool` / Punished ball / `split_mon`. ~20 executable lines — small, but it **is** the whole C function (13 lines) plus deleting the clone. Not “one deferred `if` in sit only” and not “finish `dbridge.c`.” Two JS files that already called each other (`mon←hack` via `minliquid`). Sibling `is_pool`/`is_moat` juiblex+DB_MOAT left named on purpose (`DB_MOAT=0` is a different mask pitfall).

## Verification

Journal: private canary (LAVAPOOL/LAVAWALL true; UP+DB_LAVA true with/without DB_DIR; UP+ICE/MOAT/FLOOR false; DOWN+DB_LAVA false; ICE/ROOM/POOL/`isok` fail false); green+strict seed8000/0900; cohort **15**/15 (8000/0900/1500/1800/0060/0102/0700/0017/0106/0107/4500/0014/0360/2200/0009) + strict 0014/4500/0360/2200. Path **public-unhit** on public DRAWBRIDGE_UP lava. Green+cohort is regression cover for the shared helper (walk-into-lava / mfndpos), not a public raised-bridge-sit proof. Cadence **#1370** (`9903fb6c`) **44**/44 after this SHA.

C read of `dbridge.c:46–113`, `rm.h:75`/`129`/`217`/`291–295`, `sit.c:539–555`, `mon.c:971–972`/`2168`/`2256–2259`, `teleport.c:134–175`; JS `hack.js:738–756`, `mon.js:51`/`76–80`/`1111–1114`/`1288–1295`, `sit.js:117`/`1327`, `const.js:65`/`2098–2129`, `teleport.js:167–191`; hunk grepped FORCE/fs/seed.

## Actionable C-wrongs

None that Must-fix this next iter. The shared `is_lava` mask test and the deleted `mfndpos` clone match C at the locus this SHA claimed.

Named omits / do-nots (map / Open, not Must-fix):

1. **`sit.c` `split_mon` monster `clone_mon` arm** — **Addressed:** D-1078 `c7dcd80a`. Do not pull `is_pool` DRAWBRIDGE_UP / `goodpos` `IS_LAVA` / Punished `ballfall` this next iter.
2. `hack.js` `is_pool` / `is_moat` DRAWBRIDGE_UP+`DB_MOAT` (C `dbridge.c:46–58`/`100–113`; juiblex skip; `DB_MOAT=0`). `mfndpos_is_pool` is the same subset. **Addressed:** D-1090
3. `teleport.c` `goodpos` still `IS_POOL`/`IS_LAVA` macros vs C `is_pool()`/`is_lava()` (`teleport.c:134–175`). Pre-existing; UP+lava takes the JS pool arm.
4. `trap.js` `is_pool_or_lava` macros; `waterbody_name` SURFACE_AT; `db_under_typ`.

Do not restore `is_lava` LAVAPOOL/LAVAWALL-only. Do not restore `mfndpos_is_lava`. Do not treat `IS_LAVA(typ)` as `is_lava(x,y)`. Do not add a WWalking predicate to sit lava. Do not put trailing `confdir` inside shared `getdir`.

## Docs-only companion — `9903fb6c` cadence #1370

Subject: “Refresh cadence #1370 full-suite score so CURRENT.md matches the measured 44/44 fortress.” Stats: 8 docs files, +42 / −26. No `js/`. Score **44**/44 Scr **11405**/11405 RNG **100%** speed `31+0.27/turn` (R² 0.87). Filled Addressed hash `a9e819a4` on D-1077 archive + reviews **19**/**36**/**37**. Queue 9 Open, no refill. Not a port. Not a FAIL peel. Fortress measurement after the shared-helper change, not proof of public DRAWBRIDGE_UP lava.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: shared `hack.js` `is_lava` now returns true for DRAWBRIDGE_UP+`DB_LAVA` like C `dbridge.c`, and `mfndpos` uses that helper instead of a LAVAPOOL-only clone, while `is_pool`/`is_moat` and `goodpos` macros stay named.
- Must-fix stays empty; next port pops Open `sit.c` `split_mon` monster `clone_mon` arm. **Addressed:** D-1078 `c7dcd80a`
