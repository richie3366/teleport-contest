# Review 348 — c6af8407 — spell.c SPE_FORCE_BOLT IMMEDIATE weffects/bhit (D-1388)

## Metadata
- Full / short hash: `c6af84070b0738b49c326944c9f1bb2c7e252994` / `c6af8407`
- Parent: `efa9bce5` (docs-only checklist restore). This file audits **this SHA only** (second of nine `js/` commits since review **346**). Archive **Addressed:** D-1388 `c6af8407` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 20:09:45 +0200
- D-id: **D-1388**
- Stats: 11 files, +155 / −74 — `js/spell.js` +48 / −34 (`wand_duplicate_weffects` + FORCE_BOLT arm); `js/zap.js` +12 / −7 (`bhitm` `spell_damage_bonus`).
- Claims to close: Open `spell.c` `spelleffects` SPE_FORCE_BOLT (named). Not fireball. Review **346** named FORCE_BOLT IMMEDIATE `bhit` after unskilled FALLTHROUGH. Review **347** left it Open. `reviews/loop-2026-08-15/` has no unpaid FORCE_BOLT Must-fix.
- JS / map: `spell.js` `spelleffects` / `wand_duplicate_weffects`; `zap.js` `weffects` / `bhit` / `bhitm`. `c-js-map/turns.md`. CREATE_FAMILIAR / zhitm bonus / Knight `dbldam` / shieldeff still named.
- Prior reviews this SHA claims to close: **338** / **346** named IMMEDIATE `bhit` (otyp not in MAGIC_MISSILE..FINGER_OF_DEATH).

## Intent vs deliverable

Git subject promises: “Match C spell.c spelleffects SPE_FORCE_BOLT so a force bolt getdir-zaps via IMMEDIATE weffects/bhit, instead of printing Nothing happens.”

C `spell.c` `:1458–1514`: `case SPE_FORCE_BOLT: physical_damage = TRUE;` FALLTHROUGH the wand-duplicate group (`SLEEP` .. `STONE_TO_FLESH`). Directional: `getdir((char *) 0)`; cancel reuses leftover dirs; `(0,0,0)` → `zapyourself` then `Maybe_Half_Phys` if `physical_damage`; else `weffects(pseudo)`; then `update_inventory()`. Unskilled FIREBALL FALLTHROUGH sets the same `physical_damage` flag into this group (D-1386/D-1387).

C `objects.h:1319–1321`: SPELL force bolt `oc_dir = IMMEDIATE` (not RAY). C `zap.c` `weffects` `:3437–3451`: steed named; `oc_dir == IMMEDIATE` → `zapsetup`; swallow `bhitm`; `u.dz` `zap_updown`; else `bhit(u.dx, u.dy, rn1(8,6), ZAPPED_WAND, bhitm, bhito, &obj)` then `zapwrapup`. RAY SPE range is only `SPE_MAGIC_MISSILE`..`SPE_FINGER_OF_DEATH` (`:3461–3462`). FORCE_BOLT otyp is **after** that window.

C `bhitm` `:189–217`: WAN_STRIKING FALLTHROUGH SPE_FORCE_BOLT; `resists_magm` → `shieldeff` + `Boing!`; else `rnd(20) < 10+find_mac` hit `d(2,12)` then **Knight `dbldam` then** `if (otyp == SPE_FORCE_BOLT) dmg = spell_damage_bonus(dmg)`; `hit` + `resist`. Self `zapyourself` `:2712–2728`: Antimagic `Boing!` (no bonus); else ordinary `d(2,12)` bash. `bhito` `:2275–2312` already grouped striking/force bolt (boulder/statue/hero_breaks).

Old JS: other-otyp arm printed `Nothing happens.`; `weffects` IMMEDIATE `bhit` and `bhitm` WAN_STRIKING/SPE_FORCE_BOLT already lived for **wands**; `spell_damage_bonus` lived for scatter (D-1378) but `bhitm` skipped it.

The diff **does** extract `wand_duplicate_weffects` (getdir + self/`weffects` + `update_inventory`), add `else if (otyp === SPE_FORCE_BOLT)`, and apply `spell_damage_bonus` in `bhitm` only for SPE_FORCE_BOLT. It does **not** port Knight `dbldam`, `shieldeff`, `zap_updown`/`zap_steed`, or zhitm bonus. Named. Unskilled FIREBALL still goes through the helper with `otyp === SPE_FIREBALL` (RAY), not this IMMEDIATE arm.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| SPE_FORCE_BOLT arm | C `:1458–1514`, **wired** | `physical_damage` then helper |
| `wand_duplicate_weffects` | C `:1479–1514`, **wired extract** | also unskilled FIREBALL |
| `update_inventory` | C `:1513`, **imported live** | was named omit on D-1386 |
| `weffects` IMMEDIATE | C `:3440–3451`, **already live** | `oc_dir` from objects |
| `bhit` `rn1(8,6)` | C `:3448–3449`, **already live** | rng.js `rn2(x)+y` |
| `bhitm` FORCE_BOLT | C `:193–217`, **already live + bonus** | this SHA adds `:208–209` |
| `spell_damage_bonus` | C `:3479–3502`, **imported live** | Int then level |
| `zapyourself` FORCE_BOLT | C `:2712–2728`, **already live** | bash `d(2,12)`; no bonus |
| `bhito` FORCE_BOLT | C `:2275–2312`, **already live** | boulder/statue |
| `maybe_half_phys` | C `Maybe_Half_Phys`, **imported live** | self only when damage≠0 |
| `getdir` | C, **imported live** | D-1387 leftover cancel |
| Knight `dbldam` | C `:165` / `:206–207`, **named omit** | before bonus |
| `shieldeff` magm | C `:199`, **named omit** | WAN_STRIKING same |
| zap_steed / zap_updown | C `:3437–3446`, **named omit** | |
| doorlock | C bhit ZAPPED_WAND, **named omit** | |
| zhitm bonus | C `:4258+`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `weffects` IMMEDIATE `rn1(8,6)` then `bhit` / `bhitm` `rnd(20)` + `d(2,12)` then Int bonus (no extra die). Self: `d(2,12)` not RAY `d(12,6)` / fireball `d(6,6)`. Unskilled FIREBALL through the helper still RAY (otyp 368), not this IMMEDIATE range.

## C ↔ JS fidelity

Energy/WIS/`mksobj` still run before the otyp switch. FORCE_BOLT now calls the same helper as unskilled FIREBALL FALLTHROUGH with `physical_damage=true`. C FALLTHROUGH is one group; JS duplicates the call. Same flags, same getdir cancel (live `lock.js` `getdir`). Match `:1458–1510` on the keep-path.

`pseudo.otyp === SPE_FORCE_BOLT` → generated `oc_dir === IMMEDIATE`. JS `weffects` `:4271–4284` already: `zapsetup`; swallow `bhitm`; `dz` skip (named); else `bhit(..., rn1(8,6), ZAPPED_WAND, bhitm, bhito)`. Does **not** take the SPE RAY `ubuzz` arm (`:4290` is `MAGIC_MISSILE..FINGER_OF_DEATH` and is only reached when `oc_dir` is neither NODIR nor IMMEDIATE). FORCE_BOLT cannot accidentally become type-11 fireball.

`bhitm` hit: `d(2,12)` then `spell_damage_bonus` iff SPE_FORCE_BOLT. WAN_STRIKING still unbonused. Match `:208–209`. Order vs C: C multiplies Knight `dbldam` **first**. JS skips that multiply then bonuses. Named; do not call the bonus line a stub.

`spell_damage_bonus`: Int≤9 shave (floor 1 if dmg>1, leave 0); ≤13 or XL<5 none; ≤18 +1; ≤24 or XL<14 +2; else +3. Same helper D-1378 already matched `:3484–3499`.

Self `.` / atme / leftover-zero cancel: `zapyourself` bash `d(2,12)` if not `Antimagic()` (uprops D-1367), then `maybe_half_phys`, `losehp`. C does **not** bonus self. JS does not. Match `:2719–2727` + `:1501–1507`. Leftover-dir ESC: energy line + IMMEDIATE `bhit`, not bash. Match D-1387 + this `oc_dir`.

`update_inventory()` after the group: C `:1513`. This SHA wires it for FORCE_BOLT **and** unskilled FIREBALL (shared helper). C always does; JS healing arm still skips. Named on the heal path only.

Hallucination check: “Match C IMMEDIATE weffects/bhit” while **`weffects` IMMEDIATE, `bhit`, `bhitm` FORCE_BOLT, and `spell_damage_bonus` are live** is not a dispatch-stub lie. Do **not** stamp “Match C Knight `dbldam`.” Do **not** stamp “Match C `shieldeff`.” Do **not** stamp “Match C zhitm bonus.” Do **not** stamp “Match C SPE_CREATE_FAMILIAR.”

## Hallucinations / overclaim

Subject says a force bolt getdir-zaps via IMMEDIATE weffects/bhit instead of `Nothing happens.` **True for hjkl / leftover-dir ESC / `.` when `oc_dir` is IMMEDIATE.** **False until named for riding down-zap** (`zap_steed`) and **up/down** (`zap_updown`). D-log “`.`/atme `d(2,12)` bash not `d(12,6)`/`rn2(7)`” and “east `rn2(8)` + `bhitm` `d(2,12)`+bonus” are the right falsifiers. Stamping **Addressed:** D-1388 for `:1458–1514` + `:208–209` is fair. Do **not** treat fortress PASS as a force-bolt cast (public-unhit). Do **not** treat FIREBALL leftover RAY as this envelope.

## Density

One C `case` plus the `bhitm` bonus that case needs, plus extracting the getdir envelope FIREBALL already shared. ~60 lines of JS. Playbook §2b caller/callee cluster. Did not glue CREATE_FAMILIAR / PROTECTION (later Open). Did not re-open D-1387. Wiring `:1513` `update_inventory` on the shared helper is in-envelope, not a second subsystem.

## Branch-by-branch confirm

1. SPE_FORCE_BOLT hjkl: IMMEDIATE `bhit` `rn1(8,6)`, not ubuzz type 11. Match.
2. Hit: `rnd(20)` vs AC then `d(2,12)` + Int bonus; WAN_STRIKING no bonus. Match `:202–210`.
3. Miss: `miss_msg`; no bonus. Match.
4. `resists_magm`: `Boing!`; skip dice. C also `shieldeff`. Named omit.
5. `.` / atme: bash `d(2,12)` + `Maybe_Half_Phys`; no `rn1`. Match.
6. Antimagic self: `Boing!`; damage 0 so no half/losehp. Match (shieldeff named).
7. Leftover ESC: energy line + IMMEDIATE weffects, not bash. Match D-1387.
8. Leftover `.` SELF-zero: bash. Match GETDIR_SELF.
9. Unskilled FIREBALL through helper: still RAY `ubuzz` (otyp not IMMEDIATE). Match D-1386.
10. Skilled scatter: unchanged D-1378. Match.
11. Knight questart: C `dmg*=2` then bonus; JS bonus only. Named.
12. HEALING: still no FORCE_BOLT path; directional weffects named.
13. CREATE_FAMILIAR: still `Nothing happens.` Named (later D-1389).
14. **Public-unhit** until a session casts force bolt.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `IMMEDIATE` / `rn1(8,6)` / `d(2,12)` are C. Plain ESM. Bonus is gated on `otyp === SPE_FORCE_BOLT`, not a seed.

## Verification

Journal: private canary **16**/16 (C/JS grep; IMMEDIATE not RAY; `.`/atme `d(2,12)` bash not `d(12,6)`/`rn2(7)`; east `rn2(8)` + `bhitm` `d(2,12)`+bonus; leftover ESC weffects not bash; leftover `.` SELF-zero bash; FIREBALL leftover still RAY; skilled scatter; HEALING; CREATE_FAMILIAR still omit; Rule #2). green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Cadence full `sessions` is at later HEAD; fortress PASS is not a force bolt.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch is live IMMEDIATE `weffects`/`bhit`; `bhitm` applies the C `:208–209` bonus. Remaining gaps are named omits.

Named omits (map / already-Open, not Must-fix):

1. Knight `dbldam` (`Role_if(PM_KNIGHT) && u.uhave.questart`) before bonus
2. `shieldeff` / `monstseesu` on magm resist and Antimagic self
3. `zap_steed` / `zap_updown`; doorlock on ZAPPED_WAND
4. zhitm / buzz `spell_damage_bonus` (other otyps)
5. SPE_CREATE_FAMILIAR / other `spelleffects` otyps (later Open)
6. heal/tele directional `weffects`

Do not Must-fix “ubuzz FORCE_BOLT” (C IMMEDIATE). Do not Must-fix “`spell_damage_bonus` on self bash” (C `:2712–2728` does not). Do not Must-fix “bonus on WAN_STRIKING” (C gates `otyp == SPE_FORCE_BOLT`). Do not Must-fix “skip `update_inventory`” (C `:1513`; this SHA wired it on the shared helper).

## Callers / RNG ledger

C directional: `rn1(8,6)` then bhit/`rnd(20)`/`d(2,12)`/bonus. JS same. C self: `d(2,12)` only. JS same. Public fortress never takes this envelope.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: force bolt now getdir-zaps through live IMMEDIATE `weffects`/`bhit` with `bhitm` Int bonus; Knight double and `shieldeff` stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1388 `c6af8407` already stamped.
