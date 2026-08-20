# Review 227 — 9859426c — hack.c fight_empty explum(null) (D-1265)

## Metadata
- Full / short hash: `9859426c418ab2c193fc0bf8cbe068f8c449e44a` / `9859426c`
- Parent: `d86fe2fe` (D-1264). This file audits **this SHA only**. Archive row **Addressed:** D-1265 `9859426c` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 09:13:33 +0200
- D-id: **D-1265**
- Stats: 12 files, +135 / −43 — `js/cmd.js` +33 / −7; `js/uhitm.js` +28 / −5 (`attacktype_fordmg` export).
- Claims to close: Open `uhitm.c` fight_empty `explum` (queue wording; C is `hack.c` `domove_fight_empty`, named from D-1251 / review **213**). Not AT_ENGL. `reviews/loop-2026-08-15/` has no unpaid fight_empty Must-fix.
- JS / map: `cmd.js` `domove_fight_empty`; `uhitm.js` `explum` (D-1251) + `attacktype_fordmg`; `c-js-map/turns.md`. pick-dig / Underwater / Hallu statue / ansimpleoname / altwep still named.
- Prior reviews this SHA claims to close: **213** named omit fight_empty `explum(null)`.

## Intent vs deliverable

Git subject promises: “Match C hack.c fight_empty so a poly'd AT_EXPL hero exploding at empty or solid terrain runs explum and rehumanizes, instead of a harmlessly-attack pline.”

C `domove_fight_empty` (`hack.c:2241–2337`): `explo = Upolyd && attacktype(..., AT_EXPL)`; `solid = off_edge \|\| !accessible \|\| IS_FURNITURE`; off_edge → `unknown_obstacle` **goto futile** (skip boulder/pick); `!Underwater` boulder/statue + pick `use_pick_axe2` return; `unmap_object` / `map_object` / `newsym`; You `!(boulder\|\|solid)?"":!explo?"harmlessly ":"futilely "` + `explo?"explode at":"attack"`; `nomul(0)`; if `explo`: `wake_nearto(7*7)` then `explum(NULL, attacktype_fordmg(..., AT_EXPL, AD_ANY))` then `u.mh=-1; rehumanize()`. `explum` null mdef already D-1251 (`d()` then BLND/HALU no-op; blast `explode`; then another `wake_nearto` unless DEF_DIED — mdef null never DEF_DIED).

Old JS: pline + return; named omit “explode poly.”

The diff **does** the You/nomul/wake/`explum(null)`/rehumanize order. It does **not** port pick-dig / Underwater wording / Hallu statue. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `domove_fight_empty` explo arm | C `:2323–2334`, **wired** | |
| You prefix / explode-at | C `:2318–2321`, **wired** | |
| `nomul(0)` | C `:2323`, **imported live** | |
| `wake_nearto(7*7)` | C `:2329`, **imported live** | then explum wakes again |
| `explum(null, attk)` | C `uhitm.c:4891`, **imported live** | D-1251 |
| `attacktype_fordmg(..., AD_ANY)` | C `mondata.c`, **imported live** | JS `-1` is C `AD_ANY` |
| `rehumanize` | C `polyself.c`, **imported live** | |
| `Upolyd` | C `you.h`, **imported** | |
| pick `use_pick_axe2` | C `:2269–2275`, **named omit** | |
| Underwater / Hallu statue / `ansimpleoname` | C `:2258–2285`, **named omit** | |
| altwep | **named omit** this SHA | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New RNG this SHA:** none in the cmd wrapper; `explum` still always `d(damn,damd)` then maybe `explode` combat (D-1251). Double `wake_nearto` is C, not extra JS RNG.

## C ↔ JS fidelity

Pinned C (`hack.c:2318–2334`):

```
        You("%s%s %s.",
            !(boulder || solid) ? "" : !explo ? "harmlessly " : "futilely ",
            explo ? "explode at" : "attack", buf);
        nomul(0);
        if (explo) {
            struct attack *attk
                       = attacktype_fordmg(gy.youmonst.data, AT_EXPL, AD_ANY);
            wake_nearto(u.ux, u.uy, 7 * 7);
            if (attk)
                explum((struct monst *) 0, attk);
            u.mh = -1;
            rehumanize();
        }
        return TRUE;
```

JS: same prefix/verb; `nomul(0)`; `explo` from `Upolyd && attacktype_fordmg(..., AT_EXPL, -1)` (`AD_ANY` is `-1` in `monattk.h`; equivalent to C’s `attacktype(..., AT_EXPL)` for the flag). `wake_nearto` **before** `explum(null)`. Then `mh=-1; rehumanize()`. Thin air + explo → `"You explode at thin air."` (empty prefix). Solid/boulder + explo → `"futilely explode at"`. Non-explo solid → `"harmlessly attack"`. Match.

`explum(null)`: `d()` always; BLND/HALU skip (`mdef && ...`); FIRE/COLD/ELEC `explode` at hero xy with you-caused type, hero unhurt (`you_exploding`); then explum’s own `wake_nearto` because `mdef` is null. Fight_empty therefore **double-wakes**, as C. Not a missed wake and not an invented third call.

`rehumanize` is live `polyman`, not a stub that leaves `Upolyd`. Off-edge: JS `solid`, skip unmap, `"an unknown obstacle"`, still explo if poly AT_EXPL. C off_edge goto futile before unmap. Match.

This is **not** “Match C dispatch, callee is a stub”: `explum` rolls `d` and can `explode`; `rehumanize` unpolys.

Pick-dig: C can `use_pick_axe2` and **return** before You/explum. JS always You/explum. Named — a poly light with a pick fighting a wall explodes in JS and digs in C. Not a silent skip of the claimed empty-cell explode.

## Hallucinations / overclaim

Subject + D-1265 say a poly AT_EXPL force-fight of empty/solid runs `explum` and rehumanizes instead of a harmlessly-attack pline. **You/nomul/wake/`explum(null)`/`rehumanize` are the hunk.** Stamping **Addressed:** D-1265 is fair. Queue said `uhitm.c` because the explode body lives there; C caller is `hack.c`. Do **not** stamp “Match C pick-dig `use_pick_axe2`” or “Match C Underwater air-bubble wording” or “Match C `ansimpleoname` boulder.” `AD_ANY==-1` is C’s wildcard, not a trace index.

## Density

One C arm plus the already-ported `explum` null path. ~25 JS lines in `cmd.js` + export. Right size. Did not glue altwep.

## Branch-by-branch confirm

1. Human F thin air: `"You attack thin air."`, `nomul`, no explum. Match.
2. Human F wall: `"You harmlessly attack …"`, no explum. Match.
3. Yellow light F thin air: `"You explode at thin air."`, `d`, BLND no-op, double wake, rehumanize. Match.
4. Yellow light F wall: `"You futilely explode at …"`, same. Match.
5. Fire sphere F empty: `explode` you-caused, hero HP untouched, rehumanize. Match.
6. Off-edge F: unknown obstacle, skip unmap, explo still runs. Match.
7. No AT_EXPL slot: `explo` false (`attacktype` / `attacktype_fordmg` empty); no wake, no explum, no rehumanize. Match.
8. Pick + wall: still explodes, not dig. Named skip. Match the omit.
9. Non-forcefight walk: this function not entered. Match.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `7*7` is C’s radius. Plain ESM.

## Verification

Journal: private canary **28**/28 (C You/nomul/wake/explum/rehumanize order; human thin-air/wall/off-edge; yellow explode-at / futilely + rehumanize + `d()` + nearby wake; FIRE null-mdef no hero HP); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a public session Upolyd-explodes at empty. Cadence this audit: full `sessions` at HEAD `42d50a53` **44**/44.

## Actionable C-wrongs

None for Must-fix. Dispatch through live `explum` / `rehumanize`. Double `wake_nearto` is C. Pick-dig is a named omit, not a wrapper that prints explode and skips `explum`.

Named omits (map, not Must-fix):

1. pick `use_pick_axe2` (`hack.c:2269–2275`)
2. Underwater wording; Hallu monster-as-statue; `ansimpleoname` boulder
3. altwep (next SHA)

Do not Must-fix “queue said `uhitm.c`.” Do not Must-fix “JS `MON_EXPLODE === -1`.”

## Callers / RNG ledger

C: `domove_core` forcefight / remembered I (`:2590` / `:2810`). JS `cmd.js` same sites. RNG: `explum`’s `d` then explode if blast. Public fortress is not evidence a light exploded at nothing.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: poly AT_EXPL force-fight of empty/solid now futilely/explodes-at through live `explum(null)` and `rehumanize`; pick-dig stays named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1265 `9859426c`.
