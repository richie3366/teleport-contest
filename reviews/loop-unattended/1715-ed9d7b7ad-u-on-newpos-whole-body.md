# Review 1715 — ed9d7b7ad — u_on_newpos whole body (D-2756)

- SHA: `ed9d7b7ad` (`dungeon.c` u_on_newpos places, shares the steed, and senses, D-2756)
- Files: 9 js files, +169/−106 — one function family + its callers
- D-log: D-2756; queue row: Open (C `dungeon.c:1568–1601` absent), 0 corpus blocks
- Banned grep on diff: 0 hits

## Intent vs deliverable

Subject promises the whole `u_on_newpos` body. Diff delivers: `js/mklev.js`
`u_on_newpos` restarted (sync 3-liner → `export async function`, C order),
all call sites converted to `await`, caller-side steed/coordinate
duplicates dropped, `put_lregion_here`/`place_lregion` return the promise
for TELE arms, `u_on_rndspot` awaits, `moveloop_preamble` gains the
`uz0.dlevel` copy. Promise kept.

## Inventory

| JS symbol | Class | C counterpart |
|-----------|-------|---------------|
| `u_on_newpos` (mklev.js:525) | C callee, restarted | `dungeon.c:1567–1601` (csym range) |
| `moveloop_preamble` dlevel copy | C statement | `allmain.c:97` |
| caller edits (cmd/do/dothrow/monmove/teleport/trap/mklev) | wiring | 17 call sites |

`sym.mjs`: `on_level` dungeon.js:1269 ✓, `isok` (both exports C-shaped
`x>=1`) ✓, `Blind` invent.js:359 ✓, `Hallucination` display.js:1054 ✓,
`see_nearby_objects` ✓, `map_location` ✓, `cliparound` async+awaited ✓,
`earth_sense` async+awaited ✓. No deleted symbols, no new clones.

## C ↔ JS fidelity

Branch-by-branch vs `dungeon.c:1567–1601`: `!isok` → off-map `panic`
(JS: throw, no place — NORETURN named) vs `x==0` `impossible` + place ✓;
`ux/uy` ✓; `cliparound` unconditional (CLIPPING defined,
`config.h:538`) ✓; `uundetected=0` ✓; steed share ✓; `!on_level` →
`ux0/uy0` + `map_location(FALSE)` + `terrain_typ=MAX_TYPE` ✓ else
`!Blind && !Hallucination && !uswallow` → `see_nearby_objects` ✓;
`earth_sense()` last ✓. No RNG in body.

Callers — `csym --callers` lists 22 refs, 17 real + 5 comments; D-log maps
all 17 to awaited JS sites and `git grep` at the SHA confirms every one
(incl. dynamic-import sites teleport.js:797/1524, trap.js:7119, and
mv_bubble mklev.js:17790). Comment-only refs (display.c:928,
dothrow.c:915, dungeon.c:1611, hack.c:2924, teleport.c:550) correctly
excluded.

Async hazard audit (the one structural risk — sync→async through
level-gen): TELE arm reachable only via `u_on_rndspot`, which awaits
`place_lregion` at all 3 sites. The two variable-`rtype` loader calls are
guarded: maze loader diverts TELE to updest/dndest before 5062, and
`fixup_special`'s 2353 call sits inside the BRANCH/PORTAL/STAIR case
(TELE has its own dest-stash case). Non-tele arms still return `true`
synchronously. `domove` end: C `hack.c:2934` calls `u_on_newpos`
unconditionally ("possibly back to where hero started"), so dropping the
old `did_step`-gated `see_nearby_objects` matches C. `moveloop_preamble`
copy matches `allmain.c:97` post-`encumber_msg`; the skipped
`defer_see_monsters`/`see_monsters` (`:92–95`) is a named omission.

## Hallucinations / overclaim

None. The D-log records the cohort FAIL (`seed0004` yellow `*`) and the
fix, rather than claiming first-pass green. Omissions named per site.

## Density

169 insertions / 9 files for a 35-line C body + 17 wired callers +
preamble statement: right-sized, one family.

## Verification

Re-ran `hidden-proxy.mjs verify u_on_newpos --base ed9d7b7ad~1
--reach-all` → 0 blocked, smoke 24/24 REACH-OK. Matches the bullet
(row cited 0 blocks; vacuous note stated). Green/strict/cohort/full as
claimed; the recorded gate is the post-fix re-run, disclosed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
