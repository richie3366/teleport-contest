# Review 79 — 8a01c200 — drinksink case 10 `polyself` (D-1118)

## Metadata
- Full / short hash: `8a01c200f8c786e524aa3d764383099bb29a0be2` / `8a01c200`
- Parent: `afb86487` (D-1117). This file audits **this SHA only**. Archive row **Addressed:** D-1118 `8a01c200` was filled by D-1119. This review fills D-1117’s archive hash (already `afb86487`).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 00:17:42 +0200
- D-id: **D-1118**
- Stats: 11 files, +117 / −47 — `js/fountain.js` +25 / −12 (case 10 call + local `Unchanging`).
- Claims to close: Open queue `fountain.c` `drinksink` case 10 `polyself` (named). Not dipsink. Review **77** / D-1117 next-port. `reviews/loop-2026-08-15/` has no open drinksink-poly Must-fix.
- JS / map: `fountain.js` `drinksink`. `c-js-map/data.md` fountain row. Case 13 `create_gas_cloud`, Hallucination `hcolor`, were/vamp/`POLY_MONSTER`/`POLY_REVERT` on `polyself.js` still named.
- Prior reviews this SHA claims to close: none as Must-fix. Named Open after D-1117.

## Intent vs deliverable

Git subject promises: “Match C fountain.c drinksink so toxic-waste quaffs run polyself instead of stopping at the metamorphosis pline.”

Old JS case 10 printed toxic wastes and, if `!(u.Unchanging \|\| u.HUnchanging)`, printed metamorphosis and **commented out** `polyself(POLY_NOFLAGS)`. That missed `EUnchanging` and `uprops[UNCHANGING]` that `confer_oc_oprop` writes for an amulet of unchanging (same confer hole as D-1089 Antimagic). C `fountain.c:680–686` calls `polyself` when `!Unchanging`; Unchanging skips **both** the `You()` and the call — there is no “fail to transform” on this path (that string lives inside `polyself` itself).

The diff **does** the local youprop helper and `await polyself(POLY_NOFLAGS)` after metamorphosis. It does **not** port case 13 `create_gas_cloud(u.ux,u.uy,1,4)` or Hallucination `hcolor` synonyms. Named. It does **not** rewrite `polyself.js` were/vamp/`POLY_MONSTER` arms.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `drinksink` case 10 | C body, **rewritten** | `fountain.c:680–686`; was skip after pline |
| `Unchanging()` | C macro, **clone** | `youprop.h:370–372` H\|\|E via flats + `uprops[UNCHANGING]` |
| `polyself` | C callee, **imported** | `polyself.js:1002–1098`; not a no-op |
| `POLY_NOFLAGS` | C enum, **imported** | `0x00` ≡ `hack.h:730` |
| `UNCHANGING` | C prop index, **imported** | `const.js` 63 |
| `confer_oc_oprop` | C callee, **pre-existing** | writes amulet to `uprops[].extrinsic` only |
| `hliquid` | C callee, **imported** | toxic-wastes pline; D-0849 |
| case 13 `create_gas_cloud` | C caller, **named omit** | `fountain.c:696–698` |
| Hallucination `hcolor` | C callee, **named omit** | drinksink sip / other messages |
| `polyself` were/vamp/`POLY_MONSTER` | C arms, **named omit** | already on `polyself.js` header |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. **New RNG on this path:** none in the fountain arm itself. `polyself(POLY_NOFLAGS)` then burns C’s shock `rn2(20)` vs `ACURR(A_CON)` and, if that fails to return, `rn2(5)` newman gate + `rn1(SPECIAL_PM-LOW_PM, LOW_PM)` — those calls belong to the real callee, not a fountain lottery shim.

## Constitution / playbook

Grep of the `js/fountain.js` hunk: no trace-index gates. Contest Rule #2: no Node builtins. `polyself` may `getlin` only under `POLY_CONTROLLED`; `POLY_NOFLAGS` does not. Input still sits at `nhgetch` / that getlin. Do not rewrite other `Unchanging()` clones this peel (fountain local matches `polyself.js:181–185`).

## C ↔ JS fidelity

### drinksink case 10

C `fountain.c:680–686`:

```
case 10:
    pline("This %s contains toxic wastes!", hliquid("water"));
    if (!Unchanging) {
        You("undergo a freakish metamorphosis!");
        polyself(POLY_NOFLAGS);
    }
    break;
```

JS `454–463`: toxic `hliquid` pline; `if (!Unchanging(u))` metamorphosis `pline` then `await polyself(POLY_NOFLAGS)`. `You("undergo...")` ≡ `pline('You undergo...')`. Unchanging skips **both** lines. Match. There is no “You fail to transform!” at this call site in C.

C `youprop.h:370–372`:

```
#define HUnchanging u.uprops[UNCHANGING].intrinsic
#define EUnchanging u.uprops[UNCHANGING].extrinsic
#define Unchanging (HUnchanging || EUnchanging) /* KMH */
```

JS `294–299` ORs sticky flats with `uprops[UNCHANGING].intrinsic/extrinsic`. That is the macro plus the confer hole D-1089 already proved for worn `oc_oprop`.

### Unchanging clone vs confer

C `youprop.h:370–372`: `#define Unchanging (HUnchanging \|\| EUnchanging)` with H/E ≡ `uprops[UNCHANGING].intrinsic/extrinsic`. JS checks sticky `u.Unchanging` / `H` / `E` **and** `uprops[UNCHANGING]` intrinsic/extrinsic. `do_wear.js` `confer_oc_oprop` writes the amulet’s `oc_oprop` bit into `uprops[p].extrinsic` and does **not** mirror `EUnchanging`. Old `u.Unchanging \|\| u.HUnchanging` therefore missed a worn amulet of unchanging. Including uprops is the C macro, not an invented third state. Sticky `u.Unchanging` is the same eat/poly flat pattern as D-1089; extra-true vs a never-written flat is defensive JS, not a fountain C-wrong.

`polyself.js` uses the same helper. Drinksink `!Unchanging` then `polyself` which **also** checks Unchanging and would print “fail to transform!” if the two clones diverged. They do not.

### Callee is not a stub

`polyself(psflags)` (`polyself.c:469–496` then newman/polymon):

1. `if (Unchanging) { You("fail to transform!"); return; }` — JS `1010–1013`.
2. `!Polymorph_control && !forcecontrol && !draconian && !iswere && !isvamp` then `rn2(20) > ACURR(A_CON)` shock `rnd(30)` — JS `1020–1031`. `POLY_NOFLAGS` means `forcecontrol` is false.
3. `mntmp < LOW_PM` → `tryct=200`; `rn1(SPECIAL_PM-LOW_PM, LOW_PM)` until `polyok` — JS `1074–1081`.
4. `!polyok \|\| (!forcecontrol && !rn2(5)) \|\| your_race` → `newman()` else `polymon(mntmp)` — JS `1090–1095`.

Were / vamp / `POLY_MONSTER` / `POLY_REVERT` / `POLY_LOW_CTRL` remain named on that file (`void` of those flag bits). A tourist sink quaff with `POLY_NOFLAGS` takes the shock-or-random-form path C takes. That is the Open line.

`drinksink` still `rn2(20)` before the switch (C `fountain.c` drinksink). Case 10 is one arm; cases 0–9 / 11–12 / 19-default are untouched. Case 9 still `vomit()` without `cantvomit`/`Sick`/`FAINTING` (already live Open, not this SHA). Levitation still `floating_above` before the lottery.

`POLY_CONTROLLED` (`#polyself` / seed0108) still goes through `getlin` in the same callee; `POLY_NOFLAGS` does not set `forcecontrol`, so drinksink never prompts “Become what kind of monster?”. Clang LTR: fountain has no nested RNG in this arm; first new roll is callee `rn2(20)`.

`newman` / `polymon` are imported real functions (pre-existing partials). This SHA does not retouch them. If `polymon` is thin, that is named map debt on `polyself.js`, not a fountain skip.

Outer `drinksink` still refuses when not on a sink / Levitation floating_above / `rn2(20)` lottery. Case 10 does not call `dryup` (C sink drink does not dry the sink on toxic waste). `breaksink` is case 6 only. Unchanging does not consume extra RNG before the skip — C macro is a property test.

`confer_oc_oprop` for `AMULET_OF_UNCHANGING`: `objects[].oc_oprop` is `UNCHANGING` (63). Wearing sets `uprops[63].extrinsic |= W_AMUL`. Timeout/eat may write `intrinsic`. The fountain helper ORs those with sticky flats. Blocked is **not** in C `Unchanging` (unlike Blind); JS does not check `blocked`. Match.

Caller: C `potion.c` `dodrink` sink yn → `drinksink`. JS `potion.js` already wired that (D-0434). This SHA does not retouch the yn or Levitation floating_above. `#dip` sink is `dipsink` (D-1113), a different function — toxic waste is drink, not dip. `polyself` from this arm can `losehp` on shock; `finish_losehp_done` is already in the callee. Fountain does not add a second shock.

`hliquid("water")` is the real do_name helper (D-0849), not a hardcoded `"water"` skip of Hallucination. `hcolor` synonyms on *other* sink messages stay named.

`POLY_NOFLAGS = 0x00` (`const.js` / `hack.h:730`). Passing `0` or omitting the arg is the same default in JS (`psflags = 0`). Drinksink passes the named constant. `exercise` is **not** in C case 10 (unlike drinkfountain fate 19). JS does not add one.

Say it explicitly: this is **not** “Match C dispatch, callee is a stub.” Case 10 calls `polyself`. The callee is the real `polyself.c` function minus named monster-poly arms. Stopping at the metamorphosis pline is **gone**.

## Hallucinations / overclaim

D-log / subject say fate 10 runs `polyself` when `!Unchanging`. That is the hunk. They do **not** claim case 13 gas, `hcolor`, or a full were-change port. Stamping **Addressed:** D-1118 is fair. Hash `8a01c200` is on the archive row (filled by D-1119).

## Density

One `switch` arm plus the youprop helper that arm needs. ~25 JS lines. Thin vs §2b’s 50–300 target, but one C family (`fountain.c` drinksink case 10 / `youprop.h` Unchanging / `polyself` call). Not a second subsystem. Related case 13 left named.

## Verification

Journal: private canary **39**/39 (POLY_NOFLAGS source; H/E/sticky/uprops skip You+call+shock RNG; `!Unchanging` shock `rn2(20)`/`rnd(30)`; Levitation `floating_above`; fate 0 sip); green+strict seed8000/0900; cohort **21**/21 including 0014 fountain + 0002 drinksink + 0108 `#polyself` + 0360/2200/4500; path **public-unhit**. Cadence fortress is not a toxic-waste proof. This audit’s full `sessions` still **44**/44.

C read of `fountain.c:680–686`, `youprop.h:370–372`, `polyself.c:469–496`; JS `fountain.js:294–299` / `454–463`, `polyself.js:181–185` / `1002–1098`, `const.js` `POLY_NOFLAGS`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| `!Unchanging` | metamorphosis + `polyself(0)` | **same** |
| Unchanging (H/E/uprops) | skip You **and** call | **same** |
| inner Unchanging in callee | “fail to transform!” | **same** (not this caller) |
| shock `rn2(20)>CON` | shudder + `rnd(30)` | **same** (callee) |
| skip after metamorphosis | (old JS) | **gone** |
| H-only gate | (old JS) | **gone** |
| case 13 gas | `create_gas_cloud(1,4)` | **still skip** (named) |

## Actionable C-wrongs

None that Must-fix this next iter. Case 10 matches `fountain.c:680–686`; `POLY_NOFLAGS` is 0; `Unchanging` includes confer `uprops`.

Named omits / do-nots (map / Open, not Must-fix):

1. `drinksink` case 13 `create_gas_cloud(u.ux, u.uy, 1, 4)` (`fountain.c:696–698`). Already live Open.
2. Hallucination `hcolor` synonyms on sink messages.
3. `polyself` were / vamp / `POLY_MONSTER` / `POLY_REVERT` / `POLY_LOW_CTRL` (named on `polyself.js`).
4. Do not restore the metamorphosis-only skip. Do not Unchanging-gate on `HUnchanging` only. Do not print “fail to transform!” from drinksink. Do not pull `teleok` jump into this SHA — **Addressed:** D-1119 `26560ccf`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: toxic-waste sink quaffs now call `polyself(POLY_NOFLAGS)` after metamorphosis when `!Unchanging` (uprops confer included), instead of stopping at the pline, while case 13 gas stays named.
- Must-fix stays empty for this SHA; next port popped Open `teleok` `tele_jump_ok` / `in_out_region`. **Addressed:** D-1119 `26560ccf`. Not vibrating.
