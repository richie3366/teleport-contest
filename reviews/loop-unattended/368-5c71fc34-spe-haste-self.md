# Review 368 — 5c71fc34 — spell.c SPE_HASTE_SELF peffects (D-1408)

## Metadata
- Full / short hash: `5c71fc34e9715d4ed5050a6acfc5688de303e0fa` / `5c71fc34`
- Parent: `6ec1c72d` (D-1407). This file audits **this SHA only** (fourth of nine `js/` commits since review **364**). Archive **Addressed:** D-1408 `5c71fc34` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-22 03:10:55 +0200
- D-id: **D-1408**
- Stats: 10 files, +199 / −36 — `js/spell.js` +18 / −1 (SPE_HASTE_SELF arm); `js/potion.js` +88 / −9 (`speed_up` / `peffect_speed` / export `peffects`).
- Claims to close: Open `spell.c` `spelleffects` SPE_HASTE_SELF peffects (named from D-1407 / review **367**). Not mapping. `reviews/loop-2026-08-15/` has no unpaid haste Must-fix.
- JS / map: `spell.js` `spelleffects`; `potion.js` `peffects` / `peffect_speed` / `speed_up`. Callees `Fast`/`Very_fast` (attrib.js), `heal_legs` (trap.js), `bcsign`, `exercise`. `c-js-map/turns.md`. Sibling peffects / `spell_backfire` / zapyourself WAN_SPEED still named.
- Prior reviews this SHA claims to close: **367** named HASTE after MAGIC_MAPPING.

## Intent vs deliverable

Git subject promises: “Match C spell.c spelleffects SPE_HASTE_SELF so casting that spell hastes via peffects/speed_up, instead of printing Nothing happens.”

C `spell.c` `:1534–1546`: potion-like group `SPE_HASTE_SELF`..`SPE_RESTORE_ABILITY` skilled `pseudo->blessed = 1` then FALLTHROUGH `SPE_INVISIBILITY` `(void) peffects(pseudo)`. This SHA wires **only** HASTE. Pseudo already unblessed/uncursed; skilled overwrites blessed. Spell still TIME after energy.

Callee `potion.c` `peffects` `:1385–1388` `POT_SPEED`/`SPE_HASTE_SELF` → `peffect_speed` then `return -1` (`:1424`). `peffect_speed` `:1052–1070`:

```
    is_speed = (otmp->otyp == POT_SPEED);
    if (is_speed && Wounded_legs && !otmp->cursed && !u.usteed) {
        heal_legs(0); gp.potion_unkn++; return; /* no speed_up */
    }
    speed_up(rn1(10, 100 + 60 * bcsign(otmp)));
    if (is_speed && !otmp->cursed && !(HFast & INTRINSIC)) {
        Your("quickness feels very natural.");
        HFast |= FROMOUTSIDE;
    }
```

`speed_up` `:2918–2928`: `!Very_fast` → “suddenly moving %sfaster” (`Fast ? "" : "much "`); else `makeplural(body_part(LEG))` “get new energy.”; `exercise(A_DEX, TRUE)`; `incr_itimeout(&HFast, duration)`. `Very_fast` is `(HFast & ~INTRINSIC) || EFast` (`youprop.h:377`). `rn1(x,y)` is `rn2(x)+y` (`hack.h:1535`). Uncursed: 100..109. Blessed: 160..169. Cursed potion: 40..49.

Old JS: other-otyp `Nothing happens.`; `peffects` lacked POT_SPEED / SPE_HASTE_SELF.

The diff **does** skilled-bless then `peffects(pseudo)`, export `peffects`, add `peffect_speed` + `speed_up` + HFast TIMEOUT sync, and wire both otyps in the same C case. It does **not** port DETECT_TREASURE / DETECT_MONSTERS / LEVITATION / RESTORE_ABILITY / INVISIBILITY. Named. It does **not** call `speed_up` from zap WAN_SPEED. Named. `speed_up` is exported for that later peel.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| SPE_HASTE_SELF arm | C `:1534–1546`, **wired** | skilled bless then peffects |
| `peffects` | C `:1333–1424`, **exported live** | POT_SPEED / SPE_HASTE_SELF return -1 |
| `peffect_speed` | C `:1052–1070`, **wired** | |
| `speed_up` | C `:2918–2928`, **wired export** | |
| `incr_itimeout` HFast | C `:83–86` / `set_itimeout`, **local** | TIMEOUT bits; keeps INTRINSIC flags |
| `Fast()` / `Very_fast()` | C `youprop.h:376–377`, **imported live** | attrib.js H\|\|E + uprops |
| `heal_legs` | C `trap.c`, **imported live** | trap.js; potion wounded skip |
| `bcsign` | C `obj.h`, **imported live** | rumors.js |
| `exercise(A_DEX)` | C, **imported live** | |
| `rn1` / `makeplural` / `body_part(LEG)` | C, **imported live** | |
| `potion_unkn` | C `gp.potion_unkn`, **same-file live** | dopotion trycall |
| sibling peffects | C `:1535–1545`, **named omit** | still “Nothing happens.” |
| WAN_SPEED `zapyourself` | C `zap.c:2845–2849`, **named omit** | next-next SHA after backfire |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `rn1(10, 100+60*bcsign)` = one `rn2(10)` per haste. Wounded POT_SPEED skip burns **zero**. Public fortress never casts haste / quaffs speed.

## C ↔ JS fidelity

Dispatch: `role_skill >= P_SKILLED` sets `pseudo.blessed` then `peffects`. Unskilled leaves unblessed. Match HASTE’s share of `:1539–1545`. Siblings still omit. Named.

`peffect_speed`: `is_speed ≡ POT_SPEED`. Spell otyp is SPE_HASTE_SELF so wounded never steals the speed (C comment: skip when mounted — heal_legs would heal the **steed**; spell is not is_speed anyway). POT_SPEED wounded !cursed !usteed: `heal_legs(0)` + `potion_unkn++` + return. Match `:1057–1061`. `heal_legs` is live trap.c (clears H/E, feel-better, encumber). Not a no-op.

Else `speed_up(rn1(10, 100+60*bcsign))`. Uncursed 100..109; skilled-blessed spell 160..169. Match. Then FROMOUTSIDE only for **potion** `!cursed && !(HFast & INTRINSIC)`. Spell never ORs FROMOUTSIDE. Match `:1066–1069`. `INTRINSIC` is `FROMOUTSIDE|FROMRACE|FROMEXPER` (`prop.h:140`) — same const import.

`speed_up`: `!Very_fast()` → “You are suddenly moving much faster.” vs “faster” if `Fast()`. Else “Your legs get new energy.” (human `body_part(LEG)` + `makeplural`). Then DEX exercise then HFast TIMEOUT bump. Match `:2921–2927`. Recast while timeout Fast is already Very_fast (`HFast & ~INTRINSIC`) so second cast takes the legs line. Match.

HFast sync: `set_HFast` writes both `u.HFast` and `uprops[FAST].intrinsic` so `Fast()`/`Very_fast()` and timeout expiry see the same word C’s `HFast` macro aliases. `incr_itimeout_HFast` keeps non-TIMEOUT bits (`cur & ~TIMEOUT`) then ORs clamped timeout — C `set_itimeout`. Match `:75–78`.

`peffects` returns -1 so `dopotion` useup/makeknown runs. C `:1424` same. Spell caller ignores the return (`(void) peffects`). Match.

Hallucination check: “Match C SPE_HASTE_SELF peffects” while **`peffects` is the exported switch and `speed_up` is the live C function** is not a dispatch-stub lie. Do **not** stamp “Match C SPE_DETECT_TREASURE peffects.” Do **not** stamp “Match C WAN_SPEED `zapyourself`.” Do **not** stamp “Match C `spell_backfire`.” Do **not** stamp “spell grants FROMOUTSIDE” (C forbids it).

## Hallucinations / overclaim

Subject says casting haste hastes via peffects/`speed_up` instead of “Nothing happens.” **True on the keep-path** (unskilled much-faster 100..109; skilled bless 160..169; recast legs). **True that POT_SPEED shares the C case** (wounded heal skip + FROMOUTSIDE). **False until named for the other four potion-like spells and WAN_SPEED.** D-log “unskilled much-faster TIMEOUT 100..109; skilled bless 160..169; recast legs energy; POT_SPEED FROMOUTSIDE; wounded heal skip; spell ignores wounds; INVISIBILITY still omit” are the right falsifiers. Stamping **Addressed:** D-1408 for `:1534–1546` + `:1052–1070` + `:2918–2928` is fair. Do **not** treat fortress PASS as a haste cast.

## Density

One C case plus the potion callee C already shares (POT_SPEED in the same `peffects` arm). ~100 lines of JS. Playbook §2b caller/callee. Did not glue `spell_backfire` (next SHA). Did not glue remaining peffects. Right size.

## Branch-by-branch confirm

1. Unskilled haste, not Very_fast: “much faster”; TIMEOUT 100..109; no FROMOUTSIDE. Match.
2. Skilled haste: blessed duration 160..169. Match `:1539–1540`.
3. Recast while timeout Fast: legs “get new energy.” Match Very_fast.
4. POT_SPEED wounded !cursed !steed: heal_legs; no `rn1`. Match.
5. POT_SPEED riding: no heal skip; speed_up. Match `!usteed`.
6. POT_SPEED non-cursed no INTRINSIC: FROMOUTSIDE + natural pline. Match.
7. Cursed POT_SPEED: speed_up 40..49; no intrinsic; no heal. Match.
8. SPE_INVISIBILITY still “Nothing happens.” Named.
9. **Public-unhit** until a session casts haste or quaffs speed.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Duration is `rn1(10, 100+60*bcsign)`, not a recorded 100. Plain ESM. `heal_legs` was already imported (extra-healing).

## Verification

Journal: private canary **16**/16 (C/JS grep; unskilled much-faster TIMEOUT 100..109; skilled bless 160..169; recast legs energy; POT_SPEED FROMOUTSIDE; wounded heal skip; spell ignores wounds; INVISIBILITY still omit; CURE_BLINDNESS / POT_HEALING / MAGIC_MAPPING regression; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Cadence full `sessions` runs at HEAD this audit.

## Actionable C-wrongs

None for Must-fix on **this** SHA. HASTE matches `:1534–1546`; `peffect_speed`/`speed_up` match call-for-call including the wounded skip and FROMOUTSIDE potion-only bit.

Named omits (map / Open, not Must-fix):

1. `spell.c` remaining peffects (DETECT_TREASURE / DETECT_MONSTERS / LEVITATION / RESTORE_ABILITY / INVISIBILITY)
2. `spell.c` `spell_backfire` (already next Open after this SHA)
3. `zap.c` `zapyourself` WAN_SPEED_MONSTER (`speed_up` is exported)

Do not Must-fix “spell should OR FROMOUTSIDE” (C `is_speed` only). Do not Must-fix “wounded haste should heal_legs” (C skips; `is_speed` false). Do not Must-fix “return 0 from peffects” (C `:1424` is -1). Do not Must-fix “Very_fast ignores EFast” (C ORs EFast; attrib.js does too).

## Callers / RNG ledger

C haste: one `rn2(10)` via `rn1(10, base)`. JS same. Wounded POT_SPEED: zero. `dopotion` makeknown has no extra die. Public fortress never needs this `rn2(10)`. `exercise(A_WIS)` still runs in `spelleffects` before the switch (C same) — pre-existing.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: SPE_HASTE_SELF now skilled-blesses and `peffects`→`speed_up(rn1(10,100+60*bcsign))` with live Fast/Very_fast TIMEOUT; sibling peffects and WAN_SPEED stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1408 `5c71fc34` already has the short hash.
