# Review 613 — 105c91aa — mondata.h eyecount sit/pray/potionbreathe (D-1652)

## Metadata
- Full / short hash: `105c91aa59254a317ec9299c0f4a12449e11222f` / `105c91aa`
- Parent: `41ac42ac` (D-1651). This file audits **this SHA only** (fifth of nine `js/` commits since review **608**). Archive **Addressed:** D-1652 `105c91aa`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 13:13:43 +0200
- D-id: **D-1652**
- Stats: `js/sit.js` +7/−7, `js/pray.js` +2/−6, `js/potion.js` +3/−13. Band **150–350** (`js/` insertions **12** <250; id >454). C is a 4-line macro; this SHA deletes stubs.
- Claims to close: Open sit.c `eyecount` after D-1534. Not `confer_oc_oprop`. Not lookup_novel (D-1651). `reviews/loop-2026-08-15/` has no unpaid eyecount Must-fix.
- JS / map: import `monsters.js` `eyecount`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: map named sit/pray always-2 stubs.

## Intent vs deliverable

Git subject promises: sit/pray/potionbreathe use 0/1/2 eye grammar, instead of sit/pray always-2 stubs after D-1534.

Pinned C `mondata.h` `eyecount` `:48–51` (`node scripts/csym.mjs eyecount`). `haseyes` `:46`. `--callers eyecount`: `sit.c:160`, `pray.c:562`, `potion.c:291/:317/:405/:1958`, `mcastu.c:733`, `spell.c:486`, `zap.c:4894`, `dothrow.c:2512`, `mthrowu.c:770`.

```48:51:nethack-c/upstream/include/mondata.h
#define eyecount(ptr) \
    (!haseyes(ptr) ? 0                                                     \
     : ((ptr) == &mons[PM_CYCLOPS] || (ptr) == &mons[PM_FLOATING_EYE]) ? 1 \
       : 2)
```

Old JS: sit/pray local `return 2`; potion `eyecount_pot` clone. Helper already live `monsters.js:950` (D-1534 `mcast_blind_you`). The diff **does** import that export and delete the stubs/clone. It **does not** port spell dull, zap rider, dothrow POT_WATER, mthrowu venom, or `make_blinded` itch/twitch (`potion.c:291/:317/:405`). Named.

```166:178:nethack-c/upstream/src/sit.c
                    switch (num_of_eyes) { /* 2, 1, or 0 */
                    default:
                    case 2: /* more than 1 eye */
                        eye = makeplural(eye);
                        FALLTHROUGH;
                    case 1: /* one eye (Cyclops, floating eye) */
                        Your("%s %s...", eye, vtense(eye, "tingle"));
                        break;
                    case 0: /* no eyes */
                        You("have a very strange feeling in your %s.",
                            body_part(HEAD));
                        break;
                    }
```

```561:567:nethack-c/upstream/src/pray.c
        if (Blinded) {
            if (eyecount(gy.youmonst.data) != 1)
                eyes = makeplural(eyes);
            Sprintf(msgbuf, "Your %s %s better", eyes, vtense(eyes, "feel"));
            u.ucreamed = 0;
            make_blinded(0L, FALSE);
        }
```

```1952:1960:nethack-c/upstream/src/potion.c
        if (obj->cursed) {
            if (!breathless(gy.youmonst.data)) {
                pline("Ulch!  That potion smells terrible!");
            } else if (haseyes(gy.youmonst.data)) {
                const char *eyes = body_part(EYE);
                if (eyecount(gy.youmonst.data) != 1)
                    eyes = makeplural(eyes);
                Your("%s %s!", eyes, vtense(eyes, "sting"));
```

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `eyecount` | C mondata.h `:48–51`, **LIVE** | not re-defined; sit/pray/potion clones **deleted** |
| `haseyes` | C `:46`, **LIVE** | callee inside eyecount |
| `throne_sit_effect` Blind case 10 | C sit.c `:160–179`, **LIVE this SHA** | |
| `fix_worst_trouble` TROUBLE_BLIND | C pray.c `:562`, **LIVE this SHA** | |
| `potionbreathe` sting | C potion.c `:1958`, **LIVE this SHA** | |
| `mcastu` num_eyes | C `:733`, **LIVE** | D-1534 |
| spell/zap/dothrow/mthrowu / make_blinded | C other callers, **OMIT named** | |
| `eyecount_pot` | **deleted clone** | |

`node scripts/csym.mjs eyecount` → `mondata.h:48-51`. `haseyes` → `:46` (`(mflags1 & M1_NOEYES) == 0`). `--callers eyecount`: 12 refs (`sit.c:160`, `pray.c:562`, `potion.c:291/:317/:405/:1958`, `mcastu.c:733`, `spell.c:486`, `zap.c:4894`, `dothrow.c:2512`, `mthrowu.c:770`, plus the `#define`).

RNG: none in the macro. `potionbreathe` else-arm still `rn2(A_MAX)` after the cursed break — **not this SHA.** No seed gate.

`node scripts/sym.mjs` on new / re-pointed names (clones deleted, import re-point):

```
eyecount         js/monsters.js:950   sync
haseyes          js/monsters.js:357   sync
```

`--can sit.js monsters.js eyecount`: ALREADY. `--can pray.js monsters.js eyecount`: ALREADY. `--can potion.js monsters.js eyecount`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** restore sit/pray `return 2`. Do **not** add `eyecount` #2 in potion.js.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Macro. C `haseyes` is `!(mflags1 & M1_NOEYES)`. Then `eyecount`: `!haseyes` → 0; pointer `== &mons[PM_CYCLOPS]` or `PM_FLOATING_EYE` → 1; else 2. JS `monsters.js:950–955`: `if (!haseyes(ptr)) return 0`; `mndx ?? mnum` vs `PM_CYCLOPS` / `PM_FLOATING_EYE`. C-home comment: `mons()` allocates so pointer identity would always miss. **Match `:46` and `:48–51` as mndx analogue.** Not a pointer-identity bug. Else-2 includes every eyed form that is not those two mndx.

Sit Blind `:156–179`. C `!Blind` “vision becomes clear”; else `num_of_eyes = eyecount(youmonst.data)` then switch 2/default `makeplural` **FALLTHROUGH** into case 1 `Your("%s %s...", eye, vtense(eye, "tingle"))`; case 0 HEAD. JS the same fallthrough (no `break` after case 2). **Match `:160–178`.** C comment: Cyclops/floating-eye sit-on-throne won’t happen. Grammar is still wired (0-eye poly can sit).

Pray TROUBLE_BLIND `:555–567`. C `if (Blinded)` then `eyecount != 1` → `makeplural(EYE)` then `Sprintf` “feel better”, `ucreamed=0`, `make_blinded(0L, FALSE)`. JS `eyecount(game.youmonst?.data) !== 1`. **Match `:562`.** Deaf cure is a sibling in the same case; this SHA does not retouch `make_deaf`.

`potionbreathe` cursed restore/gain `:1952–1960`. C `!breathless` Ulch; else `haseyes` then `eyecount != 1` sting. JS `yd` youmonst.data. **Match.** Deleted `eyecount_pot` was already Match C; re-point is not a behavior change vs that clone. Uncursed `rn2(A_MAX)` loop is after `break` — not this SHA.

Remaining C callers this SHA does **not** re-point: `make_blinded` itch/twitch `potion.c:291/:317/:405` (`!= 1`); `spell.c:486` **`> 1`** (dull grammar, not `!= 1`); `zap.c:4894` **`== 1`** (rider); dothrow POT_WATER `:2512` `!= 1`; mthrowu venom `:770` `!= 1`. `mcastu.c:733` already D-1534. Those are named omits, not stubs inside the three live arms.

Callee closure (three arms). LIVE: `eyecount`, `haseyes`, `body_part`, `makeplural`, `vtense`. CLONE: none remaining in sit/pray/potion. OMIT named: other C callers (including `> 1` / `== 1` tests). STUB: **none** in the three live arms. Combined-arm ships. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject sit/pray/potionbreathe 0/1/2 vs always-2: **true.** D-log potion clone retired: **true.** Do **not** stamp “Match C all `eyecount` callers.” Do **not** stamp “Match C `potion.c:291` make_blinded itch.” Do **not** stamp “Match C spell dull / zap rider / dothrow / mthrowu.” Public Blind throne is **public-unhit** unless a session sits Blind. Fortress does not prove Cyclops grammar.

## Density

+12 / net negative in potion: C is four lines; the work is stub deletion at three Open-named sites. §2b “unless C is that small” applies. Remaining sibling callers are other files, named. Did not glue `confer_oc_oprop`.

## Verification

Wired: sit switch; pray `!= 1`; potionbreathe sting. Unwired C: spell `:486`, zap `:4894`, dothrow `:2512`, mthrowu `:770`, potion `:291/:317/:405`. Conf: no `rn2`. No seed gate.

D-log green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for 0/1-eye grammar. Fortress does not prove the stub deletion.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `spell.c` study_book dull `:486`; zap rider `:4894`; dothrow POT_WATER `:2512`; mthrowu venom `:770`; `make_blinded` itch/twitch `potion.c:291/:317/:405`. Do **not** add `eyecount` clone #2. Do **not** restore always-2. Do **not** re-port lookup_novel (D-1651). Do **not** rewrite `confer_oc_oprop`.

Verdict: **ACCEPT-WITH-DEBT**
