# Review 408 — 20f59004 — spell.c SPE_MAGIC_MISSILE RAY wand-duplicate (D-1448)

## Metadata
- Full / short hash: `20f590047a491739e770d359622295f95c43ab98` / `20f59004`
- Parent: `4dde6eeb` (D-1447). This file audits **this SHA only** (eighth of nine `js/` commits since review **400**). Archive **Addressed:** D-1448 `20f59004` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 05:29:10 +0200
- D-id: **D-1448**
- Stats: 10 files, +116 / −36 — `js/spell.js` +19 / −7; `js/zap.js` comments only (+9 / −5).
- Claims to close: Open `spell.c` SPE_MAGIC_MISSILE wand-duplicate RAY (named from D-1440 / review **400** / **401**). Not FINGER. `reviews/loop-2026-08-15/` has no unpaid missile-cast Must-fix.
- JS / map: `spell.js` `spelleffects` / `wand_duplicate_weffects`; callees `zap.js` `weffects` / `ubuzz` / `zapyourself`. `c-js-map/turns.md`. FINGER / IMMEDIATE still named at this SHA.
- Prior reviews this SHA claims to close: **400** named MAGIC_MISSILE/FINGER; **401** named MAGIC_MISSILE as remaining RAY.

## Intent vs deliverable

Git subject promises: “Match C spell.c SPE_MAGIC_MISSILE RAY wand-duplicate so casting magic missile calls weffects ubuzz instead of printing Nothing happens.”

C `spell.c` `:1463` is in the `:1457–1514` fallthrough. `objects.h:1297–1298` `SPELL("magic missile", … RAY …)` starts the buzz order block. `oc_dir == RAY` so getdir / atme / self vs `weffects`. Self: `zapyourself` `:2790–2802` (already D-1364; Antimagic uprops D-1367). Directed: `weffects` `:3461–3462`:

```
        else if (otyp >= SPE_MAGIC_MISSILE && otyp <= SPE_FINGER_OF_DEATH)
            ubuzz(BZ_U_SPELL(BZ_OFS_SPE(otyp)), u.ulevel / 2 + 1);
```

`BZ_OFS_SPE` is `abs(otyp - SPE_MAGIC_MISSILE) % 10` (`hack.h:1478`). Missile is offset 0 (`ZT_MAGIC_MISSILE`). `BZ_U_SPELL(0)` = 10. `nd = u.ulevel/2+1`. Fake book is SPBOOK so `learnwand` skips `makeknown`.

Old JS: SPE_MAGIC_MISSILE fell through “Nothing happens.” `weffects` RAY range + `ubuzz` already live (D-1386). `zapyourself` WAN/SPE_MAGIC_MISSILE already live. `const SPE_MAGIC_MISSILE` already existed (fireball kit).

The diff **does** add `else if (otyp === SPE_MAGIC_MISSILE)` → `wand_duplicate_weffects(pseudo, atme, false)`. It **does not** change `weffects` / `ubuzz` / `zhitm` bodies (comment-only on `zap.js`). It **does not** dispatch SPE_FINGER / remaining IMMEDIATE. Named. It **does not** add `spell_damage_bonus` / `defended(AD_MAGM)` on `zhitm` (already named on that helper).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `spelleffects` SPE_MAGIC_MISSILE arm | C `:1463–1514`, **wired this SHA** | |
| `wand_duplicate_weffects` | C `:1479–1514`, **pre-existing wrapper** | |
| `weffects` RAY range | C `:3461–3462`, **pre-existing live** (D-1386) | |
| `ubuzz` / `dobuzz` | C, **imported live** | type 10, `nd=ulevel/2+1` |
| `zapyourself` WAN/SPE_MAGIC_MISSILE | C `:2790–2802`, **imported live** | Antimagic bounce; shieldeff named |
| `zhitm` `ZT_MAGIC_MISSILE` | C `:4251–4259`, **live subset** | `d(nd,6)`; `spell_damage_bonus` / `defended` named |
| SPE_FINGER / IMMEDIATE cast | C same fallthrough, **named omit** | still “Nothing happens.” at this SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** directed ray uses existing buzz/`zhitm` `d(nd,6)`. Self-dir: `d(4,6)` already in `zapyourself` unless Antimagic. Public fortress does not `#cast` magic missile.

## C ↔ JS fidelity

`wand_duplicate_weffects` already matches `:1479–1514` for RAY: atme zeros dirs; cancelled getdir reuses dir; self → `zapyourself` then `losehp` only if damage; else `weffects`; `update_inventory()`. `physical_damage` false (FORCE_BOLT-only). Missile `d(4,6)` self is **not** Maybe_Half_Phys. Match.

`oc_dir` RAY. SPE_MAGIC_MISSILE is RAY. JS weffects NODIR-before-IMMEDIATE vs C reverse still misses RAY either way. Match.

`weffects` closed range includes missile (offset 0 → type 10) **and** fireball/cone/sleep/finger. This SHA only **reaches** it from `#cast` missile. DIG still `zap_dig` first (`SPE_DIG < SPE_MAGIC_MISSILE`). Disclose + SPBOOK skip makeknown. Match D-1386 keep-path.

Self-dir: always `learn_it`; Antimagic “The missiles bounce!” (no `d()`); else `d(4,6)` + “Idiot! You've shot yourself!”. C also `shieldeff`/`monstseesu` — named. Damage may `losehp` with Maybe_Half_Phys unused. Match keep-path D-1364/D-1367.

Directed `zhitm` `ZT_MAGIC_MISSILE`: `resists_magm` shield else `d(nd,6)` then `spell_damage_bonus` if spellcaster. JS dice live; bonus / `defended(AD_MAGM)` named. **Callee is not a stub.**

Hallucination check: “Match C SPE_MAGIC_MISSILE wand-duplicate weffects” while **`weffects` RAY + `ubuzz` + `zapyourself` missile are live** is **not** a dispatch-stub lie. The new arm is seven lines that call a live wrapper. “Match C `zhitm` `spell_damage_bonus` / `defended`” **would** be. “Match C SPE_FINGER cast” **would** be at this SHA.

## Hallucinations / overclaim

Subject says casting magic missile calls weffects ubuzz instead of Nothing happens. **True:** `#cast` getdir → self `zapyourself` or `weffects` → `ubuzz` type 10 `nd=ulevel/2+1`; SLEEP/DIG/LIGHT/DRAIN stay wired; FINGER/KNOCK still Nothing happens. **False until named** for FINGER / IMMEDIATE, `zhitm` bonus/`defended`, zapyourself shieldeff. Stamping **Addressed:** D-1448 for the **cast dispatch** is fair. Do **not** stamp “Match C `defended(AD_MAGM)`.” Do **not** treat fortress PASS as a missile cast.

## Density

One otyp of the C wand-duplicate group, same size as D-1440 SLEEP / D-1441 DIG. ~16 lines of JS plus comments. Playbook §2b right size. Did not glue FINGER. Acceptable.

## Branch-by-branch confirm

1. Directed SPE_MAGIC_MISSILE: `ubuzz` 10, `ulevel/2+1`. Match `:3461–3462`.
2. Self-dir Antimagic: bounce; no `d(4,6)`. Match D-1367 keep-path.
3. Self-dir no Antimagic: Idiot + `d(4,6)` + maybe `losehp`. Match `:2798–2800`.
4. Cancelled getdir: reuse dir. Match `:1488–1498`.
5. SPE_FINGER still Nothing happens. Named at this SHA.
6. Remaining IMMEDIATE still Nothing happens. Named.
7. `physical_damage` false. Match.
8. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `zap.js` hunks are comments.

## Verification

Journal: private canary **20**/20 (C/JS grep; RAY SPBOOK vs WAN_MAGIC_MISSILE; BZ_OFS 0; self-dir Idiot `d(4,6)` + Antimagic bounce; directed absorb + XP skip makeknown; FINGER/KNOCK still Nothing happens; SLEEP/DIG/LIGHT/DRAIN still wired; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs. Fortress PASS is not a missile cast.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch reaches live `weffects`/`ubuzz`/`zapyourself`. Callees are not stubs.

Named omits (map / Open, not Must-fix):

1. SPE_FINGER_OF_DEATH cast dispatch — later SHA in this window
2. remaining wand-duplicate IMMEDIATE (KNOCK / SLOW / LOCK / …)
3. `zhitm` `spell_damage_bonus` / `defended(AD_MAGM)`
4. zapyourself missile `shieldeff` / `monstseesu`

Do not Must-fix “weffects RAY is a stub” (D-1386 live). Do not Must-fix “FINGER should have shipped in this SHA.” Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `docast` → `spelleffects`. Directed new RNG is existing buzz/`zhitm`. Public fortress does not cast this.

Verdict: **ACCEPT-WITH-DEBT**
