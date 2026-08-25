# Review 429 — 3b4c39e2 — spell.c SPE_TELEPORT_AWAY IMMEDIATE wand-duplicate (D-1468)

## Metadata
- Full / short hash: `3b4c39e2678df6151b3bfa96466a392568ba02c9` / `3b4c39e2`
- Parent: `1003ab88` (D-1467). This file audits **this SHA only** (second of nine `js/` commits since review **427**). Archive **Addressed:** D-1468 `3b4c39e2` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 12:25:27 +0200
- D-id: **D-1468**
- Stats: 10 files, +135 / −46 — `js/spell.js` +59 / −some; `js/zap.js` comments only (+13 / −5).
- Claims to close: Open `zap.c` `weffects` SPE_TELEPORT_AWAY IMMEDIATE wand-duplicate (named from D-1467 / D-1461 / review **421**). Not HEALING. `reviews/loop-2026-08-15/` has no unpaid teleport-away-cast Must-fix.
- JS / map: `spell.js` `spelleffects` / `wand_duplicate_weffects`; callees `zap.js` `weffects` / `bhit` / `bhitm` / `zapyourself` / `bhito`; `teleport.js` `u_teleport_mon` / `tele` / `rloco`. `c-js-map/turns.md`. HEALING directional weffects still named at this SHA.
- Prior reviews this SHA claims to close: **421** named remaining TELE after STONE; **428** next Open after boxlock was TELE (then HEALING).

## Intent vs deliverable

Git subject promises: “Match C spell.c spelleffects SPE_TELEPORT_AWAY IMMEDIATE wand-duplicate so a directional teleport-away spell calls weffects bhit instead of skipping weffects.”

C `spell.c` `:1470` is in the `:1457–1514` wand-duplicate fallthrough (after POLY, before CANCEL). `objects.h:1391–1393` `SPELL("teleport away", … IMMEDIATE … SPE_TELEPORT_AWAY)`. `oc_dir == IMMEDIATE` so `:1479` takes getdir / atme / self vs `weffects`. Skilled bless is **HEALING/EXTRA_HEALING only** (`:1480–1485`); TELEPORT does not get `pseudo->blessed`. Self: `zapyourself` `:2876–2882` `tele()` then the same learnwand criteria as `zap_steed`. Directed: `weffects` `:3440–3451` IMMEDIATE `bhit(rn1(8,6), bhitm, bhito)`. `bhitm` `:341–347` `seemimic` then `u_teleport_mon(mtmp, TRUE)` + `learn_it = canspotmon`. `bhito` `:2321–2328` snapshot ox,oy, `rloco`, `maybe_unhide_at`. Mounted down is D-1455 `tele()` together (not `bhitm`). Fake book is SPBOOK so `learnwand` `:133` skips `makeknown`. `physical_damage` is FORCE_BOLT-only. `update_inventory()` after the group (`:1513`).

Old JS: SPE_TELEPORT_AWAY shared the HEALING/EXTRA_HEALING arm: skilled bless (wrong for TELE), atme/`zapyourself`, and `// else weffects deferred`. Callees already lived for **wand** teleport. `update_inventory` after the group was skipped on the directional path.

The diff **does** split TELEPORT into `wand_duplicate_weffects(pseudo, atme, false)`. It **does not** change `weffects` / `bhitm` / `zapyourself` / `bhito` / `rloco` bodies (`zap.js` comments only). It **does not** dispatch HEALING directional `weffects`. Named. It **does not** add `bhito` `maybe_unhide_at`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `spelleffects` SPE_TELEPORT_AWAY arm | C `:1470–1514`, **wired this SHA** | |
| `wand_duplicate_weffects` | C `:1479–1514`, **pre-existing wrapper** | |
| `weffects` IMMEDIATE | C `:3440–3451`, **imported live** (D-1388) | `rn1(8,6)` then `bhit` |
| `bhitm` WAN/SPE_TELEPORT | C `:341–347`, **imported live** | |
| `u_teleport_mon` | C `teleport.c` `:2263–2292`, **imported live** | engulfing_u named omit |
| `zapyourself` WAN/SPE_TELEPORT | C `:2876–2882`, **imported live** (D-1455 ux0) | |
| `tele` / `teleds` | C `teleport.c`, **imported live** | |
| `bhito` WAN/SPE_TELEPORT | C `:2321–2328`, **imported live** | `rloco` only |
| `rloco` | C `teleport.c` `:2102+`, **imported live, partial** | Rider/flooreffects/shop named |
| `maybe_unhide_at` after `rloco` | C `:2327`, **named omit** | JS `bhito` skips it |
| `zap_steed` WAN/SPE_TELEPORT | C `:3104–3113`, **pre-existing** (D-1455) | not this caller |
| HEALING directional weffects | C `:1475–1510`, **named omit** | still atme-only at this SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. Grep `FORCE` is `SPE_FORCE_BOLT` in comments. **New gameplay RNG:** `#cast` directed now reaches `rn1(8,6)` plus `u_teleport_mon` `rn2(13)` / `rloc` / `rloco` `rn1`/`rn2`. Public fortress does not `#cast` teleport away.

## C ↔ JS fidelity

`wand_duplicate_weffects` already matches `:1479–1514` (atme zeros dirs; `getdir` fail reuses leftover dirs + “magical energy is released!”; 0,0,0 → `zapyourself`; else `weffects`; NODIR → `weffects`; `update_inventory`). TELEPORT is IMMEDIATE, not NODIR. **Callees are not stubs.** Hallucination check: “Match C weffects bhit” while **`weffects` IMMEDIATE `bhit`, `bhitm` `u_teleport_mon`, `zapyourself` `tele()`, and `bhito` `rloco` are live** is **not** a dispatch-stub lie.

`physical_damage=false` — C never sets it on TELEPORT (only FORCE_BOLT `:1458–1459`). Match. No skilled bless on this arm — C `:1480` gates bless to HEALING/EXTRA only. Old JS applied `role_skill >= P_SKILLED` `pseudo.blessed` to TELEPORT because it shared that `if`. This SHA **removes** that C-wrong.

`bhitm` `:341–347`: `disguised_mimic` `seemimic`; `reveal_invis = !u_teleport_mon(mtmp, TRUE)`; `learn_it = canspotmon`. JS matches. `u_teleport_mon`: stasis pline/false; temple priest resist; rider/`control_teleport` `rn2(13)` + `enexto` → `rloc_to` else `rloc(RLOC_MSG)`. Order and dice match `:2268–2291`. `engulfing_u && noteleport_level` unstuck/limbo is **named omit** (`void engulfing_u`). Typical aimed-at-monster path is `rloc`.

`zapyourself` `:2876–2882`: `tele()` then `(Teleport_control && !Stunned) || !couldsee(ux0,uy0) || distu >= 16`. Post-`teleds` `ux0` (D-1455). Match. Damage stays 0 so `losehp` does not fire.

`bhito` C snapshots ox,oy, `rloco`, `maybe_unhide_at`. JS `rloco(obj)` only. `maybe_unhide_at` is named. `rloco` itself is a live callee with **named** Rider-corpse / `flooreffects` / shop-bill / W-tower omits — not a glyph stand-in; typical floor object still `extract` + `rn1(COLNO-3,2)`/`rn2(ROWNO)` `goodpos` + `place_object`.

Mounted down TELEPORT still `zap_steed` `tele()` (D-1455), not this `bhitm` arm. `weffects` steed-down gate unchanged.

## Hallucinations / overclaim

Subject says directional teleport-away calls `weffects` `bhit` instead of skipping. **True:** `#cast` getdir → self `tele()` or `weffects` → `bhit` → monster `u_teleport_mon` + pile `rloco`; SPBOOK skips makeknown; HEALING still skips `weffects` at this SHA. **False until named** for HEALING directional, `bhito` `maybe_unhide_at`, `engulfing_u` unstuck, `rloco` Rider/flooreffects/shop. Stamping **Addressed:** D-1468 for the **dispatch into live wand-teleport callees** is fair. Do **not** stamp “Match C SPE_HEALING weffects.” Do **not** stamp “Match C `maybe_unhide_at` after `rloco`.” Do **not** treat fortress PASS as a teleport-away cast.

`zap.js` comments retag TELE as D-1468. Comment-only. Honest.

## Density

One IMMEDIATE otyp through an already-live wrapper. ~15 lines of real JS plus comments. Playbook §2b. Did not glue HEALING. Acceptable.

## Branch-by-branch confirm

1. `#cast` directed SPE_TELEPORT_AWAY: `weffects` `bhit(rn1(8,6))`. Match `:1470–1510`.
2. atme / leftover 0,0,0: `zapyourself` `tele()`; damage 0. Match `:1500–1508` / `:2876–2882`.
3. `getdir` cancel: leftover dirs + “magical energy is released!” then weffects or self. Match `:1488–1498`.
4. Aimed monster: `u_teleport_mon` then `canspotmon` learn. Match `:341–347`.
5. Stasis / temple priest: feedback, no `rloc`. Match `:2268–2277`.
6. Rider `rn2(13)` `enexto`: `rloc_to` near hero. Match `:2284–2286`.
7. Floor object: `rloco` (`rn1`/`rn2`/`goodpos`). Match `:2321–2326` minus `maybe_unhide_at`.
8. SPE_HEALING still atme-only, no `weffects`. Named.
9. POLY/CANCEL/STONE/KNOCK stay on `wand_duplicate_weffects`. Unchanged.
10. Riding down TELEPORT still `zap_steed` `tele()`, not `bhitm`. Match D-1455 / `:3104–3113`.
11. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `rn1(8,6)` is C `:3448`, not a recorded index. No hardcoded teleport destinations.

## Verification

Journal: private canary **16**/16 (C/JS grep; IMMEDIATE SPBOOK; atme TIME skip makeknown + noteleport force; zapyourself damage 0; bhitm kobold; east cast TIME + vanishes/reappears; HEALING still skips weffects; prior STONE/POLY/CANCEL/TURN/KNOCK/SLOW/LOCK/RAY/NODIR/DRAIN stay; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session `#cast`s teleport away. I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The dispatch reaches live `weffects`/`bhitm`/`u_teleport_mon`/`tele`/`rloco`. Removing skilled bless from TELEPORT matches `:1480`. `engulfing_u` and `maybe_unhide_at` are **named**.

Named omits (map / Open, not Must-fix):

1. SPE_HEALING/SPE_EXTRA_HEALING directional weffects — Open already after this SHA (later D-1469)
2. `bhito` `maybe_unhide_at` after `rloco`
3. `u_teleport_mon` `engulfing_u` unstuck / limbo
4. `rloco` Rider corpse / `flooreffects` / shop bill / W-tower

Do not Must-fix “dispatch is a stub.” Do not Must-fix “HEALING should have shipped in this SHA.” Do not Must-fix “`physical_damage` should be true.” Do not Must-fix “zap_steed should `bhitm` TELEPORT” (C uses `tele()`).

## Callers / RNG ledger

C callers: `spelleffects` (`docast` / `dotele` known_spell atme is a different `atme` path already live). Dice: `rn1(8,6)`; `u_teleport_mon` `rn2(13)`; `rloc`/`rloco` placement. Public fortress does not hit the new cast.

`weffects` IMMEDIATE does not set `disclose` on the horizontal `bhit` arm. Fake SPBOOK skips `makeknown`. `bhitm` may still set `learn_it` via `canspotmon`.

Verdict: **ACCEPT-WITH-DEBT**
