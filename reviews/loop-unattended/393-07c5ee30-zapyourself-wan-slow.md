# Review 393 — 07c5ee30 — zap.c zapyourself WAN_SLOW_MONSTER (D-1433)

## Metadata
- Full / short hash: `07c5ee30e81c5d7e1c0ce4c3ab180b697b6c1c3c` / `07c5ee30`
- Parent: `b19bcf7a` (D-1432). This file audits **this SHA only** (second of nine `js/` commits since review **391**). Archive **Addressed:** D-1433 `07c5ee30` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 02:20:13 +0200
- D-id: **D-1433**
- Stats: 10 files, +140 / −29 — `js/zap.js` +32 / −7; `js/mhitu.js` +30 / −3.
- Claims to close: Open `zap.c` `zapyourself` WAN_SLOW_MONSTER (named from D-1424 / D-1432). Not locking self. `reviews/loop-2026-08-15/` has no unpaid slow-self Must-fix.
- JS / map: `zap.js` `zapyourself`; callee `mhitu.js` `u_slow_down`. `c-js-map/turns.md` + `debt.md`. WAN_LOCKING / probing / drain still named at this SHA.
- Prior reviews this SHA claims to close: **384** named zapyourself after bhitm WAN_SLOW; **392** queue follow-up.

## Intent vs deliverable

Git subject promises: “Match C zap.c zapyourself WAN_SLOW_MONSTER so self-zapping a wand of slow monster strips timed/intrinsic speed instead of doing nothing.”

C `zap.c` `zapyourself` `:2868–2874`:

```
    case WAN_SLOW_MONSTER:
    case SPE_SLOW_MONSTER:
        if (HFast & (TIMEOUT | INTRINSIC)) {
            learn_it = TRUE;
            u_slow_down();
        }
        break;
```

Callee `mhitu.c` `u_slow_down` `:161–171`:

```
    HFast = 0L;
    if (!Fast)
        You("slow down.");
    else /* speed boots */
        Your("quickness feels less natural.");
    exercise(A_DEX, FALSE);
```

`HFast` is `youprop.h:374` `u.uprops[FAST].intrinsic`. `Fast` is `HFast || EFast`. `TIMEOUT` `0x00ffffff`; `INTRINSIC` = `FROMOUTSIDE|FROMRACE|FROMEXPER` (`prop.h:135–140`). `FROMFORM` `0x10000000` is **not** in that mask. Boots-only `EFast` misses the gate. End of `zapyourself` `:3011` `if (learn_it) learnwand(obj)` (SPBOOK skip `:133`). Caller `dozap` self-dir.

Old JS: `zapyourself` default break. `u_slow_down` absent.

The diff **does** add the WAN/SPE_SLOW arm and port `u_slow_down` in `mhitu.js` (C home; zap already imports mhitu). It **does not** port WAN_LOCKING / WAN_PROBING / SPE_DRAIN self, `zap_steed`, or mhitu AD_SLOW / uhitm `mhitm_ad_slow` callers. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zapyourself` WAN/SPE_SLOW | C `:2868–2874`, **wired** | |
| `u_slow_down` | C `mhitu.c:161–171`, **new live C callee** | not a clone |
| `Fast()` | C `youprop.h:376`, **imported live** (`attrib.js`) | H\|\|E + uprops dual-store |
| `exercise` | C `attrib.c:489+`, **imported live** | Upolyd skips DEX; else `−rn2(2)` |
| `learnwand` | C `:123–149`, **pre-existing live** | SPBOOK skip; `update_inventory` still named there |
| `TIMEOUT` / `INTRINSIC` / `FAST` | C `prop.h`, **imported** | `FROM_FORM` not in INTRINSIC |
| `zap_steed` / WAN_LOCKING self | C siblings, **named omit at this SHA** | |
| mhitu AD_SLOW / `mhitm_ad_slow` | C callers of `u_slow_down`, **named omit** | helper now exists |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `exercise(A_DEX, false)` → `rn2(2)` when not Upolyd and `|AEXE|<50`. Gate miss burns **no** RNG.

## C ↔ JS fidelity

JS gate:

```
        const hfast = (u.HFast | 0) | (u.uprops?.[FAST]?.intrinsic | 0);
        if (hfast & (TIMEOUT | INTRINSIC)) {
            learn_it = true;
            await u_slow_down();
        }
```

C `HFast` is one word. JS ORs the flat + `uprops` mirrors (same dual-store as D-1410 speed). When they agree, the mask is C’s. `TIMEOUT` (timed potion/spell) and `INTRINSIC` (`FROMOUTSIDE` sticky potion, `FROMEXPER`/`FROM_RACE` role/race) pass. `FROMFORM` `0x10000000` alone does not (`0x10000000 & 0x07ffffff == 0`). `EFast` is **not** in `hfast`; boots-only is a no-op. Match `:2870`.

`u_slow_down` zeros `u.HFast` and `uprops[FAST].intrinsic` (C `HFast = 0L`). It does **not** clear `EFast` / extrinsic. Then `Fast()`: if boots still confer, `"Your quickness feels less natural."`; else `"You slow down."` Match `:166–169`. `exercise(A_DEX, false)`: C `:496` returns if `Upolyd && i != A_WIS` before the `rn2`; JS same. Else `AEXE(DEX) -= rn2(2)` (`:176–180`). Live, not a no-op.

`learn_it` then `learnwand`: wand + dknown + seen → `makeknown`; already-known sets dknown even if Blind; Blind unseen skips makeknown; `SPBOOK_CLASS` returns. Match `:133–147`. JS `learnwand` still omits C `:149` `update_inventory()` (pre-existing named omit on that helper, not a new contradiction in this arm).

Hallucination check: “Match C `zapyourself` WAN_SLOW” while **`u_slow_down` is a newly ported C function**, not a stub. “Match C mhitu AD_SLOW gaze” **would** be a dispatch-stub lie — that caller is still named.

## Hallucinations / overclaim

Subject says self-zap strips timed/intrinsic speed instead of doing nothing. **True:** TIMEOUT → slow-down pline + learn + `rn2(2)`; `FROMOUTSIDE`/`FROMEXPER` clear; `FROM_FORM`-only miss; EFast-only miss; TIMEOUT+EFast “less natural” and boots remain; Blind skip makeknown; SPE_SLOW same arm, spellbook skips learn. **False until named** for WAN_LOCKING / probing / drain self, `zap_steed`, and the other `u_slow_down` callers. Stamping **Addressed:** D-1433 for `:2868–2874` + `:161–171` is fair. Do **not** stamp “Match C AD_SLOW.” Do **not** treat fortress PASS as a slow self-zap.

## Density

One `zapyourself` arm plus its C callee in the module zap already imports. ~50 lines of JS. Playbook §2b caller/callee cluster. Did not glue locking. Acceptable.

## Branch-by-branch confirm

1. No HFast: gate miss; no pline; no learn; no `rn2(2)`. Match.
2. TIMEOUT only: clear; `"You slow down."`; learn; `rn2(2)`. Match.
3. FROMOUTSIDE / FROMEXPER (INTRINSIC): clear; slow-down; learn. Match. Sticky potion speed **is** stripped (`FROMOUTSIDE` ∈ `INTRINSIC`).
4. FROM_FORM only: miss. Match.
5. EFast only (boots): miss; boots stay. Match.
6. TIMEOUT + EFast: clear H; `"Your quickness feels less natural."`; E remains. Match.
7. SPE_SLOW: same arm; `learnwand` skips SPBOOK. Match.
8. Blind + unknown wand: learn_it true but no makeknown. Match `:143–147`.
9. WAN_LOCKING still default at this SHA. Named.
10. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No recorded coordinates. Plain ESM.

## Verification

Journal: private canary **16**/16 (C/JS grep; Rule #2; no-speed no-op; TIMEOUT You slow down + learn + `rn2(2)`; FROMOUTSIDE/FROMEXPER clear; FROM_FORM miss; EFast-only miss; TIMEOUT+EFast less natural + keep E; Blind skip makeknown; SPE_SLOW same arm SPBOOK skip learn; WAN_LOCKING still default; WAN_SPEED D-1410 live); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD. Fortress PASS is not a slow self-zap.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Gate mask, `HFast=0`, Fast-vs-boots plines, DEX exercise RNG, and learnwand skip match `:2868–2874` + `:161–171`. Callee is live.

Named omits (map / Open, not Must-fix):

1. `zapyourself` WAN_LOCKING / WAN_PROBING / SPE_DRAIN_LIFE (later SHAs)
2. `zap_steed` WAN_SLOW wrapper
3. mhitu AD_SLOW gaze / uhitm `mhitm_ad_slow` now that `u_slow_down` exists
4. `learnwand` `update_inventory` (pre-existing)

Do not Must-fix “boots should strip” (C misses EFast-only). Do not Must-fix “FROM_FORM should strip” (C misses). Do not Must-fix “spell should makeknown” (C `learnwand` skips SPBOOK). Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers of this arm: `dozap` self-dir → `zapyourself`. New RNG only on gate hit: `exercise` `rn2(2)`. Public fortress does not self-zap slow.

Verdict: **ACCEPT-WITH-DEBT**
