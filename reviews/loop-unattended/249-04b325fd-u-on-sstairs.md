# Review 249 — 04b325fd — stairs.c u_on_sstairs → u_on_rndspot (D-1287)

## Metadata
- Full / short hash: `04b325fddda3344e32a6ee51f34f8fc4ec1d2c3e` / `04b325fd`
- Parent: `955022fe` (reviews **245–248**). JS parent `9486280d` (D-1286). This file audits **this SHA only**. Archive row **Addressed:** D-1287 `04b325fd` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 16:09:20 +0200
- D-id: **D-1287**
- Stats: 12 files, +158 / −52 — `js/mklev.js` +65 / −~15; `js/do.js` +21 / −13; `js/allmain.js` +2 / −1; comment `js/hack.js`.
- Claims to close: Open `stairs.c` `u_on_sstairs` → `u_on_rndspot` (named from D-1278 / review **240**). Not cmd wiz. `reviews/loop-2026-08-15/` has no unpaid sstairs Must-fix.
- JS / map: `mklev.js` `u_on_sstairs` / `u_on_upstairs` / `u_on_dnstairs` / `stairway_find_dir` / `stairway_find_special_dir`; `do.js` `goto_level`; `allmain.js` `newgame`; `c-js-map/turns.md`. cmd.c `makemap_prepost` named (shipped next SHA).
- Prior reviews this SHA claims to close: **240** named omit `u_on_sstairs` fallback after `u_on_rndspot` gained live `switch_terrain`.

## Intent vs deliverable

Git subject promises: “Match C stairs.c u_on_sstairs so missing special stairs place via u_on_rndspot, instead of a raw place_lregion that skips switch_terrain.”

C `u_on_sstairs` (`stairs.c:111–120`): `stairway_find_special_dir(upflag)`; hit → `u_on_newpos`; else `u_on_rndspot(upflag)`. Wrappers `:125–132` / `:137–144`: ordinary `stairway_find_dir(TRUE/FALSE)` else `u_on_sstairs(0)` / `u_on_sstairs(1)` (comments: destination upstairs implies moving down / dnstairs implies moving up). Finders `:79–86` / `:99–108`: first `tmp->up == up`; special `tolev.dnum != u.uz.dnum && tmp->up != up` (C boolean `!=`). Callers: `do.c` `goto_level` newdungeon `:1753/:1771`; ordinary missing-stair `:1755/:1773`; `allmain.c` `newgame` `:808` `u_on_upstairs`.

Old JS: `u_on_upstairs` placed special then `place_lregion(..., LR_UPTELE)` with no `switch_terrain`. Downstairs `goto_level` walked `!s.up` then fell back to upstairs.

The diff **does** live `u_on_sstairs` → await D-1278 `u_on_rndspot`, upstairs/dnstairs wrappers, boolean `!!` finders, and the four `goto_level` / `newgame` awaits. It does **not** wire cmd.c `makemap_prepost` (D-1288). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `u_on_sstairs` | C `:111–120`, **new** | async; else await rndspot |
| `u_on_upstairs` / `u_on_dnstairs` | C `:125/:137`, **rewired** | now async wrappers |
| `stairway_find_dir` | C `:79–86`, **rewired** | `!!s.up === !!up` analog of `tmp->up == up` |
| `stairway_find_special_dir` | C `:99–108`, **rewired** | `!!s.up !== !!up` analog of `!=` |
| `u_on_rndspot` | C `dungeon.c:1605`, **imported live** | D-1278 `switch_terrain` after place |
| `u_on_newpos` | C, **pre-existing live** | special-stair hit |
| `goto_level` newdungeon / ordinary | C `:1753–1773`, **awaited** | was upstairs-subset / local dnst loop |
| `newgame` `u_on_upstairs` | C `allmain.c:808`, **awaited** | |
| cmd wiz `u_on_rndspot` | C `cmd.c:1045`, **named omit** | D-1288 |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG** in the wrappers (`place_lregion` `rn1` is pre-existing inside live rndspot).

## C ↔ JS fidelity

Pinned C (`stairs.c:111–144`):

```
u_on_sstairs(int upflag) {
    stairway *stway = stairway_find_special_dir(upflag);
    if (stway)
        u_on_newpos(stway->sx, stway->sy);
    else
        u_on_rndspot(upflag);
}
u_on_upstairs: find_dir(TRUE) else u_on_sstairs(0);
u_on_dnstairs: find_dir(FALSE) else u_on_sstairs(1);
```

JS copies that order. Callee `u_on_rndspot` is live D-1278 (place then unconditional `switch_terrain`). This is **not** “Match C dispatch, callee is a stub.” Old `place_lregion(LR_UPTELE)` on missing upstairs skipped that last line and used the wrong rtype: C `u_on_sstairs(0)` → `u_on_rndspot(0)` is **dndest `LR_DOWNTELE`**, not updest. Zero dest still fills the whole map (`!lx`), so public stair-present levels do not exercise the rtype; the leftover-Lev path now matches C when rndspot actually runs.

Finders: C integer `==` / `!=` on `boolean`. Callers pass `0`/`1`. JS `!!` normalizes `1` vs `true` on `s.up` (same 0/1 polarity). Special also `(s.tolev?.dnum|0) !== dnum`. Match the C `!=` that the subject named.

`goto_level`: climbing + `newdungeon` → `u_on_sstairs(1)`; else `u_on_dnstairs`. Descent + `newdungeon` → `u_on_sstairs(0)`; else `u_on_upstairs`. Same 0/1 as C `:1753–1773`. Ordinary `stairway_find_from` hit still `u_on_newpos` (not this SHA).

## Hallucinations / overclaim

Subject + D-1287 say missing special stairs place via `u_on_rndspot` instead of raw `place_lregion`. **The three stairs.c functions + the four awaits are the hunk.** Stamping **Addressed:** D-1287 is fair. Do **not** stamp “Match C `On_W_tower_level`.” Do **not** stamp “Match C `goto_level` W-tower bit 2.” Do **not** stamp “Match C cmd.c `makemap_prepost`.” Do **not** stamp “Match C `u_on_newpos` `MAX_TYPE`.”

## Density

One C function plus its two wrappers plus the live `goto_level` / `newgame` sites. ~65 JS lines in `mklev.js`. Did not glue `#wizmakemap`. Right size.

## Branch-by-branch confirm

1. Ordinary upstairs present: `find_dir(true)` → `u_on_newpos`. No rndspot. Match `:129–130`.
2. Ordinary downstairs present: `find_dir(false)` → `u_on_newpos`. Match `:141–142`.
3. Missing ordinary up, special with `up` and other `dnum`: `u_on_sstairs(0)` places that stair. Match `:115–118` with `up != 0`.
4. Missing ordinary up, no special: await `u_on_rndspot(0)` (dndest + `switch_terrain`). Match `:119–120`.
5. Missing ordinary down, no special: await `u_on_rndspot(1)` (updest). Match dnstairs → sstairs(1).
6. `goto_level` newdungeon climb: `u_on_sstairs(1)`. Match `:1753`.
7. `goto_level` newdungeon descent: `u_on_sstairs(0)`. Match `:1771`.
8. `goto_level` same-dungeon missing down: `u_on_dnstairs` not the old local `!s.up` loop. Match `:1755`.
9. `newgame`: await `u_on_upstairs` before `makedog`. Match `:808`.
10. cmd wiz / bit 2: not this SHA. Named. Public-unhit unless arrival via missing sstairs with leftover Lev/Fly `FROMOUTSIDE`.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No recorded coordinates. Plain ESM. Did not invent a frame-alignment queue.

## Verification

Journal: private canary **16**/16; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session arrives via missing sstairs. Cadence this audit: full `sessions` at HEAD `67c863ad` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). This SHA’s fortress claim is the later HEAD; I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. The else branch calls live D-1278 `u_on_rndspot`; wrappers pass C’s 0/1; `goto_level` awaits so `switch_terrain` runs before later landing work.

Named omits (map, not Must-fix):

1. `cmd.c` `makemap_prepost` `u_on_rndspot` (Open then D-1288)
2. `On_W_tower_level` around rndspot exclusion
3. `goto_level` `was_in_W_tower` bit 2 (D-1179)

Do not Must-fix “`!!` boolean normalize.” Do not Must-fix “downstairs no longer inlines `find_dir`.” Do not pull `#wizmakemap` this SHA.

## Callers / RNG ledger

C: `goto_level` / `u_on_upstairs` / `u_on_dnstairs` / (cmd later). JS: same three live sites + `newgame`. Place `rn1` only inside rndspot, unchanged. Public fortress is not evidence a missing-sstairs landing unblocked leftover levitation.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: missing special stairs now await live `u_on_rndspot` (and `switch_terrain`); cmd wiz placement stayed named for D-1288.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1287 `04b325fd`.
