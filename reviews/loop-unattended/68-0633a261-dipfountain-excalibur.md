# Review 68 — 0633a261 — `dipfountain` Excalibur LONG_SWORD body (D-1107)

## Metadata
- Full / short hash: `0633a261a0d3592578882fb40592babfa3746ce1` / `0633a261`
- Parent: `127c045c` (D-1106). This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 21:17:23 +0200
- D-id: **D-1107**
- Stats: 11 files, +215 / −50 — `js/fountain.js` +86 / −9 (Lady of the Lake body); `js/artifact.js` +34 / −2 (`artiname` / `discover_artifact` / `artidisco[]`).
- Claims to close: Open queue `fountain.c` `dipfountain` Excalibur LONG_SWORD body (named). Not wash_hands. Stamped **Addressed:** D-1107 `0633a261` on the archive row (filled by D-1108). Review **65** named omit 3. `reviews/loop-2026-08-15/` has no open Excalibur Must-fix.
- JS / map: `fountain.js` `dipfountain`; `artifact.js` `artiname` / `discover_artifact`. `c-js-map/data.md` fountain + artilist rows. `update_inventory` / artidisco save/rest / full `set_levltyp` still named.
- Prior reviews this SHA claims to close: **65** item 3 (Excalibur body / that site’s `angry_guards`).

## Intent vs deliverable

Git subject promises: “Match C fountain.c dipfountain so a long sword can become Excalibur instead of a dryup stub.”

Old JS consumed the LONG_SWORD `&&` gate (otyp, ulevel, `rn2(knight?6:30)`, quan, `!oartifact`) then **stubbed** `exist_artifact` as always-none and called `dryup` (which burns `rn2(3)`, town-warn, wizard yn). C `fountain.c:404–447` never calls `dryup` here: gift or deny, then `set_levltyp` ROOM + `flags=0` + town `angry_guards(FALSE)`.

The diff **does** that body, including the `!exist_artifact(LONG_SWORD, artiname(ART_EXCALIBUR))` conjunct, lawful `oname`+`discover_artifact`+`bless`, unaligned curse+`spe--`, and the ROOM/`angry_guards` close — not `dryup`.

It does **not** port `wash_hands`, uncurse 17–20, case 29 `mkgold`, or `update_inventory` redraw. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dipfountain` Excalibur arm | C body, **rewritten** | `fountain.c:404–447`; was dryup stub |
| `exist_artifact` | C callee, **imported** | `artifact.js:347–355`; pre-existing, **not** a stub |
| `artiname` | C callee, **new** | `artifact.c:151–156` |
| `discover_artifact` | C callee, **new** | `artifact.c:1113–1127`; `impossible` named omit |
| `oname` | C callee, **imported** | `do_name.js:602–621`; calls `artifact_exists` |
| `artifact_exists` / `artifact_origin` | C callee, **imported** | sets `oartifact` + `artiexist[].exists` |
| `bless` / `curse` | C callee, **imported** | `mkobj.js` |
| `exercise` | C callee, **imported** | `attrib.js` |
| `livelog_printf` | C callee, **imported** | `pline.js` chronicle list; file write named |
| `uhim` | C macro, **imported** | `roles.js` `genders[flags.female].him` |
| `angry_guards` | C callee, **imported** | D-0941 / D-1104 |
| `in_town` | C callee, **imported** | `hack.js` |
| `Role_if` | C macro, **clone** | `urole.mnum === pm` |
| `set_levltyp` | C callee, **analog** | `typ=ROOM` + `flags`/`looted`=0 + `nfountains--` |
| `update_inventory` | C callee, **named omit** | perm_invent redraw |
| `wash_hands` | C next arm, **named omit** | shipped D-1108 |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

**RNG this arm:** `!rn2(Role_if(PM_KNIGHT)?6:30)` after otyp+ulevel (short-circuit: ulevel&lt;5 burns **no** `rn2`). Unaligned `spe>-6 && !rn2(3)` decrement. No `dryup` `rn2(3)`. `exist_artifact` is a table walk, no RNG.

## Constitution / playbook

Grep of the `js/fountain.js` / `js/artifact.js` hunks: no trace-index gates, no recorded coordinates. `"Lady of the Lake"` / `"Excalibur"` are C strings (`artilist.h` name, `fountain.c:409`). Contest Rule #2: no Node builtins.

## C ↔ JS fidelity

### Gate `&&` order

C `fountain.c:404–408`:

```
if (obj->otyp == LONG_SWORD && u.ulevel >= 5
    && !rn2(Role_if(PM_KNIGHT) ? 6 : 30)
    && obj->quan == 1L && !obj->oartifact
    && !exist_artifact(LONG_SWORD, artiname(ART_EXCALIBUR))) {
```

JS `987–992`: `obj && otyp === LONG_SWORD && ulevel>=5 && !rn2(Role_if(PM_KNIGHT)?6:30) && quan==1 && !oartifact && !exist_artifact(...)`. Extra `obj &&` is JS-null safety; C always has `obj` at this caller. `Role_if` is `game.urole.mnum === PM_KNIGHT` ≡ C `urole.mnum`. `LONG_SWORD` is `objectNames.indexOf('LONG_SWORD')`. `ART_EXCALIBUR` is 1; `artilistRaw[1].name` is `'Excalibur'`. Match. Tourist burns `rn2(30)`; Knight `rn2(6)`.

Old stub skipped `exist_artifact` and then `dryup`. New conjunct can reject a second sword after `artiexist[1].exists` is set. Canary named “second sword” / `exist_artifact` skip.

### Unaligned deny vs lawful gift

C `411–440` / JS `994–1027`: `ualign.type != A_LAWFUL` (`A_LAWFUL=1`). Neutral/chaotic take freeze-mist + `pline_The("fountain disappears!")` + `curse` + `spe>-6 && !rn2(3)` `--` + `oerodeproof=FALSE` + `exercise(A_WIS,FALSE)` + livelog denied. Lawful: bless-hand plines, `obj = oname(obj, artiname(ART_EXCALIBUR), ONAME_VIA_DIP|ONAME_KNOW_ARTI)`, `discover_artifact`, `bless`, clear `oeroded`/`oeroded2`, `oerodeproof=TRUE`, `exercise(A_WIS,TRUE)`, livelog given. String text matches. `uhim()` is `flags.female` him/her, not `u.female`. Match.

`oname` (`do_name.js:602–621`): if already artifact or `exist_artifact(otyp,name)` return; else `artifact_exists(obj, n, true, oflgs)`. `artifact_exists` sets `otmp.oartifact = i` and `artifact_origin` (`exists:1`, `viadip` from `ONAME_VIA_DIP`, `found` from `ONAME_KNOW_ARTI`). **Not a stub.** C `artifact.c:370–405` is the same origin write; it does **not** call `set_artifact_intrinsic` here (wield does). JS same. Dual-wield / shop `oname` paths still named on `do_name.js` — not this cluster.

`artiname` (`artifact.c:151–156` / JS `152–156`): `artinum<=0 || >NROFARTIFACTS` → `""`; else `artilist[artinum].name`. Match.

`discover_artifact` (`artifact.c:1113–1127` / JS `163–174`): first empty-or-equal `artidisco[i]` slot gets `m`. C `impossible` if the table is full; JS falls off the end. Named. `NROFARTIFACTS=33` slots; first insert always works. `artifacts_globals_init` now zeros `artidisco[]`. Save/rest of that array still named.

`livelog_printf` formats `%s` into `gamelog_add`. File livelog named. Chronicle list is the scored path. Not a no-op.

### ROOM close is not `dryup`

C `441–447`: `update_inventory()`; `set_levltyp(u.ux,u.uy,ROOM)`; `levl[].flags=0`; `newsym`; `if (in_town) angry_guards(FALSE)`; `return`. **No** `blessedftn=0` (dryup does that; this path does not). **No** `rn2(3)`.

JS `1028–1044`: skips `update_inventory` (named). `loc.typ=ROOM`; `flags=0`; `looted=0`; `nfountains--` if &gt;0; `newsym`; town `angry_guards(false)`; `return`. C `#define looted flags`, so `flags=0` clears warned/looted. JS splits those fields; clearing both is the analog, not an extra wipe. `blessedftn` left as-is. Match C’s omission.

`set_levltyp` (`mkmaze.c:77–110`) on FOUNTAIN→ROOM sets typ then `count_level_features()` (recount nfountains). JS `--` is the same delta when the counter was already right. Ice/lava/`obj_ice_effects` arms of `set_levltyp` do not apply to a fountain. Full helper still named (same analog dryup has used since D-0894). Review **65** ACCEPTed that analog for `angry_guards`. Same here.

`in_town` + `angry_guards(false)` is the call review **65** said Excalibur still lacked. This SHA adds it **here**, not by calling `dryup`. Peaceful watchmen go hostile on a town gift/deny. First-use warn flags are irrelevant because this path never `SET_FOUNTAIN_WARNED`. Match.

Levitation still returns at the top of `dipfountain` (`fountain.c:399–402`) **before** the LONG_SWORD `rn2`. JS same (`973–977`). A floating hero does not burn the knight/tourist `rn2` and does not convert the fountain. After this arm `return`s, cases 16–30 / `dryup` do not run — C same. The following `else if (is_hands || obj == uarmg)` is not taken when the Excalibur gate fired. Match.

`hliquid('water')` on the deny mist line is imported `do_name.js` (D-0849). Hallucination liquid names are that helper’s job, not a fountain invention. `ONAME_VIA_DIP=0x0008` / `ONAME_KNOW_ARTI` / `LL_ARTIFACT=0x0040` match `const.js` ≡ C headers. `bless(obj)` after `oname` can raise `spe` / uncurse; C same order so a cursed long sword becomes a blessed Excalibur. Unaligned `curse` then maybe `spe--` never calls `oname`. Match.

C `exist_artifact` requires `otyp && *name` then `!strcmp`. `artiname(ART_EXCALIBUR)` is `'Excalibur'` (never `""` for index 1). JS `a.otyp === otyp && a.name === name` on `artilist()[i]` from index 1. `artiexist` is length `NROFARTIFACTS+1` with index 0 unused, same as C. A wish-created Excalibur would already have `exists` set and this gate would fail — C same. The old stub that assumed none is gone.

## Hallucinations / overclaim

“Match C so a long sword can become Excalibur instead of a dryup stub” is **true for the gate order, `exist_artifact`/`artiname`/`oname`/`discover_artifact`/`bless`/`curse`/`spe--`, the ROOM close, and town `angry_guards`.** It is **not** true that `update_inventory` ran, that `set_levltyp` ice/lava/count ran, or that `wash_hands` ran.

This is **not** “Match C dispatch, callee is a stub.” `exist_artifact` walks `artilist`+`artiexist`. `oname` sets `oartifact`. `angry_guards` is D-0941. The deleted dryup stub is the C fix. Stamping **Addressed:** D-1107 is fair.

## Density (§2b)

One Open cluster: the LONG_SWORD arm C writes before `wash_hands`. Fountain body + the two `artifact.c` helpers that arm calls (`artiname`, `discover_artifact`). ~90 executable lines. Inside the 50–300 band. Did not pull `wash_hands` / uncurse 17–20 / case 29 (queue forbade combining). Related deferrals on the same arm (`update_inventory`, artidisco save) stayed named.

## Verification

Journal: private canary **49**/49 (artiname; discover once; lawful gift; chaotic/neutral deny; `exist_artifact` skip; ulevel&lt;5 no `rn2`; quan&gt;1 / already-arti / dagger; levitation; tourist `rn2(30)`; town angry / !town; spe-6; female `uhim`; second sword); green+strict seed8000/0900; cohort **17**/17 including knight 0103/0104/4500 + strict those + isolated 0009. Path **public-unhit**. Cadence **#1410** **44**/44 — fortress, not an Excalibur-dip proof.

C read of `fountain.c:394–447`, `artifact.c:151–156` / `:356–366` / `:370–405` / `:1113–1127`, `do_name.c` `oname`, `mkmaze.c:77–110`; JS `fountain.js:92–96` / `972–1045`, `artifact.js:134–174` / `347–402`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| lawful unique long sword, xlvl≥5, `rn2` hit | oname Excalibur, ROOM, maybe angry | **same** |
| unaligned same gate | curse, maybe `spe--`, ROOM, maybe angry | **same** |
| Excalibur already exists | fall through to wash/water_damage | **same** (was dryup) |
| ulevel&lt;5 | no `rn2(6/30)` | **same** |
| quan≠1 / oartifact / not LONG_SWORD | skip arm | **same** |
| town gift/deny | `angry_guards(FALSE)` | **same** (was dryup’s warn/yn) |
| `wash_hands` | next `else if` | **still stub this SHA** (D-1108) |

## Actionable C-wrongs

None that Must-fix this next iter. The Lady of the Lake arm sits where `fountain.c` puts it and the artifact callees are real.

Named omits / do-nots (map, not Must-fix):

1. `update_inventory()` after gift/deny (`fountain.c:441`). perm_invent redraw.
2. `discover_artifact` full-table `impossible`; artidisco save/rest.
3. Full `set_levltyp` (ice/lava/`count_level_features`). Analog is the same one dryup uses.
4. `wash_hands` was the next Open row (shipped D-1108).
5. Do not restore the `dryup` stub on this gate. Do not skip `exist_artifact`. Do not angry on a `dryup` town-warn return (different function). Do not pull uncurse 17–20 / case 29 into this SHA.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: dipping a unique long sword now runs C’s Lady of the Lake gift or deny and converts the fountain via ROOM/`angry_guards` instead of a `dryup` stub, with real `exist_artifact`/`oname`/`artiname`.
- Must-fix stays empty for this SHA; next port popped Open `wash_hands` (D-1108).
