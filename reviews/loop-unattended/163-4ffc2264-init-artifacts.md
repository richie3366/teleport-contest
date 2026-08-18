# Review 163 — 4ffc2264 — artifact.c `init_artifacts` / `hack_artifacts` (D-1201)

## Metadata
- Full / short hash: `4ffc22640375259967152006030965b37bfa114c` / `4ffc2264`
- Parent: `ebe9c2a6` (review **159–162** + cadence #1525). This file audits **this SHA only**. Archive row **Addressed:** D-1201 `4ffc2264` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 05:38:58 +0200
- D-id: **D-1201**
- Stats: 12 files, +165 / −42 — `js/artifact.js` +56; `js/allmain.js` +5.
- Claims to close: Open queue `artifact.c` `init_artifacts` (named from D-1192 / D-1200 / review **162**). Not wizkit. `reviews/loop-2026-08-15/` has no unpaid `init_artifacts` Must-fix.
- JS / map: `artifact.js` `init_artifacts` / `hack_artifacts`; caller `allmain.js` `newgame`. `c-js-map/data.md` artilist row + `turns.md` newgame. save/rest `restore_artifacts`, sparse `roles[].questarti` still named.
- Prior reviews this SHA claims to close: **162** “next Open `init_artifacts`”; **154** named the call beside wizkit FALSE.

## Intent vs deliverable

Git subject promises: “Match C artifact.c init_artifacts so newgame zeros artiexist/artidisco and hacks gift/Excalibur/questarti, instead of leaving generated artilist unhacked.”

Old JS `newgame` never called `init_artifacts`. `init_objects` → `artifacts_globals_init` built artilist from generated raw and zeroed the two arrays, then left gift-role alignment, Excalibur’s Knight-only `role`, and `urole.questarti` at table defaults. C `allmain.c:792` calls `init_artifacts()` after `role_init`/`init_dungeons` and before `u_init_misc` so `$WIZKIT` can name artifacts; `artifact.c:111–116` memsets both arrays then `hack_artifacts`.

The diff **does** export `init_artifacts` (`artifacts_globals_init` + `hack_artifacts`) and call it at the C site. It does **not** pull `save_artifacts` / `restore_artifacts`, wizkit delivery, or `reset_glyphmap`. Named. JS rebuilds artilist from generated raw on every `init_artifacts` so a reused Node process matches a fresh C process’s compile-time table (C mutates `artilist[]` in place and does not restore it on the next `init_artifacts` in the same process). Contest runs are one game per process.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `init_artifacts` | C callee, **new** | `artifact.c:111–116` |
| `hack_artifacts` | C callee, **new** | `artifact.c:87–107`; C `staticfn` |
| `newgame` call after `init_dungeons` | C site, **new** | `allmain.c:792` |
| `artifacts_globals_init` | JS helper, **imported** | rebuilds artilist; zeros `artiexist`/`artidisco` |
| `Role_if` / `Role_switch` | **clone** of `you.h:247–248` | `urole.mnum`; matches C macros |
| `aligns[flags.initalign].value` | C data, **imported** | `roles.js` `aligns[].value` |
| `restore_artifacts` | C sibling, **named omit** | `artifact.c:133–146` |
| `roles[].questarti` sparse | data omit, **named** | Tourist/Rogue/… still 0 |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. No new RNG: `hack_artifacts` does not roll.

Grep of this SHA’s `js/` hunks: no banned gates. `fastforward_pre_mklev` is the pre-existing delete-only hook, not a new burn.

## C ↔ JS fidelity

### Caller vs `allmain.c:783–794`

C:

```
    init_objects();
    flags.pantheon = -1;
    role_init();
    init_dungeons();
    init_artifacts(); /* before u_init() in case $WIZKIT specifies
                       * any artifacts */
    u_init_misc();
```

JS (`allmain.js:608–617`): `setup_role_race_from_rc` (JS stand-in for `role_init` at this point) then `init_dungeons()` then `init_artifacts()` then `await u_init_misc()`. **Order of the claimed pair matches:** artifacts after dungeons, before `u_init_misc`. The C comment on `hack_artifacts` (“must be called after u_init()”) is stale; `allmain.c` calls it **before** `u_init_misc`. JS follows the caller, not the comment.

WIZKIT (`read_wizkit` + `obj_delivery(FALSE)`, D-1192) stays later, after inventory — C `:826–829`. This SHA does not move it.

### `init_artifacts` vs `artifact.c:111–116`

C memsets `artiexist` (`NROFARTIFACTS+1` `arti_info`) and `artidisco` (`NROFARTIFACTS` `xint16`) then `hack_artifacts()`. JS (`artifact.js:198–201`):

```
export function init_artifacts() {
    artifacts_globals_init();
    hack_artifacts();
}
```

`artifacts_globals_init` rebuilds `_artilist` from generated raw then zeros `artiexist` (`NROFARTIFACTS+1` bit-structs) and `artidisco` (`NROFARTIFACTS` zeros). **The two memsets are real, not a stub.** Rebuild is extra vs in-process C and is the right equivalent of a new C process.

`init_objects` already called `artifacts_globals_init` earlier. Calling it again at `init_artifacts` re-zeros after `role_init` has set `urole` / `flags.initalign`, which is what `hack_artifacts` needs. Double-zero is harmless.

### `hack_artifacts` vs `artifact.c:87–107`

C:

```
    int alignmnt = aligns[flags.initalign].value;
    for (art = artilist + 1; art->otyp; art++)
        if (art->role == Role_switch && art->alignment != A_NONE)
            art->alignment = alignmnt;
    if (!Role_if(PM_KNIGHT))
        artilist[ART_EXCALIBUR].role = NON_PM;
    if (gu.urole.questarti) {
        artilist[gu.urole.questarti].alignment = alignmnt;
        artilist[gu.urole.questarti].role = Role_switch;
    }
```

JS (`artifact.js:163–190`): `aligns[alignIdx].value` with `alignIdx = game.flags.initalign|0`; loop `i = 1 .. list.length` break on `!art.otyp`; same gift `role == Role_switch() && alignment !== A_NONE`; `!Role_if(PM_KNIGHT)` → `list[ART_EXCALIBUR].role = NON_PM`; `questarti` then align+role. **Branch order matches.** `ART_EXCALIBUR` is generated index 1. `A_NONE` is −128 (`const.js`), matching artilist `alignment: -128`. `Role_if` / `Role_switch` are `urole.mnum` like `you.h:247–248` (`#define Role_if(X) (gu.urole.mnum == (X))` / `#define Role_switch (gu.urole.mnum)`), not a glyph stand-in. JS `artifact.js:149–156` compares `game.urole?.mnum`. `aligns[flags.initalign].value` is the same table C uses; a bad `initalign` yields `0` via `| 0` on missing `.value`, which is A_NEUTRAL in this port’s `aligns[]` — C would be UB on a wild index, not a live chargen path.

C loop terminator is `art->otyp` (sentinel 0). JS `!art.otyp` treats 0 the same. Loop starts at 1 (skip `ART_NONARTIFACT`). Gift artifacts whose `role` is `NON_PM` are skipped (`Role_switch` is a PM_*). Excalibur’s generated `roleName: 'PM_KNIGHT'` stays Knight-only until the `!Knight` arm.

`questarti` on Tourist/Rogue/Samurai/… is still 0 in `roles.js` (only Arc/Bar/Pri/Wiz copied). The then-arm is live for those four; dead for the rest. Named. Do not invent questarti numbers from a seed.

| Case | C | JS after |
|------|---|---------|
| memset exist/disco | `:113–114` | **same** (rebuild + zero) |
| gift-role align | `:93–95` | **same** |
| Excalibur non-Knight | `:98–99` `role=NON_PM` | **same** |
| Knight Excalibur | leave `PM_KNIGHT` | **same** |
| `urole.questarti` nonzero | align + role | **same** |
| `questarti==0` | skip | **same** |
| `restore_artifacts` | redo hacks | **named omit** |

## Constitution / playbook

No FORCE / getRngLog / seed-shaped “if Tourist Excalibur”. Gift/Excalibur/questarti follow C `if`s. Rule #2: imports from `./roles.js` / generated artifacts only. Frozen contracts untouched. Do not pull `restore_artifacts` into this SHA. Do not hardcode Express Card / Magicbane otyps.

## Hallucinations / overclaim

D-log / CURRENT / subject say newgame zeros the two arrays and hacks gift/Excalibur/questarti. **Those three hacks plus the `allmain.c:792` call are the hunk.** Stamping **Addressed:** D-1201 is fair. This is **not** “Match C dispatch, callee is a stub”: `hack_artifacts` is the C body. Do **not** stamp “Match C `restore_artifacts`” or “Match C every `roles[].questarti`” or “Match C `mk_artifact` by_align.” Say so: JS rebuilds artilist (C does not, in-process); that is documented process-reuse, not a fake memset.

Fortress PASS does not prove Excalibur `role=NON_PM` for Tourist beyond chargen touch rules. Private canary **27**/27 walked Tourist NON_PM, Knight keep, chaotic gift-align, Wizard Magicbane/Eye, Express Card arm, process-reuse rebuild.

### Clone classification (this SHA)

- `init_artifacts` / `hack_artifacts` — C callees, new.
- `Role_if` / `Role_switch` — C macros, local clones that match `you.h`.
- `artifacts_globals_init` — imported real helper (memset + table rebuild).
- No no-op.

## Density

One C function plus its only callee, wired at the one `newgame` site. ~56 lines `artifact.js` + 4 `allmain.js`. Right-size §2b. Did not glue REVIVE timers or `#levelchange`. Queue forbade combining with wizkit.

## Verification

Journal: private canary **27**/27; green+strict seed8000/0900; cohort **16**/16 + strict 1500/1800/0012/0360/4500/2200/0014/0004/0700/0006/0108/0116. Public-unhit on non-Knight Excalibur role and on questarti rewrite except roles that already copied the field. This audit’s full `sessions` `__RESULTS_JSON__` at `dbd3a08b`: **44**/44 Scr **11405**/11405 RNG **792838**/792838 (100%) speed `32+0.27/turn` (R² 0.868) still does not wield Excalibur as a Tourist.

Grep of `git show 4ffc2264 -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/seed names/hardcoded coordinates.

C read of `artifact.c:80–146`, `allmain.c:783–794`, `you.h:247–248`. JS SHA `artifact.js` `init_artifacts`/`hack_artifacts`; `allmain.js:612–615`.

## Actionable C-wrongs

None that Must-fix this next iter (do not steal Open `scrolltele` unconscious). Claimed memset + three hacks match `:87–116` / `:792`.

C-wrong family remaining (map / later peel, not new Must-fix prepends):

1. `restore_artifacts` must `hack_artifacts` again after loading `artiexist`/`artidisco` (`artifact.c:133–142`). Bones/save still named.
2. Copy remaining `roles[].questarti` from `role.c` so the quest-artifact arm is not dead for Tourist/Rogue/Kni/….

Named omits / do-nots:

3. `mk_artifact` by_align / gen_spe. wizkit delivery (already D-1192). `reset_glyphmap`.
4. Do not skip D-1201. Do not restore artilist mutation-across-games as “more like C BSS.” Do not FORCE Excalibur role from a seed.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `newgame` now memsets artifact existence/discovery and runs C’s gift/Excalibur/questarti hacks after `init_dungeons`; save/rest redo and sparse `questarti` stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1201 `4ffc2264`. Next port in this window popped Open REVIVE/ZOMBIFY. Not wizkit, not `restore_artifacts`.
