# Review 1032 — a5d86687 — final-disclosure attributes tail (D-2062)

**SHA:** `a5d86687` · **D-id:** D-2062 · **Files:** `js/invent.js`,
`js/polyself.js`, `js/insight.js` (+1 export)

## Intent vs deliverable

Subject promises: "were-form/Hate_silver + survived arms +
set_uasmon DRAIN_RES (queue owner one_characteristic,
misattributed)". Four screen-first final-enlightenment menu
shortfalls (ynq attributes → y → page 2), toplines identical, RNG
matched:

- Barbarian-92208 / Caveman-92006 / Tourist-91122: C « You
  survived.» vs JS «».
- Healer-92066 (dead, killed by werewolf): C « You were
  level-drain resistant due to your lycanthropy.» vs JS « Your
  luck was zero.» (3 lines missing above).

Diff actually adds the three ports named. Promise matches diff.

## Inventory

| JS function | Change |
|---|---|
| `enlightenment` final block (invent.js) | were-form arm, Hate_silver arm, survived/dead block rewrite |
| `resists_drli_you` (polyself.js) | NEW file-local clone of `mondata.c resists_drli` (youmonst case) |
| `set_uasmon` (polyself.js) | DRAIN_RES propset after STONE_RES |
| `N_times` (insight.js) | `function` → `export function` (no body change) |

## C ↔ JS fidelity

**Were-form arm — confirms** against `insight.c:1881–1893` (read
in full): `ismnum(ulycn)` → `an(pmname(mons[ulycn], female))` +
`umonnum==ulycn` → « in beast form» + wizard ` (mtimedone)`.
JS mirrors each term. `ismnum` note: JS `ismnum` (`const.js:3188`)
is `Number.isInteger && >= LOW_PM` — no upper bound — which
matches C's `Hate_silver` spelling (`ulycn >= LOW_PM`,
`youprop.h:401`) exactly and is equivalent to C's bounded `ismnum`
(`monst.h:285`) on ulycn's domain (NON_PM or valid mnum). Order
confirmed against `:1855–1897`: Polymorph_control → (deferred
foreign-shape/lays_eggs) → ulycn → (deferred Unchanging) →
Hate_silver → Fast; JS inserts between Polymorph_control and Fast
with deferred arms above — relative order of ported lines
preserved.

**Survived/dead block — confirms** against `insight.c:1980–2005`
(read in full) *plus* the `enl_msg` macro
(`insight.c:105–106`: `enlght_line(prefix, final ? past :
present, suffix, ps)`). The macro is the load-bearing subtlety:
present tense («have been killed » + buf, p dropped) vs past
(«You » + p + buf). JS `enlght_line_txt(You_, final ? p :
'have been killed ', buf, '')` reproduces it: final=0/null-p →
no line; final=1 + umortality 0 → « You survived.» (the reported
C line); final=1 + N → «…survived after being killed twice.» via
the newly-exported `N_times`; final=2 → «are dead» + `(N<ordin>
time!)` iff N>1. Case-0 `impossible()` correctly omitted (named;
no JS counterpart).

**DRAIN_RES — confirms** against `mondata.c:200–211` (12 lines,
read in full) and `set_uasmon` PROPSET list: undead/demon/were →
true; youmonst + `ulycn >= LOW_PM` → true; form-is-Death → true;
vampshifter → true; else `defended(AD_DRLI)`. JS matches the first
four (`umonnum === PM_DEATH` ≡ `ptr == &mons[PM_DEATH]` given
`set_mon_data` points data at `mons[umonnum]`; `is_vampshifter`
receives `game.youmonst` as C passes the monst, not the data —
established idiom at polyself.js:1182/1223). The `defended`
disjunct is a named omission (no JS export), and the doc comment
correctly argues the C `uwep`-suppression block is vacuous in JS
precisely because the only uwep-sensitive disjunct is the omitted
one. PROPSET position after STONE_RES, before ANTIMAGIC, matches C.

Callee closure: `pmname` (do_name.js:617), `hates_silver`
(monsters.js:822), `N_times` (insight.js:134), `is_demon`,
`DRAIN_RES` — all LIVE, existing edges only (`imports.mjs --can`
cited in D-log for polyself→monsters). No stub in any live arm.
`resists_drli_you` is a verified CLONE, matched here.

## Hallucinations / overclaim

None. One loose citation: the D-log renders C's Hate_silver as
«ismnum(ulycn)», eliding that C spells it `>= LOW_PM` — harmless
given the equivalence above, but worth one word in a future log.
Misattribution stated; unreached arms named (foreign-shape,
lays_eggs, Unchanging, Free_action, Fixed_abil, final=0
killed-N-times).

## Density

Three related disclosure arms + one propset, one envelope
(end-of-game attributes). Right-sized.

## Verification

Re-measured myself:

```text
node scripts/hidden-proxy.mjs verify one_characteristic --base a5d86687~1
verify one_characteristic: 2 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-normal-Caveman-92006: PASS
  scen-wish-Healer-92066: PASS
  scen-normal-Barbarian-92208: moved → really_done at step 19 (was 14)
  scen-normal-Tourist-91122: moved → save_dungeon at step 37 (was 31)
```

Identical to the D-log. Diff grep: no FORCE/DIAG/RNG-log gates.
Rule #2 clean at HEAD.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
