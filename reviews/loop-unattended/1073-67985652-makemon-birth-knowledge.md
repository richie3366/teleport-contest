# Review 1073 — 67985652 — makemon birth knowledge: trap learning + mwandexp (D-2107)

Metadata: SHA `67985652`, D-2107 (Open row `zap.c` zap_hit, 1 session). JS: `js/makemon.js` +24/−1. Next NN 1073.

## Intent vs deliverable

Subject promises the birth-knowledge block in exact C order between `female` and `mpeaceful`. Diff actually adds: Sokoban PIT+HOLE / stronghold TRAPDOOR / LEADER-NEMESIS ALL_TRAPS `mon_learns_traps` arms + the six-way `mwandexp` disjunction:

```js
if (In_sokoban(game.u?.uz) && !mindless(ptr)) {
    mon_learns_traps(mtmp, PIT);
    mon_learns_traps(mtmp, HOLE);
}
if (Is_stronghold(game.u?.uz) && !mindless(ptr))
    mon_learns_traps(mtmp, TRAPDOOR);
if ((ptr.msound | 0) === MS_LEADER || (ptr.msound | 0) === MS_NEMESIS)
    mon_learns_traps(mtmp, ALL_TRAPS);
if (Is_stronghold(game.u?.uz) || Is_knox(game.u?.uz)
    || In_endgame(game.u?.uz)
    || !!(game.dungeons?.[game.u?.uz?.dnum | 0]?.flags?.hellish)
    || In_V_tower(game.u?.uz) || In_quest(game.u?.uz))
    mtmp.mwandexp = true;
```

Promise matches deliverable. The recorded owner is corrected, not obeyed: `zap_hit`'s body is already faithful (JS zap.js:1334 draws `rn2(20)` correctly) — JS never reached it because the quest-born salamander lacked `mwandexp` and routed through `buzz_force_miss` (muse.c:1834 fork, JS muse.js:940 a faithful mirror).

## Inventory

Changed JS: `makemon` (makemon.js:2847–2866), one inserted block. No new functions; import names join existing const.js/monsters.js edges (`--can` ALREADY per commit; same 90-module SCC, runtime calls only). Required `sym.mjs` output (this iteration):

```text
mon_learns_traps js/monsters.js:564   sync
mindless         js/monsters.js:635   sync
In_quest         js/const.js:3201   sync
Is_stronghold    js/const.js:3211   sync
```

`MS_LEADER/MS_NEMESIS` are pre-existing file-local consts (makemon.js:670–671), already used at :693 — no new values introduced. Nothing deleted or re-pointed.

## C ↔ JS fidelity

C locus: `makemon.c:1281–1297` (block read verbatim from pinned upstream):

```c
if (Is_stronghold(&u.uz) && !mindless(ptr)) /* know about trap doors */
    mon_learns_traps(mtmp, TRAPDOOR);
/* quest leader and nemesis both know about all trap types */
if (ptr->msound == MS_LEADER || ptr->msound == MS_NEMESIS)
    mon_learns_traps(mtmp, ALL_TRAPS);
/* locations where monsters are already experienced with wands */
if (Is_stronghold(&u.uz) || Is_knox(&u.uz) || In_endgame(&u.uz) ||
    In_hell(&u.uz) || In_V_tower(&u.uz) || In_quest(&u.uz))
    mtmp->mwandexp = TRUE;

place_monster(mtmp, x, y);
...
mtmp->mpeaceful = (mmflags & MM_ANGRY) ? FALSE : peace_minded(ptr);
```

(plus the `In_sokoban && !mindless` → PIT + HOLE arm directly above.) JS replicates arm order, gates (`mindless` on the first two only — absent on LEADER/NEMESIS exactly as in C), and the six-way disjunction, placed between `female` and `mpeaceful` as in C; the JS `place_monster`/fmon-link shape is untouched. `In_hell` via the file's existing hellish-flag idiom (dungeon.c:1942 equivalent, cf. S_BAT :2929) rather than a new import — output-identical. `mindless` is the `mondata.h:64` M1_MINDLESS predicate (monsters.js:635 live).

Every new arm is draw-free (bit sets + branch tests), so the only keystream movement is the intended buzz fork — "zero RNG movement by construction" holds. The adjacent `MM_ANGRY` force-hostile arm (`:1297`) stays unported but is named in this commit AND in the map (data.md:497: "MM_ANGRY arm + `mwandexp` save/restore still named") — legal OMIT, different theory (peace outcome vs birth knowledge). No stubs or clones in the shipped arms.

## Hallucinations / overclaim

None. The commit states the mechanism precisely (first wand always misses via `buzz_force_miss`) and does not claim a corpus PASS — "0 PASS, 1 moved past (re-attributed at the same step)".

## Density

+24/−1 for a ~12-line C paragraph (density exception: C is that small). One row, one module.

## Verification

D-log claims `verify --fn zap_hit` → 0 PASS, 1 moved past re-attributed same-step + green/strict/cohort/full-44. Re-measured this iteration:

```text
verify zap_hit: baseline 67985652~1 — 1 session(s) blocked on it
  scen-tour-Priest-92235: moved → resist at step 59 (was 59; re-attributed)
verify zap_hit: 0 PASS, 1 moved past (1 re-attributed at the same step) → PROGRESS
```

Exact match, including the same-step re-attribution with C's `zap_hit` draw now positionally matched (per-row draw pairs in the D-log: prev `d(6,25)=57 @ zhitm`, rngM 5019→5402). Diff grep: no FORCE/DIAG/getRngLog/seed/coordinate reads. Rule #2 per commit; globally clean (review 1067).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
