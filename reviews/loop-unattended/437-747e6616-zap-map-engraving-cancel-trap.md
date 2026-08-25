# Review 437 — 747e6616 — zap.c zap_map down engraving / maybe_explode_trap (D-1476)

## Metadata
- Full / short hash: `747e6616d59b63831aee3b45f35205f2f877527f` / `747e6616`
- Parent: `8558b7d4` (audit #1860, reviews **428–436**). This file audits **this SHA only** (first of nine `js/` commits since review **436**). Archive **Addressed:** D-1476 `747e6616` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 14:33:35 +0200
- D-id: **D-1476**
- Stats: 11 files, +238 / −67 — `js/zap.js` +161; `js/engrave.js` +30; `js/spell.js` comments.
- Claims to close: Open `zap.c` `zap_map` engraving/cancel trap (named from D-1475 / review **436** / **427** / **404**). Not probing. `reviews/loop-2026-08-15/` has no unpaid zap_map Must-fix.
- JS / map: `zap.js` `zap_map` / `maybe_explode_trap`; `engrave.js` `rloc_engr`. `c-js-map/turns.md`. Lateral drawbridge / `bhit` zap_map named.
- Prior reviews this SHA claims to close: **436** named zap_map engraving after LOCKING doorlock; **427** named zap_map ENGRAVE after STONE updown; **404** named maybe_explode_trap / down engravings after probing-only `zap_map`.

## Intent vs deliverable

Git subject promises: “Match C zap.c zap_map down engraving and maybe_explode_trap so a downward cancel/invis/poly/tele/stone/striking zap rewrites or wipes a floor engraving or explodes a magical trap instead of skipping zap_map.”

C `zap_map` `:3628–3800`: `maybe_explode_trap` (`:3594–3623`) then refresh `t_at`; if `u.dz>0` non-HEADSTONE engraving switch (`:3645–3683`); else if `!u.dz` lateral drawbridge (`:3685–3717`); then WAN_PROBING (`:3720–3796`); `if (learn_it) learnwand`. Callers: `zap_updown` probing `:3248`; `zap_updown` down epilogue `:3382–3389` after `default: break` (`:3378–3379`); lateral `bhit` ZAPPED_WAND `:3921`. Callee `engrave.c` `rloc_engr` `:1666–1681`.

Old JS: probing-only `zap_map` after D-1444. `zap_updown` default still `return false`.

The diff **does** port cancel-trap + the down engraving switch + `rloc_engr`, and it rewires probing `learn_it` onto a `{v}` box like C’s `boolean *`. It **does not** change `zap_updown` `default` (`:3378–3379` still JS `return false`). It **does not** add lateral drawbridge or `bhit` `:3921`. Named on drawbridge/`bhit`. **Not named as a closed caller** for cancel/invis/poly/tele: the D-log says “Caller `zap_updown` down already invoked `zap_map` (D-1444/D-1466).” That is true for probing / OPENING / STRIKING / LOCKING / STONE. It is **false** for the four otyps the subject lists first.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zap_map` down engraving switch | C `:3645–3683`, **wired this SHA** | only runs if caller reaches `zap_map` |
| `maybe_explode_trap` | C `:3594–3623`, **wired this SHA** | |
| `undestroyable_trap` | C `trap.h:116–117`, **clone matching C** | portal / vibrating square; `trap.js` / `dig.js` have the same macro |
| `is_magical_trap` | C `trap.h:118–122`, **imported live** (`const.js`) | TELEP / LEVEL_TELEP / MAGIC / ANTI_MAGIC / POLY |
| `rloc_engr` | C `engrave.c` `:1666–1681`, **wired this SHA** | `goodpos(NULL,0)` live |
| `del_engr` / `make_engr_at` / `wipe_engr_at` / `random_engraving` | C `engrave.c`, **imported live** | |
| `explode` / `deltrap` / `shieldeff` / `learnwand` | C, **imported live** | `deltrap` skips conjoined/Sokoban (not this trap class) |
| `goodpos` | C `teleport.c` `:86–185`, **imported live** | |
| `zap_updown` default → epilogue | C `:3378–3389`, **still `return false`** | **C-wrong for promised otyps** |
| lateral drawbridge / `bhit` `zap_map` | C `:3685–3717` / `:3921`, **named omit** | |
| `force_decor` / Rogue `draft_message` / VS `the` | C probing tail, **named omit** | pre-existing D-1444 |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Grep `FORCE` is `SPE_FORCE_BOLT`. Rule #2 clean. **New gameplay RNG:** `d(3,6)` in explode; poly `random_engraving` (`rn2(4)` + rumor/file + wipe); STONE/STRIKING `d(2,4)` then `wipe_engr_at` (`rn2`); `rloc_engr` loop `rn1(COLNO-3,2)` + `rn2(ROWNO)` until `goodpos`. Public fortress does not zap down at an engraving or magical trap.

## C ↔ JS fidelity

`maybe_explode_trap`: `!ttmp || !otmp` return; otyp WAN/SPE_CANCELLATION only. Undestroyable: `shieldeff` then `cansee` → `tseen=1` `newsym` `*learn_it=TRUE`. Magical: snapshot `seeit=cansee`, `explode(x,y,-WAN_CANCELLATION,20+d(3,6),TRAP_EXPLODE,EXPL_MAGICAL)`, `deltrap`, `newsym`, `if (seeit) *learn_it`. PIT/HOLE no-op. JS copies that order. `TRAP_EXPLODE` in JS is the explode-olet sentinel `-3` (with `MON_EXPLODE`/`BURNING_OIL`); C is `MAXOCLASSES+3`. `explode.js` already special-cases `olet === TRAP_EXPLODE` → `type=0` like C `:261–262`. Not a new C-wrong. **Callee `explode` is not a stub.** Hallucination check: “Match C maybe_explode_trap” while **`explode`/`deltrap` are live** is not a dispatch-stub lie **if `zap_map` runs**.

Down switch: HEADSTONE skipped. POLY: `del_engr` then `random_engraving` then `make_engr_at(..., moves, 0)` (type 0 → `rnd(HEADSTONE-1)` like C). CANCEL/INVIS: `del_engr` only (no SPE_INVISIBILITY in C). TELE: `rloc_engr`. STONE: ENGRAVE-only `pline_The` (“The floor runs like butter!” / “The edges on the floor get smoother.”) then `wipe_engr_at(d(2,4), TRUE)`. STRIKING/FORCE: same wipe without the ENGRAVE gate. Default: no-op. Strings match `pline_The`. **Body matches `:3650–3682`.** None of these arms set disclose/`learn.v`. Match.

`rloc_engr`: `tryct=200`; `--tryct<0` return; `tx=rn1(COLNO-3,2)` `ty=rn2(ROWNO)`; loop while `engr_at || !goodpos(tx,ty,NULL,0)`; write `engr_x/y`; `newsym` dest only. COLNO 80 / ROWNO 21 match `global.h`. `goodpos` with `mtmp==null` rejects `u_at`, skips the monster block, then `accessible` + boulder. **Not a glyph stand-in.**

Lateral `else if (!u.dz)` is an empty comment. Named. Probing tail: `learn.v = !hallu` is assign, not OR — matches C `:3793`. Keep.

**The production hole:** `zap_updown` after STONE still:

```
    default:
        return false;
    }
    if (dz > 0) { bhitpile; zap_map; }
```

C `:3378–3389` `default: break` then the same epilogue. Unmounted down WAN_CANCELLATION / WAN_MAKE_INVISIBLE / WAN/SPE_POLYMORPH / WAN_TELEPORTATION / SPE_TELEPORT_AWAY therefore never call `zap_map` in JS. Riding-down those otyps go through `zap_steed` in **both** C and JS (`steedhit` skips `zap_updown`) — not the miss. STONE and STRIKING **do** `break` into the epilogue, so wipe + `maybe_explode_trap` can run for those two. Cancel-vs-MAGIC_TRAP on a down zap is dead until the default `break`s. Lateral cancel would need `bhit` `:3921` (named).

The in-function comment admits “named: down POLY/cancel/tele skip the epilogue; not this cluster.” The **subject and D-1476 log do not**. Stamping “Match C” for those four downward zaps is the hallucination.

## Hallucinations / overclaim

Subject says a downward cancel/invis/poly/tele/stone/striking zap rewrites or wipes a floor engraving or explodes a magical trap. **True** for STONE ENGRAVE wipe and STRIKING wipe (and for HEADSTONE skip / OPENING no-op **when** `zap_map` is reached). **False in `weffects` → `zap_updown`** for cancel/invis/poly/tele. D-log “caller already invoked `zap_map`” is true for D-1444/D-1465/D-1466 arms, not for C’s `default`. Private canary **35**/35 lists cancel/invis `del_engr`, poly rewrite, tele `rloc_engr`, MAGIC_TRAP explode — that only holds if the canary called `zap_map` directly. Stamping **Addressed:** D-1476 for the **callee body** is fair as a map row. Do **not** stamp “Match C downward cancel `del_engr`.” Do **not** treat fortress PASS as a down-zap at Elbereth.

## Density

One `zap_map` envelope plus `maybe_explode_trap` plus the one new callee C uses (`rloc_engr`). ~190 lines. Playbook §2b. Did not glue lateral drawbridge. Acceptable size. The miss is the caller, not width.

## Branch-by-branch confirm

1. Down STRIKING + non-HEADSTONE engraving: `wipe_engr_at(d(2,4), true)` via epilogue. Match `:3676–3678` / `:3382–3389`.
2. Down SPE_STONE_TO_FLESH + ENGRAVE: butter/smoother then same wipe. Match `:3667–3674`. Non-ENGRAVE: flavor in `zap_updown` D-1466, `zap_map` no-op. Match.
3. Down WAN_LOCKING / OPENING: reach `zap_map`; default engraving arm. Match.
4. Down WAN_CANCELLATION + floor engraving: C `del_engr`. JS `zap_updown` `return false`. **Contradicts C `:3658–3661`.**
5. Down WAN_POLYMORPH: C rewrite. JS skip. **Contradicts `:3652–3657`.**
6. Down WAN_TELEPORTATION: C `rloc_engr`. JS skip. **Contradicts `:3663–3666`.**
7. Down WAN_MAKE_INVISIBLE: C `del_engr`. JS skip. **Contradicts `:3658–3661`.**
8. Down cancel + MAGIC_PORTAL: C shield+tseen+learnwand. JS skip. **Contradicts `:3604–3610`.**
9. Down cancel + MAGIC_TRAP: C explode+deltrap. JS skip. **Contradicts `:3611–3620`.**
10. Down cancel + PIT: C no-op (would match **if** reached).
11. HEADSTONE: skipped inside `zap_map`. Match **if** reached.
12. Up (`dz<0`): skip engraving. Match `:3645`.
13. Lateral `bhit` still no `zap_map`. Named.
14. Probing still runs (D-1444). Unchanged.
15. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `undestroyable_trap` is the `trap.h` macro, not a seed name. No hardcoded engraving coordinates.

## Verification

Journal: private canary **35**/35 (C/JS grep; cancel/invis del_engr; HEADSTONE skip; OPENING default; poly rewrite; STONE ENGRAVE wipe; tele `rloc_engr`; portal tseen+learnwand; SPE skip makeknown; PIT no-op; MAGIC_TRAP explode+deltrap; striking wipe; SPE_POLYMORPH rewrite; up/lateral skip engraving; probing still runs; named lateral bhit; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Those cancel/poly/tele assertions are helper-level unless the canary went through `weffects` unmounted down. This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

1. `zap.c` `zap_updown` `default` must `break` into the shared down `bhitpile`+`zap_map` epilogue (C `:3378–3389`) so unmounted down POLY/cancel/invis/tele actually hit D-1476’s arms and `maybe_explode_trap`. Do not keep `return false`. Not probing. Not lateral `bhit`. Not mixtype.

Named omits (map / Open, not Must-fix):

1. `zap_map` lateral drawbridge / `bhit` `:3921` — Open already
2. `force_decor` ice/furniture; Rogue `draft_message`; Invocation_lev VS `the`
3. `deltrap` conjoined pits / Sokoban (irrelevant for magical traps)

Do not Must-fix “`zap_map` body is a stub” (the switch matches). Do not Must-fix “STONE/STRIKING wipe never runs” (those cases `break`). Do not Must-fix “riding-down cancel should `del_engr`” (C `zap_steed` skips `zap_updown`). Do not Must-fix “lateral drawbridge should have shipped in this SHA.”

## Callers / RNG ledger

C callers: `zap_updown` down (all non-probing otyps after `break`) and `bhit` ZAPPED_WAND. JS callers at this SHA: `zap_updown` probing + epilogue of OPENING/STRIKING/LOCKING/STONE only. New dice as above; none on the cancel/invis `del_engr` arm. Public fortress does not hit the new arms.

Verdict: **QUALITY-RISK**
