# Review 155 — 2d2e68c7 — dokick.c `deliver_obj_to_mon` (D-1193)

## Metadata
- Full / short hash: `2d2e68c7f2972bab7733ad6ea34b537c09189228` / `2d2e68c7`
- Parent: `3448db19` (review **151–154** + cadence #1515). This file audits **this SHA only**. Archive row **Addressed:** D-1193 `2d2e68c7` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 01:11:57 +0200
- D-id: **D-1193**
- Stats: 13 files, +249 / −56 — `js/dokick.js` +80; `js/do_name.js` +64; `js/makemon.js` +9; `js/dog.js` comment +2.
- Claims to close: Open queue `dokick.c` `deliver_obj_to_mon` (named from D-1177 / review **154**). Not `obj_delivery`. `reviews/loop-2026-08-15/` has no unpaid species-delivery Must-fix.
- JS / map: `dokick.js` `deliver_obj_to_mon`; `makemon.js` after `allow_minvent`; helpers `do_name.js` `christen_orc` / `rndorcname` / `free_oname`. `c-js-map/turns.md`. dog.c `MIGR_LEFTOVERS` DF_ALL, `mksobj_migr_to_species`, mkmaze `stolen_booty`, `add_to_minv` merge still named.
- Prior reviews this SHA claims to close: **154** next Open `deliver_obj_to_mon`.

## Intent vs deliverable

Git subject promises: “Match C dokick.c deliver_obj_to_mon so MIGR_TO_SPECIES cargo goes into matching monster minvent.”

Old JS `obj_delivery` continued past `MIGR_TO_SPECIES` without extract (C `dokick.c` `obj_delivery` same skip). C `deliver_obj_to_mon` is the other consumer: walk `gm.migrating_objs`, match `(mtmp->data->mflags2 & DELIVER_PM) == (unsigned) otmp->migr_species`, extract into that monster’s minvent. `makemon` after `allow_minvent` calls it with `DF_NONE`, cnt=1.

The diff **does** add that loop, the DELIVER_PM mask, DF_NONE/RANDOM/ALL maxobj, orc named-booty `christen_orc` / `free_oname`, and the `makemon.c:1469–1470` caller. It **does** keep `obj_delivery` skipping `MIGR_TO_SPECIES`. It does **not** pull dog.c `mon_arrive` `MIGR_LEFTOVERS` `DF_ALL`, `mksobj_migr_to_species`, or mkmaze `stolen_booty`. Named. Without those producers the public suite cannot grow this cargo — **public-unhit**.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `deliver_obj_to_mon` | C callee, **new** | `dokick.c:1854–1906` |
| `makemon` caller | C site, **new** | `makemon.c:1469–1470` `DF_NONE` cnt=1 |
| `DELIVER_PM` | C macro, **clone** | `dokick.c:1867–1868`; bits match `monflag.h` |
| `migr_species_of` | **clone** of `obj.h` overlay | `migr_species` ≡ `corpsenm`; JS dual-field |
| `christen_orc` | C callee, **new** | `do_name.c:1557–1586` |
| `rndorcname` | C callee, **new** | `do_name.c:1538–1554` |
| `upstart` | **clone** of `hacklib.c:114–119` | local in `do_name.js` |
| `free_oname` | C callee, **new** | `do_name.c:81–87` |
| `christen_monst` | C, **imported** | same file; pre-existing |
| `add_to_minv` | C callee, **imported partial** | prepend live; **merge named omit** |
| `obj_extract_self` | C, **imported** | `mkobj.js` `OBJ_MIGRATING` arm |
| `In_mines` / `ONAME` / `has_oname` / `has_mgivenname` | C, **imported** | live |
| `mon_arrive` leftovers | C sibling, **named omit** | `dog.c:576–579` DF_ALL |
| `mksobj_migr_to_species` / `stolen_booty` | C producer, **named omit** | `mkobj.c:253–265` / `mkmaze.c` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. `rnd` already imported in `dokick.js`.

**New RNG on this path:** `rnd(cnt)` only if a future caller sets `DF_RANDOM` (no C caller today); orc arm `!rn2(2)` when `!In_mines`; `rndorcname` `rn1(2,3)` + `rn2(2)` + per-syllable `rn2(30)` short-circuit + `ROLL_FROM`. Makemon `DF_NONE` cnt=1: **zero** extra RNG unless an orc takes unnamed Fence. Public-unhit unless `MIGR_TO_SPECIES` cargo exists.

Grep of this SHA’s `js/` hunks: no banned gates.

## C ↔ JS fidelity

### Caller vs `makemon.c:1441–1473`

C after invent / saddle, then mflags3, then:

```
    if (allow_minvent && gm.migrating_objs)
        deliver_obj_to_mon(mtmp, 1, DF_NONE); /* in case of waiting items */
```

then `!in_mklev` `newsym`. JS (`makemon.js:2318–2322`) uses `allow_minvent_local && game.migrating_objs` then `deliver_obj_to_mon(mtmp, 1, DF_NONE)` before `!in_mklev` newsym. **Matches `:1469–1470`.** JS applied mflags3 earlier (D-0928 #1128); `deliver_obj_to_mon` does not read `mstrategy`. Else `discard_minvent` still named. Extra `!mtmp` guard on the callee is JS-only; C would dereference. Not a C-wrong of the claimed landing.

`makemon.js` imports `dokick.js` while `dokick.js` already imports `makemon` / `add_to_minv`. ESM live bindings; neither module calls `deliver_obj_to_mon` at init. Not a cycle crash.

### Loop vs `dokick.c:1854–1906`

C:

```
    if ((deliverflags & DF_RANDOM) && cnt > 1)
        maxobj = rnd(cnt);
    else if (deliverflags & DF_ALL)
        maxobj = 0;
    else
        maxobj = 1;
    … at_crime_scene = In_mines(&u.uz);
    cnt = 0;
    for (otmp = gm.migrating_objs; otmp; otmp = otmp2) {
        otmp2 = otmp->nobj;
        where = (int) (otmp->owornmask & 0x7fffL);
        if ((where & MIGR_TO_SPECIES) == 0)
            continue;
        if (otmp->migr_species != NON_PM
            && ((mtmp->data->mflags2 & DELIVER_PM)
                == (unsigned) otmp->migr_species)) {
            obj_extract_self(otmp);
            … orc arm …
            otmp->migr_species = NON_PM;
            otmp->omigr_from_dnum = otmp->omigr_from_dlevel = 0;
            (void) add_to_minv(mtmp, otmp);
            cnt++;
            if (maxobj && cnt >= maxobj)
                break;
        }
    }
```

JS maxobj / `cnt = 0` / `owornmask & 0x7fff` / skip without the bit / equality of `(mflags2 & DELIVER_PM) >>> 0` with `species >>> 0` **match**, including unsigned. `In_mines(game.u?.uz)` is C `lev->dnum == mines_dnum` (`dungeon.c:1856–1858`). No dest-level filter — unlike `obj_delivery`. `DF_ALL` `maxobj=0` is falsy so the `maxobj && cnt >= maxobj` break never fires. `DF_RANDOM` is ported; **no C caller** passes that flag (only `DF_NONE` / `DF_ALL`). `MIGR_TO_SPECIES` is 4096 (`dungeon.h`); JS `const.js` same.

`migr_species_of`: C `#define migr_species corpsenm`. JS reads `migr_species` if `!= null`, else `corpsenm`. After a hit JS assigns **both** to `NON_PM`; C assigns the overlay once. Dual-field clear is the overlay adaptation, not a skip of extract.

Orc arm: C `(otmp->corpsenm & M2_ORC)` after match, still the overlay bits. JS `(species & M2_ORC)` captured before clear. Then `!has_mgivenname` → `at_crime_scene || !rn2(2)` → `christen_orc(mtmp, crime ? ONAME(otmp) : NULL, " the Fence")` → always `free_oname` if the orc+oname gate held. JS short-circuits `In_mines` so mines skip `rn2(2)`. **Call-for-call.** `M2_ORC = 0x80` matches `monflag.h`.

### `christen_orc` / `rndorcname` vs `do_name.c:1538–1586`

`rndorcname`: `iend = rn1(2,3)` (3 or 4); `vstart = rn2(2)`; per `i`, flip `vstart`, `Sprintf(eos, "%s%s", (i>0 && !rn2(30)) ? "-" : "", vstart ? ROLL_FROM(v) : ROLL_FROM(snd))`. JS tables are the same 4 vowels / 11 sounds. `i>0 && !rn2(30)` short-circuits so syllable 0 does **not** burn `rn2(30)`. `ROLL_FROM` is `array[rn2(SIZE)]` (`hack.h:1493`). C `if (s)` no-ops a NULL buffer; JS always returns a string. The only caller passes a buffer. Not a C-wrong.

`christen_orc`: `sz = strlen(orcname)` then `gang ? strlen(gang)+sizeof " of "-sizeof "" : strlen(other)` (that sizeof pair is **4**). `sz < BUFSZ` (256 both). Gang: `upstart(orcname)` + `" of "` + `upstart(copy of gang)`. Else other concatenated without extra space (`" the Fence"` already has the leading space). Then `christen_monst`. JS `+ 4` matches the sizeof arithmetic (comment says `- 1`; value is still 4). Local `upstart` is `highc` first char (`hacklib.c:114–119`), not `upwords`. `christen_monst` truncates at `PL_PSIZ` (63). Live, not a stub.

### `add_to_minv` vs `mkobj.c:2648–2665`

C: panic if `where != OBJ_FREE`; **merge** via `merged(&otmp,&obj)` then return 1; else prepend `OBJ_MINVENT`. JS (`makemon.js:1054–1062`) prepends only (`// merge omitted`). Return ignored at this call site (`(void)` in C). After `free_oname`, two identical unnamed stackables **would merge in C and not in JS**. That is a **clone diverge of an imported callee**, not a named omit of a sibling function. Claimed “goes into minvent” is still true (prepend). Stolen-booty names usually block `merged` until `free_oname`; after that, duplicate daggers can stack in C. ACCEPT-WITH-DEBT, not Must-fix (do not steal Open `scrolltele`).

`obj_extract_self` `OBJ_MIGRATING` unlinks `game.migrating_objs` and sets `OBJ_FREE`. Live. Loop saves `nobj` before extract like C.

| Case | C | JS after |
|------|---|---------|
| makemon allow + chain | DF_NONE first match | **same** |
| species ≠ mask | skip | **same** |
| NON_PM species | skip | **same** |
| no MIGR_TO_SPECIES bit | continue | **same** |
| orc + oname + mines | gang = ONAME, no rn2 | **same** |
| orc + oname + !mines | `!rn2(2)` Fence | **same** |
| already named mon | skip christen, still `free_oname` | **same** |
| DF_ALL | no max break | **same** (caller still named) |
| merge into minvent | `merged()` | **prepend only** |

## Hallucinations / overclaim

D-log / CURRENT / subject say MIGR_TO_SPECIES cargo goes into matching monster minvent via `deliver_obj_to_mon` + makemon `DF_NONE`. **That pair is the hunk.** Stamping **Addressed:** D-1193 is fair. This is **not** “Match C dispatch, callee is a stub”: extract, `add_to_minv` prepend, `christen_orc` / `rndorcname` / `free_oname` are real functions. Do **not** stamp “Match C `stolen_booty`” or “Match C `mon_arrive` leftovers” or “Match C `add_to_minv` merge.” Public sessions have no producer; “cargo goes into minvent” is unhit on the fortress, not a lie about the call site.

`migr_species_of` looks like C’s overlay and is **not** a second species field in C. Say so: JS dual-field is the adaptation; producers that set only `corpsenm` still match.

### Clone classification (this SHA)

- `deliver_obj_to_mon` / `christen_orc` / `rndorcname` / `free_oname` — C functions, new.
- `DELIVER_PM` — C macro clone (bits match).
- `migr_species_of` — overlay clone (dual-field).
- `upstart` — `hacklib.c` clone (first char only).
- `add_to_minv` — C callee imported; **merge diverge**.
- `obj_extract_self` / `christen_monst` / `In_mines` — imported, live.

`obj_extract_self` `OBJ_MIGRATING` unlinks `game.migrating_objs` then sets `OBJ_FREE` so `add_to_minv`’s C panic (`where != OBJ_FREE`) would not fire. JS add_to_minv does not panic; it still sets `OBJ_MINVENT`. Loop snapshot of `nobj` before extract matches C `otmp2`. A producer that left `where` unset on the migrating chain would miss the extract arm — `mksobj_migr_to_species` is named and would have to set `OBJ_MIGRATING` like C `add_to_migration`.

## Density

One C cluster: the delivery function + the `do_name.c` helpers it calls + the `makemon` site that is the only live caller. ~80 + ~64 lines, not “finish dokick.c.” Did not pull leftovers / booty producers. Right-size §2b. Queue forbids combining the next Open wrap.

## Verification

Journal: private canary **25**/25 (DF_NONE head; DF_ALL; species miss; no-bit skip; NON_PM skip; mines gang; named-mon keep; Fence/`rn2`; helpers; DF_RANDOM 1..n; human match); green+strict seed8000/0900; cohort **39**/39 + strict lengths (seed0007 batch-isolation flake; alone PASS). Public-unhit unless `MIGR_TO_SPECIES` cargo exists. Cadence **#1520** full `sessions` **44**/44 (this audit) does not exercise the body.

Grep of `git show 2d2e68c7 -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`/seed names/hardcoded coordinates.

C read of `dokick.c:1854–1906`, `makemon.c:1441–1473`, `do_name.c:81–87` / `:1538–1586`, `mkobj.c:253–265` / `:2648–2665`, `dog.c:576–579`, `dungeon.c:1856–1858`, `hacklib.c:114–119`, `obj.h` overlay, `hack.h` `DF_*` / `ROLL_FROM`, `monflag.h` M2 bits. JS SHA `dokick.js` / `do_name.js` / `makemon.js`.

## Actionable C-wrongs

None that Must-fix this next iter (do not steal Open `scrolltele` W-tower Override yn). Claimed minvent landing matches `:1854–1906` + `:1469–1470`.

C-wrong family remaining (map / later peel, not new Must-fix prepends):

1. Port `add_to_minv` `merged()` (`mkobj.c:2655–2658`) so post-`free_oname` stackables join like C instead of always prepending.
2. Do not invent a JS-only `migr_species` that disagrees with `corpsenm` on a live object — keep overlay semantics when `mksobj_migr_to_species` lands.

Named omits / do-nots:

3. `dog.c` `mon_arrive` `MIGR_LEFTOVERS` `DF_ALL`. `mksobj_migr_to_species`. mkmaze `stolen_booty`. `discard_minvent` else.
4. Do not import `fs`. Do not revert D-1193. Do not hardcode an orc name or recorded booty list. Do not skip `obj_delivery`’s `MIGR_TO_SPECIES` continue.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- Score: **7 / 10**
- One sentence: makemon now runs C’s `deliver_obj_to_mon(DF_NONE)` so matching `MIGR_TO_SPECIES` objects prepend into minvent with the orc christen/`rn2` envelope; `add_to_minv` still skips `merged()`, and booty producers remain named so the fortress never hits the body.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1193 `2d2e68c7`. Next port in this window popped Open `notice_mon_off`. Not leftovers, not merge.
