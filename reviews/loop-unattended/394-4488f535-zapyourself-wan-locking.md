# Review 394 — 4488f535 — zap.c zapyourself WAN_LOCKING (D-1434)

## Metadata
- Full / short hash: `4488f535c4cc834e1cd63c7a49d18a819312bd77` / `4488f535`
- Parent: `07c5ee30` (D-1433). This file audits **this SHA only** (third of nine `js/` commits since review **391**). Archive **Addressed:** D-1434 `4488f535` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 02:29:51 +0200
- D-id: **D-1434**
- Stats: 12 files, +258 / −145 — `js/zap.js` +41 / −7; `js/trap.js` comments +4 / −2. Journal rotate accounts for most docs churn.
- Claims to close: Open `zap.c` `zapyourself` WAN_LOCKING (named from D-1433 / review **385**). Not probing self. `reviews/loop-2026-08-15/` has no unpaid locking-self Must-fix.
- JS / map: `zap.js` `zapyourself`; callees `trap.js` `closeholdingtrap` (D-1425), `lock.js` `boxlock_invent` / `boxlock`. `c-js-map/turns.md` + `debt.md`. WAN_PROBING / drain / `zap_updown` still named at this SHA.
- Prior reviews this SHA claims to close: **385** named zapyourself `boxlock_invent`; **393** queue follow-up.

## Intent vs deliverable

Git subject promises: “Match C zap.c zapyourself WAN_LOCKING so self-zapping a wand of locking snaps a holding trap or locks carried boxes instead of doing nothing.”

C `zap.c` `zapyourself` `:2948–2954`:

```
    case WAN_LOCKING:
    case SPE_WIZARD_LOCK:
        /* similar logic to opening; invent is hit iff no trap triggered */
        if (u.utrap || !closeholdingtrap(&gy.youmonst, &learn_it)) {
            boxlock_invent(obj);
        }
        break;
```

`||` short-circuits: already `utrap` never calls `closeholdingtrap` (`*noticed` untouched). Trap-hit (`closeholdingtrap` true) skips invent. `*noticed` (not Klunk) sets `learn_it`. Callee `trap.c` `:6210–6247` (D-1425): BEAR_TRAP/WEB only; hero `dotrap(FORCETRAP[+NOWEBMSG])`; `*noticed=TRUE` before result. `boxlock_invent` `:2687–2702` walks invent `Is_box` → `boxlock` (`lock.c:1056–1098` Klunk / Wizard `lknown`). End `:3011` `learnwand` (SPBOOK skip). Caller `dozap` self-dir; wand is IMMEDIATE.

Old JS: `zapyourself` default break. `closeholdingtrap` and `boxlock_invent` already live (D-1425 / D-0981).

The diff **does** add the WAN/SPE_LOCK arm (snapshot `utrap`, else `closeholdingtrap`, invent iff `!happened`). It **does not** retouch `closeholdingtrap` / `boxlock` bodies. It **does not** port WAN_PROBING / SPE_DRAIN / `zap_updown`. Named. `trap.js` hunk is a caller comment only.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zapyourself` WAN_LOCKING / SPE_WIZARD_LOCK | C `:2948–2954`, **wired** | |
| `closeholdingtrap` | C `trap.c:6210–6247`, **imported live** (D-1425) | |
| `boxlock_invent` | C `zap.c:2687–2702`, **imported live** | `update_inventory` still named |
| `boxlock` | C `lock.c:1056–1098`, **imported live** | Klunk / lknown |
| `dotrap` BEAR_TRAP | C, **live** | hero WEB still named (review **385**) |
| `learnwand` | C `:123–149`, **pre-existing live** | SPBOOK skip |
| WAN_PROBING self | C `:2960–2965`, **named omit at this SHA** | |
| `zap_updown` locking | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. `FORCETRAP` is C `hack.h`, not trace FORCE. Rule #2 clean. **New gameplay RNG:** none in the case itself; `dotrap`/`boxlock` may run when a trap/box is actually present. Public fortress never self-zaps locking.

## C ↔ JS fidelity

JS:

```
        const alreadyTrapped = !!(game.u?.utrap | 0);
        if (alreadyTrapped) {
            await boxlock_invent(obj);
        } else {
            const closed = await closeholdingtrap(
                game.youmonst || { _youmonst: true },
            );
            if (closed.noticed) learn_it = true;
            if (!closed.happened) {
                await boxlock_invent(obj);
            }
        }
```

This is C’s `u.utrap || !closeholdingtrap(..., &learn_it)` expanded so JS can map `*noticed` without an out-pointer.

1. Already `utrap`: skip `closeholdingtrap`; still `boxlock_invent`; `learn_it` stays false. Match short-circuit (`:2951`).
2. No BEAR_TRAP/WEB: `closeholdingtrap` `{false,false}`; invent locked; no learn. Match `:6225–6226` + `!FALSE`.
3. Holding trap, not yet trapped: hero path `noticed=true` then `dotrap(FORCETRAP)`; `happened = !!u.utrap`. If snap: skip invent, learn. If miss: invent **and** learn (noticed set even when result is false). Match `:6228–6237` + `:2951–2953`.
4. Klunk does **not** set `learn_it`. Match. Unlocked box: `boxlock` `"Klunk!"` `olocked=1` `obroken=0`; Wizard `lknown=1` else `0`. Already-locked silent. Match `:1061–1073`.
5. SPE_WIZARD_LOCK: same arm; `learnwand` skips SPBOOK. Match.
6. Steed: `closeholdingtrap` `ishero` if `mon==usteed`; `NOWEBMSG`. Self-zap passes `youmonst`, not the steed. Match C `&gy.youmonst`.

Callees are **not** stubs. `boxlock_invent` still omits C `:2700–2701` `update_inventory` when any box was visited (named on `lock.js`; lknown UI, not RNG). Hero WEB `dotrap` still returns Finished without `utrap` (review **385** named omit). On a WEB tile that C would snap, JS `happened` stays false and invent still locks — that is a **named** callee hole, not a new clone that contradicts `:2948–2954`. BEAR_TRAP hero `dotrap` is live (D-1434 canary: utrap+learn skips chest).

Hallucination check: “Match C `zapyourself` WAN_LOCKING” while **`closeholdingtrap` and `boxlock` are live C ports** is not a dispatch-stub lie. “Match C hero WEB `trapeffect_web`” **would** be. “Match C `zap_updown` drawbridge” **would** be.

## Hallucinations / overclaim

Subject says self-zap snaps a holding trap or locks carried boxes instead of doing nothing. **True** on the keep-path: unlocked chest Klunk no learn; already-locked silent; empty invent no-op; already-utrap still boxlock no learn; BEAR_TRAP snap skips chest + learn; SPE_WIZARD_LOCK SPBOOK skip; Blind skip makeknown; Wizard vs tourist `lknown`. **False until named** for WAN_PROBING / drain self, `zap_updown`, hero WEB snap, and `boxlock_invent` `update_inventory`. Stamping **Addressed:** D-1434 for `:2948–2954` is fair. Do **not** stamp “Match C WEB `dotrap`.” Do **not** treat fortress PASS as a locking self-zap.

## Density

One `zapyourself` arm wiring two already-live callees. ~25 lines of new JS. Playbook §2b right size. Did not glue probing. Acceptable. Journal rotate in the same commit is docs hygiene, not a second gameplay hypothesis.

## Branch-by-branch confirm

1. Unlocked box, no trap: Klunk; `olocked`; no learn. Match.
2. Already-locked: silent; no learn. Match.
3. Empty invent, no trap: no-op. Match.
4. Already `utrap`: boxlock; no `closeholdingtrap`; no learn. Match.
5. BEAR_TRAP snap: learn; skip chest. Match.
6. SPE_WIZARD_LOCK: same arm; SPBOOK skip. Match.
7. Blind + unknown wand + trap notice: no makeknown. Match `learnwand`.
8. WAN_PROBING still default at this SHA. Named.
9. Hero WEB snap still Finished. Named (**385**).
10. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No recorded coordinates. Plain ESM. Comment-only `trap.js` hunk is not gameplay.

## Verification

Journal: private canary **16**/16 (C/JS grep; Rule #2; unlocked Klunk+olocked no learn; already-locked silent; empty invent no-op; BEAR_TRAP utrap+learn skips chest; already-utrap still boxlock no learn; SPE_WIZARD_LOCK SPBOOK skip learn; Blind skip makeknown; Wizard lknown; tourist clears lknown; WAN_PROBING still default; WAN_SLOW D-1433; WAN_SPEED D-1410); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `530eaa3c` **44**/44. Fortress PASS is not a locking self-zap.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Short-circuit, noticed→learn, invent-iff-`!happened`, and live `boxlock`/`closeholdingtrap` match `:2948–2954`.

Named omits (map / Open, not Must-fix):

1. `zapyourself` WAN_PROBING / SPE_DRAIN_LIFE (later SHAs)
2. `zap_updown` locking / `close_drawbridge`
3. hero WEB `trapeffect_web` `dotrap` (Finished stub; **385**)
4. `boxlock_invent` `update_inventory` when boxing
5. `Soundeffect` se_klunk

Do not Must-fix “Klunk should learnwand” (C does not). Do not Must-fix “already-utrap should skip invent” (C still boxlocks). Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `dozap` self-dir → `zapyourself`. No new dice in the arm; trap/box callees may RNG when they fire. Public fortress does not self-zap locking.

Verdict: **ACCEPT-WITH-DEBT**
