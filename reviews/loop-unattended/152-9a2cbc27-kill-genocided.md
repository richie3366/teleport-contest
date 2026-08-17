# Review 152 — 9a2cbc27 — do.c `goto_level` `kill_genocided_monsters` (D-1190)

## Metadata
- Full / short hash: `9a2cbc27f9524fafb80dd8801181c920117e9341` / `9a2cbc27`
- Parent: `15dddffe` (D-1189). This file audits **this SHA only**. Archive row **Addressed:** D-1190 `9a2cbc27` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 00:41:08 +0200
- D-id: **D-1190**
- Stats: 12 files, +105 / −49 — `js/do.js` +12 / −6 (import + one call after `losedogs`); `js/mon.js` comment only.
- Claims to close: Open queue `do.c` `goto_level` `kill_genocided_monsters` (named). Not `run_timers`. Reviews **58** / **140** / **150** named `do.c:1817` after D-1097’s list walk. `reviews/loop-2026-08-15/` has no unpaid `kill_genocided` Must-fix.
- JS / map: `do.js` `goto_level`; callee `mon.js` `kill_genocided_monsters` (D-1097). `c-js-map/data.md` / `turns.md`. Cham `newcham`, cmd.c wiz-level-change, `run_timers` (D-1191) still named at this SHA.
- Prior reviews this SHA claims to close: **58** named omit of the `goto_level` caller; **150** “not `kill_genocided`” (that was the visctrl peel).

## Intent vs deliverable

Git subject promises: “Match C do.c goto_level kill_genocided_monsters so migrating genocided monsters die on arrival.”

Old JS: `obj_delivery(FALSE)` then `losedogs()` then `m_at` / `u_collide_m`. C also calls `kill_genocided_monsters()` so a species wiped while those mons were in limbo dies here (possessions land on this level) and `kill_eggs` walks invent / fobj / migrating / buried.

The diff **does** import the existing callee and call it after `losedogs`, before collide. It does **not** pull `run_timers`, `notice_mon_off`, cmd.c `#levelchange`, or cham `newcham`. Named. The `mon.js` hunk is a comment: `goto_level` is no longer listed as a missing caller.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `goto_level` call | C site, **new** | `do.c:1817` after `losedogs` |
| `kill_genocided_monsters` | C callee, **imported** | `mon.c:5639–5677`; JS `mon.js:2233–2254` (D-1097) |
| `mondead` | C callee, **imported** | live-mon wipe |
| `kill_eggs` | C callee, **imported** | invent/fobj/migrating/buried + minvent |
| `newcham` | C callee, **named omit** | empty `if` when cham imitates a genocided form |
| `run_timers` | C next line, **named omit** | D-1191 (next SHA in this window) |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean.

**New RNG on this path:** none in the call. `mondead` / `kill_egg` may consume RNG only if a genocided migrant actually dies. Path **public-unhit** unless a G_GENOD species migrates across a level change.

Grep of this SHA’s `js/` hunks: no banned gates.

## Constitution / playbook

No FORCE / RNG-index / seed-shaped genocide list. The call is the C site, not a public-FAIL peel (suite already PASS). Rule #2: import from `./mon.js` only. Do not invent a “skip if no G_GENOD on this seed” gate. Frozen contracts untouched.

## C ↔ JS fidelity

### Call order vs `do.c:1813–1828`

C:

```
if (Punished) placebc();
obj_delivery(FALSE);
losedogs();
kill_genocided_monsters(); /* for those wiped out while in limbo */
run_timers();
if ((mtmp = m_at(u.ux, u.uy)) != 0)
    u_collide_m(mtmp);
```

JS after this SHA (`do.js:1662–1672`): `await obj_delivery(false)`; `losedogs()`; `kill_genocided_monsters()`; then `m_at` / collide. `run_timers` is still the next Open row (shipped in `cc7d0ef5`). **Order of this call matches `:1817`.** `losedogs` first is required: migrating mons must be on `fmon` before the wipe (C comment at `:5646–5648`).

### Callee vs `mon.c:5639–5677`

Pinned C (`mon.c:5656–5676`):

```
    for (mtmp = fmon; mtmp; mtmp = mtmp2) {
        mtmp2 = mtmp->nmon;
        if (DEADMONSTER(mtmp))
            continue;
        mndx = monsndx(mtmp->data);
        kill_cham = (ismnum(mtmp->cham)
                     && (svm.mvitals[mtmp->cham].mvflags & G_GENOD));
        if ((svm.mvitals[mndx].mvflags & G_GENOD) || kill_cham) {
            if (ismnum(mtmp->cham) && !kill_cham)
                (void) newcham(mtmp, (struct permonst *) 0, NC_SHOW_MSG);
            else
                mondead(mtmp);
        }
        if (mtmp->minvent)
            kill_eggs(mtmp->minvent);
    }
    kill_eggs(gi.invent);
    kill_eggs(fobj);
    kill_eggs(gm.migrating_objs);
    kill_eggs(svl.level.buriedobjlist);
```

C walks `fmon`, skips `DEADMONSTER`, `mndx = monsndx`, `kill_cham` if `ismnum(cham) && G_GENOD` on the cham form; then if species or cham is genocided: `newcham(NULL, NC_SHOW_MSG)` when imitating, else `mondead`; then `kill_eggs(minvent)` for every live mon. Then `kill_eggs` on invent / fobj / migrating_objs / buried.

JS (`mon.js:2233–2254`): same walk over a copy of `game.fmon`; `mhp < 1` skip; `mndx` from `data.mndx` / `mnum`; `kill_cham` same flags test; `mondead` on the wipe arm; `kill_eggs` on minvent then the four lists. **The dispatch is not a stub.**

The cham-imitating arm is an empty `if` (`// newcham … deferred`). C would `newcham` and keep the monster. JS leaves that cham alive in the genocided *form* (it does still `kill_eggs` its minvent — review **58** already fixed the old `continue`). Named omit from D-1097, not a new C-wrong of this call-site SHA. Do not treat the empty `if` as “Match C `newcham`.”

`kill_eggs` (`mon.js:2207–2225` / C `:5609–5635`): EGG → `dead_species(corpsenm, TRUE)` → `kill_egg`; else `Has_contents` recurse. TIN/CORPSE are `#if 0` in C. No RNG. Match the D-1097 walk.

JS invent is an **array**; C `gi.invent` is an `nobj` chain. `kill_eggs` already branches on `Array.isArray` (D-1097). `fobj` / `migrating_objs` / `buriedobjlist` / `minvent` stay chains. Do not rewrite invent to a chain in this peel.

`ismnum(cham)` / `G_GENOD` on `mvitals[cham]` is the cham-species wipe (`kill_cham`), not the imitating-form arm. JS `cham | 0` with `ismnum` matches. A cham whose **current** `mndx` is genocided but whose cham form is not takes the empty `newcham` arm — named.

`mondead` may drop inventory onto the cell. C wants possessions on **this** level (comment `:5646–5648`). That is why the call is after `losedogs` (migrants are placed) and before `run_timers` / collide. Calling it before `losedogs` would wipe them on the migrating list or miss them. JS order is C order.

cmd.c wiz-level-change (`cmd.c` ~1048) also calls this after its own `losedogs`. Still named. Do not pull `#levelchange` into a `goto_level` peel.

| Case | C | JS after |
|------|---|---------|
| call after `losedogs` | `:1817` | **same** |
| G_GENOD live mon | `mondead` | **same** |
| cham species genocided | `mondead` (`kill_cham`) | **same** |
| cham imitating G_GENOD | `newcham` | **named empty if** |
| eggs on the four lists | `kill_eggs` | **same** |
| cmd.c wiz-level-change | also calls | **named skip** |

## Hallucinations / overclaim

D-log / CURRENT / subject say migrating genocided monsters die on arrival because `goto_level` now calls the existing wipe. **That is the hunk.** Stamping **Addressed:** D-1190 is fair. This is **not** “Match C dispatch, callee is a stub”: `kill_genocided_monsters` / `mondead` / `kill_eggs` are live. Do **not** stamp “Match C `newcham`” or “Match C `run_timers`” on this SHA.

Review **58** already accepted the list walk and named this caller. Wiring it is the Open row, not a second invention of `kill_eggs`.

### Clone classification (this SHA)

- `kill_genocided_monsters` — C function, imported, live.
- No new helper. No no-op added at the call site. The empty cham `newcham` is a **pre-existing named omit**, not a new clone.

## Density

One C statement. §2b “one deferred if” is the too-small column; the suite is already PASS. The queued Open item **is** that one statement, and the callee already existed (D-1097). Acceptable as a map pop; do not split `run_timers` into a third theory in the same SHA (they did not). Next SHA in the window is the following C line.

Genocide-while-away is not exercised by the public 44. The cohort (level-change sessions) is the right fortress check: the new call must not consume RNG on the common path. Journal reported exact-length PASS — consistent with an empty wipe.

## Verification

Journal: green+strict seed8000/0900; cohort **10**/10 (1500/1800/0015/0002/0014/2200/4500/0367/0009/0012) + strict lengths. Public-unhit unless a genocided migrant arrives. Cadence **#1515** full `sessions` **44**/44 Scr **11405**/11405 RNG **792838**/792838 (100%) — fortress held.

Grep of `git show 9a2cbc27 -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`/seed names/hardcoded coordinates.

C read of `do.c:1813–1828`, `mon.c:5639–5677` / `:5609–5635`. JS SHA `goto_level` call + existing `kill_genocided_monsters`.

Review **58** already walked `kill_eggs` vs `:5609–5635` and the cham `continue` bug. This SHA does not retouch that body except the caller comment. Re-audit of `dead_species` / `kill_egg` is not required unless a later SHA edits them.

`goto_level` also has a **second** `obj_delivery(TRUE)` after `check_special_room` (C `:1978`). Genocide wipe is **not** repeated there. JS same. Do not add a second `kill_genocided_monsters` after TRUE.

## Actionable C-wrongs

None that Must-fix this next iter. The Open `goto_level` caller matches `:1817`.

Named omits / do-nots (map, not new prepends):

1. Cham `newcham(mtmp, NULL, NC_SHOW_MSG)` when imitating a genocided form (empty `if`).
2. cmd.c wiz-level-change caller after `losedogs`.
3. Do not skip this call on a later peel. Do not pull invent/migrating `RANGE_LEVEL` timers here (`obj_is_local` is false). `run_timers` is the next C line (D-1191), not this SHA.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `goto_level` now calls the existing `kill_genocided_monsters` after `losedogs`, so limbo-genocided arrivals die here and eggs on the C lists lose hatch timers.
- Must-fix stays empty for this SHA; archive hash `9a2cbc27`. Not `newcham`, not `run_timers`.
