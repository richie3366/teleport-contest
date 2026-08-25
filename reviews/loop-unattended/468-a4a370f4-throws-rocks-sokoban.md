# Review 468 — a4a370f4 — makemon.c throws_rocks Sokoban first-try (D-1507)

## Metadata
- Full / short hash: `a4a370f446f1bba3f90ebb9479daceccc18b47a8` / `a4a370f4`
- Parent: `1e1d1864` (D-1506). This file audits **this SHA only** (fourth of nine `js/` commits since review **464**). Archive **Addressed:** D-1507 `a4a370f4`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 00:26:38 +0200
- D-id: **D-1507**
- Stats: 9 files, +94 / −31 — `js/makemon.js` +11 / −2. Band 150–350.
- Claims to close: Open `makemon.c` `throws_rocks` Sokoban first-try (named from D-1506 / D-0034). Not S_KOP. `reviews/loop-2026-08-15/` has no unpaid Sokoban-giant Must-fix.
- JS / map: `makemon.js` `makemon` random loop. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: map omit after D-0034; review **467** still named this as next Open.

## Intent vs deliverable

Git subject promises: a random Sokoban spawn rejects a `throws_rocks` giant on the first `rndmonst` try instead of keeping it.

Pinned C `makemon.c` `makemon` `:1212–1230`. Only when `ptr` is null (random). `tryct=0`; `do { ptr=rndmonst(); fakemon.data=ptr; } while (++tryct<=50 && ((tryct==1 && throws_rocks(ptr) && In_sokoban(&u.uz)) || !goodpos(x,y,&fakemon,gpflags)));`. Macros: `mondata.h:134` `mflags2 & M2_ROCKTHROW`; `dungeon.h:139` `dnum==sokoban_dnum`. Explicit `ptr` takes the `if (ptr)` genocided arm and **skips** this loop. `++tryct` is prefix in the `while`, so the first body uses `tryct==1`. The giant conjunct is left of `||`, so `goodpos` (eel `rn2`) is **not** consumed on that reject.

Old JS: same `do/while` without the giant conjunct; comment said deferred (ordinary dlvl1).

The diff **does** import live `throws_rocks` and add that conjunct with the same short-circuit. It **does not** change explicit-`ptr` callers. It **does not** port S_KOP / S_LIZARD / `set_mimic_sym` maze. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `makemon` random `while` | C `:1220–1230`, **LIVE this SHA** | |
| `throws_rocks` | C `mondata.h:134`, **LIVE** | `monsters.js:550` |
| `In_sokoban` | C `dungeon.h:139`, **LIVE** | `const.js:3000` |
| `rndmonst` | C, **LIVE** | |
| `goodpos` | C, **LIVE** | `teleport.js:461`; fakemon `{data:ptr}` pre-existing |
| explicit `ptr` | C `:1202–1211`, **LIVE** | skips the gate |
| S_KOP / S_LIZARD / maze mimic | C `m_initweap`/`set_mimic_sym`, **OMIT named** | |

`node scripts/sym.mjs throws_rocks In_sokoban goodpos rndmonst makemon`:

```
throws_rocks     js/monsters.js:550   sync
In_sokoban       js/const.js:3000   sync
goodpos          js/teleport.js:461   sync
rndmonst         js/makemon.js:409   sync
makemon          js/makemon.js:2041   sync
```

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean.

**New gameplay RNG:** first-try Sokoban giant now **skips** `goodpos` dice and burns another `rndmonst` instead. Off-Sokoban first giant still calls `goodpos` (may `rn2` for eels). Explicit ptr: no new dice. Public-unhit unless a session rolls random `makemon` on Sokoban.

## C ↔ JS fidelity

Loop shape.

```
} while (++tryct <= 50
         && ((tryct == 1 && throws_rocks(ptr) && In_sokoban(&u.uz))
             || !goodpos(x, y, &fakemon, gpflags)));
```

JS is the same with `===` and `In_sokoban(game.u?.uz)`. **Match `:1226–1230` including `&&`/`||` order.**

`throws_rocks`. C `mflags2 & M2_ROCKTHROW != 0`. JS `!!((ptr?.mflags2??0) & M2_ROCKTHROW)`. **Match** for a real `rndmonst` ptr (never null here; the `if (!ptr) return` is above).

`In_sokoban`. C `(x)->dnum == sokoban_dnum`. JS `uz.dnum === game.sokoban_dnum`. **Match.**

`tryct==1`. Prefix `++tryct` in the `while` so body 1 is the first-try reject. Try 2+ : `tryct==1` false → evaluate `!goodpos`. A giant may spawn. **Match the C comment.** `tryct==51` (`<=50` false) accepts the last `rndmonst` without either check. Pre-existing, same as C.

`goodpos` argument. C `&fakemon` after `fakemon=zeromonst; fakemon.data=ptr`. JS `{ data: ptr }` (no zeroed mx). Pre-existing in this loop; this SHA does not change that object. `goodpos` that only reads `mon.data` **Match** for the giant gate.

Explicit ptr. C genocided/extinct arm, no Sokoban first-try. JS `if (!ptr) { loop }`. A wizard `makemon(&mons[PM_GIANT], …)` on Sokoban still places. **Match.**

Callee closure. LIVE: `throws_rocks`, `In_sokoban`, `rndmonst`, `goodpos`. OMIT named: S_KOP / S_LIZARD / maze mimic (different functions). STUB: none. **Arm may ship.**

## Hallucinations / overclaim

Subject first Sokoban `rndmonst` giant is rejected: **true**. D-log “later tries fair game” / “explicit ptr skips” / “short-circuit skips eel `rn2`”: **true**. Stamping **Addressed:** D-1507 for **`:1226–1230`** is fair. Do **not** stamp “Match C S_KOP `m_initweap`.” Do **not** stamp “Match C `set_mimic_sym` sokoban.” Do **not** treat fortress PASS as a Sokoban random spawn. Old “not on ordinary dlvl1” comment was a public-session excuse, not C.

This is **not** “dispatch ported, callee stubbed.”

## Density

C is one conjunct in an existing loop. +11 JS. Playbook §2b “unless C is that small.” Did not glue S_KOP. Acceptable.

## Branch-by-branch confirm

1. Random `ptr==null` only. **Match.**
2. First try Sokoban + `throws_rocks` → continue, no `goodpos`. **Match.**
3. First try Sokoban + gnome → `goodpos` decides. **Match.**
4. Try 2+ giant in Sokoban → `goodpos` only. **Match.**
5. Off-Sokoban first giant → no special reject. **Match.**
6. Explicit giant ptr → skip loop. **Match.**
7. `rndmonst` null → return null. **Match.**
8. **Public-unhit** unless a public session random-spawns on Sokoban.

## Callers / RNG ledger

C: `makemon(NULL, x, y, …)` from create_monster / level fill. JS same. New skip of `goodpos` rng on first-try Sokoban giants only.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE. No seed-shaped “dlvl1” gate; the C `In_sokoban` test replaced that comment.

## Verification

D-log: private canary **21**/21 (source, giant vs gnome, In_sokoban, tryct 1/2/51, explicit ptr, live retry vs keep, off-Sokoban keep, Rule #2). Green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** unless Sokoban random `makemon`. Cohort is not a Sokoban fill.

## Actionable C-wrongs

None that belong on Must-fix. The `while` conjunct matches C call-for-call, including the `goodpos` skip.

Remaining named (map / Open, already queued): S_KOP `m_initweap` specials; non-salamander S_LIZARD `m_initweap`; `set_mimic_sym` maze/sokoban/`in_town`; dprince MS_BRIBE / raven `BEC_DE_CORBIN`. Do not Must-fix “`{data:ptr}` should be a full zeromonst fakemon” in this SHA (pre-existing goodpos arg). Do not Must-fix “tryct 51 should re-check goodpos” (C also accepts).

Verdict: **ACCEPT-WITH-DEBT**
