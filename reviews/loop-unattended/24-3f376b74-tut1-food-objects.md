# Review 24 — 3f376b74 — tut-1 packed food objects / `create_object` buc+montype+spe (D-1063)

## Metadata
- Full / short hash: `3f376b74127358eb39db6533917e0592f3bf62aa` / `3f376b74`
- Parent: `5d77ad73` (review 23 ACCEPT of `3ca1b544` D-1062; Must-fix empty; popped Open tut-1 food)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 05:26:55 +0200
- D-id: **D-1063**
- Stats: 10 files, +219 / −67 — `js/mklev.js` +129 (buc map, montype/spe, `create_object` corpsenm, three `load_tut1` foods)
- Claims to close: Open queue tut-1 food objects only (not `place_lregion` / key / nhcore). Stamped **Addressed:** D-1063 `3f376b74` on the archive row in this SHA (hash present, not chicken-egg).
- JS / map: `mklev.js` `create_object` / `l_create_object` / `load_tut1`; `c-js-map/startup.md` still names knife/`tut1_object` leftovers, `obfree`, tut_key, nhcore. Cadence still **#1340** **44**/44 (not a score refresh).
- Docs-only since last `reviews/loop-unattended/` file: `5d77ad73` is review 23 itself. JS SHAs after that file: this one, then `dc354c44` (review 25).

## Intent vs deliverable

Git subject promises: “Match C create_object so tut-1 packed food objects use buc uncurse, montype corpsenm, and CORPSTAT spe.” Body: apple / candy bar / lichen corpse at packed `{50,3}` now go through `l_create_object` instead of `tut1_object` + `set_corpsenm(PM_LICHEN)`.

C `sp_lev.c:2193–2439` is `create_object`: `get_location_coord(DRY)`, `mksobj_at` / `mkobj_at`, then `spe != -127` assign, curse_state switch, then `corpsenm` / `set_corpsenm`. C `sp_lev.c:3442–3451` is `get_table_buc` (`"not-cursed"` → 4). C `sp_lev.c:3557–3754` is `lspo_object`: table buc, `corpsenm = NON_PM`, then STATUE/EGG/CORPSE/TIN/FIGURINE montype via `strcmpi` on `pmnames[]` (not `find_montype` gender RNG), then CORPSE/STATUE `spe = CORPSTAT` lflags. C `dat/tut-1.lua:258–261` is three packed `des.object` at `{50,3}` (`buc = "not-cursed"`, corpse `montype = "lichen"`).

The queue line was tut-1 food objects. The diff fills those three C arms on the D-1062 `create_object` / `l_create_object` subset and retargets only the three food calls in `load_tut1`.

It does **not** add Lua argc string/coord parse. Named. It does **not** rewire knife/dagger (`tut-1.lua:268–269`) or other `load_*` `des.object`. Named. It does **not** port tut-1 `place_lregion` / `tut_key` / nhcore disable. Those remain Open at this SHA (`dc354c44` takes `place_lregion`).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `create_object` | C function, retouched subset | `sp_lev.c:2193–2439`; this SHA adds corpsenm after curse_state |
| `l_create_object` | C `lspo_object` table form, retouched | `sp_lev.c:3557–3754`; buc + montype + default `corpsenm=NON_PM` |
| `get_table_buc` | C function, new JS | `sp_lev.c:3442–3451`; unpacked string, not `lua_State` |
| `lspo_object_montype_mndx` | C loop clone | `sp_lev.c:3690–3698`; `pmnames` strcmpi, **not** `find_montype` |
| `lspo_object_apply_montype` | C `lspo_object` montype+spe block | `sp_lev.c:3667–3720`; STATUE/EGG/CORPSE/TIN/FIGURINE |
| `set_corpsenm` | imported C callee | `mkobj.c:1318–1367`; JS `mkobj.js:1024–1055` |
| `rndmonnum` | imported C callee | only for `NON_PM-1`; tut-1 lichen is specific |
| `mkclass` | imported C callee | class-letter montype `G_NOGEN\|G_IGNORE`; unhit by `"lichen"` |
| `uncurse` / `bless` / `curse` / `blessorcurse` | imported C callees | case 4 `uncurse` is the tut-1 path |
| `mksobj_at` | imported C callee | `init=TRUE`; candy wrapper `rn2` then spe kept (`-127`) |
| `stackobj` | imported C callee | now runs; old `tut1_object` did not stack |
| `load_tut1` foods | C `des.object` site | `tut-1.lua:258–261` |
| `tut1_object` | pre-existing clone | knife/dagger / other loot **not** switched |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names in control flow. `(50,3)` is the baked `tut-1.lua` coord already used by the previous `tut1_object`, not a public-trace hardcode. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/mklev.js` hunks: no trace-index gates, no recorded coordinates as control flow, no `fastforward` burns. Packed coords come from the embedded map loader, not a seed-shaped food pile. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### Buc `"not-cursed"` — C curse_state 4 is `uncurse`, not unbless

C `get_table_buc` (`3444–3449`):

```
"random", "blessed", "uncursed", "cursed",
"not-cursed", "not-uncursed", "not-blessed"
→ bucs2i[] 0..6
```

C `create_object` (`2233–2255`) case 4: `uncurse(otmp)` only. Blessed can stay blessed. Case 2 (`"uncursed"`) is `unbless` then `uncurse`.

JS `get_table_buc` maps the same seven strings (lowercased). `l_create_object` sets `curse_state` from `buc` before the default-0. `create_object` switch case 4 calls imported `uncurse`. Match for tut-1.

Old `tut1_object` did `otmp.cursed = false` for `'not-cursed'` (no bag-of-holding weight / figurine timer). Floor apple/candy/corpse do not hit those `uncurse` extras. Observable BUC for this pile is the cursed bit. Match in this envelope.

Unknown buc string: C `get_table_option` errors; JS `?? 0` (random). Named. Tut-1 uses `"not-cursed"`.

### Montype `"lichen"` — `pmnames` strcmpi, not `find_montype` gender RNG

C `lspo_object` (`3667–3705`) only for STATUE/EGG/CORPSE/TIN/FIGURINE. `"lichen"` is not spinach/empty and not a one-character class. The else loop (`3690–3698`):

```
for (i = LOW_PM; i < NUMMONS; i++)
    if (!strcmpi(mons[i].pmnames[NEUTRAL], montype)
        || (MALE && !strcmpi MALE)
        || (FEMALE && !strcmpi FEMALE))
        pm = &mons[i];
tmpobj.corpsenm = monsndx(pm);
```

That is **not** `find_montype` (monster Lua binding; burns gender RNG). JS `lspo_object_montype_mndx` walks `LOW_PM .. monsterNames.length` on imported `pmnames` with `MALE=0` / `FEMALE=1` / `NEUTRAL=2` (`monflag.h` `enum mgender`). `PM_LICHEN` is 158; `pmnames[158][NEUTRAL]` is `"lichen"`. No `rn2`. Match.

Class-letter montype: C `strlen==1 && def_char_to_monclass != MAXMCLASSES` then `mkclass(G_NOGEN|G_IGNORE)`; else the pmnames loop. JS length-1 tries `monclass_letter_to_mlet` then `mkclass`, else pmnames. Same split. Unhit by lichen. Unknown montype: C `nhl_error`; JS leaves `NON_PM`. Named.

Apple/candy ids skip the montype block (not in the five otyps). `corpsenm` stays `NON_PM`. Match.

### `create_object` order — spe, curse, then `set_corpsenm`, call-for-call

C (`2230–2264`):

```
if (o->spe != -127) otmp->spe = o->spe;
switch (o->curse_state) { ... case 4: uncurse; ... }
if (o->corpsenm != NON_PM) {
    if (o->corpsenm == NON_PM - 1) set_corpsenm(otmp, rndmonnum());
    else set_corpsenm(otmp, o->corpsenm);
}
```

`set_corpsenm` (`mkobj.c:1318–1367`) writes `corpsenm`, restarts corpse/egg/figurine timers, recomputes `owt`. It does **not** overwrite `spe`. CORPSTAT lflags assigned to `spe` **before** this call survive.

JS (`mklev.js` `create_object`): `if (o.spe !== -127 && o.spe != null) otmp.spe = o.spe`; curse switch; then `cn !== NON_PM` → `set_corpsenm`. Extra `!= null` does not change 0 vs `-127`. Match.

C `lspo_object` for CORPSE (`3706–3715`) sets `tmpobj.spe = lflags` (historic/male/female; tut-1 has none → 0) **before** `create_object`, overwriting mksobj’s gender `spe`. JS `lspo_object_apply_montype` does the same (`CORPSTAT_FEMALE=1`, `MALE=2`, `HISTORIC=0x04` — `hack.h`). Tut-1 lichen `spe=0`. Match.

Candy bar: table default `spe=-127`, montype block skipped, `create_object` does not overwrite `assign_candy_wrapper` (`1+rn2(12)`). Apple keeps mksobj spe. Match.

`set_corpsenm` on lichen: `start_corpse_timeout` returns immediately for `PM_LICHEN` (no rot RNG). JS `start_corpse_timeout` has the same lizard/lichen return. No extra `rn2` on this corpse. Match.

Packed origin: still `get_location_coord` add `splev_xstart/ystart` (review 23). `load_tut1` sets those before loot. Same cell as old `xstart+50, ystart+3`.

`stackobj` after each non-content create: C `2422–2423`. Old `tut1_object` skipped it. This SHA runs imported `stackobj`. Three distinct otyps at one cell do not merge. Pile exists. Match.

RNG on this path: `mksobj_at(..., TRUE, !named)` for each food (C `2212`). Candy `assign_candy_wrapper` is `1+rn2(12)` (`read.c`); spe `-127` keeps it. Lichen `set_corpsenm` → `start_corpse_timeout` returns before `rnz` / rider / troll loops. No `find_montype` `rn2`. No `rndmonnum`. Buc case 4 `uncurse` burns no RNG. Call-for-call with C for these three objects.

`l_create_object` class from `objects[id].oc_class` when id > 0 (`sp_lev.c:3662–3663`). JS same. Apple/candy/corpse have real `oc_class`; the `: 1` fallback is unhit. `containment` stays 0 (no contentsFn, `container_idx` 0 after the box pop). No `delete_contents`. Match.

Eroded: C `2273–2283` — `o->eroded` false zeros `oeroded`/`oeroded2`/`oerodeproof`. JS same; `l_create_object` defaults `eroded=0`. Locked `-1` / trapped `-1` skip the set (C `2286–2293`). Greased 0. Quan `-1` skips merge assign (C `2298–2301`; named omit for `quan>0 && oc_merge`). Foods are not containers. `named` is false so `oname` skip is C (`o->name.str` NULL). Match.

EGG `laid_by_you` / TIN spinach `spe=1` / FIGURINE montype shipped in `lspo_object_apply_montype` with the CORPSE arm. Unhit by tut-1 food. Sibling switch arms, not a separate peel (§2b).

## Hallucinations / overclaim

“Match C create_object so tut-1 packed food objects use buc uncurse, montype corpsenm, and CORPSTAT spe” is **true for curse_state 4, pmnames lichen without gender RNG, spe-then-set_corpsenm order, CORPSTAT 0 overwriting mksobj gender, and candy `-127` keeping the wrapper roll.** It is **not** true that Lua `des.object` table parse exists, that every special-level `des.object` now uses `l_create_object`, or that knife/dagger at `{43,13}`/`{43,14}` moved. The D-log deferred list says those. The subject does not claim `place_lregion` / key.

This is **not** “Match C dispatch, callee is a stub.” `set_corpsenm`, `uncurse`, `mksobj_at`, `stackobj`, `mkclass` are imported C callees. `get_table_buc` / montype helpers are C table/loop shape on unpacked args.

Stamping the Open item **Addressed:** D-1063 `3f376b74` is fair for the three tut-1 foods. Hash already on the archive row.

## Density (§2b)

One Open cluster: C’s packed food `des.object` → `lspo_object` buc + montype + CORPSTAT `spe` + `create_object` corpsenm. Sibling STATUE/EGG/TIN/FIGURINE arms shipped with the montype function (not a one-`if` peel). ~129 executable lines in `mklev.js` plus three call-sites. Did not pull `place_lregion` into this SHA. Right size. Not “finish `sp_lev.c`.”

## Verification

Journal: private node apple+candy+lichen pile at packed (50,3); corpse `corpsenm=PM_LICHEN` `spe=0`; candy wrapper spe in 1..12; none cursed. green+strict PASS; seed0009 **73**/73; cohort **9**/9 (0009/0030/0060/0102/0360/0373/1500/1800/2200) plus green 8000/0900. Path unhit except seed0009 tutorial prefix (food glyphs already present under `tut1_object`).

This review iter did not re-run sessions (cadence **#1340** already refreshed Score). C read of `sp_lev.c:2193–2264` / `3442–3451` / `3667–3720`, `mkobj.c:1318–1367` `set_corpsenm` + `1822–1838` `uncurse`, `hack.h` CORPSTAT, `monflag.h` `enum mgender`, `dat/tut-1.lua:258–261`, JS `mklev.js` `create_object` / `l_create_object` / `lspo_object_apply_montype` / `load_tut1` foods, `mkobj.js` `set_corpsenm` / `uncurse` is the audit. Grep of the `js/mklev.js` hunks: no `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / seed names in control flow.

## Actionable C-wrongs

None in the packed food buc / montype / CORPSTAT envelope this SHA shipped.

Named omits (map, not queue): tut-1 `place_lregion` (shipped next SHA) / `tut_key` / nhcore disable (live Open); Lua argc parse; quan non-merge repeat; oname / buried / lit / achievement; Medusa statue fill; `invent_carrying_monster`; class-letter `def_char_to_objclass`; unknown montype `nhl_error`; knife/dagger and other `load_*` still `tut1_object` / hand-rolled; `uncurse` luck/lamplit extras vs C (unhit on floor food).

Do not restore `tut1_object` for tut-1 food. Do not skip `create_object` `corpsenm` / `find_montype` gender RNG for `montype`. Do not put trailing `confdir` inside shared `getdir`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: tut-1 apple/candy/lichen now take C curse_state 4, pmnames lichen without gender RNG, and CORPSTAT `spe` before `set_corpsenm`, instead of `tut1_object` leaving mksobj gender `spe`.
