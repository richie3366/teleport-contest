# Review 1302 — c5f1048b — sp_lev.c flip_level lregion coord update ×13 loaders (D-2336)

Metadata: SHA `c5f1048b`, D-2336, C-fidelity residual (queue row cited 0 blocks). Method: `git show` full `js/` hunk (`js/mklev.js` +152/−84, 20 hunks all read); C `flip_level sp_lev.c:531-922` (lregion arm `:698-734` read verbatim) + `l_get_lregion`/`levregion_add` (`:5406-5445`) + `fixup_special`/`place_lregions` (`mkmaze.c:573-646`) + `bad_location` (`mkmaze.c:341-355`) + `solidify_map` (`sp_lev.c:315-321`) + both `load_special` tails (`:6030-6055`, `:6470-6491`); JS `flip_level` lregion arm, `fixup_special`, `put_lregion_here`, `bad_location`/`within_bounded_area` bodies read; `sym.mjs` N/A (no deleted/re-pointed symbols — `place_lregion` stays live via fixup + soko drain); added-lines RNG/banned grep (0 hits); `hidden-proxy verify flip_level --base c5f1048b~1` re-run.

## Intent vs deliverable

Subject promises: 13 loaders store branch levregions pre-flip instead of placing post-flip at pre-flip offsets; flip remaps; fixup places. Diff delivers 13 `g.lregions.push({LR_BRANCH, inarea, delarea −1})` + 7 docstring retirements + the soko4-2 pre-solidify drain. Zero new module edges (all names file-local). Promise kept exactly.

## Inventory

- 13 pushes (Bar/Pri/Arc/Kni/Rog/Sam/Tou/Ran/Mon/Cav-strt + 2 map-art-hunk loaders + soko4-2), each pre-`flip_level_rnd`, post-flip `place_lregion` deleted.
- Ran-strt absolute `{51,2,77,18}` (islev) vs mx/my- or xstart/ystart-relative elsewhere.
- Soko4-2 drains `g.lregions` inline pre-`solidify_map` (BRANCH only), `fixup_special` then runs empty.

## C ↔ JS fidelity

Architecture now mirrors C end to end: C `levregion_add` stores des coords during build → `flip_level` flips inarea+delarea (`:698-734`, swap-if-inverted) → `fixup_special` (`mkmaze.c:585-646`) places via `place_lregion`. JS `flip_level` lregion arm is char-for-char C (pre-existing); JS `fixup_special` mirrors C (LR_BRANCH fallthrough, PORTAL lev resolve, TELE dest copy, array drain). C finish order wallify→flip→solidify→fixup→premap (`:6030-6055`) matches the loader tails. ✓

`delarea: −1×4` ≡ C exactly: `l_get_lregion` defaults exclude to −1×4 and forces `del_islev=TRUE` precisely so it stays "safely off the map" — the old `0,0,0,0` was the deviation (only inert because branch placement ignores the rect except `within_bounded_area`, where (0,0) can never match a stair cell either). Post-flip the stored −1 goes through the identical FlipX/FlipY formula both sides. ✓

Soko4-2 pre-solidify drain is behaviorally identical to fixup placement: C `solidify_map` only flags STWALL cells, never stairs — timing is unobservable. Ran islev absolute ≡ C `in_islev` (no `get_location`). Docstring retirements delete the false "(C also leaves lregions unflipped…)" line — C always flipped them. ✓

Cited C loci (all read, not inferred):

```c
/* sp_lev.c:698-734 flip_level lregion arm (both axes + swap-if-inverted) */
for (i = 0; i < gn.num_lregions; i++) {
    if (flp & 1) { /* FlipY inarea/delarea y1,y2 + reorder ... */ }
    if (flp & 2) { /* FlipX inarea/delarea x1,x2 + reorder ... */ }
}
/* sp_lev.c l_get_lregion: exclude defaults then del_islev forcing */
x1 = y1 = x2 = y2 = -1;
get_table_region(L, "exclude", &x1, &y1, &x2, &y2, TRUE);
/* "if x1 is still negative, exclude wasn't specified ... Force
 * exclude_islev to true so the -1,-1,-1,-1 region is safely off the
 * map and won't interfere with branch or portal placement." */
/* mkmaze.c:585-646 fixup_special: LR_BRANCH fallthrough → place_lregion
 * with inarea+delarea; TELE arms copy dests; array drained at the end. */
/* sp_lev.c:6030-6055 + :6470-6491 finish order (both load_special tails):
 * wallification → flip_level_rnd → count_level_features →
 * solidify_map → fixup_special → premap_detect. */
```

JS `flip_level` lregion arm is char-for-char the `:698-734` loop (pre-existing, re-read this audit including the delarea halves and both swap blocks) ✓. JS `fixup_special` (`mklev.js:1121+`) mirrors `mkmaze.c:585-646` case-for-case (BRANCH fallthrough with `added_branch`, PORTAL lev resolve incl. numeric-chute form, TELE/UPTELE/DOWNTELE dest copy, `game.lregions = []` drain) ✓ — so pushed regions are consumed exactly once, by the same consumer C uses.

Hunk inventory (20 hunks, all opened): 13 pushes (Bar/Pri/Arc/Kni/Rog/Sam/Tou/Ran/Mon/Cav-strt + soko4-2 + the two map-art-context loaders at −7456/−8436, each verified push-before-`flip_level_rnd(3,false)` with post-flip `place_lregion` deleted); 6 doc-only retirements (bigrm_12/wiz_goal/arc_goal/kni_goal/ran_filb/mon_filb, ±1 line each); soko4-1 doc-only (the "same Bar-strt pattern" line now true); soko4-2 push + inline BRANCH-only pre-solidify drain. Bar-strt hunk read end-to-end as the pattern exemplar (push → wallify → flip → fixup, old post-flip place deleted) ✓; Ran-strt absolute `{51,2,77,18}` ≡ `in_islev` (C `levregion_add` skips `get_location` for islev — JS pushes literals) ✓.

`bad_location` equivalence for the changed delarea: old `0,0,0,0` excluded only cell (0,0); new flipped-`−1` excludes nothing on the map either (both off-map by C's own design quote above) — and for LR_BRANCH the rect only feeds `within_bounded_area` in `bad_location` (JS `put_lregion_here` passes nlx..nhy straight through like C's `place_lregion` → `put_lregion_here`). No placement-search behavior change beyond the intended flip remap.

## Hallucinations / overclaim

None. "RNG-neutral by construction" verified true (0 RNG tokens in added lines; placement moves to C's own fixup slot). "Untouched" drains/portals confirmed present-but-unmodified in the diff (no hunks outside the 20 listed). Probe deleted per message (nothing in tree).

## Density

+152/−84 across 13 sibling sites of one C mechanism, one falsifier. At the envelope's large end but single-locus — acceptable.

## Verification

D-log tail PASS (syntax/rule2/green 2/2/strict ×2/cohort 7/7/full 44/44, final verify after last `js/` edit). Re-measured:

```text
verify flip_level: baseline c5f1048b~1 (scoreboard at 0e191fab) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches. Added-lines grep: 0 banned-pattern/RNG hits. `imports.mjs --rulecheck`: clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
