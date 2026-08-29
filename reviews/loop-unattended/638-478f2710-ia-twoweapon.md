# Review 638 — 478f2710 — iactions.c IA_TWOWEAPON (D-1677)

## Metadata
- Full / short hash: `478f2710beb435e49d644c25e4af6bafd77c9dfe` / `478f2710`
- Parent: `6441842f` (D-1676). This file audits **this SHA only** (third of nine `js/` commits since review **635**). Archive **Addressed:** D-1677 `478f2710`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 19:39:38 +0200
- D-id: **D-1677**
- Stats: `js/iactions.js` +39/−5; `js/wield.js` +3/−2. Total `js/` insertions **42** <250. Band **150–350**.
- Claims to close: Open IA_TWOWEAPON after D-1676. Not IA_SWAPWEAPON / IA_RUB_OBJ / IA_WHATIS_OBJ. Not `can_twoweapon` verbose body. `reviews/loop-2026-08-15/` has no unpaid two-weapon Must-fix.
- JS / map: `iactions.js` `'X'` + MAYBETWOWEAPON + pushkeys; `wield.js` export `TWOWEAPOK`/`bimanual`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **626** / **636** named two-weapon among remaining pushkeys.

## Intent vs deliverable

Git subject promises: wielded or swap-wielded weapons offer Toggle two-weapon and queue `dotwoweapon`, instead of omitting the X row after D-1676.

Pinned C `itemactions` `:653–682` (`node scripts/csym.mjs itemactions` is the whole function; the X block is this range). `MAYBETWOWEAPON` `#define` `:666–670`. Pushkeys `:261–263`. `TWOWEAPOK` `wield.c:75–78`. `bimanual` `obj.h:257–259`. `could_twoweap` `mondata.h:129–132`. `dotwoweapon` `wield.c:844–864` (`node scripts/csym.mjs dotwoweapon`; `--callers` 0 — function pointer `iactions.c:262` / extcmd). `oc_bimanual` is `oc_big` (`objclass.h:65`).

```666:682:nethack-c/upstream/src/iactions.c
#define MAYBETWOWEAPON(obj) \
    ((((obj)->oclass == WEAPON_CLASS)                           \
      ? !(is_launcher(obj) || is_ammo(obj) || is_missile(obj))  \
      : is_weptool(obj))                                        \
     && !bimanual(obj))
    if ((otmp == uwep || otmp == uswapwep)
        && (u.twoweap
            || (could_twoweap(gy.youmonst.data) && !uarms
                && uwep && MAYBETWOWEAPON(uwep)
                && uswapwep && MAYBETWOWEAPON(uswapwep)))) {
        Sprintf(buf, "Toggle two-weapon combat %s", u.twoweap ? "off" : "on");
        ia_addmenu(win, IA_TWOWEAPON, 'X', buf);
    }
```

```261:263:nethack-c/upstream/src/iactions.c
    case IA_TWOWEAPON:
        cmdq_add_ec(CQ_CANNED, dotwoweapon);
        break;
```

Old JS: no `'X'`; `IA_TWOWEAPON` default-broke; `TWOWEAPOK`/`bimanual` were file-private in `wield.js`. The diff **does** the C filter (toggle-off skips it), the Toggle on/off string, `cmdq_add_ec(dotwoweapon)` with **no** invlet, a local `MAYBETWOWEAPON` over imported `TWOWEAPOK`/`bimanual`. It **does not** call `can_twoweapon` (C comment `:662–665`). It **does not** port rub/swap/whatis pushkeys. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `IA_TWOWEAPON` pushkeys | C `:261–263`, **LIVE this SHA** | `dotwoweapon` only |
| itemactions `'X'` | C `:672–682`, **LIVE this SHA** | |
| `MAYBETWOWEAPON` | C `:666–670` `#define`, **CLONE** (local) | one clone; do not write #2 |
| `TWOWEAPOK` | C `wield.c:75–78`, **LIVE this SHA** (export) | already the C ternary |
| `bimanual` | C `obj.h:257–259`, **LIVE this SHA** (export) | `oc_big` ≡ `oc_bimanual`; 9 other locals remain |
| `could_twoweap` | C `mondata.h:129–132`, **LIVE** | already exported; first-three `AT_WEAP` |
| `is_weptool` / launcher/ammo/missile | **LIVE** | `TWOWEAPOK` callees |
| `dotwoweapon` | C `:844–864`, **LIVE** | not rewritten; queued |
| `can_twoweapon` | C wield.c, **LIVE** (not called here) | C itemactions deliberately skips it |
| IA_SWAPWEAPON / rub / whatis | **OMIT named** | `'x'` row already present; pushkeys not this SHA |

RNG: none in the `'X'` filter / pushkeys. `dotwoweapon` `rnd(20)` vs DEX is C `:861`, not this SHA. No seed gate.

`node scripts/sym.mjs` on new / deleted / re-pointed names:

```
TWOWEAPOK        js/wield.js:989   sync
bimanual         js/wield.js:998   sync
             !! ALSO 9 LOCAL CLONE(S) in 9 files — IMPORT the export; do NOT add another
could_twoweap    js/wield.js:968   sync
MAYBETWOWEAPON   NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/iactions.js:373
             => Do NOT write clone #2. (C is a #define inside itemactions.)
dotwoweapon      js/wield.js:1274   ASYNC — await required
can_twoweapon    js/wield.js:1044   ASYNC — await required
```

`--can iactions.js wield.js TWOWEAPOK bimanual could_twoweap`: **ALREADY** (`ammo_and_launcher` was already imported). `dotwoweapon` is dynamic `import()` like the other pushkeys. Do **not** stamp “cycle-forced clone.” Do **not** add `bimanual` #11. Do **not** add `MAYBETWOWEAPON` #2. Do **not** export `MAYBETWOWEAPON`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

**`MAYBETWOWEAPON`.** C: weapon class → not launcher/ammo/missile; else `is_weptool`; and `!bimanual`. JS `TWOWEAPOK(obj) && !bimanual(obj)` with `TWOWEAPOK` the same ternary (`:75–78`) and `is_weptool` the TOOL/`oc_skill` test. `bimanual`: WEAPON/TOOL and `oc_big` (`objclass.h` alias). Extra JS `if (!obj) return false` is not C (macros assume non-null); both `uwep`/`uswapwep` are truthy-guarded in the `if`. **Match `:666–670`.**

**`'X'` filter.** C: `otmp` is `uwep` or `uswapwep`; `u.twoweap` **or** (`could_twoweap(youmonst.data)` && `!uarms` && both weapons MAYBE). Toggle-off skips the form/shield/weapon checks. JS the same (`game.youmonst?.data`). Optional chaining: if `data` is missing, `could_twoweap` is false and a not-yet-twoweapon hero gets no `'X'` — C would evaluate `youmonst.data`. That is the existing `youmonst` stand-in, not a new gate. String `Toggle two-weapon combat off/on`. **Match `:672–682`.** Comment: do not call `can_twoweapon` — JS does not.

**`could_twoweap`.** C: count `mattk[0..2].aatyp == AT_WEAP` > 1. JS loop `i < 3`. **Match `mondata.h:129–132`.**

**Pushkeys.** C `dotwoweapon` **without** invlet (unlike buy/eat). JS `cmdq_add_ec(dotwoweapon)` only. **Match `:261–263`.** `dotwoweapon` body (toggle off `ECMD_OK`; `can_twoweapon` then `rnd(20)>DEX` TIME) is already LIVE; this SHA does not rewrite it.

Callee closure. LIVE: `dotwoweapon`, `could_twoweap`, `TWOWEAPOK`, `bimanual`, `is_weptool`, launcher/ammo/missile. CLONE: `MAYBETWOWEAPON` (the `#define`). OMIT named: rub/swap/whatis pushkeys. STUB: **none** in the live `'X'` / queue arms. Combined-arm: every C callee of `:673–681` / `:262` is LIVE or the verified `#define` clone. “Dispatch ported, callee stubbed” is **false** — `dotwoweapon` is the real function, not a no-op.

## Hallucinations / overclaim

Subject “offer Toggle two-weapon and queue `dotwoweapon`”: **true**. D-log “do not call `can_twoweapon`”: **true**. Do **not** stamp “Match C `can_twoweapon` messages.” Do **not** stamp “Match C IA_SWAPWEAPON pushkeys” (`'x'` row is older; queue still named). Do **not** stamp “deleted the other `bimanual` clones.” Do **not** add `bimanual` #11. Private canary (shield/human/bimanual omit `'X'`; toggle-off shows) is the right filter check. seed0107 two-weapon enhance does not prove itemactions `'X'`. Public-unhit for that menu.

## Density

+42: one IA_TWOWEAPON envelope (filter + queue + export). §2b. Did not glue rub/swap/whatis. Above a one-`if` peel.

## Verification

Wired: `'X'` when C’s filter is true; canned `dotwoweapon` no invlet; `MAYBETWOWEAPON` via exported bits. Unwired C: swap/rub/whatis queues; `can_twoweapon` verbose rejects (only when the player actually `#twoweapon`s). Conf: no extra `rn2` in the new row. No seed gate.

Journal: private canary (MAYBETWOWEAPON + form/toggle-off; shield/human/bimanual omit); green+strict seed8000/0900; cohort **9**/9 + strict. Cadence **#2090** at HEAD: **44**/44.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): remaining pushkeys rub/swap/whatis; other `bimanual` locals. Do **not** add `bimanual` #11. Do **not** add `MAYBETWOWEAPON` #2. Do **not** call `can_twoweapon` from `itemactions`. Do **not** queue an invlet on `IA_TWOWEAPON`. Do **not** re-port `dotwoweapon` / `can_twoweapon`. Do **not** re-port D-1676 `pay_take_canned_billed`.

Verdict: **ACCEPT-WITH-DEBT**
