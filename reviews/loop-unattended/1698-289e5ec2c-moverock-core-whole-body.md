# Review 1698 — 289e5ec2c — `hack.c` moverock_core whole body (D-2739)

Metadata: commit `289e5ec2c`, D-2739, `js/hack.js` (+368) + `js/trap.js` (2 export lines). Coverage row, 0 corpus blocks stated. No prior review claimed closed.

## Intent vs deliverable

Subject promises: full trap switch, shop costly, verysmall, revive_nasty, pool, fobj relink + `dopush(costly)`. The diff delivers the `:348–638` body in C order plus the `dopush` bill arms and two trap.js exports. Promise matches deliverable.

## Inventory

Changed JS: `moverock_core` (restarted), `dopush` (+`costly` param + bill arms), `cannot_push_msg` (wording fixed to C), new file-locals `Deaf_mr` + `rock_disappear_msg` (C staticfn shapes); `blow_up_landmine` + `launch_obj` export-only in trap.js (bodies untouched — 2-line diff). ~30 new import names, all on existing edges. No deleted symbols, no export clones.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (new exports + full async audit of the 14 previously-unseen callees):

```text
blow_up_landmine js/trap.js:5296   ASYNC — await required
launch_obj       js/trap.js:2449   ASYNC — await required
subfrombill      js/shk.js:1144   sync
fill_pit         js/dig.js:916   sync
deltrap          js/trap.js:1327   sync
feeltrap         js/trap.js:2387   sync
seetrap          js/trap.js:1296   sync
random_teleport_level js/teleport.js:2250   sync
get_level        js/dungeon.js:670   sync
add_to_migration js/mkobj.js:3143   sync
onshopbill       js/shk.js:2344   sync
shop_keeper      js/shk.js:257   sync
Soundeffect      js/sndprocs.js:38   sync
depth            js/hacklib.js:41   sync
stolen_value     js/shk.js:3001   ASYNC — await required
addtobill        js/shk.js:4038   ASYNC — await required
```

Every call site matches: the two async (`stolen_value`, `addtobill`) are awaited; all sync are bare. `Deaf_mr` is byte-identical to the 14× tree convention (`do.js:447`, `music.js:102`) — no live `Deaf` export exists, so file-local is the only shape; the extra `|| u.Deaf` disjunct is dead (no writers) but uniform. Hoisted `shop_keeper`/`find_objowner`/`onshopbill` out of the bill chain are pure lookups — no observable reorder. No STUB in any arm.

## C ↔ JS fidelity

C loci read verbatim: `moverock_core :348–638` (head/middle/tail), `dopush :166–244`, `rock_disappear_msg :315–324`, `cannot_push_msg :247–258`, `Deaf (youprop.h:125)`. Arm-by-arm:

- Loop/naming/top-of-pile/dest/nopick ✓ (incl. `There("is a boulder…")` — the commit fixes the old `pline` to C's `There`).
- Levitation (`You…leverage…the()`), verysmall, clear-dest gate, costly compute (`costly_spot && shop_keeper(*in_rooms…)`, with the empty-string→null equivalence verified) ✓.
- Sokoban diagonal, revive_nasty (exact string), monster-behind (Soundeffect confirmed real C; `!Deaf` gate; single-pline halves with `y_monnam`/upstart exact) ✓, closed-door ✓.
- LANDMINE (`rn2(10)`, extract+place+newsym, `(!Deaf||!Blind)` KAABLAMM/Gadzooks, `Tobjnam trigger` + madeby_u, blow_up, `fill_pit(u.ux,u.uy)`, cansee newsym, sobj_at return) ✓; PIT/SPIKED (viz kludge, `flooreffects "fall"`, mtmp newsym) ✓; HOLE/TRAPDOOR (Kerplunk arms, deltrap, `useupf`, `bury_objs`, wall_info/candig, cansee newsym) ✓ — all verbatim.
- LEVEL_TELEP (dopush+continue on `newlev==depth`) with FALLTHROUGH ✓; TELEP (disappear msg, next_boulder reset, rloco vs costly-stolen/extract/migration/get_level/ox=dnum/oy=dlevel/MIGR_RANDOM) ✓; ROLLING_BOULDER (launch/launch2 loop, pline, feeltrap, `launch_obj(BOULDER,…,ROLL|LAUNCH_KNOWN)`) ✓; default break ✓.
- Pool `boulder_hits_pool(otmp,rx,ry,TRUE)` + continue ✓; fobj relink (`remove_object` + `place_object(otmp,ox,oy)`) ✓; `dopush(…,costly)` ✓.
- `dopush` bill arms verbatim incl. the subfrombill contingency comment and the `strchr`→`includes` adaptation (ESHK-null edge degrades safe, C would crash) ✓.
- Bonus fixes folded in (all C-exact): `cannot_push_msg` steed `YMonnam` + `the()` + `You try…in vain`; `rock_disappear_msg` verbatim.
- Named: dopush `unmap_object` trap/engr arms (remembered-glyph clear stands in), `squeezeablylightinvent` (lives in its helper), Levitation/airlevel fields, `launch_obj` D-2318 omits — all explicit.
- RNG: draws only in C positions (`rn2(10)` mine, teleport/rloco internals); none added/reordered.

## Hallucinations / overclaim

None. "No new module edge: hack.js already imports trap.js" verified true. No FORCE/DIAG/seed/coordinate logic.

## Density

Whole 290-line C body + `dopush` completion, two modules, zero new edges, full 44/44. Large but a single coherent cluster; under cap.

## Verification

Re-measured per-SHA re-run (`--base 289e5ec2c~1 --reach-all`) — both lines, matching the D-log:

```text
verify moverock_core: baseline 289e5ec2c~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify moverock_core: no corpus session is blocked on it at 289e5ec2c~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke moverock_core: no RNG-tagged reach; fixed smoke spread (24 run, 4.0s): 24 PASS, 0 regressed → REACH-OK
```

Vacuous note stated, not sold; smoke REACH-OK. Green/strict/cohort/full-44 per D-log. Rule #2 clean.

Post-review audit finding (this iteration's full re-score): `explore-seed0116-wizard-wear-shop-cfabc006` moved PASS (ex-owner `dopush` hack.c:194, step-127 screen). The session never jumps (126 moves audited — no jump path), so D-2740 is excluded by mechanism; the fixer is this commit's `dopush` bill/message arms — real corpus movement from a "0 blocked" row, discovered by the audit re-score, claimed by no iteration. Recorded in CURRENT Score (audit 1683–1699).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
