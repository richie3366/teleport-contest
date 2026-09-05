# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-05 — D-1860 mkroom.c fill_zoo COCKNEST statue loot + ANTHOLE antholemon/food

**C locus:** `mkroom.c` `fill_zoo` `:276–452` (COCKNEST `:402–412` `if (!rn2(3)) mk_tt_object(STATUE)` + `rn2(5)` `mkobj(RANDOM_CLASS)` loop + `weight`; ANTHOLE `:414–416` `if (!rn2(3)) mkobj_at(FOOD_CLASS)`; mon pick `:330–341` `ANTHOLE ? antholemon()`; flags `:436–450` `has_barracks`/`has_swamp`); `antholemon` `:501–527` (`ubirthday%3 + level_difficulty()`, `G_GONE` retry, no RNG); `mk_tt_object` `mkobj.c:2225–2248` (`tt_oname` → `rn1` role; empty RECORD burns `rnd(10)` via `sysopt.tt_oname_maxrank=10`).
**JS:** `js/mklev.js` `antholemon` + `fill_zoo` (+3 ant consts, doc list); `docs/c-js-map/data.md` mkroom section.
**Change:** port `antholemon()` (ubirthday%3 + difficulty, `G_GONE` retry, null if all gone, no RNG) + `PM_SOLDIER_ANT`/`PM_FIRE_ANT`/`PM_GIANT_ANT` consts; add the ANTHOLE pm arm; add the COCKNEST statue arm and ANTHOLE food arm in C RNG order reusing the same-file `mk_tt_object` (empty-record `rnd(10)` footprint, shared with the MORGUE arm — no clone #3, no new cross-module edge); add `has_barracks`/`has_swamp`.
**Verify:** `node scripts/verify.mjs --fn fill_zoo` → PASS syntax (1 changed js file: js/mklev.js) · PASS rule2 · PASS hidden verify fill_zoo: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (tour-Ranger-70021-d5-8-15-17-22: PASS) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed).
**Named:** SWAMP `mkswamp` still deferred; `tt_oname` RECORD entries (plgend/classmon/christen) still the empty-record stub (shared with MORGUE); `antholemon()` `do_mkroom` gate unchanged.
**Next:** Open `dungeon.c` `induced_align` (queue head after this ships).

## 2026-09-05 — D-1859 hack.c moverock_core Sokoban diagonal won't-roll

**C locus:** `hack.c` `moverock_core` `:441–448` (`Sokoban && u.dx && u.dy` → Blind `feel_location(sx,sy)`, `pline("%s won't roll diagonally on this %s.", The(xname(otmp)), surface(sx,sy))`, `cannot_push`); `surface` `dungeon.c:1750`; `Sokoban` ≡ `level.flags.sokoban_rules` (`rm.h:538`).
**JS:** `js/hack.js` `moverock_core` + `surface` import; `js/sit.js` `surface` export.
**Change:** port the arm in C order (inside clear-dest branch, after ttmp/mtmp fetch, before revive_nasty/monster): `Sokoban_here() && u.dx && u.dy` → Blind `feel_location`, awaited pline with `The(xname(otmp))` + shared `surface(sx,sy)`, `return cannot_push(...)`. Promote `sit.js` `surface` (fullest `dungeon.c` clone: air/cloud/fountain/altar/headstone/wall/doorway/floor/ground) to the shared export instead of writing clone #5; import in `hack.js` (same 87-module SCC, runtime-only call, no top-level read).
**Verify:** `node scripts/verify.mjs --fn moverock_core` → PASS syntax (2 files) · rule2 · hidden 2 PASS / 0 moved / 0 unchanged / 0 worse → PROGRESS (both sessions PASS) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 (auto: shared file changed).
**Named:** shop `costly` computation, `revive_nasty`, trap/teleport/pool arms, Levitation/verysmall Blind feels, tunneling chew, `y_monnam` steed wording (all still deferred in the `moverock_core` envelope).
**Next:** Open `mkroom.c` `fill_zoo` (queue head after this ships).

## 2026-09-05 — D-1858 mkmaze.c makemaz Sam-strt/loca/goal/fila/filb load_special (Samurai quest 5/5)

**C locus:** `dat/Sam-strt.lua` / `Sam-loca.lua` / `Sam-goal.lua` /
**JS:** `js/mklev.js` `load_sam_strt` / `load_sam_loca` / `load_sam_fila` /
**Change:** `load_sam_strt` from the lua body: solidfill STONE +
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** humidity-aware `get_location` for water-likers;
**Next:** Open `hack.c` `moverock_core` (2 corpus blocks). Not Sam.

## 2026-09-05 — D-1857 uhitm.c mhitm_ad_slee sleep attack (mhitu rn2(5) vs knockback rn2(3))

**C locus:** `uhitm.c:3479–3522` `mhitm_ad_slee` (homunculus
**JS:** `js/mhitm.js` `mhitm_ad_slee` + `mdamagem` AD_SLEE case
**Change:** port the three arms with C branch/RNG order. `js/mhitm.js`
**Verify:** `node scripts/verify.mjs --fn mhitm_ad_slee` → PASS
**Named:** `defended(mon, AD_SLEE)` orange-scales/artifact
**Next:** Open `mkmaze.c` makemaz `Sam-strt`/`-loca`/`-goal`/`-fila`/`-filb`

## 2026-09-05 — Audit reviews 818–826 (D-1848…D-1856, no port)

**Scope:** every `js/` commit since review 817, oldest first, one file
per SHA written as that SHA finished. 818 ACCEPT (813 Must-fix held:
2 PASS + 2 moved past on re-run). 819 ACCEPT (mineralize 2 PASS
reproduced). 820 ACCEPT (PICK_ONE/PICK_NONE = `wintty.c:1353/:1738`).
821 ACCEPT (full `dofire` envelope, 2 PASS reproduced). 822
ACCEPT-WITH-DEBT (Val 5/5 maps byte-equal; flip-lregion stays standing
`data.md:696` debt). 823 ACCEPT (knox uses storing `l_levregion`,
flipped correctly). 824 ACCEPT (collapse = prefix+found=5 chain, 2
PASS + 2 moved reproduced). 825 ACCEPT (callee live, not stubbed).
826 ACCEPT (bigrm-2 arms mirror unlit rects, 1 moved reproduced).
**No Must-fix, no STOP.** Rule #2 clean.
**Score:** full `sessions` 44/44, Scr 11,405/11,405, RNG
792,838/792,838, speed `47+0.36/turn`. Hidden proxy 230/265 (86.8%)
excl. 13 env; RNG 99.44%, screens 99.2%. Top: hitum/moverock/`mhitm_ad_phys`/remarm/`!`/dog_invent 2.
**Next:** Open `uhitm.c` mhitm_ad_slee (1 corpus block) per queue.
**Scoreboard note:** full `hidden-proxy score` reproduced 230/278 twice
(deterministic); two still-failing rows match more screens on current
code (seed0015-eb7e90ad 33→70/72, seed2200-d38fcac6 217→256/258) —
downstream realignment, unattributed to one SHA. Not staged: this
commit stays docs-only; the next port iter refreshes those rows with
its own verify. PASS/RNG/screen aggregates cited above are identical
with or without that file.

## 2026-09-05 — D-1856 sp_lev.c lspo_replace_terrain bigrm-2 ice replace on darkness:grow()

**C locus:** `dat/bigrm-2.lua` (`des.replace_terrain({ selection =
**JS:** `js/mklev.js` `load_bigrm_2` (+22/−2).
**Change:** build the darkness selection per choice arm (absolute
**Verify:** `node scripts/verify.mjs --fn lspo_replace_terrain` → PASS
**Named:** none new. bigrm-2 `flip_level_rnd` (noflip),
**Next:** Open `uhitm.c` mhitm_ad_slee (1 corpus block); new owner
