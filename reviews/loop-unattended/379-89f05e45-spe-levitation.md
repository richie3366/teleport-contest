# Review 379 — 89f05e45 — spell.c spelleffects SPE_LEVITATION peffects (D-1419)

## Metadata
- Full / short hash: `89f05e4532bad10932ed08fbae10d2f0af535652` / `89f05e45`
- Parent: `e611ef84` (D-1418). This file audits **this SHA only** (sixth of nine `js/` commits since review **373**). Archive **Addressed:** D-1419 `89f05e45` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-24 22:35:17 +0200
- D-id: **D-1419**
- Stats: 12 files, +319 / −49 — `js/potion.js` +166; `js/timeout.js` +40; `js/spell.js` +17.
- Claims to close: Open `spell.c` `spelleffects` SPE_LEVITATION peffects (named from D-1418). Not RESTORE_ABILITY. `reviews/loop-2026-08-15/` has no unpaid levitation Must-fix.
- JS / map: `spell.js` `spelleffects`; `potion.js` `peffect_levitation`; `timeout.js` LEVITATION expiry. `c-js-map/turns.md`. Vault/temple/shop `ceiling()` labels, FLYING timed-land, potionhit/mix still named.
- Prior reviews this SHA claims to close: **378** named LEVITATION after detect-monsters.

## Intent vs deliverable

Git subject promises: “Match C spell.c spelleffects SPE_LEVITATION so casting that spell applies peffect_levitation (float_up plus timeout/I_SPECIAL, cursed ceiling), instead of printing Nothing happens.”

C `spell.c` `:1534–1546` same skilled-bless + peffects arm. Callee `potion.c` `peffects` `:1404–1407` → `peffect_levitation` `:1165–1221`: `!Levitation && !BLevitation` → `set_itimeout(&HLevitation, 1L)` + `float_up()` else `potion_nothing++`. Cursed: `HLevitation &= ~I_SPECIAL`; if `BLevitation` skip rise; else upstairs `stairway_at` + `doup()` or `has_ceiling` `rnd(!uarmh?10:!hard_helmet?6:3)` `losehp(Maybe_Half_Phys)` colliding with `ceiling()`. Blessed: `incr_itimeout` `rn1(50,250)` + `I_SPECIAL`. Uncursed: `incr_itimeout` `rn1(140,10)`. Then sink `spoteffects(FALSE)` and `float_vs_flight()`. `timeout.c` `:794–803`: LEVITATION expiry `float_down(I_SPECIAL|TIMEOUT)` after Flying TIMEOUT==1 `set_itimeout(&HFlying,0)`.

Old JS: SPE_LEVITATION still other-otyp `Nothing happens.`; LEVITATION TIMEOUT expired silently (I_SPECIAL leftover would pin levitation).

The diff **does** add the otyp to the skilled-bless arm, port `peffect_levitation` (kludge timeout 1 + live `float_up` / cursed `doup` or ceiling `rnd`/`losehp` / blessed `I_SPECIAL` / uncursed duration), and expiry `float_down`. It **does not** port vault/temple/shop/water/fire/quest `ceiling()` labels or FLYING timed-land. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `spelleffects` SPE_LEVITATION | C `:1534–1546`, **wired** | skilled bless then peffects |
| `peffect_levitation` | C `:1165–1221`, **wired** | |
| `float_up` | C `trap.c`, **imported live** | not a local clone |
| `float_down` | C `trap.c`, **imported live** | expiry |
| `doup` / `stairway_at` | C `do.c` / stairs, **imported live** | cursed upstairs |
| `float_vs_flight` | C `polyself.c`, **imported live** | |
| `hard_helmet` / `is_helmet` | C `do_wear.c:567–572` / `obj.h`, **clone** | `oc_skill` ≡ `oc_armcat`; `is_metallic`/`is_crackable` live |
| `has_ceiling` | C `dungeon.c:1689–1698`, **clone** | `In_endgame && !Is_earthlevel` |
| `ceiling_at` | C `dungeon.c:1713–1746`, **clone** | room/air/rock keep-path; vault/temple/shop named |
| `maybe_half_phys` | C `Maybe_Half_Phys`, **imported live** | sticky H/E only (named if conferral-only) |
| `set_itimeout` / `incr_itimeout` HLevitation | C, **wired** | TIMEOUT bits; uprops sync |
| `Levitation()` / `BLevitation()` | C `youprop.h`, **wired** | now ORs `uprops[LEVITATION]` |
| FLYING timed-land | C `:805–811`, **named omit** | |
| RESTORE_ABILITY siblings | C same arm, **named omit** | this SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** uncursed `rn1(140,10)` = 10..149 after the kludge 1 → TIMEOUT 11..150; blessed `rn1(50,250)` → 251..300 + `I_SPECIAL`; cursed ceiling `rnd(10|6|3)`. Public fortress never casts this.

## C ↔ JS fidelity

Spell arm matches `:1534–1546` for this otyp (unskilled uncursed duration, no `I_SPECIAL`; skilled blessed duration + Lev_at_will bit). Kludge `set_itimeout(1)` then cursed **does not** `incr_itimeout` so cursed TIMEOUT stays 1 → next-turn `float_down`. Match `:1174–1183` + `:1185–1207`.

Blessed `HLevitation |= I_SPECIAL` after `incr_itimeout`. Uncursed no `I_SPECIAL`. Match `:1208–1215`. Already-levitating / blocked: `potion_nothing++` then still extend duration. Match `:1182–1183`. Cursed upstairs `potion_nothing = 0`. Match `:1198`.

`hard_helmet` clone matches C `:567–572` (`is_metallic || is_crackable`). `is_helmet` via `oc_skill === ARM_HELM` is the port’s `oc_armcat` stand-in (`objects_data.js` comment); same as `do_wear.js` / `uhitm.js`. Ceiling dmg `rnd(!uarmh?10:!hard?6:3)` matches `:1200`. Killer `"colliding with the ceiling"` + `KILLED_BY` matches `:1204–1205`.

`has_ceiling(u.uz)` matches `:1690–1698`. `ceiling_at` keep-path: `IS_AIR` → sky; room/wall/door/SDOOR → ceiling; else rock cavern. C also vault/temple/shop / water / fire / quest / Underwater **before** those. Named omit, not a keep-path lie for ordinary dungeon rooms.

Expiry: LEVITATION is **not** in `TIMEOUT_DEDICATED` (only wounded-legs/confusion/blind/deaf/fumbling/FAST), so the generic `--` loop hits it. Flying is 49, Levitation is 48 — C “Levitation before Flying” holds for `p = 1..LAST_PROP`. Flying TIMEOUT==1 → `HFlying & ~TIMEOUT` before `float_down(I_SPECIAL|TIMEOUT, 0)`. Match `:801–803`. `float_down` is the live `trap.js` body, not a no-op. Post-sync copies `H`/`E` into `uprops[LEVITATION]`.

`doup` (`do.js:2280`) is a real upstairs climb (`stairway_at` + level change), not a stub. Hallucination check: “Match C peffect_levitation/float_up/float_down” while those callees are live is not a dispatch-stub lie. “Match C vault ceiling string” **would** be. Do **not** stamp “Match C SPE_RESTORE_ABILITY.” Do **not** stamp FLYING `You("land.")`.

## Hallucinations / overclaim

Subject says casting levitation applies `float_up` plus timeout/`I_SPECIAL` and cursed ceiling instead of `Nothing happens.` **True for unskilled (11..150, no Lev_at_will) and skilled (251..300 + `I_SPECIAL`).** **True that cursed TIMEOUT 1 + ceiling `rnd`/`losehp` or upstairs `doup`.** **True that expiry `float_down` clears TIMEOUT+`I_SPECIAL`.** **False until named for vault/temple/shop labels and FLYING timed-land.** Stamping **Addressed:** D-1419 for `:1165–1221` + `:1534–1546` + `:794–803` is fair. Do **not** treat fortress PASS as a levitation cast.

## Density

One C peffect plus the expiry the timeout needs so leftover `I_SPECIAL` cannot pin levitation. ~220 lines of JS including small `hard_helmet`/`ceiling` clones the cursed arm needs. Playbook §2b. Did not glue RESTORE_ABILITY. Right size.

## Branch-by-branch confirm

1. Unskilled, not already levitating: timeout 1 + `float_up` + `rn1(140,10)` → 11..150, no `I_SPECIAL`. Match.
2. Skilled: `rn1(50,250)` + `I_SPECIAL`. Match.
3. Already levitating: `potion_nothing++` then still incr. Match.
4. Cursed, upstairs: `~I_SPECIAL`, `doup`, `potion_nothing=0`. Match.
5. Cursed, has_ceiling, no helm: `rnd(10)` + colliding pline. Match.
6. Cursed, soft helm vs hard helm: `rnd(6)` vs `rnd(3)`. Match `hard_helmet`.
7. Cursed + `BLevitation`: skip rise. Match.
8. Sink + Levitation: `spoteffects(false)`. Match.
9. Expiry: `float_down`; Flying TIMEOUT==1 bypass. Match.
10. Vault/temple/shop ceiling strings. Named.
11. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dice are C `rn1`/`rnd`, not a recorded index. `ceiling_at` is a label clone, not a recorded coordinate. Plain ESM.

## Verification

Journal: private canary **24**/24 (C/JS grep; uncursed TIMEOUT 11..150 no `I_SPECIAL`; blessed 251..300 + `I_SPECIAL`; already-levitating extends; cursed TIMEOUT 1 + ceiling HP; `nh_timeout` expiry clears TIMEOUT+`I_SPECIAL`; RESTORE still omit; HASTE/DETECT_MONSTERS regression; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD (score rewrite at end of this review iter). Fortress PASS is not levitation.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Duration dice, cursed ceiling/`doup`, and expiry `float_down` match `:1165–1221` + `:794–803`. `hard_helmet` clone matches C `:567–572`.

Named omits (map / Open, not Must-fix):

1. vault/temple/shop / water / fire / quest / Underwater `ceiling()` labels
2. FLYING timed-land (`You("land.")` / `spoteffects(TRUE)`)
3. SPE_RESTORE_ABILITY / INVISIBILITY (already Open)
4. potionhit / mix levitation
5. `maybe_half_phys` conferral-only `uprops` (sticky H/E only)

Do not Must-fix “unskilled should set `I_SPECIAL`” (C only blessed). Do not Must-fix “cursed should `incr_itimeout`” (C keeps the kludge 1). Do not Must-fix “dispatch is a stub” (`float_up`/`float_down`/`doup` are live).

## Callers / RNG ledger

C callers: `spelleffects` SPE_LEVITATION; `dopotion` POT_LEVITATION. New RNG: duration `rn1` and cursed `rnd` only. Public fortress does not cast this.

Verdict: **ACCEPT-WITH-DEBT**
