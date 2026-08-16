# Review 58 — d1e7ae23 — `kill_eggs` after genocide (D-1097)

## Metadata
- Full / short hash: `d1e7ae233677b690b29b9f819846c2ce7c3d97bb` / `d1e7ae23`
- Parent: `6d71a258` (review D-1093–D-1096). JS-touching since last dedicated review file (`57-bd16c130`): **this SHA**, then D-1098–D-1100. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 18:49:30 +0200
- D-id: **D-1097**
- Stats: 12 files, +133 / −48 — `js/mon.js` +46 / −6 (`kill_eggs` + `kill_eggs_one` + `kill_genocided_monsters` list walk). `js/read.js` comment only (− named `kill_eggs` on `do_genocide`).
- Claims to close: Open queue `mon.c` `kill_eggs` after genocide (named from sit D-1034). Not seffects SCR_GENOCIDE. Stamped **Addressed:** D-1097 `d1e7ae23` on the archive row (filled by D-1098). Also stamped `reviews/loop-2026-08-15/D-1034-63e86f5a-ordinary-throne.md` `kill_eggs` risk. `reviews/loop-unattended/` had no live Must-fix for this.
- JS / map: `mon.js` `kill_eggs` / `kill_genocided_monsters`. `c-js-map/data.md` mon.c row names D-1097. TIN/CORPSE `#if 0`, cham `newcham`, `do.c` `goto_level` / `cmd.c` wiz-level-change callers still named.
- Prior reviews this SHA claims to close: D-1034 QUALITY-RISK `kill_eggs` after genocide (named omit, not Must-fix).

## Intent vs deliverable

Git subject promises: “Match C mon.c so genocide stops hatch timers on eggs of the wiped species.”

Old JS `kill_genocided_monsters` wiped live `G_GENOD` mons then left hatch timers on eggs (invent / floor / minvent / migrating / buried / nested containers). C `kill_eggs` stops them. A chameleon imitating a genocided form used `continue` after the deferred `newcham`, so that monster’s minvent eggs were skipped too.

The diff **does** that envelope: `kill_eggs` walks a JS invent **array** or an `nobj` chain; `EGG` → `dead_species(corpsenm, true)` → `kill_egg`; else `Has_contents` recurse `cobj`. After each live `fmon` (even if not genocided) then `invent` / `fobj` / `migrating_objs` / `level.buriedobjlist`. The cham arm no longer `continue`s past minvent.

It does **not** port TIN/CORPSE (`#if 0` in C). It does **not** call `newcham`. It does **not** wire `goto_level` / wizard level-change callers. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `kill_eggs` / `kill_eggs_one` | C body, **new** | `mon.c:5609–5635`; invent array vs `nobj` |
| `kill_egg` | C callee, **imported** | `mkobj.js` ← `timeout.c:1009–1013` `stop_timer(HATCH_EGG)` |
| `dead_species` | C callee, **imported** | `mon.js:438–444`; egg `big_to_little` already live (D-0068) |
| `Has_contents` | C macro, **imported** | `const.js` `cobj != null` ≡ `obj.h` |
| `kill_genocided_monsters` | C body, **retouched** | `mon.c:5639–5677` list walk |
| `newcham` | C callee, **named omit** | cham imitating genocided form |
| TIN / CORPSE arms | C `#if 0` | correctly not invented |
| `goto_level` / cmd wiz-change | C callers, **named omit** | `do.c:1817`; `cmd.c:1048` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates in the `js/` hunks. Rule #2 clean. Frozen contracts untouched. **No RNG** in `kill_eggs` (`dead_species` is a flags test). Eel `rn2(13)` in `goodpos` is a later SHA.

## Constitution / playbook

Grep of the `js/mon.js` + `js/read.js` hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. Contest Rule #2: no Node builtins. `kill_egg` is the existing timer stop, not a seed-shaped hatch skip.

## C ↔ JS fidelity

### `dead_species` — already matched; egg alt form

C `mon.c:5587–5605`:

```
if (m_idx < LOW_PM) return TRUE;
alt_idx = egg ? big_to_little(m_idx) : m_idx;
return (mvitals[m_idx] G_GENOD) || (mvitals[alt_idx] G_GENOD);
```

JS `dead_species` is the same predicate. This SHA does not retouch it. Cub geno kills a wolf egg (`big_to_little(wolf)=cub`); wolf geno does **not** kill a cub egg (`big_to_little(cub)=cub`). C comment: adult→baby only, not little_to_big. Match. Generic `corpsenm < LOW_PM` is dead (unhatchable). Match.

### `kill_eggs` walk — array vs `nobj`

C `mon.c:5609–5635`:

```
for (otmp = obj_list; otmp; otmp = otmp->nobj)
    if (otmp->otyp == EGG) {
        if (dead_species(otmp->corpsenm, TRUE))
            kill_egg(otmp);
#if 0 TIN / CORPSE
    } else if (Has_contents(otmp)) {
        kill_eggs(otmp->cobj);
    }
```

JS splits the list shape C does not have: `Array.isArray(obj_list)` walks `game.invent`; else `nobj` for minvent / fobj / migrating / buried. Each element goes through `kill_eggs_one`, which is the C loop body. Nested `cobj` is still an `nobj` chain (or an array if some container is wrong — `Array.isArray` would still walk it). `Has_contents` is `cobj != null`. An empty bag does not recurse. Match for the claimed lists.

C TIN/CORPSE under `#if 0` would blank tins / no-op corpses of genocided species. JS omits them. That is C’s compiled behavior, not a skip of live C. Do not port `#if 0`.

`kill_egg` is `stop_timer(HATCH_EGG, egg)` — C `timeout.c:1009–1013`. Imported real function. This is **not** “Match C dispatch, callee is a stub.” A sterilized egg (`corpsenm == NON_PM`) is already `dead_species` true (`< LOW_PM`); `kill_egg` is then a no-op stop of a timer that may not exist. C same.

### `kill_genocided_monsters` order

C `mon.c:5656–5676`:

```
for (mtmp = fmon; mtmp; mtmp = mtmp2) {
    mtmp2 = mtmp->nmon;
    if (DEADMONSTER(mtmp)) continue;
    … G_GENOD / kill_cham → newcham or mondead …
    if (mtmp->minvent) kill_eggs(mtmp->minvent);
}
kill_eggs(invent); kill_eggs(fobj);
kill_eggs(migrating_objs); kill_eggs(buriedobjlist);
```

JS snapshots `[...(game.fmon || [])]` instead of `nmon` (mondead may splice later via `dmonsfree`; D-0828 keeps dead on `fmon`). `mhp < 1` ≡ `DEADMONSTER`. Match for the skip: already-dead mons do **not** get minvent `kill_eggs` this pass.

Live cham imitating a genocided form: C `newcham(mtmp, NULL, NC_SHOW_MSG)` then still `kill_eggs(minvent)`. Old JS `continue` skipped both mondead **and** minvent eggs. New JS: empty `if` (named `newcham`), `else mondead`, then `kill_eggs(minvent)` always. The monster can remain in the genocided form (named omit). Its carried eggs still lose hatch timers. Closer to C than the `continue`. Stamping D-1097 is fair for eggs, not for cham.

`game.level?.buriedobjlist` is the live `nobj` head (`mkobj.js` bury / `dig.js` unearth). `game.migrating_objs` is `add_to_migration`. Invent is the array. Four C lists, four JS lists. Match.

`do.c:1817` `goto_level` after `losedogs` and `cmd.c:1048` wizard level-change also call `kill_genocided_monsters` so migrating arrivals drop genocided eggs on the destination. JS still only reaches this from genocide (`do_genocide` / later D-1098 `do_class_genocide`). Named. An egg that migrates with a genocided species after the wipe would hatch on the next level in JS until those callers exist. Map, not Must-fix.

`do_genocide` already called `kill_genocided_monsters` (D-1034). Before this SHA that walk was live-mons only, so throne case 8 / later scroll uncursed still left hatch timers. Wiring the lists here is what makes those existing callers C-complete for eggs. `read.c:2993` is the same function after a type wipe — D-1098 blessed class wipe reuses it.

Null / empty lists: C `for (otmp = obj_list; otmp; …)` on NULL is a no-op. JS `if (!obj_list) return` then array-or-nobj. `game.invent` of `[]` is an empty array (not null) — the `for…of` is a no-op. Buried/migrating unset → `undefined` → early return. Match.

`kill_cham`: C `ismnum(mtmp->cham) && (mvitals[cham] & G_GENOD)`. If chameleons themselves are genocided, every cham dies regardless of current form (`else mondead`). JS same `kill_cham` then `else mondead`. Eggs in that minvent still run. Match. The named omit is only the *other* cham case (alive cham species, current form genocided → `newcham`).

## Hallucinations / overclaim

“Match C mon.c so genocide stops hatch timers on eggs of the wiped species” is **true for the five C lists, nested containers, `dead_species(..., TRUE)`, and `kill_egg`.** It is **not** true that `newcham` ran, that `goto_level` catches limbo eggs, or that TIN/CORPSE `#if 0` ran (C does not compile those either).

This is **not** “Match C dispatch, callee is a stub.” `kill_egg` / `dead_species` / `Has_contents` are real. Stamping **Addressed:** D-1097 is fair for the Open line. Hash `d1e7ae23` is on the archive row (filled by D-1098).

## Density (§2b)

One Open cluster: `kill_eggs` + the `kill_genocided_monsters` walk that C uses to call it. ~40 executable lines. Sibling `seffects` SCR_GENOCIDE was correctly left for D-1098. TIN/CORPSE `#if 0` would have been a fake envelope. Right size (small end of 50–300). Not a one-`if` peel: the invent-array vs `nobj` split is the JS shape of C’s one loop.

## Verification

Journal: private canary **24**/24 (invent/fobj/cobj/minvent/DEADMONSTER skip/buried/migrating/nested; cub geno kills wolf egg; wolf geno does not kill cub egg; empty lists); green+strict seed8000/0900; cohort **15**/15 + strict 0106/0107/4500/0360. Path **public-unhit** (no public scroll of genocide / throne case 8). Cadence **#1400** (this audit) **44**/44 — fortress, not proof of hatch-stop.

C read of `mon.c:5587–5677`, `timeout.c:1009–1013`; JS `mon.js:438–444` / `1797–1844`, `mkobj.js:884–887`; hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| invent EGG of genocided adult | `kill_egg` | **same** (array walk) |
| nested bag EGG | recurse `cobj` | **same** |
| cub geno, wolf egg | `big_to_little` hits | **same** |
| wolf geno, cub egg | cub vitals live | **same** (no kill) |
| already-dead `fmon` | skip minvent | **same** (`mhp<1`) |
| cham imitating genocided | `newcham` then eggs | **eggs only** (named) |
| `goto_level` limbo | caller exists | **named omit** |

## Actionable C-wrongs

None that Must-fix this next iter. The five lists stop `HATCH_EGG` as `mon.c` does.

Named omits / do-nots (map / Open, not Must-fix):

1. cham `newcham(mtmp, NULL, NC_SHOW_MSG)` when `ismnum(cham) && !kill_cham` (`mon.c:5664–5665`). Do not `continue` past minvent again.
2. `do.c` `goto_level` / `cmd.c` wizard level-change `kill_genocided_monsters` callers.
3. TIN/CORPSE `#if 0` — do not invent.

Do not skip `kill_eggs` on live non-genocided mons (C always walks minvent). Do not restore the cham `continue`. Do not pull `seffects` SCR_GENOCIDE into this SHA (already D-1098).

`EGG` is `objectNames.indexOf('EGG')` at module load — same pattern as the rest of `mon.js`. `Has_contents` on a non-container with a stray `cobj` would recurse in both C and JS; C’s macro is the same pointer test. Floor piles are `nexthere` not `nobj`; C `kill_eggs(fobj)` walks the **global** object list (`nobj`), which includes every floor object plus free-list members C has on `fobj`. JS `game.fobj` is that chain head (`mkobj` `place_object` / extract). A second object on the same cell is `nexthere` **and** still on `nobj`. Walking `nobj` hits it once. Match.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: genocide now stops `HATCH_EGG` on eggs of the wiped species across invent/floor/minvent/migrating/buried, with `kill_egg` a real timer callee, while cham `newcham` and level-change callers stay named.
- Must-fix stays empty for this SHA; next port after the remaining three SHAs in this audit still pops Open `goodpos` `is_exclusion_zone` once D-1098–D-1100 are reviewed.
