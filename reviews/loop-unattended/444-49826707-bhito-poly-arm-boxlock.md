# Review 444 — 49826707 — zap.c bhito poly-arm boxlock reset_pick (D-1483)

## Metadata
- Full / short hash: `4982670785aa50043553bdb85dde87e0aa56e621` / `49826707`
- Parent: `f0cb5942` (D-1482). This file audits **this SHA only** (eighth of nine `js/` commits since review **436**). Archive **Addressed:** D-1483 `49826707` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 15:55:14 +0200
- D-id: **D-1483**
- Stats: 12 files, +228 / −148 — `js/zap.js` +24 / −4; `js/lock.js` +1 comment. Docs-heavy; the keep-path is seven lines in `bhito`.
- Claims to close: Open `zap.c` `bhito` poly-arm boxlock `reset_pick` (named from D-1481 / review **442**). Not uchain. `reviews/loop-2026-08-15/` has no unpaid poly-arm Must-fix.
- JS / map: `zap.js` `bhito`; callee `lock.js` `boxlock` POLY already live (`boxlock_invent` D-1434). `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **442** named poly-arm after uchain; **428** named poly-arm after boxlock OPENING.

## Intent vs deliverable

Git subject promises: “Match C zap.c bhito so a polymorph wand that hits a chest being picked resets the lock context instead of leaving xlock.box stale.”

C `bhito` `:2191–2221`: WAN/SPE_POLYMORPH; `obj_unpolyable` → `res=0` break (`:2193–2196`); polypiles/livelog (`:2197–2200`); then `:2202–2204` “any saved lock context will be dangerously obsolete” `if (Is_box(obj)) (void) boxlock(obj, otmp)`; then shudder / `poly_obj`. Callee `lock.c` `boxlock` `:1089–1095`: POLY/SPE only `reset_pick()` when `gx.xlock.box == obj`; does **not** set `res`, so `(void)` keeps `bhito` res=1 (no `learnwand` from the reset). `reset_pick` `:259–265` zeros usedtime/chance/picktyp/magic_key and nulls door/box. Unpolyable boxes never reach the call.

Old JS: poly arm was unpolyable → shudder → `poly_obj`. `boxlock` POLY already existed for inventory.

The diff **does** insert `if (Is_box(obj)) await boxlock(obj, otmp)` after unpolyable, before shudder, without assigning `res`. It **does not** add polypiles/livelog or hideunder cover. Named. It **does not** change `zap_updown` `default: return false` — it only comments that C `:3378–3379` breaks into the shared down `bhitpile`. That is review **437**’s Must-fix, not a new family from this SHA (this SHA does **not** claim down POLY now hits the pile).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `bhito` poly `Is_box` → `boxlock` | C `:2202–2204`, **wired this SHA** | `(void)` — res stays 1 |
| `boxlock` POLY/SPE | C `:1089–1095`, **C callee already live** | comment-only this SHA |
| `reset_pick` | C `:259–265`, **C callee already live** | |
| `Is_box` | C `obj.h:338`, **imported** (`const.js` LARGE_BOX/CHEST) | |
| `obj_unpolyable` | C `:1678–1683`, **already live** | type/`uball`/`uskin`/`obj_resists(5,95)` |
| polypiles / livelog | C `:2197–2200`, **named omit** | |
| hideunder cover after shudder | C `:2207–2216`, **named omit** | |
| `zap_updown` default | C `:3378–3389`, **still `return false`** | Must-fix **437**; comment only |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in the inserted call (`reset_pick` has no dice). Shudder `!rn2` was already on the arm.

## C ↔ JS fidelity

JS poly arm now:

```
if (obj_unpolyable(obj)) { res = 0; break; }
if (Is_box(obj)) await boxlock(obj, otmp);
if (obj_shudders(obj)) { … do_osshock; break; }
poly_obj / newsym; break;
```

Matches `:2193–2204` **except** the skipped polypiles increment. **Callee is not a stub:** `boxlock` POLY is `if (game.xlock?.box === obj) reset_pick()` — pointer identity like C `gx.xlock.box == obj`. `reset_pick` zeros usedtime/chance/picktyp/magic_key and `box`/`door`. Hallucination check: “Match C boxlock POLY” while **the POLY arm already lived** is **not** a dispatch-stub lie. This SHA is the **caller**.

`(void)`: JS does not write `res` from `boxlock`. POLY leaves `boxlock`’s local `res=false`. `bhito` res stays 1. No `learnwand` from reset. Match. Other-chest (`xlock.box !== obj`): no `reset_pick`. Match. Non-box dagger/sack: skip the call. Match. `obj_unpolyable` (uskin/uball/`obj_resists`): skip the call. Match.

OPENING `Is_box` still assigns `res = boxlock ? 1 : 0` (D-1467). Unchanged. Poly must not copy that — C does not.

`zap_updown` `default` still `return false`. Down POLY still never reaches this `bhito` via `bhitpile`. The comment is honest, not a fix. Riding-down POLY is `zap_steed` (D-1471), not this.

## Hallucinations / overclaim

Subject says a polymorph wand that hits a chest being picked resets `xlock.box` instead of leaving it stale. **True** for **lateral / `bhitpile` floor** WAN/SPE_POLYMORPH on that box after unpolyable. **False until named** for polypiles, hideunder, down `zap_updown` default, `delobj` `maybe_reset_pick`. Stamping **Addressed:** D-1483 for **the caller** is fair. Do **not** stamp “Match C down POLY `bhitpile`.” Do **not** treat fortress PASS (seed0398 wandpoly pile) as a pick-then-zap chest.

The D-log names the `zap_updown` hole. It does **not** claim this SHA closed it.

## Density

One predicate plus a callee that already existed. ~7 keep-path lines. Playbook §2b thin. Did not glue hideunder or muse `mbhit`. Acceptable leftover peel; not QUALITY-RISK for size alone.

## Branch-by-branch confirm

1. Floor chest, `xlock.box===obj`, WAN_POLYMORPH: `reset_pick`, res=1, no learnwand from reset, then shudder/`poly_obj`. Match `:2202–2204` / `:1089–1095`.
2. SPE_POLYMORPH: same `boxlock` arm. Match.
3. Other chest in `xlock`: no reset. Match.
4. Dagger / sack: skip `boxlock`. Match `obj.h:338`.
5. Unpolyable box: `res=0`, no `boxlock`. Match `:2193–2196`.
6. OPENING chest still Klunk/Klick (D-1467). Unchanged.
7. Down POLY still skips `bhitpile`. Named; Must-fix **437**.
8. **Public-unhit** for pick-then-zap.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. No recorded chest coordinates.

## Verification

Journal: private canary **19**/19 (C/JS grep; Rule #2; POLY reset vs other-box; WAN/SPE `bhito`; uskin skip; dagger/sack/other-chest; D-1467 Klick; weffects east; `zap_updown` default named); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Canary did not claim polypiles. This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The inserted caller matches `:2202–2204`; `boxlock` POLY is a C callee.

Named omits (map / Open, not Must-fix):

1. polypiles / livelog `:2197–2200`
2. hideunder cover after shudder `:2207–2216`
3. `delobj` `maybe_reset_pick` (D-log)
4. `zap_updown` default — Must-fix from review **437** (commented here, not shipped)

Do not Must-fix “poly `boxlock` should set `res` from the return” (C `(void)`). Do not Must-fix “sack is a box” (C `Is_box` is LARGE_BOX/CHEST only). Do not enqueue a second Must-fix copy of **437** from this comment.

## Callers / RNG ledger

C callers: `bhitpile` / `bhit` `fhito` on a floor object. New dice: none in `boxlock` POLY. Public fortress does not pick a chest then zap it.

Verdict: **ACCEPT-WITH-DEBT**
