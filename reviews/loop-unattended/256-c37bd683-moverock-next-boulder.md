# Review 256 — c37bd683 — hack.c moverock next_boulder naming (D-1294)

## Metadata
- Full / short hash: `c37bd683e77f8287853dcf07ef586a1c452cc13c` / `c37bd683`
- Parent: `31e55930` (D-1293). This file audits **this SHA only**. Archive row **Addressed:** D-1294 lacked the short hash; this review commit fills `c37bd683`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 17:43:43 +0200
- D-id: **D-1294**
- Stats: 11 files, +125 / −41 — `js/hack.js` +37 / −~10; `js/objnam.js` +8. Also filled review **248** **Addressed:** D-1291 `c6fa1420`.
- Claims to close: Open `hack.c` moverock next_boulder (named from D-1281 / review **243**). Not Blind feel. `reviews/loop-2026-08-15/` has no unpaid next_boulder Must-fix.
- JS / map: `hack.js` `moverock_core` / `moverock_done` / `moverock` / `dopush`; `objnam.js` `xname`; `c-js-map/turns.md`. dopush/`cannot_push_msg`/Levitation Blind `feel_location`; trap/pool arms named.
- Prior reviews this SHA claims to close: **243** named omit `otmp->next_boulder` after Blind feel.

## Intent vs deliverable

Git subject promises: “Match C hack.c moverock so a second boulder in a pile names as next boulder in xname, instead of always saying boulder.”

C `moverock_core` (`hack.c:354–372`): `firstboulder=TRUE`; after Blind feel, `otmp->next_boulder = firstboulder ? 0 : 1` then `firstboulder=FALSE` (C FIXME: does not reset when names differ). `xname` ROCK_CLASS (`objnam.c:814–823`): `typ==BOULDER && next_boulder==1` → `"next "+actualn` then clear to 0; comment: check `==1` not `!=0` because the field **overloads `corpsenm`**, default NON_PM (−1). `moverock` `:336–345` always `moverock_done` after core. `moverock_done` `:327–333` zeros leftover BOULDERs at origin. `dopush` `:208` zeros before `movobj`. TELEP arm `:580` zeros before `rloco` (JS trap arms still named omit). Callers of `xname` in this envelope: `dopush` / `cannot_push_msg` / `the(xname)` leverage / `You_hear` monster-behind.

Old JS: named omit after D-1281; `dopush` already zeroed a dedicated `next_boulder` that was never set to 1; `moverock` skipped `moverock_done`.

The diff **does** `firstboulder`, the `0/1` assign after Blind feel, `xname` `==1` consume, `moverock_done` from `moverock`, and keeps the dedicated field (does not smash JS `corpsenm`). It does **not** port Blind `feel_location` on dopush/cannot_push/Levitation, or trap/teleport/pool. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `firstboulder` assign | C `:365–372`, **new** | after D-1281 feel, before top-of-pile |
| `xname` `"next boulder"` | C `:814–823`, **new** | `==1` then clear |
| `moverock_done` | C `:327–333`, **new** | origin-cell leftovers |
| `moverock` always done | C `:342–343`, **wired** | even on −1 |
| `dopush` zero | C `:208`, **pre-existing** | comment only this SHA |
| dedicated `next_boulder` | C `#define` `corpsenm`, **JS field** | correct analog; do not alias `corpsenm` |
| Blind feel | C `:358–363`, **pre-existing** | D-1281; still before the flag |
| TELEP `:580` zero | C trap arm, **named omit** | JS still dopush on traps |
| Blind `feel_location` | C dopush/cannot_push/Lev, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG.** `objects_at` is live `mkobj.js`.

## C ↔ JS fidelity

Pinned C (`hack.c:365–372` + `objnam.c:814–823`):

```
        otmp->next_boulder = firstboulder ? 0 : 1;
        firstboulder = FALSE;
        /* … */
        } else if (typ == BOULDER && obj->next_boulder == 1) {
            Strcat(strcpy(buf, "next "), actualn);
            obj->next_boulder = 0;
```

JS sets the flag at the same loop point (after Blind feel, before `movobj` top-of-pile / nopick). `xname` prefixes `pretty_base` (actualn analog, including Samurai Japanese) then clears. `==1` not `!=0`: unset dedicated field `|0` is 0, not NON_PM, so the `==1` test is what C asked for. Plural then `" named "` after the prefix matches C’s later xname suffixes.

`dopush` / `cannot_push_msg` format **before** the explicit zero: `the ${xname(otmp)}` vs C `the(xname(otmp))`. For `"next boulder"` both become `"the next boulder"` (`the()` on a lowercase start). First boulder: flag 0 → `"the boulder"`. Second: flag 1 → consume → `"the next boulder"` then dopush zeros again before `movobj`. Nopick returns without `xname`; flag may stay 1 until `moverock_done` — C same. Blind abort returns **before** the assign; `moverock_done` still runs and zeros. C `firstboulder` stays false even if names differ; JS comments the FIXME and does the same.

This is **not** “Match C dispatch, callee is a stub.” `xname` is live. `moverock_done` walks `objects_at` like C `level.objects[sx][sy]`. Dedicated field is the right JS analog of the `corpsenm` overload; smashing `corpsenm` would be the C-wrong.

Trap TELEP’s extra zero is inside a named-omit arm (JS still `dopush`s). Not a next_boulder miss on the shipped path.

## Hallucinations / overclaim

Subject + D-1294 say a second boulder in a pile names as `"next boulder"` in `xname`. **The flag + consume + `moverock_done` are the hunk.** Stamping **Addressed:** D-1294 is fair. Do **not** stamp “Match C `corpsenm` overlay bit-identity.” Do **not** stamp “Match C dopush dest+src Blind `feel_location`.” Do **not** stamp “Match C trap TELEP `rloco`.” Do **not** stamp “Match C `the()` vs template `the ${xname}` on unique names.” Do not stamp “Match C `cannot_push_msg` `YMonnam(steed)`.”

## Density

Tight caller/callee cluster: loop flag + `xname` consume + always-`moverock_done`. ~45 JS lines. Did not glue trap arms. Right size.

## Branch-by-branch confirm

1. Single boulder push: flag 0; `"the boulder"`. Match firstboulder.
2. Stacked push: second `"the next boulder"` then clear. Match `:365–372` + `:814–823`.
3. `xname` twice on flag 1: second is ordinary. Match consume.
4. Unset field / NON_PM analog: `|0===1` false. Match `==1` not `!=0`.
5. Non-boulder: skip prefix. Match `otyp==BOULDER`.
6. Nopick abort: `moverock_done` zeros leftovers. Match `:342–343`.
7. Blind unseen: feel, no flag, abort, done still runs. Match order + D-1281.
8. Vain `cannot_push_msg`: uses `xname` while flag may be 1. Match `:251`.
9. Levitation leverage: `the ${xname}` after flag set. Match `:422` analog.
10. Trap/pool / Blind feel_location still skipped. Named. Public-unhit unless a session pushes a multi-boulder pile.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No recorded pile coordinates. Plain ESM.

## Verification

Journal: private canary **16**/16; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session pushes a pile of more than one boulder. Cadence this audit: full `sessions` at HEAD `c37bd683` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. Loop order, `==1` consume, dedicated field, `moverock_done` on every return, and dopush zero match C `:365–372` / `:814–823` / `:326–345` / `:208`.

Named omits (map, not Must-fix):

1. dopush dest+src Blind `feel_location`; `cannot_push_msg` Blind feel; Levitation Blind feel
2. trap / teleport / pool / `boulder_hits_pool` / Sokoban diagonal / `revive_nasty`
3. `cannot_push_msg` `YMonnam(usteed)`; verysmall vain-push after nopick
4. C `the(xname)` vs some JS `` `the ${xname}` `` (pre-existing; `"next boulder"` still `"the next boulder"`)

Do not Must-fix “dedicated field not `corpsenm`.” Do not Must-fix “`pretty_base` vs `actualn`.” Do not wrap `wildmiss` as `pline_mon`. Next Open is doname MEAT_RING, not candle.

## Callers / RNG ledger

C: `moverock` ← `domove`/`test_move`. JS same. No new positional RNG. Public fortress is not evidence a second boulder printed `"next boulder"`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: 2nd+ pile boulders now format as `"next boulder"` via live `xname` and `moverock_done`; Blind feel_location and trap arms stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1294 `c37bd683`.
