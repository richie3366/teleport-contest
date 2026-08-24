# Review 385 — 8f334efb — zap.c bhitm WAN_LOCKING (D-1425)

## Metadata
- Full / short hash: `8f334efb8ab69c965246db118720fa375d439edb` / `8f334efb`
- Parent: `faa5f3f3` (D-1424). This file audits **this SHA only** (third of nine `js/` commits since review **382**). Archive **Addressed:** D-1425 `8f334efb` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 00:38:10 +0200
- D-id: **D-1425**
- Stats: 11 files, +183 / −29 — `js/zap.js` +61 / −6; `js/trap.js` +43 / −1.
- Claims to close: Open `zap.c` `bhitm` WAN_LOCKING (named from D-1369 / D-1424). Not probing. `reviews/loop-2026-08-15/` has no unpaid locking Must-fix.
- JS / map: `zap.js` `bhitm` + `box_or_door`; `trap.js` `closeholdingtrap`. `c-js-map/turns.md` + `debt.md`. zapyourself WAN_LOCKING / `boxlock_invent`; WAN_PROBING; `zap_updown` `close_drawbridge`; `that_is_a_mimic` pline; hero WEB `dotrap` still named at this SHA.
- Prior reviews this SHA claims to close: **384** / **382** named locking as the next Open.

## Intent vs deliverable

Git subject promises: “Match C zap.c bhitm WAN_LOCKING so a monster-aimed locking wand calls closeholdingtrap (snapping BEAR_TRAP/WEB) instead of only waking the target.”

C `zap.c` `bhitm` `:370–375`:

```
    case WAN_LOCKING:
    case SPE_WIZARD_LOCK:
        if (disguised_mimic && box_or_door(mtmp))
            that_is_a_mimic(mtmp, MIM_REVEAL); /*seemimic()*/
        wake = closeholdingtrap(mtmp, &learn_it);
        break;
```

`box_or_door` `:173–180`: `M_AP_OBJECT` CHEST/LARGE_BOX or `M_AP_FURNITURE` `is_cmap_door` (`S_vodoor`..`S_hcdoor`). Callee `trap.c` `closeholdingtrap` `:6210–6247`: only BEAR_TRAP/WEB; already-trapped returns FALSE without touching `*noticed`; hero `dotrap(FORCETRAP[+NOWEBMSG])` then `u.utrap != 0`; monster `mintrap(FORCETRAP) != Trap_Effect_Finished` and `*noticed = cansee || canspotmon`. `zap_steed` does **not** default-route locking (`:3295+` is `zap_updown` drawbridge). Self-zap `:2948–2953` is `boxlock_invent` unless a trap snaps.

Old JS: WAN_LOCKING / SPE_WIZARD_LOCK hit `default` (always `wake` true, never trap, never learn).

The diff **does** add both otyps, local `box_or_door`, `seemimic` on box/door mimics, and a new `closeholdingtrap` beside D-0981 `openholdingtrap`. `wake = happened`; `learn_it` iff `noticed`. It **does not** port `that_is_a_mimic` Wait-pline, zapyourself, probing, or `zap_updown`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `bhitm` WAN_LOCKING / SPE_WIZARD_LOCK | C `:370–375`, **wired** | |
| `box_or_door` | C macro `:173–180`, **clone matching C** | CHEST/LARGE_BOX; S_vodoor..S_hcdoor 13..16 |
| `seemimic` | C, **imported live** | stand-in for `that_is_a_mimic` unmask |
| `that_is_a_mimic` MIM_REVEAL | C `uhitm.c:6201–6276`, **named omit** | Wait! pline; C then `seemimic` |
| `closeholdingtrap` | C `trap.c:6210–6247`, **C callee newly ported** | not a no-op |
| `dotrap` / `mintrap` | C, **imported live** | monster BEAR/WEB live; hero WEB named |
| `t_at` / `cansee` / `canspotmon` | C, **imported live** | |
| zapyourself WAN_LOCKING | C `:2948–2953`, **named omit** | `boxlock_invent` |
| WAN_PROBING | C sibling, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. `FORCETRAP`/`NOWEBMSG` are C `hack.h:1306–1307` `0x01`/`0x02`, not trace FORCE. Rule #2 clean. **New gameplay RNG:** none in the case itself; `mintrap`/`dotrap` may `d`/`rn1` when a trap actually snaps. Public fortress never zaps locking at a monster.

## C ↔ JS fidelity

Case order: after WAN_MAKE_INVISIBLE, before WAN_LIGHT in JS (C locking sits before probing then opening). Keep-path for **this** otyp matches `:370–375`. `wake` is no longer the function default: no trap → `happened` false → skip `wakeup`. That is the “instead of only waking” promise. SPE_WIZARD_LOCK shares the arm. Match `:370–371`.

`box_or_door`: object CHEST/LARGE_BOX; furniture `mappearance` in `[13,16]` = C `S_vodoor`..`S_hcdoor` (`defsym.h:104–108`, `sym.h` `is_cmap_door`). Match the macro. Non-box mimic: skip `seemimic`. Match.

`that_is_a_mimic(MIM_REVEAL)` prints then `seemimic` (`uhitm.c:6274–6275`). JS only `seemimic`. Unmask state matches; Wait! / “That door actually is…” is named omit, not a trap-snap C-wrong.

`closeholdingtrap` is the live `trap.c` body, not a stub: null/no-trap/wrong-typ → `{false,false}` (C leaves `*noticed` intact; `learn_it` starts false). Already `utrap`/`mtrapped` → same silent FALSE. Hero: `noticed=true` **before** result; `dotrap(FORCETRAP|NOWEBMSG if steed)`; `happened = !!u.utrap`. Match `:6228–6237`. Monster: `noticed = cansee(tx,ty) || canspotmon`; `happened = mintrap(FORCETRAP) !== Trap_Effect_Finished` (`trap.h` 0). Match `:6238–6244`. `Trap_Killed_Mon` is also ≠ Finished → `wake` true; epilogue skips `wakeup` if `mhp<=0`. Match.

Monster BEAR_TRAP / WEB `mintrap` arms are live (`trapeffect_bear_trap` `:2806+` sets `mtrapped`; `trapeffect_web` `:4171+` sets `mtrapped` or tears). FORCETRAP evade-pline exists. Hero WEB `dotrap` still returns Finished without `utrap` — named; **bhitm** keep-path is a monster, not `youmonst`. `zap_steed` does not call this `bhitm` for locking in C.

Hallucination check: “Match C `closeholdingtrap` snapping BEAR_TRAP/WEB” while the new `trap.js` export is the `trap.c:6210–6247` body and monster `mintrap` callees are live is **not** a dispatch-stub lie. “Match C `that_is_a_mimic` Wait-pline” **would** be. “Match C zapyourself `boxlock_invent`” **would** be. Do **not** stamp “Match C `zap_updown` `close_drawbridge`.” Do **not** stamp “Match C hero WEB `dotrap`.”

## Hallucinations / overclaim

Subject says a monster-aimed locking wand calls `closeholdingtrap` (snapping BEAR_TRAP/WEB) instead of only waking. **True** for a monster on WEB/BEAR_TRAP (`mtrapped` + learn if seen). **True** that no trap leaves the monster asleep (wake false). **True** that SPE_WIZARD_LOCK shares the arm. **True** that already-trapped is silent. **False until named for self-zap invent-lock and probing.** Stamping **Addressed:** D-1425 for `:370–375` + `:6210–6247` is fair. Do **not** treat fortress PASS as a locking-wand zap.

## Density

One C `bhitm` case plus the `trap.c` callee that case needs. ~100 lines of JS. Playbook §2b caller/callee cluster. Did not glue WAN_PROBING. Right size.

## Branch-by-branch confirm

1. No BEAR_TRAP/WEB: `happened` false; no wakeup; no learn. Match (the D-1424-era always-wake bug).
2. Monster WEB, ordinary: `mtrapped`; learn if `cansee||canspotmon`; angered wakeup. Match.
3. Monster BEAR_TRAP, size>SMALL: catch + possible `thitm`. Match.
4. Already `mtrapped`: silent FALSE. Match.
5. Giant/tear-web: `mintrap` Finished; `wake` false; noticed may still learn. Match C `!= Finished` vs noticed pointer split.
6. Chest/door mimic: `seemimic` then trap. Match unmask; Wait! named.
7. Non-box mimic: no `seemimic`. Match `box_or_door`.
8. SPE_WIZARD_LOCK same arm. Match.
9. WAN_PROBING still default at this SHA. Named.
10. zapyourself / zap_updown still named. Match.
11. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `S_VODOOR=13` / `S_HCDOOR=16` are C `defsym.h` cmap numbers, not recorded coordinates. Plain ESM.

## Verification

Journal: private canary **18**/18 (C/JS grep; Rule #2; IMMEDIATE wand; no-trap sleep stays; WEB catch+learn+anger; already-trapped silent; SPE_WIZARD_LOCK same arm; BEAR_TRAP orc; chest/door mimic seemimic; non-box mimic stays; WAN_PROBING still default; WAN_SLOW still D-1424; hero BEAR_TRAP utrap); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD (score rewrite at end of this review iter). Fortress PASS is not a locking wand.

## Actionable C-wrongs

None for Must-fix on **this** SHA. `wake = closeholdingtrap` / noticed→learn / monster WEB+BEAR snap match `:370–375` + `:6210–6247`. Callee is a real `trap.c` port, not a clone that contradicts C.

Named omits (map / Open, not Must-fix):

1. `that_is_a_mimic` MIM_REVEAL pline (`uhitm.c:6201–6276`)
2. `zapyourself` WAN_LOCKING / `boxlock_invent`
3. `bhitm` WAN_PROBING
4. `zap_updown` WAN_LOCKING `close_drawbridge`
5. hero WEB `trapeffect_web` `dotrap` (Finished stub)

Do not Must-fix “no-trap should still wake” (C sets `wake` from the callee). Do not Must-fix “locking should `helpful_gesture`” (C does not). Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: IMMEDIATE `weffects` → `bhit` → `bhitm`. `zap_steed` does not. New RNG only inside live `mintrap`/`dotrap` when a holding trap exists. Public fortress does not zap locking.

Verdict: **ACCEPT-WITH-DEBT**
