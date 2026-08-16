# Review 19 — 27f0a233 — dosit lava/ice/DRAWBRIDGE_DOWN sit (D-1058)

## Metadata
- Full / short hash: `27f0a2335b5819a933f38a6371484393593ea06d` / `27f0a233`
- Parent: `e09bdb06` (review 17–18 ACCEPT; Must-fix empty; popped Open lava/ice/drawbridge)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 03:21:03 +0200
- D-id: **D-1058**
- Stats: 10 files, +167 / −49 — `js/sit.js` +80 (three terrain arms + `Fire_resistance` / `Cold_resistance` / local `is_ice`)
- Claims to close: Open queue `sit.c` `dosit` lava / ice / drawbridge sit (terrain, not trap-lava D-1039). Stamped **Addressed:** D-1058 `27f0a233` on the archive row in the **next** SHA (`c0d5279a`) — hash present, not chicken-egg.
- JS / map: `sit.js` `dosit` lava/ice/`DRAWBRIDGE_DOWN`; `c-js-map/data.md` names `hack.js` `is_lava` DRAWBRIDGE_UP+DB_LAVA. Cadence **#1335** this review iter **44**/44.

## Intent vs deliverable

Git subject promises: “Match C dosit lava/ice/drawbridge sit so WWalking lava and ice sit before throne.”

C `sit.c:539–555` is three `else if` arms after furniture / before `IS_THRONE`. The queue line listed exactly those three and said terrain, not trap TT_LAVA. The diff ships **those three**, including lava `burn_away_slime` + `likes_lava` warm vs `d((Fire_resistance?2:10),10)` `"sitting on lava"`, ice `!Cold_resistance` pline, and DRAWBRIDGE_DOWN `"drawbridge"`. It does **not** retouch the D-1039 TT_LAVA arm (`d(2,10)` + `rnd(4)` + `"sitting in lava"`). D-log names that split. The subject does not claim trap lava.

It does **not** port `lay_an_egg`, steed `mon_nam`, `can_reach_floor` / ustuck / hider, or expand shared `hack.js` `is_lava` to DRAWBRIDGE_UP+DB_LAVA. The last is named in the D-log and the map. Honest for that helper. The Fire/Cold clones are not.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dosit` `is_lava` arm | C function, new arm | `sit.c:539–549`; comment “must be WWalking” is not a predicate |
| `dosit` `is_ice` arm | C function, new arm | `sit.c:550–553` |
| `dosit` `DRAWBRIDGE_DOWN` | C function, new arm | `sit.c:554–555` literal `"drawbridge"` |
| `is_lava` | imported C callee, **subset** | `dbridge.c:62–73`; `hack.js:746–750` LAVAPOOL/LAVAWALL only |
| `is_ice` | **clone** of `dbridge.c:86–96` | local; ICE or DRAWBRIDGE_UP+DB_ICE (matches C; `zap.js` already has this) |
| `Fire_resistance()` | **clone** of `youprop.h:26–28` | **diverges** — H\|\|E flats, not `uprops[FIRE_RES]` |
| `Cold_resistance()` | **clone** of `youprop.h:30–32` | same storage miss |
| `likes_lava` | imported C callee | `mondata.h:190–191`; `monsters.js:369–372` mndx |
| `burn_away_slime` | imported C callee | `timeout.c:448–453`; `timeout.js:563–568` |
| `hliquid` | imported C callee | `do_name.c:1493–1509`; display RNG only |
| `You_sit_message` | pre-existing clone of `You(sit_message)` | D-1057 |
| `sit_losehp` | pre-existing wrapper of `losehp` | `hack.c` + `maybe_wail` / `done` |
| `d` | imported C callee | `rng.js:98–106`; `d(n,x)` = n×`RND(x)` |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/sit.js` hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. Hardcoded `"ice"` / `"drawbridge"` are C `defsyms[S_ice].explanation` / the DRAWBRIDGE_DOWN literal, not seed furniture. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### Order: after furniture, before throne; trap lava still first

C `sit.c:539–557` (after ladder, before `lay_an_egg`):

```
} else if (is_lava(u.ux, u.uy)) {
    /* must be WWalking */
    You(sit_message, hliquid("lava"));
    burn_away_slime();
    if (likes_lava(gy.youmonst.data)) {
        pline_The("%s feels warm.", hliquid("lava"));
        return ECMD_TIME;
    }
    pline_The("%s burns you!", hliquid("lava"));
    losehp(d((Fire_resistance ? 2 : 10), 10),
           "sitting on lava", KILLED_BY);
} else if (is_ice(u.ux, u.uy)) {
    You(sit_message, defsyms[S_ice].explanation);
    if (!Cold_resistance)
        pline_The("ice feels cold.");
} else if (typ == DRAWBRIDGE_DOWN) {
    You(sit_message, "drawbridge");
} else if (IS_THRONE(typ)) {
```

JS `sit.js:1127–1157`: three `if` + `return ECMD_TIME` in that order, then the pre-existing throne arm. C `else if` vs JS `if`+return is the same skip. Trap / OBJ_AT / water / furniture still sit **before** these arms (D-1039 / D-1055 / D-1057). A lava **trap** (`utraptype == TT_LAVA`) still takes `sit.js:1058–1064` (`rnd(4)` + `d(2,10)` + `"sitting in lava"`; `burn_away_slime` only if `Slimed`). Terrain lava always calls `burn_away_slime` (C `timeout.c:450` no-ops when `!Slimed`). Match for that split.

`typ` is `game.level.at(u.ux,u.uy).typ`. `ICE=33`, `DRAWBRIDGE_DOWN=34`, `DRAWBRIDGE_UP=19`, `LAVAPOOL=20`, `LAVAWALL=21` match `rm.h:75–90`. `DB_ICE=8`, `DB_UNDER=28` match `rm.h:293–295`. `KILLED_BY` is the existing sit import.

WWalking is a C comment, not an `if`. JS does not add a WWalking gate. Flying on a lava tile still takes this arm in both. Match.

### Lava body — callees are real; dice formula is C **if** Fire_resistance is C

`You_sit_message(hliquid('lava'))` ≡ `You(sit_message, hliquid("lava"))` → `"You sit on the lava."` (or a hallu liquid). C then `burn_away_slime()` always. JS `await burn_away_slime()` is `timeout.js:563–568`: `if (u.Slimed) make_slimed(0, "The slime that covers you is burned away!")`. C `timeout.c:448–453` the same. **Not** a stub.

`likes_lava`: C pointer `ptr == &mons[PM_FIRE_ELEMENTAL] \|\| ptr == &mons[PM_SALAMANDER]`. JS `mndx === PM_FIRE_ELEMENTAL \|\| mndx === PM_SALAMANDER`. `youmonst.data` carries `mndx` from `mons()`. Warm path: `pline_The("%s feels warm.", hliquid("lava"))` → JS ``The ${hliquid('lava')} feels warm.`` Then `return ECMD_TIME` with **no** `d()`. Burn path: `pline_The("%s burns you!", …)` then `losehp(d((Fire_resistance?2:10),10), "sitting on lava", KILLED_BY)`. JS `sit_losehp` + the same killer string. `d(n,10)` is n inner `RND(10)` (`hack.h` / `rng.js:98–106`). Fire_resistance true → **2** dice; false → **10**. Call-for-call **once the boolean is C**.

Hallu `hliquid` uses `rn2_on_display_rng`, not gameplay `rn2`. C `do_name.c:1496–1509` the same. Sit_message + warm is two `hliquid` calls; sit_message + burns is two. Match.

### Ice / DRAWBRIDGE_DOWN strings

C `defsym.h:137` `S_ice` desc `"ice"`. JS `'ice'`. Not `S_ice` glyph. C DRAWBRIDGE_DOWN passes the literal `"drawbridge"`, not defsyms lowered/raised. JS does. `pline_The("ice feels cold.")` → `"The ice feels cold."` JS that string. No RNG on either arm. Match **if** `Cold_resistance` is C.

Local `is_ice` (`sit.js:495–501`) is C `dbridge.c:86–96` without a separate `isok` (off-map `level.at` is falsy → false). Includes DRAWBRIDGE_UP+`DB_ICE`. `zap.js:388–395` is the same clone. Not a diverging ice clone.

### `is_lava` — imported subset, named

C `dbridge.c:62–73`: `LAVAPOOL` / `LAVAWALL` / (`DRAWBRIDGE_UP` && `(drawbridgemask & DB_UNDER)==DB_LAVA`). JS `hack.js:746–750`: first two only; comment says drawbridge-under deferred. D-1058 imported that helper and **named** the gap. DRAWBRIDGE_UP over lava: C lava arm (`d(2|10,10)`); JS `is_lava` false, `is_ice` false, `typ !== DRAWBRIDGE_DOWN` → having-fun. Asymmetric with the local ice clone, which **does** include drawbridge-under. Named omit on a pre-existing shared helper, not a silent new clone. Do not pull it into the Fire_resistance Must-fix.

### C-wrong: `Fire_resistance` / `Cold_resistance` are the wrong storage

C `youprop.h:26–32`:

```
#define HFire_resistance u.uprops[FIRE_RES].intrinsic
#define EFire_resistance u.uprops[FIRE_RES].extrinsic
#define Fire_resistance (HFire_resistance || EFire_resistance)
```

`FIRE_RES=1`, `COLD_RES=2` (`prop.h:15–16`; `const.js:2334–2335`). There is no `u.Fire_resistance` member. Extrinsic fire resistance from a worn ring / dragon-scale mail **is** `uprops[FIRE_RES].extrinsic`.

JS `sit.js:477–488` (this SHA):

```
function Fire_resistance() {
    const u = game.u || {};
    return !!((u.Fire_resistance) || (u.HFire_resistance | 0)
        || (u.EFire_resistance | 0));
}
```

Same shape for Cold. `sit.js` already imports `FIRE_RES` / `COLD_RES` and never reads `u.uprops[FIRE_RES]`.

JS wear path `do_wear.js:261–288` `confer_oc_oprop`: writes `u.uprops[p].extrinsic` for **every** `oc_oprop`, and mirrors a flat `E*` only for BLINDED / FAST / TELEPAT / STEALTH / LEVITATION. Comment: “mirror of most E* flat fields (BLINDED→EBlinded only so far).” **FIRE_RES and COLD_RES are not mirrored.** `u.EFire_resistance` is not assigned anywhere in scored `js/` (grep). Intrinsic fire from `adjabil` / eat / poly **does** set `HFire_resistance` (`attrib.js:803`, `eat.js:1249`, `polyself.js` `propset_fromform`). So:

| Hero state | C `Fire_resistance` | JS sit helper |
|------------|---------------------|---------------|
| Valkyrie / eaten / poly `HFire_resistance` | true → `d(2,10)` | true → `d(2,10)` — match |
| Worn ring / DSM, only `uprops[FIRE_RES].extrinsic` | true → `d(2,10)` | **false → `d(10,10)`** — **wrong** |
| No fire res | `d(10,10)` | `d(10,10)` — match |
| Worn ring of cold resistance on ice | skip “ice feels cold” | **still prints** — **wrong** (no RNG) |

`invent.js:1684–1689` `hero_Fire_resistance` already ORs the uprops pair. This SHA cloned the thinner zap/trap/explode alias instead of C / invent. That is a **clone of the wrong field**, same class as D-1055 `u.Underwater` (review 16). Not a named omit: the subject and D-log say Match C `youprop.h` Fire_resistance.

Private node “Fire_res `d(2,10)`” matches C only if the node set `u.Fire_resistance` or `HFire_resistance`. Setting a worn ring’s `uprops[FIRE_RES].extrinsic` (what `setworn` actually writes) would still roll `d(10,10)`. Same verification hallucination as review 16’s “underwater mud” node.

## Hallucinations / overclaim

“Match C dosit lava/ice/drawbridge sit so WWalking lava and ice sit before throne” is **true for arm order, sit_message strings, always-`burn_away_slime`, `likes_lava` warm/`return`, trap-vs-terrain split, ice/drawbridge literals, and `d(n,10)` once the boolean is C.** It is **not** true that `Fire_resistance()` / `Cold_resistance()` are C `youprop.h`. The lava **dispatch** is not a stub (`burn_away_slime` / `likes_lava` / `losehp` are real). The **resistance predicate** is a diverging clone. D-log “Fire_res `d(2,10)`” overclaims worn-item fire resistance.

Cadence **#1335** 44/44 does not prove lava sit. Journal admits public **unhit**. Private likes_lava / burn `d(10,10)` / ice ±Cold / DRAWBRIDGE_DOWN / throne `rnd(6)` / trap TT_LAVA `rnd(4)+d(2,10)` are the right checks for those arms. They do not falsify a worn ring.

Stamping the Open item **Addressed:** D-1058 is fair for the three-arm envelope and the trap split. It is **not** fair for C `Fire_resistance` on worn `oc_oprop`. Hash `27f0a233` is already on the archive row.

## Density (§2b)

One Open cluster: C’s lava / ice / DRAWBRIDGE_DOWN `else if` envelope. Sibling arms shipped together (not one-tile peels). ~80 lines `sit.js`. Right size. Not “finish sit.c.” Local `is_ice` is the sit→zap cycle, not a second subsystem rewrite. DRAWBRIDGE_UP+DB_LAVA left named on `hack.js` on purpose.

## Verification

Journal: private node likes_lava warm no `d()`; burn `d(10,10)` no trap `rnd(4)`; Fire_res `d(2,10)`; ice ±Cold; drawbridge; throne still `rnd(6)`; trap TT_LAVA `rnd(4)+d(2,10)`. green+strict PASS; cohort **6**/6 (seed1500/1800/0060/0102/0360/2200). Path **public-unhit**. Green+cohort is regression cover, not proof of worn `uprops[FIRE_RES]`.

This review iter ran cadence full `sessions` (**#1335** **44**/44 Scr **11405**/11405 RNG **100%**) — fortress, not lava-sit proof. C read of `sit.c:485–555`, `dbridge.c:62–96`, `youprop.h:26–32`, `mondata.h:190–191`, `timeout.c:448–453`, `do_name.c:1493–1509`, `defsym.h:137`, `rm.h:75–90`/`292–295`, `prop.h:15–16`, plus `do_wear.js:261–288` / `invent.js:1684–1689` / grep `EFire_resistance=` is the audit.

## Actionable C-wrongs

1. **`dosit` lava/ice sit must use C `Fire_resistance` / `Cold_resistance` (`u.uprops[FIRE_RES]` / `[COLD_RES]` intrinsic\|\|extrinsic).** Replace the two new sit helpers so they OR the uprops pair (same shape as `invent.js` `hero_Fire_resistance`). Do **not** rewrite `confer_oc_oprop` to mirror every `E*` this iter. Do **not** “fix” zap/trap/explode aliases this iter. Do **not** pull `hack.js` `is_lava` DRAWBRIDGE_UP+DB_LAVA into this peel. Falsifier: `setworn` a FIRE_RES ring (uprops extrinsic set, `EFire_resistance` unset), sit LAVAPOOL, not likes_lava → `d(2,10)` not `d(10,10)`; intrinsic-only `HFire_resistance` still `d(2,10)`; no-res still `d(10,10)`; Cold ring on ICE skips “The ice feels cold.”

Named omits (map, not queue): `hack.js` `is_lava` DRAWBRIDGE_UP+DB_LAVA; `lay_an_egg`; steed `mon_nam`; `can_reach_floor` / ustuck / hider.

Do not skip terrain lava `burn_away_slime` when `!Slimed` (C always calls; callee no-ops). Do not merge trap TT_LAVA (`d(2,10)`+`rnd(4)` `"sitting in lava"`) into this arm. Do not add a WWalking predicate. Do not use defsyms lowered/raised for DRAWBRIDGE_DOWN.

## Verdict

- Verdict: **QUALITY-RISK**
- Score: **6 / 10**
- One sentence: lava/ice/drawbridge arm order and real callees match C, but the new Fire/Cold helpers miss `uprops[]` so a worn fire-resistance ring still rolls `d(10,10)`.
