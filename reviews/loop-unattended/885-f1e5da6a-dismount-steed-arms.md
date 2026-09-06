# Review 885 — f1e5da6a — steed.c dismount_steed remaining arms (poly/engulfed/water/lava steed death) (D-1915)

Metadata: SHA `f1e5da6a`, D-1915. Files: `js/steed.js` (+166/−50 region),
`js/mon.js` (1 word: `cant_drown` → export). Queue row archived
(`LOOP-QUEUE-DONE.md`), map `turns.md` updated. Next index 885.

Intent vs deliverable: subject promises the remaining `dismount_steed`
arms — save_utrap, Hallu rain, Stealth edge, trap transfer, steedcc
enexto + place_monster, BONES, grounded water/lava death, hero-first
teleds + mintrap, no-room kill, float_down tail, polearm unweapon. The
diff delivers exactly that list, plus the one-word `cant_drown`
promotion the water arm needs. Promise ≡ diff.

Inventory: 0 new exports, 1 new local (`stealth_now`), 1 promotion
(`cant_drown`, body untouched), 1 body completed (`dismount_steed`),
0 deletions.

**C ↔ JS fidelity** (`csym dismount_steed` →
`nethack-c/upstream/src/steed.c:575–822`, 248 lines, read in full):
branch-by-branch confirm. `:583` save_utrap before the switch ✓ (code
comment cites it; teleds_simple doc corrected to say mintrap owns the
saved value). `:648` BYCHOICE nameless Hallu rain ✓ (`Hallucination()`
gate, exact string). `:665` Stealth FALSE→TRUE edge ✓ — local
`stealth_now()` mirrors `youprop.h` Stealth
(`(HStealth||EStealth)&&!BStealth`); snapshot-then-compare prints `You
seem less noisy now.` only on the rising edge, matching C's
`was_stealthy` block. `:671` BEARTRAP/PIT/WEB → `mtrapped = 1` ✓, in C
position (after stealth, before steedcc). `:693–698` 3-tier enexto
(mdat → `mons(PM_BAT)` flyer → `mons(PM_GHOST)` any) ✓ with the
lurker-above comment preserved. `!DEADMONSTER` gate as `(mhp|0) >= 1`
✓, `place_monster` under `in_steed_dismounting` ✓ (local D-1565 def at
`steed.js:1030`, no new import). BONES `:708–713` enexto-rloc_to /
rloc(ERR|NOMSG) early return ✓. Hero-first `:718` with the uswallow/
ustuck gate ✓; grounded water/lava `:727–736` — `!Underwater` surface
pline, `cant_drown` death check, lava `hliquid` pull line,
`likes_lava` check, `killed` + `adjalign(-1)` both arms ✓. `[ALI]`
dead-steed gate around teleds ✓; `sobj_at(BOULDER)` sokoban_guilt ✓;
`save_utrap → mintrap(mtmp, NO_TRAP_FLAGS)` ✓. No-room `#if 1` arm ✓ —
BYCHOICE `killed` + align vs else `monkilled(mtmp, '', 0)`; the `0`
is exact since `monattk.h:42` `#define AD_PHYS 0`, so `-AD_PHYS ≡ 0`
(verified, not assumed). Float tail ✓ — `float_down(0, W_SADDLE)`,
botl both arms, `encumber_msg()`, `vision_recalc(1)` for
`gv.vision_full_recalc = 1`, polearm `gu.unweapon` ✓. No RNG in the new
arms (all `rn1` fall-damage lines predate this commit) — nothing to
walk. One shape note (not a wrong): `in_steed_dismounting` is boolean
set/reset where C does `++`/`--`; every JS read is truthiness
(`pickup.js:1854`, `steed.js:1043`) and the three sites never nest, so
equivalent. Named omits (DISMOUNT_KNOCKED u.dx/u.dy caller,
update_mon_extrinsics, teleds_simple ball/chain/swallow/hideunder/drag,
artifact-saddle untouchable) are real map rows in untouched files.

Hallucinations / overclaim: none. D-log says "none on any suite" and
marks the hidden verify vacuous by name rather than claiming PASS;
"no new clones" checks out (sobj_at/which_armor_saddle/Stealth-macro
all reuse file locals; `surface`/`hliquid`/`killed`/`monkilled`/
`adjalign`/`is_pole`/`encumber_msg`/`mintrap`/`rloc_to`/`rloc`/
`sokoban_guilt`/`is_pool`/`is_lava`/`grounded`/`likes_lava`/`mons`
are all live imports).

Density: one C function + its forced helper word, ~170 js lines —
in the 80–400 band, single-locus. Correct shape.

Verification: D-log gates PASS (green 2/2 + strict ×2, cohort 7/7,
full 44/44 explicitly on the shared-file change). Re-measured:
`hidden-proxy verify dismount_steed --base f1e5da6a~1` → `0
session(s) blocked on it (0 at baseline, 0 in the working
scoreboard)` — vacuous as stated, map-driven row, no `--base` debt.
`sym.mjs cant_drown` output (promotion check):

```
cant_drown       js/mon.js:1779   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/uhitm.js:1139
```

The uhitm.js:1139 local predates this commit (D-log discloses keeping
it) — no new clone written here. `imports.mjs --rulecheck` → Rule #2
clean (HEAD). `--can steed.js mon.js cant_drown` → ALREADY (no new
edge). Diff grep: no FORCE/DIAG/seed/coordinate patterns. Standalone
`node --input-type=module` import of steed.js fails with a
`_body_part` TDZ — checked pre-existing at the stash base (suite loads
via its own entry; 44/44 per D-log), not introduced here.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
