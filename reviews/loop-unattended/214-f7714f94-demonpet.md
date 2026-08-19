# Review 214 — f7714f94 — uhitm.c demonpet spawn (D-1252)

## Metadata
- Full / short hash: `f7714f94400ac40ebeaf96f3f2a6823914fa166b` / `f7714f94`
- Parent: `e097a5df` (D-1251). This file audits **this SHA only**. Archive row **Addressed:** D-1252 `f7714f94` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 03:53:23 +0200
- D-id: **D-1252**
- Stats: 10 files, +226 / −156 — `js/uhitm.js` +33 / −5; journal rotate in the same commit.
- Claims to close: Open `makemon.c` `demonpet` spawn (queue wording; C is `uhitm.c`, named from D-1233 / D-1251). Not AT_EXPL. `reviews/loop-2026-08-15/` has no unpaid demonpet Must-fix.
- JS / map: `uhitm.js` `demonpet` / `damageum` gate; `c-js-map/data.md`. AT_ENGL / fight_empty `explum` / altwep still named.
- Prior reviews this SHA claims to close: **195** named omit `demonpet` spawn (`rn2(13)` burned, no body).

## Intent vs deliverable

Git subject promises: “Match C uhitm.c demonpet so an unarmed poly'd demon can summon a tame hell-p, instead of burning rn2(13) and missing with no spawn.”

C `demonpet` (`uhitm.c:2133–2145`): pline hell-p; `i = !rn2(6) ? ndemon(u.ualign.type) : NON_PM`; `pm = i!=NON_PM ? &mons[i] : youmonst.data`; `makemon(pm,u.ux,u.uy,NO_MM_FLAGS)` then `tamedog(dtmp, NULL, FALSE)`; always `exercise(A_WIS, TRUE)`. Caller `damageum` (`:4848–4851`): after `d(damn,damd)`, `is_demon && !rn2(13) && !uwep && umonnum != AMOROUS_DEMON && != BALROG` → `demonpet(); return M_ATTK_MISS`.

Old JS: named omit; `rn2(13)` still burned; return MISS with no pline/makemon.

The diff **does** the body and replaces the omit comment with `await demonpet()`. It does **not** pull AT_ENGL, fight_empty, or altwep. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `demonpet` | C `:2133–2145`, **new** | |
| `damageum` gate | C `:4848–4851`, **wired** | was burn-and-MISS |
| `ndemon` | C `minion.c`, **imported live** | `mkclass_aligned(S_DEMON)` + `is_ndemon` |
| `mons(i)` | C `&mons[i]`, **imported** | JS allocates; same mndx |
| `makemon` | C `makemon.c`, **imported live** | sync; `NO_MM_FLAGS=0` |
| `makemon_appear_msg` | C makemon in-body Norep, **JS split** | D-0928 #1164; not a second C call |
| `tamedog` | C `dog.c:1143–1282`, **imported live** | `obj=null`, `givemsg=false` |
| `exercise(A_WIS)` | C `attrib.c`, **imported live** | `rn2(19)>ACURR` while Upolyd |
| `pline` hell-p | C, **imported live** | |
| tamedog is_demon/covetous | C `:1246`, **named omit** | hero is demon here so C would not reject is_demon |
| AT_ENGL / fight_empty / altwep | **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New RNG this SHA:** `rn2(6)` then `ndemon`/`makemon`/`tamedog`/`exercise` `rn2(19)`. `damageum` still `d` then `rn2(13)` in C order.

## C ↔ JS fidelity

Pinned C (`uhitm.c:2139–2144`):

```
    pline("Some hell-p has arrived!");
    i = !rn2(6) ? ndemon(u.ualign.type) : NON_PM;
    pm = i != NON_PM ? &mons[i] : gy.youmonst.data;
    if ((dtmp = makemon(pm, u.ux, u.uy, NO_MM_FLAGS)) != 0)
        (void) tamedog(dtmp, (struct obj *) 0, FALSE);
    exercise(A_WIS, TRUE);
```

JS: same pline; `!rn2(6) ? ndemon(u.ualign.type|0) : NON_PM`; else `youmonst.data`; `makemon` at `u.ux,u.uy` with `NO_MM_FLAGS`. Appear Norep is `makemon_appear_msg` after sync `makemon` (JS `makemon` does `newsym` but not the async pline; C prints inside `makemon` unless `MM_NOMSG`). Calling appear_msg here is the established split, not a double print and not a stub spawn. `tamedog(dtmp,null,false)` matches C’s FALSE (no “more amiable” / “quite friendly”). `exercise(A_WIS,true)` always, even if `makemon` failed. Match.

`damageum`: `mhm.damage = d(...)` **before** the 1/13 gate (C same). Unarmed M2_DEMON poly, not succubus/balrog, `!rn2(13)` → pet then MISS (no `adtyping`, no HP). Human / `uwep` / balrog / amorous skip the gate and hit. Match.

`ndemon` is live `mkclass_aligned('S_DEMON')` filtered by `is_ndemon` (neither lord nor prince). `NON_PM` clone-of-form uses current `youmonst.data` like C.

C `tamedog` rejects `is_demon(mtmp) && !is_demon(youmonst)` and `is_covetous`. JS omits those (named since D-0266). This caller: hero **is** demon, so C would not reject on is_demon. Covetous unique hell-p is exotic (`ndemon` is lesser S_DEMON). Named, not a no-op tame: JS still `initedog` / `mtame` / `newsym`. `givemsg=false` skips C’s tame pline; JS tame pline is already deferred on the true path — irrelevant here.

`makemon` is sync (`export function makemon`) — no missing `await` on the spawn. Appear_msg is awaited. Match the JS split.

Queue said `makemon.c` because the spawn is the visible effect; C function lives in `uhitm.c`. Same pattern as D-1249 `hack.c` vs `dokick.c`.

## Hallucinations / overclaim

Subject + D-1252 say an unarmed poly demon can summon a tame hell-p instead of burning `rn2(13)` with no spawn. **pline + `ndemon`/`makemon`/`tamedog`/`exercise` are the hunk.** Stamping **Addressed:** D-1252 is fair. This is **not** “Match C dispatch, callee is a stub”: `makemon` places a monster; `tamedog(..., false)` inits edog; `ndemon` is not `return NON_PM`. Do **not** stamp “Match C `tamedog` is_covetous reject” or “Match C AT_ENGL `gulpum`.” `makemon_appear_msg` is the JS split of C’s in-body Norep, not an invented extra shout.

## Density

One C function plus the one `damageum` site that already burned `rn2(13)`. ~25 JS lines. Small but the right cluster (not a third combat system). Did not glue glob/doname.

## Branch-by-branch confirm

1. Horned devil, unarmed, `rn2(13)==0`: hell-p pline, then `rn2(6)` clone-or-ndemon, makemon, tame FALSE, WIS `rn2(19)`, return MISS. Match.
2. `rn2(13)!=0`: no `demonpet`, continue adtyping. Match.
3. `rn2(6)!=0`: `pm = youmonst.data` (clone of current form). Match.
4. `rn2(6)==0`, `ndemon` NON_PM: also clone-of-form (`i!==NON_PM` test). Match.
5. `ndemon` returns mndx: `mons(i)` then makemon. Match.
6. `makemon` fails: skip tamedog, still exercise. Match.
7. `uwep` / balrog / amorous / not demon: gate off, still `d()` consumed. Match.
8. Dice order: `d` then `rn2(13)` then maybe `rn2(6)`. Match C.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `u.ux,u.uy` is C’s makemon origin, not a session coordinate. Plain ESM.

## Verification

Journal: private canary **24**/24 (C body/gate; hell-p; `rn2(6)` clone; WIS `rn2(19)`; tame+edog; damageum `d` then `rn2(13)`; unarmed horned-devil 0 → MISS+pet; human skip; uwep/balrog/amorous 0 still hit); green+strict seed8000/0900; cohort **9**/9 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a public session Upolyd-melees as an unarmed demon. Cadence this audit: full `sessions` at HEAD `d384e339` **44**/44.

## Actionable C-wrongs

None for Must-fix. Body through live `ndemon` / `makemon` / `tamedog` / `exercise`. Appear_msg is the documented JS split, not a fake spawn.

Named omits (map, not Must-fix):

1. `tamedog` is_demon/covetous/minion/quest-leader (hero-is-demon covers is_demon here)
2. AT_ENGL `gulpum`; fight_empty `explum`; altwep
3. `tamedog` givemsg-true pline still deferred (unused at FALSE)

Do not Must-fix “queue said `makemon.c`.” Do not Must-fix “`mons(i)` allocates.”

## Callers / RNG ledger

C: only `damageum`. JS same. RNG: `d` + `rn2(13)` + maybe `rn2(6)` + ndemon/makemon + `rn2(19)`. Public fortress is not evidence a hell-p arrived.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: unarmed poly demon 1/13 now plines hell-p, `makemon`s, `tamedog`s FALSE, and exercises WIS through live callees; AT_ENGL stays named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1252 `f7714f94`.
