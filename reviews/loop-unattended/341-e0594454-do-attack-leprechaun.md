# Review 341 — e0594454 — uhitm.c do_attack leprechaun evade (D-1381)

## Metadata
- Full / short hash: `e0594454312cf0794bd3867091b37397e482f531` / `e0594454`
- Parent: `ef8a60b0` (D-1380). This file audits **this SHA only** (third of eight `js/` commits since review **338**). Archive **Addressed:** D-1381 `e0594454` already has the short hash (filled by D-1382).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 17:43:31 +0200
- D-id: **D-1381**
- Stats: 10 files, +215 / −134 — `js/uhitm.js` +28 / −3 (mdat capture + evade); journal rotate noise in the rest.
- Claims to close: Open `uhitm.c` `do_attack` leprechaun evade (named from D-1373 / review **333**). Not wipe. `reviews/loop-2026-08-15/` has no unpaid leprechaun Must-fix.
- JS / map: `uhitm.js` `do_attack`; callee `monmove.js` `m_move`. `c-js-map/turns.md`. `check_capacity` / twoweapon still named.
- Prior reviews this SHA claims to close: **333** named evade after the wipe.

## Intent vs deliverable

Git subject promises: “Match C uhitm.c do_attack leprechaun evade so meleeing an alert leprechaun actually !rn2(7) m_move-dodges and the hero stumbles forwards, instead of always hitting.”

C `uhitm.c` `do_attack` `:555–563` after `u_wipe_engr(3)`:

```
    if (mdat->mlet == S_LEPRECHAUN && !mtmp->mfrozen && !helpless(mtmp)
        && !mtmp->mconf && mtmp->mcansee && !rn2(7)
        && (m_move(mtmp, 0) == MMOVE_DIED
            || mtmp->mx != u.ux + u.dx
            || mtmp->my != u.uy + u.dy)) {
        You("miss wildly and stumble forwards.");
        return FALSE;
    }
```

`mdat` is captured at `:450` **before** `attack_checks`. `helpless` is `monst.h:251` `msleeping || !mcanmove`. Callee `monmove.c` `m_move` is live. Stay-put after `m_move` falls through to `hitum`. `return FALSE` lets `domove` stumble (skips `atk_done` `map_invisible`).

Old JS: stub comment after D-1373 wipe.

The diff **does** capture `mdat`, import live `m_move` / `MMOVE_DIED`, and wire the short-circuit. It does **not** port `check_capacity` / `untwoweapon` / `noattacks`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| leprechaun evade | C `:555–563`, **wired** | after wipe, before hitum |
| `mdat` snapshot | C `:450`, **wired** | before attack_checks |
| `m_move` | C `monmove.c`, **imported live** | not a stub |
| `helpless` | C `:251`, **local clone that matches** | `msleeping \|\| mcanmove===0` |
| `MMOVE_DIED` | C, **imported live** | const 2 |
| `S_LEPRECHAUN` mlet | C `'l'`, **JS string token** | same convention as `makemon.js` |
| `check_capacity` / twoweapon | C `:531–537`, **named omit** | before this arm |
| `atk_done` map_invisible | C `:571–579`, **named omit** | evade skips it in C too |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `!rn2(7)` then maybe `m_move` dice. Frozen/helpless/conf/blind/other mlet skip `rn2(7)` entirely (C `&&` short-circuit).

## C ↔ JS fidelity

Predicate order matches `:556–560`. JS `mdat?.mlet === 'S_LEPRECHAUN'` is this port’s mlet string (generated `mlets[]`), not a char `'l'` miss — `makemon.js` / `monmove.js` already use that token. `m_move(mtmp, 0)` is the real function (mintrap / meating / `dog_move` / ordinary AI). Stay-put (`MMOVE_DONE`/`NOTHING` and still on `ux+dx,uy+dy`) falls through to `hitum`. Evade pline + `return false`. Match.

`check_capacity` still named: an overloaded hero in JS can reach evade, while C `goto atk_done` first. Same shape review **333** refused to Must-fix for the wipe. The cluster is the capacity gate, not “delete evade.”

Hallucination check: “Match C `m_move`-dodges” while **`m_move` is live** is not a dispatch-stub lie. Do **not** stamp “Match C `check_capacity`.” Do **not** stamp “Match C `dochug` findgold.”

## Hallucinations / overclaim

Subject says an alert leprechaun `!rn2(7)` `m_move`-dodges and the hero stumbles instead of always hitting. **True on the keep-path** when the monster is S_LEPRECHAUN, not frozen/helpless/conf/blind, `rn2(7)==0`, and it dies or leaves the attack cell. **False until named when overloaded** (C never reaches the arm). Stamping **Addressed:** D-1381 for `:555–563` is fair. Do **not** treat fortress PASS as a leprechaun dodge.

## Density

One gated caller plus an already-live `m_move`. ~28 lines of JS. Playbook §2b right size (thin, but the queued first Open). Did not glue shade_miss (next SHAs).

## Branch-by-branch confirm

1. Kobold / other mlet: no `rn2(7)`. Match.
2. Frozen / sleep / `mcanmove===0` / conf / `!mcansee`: no `rn2(7)`. Match.
3. Alert leprechaun `rn2(7)` nonzero: fall through hitum. Match.
4. `rn2(7)==0` stay-put: consume `m_move`, no stumble. Match.
5. Left cell or `MMOVE_DIED`: stumble + `return false`. Match.
6. Wipe still runs first (D-1373). Match.
7. **Public-unhit** unless a session melees an alert leprechaun that leaves.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `7` is C’s `rn2(7)`. Plain ESM.

## Verification

Journal: private canary **13**/13 (C/JS grep; frozen/sleep/conf/blind/kobold skip `rn2(7)`; meating stay-put consumes `rn2(7)`; fleeing seed stumbles; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** This audit cadence: full `sessions` at HEAD `1f94d5e3` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `38+0.31/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not a leprechaun stumble.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The evade predicate matches `:555–563` and `m_move` is the real function.

Named omits (map / already-Open, not Must-fix):

1. `check_capacity` / overexertion before evade
2. twoweapon `untwoweapon`
3. Upolyd `noattacks`
4. `dochug` S_LEPRECHAUN findgold

Do not Must-fix “compare mlet to `'l'`” (JS tokens are `S_LEPRECHAUN`). Do not Must-fix “stumble when stay-put” (C falls through to hitum).

## Callers / RNG ledger

C: maybe `rn2(7)` then `m_move` internals. JS same on the keep-path. Public fortress does not exercise the dodge.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: alert leprechaun melee now `!rn2(7)` `m_move`-dodges and stumbles; capacity/twoweapon stay named.
- Must-fix stays empty for this SHA.
