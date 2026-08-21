# Review 329 — 46c4e1b0 — zap.c zapyourself WAN_MAKE_INVISIBLE (D-1369)

## Metadata
- Full / short hash: `46c4e1b0aaaf0ef52fd5d0b9dca9183e62737a9e` / `46c4e1b0`
- Parent: `9df30ee3` (D-1368). This file audits **this SHA only** (third of four `js/` commits since review **326**). Archive **Addressed:** D-1369 `46c4e1b0` already has the short hash (filled by D-1370).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 14:40:03 +0200
- D-id: **D-1369**
- Stats: 10 files, +178 / −34 — `js/zap.js` +93 (`WAN_MAKE_INVISIBLE` arm + Invis/BInvis/itimeout helpers).
- Claims to close: Open `zap.c` `zapyourself` WAN_MAKE_INVISIBLE (named from D-1366 / D-1368 / review **326**). Not lightning. `reviews/loop-2026-08-15/` has no unpaid make-invisible Must-fix.
- JS / map: `zap.js` `zapyourself`; callees `trap.js` `self_invis_message` (live `potion.c` body); `incr_itimeout_HInvis` clone of `potion.c` `incr_itimeout`. `c-js-map/turns.md` + `debt.md`. bhitm / zap_updown / zap_steed / `setworn` w_blocks still named.
- Prior reviews this SHA claims to close: **325** / **326** named WAN_MAKE_INVISIBLE as a remaining `zapyourself` default. **328** (this cadence, previous SHA) named it as the next Open after AD_ELEC.

## Intent vs deliverable

Git subject promises: “Match C zap.c zapyourself so a self-aimed wand of make invisible actually times HInvis (or itches under a mummy wrapping), instead of doing nothing.”

C `zapyourself` (`zap.c:2825–2842`):

```
    case WAN_MAKE_INVISIBLE: {
        int msg = !Invis && !Blind && !BInvis;
        if (BInvis && uarmc->otyp == MUMMY_WRAPPING) {
            You_feel("rather itchy under %s.", yname(uarmc));
            break;
        }
        incr_itimeout(&HInvis, rn1(15, 31));
        if (msg) {
            learn_it = TRUE;
            newsym(u.ux, u.uy);
            self_invis_message();
        }
        break;
    }
```

C `Invis` is `((H||E)&&!B)` via `uprops[INVIS]`. `Blind` is `(HBlinded||EBlinded)&&!BBlinded`. `incr_itimeout` (`potion.c:83–86`) TIMEOUT bits only. `rn1(15,31)` is `rn2(15)+31` → 31..45. `self_invis_message` (`potion.c`) is Hallu Gee/Far-out + See_invisible through/can't-see.

Old JS: WAN_MAKE_INVISIBLE fell through `default` → `damage=0`, no timeout, no learn.

The diff **does** add the case (snapshot `msg`; wrapping `You_feel` absorb; else `rn1(15,31)` on `HInvis`+uprops; learn+`newsym`+`self_invis_message`). It does **not** port `bhitm` / `zap_updown` / `zap_steed`. Named. `self_invis_message` is a **live** import (`trap.js:3859–3867`), not a stub. `BInvis()` stands in worn `MUMMY_WRAPPING` because JS `setworn` named-omits `w_blocks`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| WAN_MAKE_INVISIBLE arm | C `:2825–2842`, **wired** | snapshot / wrapping / timeout / learn |
| `self_invis_message` | C `potion.c`, **imported live** | `trap.js`; Hallu + See_invisible |
| `incr_itimeout_HInvis` | C `potion.c:56–86`, **clone** | TIMEOUT clamp; writes H + uprops |
| `itimeout` | C `:56–64`, **clone** | clamp `[1,TIMEOUT]` / 0 |
| `Invis()` | C `youprop.h:195–198`, **clone matching D-1089** | flats + uprops; `!BInvis()` |
| `BInvis()` | C `:197`, **clone + wrapping stand-in** | blocked / `BInvis` / uarmc wrapping |
| `Blinded_for_invis()` | C `Blind` `:103`, **clone** | sticky `Blind()` then H\|\|E && !B |
| `You_feel` | C, **imported live** | `display.js` `"You feel "+msg` |
| `yname` | C, **imported live** | wrapping itchy |
| `newsym` / `learnwand` | C, **imported live** | after switch if `learn_it` |
| `setworn` `w_blocks` | C `worn.c:126–127`, **named omit** | wrapping stand-in covers the itchy arm |
| `bhitm` / `zap_updown` / `zap_steed` | C other cases, **named omit** | monster / down / steed |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `rn1(15,31)` = `rn2(15)+31` unless wrapping absorb (C wrapping `break` burns **zero** timeout dice).

## C ↔ JS fidelity

Case sits after SPE_DRAIN / before WAN_SPEED with its own `break`. Match `:2825–2843` (no FALLTHROUGH). `msg` snapshot **before** `incr_itimeout` so already-Invis grows TIMEOUT without learn. Match the C comment. Wrapping: `BInvis() && uarmc && otyp===MUMMY_WRAPPING` then itchy + break — C derefs `uarmc->otyp` without a null check; JS extra `uarmc &&` is defensive, not a second absorb. `You_feel('rather itchy under ${yname(uarmc)}.')` matches `You_feel("rather itchy under %s.", yname(uarmc))` (`display.js` prefixes `"You feel "`).

`incr_itimeout_HInvis`: `next = (cur & ~TIMEOUT) | itimeout((cur & TIMEOUT) + incr)` matches `set_itimeout` + `itimeout_incr`. Dual-write HInvis and `uprops[INVIS].intrinsic` is the honest JS stand-in for C’s single storage (`HInvis` **is** that field). `rn1` in `rng.js` is `rn2(x)+y` — 31..45. Match. `self_invis_message` is the potion.c string split, not a zap clone.

`Invis()` reads uprops (cloak-of-invisibility confer writes extrinsic only — same conferral lesson as D-1367). `BInvis()` ORs blocked + wrapping stand-in so the itchy arm fires even without `w_blocks`. That stand-in is equivalent for mummy wrapping; it is **not** a silent skip of timeout.

`Blinded_for_invis`: C Blind is `(H||E)&&!B`. confer **does** mirror `EBlinded`. Sticky `Blind()` first can over-count if `u.Blind` is set while Eyes `BBlinded` would clear C Blind — named omit of Eyes, not this arm’s keep-path.

Hallucination check: “Match C `zapyourself` WAN_MAKE_INVISIBLE” while **`self_invis_message` is live** is not a dispatch-stub lie. “A self-aimed wand actually times HInvis” via `dozap` + getdir `.` **is** live. Do **not** stamp “Match C `bhitm` WAN_MAKE_INVISIBLE.” Do **not** stamp “Match C `setworn` w_blocks.” Do **not** stamp “Match C WAN_SPEED_MONSTER.”

## Hallucinations / overclaim

Subject says a self-aimed wand of make invisible times HInvis or itches under wrapping instead of doing nothing. **True if `zapyourself` is called with WAN_MAKE_INVISIBLE** (private canary). **False for zapping a monster / down / steed** until those cases. D-log “Not this iter” names them. Stamping **Addressed:** D-1369 for `:2825–2842` is fair. Do **not** treat fortress PASS as `"Gee!  All of a sudden, you can't see yourself."`.

## Density

One `switch` arm plus TIMEOUT/Invis helpers the arm needs. ~93 lines. Playbook §2b one function envelope. Did not glue dokick hurtle (next Open). Wrapping stand-in stays inside this arm. Right size. Two consecutive zap peels (D-1368 then this) are queue-forced; not a QUALITY-RISK by themselves — **328**’s Shock clone is the quality issue in this window.

## Branch-by-branch confirm

1. Fresh seeing hero: `msg` true; `rn1(15,31)` 31..45; learn; `newsym`; `self_invis_message`. Match `:2829–2840`.
2. Already Invis: timeout grows; `msg` false; no learn. Match.
3. Blind / `HBlinded`: no learn; timeout still. Match `!Blind` in snapshot.
4. Wrapping worn: itchy; **no** `rn1`. Match `:2831–2834`.
5. `BInvis` without wrapping (uprops.blocked): timeout, no itchy (C would deref `uarmc` — JS skips itchy if `!uarmc`). Rare; w_blocks named.
6. conferral cloak-of-invisibility: `Invis()` true via uprops; no learn. Match C macro.
7. After switch `learnwand` if `learn_it`. Match other arms.
8. WAN_SPEED still default. Named.
9. SPE_FIREBALL still a case (D-1365). Not this diff.
10. **Public-unhit** unless a session self-zaps make-invisible.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `WAN_MAKE_INVISIBLE` / `MUMMY_WRAPPING` are object tokens. `rn1(15,31)` is the C macro expansion, not a recorded duration used as a seed gate. Plain ESM. `await self_invis_message` is in-process.

## Verification

Journal: private canary **25**/25 (C/JS grep; fresh `rn2(15)` + TIMEOUT 31..45 + uprops sync + learn; already Invis grows timeout no learn; Blind/HBlinded no learn; wrapping absorb; BInvis+wrapping; SPE_FIREBALL still a case; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on this arm. This audit cadence: full `sessions` at HEAD `90eca343` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.84). I did not re-run the private canary. Fortress PASS is not a make-invisible self-zap.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The arm matches `:2825–2842` call-for-call including wrapping absorb vs `rn1(15,31)`; `self_invis_message` is the real function; `Invis()` reads conferral uprops. Wrapping `w_blocks` and bhitm are named omits of **other** functions. D-1368 Shock is **328**, not this file.

Named omits (map / Open, not Must-fix):

1. `bhitm` / `zap_updown` / `zap_steed` WAN_MAKE_INVISIBLE
2. `setworn` `w_blocks` (wrapping stand-in covers this arm)
3. WAN_SPEED_MONSTER / WAN_SLOW / SPE_DRAIN leftover
4. Eyes `BBlinded` vs sticky `Blind()` in `Blinded_for_invis`

Do not Must-fix “timeout on wrapping absorb” (C `break`s). Do not Must-fix “`rn1` is 15+rn2(31)” (`rng.js` is `rn2(x)+y`; canary 31..45). Do not Must-fix “skip `newsym` when Blind” (C still `newsym`s when `msg`, and Blind forces `msg` false).

## Callers / RNG ledger

C zapyourself: `rn1(15,31)` unless wrapping. JS same when the arm runs. `bhitm` never calls it. Public fortress is not a make-invisible wand.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: self-zap make-invisible now times HInvis or itches under wrapping; monster/down/steed stays named.
- Must-fix stays empty for this SHA (Shock is **328**).
