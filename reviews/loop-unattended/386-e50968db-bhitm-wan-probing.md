# Review 386 — e50968db — zap.c bhitm WAN_PROBING (D-1426)

## Metadata
- Full / short hash: `e50968db609b2c0b73ab8fde2cf8067d23146322` / `e50968db`
- Parent: `8f334efb` (D-1425). This file audits **this SHA only** (fourth of nine `js/` commits since review **382**). Archive **Addressed:** D-1426 `e50968db` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 00:53:34 +0200
- D-id: **D-1426**
- Stats: 11 files, +276 / −30 — `js/zap.js` +99 / −11; `js/invent.js` +93.
- Claims to close: Open `zap.c` `bhitm` WAN_PROBING (named from D-1369 / D-1425). Not locking. `reviews/loop-2026-08-15/` has no unpaid probing Must-fix.
- JS / map: `zap.js` `bhitm` / `probe_monster` / `probe_objchain`; `invent.js` `display_minventory`. `c-js-map/turns.md` + `debt.md`. zapyourself / zap_steed / zap_updown / bhito WAN_PROBING; INCLUDE_HERO fake-hero row still named.
- Prior reviews this SHA claims to close: **385** named probing as the next Open.

## Intent vs deliverable

Git subject promises: “Match C zap.c bhitm WAN_PROBING so a monster-aimed probing wand calls probe_monster (status + minvent) instead of only waking the target.”

C `zap.c` `bhitm` `:376–381`:

```
    case WAN_PROBING:
        wake = FALSE;
        reveal_invis = TRUE;
        probe_monster(mtmp);
        learn_it = TRUE;
        break;
```

Callee `probe_monster` `:625–640`: `mstatusline`; `gn.notonhead` returns (long-worm tail); else `probe_objchain` + `display_minventory(MINV_ALL|MINV_NOLET|PICK_NONE, NULL)` or `"not carrying anything"` (+ `" besides you"` if `engulfing_u`). `probe_objchain` `:611–623`: `observe_object`; container/statue `lknown` and `cknown` unless `SchroedingersBox`; tin `known`. `invent.c` `display_minventory` `:5340–5386`: `query_objlist` INVORDER_SORT + `suppress_price` + `youmonst.data` swap; empty `invdisp_nothing`. Epilogue `:563–566`: `reveal_invis && !DEAD && cansee(bhitpos) && !canspotmon` → `map_invisible`. `zap_steed` `:3099–3103` calls `probe_monster` **directly**, not this `bhitm`. Self-zap `:2960–2964` is `probe_objchain(invent)`.

Old JS: WAN_PROBING hit `default` (always wake, no status, no minvent, no learn). `void reveal_invis` dropped C’s `'I'` map.

The diff **does** add the case, `probe_objchain`, `probe_monster`, thin `display_minventory` for MINV_ALL|PICK_NONE, and the `map_invisible` epilogue. It **does not** port zap_steed / zapyourself / INCLUDE_HERO. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `bhitm` WAN_PROBING | C `:376–381`, **wired** | wake false; always learn |
| `probe_monster` | C `:625–640`, **C callee newly ported** | |
| `probe_objchain` | C `:611–623`, **C callee newly ported** | |
| `observe_object` | C `o_init.c:442–451`, **imported live** | hallu skip matches C |
| `mstatusline` | C `insight.c`, **imported live, thin** | Level/HP/AC; ailments named |
| `display_minventory` | C `invent.c:5340–5386`, **clone / query_objlist analog** | MINV_ALL\|PICK_NONE envelope |
| `map_invisible` | C `display.c`, **imported live** | epilogue now wired |
| `SchroedingersBox` | C `obj.h`, **clone matching C** | LARGE_BOX spe==1 |
| `Is_container` | C `obj.h`, **imported live** | LARGE_BOX..BAG_OF_TRICKS |
| `s_suffix_zap` / `s_suffix_inv` | C `hacklib.c:345–358`, **clones** | extra z/x/ch/sh vs C trailing `s` |
| INCLUDE_HERO | C `:5361/:5368`, **named omit** | swallowed fake-hero row |
| zap_steed / zapyourself / bhito | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in the case (`observe_object` / `discover_object` are not `rn2`). Public fortress never zaps probing at a monster.

## C ↔ JS fidelity

Case matches `:376–381` call-for-call: `wake=false` (no anger), `reveal_invis`, `probe_monster`, `learn_it=true`. `game.notonhead` is set at `bhitm` entry from `mx/my != bhitpos` — match C `:185`. Tail hit skips minvent after status. Match `:629–630`.

`probe_objchain`: `observe_object` then container/statue `lknown`; `cknown` iff `!SchroedingersBox`; tin `known`. Match `:614–622`. `observe_object` skips `Hallucination` like C `:447`. `Is_container` is otyp 214..220 ≡ `LARGE_BOX`..`BAG_OF_TRICKS`.

`probe_monster` empty: `noit_Monnam` + `" is not carrying anything"` + optional `" besides you"`. Match `:637–638`. Non-empty: chain then `display_minventory(MINV_ALL|MINV_NOLET|PICK_NONE)`. Flags match `monst.h:47–48` (`0x08|0x04|0`). JS passes an explicit title (`s_suffix_zap(noit_Monnam)+" possessions:"`) which is C’s NULL-title `tmp` (`:5356–5357`). Same string on the keep-path. C `s_suffix` only special-cases it/you and a trailing **`s`**; JS also treats z/x/ch/sh as `"'"`. `"fox's"` vs `"fox'"` is a clone nit on the header, not status/dknown/learn.

`display_minventory` is a **query_objlist analog**, not a stub: class headings via `DEF_INV_ORDER`, `doname` under `suppress_price++`, `youmonst.data = mon.data` then restore, PICK_NONE paint/`nhgetch`. Empty `"(none)"`. INCLUDE_HERO / worn_wield_only / PICK_ONE / sortloot loot-name named. `youmonst.data` restore is saved pointer vs C `&mons[u.umonnum]` — same on the unnested probe path.

`mstatusline` is the live insight export (Level/HP/AC + tame/peaceful). Ailments / worm / cham named in that callee already. Not a no-op.

Epilogue: JS had `void reveal_invis`. This SHA implements C `:563–566` for **all** `reveal_invis` arms (striking already set the flag). `map_invisible` is live (`display.js:374–384`, skip hero cell). Match C. Public-unhit.

Hallucination check: “Match C `probe_monster` status + minvent” while `mstatusline` / `observe_object` / `display_minventory` / `map_invisible` are live or a MINV_ALL analog is **not** a dispatch-stub lie. “Match C `query_objlist` INCLUDE_HERO / zap_steed probe” **would** be. Do **not** stamp “Match C zapyourself invent probe.” Do **not** stamp “Match C `hacklib.c` s_suffix z/x/ch/sh.”

## Hallucinations / overclaim

Subject says a monster-aimed probing wand calls `probe_monster` (status + minvent) instead of only waking. **True:** `wake` false; `mstatusline`; minvent dknown/lknown/cknown (SchroedingersBox skips cknown); empty “not carrying”; always `learnwand`; possible `'I'`. **True that SPE is not this otyp** (wand only). **False until named for steed / self-zap / INCLUDE_HERO.** Stamping **Addressed:** D-1426 for `:376–381` + `:611–640` is fair. Do **not** treat fortress PASS as a probing zap.

## Density

One C `bhitm` case plus the two zap.c helpers and the invent.c callee they need. ~190 lines. Playbook §2b caller/callee cluster (zap.js already imports invent.js). Did not glue SPE_LIGHT. Right size, near the top of the band.

## Branch-by-branch confirm

1. Empty minvent: status; “not carrying”; no wakeup; learn. Match.
2. Engulfing empty: “besides you”. Match; INCLUDE_HERO idle without minvent in C too.
3. Minvent: observe + lknown/cknown + menu. Match MINV_ALL envelope.
4. SchroedingersBox: lknown, **no** cknown. Match.
5. TIN: `known`. Match.
6. STATUE: lknown+cknown. Match.
7. `notonhead`: status, skip chain/menu. Match.
8. Hallu: `observe_object` skips dknown. Match C.
9. `map_invisible` when cansee && !canspotmon. Match `:563–566`.
10. zap_steed / zapyourself still named. Match.
11. WAN_LOCKING still D-1425. Regression-safe.
12. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Menu paint is existing `paint_corner_nhw_menu` / `select_menu_pick_none`, not a recorded overlay. Plain ESM. Two `s_suffix` clones are English-overfit, not trace indices.

## Verification

Journal: private canary **18**/18 (C/JS grep; Rule #2; empty minvent sleep+learn+not-carrying; minvent dknown/lknown/cknown/tin known; SchroedingersBox skips cknown; STATUE lknown+cknown; notonhead skips chain; engulfing “besides you”; WAN_LOCKING still D-1425; WAN_SLOW still D-1424); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD (score rewrite at end of this review iter). Fortress PASS is not a probing wand. Canary did not need a fox/lich header apostrophe.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Wake/learn/status/objchain/MINV_ALL menu/`map_invisible` match the promised keep-path. `display_minventory` is a clone analog, not a no-op that contradicts C `MINV_ALL|PICK_NONE`.

Named omits (map / Open, not Must-fix):

1. INCLUDE_HERO fake-hero row when swallowed with minvent
2. `zap_steed` `probe_monster` / zapyourself invent / `bhito` / `zap_updown`
3. `mstatusline` ailments / worm / cham
4. `query_objlist` sortloot loot-name / USE_INVLET / PICK_ONE
5. `s_suffix` z/x/ch/sh extra vs C trailing-`s` only (header string)

Do not Must-fix “probing should wake” (C `wake=FALSE`). Do not Must-fix “SchroedingersBox should set cknown” (C skips). Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: IMMEDIATE `weffects` → `bhit` → `bhitm`. `zap_steed` is a **different** caller of `probe_monster`. No new `rn2`/`d`. Public fortress does not zap probing.

Verdict: **ACCEPT-WITH-DEBT**
