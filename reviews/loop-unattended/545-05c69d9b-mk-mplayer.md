# Review 545 — 05c69d9b — mplayer.c mk_mplayer (D-1584)

## Metadata
- Full / short hash: `05c69d9b9e21d928667f90031f1a7c95b58af3d7` / `05c69d9b`
- Parent: `7843458b` (D-1583). This file audits **this SHA only** (ninth of nine `js/` commits since review **536**). Archive **Addressed:** D-1584 (hash fill this review iter: `05c69d9b`).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 17:48:49 +0200
- D-id: **D-1584**
- Stats: `js/mplayer.js` +323 (new), `js/mklev.js` +11, `js/makemon.js` +6 export, `js/weapon.js` +9. Band **200–450** (js/ insertions **343**).
- Claims to close: Open RANDOM splev role-id `mk_mplayer` after D-1553. Not `create_mplayers`. Not `mongets` mplayer-sword `spe`. `reviews/loop-2026-08-15/` has no unpaid mk_mplayer Must-fix.
- JS / map: new `js/mplayer.js`; `mklev.js` `splev_create_monster`; `c-js-map/data.md` `src/mplayer.c`.
- Prior reviews this SHA claims to close: **514** / **536** named `mk_mplayer`.

## Intent vs deliverable

Git subject promises: RANDOM special-level role monsters (Archeologist..Wizard) get the hostile mplayer kit instead of ordinary `makemon`.

Pinned C `mplayer.c` `mk_mplayer` `:117–317`. Statics `dev_name` `:43–69`, `get_mplname` `:71–92`, `mk_mplayer_armor` `:94–115`. Callers `--callers`: `sp_lev.c` `create_monster` `:1986` (`m->id` range, `special=FALSE`); `create_mplayers` `:350`; comment in makemon. Callees `makemon`/`mongets`/`mpickobj`/`mkmonmoney`/`rnd_*_item`/`mk_artifact(A_NONE,99,FALSE)`/`is_art` Magicbane/`m_dowear`/`christen_monst`/`rank_of`/`rnd_class`/`monmightthrowwep` (`weapon.c:679–688`, `--callers` only `mplayer.c:269`). `is_mplayer` `mondata.h:157–158`. `is_spear` `obj.h:233–234`. Setter `create_mplayers` `do.c:2049` named.

```1983:1988:nethack-c/upstream/src/sp_lev.c
    if (m->sp_amask != AM_SPLEV_RANDOM)
        mtmp = mk_roamer(pm, Amask2align(amask), x, y, m->peaceful);
    else if (PM_ARCHEOLOGIST <= m->id && m->id <= PM_WIZARD)
        mtmp = mk_mplayer(pm, x, y, FALSE);
    else
        mtmp = makemon(pm, x, y, m->mm_flags);
```

Old JS: D-1553 amask/`mk_roamer` live; RANDOM role-id stayed `makemon`. No `js/mplayer.js`.

The diff **does** add live `mk_mplayer` + helpers, splev `mid` Archeologist..Wizard, export `rnd_*_item`, `monmightthrowwep` on `rwep[]`. It **does not** port `create_mplayers` (`do.c:2049`), `mongets` mplayer-sword `spe=3+rn2(4)` (`makemon.c:2200–2202`). Named. Occupied `rloc` is fire-and-forget (JS `rloc` async) like `mk_roamer_splev`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mk_mplayer` | C `:117–317`, **LIVE this SHA** | one export |
| `dev_name` / `get_mplname` | C `:43–92`, **LIVE this SHA** | special-only |
| `mk_mplayer_armor` | C `:94–115`, **LIVE this SHA** | special-only |
| `splev_create_monster` mid | C `:1985–1986`, **LIVE this SHA** | `m->id` not post-mines `pm` |
| `monmightthrowwep` | C `:679–688`, **LIVE this SHA** | `RWEP_NAMES` ≡ `rwep[]` |
| `rnd_offensive/defensive/misc_item` | C muse, **LIVE** (exported) | not new bodies |
| `makemon` / `mpickobj` / `mongets` / `mkmonmoney` | **LIVE** | |
| `mksobj` / `rnd_class` / `weight` / `curse`/`bless` | **LIVE** | |
| `mk_artifact` / `is_art` | **LIVE** | special && rn2(2) |
| `m_dowear` / `christen_monst` / `rank_of` | **LIVE** | special-only |
| `is_mplayer` | C macro, **LIVE** | |
| `is_spear` | C `:233–234`, **CLONE** | WEAPON + `P_SPEAR` |
| `create_mplayers` | C `:326–353`, **OMIT named** | `sym`: NOT FOUND |
| `mongets` mplayer-sword spe | C `:2200–2202`, **OMIT named** | |
| occupied `rloc` | C `:126–127`, **CLONE** | async fire-and-forget |

`node scripts/csym.mjs mk_mplayer` → `:117-317`. `--callers`: sp_lev `:1986`; mplayer `:350`; makemon comment `:578`. `monmightthrowwep` → `:679-688`. `create_mplayers` `--callers`: `do.c:2049` only.

RNG: many `rn2`/`rnd`/`rn1`/`d` in kit + `rnd_*_item`. No seed gate. splev `special=FALSE` skips christen/armor/`mk_artifact` RNGs.

`node scripts/sym.mjs` on new / re-pointed names:

```
mk_mplayer       js/mplayer.js:168   sync
mk_mplayer_armor NOT EXPORTED — 1 LOCAL js/mplayer.js:148
get_mplname      NOT EXPORTED — 1 LOCAL js/mplayer.js:130
dev_name         NOT EXPORTED — 1 LOCAL js/mplayer.js:101
create_mplayers  NOT FOUND in js/**
monmightthrowwep js/weapon.js:270   sync
rnd_offensive_item js/makemon.js:1326   sync
rnd_defensive_item js/makemon.js:1812   sync
rnd_misc_item    js/makemon.js:1866   sync
is_mplayer       js/monsters.js:750   sync
rank_of          js/roles.js:709   sync
christen_monst   js/do_name.js:380   sync
m_dowear         js/worn.js:632   sync
mk_artifact      js/artifact.js:742   sync
is_art           js/artifact.js:1691   sync
rnd_class        js/mkobj.js:652   sync
mkmonmoney       js/makemon.js:1789   sync
```

`--can mklev.js mplayer.js mk_mplayer`: ALREADY. `--can mplayer.js makemon.js rnd_offensive_item`: ALREADY. `--can mplayer.js weapon.js monmightthrowwep`: ALREADY. Do **not** add `mk_mplayer` #2 in mklev. Do **not** add `monmightthrowwep` #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Early-out. `!is_mplayer(ptr)` → null. **Match `:123–124`.** `PM_ARCHEOLOGIST=331` .. `PM_WIZARD=343` consecutive. Occupied `MON_AT` → `rloc(RLOC_ERR|RLOC_NOMSG)` then `makemon`. JS calls async `rloc` without await (same pattern as `mk_roamer_splev`). splev already `enexto`s (`:1976–1978` / `splev_resolve_occupied`), so the insurance rarely fires. **Named clone, not a stub kit.**

`special`. `!In_endgame` forces FALSE. splev always passes FALSE. **Match `:129–130` / `:1986`.** `makemon(..., NO_MM_FLAGS)`. **Match.**

Levels/HP. `rnd(16)`; `d(m_lev,10)+30`. **Match `:137–139`.** Then `mpeaceful=0`; `set_malign`. **Match `:146–147`.** Hostile vs `peace_minded` `makemon` is the splev delta.

Default kit then role `switch (monsndx)`. JS `ptr.mndx`. Branch order and `rn2` counts match Archeologist..Wizard including Tourist no-op and Wizard `shield=STRANGE_OBJECT`. default `impossible` + `weapon=0`. **Match `:149–254`.**

Weapon object. `mksobj(TRUE,FALSE)`; spe `rn2(4)` when !special; oerodeproof / else grease; skip `mk_artifact`; merge+`monmightthrowwep` → `quan += rn2(is_spear?4:8)`; `weight`; Magicbane `rnd(4)`; `mpickobj`. **Match `:256–276`.** JS `is_spear` ≡ `WEAPON_CLASS && oc_skill==P_SPEAR`. **Match `obj.h:233–234`.** `RWEP_NAMES` is C `rwep[]` `:498–503` (spears..cream pie). **Match `:679–687`.**

Always `rnd(3)` loops of `rnd_offensive/defensive/misc_item` + `mongets`. **Match `:305–313`.** Those three are existing muse ports (animal/expl/ghost/kop → 0, no RNG). Role monsters are not animals. `rnd_misc` See_invisible peaceful arm named; mplayers are hostile so the arm is dead here.

Special-only (`get_mplname`, fake Amulet, armor/cloak/helm/shield/gloves/boots, `m_dowear`, gems, `mkmonmoney`, `mkobj` RANDOM, `mk_artifact`). Bodies match C `:140–145` / `:278–304` / `:94–115` / `:43–92` but **splev never enters them**. `create_mplayers` is the C caller that would. **Named omit of that caller, not a stub inside the splev arm.**

splev gate. JS `mid` from `find_montype_gender` before mines/class; class letters leave `NON_PM` → `makemon`. C uses `m->id` not resolved `pm` (mines can clear `pm`). **Match the id-range test.** Non-RANDOM still `mk_roamer_splev`. **Match `:1983–1988`.**

Callee closure (RANDOM splev `"tourist"` / `"wizard"`, `special=FALSE`). LIVE: `is_mplayer`, `makemon`, `set_malign`, `rnd_class`, `mksobj`, `mpickobj`, `mongets`, `rnd_*_item`, `monmightthrowwep`, `weight`, `is_art`, `oc_merge_of`. CLONE verified: `is_spear`; `rloc` fire-and-forget. OMIT named: `create_mplayers`, `mongets` sword spe, special-only kit (not on this arm). STUB: **none** on the splev `special=FALSE` arm. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject RANDOM splev Archeologist..Wizard → hostile mplayer kit not `makemon`: **true.** Do **not** stamp “Match C `create_mplayers` / `final_level`.” Do **not** stamp “Match C `mongets` mplayer-sword `spe=3+rn2(4)`.” Do **not** stamp “Match C endgame `special=TRUE` kit on the public path” — splev forces FALSE. `rnd_*_item` export is not a new muse port. This is **not** “splev dispatch, `mk_mplayer` stub”: the file is the C body.

## Density

One `mplayer.c` family + the splev caller that **514** named + the one `weapon.c` callee the weapon arm reaches. +343 JS (new module). Large band, not “finish potions.” Did not glue `create_mplayers` in the same commit (named). §2b OK.

## Branch-by-branch confirm

1. `!is_mplayer`: null. **Match.**
2. RANDOM splev role id: `mk_mplayer(pm,x,y,false)` not `makemon`. **Match `:1985–1986`.**
3. Non-RANDOM: still `mk_roamer`. **Match.**
4. Class letter: `mid=NON_PM`, `makemon`. **Match.**
5. Hostile + `rnd(16)` HP + default/role weapon + three `rnd_*_item` loops. **Match.**
6. `special=FALSE`: no christen, no armor, no `mk_artifact`. **Match.**
7. Monk shuriken merge+throw: `quan += rn2(8)` (`is_spear` false). **Match.**
8. Eyes-off default nv not this SHA. Endgame `create_mplayers`. **Named.**
9. `mongets` sword spe on a later sword. **Named.**

## Callers / RNG ledger

C `mk_mplayer`: splev RANDOM role-id; `create_mplayers` (Astral, named). JS wires the splev site only. Extra `rn2`/`rnd`/`d` vs old `makemon` invent — **intended kit RNG**, not a seed gate. `monmightthrowwep` is a table walk, no RNG.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. One `mplayer.js` home. Do not add `mk_mplayer` in mklev. Do not add `monmightthrowwep` #2. Do not invent `create_mplayers` this review.

## Verification

D-log private canary **13**/13 (early-out; spawn hostile tourist `m_lev` 1..16; splev `"wizard"` hostile); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** unless a public session’s special level places a named Archeologist..Wizard with `AM_SPLEV_RANDOM`. Tourist dungeon `makemon` of other species is not this arm.

## Actionable C-wrongs

None for Must-fix. Named: `create_mplayers` (`do.c:2049`); `mongets` mplayer-sword `spe`; occupied `rloc` await; `rnd_misc` See_invisible peaceful (dead on hostile mplayers). Do not add `mk_mplayer` #2. Do not treat `special=FALSE` skipping armor as a miss of the splev caller.

Verdict: **ACCEPT-WITH-DEBT**
