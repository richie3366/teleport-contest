# Review 370 — 55259f2b — zap.c zapyourself WAN_SPEED_MONSTER (D-1410)

## Metadata
- Full / short hash: `55259f2b01ea2f4912c4af1aaa0bdaf3004d3199` / `55259f2b`
- Parent: `fa039634` (D-1409). This file audits **this SHA only** (sixth of nine `js/` commits since review **364**). Archive **Addressed:** D-1410 `55259f2b` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-22 13:19:02 +0200
- D-id: **D-1410**
- Stats: 11 files, +104 / −32 — `js/zap.js` +17 / −2 (`WAN_SPEED_MONSTER` case + `speed_up` import); `js/potion.js` comment.
- Claims to close: Open `zap.c` `zapyourself` WAN_SPEED_MONSTER (named from D-1369 / D-1408 / reviews **329** / **368** / **369**). Not make invisible. `reviews/loop-2026-08-15/` has no unpaid speed-wand Must-fix.
- JS / map: `zap.js` `zapyourself`; callee `potion.js` `speed_up` (D-1408). `c-js-map/turns.md` + `debt.md`. bhitm / zap_steed / WAN_SLOW / `backfire` still named.
- Prior reviews this SHA claims to close: **329** named remaining zapyourself defaults after invis; **368** exported `speed_up` for this peel; **369** queued it.

## Intent vs deliverable

Git subject promises: “Match C zap.c zapyourself WAN_SPEED_MONSTER so a self-aimed wand of speed hastes via speed_up(rn1(25,50)), instead of doing nothing.”

C `zap.c` `zapyourself` `:2845–2849`:

```
    case WAN_SPEED_MONSTER:
        /* no longer gives intrinsic, but gives very fast speed instead */
        speed_up(rn1(25, 50));
        learn_it = TRUE;
        break;
```

Then `:3010–3011` `if (learn_it) learnwand(obj);`. `rn1(25,50)` is `rn2(25)+50` → 50..74. Unlike `peffect_speed`, this arm does **not** OR `FROMOUTSIDE`. Caller `dozap` `:2657–2664` self-dir (`dx==dy==dz==0`) with `ordinary=TRUE`. Wand is IMMEDIATE. Damage stays 0 (no `losehp`).

Callee `potion.c` `speed_up` `:2918–2928` already live (D-1408 / review **368**): `!Very_fast` “suddenly moving %sfaster”; else legs energy; `exercise(A_DEX)`; `incr_itimeout(&HFast, duration)`.

Old JS: `default` break (no timeout, no learn).

The diff **does** `await speed_up(rn1(25, 50)); learn_it = true;` and import the live export. It does **not** port bhitm/zap_steed `mon_adjust_speed`. Named. It does **not** port WAN_SLOW. Named. It does **not** set FROMOUTSIDE. Match C.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| WAN_SPEED_MONSTER arm | C `:2845–2849`, **wired** | |
| `speed_up` | C `:2918–2928`, **imported live** | potion.js D-1408; not a clone |
| `rn1(25,50)` | C `hack.h:1535`, **imported live** | rng.js |
| `learn_it` / `learnwand` | C `:3010–3011`, **already live** | always true this arm |
| `dozap` self-dir | C `:2657–2664`, **already live** | |
| `Fast()` / `Very_fast()` | C `youprop.h`, **inside callee** | |
| FROMOUTSIDE | C `peffect_speed` only, **correctly absent** | |
| bhitm / zap_steed speed | C, **named omit** | `mon_adjust_speed` |
| WAN_SLOW / `backfire` | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** one `rn2(25)` per self-zap (plus none inside `speed_up`). Public fortress never self-zaps this wand.

## C ↔ JS fidelity

`speed_up(rn1(25,50))` then `learn_it = true`. Match `:2847–2848` call-for-call. Callee is the D-1408 function already audited: TIMEOUT bump on `HFast`/`uprops[FAST].intrinsic`, not a second clone. Duration 50..74 is timeout Very_fast (`HFast & ~INTRINSIC`), so a **second** self-zap takes the legs-energy line. Match. INTRINSIC-only Fast (FROMOUTSIDE/race/role, timeout bits 0) is Fast but not Very_fast → “faster” not “much faster.” Match `youprop.h:376–377`.

Always `learnwand` after the switch. Blind still skips `dknown` inside live `learnwand` (`:2142`) — C `learnwand` same idea. Not this arm inventing a Blind skip.

`dozap` only `losehp` when `zapyourself` returns nonzero. This arm does not set damage. Match. `ordinary` is unused here (C too).

No FROMOUTSIDE. A hero who only ever self-zaps speed never gets the “quickness feels very natural” potion bit. Match the C comment “no longer gives intrinsic.”

Hallucination check: “Match C `zapyourself` WAN_SPEED_MONSTER” while **`speed_up` is the imported D-1408 callee** is not a dispatch-stub lie. Do **not** stamp “Match C `bhitm` speed.” Do **not** stamp “Match C `zap_steed`.” Do **not** stamp “Match C WAN_SLOW.” Do **not** stamp “Match C POT_SPEED FROMOUTSIDE on a wand.”

## Hallucinations / overclaim

Subject says a self-aimed wand of speed hastes via `speed_up(rn1(25,50))` instead of doing nothing. **True on the keep-path** (timeout 50..74, always learn, DEX exercise). **True that it is not FROMOUTSIDE.** **False until named for monster-target speed / steed / slow.** D-log “fresh `rn2(25)` + TIMEOUT 50..74 + uprops sync + learn + no FROMOUTSIDE; INTRINSIC Fast `"faster"` not `"much"`; already Very_fast TIMEOUT grows + legs energy; EFast boots legs + keep E; Blind skip makeknown; WAN_SLOW still default; WAN_MAKE_INVISIBLE still a case” are the right falsifiers. Stamping **Addressed:** D-1410 for `:2845–2849` is fair. Do **not** treat fortress PASS as a self-zap of speed.

## Density

One `zapyourself` case plus the already-ported callee. ~15 lines of JS. Playbook §2b right size (sibling of D-1369 invis, not glued into SLOW). Did not glue `peffect_full_healing` (next SHA).

## Branch-by-branch confirm

1. Fresh hero, not Fast: “much faster”; TIMEOUT 50..74; learn; no FROMOUTSIDE. Match.
2. INTRINSIC Fast, no timeout: “faster”; timeout added. Match Very_fast false.
3. Already Very_fast: legs energy; TIMEOUT grows. Match.
4. EFast boots: Very_fast true; legs; EFast kept. Match.
5. Blind: `speed_up` still; `learnwand` no makeknown. Match live learnwand.
6. WAN_SLOW still default. Named.
7. WAN_MAKE_INVISIBLE case unchanged. Match D-1369.
8. Damage 0 → no `dozap` `losehp`. Match.
9. **Public-unhit** unless a session self-zaps speed.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Duration is `rn1(25,50)`, not a recorded 50. Plain ESM. Static `import { speed_up }` from potion.js is not Node `fs` (potion does not import zap).

## Verification

Journal: private canary **11**/11 (C/JS grep; fresh `rn2(25)` + TIMEOUT 50..74 + uprops sync + learn + no FROMOUTSIDE; INTRINSIC Fast `"faster"` not `"much"`; already Very_fast TIMEOUT grows + legs energy; EFast boots legs + keep E; Blind skip makeknown; WAN_SLOW still default; WAN_MAKE_INVISIBLE still a case; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Cadence full `sessions` runs at HEAD this audit.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The arm is two C statements and both are live.

Named omits (map / Open, not Must-fix):

1. `zap.c` `bhitm` / `zap_steed` WAN_SPEED_MONSTER (`mon_adjust_speed`)
2. `zap.c` `zapyourself` WAN_SLOW
3. `zap.c` `backfire` body
4. `potion.c` `peffect_full_healing` (already next Open after this SHA)

Do not Must-fix “wand should OR FROMOUTSIDE” (C comment forbids it). Do not Must-fix “learn only if not Blind” at this arm (C always sets `learn_it`; Blind is inside `learnwand`). Do not Must-fix “return damage so dozap hurts” (C damage stays 0).

## Callers / RNG ledger

C this arm: one `rn2(25)` via `rn1(25,50)`. JS same. `learnwand` / `exercise(A_DEX)` add no extra die. Public fortress never needs this `rn2(25)`. `dozap` `zappable` charge RNG is pre-existing, not this SHA.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: self-aimed wand of speed now `speed_up(rn1(25,50))` and always `learnwand` with no FROMOUTSIDE; bhitm/steed/SLOW stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1410 `55259f2b` already has the short hash.
