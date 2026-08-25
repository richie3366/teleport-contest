# Review 422 — 2173fc2d — zap.c bhit doorlock WAN_OPENING/SPE_KNOCK (D-1462)

## Metadata
- Full / short hash: `2173fc2d9e046130c771bc5eaea7b3896cff34a5` / `2173fc2d`
- Parent: `e4d98eb1` (D-1461). This file audits **this SHA only** (fourth of nine `js/` commits since review **418**). Archive **Addressed:** D-1462 `2173fc2d` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 10:42:45 +0200
- D-id: **D-1462**
- Stats: 11 files, +172 / −33 — `js/lock.js` +71 / −2; `js/zap.js` +26 / −7; `js/spell.js` comments.
- Claims to close: Open `zap.c` `bhit` doorlock WAN_OPENING/SPE_KNOCK (named from D-1461 / review **421**). Not boxlock. `reviews/loop-2026-08-15/` has no unpaid doorlock Must-fix.
- JS / map: `lock.js` `doorlock`; `zap.js` `bhit` ZAPPED_WAND. Callees `picking_at` / `reset_pick` / `stop_occupation` / `learnwand` already live. `c-js-map/turns.md`. LOCKING/STRIKING / `bhito` boxlock named.
- Prior reviews this SHA claims to close: **410** / **412** named `bhit` doorlock after KNOCK/LOCK casts; **421** named doorlock after STONE.

## Intent vs deliverable

Git subject promises: “Match C zap.c bhit doorlock WAN_OPENING/SPE_KNOCK so a lateral knock or opening zap unlocks a locked door or reveals a secret door instead of skipping doorlock.”

C `zap.c` `bhit` `:4056–4074`: `weapon == ZAPPED_WAND && (IS_DOOR(typ) || typ == SDOOR)` then switch OPENING/LOCKING/STRIKING/KNOCK/WIZARD_LOCK/FORCE_BOLT: `doorlock` then `learnwand` if `cansee || (WAN_STRIKING && !Deaf)`; if `doormask == D_BROKEN` and shop, `shopdoor` + `add_damage(SHOP_DOOR_COST)`. `rm.h`: `SDOOR=14`, `DOOR=23`, `IS_DOOR(typ)==DOOR` only — **not** STONE.

C `lock.c` `doorlock` `:1103–1272`: SDOOR + OPENING/KNOCK/STRIKING/FORCE → `typ=DOOR`, `doormask=D_CLOSED|(D_TRAPPED)`; “A door appears in the wall!”; OPENING/KNOCK **return TRUE** (`:1124–1125`) so they skip the later `picking_at` epilogue; STRIKING `break`s into the strike body. SDOOR + LOCKING/default return FALSE. Then OPENING/KNOCK on a real door: `D_LOCKED` → “The door unlocks!” + `D_CLOSED|D_TRAPPED`; else `res=FALSE`. `pline1` if `msg && cansee`. `loudness` 0 for OPENING/KNOCK so no `wake_nearto` / shop damage. If `res && picking_at`: `stop_occupation` + `reset_pick`.

Old JS: `bhit` tested `IS_DOOR || typ === STONE` (wrong; C is SDOOR) and left doorlock empty. IMMEDIATE OPENING/KNOCK already reached `bhit` (D-1450).

The diff **does** add `doorlock` OPENING/KNOCK (SDOOR appear + locked unlock + picking_at) and wires `bhit` on `IS_DOOR|SDOOR` for those two otyps. It **does not** port LOCKING/STRIKING/FORCE `doorlock` arms or C’s `D_BROKEN` shop `add_damage` (OPENING/KNOCK never set `D_BROKEN`). Named. It **does not** add `bhito` boxlock. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `bhit` ZAPPED_WAND door cell | C `:4056–4074`, **wired this SHA** | was `typ===STONE` |
| `doorlock` OPENING/KNOCK | C `:1113–1125` / `:1193–1200` / `:1258–1272`, **wired this SHA** | |
| `doorlock` LOCKING/STRIKING/FORCE | C `:1135–1253`, **named omit** | JS default `false` |
| `picking_at` / `reset_pick` | C `lock.c`, **imported live** | |
| `stop_occupation` | C `hack.c`, **imported live** | |
| `learnwand` | C `zap.c` `:133+`, **imported live** | SPBOOK skip |
| `bhito` boxlock | C, **named omit** | Open already |
| `muse.c` `mbhit` doorlock | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. Grep `FORCE` is `SPE_FORCE_BOLT` in named-omit comments. **New gameplay RNG:** none at this locus (`doorlock` OPENING/KNOCK has no `rn2`). Public fortress may lateral-zap a door only if a session already does; treat as **public-unhit** unless a seed knocks a door.

## C ↔ JS fidelity

`bhit` `:4056`: JS now `IS_DOOR(typ) || typ === SDOOR`. `IS_DOOR` is `typ === DOOR` (`const.js` / `rm.h:121`). `SDOOR=14` matches `rm.h:70`. The old `typ === STONE` never saw secret doors and could fire on solid stone. **That was a C-wrong; this SHA fixes it.**

C switch includes six otyps. JS calls `doorlock` only for OPENING/KNOCK. For those two, C `learnwand` extra `(WAN_STRIKING && !Deaf)` is false, so `cansee` only — JS matches. C `D_BROKEN` shop cost never runs for OPENING/KNOCK (they do not break). Skipping that block on this envelope is not a C-wrong. LOCKING/STRIKING not calling `doorlock` is the named omit (C would lock/crash).

`doorlock` SDOOR OPENING/KNOCK: `typ=DOOR`, `doormask=D_CLOSED|(doormask&D_TRAPPED)`, `newsym`, `cansee` pline, **return true**. JS matches. Early return skips `:1267–1271` picking_at. Match.

`doorlock` ordinary door OPENING/KNOCK: `D_LOCKED` → msg + `D_CLOSED|D_TRAPPED`; else `res=false`. Then `if (msg && cansee) pline`. `loudness` stays 0. `if (res && picking_at) stop_occupation+reset_pick`. JS matches. Closed-unlocked / open / broken: not locked → `res=false` → no pick reset. Match.

`picking_at` compares `xlock.door` to `level.at(x,y)`. `reset_pick` live. Not clones.

Hallucination check: “Match C doorlock OPENING/KNOCK” while **`doorlock` is a real C callee** (not a no-op, not `boxlock_invent` stand-in) is **not** a dispatch-stub lie. Default false for LOCKING is named, not claimed Match C.

## Hallucinations / overclaim

Subject says a lateral knock or opening zap unlocks a locked door or reveals a secret door instead of skipping doorlock. **True** for WAN_OPENING/SPE_KNOCK on `DOOR`/`SDOOR`. **False until named** for LOCKING hide/lock-shut, STRIKING crash/trap explode, shop `add_damage` on `D_BROKEN`, `bhito` boxlock, monster `mbhit`. Stamping **Addressed:** D-1462 for the **OPENING/KNOCK `bhit`+`doorlock` envelope** is fair. Do **not** stamp “Match C WAN_LOCKING doorlock.” The D-log correctly records the old `typ===STONE` test as wrong, not a named omit of SDOOR.

## Density

One `bhit` cell test plus the two C OPENING/KNOCK `doorlock` arms (~70 lines). Playbook §2b caller/callee. Did not glue LOCKING. Acceptable.

## Branch-by-branch confirm

1. Lateral WAN_OPENING / SPE_KNOCK into `SDOOR`: appear, `D_CLOSED|D_TRAPPED`, return true, `learnwand` if `cansee`. Match `:1113–1125` / `:4064–4066`.
2. Same into locked `DOOR`: unlock, keep trap bit, pline if seen, maybe abort pick. Match `:1193–1200` / `:1267–1271`.
3. Same into closed-unlocked / open: `res=false`, no pline. Match `:1198–1199`.
4. SPE_KNOCK `learnwand` skips `makeknown` (SPBOOK). Match.
5. SDOOR OPENING does **not** `reset_pick` (early return). Match `:1124–1125`.
6. `typ===STONE` no longer enters doorlock. Match C `SDOOR` not STONE.
7. LOCKING/STRIKING still skip `doorlock`. Named.
8. **Public-unhit** unless a public seed already knocks a door.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. No hardcoded door coordinates.

## Verification

Journal: private canary **18**/18 (C/JS grep; locked unlock+learnwand; SPE_KNOCK SPBOOK skip makeknown; trapped keeps D_TRAPPED; closed no-op; SDOOR appear; LOCKING/STRIKING named; bhit skips STONE; D_ISOPEN false; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session zaps opening/knock at a door. I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None for Must-fix on **this** SHA. `bhit` cell test matches `:4056`. OPENING/KNOCK `doorlock` arms match `:1113–1125` / `:1193–1200` / picking_at epilogue. Old STONE test is gone.

Named omits (map / Open, not Must-fix):

1. `bhit`/`doorlock` WAN_LOCKING/SPE_WIZARD_LOCK (Rogue hide / obstructed / lock-shut) — Open already after this SHA
2. `bhit`/`doorlock` WAN_STRIKING/SPE_FORCE_BOLT (trap explode / `D_BROKEN` / shop `add_damage`)
3. `bhito` boxlock WAN_OPENING/WAN_LOCKING
4. `muse.c` `mbhit` doorlock

Do not Must-fix “LOCKING should have shipped in this SHA.” Do not Must-fix “dispatch is a stub.” Do not Must-fix “SDOOR early return skips picking_at” — that **is** C.

## Callers / RNG ledger

C callers: `bhit` (hero zap); `mbhit` named. No new dice. `learnwand` may `exercise(A_WIS)` when identifying a wand (not a spellbook).

C `bhit` still stops after the door if `!ZAP_POS || closed_door` (`:4076–4079`). Newly appeared SDOOR→closed door is `closed_door` so the beam stops. JS unchanged stop. Match.

Verdict: **ACCEPT-WITH-DEBT**
