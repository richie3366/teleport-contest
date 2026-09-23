# Review 1701 — 09e6ef90d — `mon.c` monstone whole body (D-2742)

Metadata: commit `09e6ef90d`, D-2742, `js/mhitm.js` + one-word `export` on `js/mon.js` `unlink_minvent`. Coverage row (C 86 L / JS was 60 L), 0 corpus blocks. Also Stale-parks `mhitm_ad_drin`. No prior review claimed closed.

**Addressed:** D-2753 `4bd644114`

**Addressed:** D-2754 `a4348216d`

## Intent vs deliverable

Subject promises a C-order restart of `monstone` (statue/rock, eject `flooreffects`, lamplit `end_burn`, engulf `digests` pline) and a stale park of `mhitm_ad_drin`. The body restart is in the diff. The invisible-unmap predicate does not match C, and one of the eight claimed callers is a different function. Promise does not fully match deliverable.

## Inventory

Changed JS: `monstone` restarted (`js/mhitm.js:3248`); deleted local `obj_resists_00` and local `digests`; new import names `unlink_minvent`, `glyph_is_invisible`, `flooreffects`, `end_burn`, `obj_resists`, `digests`, `u_locomotion`. `unlink_minvent` gained `export`. No other function body edited.

## Callee closure

Required `sym.mjs` (deleted clone, re-pointed names):

```text
obj_resists_00   NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mon.js:1752
digests          js/mhitu.js:1118   sync
unlink_minvent   js/mon.js:1792   sync
obj_resists      js/dogmove.js:162   sync
glyph_is_invisible js/display.js:1366   sync
flooreffects     js/do.js:746   ASYNC — await required
end_burn         js/timeout.js:1645   sync
extract_from_minvent js/worn.js:654   sync
u_locomotion     js/hack.js:2061   sync
             !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
               js/do.js:549  js/teleport.js:1962
```

`flooreffects` is awaited. `end_burn`, `obj_resists`, `digests`, `extract_from_minvent` are sync and called bare. `--can` for `do.js` / `timeout.js` / `dogmove.js` / `mhitu.js` / `hack.js` is **ALREADY** (the message's "new edges" is the same overclaim as review 1699). `obj_resists(obj,0,0)` matches `zap.c:1457–1473` (invocation tools return before `rn2(100)`; else `chance < (oartifact ? achance : ochance)`). `digests` matches `dmgtype_fromattack` (`mondata.c:698–708`) for `AD_DGST`+`AT_ENGL`. The mhitm `obj_resists_00` clone is gone; a different clone remains in `mon.js` and is not on this path.

`u_locomotion` is the live export. Its `locomotion(youmonst.data, def)` poly tail is already map-named (`turns.md`, D-0928). For `"jump"` the Lev/Fly lowercase arms match `hack.c:1816–1829`; a polymorphed hero still gets the default word. Named omit of the callee, not a new stub.

## C ↔ JS fidelity

C body `mon.c:3286–3373` (`csym`). Callers (`csym --callers`): `eat.c:646`, `mhitm.c:237`, `mhitm.c:786`, `mhitm.c:1050`, `mon.c:1439`, `mon.c:3547`, `trap.c:3879`, `uhitm.c:3963`, plus the `extern.h` decl.

Arms that match:

- `x,y` captured before `vamp_stone` (`:3290` vs the old post-rloc read) ✓
- `mhp=0`, `lifesaved_monster`, `!DEADMONSTER` return, `mtrapped=0` ✓
- Size/`rn2(2+((geno&G_FREQ)>2))` gate: JS `? 1 : 0` is the C 0/1 add ✓. One `rn2`, same place.
- Inventory loop: live `extract_from_minvent(mdef, obj, true, true)` then the disclosed `unlink_minvent` where-tag fallback (`mdrop_obj` precedent). `#if 0` carried-STATUE arm absent, correctly. Boulder / `obj_resists(obj,0,0)` → awaited `flooreffects(..., "fall")` continue else `place_object`; else lamplit `end_burn` and `oldminvent` chain ✓
- FEMALE / `!is_neuter` MALE / `G_UNIQ` HISTORIC, `mkcorpstat`, `has_mgivenname`→`oname`, container chain, `weight`, else `mksobj_at(ROCK)` ✓
- `stackobj`, `cansee`→`newsym`, `engulfing_u` saved before `mondead`, then `digests` + `You` + `xname` ✓. `You()` prefixes `You `, so the template matches `You("%s through an opening…")`. Extra `otmp` null guards are on the alloc-failure path only.

Invisible unmap does **not** match. C `:3358` is `glyph_is_invisible(levl[x][y].glyph)` and `display.h:773` is `(glyph) == GLYPH_INVISIBLE`. The old JS used `memory_glyph_is_invisible(loc)` (`display.js:1357`, the documented `lev->glyph` helper) plus a non-C `x > 0` guard. This commit drops `x > 0` (correct) and switches to `glyph_is_invisible(loc)` (`display.js:1366`), which is true for memory **or** `disp_glyph === GLYPH_INVISIBLE` **or** `remembered_glyph.invisible`. That helper's own comment says to prefer `memory_glyph_is_invisible` or `glyph_is_invisible_id` at C-cited sites. D-1774: gbuf is not `levl.glyph`. `unmap_object` can now fire when C would not.

Callers actually present: `eat.js:3319`, displace `mhitm.js:2069` (`mhitm.c:237`), gaze `mhitm.js:5520` (`mhitm.c:786`), `mon.js:2409` (`mon.c:1439`), `uhitm.js:846` `xkilled` (`mon.c:3547`; line drifted after later `uhitm.js` edits), `trap.js:3449` (`trap.c:3879`), `do_stone_mon` `mhitm.js:1720` (`uhitm.c:3963`). That is seven. `mhitm.c:1050` is the head of `mdamagem` (`:1032–1055`: defender `touch_petrifies` or digest-Medusa, `attk_protection`, then `monstone(magr)`). JS `mdamagem` (`:4193`) starts at `AD_STCK` / `AD_POLY` and never calls `monstone`. The map line's `mhitm.js:1717` is `do_stone_mon`, already counted as `uhitm.c:3963`.

`mhitm_ad_drin` Stale park: three split arms exist with C range cites (`mhitm.js:741` mon→mon, `uhitm.js:1919` hero→mon, `mhitu.js:2404` mon→you). Not re-walked arm-by-arm; not an empty stub.

## Hallucinations / overclaim

"all 8 C callers wired" double-counts `do_stone_mon` and misses `mdamagem`. "replaces the narrower memory-only check" treats the wider loc helper as the C macro. "new edges … SAFE" — `--can` is ALREADY on every sampled edge. "every callee live" skips the map-named `u_locomotion` poly tail (pre-existing, not a new omit). No FORCE/DIAG/seed/coordinate/`fastforward`. Rule #2 clean.

## Density

One C function, two files, ~68 JS insertions. Right-sized. The stale park is a same-iteration stale check, not a second port.

## Verification

Re-measured (`--base 09e6ef90d~1 --reach-all`). Parent scoreboard stamp is `fdd8e9f85`. Row cited 0 blocks, so the vacuous note is the expected one, and the D-log says "note 0 blocked", not a fake PASS.

```text
verify monstone: baseline 09e6ef90d~1 (scoreboard at fdd8e9f85) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify monstone: no corpus session is blocked on it at 09e6ef90d~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke monstone: no RNG-tagged reach; fixed smoke spread (24 run, 3.0s): 24 PASS, 0 regressed → REACH-OK
```

0 REGRESSED. The glyph widening and the missing `mdamagem` call are not corpus-hit. Green/strict/cohort per the D-log. Verification does not erase the predicate mismatch (review 1688 precedent).

## Actionable C-wrongs

1. `monstone` unmap uses `glyph_is_invisible(loc)` (`js/mhitm.js:3304`) instead of C `glyph_is_invisible(levl[x][y].glyph)` (`mon.c:3358`, `display.h:773`). Call `memory_glyph_is_invisible(loc)` (or `glyph_is_invisible_id` on the memory glyph). Keep the `x > 0` removal.
2. `mdamagem` never calls `monstone` for C `mhitm.c:1032–1055` (petrifying defender / digest-Medusa, `attk_protection`, then `monstone(magr)`). Wire that head. Do not point it at `do_stone_mon`.

Verdict: **QUALITY-RISK**
