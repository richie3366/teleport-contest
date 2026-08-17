# Review 86 — 2fc408c0 — dowatersnakes Hallucination `rndmonnam` (D-1125)

## Metadata
- Full / short hash: `2fc408c0bf62ee7f957180d60631b47c21d17f8b` / `2fc408c0`
- Parent: `c7577f66` (review **82–85** + cadence #1430). This file audits **this SHA only**. Archive row **Addressed:** D-1125 `2fc408c0` was filled by D-1126.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 02:10:54 +0200
- D-id: **D-1125**
- Stats: 10 files, +111 / −41 — `js/fountain.js` +19 / −9 (ternary + `rndmonnam` import).
- Claims to close: Open queue `fountain.c` `dowatersnakes` Hallucination `rndmonnam` (named). Not gush. Review **85** named omit 5 / next-port. `reviews/loop-2026-08-15/` has no open snakes-pline Must-fix.
- JS / map: `fountain.js` `dowatersnakes`. `c-js-map/data.md` fountain row. Blind youprop in this helper, drinksink `hcolor`, case 24 `update_inventory` still named at this SHA.
- Prior reviews this SHA claims to close: **85** named omit 5 (`dowatersnakes` Hallucination `rndmonnam`).

## Intent vs deliverable

Git subject promises: “Match C fountain.c dowatersnakes so a hallucinating hero sees makeplural(rndmonnam) instead of a hardcoded snakes pline.”

Old JS `!Blind` always printed `"An endless stream of snakes pours forth!"` with a comment that the C ternary was deferred. C `fountain.c:45–46` uses `Hallucination ? makeplural(rndmonnam(NULL)) : "snakes"` as the `%s`. Because it is a C ternary, `rndmonnam` is **not** evaluated when `!Hallucination` — no display-rng on the snakes arm.

The diff **does** that ternary via existing `do_name.js` `Hallucination` / `rndmonnam` and `objnam.js` `makeplural`. It does **not** rewrite this helper’s Blind local to youprop `Blind()`, drinkfountain case 24, vomit, gush, or drinksink `hcolor`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dowatersnakes` `!Blind` pline | C body, **rewritten** | `fountain.c:44–46`; was hardcoded `"snakes"` |
| `Hallucination()` | C macro, **imported** | `do_name.js:169–178`; youprop `HHallucination && !Halluc_resistance` plus pre-existing sticky `u.Hallucination` |
| `rndmonnam(null)` | C callee, **imported** | `do_name.js:204–216`; display-rng, not gameplay `rn2` |
| `makeplural` | C callee, **imported** | `objnam.js`; same helper watchman/wash already use |
| `Blind` local | C macro, **clone** | still `u.Blind \|\| u.ublind`; named this SHA |
| `rn1(5,2)` / `makemon` moccasin | C body, **untouched** | D-0495 |
| drinksink `hcolor` | C callee, **named omit** | other fountain strings |
| case 24 `update_inventory` | C arm, **named omit** | live Open after this SHA |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates in the `js/fountain.js` hunk. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** display-rng inside `rndmonnam` **only** when `Hallucination()` is true (C ternary). `!Hallucination` still burns **zero** display calls on the pline. `rn1(5,2)` still runs **before** the `G_GONE` gate (`fountain.c:40` / JS `555`), unchanged.

## Constitution / playbook

Grep of the hunk: no trace-index gates. `rndmonnam(null)` is `NULL` codeOut, not a recorded monster name. Contest Rule #2: in-process ESM. One await boundary still `nhgetch` (pline). Do not pull case 24 or vomit into this SHA. Do not evaluate `rndmonnam` on the snakes arm “for simplicity.”

## C ↔ JS fidelity

### `dowatersnakes` `!Blind` pline

C `fountain.c:38–59`:

```
int num = rn1(5, 2);
if (!(svm.mvitals[PM_WATER_MOCCASIN].mvflags & G_GONE)) {
    if (!Blind) {
        pline("An endless stream of %s pours forth!",
              Hallucination ? makeplural(rndmonnam(NULL)) : "snakes");
    } else {
        You_hear("%s hissing!", something);
    }
    while (num-- > 0)
        makemon(... WATER_MOCCASIN ...) + maybe mintrap;
}
```

JS `552–574`: `rn1(5,2)` first; `G_GONE`; `!Blind` then

```
const what = Hallucination()
    ? makeplural(rndmonnam(null))
    : 'snakes';
await pline(`An endless stream of ${what} pours forth!`);
```

else `You_hear('something hissing!')`; then the makemon loop. Match on the Open line. `something` in C `You_hear` is the Deaf-aware “something” token; JS already printed that string (D-0495). Soundeffect named (no audio port).

### Callers

C: `drinkfountain` case 22 (`fountain.c:311–312`) and `dipfountain` case 23 (`:483`). JS `868` / dip case 23 already `await dowatersnakes()`. This SHA does not add a caller. Guard: `G_GONE` still skips the pline and the makemon loop, same as C.

### `Hallucination` / `rndmonnam` are not stubs

C `youprop.h:120`: `#define Hallucination (HHallucination && !Halluc_resistance)` with `Halluc_resistance` = `HHalluc_resistance || EHalluc_resistance`.

JS `Hallucination()` (`do_name.js:169–178`): sticky `u.Hallucination` returns true first (pre-existing clone, not introduced here); else `HHallucination && !resist` where resist ORs `Halluc_resistance` / `H` / `E`. Canary “H/E resist → snakes” walks the youprop arm. Sticky-true ignoring resist is **pre-existing** `do_name.js` debt, not a new fountain fake. This SHA did not add the sticky.

C `do_name.c:1388–1410` `rndmonnam`: display-rng over `SPECIAL_PM+BOGUSMONSIZE-LOW_PM`, skip pname/`G_NOGEN`, else `bogusmon` or `pmname` with a second display `rn2(2)` gender. JS `204–216` is that function (D-0838). `makeplural` is the real objnam helper. Say it explicitly: this is **not** “Match C dispatch, callee is a stub.” The hallu arm burns display-rng and formats a plural bogus/real name. The snakes arm does not.

### Blind clone (named, not this Open line)

C `Blind` is `((HBlinded || EBlinded) && !BBlinded)`. JS still `u.Blind || u.ublind`. A `BBlinded` hero would skip C’s hallu/snakes pline in JS if sticky Blind is set, or hear C’s pline if only B is set. Named this SHA; D-log forbids rewriting Blind youprop in this helper. Not Must-fix of the Open ternary.

## Hallucinations / overclaim

D-log / CURRENT / subject say a hallucinating hero sees `makeplural(rndmonnam)` instead of a hardcoded snakes pline, and that display-rng runs only on the hallu arm. That is the hunk. They name Blind youprop, case 24, vomit, `hcolor`. Stamping **Addressed:** D-1125 is fair for the Open ternary. Hash `2fc408c0` is on the archive row (filled by D-1126). Do **not** stamp it as a close of Blind youprop or drinksink `hcolor`.

## Density

One `switch` arm’s pline ternary — the named Open row review **85** queued. ~19 JS lines. Same shape as D-1124’s one call. Related case 24 / vomit left named — not a second hypothesis. Right size for that queue line; not a wasted FAIL peel.

## Verification

Journal: private canary **65**/65 (source ternary; no-hallu `"snakes"` + no display rng; hallu matches `makeplural(rndmonnam)` across seeds; H/E resist → snakes; `G_GONE` / `!Blind` / drink 22 / dip 23 wiring); green+strict seed8000/0900; cohort **21**/21 including 0014 fountain + 0007 snakes + 0383/0399 hallu + 0002 drinksink + 0006 demon + 0108 + 0360/2200/4500; path **public-unhit** (public seats are not hallu at this pline). Cadence fortress is not a hallu-snakes proof. This audit’s full `sessions` (cadence **#1435**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression (extra display-rng only on unhit hallu arm).

C read of `fountain.c:38–59`, `youprop.h:119–120`, `do_name.c` `rndmonnam`; JS `fountain.js:552–574`, `do_name.js:169–216`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| `!Blind && !Hallucination` | `"snakes"`; no `rndmonnam` | **same** |
| `!Blind && Hallucination` | `makeplural(rndmonnam(NULL))` | **same call** |
| `Blind` | You_hear hissing | **same string** |
| `G_GONE` | bubbles; no pline/makemon | **same** |
| `rn1(5,2)` | before G_GONE | **same** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open ternary matches `fountain.c:45–46` call-for-call, including C short-circuit of `rndmonnam`.

Named omits / do-nots (map / Open, not Must-fix):

1. Blind youprop in `dowatersnakes` (`youprop.h:103`). Still `u.Blind \|\| u.ublind`.
2. drinksink Hallucination `hcolor` on sip strings. **Addressed:** D-1135 `b166bda5`
3. `mongrantswish` `tmp_at` glyph hide. **Addressed:** D-1136
4. drinkfountain case 24 `update_inventory` — **Addressed:** D-1126 `6497347e` (next SHA).
5. Do not restore hardcoded `"snakes"` on the hallu arm. Do not evaluate `rndmonnam` when `!Hallucination`. Do not pull vomit / pool dip into this SHA.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `dowatersnakes` `!Blind` now uses C’s Hallucination ternary (`makeplural(rndmonnam(NULL))` vs `"snakes"`) so display-rng runs only on the hallu arm, while this helper’s Blind local stays the named sticky clone.
- Must-fix stays empty for this SHA; next port popped Open drinkfountain case 24 `update_inventory`. **Addressed:** D-1126 `6497347e`. Not enlightenment.
