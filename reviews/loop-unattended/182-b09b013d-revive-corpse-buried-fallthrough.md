# Review 182 — b09b013d — do.c `revive_corpse` BURIED `!is_zomb` FALLTHROUGH (D-1220)

## Metadata
- Full / short hash: `b09b013d742409997ab269d25f278ff64fc7888a` / `b09b013d`
- Parent: `925e5b77` (D-1219). This file audits **this SHA only**. Archive row **Addressed:** D-1220 lacked the short hash; this review commit fills `b09b013d`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 12:42:50 +0200
- D-id: **D-1220**
- Stats: 11 files, +123 / −63 — `js/do.js` +13 / −7.
- Claims to close: Open queue `do.c` `revive_corpse` BURIED `!is_zomb` FALLTHROUGH `impossible` (named from D-1081 / D-1202 / D-1212 / review **174**). Not Soundeffect. `reviews/loop-2026-08-15/` has no unpaid buried-fallthrough Must-fix.
- JS / map: `do.js` `revive_corpse` `OBJ_BURIED`. `c-js-map/data.md`. Soundeffect `se_scratching` still named. Next Open is that Soundeffect row.
- Prior reviews this SHA claims to close: **174** named “Not BURIED `impossible`”; map D-1212 “BURIED !is_zomb FALLTHROUGH D-1220.”

## Intent vs deliverable

Git subject promises: “Match C do.c revive_corpse so a buried non-zombie that still revives reports impossible, instead of silently breaking past the C FALLTHROUGH.”

C `OBJ_BURIED` (`do.c:2217–2241`): if `is_zomb`, pit/claw/`fill_pit` then `break`; else `FALLTHROUGH` into `default` `impossible("revive_corpse: lost corpse @ %d", where)`. JS after D-1212 had the zomb arm then a **silent `break`** with a comment that the FALLTHROUGH was named omit. `default` already called `impossible`.

The diff **does** drop that silent `break` so `!is_zomb` falls into `default`. It does **not** add `Soundeffect(se_scratching, 50)` on the nearby-hear arm (`:2230`). Named. It does **not** change `is_zomb` (already rider/troll buried via D-1202).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `OBJ_BURIED` `!is_zomb` | C FALLTHROUGH, **wired** | was silent `break` |
| `default` `impossible` | C callee, **already live** | `display.js` interpolates `%d` |
| zomb pit/claw/`fill_pit` | C arm, **unchanged** | D-1202 |
| `Soundeffect(se_scratching, 50)` | C callee, **named omit** | hear arm still `You_hear` only |
| `is_zomb` | C `is_reviver` for buried, **pre-existing** | zombie mlet, or buried rider/troll |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** (zomb `maketrap` RNG unchanged).

## C ↔ JS fidelity

Pinned C (`do.c:2217–2241`):

```
case OBJ_BURIED:
    if (is_zomb) {
        maketrap(mtmp->mx, mtmp->my, PIT);
        if (cansee(...)) { tseen; pline claw; newsym; }
        else if (mdistu(mtmp) < 5*5) {
            Soundeffect(se_scratching, 50);
            You_hear("scratching noises.");
        }
        fill_pit(mtmp->mx, mtmp->my);
        break;
    }
    FALLTHROUGH;
default:
    impossible("revive_corpse: lost corpse @ %d", where);
    break;
```

JS (`do.js:2575–2598`): same `if (is_zomb) { … break; }` then no break, `default:` `await impossible('revive_corpse: lost corpse @ %d', where)`. JavaScript switch fallthrough is C-like. Match.

`where` is snapshotted **before** `revive()` (`:2491`, D-1212). C uses `corpse->where` before `revive` too (`:2123` / `:2150`). After success the corpse is gone; the switch still has the saved `where`. Buried non-zomb that `revive()` still returns a monster hits `impossible` with `@ 6` (`OBJ_BURIED`). Match.

`impossible` (`display.js:3881–3891`) replaces `%d` from `args`. C `pline`-style format. JS `"lost corpse @ %d"` + `where` → `"lost corpse @ 6"`. Then disorder + report lines (pre-existing `impossible` envelope). Match the format string.

`is_zomb` JS (`:2494–2497`): `mlet === 'S_ZOMBIE'` or (`where === OBJ_BURIED` && (`is_rider` || `mlet === 'S_TROLL'`)). C `:2127–2128`: `mons[montype].mlet == S_ZOMBIE || (where == OBJ_BURIED && is_reviver(&mons[montype]))` with `is_reviver` = rider || troll (`mondata.h:170`). Same set. Not this SHA.

Hear arm: JS `dist2 < 25` ≡ C `mdistu < 5*5`. No `Soundeffect`. Named omit of an audio hook; `You_hear` still runs. Do not Must-fix “add a silent Soundeffect no-op.” Next Open is to port `se_scratching` as a real callee if the port has that channel, not as a stub.

C `mdistu` is squared distance to hero; JS `dist2(mx,my,ux,uy)`. Same `< 25`. The Soundeffect line is **before** `You_hear` in C. Skipping it does not steal an RNG call (`Soundeffect` is audio, not `rn2`). Named, not a positional-RNG C-wrong.

`fill_pit` stays inside the zomb arm only. FALLTHROUGH does **not** pit a buried newt. Match C: `fill_pit` is before `break`, not in `default`.

JS `impossible` is `async`. The switch `await`s it. C `impossible` is sync pline. Same messages, then `return TRUE` (`:2243` / JS `:2599`). A successful revive still returns true after reporting the lost-`where` bug. Match.

Buried zombie/troll still `break`s after `fill_pit` and does **not** hit `impossible`. Match.

`revive()` failure (`!mtmp`) returns false before the switch (`:2516`). C same (`:2152`). A buried human that `revive()` refuses never hits FALLTHROUGH. Journal canary: buried human `revive` fails, no impossible. Match C `get_obj_location` without a successful `revive`. The FALLTHROUGH is only when buried non-zomb **succeeds**. Rare; still C.

## Hallucinations / overclaim

Subject + D-1220 say a buried non-zombie that still revives reports `impossible` instead of silently breaking. **Dropping the silent `break` is the hunk.** Stamping **Addressed:** D-1220 is fair. This is **not** “Match C dispatch, callee is a stub”: `impossible` is live. Do **not** stamp “Match C `Soundeffect(se_scratching)`.” Do **not** stamp “Match C `gbuf_show_kind`” — that is D-1219’s Hallu leak, not this SHA.

This SHA does not cause seed0383. It also does not fix it. Journal “fortress unchanged” on `#1549` is stale vs cadence `#1550` but not a lie **about this function**.

## Density

One `switch` arm FALLTHROUGH. §2b right size (too small alone if it had been a docs-only peel; the omit was the named next Open). Did not pull Soundeffect. Good.

## Branch-by-branch confirm

1. Buried zombie, `revive` succeeds, `cansee`: pit, claw pline, `newsym`, `fill_pit`, **no** `impossible`. Match.
2. Buried zombie, `!cansee`, `dist2 < 25`: `You_hear`, `fill_pit`, no `impossible`. Match minus Soundeffect.
3. Buried troll/rider (`is_zomb` via buried reviver): same zomb arm. Match `is_reviver`.
4. Buried non-zomb, `revive` succeeds: `impossible("… @ %d", OBJ_BURIED)`. Match FALLTHROUGH.
5. Buried non-zomb, `revive` fails: return false, no `impossible`. Match.
6. Floor/invent/minvent/contained: unchanged arms; `default` still catches unknown `where`. Match.
7. `where` after `obfree`: still the snapshot. Match D-1212.
8. `%d` interpolates. Match.
9. Soundeffect still absent. **Named.**
10. Unknown `where` (e.g. 99) still `default` `impossible` without going through BURIED. Match.
11. `OBJ_FREE` after `revive` does not change the snapshot used in the format string. Match.
12. Zomb `cansee` claw uses `Amonnam` / `"Something"` like C `:2226–2227`. Unchanged this SHA.
13. `newsym` only on the seen zomb claw arm. FALLTHROUGH does not `newsym`. Match.
14. `maketrap(..., PIT)` only in `is_zomb`. Buried non-zomb impossible path does not create a pit. Match.

Call-for-call RNG: none added. Zomb `maketrap` still whatever D-1202 shipped. `impossible` itself is not RNG.

## Anti-pattern / Rule #2 (this SHA `js/`)

`git show b09b013d -- js/` is the `do.js` FALLTHROUGH only. No banned gates. Contest Rule #2: `do.js` stays plain ESM.

## Verification

Journal: private canary **25**/25 (source FALLTHROUGH; buried human no impossible; buried zombie/troll pit; getter `@ 6`; default `@ 99`; invent uwep not lost-corpse); green+strict seed8000/0900; cohort **5**/5 + strict 1500/1800/0012/0004/0007. **Public-unhit** unless a buried non-zomb `revive()` succeeds. Admit that. This audit’s full `sessions` FAIL is seed0383 from D-1219, not this arm. Cohort did not need Hallu for this SHA.

## Actionable C-wrongs

Named omits (map / already Open), not Must-fix:

1. `Soundeffect(se_scratching, 50)` on the nearby-hear arm (`do.c:2230`) — already Open, next map cluster after Must-fix
2. unique/pname `corpse_xname` adjective placement (pre-existing)

Do not Must-fix “buried non-zomb should `panic` like some `zap.c` revive paths.” C `revive_corpse` uses `impossible` on this FALLTHROUGH.

Do not Must-fix “`dist2` should be `mdistu`.” Same squared 5×5.

The Hallu `gbuf_show_kind` C-wrong is **D-1219 / review 181**, not this SHA. Do not attach it here as if D-1220 introduced it.

C `revive()` (`zap.c`) for some buried corpses returns NULL and may `panic` on programmer error; that is a different function. This SHA only changes the `revive_corpse` switch **after** a non-NULL `mtmp`. A successful buried newt that should not have a buried-revive path is exactly C’s `impossible` report.

`OBJ_BURIED` numeric is 6 in `obj.h` (`OBJ_FREE=0` …). JS `const.js` same. Format `@ 6` is the C string, not a seed-shaped constant in control flow.

Do not add a `break` “to keep default clean.” That was the named omit this SHA removed.

## Verdict

- Verdict: **ACCEPT**
- One sentence: buried non-zomb that still revives now FALLTHROUGH to live `impossible("revive_corpse: lost corpse @ %d", where)` like C `:2236–2240`; zomb pit/claw/`fill_pit` still breaks; `se_scratching` stays named.
- Must-fix stays empty for this SHA; fill **Addressed:** D-1220 `b09b013d`. Next Open remains Soundeffect after review **181**’s Must-fix is popped.
