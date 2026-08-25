# Review 399 — f6dd492b — potion.c peffect_hallucination (D-1439)

## Metadata
- Full / short hash: `f6dd492b74ad803d9f470757a015ab178aa3155d` / `f6dd492b`
- Parent: `abdbcad6` (D-1438). This file audits **this SHA only** (eighth of nine `js/` commits since review **391**). Archive **Addressed:** D-1439 `f6dd492b` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 03:25:21 +0200
- D-id: **D-1439**
- Stats: 10 files, +167 / −26 — `js/potion.js` +64 / −2. Docs-only besides that file.
- Claims to close: Open `potion.c` `peffect_hallucination` (named from D-1438 / review **398**). Not mix / potionhit. `reviews/loop-2026-08-15/` has no unpaid hallucination-peffect Must-fix.
- JS / map: `potion.js` `peffect_hallucination` / `Halluc_resistance`; callees `make_hallucinated` (same file), `invent.js` `enlightenment` → `doattributes`, `do_name.js` `Hallucination`. `c-js-map/turns.md` + `debt.md`. Mix / potionhit still named at this SHA.
- Prior reviews this SHA claims to close: **398** follow-up named hallucination.

## Intent vs deliverable

Git subject promises: “Match C potion.c peffect_hallucination so quaffing a potion of hallucination starts a timed hallucination (or does nothing if already resistant) instead of doing nothing.”

C `potion.c` `peffect_hallucination` `:696–714`:

```
    if (Halluc_resistance) {
        gp.potion_nothing++;
        return;
    } else if (Hallucination) {
        gp.potion_nothing++;
    }
    (void) make_hallucinated(itimeout_incr(HHallucination,
                                           rn1(200, 600 - 300 * bcsign(otmp))),
                             TRUE, 0L);
    if ((otmp->blessed && !rn2(3)) || (!otmp->cursed && !rn2(6))) {
        You("perceive yourself...");
        display_nhwindow(WIN_MESSAGE, FALSE);
        enlightenment(MAGICENLIGHTENMENT, ENL_GAMEINPROGRESS);
        Your("awareness re-normalizes.");
        exercise(A_WIS, TRUE);
    }
```

`Halluc_resistance` is `youprop.h:119` `HHalluc_resistance || EHalluc_resistance`. `Hallucination` is `:120` `HHallucination && !Halluc_resistance`. `HHallucination` is timeout-only (`:116`). `peffects` `:1340–1342` then `:1424` `return -1`. Callee `make_hallucinated` `:369–437` (mask 0: `set_itimeout`; cosmic pline iff timeout presence toggles). Callee `insight.c` `enlightenment` `:383+` with `MAGICENLIGHTENMENT` (2) and `ENL_GAMEINPROGRESS` (0).

Old JS: `peffects` default “not implemented”, return 0, no useup.

The diff **does** add `Halluc_resistance()`, `peffect_hallucination`, `POT_HALLUCINATION`, and import `enlightenment` / `MAGICENLIGHTENMENT` / `ENL_GAMEINPROGRESS`. It **does not** retouch `make_hallucinated` eatmupdate / `update_inventory` / itch-flatten (already named on that helper). It **does not** port potionhit momentary vision / potionbreathe / mix. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `peffect_hallucination` | C `:696–714`, **wired** | |
| `Halluc_resistance()` | C `youprop.h:119`, **clone matching H\|\|E** | also uprops + flat `u.Halluc_resistance` |
| `Hallucination()` | C `:120`, **imported live** (`do_name.js`) | dual-store boolean + H && !resist |
| `itimeout_incr` / `bcsign` / `rn1` / `rn2` | C, **live** | duration + enlightenment dice |
| `make_hallucinated` | C `:369–437`, **same-file live subset** | mask 0 timeout + cosmic; eatmupdate / invent / itch named |
| `enlightenment` | C `insight.c:383`, **imported live subset** | `!final` → `doattributes(MAGIC)` (D-1116); not a stub |
| `exercise` | C `attrib.c`, **imported live** (sync) | `A_WIS` true |
| `flush_topl_more` | C `display_nhwindow(WIN_MESSAGE, FALSE)`, **clone** | more-prompt stand-in |
| `peffects` POT_HALLUCINATION | C `:1340–1342` + `:1424` `-1`, **wired** | |
| mix / potionhit / potionbreathe | C siblings, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** always one `rn1(200, 600-300*bcsign)` = `rn2(200)` then add, unless Halluc_resistance returns first. Then clang-short-circuit: cursed burns **no** extra `rn2`; uncursed one `rn2(6)`; blessed `rn2(3)` then `rn2(6)` only if the first failed. Public fortress never quaffs this.

## C ↔ JS fidelity

JS is a line-for-line port of `:696–714`. Resistance: `potion_nothing++` and **return** — no timeout, no enlightenment dice. Already `Hallucination()`: `potion_nothing++` **then still** `make_hallucinated` (peculiar **and** extend). Match C’s `else if` that does not return.

Duration: `rn1(200, 600 - 300 * bcsign)` → cursed 900..1099, uncursed 600..799, blessed 300..499. Same `itimeout_incr` as D-1432 (`(old & TIMEOUT) + incr`, clamp). JS passes `u.HHallucination | 0` (C `HHallucination` = `uprops[HALLUC].intrinsic`). Dual-store: `make_hallucinated` writes `u.HHallucination` TIMEOUT bits and the boolean `u.Hallucination`; it does **not** write `uprops[HALLUC].intrinsic`. Named dual-store on the callee, not a loop-order C-wrong. Keep-path readers of `HHallucination` / `Hallucination()` see the timeout.

Callee `make_hallucinated(..., true, 0)`: C `changed` iff `!EHalluc_resistance && (!!old != !!xtime)`. First quaff: old 0, xtime nonzero → cosmic `"Oh wow!  Everything looks/feels so cosmic!"` (`Blind` → feels). Already-hallu extend: `!!old == !!xtime` → no cosmic; timeout still replaced. JS same `!!old !== !!xtime` plus a broader resist check (H/E/uprops). This caller already returned on resistance, so the extra resist bits are dead here. Named omits on the callee: `eatmupdate` when clearing, `update_inventory`, clearing-path itch/flatten (`:398–411`), Unaware already handled (`talk=FALSE`). **Not a stub.**

Enlightenment gate: JS `(otmp.blessed && !rn2(3)) || (!otmp.cursed && !rn2(6))` is the same C expression. JS `&&` / `||` short-circuit like clang:

1. Cursed: first arm false (not blessed); second `!cursed` false — **zero** `rn2`. No perceive. Match.
2. Uncursed: first arm short-circuits without `rn2(3)`; second burns `rn2(6)`. Match.
3. Blessed: `rn2(3)`; if that is 0, skip second; if nonzero, `!cursed` is true so `rn2(6)`. Match canary.

Then `You perceive yourself...` / more / `enlightenment(MAGICENLIGHTENMENT, ENL_GAMEINPROGRESS)` / `Your awareness re-normalizes.` / `exercise(A_WIS, true)`. `ENL_GAMEINPROGRESS` is 0. JS `enlightenment` with `!final` calls `doattributes(mode)` and returns — C `en_via_menu = !final` then MAGIC `attributes_enlightenment` without BASIC (`:406` skipped, `:420` taken). JS `doattributes(MAGICENLIGHTENMENT)` skips BASIC background/HP (`mode & BASIC`) and still emits MAGIC `if (magic)` attribute rows (D-1116 live subset: piousness, some resistances, …). Incomplete MAGIC rows vs C `attributes_enlightenment` are **named on invent.js**, not a new peffect C-wrong. **Callee is not a stub.** `flush_topl_more` is a clone of `display_nhwindow(WIN_MESSAGE, FALSE)` (flush more, not a full NHW_MESSAGE window). Acceptable dual.

`peffects` returns `-1` so `dopotion` useup / `trycall` / peculiar-when-`potion_nothing`. C `:1424` same.

Hallucination check: “Match C `peffect_hallucination`” while **`make_hallucinated` is live** and **`enlightenment`/`doattributes` is live** is not a dispatch-stub lie. “Match C `make_hallucinated` eatmupdate / itch-flatten” **would** be. “Match C potionhit momentary vision” **would** be.

## Hallucinations / overclaim

Subject says quaffing starts timed hallucination, or does nothing if resistant, instead of doing nothing. **True** on the keep-path: cursed cosmic + TIMEOUT 900..1099 and only `rn2(200)`; uncursed 600..799 + `rn2(6)`; blessed 300..499 + `rn2(3)` then possibly `rn2(6)`; H/E/uprops HALLUC_RES peculiar, no timeout, no dice; already-hallu peculiar **and** extend, no second cosmic; Blind “feels”; dknown makeknown+useup; enlightenment perceive+awareness when the dice fire. **False until named** for mix / potionhit (momentary vision) / potionbreathe, `make_hallucinated` eatmupdate / `update_inventory` / itch-flatten, and remaining MAGIC enlightenment rows. Stamping **Addressed:** D-1439 for `:696–714` is fair. Do **not** treat fortress PASS as a hallucination quaff.

## Density

One peffect plus a Halluc_resistance clone and two imports. ~50 lines of JS. Playbook §2b right size. Did not glue mix or potionhit. Acceptable.

## Branch-by-branch confirm

1. Sighted uncursed, not resistant: `rn2(200)+600` → 600..799; cosmic looks; then `rn2(6)` may enlightenment. Match.
2. Blessed: `+300` → 300..499; `rn2(3)` then maybe `rn2(6)`. Match.
3. Cursed: `+900` → 900..1099; no enlightenment `rn2`. Match.
4. `Halluc_resistance` (H, E, or uprops HALLUC_RES): peculiar; return; no timeout. Match `:698–700`.
5. Already `Hallucination()`: peculiar; timeout extends; no cosmic. Match `:701–703` then still `:704`.
6. Blind first quaff: cosmic “feels”. JS `u.Blind || HBlinded` vs C `Blind` macro — Eyes/PermaBlind subset named on the callee, keep-path timed Blind matches.
7. Enlightenment success: perceive / more / MAGIC dump / re-normalizes / `exercise(WIS,true)`. Match call order. MAGIC body is a live subset.
8. `peffects` `-1` → useup. Match `:1424`.
9. Mix / potionhit still not this helper. Named.
10. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No recorded coordinates. Plain ESM.

## Verification

Journal: private canary **17**/17 (C/JS grep; cursed cosmic looks TIMEOUT 900–1099 `rn2(200)` only; uncursed 600–799 + `rn2(6)`; blessed 300–499 + `rn2(3)` then `rn2(6)` iff first failed; H/E/uprops HALLUC_RES peculiar no timeout; already-hallu normal feeling extends; Blind feels; dknown makeknown+useup; enlightenment perceive+awareness; gain ability stays wired; mix/potionhit still named; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `530eaa3c` **44**/44. Fortress PASS is not a hallucination quaff.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Resistance early-return, already-hallu peculiar+extend, `rn1`/`bcsign` duration, clang short-circuit `rn2(3)`/`rn2(6)`, and `-1` useup match `:696–714`. Callees are live subsets.

Named omits (map / Open, not Must-fix):

1. mix / potionhit (momentary vision) / potionbreathe POT_HALLUCINATION
2. `make_hallucinated` eatmupdate / `update_inventory` / itch-flatten clear msgs; `uprops[HALLUC]` mirror
3. remaining MAGIC `attributes_enlightenment` rows vs `doattributes(MAGIC)` (D-1116 debt)

Do not Must-fix “already-hallu should skip `make_hallucinated`” (C still extends). Do not Must-fix “cursed should roll `rn2(6)`” (C short-circuits). Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `dopotion` → `peffects`. New RNG: `rn2(200)` plus 0–2 extra `rn2` for enlightenment. Public fortress does not quaff this.

Verdict: **ACCEPT-WITH-DEBT**
