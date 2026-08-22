# Review 371 — 71ee9186 — potion.c peffect_full_healing (D-1411)

## Metadata
- Full / short hash: `71ee9186aa6c22ff375b247c76872c72b967b5b2` / `71ee9186`
- Parent: `55259f2b` (D-1410). This file audits **this SHA only** (seventh of nine `js/` commits since review **364**). Archive **Addressed:** D-1411 `71ee9186` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-22 13:28:09 +0200
- D-id: **D-1411**
- Stats: 9 files, +131 / −31 — `js/potion.js` +47 / −5 (`peffect_full_healing` + `peffects` case + `pluslvl` import).
- Claims to close: Open `potion.c` `peffect_full_healing` (named from D-1410 / review **370**). Not haste. `reviews/loop-2026-08-15/` has no unpaid full-healing Must-fix.
- JS / map: `potion.js` `peffect_full_healing` / `peffects`. Callees `healup`, `pluslvl` (exper.js D-0061), `make_hallucinated`, `heal_legs`. `c-js-map/turns.md`. potionhit / breathe / mix / enlightenment still named.
- Prior reviews this SHA claims to close: **370** named full healing after WAN_SPEED.

## Intent vs deliverable

Git subject promises: “Match C potion.c peffect_full_healing so quaffing a potion of full healing heals via healup(400) and can restore a lost level, instead of printing not implemented.”

C `potion.c` `peffect_full_healing` `:1144–1162` via `peffects` `:1401–1402` then `return -1` (`:1424`):

```
    You_feel("completely healed.");
    healup(400, 4 + 4 * bcsign(otmp), !otmp->cursed, TRUE);
    if (otmp->blessed && u.ulevel < u.ulevelmax) {
        u.ulevelmax -= 1;
        pluslvl(FALSE);
    }
    (void) make_hallucinated(0L, TRUE, 0L);
    exercise(A_STR, TRUE);
    exercise(A_CON, TRUE);
    if (Wounded_legs && (otmp->blessed || (!otmp->cursed && !u.usteed)))
        heal_legs(0);
```

nxtra: cursed 0 / uncursed 4 / blessed 8. `healup` always cream/blind/deaf (`TRUE`); sick unless cursed. Blessed lost-level: decrement **max** then `pluslvl(FALSE)` so two lost levels return at half rate. Wounded: blessed even riding (steed); uncursed iff `!usteed`; cursed never. Extra-healing sibling is blessed+!steed only — different, not this SHA.

Old JS: `peffects` default `"That potion is not implemented yet."` return 0 (no `useup`).

The diff **does** add the function, wire `POT_FULL_HEALING` return -1, and import live `pluslvl`. It does **not** port potionhit/breathe/mix. Named. It does **not** port enlightenment. Named (next-next SHA after detect-unseen).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `peffect_full_healing` | C `:1144–1162`, **wired** | |
| `peffects` POT_FULL_HEALING | C `:1401–1402`, **wired** | return -1 |
| `healup` | C `:1428–1457`, **already live** | same file |
| `pluslvl(FALSE)` | C `exper.c:307–372`, **imported live** | D-0061; Upolyd `monhp_per_lvl` named in callee |
| `make_hallucinated` | C `potion.c`, **already live** | extra-healing already calls it |
| `heal_legs` | C `trap.c`, **already live** | |
| `bcsign` / `exercise` | C, **imported live** | |
| `You_feel` | C, **imported live** | |
| potionhit / breathe / mix | C, **named omit** | |
| `peffect_enlightenment` | C `:794–808`, **named omit** | later SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `pluslvl(FALSE)` burns `newhp`/`newpw` (and maybe `adjabil`) only on the blessed lost-level path. Uncursed keep-path: no new die (`healup(400)` is a constant). Public fortress never quaffs this potion.

## C ↔ JS fidelity

`You_feel('completely healed.')` then `healup(400, 4+4*bcsign, !cursed, true)`. Match `:1146–1147`. Live `healup` does cream → `make_blinded(0,TRUE)` → `make_deaf(0,TRUE)` then sick/`make_vomiting` iff `!cursed`. Match `:1444–1455`. nxtra cursed 0 / uncursed 4 / blessed 8. Match.

Blessed `ulevel < ulevelmax`: `ulevelmax--` then `pluslvl(false)`. Match `:1148–1153`. `pluslvl(FALSE)` prints “more experienced.”, `newhp`/`newpw`, sets `uexp = newuexp(oldlevel)`, `ulevel++`, “Welcome back to experience level N” when `ulevelmax >= ulevel` after the bump. Two lost levels (10 max, 8 current): first potion → max 9, level 9, “Welcome back”; second lost level is **gone**. Uncursed never touches `ulevelmax`. Match the half-rate comment.

Then `make_hallucinated(0, true, 0)` (mask 0 → clear TIMEOUT hallu, “Everything looks/feels SO boring now.”). Match `:1155`. Exercise **STR then CON** (extra-healing is CON then STR — JS extra already matched that other C order). Match `:1156–1157`.

Wounded: `(blessed || (!cursed && !usteed))`. Riding+blessed heals (steed). Uncursed+riding skips. Cursed never. Match `:1158–1161`. `heal_legs` is live. Sticky `u.Wounded_legs` OR is the same extra-healing pattern; C `Wounded_legs` is H\|\|E.

`peffects` returns -1 → `dopotion` useup/makeknown. Match. Default unimplemented no longer fires for this otyp.

Hallucination check: “Match C `peffect_full_healing`” while **`healup` / `pluslvl` / `make_hallucinated` / `heal_legs` are live imports** is not a dispatch-stub lie. `pluslvl` still names Upolyd `monhp_per_lvl` — that is callee debt from D-0061, not a fake pluslvl. Do **not** stamp “Match C potionhit full-heal.” Do **not** stamp “Match C `peffect_enlightenment`.” Do **not** stamp “Match C extra-healing steed legs” (different predicate).

## Hallucinations / overclaim

Subject says quaffing full healing heals via `healup(400)` and can restore a lost level instead of “not implemented.” **True on the keep-path** (nxtra, always-blind-cure, blessed half-rate pluslvl, hallu clear, STR then CON, legs). **False until named for potionhit/breathe/mix.** D-log “uncursed nxtra 4 + -1; blessed nxtra 8 no pluslvl when equal levels; cursed nxtra 0 still fills; blessed two-lost → 9/9 Welcome back; uncursed keeps drain; hallu boring; sick cure iff !cursed; cursed still deaf; uncursed legs !steed; riding only blessed” are the right falsifiers. Stamping **Addressed:** D-1411 for `:1144–1162` is fair. Do **not** treat fortress PASS as a full-healing quaff.

## Density

One C function plus the `peffects` case. ~40 lines of JS. Playbook §2b right size (sibling of extra-healing, not glued into enlightenment). Did not glue SPE_DETECT_UNSEEN (next SHA).

## Branch-by-branch confirm

1. Uncursed, full HP: nxtra 4 if overflow; -1 useup; no pluslvl. Match.
2. Blessed, `ulevel==ulevelmax`: nxtra 8; no pluslvl. Match.
3. Blessed, two lost levels: `ulevelmax--` then Welcome back; second loss discarded. Match.
4. Uncursed lost levels: drain kept. Match.
5. Cursed: nxtra 0; still 400 HP; still blind/deaf; no sick cure; no legs. Match.
6. Hallu: boring pline. Match.
7. Uncursed wounded !steed: heal_legs. Match.
8. Riding: only blessed heals legs. Match.
9. Extra-healing case unchanged (CON then STR; blessed+!steed legs). Match sibling.
10. **Public-unhit** unless a session quaffs full healing.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. 400 is C’s constant, not a recorded HP from a trace. Plain ESM.

## Verification

Journal: private canary **19**/19 (C/JS grep; uncursed nxtra 4 + -1; blessed nxtra 8 no pluslvl when equal levels; cursed nxtra 0 still fills; blessed two-lost → 9/9 Welcome back; uncursed keeps drain; hallu boring; sick cure iff !cursed; cursed still deaf; uncursed legs !steed; riding only blessed; extra healing sibling; enlightenment omit; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Cadence full `sessions` runs at HEAD this audit.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The function matches `:1144–1162` order and predicates. `pluslvl` Upolyd `monhp_per_lvl` stays named on the callee (D-0061), not a leftover-HP cheat of this potion.

Named omits (map / Open, not Must-fix):

1. `potion.c` potionhit / potionbreathe / mix / dodip full-heal arms
2. `exper.c` `pluslvl` Upolyd `monhp_per_lvl` (callee)
3. `zap.c` `zapnodir` SPE_DETECT_UNSEEN (already next Open after this SHA)
4. `potion.c` `peffect_enlightenment`

Do not Must-fix “exercise CON then STR” (C full-heal is STR then CON). Do not Must-fix “uncursed riding should heal hero legs” (C skips). Do not Must-fix “return 0 so the potion stays” (C `:1424` is -1). Do not Must-fix “pluslvl(TRUE)” (C FALSE = potion/wraith).

## Callers / RNG ledger

C uncursed/cursed keep-path: no `rn2` in this function (`healup(400)` constant). Blessed lost-level: `pluslvl` → `newhp`/`newpw` (and maybe `adjabil` dice). JS same. Public fortress never needs those dice. `dopotion` makeknown has no extra die.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: quaff full healing now `healup(400,4+4*bcsign)` with blessed half-rate `pluslvl(FALSE)`, hallu clear, STR then CON, and C’s riding/legs split; potionhit and enlightenment stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1411 `71ee9186` already has the short hash.
