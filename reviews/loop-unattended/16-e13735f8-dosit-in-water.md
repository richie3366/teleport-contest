# Review 16 — e13735f8 — dosit water/pool/gremlin in_water (D-1055)

## Metadata
- Full / short hash: `e13735f8e6a33871f6c2989dde198ba80613f593` / `e13735f8`
- Parent: `3f8469fe` (D-1054; Must-fix empty, popped Open water/pool/gremlin)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 02:25:10 +0200
- D-id: **D-1055**
- Stats: 13 files, +318 / −139 — `js/sit.js` +153 / −?, `js/monsters.js` +5, `js/dog.js` +2 (`initedog` export)
- Claims to close: Open queue `sit.c` `dosit` water/pool/gremlin sit. Stamped **Addressed:** D-1055 on the archive row **without** the short hash (chicken-egg). This review commit fills `e13735f8`.
- JS / map: `sit.js` `dosit` / `dosit_in_water` / local `split_mon`/`cloneu`; `eggs_in_water`; `c-js-map/data.md`. Cadence still **#1325** **44**/44.

## Intent vs deliverable

Git subject promises: “Match C dosit in_water so pool/gremlin sit runs after trap before sink.”

C `sit.c:400–565` has **two** water entries: (1) `else if (is_pool && !Underwater) goto in_water` and gremlin fountain/pool, **before** OBJ_AT/trap (`430–435`); (2) after trap, Underwater/waterlevel cushions/mud, then `is_pool && !eggs_in_water` with label `in_water:` (`505–525`), then `IS_SINK`. The queue line said “after trap, before sink.” The diff ships **both**, which is the C envelope, not the queue’s shorthand.

The diff **does** early-return `dosit_in_water` for pool/`!Underwater` and gremlin fountain/pool (skips picnic/trap); muddy-bottom / no-cushions; `in_water` sit + hero `split_mon`/`cloneu` + fountain `dryup`; else two `rn2(10)` `water_damage(uarm)` (pinned C second call is `uarm`, not `uarmf`).

It does **not** port sink/altar/grave/stairs/ladder/lava/ice/drawbridge, `clone_mon` monster `split_mon`, `lay_an_egg`, or `can_reach_floor`/`ustuck`. D-log names those. The subject does not claim them.

The subject’s “after trap” is the later arm. The early `goto` is **before** trap. Not a lie about the body — a compressed subject. The live C-wrong is the **Underwater** predicate (below), not the goto placement.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dosit` water arms | C function, retouched | `sit.c:430–435`, `505–525` |
| `dosit_in_water` | C `in_water:` label as helper | `sit.c:512–525` |
| `split_mon` | **clone** of `potion.c:2873–2914` | hero path; monster `clone_mon` returns null (named) |
| `cloneu` | **clone** of `mhitu.c:2616–2638` | cycle: sit cannot import `mhitu.js` |
| `initedog` | imported C callee | newly exported; `dog.c:45–88` |
| `makemon` | imported C callee | sync; `NO_MINVENT\|MM_EDOG\|MM_NOMSG` |
| `christen_monst` | imported C callee | `do_name.js`; return ignored (same object) |
| `dryup` | imported C callee, **subset** | `fountain.c:201–239`; wizard yn / `angry_guards` named omit |
| `water_damage` | imported C callee, **subset** | `trap.c:4712+`; invent plines / acid boom named omit |
| `eggs_in_water` | C macro as function | `mondata.h:78–79` |
| `is_pool` | imported C callee, **subset** | `dbridge.c:46–59`; `is_moat`/drawbridge named omit |
| `Upolyd` | pre-existing JS | `const.js` uses `mtimedone`; C `you.h:554` is `umonnum != umonster` |
| `hliquid` | imported C callee | already used for lava sit |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Dynamic `import('./makemon.js')` etc. are ESM cycles, not filesystem. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the JS hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. Local `split_mon`/`cloneu` exist because `eat←potion` / `zap←mhitu` cycles — clones, not no-ops. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### Early goto vs picnic/trap — placement matches C

C `sit.c:414–435` (after steed / hider / `can_reach_floor(FALSE)` / ustuck):

```
} else if (is_pool(u.ux, u.uy) && !Underwater) { /* water walking */
    goto in_water;
} else if (Upolyd && u.umonnum == PM_GREMLIN
           && (levl[u.ux][u.uy].typ == FOUNTAIN || is_pool(u.ux, u.uy))) {
    goto in_water;
}
```

Then a **separate** `if (OBJ_AT) … else if (trap) …`. Goto skips picnic and trap.

JS `sit.js:934–944`: `is_pool && !u.Underwater` then gremlin `FOUNTAIN \|\| is_pool`, each `dosit_in_water` + `return ECMD_TIME`. C goto then `return ECMD_TIME` at `sit.c:564`. Same skip. Gremlin + pool + Underwater: C first arm false, second true (no Underwater test on the gremlin arm) → still `in_water`. JS same. Match **if** `Underwater` means C `Underwater`.

`FOUNTAIN=28` matches `rm.h` via `const.js`. `PM_GREMLIN` is `monsterNames.indexOf('PM_GREMLIN')` (table has it). `is_pool` is POOL/MOAT/WATER (`dbridge.c:56`); C also `is_moat` (drawbridge). Pre-existing named omit on `hack.js` `is_pool`, not a new sit Must-fix.

### `in_water` body — call-for-call, including the `uarm` twice quirk

C `sit.c:512–525`:

```
You("sit in the %s.", hliquid("water"));
if (Upolyd && u.umonnum == PM_GREMLIN) {
    if (split_mon(&gy.youmonst, (struct monst *) 0)) {
        if (levl[u.ux][u.uy].typ == FOUNTAIN)
            dryup(u.ux, u.uy, TRUE);
    }
    /* splitting--or failing--protects gear from the water */
} else {
    if (!rn2(10) && uarm)
        (void) water_damage(uarm, "armor", TRUE);
    if (!rn2(10) && uarmf && uarmf->otyp != WATER_WALKING_BOOTS)
        (void) water_damage(uarm, "armor", TRUE);
}
```

JS `sit.js:897–915`: `hliquid('water')`; gremlin `split_mon(game.youmonst, null)` then `dryup(..., true)`; else `rn2(10)` + `u.uarm` then `rn2(10)` + `uarmf` otyp gate then **`water_damage(u.uarm, ...)`**. Second call is `uarm`, not `uarmf`. That is pinned C (looks like a C copy-paste). Do **not** “fix” it to `uarmf`.

RNG in the else arm: two independent `rn2(10)`. `force=TRUE` skips `water_damage`’s luck `rn2(20)` (`trap.c:4771`). Then `erode_obj(..., ERODE_RUST, EF_NONE)` may consume more. Callee is the real `trap.js` `water_damage` (D-0683 / D-0928 #1101), not a no-op. Invent grease/container plines still named omit on that function. **Not** “Match C dispatch, callee is a stub” for rust.

Gremlin path: **no** those `rn2(10)` even if `split_mon` returns null. Match.

`dryup` (`fountain.c:201–239`): `IS_FOUNTAIN && (!rn2(3) \|\| WARNED)`; town first-use warn+return; then ROOM + `nfountains--`. JS `fountain.js:638–666` is that subset. Extra `rn2(3)` on a successful gremlin fountain split. C same.

### `split_mon` / `cloneu` — hero path is C, not a no-op

C `potion.c:2873–2898` (dosit passes `mtmp=NULL` so `reason` stays empty): clamp `u.mh`; `cloneu` if `u.mh > 1`; then `mtmp2->mhpmax = u.mhmax / 2`; `u.mhmax -=`; `disp.botl`; `You("multiply%s!", reason)`.

JS `sit.js:869–890`: same empty reason for null attacker; monster arm `return null` (named `clone_mon`). dosit only calls the hero arm. Integer `/ 2` via `Math.trunc` matches C toward-zero on positive hp.

C `mhitu.c:2616–2638` `cloneu`: `u.mh <= 1` / `G_EXTINCT` → NULL; `makemon(youmonst.data, ux, uy, NO_MINVENT|MM_EDOG|MM_NOMSG)`; `mcloned=1`; `christen_monst(plname)`; `initedog(TRUE)`; `m_lev = data->mlevel`; `mhpmax = u.mhmax`; `mhp = u.mh / 2`; `u.mh -=`; `disp.botl`.

JS `sit.js:839–864`: same order. `makemon` is **sync** (`makemon.js:1978`) after `await import`. Flags `NO_MINVENT=1`, `MM_EDOG=0x800`, `MM_NOMSG=0x20000`, `G_EXTINCT=0x01` match `hack.h` / `monflag.h`. `mndx` from `youmonst.data.mndx` ≡ C `monsndx` when `data` came from `mons()`. JS `makemon` does **not** call `newedog` on `MM_EDOG` (C `makemon.c:1245–1246`); `initedog` does `if (!mtmp.edog) mtmp.edog = {}` and fills fields. Hero clone still gets an `edog`. Thin adapter, not a dead `cloneu`.

`initedog(everything=true)` is the real `dog.c` function (export-only this SHA). Pre-existing `ogoal {0,0}` vs C `-1,-1` is not this subject.

Private node mh/mhmax 20→10 matches C clone then max split. That arm is real.

### Cushions / mud / later `is_pool` — C order, dead later condition

C `sit.c:505–511`: after trap, `(Underwater \|\| Is_waterlevel) && !eggs_in_water` → waterlevel “no cushions” else “muddy bottom.” Then `is_pool && !eggs_in_water` **or** goto `in_water`.

The later `is_pool && !eggs_in_water` condition is unreachable except via goto: `is_pool && Underwater && !eggs_in_water` already took muddy. JS duplicates it after mud (`sit.js:1035–1038`). Harmless dead arm, same as C’s label landing pad.

`eggs_in_water` (`mondata.h:78–79`): `lays_eggs && mlet == S_EEL && is_swimmer`. JS `monsters.js:345–347`: `lays_eggs && mlet === 'S_EEL' && is_swimmer`. JS `mlet` is the `S_*` name string (Review 14). `M1_OVIPAROUS` / `M1_SWIM` bits match `monflag.h`. Eel in a pool, not underwater: early goto still `in_water` (C does **not** test `eggs_in_water` on the early arm). Eel underwater: skip early, skip muddy (`eggs_in_water`), skip later is_pool, fall through to having-fun. Journal’s “eel-pool in_water, eel-underwater having-fun” is the C story — **if** Underwater is live.

`Is_waterlevel` is the dungeon.h `Lcheck` helper (`const.js:2961`).

### C-wrong: `Underwater` is `u.uinwater`, not `u.Underwater`

C `youprop.h:279`: `#define Underwater (u.uinwater)`. `you.h:431`: `Bitfield(uinwater, 1)`.

JS `sit.js:935` and `1026` read `u.Underwater`. Grep of scored `js/`: **nothing writes** `u.Underwater`. Live water entry writes `u.uinwater = 1` (`trap.js:4081` `drown`). Dry-land clears `u.uinwater` (`do.js:872`). Apply’s `Underwater_hero()` is the same dead alias with a `youprop.h` comment.

Consequences for this SHA’s new control flow:

| Hero state | C | JS `u.Underwater` (always falsy) |
|------------|---|----------------------------------|
| Pool, not in water (wwalk / fly) | early `goto in_water` | early `dosit_in_water` — **match** |
| Pool, `uinwater=1` | skip early; muddy if `!eggs_in_water` | early `in_water` + two `rn2(10)` — **wrong** |
| Waterlevel cushions | `Underwater \|\| Is_waterlevel` | only `Is_waterlevel` (Underwater dead) |

Water-walking pool sit — the public-unhit path that still matters — matches because both flags are false. The muddy-bottom / “skip picnic while submerged” arms are **dead** unless a test sets the unset field.

Journal “private node … underwater mud” cannot have observed C `uinwater` through this predicate. Setting `u.Underwater = 1` in a node matches the JS bug, not C. That is overclaim of verification, not a named omit.

`drown`’s survive/wade path is still a named omit (often “You drown” after setting `uinwater`). That does **not** make the sit predicate C. When wade is ported, sit would still take the wrong arm.

This is a **clone of the wrong field**, not a deferred furniture list.

## Hallucinations / overclaim

“Match C dosit in_water so pool/gremlin sit runs after trap before sink” is **true for early goto skip-picnic, the `in_water` body, gremlin `split_mon`/`dryup`, and `water_damage(uarm)` twice.** It is **not** true that JS `Underwater` is C `Underwater`. The later “after trap” `is_pool` arm is C’s goto label, mostly dead. Stamping the Open queue item **Addressed** is fair for the water-walking / gremlin fountain envelope; it is **not** fair for muddy-bottom as C `uinwater`. Fill hash `e13735f8` in this commit.

Cadence still **#1325** 44/44 does not prove pool sit. Journal admits public **unhit**. Private pool skip-picnic and gremlin 20→10 are the right checks for those arms. Private “underwater mud” is not, unless the node wrote `uinwater`.

## Density (§2b)

One Open cluster: `dosit` water/pool/gremlin. Early goto + `in_water` + hero `split_mon`/`cloneu` + `eggs_in_water`. ~150 lines `sit.js` plus a five-line macro and an export. Right size. Not “finish sit.c.” Furniture left named on purpose. Local clones are the cycle, not a second subsystem.

## Verification

Journal: private node pool skip-picnic, underwater mud, gremlin fountain 20→10, eel-pool / eel-underwater; green+strict PASS; cohort **6**/6 (seed1500/1800/0060/0102/0360/2200). Path **thin**. Green+cohort is adequate for the water-walking arm. The underwater-mud node does not falsify `uinwater` vs `Underwater`.

This review iter did not re-run sessions (not a cadence slot; Must-fix will reopen). C read + field grep (`uinwater` writes vs `Underwater` reads) is the audit.

## Actionable C-wrongs

1. **`dosit` must use C `Underwater` (`u.uinwater`).** Replace the two new reads of `u.Underwater` (`sit.js` early `is_pool && !Underwater`, and `(Underwater \|\| Is_waterlevel) && !eggs_in_water`) with `u.uinwater` (or a one-line helper that is that bit). Do **not** “fix” every `u.Underwater` in `js/` this iter. Do **not** rewrite the second `water_damage` to `uarmf`. Do **not** drop the early pool/gremlin goto. Falsifier: `u.uinwater=1` on a pool, not an eel → muddy-bottom pline, **no** `rn2(10)` armor rolls; water-walking `uinwater=0` still `in_water`.

Named omits (map, not queue): sink/altar/grave/stairs/ladder/lava/ice/drawbridge; `clone_mon` monster `split_mon`; `lay_an_egg`; `can_reach_floor`/`ustuck`/hider; `is_pool` `is_moat`; `dryup` wizard yn / `angry_guards`; `water_damage` invent plines; JS `Upolyd` `mtimedone` vs C `umonnum != umonster`; `makemon` ignoring `MM_EDOG` (initedog still builds `edog`).

Do not restore skipped `in_water`. Do not pop furniture sit while this Must-fix is open.

## Verdict

- Verdict: **QUALITY-RISK**
- Score: **6.5 / 10**
- One sentence: `in_water` body and early pool/gremlin skip match C, including `water_damage(uarm)` twice, but both new Underwater tests read a field C does not have and JS never writes.
